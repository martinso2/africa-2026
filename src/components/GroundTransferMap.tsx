"use client";

import { useEffect, useRef, useState } from "react";
import L, { type Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { GroundTransfer } from "@/data/groundTransfers";
import { formatInternationalDate } from "@/data/internationalFlights";
import { formatMiles } from "@/lib/geo";

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

interface GroundTransferMapProps {
  transfer: GroundTransfer;
}

export default function GroundTransferMap({ transfer }: GroundTransferMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const [driveTime, setDriveTime] = useState<string | null>(null);
  const [driveDistance, setDriveDistance] = useState<string | null>(null);

  const straightLineMiles = formatMiles(
    transfer.from.coordinates,
    transfer.to.coordinates,
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    destroyMap(mapRef.current, container);
    mapRef.current = null;
    routeLayerRef.current = null;

    const fromLatLng: [number, number] = [
      transfer.from.coordinates.lat,
      transfer.from.coordinates.lon,
    ];
    const toLatLng: [number, number] = [
      transfer.to.coordinates.lat,
      transfer.to.coordinates.lon,
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

    L.marker(fromLatLng, {
      icon: L.divIcon({
        className: "",
        html: makeIcon("A", "#1a3c34"),
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    })
      .addTo(map)
      .bindPopup(`<strong>${transfer.from.detail ?? transfer.from.name}</strong>`);

    L.marker(toLatLng, {
      icon: L.divIcon({
        className: "",
        html: makeIcon("B", "#8b7355"),
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    })
      .addTo(map)
      .bindPopup(`<strong>${transfer.to.name}</strong>`);

    const fallbackLine = L.polyline([fromLatLng, toLatLng], {
      color: "#1a3c34",
      weight: 3,
      opacity: 0.35,
      dashArray: "6 6",
    }).addTo(map);

    map.fitBounds(L.latLngBounds([fromLatLng, toLatLng]), { padding: [48, 48] });

    const { lon: lon1, lat: lat1 } = transfer.from.coordinates;
    const { lon: lon2, lat: lat2 } = transfer.to.coordinates;
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`;

    let cancelled = false;

    fetch(osrmUrl)
      .then((res) => res.json())
      .then((data: {
        routes?: { duration: number; distance: number; geometry: { coordinates: [number, number][] } }[];
      }) => {
        if (cancelled || !mapRef.current) return;

        const route = data.routes?.[0];
        if (!route) return;

        const coords = route.geometry.coordinates.map(
          ([lon, lat]) => [lat, lon] as [number, number],
        );

        map.removeLayer(fallbackLine);

        routeLayerRef.current = L.polyline(coords, {
          color: "#1a3c34",
          weight: 4,
          opacity: 0.85,
        }).addTo(map);

        map.fitBounds(routeLayerRef.current.getBounds(), { padding: [48, 48] });

        const minutes = Math.max(1, Math.round(route.duration / 60));
        const miles = Math.round((route.distance / 1000) * 0.621371);
        setDriveTime(`${minutes} min`);
        setDriveDistance(`${miles} mi`);
      })
      .catch(() => {
        /* keep fallback line and estimate */
      });

    return () => {
      cancelled = true;
      destroyMap(mapRef.current, container);
      mapRef.current = null;
      routeLayerRef.current = null;
    };
  }, [transfer]);

  const displayDriveTime = driveTime ?? transfer.driveTimeEstimate;
  const displayDistance = driveDistance ?? straightLineMiles;

  return (
    <article className="overflow-hidden rounded-2xl border border-safari-sand/80 bg-white shadow-sm">
      <div className="border-b border-safari-sand/60 px-5 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
          Ground Transfer
        </p>
        <p className="mt-1 font-serif text-lg text-safari-green">{transfer.label}</p>
        <p className="mt-1 text-sm text-safari-charcoal/60">
          {formatInternationalDate(transfer.date)} · By car
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-safari-green/10 px-3 py-1 text-xs font-medium text-safari-green">
            {displayDriveTime} drive
          </span>
          <span className="rounded-full bg-safari-sand/40 px-3 py-1 text-xs font-medium text-safari-charcoal">
            {displayDistance}
          </span>
        </div>
      </div>

      <div className="border-b border-safari-sand/60 p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
              Arrive
            </p>
            <p className="mt-1 font-serif text-lg text-safari-charcoal">
              {transfer.from.name}
            </p>
            <p className="text-sm text-safari-charcoal/70">{transfer.from.subtitle}</p>
            {transfer.from.detail && (
              <p className="mt-1 text-xs text-safari-charcoal/50">{transfer.from.detail}</p>
            )}
            {transfer.from.time && (
              <p className="mt-2 text-sm font-semibold text-safari-green">
                {transfer.from.time}
              </p>
            )}
          </div>

          <div className="hidden text-center text-2xl text-safari-charcoal/30 sm:block">
            🚗
          </div>

          <div className="sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
              Hotel
            </p>
            <p className="mt-1 font-serif text-lg text-safari-charcoal">{transfer.to.name}</p>
            <p className="text-sm text-safari-charcoal/70">{transfer.to.subtitle}</p>
            {transfer.to.detail && (
              <p className="mt-1 text-xs text-safari-charcoal/50">{transfer.to.detail}</p>
            )}
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-56 w-full sm:h-72"
        aria-label="Map showing drive from Nairobi airport to Hemingways Hotel"
      />

      <div className="flex flex-wrap gap-4 border-t border-safari-sand/60 px-5 py-3 text-xs text-safari-charcoal/70 sm:px-6">
        <span className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-safari-green text-[10px] font-bold text-white">
            A
          </span>
          {transfer.from.detail ?? transfer.from.name}
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-safari-warm text-[10px] font-bold text-white">
            B
          </span>
          {transfer.to.name}
        </span>
      </div>

      {transfer.notes && (
        <p className="border-t border-safari-sand/60 px-5 py-3 text-xs text-safari-charcoal/50 sm:px-6">
          {transfer.notes}
        </p>
      )}
    </article>
  );
}
