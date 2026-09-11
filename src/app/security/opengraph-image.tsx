import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og";

export const alt = "Meridian security and trust";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Security",
    title: "Governed by design.",
    description: "Human-in-the-loop approvals, immutable audit trail, role-based access. SOC 2 Type II, ISO 27001, GDPR, HIPAA-ready, EU/US residency.",
    footer: "No training on customer data. Your model, your keys.",
  });
}
