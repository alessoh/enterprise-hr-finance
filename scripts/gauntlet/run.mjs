// Gauntlet runner: screenshot every Meridian page, then build randomized blind A/B
// composites against the reference set in research/refs/manifest.json.
//
//   node scripts/gauntlet/run.mjs shoot [--base http://localhost:3000] [--only home,pricing]
//   node scripts/gauntlet/run.mjs pair  [--only home,pricing]
//
// "shoot" writes gauntlet/shots/<page>-<width>-<fold|full>.png.
// "pair" writes gauntlet/pairs/<page>-<ref>.png plus a sibling .map.json the judge must
// never read. Decode verdicts with scripts/gauntlet/decode.mjs.
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const SHOTS = path.join(ROOT, "gauntlet", "shots");
const PAIRS = path.join(ROOT, "gauntlet", "pairs");

/** page key -> { route, category } where category indexes research/refs/manifest.json. */
export const PAGES = {
  home: { route: "/", category: "hero" },
  "home-full": { route: "/", category: "home-full", full: true },
  agents: { route: "/agents", category: "product" },
  "agent-detail": { route: "/agents/controls", category: "product" },
  platform: { route: "/platform", category: "product" },
  "platform-pillar": { route: "/platform/registry", category: "product" },
  pricing: { route: "/pricing", category: "pricing" },
  security: { route: "/security", category: "security" },
  customers: { route: "/customers", category: "customers" },
  "customer-story": { route: "/customers/halvorsen-health", category: "customers" },
  resources: { route: "/resources", category: "home-full" },
  article: { route: "/resources/what-is-an-agent-system-of-record", category: "article" },
  glossary: { route: "/glossary", category: "home-full" },
  dashboard: { route: "/dashboard", category: "product" },
  status: { route: "/status", category: "product" },
  changelog: { route: "/changelog", category: "home-full" },
  about: { route: "/about", category: "home-full" },
  contact: { route: "/contact?intent=demo", category: "home-full" },
};

const args = process.argv.slice(2);
const command = args[0] ?? "shoot";
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const only = flag("--only", null)?.split(",").map((s) => s.trim());
const keys = Object.keys(PAGES).filter((k) => !only || only.includes(k));

async function shoot() {
  const base = flag("--base", "http://localhost:3000");
  mkdirSync(SHOTS, { recursive: true });
  const browser = await chromium.launch();
  const report = [];
  try {
    for (const key of keys) {
      const { route, full } = PAGES[key];
      for (const width of [1440, 390]) {
        const ctx = await browser.newContext({
          viewport: { width, height: width === 1440 ? 900 : 844 },
          isMobile: width < 768,
          hasTouch: width < 768,
          colorScheme: "light",
        });
        const page = await ctx.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e)));
        page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
        try {
          await page.goto(base + route, { waitUntil: "networkidle", timeout: 120000 });
          await page.evaluate(() => (document.fonts ? document.fonts.ready : null));
          await page.waitForTimeout(1200);
          await page.screenshot({ path: path.join(SHOTS, `${key}-${width}-fold.png`) });
          if (full || width === 1440) {
            await page.evaluate(async () => {
              const step = Math.floor(window.innerHeight * 0.6);
              let total = document.documentElement.scrollHeight;
              for (let y = 0; y < total; y += step) {
                window.scrollTo(0, y);
                await new Promise((r) => setTimeout(r, 120));
                total = document.documentElement.scrollHeight;
              }
              window.scrollTo(0, 0);
              await new Promise((r) => setTimeout(r, 400));
            });
            await page.screenshot({ path: path.join(SHOTS, `${key}-${width}-full.png`), fullPage: true });
          }
          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth > window.innerWidth,
          );
          report.push({ key, width, overflow, errors: errors.slice(0, 6) });
        } catch (error) {
          report.push({ key, width, failed: String(error).slice(0, 200) });
        }
        await ctx.close();
      }
    }
  } finally {
    await browser.close();
  }
  console.log(JSON.stringify(report, null, 1));
}

function pair() {
  const manifest = JSON.parse(readFileSync(path.join(ROOT, "research/refs/manifest.json"), "utf8"));
  mkdirSync(PAIRS, { recursive: true });
  const made = [];
  for (const key of keys) {
    const { category } = PAGES[key];
    const refs = (manifest[category] ?? []).slice(0, 3);
    const ours = path.join(SHOTS, `${key}-1440-fold.png`);
    if (!existsSync(ours)) continue;
    for (const ref of refs) {
      const refPath = path.join(ROOT, ref.path);
      if (!existsSync(refPath)) continue;
      const out = path.join(PAIRS, `${key}--${ref.site}.png`);
      const map = path.join(PAIRS, `${key}--${ref.site}.map.json`);
      execFileSync("python", [
        path.join(ROOT, "scripts/gauntlet/compose.py"),
        ours,
        refPath,
        out,
        map,
        "--width",
        "900",
        "--max-height",
        "1000",
      ]);
      made.push({ page: key, ref: ref.site, composite: path.relative(ROOT, out) });
    }
  }
  console.log(JSON.stringify(made, null, 1));
}

if (command === "shoot") await shoot();
else if (command === "pair") pair();
else if (command === "list") console.log(readdirSync(SHOTS).join("\n"));
else {
  console.error("usage: run.mjs shoot|pair|list");
  process.exit(1);
}
