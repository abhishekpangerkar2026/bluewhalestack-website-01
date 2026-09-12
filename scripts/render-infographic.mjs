// Renders the 3D product infographics (scripts/render-3d/infographic.html —
// three.js scene + HTML labels, headless Chrome via SwiftShader) to 2400×1350
// JPEG + PNG. Usage: node scripts/render-infographic.mjs <outDir> [module,module,...]
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

const [outDir, modsArg] = process.argv.slice(2);
if (!outDir) { console.error("usage: node scripts/render-infographic.mjs <outDir> [modules]"); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });

const ALL = ["inventory", "whalenomics", "whale-ai", "migration", "cloud-audit", "sovereign-operations", "platform"];
const mods = modsArg && modsArg !== "all" ? modsArg.split(",") : ALL;
const html = pathToFileURL(path.resolve("scripts/render-3d/infographic.html")).href;

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage();
await page.setViewport({ width: 2400, height: 1350, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.log("  page error:", e.message));
page.on("console", (m) => { if (m.type() === "error") console.log("  console:", m.text().slice(0, 200)); });

for (const mod of mods) {
  const t0 = Date.now();
  await page.goto(`${html}?module=${mod}`, { waitUntil: "load", timeout: 180_000 });
  await page.waitForFunction(() => window.__done === true, { timeout: 180_000 });
  await new Promise((r) => setTimeout(r, 400));
  const stage = await page.$("#stage");
  const png = await stage.screenshot({ type: "png" });
  const base = path.join(outDir, `bws-infographic-${mod}`);
  await sharp(png).jpeg({ quality: 92, chromaSubsampling: "4:4:4", mozjpeg: true }).toFile(`${base}.jpg`);
  await sharp(png).png({ compressionLevel: 9 }).toFile(`${base}.png`);
  console.log(`${mod} -> ${path.basename(base)}.jpg/.png (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
}
await browser.close();
