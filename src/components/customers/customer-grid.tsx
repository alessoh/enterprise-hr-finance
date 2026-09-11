"use client";

import * as React from "react";

import type { PartnerFunction } from "@/components/customers/lib";
import { cn } from "@/lib/utils";

export interface CustomerGridItem {
  slug: string;
  group: PartnerFunction;
  /** Server-rendered card. Always in the DOM; the filter only toggles `hidden`. */
  card: React.ReactNode;
}

type FilterId = "all" | PartnerFunction;

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All partners" },
  { id: "hr", label: "HR operations" },
  { id: "finance", label: "Finance and legal" },
];

/** Filterable 2-up grid. Every card is server-rendered and stays in the DOM. */
export function CustomerGrid({ items }: { items: CustomerGridItem[] }) {
  const [active, setActive] = React.useState<FilterId>("all");
  const visible = active === "all" ? items.length : items.filter((item) => item.group === active).length;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-border">
        <div role="group" aria-label="Filter partners by function" className="-mb-px flex gap-6">
          {filters.map((filter) => {
            const selected = filter.id === active;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(filter.id)}
                className={cn(
                  "-mb-px h-10 border-b-2 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-standard outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring",
                  selected ? "border-fg text-fg" : "border-transparent text-fg-muted hover:text-fg",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        <p className="tabular pb-3 text-[0.8125rem] text-fg-subtle" aria-live="polite">
          {visible} of {items.length} partners
        </p>
      </div>
      <ul className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.slug} hidden={active !== "all" && item.group !== active} className="min-w-0">
            {item.card}
          </li>
        ))}
      </ul>
    </div>
  );
}
