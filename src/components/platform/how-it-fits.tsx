import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { PlatformPillar } from "@/content/types";
import { platformPath } from "@/lib/seo/routes";

interface FitItem {
  name: string;
  description: string;
  href: string;
}

/** The other four pillars plus Security as a hairline list of arrow links. */
export function HowItFits({ current, pillars }: { current: PlatformPillar; pillars: PlatformPillar[] }) {
  const items: FitItem[] = [
    ...pillars
      .filter((p) => p.slug !== current.slug && p.slug !== "trust")
      .map((p) => ({ name: p.name, description: p.eyebrow, href: platformPath(p.slug) })),
    { name: "Security", description: "Approvals, audit trail, certifications, residency", href: "/security" },
  ];

  return (
    <ul className="grid border-t border-border lg:grid-cols-2 lg:gap-x-16">
      {items.map((item) => (
        <li key={item.href} className="border-b border-border">
          <Link
            href={item.href}
            className="group/fit flex items-center justify-between gap-6 py-5 outline-none focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ring"
          >
            <span className="min-w-0">
              <span className="block text-base font-medium text-fg">{item.name}</span>
              <span className="mt-0.5 block text-sm text-fg-muted">{item.description}</span>
            </span>
            <ArrowRight
              aria-hidden
              className="size-4 shrink-0 text-fg-subtle transition-transform duration-200 ease-out-quart group-hover/fit:translate-x-0.5 group-hover/fit:text-fg"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
