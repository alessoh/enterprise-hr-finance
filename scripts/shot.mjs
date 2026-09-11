// Screenshot helper for the design gauntlet.
// Usage: node scripts/shot.mjs <url> <outPrefix> [--widths 1440,768,390] [--full] [--dark-errors]
// Writes <outPrefix>-<width>-fold.png and, with --full, <outPrefix>-<width>-full.png.
// Scrolls through the page before the full capture so in-view reveal animations have fired.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const args = process.argv.slice(2);
const url = args[0];
const out = args[1];
if (!url || !out) {
  console.error("usage: node scripts/shot.mjs <url> <outPrefix> [--widths 1440,768,390] [--full]");
  process.exit(1);
}
const flag = (f, d) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : d;
};
const widths = String(flag("--widths", "1440"))
  .split(",")
  .map((n) => Number(n.trim()))
  .filter(Boolean);
const full = args.includes("--full");
const heights = { 1920: 1080, 1440: 900, 1280: 800, 1024: 768, 768: 1024, 430: 932, 390: 844, 375: 812 };

mkdirSync(dirname(out), { recursive: true });

const browser = await chromium.launch();
const report = [];
try {
  for (const w of widths) {
    const h = heights[w] ?? 900;
    const mobile = w < 768;
    const ctx = await browser.newContext({
      viewport: { width: w, height: h },
      deviceScaleFactor: 1,
      isMobile: mobile,
      hasTouch: mobile,
      colorScheme: "light",
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("requestfailed", (r) => errors.push(`requestfailed ${r.url()} ${r.failure()?.errorText ?? ""}`));

    await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
    await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${out}-${w}-fold.png` });

    if (full) {
      await page.evaluate(async () => {
        const step = Math.max(200, Math.floor(window.innerHeight * 0.55));
        let total = document.documentElement.scrollHeight;
        for (let y = 0; y < total; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 140));
          total = document.documentElement.scrollHeight;
        }
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise((r) => setTimeout(r, 500));
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 500));
      });
      await page.screenshot({ path: `${out}-${w}-full.png`, fullPage: true });
    }

    const metrics = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      title: document.title,
      h1: Array.from(document.querySelectorAll("h1")).map((e) => e.textContent?.trim()).filter(Boolean),
    }));
    report.push({ width: w, ...metrics, consoleErrors: errors.slice(0, 15) });
    await ctx.close();
  }
} finally {
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
