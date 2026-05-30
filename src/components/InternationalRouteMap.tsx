"use client";

import { useEffect, useRef } from "react";
import L, { type Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { formatTotalRouteMiles } from "@/lib/geo";

export interface RouteWaypoint {
  code: string;
  name: string;
  lat: number;
  lon: number;
}

const MARKER_COLORS = ["#1a3c34", "#8b7355", "#2d5a4e"];

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
  if (map) map.remove();
  if (container) container.replaceChildren();
}

interface InternationalRouteMapProps {
  waypoints: RouteWaypoint[];
  routeLabel: string;
  legDistances?: string[];
}

export default function InternationalRouteMap({
  waypoints,
  routeLabel,
  legDistances,
}: InternationalRouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || waypoints.length < 2) return;

    destroyMap(mapRef.current, container);
    mapRef.current = null;

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

    const latLngs: [number, number][] = waypoints.map((w) => [w.lat, w.lon]);

    waypoints.forEach((point, i) => {
      const label = String.fromCharCode(65 + i);
      L.marker([point.lat, point.lon], {
        icon: L.divIcon({
          className: "",
          html: makeIcon(label, MARKER_COLORS[i % MARKER_COLORS.length]),
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      })
        .addTo(map)
        .bindPopup(`<strong>${point.name}</strong>`);
    });

    for (let i = 0; i < latLngs.length - 1; i++) {
      L.polyline([latLngs[i], latLngs[i + 1]], {
        color: "#1a3c34",
        weight: 3,
        opacity: 0.75,
        dashArray: "10 8",
      }).addTo(map);
    }

    map.fitBounds(L.latLngBounds(latLngs), { padding: [48, 48] });

    return () => {
      destroyMap(mapRef.current, container);
      mapRef.current = null;
    };
  }, [waypoints]);

  const totalMiles = formatTotalRouteMiles(waypoints);

  return (
    <div className="overflow-hidden rounded-2xl border border-safari-sand/80 bg-white shadow-sm">
      <div className="border-b border-safari-sand/60 px-5 py-3 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
          Flight Route
        </p>
        <p className="mt-1 font-serif text-lg text-safari-green">{routeLabel}</p>
        <p className="mt-1 text-sm text-safari-charcoal/60">{totalMiles}</p>
        {legDistances && legDistances.length > 0 && (
          <p className="mt-1 text-xs text-safari-charcoal/50">
            {legDistances.join(" · ")}
          </p>
        )}
      </div>
      <div
        ref={containerRef}
        className="h-64 w-full sm:h-80"
        aria-label={`Map showing flight route: ${routeLabel}`}
      />
      <div className="flex flex-wrap gap-4 border-t border-safari-sand/60 px-5 py-3 text-xs text-safari-charcoal/70 sm:px-6">
        {waypoints.map((point, i) => (
          <span key={point.code} className="flex items-center gap-2">
            <span
              className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ background: MARKER_COLORS[i % MARKER_COLORS.length] }}
            >
              {String.fromCharCode(65 + i)}
            </span>
            {point.name}
          </span>
        ))}
      </div>
    </div>
  );
}
