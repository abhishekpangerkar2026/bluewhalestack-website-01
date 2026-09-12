// Viewport-only capture of the solutions hero with WebGL on, after the live scene has had time to load and animate.
import puppeteer from "puppeteer-core";
const [base, out] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage();
const logs = [];
page.on("console", (m) => logs.push(`${m.type()}: ${m.text()}`));
page.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`));
page.on("response", (r) => { if (r.status() >= 400) logs.push(`http ${r.status()}: ${r.url()}`); });
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(base + "/solutions", { waitUntil: "load", timeout: 120000 });
await new Promise((r) => setTimeout(r, 6000));
const hasCanvas = await page.evaluate(() => !!document.querySelector("canvas"));
await page.screenshot({ path: out, clip: { x: 0, y: 60, width: 1440, height: 640 } });
console.log("canvas:", hasCanvas);
console.log(logs.filter((l) => !l.includes("Download the React DevTools")).slice(0, 12).join("\n"));
await browser.close();
