# Meridian — Devpost submission copy

Paste each section into the matching Devpost field.

- **Live demo:** https://enterprise-hr-finance.vercel.app
- **Repository:** https://github.com/alessoh/enterprise-hr-finance

---

## Tagline

**Governed AI agents for HR and finance — narrow, auditable, and priced by the work they finish.**

Alternates:

- AI agents that run HR and finance, with a human accountable for every consequential action.
- The agent system of record for enterprise HR and finance.

---

## Inspiration

Every vendor in the AI agent market ships the same thing: a chat box, a promise of autonomy, and a demo that
falls apart the moment a CFO asks who signed off on it.

We started from a market briefing on how the enterprise HR and finance incumbents actually deploy agents. The
pattern was unmistakable, and it was the opposite of the pitch. The agents that get adopted are *narrow*. Each one
is scoped to a single workflow, runs on the customer's own structured data under the customer's own security
model, produces a number the vendor can quote, and stops at a named person before doing anything consequential.
They are not assistants. They are governed workers.

That gap became the product. Buyers in HR and finance are not blocked on model capability. They are blocked on
governance: who owns this agent, what can it read, what can it do without asking, and can I hand the log to an
auditor. Nobody was selling the answer to that question, so we built the company that does.

The name is the thesis. A meridian is a fixed line you navigate against. Work crosses it and gets checked.

## What it does

Meridian is a subscription SaaS platform for enterprises that want AI agents doing real HR and finance work
without losing the accountability trail.

**Twelve governed agents**, each scoped to one workflow and each carrying a measurable outcome: a Help Desk Agent
that resolves employee cases from policy and the system of record, a Payroll Agent that catches missing W-4s and
configuration errors *before* the run, a Controls Agent that tests every transaction for duplicates and policy
breaches, a Close Agent that orchestrates month-end, a Contract Review Agent that redlines third-party paper
against your playbook. Six more across recruiting, scheduling, performance, job architecture, audit, planning and
revenue contracts.

**A platform layer that governs all of them.** The Registry is the system of record for every agent in the
enterprise — Meridian's, a partner's, or one your own team built — recording owner, role, permission scope, data
touched and compliance status, with workforce analytics that count agents and people together. The Gateway
connects third-party agents through open standards: Model Context Protocol for tools, agent-to-agent protocols
for handoffs, OpenTelemetry for observability, your IdP for access. Data Fabric reads your warehouse zero-copy.
Studio is the low-code builder. Assist is the conversational front door.

**The agent contract**, printed on every agent page and enforced in the product: scoped to one workflow, reads
only permitted data, every action logged, consequential actions require human approval, measurable outcome, runs
on your chosen model.

**A live operations dashboard** at `/dashboard` that streams a working Meridian workspace over Server-Sent
Events — the agent roster with today's counts, six live metrics, the operations feed with per-action credit
costs, the approvals queue a human still owns, and the credit meter against plan allowance.

**Consumption pricing** in credits rather than seats, because when the software does the work, charging per human
is charging for the wrong thing. Three tiers with a working calculator that turns your employee count, case
volume, hiring rate and invoice volume into a credit estimate, a recommended plan, and hours saved.

A note we keep on the product itself: the operations dashboard is a **faithful simulation** of a Meridian
workspace, driven by a deterministic event engine, not a live connection to anyone's HRIS. The platform surface
is real and deployed; the agent execution layer is the next build. We say so on the page rather than letting a
judge or a buyer discover it.

## How we built it

**Stack.** Next.js 16 App Router, React 19, TypeScript in strict mode, Tailwind CSS v4 with CSS-first OKLCH
tokens, Three.js via React Three Fiber, Stripe, deployed on Vercel. 27,000 lines of TypeScript across 263 files.

**Rendering.** Server Components by default; 165 pages prerender at build time, including every agent, glossary
term, article and case study plus a generated Open Graph image for each. Only routes that read the clock or a
query string render on demand. Every page is complete HTML before JavaScript runs — the home page is 3,000
crawlable words with no client hydration required to read it.

