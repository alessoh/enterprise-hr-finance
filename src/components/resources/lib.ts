import { articleCategories, articles } from "@/content/articles";
import type { Article } from "@/content/types";
import { slugify } from "@/lib/utils";

/** Newest first. The listing, prev/next, and backfills all read this order. */
export const articlesByDate: Article[] = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function readingLabel(minutes: number): string {
  return `${Math.max(1, Math.round(minutes))} min read`;
}

export function categorySlug(name: string): string {
  return slugify(name);
}

export function findCategory(param: string | undefined) {
  if (!param) return undefined;
  const needle = param.trim().toLowerCase();
  if (!needle) return undefined;
  return articleCategories.find((c) => c.name.toLowerCase() === needle || categorySlug(c.name) === needle);
}

/** Builds /resources?q=&category= without empty params. */
export function resourcesHref(params: { q?: string; category?: string }): string {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.category) search.set("category", params.category);
  const qs = search.toString();
  return qs ? `/resources?${qs}` : "/resources";
}

/** Every whitespace-separated token must appear in title, description, category, or keywords. */
export function matchesQuery(article: Article, query: string): boolean {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const haystack = [article.title, article.description, article.category, ...article.seo.keywords]
    .join(" ")
    .toLowerCase();
  return tokens.every((token) => haystack.includes(token));
}

export function countByCategory(list: Article[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const article of list) counts[article.category] = (counts[article.category] ?? 0) + 1;
  return counts;
}
