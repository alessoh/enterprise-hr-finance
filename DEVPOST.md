# Meridian — Devpost submission copy

Paste each section into the matching Devpost field.

- **Live demo:** https://enterprise-hr-finance.vercel.app
- **Repository:** https://github.com/alessoh/enterprise-hr-finance

---

## Tagline

**Governed AI agents for HR and finance — narrow, auditable, and priced by the work they finish.**

---

## Inspiration

Enterprises have been handed a new kind of worker and no way to hold it accountable.

This is Meridian, an AI-native SaaS for enterprise HR and finance with human oversight. Agents run the work around the
clock. When something needs a decision, a question box appears in front of a person.

The agents that actually get adopted are narrow. Each one is scoped to a single workflow, runs on the customer's own
structured data under the customer's own security model, produces a number the vendor can quote, and stops at a named
person before doing anything consequential. They are not assistants. They are governed workers.

That gap became the product. Buyers in HR and finance are not blocked by model capability. They are blocked on
governance: who owns this agent, what it can read, what it can do without asking, and whether I can hand the log to an
auditor. Nobody was selling the answer to that question, so we built the company that does.

## What it does

Meridian is a subscription SaaS platform for enterprises that want AI agents doing real HR and finance work without
losing the accountability trail.

**Twelve governed agents**, each scoped to one workflow and each carrying a measurable outcome: a Help Desk Agent that
resolves employee cases from policy and the system of record, a Payroll Agent that catches missing W-4s and
configuration errors before the run, a Controls Agent that tests every transaction for duplicates and policy breaches, a
Close Agent that orchestrates month-end, a Contract Review Agent that redlines third-party paper against your playbook.
Six more across recruiting, scheduling, performance, job architecture, audit, planning, and revenue contracts.

**Two of those twelve execute for real, on open-weight LLMs you host yourself.** The Controls Agent tests a population
of invoices and raises exceptions with evidence attached; the Help Desk Agent answers a policy question and cites the
sections it used. The other ten are specified end to end — data sources, guardrails, credit costs, FAQs — but not yet
built, and the product says so rather than implying otherwise.

**A platform layer that governs all of them.** The Registry is the system of record for every agent in the enterprise —
Meridian's, a partner's, or one your own team built — recording owner, role, permission scope, data touched and
compliance status, with workforce analytics that count agents and people together. The Gateway connects third-party
agents through open standards: Model Context Protocol for tools, agent-to-agent protocols for handoffs, OpenTelemetry
for observability, your IdP for access. Data Fabric reads your warehouse zero-copy. Studio is the low-code builder.
Assist is the conversational front door.

**The agent contract**, printed on every agent page and enforced in code: scoped to one workflow, reads only permitted
data, every action logged, consequential actions require human approval, measurable outcome, runs on your chosen model.

**A live operations dashboard** at `/dashboard` that streams a Meridian workspace over Server-Sent Events — the agent
roster with today's counts, six live metrics, the operations feed with per-action credit costs, the approvals queue a
human still owns, and the credit meter against plan allowance. This feed is a deterministic simulation, separate from
the two agents that really run, and the page states that plainly.

**Consumption pricing in credits rather than seats**, because when the software does the work, charging per human is
charging for the wrong thing. Three tiers with a working calculator that turns your employee count, case volume, hiring
rate, and invoice volume into a credit estimate, a recommended plan, and hours saved.

## How we built it

**Stack.** Next.js 16 App Router, React 19, TypeScript in strict mode, Tailwind CSS v4 with CSS-first OKLCH tokens,
Three.js via React Three Fiber, Stripe, deployed on Vercel. 29,000 lines of TypeScript across 285 files.

**The agent runtime, and why the model only gets one job.** The product's claim is that a prompt instruction is a
suggestion and a permission boundary is a control. The runtime makes that literally true. A run has six stages and the
model participates in exactly one of them:

1. **Scope** — code projects rows onto the agent's declared field allow-list. The invoice fixture carries an approver
   email, a bank account and a national ID; all three are physically absent from the context window rather than
   discouraged by a prompt.
2. **Retrieve** — code settles what it can deterministically. Exact duplicate keys and three-way-match arithmetic never
   reach the model.
3. **Reason** — the LLM judges only the cases code could not settle, and must return JSON matching a zod schema.
4. **Decide** — a policy engine maps each finding to auto-file, needs-approval or rejected. The model has no vote, and
   the money-movement rule is checked before confidence, so a confident model cannot talk its way past it.
5. **Act** — nothing consequential executes. There is no code path from a finding to a payment system.
6. **Log** — a hash-chained audit entry per stage: input hash, model id, output, and the policy rule that fired.

