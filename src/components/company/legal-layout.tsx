import { ChevronDown } from "lucide-react";

import { Markdown } from "@/components/content/markdown";
import { buildToc } from "@/components/resources/build-toc";
import { ArticleToc } from "@/components/resources/toc";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";

import { legalUpdated, legalUpdatedIso, type LegalDocument } from "./legal-copy";

/**
 * Shared shell for the four /legal pages: narrow measure for the body, a sticky
 * table of contents from xl, and the same header, notice, and structured data
 * on every document.
 */
export function LegalLayout({ doc }: { doc: LegalDocument }) {
  const toc = buildToc(doc.body);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Legal", path: "/legal/terms" },
            { name: doc.title, path: doc.path },
          ]),
          webPageJsonLd({
            name: doc.title,
            description: doc.description,
            path: doc.path,
            dateModified: legalUpdatedIso,
          }),
        ]}
      />

      <Section spacing="none" className="pt-8 pb-24 lg:pt-10 lg:pb-32" aria-labelledby="legal-title">
        <Container size="wide">
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)] xl:gap-x-12 2xl:gap-x-16">
            <div aria-hidden className="hidden xl:block" />

            <article className="mx-auto w-full max-w-narrow min-w-0 xl:mx-0 xl:max-w-none">
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: doc.title }]} />

              <header className="mt-10 lg:mt-12">
                <Eyebrow>Legal</Eyebrow>
                <h1 id="legal-title" className="text-h1 mt-5 text-balance">
                  {doc.title}
                </h1>
                <p className="text-lede mt-6 text-pretty">{doc.lede}</p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-y border-border py-4 text-[0.8125rem]">
                  <p className="text-fg-muted">
                    Last updated: <time dateTime={legalUpdatedIso}>{legalUpdated}</time>
                  </p>
                  <p className="text-fg-subtle">Meridian Systems, Inc.</p>
                </div>
                <p className="mt-4 text-[0.8125rem] text-fg-subtle">Template for evaluation; not legal advice.</p>
              </header>

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
                <Markdown>{doc.body}</Markdown>
              </div>
            </article>

            <aside className="hidden xl:block">
              <div className="sticky top-28 pt-[7.25rem]">
                <ArticleToc items={toc} />
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
