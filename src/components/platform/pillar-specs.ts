/*
 * Specification rows per pillar (standards, protocols, limits). The content
 * module carries `standards?: string[]` only; the rest is composed here from
 * facts in src/content/platform.ts and src/content/pricing.ts.
 * Wish: a `specification: { item, value }[]` field on PlatformPillar.
 */

export interface SpecRow {
  item: string;
  value: string;
}

export const pillarSpecs: Record<string, SpecRow[]> = {
  registry: [
    { item: "Record fields", value: "Owner, role, purpose, permissions, model configuration, data scopes, risk tier, review dates, evaluation results, status" },
    { item: "Agent sources", value: "Meridian agents, partner agents registered through the Gateway, agents published from Studio" },
    { item: "Action log", value: "One immutable log for every registered agent; entries hashed and chained; exportable to SIEM or archive" },
    { item: "Analytics", value: "Hours saved, outcomes produced, credits consumed, and exception rates by agent, next to human team metrics" },
    { item: "Lifecycle controls", value: "Pause, resume, scope down, retire; owner offboarding through SCIM suspends that owner's agents within minutes" },
    { item: "Integration", value: "Registry API and scheduled exports for GRC, ITSM, SIEM, ERP, and FinOps tooling" },
    { item: "Identity", value: "Agents hold no standing credentials; scopes inherited from your IdP and the source system" },
    { item: "Plan availability", value: "Growth and Enterprise" },
  ],
  gateway: [
    { item: "Tool protocol", value: "Model Context Protocol (MCP) servers and clients with per-agent scopes, schema validation, and rate limits" },
    { item: "Agent handoffs", value: "A2A-style agent-to-agent protocols; originating user identity and approval context travel with the request" },
    { item: "Observability", value: "Traces, metrics, and logs for every agent step in OpenTelemetry (OTLP) format" },
    { item: "Identity", value: "OpenID Connect and SAML for authentication; SCIM for provisioning and deprovisioning" },
    { item: "Policy", value: "Versioned policies on allowed tools, data scopes, cost ceilings, and approval requirements; every allow, deny, and hold records the policy version" },
    { item: "Limits", value: "Per-agent and per-workspace ceilings on credits, model tokens, and tool calls, with alerts before limits are reached" },
    { item: "Onboarding", value: "A third-party agent registers in under an hour with an MCP manifest and an IdP client" },
    { item: "Plan availability", value: "Growth and Enterprise" },
  ],
  "data-fabric": [
    { item: "Zero-copy sources", value: "Snowflake, Databricks, and BigQuery through native sharing; no extract, no second copy" },
    { item: "Lakehouse", value: "Apache Iceberg tables you own; readable by Spark, Trino, DuckDB, and the warehouses themselves" },
    { item: "Connectors", value: "3,000+ prebuilt connectors for HRIS, ATS, payroll, ERP, CLM, banking, expense, ticketing, and collaboration systems, with incremental sync and schema tracking" },
    { item: "Security", value: "Row-level and column-level policies from the warehouse or source system apply to every agent query" },
    { item: "Query", value: "ANSI SQL; every agent read logged with user context and result row count" },
    { item: "Freshness", value: "Measured per source and shown to agents and users; answers state which day's data they used" },
    { item: "Residency", value: "EU or US, matching your warehouse region; nothing in the Fabric is used to train models" },
    { item: "Plan availability", value: "Enterprise" },
  ],
  studio: [
    { item: "Blocks", value: "Trigger, data read through the Data Fabric, reasoning step on your chosen model, tool call through the Gateway, approval step" },
    { item: "Approvals", value: "First-class block routed to named approvers or roles; enforced at the Gateway, so a builder cannot skip them" },
    { item: "Evaluation", value: "Evaluation sets on real examples with pass rates and regressions; re-run automatically when the workspace model changes" },
    { item: "Environments", value: "Draft, test, and production with promotion gates and rollback" },
    { item: "Code", value: "Blocks may contain code; whole agents can be defined in code and published through the same pipeline" },
    { item: "Registration", value: "Every published agent receives a Registry record with owner, scopes, and risk tier; nothing runs unregistered" },
    { item: "Metering", value: "Studio agents consume credits on the same meter as Meridian agents" },
    { item: "Plan availability", value: "Enterprise; early access for Growth on request" },
  ],
  assist: [
    { item: "Surfaces", value: "Browser workspace, Slack, and Microsoft Teams" },
    { item: "Search", value: "One query across document stores, HRIS, ERP, and collaboration tools; every result cites its source" },
    { item: "Generation", value: "Job descriptions, policy summaries, variance narratives, and tables from data the user can already see" },
    { item: "Agent runs", value: "Start any registered agent from the conversation under the user's identity; approval steps still apply" },
    { item: "Permissions", value: "Acts as the user through the Gateway and Data Fabric; holds no access of its own" },
    { item: "Models", value: "Workspace-selected frontier models; provider and region can be pinned; domain reasoning routed to Meridian's tuned models" },
    { item: "Logs", value: "Conversation logs retained under your policy and visible to the user" },
    { item: "Plan availability", value: "Starter, Growth, and Enterprise" },
  ],
};
