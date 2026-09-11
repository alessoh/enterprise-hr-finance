import type {
  Article as SchemaArticle,
  BreadcrumbList,
  DefinedTerm,
  DefinedTermSet,
  FAQPage,
  HowTo,
  HowToStep,
  ItemList,
  ListItem,
  Offer,
  Organization,
  Product,
  SearchAction,
  SoftwareApplication,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";
import type { Agent, AgentCategory, Article, Faq, GlossaryTerm, Plan } from "@/content/types";
import { plans as defaultPlans } from "@/content/pricing";
import { organizationLegalName, tagline } from "./brand";
import { meridianDefinition, meridianShortDescription } from "./facts";
import { agentPath, articlePath, glossaryPath } from "./routes";
import { markdownToPlainText } from "./text";
import { absoluteUrl, siteName, siteUrl } from "./url";

const CONTEXT = "https://schema.org" as const;

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const softwareId = `${siteUrl}/#software`;
export const logoUrl = `${siteUrl}/brand/logo.svg`;

/** Placeholder profiles. Replace with real handles before launch. */
export const organizationSameAs = [
  "https://www.linkedin.com/company/meridian-systems-inc",
  "https://github.com/meridian-systems-inc",
];

const categoryLabel: Record<AgentCategory, string> = {
  hr: "HR",
  finance: "Finance",
  legal: "Legal and operations",
};

/** Inline Organization with @id, so publisher/manufacturer resolve even when parsed alone. */
function organizationRef(): Organization {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    url: `${siteUrl}/`,
    logo: { "@type": "ImageObject", url: logoUrl },
  };
}

// ---------------------------------------------------------------------------
// Site-wide
// ---------------------------------------------------------------------------

export function organizationJsonLd(): WithContext<Organization> {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    legalName: organizationLegalName,
    url: `${siteUrl}/`,
    logo: { "@type": "ImageObject", url: logoUrl },
    image: logoUrl,
    slogan: tagline,
    description: meridianDefinition,
    sameAs: organizationSameAs,
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", url: absoluteUrl("/contact"), availableLanguage: "en" },
      { "@type": "ContactPoint", contactType: "security", url: absoluteUrl("/security"), availableLanguage: "en" },
    ],
    knowsAbout: [
      "AI agents for HR",
      "AI agents for finance",
      "payroll compliance",
      "audit evidence automation",
      "financial close automation",
      "agent governance",
      "agent system of record",
    ],
    brand: { "@type": "Brand", name: siteName, logo: logoUrl },
  };
}

/** "query-input" is Google's sitelinks-searchbox extension; schema-dts does not type it. */
type SitelinksSearchAction = SearchAction & { "query-input": string };

export function websiteJsonLd(): WithContext<WebSite> {
  const searchAction: SitelinksSearchAction = {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/resources?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  };
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    url: `${siteUrl}/`,
    description: meridianShortDescription,
    inLanguage: "en-US",
    publisher: { "@id": organizationId },
    potentialAction: searchAction,
  };
}

// ---------------------------------------------------------------------------
// Product and pricing
// ---------------------------------------------------------------------------

function planOffers(plans: Plan[]): Offer[] {
  const offers: Offer[] = [];
  const pricingUrl = absoluteUrl("/pricing");
  for (const plan of plans) {
    if (plan.priceMonthly == null) continue;
    offers.push({
      "@type": "Offer",
      name: `${plan.name} (monthly billing)`,
      description: plan.description,
      url: pricingUrl,
      price: plan.priceMonthly,
      priceCurrency: "USD",
      category: "subscription",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.priceMonthly,
        priceCurrency: "USD",
        unitCode: "MON",
      },
    });
    if (plan.priceAnnualMonthly != null) {
      offers.push({
        "@type": "Offer",
        name: `${plan.name} (annual billing)`,
        description: plan.description,
        url: pricingUrl,
        price: plan.priceAnnualMonthly,
        priceCurrency: "USD",
        category: "subscription",
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: plan.priceAnnualMonthly,
          priceCurrency: "USD",
          unitCode: "MON",
          billingDuration: 12,
        },
      });
    }
  }
  return offers;
}

/** SoftwareApplication for Meridian as a whole. Use on / and /pricing. */
export function softwareApplicationJsonLd(plans: Plan[] = defaultPlans): WithContext<SoftwareApplication> {
  return {
    "@context": CONTEXT,
    "@type": "SoftwareApplication",
    "@id": softwareId,
    name: siteName,
    description: meridianDefinition,
    url: `${siteUrl}/`,
    image: absoluteUrl("/opengraph-image"),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "HR and finance operations",
    operatingSystem: "Web",
    featureList: ["Registry", "Gateway", "Data Fabric", "Studio", "Assist", "Trust"],
    offers: planOffers(plans),
    publisher: organizationRef(),
    provider: { "@id": organizationId },
    softwareHelp: { "@type": "CreativeWork", url: absoluteUrl("/resources") },
    isAccessibleForFree: false,
  };
}

