import type { Article, WithContext } from "schema-dts";

import type { Agent, CaseStudy, Customer } from "@/content/types";
import { organizationId } from "@/lib/seo/jsonld";
import { agentPath, customerPath } from "@/lib/seo/routes";
import { absoluteUrl } from "@/lib/seo/url";

/**
 * Article node for one customer story, shaped like articleJsonLd but built from a
 * CaseStudy. The partner appears as `about` (an Organization mention) and the agents
 * used appear as `mentions` pointing at their Product nodes.
 */
export function caseStudyJsonLd(study: CaseStudy, customer: Customer, agents: Agent[]): WithContext<Article> {
  const path = customerPath(study.slug);
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: study.title,
    description: study.seo.description,
    url,
    mainEntityOfPage: url,
    image: [absoluteUrl(`${path}/opengraph-image`)],
    datePublished: study.publishedAt,
    dateModified: study.publishedAt,
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    articleSection: "Customer stories",
    keywords: study.seo.keywords.join(", "),
    inLanguage: "en-US",
    isAccessibleForFree: true,
    about: {
      "@type": "Organization",
      name: customer.name,
      description: `${customer.industry}, ${customer.size}, ${customer.region}.`,
    },
    mentions: agents.map((agent) => ({ "@id": `${absoluteUrl(agentPath(agent.slug))}#product` })),
  };
}
