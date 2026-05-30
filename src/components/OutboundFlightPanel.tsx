import StopCard from "@/components/StopCard";
import DepartureCard from "@/components/DepartureCard";
import { FlightMapSection } from "@/components/TripMapSection";
import type { FlightLeg } from "@/data/flights";
import { ITINERARY, type SafariStop } from "@/data/itinerary";
import { resolveStopImages } from "@/lib/local-images";

interface OutboundFlightPanelProps {
  flight: FlightLeg;
  fromStop: SafariStop;
}

export default function OutboundFlightPanel({
  flight,
  fromStop,
}: OutboundFlightPanelProps) {
  const toStop =
    flight.toStopId === "departure"
      ? null
      : ITINERARY.find((s) => s.id === flight.toStopId);

  const propertyRoute = toStop
    ? `${fromStop.propertyName} → ${toStop.propertyName}`
    : `${fromStop.propertyName} → Homeward`;

  const fromImages = resolveStopImages(fromStop);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <StopCard
          stop={fromStop}
          resolvedImages={fromImages}
          label="Departing From"
          variant="current"
        />
        {toStop ? (
          <StopCard
            stop={toStop}
            resolvedImages={resolveStopImages(toStop)}
            label="Arriving At"
            variant="upcoming"
          />
        ) : (
          <DepartureCard flight={flight} />
        )}
      </div>
      <FlightMapSection flight={flight} propertyRoute={propertyRoute} />
    </div>
  );
}
