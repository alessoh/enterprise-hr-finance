import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ArrowLinkProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> {
  href: string;
  tone?: "fg" | "accent" | "muted";
  size?: "sm" | "md" | "lg";
  external?: boolean;
}

const tones = {
  fg: "text-fg hover:text-fg",
  accent: "text-accent hover:text-accent-hover",
  muted: "text-fg-muted hover:text-fg",
} as const;

const sizes = {
  sm: "text-[0.8125rem] [&_svg]:size-3.5",
  md: "text-sm [&_svg]:size-4",
  lg: "text-base [&_svg]:size-[1.125rem]",
} as const;

/** Text link with a trailing arrow that moves 2px right on hover. */
export const ArrowLink = React.forwardRef<HTMLAnchorElement, ArrowLinkProps>(function ArrowLink(
  { href, tone = "fg", size = "md", external, className, children, ...props },
  ref,
) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "group/arrow inline-flex items-center gap-1.5 font-medium transition-colors duration-150 ease-standard",
        tones[tone],
        sizes[size],
        className,
      )}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...props}
    >
      <span>{children}</span>
      <Icon
        aria-hidden
        className={cn(
          "shrink-0 transition-transform duration-200 ease-out-quart",
          external
            ? "group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5"
            : "group-hover/arrow:translate-x-0.5",
        )}
      />
    </Link>
  );
});