**The real-time layer.** `/api/live/events` is a Server-Sent Events endpoint: a snapshot on connect, an agent
event every 1.5 to 4 seconds, metrics every 5, a comment heartbeat every 15, and a deliberate self-close at 55
seconds so a serverless function ceiling is never the thing that ends the stream. The client hook reconnects with
exponential backoff, tears the connection down entirely while the tab is hidden, and falls back to polling a JSON
snapshot after three consecutive failures. Every event is a pure function of a timestamp, so the server render and
the first client render agree exactly and a reconnecting client sees a coherent history rather than a jump.

**The hero.** A globe drawn as a graticule with one accent meridian that does not rotate. Twelve agent nodes
travel their own latitudes, and each time one crosses that line the approval card beneath it changes to what that
agent just did and what a person still has to decide. The geometry argues the product. It is gated hard: WebGL
mounts only above 768px, without `prefers-reduced-motion`, with WebGL available, and only once the container is
in view and the browser is idle. Everyone else gets a static poster generated from the same constants by a build
script. The Three.js chunk is 231 KB gzipped and never blocks the largest contentful paint.

**Governance and compliance surface.** Security headers (HSTS with preload, nosniff, frame options, referrer and
permissions policy) ship on every response. Stripe runs env-gated with an explicit demo mode, so no key is ever
required to exercise the flow and none is ever exposed. Input is validated with Zod at every endpoint. A trust
centre documents controls by domain with a shared responsibility matrix, a data-flow diagram, subprocessors and a
`security.txt`.

**SEO and GEO.** Per-route canonicals, Open Graph and Twitter cards through one metadata helper; JSON-LD built
with `schema-dts` covering Organization, WebSite, WebPage, BreadcrumbList, Product, HowTo, FAQPage, Article,
ItemList, DefinedTerm and SoftwareApplication with offers. For generative engines specifically, `/llms.txt` is a
24 KB structured summary with citable facts and a URL for every page, and `/llms-full.txt` carries 252 KB of full
article bodies, agent descriptions and glossary definitions. Articles open with a direct answer and carry
standalone key-takeaway blocks, because that is the unit an LLM quotes.

**Process.** The build was orchestrated across parallel AI subagents against a written brief, a design system and
a contracts file that specified every interface between modules before anyone wrote code. Quality was enforced by
a blind design gauntlet we built for the project: a script screenshots every page from the production build,
composites each one side by side with a captured reference page from Stripe, Attio, Ramp, Brex, Mercury,
Anthropic or Harvey in **randomised order**, and hands the composite to a reviewer who cannot tell which panel is
ours. A separate decoder maps the verdict back. We ran it eight times and fixed what it found.

## Challenges we ran into

**A hydration bug only production could find.** The operations feed formatted timestamps with
`toLocaleTimeString`, which renders in the runtime's own timezone. Locally the server and the browser shared a
timezone and the output matched perfectly. On Vercel the server runs UTC, the browser runs local, and the two
strings diverged — React error 418, invisible through every local test we had. The fix is to read the time
straight off the ISO string so both sides emit identical characters. The lesson is that some classes of bug are
structurally undetectable until the server and the client genuinely differ.

**Streaming on serverless.** SSE and function timeouts are natural enemies. Rather than fight the ceiling we
close the stream ourselves at 55 seconds and let the browser's own reconnect handle continuity, with a polling
fallback underneath for environments where EventSource never works.

**Parallel agent economics.** Our first orchestration launched eleven subagents at once. Every one independently
read the same brief, design system and component library before writing a line, and the run exhausted its budget
three times before producing output. The fix was structural: cap concurrency at two or three, give each agent a
narrow reading list pointing at specific files instead of "read everything", keep cross-cutting contract work in
one place, and instruct every agent to write complete files early so an interruption loses minutes rather than
hours.

**A criticism that survived five rounds.** The blind reviewers kept calling the hero's 3D object decorative —
"a wireframe globe that encodes nothing". We raised its contrast, gave the section a floor, rebuilt the geometry
as an instrument. It kept coming back. The real fix was conceptual, not visual: wire the agent nodes to the
approval card so crossing the governed line *changes the product readout*. The object stopped being decoration
when it started doing work.

**Perception beating measurement.** Four separate reviewers reported "rust-coloured" or "arbitrary orange
tinting" in body copy. We audited the DOM and found no bug at all: every colour change was a systematic design
token applied to a whole label. But at 0.012 chroma on a warm hue, muted greys genuinely read brown beside
near-black ink at small sizes. When four independent observers report the same perception, the perception is the
defect. We halved the chroma and kept the contrast ratios.

