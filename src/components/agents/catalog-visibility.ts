import type { AgentCategory, AgentStatus } from "@/content/types";

/*
 * The catalog filter never removes cards from the DOM. The client component sets
 * data attributes on a wrapper and these arbitrary variants hide non-matching
 * groups and cards with CSS, so all twelve agents stay in the server HTML.
 * Plain module (no "use client") so server components can import the strings.
 */

export const hideForCategory: Record<AgentCategory, string> = {
  hr: "[[data-filter-category=finance]_&]:hidden [[data-filter-category=legal]_&]:hidden",
  finance: "[[data-filter-category=hr]_&]:hidden [[data-filter-category=legal]_&]:hidden",
  legal: "[[data-filter-category=hr]_&]:hidden [[data-filter-category=finance]_&]:hidden",
};

export const hideForStatus: Record<AgentStatus, string> = {
  ga: "[[data-filter-status=early-access]_&]:hidden",
  "early-access": "[[data-filter-status=ga]_&]:hidden",
};

/** Hides a category group when the status filter leaves it with no cards. */
export const hideWhenEmpty: Record<AgentCategory, string> = {
  hr: "[[data-empty-hr]_&]:hidden",
  finance: "[[data-empty-finance]_&]:hidden",
  legal: "[[data-empty-legal]_&]:hidden",
};
