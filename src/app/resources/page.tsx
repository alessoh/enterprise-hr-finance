import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard, FeaturedArticleCard } from "@/components/resources/article-card";
import { articlesByDate, categorySlug, countByCategory, findCategory, matchesQuery, resourcesHref } from "@/components/resources/lib";
import { ResourcesNewsletterForm } from "@/components/resources/newsletter-form";
import { ResourcesCta } from "@/components/resources/resources-cta";
import { ResourcesSearch } from "@/components/resources/resources-search";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Callout } from "@/components/ui/callout";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { articleCategories, articles } from "@/content/articles";
import { getGlossaryTerm, glossaryTerms } from "@/content/glossary";
import type { GlossaryTerm } from "@/content/types";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { articlePath, glossaryPath } from "@/lib/seo/routes";
import { cn } from "@/lib/utils";

const TITLE = "Resources: guides to governed AI agents";
const DESCRIPTION =
  "Explainers, governance frameworks, finance operations guides, and buying advice for teams deploying AI agents in HR and finance. Dated and kept current.";
const KEYWORDS = [
  "how to govern AI agents",
  "AI agent ROI",
  "agent system of record explained",
  "MCP for enterprise",
  "AI agents HR finance guides",
];

/** Six terms a buyer meets first, in reading order. */
const TEASER_TERM_SLUGS = [
  "agent-system-of-record",
  "governed-agent",
  "human-in-the-loop",
  "model-context-protocol",
  "month-end-close",
  "consumption-pricing",
];

type SearchParams = Promise<{ q?: string | string[]; category?: string | string[] }>;

function first(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw ?? "").trim().slice(0, 80);
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const filtered = Boolean(first(params.q) || findCategory(first(params.category)));
  return createMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: "/resources",
    keywords: KEYWORDS,
    // Search and category variants canonicalize to /resources and stay out of the index.
    noIndex: filtered,
  });
}