**A peer-dependency trap.** React Three Fiber's peer range excludes React 19.3, which npm happily resolves into
an unbuildable tree. Pinning React to 19.2 cost an hour of confusion before the error message made sense.

## Accomplishments that we're proud of

**The blind gauntlet result.** 372 blind side-by-side judgements across eight rounds. The final round went **44
of 51**, with perfect records against Attio (9-0), Ramp (10-0), Brex (6-0), Mercury (6-0), Anthropic (3-0) and
Harvey (1-0). Asked at the end which set it would ship, without being told which panel was ours, the reviewer
chose Meridian — and its single strongest recommendation for improving "the weaker side" turned out to be about
Stripe's chat widget covering its own cards.

**Measured production performance.** On the live deployment: TTFB 100–180 ms, LCP 612–816 ms, CLS 0 on the pages
we measured. 165 pages prerendered. An automated audit across 30 routes reports zero findings for heading
structure, canonicals, Open Graph, structured data, landmarks, labelled form fields and language.

**A real-time layer that behaves.** Verified live in production: the feed advances, the connection reports
Paused when the tab hides, and it reconnects to Live with no errors.

**Depth, not a shell.** Around 50,000 words of original domain content: twelve fully specified agents with data
sources, guardrails, credit costs and FAQs; eight long-form articles of 1,200–1,600 words each; a 34-term
glossary; three complete case studies; a changelog; and four substantive legal documents.

**A 3D moment that is also a good citizen.** Signature WebGL on desktop, a byte-identical static poster
everywhere else, and a verified guarantee that the 231 KB chunk never downloads on mobile or under reduced
motion.

## What we learned

**Blind comparison is worth more than any amount of self-assessment.** We could not have talked ourselves into
the customers page being thin, or the hero being decorative. A reviewer who could not see the answer key told us
in one sentence, repeatedly, until we fixed it properly.

**Consistency and monotony are the same discipline seen from two sides.** One reviewer identified our site as the
non-production one precisely *because* seventeen page types share an opening move. That same discipline is why
the interior pages beat their references. We kept the system and wrote the tension down rather than pretending it
away.

**Ship the artefact, not the ornament.** Every design note that mattered reduced to the same instruction: replace
decoration with the real thing. The approval card beat the abstract visual. Real story figures beat placeholder
row descriptions. A number and its unit read as one object beat a three-size cluster.

**Governance is a design problem before it is an engineering one.** Deciding that amber means "a human must
decide" and *nothing else* did more for the dashboard's legibility than any amount of layout work.

**Deploy earlier than feels necessary.** Our only real production bug was undetectable in any local environment.

## What's next for Meridian

**Make the agents real.** The execution layer is the build the platform was designed around: a worker runtime
behind the Gateway, MCP tool definitions per agent, per-agent evaluation sets gating promotion from early access
to GA, and an approval queue backed by durable state rather than a simulation.

**Persistence and identity.** Postgres for the Registry — agents, owners, permission scopes, approval records,
immutable audit entries — plus real authentication with SAML/OIDC single sign-on and SCIM provisioning, which
the pricing page already sells and the platform already documents.

**Turn on the money.** Stripe is scaffolded end to end and running in demo mode. Switching it on means live
subscriptions, metered credit consumption reported to Stripe per completed action, overage billing at the
published rate, and pooled credits for enterprise accounts.

**Prove the governance claim.** SOC 2 Type II is described on the trust page as a destination, not a possession.
The next milestone is the evidence pipeline that makes it true, which is conveniently the same product the Audit
Agent sells.

**Instrument the GEO bet.** We built the citation surface. Next is measuring whether generative engines actually
cite it, and feeding that back into what gets written.

---

## Built with

`next.js` · `react` · `typescript` · `tailwindcss` · `three.js` · `react-three-fiber` · `server-sent-events` ·
`stripe` · `vercel` · `node.js` · `zod` · `schema-dts` · `json-ld` · `playwright` · `radix-ui` · `motion` ·
`recharts` · `react-markdown` · `eslint` · `oklch` · `geist` · `edge-network` · `model-context-protocol` ·
`github` · `css`

