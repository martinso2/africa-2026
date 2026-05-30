"use client";

import { useEffect, useRef } from "react";
import L, { type Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { SafariStop } from "@/data/itinerary";
import {
  formatFlightDate,
  getFlightLeg,
  type FlightLeg,
} from "@/data/flights";
import { formatMiles } from "@/lib/geo";
import {
  FlightDateBadge,
  FlightTimeBadge,
} from "@/components/FlightSchedule";

function makeIcon(label: string, color: string) {
  return `<div style="
    background:${color};
    color:white;
    width:28px;height:28px;
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:11px;font-weight:700;
    border:2px solid white;
    box-shadow:0 2px 6px rgba(0,0,0,0.35);
  ">${label}</div>`;
}

function destroyMap(map: Map | null, container: HTMLDivElement | null) {
  if (map) {
    map.remove();
  }
  if (container) {
    container.replaceChildren();
  }
}

export function FlightMapCard({
  flight,
  propertyRoute,
}: {
  flight: FlightLeg;
  propertyRoute: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const distance = formatMiles(
    flight.departure.coordinates,
    flight.arrival.coordinates,
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    destroyMap(mapRef.current, container);
    mapRef.current = null;

    const depLatLng: [number, number] = [
      flight.departure.coordinates.lat,
      flight.departure.coordinates.lon,
    ];
    const arrLatLng: [number, number] = [
      flight.arrival.coordinates.lat,
      flight.arrival.coordinates.lon,
    ];

    const map = L.map(container, {
      scrollWheelZoom: false,
      attributionControl: true,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    L.marker(depLatLng, {
      icon: L.divIcon({
        className: "",
        html: makeIcon("A", "#1a3c34"),
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    })
      .addTo(map)
      .bindPopup(`<strong>${flight.departure.name}</strong>`);

    L.marker(arrLatLng, {
      icon: L.divIcon({
        className: "",
        html: makeIcon("B", "#8b7355"),
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    })
      .addTo(map)
      .bindPopup(`<strong>${flight.arrival.name}</strong>`);

    L.polyline([depLatLng, arrLatLng], {
      color: "#1a3c34",
      weight: 3,
      opacity: 0.75,
      dashArray: "10 8",
    }).addTo(map);

    map.fitBounds(L.latLngBounds([depLatLng, arrLatLng]), { padding: [48, 48] });

    return () => {
      destroyMap(mapRef.current, container);
      mapRef.current = null;
    };
  }, [flight]);

  return (
    <div className="overflow-hidden rounded-2xl border border-safari-sand/80 bg-white shadow-sm">
      <div className="border-b border-safari-sand/60 px-4 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
          Charter Flight
        </p>
        <p className="mt-1 font-serif text-lg text-safari-green">
          {flight.departure.name}{" "}
          <span className="text-safari-charcoal/40">→</span> {flight.arrival.name}
        </p>
        <p className="mt-1 text-sm text-safari-charcoal/60">{propertyRoute}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <FlightDateBadge className="max-w-full">{formatFlightDate(flight.date)}</FlightDateBadge>
          <FlightTimeBadge className="max-w-full flex-wrap">
            {flight.departureTime} – {flight.arrivalTime}
          </FlightTimeBadge>
          <span className="rounded-full bg-safari-sand/40 px-3 py-1 text-xs font-medium text-safari-charcoal">
            {flight.operator}
          </span>
          <span className="rounded-full bg-safari-sand/40 px-3 py-1 text-xs font-medium text-safari-charcoal">
            {flight.duration} · {distance}
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-56 w-full sm:h-72"
        aria-label="Map showing charter flight route"
      />

      <div className="flex flex-wrap gap-4 border-t border-safari-sand/60 px-5 py-3 text-xs text-safari-charcoal/70 sm:px-6">
        <span className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-safari-green text-[10px] font-bold text-white">
            A
          </span>
          {flight.departure.name}
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-safari-warm text-[10px] font-bold text-white">
            B
          </span>
          {flight.arrival.name}
        </span>
      </div>
    </div>
  );
}

interface TripMapProps {
  from: SafariStop;
  to: SafariStop;
}

export default function TripMap({ from, to }: TripMapProps) {
  const flight = getFlightLeg(from.id, to.id);

  if (!flight) {
    return null;
  }

  return (
    <FlightMapCard
      flight={flight}
      propertyRoute={`${from.propertyName} → ${to.propertyName}`}
    />
  );
}
