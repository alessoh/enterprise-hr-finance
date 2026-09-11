import type { ChangelogEntry } from "./types";

/** Newest first. The three most recent entries are flagged isNew. */
export const changelog: ChangelogEntry[] = [
  {
    id: "2026-09-08-revenue-contracts-modifications",
    date: "2026-09-08",
    title: "Revenue Contract Agent: modification assessments and SSP library import",
    category: "agent",
    summary:
      "The early-access Revenue Contract Agent now drafts contract modification assessments and imports your stand-alone selling price library for allocation proposals.",
    body: `**Modification assessments.** When an amendment or new order form references an existing contract, the agent drafts an assessment under ASC 606-10-25-10 through 25-13: separate contract, termination and new contract, or cumulative catch-up, with the reasoning and the clauses cited. The reviewer decides; nothing posts.

**SSP library import.** Upload your stand-alone selling price library as CSV or connect it from the revenue subledger. Allocation proposals now reference your SSP ranges and flag obligations without an SSP.

**Also in this release.** Extraction confidence is shown per term in the review panel with the source clause highlighted. IFRS 15 memo template added for non-US entities.`,
    agentSlugs: ["revenue-contracts"],
    isNew: true,
  },
  {
    id: "2026-08-27-gateway-a2a-ga",
    date: "2026-08-27",
    title: "Gateway: agent-to-agent handoffs generally available, OTLP metrics export",
    category: "platform",
    summary:
      "A2A-style handoffs between registered agents are now GA, carrying the originating user's identity and approval context. OpenTelemetry metrics join traces and logs in OTLP export.",
    body: `**Agent-to-agent handoffs (GA).** A registered agent can delegate a sub-task to another registered agent. The originating user's identity, data scopes, and any pending approval context travel with the request, so the delegate cannot exceed what the originator was allowed. Handoffs appear as child spans in traces.

**OTLP metrics.** Per-agent counters and histograms (tool calls, latency, tokens, credits, approval holds, denials) now export alongside traces and logs. Dashboards for common observability platforms are in the docs.

**Policy versioning in logs.** Every allow, deny, and hold decision now records the policy version that produced it.`,
    isNew: true,
  },
  {
    id: "2026-08-18-eu-residency-growth",
    date: "2026-08-18",
    title: "EU data residency on Growth; SCIM deprovisioning suspends owned agents",
    category: "security",
    summary:
      "Growth workspaces can now be created in the EU region with storage, processing, and model inference kept in-region. SCIM deprovisioning of an owner suspends that owner's agents.",
    body: `**EU workspaces on Growth.** Previously Enterprise-only. Storage, processing, and model inference stay within the EU. Zero-copy warehouse sources are never moved. Subprocessor list by region updated in the trust center.

**SCIM and agent lifecycle.** When an identity provider deprovisions a user through SCIM, agents owned by that user are suspended in the Registry within 5 minutes and remain suspended until a new owner is assigned. Delegated access the user granted is revoked at the same time.

**Audit log export.** Streaming export to SIEM now supports OTLP logs in addition to the existing webhook and S3-compatible sinks.`,
    isNew: true,
  },
  {
    id: "2026-08-05-close-signoff-routing",
    date: "2026-08-05",
    title: "Close Agent: sign-off routing, reconciliation exception detail, and the post-close retrospective",
    category: "agent",
    summary:
      "Sign-offs route to named reviewers with delegation logging, unexplained reconciliation differences show likely causes, and a post-close retrospective shows where the days went.",
    body: `**Sign-off routing.** Each task's reviewer is a named person or a role resolved at run time. Delegations are logged with who delegated to whom and when. Preparer and reviewer separation is enforced; the agent refuses a configuration where they are the same person.

**Reconciliation exceptions.** For reconciliations that do not tie, the agent now lists the likely causes it can see (timing, duplicate posting, FX, unrecorded fee) with the transactions involved. It still never closes a reconciliation with an unexplained difference.

**Post-close retrospective.** A report per entity showing task durations against prior periods, the critical path, and where waiting occurred.`,
    agentSlugs: ["close"],
  },
  {
    id: "2026-07-22-payroll-garnishment-fix",
    date: "2026-07-22",
    title: "Fix: Payroll Agent garnishment cap false positives for multi-order employees",
    category: "fix",
    summary:
      "Employees with multiple garnishment orders were flagged for exceeding the federal cap when the combined deduction was within limits under order priority rules. Corrected.",
    body: `**What happened.** For employees with two or more active garnishment orders, the pre-run check summed deductions without applying order priority and jurisdiction-specific limits, producing a false exception in about 0.4% of checked employees at affected customers. No payroll was changed; exceptions are proposals and all were dismissed by payroll specialists with a reason.

**Fix.** Priority rules for child support, federal tax levies, student loans, and creditor garnishments are now applied in order, with state-specific limits where they are lower than the federal cap.

**Follow-up.** The rule library test suite now includes 60 multi-order cases across 12 states. Customers who dismissed related exceptions received a summary in the Registry.`,
    agentSlugs: ["payroll"],
  },
  {
    id: "2026-07-14-credit-rollover",
    date: "2026-07-14",
    title: "Pricing: credit rollover on annual plans and hard ceilings per workspace",
    category: "pricing",
    summary:
      "Annual Starter and Growth plans now roll unused credits forward for up to 3 months. Workspace administrators can set a hard credit ceiling to pause agents instead of incurring overage.",
    body: `**Rollover.** On annual billing, unused credits roll forward for up to 3 months. Monthly plans are unchanged: credits expire at month end. Overage remains $0.12 per credit.

**Hard ceilings.** A workspace ceiling pauses agents when reached and notifies the administrator. Alerts at 80% and 100% of the allowance are on by default.

**Calculator.** The pricing calculator now shows recommended plan, estimated credits, and estimated hours saved with the assumptions listed inline.`,
  },
  {
    id: "2026-06-30-job-architecture-early-access",
    date: "2026-06-30",
    title: "Job Architecture Agent in early access",
    category: "agent",
    summary:
      "Benchmarks roles against licensed survey data, proposes pay bands by level and geography, and flags out-of-band employees and duplicate roles. All proposals go to the compensation committee.",
    body: `**What it does.** Matches your job catalog to survey job codes with confidence scores, proposes band midpoints and ranges, flags employees below minimum and compa-ratio outliers, and detects title inflation and near-duplicate roles.

**Guardrails.** Never changes compensation or bands. Survey data stays within license terms. Individual pay visible only to roles the HRIS authorizes. Pay-equity cohort summaries can run under privilege.

**Availability.** Early access for Growth and Enterprise customers. Request access from the Registry.`,
    agentSlugs: ["job-architecture"],
  },
  {
    id: "2026-06-16-studio-approval-blocks",
    date: "2026-06-16",
    title: "Studio: approval-step blocks, evaluation sets, and promotion gates",
    category: "platform",
    summary:
      "Custom agents built in Studio now include approval steps as first-class blocks enforced at the Gateway, evaluation sets with pass-rate gates, and draft-test-production promotion.",
    body: `**Approval blocks.** Route consequential actions to a named approver or role. Enforcement happens at the Gateway, so a builder cannot remove the hold after publishing.

**Evaluation sets.** Define expected behavior on real examples. Pass rates gate promotion, and sets re-run automatically when the workspace model changes.

**Promotion.** Draft, test, and production environments with rollback. Publishing creates the Registry record with owner, scopes, and risk tier.`,
  },
  {
    id: "2026-05-27-performance-early-access",
    date: "2026-05-27",
    title: "Performance Agent in early access",
    category: "agent",
    summary:
      "Assembles goals, feedback, and delivered work into an evidence timeline and drafts reviews in your competency framework. Managers edit the text and set the rating.",
    body: `**What it does.** Builds a dated evidence timeline per employee from your performance system and the systems where work is visible, drafts the review with each statement linked to evidence, flags thin-evidence periods, runs a bias-language check, and prepares calibration packs per team.

**Guardrails.** Never assigns or recommends a final rating. Drafts are private to the manager until submitted. 1:1 notes are used only if the manager shares them.

**Availability.** Early access for Growth and Enterprise customers ahead of mid-year review cycles.`,
    agentSlugs: ["performance"],
  },
  {
    id: "2026-05-12-data-fabric-iceberg-ga",
    date: "2026-05-12",
    title: "Data Fabric: Apache Iceberg lakehouse GA, BigQuery zero-copy, freshness contracts",
    category: "platform",
    summary:
      "The Iceberg lakehouse for connector-fed sources is generally available in EU and US regions. BigQuery joins Snowflake and Databricks for zero-copy access. Per-source freshness is now surfaced to agents and users.",
    body: `**Iceberg lakehouse (GA).** Connector-fed sources land in Apache Iceberg tables in your region, readable by your own engines. Schema evolution and time travel are handled by the format.

**BigQuery zero-copy.** Agents can now query BigQuery in place with the dataset's IAM applied, joining Snowflake and Databricks.

**Freshness contracts.** Each source reports last-sync time and lag. Agents include it in answers ("actuals as of September 3"), and administrators can set alerts when lag exceeds a threshold.`,
  },
  {
    id: "2026-04-21-soc2-iso27001",
    date: "2026-04-21",
    title: "SOC 2 Type II report issued; ISO 27001 certification achieved",
    category: "security",
    summary:
      "Meridian's SOC 2 Type II report for the period ending March 31, 2026 covers security, availability, and confidentiality. ISO 27001 certification was granted by an accredited body.",
    body: `**SOC 2 Type II.** Twelve-month period ending March 31, 2026, with no exceptions noted. Covers security, availability, and confidentiality. Available under NDA from the trust center.

**ISO 27001.** Certification covers the Meridian platform, corporate systems, and the engineering organization. Certificate available under NDA.

**Also.** Annual penetration test completed by an independent firm; summary available on request. Vulnerability disclosure program published.`,
  },
  {
    id: "2026-03-24-controls-three-way-match",
    date: "2026-03-24",
    title: "Controls Agent: three-way match testing, vendor master de-duplication, and SOX evidence reports",
    category: "agent",
    summary:
      "Three new tests join duplicate detection: three-way match exceptions including overrides, vendor master de-duplication with bank-detail change monitoring, and per-control SOX evidence reports.",
    body: `**Three-way match.** Tests invoice, PO, and receipt agreement across the full population, including manual overrides and near-tolerance patterns. Exceptions show all three documents side by side.

**Vendor master.** Detects duplicate vendor records for the same supplier and bank-detail changes without a logged callback. Vendor-employee address and bank matches are flagged for review.

**SOX evidence.** Per-control, per-period reports with population, tests run, results, and human dispositions, readable directly by auditors or packaged by the Audit Agent.`,
    agentSlugs: ["controls", "audit"],
  },
  {
    id: "2026-02-25-registry-ga",
    date: "2026-02-25",
    title: "Registry generally available with blended workforce analytics",
    category: "platform",
    summary:
      "The agent system of record is GA. One record per agent with owner, permissions, data touched, and compliance status; outcomes and credits reported alongside human team metrics.",
    body: `**One record per agent.** Meridian, partner, and Studio agents appear with the same structure. Lifecycle controls (pause, scope down, retire) from one place.

**Blended workforce analytics.** Hours saved, outcomes, credits, and exception rates by agent, next to human team metrics. Time-per-task and cost assumptions are editable and shown on every chart.

**Registry API.** Agent records, review status, and evaluation results available to GRC, ITSM, and SIEM tools.`,
  },
  {
    id: "2026-01-20-scheduling-ga-help-desk-languages",
    date: "2026-01-20",
    title: "Scheduling Agent GA; Help Desk Agent adds Spanish, French, and German",
    category: "agent",
    summary:
      "The Scheduling Agent is generally available after a peak-season pilot across 41 logistics sites. The Help Desk Agent now answers in Spanish, French, and German with citations to the policy in that language where available.",
    body: `**Scheduling Agent (GA).** Rules as hard constraints, ranked SMS offer waves, manager approval on premium overtime, and a full offer log for scheduling-law compliance. Coverage forecasting per location per week.

**Help Desk languages.** Spanish, French, and German. Where a policy exists in the employee's language the agent cites that version; otherwise it answers from the source-language policy and says so.

**Also.** Help Desk Agent now supports Microsoft Teams in addition to Slack, email, and the browser.`,
    agentSlugs: ["scheduling", "help-desk"],
  },
];

export function getChangelogEntry(id: string): ChangelogEntry | undefined {
  return changelog.find((entry) => entry.id === id);
}

export function getChangelogForAgent(agentSlug: string): ChangelogEntry[] {
  return changelog.filter((entry) => entry.agentSlugs?.includes(agentSlug));
}
