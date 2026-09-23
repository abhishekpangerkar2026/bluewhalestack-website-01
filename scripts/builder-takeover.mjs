// Takes over a coded page in the website builder and screenshots the imported
// composition (editor + a full-height render of the preview frame).
//   MSYS_NO_PATHCONV=1 node scripts/builder-takeover.mjs http://localhost:3100 <outDir> /about [/platform ...]
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const base = (process.argv[2] || "http://localhost:3100").replace(/\/$/, "");
const out = process.argv[3] || "scratch/builder-takeover";
const routes = process.argv.slice(4).length ? process.argv.slice(4) : ["/about"];
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox", "--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000 });
page.on("pageerror", (e) => console.log("  page error:", e.message));

await page.goto(`${base}/builder/login`, { waitUntil: "networkidle2", timeout: 120_000 });
if (page.url().includes("/builder/login")) {
  await page.type("input[name=email]", "smoke@bluewhalestack.com");
  await page.type("input[name=password]", "smoke-test-1234");
  await Promise.all([page.waitForNavigation({ waitUntil: "networkidle2", timeout: 120_000 }), page.click("button[type=submit]")]);
}

for (const route of routes) {
  const name = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
  await page.goto(`${base}/builder`, { waitUntil: "networkidle2", timeout: 120_000 });
  // take over (or open if already taken over)
  const taken = await page.evaluate((r) => {
    const input = [...document.querySelectorAll("form input[name=path]")].find((i) => i.value === r);
    if (input) { input.form.requestSubmit(); return "takeover"; }
    const link = [...document.querySelectorAll("a")].find((a) => a.getAttribute("href") === `/builder/edit?path=${encodeURIComponent(r)}`);
    if (link) { link.click(); return "open"; }
    return "none";
  }, route);
  console.log(route, "→", taken);
  if (taken === "none") continue;
  await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 180_000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 6000));
  const blocks = await page.evaluate(() => {
    const frame = document.querySelector("iframe");
    const doc = frame?.contentDocument;
    return doc ? [...doc.querySelectorAll("[data-puck-component]")].map((e) => e.getAttribute("data-puck-component")).slice(0, 40) : [];
  });
  console.log("  blocks:", blocks.join(", ") || "(none found via data-puck-component)");
  await page.screenshot({ path: path.join(out, `${name}-editor.png`) });
  // full render of the preview frame
  const frame = page.frames().find((f) => f.url().includes("about:") || f !== page.mainFrame());
  if (frame) {
    const h = await frame.evaluate(() => document.documentElement.scrollHeight);
    console.log("  preview height:", h);
  }
  const el = await page.$("iframe");
  if (el) await el.screenshot({ path: path.join(out, `${name}-preview.png`) });
}
await browser.close();
console.log("done");
