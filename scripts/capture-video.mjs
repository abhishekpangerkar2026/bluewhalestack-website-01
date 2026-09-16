// Renders short, seamlessly looping turntable clips (MP4 + WebM + poster) of the
// live product scenes from /scene-capture, frame by frame, and encodes them with
// the bundled ffmpeg. Usage: node scripts/capture-video.mjs [base] [key,key|all] [--out=dir]
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ffmpeg = require("ffmpeg-static");

const base = process.argv[2] || "http://localhost:3100";
const arg = process.argv[3];
const DEFAULT = ["estate", "architecture", "platform", "whale-ai", "fabric", "industry-bfsi", "industry-government", "edition-enterprise", "edition-telco-datacenter"];
const keys = arg && arg !== "all" ? arg.split(",") : DEFAULT;
const outDir = (process.argv.find((a) => a.startsWith("--out=")) || "--out=public/media/scenes").slice(6);
fs.mkdirSync(outDir, { recursive: true });

// software-GL rendering costs a few seconds per frame, so keep the loop short: 3 s at 30 fps
const W = 1120, H = 630, FPS = 30, N = 90;
const STUDIO = "light";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.log("  page error:", e.message));

for (const key of keys) {
  const t0 = Date.now();
  const frames = path.join(outDir, `.frames-${key}`);
  fs.rmSync(frames, { recursive: true, force: true });
  fs.mkdirSync(frames, { recursive: true });
  await page.goto(`${base}/scene-capture?key=${key}&w=${W}&h=${H}&angle=0&studio=${STUDIO}`, { waitUntil: "load", timeout: 180_000 });
  await page.waitForFunction(() => window.__sceneReady === true, { timeout: 180_000 });
  for (let i = 0; i < N; i++) {
    const a = 0.3 * Math.sin((2 * Math.PI * i) / N);
    await page.evaluate((angle) => window.__setAngle(angle), a);
    await page.waitForFunction(() => window.__sceneReady === true, { timeout: 30_000 });
    await page.screenshot({ path: path.join(frames, `f${String(i).padStart(4, "0")}.png`), type: "png" });
  }
  const mp4 = path.join(outDir, `${key}.mp4`);
  const webm = path.join(outDir, `${key}.webm`);
  const poster = path.join(outDir, `${key}.jpg`);
  const common = ["-y", "-framerate", String(FPS), "-i", path.join(frames, "f%04d.png")];
  let r = spawnSync(ffmpeg, [...common, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-preset", "slow", "-movflags", "+faststart", mp4], { stdio: "pipe" });
  if (r.status !== 0) console.log(r.stderr.toString().slice(-600));
  r = spawnSync(ffmpeg, [...common, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "32", "-row-mt", "1", webm], { stdio: "pipe" });
  if (r.status !== 0) console.log(r.stderr.toString().slice(-600));
  await sharp(path.join(frames, "f0000.png")).jpeg({ quality: 82 }).toFile(poster);
  fs.rmSync(frames, { recursive: true, force: true });
  const kb = (f) => (fs.existsSync(f) ? Math.round(fs.statSync(f).size / 1024) : 0);
  console.log(`${key.padEnd(28)} mp4 ${kb(mp4)}KB  webm ${kb(webm)}KB  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
}
await browser.close();
