# BUILD-NOTES — cross-builder contracts (Phase 2: pages)

Read BRIEF.md and DESIGN.md first. This file defines the interfaces between builders so everyone can work in parallel.
If you own one side of a contract, implement it exactly. If you consume it, import it by these names even if the file
does not exist yet; it will by the time the orchestrator builds.

## Page conventions (every page)
- `export const metadata = createMetadata({...})` or `generateMetadata` using `createMetadata` from `@/lib/seo/metadata`
  (see src/lib/seo/metadata.ts for the exact signature). Titles are plain (layout adds " · Meridian").
- JSON-LD: import builders from `@/lib/seo/jsonld` and render with `<JsonLd data={...} />` from `@/components/seo/JsonLd`.
  Use `breadcrumbJsonLd`, `faqJsonLd`, `productJsonLd`, `articleJsonLd`, `webPageJsonLd`, `itemListJsonLd` as relevant.
- UI: `Container`, `Section`, `SectionHeader`, `Button`, `Badge`, `Card`, `Stat`, `Accordion`, `Tabs`, `Breadcrumbs`,
  `Footnote`/`Footnotes`, `WindowFrame`, `Reveal`, `AnimatedNumber`, `ArrowLink`, `LogoWall`, patterns — all from
  `@/components/ui/*` (foundation). Read the actual files before using them; do not reinvent primitives.
- Markdown fields (longDescription, definition, challenge, body, ...) render through `<Markdown>` from
  `@/components/content/markdown` (react-markdown + GFM + heading slugs, styled by `.prose-meridian`).
- Footnote pattern (DESIGN.md §6): every outcome metric carries a superscript marker; the page ends with the Footnotes list
  using `modeledOutcomeFootnote` from `@/content/pricing` or the agent/home copy footnote text.
- Copy comes from `src/content/*` — never hardcode product facts that exist in content modules.
- Accessibility + SEO: one H1 per page; semantic sections with `aria-labelledby`; all interactive content also in DOM.
- Loading/empty states where data is live. `not-found()` for unknown slugs. `generateStaticParams` for dynamic routes.

## Three.js hero (owner: three builder; consumer: home builder)
- `src/components/three/hero-meridian.tsx` exports `HeroMeridian({ className }: { className?: string })` — a client
  component that renders the poster `<img src="/brand/hero-poster.svg">` immediately and lazily mounts the WebGL scene
  (dynamic import, ssr:false) per DESIGN.md §7 (reduced motion, < 768px, no WebGL → poster only; pause offscreen/hidden).
- `src/components/three/meridian-scene.tsx` is the R3F scene (24 meridians, prime meridian in accent, 12 nodes pulsing
  when crossing the prime meridian, pointer parallax on desktop).
- `public/brand/hero-poster.svg` — static faithful render, same palette and tilt, ~< 40KB.
- Optional: `src/components/three/registry-orbit.tsx` small secondary visual for /platform/registry (only if budget allows).
- The home builder renders `<HeroMeridian className="..." />` in the hero's right column (aspect-square container,
  max 640px). Until the three builder's file exists, home may render a placeholder div with the same size.

