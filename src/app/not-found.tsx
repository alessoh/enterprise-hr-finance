import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/seo/metadata";

const base = createMetadata({
  title: "Page not found",
  description:
    "The page you requested is not on the Meridian site. Search the resources library or return to the home page, agents catalog, pricing, or contact form.",
  path: "/404",
  noIndex: true,
});

/** No canonical or social URL for an error page; keep the title, description, and noindex. */
export const metadata: Metadata = { ...base, alternates: undefined, openGraph: undefined, twitter: undefined };

const links = [
  { label: "Home", href: "/", description: "AI agents that run HR and finance." },
  { label: "Agents", href: "/agents", description: "Twelve governed agents, nine generally available." },
  { label: "Pricing", href: "/pricing", description: "Plans, credit rates, and the calculator." },
  { label: "Contact", href: "/contact?intent=demo", description: "Book a demo or reach a person." },
];

export default function NotFound() {
  return (
    <Section spacing="none" className="pt-20 pb-24 lg:pt-28 lg:pb-32" aria-labelledby="not-found-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-6">
            <Eyebrow>404</Eyebrow>
            <h1 id="not-found-title" className="text-h1 mt-5 text-balance">
              This page is off the chart.
            </h1>
            <p className="text-lede mt-6 max-w-[48ch] text-pretty">
              The address is not on the Meridian site. It may have moved, or the link may be out of date. Search
              the resources library or start from one of the pages below.
            </p>

            <form action="/resources" method="get" role="search" className="mt-8 max-w-md">
              <Label htmlFor="not-found-search">Search resources</Label>
              <div className="mt-1.5 flex gap-2">
                <div className="relative flex-1">
                  <Search
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle"
                  />
                  <Input
                    id="not-found-search"
                    type="search"
                    name="q"
                    placeholder="Month-end close, payroll compliance, MCP"
                    autoComplete="off"
                    className="pl-9"
                  />
                </div>
                <Button type="submit" variant="secondary">
                  Search
                </Button>
              </div>
            </form>
          </div>

          <nav aria-label="Suggested pages" className="lg:col-span-5 lg:col-start-8">
            <ul className="divide-y divide-border border-y border-border">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-6 py-4 transition-colors duration-150 ease-standard hover:text-fg"
                  >
                    <span className="min-w-0">
                      <span className="block text-base font-medium text-fg">{link.label}</span>
                      <span className="mt-0.5 block text-sm text-fg-muted">{link.description}</span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="size-4 shrink-0 text-fg-subtle transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5 group-hover:text-fg"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.8125rem] text-fg-subtle">
              Looking for service status?{" "}
              <Link href="/status" className="text-accent underline-offset-4 hover:text-accent-hover hover:underline">
                Check the status page
              </Link>
              .
            </p>
          </nav>
        </div>
      </Container>
    </Section>
  );
}
