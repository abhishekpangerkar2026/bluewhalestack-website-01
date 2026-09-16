// Prints every document in the library to public/docs/<slug>.pdf from the
// running site's /print/<slug> layout (A4, brand header/footer, page numbers).
// Usage: node scripts/build-docs.mjs [base=http://localhost:3100] [slug,slug|all] [--out=dir]
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const base = process.argv[2] || "http://localhost:3100";
const arg = process.argv[3];
const outDir = (process.argv.find((a) => a.startsWith("--out=")) || "--out=public/docs").slice(6);
fs.mkdirSync(outDir, { recursive: true });

const index = await (await fetch(`${base}/api/documents`)).json();
const docs = arg && arg !== "all" ? index.filter((d) => arg.split(",").includes(d.slug)) : index;

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 2 });
page.on("pageerror", (e) => console.log("  page error:", e.message));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
for (const d of docs) {
  const t0 = Date.now();
  await page.goto(`${base}/print/${d.slug}`, { waitUntil: "load", timeout: 180_000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
  });
  await new Promise((r) => setTimeout(r, 400));
  const file = path.join(outDir, `${d.slug}.pdf`);
  await page.pdf({
    path: file,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="width:100%;padding:0 14mm;font-family:Inter,Arial,sans-serif;font-size:7.5pt;color:#8a94a6;display:flex;justify-content:space-between;"><span>BlueWhale Stack · ${esc(d.type)}</span><span>${esc(d.title)}</span></div>`,
    footerTemplate: `<div style="width:100%;padding:0 14mm;font-family:Inter,Arial,sans-serif;font-size:7.5pt;color:#8a94a6;display:flex;justify-content:space-between;"><span>www.bluewhalestack.com · ${esc(d.updated)}</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
    margin: { top: "16mm", bottom: "16mm", left: "14mm", right: "14mm" },
    // a loaded machine (a video render in the background) can take a while per page
    timeout: 180_000,
  });
  console.log(`${d.slug.padEnd(40)} ${Math.round(fs.statSync(file).size / 1024)}KB  (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
}
await browser.close();
console.log(`${docs.length} documents → ${outDir}`);
