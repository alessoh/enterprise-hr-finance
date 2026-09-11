"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface StoryNavItem {
  id: string;
  label: string;
}

/** Sticky in-page nav for the story body. Tracks the section nearest the top on scroll. */
export function StoryNav({ items, className }: { items: StoryNavItem[]; className?: string }) {
  const [active, setActive] = React.useState<string | undefined>(items[0]?.id);

  React.useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const line = 160;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <nav aria-label="On this page" className={cn("text-sm", className)}>
      <p className="eyebrow mb-4">On this page</p>
      <ol className="border-l border-border">
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={selected ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pl-4 transition-colors duration-150 ease-standard",
                  selected ? "border-fg text-fg" : "border-transparent text-fg-muted hover:text-fg",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
