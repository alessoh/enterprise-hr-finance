import type { GlossaryTerm } from "./types";

/**
 * Glossary for /glossary and for GEO: each shortDefinition is one citable sentence.
 * Sorted alphabetically by term at export time.
 */
const terms: GlossaryTerm[] = [
  {
    slug: "agent-system-of-record",
    term: "Agent system of record",
    shortDefinition:
      "An agent system of record is the authoritative registry of every AI agent in an organization, recording owner, permissions, data access, and compliance status.",
    definition: `An agent system of record does for AI agents what a human resources information system does for employees. It holds one record per agent, regardless of who built it, with the agent's owner, purpose, role, permissions, the systems and data it touches, its model configuration, its risk tier, and its review and compliance status. It also records what each agent has done.

The term matters because agents are proliferating faster than governance. Business units build them in low-code tools, vendors embed them in applications, and developers wire them up in frameworks. Without a system of record, security cannot inventory them, finance cannot attribute their cost, and no one is accountable when one misbehaves.

Meridian's Registry is an agent system of record. Agents from Meridian, partners, and customers register through the Gateway and appear with the same record structure and the same immutable action log.`,
    relatedTerms: ["agent-registry", "governed-agent", "agent-gateway", "guardrails"],
    seo: {
      title: "What Is an Agent System of Record? | Meridian",
      description:
        "An agent system of record is the authoritative registry of every AI agent in an organization: owner, permissions, data access, and compliance status.",
      keywords: ["agent system of record", "AI agent governance", "agent inventory", "agent registry definition"],
    },
  },
  {
    slug: "agent-registry",
    term: "Agent registry",
    shortDefinition:
      "An agent registry is a catalog of the AI agents an organization operates, used to discover, permission, monitor, and retire them from one place.",
    definition: `An agent registry lists the agents an organization runs, with enough metadata to find, permission, monitor, and retire each one. A registry becomes a system of record when it is authoritative: when an agent that is not in the registry cannot run, and when the registry's record of permissions is the one that is enforced.

Registries typically expose an API so security, IT service management, and governance tools can read agent records as assets. Mature registries add lifecycle controls (pause, scope down, retire), evaluation results, and cost attribution.

In Meridian, the Registry is both the catalog and the enforcement point: publishing an agent in Studio or connecting one through the Gateway creates the record, and the record's scopes are what the Gateway enforces.`,
    relatedTerms: ["agent-system-of-record", "agent-gateway", "governed-agent"],
    seo: {
      title: "What Is an Agent Registry? | Meridian",
      description:
        "An agent registry is a catalog of the AI agents an organization operates, used to discover, permission, monitor, and retire them from one place. Definition.",
      keywords: ["agent registry", "AI agent catalog", "agent lifecycle management", "enterprise agent inventory"],
    },
  },
  {
    slug: "governed-agent",
    term: "Governed agent",
    shortDefinition:
      "A governed agent is an AI agent confined to one workflow, permitted data, and logged actions, with human approval required for consequential decisions.",
    definition: `A governed agent is distinguished from an open-ended assistant by its constraints. It is scoped to one workflow. It reads only data it has been granted, under the source system's security model. Every action it takes is logged with the identity it acted for. Actions with consequences, such as moving money, changing pay, or sending documents outside the organization, are held for a named person's approval.

The constraints are not a limitation on usefulness. They are what allow an organization to let the agent act at all. An audit committee can accept an agent that prepares journal entries for a human to post; it cannot accept one that posts on its own judgment.

All twelve Meridian agents are governed agents, and the same constraints apply to agents built in Studio or connected through the Gateway.`,
    relatedTerms: ["human-in-the-loop", "guardrails", "agent-system-of-record"],
    relatedAgentSlugs: ["help-desk", "controls", "close"],
    seo: {
      title: "What Is a Governed Agent? | Meridian",
      description:
        "A governed agent runs inside explicit constraints: defined scope, permitted data, logged actions, and human approval for consequential decisions. Definition.",
      keywords: ["governed AI agent", "enterprise AI agent governance", "narrow AI agent", "agent guardrails"],
    },
  },
  {
    slug: "human-in-the-loop",
    term: "Human-in-the-loop",
    shortDefinition:
      "Human-in-the-loop is a design pattern in which an automated system pauses at defined points for a person to review, approve, edit, or reject before it proceeds.",
    definition: `In a human-in-the-loop system, automation does the preparation and a person makes the consequential decision. The pattern specifies where the pauses are, who is authorized to act at each one, what information they see, and what happens if no one acts. Done well, it puts the human where judgment matters and removes them from where it does not.

The pattern is only meaningful if it cannot be bypassed. A prompt-level instruction to "ask before sending" is not human-in-the-loop; an approval hold enforced by infrastructure the agent cannot reach is. Meridian enforces approval holds at the Gateway, below the agent, so no agent, builder, or prompt can skip them.

Examples in Meridian: a recruiter approves every advance or rejection, a payroll manager approves every correction, a controller releases every audit package, and an attorney approves every redline before it leaves the company.`,
    relatedTerms: ["governed-agent", "guardrails", "agent-gateway"],
    relatedAgentSlugs: ["recruiting", "payroll", "contract-review"],
    seo: {
      title: "What Is Human-in-the-Loop? | Meridian",
      description:
        "Human-in-the-loop is a design pattern in which automation pauses at defined points for a person to review, approve, edit, or reject before proceeding.",
      keywords: ["human-in-the-loop", "HITL AI", "AI approval workflow", "human oversight AI agents"],
    },
  },
  {
    slug: "consumption-pricing",
    term: "Consumption pricing (credits)",
    shortDefinition:
      "Consumption pricing charges for software by the work it performs, measured in units such as credits, rather than by the number of users who have access.",
    definition: `Consumption pricing ties cost to usage. For AI agents the natural unit is a completed action: a case resolved, a candidate screened, a contract redlined. Vendors usually express these in credits so that different actions with different costs to serve can share one meter. A plan includes a monthly allowance; usage beyond it is billed at an overage rate or draws from a prepaid pool.

For buyers, the advantage is alignment: the bill tracks outcomes rather than seats, and an agent that does nothing costs nothing beyond the platform fee. The risk is unpredictability, which is why reputable vendors publish a rate card, expose consumption by agent and cost center, and offer hard ceilings and alerts.

Meridian's rate card lists every metered action. The Registry attributes credits to agent, workspace, and cost center so finance can reconcile invoices to outcomes.`,
    relatedTerms: ["agent-registry", "governed-agent"],
    seo: {
      title: "What Is Consumption Pricing for AI Agents? | Meridian",
      description:
        "Consumption pricing charges for software by the work performed, in units such as credits, rather than by seats. How credit-based pricing works for AI agents.",
      keywords: ["consumption pricing", "credit-based pricing", "usage-based pricing AI agents", "AI agent credits"],
    },
  },
  {
    slug: "model-context-protocol",
    term: "Model Context Protocol (MCP)",
    shortDefinition:
      "The Model Context Protocol is an open standard that lets AI models and agents discover and call external tools and data sources through a common interface.",
    definition: `The Model Context Protocol defines how an AI client (a model or an agent) connects to a server that exposes tools, resources, and prompts. A server describes what it offers with schemas; the client discovers those offerings and calls them. Because the interface is standard, one tool server can serve many agents, and one agent can use tools from many servers, without custom integration for each pair.

For enterprises, MCP is the practical path to letting agents from different vendors reach the same systems under one policy. The tool server is where scopes, validation, and rate limits live, so governance is applied where the call happens rather than inside each agent.

Meridian's Gateway exposes HR and finance systems as MCP servers with per-agent scopes and approval holds, and accepts any MCP client that authenticates through the customer's identity provider.`,
    relatedTerms: ["agent-gateway", "opentelemetry", "guardrails"],
    seo: {
      title: "What Is the Model Context Protocol (MCP)? | Meridian",
      description:
        "The Model Context Protocol is an open standard that lets AI models and agents discover and call external tools and data sources through one common interface.",
      keywords: ["Model Context Protocol", "MCP", "MCP server enterprise", "AI agent tool protocol"],
    },
  },
  {
    slug: "agent-gateway",
    term: "Agent gateway",
    shortDefinition:
      "An agent gateway is the control point through which AI agents reach tools, data, and other agents, enforcing identity, policy, and logging on every call.",
    definition: `An agent gateway sits between agents and everything they act on. It authenticates the agent and the user it acts for, checks each call against policy (which tools, which data scopes, what rate and cost, whether a human must approve), records what happened, and emits telemetry. It plays the role an API gateway plays for services, with the addition of approval holds and per-user delegation.

The gateway is where open standards converge: Model Context Protocol for tool calls, agent-to-agent protocols for delegation, OpenTelemetry for traces, OpenID Connect and SAML for identity, and SCIM for provisioning. Agents from any vendor can connect if they speak these.

Meridian's Gateway registers connected agents in the Registry, enforces approval holds below the agent layer, and exports traces to the observability stack the customer already runs.`,
    relatedTerms: ["model-context-protocol", "agent-registry", "opentelemetry", "scim"],
    seo: {
      title: "What Is an Agent Gateway? | Meridian",
      description:
        "An agent gateway is the control point through which AI agents reach tools, data, and other agents, enforcing identity, policy, and logging on every call.",
      keywords: ["agent gateway", "AI agent policy enforcement", "MCP gateway", "agent access control"],
    },
  },
  {
    slug: "zero-copy-data-sharing",
    term: "Zero-copy data sharing",
    shortDefinition:
      "Zero-copy data sharing lets a consumer query data in a provider's warehouse in place, with no extract or copy, so the provider's security policies still apply.",
    definition: `In zero-copy sharing, the provider grants the consumer access to specific tables or views inside the warehouse. The consumer's queries run against the provider's data where it lives. There is no export, no second copy, and no drift between copies. Row-level and column-level security defined by the provider apply to the consumer's queries.

For AI agents this removes a major objection. An agent that needs payroll or general ledger data does not need a copy of it; it needs governed query access. The warehouse remains the system of record, freshness is whatever the warehouse has, and revoking access is immediate.

Meridian's Data Fabric uses zero-copy sharing with Snowflake, Databricks, and BigQuery. For sources without a warehouse footprint, connectors load an Apache Iceberg lakehouse the customer owns.`,
    relatedTerms: ["apache-iceberg", "data-residency", "erp"],
    relatedAgentSlugs: ["planning", "audit", "controls"],
    seo: {
      title: "What Is Zero-Copy Data Sharing? | Meridian",
      description:
        "Zero-copy data sharing lets a consumer query data in a provider's warehouse in place, with no extract or copy, so the provider's security policies still apply.",
      keywords: ["zero-copy data sharing", "data sharing without copying", "warehouse data sharing", "AI agent data access"],
    },
  },
  {
    slug: "apache-iceberg",
    term: "Apache Iceberg",
    shortDefinition:
      "Apache Iceberg is an open table format for large analytic datasets that gives data lake files schema evolution, time travel, and ACID transactions.",
    definition: `Apache Iceberg defines how tables are laid out in object storage so that multiple engines can read and write them safely. It tracks table metadata, snapshots, and partitions independently of any single query engine, which is what allows Spark, Trino, DuckDB, and cloud warehouses to share one copy of the data.

The practical result is a lakehouse the organization owns: data in open files, in the customer's storage account, queryable by whatever tool the customer prefers, with schema changes and point-in-time reads handled by the format rather than by convention.

Meridian's Data Fabric loads connector-fed sources into Iceberg tables in the customer's region. Agents read them through governed SQL, and the customer's own analysts can read the same tables.`,
    relatedTerms: ["zero-copy-data-sharing", "data-residency"],
    seo: {
      title: "What Is Apache Iceberg? | Meridian",
      description:
        "Apache Iceberg is an open table format for large analytic datasets that gives data lake files schema evolution, time travel, and ACID transactions.",
      keywords: ["Apache Iceberg", "open table format", "lakehouse", "Iceberg tables"],
    },
  },
  {
    slug: "month-end-close",
    term: "Month-end close",
    shortDefinition:
      "Month-end close is the accounting process of finalizing a period's transactions, reconciliations, accruals, and reviews so financial statements can be produced.",
    definition: `The close is a dependency graph. Subledgers such as accounts payable, accounts receivable, fixed assets, and payroll close first. Bank and intercompany accounts are reconciled. Accruals, prepaids, and depreciation are recorded. The general ledger is reviewed, adjusting entries are posted, and each step is signed off by a preparer and a reviewer. Consolidated organizations repeat this per entity, then eliminate intercompany balances and consolidate.

Close length is measured in business days after period end. A 10-day close is common in mid-sized companies; 5 days or fewer is considered fast. Most delay comes from waiting: a downstream task cannot start until an upstream one finishes, and the owner often does not know it has.

Meridian's Close Agent sequences the graph, prepares mechanical reconciliations and recurring accruals, chases late tasks, and records sign-offs. It never posts an entry.`,
    relatedTerms: ["variance-analysis", "audit-evidence", "erp", "sox-controls"],
    relatedAgentSlugs: ["close", "planning", "audit"],
    seo: {
      title: "What Is the Month-End Close? | Meridian",
      description:
        "Month-end close is the accounting process of finalizing a period's transactions, reconciliations, accruals, and reviews to produce financial statements.",
      keywords: ["month-end close", "financial close process", "close checklist", "shorten the close"],
    },
  },
  {
    slug: "three-way-match",
    term: "Three-way match",
    shortDefinition:
      "A three-way match is an accounts payable control that verifies a supplier invoice against the purchase order and the goods receipt before payment is approved.",
    definition: `The three documents are the purchase order (what was ordered, at what price), the receiving report or goods receipt (what arrived), and the invoice (what the supplier is charging). A match confirms that quantities and prices agree within tolerance. A mismatch, such as an invoice for 120 units when 100 were received, is an exception that must be resolved before payment.

Three-way match is one of the most common controls tested under SOX because it directly prevents paying for goods not received or at prices not agreed. Most ERPs perform it, but tolerance settings, manual overrides, and non-PO invoices create gaps.

Meridian's Controls Agent tests match exceptions across the full population, including overrides and near-tolerance patterns, and raises each with the three documents side by side.`,
    relatedTerms: ["duplicate-payment-detection", "sox-controls", "erp"],
    relatedAgentSlugs: ["controls", "audit"],
    seo: {
      title: "What Is a Three-Way Match? | Meridian",
      description:
        "A three-way match is an accounts payable control that checks a supplier invoice against the purchase order and goods receipt before payment is approved.",
      keywords: ["three-way match", "accounts payable controls", "invoice matching", "PO invoice receipt match"],
    },
  },
  {
    slug: "variance-analysis",
    term: "Variance analysis",
    shortDefinition:
      "Variance analysis quantifies and explains the differences between planned and actual financial results by driver such as price, volume, mix, and timing.",
    definition: `A variance is the difference between what was budgeted or forecast and what happened. Variance analysis decomposes that difference into causes. A revenue shortfall may be split into price, volume, product mix, and foreign exchange. An expense overrun may be split into headcount, rate, timing, and one-time items. The decomposition is arithmetic; the commentary explains what the arithmetic means.

Finance teams produce variance commentary in the monthly reporting pack. Historically this was the slowest part of the pack because analysts compiled it by hand from multiple systems after the close.

Meridian's Planning Agent computes variances at any grain the hierarchy supports, attributes each to its drivers with the math shown, and drafts commentary in the pack's format for analysts to edit and sign.`,
    relatedTerms: ["month-end-close", "erp"],
    relatedAgentSlugs: ["planning", "close"],
    seo: {
      title: "What Is Variance Analysis? | Meridian",
      description:
        "Variance analysis quantifies and explains differences between planned and actual financial results by driver such as price, volume, mix, and timing.",
      keywords: ["variance analysis", "budget vs actual", "variance commentary", "FP&A variance explanation"],
    },
  },
  {
    slug: "sox-controls",
    term: "SOX controls",
    shortDefinition:
      "SOX controls are the internal controls over financial reporting that US public companies must design, operate, and test under Sarbanes-Oxley Section 404.",
    definition: `Section 404 requires management to assess, and the external auditor to attest to, the effectiveness of internal control over financial reporting. Controls include entity-level controls, IT general controls, and process controls such as three-way match, journal entry approval, segregation of duties, and account reconciliation review. Each control has an owner, a frequency, and evidence that it operated.

Testing traditionally samples control operation after the fact: pull 25 journal entries, confirm each had an approver different from the preparer. Continuous controls monitoring tests the full population as transactions post and accumulates evidence throughout the period.

Meridian's Controls Agent produces per-control, per-period evidence from its test log, and the Audit Agent packages that evidence for internal and external auditors.`,
    relatedTerms: ["audit-evidence", "three-way-match", "duplicate-payment-detection"],
    relatedAgentSlugs: ["controls", "audit"],
    seo: {
      title: "What Are SOX Controls? | Meridian",
      description:
        "SOX controls are the internal controls over financial reporting that US public companies must design, operate, and test under Sarbanes-Oxley Section 404.",
      keywords: ["SOX controls", "Sarbanes-Oxley 404", "internal control over financial reporting", "SOX testing automation"],
    },
  },
  {
    slug: "audit-evidence",
    term: "Audit evidence",
    shortDefinition:
      "Audit evidence is the documentation and data an auditor obtains to support conclusions about financial statements or controls, such as invoices and approvals.",
    definition: `Auditors request evidence through a prepared-by-client (PBC) list: for each account or control, the samples, supporting documents, and explanations they need. Evidence must be sufficient (enough of it) and appropriate (relevant and reliable). Reliability improves when evidence comes directly from systems, is unaltered, and carries provenance.

Collecting evidence is a significant cost for finance teams because it interrupts the close, requires searching multiple systems, and is repeated across interim visits, year-end, and SOX testing. Poorly documented evidence generates follow-up requests.

Meridian's Audit Agent retrieves evidence from systems of record, hashes each artifact at collection, labels it to the request, and assembles packages with an index and lineage record that the controller releases.`,
    relatedTerms: ["sox-controls", "month-end-close", "erp"],
    relatedAgentSlugs: ["audit", "controls"],
    seo: {
      title: "What Is Audit Evidence? | Meridian",
      description:
        "Audit evidence is the documentation and data an auditor obtains to support conclusions about financial statements or controls. Definition and PBC lists.",
      keywords: ["audit evidence", "PBC list", "audit documentation", "audit evidence collection"],
    },
  },
  {
    slug: "duplicate-payment-detection",
    term: "Duplicate payment detection",
    shortDefinition:
      "Duplicate payment detection identifies supplier invoices paid or about to be paid more than once, including near-duplicates that exact-match checks miss.",
    definition: `Duplicates arise when an invoice is submitted twice, keyed twice, submitted under two vendor records for the same supplier, or resubmitted with a small change such as a suffix on the invoice number. ERP duplicate checks typically match on exact vendor ID and invoice number, which catches the first case and misses the rest.

Effective detection uses fuzzy matching across vendor name, amount, date, and invoice number, plus vendor master de-duplication, and explains each match so accounts payable can disposition it quickly. Recovery rates are high when duplicates are caught before payment and reasonable when caught within the year.

Meridian's Controls Agent runs duplicate detection on the full invoice population before each payment run. One design partner identified about $283,000 per year in its first 90 days.`,
    relatedTerms: ["three-way-match", "sox-controls", "erp"],
    relatedAgentSlugs: ["controls"],
    seo: {
      title: "What Is Duplicate Payment Detection? | Meridian",
      description:
        "Duplicate payment detection identifies supplier invoices paid or about to be paid more than once, including near-duplicates that exact-match checks miss.",
      keywords: ["duplicate payment detection", "duplicate invoice detection", "accounts payable leakage", "AP recovery audit"],
    },
  },
  {
    slug: "asc-606",
    term: "ASC 606",
    shortDefinition:
      "ASC 606 is the US GAAP revenue recognition standard: recognize revenue when control of goods or services transfers to the customer, under a five-step model.",
    definition: `The five steps are: identify the contract, identify the performance obligations, determine the transaction price, allocate the price to the obligations based on stand-alone selling prices, and recognize revenue as each obligation is satisfied. IFRS 15 is the equivalent standard outside the United States and is substantially converged.

Applying the standard requires reading contracts for terms that affect each step: termination rights, acceptance clauses, variable consideration such as SLA credits, bundled services, and modifications. The analysis is documented in a technical memo per contract or contract type and supports the revenue schedule in the subledger.

Meridian's Revenue Contract Agent extracts these terms, identifies performance obligations, and drafts the five-step memo and schedule for the controller's review.`,
    relatedTerms: ["revenue-recognition", "audit-evidence"],
    relatedAgentSlugs: ["revenue-contracts", "contract-review"],
    seo: {
      title: "What Is ASC 606? | Meridian",
      description:
        "ASC 606 is the US GAAP revenue recognition standard: recognize revenue when control transfers to the customer, following a five-step model. Definition.",
      keywords: ["ASC 606", "five-step revenue model", "revenue recognition standard", "IFRS 15"],
    },
  },
  {
    slug: "revenue-recognition",
    term: "Revenue recognition",
    shortDefinition:
      "Revenue recognition is the accounting principle that determines when and in what amount revenue is recorded, based on when performance obligations are met.",
    definition: `Revenue is recognized when a company has done what it promised, not when it invoices or is paid. A one-year subscription billed up front is recognized over twelve months. A software license delivered on day one may be recognized on day one. A bundle of license, implementation, and support is split, and each part is recognized on its own pattern.

The rules are set by ASC 606 in the United States and IFRS 15 elsewhere. Getting them wrong is one of the most common causes of restatements, which is why revenue accounting teams read customer contracts closely and document their judgments.

Meridian's Revenue Contract Agent reads 100% of customer contracts for recognition-relevant terms and drafts the accounting analysis, so quarter-end is review rather than reading.`,
    relatedTerms: ["asc-606", "month-end-close"],
    relatedAgentSlugs: ["revenue-contracts"],
    seo: {
      title: "What Is Revenue Recognition? | Meridian",
      description:
        "Revenue recognition determines when and in what amount revenue is recorded, based on when performance obligations are satisfied. Definition and rules.",
      keywords: ["revenue recognition", "performance obligations", "deferred revenue", "revenue accounting"],
    },
  },
  {
    slug: "job-architecture",
    term: "Job architecture",
    shortDefinition:
      "Job architecture is the structured framework of job families, levels, titles, and pay bands an organization uses to define, compare, and pay roles consistently.",
    definition: `A job architecture groups roles into families (engineering, finance, operations), defines levels within each with criteria for scope and impact, standardizes titles, and attaches pay bands by level and geography. It is the foundation for equitable pay, career paths, workforce planning, and market benchmarking.

Architectures decay. Managers create bespoke titles, acquisitions bring different frameworks, and market rates move faster than annual reviews. Symptoms include title inflation, duplicate roles across units, employees paid below band minimum, and rising pay-equity exposure. Re-benchmarking traditionally takes a compensation team weeks per cycle.

Meridian's Job Architecture Agent matches roles to survey benchmarks, proposes bands, and flags drift in hours. The compensation committee makes every decision.`,
    relatedTerms: ["pay-band", "hris"],
    relatedAgentSlugs: ["job-architecture", "performance"],
    seo: {
      title: "What Is Job Architecture? | Meridian",
      description:
        "Job architecture is the framework of job families, levels, titles, and pay bands an organization uses to define, compare, and pay roles consistently.",
      keywords: ["job architecture", "job leveling", "job families and levels", "compensation structure"],
    },
  },
  {
    slug: "pay-band",
    term: "Pay band",
    shortDefinition:
      "A pay band is the range of base salary an organization will pay for roles at a given level and location, usually defined by a minimum, midpoint, and maximum.",
    definition: `Pay bands translate market data into policy. The midpoint is typically anchored to a market percentile from compensation surveys; the minimum and maximum define the acceptable spread, often 80% to 120% of midpoint. An employee's position in the band is expressed as a compa-ratio (salary divided by midpoint) or a range penetration percentage.

Bands are set by level and geography and reviewed annually or when the market moves. Employees below the minimum are a compliance and retention risk; employees above the maximum signal a leveling problem or a market shift. Consistent bands are also the primary defense in pay-equity analysis.

Meridian's Job Architecture Agent proposes band midpoints and ranges from licensed survey data and flags employees outside band before the merit cycle.`,
    relatedTerms: ["job-architecture", "hris"],
    relatedAgentSlugs: ["job-architecture"],
    seo: {
      title: "What Is a Pay Band? | Meridian",
      description:
        "A pay band is the base salary range an organization will pay for roles at a given level and location, defined by a minimum, midpoint, and maximum.",
      keywords: ["pay band", "salary band", "compa-ratio", "salary range structure"],
    },
  },
  {
    slug: "shift-coverage",
    term: "Shift coverage",
    shortDefinition:
      "Shift coverage is the practice of keeping every scheduled shift staffed with enough qualified people, including gaps left by absences and call-outs.",
    definition: `Base schedules are built in advance; coverage is what happens when reality diverges. A call-out at 5 a.m., an approved leave, or a demand spike opens a shift that must be filled by someone who is qualified (right license or certification), eligible (within rest-period, maximum-hour, minor-labor, and union rules), and willing. Historically a manager works a phone tree in rank order.

Coverage decisions carry compliance weight. Predictive-scheduling ordinances in several US cities require records of schedule changes and offers. Union agreements often dictate the order in which extra hours are offered. Overtime rules make the cheapest available person not always the right one.

Meridian's Scheduling Agent builds the eligible list with rules as hard constraints, offers the shift by text in ranked waves, books the first acceptance, and logs every offer and response.`,
    relatedTerms: ["hris", "resolution-time"],
    relatedAgentSlugs: ["scheduling"],
    seo: {
      title: "What Is Shift Coverage? | Meridian",
      description:
        "Shift coverage is ensuring every scheduled shift has enough qualified staff, including filling gaps from absences and call-outs. Definition and automation.",
      keywords: ["shift coverage", "open shift management", "call-out coverage", "frontline scheduling"],
    },
  },
  {
    slug: "case-deflection",
    term: "Case deflection",
    shortDefinition:
      "Case deflection is the share of support requests resolved by self-service or automation without a human handling a case, as a percentage of total demand.",
    definition: `In HR service delivery, a case is a request that requires a person to act: a question, a transaction, a complaint. Deflection measures how many potential cases were resolved before they needed one. The metric is meaningful only if the resolution was real: an employee who gave up or was given a wrong answer is not a deflected case, so deflection should be read alongside satisfaction and reopen rates.

Typical HR knowledge-base deflection is modest because employees cannot find the right document or the document does not answer their specific situation. Agents that read both policy and the employee's own record can answer the specific question, which is why deflection rates rise sharply when they are deployed.

Meridian's Help Desk Agent reports deflection, satisfaction, and reopen rates by topic in the Registry so HR can see where deflection is genuine.`,
    relatedTerms: ["resolution-time", "hris"],
    relatedAgentSlugs: ["help-desk"],
    seo: {
      title: "What Is Case Deflection? | Meridian",
      description:
        "Case deflection is the share of support requests resolved by self-service or automation without a human handling a case. Definition and how to measure it.",
      keywords: ["case deflection", "HR case deflection", "ticket deflection rate", "self-service resolution"],
    },
  },
  {
    slug: "resolution-time",
    term: "Resolution time",
    shortDefinition:
      "Resolution time is the elapsed time from when a request is opened to when it is resolved, usually reported as a median or percentile per case type.",
    definition: `Resolution time captures the employee's or customer's experience of waiting. It is distinct from handle time, which measures the effort a person spent. A case can have low handle time and long resolution time if it sits in a queue or bounces between teams.

For HR shared services, resolution time is driven less by the difficulty of the answer than by intake: a case that arrives with the employee's record, the relevant policy, and the classification already attached is resolved faster than one that starts with four clarifying questions. Reporting by median and 90th percentile per case type shows where the delays are.

Meridian's Help Desk Agent resolves simple cases directly and hands complex ones to HR partners with context gathered, which shortens resolution time for both.`,
    relatedTerms: ["case-deflection", "shift-coverage"],
    relatedAgentSlugs: ["help-desk"],
    seo: {
      title: "What Is Resolution Time? | Meridian",
      description:
        "Resolution time is the elapsed time from when a request is opened to when it is resolved, reported as a median or percentile per case type. Definition.",
      keywords: ["resolution time", "time to resolution", "HR case resolution", "service delivery metrics"],
    },
  },
  {
    slug: "hris",
    term: "HRIS (Human Resources Information System)",
    shortDefinition:
      "An HRIS is the system of record for employee data: jobs, managers, locations, compensation, time off, and employment status, from hire to exit.",
    definition: `The HRIS holds the core employee record and the organizational structure around it. Downstream systems for payroll, benefits, recruiting, learning, and performance either live inside the HRIS suite or integrate with it. Its security model, which defines who may see and change which fields, is the reference for every other HR system.

For AI agents, the HRIS is both the primary data source and the primary permission model. An agent answering an employee's question about their PTO balance must read the HRIS as that employee; an agent proposing a payroll correction must respect the HRIS's approval workflow.

Meridian's agents connect to the HRIS through the Data Fabric and inherit its security model on every read.`,
    relatedTerms: ["ats", "erp", "scim"],
    relatedAgentSlugs: ["help-desk", "payroll", "job-architecture"],
    seo: {
      title: "What Is an HRIS? | Meridian",
      description:
        "An HRIS is the system of record for employee data: jobs, managers, locations, compensation, time off, and status from hire to exit. Definition and role.",
      keywords: ["HRIS", "human resources information system", "HR system of record", "HCM system"],
    },
  },
  {
    slug: "ats",
    term: "ATS (Applicant Tracking System)",
    shortDefinition:
      "An ATS is the system that manages job requisitions, postings, applications, candidate stages, interviews, and offers through the hiring process.",
    definition: `The applicant tracking system is where a requisition is opened, a posting is distributed, applications land, candidates move through stages, interviews are scheduled, and offers are extended. It holds the audit trail regulators and courts look at when hiring decisions are questioned, which is why decisions made outside the ATS create risk.

AI screening tools should work inside the ATS's model: read the requisition's criteria, write scores and rationale back as candidate notes, move stages only on a recruiter's approval, and leave the ATS as the record of who decided what.

Meridian's Recruiting Agent integrates with the ATS in both directions and produces an adverse-impact report per requisition alongside the shortlist.`,
    relatedTerms: ["hris", "job-architecture"],
    relatedAgentSlugs: ["recruiting"],
    seo: {
      title: "What Is an ATS? | Meridian",
      description:
        "An ATS is the system that manages job requisitions, postings, applications, candidate stages, interviews, and offers through the hiring process.",
      keywords: ["ATS", "applicant tracking system", "recruiting system of record", "ATS integration AI"],
    },
  },
  {
    slug: "erp",
    term: "ERP (Enterprise Resource Planning)",
    shortDefinition:
      "An ERP is the integrated system of record for a company's financial and operational transactions: general ledger, subledgers, procurement, and inventory.",
    definition: `In finance, the ERP holds the general ledger and the subledgers that feed it: accounts payable, accounts receivable, fixed assets, and often payroll and revenue. It records purchase orders, receipts, invoices, payments, and journal entries, along with who created and approved each one. It is the primary source of audit evidence and the system whose controls SOX testing examines.

Agents that work in finance need read access to the ERP at the transaction level and must respect its role model. Most finance agents should never need write access; they prepare work for a person to post.

Meridian's finance agents connect to the ERP read-only through the Data Fabric or zero-copy warehouse access. The Audit, Controls, and Close Agents all operate this way.`,
    relatedTerms: ["month-end-close", "three-way-match", "audit-evidence", "hris"],
    relatedAgentSlugs: ["audit", "controls", "close"],
    seo: {
      title: "What Is an ERP? | Meridian",
      description:
        "An ERP is the integrated system of record for financial and operational transactions: general ledger, subledgers, procurement, and inventory. Definition.",
      keywords: ["ERP", "enterprise resource planning", "general ledger system", "ERP read-only integration"],
    },
  },
  {
    slug: "data-residency",
    term: "Data residency",
    shortDefinition:
      "Data residency is the requirement that data be stored and processed within a specific geographic region to satisfy privacy law, regulation, or contract.",
    definition: `Residency requirements come from regulation (GDPR and national laws in the EU, sector rules in banking and healthcare), from customer contracts, and from internal policy. They apply to storage, to processing, and increasingly to AI inference: a model call that sends EU personal data to a US endpoint may breach a residency commitment even if the data is not stored there.

Meeting residency for AI agents means running the workspace, its storage, its processing, and its model inference within the region, and keeping zero-copy warehouse sources where they already are. Vendors should state the region per workspace and list subprocessors by region.

Meridian offers EU and US workspaces on Growth and Enterprise. Storage, processing, and model inference stay in the selected region.`,
    relatedTerms: ["dpa", "soc-2-type-ii", "zero-copy-data-sharing"],
    seo: {
      title: "What Is Data Residency? | Meridian",
      description:
        "Data residency is the requirement that data be stored and processed within a specific geographic region to satisfy privacy law, regulation, or contract.",
      keywords: ["data residency", "EU data residency", "data localization AI", "regional data processing"],
    },
  },
  {
    slug: "soc-2-type-ii",
    term: "SOC 2 Type II",
    shortDefinition:
      "SOC 2 Type II is an independent auditor's report on how effectively a service organization's security and availability controls operated over a period.",
    definition: `SOC 2 reports are issued under the AICPA's Trust Services Criteria. A Type I report describes controls at a point in time; a Type II report tests whether they operated effectively over a period, typically 6 to 12 months. Buyers ask for Type II because it shows sustained operation rather than design alone.

The report covers criteria the vendor selects: security is mandatory, and availability, confidentiality, processing integrity, and privacy are optional. Reports are shared under NDA and should be read for scope, exceptions, and the auditor's opinion.

Meridian holds a SOC 2 Type II report covering security, availability, and confidentiality, available under NDA from the trust center.`,
    relatedTerms: ["iso-27001", "dpa", "data-residency"],
    seo: {
      title: "What Is SOC 2 Type II? | Meridian",
      description:
        "SOC 2 Type II is an independent auditor's report on how effectively a service organization's security and availability controls operated over a period.",
      keywords: ["SOC 2 Type II", "SOC 2 report", "Trust Services Criteria", "vendor security assessment"],
    },
  },
  {
    slug: "iso-27001",
    term: "ISO 27001",
    shortDefinition:
      "ISO 27001 is the international standard for an information security management system, certifying that an organization systematically manages security risks.",
    definition: `ISO/IEC 27001 specifies requirements for establishing, operating, and improving an information security management system (ISMS). Certification is granted by an accredited body after audit and requires surveillance audits to maintain. The standard is risk-based: the organization identifies risks, selects controls from Annex A and elsewhere, and demonstrates that the system works.

ISO 27001 and SOC 2 overlap but differ in form. ISO 27001 certifies a management system against a fixed standard; SOC 2 reports on controls against criteria the vendor selects. Global buyers, particularly in Europe, often expect ISO 27001; US buyers often expect SOC 2. Many vendors hold both.

Meridian holds ISO 27001 certification alongside its SOC 2 Type II report.`,
    relatedTerms: ["soc-2-type-ii", "dpa", "data-residency"],
    seo: {
      title: "What Is ISO 27001? | Meridian",
      description:
        "ISO 27001 is the international standard for an information security management system, certifying that an organization manages security risks systematically.",
      keywords: ["ISO 27001", "information security management system", "ISMS certification", "ISO 27001 vs SOC 2"],
    },
  },
  {
    slug: "dpa",
    term: "DPA (Data Processing Agreement)",
    shortDefinition:
      "A DPA is a contract between a data controller and a data processor that sets out how personal data will be processed, protected, and deleted under GDPR.",
    definition: `Under GDPR and similar laws, an organization that decides why and how personal data is processed (the controller) must have a written agreement with any vendor that processes it on their behalf (the processor). The DPA covers the subject matter and duration of processing, the types of data, security measures, subprocessor approval, breach notification, assistance with data subject requests, audit rights, and deletion at termination.

For AI vendors, buyers should look for explicit terms on training: whether customer data may be used to train models, and whether model providers acting as subprocessors are bound by the same restriction.

Meridian's standard DPA includes the EU Standard Contractual Clauses where required and a contractual commitment that customer data is not used to train Meridian's or any third party's models.`,
    relatedTerms: ["baa", "data-residency", "soc-2-type-ii"],
    seo: {
      title: "What Is a DPA? | Meridian",
      description:
        "A DPA is a contract between a data controller and processor setting out how personal data is processed, protected, and deleted, as required by GDPR.",
      keywords: ["data processing agreement", "DPA GDPR", "processor agreement", "AI vendor DPA"],
    },
  },
  {
    slug: "baa",
    term: "BAA (Business Associate Agreement)",
    shortDefinition:
      "A BAA is a contract HIPAA requires between a covered entity and a vendor that handles protected health information, defining permitted uses and safeguards.",
    definition: `HIPAA covered entities (providers, health plans, clearinghouses) must sign a business associate agreement with any vendor that creates, receives, maintains, or transmits protected health information (PHI) on their behalf. The BAA specifies permitted uses and disclosures, required safeguards, breach notification duties, subcontractor flow-down, and return or destruction of PHI at termination.

HR systems in healthcare organizations frequently touch PHI through benefits, leave, and accommodation records, so HR-facing AI agents in healthcare need a BAA and a configuration that restricts model routing to providers also under BAA.

Meridian offers a BAA and HIPAA-ready deployment on the Enterprise plan. Healthcare design partners run the Help Desk and Scheduling Agents in this configuration.`,
    relatedTerms: ["dpa", "data-residency"],
    relatedAgentSlugs: ["help-desk", "scheduling"],
    seo: {
      title: "What Is a BAA? | Meridian",
      description:
        "A BAA is a HIPAA-required contract between a covered entity and a vendor handling protected health information, defining permitted uses and safeguards.",
      keywords: ["business associate agreement", "BAA HIPAA", "PHI vendor agreement", "HIPAA-ready AI"],
    },
  },
  {
    slug: "model-agnostic",
    term: "Model-agnostic",
    shortDefinition:
      "A model-agnostic platform runs on foundation models from multiple providers and lets the customer choose or change the model without rebuilding anything.",
    definition: `Model-agnostic platforms separate the application layer (workflows, tools, data access, guardrails) from the model layer. The customer selects which provider and model each workspace uses, subject to region and compliance constraints, and can change it as models improve or prices move. Evaluation sets make the change safe by showing behavior differences before they reach production.

The design also allows routing: general language tasks to a frontier model, domain-specific reasoning to a model tuned on the domain, and sensitive workloads to a provider under the right agreement. The customer's data is never used to train any of them.

Meridian is model-agnostic. Customers bring frontier models from leading providers, and Meridian routes HR and finance domain reasoning to its own tuned models.`,
    relatedTerms: ["guardrails", "data-residency", "governed-agent"],
    seo: {
      title: "What Does Model-Agnostic Mean? | Meridian",
      description:
        "A model-agnostic platform runs on foundation models from several providers and lets the customer choose or change the model without rebuilding. Definition.",
      keywords: ["model-agnostic", "bring your own model", "multi-model AI platform", "LLM provider choice"],
    },
  },
  {
    slug: "guardrails",
    term: "Guardrails",
    shortDefinition:
      "Guardrails are the enforced constraints on what an AI agent may read, do, and decide, including data scopes, approval requirements, and cost limits.",
    definition: `Guardrails turn a capable model into a deployable agent. They define the data the agent may read (and as whom), the tools it may call, the actions that require a person's approval, the topics it must escalate rather than answer, and the limits on how much it may spend or how often it may act. They also define what is logged.

The distinction that matters is where guardrails are enforced. Instructions in a prompt can be overridden by input the agent reads. Constraints enforced by infrastructure below the agent, at the data layer and the tool gateway, cannot. Buyers should ask which of a vendor's guardrails are prompts and which are policy.

Meridian enforces data scopes in the Data Fabric and tool and approval policies at the Gateway. Agents, builders, and prompts cannot remove them.`,
    relatedTerms: ["governed-agent", "human-in-the-loop", "agent-gateway"],
    seo: {
      title: "What Are AI Agent Guardrails? | Meridian",
      description:
        "Guardrails are enforced constraints on what an AI agent may read, do, and decide: data scopes, approval requirements, cost limits, and escalation rules.",
      keywords: ["AI guardrails", "agent guardrails", "AI agent constraints", "LLM safety controls enterprise"],
    },
  },
  {
    slug: "opentelemetry",
    term: "OpenTelemetry",
    shortDefinition:
      "OpenTelemetry is an open standard and toolkit for generating, collecting, and exporting traces, metrics, and logs to any compatible observability backend.",
    definition: `OpenTelemetry (OTel) defines a vendor-neutral data model and protocol (OTLP) for telemetry. Applications instrument once and export to whichever observability platform the organization runs. Traces show the path of a request across services with timing; metrics summarize behavior; logs capture events.

For AI agents, OpenTelemetry makes each step of an agent's work visible in the same tools engineers already use: which tools were called, with what latency, how many tokens were used, where an approval hold occurred, and what the outcome was. It is the practical basis for debugging, cost control, and incident response.

Meridian's Gateway emits OpenTelemetry traces, metrics, and logs for every agent step, exportable to the customer's observability stack.`,
    relatedTerms: ["agent-gateway", "model-context-protocol"],
    seo: {
      title: "What Is OpenTelemetry? | Meridian",
      description:
        "OpenTelemetry is an open standard for generating, collecting, and exporting traces, metrics, and logs so systems can be observed with any compatible backend.",
      keywords: ["OpenTelemetry", "OTLP", "AI agent observability", "agent tracing"],
    },
  },
  {
    slug: "scim",
    term: "SCIM",
    shortDefinition:
      "SCIM is an open standard for automatically provisioning, updating, and deprovisioning user accounts across applications from an identity provider.",
    definition: `SCIM defines a REST API and schema for user and group objects so an identity provider can create, update, and deactivate accounts in connected applications as people join, move, and leave. Combined with single sign-on over OpenID Connect or SAML, it gives IT one place to control access.

For platforms that run agents, SCIM matters beyond user accounts. If agents act on behalf of users and are owned by users, deprovisioning a user should suspend the agents they own and revoke the delegated access they granted. A platform that does not tie agent lifecycle to identity lifecycle leaves orphaned agents with live permissions.

Meridian supports SCIM provisioning; owner deprovisioning suspends that owner's agents in the Registry until a new owner is assigned.`,
    relatedTerms: ["agent-gateway", "hris", "agent-registry"],
    seo: {
      title: "What Is SCIM? | Meridian",
      description:
        "SCIM is an open standard for automatically provisioning, updating, and deprovisioning user accounts across applications from an identity provider.",
      keywords: ["SCIM", "SCIM provisioning", "identity lifecycle management", "deprovisioning AI agents"],
    },
  },
];

export const glossaryTerms: GlossaryTerm[] = [...terms].sort((a, b) =>
  a.term.localeCompare(b.term, "en", { sensitivity: "base" }),
);

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((term) => term.slug === slug);
}

export function getGlossaryTermsForAgent(agentSlug: string): GlossaryTerm[] {
  return glossaryTerms.filter((term) => term.relatedAgentSlugs?.includes(agentSlug));
}
