import { LegalLayout } from "@/components/company/legal-layout";
import { legalUpdatedIso, subprocessorsDoc as doc } from "@/components/company/legal-copy";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: doc.title,
  description: doc.description,
  path: doc.path,
  modifiedTime: legalUpdatedIso,
  keywords: ["Meridian subprocessors", "AI subprocessor list", "model provider subprocessor", "data residency subprocessors"],
});

export default function Page() {
  return <LegalLayout doc={doc} />;
}
