export interface PropertyInsight {
  title: string;
  excerpt: string;
  highlights: string[];
  sourceUrl: string;
  isLive: boolean;
}

function cleanMarkdown(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isJunkContent(text: string): boolean {
  const cleaned = cleanMarkdown(text).trim();
  if (cleaned.length < 25) return true;
  if (/(\]\(|!\[|\[.*\]\(|https?:\/\/|www\.)/i.test(text)) return true;
  if (/menu|dropdown|cookie|subscribe|sign up|follow us|read more/i.test(cleaned)) {
    return true;
  }
  if (/our collection|view all|book now|check availability/i.test(cleaned)) {
    return true;
  }
  // Site-wide nav links to sibling properties in the Hemingways collection
  if (/hemingways (eden|retreat|ol seki)/i.test(cleaned)) return true;
  if (/\b(eden residence|retreat kigali|ol seki mara|naboisho conservancy|kigali, rwanda)\b/i.test(cleaned)) {
    return true;
  }
  return false;
}

function extractHighlights(
  markdown: string,
  fallbackHighlights: string[] = [],
): string[] {
  const lines = markdown.split("\n").map((l) => l.trim()).filter(Boolean);

  const bullets = lines
    .filter((l) => /^[-*•]\s/.test(l))
    .map((l) => cleanMarkdown(l.replace(/^[-*•]\s+/, "")).slice(0, 120))
    .filter((l) => !isJunkContent(l));

  if (bullets.length >= 2) return bullets.slice(0, 4);

  const paragraphs = markdown
    .split(/\n\n+/)
    .map((p) => cleanMarkdown(p))
    .filter((p) => p.length > 40 && p.length < 200 && !isJunkContent(p));

  if (paragraphs.length >= 2) return paragraphs.slice(0, 3);

  return fallbackHighlights.slice(0, 4);
}

function extractExcerpt(markdown: string, propertyName: string): string {
  const cleaned = cleanMarkdown(markdown);
  const paragraph =
    cleaned
      .split(/\n\n+/)
      .map((p) => p.trim())
      .find((p) => p.length > 60 && !isJunkContent(p)) ?? cleaned;

  if (isJunkContent(paragraph)) {
    return `Discover ${propertyName} — visit the property website for details.`;
  }

  return paragraph.length > 320 ? `${paragraph.slice(0, 317)}…` : paragraph;
}

export async function getPropertyInsight(
  websiteUrl: string,
  propertyName: string,
  fallbackHighlights: string[] = [],
): Promise<PropertyInsight | null> {
  const apiKey = process.env.FIRECRAWL_API_KEY;

  if (!apiKey || apiKey.startsWith("fc-your_")) {
    return null;
  }

  try {
    const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url: websiteUrl,
        formats: ["markdown"],
        onlyMainContent: true,
        excludeTags: ["nav", "header", "footer", "aside"],
        maxAge: 86400000,
      }),
      next: { revalidate: 86400 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const markdown: string | undefined = json?.data?.markdown;

    if (!markdown || markdown.length < 50) return null;

    const highlights = extractHighlights(markdown, fallbackHighlights);
    const excerpt = extractExcerpt(markdown, propertyName);

    return {
      title: json?.data?.metadata?.title ?? propertyName,
      excerpt,
      highlights,
      sourceUrl: websiteUrl,
      isLive: true,
    };
  } catch {
    return null;
  }
}
