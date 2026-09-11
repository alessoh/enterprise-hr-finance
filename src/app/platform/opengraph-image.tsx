import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og";

export const alt = "Meridian platform";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Platform",
    title: "One system of record for every agent.",
    description: "Registry, Gateway, Data Fabric, Studio, Assist, and Trust. Govern Meridian, partner, and customer-built agents in one place.",
  });
}
