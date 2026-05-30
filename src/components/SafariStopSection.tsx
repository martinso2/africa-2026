import { type ReactNode } from "react";
import AccommodationCard from "@/components/AccommodationCard";
import PropertySpotlight from "@/components/PropertySpotlight";
import OutboundFlightPanel from "@/components/OutboundFlightPanel";
import WeatherCard from "@/components/WeatherCard";
import NotesSection from "@/components/NotesSection";
import { getOutboundFlight } from "@/data/flights";
import type { SafariStop } from "@/data/itinerary";
import { formatDateRange } from "@/lib/dates";
import { getPropertyInsight } from "@/lib/firecrawl";
import { resolveStopImages } from "@/lib/local-images";
import type { WeatherData } from "@/lib/weather";

interface SafariStopSectionProps {
  stop: SafariStop;
  weather: WeatherData;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
      {children}
    </p>
  );
}

export default async function SafariStopSection({
  stop,
  weather,
}: SafariStopSectionProps) {
  const insight = stop.websiteUrl
    ? await getPropertyInsight(
        stop.websiteUrl,
        stop.propertyName,
        stop.spotlightHighlights ?? [],
      )
    : null;
  const outboundFlight = getOutboundFlight(stop.id);
  const resolvedImages = resolveStopImages(stop);

  return (
    <section id={stop.id} className="scroll-mt-24">
      <header className="mb-6 border-b border-safari-sand/60 pb-4">
        <h2 className="font-serif text-xl text-safari-green sm:text-3xl">
          {stop.propertyName}
        </h2>
        <p className="mt-1 text-safari-charcoal/70">{stop.location}</p>
        <p className="mt-2 text-sm font-semibold leading-snug text-safari-charcoal sm:leading-normal">
          {formatDateRange(stop.checkIn, stop.checkOut)} ·{" "}
          {stop.nights} {stop.nights === 1 ? "night" : "nights"}
        </p>
      </header>

      <div className="space-y-8">
        <div>
          <SectionLabel>Accommodation</SectionLabel>
          <div className="overflow-hidden rounded-2xl border border-safari-sand/80 bg-white shadow-sm">
            <AccommodationCard
              stop={stop}
              resolvedImages={resolvedImages}
              embedded
              hideId
            />
            {insight && <PropertySpotlight insight={insight} />}
          </div>
        </div>

        {outboundFlight && (
          <div>
            <SectionLabel>Charter Flight Out</SectionLabel>
            <OutboundFlightPanel flight={outboundFlight} fromStop={stop} />
          </div>
        )}

        <div>
          <SectionLabel>Weather</SectionLabel>
          <WeatherCard stopName={stop.propertyName} weather={weather} />
        </div>

        <div>
          <SectionLabel>Packing &amp; Photography</SectionLabel>
          <NotesSection stop={stop} />
        </div>
      </div>
    </section>
  );
}
