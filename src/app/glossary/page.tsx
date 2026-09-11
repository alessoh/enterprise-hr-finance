import type { Metadata } from "next";
import Link from "next/link";

import { LetterNav, letterId } from "@/components/resources/letter-nav";
import { ResourcesCta } from "@/components/resources/resources-cta";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { articles } from "@/content/articles";
import { glossaryTerms } from "@/content/glossary";
import type { GlossaryTerm } from "@/content/types";
import { breadcrumbJsonLd, glossaryJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { glossaryPath } from "@/lib/seo/routes";

const TITLE = "Glossary of agentic HR and finance terms";
const DESCRIPTION =
  "Plain definitions of the terms behind governed AI agents in HR and finance: agent system of record, MCP, human-in-the-loop, month-end close, SOC 2, and more.";

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/glossary",
  keywords: [
    "AI agent glossary",
    "agentic HR terms",
    "finance automation terms",
    "what is an agent system of record",
    "what is MCP",
  ],
});

function groupByLetter(terms: GlossaryTerm[]): Array<[string, GlossaryTerm[]]> {
  const groups = new Map<string, GlossaryTerm[]>();
  for (const term of terms) {
    const letter = term.term.charAt(0).toUpperCase();
    const bucket = groups.get(letter);
    if (bucket) bucket.push(term);
    else groups.set(letter, [term]);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export default function GlossaryPage() {
  const groups = groupByLetter(glossaryTerms);
  const available = new Set(groups.map(([letter]) => letter));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Glossary", path: "/glossary" },
          ]),
          webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/glossary" }),
          glossaryJsonLd(glossaryTerms),
        ]}
      />

      <Section spacing="none" className="pt-8 pb-12 lg:pt-10 lg:pb-16" aria-labelledby="glossary-title">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Glossary" }]} />
          <div className="mt-12 max-w-3xl lg:mt-16">
            <Eyebrow>Glossary</Eyebrow>
            <h1 id="glossary-title" className="text-h1 mt-5 text-balance">
              The HR and finance agent glossary
            </h1>
            <p className="text-lede mt-6 max-w-[62ch] text-pretty">
              The Meridian glossary is {glossaryTerms.length} plain definitions of the terms behind governed AI agents in
              HR and finance, from agent system of record to zero-copy data sharing. Each entry opens with one citable
              sentence, then explains the term, how it applies, and which agents use it.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              <ArrowLink href="/resources">{articles.length} long-form guides</ArrowLink>
              <ArrowLink href="/agents" tone="muted">
                The 12 agents
              </ArrowLink>
            </div>
          </div>
        </Container>
      </Section>

      <LetterNav available={available} />

      <Section spacing="none" className="pb-20 lg:pb-28" aria-label="Terms by letter">
        <Container>
          {groups.map(([letter, terms], groupIndex) => (
            <section
              key={letter}
              id={letterId(letter)}
              aria-labelledby={`${letterId(letter)}-title`}
              className={
                groupIndex === 0
                  ? "grid gap-4 scroll-mt-12 pt-10 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-10 lg:pt-14"
                  : "grid gap-4 scroll-mt-12 border-t border-border pt-10 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-10 lg:pt-14"
              }
            >
              <h2
                id={`${letterId(letter)}-title`}
                className="text-h2 tabular self-start text-fg lg:sticky lg:top-[9.5rem]"
              >
                {letter}
              </h2>
              <dl className="mb-10 divide-y divide-border lg:mb-14">
                {terms.map((term) => (
                  <div key={term.slug} className="grid gap-1.5 py-5 first:pt-0 md:grid-cols-[17rem_minmax(0,1fr)] md:gap-8">
                    <dt className="text-base font-medium leading-snug">
                      <Link
                        href={glossaryPath(term.slug)}
                        className="rounded-sm text-fg transition-colors duration-150 ease-standard hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ring"
                      >
                        {term.term}
                      </Link>
                    </dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-fg-muted">{term.shortDefinition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </Container>
      </Section>

      <ResourcesCta
        id="glossary-cta"
        title="See the terms in practice."
        lede="Every definition above is something a Meridian agent does, logs, or is measured by. Book a working session and watch one run on your data."
      />
    </>
  );
}
