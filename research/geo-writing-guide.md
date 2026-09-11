# GEO writing guide for page builders

One page. Follow it on every route. The goal: an answer engine can lift any paragraph from a Meridian
page, quote it verbatim, attribute it correctly, and link back. Companion: `research/seo-geo-plan.md`.

## Rules

1. Open with a definition. First sentence of every page, section, and FAQ answer states what the
   thing is or does: "{Entity} is {category} that {does what} for {whom}." No warm-up sentences.
2. One claim per sentence. Number, entity, and scope in the same sentence. "The Audit Agent saves
   about 900 hours per audit year" is quotable; "It saves a lot of time across the audit" is not.
3. Caveat every outcome. Any figure from BRIEF section 3 carries the footnote "Modeled outcomes from
   design-partner deployments." within the same viewport (footnote marker on the number, note under
   the block). In running prose add "(modeled outcome)" after the number.
4. Exact names, every time. Meridian. Help Desk Agent, Recruiting Agent, Payroll Agent, Scheduling Agent,
   Performance Agent, Job Architecture Agent, Audit Agent, Planning Agent, Controls Agent, Close Agent,
   Revenue Contract Agent, Contract Review Agent. Registry, Gateway, Data Fabric, Studio, Assist, Trust.
   Starter, Growth, Enterprise. Never abbreviate on first use; never "Meridian AI".
5. Headings are questions or noun phrases, sentence case, one H1. Explainer H2s are questions
   ("What does Registry record about each agent?"). Product H2s are noun phrases ("Data it reads").
   Eyebrows are `<p>`, not headings.
6. Put the answer in the first paragraph under a heading. 40-90 words. The heading plus that
   paragraph must stand alone as a complete unit when extracted.
7. Use a table when there are three or more comparable things. Plans, credit rates, agent lists,
   certifications, connector families, before/after metrics. Header row, plain text cells, no icons.
8. FAQs: 4-5 per page, phrased as buyers ask. Answer directly in the first sentence, then one or two
   supporting sentences. Render in the DOM and pass the same array to `faqJsonLd`.
9. Date it. Articles show published and updated dates. Changelog entries use `<time datetime>`.
   Write "as of September 2026" when citing a state of the world.
10. Link with descriptive anchors. "the Registry, Meridian's agent system of record" not "learn more".
    Every page links up (breadcrumb), across (2-3 related entities), and down (deeper detail).
11. No text that exists only after client JavaScript. Calculators, live feeds, tabs, accordions, and
    3D scenes must have the same facts in server-rendered HTML.
12. Voice (BRIEF section 2): short sentences, numbers over adjectives, no hype words, no exclamation
    marks, no emoji. If a sentence has no entity and no number, cut it or add one.

## Before and after

### 1. Agent page lede (`/agents/payroll`)

Before:

> Payroll is one of the most stressful parts of running a company. Errors are costly and compliance
> is always changing. Our AI-powered agent takes the pain out of payroll so your team can focus on
> what matters.

After:

> The Payroll Agent is a governed AI agent that finds missing data and configuration errors before
> the payroll run and applies wage-law updates as they change. Payroll teams using it resolved
> compliance issues 4x faster (modeled outcome). It reads only payroll and HRIS data you permit,
> logs every check, and routes any change to a person for approval.

Why: definitional opener, one claim per sentence, exact name, number with caveat, the agent contract
stated as facts.

### 2. Platform section heading and paragraph (`/platform/registry`)

Before:

> **Total visibility**
>
> Get a bird's-eye view of everything happening across your agent ecosystem, with powerful
> analytics that help you make smarter decisions faster.

After:

> **What does Registry record about each agent?**
>
> Registry records six things for every agent: owner, role, permissions, data touched, compliance
> status, and current activity. It covers agents built by Meridian, by partners, and by your own
> teams in Studio. Blended workforce analytics show agent and human throughput side by side, so a
> CFO can see cost per case or hours saved per close alongside headcount.

Why: question heading, answer in the first sentence, an enumerated list that extracts cleanly,
entities named, role-specific example.

### 3. FAQ answer (`/pricing`)

Before:

> **Q: How do credits work?**
>
> Credits are our flexible way of letting you pay only for what you use. Different actions consume
> different amounts, and you can always buy more if you need them.

After:

> **Q: How are Meridian credits consumed?**
>
> Each completed unit of work consumes a fixed number of credits: an HR case resolved is 2 credits,
> a candidate screened is 1, a shift filled is 1, an audit evidence package is 5, a variance
> commentary is 3, and a contract redline is 8. Starter includes 5,000 credits per month and Growth
> includes 30,000. Usage beyond the plan is billed at $0.12 per credit.

Why: the question uses the brand entity, the answer is a table in sentence form, every number is
sourced from `src/content/pricing.ts`, and an answer engine can quote it without visiting the page.

## Checklist before you ship a page

- [ ] First sentence defines the entity.
- [ ] Every outcome figure has the modeled-outcome footnote in view.
- [ ] One H1; H2s are questions or noun phrases; no skipped levels.
- [ ] At least one table where three or more things are compared.
- [ ] FAQ array rendered in the DOM and passed to `faqJsonLd`.
- [ ] `createMetadata` called with a plain title, 140-160 character description, and `path`.
- [ ] Relevant JSON-LD builders called; breadcrumbs visible below the top level.
- [ ] Nothing important is only visible after client JS.
