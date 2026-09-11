import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { homeCopy } from "@/content/home";

import { HeroMeridian } from "@/components/three/hero-meridian";
import { LogoWall } from "@/components/ui/logo-wall";

import { HeroCheckpoint } from "./hero-checkpoint";

/** Trust line per DESIGN.md §8 (Home hero). Not an outcome figure, so no footnote. */
const trustLine = ["SOC 2 Type II", "ISO 27001", "No training on your data"];

export function Hero() {
  const { hero } = homeCopy;
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:gap-16">
          <div className="max-w-2xl">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 id="hero-heading" className="text-display mt-6 max-w-[18ch] text-balance">
              {hero.headline}
            </h1>
            <Reveal delay={0.06}>
              <p className="text-lede mt-6 max-w-[54ch]">{hero.subheadline}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" arrow>
                  <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
                </Button>
              </div>
              <ul className="text-caption mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1" aria-label="Trust">
                {trustLine.map((item, index) => (
                  <li key={item} className="inline-flex items-center gap-x-2.5">
                    {index > 0 ? (
                      <span aria-hidden className="text-fg-faint">
                        ·
                      </span>
                    ) : null}
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          {/* The globe is the atmosphere; the checkpoint card is the claim. An agent
              acted, and a person still decides. */}
          <div className="relative mx-auto w-full max-w-[360px] lg:max-w-[640px]">
            <HeroMeridian />
            <div className="mt-6 flex justify-center lg:absolute lg:bottom-2 lg:-left-6 lg:mt-0 lg:justify-start">
              <HeroCheckpoint />
            </div>
          </div>
        </div>
      </Container>
      <Container className="mt-16 lg:mt-20">
        <div className="border-t border-border pt-8">
          <LogoWall
            variant="row"
            labelAlign="left"
            label={homeCopy.logoWallLabel}
            names={[
              "Northwind Logistics",
              "Halvorsen Health",
              "Bluepeak Energy",
              "Castellan Financial",
              "Orion Retail Group",
              "Atlas Manufacturing",
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
