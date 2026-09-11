import Link from "next/link";

import { Markdown } from "@/components/content/markdown";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { changelog } from "@/content/changelog";
import { getAgent } from "@/content/agents";
import type { ChangelogEntry } from "@/content/types";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

const TITLE = "Changelog";
const DESCRIPTION =
  "What shipped in Meridian: new and updated agents, platform releases, security changes, and pricing updates, newest first.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/changelog",
});

const CATEGORY_LABEL: Record<ChangelogEntry["category"], string> = {
  agent: "Agent",
  platform: "Platform",
  security: "Security",
  pricing: "Pricing",
  fix: "Fix",
};

function monthKey(date: string): string {
  return date.slice(0, 7);
}

function monthLabel(key: string): string {
  return new Date(`${key}-01T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * CSS-only selected state for the month rail. `:has()` paints the anchor whose
 * month section is targeted; with nothing targeted the newest month is current.
 * No client JS, and without `:has()` support hover and focus still read.
 */
function activeMonthCss(months: readonly string[]): string {
  const [newest] = months;
  if (!newest) return "";
  const selectors = months
    .map((key) => `html:has([id="${key}"]:target) [data-month="${key}"]`)
    .concat(`html:not(:has(:target)) [data-month="${newest}"]`)
    .join(",");
  return `${selectors}{background-color:var(--color-bg-muted);color:var(--color-fg);box-shadow:inset 2px 0 0 var(--color-fg);}`;
}

export default function ChangelogPage() {
  const months = Array.from(new Set(changelog.map((entry) => monthKey(entry.date))));

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/changelog" }),
          breadcrumbJsonLd([
            { name: "Meridian", path: "/" },
            { name: "Changelog", path: "/changelog" },
          ]),
          itemListJsonLd(
            changelog.map((entry) => ({ name: entry.title, path: `/changelog#${entry.id}` })),
            { name: "Meridian changelog" },
          ),
        ]}
      />

      <div className="border-b border-border bg-bg-subtle">
        <Container>
          <div className="py-12 lg:py-16">
            <Eyebrow>Changelog</Eyebrow>
            <h1 className="text-h1 mt-4">What shipped</h1>
            <p className="text-lede mt-4 max-w-[60ch]">
              Every agent release, platform change, and security update, newest first.
            </p>
            {/* Its own action, not a link wrapping mid-phrase inside the lede. */}
            <p className="mt-5">
              <Link
                href="/feed.xml"
                className="inline-flex items-center gap-1.5 text-[0.9375rem] whitespace-nowrap text-accent underline decoration-accent/35 underline-offset-4 transition-colors duration-150 hover:text-accent-hover hover:decoration-current"
              >
                Subscribe by RSS
              </Link>
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <style dangerouslySetInnerHTML={{ __html: activeMonthCss(months) }} />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] lg:gap-x-10 xl:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]">
            <nav aria-label="Jump to month" className="hidden lg:block">
              <div className="sticky top-24">
                <p className="eyebrow border-b border-border pb-3">Months</p>
                <ul className="mt-3">
                  {months.map((key) => (
                    <li key={key}>
                      <a
                        href={`#${key}`}
                        data-month={key}
                        className="block rounded-r-md py-1.5 pr-2 pl-2.5 text-[13px] font-medium text-fg-muted transition-colors duration-150 ease-standard hover:bg-bg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                      >
                        {monthLabel(key)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="min-w-0 lg:border-l lg:border-border lg:pl-10 xl:pl-12">
              {months.map((key) => (
                <section key={key} id={key} className="scroll-mt-24 not-first:mt-16">
                  <h2 className="eyebrow max-w-[38rem] border-b border-border pb-3 xl:max-w-[47.5rem]">
                    {monthLabel(key)}
                  </h2>
                  <ol className="mt-8 space-y-12">
                    {changelog
                      .filter((entry) => monthKey(entry.date) === key)
                      .map((entry) => (
                        <li
                          key={entry.id}
                          id={entry.id}
                          className="scroll-mt-24 xl:grid xl:grid-cols-[7.5rem_minmax(0,1fr)] xl:gap-x-8"
                        >
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 xl:flex-col xl:items-start xl:gap-y-2.5 xl:pt-1">
                            <time dateTime={entry.date} className="tabular text-[13px] text-fg-subtle">
                              {formatDate(entry.date, "medium")}
                            </time>
                            <Badge variant={entry.category === "security" ? "accent" : "neutral"}>
                              {CATEGORY_LABEL[entry.category]}
                            </Badge>
                            {entry.isNew ? <Badge variant="success">New</Badge> : null}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-h4 mt-3 max-w-[32rem] text-balance xl:mt-0">
                              <a href={`#${entry.id}`} className="hover:text-accent">
                                {entry.title}
                              </a>
                            </h3>
                            <p className="mt-3 max-w-[38rem] text-base leading-[1.6] text-fg-muted">
                              {entry.summary}
                            </p>
                            <Markdown variant="compact" className="mt-4 max-w-[38rem]">
                              {entry.body}
                            </Markdown>
                            {entry.agentSlugs && entry.agentSlugs.length > 0 ? (
                              <ul className="mt-5 flex flex-wrap gap-2">
                                {entry.agentSlugs.map((slug) => {
                                  const agent = getAgent(slug);
                                  if (!agent) return null;
                                  return (
                                    <li key={slug}>
                                      <Link
                                        href={`/agents/${slug}`}
                                        className="inline-block rounded-full border border-border px-2.5 py-0.5 text-[12px] text-fg-muted transition-colors duration-150 hover:border-border-strong hover:text-fg"
                                      >
                                        {agent.shortName}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : null}
                          </div>
                        </li>
                      ))}
                  </ol>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
