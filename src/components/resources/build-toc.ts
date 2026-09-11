import GithubSlugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

/** Strips inline markdown so the text matches what rehype-slug sees after parsing. */
function inlineText(source: string): string {
  return source
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(^|\s)[*_](\S.*?\S|\S)[*_](?=\s|$|[.,;:!?])/g, "$1$2")
    .trim();
}

/**
 * Builds a table of contents from ## and ### headings. Ids come from the same
 * github-slugger instance rehype-slug uses, fed every heading level in order so
 * duplicate-heading counters (-1, -2) line up with the rendered ids.
 */
export function buildToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;

  for (const raw of markdown.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length;
    const text = inlineText(match[2]);
    const id = slugger.slug(text);
    if (depth === 2 || depth === 3) items.push({ id, text, depth });
  }

  return items;
}
