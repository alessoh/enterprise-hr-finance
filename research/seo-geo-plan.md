# Meridian SEO + GEO plan

Owner: seo agent. Scope: strategy and technical infrastructure for the Meridian marketing site
(Next.js 16 App Router on Vercel). Companion: `research/geo-writing-guide.md` (rules for page builders).
Code: `src/lib/seo/**`, `src/components/seo/**`, `src/app/{sitemap,robots,manifest}.ts`, OG image routes,
`/llms.txt`, `/llms-full.txt`, `/feed.xml`, `public/.well-known/security.txt`, `public/humans.txt`.

## 0. Thesis

Buyers of HR and finance software search in two modes: a CFO or CHRO asks an LLM search engine
"which AI agents can close the books faster" (informational, answer-engine), and a project owner
searches Google for "AI payroll agent pricing" (commercial, ten blue links). Meridian wins both with
the same asset: dense, dated, entity-consistent pages where every claim is one quotable sentence with a
number and a URL. SEO gets the page ranked; GEO gets the sentence cited. Nothing on the site exists
only in client JavaScript.

Three things matter most, in order:

1. Entity consistency. "Meridian" (never "Meridian AI"), the twelve agent names, the six platform names,
   the three plan names and prices, and the certification list are spelled identically on every page,
   in JSON-LD, in `llms.txt`, and in the feed. LLMs resolve entities by string agreement.
2. Citable facts. Every outcome figure appears as a standalone sentence with the modeled-outcome caveat
   nearby (BRIEF section 2). `src/lib/seo/facts.ts` is the canonical list; pages and `llms.txt` read it.
3. Crawlable structure. One H1, sequential H2/H3, FAQ blocks in the DOM with `FAQPage` schema, tables
   for comparisons, key-takeaway blocks at the top of long pages, dates on everything editorial.

## 1. Keyword map

Intent: C = commercial, I = informational, N = navigational. Primary keyword drives title and H1;
secondaries appear in H2s, ledes, FAQ questions, and internal anchor text. Volumes are not listed:
the category is young and tools disagree; direction matters more than counts.

### Static routes

| Route | Primary | Secondary (3-5) | Intent |
|---|---|---|---|
| `/` | AI agents for HR and finance | enterprise AI agents; governed AI agents; HR automation agents; finance automation AI; agentic HR software | C |
| `/agents` | AI agents for HR | AI agents for finance; HR AI agent catalog; payroll AI agent; audit AI agent; recruiting AI agent | C |
| `/platform` | enterprise AI agent platform | agent governance platform; agent system of record; agent orchestration enterprise; AI agent management | C/I |
| `/platform/registry` | agent system of record | AI agent registry; agent inventory; agent permissions and ownership; blended workforce analytics | I/C |
| `/platform/gateway` | agent gateway | Model Context Protocol enterprise; MCP gateway; agent-to-agent protocol; OpenTelemetry for agents | I/C |
| `/platform/data-fabric` | zero-copy data for AI agents | Snowflake AI agents; Databricks AI agents; Apache Iceberg lakehouse; prebuilt connectors | C |
| `/platform/studio` | low-code AI agent builder | enterprise agent builder; build HR agents; agent guardrails; no-code finance agents | C |
| `/platform/assist` | enterprise AI assistant for HR and finance | conversational front door; enterprise search for agents; run agents from chat | C |
| `/security` | AI agent security and compliance | human-in-the-loop AI; AI agent audit trail; SOC 2 AI agents; no training on customer data; data residency AI | C/I |
| `/pricing` | AI agent pricing | consumption pricing AI agents; AI agent credits; AI agent cost calculator; AI agent ROI calculator | C |
| `/customers` | AI agent case studies HR finance | AI agents healthcare HR; AI agents logistics finance; AI close case study; design partner results | C |
| `/resources` | guides to AI agents in HR and finance | how to govern AI agents; AI agent ROI; agent system of record explained; MCP for enterprise | I |
| `/glossary` | AI agent glossary | agentic HR terms; finance automation terms; what is an agent system of record; what is MCP | I |
| `/changelog` | Meridian changelog | Meridian release notes; new agents; general availability | N |
| `/status` | Meridian status | Meridian uptime; Meridian incidents | N |
| `/dashboard` | AI agent operations dashboard | live agent activity feed; agent approvals queue; agent metrics demo | C/I |
| `/about` | Meridian Systems | about Meridian; who builds Meridian | N |
| `/careers` | Meridian careers | Meridian jobs; AI research HR finance jobs | N |
| `/contact` | Meridian demo | contact Meridian sales; AI agent pilot | C/N |
| `/legal/privacy` | Meridian privacy policy | GDPR; CCPA | N |
| `/legal/terms` | Meridian terms of service | subscription terms; credits | N |
| `/legal/dpa` | Meridian DPA | data processing addendum; GDPR processor terms | N |
| `/legal/subprocessors` | Meridian subprocessors | subprocessor list; data locations | N |

