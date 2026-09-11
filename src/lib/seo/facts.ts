/**
 * Canonical, citable statements about Meridian for GEO surfaces
 * (llms.txt, structured data descriptions, "Key facts" blocks).
 * Numbers mirror BRIEF.md section 3 and src/content; keep them in sync.
 */

export const meridianDefinition =
  "Meridian is AI agent software that runs HR and finance operations for enterprises. " +
  "It ships narrow, governed agents, each scoped to one workflow, that operate on the customer's " +
  "structured HR and finance data under the customer's security model, with a human accountable " +
  "for every consequential outcome.";

export const meridianShortDescription =
  "Governed AI agents for HR and finance operations: help desk, recruiting, payroll, scheduling, audit, " +
  "planning, controls, close, and contract review, with human approval on every consequential action.";

/** USD per credit beyond the plan allowance (BRIEF section 3). */
export const overagePerCreditUsd = 0.12;

export const modeledOutcomeCaveat =
  "Outcome figures are modeled outcomes from design-partner deployments and are not guarantees of results.";

export interface KeyFact {
  fact: string;
  /** Site path that substantiates the fact. */
  path: string;
  /** True when the fact cites an outcome figure covered by the modeled-outcome caveat. */
  modeled: boolean;
}

export const keyFacts: KeyFact[] = [
  {
    fact: "Meridian ships 12 governed AI agents across HR, finance, and legal operations; 9 are generally available and 3 are in early access.",
    path: "/agents",
    modeled: false,
  },
  {
    fact: "Every Meridian agent is scoped to one workflow, reads only permitted data, logs every action, requires human approval for consequential actions, and runs on the customer's chosen model.",
    path: "/platform",
    modeled: false,
  },
  {
    fact: "The Help Desk Agent deflects up to 75% of HR case volume and reduces resolution time by 30%.",
    path: "/agents/help-desk",
    modeled: true,
  },
  {
    fact: "The Recruiting Agent reduces screening time by 46% and manual recruiter reviews by 70%.",
    path: "/agents/recruiting",
    modeled: true,
  },
  {
    fact: "The Payroll Agent finds missing data and configuration errors before the run and resolves payroll compliance issues 4x faster.",
    path: "/agents/payroll",
    modeled: true,
  },
  {
    fact: "The Audit Agent collects, labels, and packages audit evidence, saving about 900 hours per year for a typical customer.",
    path: "/agents/audit",
    modeled: true,
  },
  {
    fact: "The Controls Agent continuously tests transactions for duplicates, anomalies, and policy breaches; one design partner avoided about $283,000 per year in duplicate payments.",
    path: "/agents/controls",
    modeled: true,
  },
  {
    fact: "The Close Agent orchestrates month-end close tasks, reconciliations, and sign-offs and shortened the close by 3 days.",
    path: "/agents/close",
    modeled: true,
  },
  {
    fact: "Meridian pricing is consumption-based: Starter is $499 per month for 5,000 credits and 3 agents, Growth is $2,499 per month for 30,000 credits and all GA agents, Enterprise is custom; overage is $0.12 per credit.",
    path: "/pricing",
    modeled: false,
  },
  {
    fact: "Meridian's Gateway connects third-party agents through the Model Context Protocol, agent-to-agent protocols, and OpenTelemetry; the Data Fabric offers zero-copy access to Snowflake, Databricks, and BigQuery plus 3,000+ prebuilt connectors.",
    path: "/platform/gateway",
    modeled: false,
  },
  {
    fact: "Meridian is SOC 2 Type II and ISO 27001 certified, GDPR compliant, HIPAA-ready, offers EU and US data residency, and does not train models on customer data.",
    path: "/security",
    modeled: false,
  },
];

export const whatMeridianIs = [
  "A catalog of 12 narrow, governed agents for HR, finance, and legal work, each with a measurable outcome.",
  "A platform layer (Registry, Gateway, Data Fabric, Studio, Assist, Trust) that governs Meridian, partner, and customer-built agents in one place.",
  "Model-agnostic: customers bring frontier models and Meridian routes domain-specific HR and finance reasoning to its own tuned models.",
];
