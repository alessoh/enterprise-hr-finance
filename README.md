# Meridian

Marketing and subscription website for **Meridian**, AI agent software that runs HR and finance operations for
enterprises. Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript strict. Light mode only.

Meridian is the brand, the twelve agents, the platform layer, the pricing, and the eight design partners are for this build; the market model behind them comes from the briefing in
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

165 pages are prerendered at build time. `/dashboard`, `/status`, `/contact`, `/resources` and `/signup` render on
demand because they read the clock or the query string.

## Real-time

`/dashboard` streams a simulated Meridian workspace over Server-Sent Events.

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

The site runs at http://localhost:3000. Copy `.env.example` to `.env.local` if you want live Stripe Checkout; without
those keys `/api/stripe/checkout` answers `{ demo: true }` and the pricing page says so inline. Nothing else needs
configuration.

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
