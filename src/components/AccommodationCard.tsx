"use client";

import { useState } from "react";
import type { SafariStop } from "@/data/itinerary";
import { formatDateRange } from "@/lib/dates";
import { getGalleryImages, getHeroFallback, getHeroImage } from "@/lib/images";

interface AccommodationCardProps {
  stop: SafariStop;
  embedded?: boolean;
}

function SafariImage({
  src,
  fallback,
  alt,
  className,
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallback)}
    />
  );
}

export default function AccommodationCard({
  stop,
  embedded = false,
}: AccommodationCardProps) {
  const [showGallery, setShowGallery] = useState(false);
  const gallery = getGalleryImages(stop);

  return (
    <article
      id={stop.id}
      className={`scroll-mt-24 overflow-hidden ${
        embedded ? "" : "rounded-2xl border border-safari-sand/80 bg-white shadow-sm"
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
        <SafariImage
          src={getHeroImage(stop)}
          fallback={getHeroFallback(stop)}
          alt={stop.propertyName}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 sm:p-6">
          <h3 className="font-serif text-2xl text-white sm:text-3xl">
            {stop.propertyName}
          </h3>
          <p className="mt-1 text-sm text-white/85">{stop.location}</p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm">
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

        <div className="mt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
            Gallery Preview
          </p>
          <div className="grid grid-cols-3 gap-2">
            {gallery.map((img, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-xl bg-safari-sand/30"
              >
                <SafariImage
                  src={img.src}
                  fallback={img.fallback}
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
            {[getHeroFallback(stop), ...stop.placeholderGallery].map((src, i) => (
              <div
                key={i}
                className="aspect-[4/3] overflow-hidden rounded-xl bg-safari-sand/20"
              >
                <SafariImage
                  src={gallery[i]?.src ?? src}
                  fallback={src}
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
