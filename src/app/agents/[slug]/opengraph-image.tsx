import { agents, getAgent } from "@/content/agents";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og";

export const alt = "Meridian agent";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) {
    return renderOgImage({ eyebrow: "Agent", title: "Meridian agent" });
  }
  return renderOgImage({
    eyebrow: agent.status === "ga" ? "Agent" : "Agent, early access",
    title: agent.name,
    description: agent.tagline,
    footer: `${agent.headlineMetric.value} ${agent.headlineMetric.label}`,
  });
}