/** Product node for one agent page. Offers derive from the priced plans. */
export function productJsonLd(agent: Agent, plans: Plan[] = defaultPlans): WithContext<Product> {
  const url = absoluteUrl(agentPath(agent.slug));
  const prices = plans
    .flatMap((p) => [p.priceMonthly, p.priceAnnualMonthly])
    .filter((v): v is number => typeof v === "number");
  const pricedPlans = plans.filter((p) => p.priceMonthly != null);
  return {
    "@context": CONTEXT,
    "@type": "Product",
    "@id": `${url}#product`,
    name: agent.name,
    description: agent.description,
    url,
    image: absoluteUrl(`${agentPath(agent.slug)}/opengraph-image`),
    additionalType: "https://schema.org/SoftwareApplication",
    category: `${categoryLabel[agent.category]} agent`,
    brand: { "@type": "Brand", name: siteName },
    manufacturer: { "@id": organizationId },
    audience: { "@type": "BusinessAudience", audienceType: "Enterprise HR and finance teams" },
    isRelatedTo: agent.relatedAgentSlugs.map((slug) => ({ "@id": `${absoluteUrl(agentPath(slug))}#product` })),
    ...(prices.length > 0
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: pricedPlans.length,
            url: absoluteUrl("/pricing"),
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

// ---------------------------------------------------------------------------
// Page-level
// ---------------------------------------------------------------------------

export function faqJsonLd(faqs: Faq[]): WithContext<FAQPage> {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: markdownToPlainText(faq.answer) },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(article: Article, options: { image?: string } = {}): WithContext<SchemaArticle> {
  const path = articlePath(article.slug);
  const url = absoluteUrl(path);
  return {
    "@context": CONTEXT,
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    image: [absoluteUrl(options.image ?? `${path}/opengraph-image`)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      worksFor: { "@id": organizationId },
    },
    publisher: organizationRef(),
    articleSection: article.category,
    keywords: article.seo.keywords.join(", "),
    inLanguage: "en-US",
    isAccessibleForFree: true,
    timeRequired: `PT${Math.max(1, Math.round(article.readingMinutes))}M`,
    about: article.relatedAgentSlugs.map((slug) => ({ "@id": `${absoluteUrl(agentPath(slug))}#product` })),
  };
}

export interface WebPageInput {
  name: string;
  description: string;
  path: string;
  /** ISO date. */
  dateModified?: string;
}

export function webPageJsonLd({ name, description, path, dateModified }: WebPageInput): WithContext<WebPage> {
  const url = absoluteUrl(path);
  return {
    "@context": CONTEXT,
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    ...(dateModified ? { dateModified } : {}),
  };
}

export interface HowToInput {
  name: string;
  description?: string;
  /** Structurally compatible with content HowItWorksStep. */
  steps: Array<{ title: string; description: string }>;
  /** Path of the page the steps live on; used for step anchors (#step-1 ...). */
  path?: string;
}

export function howToJsonLd({ name, description, steps, path }: HowToInput): WithContext<HowTo> {
  const step: HowToStep[] = steps.map((s, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: s.title,
    text: markdownToPlainText(s.description),
    ...(path ? { url: `${absoluteUrl(path)}#step-${index + 1}` } : {}),
  }));
  return {
    "@context": CONTEXT,
    "@type": "HowTo",
    name,
    ...(description ? { description } : {}),
    step,
  };
}

export interface ItemListEntry {
  name: string;
  path: string;
  description?: string;
}

export interface ItemListOptions {
  name?: string;
  description?: string;
}

export function itemListJsonLd(items: ItemListEntry[], options: ItemListOptions = {}): WithContext<ItemList> {
  const itemListElement: ListItem[] = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    url: absoluteUrl(item.path),
    ...(item.description ? { description: item.description } : {}),
  }));
  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    ...(options.name ? { name: options.name } : {}),
    ...(options.description ? { description: options.description } : {}),
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement,
  };
}

export const glossaryId = `${siteUrl}/glossary#termset`;

/** DefinedTermSet for the /glossary index. */
export function glossaryJsonLd(terms: GlossaryTerm[]): WithContext<DefinedTermSet> {
  return {
    "@context": CONTEXT,
    "@type": "DefinedTermSet",
    "@id": glossaryId,
    name: "Meridian glossary",
    description: "Definitions of terms used in agentic HR and finance operations.",
    url: absoluteUrl("/glossary"),
    hasDefinedTerm: terms.map((term) => ({
      "@type": "DefinedTerm",
      "@id": `${absoluteUrl(glossaryPath(term.slug))}#term`,
      name: term.term,
      description: term.shortDefinition,
      url: absoluteUrl(glossaryPath(term.slug)),
    })),
  };
}

/** DefinedTerm for one /glossary/[slug] page. */
export function definedTermJsonLd(term: GlossaryTerm): WithContext<DefinedTerm> {
  const url = absoluteUrl(glossaryPath(term.slug));
  return {
    "@context": CONTEXT,
    "@type": "DefinedTerm",
    "@id": `${url}#term`,
    name: term.term,
    description: term.shortDefinition,
    url,
    inDefinedTermSet: { "@id": glossaryId },
  };
}

/** Convenience for the /agents catalog page. */
export function agentCatalogJsonLd(agents: Agent[]): WithContext<ItemList> {
  return itemListJsonLd(
    agents.map((agent) => ({ name: agent.name, path: agentPath(agent.slug), description: agent.tagline })),
    { name: "Meridian agents", description: "Governed AI agents for HR, finance, and legal operations." },
  );
}
