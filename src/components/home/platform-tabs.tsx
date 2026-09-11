import { Check } from "lucide-react";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WindowFrame } from "@/components/ui/window-frame";
import { homeCopy } from "@/content/home";
import { platformPillars } from "@/content/platform";
import { platformPath } from "@/lib/seo/routes";
import { siteConfig } from "@/lib/site";

import { platformMockupUrls, platformMockups } from "./platform-mockups";

type MockupKey = keyof typeof platformMockups;

const pillars = platformPillars.filter((pillar): pillar is (typeof platformPillars)[number] & { slug: MockupKey } =>
  pillar.slug in platformMockups,
);
const trust = platformPillars.find((pillar) => pillar.slug === "trust");

/**
 * Five pillars as underline tabs. Every panel stays in the DOM (TabsContent forceMount),
 * so the copy is crawlable; only the active panel is displayed.
 */
export function PlatformTabs() {
  const copy = homeCopy.sections.platform;
  const trustCopy = homeCopy.sections.trust;
  return (
    <Section aria-labelledby="platform-heading" id="platform">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={copy.eyebrow}
            title={<span id="platform-heading">{copy.title}</span>}
            lede={copy.lede}
            actions={<ArrowLink href={siteConfig.links.platform}>Explore the platform</ArrowLink>}
          />
        </Reveal>
        <Reveal>
          <Tabs defaultValue={pillars[0]?.slug}>
            <TabsList aria-label="Platform pillars" className="-mx-5 px-5 md:-mx-8 md:px-8 lg:mx-0 lg:px-0">
              {pillars.map((pillar) => (
                <TabsTrigger key={pillar.slug} value={pillar.slug}>
                  {pillar.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {pillars.map((pillar) => {
              const Mockup = platformMockups[pillar.slug];
              return (
                <TabsContent key={pillar.slug} value={pillar.slug} className="mt-10 lg:mt-12">
                  <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-5">
                      <p className="eyebrow">{pillar.eyebrow}</p>
                      <h3 className="text-h3 mt-4">{pillar.headline}</h3>
                      <p className="mt-4 text-base leading-relaxed text-fg-muted">{pillar.description}</p>
                      <ul className="mt-6 border-t border-border">
                        {pillar.features.slice(0, 3).map((feature) => (
                          <li key={feature.title} className="border-b border-border py-4">
                            <p className="text-sm font-medium text-fg">{feature.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-fg-muted">{feature.description}</p>
                          </li>
                        ))}
                      </ul>
                      <ArrowLink href={platformPath(pillar.slug)} className="mt-6">
                        More on {pillar.name}
                      </ArrowLink>
                    </div>
                    <div className="lg:col-span-7">
                      <WindowFrame url={platformMockupUrls[pillar.slug]} shadow="md" className="h-full">
                        <Mockup />
                      </WindowFrame>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </Reveal>

        {trust ? (
          <Reveal>
            <div className="mt-16 grid gap-8 rounded-xl border border-border bg-bg-subtle px-6 py-6 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8 lg:py-7">
              <div className="lg:col-span-4">
                <Eyebrow>{trustCopy.eyebrow}</Eyebrow>
                <h3 className="text-h5 mt-3 text-balance">{trust.headline}</h3>
              </div>
              <ul className="grid gap-x-8 gap-y-2 text-sm text-fg-muted sm:grid-cols-2 lg:col-span-6">
                {(trustCopy.bullets ?? []).map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <Check aria-hidden className="mt-1 size-3.5 shrink-0 text-success" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="lg:col-span-2 lg:justify-self-end">
                <ArrowLink href={siteConfig.links.security}>Security and trust</ArrowLink>
              </div>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
