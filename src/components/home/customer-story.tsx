import { AnimatedNumber } from "@/components/ui/animated-number";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Avatar } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Footnotes } from "@/components/ui/footnote";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Stat } from "@/components/ui/stat";
import { modeledOutcomeFootnote } from "@/content/agents";
import { caseStudies, customers } from "@/content/customers";
import { customerPath } from "@/lib/seo/routes";

const study = caseStudies[0];
const customer = customers.find((c) => c.slug === study.customerSlug);

/** One design-partner story: serif pull quote, two stats, initials attribution. */
export function CustomerStory() {
  const { quote } = study;
  const metrics = study.results.metrics.slice(0, 2);
  return (
    <Section background="subtle" bordered="both" aria-labelledby="story-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Customer story{customer ? ` · ${customer.industry}` : ""}</Eyebrow>
            <figure className="mt-8">
              <blockquote className="font-display text-[2.5rem] leading-[1.12] tracking-[-0.015em] text-balance text-fg lg:text-[3rem] [font-optical-sizing:auto]">
                <p>“{quote.quote}”</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <Avatar name={quote.name} size="md" tone="ink" />
                <div className="text-sm leading-snug">
                  <p className="font-medium text-fg">{quote.name}</p>
                  <p className="text-fg-muted">
                    {quote.role}, {quote.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.06} className="flex flex-col lg:col-span-4 lg:col-start-9">
            <h2 id="story-heading" className="text-h5 text-balance">
              {study.title}
            </h2>
            {customer ? (
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {customer.size} · {customer.region}
              </p>
            ) : null}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 border-t border-border pt-8 lg:grid-cols-1 lg:gap-y-8">
              {metrics.map((metric, index) => (
                <Stat
                  key={metric.label}
                  size="md"
                  prefix={metric.prefix}
                  value={
                    <AnimatedNumber
                      value={metric.numeric ?? 0}
                      decimals={Number.isInteger(metric.numeric ?? 0) ? 0 : 1}
                    />
                  }
                  unit={metric.suffix?.trim()}
                  label={metric.label}
                  footnote={metric.footnote ? 1 : undefined}
                  footnoteScope="story"
                  className={index === 1 ? "lg:border-t lg:border-border lg:pt-8" : undefined}
                />
              ))}
            </dl>
            <ArrowLink href={customerPath(study.slug)} className="mt-8">
              Read the {quote.company} story
            </ArrowLink>
          </Reveal>
        </div>
        <Footnotes scope="story" items={[modeledOutcomeFootnote]} className="mt-12 max-w-3xl lg:mt-16" />
      </Container>
    </Section>
  );
}
