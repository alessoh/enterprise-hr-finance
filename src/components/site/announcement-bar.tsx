"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

import type { Announcement } from "@/lib/site";
import { cn } from "@/lib/utils";

const STORAGE_PREFIX = "meridian:announcement:";
const CHANGE_EVENT = "meridian:announcement-change";

function readDismissed(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function writeDismissed(key: string): void {
  try {
    window.localStorage.setItem(key, "1");
  } catch {
    /* storage unavailable: the bar hides for this render only */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export interface AnnouncementBarProps {
  announcement: Announcement | null;
  className?: string;
}

/**
 * 40px bar above the header. Dismissal is remembered per announcement id in
 * localStorage; the server snapshot is "visible" so SSR and hydration agree.
 */
export function AnnouncementBar({ announcement, className }: AnnouncementBarProps) {
  const key = announcement ? `${STORAGE_PREFIX}${announcement.id}` : null;
  const [sessionDismissed, setSessionDismissed] = React.useState(false);
  const stored = React.useSyncExternalStore(
    subscribe,
    () => (key ? readDismissed(key) : false),
    () => false,
  );

  if (!announcement || !key || stored || sessionDismissed) return null;

  const dismiss = () => {
    setSessionDismissed(true);
    writeDismissed(key);
  };

  return (
    <div
      role="region"
      aria-label="Announcement"
      className={cn("relative z-30 border-b border-border bg-bg-subtle text-[0.8125rem] text-fg-muted", className)}
    >
      <div className="container-x flex h-10 items-center justify-center pr-12">
        <Link
          href={announcement.cta.href}
          className="group/ann inline-flex min-w-0 items-center gap-1 rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
        >
          <span className="truncate text-fg">{announcement.text}</span>
          <span className="ml-2 hidden shrink-0 font-medium text-accent transition-colors duration-150 ease-standard group-hover/ann:text-accent-hover sm:inline">
            {announcement.cta.title}
          </span>
          <ArrowRight
            aria-hidden
            className="size-3.5 shrink-0 text-accent transition-transform duration-200 ease-out-quart group-hover/ann:translate-x-0.5"
          />
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute top-1/2 right-3 inline-flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-fg-subtle transition-colors duration-150 ease-standard hover:bg-bg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring md:right-6"
        >
          <X aria-hidden className="size-4" />
        </button>
      </div>
    </div>
  );
}
