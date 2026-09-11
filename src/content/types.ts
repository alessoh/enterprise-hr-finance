/**
 * Meridian content contract.
 *
 * Every typed data module under src/content imports from this file, and so do the
 * page owners (agents, platform, pricing, customers, resources, live). Change a shape
 * here only with a note in your report; other agents compile against it.
 */

/** Per-entity SEO fields. title <= 60 chars, description 140-160 chars. */
export interface SeoFields {
  title: string;
  description: string;
  keywords: string[];
}

/**
 * A displayable metric. `value` is the preformatted string ("75%", "~900 hours").
 * `numeric`, `prefix`, and `suffix` are optional and enable animated count-ups:
 * render prefix + count + suffix while counting from 0 to `numeric`.
 */
export interface Metric {
  value: string;
  label: string;
  footnote?: string;
  numeric?: number;
  suffix?: string;
  prefix?: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface Faq {
  question: string;
  /** Markdown allowed. */
  answer: string;
}

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------

export type AgentCategory = "hr" | "finance" | "legal";
export type AgentStatus = "ga" | "early-access";

export interface AgentCategoryInfo {
  id: AgentCategory;
  name: string;
  description: string;
  order: number;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface CreditCost {
  action: string;
  credits: number;
}

export interface Agent {
  slug: string;
  name: string;
  shortName: string;
  category: AgentCategory;
  status: AgentStatus;
  /** <= 70 characters. */
  tagline: string;
  /** 1-2 sentences. */
  description: string;
  /** 2-3 paragraphs, markdown allowed. */
  longDescription: string;
  jobToBeDone: string;
  headlineMetric: Metric;
  /** 2-3 items. */
  supportingMetrics: Metric[];
  /** Exactly 4 steps. */
  howItWorks: HowItWorksStep[];
  dataSources: string[];
  /** What the agent can do. */
  actions: string[];
  /** Approval points, logging, scope limits. */
  guardrails: string[];
  /**
   * Generic categories or open standards. Named products are limited to the warehouses
   * and collaboration tools BRIEF section 3 allows; never competitor trademarks.
   */
  integrations: string[];
  creditCost: CreditCost[];
  /** 4-5 items, questions phrased the way buyers search. */
  faqs: Faq[];
  relatedAgentSlugs: string[];
  /** lucide-react icon name, e.g. "LifeBuoy". */
  icon: string;
  color: AgentCategory;
  seo: SeoFields;
}

// ---------------------------------------------------------------------------
// Platform
// ---------------------------------------------------------------------------

export interface PlatformFeature {
  title: string;
  description: string;
  /** lucide-react icon name. */
  icon: string;
}

export interface PlatformPillar {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  /** Markdown allowed. */
  longDescription: string;
  /** 4-6 items. */
  features: PlatformFeature[];
  proofPoints: string[];
  standards?: string[];
  faqs: Faq[];
  seo: SeoFields;
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export type PlanId = "starter" | "growth" | "enterprise";

export interface PlanLimits {
  agents: string;
  workspaces: string;
  support: string;
  sla?: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  /** USD per month on monthly billing. null for custom pricing. */
  priceMonthly: number | null;
  /** USD per month when billed annually. null for custom pricing. */
  priceAnnualMonthly: number | null;
  /** Included credits per month. null for custom pools. */
  credits: number | null;
  description: string;
  cta: Cta;
  features: string[];
  limits: PlanLimits;
  highlighted?: boolean;
}

export interface CreditRate {
  action: string;
  credits: number;
  agentSlug: string;
  unit: string;
}

// ---------------------------------------------------------------------------
// Social proof
// ---------------------------------------------------------------------------

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  agentSlugs?: string[];
  metric?: Metric;
}

export interface Customer {
  slug: string;
  name: string;
  industry: string;
  /** e.g. "12,000 employees" */
  size: string;
  region: string;
  /** Wordmark text for the logo wall. */
  logoText: string;
  summary: string;
  agentSlugs: string[];
  /** Exactly 3. */
  results: Metric[];
  quote?: Testimonial;
  seo: SeoFields;
}

export interface CaseStudyTimelinePhase {
  phase: string;
  /** e.g. "Weeks 1-2" */
  weeks: string;
  description: string;
}

export interface CaseStudyResults {
  /** Markdown. */
  summary: string;
  metrics: Metric[];
}

export interface CaseStudy {
  /** Same as the customer slug. */
  slug: string;
  customerSlug: string;
  title: string;
  subtitle: string;
  /** Markdown, 2-3 paragraphs. */
  challenge: string;
  /** Markdown. */
  approach: string;
  results: CaseStudyResults;
  quote: Testimonial;
  timeline: CaseStudyTimelinePhase[];
  /** ISO date. */
  publishedAt: string;
  seo: SeoFields;
}

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

export interface ArticleAuthor {
  name: string;
  role: string;
}

/** Exactly as specified in BRIEF section 6. Owned by the articles module. */
export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** ISO date. */
  publishedAt: string;
  /** ISO date. */
  updatedAt: string;
  readingMinutes: number;
  author: ArticleAuthor;
  keyTakeaways: string[];
  /** Markdown. */
  body: string;
  faqs: Faq[];
  relatedAgentSlugs: string[];
  seo: SeoFields;
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  /** <= 160 characters. One citable sentence. */
  shortDefinition: string;
  /** Markdown, 2-4 paragraphs. */
  definition: string;
  /** Glossary slugs. */
  relatedTerms: string[];
  relatedAgentSlugs?: string[];
  seo: SeoFields;
}

export type ChangelogCategory = "agent" | "platform" | "security" | "pricing" | "fix";

export interface ChangelogEntry {
  id: string;
  /** ISO date. */
  date: string;
  title: string;
  category: ChangelogCategory;
  summary: string;
  /** Markdown. */
  body: string;
  agentSlugs?: string[];
  isNew?: boolean;
}

// ---------------------------------------------------------------------------
// Home page copy
// ---------------------------------------------------------------------------

export interface HomeSection {
  eyebrow: string;
  title: string;
  lede: string;
  bullets?: string[];
}

export interface HomeHero {
  eyebrow: string;
  /** <= 8 words. */
  headline: string;
  /** <= 2 sentences. */
  subheadline: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  proofLine: string;
}

export interface HomeSections {
  agents: HomeSection;
  platform: HomeSection;
  live: HomeSection;
  howItWorks: HomeSection & { steps: HowItWorksStep[] };
  trust: HomeSection;
  outcomes: HomeSection;
  pricing: HomeSection;
  faq: HomeSection;
  cta: HomeSection;
}

export interface HomeCopy {
  hero: HomeHero;
  logoWallLabel: string;
  /** Exactly 4, with numeric fields set for count-ups. */
  proofStats: Metric[];
  sections: HomeSections;
  /** Disclosure for modeled outcomes; render wherever proof stats appear. */
  footnoteText: string;
  finalCta: {
    title: string;
    lede: string;
    primary: Cta;
    secondary: Cta;
  };
}
