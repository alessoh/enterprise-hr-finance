import { agents } from "@/content/agents";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og";

export const alt = "Meridian agents for HR, finance, and legal operations";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const ga = agents.filter((a) => a.status === "ga").length;
  const early = agents.length - ga;
  return renderOgImage({
    eyebrow: "Agents",
    title: `${agents.length} governed agents for HR and finance.`,
    description: `${ga} generally available, ${early} in early access. Each scoped to one workflow with a measurable outcome.`,
  });
}
