import { glossaryTerms } from "@/content/glossary";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og";

export const alt = "Meridian glossary term";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return glossaryTerms.map((term) => ({ slug: term.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = glossaryTerms.find((t) => t.slug === slug);
  if (!term) {
    return renderOgImage({ eyebrow: "Glossary", title: "Meridian glossary" });
  }
  return renderOgImage({
    eyebrow: "Glossary",
    title: term.term,
    description: term.shortDefinition,
    footer: "Definitions for agentic HR and finance operations",
  });
}
