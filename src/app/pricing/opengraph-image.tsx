import { plans } from "@/content/pricing";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og";

export const alt = "Meridian pricing";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const summary = plans
    .map((plan) =>
      plan.priceMonthly == null ? `${plan.name} custom` : `${plan.name} $${plan.priceMonthly.toLocaleString("en-US")}/mo`,
    )
    .join(", ");
  return renderOgImage({
    eyebrow: "Pricing",
    title: "Consumption pricing. Pay for work completed.",
    description: `${summary}. Credits are consumed per case resolved, candidate screened, evidence package, or redline.`,
  });
}
