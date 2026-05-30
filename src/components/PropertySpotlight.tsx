import type { PropertyInsight } from "@/lib/firecrawl";

interface PropertySpotlightProps {
  insight: PropertyInsight;
}

export default function PropertySpotlight({ insight }: PropertySpotlightProps) {
  return (
    <div className="border-t border-safari-sand/60 bg-safari-ivory/40 px-4 py-4 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-safari-green">
          Property Spotlight
        </p>
        {insight.isLive && (
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
            Live via Firecrawl
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-safari-charcoal/85">
        {insight.excerpt}
      </p>

      {insight.highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {insight.highlights.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm text-safari-charcoal/75"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-safari-green" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <a
        href={insight.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-safari-green hover:underline"
      >
        Visit property website
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