export default async function ResourcesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = first(params.q);
  const activeCategory = findCategory(first(params.category));
  const activeCategorySlug = activeCategory ? categorySlug(activeCategory.name) : undefined;

  let list = articlesByDate;
  if (activeCategory) list = list.filter((a) => a.category === activeCategory.name);
  if (query) list = list.filter((a) => matchesQuery(a, query));

  const isFiltered = Boolean(query || activeCategory);
  const [featured, ...rest] = articlesByDate;
  const counts = countByCategory(articlesByDate);
  const teaserTerms = TEASER_TERM_SLUGS.map((slug) => getGlossaryTerm(slug)).filter((t): t is GlossaryTerm => Boolean(t));

  const chips = [
    { label: "All guides", count: articlesByDate.length, href: resourcesHref({ q: query }), active: !activeCategory },
    ...articleCategories.map((c) => ({
      label: c.name,
      count: counts[c.name] ?? 0,
      href: resourcesHref({ q: query, category: categorySlug(c.name) }),
      active: activeCategory?.name === c.name,
    })),
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
          ]),
          webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/resources" }),
          itemListJsonLd(
            articlesByDate.map((a) => ({ name: a.title, path: articlePath(a.slug), description: a.description })),
            { name: "Meridian resources", description: "Guides to deploying governed AI agents in HR and finance." },
          ),
        ]}
      />

      {/* 1. Header, search, categories */}
      <Section spacing="none" className="pt-8 pb-12 lg:pt-10 lg:pb-16" aria-labelledby="resources-title">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
          <div className="mt-12 max-w-3xl lg:mt-16">
            <Eyebrow>Resources</Eyebrow>
            <h1 id="resources-title" className="text-h1 mt-5 text-balance">
              Guides for teams putting agents to work
            </h1>
            <p className="text-lede mt-6 max-w-[62ch] text-pretty">
              Meridian&rsquo;s resources are {articles.length} guides on governed AI agents for HR and finance:
              explainers, governance frameworks, finance operations, and buying advice. Every guide is signed, dated,
              and revised when the facts change.
            </p>
          </div>
          <ResourcesSearch query={query} category={activeCategorySlug} className="mt-10" />
          <nav aria-label="Categories" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <li key={chip.label}>
                  <Link
                    href={chip.href}
                    aria-current={chip.active ? "page" : undefined}
                    className={cn(
                      "inline-flex h-8 items-center gap-2 rounded-full border px-3.5 text-[0.8125rem] font-medium transition-colors duration-150 ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring",
                      chip.active
                        ? "border-fg bg-fg text-bg"
                        : "border-border bg-bg-elevated text-fg-muted hover:border-border-strong hover:text-fg",
                    )}
                  >
                    {chip.label}
                    <span className={cn("tabular text-xs", chip.active ? "text-bg/70" : "text-fg-subtle")}>{chip.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      {/* 2. Results, or featured + all guides */}
      <Section spacing="none" className="pb-24 lg:pb-32" aria-labelledby="guides-title">
        <Container>
          {isFiltered ? (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border pb-4">
                <h2 id="guides-title" role="status" className="text-sm text-fg-muted">
                  <span className="tabular font-medium text-fg">{list.length}</span> {list.length === 1 ? "result" : "results"}
                  {query ? (
                    <>
                      {" "}
                      for <q className="text-fg">{query}</q>
                    </>
                  ) : null}
                  {activeCategory ? (
                    <>
                      {" "}
                      in <span className="text-fg">{activeCategory.name}</span>
                    </>
                  ) : null}
                </h2>
                <Link
                  href="/resources"
                  className="rounded-sm text-sm font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline"
                >
                  Clear search
                </Link>
              </div>
              {list.length > 0 ? (
                <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((article, index) => {
                    const lastOrphanLg = index === list.length - 1 && list.length % 3 === 1;
                    const lastOrphanMd = index === list.length - 1 && list.length % 2 === 1;
                    return (
                      <li
                        key={article.slug}
                        className={cn("min-w-0", lastOrphanMd && "md:col-span-2", lastOrphanLg && "lg:col-span-3")}
                      >
                        <ArticleCard article={article} wide={lastOrphanLg} />
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="mt-8 max-w-xl">
                  <p className="text-base text-fg">
                    No guides match{query ? <> <q>{query}</q></> : " this filter"}.
                  </p>
                  <p className="mt-2 text-sm text-fg-muted">
                    Try a broader term such as &ldquo;approval&rdquo;, &ldquo;close&rdquo;, or &ldquo;credits&rdquo;, browse a
                    category above, or look the term up in the glossary.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    <ArrowLink href="/resources">All {articles.length} guides</ArrowLink>
                    <ArrowLink href="/glossary" tone="muted">
                      Glossary
                    </ArrowLink>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 id="guides-title" className="sr-only">
                All guides
              </h2>
              <FeaturedArticleCard article={featured} />
              <div className="mt-16 flex items-end justify-between gap-6 lg:mt-20">
                <div className="max-w-2xl">
                  <p className="eyebrow">Latest guides</p>
                  <p className="mt-3 text-base text-fg-muted">
                    Newest first. Each guide opens with a definition, states one claim per sentence, and ends with the
                    questions buyers ask.
                  </p>
                </div>
              </div>
              <RevealGroup className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((article, index) => {
                  const lastOrphanLg = index === rest.length - 1 && rest.length % 3 === 1;
                  const lastOrphanMd = index === rest.length - 1 && rest.length % 2 === 1;
                  return (
                    <RevealItem
                      key={article.slug}
                      className={cn("min-w-0", lastOrphanMd && "md:col-span-2", lastOrphanLg && "lg:col-span-3")}
                    >
                      <ArticleCard article={article} wide={lastOrphanLg} />
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </>
          )}
        </Container>
      </Section>

      {/* 3. Glossary teaser */}
      <Section background="subtle" bordered="both" aria-labelledby="glossary-teaser-title">
        <Container>
          <SectionHeader
            eyebrow="Glossary"
            title={<span id="glossary-teaser-title">Terms, defined in one sentence</span>}
            lede={`${glossaryTerms.length} plain definitions of the vocabulary behind governed agents in HR and finance. Each entry is one citable sentence, with the long version a click away.`}
            actions={<ArrowLink href="/glossary">All {glossaryTerms.length} terms</ArrowLink>}
          />
          <dl className="grid gap-x-12 md:grid-cols-2">
            {teaserTerms.map((term, index) => (
              <div
                key={term.slug}
                className={cn(
                  "border-t border-border py-5",
                  index === teaserTerms.length - 1 && "border-b",
                  index === teaserTerms.length - 2 && "md:border-b",
                )}
              >
                <dt className="text-base font-medium">
                  <ArrowLink href={glossaryPath(term.slug)} size="lg">
                    {term.term}
                  </ArrowLink>
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted">{term.shortDefinition}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 4. Newsletter */}
      <Section spacing="compact" aria-labelledby="newsletter-title">
        <Container>
          <Callout as="aside" icon={null} className="p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-12">
              <div>
                <h2 id="newsletter-title" className="text-h5">
                  New guides, once a month
                </h2>
                <p className="mt-2 max-w-[56ch] text-sm leading-relaxed">
                  Each new guide and glossary update by email, with the date and the author. No product pitches between
                  issues.
                </p>
              </div>
              <ResourcesNewsletterForm source="resources" />
            </div>
          </Callout>
        </Container>
      </Section>

      {/* 5. CTA */}
      <ResourcesCta />
    </>
  );
}
