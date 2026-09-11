import { HeroMeridian } from "@/components/three/hero-meridian";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "The Meridian",
  description:
    "Internal preview of the Meridian hero object: twenty-four meridians, one governed line, twelve agent nodes.",
  path: "/design-system/three",
  noIndex: true,
});

export default function ThreePreviewPage() {
  return (
    <Container>
      <div className="py-16 lg:py-24">
        <Eyebrow>Internal · not indexed</Eyebrow>
        <h1 className="text-h1 mt-6">The Meridian</h1>
        <p className="text-lede mt-6 max-w-[60ch]">
          Twenty-four meridians on a tilted sphere. One is drawn in accent blue: the governed line.
          Twelve nodes, one per agent, travel their own meridians and pulse as they cross it.
        </p>
        <div className="mt-12 max-w-[640px]">
          <HeroMeridian />
        </div>
        <p className="text-caption mt-8 max-w-[60ch]">
          Under reduced motion, below 768px, or without WebGL, the static poster stands in. The canvas
          pauses when it scrolls out of view and when the tab is hidden.
        </p>
      </div>
    </Container>
  );
}
