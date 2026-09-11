import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { openRoles, roleContactPath } from "@/components/company/roles";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section, SectionHeader } from "@/components/ui/section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";

const TITLE = "Build the agents enterprises trust";
const DESCRIPTION =
  "Six open roles at Meridian across New York, London, Dublin, and remote. How we work, what we pay for, and the four steps from application to offer.";
const PATH = "/careers";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ["Meridian careers", "AI agent jobs", "HR finance AI jobs", "applied research jobs"],
});

const values: Array<{ title: string; detail: string }> = [
  {
    title: "Write it down",
    detail:
      "Decisions live in documents, not in meetings. A proposal that cannot survive a page of prose is not ready to build.",
  },
  {
    title: "Numbers over adjectives",
    detail:
      "Claims carry a measurement. If an agent is better this week, the evaluation says by how much, on which set.",
  },
  {
    title: "Narrow scope, finished work",
    detail:
      "We would rather ship one workflow that holds up under audit than five that demo well and stall in review.",
  },
  {
    title: "Disagree in the document",
    detail:
      "Objections go on the proposal, with a name attached, before the decision. Silence in the review is taken as agreement.",
  },
  {
    title: "On call for what you build",
    detail:
      "Engineers carry the pager for their own services. One week in six, with the following week protected.",
  },
  {
    title: "Customer data is not a perk",
    detail:
      "Nobody touches production customer data without an approved, logged, time-boxed reason. That includes the founders.",
  },
];

const benefits: Array<{ title: string; detail: string }> = [
  {
    title: "Pay",
    detail:
      "Bands are benchmarked annually to the 75th percentile for the role and location, and published internally. No negotiation premium.",
  },
  {
    title: "Equity",
    detail: "Four-year vesting, one-year cliff, ten-year exercise window. Every offer includes it.",
  },
  {
    title: "Health",
    detail:
      "Medical, dental, and vision for you and your dependents, with premiums covered in full in the US and private cover in the UK and Ireland.",
  },
  {
    title: "Retirement",
    detail: "401(k) with a 4% match in the US. 6% employer pension contribution in the UK and Ireland.",
  },
  {
    title: "Time off",
    detail: "25 days plus public holidays, with a 10-day minimum the company actually tracks.",
  },
  {
    title: "Parental leave",
    detail: "18 weeks paid for every new parent, with a four-week phased return at full pay.",
  },
  {
    title: "Where you work",
    detail:
      "Three offices and remote across the US and EU. Two company-wide weeks onsite each year, travel covered.",
  },
  {
    title: "Learning",
    detail: "$3,000 a year for courses, books, and one conference, with no approval chain under that amount.",
  },
];

