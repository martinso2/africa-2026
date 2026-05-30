import fs from "fs";
import path from "path";
import type { SafariStop } from "@/data/itinerary";

const publicDir = path.join(process.cwd(), "public");

export function localImageExists(src: string): boolean {
  if (!src.startsWith("/")) return false;
  return fs.existsSync(path.join(publicDir, src));
}

export function resolveImage(localSrc: string, fallbackSrc: string): string {
  return localImageExists(localSrc) ? localSrc : fallbackSrc;
}

export interface ResolvedStopImages {
  heroImage: string;
  galleryImages: string[];
}

export function resolveStopImages(stop: SafariStop): ResolvedStopImages {
  return {
    heroImage: resolveImage(stop.heroImage, stop.placeholderHero),
    galleryImages: stop.galleryImages.map((local, i) =>
      resolveImage(local, stop.placeholderGallery[i] ?? stop.placeholderHero),
    ),
  };
}