### Dynamic routes

| Route | Primary pattern | Secondary pattern | Intent |
|---|---|---|---|
| `/agents/help-desk` | HR help desk AI agent | HR case deflection; employee self-service AI; HR ticket automation; HR chatbot alternative | C |
| `/agents/recruiting` | AI recruiting agent | candidate screening AI; AI interview scheduling; resume screening automation; recruiter review time | C |
| `/agents/payroll` | AI payroll agent | payroll compliance automation; pre-payroll audit; payroll error detection; wage law updates | C |
| `/agents/scheduling` | AI shift scheduling | open shift automation; frontline shift filling; workforce scheduling AI; shift coverage | C |
| `/agents/performance` | AI performance review agent | performance review drafting; evidence-based reviews; performance management AI | C |
| `/agents/job-architecture` | job architecture AI | pay band benchmarking; compensation benchmarking automation; role leveling; pay drift | C |
| `/agents/audit` | AI audit evidence agent | audit evidence collection automation; PBC list automation; SOX evidence; internal audit AI | C |
| `/agents/planning` | AI FP&A agent | variance analysis AI; variance commentary automation; budget vs actual explanation; conversational planning | C |
| `/agents/controls` | AI financial controls | duplicate payment detection; continuous controls monitoring; transaction anomaly detection; policy breach detection | C |
| `/agents/close` | AI month-end close | financial close automation; close checklist automation; reconciliation AI; close sign-off routing | C |
| `/agents/revenue-contracts` | revenue contract AI | ASC 606 automation; revenue recognition AI; contract revenue risk; IFRS 15 | C |
| `/agents/contract-review` | AI contract review | contract redlining AI; playbook redlining; third-party paper review; pre-signature review | C |
| `/customers/[slug]` | {industry} AI agents case study | {agent} results; {outcome} case study; {region} data residency | C |
| `/resources/[slug]` | article title noun phrase | article `seo.keywords` (content owns) | I |
| `/glossary/[slug]` | what is {term} | {term} definition; {term} in HR/finance; {term} example | I |

## 2. On-page specification

Rendered titles include the layout template suffix " · Meridian" (11 characters). Budget: title <= 60
rendered, description 140-160. Pass plain titles to `createMetadata`; it strips any "| Meridian" the
content already carries. Home uses `titleAbsolute`. Schema builders live in `src/lib/seo/jsonld.ts`;
`Organization` and `WebSite` are global (`<GlobalJsonLd />` in the root layout) and are not repeated.

### Static routes

