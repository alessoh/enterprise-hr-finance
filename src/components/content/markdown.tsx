import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Link from "next/link";

import { cn } from "@/lib/utils";

type MarkdownProps = {
  children: string;
  className?: string;
  /** Use "compact" for short blurbs (agent descriptions, glossary), "article" for long-form. */
  variant?: "article" | "compact";
};

const components: Components = {
  a: ({ href, children, ...rest }) => {
    const url = href ?? "#";
    const external = /^https?:\/\//.test(url);
    if (external) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={url} {...rest}>
        {children}
      </Link>
    );
  },
  table: ({ children, ...rest }) => (
    <div className="overflow-x-auto">
      <table {...rest}>{children}</table>
    </div>
  ),
};

/**
 * Renders trusted, first-party markdown from src/content with the .prose-meridian typography.
 * Content is authored in-repo, so raw HTML is not enabled and no sanitizer is needed.
 */
export function Markdown({ children, className, variant = "article" }: MarkdownProps) {
  return (
    <div
      className={cn(
        "prose-meridian",
        variant === "compact" && "prose-meridian-compact",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
