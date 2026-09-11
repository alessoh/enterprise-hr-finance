import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ResourcesSearchProps {
  query: string;
  /** Preserved as a hidden field so a search inside a category stays in it. */
  category?: string;
  className?: string;
}

/**
 * Server-rendered GET form. Submits to /resources?q= (the WebSite SearchAction
 * target). One control: a single hairline field carrying the icon, the input,
 * and an inset submit, with the focus ring drawn around the whole thing.
 */
export function ResourcesSearch({ query, category, className }: ResourcesSearchProps) {
  return (
    <form role="search" method="get" action="/resources" className={cn("w-full max-w-xl", className)}>
      <label htmlFor="resources-q" className="sr-only">
        Search guides
      </label>
      <div className="flex h-10 w-full items-center rounded-md border border-border-strong bg-bg-elevated shadow-xs transition-[border-color,box-shadow] duration-150 ease-standard focus-within:border-accent focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-ring">
        <Search aria-hidden className="ml-3 size-4 shrink-0 text-fg-subtle" />
        <input
          id="resources-q"
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search guides: approval tiers, close, MCP"
          autoComplete="off"
          maxLength={80}
          className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-sm text-fg outline-none placeholder:text-fg-subtle [&::-webkit-search-cancel-button]:appearance-none"
        />
        {category ? <input type="hidden" name="category" value={category} /> : null}
        <Button
          type="submit"
          size="sm"
          className="mr-1 rounded-sm focus-visible:bg-fg/88 focus-visible:outline-none"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
