import { articles } from "@/content/articles";
import { glossaryTerms } from "@/content/glossary";
import type { Article, GlossaryTerm } from "@/content/types";

const STOPWORDS = new Set([
  "the", "and", "for", "with", "that", "this", "from", "into", "what", "when", "how", "are",
  "agent", "agents", "meridian", "definition", "enterprise", "explained", "guide",
]);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length >= 4 && !STOPWORDS.has(word));
}

/** Term name without a trailing parenthetical, e.g. "HRIS (Human Resources Information System)" -> "HRIS". */
function bareTerm(term: GlossaryTerm): string {
  return term.term.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

/**
 * Articles most related to a glossary term, scored by keyword overlap between
 * the term (name + seo keywords) and the article (title, description, keywords).
 * Always returns `limit` items, backfilled with the newest articles.
 */
export function relatedArticlesForTerm(term: GlossaryTerm, limit = 2): Article[] {
  const phrases = [bareTerm(term), ...term.seo.keywords].map((p) => p.toLowerCase());
  const termTokens = new Set(tokens([term.term, ...term.seo.keywords].join(" ")));

  const scored = articles.map((article) => {
    const haystack = [article.title, article.description, ...article.seo.keywords].join(" ").toLowerCase();
    let score = 0;
    for (const phrase of phrases) if (haystack.includes(phrase)) score += 4;
    for (const token of new Set(tokens(haystack))) if (termTokens.has(token)) score += 1;
    if (term.relatedAgentSlugs?.some((slug) => article.relatedAgentSlugs.includes(slug))) score += 2;
    return { article, score };
  });

  scored.sort((a, b) => b.score - a.score || b.article.publishedAt.localeCompare(a.article.publishedAt));
  return scored.slice(0, limit).map((entry) => entry.article);
}

/** Glossary terms whose name appears in the article, ordered by first mention. */
export function glossaryTermsInArticle(article: Article, limit = 4): GlossaryTerm[] {
  const text = `${article.title}\n${article.body}`.toLowerCase();
  const found = glossaryTerms
    .map((term) => ({ term, index: text.indexOf(bareTerm(term).toLowerCase()) }))
    .filter((entry) => entry.index >= 0 && bareTerm(entry.term).length >= 4)
    .sort((a, b) => a.index - b.index);
  return found.slice(0, limit).map((entry) => entry.term);
}
