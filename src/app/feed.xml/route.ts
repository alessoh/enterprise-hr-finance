import { articles } from "@/content/articles";
import { changelog } from "@/content/changelog";
import { meridianShortDescription } from "@/lib/seo/facts";
import { articlePath } from "@/lib/seo/routes";
import { escapeXml, markdownToPlainText } from "@/lib/seo/text";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo/url";

export const revalidate = 3600;

interface FeedItem {
  title: string;
  link: string;
  guid: string;
  date: Date;
  description: string;
  category: string;
  author?: string;
}

function validDate(iso: string): Date | undefined {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function collectItems(): FeedItem[] {
  const items: FeedItem[] = [];

  for (const article of articles) {
    const date = validDate(article.publishedAt);
    if (!date) continue;
    const link = absoluteUrl(articlePath(article.slug));
    items.push({
      title: article.title,
      link,
      guid: link,
      date,
      description: article.description,
      category: article.category,
      author: `${article.author.name}, ${article.author.role}`,
    });
  }

  const changelogUrl = absoluteUrl("/changelog");
  for (const entry of changelog) {
    const date = validDate(entry.date);
    if (!date) continue;
    const link = `${changelogUrl}#${entry.id}`;
    items.push({
      title: `Changelog: ${entry.title}`,
      link,
      guid: link,
      date,
      description: markdownToPlainText(entry.summary),
      category: `changelog/${entry.category}`,
    });
  }

  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
}

function renderItem(item: FeedItem): string {
  return [
    "    <item>",
    `      <title>${escapeXml(item.title)}</title>`,
    `      <link>${escapeXml(item.link)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>`,
    `      <pubDate>${item.date.toUTCString()}</pubDate>`,
    `      <category>${escapeXml(item.category)}</category>`,
    ...(item.author ? [`      <dc:creator>${escapeXml(item.author)}</dc:creator>`] : []),
    `      <description>${escapeXml(item.description)}</description>`,
    "    </item>",
  ].join("\n");
}

export function GET() {
  const items = collectItems();
  const lastBuildDate = (items[0]?.date ?? new Date()).toUTCString();
  const feedUrl = absoluteUrl("/feed.xml");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${escapeXml(siteName)}</title>`,
    `    <link>${escapeXml(`${siteUrl}/`)}</link>`,
    `    <description>${escapeXml(meridianShortDescription)}</description>`,
    "    <language>en-us</language>",
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    "    <ttl>60</ttl>",
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    ...items.map(renderItem),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
