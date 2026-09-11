import { articles, getArticle } from "@/content/articles";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og";

export const alt = "Meridian article";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return renderOgImage({ eyebrow: "Article", title: "Meridian resources" });
  }
  return renderOgImage({
    eyebrow: article.category || "Article",
    title: article.title,
    description: article.description,
    footer: `${article.author.name}, ${article.readingMinutes} min read`,
  });
}