| Route | Title (rendered) | Description | H1 | Schema | Internal links (must-have) |
|---|---|---|---|---|---|
| `/` | Meridian · AI agents that run HR and finance | Twelve narrow, governed AI agents for HR and finance: help desk, recruiting, payroll, audit, close, and more. A person approves every consequential action. | AI agents that run HR and finance. | SoftwareApplication, FAQPage, ItemList (agents) | /agents, all 12 agents, /platform, /security, /pricing, /customers, /dashboard, /resources |
| `/agents` | AI agents for HR, finance, and legal · Meridian | Twelve governed AI agents for HR, finance, and legal operations. Each is scoped to one workflow, logs every action, and reports a measurable outcome. | One agent per workflow. Twelve workflows. | ItemList, BreadcrumbList, WebPage | 12 agent pages, /platform/registry, /pricing, /security |
| `/platform` | Agent platform: Registry, Gateway, Data Fabric · Meridian | Meridian's platform governs every agent in the enterprise: Registry as the system of record, Gateway for MCP, Data Fabric, Studio, Assist, and Trust. | The layer under the agents. | WebPage, ItemList (pillars), BreadcrumbList, FAQPage | 5 pillar pages, /security, /agents, /glossary/agent-system-of-record |
| `/platform/registry` | Registry: the agent system of record · Meridian | One registry for every agent, whether built by Meridian, a partner, or you: owner, role, permissions, data touched, compliance status, and workforce analytics. | Registry | WebPage, FAQPage, BreadcrumbList | /platform/gateway, /glossary/agent-system-of-record, /glossary/agent-registry, /resources/what-is-an-agent-system-of-record, /security |
| `/platform/gateway` | Gateway: connect any agent over MCP · Meridian | Gateway connects third-party agents through Model Context Protocol, agent-to-agent protocols, and OpenTelemetry, with identity from your enterprise IdP. | Gateway | WebPage, FAQPage, BreadcrumbList | /platform/registry, /glossary/model-context-protocol-mcp, /resources/model-context-protocol-for-enterprise-agents, /security |
| `/platform/data-fabric` | Data Fabric: zero-copy data for agents · Meridian | Zero-copy access to Snowflake, Databricks, and BigQuery, SQL access, an Apache Iceberg lakehouse, and 3,000+ prebuilt connectors. Agents read data in place. | Data Fabric | WebPage, FAQPage, BreadcrumbList | /glossary/zero-copy-data-sharing, /glossary/apache-iceberg, /platform/studio, /security |
| `/platform/studio` | Studio: low-code agent builder · Meridian | Build governed agents on your data with Studio. Low-code steps, approval blocks, and Meridian's guardrails, registered in Registry from the first run. | Studio | WebPage, FAQPage, BreadcrumbList | /platform/registry, /platform/data-fabric, /agents, /pricing |
| `/platform/assist` | Assist: the conversational front door · Meridian | Assist is the conversational front door across Meridian and connected systems. Search, generate, and run agents from one place, with every action logged. | Assist | WebPage, FAQPage, BreadcrumbList | /agents, /platform/gateway, /security, /dashboard |
| `/security` | Security and trust: governed by design · Meridian | Human-in-the-loop approvals, immutable audit trail, SOC 2 Type II, ISO 27001, GDPR, HIPAA-ready, EU and US data residency, and no training on customer data. | Governed by design. | WebPage, FAQPage, BreadcrumbList | /legal/dpa, /legal/subprocessors, /platform/registry, /glossary/soc-2-type-ii, /glossary/iso-27001, /status |
| `/pricing` | Pricing: consumption credits from $499/mo · Meridian | Starter $499/mo, Growth $2,499/mo, Enterprise custom. Credits are consumed per case resolved, candidate screened, or evidence package. Try the ROI calculator. | Pay for work completed. | SoftwareApplication (offers), FAQPage, BreadcrumbList | /agents, /security, /contact, /glossary/consumption-pricing-credits, /resources/consumption-pricing-for-ai-agents-explained |
| `/customers` | Customer stories from design partners · Meridian | Case studies from eight design partners in healthcare, logistics, finance, retail, energy, food, manufacturing, and banking, with the outcomes each measured. | Measured outcomes from design partners. | ItemList, BreadcrumbList, WebPage | 8 customer pages, agents named in each story |
| `/resources` | Resources: guides to governed AI agents · Meridian | Explainers, governance frameworks, finance operations guides, and buying advice for teams deploying AI agents in HR and finance. Dated and kept current. | Guides for teams putting agents to work. | CollectionPage or ItemList, BreadcrumbList | all articles, /glossary, /agents |
| `/glossary` | Glossary of agentic HR and finance terms · Meridian | Plain definitions of the terms behind governed AI agents in HR and finance: agent system of record, MCP, human-in-the-loop, month-end close, SOC 2, and more. | Glossary | DefinedTermSet, BreadcrumbList | all 34 terms, related agents per term |
| `/changelog` | Changelog: what shipped · Meridian | Dated release notes for Meridian agents, platform, security, and pricing. New agents, general availability milestones, fixes, and policy changes. | Changelog | WebPage, BreadcrumbList | agents named per entry, /status, /feed.xml |
| `/status` | Status: uptime and incidents · Meridian | Live service status for Meridian agents, Registry, Gateway, Data Fabric, and Assist. Current uptime, incident history, and scheduled maintenance. | Status | WebPage | /security, /changelog, /contact |
| `/dashboard` | Live demo: agent operations dashboard · Meridian | Watch Meridian agents work on a sample company in real time: the operations feed, approvals queue, and live metrics for cases, shifts, and close tasks. | Agents at work, live. | WebPage | /agents, /platform/registry, /signup |
| `/about` | About Meridian · Meridian | Meridian Systems, Inc. builds narrow, governed AI agents for HR and finance. Why we started with one workflow per agent, and how we define accountability. | About Meridian | AboutPage, BreadcrumbList | /careers, /contact, /security, /customers |
| `/careers` | Careers at Meridian · Meridian | Open roles at Meridian across research, engineering, design, and go-to-market. Build governed agents for the work HR and finance teams actually do. | Careers | WebPage (JobPosting per role), BreadcrumbList | /about, /contact |
| `/contact` | Contact sales or book a demo · Meridian | Talk to Meridian about a pilot, book a demo, or reach the security team. Tell us your systems and we will map agents to the workflows that pay back first. | Talk to Meridian | ContactPage, BreadcrumbList | /pricing, /security |
| `/legal/privacy` | Privacy policy · Meridian | How Meridian Systems, Inc. collects, uses, and protects personal data across the website and product, and how to exercise your rights under GDPR and CCPA. | Privacy policy | WebPage | /legal/dpa, /legal/subprocessors |
| `/legal/terms` | Terms of service · Meridian | The terms governing use of the Meridian website and subscription services, including plans, credits, acceptable use, warranties, liability, and termination. | Terms of service | WebPage | /pricing, /legal/privacy |
| `/legal/dpa` | Data processing addendum · Meridian | Meridian's data processing addendum for customers subject to GDPR and similar regimes: roles, subprocessors, transfers, security measures, and audits. | Data processing addendum | WebPage | /legal/subprocessors, /security |
| `/legal/subprocessors` | Subprocessors · Meridian | Current subprocessors that process customer data on Meridian's behalf, with purpose, location, and the date each was added. Subscribe to change notices. | Subprocessors | WebPage | /legal/dpa, /security |

