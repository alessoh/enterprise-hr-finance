import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import type { PlatformPillar } from "@/content/types";
import { platformPath } from "@/lib/seo/routes";
import { cn } from "@/lib/utils";

import { PillarMockup } from "./mockups";

export interface PillarSectionProps {
  pillar: PlatformPillar;
  index: number;
}

/** Overview section: eyebrow, H2, description, three feature bullets, compact mockup. Alternates sides. */
export function PillarSection({ pillar, index }: PillarSectionProps) {
  const flip = index % 2 === 1;
  const id = `pillar-${pillar.slug}`;
  const features = pillar.features.slice(0, 3);

  return (
    <Section
      id={pillar.slug}
      spacing="none"
      bordered="top"
      className="scroll-mt-24 py-20 lg:py-28"
      aria-labelledby={id}
    >
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={cn("lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
            <Eyebrow>
              <span className="text-fg">{pillar.name}</span>
              <span aria-hidden className="text-fg-faint">
                ·
              </span>
              {pillar.eyebrow}
            </Eyebrow>
            <h2 id={id} className="text-h2 mt-4 text-balance">
              {pillar.headline}
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-pretty text-fg-muted lg:text-[1.0625rem]">
              {pillar.description}
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {features.map((feature) => (
                <li key={feature.title} className="grid gap-1 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                  <p className="text-sm font-medium text-fg">{feature.title}</p>
                  <p className="text-sm leading-relaxed text-pretty text-fg-muted">{feature.description}</p>
                </li>
              ))}
            </ul>
            <ArrowLink href={platformPath(pillar.slug)} className="mt-8">
              Explore {pillar.name}
            </ArrowLink>
          </div>
          <div className={cn("min-w-0 lg:col-span-7", flip && "lg:order-1 lg:col-start-1")}>
            <PillarMockup slug={pillar.slug} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