---

## Demo video script — 3 minutes

Record at 1920×1080, light mode, cursor visible, no background music under narration. Times are cumulative.

### 0:00–0:20 — The problem, on the product

*Screen: the live home page at https://enterprise-hr-finance.vercel.app. Let the hero globe turn once. The
approval card beneath it changes as a node crosses the blue line.*

> "Every AI agent vendor sells you a chat box. Finance and HR buyers don't have a model problem. They have a
> governance problem: who owns this agent, what can it read, and what can it do without asking a person.
> This is Meridian. Twelve agents that each do one job, and stop at a named human before anything consequential."

*Point the cursor at the globe as a node crosses the meridian and the card swaps.*

> "That object isn't decoration. Each node is an agent. When one crosses the governed line, the card shows what
> it just did and what a person still has to approve."

### 0:20–0:50 — The catalog and the contract

*Scroll to the agent contract strip, then click through to `/agents`.*

> "Six terms every agent ships with: one workflow, only permitted data, every action logged, human approval on
> consequential actions, a measurable outcome, and your choice of model."

*Open `/agents/controls`.*

> "Here's the Controls Agent. It tests every transaction for duplicates and policy breaches. $283,000 a year in
> duplicate payments avoided at one design partner — and that figure is footnoted as a modeled outcome, because
> we're not going to invent customers."

*Scroll to the product mockup showing the exceptions table.*

> "Data it reads, actions it takes, and what needs approval — stated separately, on every agent page."

### 0:50–1:30 — The live operations layer

*Navigate to `/dashboard`. Stay here and let it run.*

> "This is the operations surface, streaming over Server-Sent Events."

*Let 10–15 seconds pass silently so rows visibly arrive. Do not talk over it.*

> "Every row is an action an agent took, what it cost in credits, and whether a person still has to decide. Amber
> means one thing on this entire site: a human must approve."

*Scroll to the approvals queue and click Approve on one item.*

> "The approvals queue is the product thesis made literal. This is a simulated workspace driven by a
> deterministic engine — the platform is deployed, the execution layer is what we build next, and we say so on
> the page."

*Point at the credits meter.*

> "And every action is metered against the plan's credit allowance."

### 1:30–2:05 — Governance and the platform

*Open `/platform/registry`.*

> "The Registry is the system of record for every agent in the enterprise — yours, ours, or a partner's — with
> owner, permission scope, data touched and compliance status."

*Open `/security`, land on the spec table.*

> "Security at a glance, above the fold, because that's the first thing a procurement reviewer asks for. No
> training on customer data. Approvals held at the Gateway. EU or US residency per workspace."

*Scroll to the controls table and the data-flow diagram.*

> "Controls by domain, a shared responsibility matrix, and the data flow across the trust boundary."

### 2:05–2:35 — The money

*Open `/pricing`. Toggle Monthly to Annual so the prices change.*

> "Consumption pricing, not seats. When software does the work, charging per human charges for the wrong thing."

*Scroll to the calculator and drag the HR-cases slider up.*

> "Put in your employee count, case volume and invoice volume, and it returns a credit estimate, a recommended
> plan, and hours saved. Stripe checkout is wired end to end and runs in demo mode until keys are set."

*Click a plan CTA to show the demo-mode notice appear inline.*

### 2:35–3:00 — How it was built, and the close

*Split screen or quick cuts: the blind A/B composite image, then the Lighthouse-style numbers, then the repo.*

> "On quality: we built a blind gauntlet. Every page is screenshotted from production and composited side by
> side, in random order, against Stripe, Attio, Ramp and others. A reviewer who can't tell which panel is ours
> picks the better one. Eight rounds, 372 judgements. The final round went 44 of 51, and the reviewer chose
> Meridian without knowing which it was."

*Back to the live site home page.*

> "165 pages prerendered. Zero layout shift. Sub-second largest contentful paint in production. It's live at
> enterprise-hr-finance.vercel.app, and the whole repository is public."

**Recording notes**

- Do not narrate over the feed between 0:50 and 1:05. The silence is what proves it is live.
- Capture the dashboard in a fresh tab so the connection opens on camera.
- Keep the cursor still except when pointing at something specific.
- If you re-record the hero, wait for a node to reach the blue line before you start talking.