Note: `/about` and `/careers` render "About Meridian · Meridian"; acceptable, or pass `titleAbsolute`
with "About Meridian" and "Careers at Meridian" to avoid the repeat. Recommended: `titleAbsolute`.

### Dynamic routes (patterns; content `seo` fields are the source of truth)

| Route | Title | Description | H1 | Schema | Internal links |
|---|---|---|---|---|---|
| `/agents/[slug]` | `agent.seo.title` (suffix stripped) | `agent.seo.description` | `agent.name` | Product, FAQPage, HowTo (howItWorks), BreadcrumbList | `relatedAgentSlugs`, /platform/registry, /pricing (credit row), glossary terms via `getGlossaryTermsForAgent`, customers via `getCustomersForAgent` |
| `/customers/[slug]` | `caseStudy.seo.title` | `caseStudy.seo.description` | `caseStudy.title` (result-led) | WebPage, BreadcrumbList; quote as `Quotation` optional | agents in `customer.agentSlugs`, /customers, /pricing |
| `/resources/[slug]` | `article.seo.title` | `article.seo.description` | `article.title` | Article, FAQPage, BreadcrumbList | `relatedAgentSlugs`, 2-3 glossary terms, one platform pillar, /resources |
| `/glossary/[slug]` | "What is {term}?" or `term.seo.title` | `term.seo.description` | `term.term` | DefinedTerm, BreadcrumbList, FAQPage if the page adds Q&A | `relatedTerms`, `relatedAgentSlugs`, /glossary |

Worked example, `/agents/close`: title "Month-End Close Agent · Meridian" (32), H1 "Close Agent",
lede = one-line job, schema `productJsonLd(agent)`, `faqJsonLd(agent.faqs)`,
`howToJsonLd({ name: "How the Close Agent works", steps: agent.howItWorks, path })`,
`breadcrumbJsonLd([{ name: "Agents", path: "/agents" }, { name: agent.name, path }])`.

## 3. Technical checklist

