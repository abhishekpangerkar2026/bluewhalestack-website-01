// Snapshots the visible text of every page a running site serves, so a content
// refactor can be checked for regressions: run once before, once after, then
// `node scripts/text-snapshot.mjs diff before.json after.json`.
//
//   node scripts/text-snapshot.mjs snap http://localhost:3200 out.json [extraRoute,...]
//   node scripts/text-snapshot.mjs diff before.json after.json
import fs from "node:fs";

const [mode, a, b, extra] = process.argv.slice(2);

const decode = (s) =>
  s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));

function visibleText(html) {
  const body = html.split(/<body[^>]*>/i)[1] ?? html;
  return decode(
    body
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<template[\s\S]*?<\/template>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

async function routesOf(base) {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const set = new Set(urls);
  ["/", "/legal/privacy", "/legal/terms", "/contact", "/contact?intent=sales", "/contact?intent=preview", "/contact?intent=resource", "/about/leadership", "/products/whaleforge", "/docs/quick-start", "/docs/api-reference", "/resources/platform-overview", "/resources/datasheet-enterprise", "/newsroom"]
    .forEach((r) => set.add(r));
  (extra ? extra.split(",") : []).forEach((r) => set.add(r));
  return [...set].sort();
}

if (mode === "snap") {
  const base = a.replace(/\/$/, "");
  const routes = await routesOf(base);
  const out = {};
  let n = 0;
  for (const route of routes) {
    const res = await fetch(base + route, { headers: { accept: "text/html" } });
    const html = await res.text();
    out[route] = { status: res.status, text: visibleText(html) };
    if (++n % 20 === 0) console.log(`  ${n}/${routes.length}`);
  }
  fs.writeFileSync(b, JSON.stringify(out, null, 1));
  console.log(`${routes.length} routes → ${b}`);
} else if (mode === "diff") {
  const before = JSON.parse(fs.readFileSync(a, "utf8"));
  const after = JSON.parse(fs.readFileSync(b, "utf8"));
  let changed = 0;
  const words = (t) => t.split(" ");
  for (const route of Object.keys({ ...before, ...after })) {
    const x = before[route], y = after[route];
    if (!x || !y) { console.log(`${!x ? "+ new" : "- gone"}  ${route}`); changed++; continue; }
    if (x.status !== y.status) { console.log(`! status ${x.status} → ${y.status}  ${route}`); changed++; continue; }
    if (x.text === y.text) continue;
    changed++;
    const wx = words(x.text), wy = words(y.text);
    let i = 0;
    while (i < wx.length && i < wy.length && wx[i] === wy[i]) i++;
    let j = 0;
    while (j < wx.length - i && j < wy.length - i && wx[wx.length - 1 - j] === wy[wy.length - 1 - j]) j++;
    const lost = wx.slice(i, wx.length - j).join(" "), gained = wy.slice(i, wy.length - j).join(" ");
    console.log(`~ ${route}\n    - ${lost.slice(0, 300)}\n    + ${gained.slice(0, 300)}`);
  }
  console.log(changed ? `${changed} route(s) differ` : "identical text on every route");
  process.exit(changed ? 1 : 0);
} else {
  console.log("usage: snap <base> <out.json> | diff <before.json> <after.json>");
  process.exit(2);
}
