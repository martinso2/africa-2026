"use client";

import dynamic from "next/dynamic";
import type { FlightLeg } from "@/data/flights";
import type { SafariStop } from "@/data/itinerary";

const TripMap = dynamic(() => import("@/components/TripMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-56 items-center justify-center rounded-2xl border border-safari-sand/80 bg-safari-ivory/50 sm:h-72">
      <p className="text-sm text-safari-charcoal/50">Loading map…</p>
    </div>
  ),
});

const FlightMapCard = dynamic(
  () => import("@/components/TripMap").then((m) => m.FlightMapCard),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-56 items-center justify-center rounded-2xl border border-safari-sand/80 bg-safari-ivory/50 sm:h-72">
        <p className="text-sm text-safari-charcoal/50">Loading map…</p>
      </div>
    ),
  },
);

interface TripMapSectionProps {
  from: SafariStop;
  to: SafariStop;
}

export function TripMapSection({ from, to }: TripMapSectionProps) {
  return <TripMap from={from} to={to} />;
}

interface FlightMapSectionProps {
  flight: FlightLeg;
  propertyRoute: string;
}

export function FlightMapSection({ flight, propertyRoute }: FlightMapSectionProps) {
  return <FlightMapCard flight={flight} propertyRoute={propertyRoute} />;
}
