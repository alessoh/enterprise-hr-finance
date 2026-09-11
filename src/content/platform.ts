import type { PlatformPillar } from "./types";

export const platformPillars: PlatformPillar[] = [
  {
    slug: "registry",
    name: "Registry",
    eyebrow: "The system of record for agents",
    headline: "Every agent in your enterprise. One record each.",
    description:
      "One registry of every agent, whether built by Meridian, a partner, or your own team, with owner, role, permissions, data touched, and compliance status. Workforce analytics that count agents and people together.",
    longDescription: `An HRIS gives every employee a record: who they report to, what they are allowed to do, what they cost, when they were reviewed. Agents need the same thing. Without it, the third agent someone builds in a business unit is invisible to security, uncounted by finance, and unaccountable to anyone.

The Registry is that record. Each agent, from any source, is registered with an owner, a role, the permissions it holds, the systems and data it touches, its model configuration, and its compliance status. Every action any registered agent takes is written to the same immutable log. Deprovisioning an owner suspends their agents the same way it revokes their badge.

Because agents and people are recorded side by side, leaders can see workforce capacity honestly. The Registry reports hours saved, cases resolved, cost per outcome, and exception rates by agent, next to the human team's metrics, so return on investment is measured rather than asserted.`,
    features: [
      {
        title: "One record per agent",
        description:
          "Owner, role, purpose, permissions, model, data scopes, and status for every agent, including partner and customer-built ones registered through the Gateway.",
        icon: "BookUser",
      },
      {
        title: "Permissions and data lineage",
        description:
          "Agents hold no standing credentials. Each inherits scopes from your identity provider and the source system's security model. The Registry shows exactly which tables and documents each agent can read.",
        icon: "KeyRound",
      },
      {
        title: "Compliance status",
        description:
          "Review dates, risk tier, approved use cases, and evaluation results per agent. Agents that miss a review are flagged; agents that fail an evaluation can be paused automatically.",
        icon: "BadgeCheck",
      },
      {
        title: "Blended workforce analytics",
        description:
          "Hours saved, outcomes produced, credits consumed, and exception rates by agent, reported alongside human team metrics so capacity and ROI are measured on one page.",
        icon: "BarChart3",
      },
      {
        title: "Lifecycle controls",
        description:
          "Pause, resume, scope down, or retire any agent from one place. Owner offboarding suspends the agents that person owned until a new owner is assigned.",
        icon: "Power",
      },
      {
        title: "Cost attribution",
        description:
          "Credits and model spend attributed to agent, workspace, and cost center. Export to your ERP or FinOps tooling.",
        icon: "Coins",
      },
    ],
    proofPoints: [
      "Agents inherit identity from your IdP and roles from the source system; none has credentials of its own",
      "Every action by any registered agent lands in the same immutable, exportable log",
      "The Registry API exposes the same fields to your GRC, ITSM, and SIEM tools",
      "Owner offboarding through SCIM suspends the owner's agents within minutes",
    ],
    faqs: [
      {
        question: "What is an agent system of record?",
        answer:
          "It is a single, authoritative registry of every AI agent operating in an organization, recording for each one its owner, role, permissions, data access, model configuration, and compliance status, in the way an HRIS records employees. Meridian's Registry is an agent system of record that also captures every action each agent takes.",
      },
      {
        question: "Can we register agents we did not buy from Meridian?",
        answer:
          "Yes. Partner agents and agents your developers build in other frameworks register through the Gateway using open protocols. Once registered they appear in the Registry with the same record structure, log, and controls as Meridian's agents.",
      },
      {
        question: "How does the Registry measure ROI?",
        answer:
          "Each agent reports the outcomes it produces (cases resolved, shifts filled, packages assembled) and the credits it consumes. The Registry applies your time-per-task and cost assumptions, which you can edit, and reports hours saved and cost per outcome next to human team metrics. Assumptions are visible on every chart.",
      },
      {
        question: "Does the Registry integrate with our GRC tooling?",
        answer:
          "Yes. Agent records, review status, and evaluation results are available through the Registry API and as scheduled exports. Design partners synced them to their GRC platforms as assets with control mappings.",
      },
    ],
    seo: {
      title: "Registry: Agent System of Record | Meridian",
      description:
        "Meridian Registry is the system of record for every AI agent you run: owner, permissions, data touched, compliance status, and blended workforce analytics.",
      keywords: [
        "agent system of record",
        "AI agent registry",
        "agent governance platform",
        "enterprise AI agent inventory",
        "blended workforce analytics",
      ],
    },
  },

  {
    slug: "gateway",
    name: "Gateway",
    eyebrow: "Open standards, governed",
    headline: "Bring any agent. Govern it here.",
    description:
      "The Gateway connects third-party and custom agents to the Registry through open standards: Model Context Protocol for tools, agent-to-agent protocols for handoffs, OpenTelemetry for observability, and your identity provider for access.",
    longDescription: `Enterprises will not run one vendor's agents. They will run dozens from many sources, plus their own. The question is whether those agents share one identity model, one policy layer, and one log, or whether each brings its own. The Gateway is where they converge.

Agents connect over protocols they already speak. Tools are exposed through Model Context Protocol servers with per-agent scopes. Handoffs between agents use A2A-style agent-to-agent protocols with the originating user's identity carried through. Traces, metrics, and logs are emitted in OpenTelemetry format to your observability stack. Identity comes from your IdP over OpenID Connect or SAML, and provisioning over SCIM.

Every call through the Gateway is evaluated against policy: which agent may call which tool, on whose behalf, with what data scope, at what rate and cost. Calls that require human approval are held at the Gateway until an authorized person acts. The result is one place to see and constrain everything agents do, regardless of who built them.`,
    features: [
      {
        title: "MCP tool servers",
        description:
          "Expose your systems as Model Context Protocol tools with per-agent scopes, schema validation, and rate limits. Meridian ships servers for common HR and finance systems; add your own.",
        icon: "Plug",
      },
      {
        title: "Agent-to-agent handoffs",
        description:
          "Agents delegate sub-tasks to other agents over A2A-style protocols. The originating user's identity and approval context travel with the request.",
        icon: "ArrowLeftRight",
      },
      {
        title: "Policy enforcement point",
        description:
          "Every tool call is checked against policy: allowed tools, data scopes, cost ceilings, and approval requirements. Denials and holds are logged with the rule that fired.",
        icon: "ShieldCheck",
      },
      {
        title: "OpenTelemetry observability",
        description:
          "Traces, metrics, and logs for every agent step in OTLP format, exportable to the observability platform you already run.",
        icon: "Activity",
      },
      {
        title: "Identity from your IdP",
        description:
          "OpenID Connect and SAML for authentication, SCIM for provisioning. Agents act on behalf of users, and user offboarding revokes agent access.",
        icon: "Fingerprint",
      },
      {
        title: "Cost and rate governance",
        description:
          "Per-agent and per-workspace ceilings on credits, model tokens, and tool calls, with alerts before limits are reached.",
        icon: "Gauge",
      },
    ],
    proofPoints: [
      "Third-party agents register in under an hour with an MCP manifest and an IdP client",
      "Approval holds enforced at the Gateway apply to every agent, including ones Meridian did not build",
      "OTLP export means agent traces sit next to application traces in your existing dashboards",
      "Policies are versioned; every allow, deny, and hold records the policy version that decided it",
    ],
    standards: [
      "Model Context Protocol (MCP)",
      "A2A-style agent-to-agent protocols",
      "OpenTelemetry (OTLP)",
      "OpenID Connect and SAML",
      "SCIM",
    ],
    faqs: [
      {
        question: "What is an agent gateway?",
        answer:
          "An agent gateway is the control point through which AI agents reach tools, data, and each other. It authenticates the agent and the user it acts for, enforces policy on each call, and records what happened. Meridian's Gateway does this using open protocols so agents from any source can connect without custom integration.",
      },
      {
        question: "Does the Gateway support the Model Context Protocol?",
        answer:
          "Yes. Tools are exposed as MCP servers, and agents connect as MCP clients. Meridian adds per-agent scopes, schema validation, rate limits, and approval holds on top of the protocol.",
      },
      {
        question: "Can agents built in other frameworks connect?",
        answer:
          "Yes. Any agent that can speak MCP for tools and authenticate with your IdP can register. Handoffs to and from Meridian agents use A2A-style protocols. Registered agents appear in the Registry with full logging.",
      },
      {
        question: "How does human approval work for third-party agents?",
        answer:
          "Approval policies are enforced at the Gateway, not inside the agent. When a registered agent calls a tool that policy marks as consequential, the call is held and routed to an approver. The agent cannot proceed until a person acts. This applies equally to agents Meridian did not build.",
      },
    ],
    seo: {
      title: "Gateway: Connect Any Agent via MCP | Meridian",
      description:
        "Meridian Gateway connects third-party and custom agents over Model Context Protocol, agent-to-agent protocols, and OpenTelemetry, with policy on every call.",
      keywords: [
        "agent gateway",
        "Model Context Protocol enterprise",
        "MCP gateway",
        "agent-to-agent protocol",
        "AI agent policy enforcement",
      ],
    },
  },

  {
    slug: "data-fabric",
    name: "Data Fabric",
    eyebrow: "Zero-copy access",
    headline: "Agents read your data where it lives.",
    description:
      "Zero-copy access to Snowflake, Databricks, and BigQuery, governed SQL, an Apache Iceberg lakehouse, and more than 3,000 prebuilt connectors. Row and column security is inherited, not reimplemented.",
    longDescription: `Agents are only as reliable as the data they read. Copying HR and finance data into a vendor's store creates a second security model, a freshness lag, and a compliance question. The Data Fabric avoids the copy.

Agents query your warehouse directly through zero-copy sharing with Snowflake, Databricks, and BigQuery. Row-level and column-level security defined in the warehouse apply to every agent query. For systems without a warehouse footprint, more than 3,000 prebuilt connectors bring HRIS, ATS, payroll, ERP, CLM, and collaboration data into an Apache Iceberg lakehouse that you own and that your own tools can query.

Every agent read is a SQL statement or an API call you can inspect. Freshness is measured per source and shown to the agent and the user, so a variance explanation states which day's actuals it used. Nothing in the Data Fabric is used to train models.`,
    features: [
      {
        title: "Zero-copy warehouse access",
        description:
          "Agents query Snowflake, Databricks, and BigQuery in place through native sharing. No extract, no second copy, no drift.",
        icon: "Database",
      },
      {
        title: "Inherited security",
        description:
          "Row-level and column-level policies defined in the warehouse or source system apply to every agent query. Agents cannot see more than the user they act for.",
        icon: "Lock",
      },
      {
        title: "Apache Iceberg lakehouse",
        description:
          "An open-format lakehouse you own, for sources without a warehouse footprint. Query it with the engine of your choice.",
        icon: "Layers",
      },
      {
        title: "3,000+ prebuilt connectors",
        description:
          "HRIS, ATS, payroll, ERP, CLM, banking, expense, ticketing, and collaboration systems, with incremental sync and schema tracking.",
        icon: "Cable",
      },
      {
        title: "Governed SQL",
        description:
          "Every agent read is an inspectable SQL statement or API call, logged with the user context and the result row count.",
        icon: "Terminal",
      },
      {
        title: "Freshness contracts",
        description:
          "Per-source freshness measured and surfaced to agents and users. An answer says which day's data it used.",
        icon: "Clock",
      },
    ],
    proofPoints: [
      "Design partners connected a warehouse and the first two source systems in the first week",
      "Warehouse security policies apply unchanged; no Meridian-side permission model to maintain",
      "Iceberg tables are readable by Spark, Trino, DuckDB, and the warehouses themselves",
      "Data residency follows your warehouse region; the Fabric runs in the EU or US to match",
    ],
    standards: ["Apache Iceberg", "ANSI SQL", "OAuth 2.0", "OpenTelemetry (OTLP)"],
    faqs: [
      {
        question: "What is zero-copy data sharing?",
        answer:
          "Zero-copy sharing lets a consumer query data in a provider's warehouse without extracting or duplicating it. Meridian's agents read your Snowflake, Databricks, or BigQuery data this way, so the warehouse's security policies apply and there is no second copy to govern.",
      },
      {
        question: "Where does our data live?",
        answer:
          "In your warehouse, where it already lives, for zero-copy sources. For connector-fed sources, in an Apache Iceberg lakehouse in the region you choose, in storage you can inspect. Meridian does not maintain a separate copy of your data for its own purposes and does not train on it.",
      },
      {
        question: "Which systems do the connectors cover?",
        answer:
          "More than 3,000 applications, including the common HRIS, ATS, payroll, ERP, CLM, banking, expense, ticketing, and collaboration platforms. Connectors are generic categories on this site; your account team can confirm coverage for your specific stack.",
      },
      {
        question: "Can our own analysts query the lakehouse?",
        answer:
          "Yes. Iceberg is an open table format. Your BI tools, notebooks, and warehouses can read the same tables the agents read, with the same permissions.",
      },
    ],
    seo: {
      title: "Data Fabric: Zero-Copy Data for Agents | Meridian",
      description:
        "Meridian Data Fabric gives agents zero-copy access to Snowflake, Databricks, and BigQuery, an Apache Iceberg lakehouse, governed SQL, and 3,000+ connectors.",
      keywords: [
        "zero-copy data sharing",
        "AI agent data access",
        "Apache Iceberg lakehouse",
        "enterprise data fabric",
        "governed SQL for agents",
      ],
    },
  },

  {
    slug: "studio",
    name: "Studio",
    eyebrow: "Low-code agent builder",
    headline: "Build your own agents on the same guardrails.",
    description:
      "Studio is a low-code builder for agents on top of your data and Meridian's controls. Approval steps, evaluation sets, and Registry registration are built in, not bolted on.",
    longDescription: `Meridian ships twelve agents. Your organization has hundreds of workflows. Studio lets operations, HR, and finance teams build agents for the rest without inheriting the security work.

Agents are composed from blocks: a trigger, data reads through the Data Fabric, reasoning steps on your chosen model, tool calls through the Gateway, and approval steps that route to named people. Approval steps are a first-class block. So are evaluation sets, which let a builder define expected behavior on real examples and see pass rates before publishing.

Publishing registers the agent in the Registry with an owner, permissions, and a risk tier. Versions are promoted through environments. If an evaluation regresses or a policy changes, the agent can be paused from the Registry like any other.`,
    features: [
      {
        title: "Visual composition",
        description:
          "Triggers, data reads, reasoning steps, tool calls, and approvals as blocks. Code where you want it, none where you do not.",
        icon: "Blocks",
      },
      {
        title: "Approval steps as blocks",
        description:
          "Route consequential actions to named approvers or roles. Approvals are enforced at the Gateway, so a builder cannot skip them.",
        icon: "UserCheck",
      },
      {
        title: "Evaluation sets",
        description:
          "Define expected behavior on real examples. See pass rates and regressions before publishing and on every model change.",
        icon: "FlaskConical",
      },
      {
        title: "Versioning and promotion",
        description:
          "Draft, test, and production environments with promotion gates and rollback.",
        icon: "GitBranch",
      },
      {
        title: "Templates from Meridian agents",
        description:
          "Start from the patterns Meridian's own agents use: intake and routing, reconciliation, document review, evidence packaging.",
        icon: "LayoutTemplate",
      },
      {
        title: "Registered on publish",
        description:
          "Every published agent gets a Registry record with owner, scopes, and risk tier. Nothing runs unregistered.",
        icon: "BookMarked",
      },
    ],
    proofPoints: [
      "Design partners published their first custom agent within two weeks of Studio access",
      "Approval and logging cannot be bypassed by a builder; they are enforced below the builder",
      "Evaluation sets re-run automatically when the workspace's model changes",
      "Studio agents consume credits on the same meter as Meridian agents",
    ],
    faqs: [
      {
        question: "Who is Studio for?",
        answer:
          "Operations, HR, and finance teams with a workflow Meridian's agents do not cover, and IT teams who want those agents built on governed infrastructure rather than in a spreadsheet macro or an unmanaged script.",
      },
      {
        question: "Do custom agents have the same guardrails as Meridian's agents?",
        answer:
          "Yes. Data access goes through the Data Fabric, tool calls go through the Gateway, approvals are enforced there, and every published agent has a Registry record. A builder can add controls; a builder cannot remove them.",
      },
      {
        question: "Can developers use code instead of the visual builder?",
        answer:
          "Yes. Blocks can contain code, and whole agents can be defined in code and published through the same pipeline. Developers who prefer other frameworks can connect through the Gateway instead.",
      },
      {
        question: "Which plan includes Studio?",
        answer:
          "Studio is included in Enterprise. Growth customers can request early access for a specific use case.",
      },
    ],
    seo: {
      title: "Studio: Low-Code Agent Builder | Meridian",
      description:
        "Meridian Studio is a low-code builder for custom HR and finance agents with approval steps, evaluation sets, versioning, and Registry registration built in.",
      keywords: [
        "low-code agent builder",
        "build custom AI agents",
        "enterprise agent studio",
        "agent evaluation sets",
        "governed agent development",
      ],
    },
  },

  {
    slug: "assist",
    name: "Assist",
    eyebrow: "The conversational front door",
    headline: "Ask once. Search, generate, or run an agent.",
    description:
      "Assist is the conversational interface across Meridian and your connected systems. Search with citations, generate documents from governed data, and start agents from the same place, with your permissions applied.",
    longDescription: `Most work starts with a question. Where is the latest version of the expense policy. What did we pay this vendor last year. Draft a job description for a senior accountant in Dublin at the L4 band. Assist answers from the systems you have connected, cites its sources, and, when the answer is an action, starts the right agent.

Assist respects permissions at every step. Search results include only documents and records the user can already open. Generated documents draw only on data the user can already query. Agents started from Assist run under the user's identity with the approval steps they always have.

It works in the browser, in Slack, and in Microsoft Teams, so employees, managers, and finance teams meet the platform where they already work. For HR service delivery, the Help Desk Agent runs inside Assist; for everything else, Assist is how people find things and get them started.`,
    features: [
      {
        title: "Search with citations",
        description:
          "One query across your document stores, HRIS, ERP, and collaboration tools. Every result carries its source and the user's existing permissions apply.",
        icon: "Search",
      },
      {
        title: "Generate from governed data",
        description:
          "Job descriptions, policy summaries, variance narratives, and board-ready tables generated from data the user can already see.",
        icon: "FileText",
      },
      {
        title: "Run agents from chat",
        description:
          "Start the Audit Agent on a PBC list or the Scheduling Agent on an open shift from the same conversation. Approvals still apply.",
        icon: "Play",
      },
      {
        title: "Slack and Microsoft Teams",
        description:
          "Full functionality in the tools people already use, plus the browser workspace for longer tasks.",
        icon: "MessageSquare",
      },
      {
        title: "Permission-aware by construction",
        description:
          "Assist never holds its own access. It acts as the user, through the Gateway and the Data Fabric, so answers cannot leak across roles.",
        icon: "Lock",
      },
    ],
    proofPoints: [
      "Every answer cites its source; users can open the document or query behind it",
      "Runs on the model your workspace selects; sensitive workspaces can pin a provider and region",
      "Conversation logs are retained under your policy and visible to the user",
      "Deploys to Slack or Teams in an afternoon once the Data Fabric is connected",
    ],
    faqs: [
      {
        question: "Is Assist a chatbot?",
        answer:
          "It is a conversational interface, but it is not an open-ended assistant. It answers only from your connected systems with citations, generates only from data the user can see, and starts governed agents rather than improvising actions. When it cannot answer from your data it says so.",
      },
      {
        question: "Which models does Assist use?",
        answer:
          "The models your workspace administrator selects. Meridian supports frontier models from leading providers and routes HR and finance domain reasoning to Meridian's own tuned models. Your data is not used to train any of them.",
      },
      {
        question: "Can employees use Assist for HR questions?",
        answer:
          "Yes. The Help Desk Agent runs inside Assist. Employees ask about pay, leave, benefits, and policy in Slack, Teams, or the browser, and the agent answers from policy and their own record.",
      },
      {
        question: "Does Assist see data the user cannot?",
        answer:
          "No. Assist acts as the user through the Gateway and Data Fabric. Search, generation, and agent runs all carry the user's identity and permissions.",
      },
    ],
    seo: {
      title: "Assist: Conversational Front Door | Meridian",
      description:
        "Meridian Assist is the conversational interface across your HR and finance systems: cited search, generation from governed data, and agents you run from chat.",
      keywords: [
        "enterprise AI assistant",
        "conversational HR and finance interface",
        "enterprise search with citations",
        "run AI agents from Slack",
        "permission-aware AI assistant",
      ],
    },
  },

  {
    slug: "trust",
    name: "Trust",
    eyebrow: "Governed by design",
    headline: "Humans stay accountable. The log proves it.",
    description:
      "Human-in-the-loop approvals on every consequential action, an immutable audit trail, role-based access, SOC 2 Type II and ISO 27001, GDPR compliance, HIPAA-ready deployment, EU and US data residency, no training on customer data, and your choice of model.",
    longDescription: `Trust is not a feature you add to an agent. It is the set of constraints the agent runs inside. Meridian's constraints are the same for every agent on the platform, whether Meridian built it, a partner did, or you did in Studio.

Consequential actions, the ones that move money, change pay, reject a candidate, or send a document outside the company, are held for a named human's approval. The hold is enforced at the Gateway, so no agent, prompt, or builder can skip it. Every read, every reasoning step, every tool call, and every approval is written to an immutable log with the identity that authorized it. The log is yours to export.

Access follows your identity provider and the source system's security model. Meridian does not train on customer data and contractually commits to that. Workspaces run in the EU or the US, with model calls routed inside the region. Meridian holds a SOC 2 Type II report and ISO 27001 certification, supports GDPR obligations with a standard DPA, and offers HIPAA-ready deployments with a BAA on Enterprise. You choose the models. You can change them.`,
    features: [
      {
        title: "Human-in-the-loop approvals",
        description:
          "Consequential actions are held at the Gateway until a named approver acts. Approval policies are versioned and cannot be bypassed by an agent or a builder.",
        icon: "UserCheck",
      },
      {
        title: "Immutable audit trail",
        description:
          "Every read, reasoning step, tool call, approval, and outcome is logged with the acting identity, hashed, and exportable to your SIEM or archive.",
        icon: "ScrollText",
      },
      {
        title: "Role-based access",
        description:
          "Identity from your IdP over OpenID Connect or SAML, provisioning over SCIM, and source-system permissions inherited on every query.",
        icon: "Fingerprint",
      },
      {
        title: "Certifications and regulation",
        description:
          "SOC 2 Type II report and ISO 27001 certification. GDPR compliance with a standard DPA. HIPAA-ready deployment with a BAA on Enterprise.",
        icon: "BadgeCheck",
      },
      {
        title: "Data residency",
        description:
          "Workspaces in the EU or the US. Data storage, processing, and model inference stay in the region you select.",
        icon: "Globe",
      },
      {
        title: "No training on customer data. Your model.",
        description:
          "Customer data is never used to train Meridian's or any third party's models, by contract. Choose frontier models from leading providers; change them per workspace.",
        icon: "Cpu",
      },
    ],
    proofPoints: [
      "SOC 2 Type II report and ISO 27001 certificate available under NDA from the trust center",
      "Approval holds enforced below the agent layer apply to Meridian, partner, and Studio agents alike",
      "Audit log entries are hashed and chained; exports verify integrity",
      "Model inference is routed within the workspace region; no cross-region calls",
      "Penetration tested annually by an independent firm; summary available on request",
    ],
    standards: [
      "SOC 2 Type II",
      "ISO 27001",
      "GDPR",
      "HIPAA (BAA on Enterprise)",
      "OpenID Connect and SAML",
      "SCIM",
      "OpenTelemetry (OTLP)",
    ],
    faqs: [
      {
        question: "Is our data used to train AI models?",
        answer:
          "No. Customer data is never used to train Meridian's models or any third-party model, and Meridian's agreements with model providers prohibit it. This is a contractual commitment in the DPA, not a setting.",
      },
      {
        question: "Which certifications does Meridian hold?",
        answer:
          "SOC 2 Type II and ISO 27001. Meridian supports GDPR obligations with a standard DPA and offers HIPAA-ready deployments with a BAA on the Enterprise plan. Reports and certificates are available under NDA.",
      },
      {
        question: "Where is data processed and stored?",
        answer:
          "In the region you choose for the workspace, EU or US. Storage, processing, and model inference stay in that region. Zero-copy warehouse sources are never moved.",
      },
      {
        question: "How do human approvals actually work?",
        answer:
          "Policies define which actions are consequential per agent. When an agent reaches one, the call is held at the Gateway and routed to the approver or role you named, in Slack, Teams, email, or the workspace. The agent cannot continue until a person approves, edits, or rejects. Every decision is logged.",
      },
      {
        question: "Can we choose or change the model?",
        answer:
          "Yes. Workspace administrators choose from supported frontier models and can pin a provider and region. Meridian routes HR and finance domain reasoning to its own tuned models. Changing the model re-runs evaluation sets so you can see any behavior change before it goes live.",
      },
    ],
    seo: {
      title: "Trust and Security | Meridian",
      description:
        "Approval holds, an immutable audit trail, SOC 2 Type II, ISO 27001, GDPR, HIPAA-ready, EU/US residency, no training on your data. Humans stay accountable.",
      keywords: [
        "AI agent security",
        "human-in-the-loop AI",
        "SOC 2 Type II AI platform",
        "enterprise AI data residency",
        "AI audit trail",
      ],
    },
  },
];

export function getPlatformPillar(slug: string): PlatformPillar | undefined {
  return platformPillars.find((pillar) => pillar.slug === slug);
}
