// One-off render of a live scene for tuning the look, with a 1000px preview next to it.
// Usage: node scripts/scene-proto.mjs <key> <light|dark> <out.png> [w=2000] [h=1500] [angle=0]  (dev server on :3100)
import puppeteer from "puppeteer-core";
import sharp from "sharp";
const [key = "solution-cloud-migration", studio = "light", out = "proto.png", w = "2000", h = "1500", angle = "0"] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage();
await page.setViewport({ width: Number(w), height: Number(h), deviceScaleFactor: 1 });
const logs = [];
page.on("pageerror", (e) => logs.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") logs.push(m.type() + ": " + m.text().slice(0, 200)); });
const t0 = Date.now();
await page.goto(`http://localhost:3100/scene-capture?key=${key}&w=${w}&h=${h}&angle=${angle}&studio=${studio}`, { waitUntil: "load", timeout: 240_000 });
try {
  await page.waitForFunction(() => window.__sceneReady === true, { timeout: 180_000 });
} catch {
  console.log("never ready");
}
await new Promise((r) => setTimeout(r, 500));
const canvas = await page.$("canvas");
const png = await canvas.screenshot({ type: "png" });
await sharp(png).png().toFile(out);
// a 1000px-wide preview for reading
await sharp(png).resize({ width: 1000 }).png().toFile(out.replace(/\.png$/, "-1000.png"));
console.log(`${key} ${studio} ${w}x${h} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
console.log(logs.slice(0, 10).join("\n"));
await browser.close();
