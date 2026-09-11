import { Certifications } from "@/components/security/certifications";
import { ControlsTable } from "@/components/security/controls-table";
import { DataFlowDiagram } from "@/components/security/data-flow-diagram";
import { Disclosure } from "@/components/security/disclosure";
import { Governance } from "@/components/security/governance";
import { SecurityCta } from "@/components/security/security-cta";
import { SecurityFaq } from "@/components/security/security-faq";
import { SecurityHero } from "@/components/security/security-hero";
import { SharedResponsibility } from "@/components/security/shared-responsibility";
import { JsonLd } from "@/components/seo/JsonLd";
import { securityFaqs } from "@/content/faqs";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";

const TITLE = "Security and trust: governed by design";
const DESCRIPTION =
  "Human-in-the-loop approvals, an immutable audit trail, SOC 2 Type II, ISO 27001, GDPR, EU and US data residency, and no training on customer data.";
const PATH = "/security";
const UPDATED = "2026-09-11";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  modifiedTime: UPDATED,
  keywords: [
    "AI agent security",
    "human-in-the-loop AI",
    "AI agent audit trail",
    "SOC 2 Type II AI agents",
    "no training on customer data",
    "AI data residency",
  ],
});

export default function SecurityPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: PATH, dateModified: UPDATED }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Security", path: PATH },
          ]),
          faqJsonLd(securityFaqs),
        ]}
      />
      <SecurityHero />
      <Certifications />
      <Governance />
      <ControlsTable />
      <DataFlowDiagram />
      <SharedResponsibility />
      <Disclosure />
      <SecurityFaq faqs={securityFaqs} />
      <SecurityCta />
    </>
  );
}
