import { AnimatedNumber } from "@/components/ui/animated-number";
import { Container } from "@/components/ui/container";
import { Footnotes } from "@/components/ui/footnote";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { Stat, StatGrid } from "@/components/ui/stat";
import { homeCopy } from "@/content/home";

export function ProofStats() {
  const { outcomes } = homeCopy.sections;
  return (
    <Section spacing="compact" aria-labelledby="outcomes-heading">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={outcomes.eyebrow}
            title={<span id="outcomes-heading">{outcomes.title}</span>}
            lede={outcomes.lede}
            className="mb-10 lg:mb-14"
          />
        </Reveal>
        <RevealGroup>
          <StatGrid columns={4}>
            {homeCopy.proofStats.map((metric) => (
              <RevealItem key={metric.label}>
                <Stat
                  prefix={metric.prefix}
                  value={<AnimatedNumber value={metric.numeric ?? 0} />}
                  unit={metric.suffix?.trim()}
                  label={metric.label}
                  footnote={1}
                  footnoteScope="proof"
                />
              </RevealItem>
            ))}
          </StatGrid>
        </RevealGroup>
        <Footnotes scope="proof" items={[homeCopy.footnoteText]} className="mt-10 max-w-3xl lg:mt-12" />
      </Container>
    </Section>
  );
}
