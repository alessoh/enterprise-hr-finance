/**
 * Canonical route registry. Sitemap, robots, llms.txt, and breadcrumbs read
 * from here so every surface agrees on what exists and what is indexable.
 */
export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface StaticRoute {
  path: string;
  label: string;
  /** One sentence, used in llms.txt "Pages". */
  description: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

export const staticRoutes: StaticRoute[] = [
  { path: "/", label: "Home", description: "AI agents that run HR and finance. Overview of the agent catalog, platform, live operations feed, and pricing.", changeFrequency: "weekly", priority: 1.0 },
  { path: "/agents", label: "Agents", description: "Catalog of 12 governed agents for HR, finance, and legal operations with outcomes, status, and credit costs.", changeFrequency: "weekly", priority: 0.9 },
  { path: "/platform", label: "Platform", description: "The platform layer that governs agents: Registry, Gateway, Data Fabric, Studio, Assist, and Trust.", changeFrequency: "monthly", priority: 0.9 },
  { path: "/platform/registry", label: "Registry", description: "System of record for every agent: owner, role, permissions, data touched, compliance status, and blended workforce analytics.", changeFrequency: "monthly", priority: 0.8 },
  { path: "/platform/gateway", label: "Gateway", description: "Connects third-party agents through Model Context Protocol, agent-to-agent protocols, OpenTelemetry, and enterprise identity providers.", changeFrequency: "monthly", priority: 0.8 },
  { path: "/platform/data-fabric", label: "Data Fabric", description: "Zero-copy access to Snowflake, Databricks, and BigQuery, SQL access, an Apache Iceberg lakehouse, and 3,000+ prebuilt connectors.", changeFrequency: "monthly", priority: 0.8 },
  { path: "/platform/studio", label: "Studio", description: "Low-code agent builder on top of your data and Meridian's guardrails.", changeFrequency: "monthly", priority: 0.7 },
  { path: "/platform/assist", label: "Assist", description: "The conversational front door across Meridian and connected systems: search, generate, and run agents.", changeFrequency: "monthly", priority: 0.7 },
  { path: "/security", label: "Security and trust", description: "Human-in-the-loop approvals, immutable audit trail, RBAC, SOC 2 Type II, ISO 27001, GDPR, HIPAA-ready, EU/US data residency, no training on customer data.", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", label: "Pricing", description: "Consumption-based credits: Starter $499/mo, Growth $2,499/mo, Enterprise custom, with a credits and ROI calculator.", changeFrequency: "monthly", priority: 0.9 },
  { path: "/customers", label: "Customers", description: "Design-partner case studies with measured outcomes across logistics, healthcare, energy, financial services, retail, food, manufacturing, and banking.", changeFrequency: "monthly", priority: 0.7 },
  { path: "/resources", label: "Resources", description: "Guides and analyses on deploying governed AI agents in HR and finance.", changeFrequency: "weekly", priority: 0.8 },
  { path: "/glossary", label: "Glossary", description: "Definitions of terms used in agentic HR and finance operations.", changeFrequency: "monthly", priority: 0.6 },
  { path: "/changelog", label: "Changelog", description: "Dated release notes for agents, platform, security, and pricing.", changeFrequency: "weekly", priority: 0.6 },
  { path: "/status", label: "Status", description: "Live service status and uptime for Meridian agents and platform components.", changeFrequency: "daily", priority: 0.4 },
  { path: "/dashboard", label: "Live dashboard", description: "Public live demo of the operations dashboard: agent activity feed, metrics, and approvals.", changeFrequency: "daily", priority: 0.5 },
  { path: "/about", label: "About", description: "Who builds Meridian and why: governed agents for the work HR and finance teams actually do.", changeFrequency: "monthly", priority: 0.5 },
  { path: "/careers", label: "Careers", description: "Open roles at Meridian.", changeFrequency: "monthly", priority: 0.4 },
  { path: "/contact", label: "Contact", description: "Talk to sales, request a demo, or reach security.", changeFrequency: "yearly", priority: 0.5 },
  { path: "/legal/privacy", label: "Privacy policy", description: "How Meridian collects, uses, and protects personal data.", changeFrequency: "yearly", priority: 0.2 },
  { path: "/legal/terms", label: "Terms of service", description: "Terms governing use of Meridian.", changeFrequency: "yearly", priority: 0.2 },
  { path: "/legal/dpa", label: "Data processing addendum", description: "Data processing terms for customers subject to GDPR and similar regimes.", changeFrequency: "yearly", priority: 0.2 },
  { path: "/legal/subprocessors", label: "Subprocessors", description: "Current list of subprocessors that handle customer data.", changeFrequency: "monthly", priority: 0.2 },
];

/** Pages that exist but must carry noindex and stay out of the sitemap. */
export const noIndexPaths = ["/login", "/signup", "/design-system"] as const;

/** Prefixes disallowed in robots.txt. */
export const disallowPaths = ["/api/", "/design-system", "/login", "/signup"] as const;

export function isNoIndexPath(path: string): boolean {
  return noIndexPaths.some((p) => path === p || path.startsWith(`${p}/`));
}

export function getStaticRoute(path: string): StaticRoute | undefined {
  return staticRoutes.find((r) => r.path === path);
}

// Dynamic route builders, so every surface links the same way.
export const agentPath = (slug: string) => `/agents/${slug}`;
export const platformPath = (slug: string) => `/platform/${slug}`;
export const customerPath = (slug: string) => `/customers/${slug}`;
export const articlePath = (slug: string) => `/resources/${slug}`;
export const glossaryPath = (slug: string) => `/glossary/${slug}`;
