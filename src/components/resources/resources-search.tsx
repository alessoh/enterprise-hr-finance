import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface ResourcesSearchProps {
  query: string;
  /** Preserved as a hidden field so a search inside a category stays in it. */
  category?: string;
  className?: string;
}

/** Server-rendered GET form. Submits to /resources?q= (the WebSite SearchAction target). */
export function ResourcesSearch({ query, category, className }: ResourcesSearchProps) {
  return (
    <form role="search" method="get" action="/resources" className={cn("flex w-full max-w-xl gap-2", className)}>
      <label htmlFor="resources-q" className="sr-only">
        Search guides
      </label>
      <div className="relative min-w-0 flex-1">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle"
        />
        <Input
          id="resources-q"
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search guides: approval tiers, close, MCP"
          autoComplete="off"
          maxLength={80}
          className="pl-9"
        />
      </div>
      {category ? <input type="hidden" name="category" value={category} /> : null}
      <Button type="submit" variant="secondary" className="shrink-0">
        Search
      </Button>
    </form>
  );
}
