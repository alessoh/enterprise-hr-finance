import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { Article } from "@/content/types";
import { articlePath } from "@/lib/seo/routes";
import { cn, formatDate } from "@/lib/utils";

import { readingLabel } from "./lib";

const linkBase =
  "group/card block h-full rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring";

export interface ArticleCardProps {
  article: Article;
  headingLevel?: "h2" | "h3";
  /** Horizontal layout from lg up, for a card that spans a full row. */
  wide?: boolean;
  className?: string;
}

/** Grid card: category + date, title, description, author and reading time. The whole card is the link. */
export function ArticleCard({ article, headingLevel = "h3", wide = false, className }: ArticleCardProps) {
  const Heading = headingLevel;
  return (
    <Link href={articlePath(article.slug)} className={cn(linkBase, className)}>
      <Card
        as="article"
        interactive
        className={cn(
          "flex h-full flex-col",
          wide && "lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] lg:items-center lg:gap-x-12",
        )}
      >
        <div className={cn(wide && "lg:contents")}>
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">{article.category}</p>
            <time dateTime={article.publishedAt} className="text-[0.8125rem] text-fg-subtle">
              {formatDate(article.publishedAt)}
            </time>
          </div>
          <Heading className={cn("mt-5 text-h5 text-balance", wide && "lg:mt-0 lg:col-start-1")}>
            {article.title}
          </Heading>
        </div>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed text-fg-muted",
            wide ? "lg:mt-0 lg:line-clamp-3" : "line-clamp-3",
          )}
        >
          {article.description}
        </p>
        <div
          className={cn(
            "mt-auto flex items-end justify-between gap-4 pt-6",
            wide && "lg:mt-0 lg:flex-col lg:items-end lg:gap-6 lg:pt-0",
          )}
        >
          <p className="text-[0.8125rem] leading-snug text-fg-muted">
            <span className="font-medium text-fg">{article.author.name}</span>
            <span aria-hidden> · </span>
            <span className="tabular">{readingLabel(article.readingMinutes)}</span>
          </p>
          <ArrowRight
            aria-hidden
            className="mb-0.5 size-4 shrink-0 text-fg-subtle transition-[transform,color] duration-200 ease-out-quart group-hover/card:translate-x-0.5 group-hover/card:text-fg"
          />
        </div>
      </Card>
    </Link>
  );
}

export interface FeaturedArticleCardProps {
  article: Article;
  className?: string;
}

/** Large lead card: serif title, description, author, date, reading time, and the first three takeaways. */
export function FeaturedArticleCard({ article, className }: FeaturedArticleCardProps) {
  const takeaways = article.keyTakeaways.slice(0, 3);
  return (
    <Link
      href={articlePath(article.slug)}
      className={cn(linkBase, "rounded-xl", className)}
      aria-label={`Featured: ${article.title}`}
    >
      <Card
        as="article"
        interactive
        padding="lg"
        className="grid gap-10 rounded-xl lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-0"
      >
        <div className="flex flex-col lg:pr-12">
          <p className="eyebrow flex items-center gap-2">
            <span>Featured</span>
            <span aria-hidden className="text-fg-faint">
              ·
            </span>
            <span>{article.category}</span>
          </p>
          <h2 className="mt-6 font-display text-[2.5rem] leading-[1.08] font-normal tracking-[-0.015em] text-balance [font-optical-sizing:auto] lg:text-[3rem]">
            {article.title}
          </h2>
          <p className="text-lede mt-5 max-w-[58ch] text-pretty">{article.description}</p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-4 pt-8">
            <div className="flex items-center gap-3">
              <Avatar name={article.author.name} size="sm" tone="ink" />
              <p className="text-sm leading-tight">
                <span className="block font-medium text-fg">{article.author.name}</span>
                <span className="mt-0.5 block text-fg-muted">{article.author.role}</span>
              </p>
            </div>
            <p className="text-[0.8125rem] text-fg-subtle">
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              <span aria-hidden> · </span>
              <span className="tabular">{readingLabel(article.readingMinutes)}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
          <p className="eyebrow">In this guide</p>
          <ol className="mt-5 space-y-4">
            {takeaways.map((takeaway, index) => (
              <li key={index} className="flex gap-4 text-sm leading-relaxed text-fg-muted">
                <span className="tabular mt-px shrink-0 font-mono text-xs text-fg-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ol>
          <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-fg lg:mt-auto lg:pt-8">
            Read the guide
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 ease-out-quart group-hover/card:translate-x-0.5"
            />
          </span>
        </div>
      </Card>
    </Link>
  );
}
