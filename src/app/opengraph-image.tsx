import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og";

export const alt = "Meridian: AI agents that run HR and finance";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Meridian",
    title: "AI agents that run HR and finance.",
    description:
      "Narrow, governed agents for help desk, recruiting, payroll, audit, close, and more. Humans stay accountable.",
    footer: "12 agents. One system of record. Your model.",
  });
}
