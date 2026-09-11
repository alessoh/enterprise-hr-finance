# MERIDIAN — Build Brief (single source of truth for every agent)

Read this whole file before doing anything. It defines the brand, product, stack, file ownership, and quality bar.
DESIGN.md (written by the design director) defines the visual system. research/ holds competitive and SEO research.
research/source-briefing.md is the original market briefing the product is modeled on (read it for facts and tone).

## 1. What we are building
A state-of-the-art, light-mode SaaS marketing + subscription website for **Meridian**: AI agent software that runs
HR and finance operations for enterprises. Deployed on Vercel as a real domain. Must be:
- Visually AAA — indistinguishable in polish from Stripe, Linear, Vercel, Ramp, Attio, Anthropic, Sierra, Harvey.
- SEO-perfect and GEO-perfect (Generative Engine Optimization: content that LLM search engines cite).
- Real-time: live agent operations feed, live metrics, live status, streamed via Server-Sent Events.
- Has a Three.js hero / signature 3D moment that is tasteful, performant, and degrades gracefully.
- Subscription-ready: pricing tiers + consumption credits + Stripe Checkout scaffold (env-gated, demo mode without keys).

## 2. Brand bible (use EXACTLY these names everywhere)
- Company/product: **Meridian**. Never "Meridian AI" or "MeridianHQ" in copy. Legal entity: Meridian Systems, Inc. (fictional).
- Tagline (H1 candidate; final wording chosen by content + design): "AI agents that run HR and finance."
  Alternates: "The AI workforce for HR and finance." / "Governed agents that do the work. Humans stay accountable."
- Positioning: Meridian is NOT a chatbot or open-ended assistant. It ships **narrow, governed agents**, each scoped to one
  workflow, operating on the customer's structured HR/finance data under the customer's security model, producing a
  measurable time or cost saving, with a human accountable for every consequential outcome.
- Voice: precise, confident, calm, concrete. Short sentences. Numbers over adjectives. No hype words ("revolutionary",
  "supercharge", "unleash", "seamless", "cutting-edge", "next-gen", "unlock"). No emoji. No exclamation marks.
- Site URL: read from env NEXT_PUBLIC_SITE_URL, default "https://enterprise-hr-finance.vercel.app".
- Model posture: model-agnostic. Customers choose frontier models (Anthropic Claude, OpenAI) and Meridian routes
  domain-specific reasoning to Meridian's own HR/finance-tuned models. Never claim a partnership with those vendors;
  phrase as "supports" / "bring your own model".
- Do NOT use Workday, Sana, Illuminate, Paradox, Evisort, Pipedream, Flowise names or trademarks anywhere in the site.
  Do NOT use real company logos as customers. Do NOT invent real people. Customer names/quotes are fictional design partners.
- Outcome figures below are "modeled outcomes from design-partner deployments" — say so in a footnote wherever used.

## 3. Product architecture
### Agents (12). slug — Name — one-line job — headline metric — status
HR
1. help-desk — Help Desk Agent — Answers employee questions from policy, handbook, and system-of-record data; opens and
   resolves cases — deflects up to 75% of HR case volume; resolution time −30% — GA
2. recruiting — Recruiting Agent — Screens and shortlists candidates against the role, schedules interviews — screening
   time −46%; manual recruiter reviews −70% — GA
3. payroll — Payroll Agent — Finds missing data and configuration errors before the run; applies wage-law updates —
   payroll compliance issues resolved 4x faster — GA
4. scheduling — Scheduling Agent — Fills open shifts conversationally with eligible, willing frontline staff — time to
   fill a shift −90% — GA
5. performance — Performance Agent — Drafts evidence-based reviews from goals, feedback, and delivered work — review
   drafting −60% — Early access
6. job-architecture — Job Architecture Agent — Benchmarks roles and pay bands against market data, flags drift —
   benchmarking cycle from weeks to hours — Early access
FINANCE
7. audit — Audit Agent — Collects, labels, and packages audit evidence on request from auditors — ~900 hours saved per
   year — GA
8. planning — Planning Agent — Explains variances and lets finance explore plans conversationally — variance
   commentary in minutes — GA
9. controls — Controls Agent — Continuously tests transactions for duplicates, anomalies, and policy breaches —
   one design partner avoided ~$283K/year in duplicate payments — GA
10. close — Close Agent — Orchestrates month-end close tasks, reconciliations, and sign-offs — close shortened by 3 days
    — GA
11. revenue-contracts — Revenue Contract Agent — Reads customer contracts, flags revenue risk, drafts the accounting —
    contract review −65% — Early access
