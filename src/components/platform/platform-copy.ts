import type { Faq } from "@/content/types";

/*
 * Overview-level copy that has no home in src/content (the content module
 * describes pillars, not the platform as a whole). Facts mirror BRIEF §3 and
 * src/content/{platform,pricing}.ts. Wish: move to src/content/platform.ts.
 */

export const platformOverview = {
  title: "The layer under the agents.",
  lede: "Meridian's platform is the governed layer under every agent you run. Registry is the system of record, Gateway connects any agent through open standards, Data Fabric reads your data in place, Studio builds your own, Assist is the front door, and Trust bounds all of it.",
  seo: {
    title: "Platform: Registry, Gateway, Data Fabric, Studio, Assist",
    description:
      "The governed layer under every Meridian agent: a Registry that is the system of record, a Gateway built on MCP, zero-copy Data Fabric, Studio, and Assist.",
    keywords: [
      "AI agent platform",
      "agent system of record",
      "agent gateway MCP",
      "zero-copy data fabric",
      "low-code agent builder",
      "governed AI agents",
    ],
  },
} as const;

export interface StandardRow {
  name: string;
  /** Short spec identifier for the mono column. */
  id: string;
  whatItIs: string;
  whatItMeans: string;
}

export const standards: StandardRow[] = [
  {
    name: "Model Context Protocol",
    id: "MCP",
    whatItIs: "An open protocol that exposes tools and data to AI agents through typed servers and clients.",
    whatItMeans:
      "Any MCP-capable agent can use your systems through the Gateway, with per-agent scopes, schema validation, and rate limits added by Meridian.",
  },
  {
    name: "Agent-to-agent protocols",
    id: "A2A",
    whatItIs: "Open protocols for one agent to delegate a task to another agent and receive the result.",
    whatItMeans:
      "Meridian, partner, and custom agents hand off work to each other with the originating user's identity and approval context attached.",
  },
  {
    name: "OpenTelemetry",
    id: "OTLP",
    whatItIs: "The CNCF standard for emitting traces, metrics, and logs in one format.",
    whatItMeans:
      "Every agent step exports to the observability platform you already run, so agent traces sit next to application traces.",
  },
  {
    name: "OpenID Connect and SAML",
    id: "OIDC / SAML",
    whatItIs: "Federated authentication standards supported by enterprise identity providers.",
    whatItMeans: "People sign in with your IdP. Agents act as the user and hold no credentials of their own.",
  },
  {
    name: "SCIM",
    id: "SCIM 2.0",
    whatItIs: "The standard for automated user provisioning and deprovisioning between systems.",
    whatItMeans: "Offboarding a person in your IdP suspends the agents that person owns within minutes.",
  },
  {
    name: "Apache Iceberg",
    id: "Iceberg",
    whatItIs: "An open table format for large analytic datasets in a lakehouse.",
    whatItMeans:
      "Connector-fed data lands in tables you own and can query with Spark, Trino, DuckDB, or your own warehouse.",
  },
];

export const platformFaqs: Faq[] = [
  {
    question: "What is the Meridian platform?",
    answer:
      "The Meridian platform is the governed layer under every agent you run. It has six parts: Registry, the system of record for agents; Gateway, which connects agents through open standards and enforces policy on every call; Data Fabric, zero-copy access to your data; Studio, a low-code agent builder; Assist, the conversational front door; and Trust, the approvals, audit trail, access control, certifications, and residency that apply to all of them. The same six apply to agents built by Meridian, by partners, and by your own teams.",
  },
  {
    question: "Do we have to use all six components?",
    answer:
      "No. Meridian's twelve agents use Registry, Gateway, Data Fabric, and Trust by default, so most design partners started there. Studio is for teams building their own agents and Assist is the interface for people; both are optional. Every component shares one identity model, one policy layer, and one log.",
  },
  {
    question: "Which plans include which platform components?",
    answer:
      "Starter includes Assist, approvals, the audit log, and prebuilt connectors for one workspace with up to 3 GA agents. Growth adds the Registry with blended workforce analytics, the Gateway for partner and custom agents, SSO over OpenID Connect or SAML with SCIM provisioning, and EU or US residency. Enterprise adds the Data Fabric with zero-copy warehouse access and an Iceberg lakehouse, Studio, a dedicated environment, and a 99.95% uptime SLA. See [pricing](/pricing) for credits and limits.",
  },
  {
    question: "Can agents we did not buy from Meridian run on the platform?",
    answer:
      "Yes. Any agent that speaks Model Context Protocol for tools and authenticates with your identity provider registers through the Gateway. Once registered it has a Registry record, the same approval holds, and the same immutable log as Meridian's own agents.",
  },
  {
    question: "Where does our data live when agents use it?",
    answer:
      "In your warehouse for zero-copy sources (Snowflake, Databricks, BigQuery) and in an Apache Iceberg lakehouse you own for connector-fed sources, in the EU or US region you select. Meridian does not keep a separate copy of your data for its own purposes and does not train on customer data.",
  },
];
