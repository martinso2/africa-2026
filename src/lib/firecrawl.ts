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

function extractHighlights(markdown: string): string[] {
  const lines = markdown.split("\n").map((l) => l.trim()).filter(Boolean);
  const bullets = lines
    .filter((l) => /^[-*•]\s/.test(l))
    .map((l) => l.replace(/^[-*•]\s+/, "").slice(0, 120))
    .slice(0, 4);

  if (bullets.length >= 2) return bullets;

  const paragraphs = markdown
    .split(/\n\n+/)
    .map((p) => cleanMarkdown(p))
    .filter((p) => p.length > 40 && p.length < 200);

  return paragraphs.slice(0, 3);
}

function extractExcerpt(markdown: string): string {
  const cleaned = cleanMarkdown(markdown);
  const paragraph = cleaned.split(/\n\n+/).find((p) => p.length > 60) ?? cleaned;
  return paragraph.length > 320 ? `${paragraph.slice(0, 317)}…` : paragraph;
}

export async function getPropertyInsight(
  websiteUrl: string,
  propertyName: string,
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
        maxAge: 86400000,
      }),
      next: { revalidate: 86400 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const markdown: string | undefined = json?.data?.markdown;

    if (!markdown || markdown.length < 50) return null;

    const highlights = extractHighlights(markdown);
    const excerpt = extractExcerpt(markdown);

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
