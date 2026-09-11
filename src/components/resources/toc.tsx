"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import type { TocItem } from "./build-toc";

export interface ArticleTocProps {
  items: TocItem[];
  className?: string;
  /** Hide the "On this page" label (when a parent already provides it). */
  hideLabel?: boolean;
}

/** Headings land at ~192px (html scroll-padding 6rem + prose scroll-margin 6rem), so detect just below that. */
const ACTIVE_OFFSET_PX = 200;

/**
 * Table of contents with the current section marked. Links are plain anchors
 * (server-rendered); the client only tracks which heading is nearest the top.
 */
export function ArticleToc({ items, className, hideLabel = false }: ArticleTocProps) {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = headings[0].id;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= ACTIVE_OFFSET_PX) current = heading.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className={cn("text-[0.8125rem]", className)}>
      {hideLabel ? null : <p className="eyebrow mb-4">On this page</p>}
      <ol className="border-l border-border">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pr-2 leading-snug transition-colors duration-150 ease-standard",
                  item.depth === 3 ? "pl-7" : "pl-4",
                  isActive
                    ? "border-fg font-medium text-fg"
                    : "border-transparent text-fg-muted hover:border-border-strong hover:text-fg",
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
