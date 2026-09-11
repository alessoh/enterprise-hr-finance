import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { GlobalJsonLd } from "@/components/seo/GlobalJsonLd";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { fontVariables } from "@/lib/fonts";
import { announcement, ctas, mainNav, siteConfig } from "@/lib/site";

import "./globals.css";

const DEFAULT_TITLE = "Meridian — AI agents that run HR and finance";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: DEFAULT_TITLE, template: "%s · Meridian" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "AI agents for HR",
    "AI agents for finance",
    "HR automation",
    "finance automation",
    "governed AI agents",
    "agentic HR",
    "agentic finance",
    "month-end close automation",
    "audit evidence automation",
    "HR help desk agent",
  ],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    url: siteConfig.url,
    title: DEFAULT_TITLE,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Icons come from the file conventions in src/app (icon.svg, apple-icon.tsx).
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fefdfc",
  colorScheme: "light",
};

const headerCtas = {
  signIn: { title: ctas.signIn.label, href: ctas.signIn.href },
  demo: { title: ctas.demo.label, href: ctas.demo.href },
  start: { title: ctas.start.label, href: ctas.start.href },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AnnouncementBar announcement={announcement} />
        <SiteHeader nav={mainNav} ctas={headerCtas} />
        <main id="main" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <GlobalJsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
