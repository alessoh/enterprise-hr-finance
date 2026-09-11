import * as React from "react";

import { cn } from "@/lib/utils";

/** The mandatory disclosure for every outcome figure (BRIEF §2). */
export const MODELED_OUTCOMES_FOOTNOTE =
  "Modeled outcomes from design-partner deployments. Results vary by data quality, workflow scope, and approval policy.";

export interface FootnoteRefProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** 1-based footnote number. Links to #fn-{n}. */
  n: number;
  /** Namespace when a page has several footnote lists. */
  scope?: string;
}

/** Superscript marker: 11px accent, links to the footnote and back. */
export function FootnoteRef({ n, scope, className, ...props }: FootnoteRefProps) {
  const target = scope ? `fn-${scope}-${n}` : `fn-${n}`;
  const id = scope ? `fnref-${scope}-${n}` : `fnref-${n}`;
  return (
    // `align-super` raises the marker by a full super offset, which on a wrapped
    // multi-line label collides with the line above. A small explicit rise keeps it
    // clear of the ascenders without leaving the line box.
    <sup
      id={id}
      className={cn(
        "ml-0.5 align-baseline text-[0.6875rem] leading-none font-medium relative -top-[0.4em]",
        className,
      )}
      {...props}
    >
      <a
        href={`#${target}`}
        aria-label={`Footnote ${n}`}
        className="rounded-sm text-accent no-underline hover:text-accent-hover hover:underline"
      >
        {n}
      </a>
    </sup>
  );
}

export interface FootnotesProps extends React.HTMLAttributes<HTMLOListElement> {
  items?: React.ReactNode[];
  scope?: string;
}

/** Ordered footnote list, 13px fg-subtle. Defaults to the modeled-outcomes disclosure. */
export function Footnotes({ items = [MODELED_OUTCOMES_FOOTNOTE], scope, className, ...props }: FootnotesProps) {
  return (
    <ol
      className={cn("space-y-1.5 text-[0.8125rem] leading-relaxed text-fg-subtle", className)}
      aria-label="Footnotes"
      {...props}
    >
      {items.map((item, index) => {
        const n = index + 1;
        const id = scope ? `fn-${scope}-${n}` : `fn-${n}`;
        const backref = scope ? `fnref-${scope}-${n}` : `fnref-${n}`;
        return (
          <li key={id} id={id} className="flex gap-2 scroll-mt-24">
            <span className="tabular shrink-0 select-none">{n}.</span>
            <span>
              {item}{" "}
              <a
                href={`#${backref}`}
                aria-label={`Back to reference ${n}`}
                className="text-fg-subtle no-underline hover:text-fg"
              >
                ↩
              </a>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
