import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "./JsonLd";

/**
 * Site-wide Organization + WebSite nodes. Render once in the root layout <body>.
 * Page-level nodes (FAQPage, Article, Product...) reference these by @id.
 */
export function GlobalJsonLd() {
  return <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />;
}

export default GlobalJsonLd;
