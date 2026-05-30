import type { SafariStop } from "@/data/itinerary";
import type { ResolvedStopImages } from "@/lib/local-images";
import SafariImage from "@/components/SafariImage";
import { getHeroFallback, getHeroImage } from "@/lib/images";

interface AccommodationHeroProps {
  stop: SafariStop;
  resolvedImages: ResolvedStopImages;
}

export default function AccommodationHero({
  stop,
  resolvedImages,
}: AccommodationHeroProps) {
  const poster = getHeroImage(stop, resolvedImages);
  const posterFallback = getHeroFallback(stop);

  if (stop.heroVideo) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="h-full w-full object-cover"
          aria-label={`${stop.propertyName} video tour`}
        >
          <source src={stop.heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 sm:p-6">
          <h3 className="font-serif text-2xl text-white sm:text-3xl">
            {stop.propertyName}
          </h3>
          <p className="mt-1 text-sm text-white/85">{stop.location}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
      <SafariImage
        src={poster}
        fallbackSrc={posterFallback}
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
  );
}
