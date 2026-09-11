import type { Thing, WithContext } from "schema-dts";

export type JsonLdData = Thing | WithContext<Thing>;

const SCHEMA_CONTEXT = "https://schema.org";

function withContext(item: JsonLdData): Record<string, unknown> {
  const obj = item as Record<string, unknown>;
  return "@context" in obj ? obj : { "@context": SCHEMA_CONTEXT, ...obj };
}

/**
 * Serializes JSON-LD for inline <script> embedding. Angle brackets and
 * ampersands are escaped so user-supplied strings can never close the tag.
 */
export function serializeJsonLd(data: JsonLdData): string {
  return JSON.stringify(withContext(data))
    .replace(/</g, "\u003c")
    .replace(/>/g, "\u003e")
    .replace(/&/g, "\u0026");
}

/**
 * Server component. Renders one <script type="application/ld+json"> per item.
 * Usage: <JsonLd data={faqJsonLd(faqs)} /> or <JsonLd data={[a, b]} />
 */
export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
        />
      ))}
    </>
  );
}

export default JsonLd;