Infrastructure (done in this pass, verify after the orchestrator's build):

- [x] `metadataBase` + title template via `rootMetadata` (foundation must adopt it in `layout.tsx`).
- [x] Absolute canonicals on every page via `createMetadata`; self-referencing, no query strings.
- [x] `sitemap.xml`: static + agents + platform + customers + articles + glossary with `lastModified`.
- [x] `robots.txt`: allow all, disallow `/api/`, `/design-system`, `/login`, `/signup`; sitemap; host.
      AI crawlers named explicitly and allowed.
- [x] noindex on `/login`, `/signup`, `/design-system` (`createMetadata({ noIndex: true })`, owners must call it).
- [x] OG images 1200x630 for root and every content route; `alt`, `size`, `contentType` exported;
      `generateStaticParams` on dynamic routes so images are built ahead of time.
- [x] JSON-LD: Organization + WebSite global; page-level builders for every type in the table above.
- [x] `manifest.webmanifest` with DESIGN.md colors.
- [x] `/llms.txt`, `/llms-full.txt` (text/markdown, revalidate 3600), `/feed.xml` (RSS 2.0, revalidate 3600).
- [x] `/.well-known/security.txt` (RFC 9116), `/humans.txt`.
- [x] RSS autodiscovery `<link rel="alternate" type="application/rss+xml">` on every page.
- [ ] `src/app/icon.svg` and `src/app/apple-icon.tsx` (manifest references them; foundation owns brand assets).
- [ ] `not-found.tsx` returns a real 404 status with links to /agents, /pricing, /resources (company agent).
- [ ] Redirects: none needed at launch. If `/trust` ships, 308 it to `/security` in `next.config` (orchestrator).
- [ ] Trailing slashes: leave Next default (no trailing slash). Never link with a trailing slash.
- [ ] `hreflang`: not needed; single locale `en-US`. Declare `lang="en"` on `<html>` (done in layout).

Rendering and content:

- One `<h1>` per page. Heading levels never skip. Eyebrows are `<p>`, not headings.
- All primary content in server-rendered HTML. Accordions and tabs keep every panel in the DOM
  (hidden with CSS, `aria-expanded`), so FAQ answers and platform tab copy are crawlable.
- Three.js hero: `dynamic(..., { ssr: false })`, static poster, never part of LCP. Hero H1 and lede are
  plain HTML that paints first.
- Every `next/image` has width/height or `fill` with a sized parent. No CLS from fonts: `next/font`
  with `display: swap` and `adjustFontFallback`.
- Links are `<a href>` (next/link), never `onClick` navigation. Footer links every top-level route.
- Breadcrumbs on every page below the top level, visible and in `BreadcrumbList`.
- Dates: articles show published and updated dates in the DOM and in `Article` schema; changelog entries
  carry `<time datetime>`.
- Footnote text "Modeled outcomes from design-partner deployments." adjacent to every outcome figure.

Core Web Vitals targets (p75, mobile, field data): LCP < 2.0 s, CLS < 0.05, INP < 200 ms.
Budgets: hero route JS < 180 kB gzipped before the 3D chunk; 3D chunk lazy, < 350 kB, loaded on
viewport intersection; fonts <= 3 files; no third-party scripts besides `@vercel/analytics` and
`@vercel/speed-insights`. Verify with `npx playwright screenshot` for paint and PageSpeed Insights
against the production URL after each deploy.

## 4. GEO plan (Generative Engine Optimization)

Goal: when ChatGPT, Claude, Perplexity, Gemini, or Google AI Overviews answer questions about AI agents
for HR or finance, Meridian is named, quoted accurately, and linked.

1. `llms.txt` and `llms-full.txt`. Index and full corpus, regenerated hourly from the content modules
   so they never drift from the pages. Sections: definition, what Meridian is, agents, platform, pricing,
   key facts, pages, resources, customers, glossary, machine-readable links. Linked from `robots.txt`
   (via sitemap discovery), `humans.txt`, and the footer (foundation: add a small "llms.txt" link).
2. Citable facts. `src/lib/seo/facts.ts` holds eleven canonical sentences with the substantiating URL
   and a `modeled` flag. Page builders render the relevant sentence verbatim in the page body (usually
   the lede or a "Key facts" list), not paraphrased. One fact, one sentence, one number, one URL.
3. Definitional openers. Every agent, pillar, glossary, and article page opens with a sentence of the
   form "{Entity} is {category} that {does what} for {whom}." Answer engines lift the first 40-60 words.
4. FAQ blocks with `FAQPage` schema. 4-5 questions phrased the way buyers ask ("How does the Payroll
   Agent catch errors before the run?"). Answers 40-90 words, first sentence answers directly.
5. Tables for anything comparable: plans, credit rates, agent catalog (name, job, metric, status),
   certifications, connector families. LLMs extract tables more reliably than prose.
6. Entity consistency. Names from BRIEF section 2 and 3, verbatim. Never "Meridian AI", never "the
   Close agent" lowercase. Plan names and prices only from `src/content/pricing.ts`.
7. Author and organization signals. `Organization` with `legalName`, `sameAs`, `contactPoint`; articles
   carry a named author with a role and `worksFor`; `humans.txt` and `security.txt` present.
8. Dated content. `datePublished` and `dateModified` in schema and in the DOM; changelog and feed give
   crawlers a freshness signal every release.
9. Key-takeaway blocks. Articles open with 3-5 bullet takeaways (already in the content contract);
   agent pages get a three-line "In brief" (job, headline metric with caveat, status).
10. No JS-only content. Calculator results, live dashboard numbers, and 3D scenes are extras; every
    claim they visualize also exists as text.
11. Crawler access. `robots.txt` names GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot,
    Google-Extended, and others with `Allow: /`. No bot-blocking at the CDN for these agents.
12. Question-shaped H2s on explainer content ("What does an agent system of record record?") so a
    heading plus its first paragraph forms a complete answer unit.

## 5. Measurement plan

Baseline in week 1 after launch, then weekly.

| Signal | Source | Target (90 days) |
|---|---|---|
| Indexed pages | Google Search Console coverage | 100% of sitemap URLs indexed, 0 "crawled, not indexed" for money pages |
| Rich results | GSC enhancements: FAQ, Breadcrumb, Product, Article | 0 errors; FAQ eligible on all agent, pricing, security, article pages |
| Rankings | GSC queries filtered to the keyword map | Top 10 for 12 agent primaries and "agent system of record"; top 3 for brand terms |
| CWV | GSC Core Web Vitals + Vercel Speed Insights | 100% "good" URLs on mobile and desktop |
| LLM citations | Weekly manual panel: 20 prompts across ChatGPT, Claude, Perplexity, Gemini, Google AI mode (e.g., "AI agent for month-end close", "what is an agent system of record", "AI payroll compliance agent pricing") | Meridian named in >= 8 of 20 with a correct fact and URL; no misattributed numbers |
| AI referrals | Vercel Analytics referrers: chatgpt.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com | Tracked from day 1; report share of demo requests |
| llms.txt fetches | Vercel logs / analytics on `/llms.txt`, `/llms-full.txt` by user agent | Non-zero weekly fetches from GPTBot, ClaudeBot, PerplexityBot |
| Conversions | `/contact?intent=demo` submits and `/signup` starts by landing page | Agent pages and pricing drive >= 60% of demo requests |

Review cadence: weekly dashboard (GSC + Analytics + citation panel), monthly content refresh of the
two weakest-performing agent pages and one article, quarterly re-audit of this document.

## 6. Decisions recorded (no questions asked)

- Layout template separator is " · " (middle dot). `siteName` is "Meridian". Home title is absolute.
- Trust pillar lives at `/security` (BRIEF ownership); `/platform/trust` is not a route and is excluded
  from the sitemap.
- `/dashboard` is indexed (public live demo). `/status` and `/changelog` are indexed and in the feed.
- OG title face: Newsreader when `public/brand/fonts/Newsreader-Regular.ttf` exists (foundation may
  add it), otherwise Geist Medium. Geist TTFs are read from the `geist` package; nothing is fetched
  from the network at build time.
- `SoftwareApplication` carries plan offers; each agent page uses `Product` with an `AggregateOffer`
  spanning the priced plans. Early-access agents are still `Product`; status is stated in text.
- Google's `query-input` SearchAction extension is typed locally; `/resources?q=` is the target and
  the resources page should read `searchParams.q` to filter (resources owner).
- `keywords` meta is emitted (harmless for Google, used by some answer engines' extractors).
- Outcome sentences in `facts.ts` carry `modeled: true` and the caveat is printed under every key-facts
  list; `llms.txt` appends "(modeled outcome)" inline.
