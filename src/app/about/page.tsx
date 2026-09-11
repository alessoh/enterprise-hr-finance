import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Avatar } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section, SectionHeader } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";

const TITLE = "Agents you can put in front of an auditor";
const DESCRIPTION =
  "Meridian Systems, Inc. builds narrow, governed AI agents for HR and finance. Our principles, how we build, the leadership team, and where we operate.";
const PATH = "/about";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "about Meridian",
    "Meridian Systems Inc",
    "governed AI agents company",
    "AI agents HR finance company",
  ],
});

const facts: Array<{ label: string; value: string }> = [
  { label: "Founded", value: "2026" },
  { label: "Legal entity", value: "Meridian Systems, Inc." },
  { label: "Offices", value: "New York, London, Dublin" },
  { label: "Data regions", value: "US-East, EU-West" },
];

const principles: Array<{ title: string; detail: string }> = [
  {
    title: "One workflow per agent",
    detail:
      "An agent scoped to a single job can be specified, evaluated, bounded, and rolled back. A general assistant can be none of those things.",
  },
  {
    title: "A named person approves",
    detail:
      "Every consequential action routes to an accountable human before it takes effect. The approver is a field in the record, not a setting an administrator can quietly clear.",
  },
  {
    title: "Nothing happens off the record",
    detail:
      "Inputs, model version, tool calls, approver, and outcome are written to the Registry and exported to your SIEM. If it is not in the log, it did not happen.",
  },
  {
    title: "Your data is not our training set",
    detail:
      "Customer data never trains a model, ours or a provider's. Retention for agent inputs and outputs is configurable down to zero days.",
  },
  {
    title: "Ship behind an evaluation",
    detail:
      "Each agent carries a test set drawn from real workflows. Releases are gated on it, and the scores move with the release notes in the changelog.",
  },
  {
    title: "Charge for work, not seats",
    detail:
      "Consumption pricing means we are paid when an agent finishes work you keep. A seat licence would pay us whether or not anything got done.",
  },
];

const howWeBuild: Array<{ title: string; detail: string }> = [
  {
    title: "Model-agnostic",
    detail:
      "The Gateway sits below the agent, so a workspace can enable, restrict, or replace providers without rewriting an agent. Bring your own model, or run only models we host in your region.",
  },
  {
    title: "Domain-tuned models",
    detail:
      "General models do not know what a retro pay adjustment is, or why a credit memo lands in the wrong period. We tune on HR and finance work, using licensed and synthetic data, never customer data.",
  },
  {
    title: "Human approval in the path",
    detail:
      "Approval is part of the workflow definition, not a notification bolted on afterwards. An agent that cannot find an approver stops and says so rather than proceeding.",
  },
  {
    title: "Evaluation gates",
    detail:
      "Every agent has a held-out test set, a regression suite, and a published accuracy threshold. A release that drops below the threshold does not roll out, regardless of the ship date.",
  },
];

const leadership: Array<{ name: string; role: string; remit: string }> = [
  {
    name: "Claire Okafor",
    role: "Chief Executive",
    remit: "Sets the company's scope, including which workflows Meridian will not take on.",
  },
  {
    name: "Tomas Lindqvist",
    role: "Head of AI Research",
    remit: "Owns the domain-tuned models and the evaluation sets that gate every agent release.",
  },
  {
    name: "Priya Raghunathan",
    role: "Chief Trust Officer",
    remit: "Owns security, privacy, and the audit evidence customers hand to their regulators.",
  },
];

