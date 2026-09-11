import { LegalLayout } from "@/components/company/legal-layout";
import { legalUpdatedIso, dpaDoc as doc } from "@/components/company/legal-copy";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: doc.title,
  description: doc.description,
  path: doc.path,
  modifiedTime: legalUpdatedIso,
  keywords: ["Meridian DPA", "data processing addendum AI", "standard contractual clauses AI", "subprocessor notice"],
});

export default function Page() {
  return <LegalLayout doc={doc} />;
}
