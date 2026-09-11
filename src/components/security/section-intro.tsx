import * as React from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export interface SectionIntroProps {
  /** id for the heading, referenced by the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  lede?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

/** Eyebrow -> H2 (<= 8 words) -> lede, with an id on the heading so sections can label themselves. */
export function SectionIntro({ id, eyebrow, title, lede, actions, className }: SectionIntroProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 lg:mb-16",
        actions && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="flex max-w-2xl flex-col gap-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="text-h2">
          {title}
        </h2>
        {lede ? <p className="text-lede max-w-[60ch]">{lede}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
    </div>
  );
}
