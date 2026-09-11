import { JsonLd } from "@/components/seo/JsonLd";
import { AgentContract } from "@/components/home/agent-contract";
import { AgentsCatalog } from "@/components/home/agents-catalog";
import { CustomerStory } from "@/components/home/customer-story";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HomeFaq } from "@/components/home/home-faq";
import { LiveSection } from "@/components/home/live-section";
import { PlatformTabs } from "@/components/home/platform-tabs";
import { PricingTeaser } from "@/components/home/pricing-teaser";
import { ProofStats } from "@/components/home/proof-stats";
import { agents } from "@/content/agents";
import { homeFaqs } from "@/content/faqs";
import { plans } from "@/content/pricing";
import { agentCatalogJsonLd, faqJsonLd, softwareApplicationJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";

const TITLE = "Meridian — AI agents that run HR and finance";
/** 140–160 characters. */
const DESCRIPTION =
  "Meridian ships twelve narrow, governed AI agents for HR, finance, and legal work. Each runs on your data, logs every action, and keeps a person accountable.";

export const metadata = createMetadata({
  title: TITLE,
  titleAbsolute: true,
  description: DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/" }),
          softwareApplicationJsonLd(plans),
          agentCatalogJsonLd(agents),
          faqJsonLd(homeFaqs),
        ]}
      />
      <Hero />
      <ProofStats />
      <AgentContract />
      <AgentsCatalog />
      <LiveSection />
      <PlatformTabs />
      <CustomerStory />
      <PricingTeaser />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
