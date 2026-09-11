import { LegalLayout } from "@/components/company/legal-layout";
import { legalUpdatedIso, privacyDoc as doc } from "@/components/company/legal-copy";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: doc.title,
  description: doc.description,
  path: doc.path,
  modifiedTime: legalUpdatedIso,
  keywords: ["Meridian privacy policy", "AI agent data privacy", "GDPR HR data", "data processor HR finance"],
});

export default function Page() {
  return <LegalLayout doc={doc} />;
}
