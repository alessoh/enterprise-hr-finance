/**
 * Site configuration and navigation. Agent entries are derived from the canonical
 * content module so the nav can never drift from the catalog.
 *
 * Note for client components: importing this module pulls src/content/agents.ts
 * into the bundle. Site chrome (header, mobile nav) receives `mainNav` as props
 * from the server layout instead of importing it directly.
 */
import { agentCategories, agents } from "@/content/agents";
import type { Agent, AgentCategory } from "@/content/types";
import { getSiteUrl } from "@/lib/utils";

export type AgentStatus = "GA" | "Early access";
export type AgentCategoryKey = AgentCategory;

export interface NavLink {
  title: string;
  href: string;
  description?: string;
  status?: AgentStatus;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  href?: string;
  items: NavLink[];
}

export interface NavItem {
  title: string;
  href: string;
  /** Present for dropdown items. */
  groups?: NavGroup[];
  /** Mega: full-width panel. List: compact list under the trigger. */
  layout?: "mega" | "list";
  /** Footer links rendered under a mega panel. */
  footerLinks?: NavLink[];
}

export interface FooterColumn {
  title: string;
  items: NavLink[];
}

export const siteConfig = {
  name: "Meridian",
  legalName: "Meridian Systems, Inc.",
  tagline: "AI agents that run HR and finance.",
  description:
    "Meridian ships narrow, governed AI agents for HR and finance operations. Each agent is scoped to one workflow, runs on your data under your security model, logs every action, and keeps a human accountable for every consequential outcome.",
  url: getSiteUrl(),
  ogImage: "/opengraph-image",
  twitterHandle: "@meridian",
  email: "hello@meridian.example",
  foundedYear: 2026,
  links: {
    home: "/",
    agents: "/agents",
    platform: "/platform",
    security: "/security",
    pricing: "/pricing",
    customers: "/customers",
    resources: "/resources",
    glossary: "/glossary",
    changelog: "/changelog",
    status: "/status",
    dashboard: "/dashboard",
    about: "/about",
    careers: "/careers",
    contact: "/contact",
    demo: "/contact?intent=demo",
    login: "/login",
    signup: "/signup",
    privacy: "/legal/privacy",
    terms: "/legal/terms",
    dpa: "/legal/dpa",
    subprocessors: "/legal/subprocessors",
  },
} as const;

export const ctas = {
  signIn: { label: "Sign in", href: siteConfig.links.login },
  demo: { label: "Book a demo", href: siteConfig.links.demo },
  start: { label: "Start free", href: siteConfig.links.signup },
} as const;

export const agentStatusLabel: Record<Agent["status"], AgentStatus> = {
  ga: "GA",
  "early-access": "Early access",
};

/** Short nav one-liners (<= 48 chars). Falls back to the agent tagline. */
const navBlurbs: Partial<Record<string, string>> = {
  "help-desk": "Answers employee questions, resolves cases",
  recruiting: "Screens, shortlists, schedules interviews",
  payroll: "Catches errors before the payroll run",
  scheduling: "Fills open shifts with eligible staff",
  performance: "Drafts evidence-based reviews",
  "job-architecture": "Benchmarks roles and pay bands",
  audit: "Collects and packages audit evidence",
  planning: "Explains variances, explores plans",
  controls: "Tests transactions for duplicates and breaches",
  close: "Runs month-end close and sign-offs",
  "revenue-contracts": "Flags revenue risk, drafts the accounting",
  "contract-review": "Redlines third-party paper against your playbook",
};

/** Short category labels for compact surfaces (nav, footer). */
const categoryNavTitle: Record<AgentCategory, string> = {
  hr: "HR",
  finance: "Finance",
  legal: "Legal & Ops",
};

export function agentToNavLink(agent: Agent): NavLink {
  return {
    title: agent.name,
    href: `/agents/${agent.slug}`,
    description: navBlurbs[agent.slug] ?? agent.tagline,
    status: agentStatusLabel[agent.status],
  };
}

type AgentNavGroup = { title: string; href: string; items: NavLink[] };

/** Compact agent index for navigation, grouped by category in catalog order. */
export const agentNav: Record<AgentCategoryKey, AgentNavGroup> = Object.fromEntries(
  [...agentCategories]
    .sort((a, b) => a.order - b.order)
    .map((category) => [
      category.id,
      {
        title: categoryNavTitle[category.id],
        href: `/agents#${category.id}`,
        items: agents.filter((agent) => agent.category === category.id).map(agentToNavLink),
      },
    ]),
) as Record<AgentCategoryKey, AgentNavGroup>;