const hiring: Array<{ title: string; detail: string }> = [
  {
    title: "Application",
    detail:
      "A person reads every application within five business days. The contact form is the whole application; no account, no portal.",
  },
  {
    title: "Hiring manager",
    detail:
      "45 minutes on your work and the scope of the role, with the team's current backlog on screen. You get the compensation band here.",
  },
  {
    title: "Work sample",
    detail:
      "One 90-minute paid session on a real problem from the team, done together. No algorithm puzzles and no unpaid take-homes.",
  },
  {
    title: "Team and offer",
    detail:
      "Two 45-minute conversations with people you would work with, then a decision within three business days, with written feedback either way.",
  },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Careers", path: PATH },
          ]),
          webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: PATH }),
        ]}
      />

      {/* Hero */}
      <Section spacing="none" className="pt-8 pb-16 lg:pt-10 lg:pb-24" aria-labelledby="careers-title">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />
          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-7">
              <Eyebrow>Careers</Eyebrow>
              <h1 id="careers-title" className="text-h1 mt-5 text-balance">
                {TITLE}.
              </h1>
              <p className="text-lede mt-6 max-w-[54ch] text-pretty">
                Meridian builds narrow, governed agents for HR and finance. The work is specific: one workflow,
                one evaluation set, one person accountable for the outcome. Six roles are open.
              </p>
            </div>
            <div className="self-end lg:col-span-4 lg:col-start-9">
              <ArrowLink href="#open-roles" tone="fg" size="lg">
                Six open roles
              </ArrowLink>
              <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-fg-muted">
                New York, London, Dublin, and remote in the US and EU. Applications are read by a person within
                five business days.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Open roles */}
      <Section id="open-roles" background="subtle" bordered="both" aria-labelledby="roles-title">
        <Container>
          <SectionHeader
            eyebrow="Open roles"
            title="Six roles, three offices."
            lede="Each row opens the contact form with the role prefilled. Include a link to your work; a résumé is optional."
          />
          <Table wrapperClassName="bg-bg-elevated">
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {openRoles.map((role) => (
                <TableRow key={role.slug}>
                  <TableCell className="font-medium">
                    <Link
                      href={roleContactPath(role.slug)}
                      className="group/role inline-flex items-baseline gap-1.5 rounded-sm text-fg transition-colors duration-150 ease-standard hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                    >
                      <span className="text-pretty">{role.title}</span>
                      <ArrowRight
                        aria-hidden
                        className="size-3.5 shrink-0 self-center text-fg-subtle transition-transform duration-200 ease-out-quart group-hover/role:translate-x-0.5 group-hover/role:text-accent"
                      />
                    </Link>
                  </TableCell>
                  <TableCell className="text-fg-muted">{role.team}</TableCell>
                  <TableCell className="text-fg-muted">{role.location}</TableCell>
                  <TableCell className="text-fg-muted">{role.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Outside the table's scroll container, so the note never clips on mobile. */}
          <p className="mt-4 text-[0.8125rem] text-fg-subtle">
            Roles are removed the day they are filled. Nothing speculative is listed.
          </p>
          <p className="mt-6 text-sm text-fg-muted">
            Nothing here fits?{" "}
            <Link
              href="/contact?intent=support"
              className="text-accent underline-offset-4 hover:text-accent-hover hover:underline"
            >
              Write to us anyway
            </Link>{" "}
            and say which workflow you want to work on.
          </p>
        </Container>
      </Section>

      {/* Values */}
      <Section aria-labelledby="values-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-4">
              <Eyebrow>How we work</Eyebrow>
              <h2 id="values-title" className="text-h2 mt-5 text-balance">
                Six habits, not slogans.
              </h2>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-fg-muted text-pretty">
                These are the things a new hire notices in the first fortnight. If they sound like a
                constraint, they are.
              </p>
              <ArrowLink href="/about" className="mt-8">
                What the company is for
              </ArrowLink>
            </div>
            <ol className="border-t border-border lg:col-span-7 lg:col-start-6">
              {values.map((value, index) => (
                <li
                  key={value.title}
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-4 border-b border-border py-6 lg:grid-cols-[3.5rem_minmax(0,1fr)]"
                >
                  <span className="tabular font-mono text-xs text-fg-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-h4 text-fg">{value.title}</h3>
                    <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-fg-muted text-pretty">
                      {value.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section background="subtle" bordered="both" aria-labelledby="benefits-title">
        <Container>
          <SectionHeader
            eyebrow="Benefits"
            title="What the offer contains."
            lede="The same package in all three offices, adjusted only where local law or local cover requires it."
          />
          <dl className="grid gap-x-16 border-t border-border sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="border-b border-border py-6">
                <dt className="text-h5 text-fg">{benefit.title}</dt>
                <dd className="mt-2 max-w-[54ch] text-[0.9375rem] leading-relaxed text-fg-muted text-pretty">
                  {benefit.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Hiring process */}
      <Section aria-labelledby="hiring-title">
        <Container>
          <SectionHeader
            eyebrow="Hiring"
            title="Four steps, about two weeks."
            lede="Every step is scheduled against your availability, and we tell you the compensation band before the second conversation."
          />
          {/* A rule above each step, not four cards of text (DESIGN.md §4). */}
          <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {hiring.map((step, index) => (
              <li key={step.title} className="border-t border-border pt-5">
                <span className="tabular font-mono text-xs text-fg-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h5 mt-3 text-fg">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted text-pretty">{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-fg-muted">
            We do not ask for unpaid work, and we do not run panel interviews with people who have not read
            your application.
          </p>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="subtle" bordered="top" aria-labelledby="careers-cta-title">
        <Container className="flex flex-col items-center text-center">
          <Eyebrow>Apply</Eyebrow>
          <h2 id="careers-cta-title" className="text-h2 mt-4 max-w-2xl text-balance">
            Tell us which workflow you want.
          </h2>
          <p className="text-lede mt-4 max-w-[52ch] text-pretty">
            One form, one message, one reply from a person. Name the role and link to something you built.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact?intent=support">Apply for a role</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" arrow>
              <Link href="/about">About Meridian</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
