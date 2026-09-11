import type { MetadataRoute } from "next";
import { agents } from "@/content/agents";
import { articles } from "@/content/articles";
import { changelog } from "@/content/changelog";
import { caseStudies, customers } from "@/content/customers";
import { glossaryTerms } from "@/content/glossary";
import { platformPillars } from "@/content/platform";
import {
  agentPath,
  articlePath,
  customerPath,
  glossaryPath,
  platformPath,
  staticRoutes,
} from "@/lib/seo/routes";
import { absoluteUrl } from "@/lib/seo/url";

type Entry = MetadataRoute.Sitemap[number];

function toDate(iso: string | undefined): Date | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function latest(dates: Array<string | undefined>): Date | undefined {
  let max: Date | undefined;
  for (const iso of dates) {
    const d = toDate(iso);
    if (d && (!max || d > max)) max = d;
  }
  return max;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestArticle = latest(articles.map((a) => a.updatedAt || a.publishedAt));
  const latestChangelog = latest(changelog.map((e) => e.date));
  const latestCaseStudy = latest(caseStudies.map((cs) => cs.publishedAt));

  const sectionLastModified: Record<string, Date | undefined> = {
    "/resources": latestArticle,
    "/changelog": latestChangelog,
    "/customers": latestCaseStudy,
  };

  const entries = new Map<string, Entry>();
  const add = (path: string, entry: Omit<Entry, "url">) => {
    const url = absoluteUrl(path);
    if (!entries.has(url)) entries.set(url, { url, ...entry });
  };

  for (const route of staticRoutes) {
    const lastModified = sectionLastModified[route.path];
    add(route.path, {
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(lastModified ? { lastModified } : {}),
    });
  }

  for (const pillar of platformPillars) {
    if (pillar.slug === "trust") continue; // Trust lives at /security, already registered.
    add(platformPath(pillar.slug), { changeFrequency: "monthly", priority: 0.8 });
  }

  for (const agent of agents) {
    add(agentPath(agent.slug), { changeFrequency: "weekly", priority: 0.8 });
  }

  for (const article of articles) {
    const lastModified = toDate(article.updatedAt || article.publishedAt);
    add(articlePath(article.slug), {
      changeFrequency: "monthly",
      priority: 0.7,
      ...(lastModified ? { lastModified } : {}),
    });
  }

  for (const customer of customers) {
    const study = caseStudies.find((cs) => cs.slug === customer.slug || cs.customerSlug === customer.slug);
    const lastModified = toDate(study?.publishedAt);
    add(customerPath(customer.slug), {
      changeFrequency: "monthly",
      priority: 0.6,
      ...(lastModified ? { lastModified } : {}),
    });
  }

  for (const term of glossaryTerms) {
    add(glossaryPath(term.slug), { changeFrequency: "yearly", priority: 0.5 });
  }

  return Array.from(entries.values());
}
