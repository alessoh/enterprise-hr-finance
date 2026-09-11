import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
          {groups.map(([letter, terms]) => (
            <section
              key={letter}
              id={letterId(letter)}
              aria-labelledby={`${letterId(letter)}-title`}
              className="scroll-mt-20 pt-12 lg:pt-16"
            >
              <div className="flex items-baseline justify-between gap-6 border-b border-border-strong pb-3">
                <h2 id={`${letterId(letter)}-title`} className="text-h3 text-fg">
                  {letter}
                </h2>
                <p className="eyebrow tabular text-fg-subtle">
                  {terms.length} {terms.length === 1 ? "term" : "terms"}
                </p>
              </div>
              <dl className="divide-y divide-border">
                {terms.map((term) => (
                  <div
                    key={term.slug}
                    className="group/term grid gap-1.5 py-6 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-10"
                  >
                    <dt className="text-h5 font-semibold">
                      <Link
                        href={glossaryPath(term.slug)}
                        className="rounded-sm text-fg transition-colors duration-150 ease-standard hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ring"
                      >
                        {term.term}
                      </Link>
                    </dt>
                    <dd className="flex items-start justify-between gap-10 text-[0.9375rem] leading-[1.65] text-fg-muted">
                      <span className="max-w-[32em]">{term.shortDefinition}</span>
                      <ArrowRight
                        aria-hidden
                        className="mt-1 hidden size-4 shrink-0 text-fg-faint transition-[transform,color] duration-200 ease-out-quart group-hover/term:translate-x-0.5 group-hover/term:text-fg lg:block"
                      />
                    </dd>
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
