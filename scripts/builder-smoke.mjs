// Drives the website builder end to end in a real browser: first-run setup,
// create a page, open the editor, drop a block, publish, and check the page
// serves. Screenshots land in <outDir>.
//   MSYS_NO_PATHCONV=1 node scripts/builder-smoke.mjs http://localhost:3100 <outDir>
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const base = (process.argv[2] || "http://localhost:3100").replace(/\/$/, "");
const out = process.argv[3] || "scratch/builder-smoke";
fs.mkdirSync(out, { recursive: true });
const shot = async (page, name) => { await page.screenshot({ path: path.join(out, `${name}.png`), fullPage: false }); console.log("  📸", name); };

const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox", "--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.log("  page error:", e.message));
page.on("console", (m) => { if (m.type() === "error") console.log("  console error:", m.text().slice(0, 200)); });

const email = "smoke@bluewhalestack.com", password = "smoke-test-1234";

// 1. setup or login
await page.goto(`${base}/builder`, { waitUntil: "networkidle2", timeout: 120_000 });
if (page.url().includes("/builder/setup")) {
  console.log("setup: creating the first account");
  await page.type("input[name=name]", "Smoke Tester");
  await page.type("input[name=email]", email);
  await page.type("input[name=password]", password);
  await Promise.all([page.waitForNavigation({ waitUntil: "networkidle2", timeout: 120_000 }), page.click("button[type=submit]")]);
} else if (page.url().includes("/builder/login")) {
  console.log("login");
  await page.type("input[name=email]", email);
  await page.type("input[name=password]", password);
  await Promise.all([page.waitForNavigation({ waitUntil: "networkidle2", timeout: 120_000 }), page.click("button[type=submit]")]);
}
console.log("at", page.url());
await shot(page, "01-pages");

// 2. create a page
const slug = `smoke-${Date.now().toString(36)}`;
await page.type("input[name=title]", "Smoke test page");
await page.type("input[name=path]", `/${slug}`);
await Promise.all([page.waitForNavigation({ waitUntil: "networkidle2", timeout: 180_000 }), page.evaluate(() => document.querySelector("input[name=title]").form.requestSubmit())]);
console.log("editor:", page.url());
await page.waitForSelector("[class*=Puck]", { timeout: 120_000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 4000));
await shot(page, "02-editor-empty");

// 3. drop a Hero block via the component list (drag from the drawer into the canvas)
const drawerItem = await page.$("::-p-text(Hero (photo + headline))").catch(() => null);
if (drawerItem) {
  const box = await drawerItem.boundingBox();
  const frame = await page.$("iframe");
  const fbox = await frame.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + 40, box.y + 40, { steps: 5 });
  await page.mouse.move(fbox.x + fbox.width / 2, fbox.y + 120, { steps: 25 });
  await new Promise((r) => setTimeout(r, 400));
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 2500));
  await shot(page, "03-editor-hero-dropped");
} else {
  console.log("  (could not find the Hero drawer item — skipping the drag)");
}

// 4. publish
// Puck renders its Publish action as a styled span, not a <button>
const publish = await page.evaluateHandle(() => [...document.querySelectorAll("[class*=_Button--primary]")].find((b) => b.textContent?.trim() === "Publish") ?? null);
if (publish && (await publish.jsonValue()) !== null) {
  await publish.asElement().click();
  await new Promise((r) => setTimeout(r, 4000));
  await shot(page, "04-published");
}

// 5. the page serves
const res = await fetch(`${base}/${slug}`);
const html = await res.text();
console.log(`GET /${slug} → ${res.status}, hero present: ${/display-1/.test(html)}`);
await page.goto(`${base}/${slug}`, { waitUntil: "networkidle2", timeout: 120_000 });
await shot(page, "05-live-page");

await browser.close();
console.log("done");
