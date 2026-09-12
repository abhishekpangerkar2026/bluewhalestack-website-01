// Renders the BlueWhale Stack 3D product scenes (scripts/render-3d/index.html,
// three.js in headless Chrome via SwiftShader) to 2400×1600 JPEG + PNG files.
// Usage: node scripts/render-3d.mjs <outDir> [scene,scene,...] [dark|light|both]
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

const [outDir, scenesArg, bgArg] = process.argv.slice(2);
if (!outDir) { console.error("usage: node scripts/render-3d.mjs <outDir> [scenes] [dark|light|both]"); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });

const ALL = [
  "platform-stack", "edition-standard", "edition-enterprise", "edition-telco-datacenter",
  "edition-government", "whale-ai", "whalenomics", "migration", "cloud-audit",
  "fabric-datacenter", "sovereign-edge", "partners",
];
const scenes = scenesArg && scenesArg !== "all" ? scenesArg.split(",") : ALL;
const bgs = bgArg === "dark" || bgArg === "light" ? [bgArg] : ["dark", "light"];
const html = pathToFileURL(path.resolve("scripts/render-3d/index.html")).href;

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage();
await page.setViewport({ width: 2400, height: 1600, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.log("  page error:", e.message));

for (const scene of scenes) {
  for (const bg of bgs) {
    const t0 = Date.now();
    await page.goto(`${html}?scene=${scene}&bg=${bg}`, { waitUntil: "load", timeout: 120_000 });
    await page.waitForFunction(() => window.__done === true, { timeout: 120_000 });
    await new Promise((r) => setTimeout(r, 300));
    const stage = await page.$("#stage");
    const png = await stage.screenshot({ type: "png" });
    const base = path.join(outDir, `bws-${scene}-${bg}`);
    await sharp(png).jpeg({ quality: 92, chromaSubsampling: "4:4:4", mozjpeg: true }).toFile(`${base}.jpg`);
    await sharp(png).png({ compressionLevel: 9 }).toFile(`${base}.png`);
    console.log(`${scene} [${bg}] -> ${path.basename(base)}.jpg/.png  (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
  }
}
await browser.close();
