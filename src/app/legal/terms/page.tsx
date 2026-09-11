import { LegalLayout } from "@/components/company/legal-layout";
import { legalUpdatedIso, termsDoc as doc } from "@/components/company/legal-copy";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: doc.title,
  description: doc.description,
  path: doc.path,
  modifiedTime: legalUpdatedIso,
  keywords: ["Meridian terms of service", "AI agent SaaS terms", "consumption pricing terms", "credits billing terms"],
});

export default function Page() {
  return <LegalLayout doc={doc} />;
}
