# Meridian

AI agent software for enterprise HR and finance. Twelve agents do the work; a named human approves anything
consequential. Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript strict, light mode only.

Two of the twelve agents have a **real execution path backed by open-weight LLMs** ([agent runtime](#the-agent-runtime)).
The other ten are specified but not built, and the `/dashboard` feed is a deterministic simulation that says so on the
page. The brand, the design partners and the outcome figures are for this build; the market model behind them comes from
[research/source-briefing.md](research/source-briefing.md).

## What is here

| Area | Routes |
|---|---|
| Agents | `/agents`, `/agents/[slug]` — twelve agents across HR, finance, and legal operations |
| Platform | `/platform`, `/platform/[pillar]` — Registry, Gateway, Data Fabric, Studio, Assist |
| Pricing | `/pricing` — three plans, a credit rate card, and an interactive credits calculator |
| Trust | `/security` — controls, certifications, data flow, shared responsibility |
| Proof | `/customers`, `/customers/[slug]` — eight partners, three full case studies |
| Content | `/resources`, `/resources/[slug]` (8 long-form articles), `/glossary`, `/glossary/[slug]` (34 terms) |
| Live | `/dashboard`, `/status`, `/changelog` |
| Company | `/about`, `/careers`, `/contact`, `/legal/*` |
| Agent API | `POST /api/agents/run`, `GET /api/agents/health` — real LLM-backed runs |

165 pages are prerendered at build time. `/dashboard`, `/status`, `/contact`, `/resources` and `/signup` render on
demand because they read the clock or the query string.

## The agent runtime

Two agents run for real against an open-weight model. No proprietary model is called anywhere in this repository, and
there is no vendor SDK: the only integration surface is the OpenAI-compatible `/v1/chat/completions` API, so switching
serving stacks is an environment change.

### Governance sits below the model

The product's claim is that a prompt instruction is a suggestion and a permission boundary is a control. The runtime
makes that literally true. A run has six stages and the model participates in exactly one.

| Stage | Runs | What happens |
|---|---|---|
| Scope | code | Rows are projected onto the agent's declared field allow-list. Fields outside it are physically absent from the context window, not discouraged by a prompt. |
| Retrieve | code | Exact duplicate keys and three-way-match deltas are computed deterministically. Cheap, exact, auditable. |
| **Reason** | **the LLM** | Judges only the cases code could not settle, and must return JSON matching a zod schema. |
| Decide | code | A policy engine maps each finding to auto-file, needs-approval or rejected. The model has no vote. |
| Act | code | Only non-consequential actions execute. Anything touching money queues for a person. |
| Log | code | A hash-chained audit entry per stage: input hash, model id, output, the policy rule that fired. |

Two properties are load-bearing. **Deterministic first**: the model never sees what code already settled, so a model
outage degrades an agent rather than disabling it. **Fail closed**: no endpoint, or output that will not validate twice,
puts an error on the run. It never falls back to the simulated feed and never invents a finding.

Every finding's evidence is checked against the ids actually retrieved ([schema.ts](src/lib/agents/schema.ts)). A model
citing an invoice it was never shown is treated as a hallucination and discarded.

### Running it

Any OpenAI-compatible endpoint works. Locally, with [Ollama](https://ollama.com):

```bash
ollama pull qwen2.5:3b-instruct
```

```bash
MERIDIAN_MODEL_ENABLED=1 MERIDIAN_MODEL_BASE_URL=http://localhost:11434/v1 MERIDIAN_MODEL=qwen2.5:3b-instruct npm run dev
```

```bash
curl -s localhost:3000/api/agents/health
```

```bash
curl -s -X POST localhost:3000/api/agents/run -H "content-type: application/json" -d "{\"agent\":\"controls\"}"
```

```bash
curl -s -X POST localhost:3000/api/agents/run -H "content-type: application/json" -d "{\"agent\":\"help-desk\",\"question\":\"How many PTO hours can I carry over?\"}"
```

Without `MERIDIAN_MODEL_ENABLED=1` the run returns HTTP 503 with an explanation. That is deliberate.

| Variable | Default | Purpose |
|---|---|---|
| `MERIDIAN_MODEL_ENABLED` | unset | Must be `1`. Explicit opt-in, so nothing guesses. |
| `MERIDIAN_MODEL_BASE_URL` | `http://localhost:11434/v1` | Any OpenAI-compatible base URL |
| `MERIDIAN_MODEL` | `qwen2.5:3b-instruct` | Triage tier: extraction, retrieval-grounded answers |
| `MERIDIAN_MODEL_JUDGMENT` | falls back to `MERIDIAN_MODEL` | Judgment tier: finance decisions |
| `MERIDIAN_MODEL_API_KEY` | unset | Only for hosted endpoints. Local runtimes need none. |
| `MERIDIAN_MODEL_TIMEOUT_MS` | `120000` | CPU inference on a small model can exceed a minute |
| `MERIDIAN_MODEL_TEMPERATURE` | `0` | Finance work should not vary between runs |

### Models and serving

Open weights only. The registry in [models.ts](src/lib/agents/models.ts) is documentation rather than a dependency: any
id your endpoint serves works, so a newer model needs no code change.

| Tier | Suggested | Licence | Why |
|---|---|---|---|
| Triage | Qwen2.5 3B / Llama 3.1 8B / Mistral NeMo 12B | Apache-2.0, Llama Community | Extraction and grounded answers on a laptop |
| Judgment | Qwen2.5 32B / Llama 3.3 70B / DeepSeek-V3 | Apache-2.0, Llama Community, DeepSeek | Finance judgment calls |

Serving stacks, all OpenAI-compatible: Ollama, vLLM, llama.cpp and Hugging Face TGI locally; Together, Groq, Fireworks
and OpenRouter hosted. vLLM and llama.cpp can additionally constrain output to the schema through guided decoding or
GBNF grammars.

### What a run looks like

A Controls Agent run over the 20-invoice fixture, on Qwen2.5 3B:

```
population 20 | settled in code 3 | referred to model 1 | 17.9s | 0 repairs
0 scope     Read 20 invoices under ap.invoices(13 fields). Withheld 3: approverEmail, bankAccountLast4, preparerNationalId
1 retrieve  3 exceptions settled deterministically; 1 ambiguous pair referred to the model
2 reason    Model reviewed 1 unresolved case and returned 1 finding
3 decide    4 findings ruled: 4 need a person, 0 rejected by policy
4 act       0 filed automatically, 4 queued for human approval, 0 payments touched
5 log       Run sealed
```

**A measured limitation.** On that run the 3B model flagged INV-2331 as a duplicate of INV-2332. It is not: they are
phase 1 and phase 2 of one fixture, on different purchase orders, and the prompt excludes phased billing explicitly. A
3B model is too weak for this judgment, which is what the judgment tier exists for. It is also the clearest argument for
the architecture: the model was wrong, and nothing happened, because a finding is not an action.

### Implemented agents

| Agent | Shape | The model's job |
|---|---|---|
| `controls` | Exception detection over an AP population | Settle near-duplicates that exact matching could not |
| `help-desk` | Retrieval-grounded question answering | Answer from retrieved policy sections, with citations |

The fixtures in [fixtures.ts](src/lib/agents/fixtures.ts) stand in for a customer's ERP and handbook. They deliberately
carry fields no agent may read, so the scoping has something real to withhold.

## Real-time

`/dashboard` streams a **simulated** Meridian workspace over Server-Sent Events. This is separate from the agent
runtime above: the feed is generated, not produced by a model, and the page says so.

- `GET /api/live/events` — SSE. A `snapshot` on connect, an `agent-event` every 1.5 to 4 seconds, `metrics` every 5
  seconds, a comment heartbeat every 15, and a self-close at 55 seconds so the platform's function ceiling is never the
  thing that ends the stream. `EventSource` reconnects on its own.
- `GET /api/live/snapshot` — the same payload as JSON, used for the server render and as the polling fallback.
- `GET /api/live/status` — component health, 90-day uptime, and latency for `/status`.

Everything the feed shows is a pure function of a timestamp ([src/lib/live/generator.ts](src/lib/live/generator.ts)),
so the server render and the first client render agree and a reconnecting client sees a coherent history. The client
hook tears the connection down while the tab is hidden and falls back to polling after three consecutive failures.

## The hero object

The home hero is a globe drawn as a graticule: 24 longitude arcs that stop short of the poles, five latitude rings, and
one accent meridian that does **not** rotate. The globe turns past that line, and each of the twelve agent nodes pulses
as it crosses. Work passes through the governed line and is checked.

It is gated hard. WebGL mounts only on a viewport at least 768px wide, without `prefers-reduced-motion`, with WebGL
available, and only once the container is in view and the browser is idle. Everyone else gets
`public/brand/hero-poster.svg`, generated from the same constants by `node scripts/build-hero-poster.mjs`. The canvas
pauses when it scrolls out of view and when the tab is hidden. The Three.js chunk is 231 KB gzipped and never blocks
the largest contentful paint.

## SEO and GEO

Every route exports metadata through [`createMetadata`](src/lib/seo/metadata.ts): canonical, Open Graph, Twitter card,
robots. JSON-LD is built with `schema-dts` and covers Organization, WebSite, WebPage, BreadcrumbList, Product, HowTo,
FAQPage, Article, ItemList, DefinedTerm, and SoftwareApplication with offers. Open Graph images are generated per route
with `next/og`.

For generative engines: `/llms.txt` is a structured summary with citable facts and a URL for every page, and
`/llms-full.txt` carries the full article bodies, agent descriptions, FAQs, and glossary definitions. Articles open with
a direct answer, define terms before using them, and carry a standalone key-takeaways block. The plan is in
[research/seo-geo-plan.md](research/seo-geo-plan.md); the rules page builders followed are in
[research/geo-writing-guide.md](research/geo-writing-guide.md).

All page content is server-rendered HTML. Nothing meaningful appears only after client JavaScript runs.

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000 and needs no configuration. Two optional extras: Stripe keys from
`.env.example` turn on real checkout (without them `/api/stripe/checkout` answers `{ demo: true }` and the pricing
page says so inline), and the model variables above turn on the [agent runtime](#the-agent-runtime).

| Command | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint over `src` |

## Deploying to Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). The framework preset, build command, and output
directory are all detected. Set `NEXT_PUBLIC_SITE_URL` to the final origin (it drives canonicals, Open Graph URLs, the
sitemap, and `llms.txt`); everything else is optional. Add the Stripe keys from `.env.example` only when you want real
checkout. Attach a custom domain in the project's Domains tab, then update `NEXT_PUBLIC_SITE_URL` to match and redeploy
so the canonicals follow.

## Quality checks

```bash
node scripts/audit.mjs --base http://localhost:3100          # metadata, headings, JSON-LD, a11y across 30 routes
node scripts/gauntlet/run.mjs shoot --base http://localhost:3100
node scripts/gauntlet/run.mjs pair                             # randomized blind A/B composites vs reference sites
```

The gauntlet screenshots every page and pairs it, in randomized order, against captures of the best sites on the web, so
a reviewer judging the composite cannot tell which panel is Meridian. `scripts/gauntlet/decode.mjs` maps a verdict back.
The reference captures are other companies' copyrighted page designs, so they stay out of the repository.

## Where the rules live

- [BRIEF.md](BRIEF.md) — brand, product architecture, pricing, file ownership, quality bar
- [DESIGN.md](DESIGN.md) — the visual system: type scale, OKLCH tokens, spacing, motion, component specs, anti-patterns
- [BUILD-NOTES.md](BUILD-NOTES.md) — contracts between modules: the live event schema, the billing endpoints, page conventions
- [research/competitive-analysis.md](research/competitive-analysis.md) — what the best B2B and AI sites do, and why

## Licence

MIT, see [LICENSE](LICENSE).