export const platformNav: NavLink[] = [
  { title: "Registry", href: "/platform/registry", description: "The system of record for every agent" },
  { title: "Gateway", href: "/platform/gateway", description: "Connect any agent over MCP and OpenTelemetry" },
  { title: "Data Fabric", href: "/platform/data-fabric", description: "Zero-copy access to your warehouse" },
  { title: "Studio", href: "/platform/studio", description: "Build governed agents on your data" },
  { title: "Assist", href: "/platform/assist", description: "The conversational front door" },
  { title: "Security", href: "/security", description: "SOC 2 Type II, ISO 27001, no training on your data" },
];

export const resourcesNav: NavLink[] = [
  { title: "Resources", href: "/resources", description: "Guides, benchmarks, and implementation notes" },
  { title: "Glossary", href: "/glossary", description: "Plain definitions of agent, HR, and finance terms" },
  { title: "Changelog", href: "/changelog", description: "What shipped, by week" },
  { title: "Status", href: "/status", description: "Uptime and incident history" },
  { title: "Live demo", href: "/dashboard", description: "Watch agents work on a sample company" },
];

export const mainNav: NavItem[] = [
  {
    title: "Product",
    href: "/agents",
    layout: "mega",
    groups: [
      { title: agentNav.hr.title, href: agentNav.hr.href, items: agentNav.hr.items },
      { title: agentNav.finance.title, href: agentNav.finance.href, items: agentNav.finance.items },
      { title: agentNav.legal.title, href: agentNav.legal.href, items: agentNav.legal.items },
      { title: "Platform", href: "/platform", items: platformNav },
    ],
    footerLinks: [
      { title: "See all agents", href: "/agents" },
      { title: "See it live", href: "/dashboard" },
    ],
  },
  { title: "Customers", href: "/customers" },
  { title: "Pricing", href: "/pricing" },
  {
    title: "Resources",
    href: "/resources",
    layout: "list",
    groups: [{ title: "Resources", items: resourcesNav }],
  },
];

export const footerNav: FooterColumn[] = [
  {
    title: "Product",
    items: [
      { title: "Agents", href: "/agents" },
      { title: "Platform", href: "/platform" },
      { title: "Security", href: "/security" },
      { title: "Pricing", href: "/pricing" },
      { title: "Live demo", href: "/dashboard" },
      { title: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Agents",
    items: agents.map((agent) => ({ title: agent.shortName, href: `/agents/${agent.slug}` })),
  },
  {
    title: "Platform",
    items: platformNav.map(({ title, href }) => ({ title, href })),
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Customers", href: "/customers" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
      { title: "Book a demo", href: siteConfig.links.demo },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Resources", href: "/resources" },
      { title: "Glossary", href: "/glossary" },
      { title: "Status", href: "/status" },
      { title: "Sign in", href: "/login" },
      { title: "Start free", href: "/signup" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Privacy", href: "/legal/privacy" },
      { title: "Terms", href: "/legal/terms" },
      { title: "DPA", href: "/legal/dpa" },
      { title: "Subprocessors", href: "/legal/subprocessors" },
    ],
  },
];

/** Micro-links in the footer's legal row. */
export const footerLegalLinks: NavLink[] = [
  { title: "Privacy", href: "/legal/privacy" },
  { title: "Terms", href: "/legal/terms" },
  { title: "DPA", href: "/legal/dpa" },
  { title: "Subprocessors", href: "/legal/subprocessors" },
];

/** Fictional design partners (BRIEF §3). Used for wordmarks, stories, and quotes. */
export const designPartners = [
  "Northwind Logistics",
  "Halvorsen Health",
  "Bluepeak Energy",
  "Castellan Financial",
  "Orion Retail Group",
  "Verdant Foods",
  "Atlas Manufacturing",
  "Summit Bank",
] as const;

export type DesignPartner = (typeof designPartners)[number];

export interface Announcement {
  /** Bump the id to re-show the bar to visitors who dismissed an older one. */
  id: string;
  text: string;
  cta: NavLink;
}

/** Site-wide announcement. Set to null to hide the bar. */
export const announcement: Announcement | null = {
  id: "2026-09-revenue-contracts",
  text: "Revenue Contract Agent is in early access.",
  cta: { title: "Read the changelog", href: "/changelog" },
};
