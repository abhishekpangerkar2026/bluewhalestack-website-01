// Diagnostic: load a route in headless Chrome WITHOUT the ANGLE/SwiftShader flags (the default
// software path some browsers fall back to), report which WebGL the live scene got and any
// three.js warnings, and clip the hero. Usage: node scripts/shoot-nogl.mjs <base> <route> <out.png> [height]
import puppeteer from "puppeteer-core";
const [base, route, out, height = "900"] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
const logs = [];
page.on("console", (m) => { if (m.type() !== "log") logs.push(`${m.type()}: ${m.text().slice(0, 240)}`); });
page.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`));
await page.setViewport({ width: 1440, height: Number(height), deviceScaleFactor: 1 });
await page.goto(base + route, { waitUntil: "load", timeout: 120000 });
await new Promise((r) => setTimeout(r, 9000));
const info = await page.evaluate(() => {
  const c = document.createElement("canvas");
  const gl2 = c.getContext("webgl2");
  const gl = gl2 || c.getContext("webgl");
  const dbg = gl && gl.getExtension("WEBGL_debug_renderer_info");
  return {
    webgl2: !!gl2,
    renderer: gl && dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : null,
    maxTex: gl ? gl.getParameter(gl.MAX_TEXTURE_SIZE) : null,
    canvases: document.querySelectorAll("canvas").length,
    fontFamily: getComputedStyle(document.body).fontFamily,
    fontsReady: document.fonts.status,
  };
});
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: Number(height) } });
console.log(JSON.stringify(info));
console.log(logs.filter((l) => !/favicon|DevTools|Clock|PCFSoft/.test(l)).slice(0, 12).join("\n"));
await browser.close();
