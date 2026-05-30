import type { SafariStop } from "@/data/itinerary";
import type { ResolvedStopImages } from "@/lib/local-images";
import SafariImage from "@/components/SafariImage";
import { getHeroFallback, getHeroImage } from "@/lib/images";
import { formatDateRange } from "@/lib/dates";

interface StopCardProps {
  stop: SafariStop;
  resolvedImages: ResolvedStopImages;
  label: string;
  variant: "current" | "upcoming";
}

export default function StopCard({
  stop,
  resolvedImages,
  label,
  variant,
}: StopCardProps) {
  const isCurrent = variant === "current";
  const heroSrc = getHeroImage(stop, resolvedImages);
  const heroFallback = getHeroFallback(stop);

  return (
    <article
      className={`overflow-hidden rounded-2xl border shadow-sm ${
        isCurrent
          ? "border-safari-green/30 bg-white ring-2 ring-safari-green/20"
          : "border-safari-sand bg-safari-ivory/50"
      }`}
    >
      <div className="relative h-40 overflow-hidden sm:h-48">
        {stop.heroVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroSrc}
            className="h-full w-full object-cover"
            aria-label={`${stop.propertyName} video tour`}
          >
            <source src={stop.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <SafariImage
            src={heroSrc}
            fallbackSrc={heroFallback}
            alt={stop.propertyName}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
            isCurrent
              ? "bg-safari-green text-safari-ivory"
              : "bg-safari-sand text-safari-charcoal"
          }`}
        >
          {label}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl text-safari-green">{stop.propertyName}</h3>
        <p className="mt-1 text-sm text-safari-charcoal/70">{stop.location}</p>
        <p className="mt-3 text-sm font-medium text-safari-charcoal">
          {formatDateRange(stop.checkIn, stop.checkOut)}
        </p>
        <p className="mt-1 text-sm text-safari-charcoal/60">
          {stop.nights} {stop.nights === 1 ? "night" : "nights"}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-safari-charcoal/80">
          {stop.description}
        </p>
      </div>
    </article>
  );
}
