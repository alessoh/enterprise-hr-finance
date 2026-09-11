import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Markdown } from "@/components/content/markdown";
import { ArticleCard } from "@/components/resources/article-card";
import { RelatedAgents } from "@/components/resources/related-agents";
import { relatedArticlesForTerm } from "@/components/resources/related";
import { ResourcesCta } from "@/components/resources/resources-cta";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Callout } from "@/components/ui/callout";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section, SectionHeader } from "@/components/ui/section";
import { getGlossaryTerm, glossaryTerms } from "@/content/glossary";
import type { GlossaryTerm } from "@/content/types";
import { breadcrumbJsonLd, definedTermJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { glossaryPath } from "@/lib/seo/routes";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return glossaryTerms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return {};
  return createMetadata({
    title: term.seo.title,
    description: term.seo.description,
    path: glossaryPath(term.slug),
    keywords: term.seo.keywords,
  });
}

export default async function GlossaryTermPage({ params }: { params: Params }) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();

  const path = glossaryPath(term.slug);
  const related = term.relatedTerms
    .map((s) => getGlossaryTerm(s))
    .filter((t): t is GlossaryTerm => Boolean(t) && t?.slug !== term.slug);
  const readNext = relatedArticlesForTerm(term, 2);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Glossary", path: "/glossary" },
            { name: term.term, path },
          ]),
          definedTermJsonLd(term),
          webPageJsonLd({ name: term.term, description: term.shortDefinition, path }),
        ]}
      />

      <Section spacing="none" className="pt-8 pb-20 lg:pt-10 lg:pb-28" aria-labelledby="term-title">
        <Container size="narrow">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Glossary", href: "/glossary" }, { label: term.term }]} />
          <div className="mt-10 lg:mt-12">
            <Eyebrow>Glossary</Eyebrow>
            <h1 id="term-title" className="text-h1 mt-5 text-balance">
              {term.term}
            </h1>
          </div>

          <Callout
            as="section"
            icon={null}
            aria-labelledby="definition-title"
            title={
              <span id="definition-title" className="eyebrow">
                Definition
              </span>
            }
            className="mt-8 p-5 lg:p-6"
          >
            <p className="mt-2 text-[1.0625rem] leading-relaxed text-fg text-pretty">{term.shortDefinition}</p>
          </Callout>

          <div className="mt-10">
            <Markdown>{term.definition}</Markdown>
          </div>

          {related.length > 0 ? (
            <section aria-labelledby="related-terms-title" className="mt-14 border-t border-border pt-8">
              <h2 id="related-terms-title" className="eyebrow">
                Related terms
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {related.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={glossaryPath(t.slug)}
                      className="inline-flex h-8 items-center rounded-full border border-border bg-bg-elevated px-3.5 text-[0.8125rem] font-medium text-fg-muted transition-colors duration-150 ease-standard hover:border-border-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                    >
                      {t.term}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6">
                <ArrowLink href="/glossary" tone="muted" size="sm">
                  All {glossaryTerms.length} terms
                </ArrowLink>
              </p>
            </section>
          ) : null}
        </Container>
      </Section>

      <RelatedAgents
        slugs={term.relatedAgentSlugs ?? []}
        id="term-agents"
        title="Agents that use this"
        lede={`Meridian agents whose work depends on ${term.term.replace(/\s*\([^)]*\)\s*$/, "").toLowerCase()}. Each is scoped to one workflow and logs every action.`}
      />

      {readNext.length > 0 ? (
        <Section bordered="top" aria-labelledby="read-next-title">
          <Container>
            <SectionHeader
              eyebrow="Read next"
              title={<span id="read-next-title">Guides on this topic</span>}
              lede="Long-form explainers and frameworks that use this term, dated and signed."
              actions={<ArrowLink href="/resources">All guides</ArrowLink>}
            />
            <ul className="grid gap-6 md:grid-cols-2">
              {readNext.map((article) => (
                <li key={article.slug} className="min-w-0">
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <ResourcesCta id="term-cta" />
    </>
  );
}
