import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import type { Article } from "@/content/types";
import { articlePath } from "@/lib/seo/routes";
import { cn, formatDate } from "@/lib/utils";

export interface PrevNextProps {
  /** Older article. */
  prev?: Article;
  /** Newer article. */
  next?: Article;
}

function Entry({ article, direction }: { article: Article; direction: "prev" | "next" }) {
  const next = direction === "next";
  return (
    <Link
      href={articlePath(article.slug)}
      rel={next ? "next" : "prev"}
      className={cn(
        "group/pn flex flex-col gap-3 rounded-sm py-8 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ring md:py-10",
        next ? "items-start text-left md:items-end md:pl-10 md:text-right" : "md:pr-10",
      )}
    >
      <span className="eyebrow inline-flex items-center gap-1.5">
        {next ? null : (
          <ArrowLeft
            aria-hidden
            className="size-3.5 transition-transform duration-200 ease-out-quart group-hover/pn:-translate-x-0.5"
          />
        )}
        {next ? "Next" : "Previous"}
        {next ? (
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 ease-out-quart group-hover/pn:translate-x-0.5"
          />
        ) : null}
      </span>
      <span className="text-h5 text-balance text-fg transition-colors duration-150 ease-standard group-hover/pn:text-accent">
        {article.title}
      </span>
      <span className="text-[0.8125rem] text-fg-subtle">
        {article.category}
        <span aria-hidden> · </span>
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      </span>
    </Link>
  );
}

/** Chronological neighbors. Renders nothing when the article has none. */
export function PrevNext({ prev, next }: PrevNextProps) {
  if (!prev && !next) return null;
  return (
    <nav aria-label="More guides" className="border-t border-border">
      <Container>
        <div className="grid md:grid-cols-2 md:divide-x md:divide-border">
          {prev ? <Entry article={prev} direction="prev" /> : <div aria-hidden className="hidden md:block" />}
          {next ? <Entry article={next} direction="next" /> : <div aria-hidden className="hidden md:block" />}
        </div>
      </Container>
    </nav>
  );
}
