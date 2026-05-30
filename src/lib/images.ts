import type { SafariStop } from "@/data/itinerary";

export function getHeroImage(stop: SafariStop): string {
  return stop.heroImage;
}

export function getHeroFallback(stop: SafariStop): string {
  return stop.placeholderHero;
}

export function getGalleryImages(stop: SafariStop): { src: string; fallback: string }[] {
  return stop.galleryImages.map((src, i) => ({
    src,
    fallback: stop.placeholderGallery[i] ?? stop.placeholderHero,
  }));
}