LEGAL / OPS
12. contract-review — Contract Review Agent — Redlines third-party paper against your playbook — pre-signature
    processing 65% faster — GA

Common agent contract (show on every agent page): scoped to one workflow · reads only permitted data · every action
logged · consequential actions require human approval · measurable outcome · runs on your chosen model.

### Platform layer (names are fixed)
- **Registry** — the system of record for agents. One registry of every agent (Meridian, partner, or customer-built)
  with owner, role, permissions, data touched, compliance status; blended workforce analytics (agent + human).
- **Gateway** — connects third-party agents through open standards: Model Context Protocol (MCP) for tools,
  agent-to-agent protocols, OpenTelemetry for observability; identity integration with enterprise IdPs.
- **Data Fabric** — zero-copy access to warehouses (Snowflake, Databricks, BigQuery), SQL access, Apache Iceberg
  lakehouse, 3,000+ prebuilt connectors.
- **Studio** — low-code agent builder on top of your data and Meridian's guardrails.
- **Assist** — the conversational front door across Meridian and connected systems (search, generate, run agents).
- **Trust** — human-in-the-loop approvals, immutable audit trail, role-based access, SOC 2 Type II, ISO 27001, GDPR,
  HIPAA-ready, EU/US data residency, no training on customer data, model choice.

### Pricing (consumption-based "Credits")
- Starter — $499/mo (or $399/mo billed annually) — 5,000 credits/mo, 3 agents, 1 workspace, email support.
- Growth — $2,499/mo (or $1,999/mo billed annually) — 30,000 credits/mo, all GA agents, Registry + Gateway, SSO, priority support.
- Enterprise — custom — unlimited agents, custom credit pools, Data Fabric, Studio, dedicated environment, DPA/BAA,
  99.95% SLA, named CSM.
- Credit examples: HR case resolved 2 credits · candidate screened 1 credit · shift filled 1 credit · audit evidence
  package 5 credits · variance commentary 3 credits · contract redline 8 credits · overage $0.12/credit.
- Pricing page needs an interactive credits calculator (inputs: employees, monthly HR cases, hires/month, invoices/month)
  producing a recommended plan + estimated credits and ROI (hours saved).

