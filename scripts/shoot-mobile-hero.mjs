// Mobile-emulated viewport capture of a route with WebGL on, plus a DOM sanity check.
import puppeteer from "puppeteer-core";
const [base, route, out] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage();
const logs = [];
page.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`));
page.on("console", (m) => { if (m.type() === "error") logs.push(`console.error: ${m.text()}`); });
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1");
await page.goto(base + route, { waitUntil: "load", timeout: 120000 });
await new Promise((r) => setTimeout(r, 6000));
const info = await page.evaluate(() => ({
  h1: document.querySelectorAll("h1").length,
  canvases: document.querySelectorAll("canvas").length,
  footers: document.querySelectorAll("footer").length,
  scrollHeight: document.body.scrollHeight,
  canvasSize: [...document.querySelectorAll("canvas")].map((c) => `${c.width}x${c.height} css ${c.clientWidth}x${c.clientHeight}`),
}));
await page.screenshot({ path: out, fullPage: false });
console.log(JSON.stringify(info));
console.log(logs.slice(0, 8).join("\n"));
await browser.close();
