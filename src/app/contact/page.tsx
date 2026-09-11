import type { Metadata } from "next";
import Link from "next/link";

import { contactFaqs, intentCopy } from "@/components/company/contact-copy";
import { ContactForm } from "@/components/company/contact-form";
import { intentLabels, isContactIntent, type ContactIntent } from "@/components/company/contact-schema";
import { getRole } from "@/components/company/roles";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";

const DESCRIPTION =
  "Book a demo, talk to sales, get support, or partner with Meridian. A person replies within one business day; demos are 45-minute sessions on your data.";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function resolveIntent(value: string | undefined): ContactIntent {
  return isContactIntent(value) ? value : "demo";
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const intent = resolveIntent(first(params.intent));
  return createMetadata({
    title: intentLabels[intent],
    description: DESCRIPTION,
    path: "/contact",
    keywords: ["Meridian demo", "contact Meridian", "AI agents HR finance demo", "Meridian sales"],
  });
}

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const intent = resolveIntent(first(params.intent));
  const role = getRole(first(params.role));
  const copy = intentCopy[intent];

  const initialMessage = role
    ? `I would like to apply for the ${role.title} role (${role.team}, ${role.location}).\n\n`
    : "";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          webPageJsonLd({ name: intentLabels[intent], description: DESCRIPTION, path: "/contact" }),
          faqJsonLd(contactFaqs),
        ]}
      />

      <Section spacing="none" className="pt-8 pb-24 lg:pt-10 lg:pb-32" aria-labelledby="contact-title">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16">
            {/* Intro */}
            <div className="lg:col-span-5">
              <Eyebrow>Contact</Eyebrow>
              <h1 id="contact-title" className="text-h1 mt-5 text-balance">
                {intentLabels[intent]}
              </h1>
              <p className="text-lede mt-6 max-w-[52ch] text-pretty">{copy.lede}</p>
              {role ? (
                <p className="mt-6 text-sm text-fg-muted">
                  Applying for <span className="font-medium text-fg">{role.title}</span>. The role is prefilled in
                  the message.
                </p>
              ) : null}
            </div>

            {/* Form: spans both rows on desktop and stays in view while the details scroll. */}
            <div className="lg:sticky lg:top-24 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-start">
              <ContactForm key={intent} intent={intent} initialMessage={initialMessage} contactEmail={siteConfig.email} />
            </div>

            {/* Details */}
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
              <section aria-labelledby="expect-title" className="border-t border-border pt-8">
                <h2 id="expect-title" className="text-h6 text-fg">
                  What to expect
                </h2>
                <ol className="mt-5 space-y-4">
                  {copy.expect.map((item, index) => (
                    <li key={item} className="flex gap-4 text-[0.9375rem] leading-relaxed text-fg-muted">
                      <span className="tabular mt-px w-5 shrink-0 text-[0.8125rem] font-medium text-fg-subtle">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="asked-title" className="mt-10 border-t border-border pt-8">
                <h2 id="asked-title" className="text-h6 text-fg">
                  What people ask us
                </h2>
                <dl className="mt-5 divide-y divide-border">
                  {contactFaqs.map((faq) => (
                    <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
                      <dt className="text-sm font-medium text-fg">{faq.question}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted text-pretty">{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section aria-labelledby="direct-title" className="mt-10 border-t border-border pt-8">
                <h2 id="direct-title" className="text-h6 text-fg">
                  Other ways to reach us
                </h2>
                <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
                  <dt className="text-fg-muted">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-accent underline-offset-4 hover:text-accent-hover hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </dd>
                  <dt className="text-fg-muted">Security</dt>
                  <dd className="text-fg">
                    Report a vulnerability or request the SOC 2 report on the{" "}
                    <Link href="/security" className="text-accent underline-offset-4 hover:text-accent-hover hover:underline">
                      security page
                    </Link>
                    .
                  </dd>
                  <dt className="text-fg-muted">Status</dt>
                  <dd className="text-fg">
                    <Link href="/status" className="text-accent underline-offset-4 hover:text-accent-hover hover:underline">
                      Live service status
                    </Link>{" "}
                    and incident history.
                  </dd>
                  <dt className="text-fg-muted">Offices</dt>
                  <dd className="text-fg">New York, London, Dublin</dd>
                </dl>
                <div className="mt-6">
                  <ArrowLink href="/about" tone="muted" size="sm">
                    About Meridian
                  </ArrowLink>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
