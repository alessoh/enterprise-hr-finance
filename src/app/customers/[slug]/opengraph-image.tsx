import { caseStudies, customers } from "@/content/customers";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og";

export const alt = "Meridian customer story";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return customers.map((customer) => ({ slug: customer.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const customer = customers.find((c) => c.slug === slug);
  const study = caseStudies.find((cs) => cs.slug === slug || cs.customerSlug === slug);
  if (!customer) {
    return renderOgImage({ eyebrow: "Customer story", title: "Meridian customers" });
  }
  const lead = customer.results[0];
  return renderOgImage({
    eyebrow: "Customer story",
    title: study?.title ?? customer.name,
    description: study?.subtitle ?? customer.summary,
    footer: lead ? `${customer.name}: ${lead.value} ${lead.label}` : `${customer.name}, ${customer.industry}`,
  });
}
