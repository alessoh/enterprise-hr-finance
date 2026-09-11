import type { Metadata } from "next";
import Link from "next/link";

import { ComparisonTable } from "@/components/pricing/comparison-table";
import { CreditRatesTable } from "@/components/pricing/credit-rates-table";
import { CreditsCalculator } from "@/components/pricing/credits-calculator";
import { PlanGrid } from "@/components/pricing/plan-grid";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Footnotes } from "@/components/ui/footnote";
import { Section, SectionHeader } from "@/components/ui/section";
import { modeledOutcomeFootnote } from "@/content/agents";
import { overagePerCredit, plans, pricingFaqs } from "@/content/pricing";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { formatCurrency, formatNumber } from "@/lib/utils";

const PATH = "/pricing";
const TITLE = "Pricing for governed AI agents";
const DESCRIPTION =
  "Meridian bills for completed work, not seats. Starter is $499 a month for 5,000 credits, Growth $2,499 for 30,000, Enterprise custom. Overage is $0.12 a credit.";

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "AI agent pricing",
    "HR AI pricing",
    "finance AI pricing",
    "consumption pricing AI agents",
    "AI agent credits",
    "enterprise AI agent plans",
  ],
});

const SALES_HREF = "/contact?intent=sales";

const starter = plans.find((plan) => plan.id === "starter");
const growth = plans.find((plan) => plan.id === "growth");

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: PATH },
          ]),
          webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: PATH }),
          softwareApplicationJsonLd(plans),
          faqJsonLd(pricingFaqs),
        ]}
      />

      {/* 1 + 2. Header, billing toggle, plan cards */}
      <Section spacing="none" className="pt-14 pb-24 lg:pt-20 lg:pb-32" aria-labelledby="pricing-title">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h1 id="pricing-title" className="text-h1 mt-5 text-balance">
              Pay for work done, not seats.
            </h1>
            <p className="text-lede mt-6 max-w-[58ch] text-pretty">
              Every plan includes a monthly pool of credits, and agents spend them only when they finish a unit
              of work: a case resolved, a candidate screened, a contract redlined.
            </p>
          </div>
          <div className="mt-10 lg:mt-12">
            <PlanGrid plans={plans} />
          </div>
        </Container>
      </Section>

      {/* 3. What a credit buys */}
      <Section background="subtle" bordered="both" aria-labelledby="credits-title">
        <Container>
          <SectionHeader
            eyebrow="Credits"
            title={<span id="credits-title">What a credit buys</span>}
            lede={
              <>
                One rate card, the same on every plan. A credit is charged when an agent completes the action,
                never for a message or a model call.
              </>
            }
            actions={<ArrowLink href="/agents">See the agents behind each action</ArrowLink>}
          />
          <CreditRatesTable />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-10">
            <div className="border-t border-border pt-5">
              <h3 className="text-h6">Beyond the allowance</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                Agents keep running and extra credits bill at{" "}
                {formatCurrency(overagePerCredit, { cents: true })} each on the next invoice. Alerts fire at 80%
                and 100% of the allowance, and any workspace can be given a hard ceiling instead.
              </p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="text-h6">Pooling</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                Credits pool across every agent and every person in a workspace; Enterprise pools span all
                workspaces, attributed by workspace, agent, and cost center in the Registry.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Calculator */}
      <Section aria-labelledby="calculator-title">
        <Container>
          <SectionHeader
            eyebrow="Estimate"
            title={<span id="calculator-title">Size your credit pool</span>}
            lede={
              <>
                Enter your monthly volumes. The estimate uses the same rate card above
                {starter?.credits && growth?.credits
                  ? `, against allowances of ${formatNumber(starter.credits)} and ${formatNumber(growth.credits)} credits.`
                  : "."}
              </>
            }
          />
          <CreditsCalculator />
          <Footnotes className="mt-10 border-t border-border pt-6" items={[modeledOutcomeFootnote]} />
        </Container>
      </Section>

      {/* 5. Full comparison */}
      <Section background="subtle" bordered="both" aria-labelledby="compare-title">
        <Container>
          <SectionHeader
            eyebrow="Compare"
            title={<span id="compare-title">Every plan, line by line</span>}
            lede="Agents, platform, security, and support across all three plans."
          />
          <ComparisonTable />
        </Container>
      </Section>

      {/* 6. FAQ */}
      <Section aria-labelledby="faq-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                eyebrow="Questions"
                title={<span id="faq-title">What buyers ask about pricing</span>}
                lede="Credits, overage, annual billing, trials, pooling, and what happens when you leave."
                className="mb-8 lg:mb-0"
              />
            </div>
            <div className="lg:col-span-8">
              <PricingFaq faqs={pricingFaqs} />
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. Enterprise CTA */}
      <Section background="subtle" bordered="top" aria-labelledby="pricing-cta-title">
        <Container className="flex flex-col items-center text-center">
          <Eyebrow>Enterprise</Eyebrow>
          <h2 id="pricing-cta-title" className="text-h2 mt-4 max-w-2xl text-balance">
            One contract, one credit pool.
          </h2>
          <p className="text-lede mt-4 max-w-[52ch] text-pretty">
            Custom pools across every workspace, a dedicated environment, a 99.95% uptime SLA, and a named
            security contact for your review.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" arrow>
              <Link href={SALES_HREF}>Talk to sales</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/trust">Read the trust center</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
