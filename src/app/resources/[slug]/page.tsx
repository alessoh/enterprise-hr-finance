import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { Markdown } from "@/components/content/markdown";
import { ArticleFaq } from "@/components/resources/article-faq";
import { buildToc } from "@/components/resources/build-toc";
import { categorySlug, readingLabel, resourcesHref } from "@/components/resources/lib";
import { PrevNext } from "@/components/resources/prev-next";
import { RelatedAgents } from "@/components/resources/related-agents";
import { glossaryTermsInArticle } from "@/components/resources/related";
import { ResourcesCta } from "@/components/resources/resources-cta";
import { ArticleToc } from "@/components/resources/toc";
import { JsonLd } from "@/components/seo/JsonLd";
import { Avatar } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Callout } from "@/components/ui/callout";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { articles, getArticle } from "@/content/articles";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { articlePath, glossaryPath } from "@/lib/seo/routes";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return createMetadata({
    title: article.seo.title,
    description: article.seo.description,
    path: articlePath(article.slug),
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt || article.publishedAt,
    authors: [article.author.name],
    keywords: article.seo.keywords,
  });
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const toc = buildToc(article.body);
  const chronological = [...articles].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
  const index = chronological.findIndex((a) => a.slug === article.slug);
  const prev = index > 0 ? chronological[index - 1] : undefined;
  const next = index < chronological.length - 1 ? chronological[index + 1] : undefined;
  const terms = glossaryTermsInArticle(article, 4);
  const categoryHref = resourcesHref({ category: categorySlug(article.category) });
  const path = articlePath(article.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: article.title, path },
          ]),
          articleJsonLd(article),
          faqJsonLd(article.faqs),
        ]}
      />

      <Section spacing="none" className="pt-8 pb-20 lg:pt-10 lg:pb-28" aria-labelledby="article-title">
        <Container size="wide">
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)] xl:gap-x-12 2xl:gap-x-16">
            <div aria-hidden className="hidden xl:block" />

            <article className="mx-auto w-full min-w-0 max-w-narrow xl:mx-0 xl:max-w-none">
              <Breadcrumbs
                items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: article.title }]}
              />

              <header className="mt-10 lg:mt-12">
                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8125rem] text-fg-muted">
                  <Link
                    href={categoryHref}
                    className="eyebrow rounded-sm transition-colors duration-150 ease-standard hover:text-fg"
                  >
                    {article.category}
                  </Link>
                  <span aria-hidden className="text-fg-faint">
                    ·
                  </span>
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                  <span aria-hidden className="text-fg-faint">
                    ·
                  </span>
                  <span className="tabular">{readingLabel(article.readingMinutes)}</span>
                </p>
                <h1 id="article-title" className="text-h1 mt-5 text-balance">
                  {article.title}
                </h1>
                <p className="text-lede mt-6 text-pretty">{article.description}</p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-y border-border py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={article.author.name} size="md" tone="ink" />
                    <p className="text-sm leading-tight">
                      <span className="block font-medium text-fg">{article.author.name}</span>
                      <span className="mt-0.5 block text-fg-muted">{article.author.role}</span>
                    </p>
                  </div>
                  <p className="text-[0.8125rem] text-fg-subtle">
                    Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                  </p>
                </div>
              </header>

              <Callout as="aside" icon={null} aria-labelledby="takeaways-title" className="mt-10 p-6">
                <h2 id="takeaways-title" className="text-h6">
                  Key takeaways
                </h2>
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-[0.9375rem] leading-relaxed text-fg-muted marker:text-fg-subtle marker:tabular-nums">
                  {article.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="pl-1">
                      {takeaway}
                    </li>
                  ))}
                </ol>
              </Callout>

              {toc.length > 0 ? (
                <details className="group/toc mt-8 rounded-lg border border-border bg-bg-elevated xl:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium text-fg outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring">
                    On this page
                    <ChevronDown
                      aria-hidden
                      className="size-4 text-fg-subtle transition-transform duration-200 ease-out-quart group-open/toc:rotate-180"
                    />
                  </summary>
                  <ArticleToc items={toc} hideLabel className="border-t border-border px-4 py-3" />
                </details>
              ) : null}

              <div className="mt-10 lg:mt-12">
                <Markdown>{article.body}</Markdown>
              </div>

              {terms.length > 0 ? (
                <section aria-labelledby="terms-title" className="mt-14 border-t border-border pt-8">
                  <h2 id="terms-title" className="eyebrow">
                    Terms used in this guide
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {terms.map((term) => (
                      <li key={term.slug}>
                        <Link
                          href={glossaryPath(term.slug)}
                          className="inline-flex h-8 items-center rounded-full border border-border bg-bg-elevated px-3.5 text-[0.8125rem] font-medium text-fg-muted transition-colors duration-150 ease-standard hover:border-border-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                        >
                          {term.term}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {article.faqs.length > 0 ? (
                <section aria-labelledby="faq-title" className="mt-16 lg:mt-20">
                  <h2 id="faq-title" className="text-h3 text-balance">
                    Frequently asked questions
                  </h2>
                  <ArticleFaq faqs={article.faqs} className="mt-6" />
                </section>
              ) : null}
            </article>

            <aside className="hidden xl:block">
              <div className="sticky top-28 pt-[7.25rem]">
                <ArticleToc items={toc} />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <RelatedAgents
        slugs={article.relatedAgentSlugs}
        title="Agents in this guide"
        lede="The governed agents this guide draws on. Each is scoped to one workflow, logs every action, and routes consequential decisions to a person."
      />

      <PrevNext prev={prev} next={next} />

      <ResourcesCta />
    </>
  );
}
