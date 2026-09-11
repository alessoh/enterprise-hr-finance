// Site-wide audit: metadata, headings, JSON-LD, landmarks, contrast-adjacent a11y checks.
//   node scripts/audit.mjs [--base http://localhost:3100]
import { chromium } from "playwright";

const base = process.argv.includes("--base")
  ? process.argv[process.argv.indexOf("--base") + 1]
  : "http://localhost:3100";

const ROUTES = [
  "/", "/agents", "/agents/help-desk", "/agents/controls", "/platform", "/platform/registry",
  "/platform/gateway", "/platform/data-fabric", "/platform/studio", "/platform/assist",
  "/pricing", "/security", "/customers", "/customers/halvorsen-health", "/resources",
  "/resources/what-is-an-agent-system-of-record", "/glossary", "/glossary/agent-registry",
  "/changelog", "/status", "/dashboard", "/about", "/careers", "/contact",
  "/legal/privacy", "/legal/terms", "/legal/dpa", "/legal/subprocessors", "/login", "/signup",
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const rows = [];

for (const route of ROUTES) {
  const response = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 90000 });
  const data = await page.evaluate(() => {
    const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
    const h1s = [...document.querySelectorAll("h1")].map((h) => h.textContent.trim());
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) =>
      Number(h.tagName[1]),
    );
    let skips = 0;
    for (let i = 1; i < headings.length; i += 1) {
      if (headings[i] - headings[i - 1] > 1) skips += 1;
    }
    const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
      try {
        const parsed = JSON.parse(s.textContent);
        return (Array.isArray(parsed) ? parsed : [parsed]).map((n) => n["@type"]).flat();
      } catch {
        return ["PARSE_ERROR"];
      }
    });
    const imgsNoAlt = [...document.querySelectorAll("img")].filter(
      (i) => !i.hasAttribute("alt") && i.getAttribute("aria-hidden") !== "true",
    ).length;
    const linksNoText = [...document.querySelectorAll("a")].filter(
      (a) => !a.textContent.trim() && !a.getAttribute("aria-label") && !a.querySelector("[aria-label]"),
    ).length;
    const buttonsNoName = [...document.querySelectorAll("button")].filter(
      (b) => !b.textContent.trim() && !b.getAttribute("aria-label"),
    ).length;
    const inputsNoLabel = [...document.querySelectorAll("input,select,textarea")].filter((el) => {
      if (el.type === "hidden") return false;
      if (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby")) return false;
      return !(el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`));
    }).length;
    return {
      title: document.title,
      description: meta('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      robots: meta('meta[name="robots"]'),
      ogTitle: meta('meta[property="og:title"]'),
      ogImage: meta('meta[property="og:image"]'),
      twitterCard: meta('meta[name="twitter:card"]'),
      h1Count: h1s.length,
      h1: h1s[0] ?? null,
      headingSkips: skips,
      jsonldTypes: jsonld.flat(),
      main: document.querySelectorAll("main").length,
      nav: document.querySelectorAll("nav").length,
      imgsNoAlt,
      linksNoText,
      buttonsNoName,
      inputsNoLabel,
      lang: document.documentElement.lang,
    };
  });

  const problems = [];
  const noIndex = (data.robots ?? "").includes("noindex");
  if (response.status() !== 200) problems.push(`status ${response.status()}`);
  if (data.h1Count !== 1) problems.push(`h1 count ${data.h1Count}`);
  if (!data.title) problems.push("no title");
  else if (data.title.length > 70) problems.push(`title ${data.title.length} chars`);
  if (!data.description) problems.push("no description");
  else if (data.description.length < 120 || data.description.length > 165)
    problems.push(`description ${data.description.length} chars`);
  if (!noIndex && !data.canonical) problems.push("no canonical");
  if (!noIndex && data.jsonldTypes.length === 0) problems.push("no JSON-LD");
  if (data.jsonldTypes.includes("PARSE_ERROR")) problems.push("JSON-LD parse error");
  if (!noIndex && !data.ogImage) problems.push("no og:image");
  if (data.headingSkips > 0) problems.push(`${data.headingSkips} heading level skips`);
  if (data.main !== 1) problems.push(`main landmarks ${data.main}`);
  if (data.imgsNoAlt) problems.push(`${data.imgsNoAlt} img without alt`);
  if (data.linksNoText) problems.push(`${data.linksNoText} link without name`);
  if (data.buttonsNoName) problems.push(`${data.buttonsNoName} button without name`);
  if (data.inputsNoLabel) problems.push(`${data.inputsNoLabel} field without label`);
  if (data.lang !== "en") problems.push(`lang "${data.lang}"`);

  rows.push({ route, problems, title: data.title, jsonld: [...new Set(data.jsonldTypes)] });
}

await browser.close();

const bad = rows.filter((r) => r.problems.length);
console.log(`audited ${rows.length} routes — ${bad.length} with findings\n`);
for (const r of bad) console.log(`${r.route}\n  ${r.problems.join("\n  ")}`);
if (!bad.length) console.log("clean");
console.log("\nJSON-LD coverage:");
for (const r of rows) console.log(`  ${r.route.padEnd(46)} ${r.jsonld.join(", ") || "(none)"}`);
