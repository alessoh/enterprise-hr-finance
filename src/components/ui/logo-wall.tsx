import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * The eight fictional design partners (BRIEF §3), each set in type with its own
 * treatment: weight, case, tracking, and at most one small glyph. Rendered in
 * fg-subtle, fg on hover. Every wordmark is 32px tall.
 */

const glyph = "size-4 shrink-0";

type Wordmark = { name: string; mark: React.ReactNode };

export const partnerWordmarks: Wordmark[] = [
  {
    name: "Northwind Logistics",
    mark: (
      <span className="inline-flex items-center gap-2">
        <svg viewBox="0 0 16 16" aria-hidden className={glyph} fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 1.5 10.5 8 8 14.5 5.5 8Z" strokeLinejoin="round" />
          <path d="M5.5 8h5" />
        </svg>
        <span className="text-[0.9375rem] font-semibold tracking-[0.2em]">NORTHWIND</span>
      </span>
    ),
  },
  {
    name: "Halvorsen Health",
    mark: (
      <span className="inline-flex items-start gap-1">
        <span className="text-[1.375rem] leading-none font-medium tracking-[-0.03em]">Halvorsen</span>
        <svg viewBox="0 0 16 16" aria-hidden className="mt-0.5 size-2.5 shrink-0" fill="currentColor">
          <path d="M6.25 1h3.5v5.25H15v3.5H9.75V15h-3.5V9.75H1v-3.5h5.25Z" />
        </svg>
      </span>
    ),
  },
  {
    name: "Bluepeak Energy",
    mark: (
      <span className="inline-flex items-center gap-2">
        <svg viewBox="0 0 16 16" aria-hidden className={glyph} fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1.5 13 6 4.5l3 5 2-3 3.5 6.5Z" strokeLinejoin="round" />
        </svg>
        <span className="font-mono text-[1.1875rem] leading-none font-medium tracking-[-0.04em]">bluepeak</span>
      </span>
    ),
  },
  {
    name: "Castellan Financial",
    mark: (
      <span className="inline-flex items-center gap-2.5">
        <svg viewBox="0 0 16 16" aria-hidden className="size-3 shrink-0" fill="currentColor">
          <path d="M8 1 15 8 8 15 1 8Z" />
        </svg>
        <span className="text-sm font-medium tracking-[0.28em]">CASTELLAN</span>
      </span>
    ),
  },
  {
    name: "Orion Retail Group",
    mark: (
      <span className="inline-flex items-center gap-2">
        <span className="text-[1.375rem] leading-none font-bold tracking-[-0.04em]">Orion</span>
        <svg viewBox="0 0 24 8" aria-hidden className="h-2 w-6 shrink-0" fill="currentColor">
          <circle cx="3" cy="4" r="2" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="21" cy="4" r="2" />
        </svg>
      </span>
    ),
  },
  {
    name: "Verdant Foods",
    mark: (
      <span className="inline-flex items-center gap-1.5">
        <svg viewBox="0 0 16 16" aria-hidden className={glyph} fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13.5 2.5C8 2.5 3.5 6 3.5 12.5c5.5 0 10-3.5 10-10Z" strokeLinejoin="round" />
          <path d="M3.5 12.5 9 7" />
        </svg>
        <span className="text-[1.3125rem] leading-none font-semibold tracking-[-0.03em]">verdant</span>
      </span>
    ),
  },
  {
    name: "Atlas Manufacturing",
    mark: (
      <span className="inline-flex items-center gap-2">
        <svg viewBox="0 0 16 16" aria-hidden className={glyph} fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="8" r="6.25" />
          <path d="M1.75 8h12.5" />
        </svg>
        <span className="text-[1.0625rem] font-bold tracking-[0.12em]">ATLAS</span>
      </span>
    ),
  },
  {
    name: "Summit Bank",
    mark: (
      <span className="inline-flex items-baseline gap-1.5">
        <svg viewBox="0 0 16 16" aria-hidden className="size-3.5 shrink-0 self-center" fill="currentColor">
          <path d="M8 2 14.5 14h-13Z" />
        </svg>
        <span className="text-[1.25rem] leading-none font-medium tracking-[-0.02em]">Summit</span>
        <span className="text-[0.625rem] font-semibold tracking-[0.18em]">BANK</span>
      </span>
    ),
  },
];

export interface LogoWallProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Marquee (48s, pauses on hover; static under reduced motion) or a static 4×2 grid. */
  variant?: "marquee" | "grid";
  /** Caption alignment. Left on left-aligned pages; centre only in centred sections. */
  labelAlign?: "left" | "center";
  /** Optional caption above the wall, e.g. "Design partners in six industries". */
  label?: React.ReactNode;
  /** Subset to render; defaults to all eight. */
  names?: string[];
}

function Item({ wordmark }: { wordmark: Wordmark }) {
  return (
    <li
      aria-label={wordmark.name}
      title={wordmark.name}
      className="flex h-8 shrink-0 items-center text-fg-subtle transition-colors duration-150 ease-standard hover:text-fg"
    >
      {wordmark.mark}
    </li>
  );
}

export function LogoWall({
  variant = "marquee",
  label,
  labelAlign = "center",
  names,
  className,
  ...props
}: LogoWallProps) {
  const marks = names ? partnerWordmarks.filter((w) => names.includes(w.name)) : partnerWordmarks;
  return (
    <div className={cn("w-full", className)} {...props}>
      {label ? (
        <p
          className={cn(
            "mb-8 text-[0.8125rem] text-fg-subtle",
            labelAlign === "center" ? "text-center" : "text-left",
          )}
        >
          {label}
        </p>
      ) : null}
      {variant === "grid" ? (
        <ul className="grid grid-cols-2 place-items-center gap-x-6 gap-y-8 sm:grid-cols-4">
          {marks.map((w) => (
            <Item key={w.name} wordmark={w} />
          ))}
        </ul>
      ) : (
        <>
          <div className="group relative w-full overflow-hidden mask-fade-x motion-reduce:hidden" aria-label="Design partners">
            <ul className="marquee-track items-center gap-16 pr-16">
              {marks.map((w) => (
                <Item key={w.name} wordmark={w} />
              ))}
              {marks.map((w) => (
                <li key={`${w.name}-dup`} aria-hidden className="flex h-8 shrink-0 items-center text-fg-subtle transition-colors duration-150 ease-standard hover:text-fg">
                  {w.mark}
                </li>
              ))}
            </ul>
          </div>
          <ul className="hidden grid-cols-2 place-items-center gap-x-6 gap-y-8 motion-reduce:grid sm:grid-cols-4">
            {marks.map((w) => (
              <Item key={`${w.name}-static`} wordmark={w} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