Two properties are load-bearing. **Deterministic first**, so a model outage degrades an agent rather than disabling it.
**Fail closed**, so a missing endpoint or output that will not validate twice puts an error on the run instead of
falling back to the simulation or inventing a finding. Evidence is checked against the ids actually retrieved: a model
citing an invoice it was never shown is treated as a hallucination and discarded.

**Open weights only, and no vendor SDK.** The single integration surface is the OpenAI-compatible chat completions API,
so Ollama, vLLM, llama.cpp, Hugging Face TGI, Together, Groq, Fireworks and OpenRouter all work by changing an
environment variable. No proprietary model is called anywhere in the repository. We verified against Qwen2.5 3B Instruct
(Apache-2.0, 1.9 GB) running locally under Ollama, with a triage tier for extraction and a judgment tier for finance
decisions.

**Rendering.** Server Components by default; 165 pages prerender at build time, including every agent, glossary term,
article, and case study, plus a generated Open Graph image for each. Only routes that read the clock or a query string
render on demand. Every page is complete HTML before JavaScript runs — the home page is 3,000 crawlable words with no
client hydration required to read it.

**The hero.** A globe drawn as a graticule with one accent meridian that does not rotate. Twelve agent nodes travel
their own latitudes, and each time one crosses that line the approval card beneath it changes to what that agent just
did and what a person still has to decide. The geometry argues the product. It is gated hard: WebGL mounts only above
768px, without prefers-reduced-motion, with WebGL available, and only once the container is in view and the browser is
idle. Everyone else gets a static poster generated from the same constants by a build script. The Three.js chunk is
231 KB gzipped and never blocks the largest contentful paint.

**Governance and compliance surface.** Security headers (HSTS with preload, nosniff, frame options, referrer, and
permissions policy) ship on every response. Stripe runs env-gated with an explicit demo mode, so no key is ever required
to exercise the flow, and none is ever exposed. Zod validates input at every endpoint. A trust center documents controls
by domain with a shared responsibility matrix, a data-flow diagram, subprocessors, and a security.txt.

**Process.** The build was orchestrated across parallel AI subagents against a written brief, a design system and a
contracts file that specified every interface between modules before anyone wrote code. Quality was enforced by a blind
design gauntlet we built for the project: a script screenshots every page from the production build, composites each one
side by side with a captured reference page from Stripe, Attio, Ramp, Brex, Mercury, Anthropic, or Harvey in randomized
order, and hands the composite to a reviewer who cannot tell which panel is ours. A separate decoder maps the verdict
back. We ran it eight times and fixed what it found.

## Challenges we ran into

**A hydration bug only production could find.** The operations feed formatted timestamps with `toLocaleTimeString`,
which renders in the runtime's own timezone. Locally the server and the browser shared a timezone and the output matched
perfectly. On Vercel the server runs UTC, the browser runs local, and the two strings diverged — React error 418,
invisible through every local test we had. The fix is to read the time straight off the ISO string so both sides emit
identical characters. The lesson is that some classes of bug are structurally undetectable until the server and the
client genuinely differ.

**A small model that copied our homework.** The first Help Desk run returned perfectly valid JSON containing the words
"short answer" and "the full answer in two or three sentences" — our own schema placeholders, echoed back as content. A
3B model given a fill-in-the-blanks template will fill in the blanks literally. Replacing the template with described
fields plus one worked example on an unrelated topic fixed it, and the next run produced a correct, cited answer about
PTO carryover.

**The model was wrong, and that turned out to be the best evidence we had.** On the Controls run, Qwen2.5 3B flagged two
invoices as duplicate payments. They were not: phase 1 and phase 2 of one machine tool, on separate purchase orders,
and the prompt excluded phased billing explicitly. A 3B model is too weak for that judgment, which is what the judgment
tier exists for. We put the failure in the README rather than tuning it away, because it demonstrates the architecture
better than a clean run would: the model reached a wrong conclusion, and nothing happened, because a finding is not an
action and the policy engine routed all four exceptions to a human.

**Timeouts that looked like failures.** CPU inference on a small model took longer than our 45-second ceiling, so the
first full Controls run recorded "model endpoint timed out". The run still produced three correct deterministic
findings, logged the failure honestly, and fabricated nothing — which is exactly the designed behaviour, but it made us
raise the default to 120 seconds for local hosting.

**Parallel agent economics.** Our first orchestration launched eleven subagents at once. Every one independently read
the same brief, design system and component library before writing a line, and the run exhausted its budget three times
before producing output. The fix was structural: cap concurrency, give each agent a narrow reading list pointing at
specific files, and instruct every agent to write complete files early so an interruption loses minutes rather than
hours.

**A 114 MB wall.** Committing everything at once swept two demo recordings into the push, and GitHub rejects any single
file over 100 MB, so it bounced the entire commit including all the code. The videos now sit outside version control
where large binaries belong.
