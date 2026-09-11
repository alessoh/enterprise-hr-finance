import type { MetadataRoute } from "next";
import { brandColors, tagline } from "@/lib/seo/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Meridian",
    short_name: "Meridian",
    description: tagline,
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "en-US",
    dir: "ltr",
    background_color: brandColors.background,
    theme_color: brandColors.background,
    categories: ["business", "finance", "productivity"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
