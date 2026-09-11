import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { DotGrid } from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { WindowFrame } from "@/components/ui/window-frame";
import { homeCopy } from "@/content/home";
import { siteConfig } from "@/lib/site";

import { LiveOperationsPanel } from "@/components/live/live-operations-panel";

export function LiveSection() {
  const copy = homeCopy.sections.live;
  return (
    <Section background="subtle" bordered="both" aria-labelledby="live-heading">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={copy.eyebrow}
            live
            title={<span id="live-heading">{copy.title}</span>}
            lede={copy.lede}
          />
        </Reveal>
        <Reveal>
          <div className="relative isolate -mx-5 px-5 pt-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 lg:pt-6">
            <DotGrid />
            <WindowFrame
              url="app.meridian.example/registry/live"
              actions={
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-muted">
                  <span aria-hidden className="inline-block size-1.5 rounded-full bg-success animate-pulse-dot" />
                  Live
                </span>
              }
            >
              <LiveOperationsPanel variant="compact" />
            </WindowFrame>
          </div>
        </Reveal>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-caption max-w-[60ch]">
            The same feed, metrics, and approvals queue your operations team gets in the Registry, streamed as
            they happen.
          </p>
          <ArrowLink href={siteConfig.links.dashboard} className="shrink-0">
            Open the live dashboard
          </ArrowLink>
        </div>
      </Container>
    </Section>
  );
}
