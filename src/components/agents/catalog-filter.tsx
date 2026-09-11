"use client";

import * as React from "react";

import type { AgentCategory, AgentStatus } from "@/content/types";
import { cn } from "@/lib/utils";

export type CategoryFilter = "all" | AgentCategory;
export type StatusFilter = "all" | AgentStatus;

export interface CatalogFilterItem {
  category: AgentCategory;
  status: AgentStatus;
}

export interface CatalogCategoryOption {
  id: AgentCategory;
  /** Short label for the control, e.g. "Legal & Ops". */
  label: string;
  /** Full name for the empty-state sentence, e.g. "Legal and Operations". */
  name: string;
}

export interface CatalogFilterProps {
  /** One entry per agent, in any order. Used only for counts and empty states. */
  items: CatalogFilterItem[];
  categories: CatalogCategoryOption[];
  /** The server-rendered groups and cards. See catalog-visibility.ts for the hide classes. */
  children: React.ReactNode;
}

const statusOptions: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "Any status" },
  { id: "ga", label: "GA" },
  { id: "early-access", label: "Early access" },
];

const statusNoun: Record<StatusFilter, string> = {
  all: "",
  ga: "generally available",
  "early-access": "early-access",
};

interface SegmentedOption<T extends string> {
  id: T;
  label: string;
  count: number;
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-lg border border-border bg-bg-elevated p-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={cn(
              "inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-3 text-[0.8125rem] font-medium whitespace-nowrap outline-none transition-colors duration-150 ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring",
              active ? "bg-fg text-bg" : "text-fg-muted hover:bg-bg-muted hover:text-fg",
            )}
          >
            {option.label}
            <span className={cn("tabular font-mono text-xs", active ? "text-bg/70" : "text-fg-subtle")}>
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Client filter bar for the agent catalog. Only visibility changes: the wrapper
 * carries data attributes and the server-rendered cards carry the matching hide
 * classes, so every agent is always present in the HTML for crawlers.
 */
export function CatalogFilter({ items, categories, children }: CatalogFilterProps) {
  const [category, setCategory] = React.useState<CategoryFilter>("all");
  const [status, setStatus] = React.useState<StatusFilter>("all");

  const inCategory = (item: CatalogFilterItem, c: CategoryFilter) => c === "all" || item.category === c;
  const inStatus = (item: CatalogFilterItem, s: StatusFilter) => s === "all" || item.status === s;

  const visible = items.filter((item) => inCategory(item, category) && inStatus(item, status)).length;

  const categoryOptions: SegmentedOption<CategoryFilter>[] = [
    { id: "all", label: "All", count: items.filter((item) => inStatus(item, status)).length },
    ...categories.map((c) => ({
      id: c.id,
      label: c.label,
      count: items.filter((item) => item.category === c.id && inStatus(item, status)).length,
    })),
  ];

  const statusCounts: SegmentedOption<StatusFilter>[] = statusOptions.map((option) => ({
    ...option,
    count: items.filter((item) => inCategory(item, category) && inStatus(item, option.id)).length,
  }));

  // Groups with no cards under the current status filter are hidden entirely.
  const emptyAttributes: Record<string, string> = {};
  for (const c of categories) {
    const any = items.some((item) => item.category === c.id && inStatus(item, status));
    if (!any) emptyAttributes[`data-empty-${c.id}`] = "";
  }

  const filtered = category !== "all" || status !== "all";
  const categoryName = categories.find((c) => c.id === category)?.name;

  return (
    <div>
      <div
        role="toolbar"
        aria-label="Filter agents"
        className="flex flex-col gap-3 border-y border-border py-3 md:flex-row md:items-center md:justify-between"
      >
        <Segmented label="Category" options={categoryOptions} value={category} onChange={setCategory} />
        <div className="flex items-center gap-4">
          <Segmented label="Status" options={statusCounts} value={status} onChange={setStatus} />
          {filtered ? (
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setStatus("all");
              }}
              className="cursor-pointer rounded-sm text-[0.8125rem] font-medium text-fg-muted underline-offset-4 transition-colors duration-150 ease-standard outline-none hover:text-fg hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible} of {items.length} agents
      </p>

      <div data-filter-category={category} data-filter-status={status} {...emptyAttributes}>
        {children}
      </div>

      {visible === 0 ? (
        <div className="mt-12 rounded-lg border border-border bg-bg-subtle px-6 py-10 text-center">
          <p className="text-base font-medium text-fg">
            No {statusNoun[status]} agents in {categoryName ?? "this category"} yet.
          </p>
          <p className="mt-2 text-sm text-fg-muted">
            Early-access agents are added as design-partner deployments graduate.
          </p>
          <button
            type="button"
            onClick={() => setStatus("all")}
            className="mt-5 inline-flex h-9 cursor-pointer items-center rounded-md border border-border-strong bg-bg-elevated px-3.5 text-[0.8125rem] font-medium text-fg shadow-xs transition-colors duration-150 ease-standard outline-none hover:bg-bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
          >
            Show {categoryName} agents with any status
          </button>
        </div>
      ) : null}
    </div>
  );
}
