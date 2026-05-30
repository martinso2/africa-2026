import type { SafariStop } from "@/data/itinerary";
import type { ResolvedStopImages } from "@/lib/local-images";

export function getHeroImage(
  stop: SafariStop,
  resolved?: ResolvedStopImages,
): string {
  return resolved?.heroImage ?? stop.placeholderHero;
}

export function getHeroFallback(stop: SafariStop): string {
  return stop.placeholderHero;
}

export function getGalleryImages(
  stop: SafariStop,
  resolved?: ResolvedStopImages,
): { src: string; fallback: string }[] {
  const gallery = resolved?.galleryImages ?? stop.placeholderGallery;

  return gallery.map((src, i) => ({
    src,
    fallback: stop.placeholderGallery[i] ?? stop.placeholderHero,
  }));
}
