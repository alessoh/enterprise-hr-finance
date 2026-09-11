import type { Article } from "@/content/types";

/**
 * Long-form resources for /resources. Bodies are markdown.
 * readingMinutes is derived from body word count at ~230 words per minute.
 * Outcome figures are modeled outcomes from design-partner deployments; each
 * article that cites them carries the footnote inline.
 */

const WORDS_PER_MINUTE = 230;

function readingMinutes(markdown: string): number {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const OUTCOME_FOOTNOTE =
  "*Outcome figures in this article are modeled outcomes from design-partner deployments and are not guarantees of results.*";

export const articleCategories: { name: Article["category"]; description: string }[] = [
  { name: "Explainers", description: "Plain definitions of the concepts behind governed AI agents." },
  { name: "Governance", description: "Frameworks for scope, permissions, approvals, audit trail, and compliance." },
  { name: "Finance operations", description: "How agents change the close, controls, audit, and planning." },
  { name: "Buying and ROI", description: "Pricing, evaluation checklists, pilot design, and measurement." },
];

// ---------------------------------------------------------------------------
// 1. What is an agent system of record?
// ---------------------------------------------------------------------------

const agentSystemOfRecordBody = `
An agent system of record is the authoritative registry of every AI agent operating in an enterprise: who owns it, what it is allowed to do, what data it touches, and how it is performing. It does for agents what a human capital management system does for employees, and as of September 2026 it is the control point most audit and risk teams ask about first when AI agents move from pilot to production.

## Why agents need a system of record

Defined simply, an AI agent is software that takes a goal, plans steps, calls tools or systems, and produces an outcome with limited or no human intervention per step. A chatbot answers; an agent acts. Once software can act, the questions that apply to any actor in the enterprise apply to it: who authorized it, what can it reach, and who answers when it is wrong.

Most organizations discover the problem the same way. A finance team pilots an agent to collect audit evidence. HR deploys a help desk agent. A partner ships an agent inside a procurement tool. Two engineers build an agent in a low-code studio over a weekend. Within a year, an internal survey typically finds 30 to 60 agents with no common inventory, no single owner per agent, and no record of which ones can write to the general ledger or the HR core. That is the sprawl an agent system of record exists to prevent.

The concept borrows deliberately from HR. An employee registry records a person's role, manager, start date, access grants, training status, and performance history. It exists because organizations learned that unaccounted-for people with unaccounted-for access are a control failure. Agents create the same exposure at higher speed, so the registry pattern transfers almost field for field.

## What the registry tracks

Meridian's Registry is the system of record for agents built by Meridian, by partners, or by the customer in Studio. Every agent gets one entry. The table below lists the 12 field groups Registry maintains and why each one exists.

| Field | What it records | Why it matters |
|---|---|---|
| Agent identity | Unique ID, name, version, source (Meridian, partner, customer-built) | You cannot govern what you cannot name |
| Accountable owner | A named human and a backup, with a business unit | Every consequential outcome has a person attached |
| Scope | The single workflow the agent is authorized to perform | Prevents drift from "help desk" to "payroll changes" |
| Permissions | Systems, objects, and operations the agent may read or write | Enforced through the customer's existing security model |
| Data touched | Actual data categories accessed in the last 30 and 90 days | Supports DPIAs and access reviews with evidence, not intent |
| Approval tier | Which actions run autonomously and which require a human sign-off | Makes the human-in-the-loop policy inspectable |
| Model configuration | Which model the agent runs on, and which routing rules apply | Needed for model risk management and vendor reviews |
| Compliance status | Risk classification, review date, DPIA reference, open findings | Answers the auditor's question in one screen |
| Lifecycle state | Draft, pilot, production, suspended, retired | Retired agents lose credentials automatically |
| Consumption | Credits used by period, cost per completed outcome | Ties spend to work done |
| Outcomes | Completed actions, deflections, hours saved, error rate | The basis for blended workforce analytics |
| Incident log | Escalations, overrides, rollbacks, and their resolution | Pattern detection across agents, not just per agent |

### Two design choices that matter more than the field list

Two design choices matter more than the field list. First, Registry records what agents actually did, not only what they were configured to do. Permission grants describe intent; access logs describe reality, and audits are about reality. Second, the registry is enforceable. When an owner suspends an agent in Registry, the agent's credentials at the Gateway stop working within seconds. A registry that is only a spreadsheet with better formatting is an inventory, not a system of record.

## Blended workforce analytics

Blended workforce analytics is reporting that places agent work and human work in the same frame: hours, cost, throughput, quality, and coverage by process. Without it, leaders see agent metrics in one dashboard and headcount metrics in another and cannot answer the question that matters, which is whether the process got cheaper, faster, or safer.

### An example from an HR service center

A useful blended view for an HR service center might show:

- Case volume by channel, split into cases resolved by the Help Desk Agent, cases escalated from agent to human, and cases opened directly with a human.
- Median resolution time for each path. In modeled design-partner deployments, the Help Desk Agent deflects up to 75% of case volume and shortens resolution time by about 30% for the cases it handles.
- Human hours redeployed, measured by comparing generalist time on tier-1 cases before and after deployment.
- Error and reopen rates by path, so quality is compared rather than assumed.
- Credits consumed per resolved case, next to the fully loaded cost per human-resolved case.

The same structure applies in finance. The Audit Agent's evidence packages, the Controls Agent's flagged transactions, and the Close Agent's completed reconciliations each appear as work units with a cost, a cycle time, and a human review outcome. Because Registry holds the outcome fields for every agent, the analytics layer does not need a separate integration per agent.

## How the registry fits with the rest of the platform

Registry is one of five platform components, and its value depends on the others.

- Gateway enforces what Registry records. Third-party and customer-built agents connect through Gateway using Model Context Protocol for tools and OpenTelemetry for observability, so every tool call carries the agent's registered identity.
- Data Fabric supplies zero-copy access to warehouses, so the "data touched" field reflects real queries rather than a static list.
- Studio publishes customer-built agents directly into Registry with an owner and a scope before they can run.
- Assist, the conversational front door, only runs agents that Registry marks as production and that the requesting user is authorized to invoke.

## Buying criteria for an agent system of record

If you are evaluating an agent system of record in 2026, the following criteria separate a governance layer from a catalog.

1. Coverage of non-native agents. The registry must accept agents you did not buy from the vendor, through open standards rather than a proprietary SDK. Ask how a partner's agent, or one built in your own cloud, registers and authenticates.
2. Enforcement, not just documentation. Suspending an agent in the registry should revoke access in the runtime. Ask for a demonstration with a stopwatch.
3. Evidence of data touched. Ask whether the registry can show, for a chosen agent, the tables, objects, and record counts accessed in the last 90 days.
4. Approval tiers as data. Human-in-the-loop rules should be stored as structured fields, so an auditor can list every agent permitted to post a journal entry without human approval.
5. Ownership workflows. Owner departure should trigger reassignment, not orphaned agents. Ask what happens when an owner's account is deprovisioned in the IdP.
6. Cost attribution. Consumption should be visible per agent and per outcome, so finance can budget for agents the way it budgets for contractors.
7. Blended analytics. Look for reports that place agent and human throughput in the same table for the same process.
8. Auditor-ready exports. Compliance status, permissions, and incident history should export in a format your audit firm will accept as evidence.
9. Identity integration. Agents should carry identities from your enterprise IdP, with credentials rotated and revoked through the same lifecycle as human accounts.

## Common mistakes

- Treating the registry as a one-time inventory. Agents change versions and scopes monthly; the registry must update from the runtime automatically.
- Registering only high-risk agents. Sprawl comes from the long tail of small agents, and small agents acquire permissions over time.
- Assigning ownership to a team rather than a person. Teams do not answer escalation pages at 2 a.m.
- Skipping the retirement state. Retired agents with live credentials are the agent equivalent of a former employee with a working badge.

An agent system of record is not a new idea; it is an old control applied to a new kind of worker. Organizations that already run disciplined employee lifecycle processes will recognize most of it. The difference is speed: an agent can be created, granted access, and put to work in an afternoon, so the registry has to be in the path from the beginning rather than reconstructed later.

${OUTCOME_FOOTNOTE}
`.trim();

const agentSystemOfRecord: Article = {
  slug: "what-is-an-agent-system-of-record",
  title: "What is an agent system of record?",
  description:
    "A plain definition of the agent system of record, the 12 field groups it tracks, why it borrows from HR's employee registry, and nine criteria for evaluating one.",
  category: "Explainers",
  publishedAt: "2026-03-12",
  updatedAt: "2026-09-10",
  readingMinutes: readingMinutes(agentSystemOfRecordBody),
  author: { name: "Tomas Lindqvist", role: "Director of Platform Product" },
  keyTakeaways: [
    "An agent system of record is the authoritative, enforced registry of every AI agent in an enterprise, recording owner, scope, permissions, data touched, approval tier, compliance status, and outcomes.",
    "The pattern borrows from HR's employee registry: agents, like employees, need a named owner, a defined role, lifecycle states, and access that is revoked when the role ends.",
    "Meridian's Registry maintains 12 field groups per agent and is enforced through Gateway, so suspending an agent in Registry revokes its runtime credentials within seconds.",
    "Blended workforce analytics places agent and human work in the same table; a Help Desk Agent that deflects up to 75% of HR case volume only shows up as savings when compared against human handling cost.",
    "The two buying criteria that separate a governance layer from a catalog are coverage of non-native agents through open standards and enforcement of registry state in the runtime.",
  ],
  body: agentSystemOfRecordBody,
  faqs: [
    {
      question: "What is the difference between an agent registry and an agent system of record?",
      answer:
        "An agent registry is an inventory: a list of agents with descriptive fields. An agent system of record is the authoritative, enforced source of truth: the runtime consults it before an agent acts, and changes to it, such as suspending an agent or narrowing its scope, take effect in the runtime. Meridian's Registry is enforced through Gateway, which is what makes it a system of record rather than a catalog.",
    },
    {
      question: "Why do AI agents need a named human owner?",
      answer:
        "Because an agent can take actions with consequences, and consequences need an accountable person for escalation, approval, review, and regulatory response. Assigning ownership to a team leaves nobody to answer an escalation or a works council question. Registry requires a primary and a backup owner per agent and prompts reassignment when an owner's account is deprovisioned.",
    },
    {
      question: "Does an agent system of record replace identity and access management?",
      answer:
        "No. IAM issues identities and enforces access at the system level; the agent system of record adds what IAM does not hold: scope, approval tiers, data actually touched, compliance status, consumption, and outcomes. Meridian agents carry identities from the customer's IdP, and Registry references those identities rather than replacing them.",
    },
    {
      question: "What fields should an agent system of record track?",
      answer:
        "At minimum: identity and version, accountable owner, scope, permissions, data touched, approval tier, model configuration, compliance status, lifecycle state, consumption, outcomes, and an incident log. The two fields most often missing from home-grown inventories are data actually touched, as opposed to permissions granted, and a lifecycle state with an enforced retirement.",
    },
  ],
  relatedAgentSlugs: ["help-desk", "recruiting", "audit", "close"],
  seo: {
    title: "What Is an Agent System of Record?",
    description:
      "An agent system of record is the enforced registry of every AI agent in an enterprise: the fields it tracks, blended workforce analytics, and buying criteria.",
    keywords: [
      "agent system of record",
      "AI agent registry",
      "AI agent governance",
      "blended workforce analytics",
      "enterprise AI agents",
      "agent inventory",
      "Meridian Registry",
    ],
  },
};

// ---------------------------------------------------------------------------
// 2. AI agents vs. chatbots in HR and finance
// ---------------------------------------------------------------------------

const agentsVsChatbotsBody = `
An AI chatbot produces answers; an AI agent produces outcomes. In HR and finance, the difference shows up in four places: whether the software is scoped to a specific workflow, whether it can take actions in systems of record, whether consequential actions pass through human approval, and whether its results can be measured in hours and dollars.

## Definitions first

A chatbot is a conversational interface that retrieves or generates text in response to a question, and its work ends when the answer is displayed. An AI agent is software that pursues a defined goal by planning steps, reading and writing data through permitted tools, and completing a unit of work, with a human approving consequential steps. Both may use the same underlying language model. The difference is in what surrounds the model: scope, permissions, tools, approval logic, and measurement.

This distinction matters because most enterprise AI disappointment in 2024 and 2025 came from deploying chatbots where the business needed outcomes. An employee asking "how much PTO do I have" does not want a paragraph about the PTO policy. They want the number, and if they are asking because they want to book leave, they want the request submitted.

## The four differences that matter

### 1. Scope

A general chatbot is scoped to a knowledge base: it will attempt any question that maps to its documents. An agent is scoped to one workflow with a defined start, finish, and set of permitted actions. Meridian's Help Desk Agent, for example, is scoped to HR cases: it answers from policy and system-of-record data, opens a case when it cannot resolve the question, and closes the case when the employee confirms. It does not draft offer letters or change pay. That work belongs to other agents with their own scope.

Narrow scope is what makes agents trustworthy. A narrowly scoped agent can be tested exhaustively against its workflow, its permissions can be minimal, and its failure modes are predictable.

### 2. Actions

Chatbots read. Agents read and write, within limits. The write side is where value concentrates, because reading was already cheap. Consider a shift that opens at 6 a.m. on a Saturday in a distribution center.

- A chatbot can tell the supervisor which policy governs overtime.
- The Scheduling Agent identifies eligible, willing staff based on skills, certifications, hours worked, and stated availability, contacts them in order, confirms the first acceptance, and updates the schedule. In modeled design-partner deployments, time to fill a shift falls by about 90%.

The agent did not do anything a supervisor could not do. It did it at 6 a.m., in minutes, following the rules every time.

### 3. Approvals

An agent that can write to a system of record needs an approval model, which is a stated rule for which actions execute autonomously and which pause for a named human. A chatbot has no approval model because it takes no actions.

Meridian agents use approval tiers set per action type:

- Autonomous: low-consequence, reversible actions such as answering a policy question or attaching evidence to an audit request.
- Confirm: actions the requester approves in the moment, such as submitting their own leave request.
- Approve: actions a second person must sign off, such as a payroll configuration change or a journal entry.
- Prohibited: actions the agent may recommend but never execute, such as terminating employment.

Every action, at every tier, is logged with the inputs the agent used, the decision it made, and who approved it. That record is what auditors, works councils, and regulators ask for, and it is impossible to produce from a chatbot transcript.

### 4. Measurability

A chatbot is measured on containment and satisfaction scores, which are proxies. An agent is measured on the unit of work it completes and the cost and time of that unit compared with the human baseline.

| Agent | Unit of work | Modeled outcome |
|---|---|---|
| Help Desk Agent | HR case resolved | Deflects up to 75% of case volume; resolution time −30% |
| Recruiting Agent | Candidate screened and shortlisted | Screening time −46%; manual recruiter reviews −70% |
| Payroll Agent | Configuration or data issue resolved before the run | Compliance issues resolved 4x faster |
| Audit Agent | Evidence package delivered to auditor | About 900 hours saved per year |
| Controls Agent | Transaction tested, exception raised | One design partner avoided about $283K per year in duplicate payments |
| Close Agent | Close task completed and signed off | Close shortened by 3 days |

Each row has a countable unit, a baseline, and a delta. That structure is what allows finance to treat agents as a budget line with a return, rather than a software subscription with a sentiment score.

## A side-by-side comparison

| Dimension | Chatbot | Agent |
|---|---|---|
| Purpose | Answer questions | Complete a defined unit of work |
| Scope | A knowledge base | One workflow |
| System access | Read-only, often from copies of documents | Read and write to systems of record through permitted tools |
| State | Conversation memory | Case, task, or transaction state in the system of record |
| Approvals | None | Tiered, per action, with a named approver |
| Audit trail | Transcript | Structured log of inputs, decisions, actions, approvals |
| Failure mode | Wrong or vague answer | Wrong action, which is why approvals and rollback exist |
| Measurement | Containment, CSAT | Units completed, hours saved, dollars recovered, error rate |
| Pricing basis | Seats or messages | Consumption per completed action |
| Governance | Content review | Registry entry with owner, scope, permissions, compliance status |

## When a chatbot is the right choice

Chatbots still have a place. If the need is answering questions from a stable document set with no follow-on action, a chatbot is cheaper and simpler. Internal IT knowledge bases, benefits open-enrollment FAQs, and policy lookups often fit this description. The decision rule is simple: if the conversation should end in a change to a system of record more than about 20% of the time, you need an agent.

## Where the two meet

The enterprise pattern as of September 2026 is a conversational front door that routes to agents. In Meridian, that front door is Assist. An employee types a request; Assist determines whether the request is a question, which it answers, or a unit of work, which it hands to the scoped agent with the right permissions. The employee experiences one conversation. Underneath, Registry records which agent acted, Gateway enforced the agent's permissions, and the approval tier determined whether a human signed off.

This is why the question "chatbot or agent" is less useful than "what is the unit of work, and who is accountable for it." Answer that, and the architecture follows.

## Questions to ask a vendor

- What is the exact scope of each agent, stated as a workflow with a start and finish?
- Which systems can the agent write to, and through what permission model?
- Show me the approval tiers as configured data, not as a slide.
- What is the unit of work, and how do you measure it against our baseline?
- Where is every action logged, and can our auditors export it?

A vendor that answers those five questions concretely is selling agents. A vendor that answers with a demo of a conversation is selling a chatbot, whatever the label says.

${OUTCOME_FOOTNOTE}
`.trim();

const agentsVsChatbots: Article = {
  slug: "ai-agents-vs-chatbots-in-hr-and-finance",
  title: "AI agents vs. chatbots in HR and finance: the difference that matters",
  description:
    "Chatbots answer; agents complete work. The four differences that matter in HR and finance are scope, actions, approvals, and measurability, with a side-by-side comparison table.",
  category: "Explainers",
  publishedAt: "2026-03-26",
  updatedAt: "2026-07-14",
  readingMinutes: readingMinutes(agentsVsChatbotsBody),
  author: { name: "Elena Marchetti", role: "Head of HR Solutions" },
  keyTakeaways: [
    "A chatbot is a conversational interface that returns answers; an AI agent completes a defined unit of work by reading and writing to systems of record under an approval model.",
    "The four differences that matter in HR and finance are scope (one workflow, not a knowledge base), actions (write access through permitted tools), approvals (tiered per action with a named approver), and measurability (units completed against a human baseline).",
    "Meridian agents use four approval tiers, autonomous, confirm, approve, and prohibited, and every action at every tier is logged with inputs, decision, and approver.",
    "Decision rule: if a conversation should end in a change to a system of record more than about 20% of the time, the business needs an agent rather than a chatbot.",
    "In modeled design-partner deployments, the Scheduling Agent cuts time to fill a shift by about 90% and the Help Desk Agent deflects up to 75% of HR case volume, outcomes a chatbot cannot produce because it takes no actions.",
  ],
  body: agentsVsChatbotsBody,
  faqs: [
    {
      question: "Is an AI agent just a chatbot with tools?",
      answer:
        "Tools are necessary but not sufficient. An agent also has a defined scope, an approval model for consequential actions, state stored in the system of record rather than in the conversation, a structured audit trail, and a countable unit of work. A chatbot with tools but no approval tiers or audit trail is an ungoverned agent, which is the riskiest configuration of all.",
    },
    {
      question: "Can an existing HR chatbot be upgraded into an agent?",
      answer:
        "Sometimes, if the chatbot already integrates with the HR system of record and the vendor can add scoped write actions, approval tiers, and action-level logging. More often, the chatbot remains the conversational front door and routes units of work to purpose-built agents behind it. That is the pattern Meridian follows with Assist in front of the scoped agents.",
    },
    {
      question: "Do AI agents in HR make decisions without humans?",
      answer:
        "Not for consequential decisions. Meridian agents execute low-risk, reversible actions autonomously, ask the requester to confirm actions that affect only them, require a second person to approve actions such as payroll changes, and are prohibited from actions such as terminations. GDPR Article 22 and the EU AI Act reinforce this boundary for hiring, pay, and performance decisions.",
    },
    {
      question: "How do you measure an AI agent compared with a chatbot?",
      answer:
        "A chatbot is measured on containment and satisfaction, which are proxies. An agent is measured on units of work completed, automation rate, cycle time against a human baseline, quality (reopen or override rate), governance (unapproved consequential actions, which should be zero), and cost per unit. Those metrics make an agent a budget line with a return rather than a subscription with a sentiment score.",
    },
  ],
  relatedAgentSlugs: ["help-desk", "scheduling", "planning", "close"],
  seo: {
    title: "AI Agents vs. Chatbots in HR and Finance",
    description:
      "Chatbots answer; agents complete work. Four differences that matter in HR and finance: scope, actions, approvals, and measurability, with a comparison table.",
    keywords: [
      "AI agents vs chatbots",
      "HR AI agents",
      "finance AI agents",
      "agentic AI enterprise",
      "human-in-the-loop approvals",
      "HR chatbot",
      "AI agent measurement",
    ],
  },
};

// ---------------------------------------------------------------------------
// 3. Consumption pricing for AI agents, explained
// ---------------------------------------------------------------------------

const consumptionPricingBody = `
Consumption pricing for AI agents charges for completed units of work rather than for seats or messages. On Meridian, the unit is a credit: each plan includes a monthly pool of credits, each agent action draws a fixed number of credits, and usage beyond the pool is billed at $0.12 per credit.

This article explains how credits work, what counts as an action, how to estimate a monthly bill with worked examples, and how to keep consumption inside budget.

## Why agents are priced on consumption

Seat pricing assumes the software's value scales with the number of people who log in. Agents invert that assumption: the fewer humans who need to touch a process, the better the agent is working. Charging per seat would penalize the outcome the customer is buying. Consumption pricing ties cost to work done, which has two consequences worth understanding before you sign.

First, cost becomes variable, which finance teams must budget for. Second, the vendor's revenue depends on the agent completing work correctly, because a wrong action that gets rolled back is consumed effort with no customer value. That alignment is a feature, but only if the credit definitions are clear.

## What a credit is

A credit is a unit of consumption debited when an agent completes a defined action. Credits are not tokens, API calls, or minutes of compute. A single HR case may involve several model calls, tool calls, and a retrieval step; the customer is charged two credits for the resolved case regardless of how many internal steps it took. That is a deliberate design choice. Token-based pricing pushes cost risk onto the customer for variability the customer cannot control.

## What counts as an action

As of September 2026, Meridian's published credit rates are:

| Action | Agent | Credits |
|---|---|---|
| HR case resolved | Help Desk Agent | 2 |
| Candidate screened | Recruiting Agent | 1 |
| Shift filled | Scheduling Agent | 1 |
| Audit evidence package delivered | Audit Agent | 5 |
| Variance commentary produced | Planning Agent | 3 |
| Contract redline completed | Contract Review Agent | 8 |
| Overage, any action | All agents | $0.12 per credit |

Three rules govern what is billable:

- Only completed actions consume credits. A case that escalates to a human before resolution is not billed as a resolved case. A candidate screen that fails validation is not billed.
- Actions that a human rejects at an approval step are not billed. If the Contract Review Agent produces a redline and the reviewing lawyer discards it, no credits are consumed.
- Reads are free. Employees asking the Help Desk Agent questions that do not become cases, and finance users exploring plan data through the Planning Agent without generating commentary, do not draw credits.

## Plans and included credits

| Plan | Monthly price | Annual price (per month) | Included credits | Effective included rate |
|---|---|---|---|---|
| Starter | $499 | $399 | 5,000 | $0.100 per credit ($0.080 annual) |
| Growth | $2,499 | $1,999 | 30,000 | $0.083 per credit ($0.067 annual) |
| Enterprise | Custom | Custom | Custom pool | Negotiated |

Starter includes 3 agents and 1 workspace. Growth includes all generally available agents, Registry and Gateway, and SSO. Enterprise adds unlimited agents, custom credit pools, Data Fabric, Studio, a dedicated environment, and a 99.95% SLA.

The effective rate matters because the overage rate of $0.12 is 1.2 times Starter's included rate and about 1.45 times Growth's. Consistent overage is a signal to move up a tier, not a penalty to absorb.

## Three worked examples

The examples below use the published credit rates and plan pools above; substitute your own volumes.

### Worked example 1: a 1,200-employee software company

Assumptions, stated so you can substitute your own:

- HR case volume of 0.8 cases per employee per month, a common range for companies with self-service portals: 960 cases.
- The Help Desk Agent resolves 70% of them: 672 resolved cases at 2 credits each, or 1,344 credits.
- 12 hires per month with 55 screened candidates per hire: 660 screens at 1 credit, or 660 credits.
- 6 audit evidence packages per month averaged across the year, rising during audit season: 30 credits.
- 40 variance commentaries per month for the FP&A team: 120 credits.

Monthly total: 2,154 credits. Starter's 5,000-credit pool covers this with 57% headroom, at $499 per month. The effective cost per resolved HR case, allocating the whole subscription to HR cases alone, is $0.74. Most HR service centers estimate a fully loaded cost per human-handled tier-1 case between $12 and $25.

### Worked example 2: an 8,000-employee retailer with frontline staff

- 6,400 HR cases per month; 75% resolved by the agent: 4,800 cases, 9,600 credits.
- 120 hires per month at 50 screens each: 6,000 credits.
- 3,000 open shifts filled per month: 3,000 credits.
- 40 audit packages: 200 credits.
- 300 variance commentaries across store P&Ls: 900 credits.
- 60 supplier contract redlines: 480 credits.

Monthly total: 20,180 credits. Growth's 30,000-credit pool covers this with 33% headroom at $2,499 per month, or $1,999 billed annually. If the retailer opens 1,500 more shifts in December, consumption rises to about 21,700 credits, still inside the pool.

### Worked example 3: what overage looks like

Suppose the same retailer acquires a chain and case volume rises 40% for a quarter. Monthly consumption reaches roughly 34,000 credits. The 4,000 credits above the Growth pool are billed at $0.12, adding $480 to the $2,499 subscription, a total of $2,979. Overage is not catastrophic, but if the volume is permanent, an Enterprise credit pool sized to 40,000 credits will cost less per credit than a standing overage.

## Budgeting for consumption

Finance teams budget consumption pricing the same way they budget cloud spend: a base commitment plus a forecast band.

1. Baseline the volume drivers: employees, monthly cases, hires, shifts, invoices, contracts. These are numbers your HRIS and ERP already report.
2. Apply expected automation rates conservatively. Use 60% deflection for the Help Desk Agent in budget even if modeled outcomes suggest 75%; revise upward after 90 days of measured data.
3. Add seasonality. Audit season, open enrollment, peak hiring, and year-end close all move consumption by 20% to 50% for a month or two.
4. Set the plan so that the forecast peak month sits below 85% of the included pool.
5. Review actuals monthly against the forecast in Registry, which reports credits by agent and by outcome.

## Guardrails against overage

Meridian provides four controls, configurable per workspace, so that consumption does not surprise the budget owner:

- Alerts at 70%, 85%, and 100% of the monthly pool, sent to the workspace owner and the finance contact.
- Hard caps per agent. A cap on the Scheduling Agent, for instance, pauses new shift fills once a credit threshold is reached, with a notification to the owner and an option to raise the cap.
- Approval gates for high-credit actions. Contract redlines at 8 credits can be set to require a reviewer's confirmation before the agent starts.
- Rollover terms. Unused credits on Starter and Growth expire monthly; Enterprise credit pools can be structured as quarterly or annual commitments, which smooths seasonal peaks.

## Questions to ask any vendor with consumption pricing

- What exactly is the billable unit, and is a rejected or rolled-back action billed?
- Are reads and retries free?
- What is the overage rate relative to the included rate?
- Can we cap consumption per agent, and what happens at the cap?
- Can we see consumption by agent, by outcome, and by cost center, in real time?

If the answers are precise, the model is safe to budget. If the billable unit is "tokens" or "requests," ask for a worked example using your own volumes before you sign.

${OUTCOME_FOOTNOTE}
`.trim();

const consumptionPricing: Article = {
  slug: "consumption-pricing-for-ai-agents-explained",
  title: "Consumption pricing for AI agents, explained",
  description:
    "How credit-based pricing works for AI agents: what counts as a billable action, Meridian's published credit rates, three worked examples, budgeting, and guardrails against overage.",
  category: "Buying and ROI",
  publishedAt: "2026-04-15",
  updatedAt: "2026-09-10",
  readingMinutes: readingMinutes(consumptionPricingBody),
  author: { name: "Aisha Bello", role: "Head of Pricing and Packaging" },
  keyTakeaways: [
    "Consumption pricing charges for completed units of agent work; on Meridian the unit is a credit, and plans include 5,000 credits per month (Starter, $499) or 30,000 credits per month (Growth, $2,499).",
    "Published credit rates as of September 2026: HR case resolved 2, candidate screened 1, shift filled 1, audit evidence package 5, variance commentary 3, contract redline 8; overage is $0.12 per credit.",
    "Only completed, accepted actions consume credits; escalated cases, rejected approvals, and read-only questions are not billed.",
    "A 1,200-employee company modeled at 960 HR cases and 12 hires a month consumes about 2,150 credits and fits Starter with 57% headroom; an 8,000-employee retailer with frontline scheduling consumes about 20,200 credits and fits Growth with 33% headroom.",
    "Budget consumption like cloud spend: size the plan so the forecast peak month stays below 85% of the included pool, and use per-agent caps and 70%, 85%, and 100% alerts to prevent surprise overage.",
  ],
  body: consumptionPricingBody,
  faqs: [
    {
      question: "How many credits does an AI agent action cost on Meridian?",
      answer:
        "As of September 2026: 2 credits per HR case resolved, 1 per candidate screened, 1 per shift filled, 5 per audit evidence package, 3 per variance commentary, and 8 per contract redline. Starter includes 5,000 credits per month and Growth includes 30,000; usage beyond the pool is billed at $0.12 per credit.",
    },
    {
      question: "Is consumption pricing more expensive than per-seat pricing for AI agents?",
      answer:
        "For high-volume workflows it is usually cheaper, because you pay for completed units rather than for every employee who might ask a question. The Growth plan's effective included rate is about $0.083 per credit, so a resolved HR case costs about $0.17 in credits, against a typical fully loaded human cost of $12 to $25 per tier-1 case. Consumption pricing is more expensive only when volume is very low and a plan's included pool goes unused.",
    },
    {
      question: "What happens if we exceed our monthly credit pool?",
      answer:
        "Actions continue and the excess is billed at $0.12 per credit unless you have set hard caps per agent, in which case the capped agent pauses and notifies its owner. Alerts at 70%, 85%, and 100% of the pool give the budget owner time to raise caps, defer low-priority work, or move to a larger plan. Persistent overage is a signal to size up, since the overage rate is 1.2 to 1.45 times the included rate.",
    },
    {
      question: "Are AI agent credits the same as tokens?",
      answer:
        "No. Tokens measure model input and output and vary with prompt length, retries, and model choice, none of which the customer controls. A credit is charged per completed business action, such as one resolved case, regardless of how many model or tool calls it took. That fixed mapping is what makes agent consumption budgetable.",
    },
  ],
  relatedAgentSlugs: ["help-desk", "recruiting", "scheduling", "audit", "planning", "contract-review"],
  seo: {
    title: "Consumption Pricing for AI Agents, Explained",
    description:
      "How credit-based pricing for AI agents works: what counts as an action, Meridian credit rates, three worked examples, and guardrails against overage.",
    keywords: [
      "consumption pricing AI agents",
      "AI agent credits",
      "usage-based pricing enterprise AI",
      "AI agent pricing model",
      "credit overage",
      "Meridian pricing",
      "cost per resolved case",
    ],
  },
};

// ---------------------------------------------------------------------------
// 4. How to govern AI agents in HR: a practical framework
// ---------------------------------------------------------------------------

const governHrAgentsBody = `
Governing AI agents in HR means deciding, in writing and in configuration, what each agent may do, which data it may touch, which actions require a human, and how every action is recorded, communicated, and reviewed. A workable framework has seven parts: scope, data permissions, approval tiers, audit trail, model choice, employee communication, and legal alignment with works councils and GDPR.

HR is the hardest place to govern agents well, and the best place to start. It is hard because HR data is personal data about people with legal rights, and because HR decisions about hiring, pay, and performance are regulated in most jurisdictions. It is the right place to start because HR teams already run the closest thing enterprises have to an agent governance process: the employee lifecycle.

## 1. Scope: one agent, one workflow

Scope is the single workflow an agent is authorized to perform, stated with a start, a finish, and an explicit list of excluded actions. Write it before configuring anything.

A scope statement for the Help Desk Agent might read: "Answers employee questions using approved policy documents and the employee's own records; opens, updates, and closes tier-1 HR cases; escalates anything involving pay changes, leave disputes, accommodations, grievances, or terminations to a named human queue. Never changes compensation, employment status, or manager assignment."

Scope statements do three things. They bound testing, because you test the workflow, not the universe. They bound permissions, because access follows scope. And they give works councils and privacy officers a document to review that is shorter than a data protection impact assessment and written in plain language.

## 2. Data permissions: least privilege, enforced in the runtime

Data permissions define which systems, objects, fields, and records an agent may read or write. Two principles apply.

- Least privilege. The Recruiting Agent needs applications, job requisitions, and interviewer calendars. It does not need salary history, medical accommodations, or the performance records of current employees. Grant nothing outside the scope statement.
- Same security model as humans. Agents should inherit the customer's existing role-based access model rather than a parallel one. In Meridian, every agent has an identity in the customer's IdP and reads data through Data Fabric under that identity, so a report on "who can see field X" includes agents automatically.

### Special categories under Article 9

Special categories under GDPR Article 9, such as health, union membership, and ethnic origin, deserve an explicit rule: either exclude these fields from agent access entirely or document the legal basis and the necessity for each agent that touches them. In practice, exclusion is right for nearly every HR agent, with the Payroll Agent's handling of statutory deductions as the common exception.

## 3. Approval tiers: which actions pause for a human

An approval tier is a rule assigning each action type to autonomous execution, requester confirmation, second-person approval, or prohibition. The table below is a starting configuration for HR agents. Adjust it with your legal and works council partners.

| Action | Agent | Tier | Approver |
|---|---|---|---|
| Answer policy question from approved documents | Help Desk Agent | Autonomous | None |
| Submit an employee's own leave request | Help Desk Agent | Confirm | The employee |
| Rank applicants against stated criteria | Recruiting Agent | Autonomous, advisory | Recruiter reviews before any candidate is declined |
| Send a rejection to a candidate | Recruiting Agent | Approve | Recruiter |
| Flag a missing tax form before the payroll run | Payroll Agent | Autonomous | None |
| Apply a statutory wage update to a pay group | Payroll Agent | Approve | Payroll manager |
| Fill an open shift with an eligible volunteer | Scheduling Agent | Confirm | The employee taking the shift |
| Draft a performance review from goals and feedback | Performance Agent | Approve | The manager, who must edit or accept |
| Recommend a pay band change | Job Architecture Agent | Approve | Compensation lead |
| Change compensation, status, or manager | Any | Prohibited | Not permitted |

Two notes. First, "advisory" matters legally: GDPR Article 22 gives individuals the right not to be subject to a decision based solely on automated processing that produces legal or similarly significant effects, and hiring, pay, and dismissal decisions qualify. A human must genuinely review, not rubber-stamp. Second, approval tiers should be stored as data in Registry so that an auditor can query "every action any agent may take on candidate records without human approval" and get a list, not a policy PDF.

## 4. Audit trail: every action, with its inputs

An audit trail for agents is an immutable record of each action, the data the agent read to take it, the decision and its rationale, the approval if any, and the outcome. Chat transcripts are not audit trails.

Minimum contents per action:

- Agent identity and version, and the model configuration in use.
- The requesting user, if any, and the affected employee or candidate record.
- Data read, by object and field, with record identifiers.
- The action taken, the tier it fell under, and the approver.
- Outcome, including any subsequent override, rollback, or complaint.

Retention should follow your existing HR record retention schedule, which in many EU jurisdictions means the duration of employment plus a statutory period. Registry keeps the trail per agent; Gateway captures it for third-party agents through OpenTelemetry, so agents you did not build are held to the same standard.

## 5. Model choice: decide it, record it, review it

Model choice is the decision about which language model an agent runs on, and it belongs in governance rather than in an engineer's configuration file. Meridian is model-agnostic: customers bring frontier models from providers such as Anthropic or OpenAI, and Meridian routes HR-specific reasoning to its own HR-tuned models. Three governance points follow.

- Record the model per agent in Registry, including the version, so that a change of model is a change event with an owner.
- Confirm contractual terms: no training on your data, data residency in the EU or US as required, and a data processing agreement covering the model provider.
- Re-run your evaluation set when the model changes. A model upgrade that improves average quality can still shift behavior on edge cases such as accommodation requests, and HR edge cases are where complaints originate.

## 6. Employee communication: tell people before the agent does

Employees have a right to know when they are interacting with an AI system, and in the EU that right is explicit for AI systems intended to interact with people. Beyond the legal minimum, silence damages adoption. A practical communication plan:

- Announce each agent before launch with its scope statement in plain language, what it can and cannot do, and how to reach a human.
- Label agent interactions in the interface. Assist, Meridian's conversational front door, identifies which agent is acting.
- Publish the escalation path and the response-time commitment for humans.
- Report quarterly on agent activity: volumes, escalations, complaints, and changes. Transparency is cheaper than the rumor mill.

## 7. Works councils and GDPR: engage early, document everything

In Germany, the Works Constitution Act gives the works council co-determination rights over technical systems capable of monitoring employee performance or behavior, and most HR agents qualify. In Austria, the Netherlands, France, and other jurisdictions, similar consultation or consent rights apply. Engage the council at the scope-statement stage, not at launch.

### What the council will ask for

Works councils typically request:

- The scope statement and the excluded actions.
- The data permissions, in particular whether the agent can see performance or behavior data.
- Whether agent output can be used in disciplinary or performance proceedings.
- The audit trail and who may access it.
- A review clause, often at 6 and 12 months.

### DPIAs and the EU AI Act

Under GDPR, run a data protection impact assessment for any agent that processes personal data at scale, evaluates or scores individuals, or makes decisions with significant effects. The Recruiting, Performance, Job Architecture, and Payroll Agents will nearly always require one. Under the EU AI Act, AI systems used in recruitment, task allocation, and performance evaluation are classified as high-risk, and the corresponding obligations, including human oversight, logging, and transparency, are scheduled to phase in from August 2026. As of September 2026 the Commission has proposed adjustments to that timetable, so confirm the current transition dates with counsel. A framework built on the seven parts above already produces most of the required documentation.

## Putting it into operation

Governance that lives in a policy document fails within a quarter. Governance that lives in Registry as scope, permissions, approval tiers, model configuration, and audit trail is enforceable, because Gateway will refuse actions outside it. Start with one agent, write the scope statement first, configure the tiers conservatively, launch with communication, and expand the tiers after 90 days of clean audit trail. Trust in HR is earned by being predictable, and agents should be governed accordingly.
`.trim();

const governHrAgents: Article = {
  slug: "how-to-govern-ai-agents-in-hr",
  title: "How to govern AI agents in HR: a practical framework",
  description:
    "A seven-part framework for governing AI agents in HR: scope statements, least-privilege data permissions, approval tiers, audit trail, model choice, employee communication, and works council and GDPR alignment.",
  category: "Governance",
  publishedAt: "2026-05-06",
  updatedAt: "2026-09-10",
  readingMinutes: readingMinutes(governHrAgentsBody),
  author: { name: "Marcus Feld", role: "Head of Trust and Governance" },
  keyTakeaways: [
    "Governing AI agents in HR has seven parts: scope, data permissions, approval tiers, audit trail, model choice, employee communication, and legal alignment with works councils and GDPR.",
    "A scope statement is a plain-language definition of the one workflow an agent performs, with a start, a finish, and an explicit list of excluded actions; write it before configuring anything.",
    "GDPR Article 22 means hiring, pay, and dismissal decisions cannot rest solely on automated processing, so recruiting and performance agents must run in advisory mode with genuine human review.",
    "An audit trail for agents records, per action, the agent version, model, data read by field, action taken, approval tier, approver, and outcome; a chat transcript does not qualify.",
    "Under the EU AI Act, agents used in recruitment, task allocation, and performance evaluation are high-risk systems whose oversight, logging, and transparency obligations are scheduled to phase in from August 2026.",
  ],
  body: governHrAgentsBody,
  faqs: [
    {
      question: "Do works councils need to approve AI agents in HR?",
      answer:
        "In Germany, yes in most cases: the Works Constitution Act gives works councils co-determination rights over technical systems capable of monitoring performance or behavior, which covers most HR agents, and deployment typically requires a works agreement. Several other European jurisdictions have consultation or consent rights. Engage the council when the scope statement is drafted, and bring the data permissions, approval tiers, and audit trail design to that conversation.",
    },
    {
      question: "Does GDPR allow AI agents to make hiring decisions?",
      answer:
        "GDPR Article 22 gives individuals the right not to be subject to decisions based solely on automated processing that produce legal or similarly significant effects, and hiring decisions qualify. An agent may screen, rank, and recommend; a human must make the decision with genuine review, and the candidate must be informed. A data protection impact assessment is required, and the EU AI Act classifies recruitment systems as high-risk.",
    },
    {
      question: "What should an AI agent audit trail contain?",
      answer:
        "For every action: the agent identity and version, the model configuration, the requesting user, the affected record, the data read by object and field, the action taken, the approval tier and approver, and the outcome including any override or rollback. The trail must be immutable and retained per your HR record schedule. A chat transcript does not meet this standard.",
    },
    {
      question: "Is an HR help desk agent high-risk under the EU AI Act?",
      answer:
        "Usually not on its own. Answering policy questions and handling tier-1 cases is not one of the Annex III employment uses, which cover recruitment, promotion and termination decisions, task allocation based on personal traits, and performance monitoring. It becomes higher risk if its outputs feed evaluations or decisions about employees, which is why the scope statement should exclude those uses explicitly.",
    },
  ],
  relatedAgentSlugs: ["help-desk", "recruiting", "payroll", "performance", "job-architecture"],
  seo: {
    title: "How to Govern AI Agents in HR: A Framework",
    description:
      "A seven-part framework for governing AI agents in HR: scope, data permissions, approval tiers, audit trail, model choice, employee communication, and GDPR.",
    keywords: [
      "AI agent governance HR",
      "HR AI compliance",
      "GDPR Article 22 AI",
      "EU AI Act HR high-risk",
      "works council AI",
      "human-in-the-loop HR",
      "AI audit trail",
    ],
  },
};

// ---------------------------------------------------------------------------
// 5. Closing the books 3 days faster with AI agents
// ---------------------------------------------------------------------------

const monthEndCloseBody = `
AI agents shorten the month-end close by taking over the coordination, reconciliation, and evidence-gathering work that consumes most of the calendar, while accountants keep the judgment and the sign-offs. In modeled design-partner deployments, Meridian's Close Agent, working with the Controls Agent, the Audit Agent, and the Planning Agent, shortens the close by 3 business days, typically from an 8-day close to a 5-day close.

## Where the days go

The month-end close is the process of finalizing a period's accounting records so that financial statements can be produced. As of September 2026, most mid-size and enterprise closes take between 6 and 10 business days. Ask a controller where the time goes and the answer is rarely "accounting." It is waiting: waiting for a subsidiary to submit, waiting for a reconciliation owner to return from vacation, waiting for someone to find the support for a variance, waiting for approvals to move through email.

A close has four kinds of work:

- Orchestration: knowing what is due, from whom, in what order, and chasing it.
- Reconciliation: matching balances between the ledger and sub-ledgers, banks, and third parties, and explaining differences.
- Evidence: attaching support for balances, accruals, and adjustments so that reviewers and auditors can rely on them.
- Judgment: deciding accruals, estimates, and unusual items, and signing off.

Agents take most of the first three. Humans keep the fourth, and most of the sign-offs in the third.

## What each agent does in the close

- The Close Agent orchestrates the close calendar. It knows every task, its owner, its dependencies, and its deadline; starts tasks whose inputs are ready; nudges owners; prepares reconciliations where the data is available; routes sign-offs; and reports status in real time.
- The Controls Agent tests transactions continuously during the month for duplicates, anomalies, and policy breaches, so exceptions are resolved before the close instead of during it. One design partner avoided about $283K per year in duplicate payments this way.
- The Audit Agent collects, labels, and packages evidence for balances and adjustments as they are booked, so the audit file is built during the close rather than reconstructed months later. Design partners model about 900 hours saved per year on evidence collection.
- The Planning Agent drafts variance commentary as actuals land, comparing to budget and prior period, so the management pack is ready when the ledger is.

## The close calendar, before and after

The table below shows a representative calendar for a company with three legal entities, two ERPs, and a 12-person accounting team. "Day" counts business days after period end. The "before" column is the modeled baseline; the "after" column is the modeled outcome with agents in place.

| Task | Before (Day) | After (Day) | Who does it after |
|---|---|---|---|
| Sub-ledger cutoff confirmations (AP, AR, payroll, fixed assets) | 1 | 1 | Close Agent confirms cutoffs and flags late feeds |
| Bank reconciliations, 14 accounts | 2 to 3 | 1 | Close Agent prepares; staff accountant reviews exceptions |
| Intercompany matching and elimination | 3 to 4 | 2 | Close Agent matches; senior accountant resolves disputes |
| Accruals and prepaid amortization | 3 to 4 | 2 | Close Agent proposes from open POs and contracts; controller approves |
| Duplicate and anomaly review of period transactions | 4 to 5 | Continuous, cleared by Day 1 | Controls Agent flags; AP lead clears |
| Balance sheet reconciliations, 120 accounts | 4 to 6 | 2 to 3 | Close Agent prepares 90%; owners certify |
| Evidence attached to adjustments and estimates | 5 to 7 | As booked | Audit Agent packages; preparer confirms |
| Variance analysis and commentary | 6 to 7 | 3 to 4 | Planning Agent drafts; FP&A edits |
| Consolidation and management review | 7 to 8 | 4 to 5 | Controller and CFO |
| Sign-offs and close | 8 | 5 | Controller certifies; CFO approves |

### Where the three days come from

Three business days come out of the calendar. They come from three places: reconciliations that are prepared the moment data lands instead of when a person gets to them, exceptions that are cleared during the month instead of in the close window, and status that is visible without a meeting.

## Reconciliations in detail

A reconciliation is a comparison of two independent records of the same balance, with every difference explained and supported. The Close Agent prepares reconciliations by pulling both sides through Data Fabric, matching items by amount, date, and reference, and classifying unmatched items into known categories such as timing differences, bank fees, or unposted entries. What remains is a short list of true exceptions.

The human role changes but does not disappear. Instead of matching 400 items, the account owner reviews 12 exceptions, decides how to clear each, and certifies the reconciliation. Certification stays with the human because it is an attestation, and attestation is a matter of accountability, not computation.

Design partners report that after two closes, about 90% of balance sheet reconciliations arrive at the owner in a review-ready state, and the median time an owner spends per reconciliation falls from about 45 minutes to under 10.

## Evidence and the audit file

Evidence is the documentation that supports a balance or an adjustment: invoices, contracts, calculations, approvals, and third-party confirmations. Traditionally evidence is gathered twice, once loosely during the close and again, properly, when the auditors ask. The Audit Agent gathers it once. As each adjustment is booked, the agent attaches the source documents, labels them to the audit firm's request-list conventions, and stores the package with the journal entry. When the auditor asks in March for support for an accrual booked in November, the package already exists.

## Controls during the close

Controls are the checks that prevent or detect errors and fraud. Moving them earlier is the largest single source of calendar savings. The Controls Agent tests every transaction against duplicate patterns, vendor master changes, split invoices under approval thresholds, and unusual account combinations, continuously. By Day 1 of the close, the exception queue is short and the AP lead has cleared most of it.

### The two controls that stay human

Two controls remain firmly human and are logged as approval-tier actions in Registry:

- Journal entries proposed by any agent require approval by a named preparer and reviewer before posting.
- Reconciliation certification is performed by the account owner, and the Close Agent cannot certify on anyone's behalf.

## Implementation, close by close

- Close 1: run the Close Agent in shadow mode. It builds the calendar, tracks status, and prepares reconciliations, but staff continue their existing process. Compare its reconciliations to theirs.
- Close 2: switch bank and intercompany reconciliations to agent-prepared, owner-certified. Turn on the Controls Agent for the full month.
- Close 3: extend to balance sheet reconciliations and accruals. Turn on Audit Agent evidence packaging.
- Close 4: turn on Planning Agent commentary. Publish the new calendar with target Day 5.

Most design partners reach the 3-day reduction by the fourth close. Companies with a single ERP and fewer entities have reached it by the third.

## What a faster close is worth

A 3-day shorter close is worth more than the overtime it removes. Management gets results three days earlier, which matters for a quarterly earnings cycle and for any decision that waits on actuals. The audit file is built continuously, which reduces year-end fees and staff disruption. And the accounting team's month has three more days that are not the close, which is the difference between retention and turnover for the people who know your ledger best.

${OUTCOME_FOOTNOTE}
`.trim();

const monthEndClose: Article = {
  slug: "month-end-close-with-ai-agents",
  title: "Closing the books 3 days faster with AI agents",
  description:
    "How the Close, Controls, Audit, and Planning Agents remove three business days from the month-end close: orchestration, reconciliations, evidence, controls, and a before-and-after close calendar.",
  category: "Finance operations",
  publishedAt: "2026-05-28",
  updatedAt: "2026-09-10",
  readingMinutes: readingMinutes(monthEndCloseBody),
  author: { name: "Priya Raman", role: "Head of Finance Solutions" },
  keyTakeaways: [
    "The month-end close consists of orchestration, reconciliation, evidence, and judgment; AI agents take most of the first three while accountants keep the judgment and the sign-offs.",
    "In modeled design-partner deployments, Meridian's Close Agent shortens the close by 3 business days, typically from an 8-day close to a 5-day close, by the fourth close after go-live.",
    "The three sources of calendar savings are reconciliations prepared the moment data lands, exceptions cleared continuously by the Controls Agent instead of during the close window, and status visible without meetings.",
    "After two closes, about 90% of balance sheet reconciliations arrive at the owner review-ready, and median owner time per reconciliation falls from about 45 minutes to under 10.",
    "Two controls stay human and are recorded as approval-tier actions: journal entries proposed by an agent need a named preparer and reviewer, and reconciliation certification is performed only by the account owner.",
  ],
  body: monthEndCloseBody,
  faqs: [
    {
      question: "How long should a month-end close take?",
      answer:
        "Most mid-size and enterprise closes take 6 to 10 business days; a 5-day close is a common target and a 3-day close is considered leading practice for companies with simple entity structures. In modeled design-partner deployments, Meridian's Close Agent removes 3 business days, typically moving an 8-day close to 5 days by the fourth close after go-live.",
    },
    {
      question: "Can AI agents post journal entries?",
      answer:
        "On Meridian, agents propose journal entries; they do not post them. Every agent-proposed entry is an approval-tier action requiring a named preparer and reviewer before posting, and the proposal, its support, and the approvals are recorded in the audit trail. This preserves segregation of duties and keeps the control auditable.",
    },
    {
      question: "How do AI agents help with account reconciliations?",
      answer:
        "The Close Agent pulls both sides of a reconciliation through Data Fabric, matches items by amount, date, and reference, classifies unmatched items into known categories such as timing differences, and presents the account owner with a short list of true exceptions. The owner clears the exceptions and certifies the reconciliation; certification is never delegated to the agent.",
    },
    {
      question: "Will auditors accept evidence collected by an AI agent?",
      answer:
        "Auditors evaluate evidence on relevance, reliability, and provenance, not on who collected it. Evidence packaged by the Audit Agent carries source documents, timestamps, the query or system it came from, and the preparer's confirmation, which is more provenance than most manually assembled files. Involve your audit firm early so packages follow its request-list conventions.",
    },
  ],
  relatedAgentSlugs: ["close", "controls", "audit", "planning"],
  seo: {
    title: "Close the Books 3 Days Faster with AI Agents",
    description:
      "How Meridian Close, Controls, Audit, and Planning Agents shorten the month-end close by 3 days, with a day-by-day before-and-after close calendar.",
    keywords: [
      "month-end close AI agents",
      "faster financial close",
      "account reconciliation automation",
      "close management software",
      "audit evidence automation",
      "continuous controls monitoring",
      "Close Agent",
    ],
  },
};

// ---------------------------------------------------------------------------
// 6. Model Context Protocol for enterprise agents
// ---------------------------------------------------------------------------

const mcpForEnterpriseBody = `
Model Context Protocol (MCP) is an open standard that lets an AI agent discover and call tools, read data sources, and use prompts exposed by any system that implements the protocol, through one common interface instead of a custom integration per system. For a CFO or CIO, MCP matters because it turns "which agents can touch which systems" from a per-vendor negotiation into a question of configuration, and that configuration can be governed, logged, and audited centrally.

## MCP in plain terms

Think of MCP as a standard socket between agents and the systems they work on. Before a standard existed, every agent vendor wrote its own connector to every enterprise system, and every connector carried its own credentials, permissions, and logging. MCP separates the two sides. A system, or a thin service in front of it, runs an MCP server that publishes what it offers. An agent runs an MCP client that discovers those offerings and calls them. The two sides agree on message formats, so any compliant agent can work with any compliant server.

MCP was published as an open standard in November 2024 and has since moved to open, vendor-neutral governance. As of September 2026 it is the most widely implemented protocol for agent tool access, supported by the major model providers and by a large and growing set of enterprise software vendors.

### What an MCP server exposes

An MCP server exposes three kinds of things:

- Tools: operations the agent can invoke, each with a name, a description, and a typed input schema, such as "get_employee_leave_balance" or "create_journal_entry_draft."
- Resources: data the agent can read, addressed by URI, such as a policy document or a reconciliation worksheet.
- Prompts: reusable instruction templates the server offers for common tasks.

The agent never receives a database connection string or an API key for the underlying system. It receives a list of tools it may call, and each call is a discrete, typed, loggable event.

## Why this matters for HR and finance

HR and finance systems are exactly the systems where uncontrolled agent access is unacceptable. MCP's design has three properties that map directly onto financial controls.

1. Typed, enumerable operations. Because tools are declared with schemas, you can list every operation an agent can perform against the HR core or the ledger, review the list, and approve it. There is no "and anything else the API allows."
2. Discrete calls. Each tool call is a separate message with inputs and outputs, which is the granularity an audit trail needs. Compare this with an agent operating a browser session, where the unit of work is a click.
3. Server-side authority. The MCP server, not the agent, decides what a tool does and under whose identity. A "post_journal_entry" tool can be implemented to create a draft requiring approval, and the agent cannot bypass that by calling the ledger directly, because it has no direct route.

## Tool permissions: the part to get right

A tool permission is a grant that allows a specific agent identity to call a specific tool, optionally constrained by parameters such as cost center, legal entity, or record type. MCP defines how tools are described and called; it does not, by itself, decide who may call what. That decision belongs to your platform, and it is the single most important design choice in an enterprise MCP deployment.

### A five-layer permission model

The recommended model has five layers:

| Layer | Question it answers | Where it is enforced |
|---|---|---|
| Agent identity | Which agent is calling, under which registered version | IdP-issued identity, checked at the Gateway |
| Tool allowlist | Which tools this agent may call at all | Gateway policy, sourced from Registry scope |
| Parameter constraints | Which entities, cost centers, or record types the call may touch | Gateway policy plus server-side checks |
| Approval tier | Whether this call executes, pauses for a human, or is prohibited | Registry approval tiers, enforced before the call is forwarded |
| Data permissions | What the underlying system returns for this identity | The system's own security model, via Data Fabric |

Notice that four layers exist in the system of record and the Gateway, and one exists in the underlying system. Defense in depth is deliberate. Even if an agent were granted a tool in error, the underlying system's security model still applies to the agent's identity.

## The gateway pattern

The gateway pattern places a single, governed MCP endpoint between all agents and all MCP servers, rather than letting agents connect to servers directly. Meridian's Gateway implements this pattern. Every third-party or customer-built agent connects to the Gateway, and the Gateway connects to the enterprise's MCP servers, whether those are Meridian-provided, vendor-provided, or built in-house.

The gateway pattern delivers five things that point-to-point connections cannot:

- One place to enforce Registry scope and approval tiers for agents from any vendor.
- One place to authenticate agents with IdP-issued identities and rotate credentials.
- One place to capture every tool call for the audit trail.
- One place to rate-limit and cap consumption per agent.
- One place to turn an agent off. Suspend it in Registry, and the Gateway stops forwarding its calls.

The alternative, direct connections from each agent to each server, recreates the integration sprawl MCP was meant to remove, with each connection carrying its own credentials and none of them visible to audit.

## Observability with OpenTelemetry

OpenTelemetry (OTel) is the open standard for traces, metrics, and logs that most enterprise observability stacks already ingest. A trace is a record of one end-to-end operation broken into spans, each span covering one step with its timing, inputs, outputs, and status. Applying OTel to agents means every agent run becomes a trace, and every model call, tool call, approval wait, and retry becomes a span.

Meridian's Gateway emits OTel traces for every agent run, using the emerging OpenTelemetry semantic conventions for generative AI so that agent spans carry consistent attributes for model, tokens, tool name, and outcome. Because it is standard OTel, the data flows into the observability platform your IT team already runs. What this gives a CIO and CFO:

- Latency and error rates per agent and per tool, which is how you find the flaky integration before users do.
- Cost per completed outcome, by joining spans to credit consumption.
- A forensic record. When an approver asks why the Payroll Agent flagged a pay group, the trace shows the exact tool calls and data that led to the flag.
- Alerting on behavior change. A jump in tool calls per run after a model upgrade is a signal worth investigating before it becomes a bill.

## Questions for your architecture and vendor reviews

1. Does the vendor's agent platform expose and consume tools through MCP, or through a proprietary connector framework? Proprietary frameworks lock the governance to the vendor.
2. Where are tool permissions enforced, and can we export the effective permissions per agent?
3. Is there a single gateway through which all agents, including third-party ones, reach our systems?
4. Are agent runs emitted as OpenTelemetry traces we can ingest into our own stack?
5. How does an agent authenticate to an MCP server: with an IdP-issued identity we control, or with a shared secret?
6. When we suspend an agent, how quickly do its tool calls stop, and where is that demonstrated?

## The practical takeaway

MCP does not make agents safe. It makes agent access legible, which is the precondition for making it safe. Combine MCP for tool access, a gateway that enforces registry scope and approval tiers, IdP identities for agents, and OpenTelemetry for observability, and you have an agent architecture that a finance controller and an IT auditor can both read. That combination, more than any single model choice, is what determines whether agents can be trusted with the ledger and the HR core.
`.trim();

const mcpForEnterprise: Article = {
  slug: "model-context-protocol-for-enterprise-agents",
  title: "Model Context Protocol for enterprise agents: what CFOs and CIOs need to know",
  description:
    "MCP explained without jargon: how agents discover and call tools, where tool permissions must be enforced, why the gateway pattern matters, and how OpenTelemetry makes agent runs observable.",
  category: "Explainers",
  publishedAt: "2026-06-17",
  updatedAt: "2026-09-10",
  readingMinutes: readingMinutes(mcpForEnterpriseBody),
  author: { name: "Owen Gallagher", role: "Principal Solutions Architect" },
  keyTakeaways: [
    "Model Context Protocol (MCP) is an open standard through which an AI agent discovers and calls tools, reads resources, and uses prompts exposed by any compliant system, replacing per-vendor connectors with one interface.",
    "An MCP server exposes three primitives, tools, resources, and prompts; tools are declared with typed input schemas, so every operation an agent can perform against a ledger or HR core is enumerable and reviewable.",
    "MCP defines how tools are described and called but not who may call them; tool permissions must be enforced in a gateway using agent identity, tool allowlists, parameter constraints, and approval tiers.",
    "The gateway pattern routes all agents, including third-party ones, through one governed endpoint, giving a single place to authenticate, log, cap, and switch off any agent.",
    "Emitting each agent run as an OpenTelemetry trace, with each model call and tool call as a span, provides latency, cost per outcome, and a forensic record in the observability stack IT already operates.",
  ],
  body: mcpForEnterpriseBody,
  faqs: [
    {
      question: "Is MCP secure enough for finance systems?",
      answer:
        "MCP is a protocol for describing and calling tools; security depends on how you deploy it. A secure deployment gives each agent an IdP-issued identity, routes all calls through a gateway that enforces tool allowlists, parameter constraints, and approval tiers, and relies on the underlying system's own security model as the final check. With those layers, MCP gives finance systems a more auditable access path than ad hoc API integrations.",
    },
    {
      question: "What is the difference between MCP and an API?",
      answer:
        "An API is a system's own interface, unique to that system, which an agent developer must integrate individually. MCP is a common interface layered in front of APIs, so any compliant agent can discover and call any compliant system's tools using the same message format. In practice an MCP server wraps an API and publishes a curated, typed set of tools rather than the full API surface.",
    },
    {
      question: "Do we need a gateway if we use MCP?",
      answer:
        "For enterprise deployments, yes. MCP standardizes how agents call tools but does not decide which agent may call which tool or capture the record for audit. A gateway provides one place to authenticate agents, enforce scope and approval tiers, log every call, cap consumption, and switch an agent off. Direct agent-to-server connections recreate the integration sprawl and credential scatter that MCP was meant to reduce.",
    },
    {
      question: "How does OpenTelemetry apply to AI agents?",
      answer:
        "Each agent run is emitted as a trace, and each model call, tool call, approval wait, and retry is a span with timing, inputs, outputs, and status. Because OpenTelemetry is the standard your observability stack already ingests, agent runs appear next to application traces, giving latency and error rates per agent and tool, cost per outcome, and a forensic record for any single action.",
    },
  ],
  relatedAgentSlugs: ["audit", "controls", "help-desk", "contract-review"],
  seo: {
    title: "MCP for Enterprise Agents: CFO and CIO Guide",
    description:
      "Model Context Protocol explained for CFOs and CIOs: how MCP tool access works, where to enforce permissions, the gateway pattern, and OpenTelemetry.",
    keywords: [
      "Model Context Protocol enterprise",
      "MCP explained",
      "MCP gateway",
      "AI agent tool permissions",
      "OpenTelemetry AI agents",
      "agent observability",
      "MCP security finance",
    ],
  },
};

// ---------------------------------------------------------------------------
// 7. The 2026 buyer's guide to AI agents for HR and finance
// ---------------------------------------------------------------------------

const buyersGuideBody = `
The right way to buy AI agents for HR and finance in 2026 is to buy measurable units of work under a governance model you can inspect, starting with a 90-day pilot on one or two workflows where you already have a baseline. This guide gives you a 12-question checklist, the red flags that predict failed deployments, a pilot design, the metrics that matter, and a timeline from first conversation to production.

## What you are actually buying

An AI agent, in this market, is software scoped to one workflow that reads and writes data in your systems under an approval model and produces a countable outcome. You are not buying a model, and you are mostly not buying a conversation. You are buying resolved cases, screened candidates, filled shifts, reconciled accounts, evidence packages, and redlined contracts, plus the governance that lets your auditors and works council accept them.

That framing changes procurement. Instead of a feature comparison, the evaluation becomes: what is the unit of work, what is our baseline, what will it cost per unit, who is accountable when it is wrong, and can we prove all four.

## The 12-question checklist

Ask every vendor these questions and require answers in writing.

1. What is the exact scope of each agent, stated as a workflow with a start, a finish, and excluded actions?
2. Which of our systems will the agent read from and write to, through what integration standard, and under whose identity? Look for Model Context Protocol for tools and identities issued by our IdP.
3. What are the approval tiers, per action type, and can we configure and export them as data?
4. Where is every action logged, what does a log entry contain, and can our internal audit team export it without vendor help?
5. Which models does the agent run on, can we choose or restrict them, and is our data excluded from training under contract?
6. Where does our data reside, and can we require EU or US residency?
7. What is the billable unit, what is the overage rate, and are rejected or rolled-back actions billed?
8. What is the modeled outcome for our workflow, what assumptions produce it, and which existing customers or design partners will describe their measured result?
9. How does the agent behave when it is uncertain, and how do we tune the escalation threshold?
10. How are agents from other vendors, or agents we build ourselves, registered and governed in the same system?
11. What certifications and attestations are current, specifically SOC 2 Type II and ISO 27001, and is a DPA and, where relevant, a BAA available?
12. What happens when we suspend or retire an agent, and how quickly do its credentials stop working?

### The four questions that disqualify

A vendor that answers all 12 precisely may still be the wrong fit. A vendor that cannot answer 3, 4, 7, or 12 is not selling enterprise agents, whatever the website says.

## Red flags

- Outcome claims without units. "Saves 40% of time" is meaningless without the workflow, the baseline, and the measurement method. Meridian states outcomes per agent and labels them as modeled outcomes from design-partner deployments; ask any vendor to be at least that specific.
- Demos that are only conversations. If the demo never shows an action landing in a system of record with an approval step, you are watching a chatbot.
- Token or request-based billing for business workflows. It transfers variability risk to you and makes budgeting impractical.
- A proprietary connector framework as the only integration path. It locks governance to the vendor and makes third-party agents ungovernable.
- No named human owner concept. If the product has no field for the accountable person per agent, it was not designed for regulated work.
- Reluctance to run in shadow mode. A vendor confident in accuracy will let the agent run alongside your team for a cycle with no production writes.
- Change management left entirely to you. Agents in HR need employee communication and, in Europe, works council consultation. Vendors who have done this before have templates.

## Designing the pilot

A pilot is a time-boxed deployment on one or two workflows with a baseline, a measurement plan, and a defined decision at the end. Design it in five steps.

1. Choose workflows with volume and a baseline. Tier-1 HR cases, candidate screening, bank reconciliations, and audit evidence requests are common choices because you already count them.
2. Baseline for two to four weeks before go-live. Record volume, cycle time, human hours, error or reopen rate, and cost per unit. Without this, the pilot cannot succeed or fail; it can only end.
3. Run shadow mode first. The agent processes real inputs but does not write; you compare its outputs with the human outcome. Two weeks is usually enough to calibrate escalation thresholds.
4. Go live with conservative approval tiers. Everything consequential pauses for a human. Widen tiers only with evidence.
5. Decide in advance what "scale" requires: for example, 60% deflection with a reopen rate no worse than the human baseline and zero unapproved consequential actions.

## Success metrics

| Metric | Definition | Typical pilot target |
|---|---|---|
| Units completed | Countable outcomes finished by the agent and accepted | Volume sufficient to be statistically meaningful, usually 500 or more |
| Automation rate | Share of units completed without human handling | Help Desk Agent: 60% to 75%; Recruiting Agent screens: 70% or more |
| Cycle time | Median time from request to completion | Improvement against baseline, for example resolution time −30% for HR cases |
| Quality | Reopen, override, or correction rate | No worse than the human baseline |
| Governance | Unapproved consequential actions; audit trail completeness | Zero; 100% |
| Cost per unit | Credits consumed times effective rate, divided by units | Below human cost per unit by a margin that survives conservative assumptions |
| Adoption | Share of eligible requests routed to the agent | Rising week over week; a flat line signals a communication problem |

Report all seven weekly. Most failed pilots fail on adoption or quality, not on the agent's raw capability, and both are visible early.

## Timeline: from first call to production

| Phase | Weeks | What happens | Exit criterion |
|---|---|---|---|
| Discovery | 0 to 2 | Workflow selection, baseline capture starts, security questionnaire, checklist answered | Two workflows chosen; baseline collection running |
| Governance setup | 2 to 4 | Scope statements, data permissions, approval tiers, DPIA where required, works council briefing | Registry entries approved by owner, privacy, and audit |
| Integration | 3 to 5 | IdP identities issued, MCP tools allowlisted, data access through Data Fabric configured | Agent reads real data in a non-production workspace |
| Shadow mode | 5 to 7 | Agent runs on live inputs without writes; outputs compared with human outcomes | Accuracy and escalation thresholds calibrated |
| Live pilot | 7 to 13 | Production with conservative tiers; weekly metric reviews | Scale criteria met or pilot stopped |
| Scale decision | 13 to 14 | Readout against pre-agreed criteria; budget and plan sizing | Signed decision to scale, extend, or stop |
| Expansion | 14 onward | Additional agents, wider tiers, blended workforce analytics | Each new agent repeats governance setup in one to two weeks |

### Which plan fits the pilot

As of September 2026, Meridian's Starter plan, at $499 per month for 3 agents and 5,000 credits, is sized for this pilot shape. Most organizations move to Growth at the scale decision, when Registry and Gateway become necessary to govern more than a handful of agents.

## Commercial terms worth negotiating

- A pilot-to-production price that holds for 12 months, so the scale decision is not a renegotiation.
- Credit pool flexibility around known seasonal peaks.
- A right to run any new agent in shadow mode before it consumes credits.
- Export rights for the audit trail and Registry data at contract end.
- Model change notification, with the right to re-run your evaluation set before a model upgrade reaches production.

## The one-sentence version

Buy countable units of work, under governance you can export, from a vendor willing to be measured against your baseline in a 90-day pilot; anything else is a demo.

${OUTCOME_FOOTNOTE}
`.trim();

const buyersGuide: Article = {
  slug: "buyers-guide-ai-agents-hr-finance-2026",
  title: "The 2026 buyer's guide to AI agents for HR and finance",
  description:
    "A 12-question vendor checklist, the red flags that predict failed deployments, a five-step pilot design, seven success metrics, and a 14-week timeline from first call to scale decision.",
  category: "Buying and ROI",
  publishedAt: "2026-07-08",
  updatedAt: "2026-09-10",
  readingMinutes: readingMinutes(buyersGuideBody),
  author: { name: "Nadia Kowalski", role: "Director of Customer Value" },
  keyTakeaways: [
    "Buying AI agents for HR and finance means buying countable units of work, such as resolved cases and reconciled accounts, under a governance model you can inspect and export.",
    "The four checklist questions vendors most often fail are approval tiers as data, exportable audit logs, the billable unit and overage rate, and how quickly a suspended agent loses credentials.",
    "A well-designed pilot has a two-to-four-week baseline, two weeks of shadow mode without production writes, conservative approval tiers, and scale criteria agreed before go-live.",
    "Track seven pilot metrics weekly: units completed, automation rate, cycle time, quality, governance violations, cost per unit, and adoption; most failed pilots fail on adoption or quality.",
    "A realistic timeline from first call to a scale decision is 13 to 14 weeks, with each additional agent afterward needing one to two weeks of governance setup.",
  ],
  body: buyersGuideBody,
  faqs: [
    {
      question: "How long does it take to deploy AI agents in HR or finance?",
      answer:
        "From first conversation to a scale decision, plan on 13 to 14 weeks: two weeks of discovery and baseline capture, two weeks of governance setup, two to three weeks of integration, two weeks of shadow mode, and a six-week live pilot. Each additional agent after that typically needs one to two weeks of governance setup because the identities, gateway, and data access already exist.",
    },
    {
      question: "What should an AI agent pilot include?",
      answer:
        "One or two high-volume workflows with an existing baseline, two to four weeks of baseline measurement, a shadow-mode phase with no production writes, conservative approval tiers at go-live, weekly reporting on seven metrics, and scale criteria agreed in writing before the pilot starts. A pilot without a baseline cannot succeed or fail; it can only end.",
    },
    {
      question: "What are red flags when buying AI agents?",
      answer:
        "Outcome claims without units or baselines, demos that never show an action landing in a system of record with an approval step, token- or request-based billing for business workflows, a proprietary connector framework as the only integration path, no concept of a named human owner per agent, and reluctance to run in shadow mode.",
    },
    {
      question: "Should we start with AI agents in HR or in finance?",
      answer:
        "Start where you have volume, a baseline, and a process owner who wants the pilot. Tier-1 HR cases and candidate screening offer high volume and fast measurement; bank reconciliations and audit evidence offer clear controls and receptive auditors. Many organizations run one of each, which also exercises both the HR and finance governance paths early.",
    },
  ],
  relatedAgentSlugs: ["help-desk", "recruiting", "payroll", "audit", "close", "controls"],
  seo: {
    title: "2026 Buyer's Guide: AI Agents for HR and Finance",
    description:
      "A 12-question vendor checklist, red flags, pilot design, seven success metrics, and a 14-week timeline for buying AI agents for HR and finance teams in 2026.",
    keywords: [
      "AI agents buyer's guide",
      "enterprise AI agent evaluation",
      "AI agent pilot",
      "HR AI vendor checklist",
      "finance AI agents 2026",
      "AI agent RFP questions",
      "AI agent success metrics",
    ],
  },
};

// ---------------------------------------------------------------------------
// 8. Measuring the ROI of AI agents: hours, dollars, and risk
// ---------------------------------------------------------------------------

const measuringRoiBody = `
The ROI of an AI agent is the value of the work it completes, measured in recovered hours, direct dollars, and reduced risk, minus what it costs to run, divided by that cost. Measured honestly, ROI for scoped HR and finance agents is usually decided by two numbers: the automation rate on a high-volume workflow and the fully loaded cost of the human time it replaces.

This article gives the formulas, works through examples using modeled outcomes from Meridian design-partner deployments, lists what to exclude so the number survives a CFO's scrutiny, and lays out a 90-day measurement plan.

## Three kinds of return

- Hours: human time no longer spent on a unit of work. Hours are real only if the time is redeployed, absorbs growth, or reduces overtime and contractor spend.
- Dollars: cash effects that do not pass through labor, such as duplicate payments avoided, penalties not incurred, discounts captured, or audit fees reduced.
- Risk: reduced probability or severity of an adverse event, such as a payroll compliance failure or a material misstatement. Risk value is an expected-value calculation and should be reported separately, not blended into hours.

Keep the three in separate columns. Executives trust a return that shows its parts.

## The formulas

Define the terms once:

- V = monthly volume of the unit of work
- A = automation rate, the share of units the agent completes without human handling
- T = human minutes per unit before the agent
- t = human minutes per unit after the agent, for the units it handles (review time)
- C = fully loaded hourly cost of the humans doing the work
- K = monthly agent cost: subscription share plus credits consumed times the effective rate

Hours recovered per month = V × A × (T − t) ÷ 60

Labor value per month = Hours recovered × C

Direct dollar value per month = sum of cash effects attributable to the agent, with evidence

Monthly ROI = (Labor value + Direct dollar value − K) ÷ K

Payback period in months = One-time implementation cost ÷ (Labor value + Direct dollar value − K)

Risk value, reported separately = Reduction in event probability × expected event cost

## Four worked examples

The examples below use modeled outcomes from design-partner deployments and Meridian's published credit rates as of September 2026.

### Worked example 1: Help Desk Agent

An organization with 6,000 employees, 0.8 HR cases per employee per month, and a tier-1 team of 9 generalists.

- V = 4,800 cases per month
- A = 0.70 in budget, below the modeled 0.75
- T = 18 minutes per case, from the baseline study
- t = 2 minutes, for spot checks and escalation review
- C = $42 per hour fully loaded

Hours recovered = 4,800 × 0.70 × 16 ÷ 60 = 896 hours per month

Labor value = 896 × $42 = $37,632 per month

Credits = 3,360 resolved cases × 2 = 6,720 credits per month, inside a Growth plan at $2,499 per month. Allocating the full subscription to this one agent, K = $2,499.

Monthly ROI = ($37,632 − $2,499) ÷ $2,499 = 14.1, or about 1,400%

The number is large because the workflow is high volume and the human cost per case is high relative to two credits. The number is only true if the 896 hours are redeployed or absorb growth; see the exclusions below.

### Worked example 2: Audit Agent

A company that models about 900 hours per year saved on audit evidence collection, at $65 per hour for the senior accountants who do it.

Labor value = 900 × $65 = $58,500 per year

Direct dollars: the external audit firm reduces fees by $30,000 because evidence is packaged to its request list. Evidenced by the engagement letter.

Credits: 300 evidence packages per year × 5 = 1,500 credits, a small share of a Growth pool. Allocate $6,000 per year of the subscription for a conservative K.

Annual ROI = ($58,500 + $30,000 − $6,000) ÷ $6,000 = 13.75

### Worked example 3: Controls Agent, mostly dollars and risk

One design partner avoided about $283,000 per year in duplicate payments. Duplicates that are caught before payment are direct dollars. Duplicates recovered after payment are also dollars, net of recovery cost. The risk column carries the reduced probability of an undetected fraud scheme; if internal audit estimates a 2% annual probability of a $2 million event and continuous testing halves it, the risk value is $20,000 per year, reported separately.

### Worked example 4: Close Agent, hours plus decision value

A 12-person close team shortens the close by 3 days. Hours are the overtime and contractor time removed: for example, 12 people × 3 days × 2 hours of overtime = 72 hours per month at a $75 loaded overtime rate, or $5,400 per month. Most of the value is elsewhere: earlier results for decisions, and the risk column, which carries the reduced probability of a late filing or a post-close adjustment. Report the hours, describe the decision value, and quantify the risk only where finance will stand behind the probability.

### Summary across agents

| Agent | Primary return type | Modeled outcome | Example monthly value |
|---|---|---|---|
| Help Desk Agent | Hours | Deflects up to 75% of case volume | $37,632 at 6,000 employees |
| Recruiting Agent | Hours | Screening time −46%; manual reviews −70% | Depends on hiring volume; recruiters at $55 per hour |
| Audit Agent | Hours plus fees | About 900 hours per year | $7,375 including fee reduction |
| Controls Agent | Dollars plus risk | About $283K per year in duplicates avoided | $23,583 plus risk column |
| Close Agent | Hours plus decision value | Close shortened by 3 days | $5,400 plus decision and risk value |
| Scheduling Agent | Hours plus coverage | Time to fill a shift −90% | Supervisor hours plus avoided agency premiums |

## What to exclude

An ROI number is only useful if it survives challenge. Exclude the following, or report them separately with the label "unrealized."

- Hours that are not recaptured. If the tier-1 team is the same size, doing the same work, with more slack, the hours are capacity, not savings. Count them only when headcount is redeployed, attrition is not backfilled, contractors are released, or volume grows without hiring.
- Avoided future hires. Count these only against an approved headcount plan that was withdrawn.
- Satisfaction and experience effects, unless you measure them with a before-and-after survey and can price the outcome, such as reduced turnover.
- Double counting across agents. The Controls Agent clearing exceptions early and the Close Agent shortening the close overlap; attribute each day or hour once.
- Implementation time of your own team. Include it as cost, not as value.
- Model or vendor claims not measured in your environment. Modeled outcomes set the budget; measured outcomes set the ROI.

## A 90-day measurement plan

| Days | Activity | Output |
|---|---|---|
| 0 to 14 | Baseline: measure V, T, C, error rates, and cost per unit on the chosen workflows; document the method | Baseline sheet signed by the process owner and finance |
| 15 to 28 | Shadow mode: agent runs without writes; compare outputs with human outcomes | Measured accuracy; escalation thresholds set |
| 29 to 60 | Live with conservative tiers: track units completed, A, t, quality, and credits weekly | Four weekly scorecards |
| 61 to 84 | Widen tiers where quality holds; begin redeployment or backfill decisions that convert hours to savings | Documented capacity decisions |
| 85 to 90 | Readout: compute hours, dollars, and risk separately; apply exclusions; compute ROI and payback | One-page ROI statement with method and assumptions |

Two habits make the plan credible. First, have finance own the baseline and the readout, not the team that sponsored the agent. Second, publish the assumptions next to the number. An ROI of 6x with a visible method beats an ROI of 14x that nobody can reproduce.

## The number to watch after day 90

After the readout, the metric that predicts whether ROI persists is cost per completed unit, tracked monthly in Registry against the human baseline. If it rises, either volume fell, the automation rate slipped after a model change, or approval tiers widened in a way that increased rework. Each is visible in the audit trail, and each is fixable. ROI is not a one-time calculation; it is a monthly line in the blended workforce report.

${OUTCOME_FOOTNOTE}
`.trim();

const measuringRoi: Article = {
  slug: "measuring-roi-of-ai-agents",
  title: "Measuring the ROI of AI agents: hours, dollars, and risk",
  description:
    "Formulas and four worked examples for AI agent ROI in HR and finance, using modeled design-partner outcomes: hours recovered, direct dollars, risk value, what to exclude, and a 90-day measurement plan.",
  category: "Buying and ROI",
  publishedAt: "2026-08-19",
  updatedAt: "2026-09-10",
  readingMinutes: readingMinutes(measuringRoiBody),
  author: { name: "Priya Raman", role: "Head of Finance Solutions" },
  keyTakeaways: [
    "AI agent ROI = (labor value + direct dollar value − agent cost) ÷ agent cost, with hours, dollars, and risk reported in separate columns rather than blended.",
    "Hours recovered per month = volume × automation rate × (baseline minutes − review minutes) ÷ 60; the hours count as savings only when redeployed, not backfilled, or absorbing growth.",
    "A 6,000-employee organization modeled at 4,800 HR cases a month, 70% automation, and $42 per hour recovers about 896 hours and $37,600 per month against a $2,499 Growth subscription.",
    "Exclude unrecaptured capacity, unapproved avoided hires, unmeasured satisfaction effects, and double counting across agents; report them separately as unrealized.",
    "A credible 90-day plan spends days 0 to 14 on a finance-owned baseline, 15 to 28 in shadow mode, 29 to 84 live with weekly scorecards, and 85 to 90 on a readout that publishes its assumptions.",
  ],
  body: measuringRoiBody,
  faqs: [
    {
      question: "How do you calculate ROI for AI agents?",
      answer:
        "Monthly ROI = (labor value + direct dollar value − agent cost) ÷ agent cost. Labor value is hours recovered times fully loaded hourly cost, where hours recovered = volume × automation rate × (baseline minutes − review minutes) ÷ 60. Direct dollars are evidenced cash effects such as duplicate payments avoided. Report risk reduction separately as probability reduction times expected event cost.",
    },
    {
      question: "What is a realistic ROI for AI agents in HR?",
      answer:
        "For high-volume workflows such as tier-1 HR cases, modeled returns of 5x to 15x on subscription cost are realistic when the recovered hours are genuinely redeployed, because two credits per resolved case is small relative to $12 to $25 of human handling cost. Returns fall sharply if the hours are not converted into capacity decisions, which is why finance should own the readout.",
    },
    {
      question: "Should time saved count as ROI if headcount does not change?",
      answer:
        "Only if the time is demonstrably redeployed, absorbs growth without hiring, replaces contractor or overtime spend, or offsets attrition that is not backfilled. Otherwise report it as unrealized capacity. This rule is the difference between an ROI figure a CFO will sign and one that gets discounted to zero.",
    },
    {
      question: "How long until AI agents pay back?",
      answer:
        "Payback period = one-time implementation cost ÷ monthly net value. For a scoped agent on a high-volume workflow with modest implementation effort, payback commonly falls within the first quarter after go-live; the 90-day measurement plan is designed to produce the evidence for that. Agents with mostly risk-type returns, such as continuous controls testing, need a longer window and an expected-value method.",
    },
  ],
  relatedAgentSlugs: ["help-desk", "recruiting", "audit", "controls", "close", "scheduling"],
  seo: {
    title: "Measuring AI Agent ROI: Hours, Dollars, and Risk",
    description:
      "Formulas and worked examples for AI agent ROI in HR and finance: hours recovered, direct dollars, risk value, what to exclude, and a 90-day measurement plan.",
    keywords: [
      "AI agent ROI",
      "ROI of AI in HR",
      "ROI of AI in finance",
      "AI agent business case",
      "hours saved calculation",
      "AI payback period",
      "measuring AI automation",
    ],
  },
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const articles: Article[] = [
  agentSystemOfRecord,
  agentsVsChatbots,
  consumptionPricing,
  governHrAgents,
  monthEndClose,
  mcpForEnterprise,
  buyersGuide,
  measuringRoi,
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
