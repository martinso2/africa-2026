import AccommodationCard from "@/components/AccommodationCard";
import PropertySpotlight from "@/components/PropertySpotlight";
import type { SafariStop } from "@/data/itinerary";
import { getPropertyInsight } from "@/lib/firecrawl";

interface AccommodationSectionProps {
  stop: SafariStop;
}

export default async function AccommodationSection({
  stop,
}: AccommodationSectionProps) {
  const insight = stop.websiteUrl
    ? await getPropertyInsight(stop.websiteUrl, stop.propertyName)
    : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-safari-sand/80 bg-white shadow-sm">
      <AccommodationCard stop={stop} embedded />
      {insight && <PropertySpotlight insight={insight} />}
    </div>
  );
}