### Fictional design partners (use for wordmark logos, case studies, quotes)
Northwind Logistics · Halvorsen Health · Bluepeak Energy · Castellan Financial · Orion Retail Group · Verdant Foods ·
Atlas Manufacturing · Summit Bank. Quote authors are fictional titles + fictional names (e.g., "Dana Okafor, VP People
Operations, Halvorsen Health").

## 4. Tech stack (installed by the orchestrator — do not run npm install yourself)
Next.js 16 App Router · React 19 · TypeScript strict · Tailwind CSS v4 (CSS-first @theme tokens) · motion (Framer)
· three + @react-three/fiber + @react-three/drei · lucide-react · radix-ui (unified package) · recharts (prefer custom
SVG when better) · zod · stripe · geist fonts · @vercel/analytics · @vercel/speed-insights · schema-dts · playwright (dev,
for screenshots: `npx playwright screenshot --viewport-size=1440,900 --wait-for-timeout=1500 <url> <out.png>`, add
`--full-page` for full page).
Path alias "@/*" -> "src/*". Node 22. npm. Windows host (forward slashes in code; Git Bash available).
Dependencies are ready when the file node_modules/.install-complete exists.

Next 16 notes: `params`/`searchParams` are Promises (`const { slug } = await params`). Route segment config:
`export const dynamic = "force-dynamic"` for SSE routes. `next/og` ImageResponse for OG images. `proxy.ts` replaces
middleware (we do not need one). `next lint` is gone: run `npx eslint src`. Dev server is Turbopack.

Rules:
- Server Components by default; "use client" only for interactivity. No data-fetching waterfalls.
- Every page exports `metadata` (or generateMetadata) via the shared helper in src/lib/seo/metadata.ts
  (`createMetadata`) once it exists: title, description, canonical, openGraph, twitter.
- All content is SSR HTML (crawlable). No content that only exists after client JS. No content behind tabs that
  search engines cannot read unless it is also in the DOM.
- Images via next/image; SVG inline for icons/illustrations. No external image hotlinks. No stock photos.
- Three.js: dynamic import with ssr:false, lazy on viewport, static poster fallback, respects prefers-reduced-motion,
  caps DPR at 2, pauses when offscreen, never blocks LCP (hero text renders instantly).
- Accessibility: WCAG AA contrast, focus-visible rings, keyboard nav, reduced motion, semantic landmarks, skip link.
- Performance: no layout shift, fonts via next/font with display swap, keep client JS lean, avoid huge client bundles.
- Typecheck must pass: `npx tsc --noEmit`. Lint must pass: `npx eslint src`. Build must pass: `npm run build`
  (only the orchestrator runs the build; agents run tsc + eslint).

## 5. File ownership (edit only what you own; shared files need a note in your report)
- foundation: src/app/layout.tsx, src/app/globals.css, src/components/ui/**, src/components/site/**, src/lib/utils.ts,
  src/lib/site.ts, src/lib/fonts.ts, DESIGN.md, src/app/design-system/** (internal showcase page), public/brand/**
- content: src/content/** (typed data: agents, platform, pricing, faqs, testimonials, customers, articles, glossary, changelog)
- home: src/app/page.tsx, src/components/home/**
- three: src/components/three/**
- agents: src/app/agents/**, src/components/agents/**
- platform: src/app/platform/**, src/components/platform/**
- pricing: src/app/pricing/**, src/components/pricing/**
- security/trust: src/app/security/**, src/app/trust/**
- customers: src/app/customers/**
- resources: src/app/resources/**, src/app/glossary/**, src/components/resources/**
- live: src/app/api/live/**, src/lib/live/**, src/components/live/**, src/app/dashboard/**, src/app/status/**, src/app/changelog/**
- seo: src/app/sitemap.ts, src/app/robots.ts, src/app/manifest.ts, src/app/**/opengraph-image.tsx, src/app/**/twitter-image.tsx,
  src/app/llms.txt/**, src/app/llms-full.txt/**, src/app/feed.xml/**, src/components/seo/**, src/lib/seo/**, public/.well-known/**,
  public/humans.txt, research/seo-geo-plan.md
- auth-billing: src/app/(auth)/**, src/app/api/stripe/**, src/lib/stripe.ts, src/app/api/waitlist/**
- company: src/app/about/**, src/app/contact/**, src/app/legal/**, src/app/not-found.tsx, src/app/careers/**

## 6. Content module contract (src/content) — exact export names other agents import
- src/content/types.ts — all interfaces (Agent, AgentCategory, PlatformPillar, Plan, CreditRate, Faq, Testimonial,
  Customer, CaseStudy, Article, GlossaryTerm, ChangelogEntry, Metric, SeoFields)
- src/content/agents.ts — `export const agents: Agent[]`, `export const agentCategories`, `export function getAgent(slug)`
- src/content/platform.ts — `export const platformPillars: PlatformPillar[]`
- src/content/pricing.ts — `export const plans: Plan[]`, `export const creditRates: CreditRate[]`, `export const pricingFaqs: Faq[]`,
  `export const calculatorDefaults`
- src/content/faqs.ts — `export const homeFaqs: Faq[]`, `export const securityFaqs: Faq[]`
- src/content/testimonials.ts — `export const testimonials: Testimonial[]`
- src/content/customers.ts — `export const customers: Customer[]`, `export const caseStudies: CaseStudy[]`
- src/content/articles.ts — `export const articles: Article[]`, `export function getArticle(slug)`
- src/content/glossary.ts — `export const glossaryTerms: GlossaryTerm[]`
- src/content/changelog.ts — `export const changelog: ChangelogEntry[]`
- src/content/home.ts — `export const homeCopy` (hero headline/sub/CTAs, section eyebrows/titles/ledes, proof stats)
Every entity carries `seo: SeoFields { title (<= 60 chars), description (140-160 chars), keywords: string[] }`.
Article = { slug, title, description, category, publishedAt (ISO), updatedAt, readingMinutes, author: { name, role },
  keyTakeaways: string[], body: string (markdown), faqs: Faq[], relatedAgentSlugs: string[], seo }.

## 7. Quality bar (the gauntlet)
Every page is screenshotted and judged BLIND side-by-side against screenshots of the best sites on the web by a harsh
critic. It passes only when the critic would pick Meridian (or cannot tell which is the reference) and scores >= 9/10 on:
hierarchy · typography · spacing rhythm · color discipline · component craft · motion restraint · copy clarity ·
responsiveness (390px, 768px, 1440px) · zero visual bugs. Expect to be sent back. Fix root causes, not symptoms.

## 8. Phase 2 contracts
See BUILD-NOTES.md for the cross-builder interfaces (Three.js hero component, SSE event schema and hooks, Stripe/waitlist/
contact APIs, markdown renderer, page conventions, dev-server rules). Where BUILD-NOTES.md and §5 differ, BUILD-NOTES wins.
