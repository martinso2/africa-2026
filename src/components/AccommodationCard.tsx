"use client";

import { useState } from "react";
import type { SafariStop } from "@/data/itinerary";
import SafariImage from "@/components/SafariImage";
import AccommodationHero from "@/components/AccommodationHero";
import { formatDateRange } from "@/lib/dates";
import type { ResolvedStopImages } from "@/lib/local-images";
import { getGalleryImages, getHeroImage } from "@/lib/images";

interface AccommodationCardProps {
  stop: SafariStop;
  resolvedImages: ResolvedStopImages;
  embedded?: boolean;
  hideId?: boolean;
}

export default function AccommodationCard({
  stop,
  resolvedImages,
  embedded = false,
  hideId = false,
}: AccommodationCardProps) {
  const [showGallery, setShowGallery] = useState(false);
  const gallery = getGalleryImages(stop, resolvedImages);
  const heroSrc = getHeroImage(stop, resolvedImages);
  const expandedImages = [
    heroSrc,
    ...resolvedImages.galleryImages,
  ].map((src, i) => ({
    src,
    fallback:
      i === 0
        ? stop.placeholderHero
        : (stop.placeholderGallery[i - 1] ?? stop.placeholderHero),
  }));

  return (
    <article
      id={hideId ? undefined : stop.id}
      className={`scroll-mt-24 overflow-hidden ${
        embedded ? "" : "rounded-2xl border border-safari-sand/80 bg-white shadow-sm"
      }`}
    >
      <AccommodationHero stop={stop} resolvedImages={resolvedImages} />

      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
          <span className="rounded-full bg-safari-green/10 px-3 py-1 font-medium text-safari-green">
            {formatDateRange(stop.checkIn, stop.checkOut)}
          </span>
          <span className="text-safari-charcoal/60">
            {stop.nights} {stop.nights === 1 ? "night" : "nights"}
          </span>
        </div>

        <p className="mt-4 leading-relaxed text-safari-charcoal/80">
          {stop.description}
        </p>

        {stop.campHistory && (
          <div className="mt-5 rounded-xl border border-safari-sand/60 bg-safari-ivory/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-safari-green">
              History
            </p>
            <p className="mt-2 text-sm leading-relaxed text-safari-charcoal/80">
              {stop.campHistory}
            </p>
          </div>
        )}

        {stop.wildlifeKnownFor && stop.wildlifeKnownFor.length > 0 && (
          <div className="mt-4 rounded-xl border border-safari-sand/60 bg-safari-ivory/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-safari-green">
              Wildlife to Watch For
            </p>
            <ul className="mt-2 space-y-2">
              {stop.wildlifeKnownFor.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-safari-charcoal/80"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-safari-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
            Gallery Preview
          </p>
          <div
            className={`grid gap-2 ${
              gallery.length > 3 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"
            }`}
          >
            {gallery.map((img, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-xl bg-safari-sand/30"
              >
                <SafariImage
                  src={img.src}
                  fallbackSrc={img.fallback}
                  alt={`${stop.propertyName} photo ${i + 1}`}
                  className="h-full w-full object-cover transition hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowGallery(!showGallery)}
          className="mt-5 w-full rounded-xl border border-safari-green/30 py-3 text-sm font-semibold text-safari-green transition hover:bg-safari-green/5 sm:w-auto sm:px-6"
        >
          {showGallery ? "Hide Photos" : "View More Photos"}
        </button>

        {showGallery && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {stop.heroVideo && (
              <div className="col-span-full overflow-hidden rounded-xl bg-safari-sand/20">
                <video
                  controls
                  playsInline
                  poster={heroSrc}
                  className="aspect-video w-full object-cover"
                  aria-label={`${stop.propertyName} property video`}
                >
                  <source src={stop.heroVideo} type="video/mp4" />
                </video>
              </div>
            )}
            {expandedImages.map((img, i) => (
              <div
                key={i}
                className="aspect-[4/3] overflow-hidden rounded-xl bg-safari-sand/20"
              >
                <SafariImage
                  src={img.src}
                  fallbackSrc={img.fallback}
                  alt={`${stop.propertyName} gallery ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            <p className="col-span-full text-xs text-safari-charcoal/50">
              Drop your photos into{" "}
              <code className="rounded bg-safari-sand/40 px-1.5 py-0.5">
                public{stop.photoFolder}
              </code>{" "}
              to replace placeholders.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