## Live / real-time (owner: live builder; consumers: home, status, dashboard)
- `GET /api/live/events` — Server-Sent Events. `export const dynamic = "force-dynamic"`, `runtime = "nodejs"`,
  `maxDuration = 60`. Headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache, no-transform`,
  `Connection: keep-alive`, `X-Accel-Buffering: no`. Emits:
  - `event: snapshot` once on connect: `{ events: AgentEvent[] (last 12), metrics: LiveMetrics }`
  - `event: agent-event` every 1.5–4s: `AgentEvent`
  - `event: metrics` every 5s: `LiveMetrics`
  - comment heartbeat `: ping` every 15s; the stream closes itself after ~55s (Vercel-friendly); EventSource reconnects.
  - honors `Last-Event-ID` loosely (no replay required).
- Types in `src/lib/live/types.ts`:
  `AgentEvent { id: string; ts: string (ISO); agentSlug: string; agentName: string; category: "hr"|"finance"|"legal";
   kind: "resolved"|"flagged"|"drafted"|"approved"|"scheduled"|"collected"|"reconciled"|"screened"; title: string;
   detail: string; amount?: number; credits: number; customer: string; needsApproval?: boolean }`
  `LiveMetrics { casesResolvedToday: number; hoursSavedToday: number; creditsUsedToday: number; activeAgents: number;
   approvalsPending: number; uptime30d: number; p95LatencyMs: number; asOf: string }`
- `src/lib/live/generator.ts` — deterministic, realistic event generator (fictional partners, 2026 dates, amounts with
  cents, IDs like CASE-48211 / INV-2291 / REQ-1187); `getInitialSnapshot(now: number)` must be pure so server and client agree.
- `src/lib/live/use-live-events.ts` — `useLiveEvents(initial?)` returns `{ events, metrics, status: "connecting"|"live"|
  "reconnecting"|"paused", lastEventAt }`; uses EventSource with backoff; pauses on `document.hidden`; falls back to
  polling `GET /api/live/snapshot` if EventSource is unavailable.
- `GET /api/live/snapshot` — JSON `{ events, metrics }` (for polling fallback and for server rendering initial state).
- `GET /api/live/status` — JSON for /status: `{ components: { name, status: "operational"|"degraded"|"outage", uptime90d }[],
   incidents: [], latency: { p50, p95 }, asOf }`.
- Components (client where needed): `src/components/live/live-operations-panel.tsx` exports `LiveOperationsPanel({ variant:
  "compact"|"full" })` (feed + metrics, dense product typography, inside a WindowFrame when compact); `live-feed.tsx`;
  `live-metrics.tsx`; `live-dot.tsx` (pulsing accent dot + "Live" label, static under reduced motion).
- Pages: `/dashboard` (full live product demo: sidebar of agents, metrics row, feed, approvals queue with approve/decline
  buttons that emit optimistic UI, credits meter), `/status` (live component table + latency + 90-day uptime bars +
  incident history from content), `/changelog` (from content, grouped by month, category badges, RSS link).

## Billing / auth (owner: auth-billing builder; consumer: pricing builder)
- `POST /api/stripe/checkout` body `{ planId: "starter"|"growth"; interval: "monthly"|"annual"; email?: string }` →
  `200 { url }` when `STRIPE_SECRET_KEY` and the matching `STRIPE_PRICE_*` env are set (Stripe Checkout, mode
  subscription, 14-day trial on starter, success `/signup?checkout=success`, cancel `/pricing`), else
  `200 { demo: true, message: "Stripe is not configured in this environment." }`. Validate with zod.
- `POST /api/stripe/webhook` — verifies signature when `STRIPE_WEBHOOK_SECRET` set; logs event types; 200.
- `POST /api/waitlist` body `{ email, source }` → `{ ok: true }` (zod validation, no persistence, no external calls).
- `POST /api/contact` body `{ name, email, company, size, intent: "demo"|"sales"|"support"|"partner", message }` →
  `{ ok: true }` (owner: company builder).
- `src/lib/stripe.ts` — lazy Stripe client (`getStripe()`), `isStripeConfigured()`, plan→price id mapping from env.
- Pricing builder implements `CheckoutButton` (client) in `src/components/pricing/checkout-button.tsx` calling the endpoint
  and handling `{ demo }` with a small inline notice + link to /contact?intent=sales.
- `/login` and `/signup`: polished UI only (email + SSO buttons for Google/Microsoft/Okta as disabled-looking but
  accessible buttons with "SSO is enabled for Growth and Enterprise" helper), no real auth; `noIndex: true`.

## Ownership additions (supersede BRIEF §5 where different)
- company builder also owns `src/app/api/contact/**`.
- resources builder owns `src/app/resources/**`, `src/app/glossary/**`, `src/components/resources/**`.
- `src/components/content/**` (Markdown) is owned by the orchestrator; do not edit.

## Dev server
The orchestrator runs `next dev` on http://localhost:3000 during Phase 2. Do not start your own server. Screenshot with
`node scripts/shot.mjs http://localhost:3000/<route> C:/Users/hales/enterprise-hr-finance/gauntlet/<name> --widths 1440,390 --full`
and view the PNGs with the Read tool. Fix console errors the script prints.

## 9. Where this landed

The blind gauntlet ran eight rounds and 372 judgements. The final round took 44 of 51, with perfect records against
Attio (9-0), Ramp (10-0), Brex (6-0), Mercury (6-0), Anthropic (3-0) and Harvey (1-0); Stripe's home hero is the only
reference that reliably wins anything. Asked which set it would ship without knowing which was which, the last critic
picked Meridian, and its single strongest recommendation for improving "the weaker side" was about Stripe's chat
overlay covering its own cards.

Two notes were never fully resolved and are worth stating plainly:

1. **The hero object.** Every round flagged it. It is now a graticule whose agent nodes drive the approval card beneath
   it, so it argues the product rather than decorating the page, but several critics would still replace it with a
   product screenshot outright. Three.js in the hero was a requirement of the brief, so it stayed and was made to earn
   its place instead.
2. **Template sameness.** One critic identified the site as the non-production one precisely because seventeen page
   types share an opening move: eyebrow, serif headline, one paragraph, hairline spec panel at right. That discipline is
   why the interior pages beat their references, and it is also the thing that makes the site legible as a system. If a
   future pass wants more range, vary the opening per template rather than loosening the system.