const offices: Array<{ city: string; role: string; detail: string }> = [
  {
    city: "New York",
    role: "Headquarters",
    detail: "Commercial, trust, and applied research. Incorporated in Delaware.",
  },
  {
    city: "London",
    role: "Engineering",
    detail: "Registry, Gateway, and Data Fabric. UK and EMEA solutions engineering.",
  },
  {
    city: "Dublin",
    role: "EU operations",
    detail: "Customer engineering for the EU-West region and EU data protection.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: PATH },
          ]),
          webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: PATH }),
        ]}
      />

      {/* Hero */}
      <Section spacing="none" className="pt-8 pb-16 lg:pt-10 lg:pb-24" aria-labelledby="about-title">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          {/* The lede and the facts share row 2, so the table starts on the paragraph's
              first line at every width; -mt-2 drops its first label onto that baseline. */}
          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-7">
              <Eyebrow>Company</Eyebrow>
              <h1 id="about-title" className="text-h1 mt-5 text-balance">
                {TITLE}.
              </h1>
            </div>
            <p className="text-lede max-w-[54ch] text-pretty lg:col-span-7 lg:col-start-1 lg:row-start-2">
              Meridian Systems, Inc. builds narrow, governed AI agents for HR and finance operations. Each
              agent does one job, runs on your data under your security model, logs every action, and stops at
              a person for anything consequential.
            </p>
            {/* The metadata table from the customer-story page: hairlines top and bottom,
                a rule between rows, terms in the subtle column. */}
            <dl className="mt-4 divide-y divide-border border-y border-border lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:-mt-2">
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 py-3.5">
                  <dt className="text-[0.8125rem] text-fg-subtle">{fact.label}</dt>
                  <dd className="tabular text-sm text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Why Meridian */}
      <Section background="subtle" bordered="both" aria-labelledby="why-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-4">
              <Eyebrow>Why Meridian</Eyebrow>
              <h2 id="why-title" className="text-h2 mt-5 text-balance">
                Three bets, made in 2026.
              </h2>
            </div>
            <div className="max-w-[68ch] space-y-6 text-base leading-relaxed text-fg-muted lg:col-span-7 lg:col-start-6">
              <p>
                The first bet is narrow, governed agents. The market spent two years building assistants that
                could attempt anything and guarantee nothing. HR and finance cannot buy that. A payroll error
                is a regulatory event, and a misposted accrual is a restatement. So every Meridian agent is
                scoped to one workflow, with a written contract for what it reads, what it may do, and what it
                must hand to a person.
              </p>
              <p>
                The second bet is that the system of record matters more than the model. The{" "}
                <Link
                  href="/platform/registry"
                  className="text-accent underline-offset-4 hover:text-accent-hover hover:underline"
                >
                  Registry
                </Link>{" "}
                holds every agent, its version, its permissions, its approvers, its evaluation scores, and
                every run it has ever made. Models will keep changing. The record of what ran, on whose data,
                approved by whom, is what an auditor asks for, and it has to survive the model underneath it.
              </p>
              <p>
                The third bet is pricing. We charge for completed work in credits, not for seats. It costs a
                customer nothing to give a team access, and it costs us if an agent burns compute without
                producing something the customer keeps. That puts our incentive next to the outcome instead of
                next to headcount. The{" "}
                <Link
                  href="/pricing"
                  className="text-accent underline-offset-4 hover:text-accent-hover hover:underline"
                >
                  rates and the calculator
                </Link>{" "}
                are public.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Principles */}
      <Section aria-labelledby="principles-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-4">
              <Eyebrow>Principles</Eyebrow>
              <h2 id="principles-title" className="text-h2 mt-5 text-balance">
                Six rules we build against.
              </h2>
              <p className="text-lede mt-6 max-w-[46ch] text-pretty">
                They are enforced in the platform, below the agent, so no prompt and no builder can switch one
                off.
              </p>
              <ArrowLink href="/security" className="mt-8">
                How the rules are enforced
              </ArrowLink>
            </div>
            <ol className="border-t border-border lg:col-span-7 lg:col-start-6">
              {principles.map((principle, index) => (
                <li
                  key={principle.title}
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-4 border-b border-border py-6 lg:grid-cols-[3.5rem_minmax(0,1fr)]"
                >
                  <span className="tabular font-mono text-xs text-fg-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-h4 text-fg">{principle.title}</h3>
                    <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-fg-muted text-pretty">
                      {principle.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* How we build */}
      <Section background="subtle" bordered="both" aria-labelledby="build-title">
        <Container>
          <SectionHeader
            eyebrow="How we build"
            title="Four commitments in the architecture."
            lede="Not a roadmap. These are properties of the platform today, and the reasons an agent release can be blocked."
          />
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {howWeBuild.map((item) => (
              <div key={item.title} className="bg-bg-elevated p-6 lg:p-8">
                <h3 className="text-h5 text-fg">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted text-pretty">{item.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Leadership */}
      <Section aria-labelledby="leadership-title">
        <Container>
          <SectionHeader
            eyebrow="Leadership"
            title="Who owns what."
            lede="Three remits, written down. Meridian publishes the accountable owner for scope, for models, and for trust."
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {leadership.map((person) => (
              <Card as="li" key={person.name}>
                <div className="flex items-center gap-4">
                  <Avatar name={person.name} size="lg" tone="ink" />
                  <div className="min-w-0">
                    <p className="text-h5 text-fg">{person.name}</p>
                    <p className="mt-1 text-sm text-fg-muted">{person.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-fg-muted text-pretty">{person.remit}</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Offices */}
      <Section background="subtle" bordered="both" aria-labelledby="offices-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-4">
              <Eyebrow>Offices</Eyebrow>
              <h2 id="offices-title" className="text-h2 mt-5 text-balance">
                Three cities, two data regions.
              </h2>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-fg-muted text-pretty">
                Where we sit and where your data sits are separate questions. Production data is processed in
                the region you select at provisioning, US-East or EU-West, and it does not leave it. Office
                location does not change that.
              </p>
              <ArrowLink href="/legal/subprocessors" className="mt-8">
                Subprocessors and regions
              </ArrowLink>
            </div>
            <dl className="border-t border-border lg:col-span-7 lg:col-start-6">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="grid gap-2 border-b border-border py-6 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6"
                >
                  <dt>
                    <span className="block text-h5 text-fg">{office.city}</span>
                    <span className="mt-1 block text-[0.8125rem] text-fg-subtle">{office.role}</span>
                  </dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-fg-muted text-pretty">{office.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Press and contact */}
      <Section spacing="compact" aria-labelledby="press-title">
        <Container>
          <h2 id="press-title" className="eyebrow">
            Press and contact
          </h2>
          <dl className="mt-6 grid gap-x-16 gap-y-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-fg">Press</dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg-muted">
                Briefings, executive commentary, and the brand assets.{" "}
                <Link
                  href="/contact?intent=support"
                  className="text-accent underline-offset-4 hover:text-accent-hover hover:underline"
                >
                  Send a request
                </Link>
                .
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-fg">General</dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg-muted">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-accent underline-offset-4 hover:text-accent-hover hover:underline"
                >
                  {siteConfig.email}
                </a>
                . A person replies within one business day.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-fg">Security</dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg-muted">
                Report a vulnerability or request the SOC 2 report on the{" "}
                <Link
                  href="/security"
                  className="text-accent underline-offset-4 hover:text-accent-hover hover:underline"
                >
                  security page
                </Link>
                .
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-fg">Working here</dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg-muted">
                Six roles are open across the three offices.{" "}
                <Link
                  href="/careers"
                  className="text-accent underline-offset-4 hover:text-accent-hover hover:underline"
                >
                  See careers
                </Link>
                .
              </dd>
            </div>
          </dl>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="subtle" bordered="top" aria-labelledby="about-cta-title">
        <Container className="flex flex-col items-center text-center">
          <Eyebrow>Get started</Eyebrow>
          <h2 id="about-cta-title" className="text-h2 mt-4 max-w-2xl text-balance">
            See one workflow run end to end.
          </h2>
          <p className="text-lede mt-4 max-w-[52ch] text-pretty">
            A 45-minute session on your systems, including the approval step a person signs. You leave with a
            written plan and a credit estimate.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href={siteConfig.links.demo}>Book a demo</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" arrow>
              <Link href="/agents">See the agents</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
