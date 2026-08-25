// Screenshot helper driving the installed Chrome via puppeteer-core with REAL
// device emulation, so mobile captures lay out at 390px (headless Chrome's
// --window-size floor is ~500px, which made earlier mobile shots misleading).
// Usage: node shoot.mjs <baseUrl> <outDir> <mode:desktop|mobile> <route1> [route2 ...]
import puppeteer from "puppeteer-core";
import path from "node:path";
import fs from "node:fs";

const [base, outDir, mode, ...routes] = process.argv.slice(2);
if (!base || !outDir || !mode || routes.length === 0) {
  console.error("usage: node shoot.mjs <base> <outDir> <desktop|mobile> <routes...>");
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const page = await browser.newPage();
if (mode === "mobile") {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.setUserAgent(
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  );
} else {
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
}

for (const route of routes) {
  const name = route === "/" ? "home" : route.replace(/^\//, "").replace(/[\/\[\]]+/g, "-");
  const url = base.replace(/\/$/, "") + route;
  try {
    // "load" + a settle delay: networkidle0 never fires on pages that keep a
    // long-lived connection open (dev HMR socket, cobe globe), so it would time out.
    await page.goto(url, { waitUntil: "load", timeout: 120_000 });
    await new Promise((r) => setTimeout(r, 1500));
    // Reveal animations are IntersectionObserver-driven: scroll the page to trigger them all.
    // The site sets `scroll-behavior: smooth`, which makes window.scrollTo animate and the
    // observers miss the far sections — force instant scrolling for the pass.
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      const step = window.innerHeight * 0.7;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 300));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 900));
    });
    // Safety net: anything still un-revealed (e.g. a section taller than the viewport) is
    // forced visible so the capture shows content, not the pre-animation opacity-0 state.
    await page.addStyleTag({
      content: ".opacity-0{opacity:1!important}.translate-y-5{transform:none!important}",
    });
    await new Promise((r) => setTimeout(r, 400));
    const overflow = await page.evaluate(() => {
      const w = document.documentElement.clientWidth;
      const sw = document.documentElement.scrollWidth;
      const offenders = [...document.querySelectorAll("*")]
        .filter((e) => e.getBoundingClientRect().right > w + 1)
        .slice(0, 6)
        .map((e) => `${e.tagName.toLowerCase()}${e.className && typeof e.className === "string" ? "." + e.className.split(" ").slice(0, 3).join(".") : ""} r=${Math.round(e.getBoundingClientRect().right)}`);
      return { clientWidth: w, scrollWidth: sw, offenders };
    });
    const file = path.join(outDir, `${mode === "mobile" ? "m-" : ""}${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`${route} -> ${path.basename(file)} | clientWidth=${overflow.clientWidth} scrollWidth=${overflow.scrollWidth}${overflow.scrollWidth > overflow.clientWidth ? " OVERFLOW " + JSON.stringify(overflow.offenders) : ""}`);
  } catch (e) {
    console.log(`${route} -> ERROR ${e.message}`);
  }
}
await browser.close();
