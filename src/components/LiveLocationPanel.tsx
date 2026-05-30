"use client";

import { useMemo, useState } from "react";
import type { SafariStop } from "@/data/itinerary";
import { haversineDistanceKm, toMiles } from "@/lib/geo";

interface LiveLocationPanelProps {
  stops: SafariStop[];
}

type PermissionState = "idle" | "tracking" | "error" | "unsupported";

interface PositionState {
  lat: number;
  lon: number;
  accuracy: number;
  updatedAt: Date;
}

const GPS_TRACKING_STORAGE_KEY = "africa2026:gps-tracking";
const GPS_TRACKING_EVENT = "africa2026:gps-tracking-changed";

function setTrackingBroadcast(isTracking: boolean) {
  try {
    localStorage.setItem(GPS_TRACKING_STORAGE_KEY, isTracking ? "on" : "off");
  } catch {
    // Ignore storage failures (private mode or blocked storage).
  }
  window.dispatchEvent(
    new CustomEvent(GPS_TRACKING_EVENT, {
      detail: { tracking: isTracking },
    }),
  );
}

export default function LiveLocationPanel({ stops }: LiveLocationPanelProps) {
  const [permissionState, setPermissionState] = useState<PermissionState>("idle");
  const [position, setPosition] = useState<PositionState | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const nearestStop = useMemo(() => {
    if (!position) return null;

    let winner: SafariStop | null = null;
    let bestKm = Number.POSITIVE_INFINITY;
    for (const stop of stops) {
      const km = haversineDistanceKm(
        { lat: position.lat, lon: position.lon },
        stop.coordinates,
      );
      if (km < bestKm) {
        bestKm = km;
        winner = stop;
      }
    }

    if (!winner) return null;
    return {
      stop: winner,
      miles: toMiles(bestKm),
    };
  }, [position, stops]);

  function stopTracking() {
    if (watchId !== null && typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
    }
    setWatchId(null);
    setPermissionState("idle");
    setTrackingBroadcast(false);
  }

  function startTracking() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setPermissionState("unsupported");
      setErrorMessage("Geolocation is not supported on this device/browser.");
      setTrackingBroadcast(false);
      return;
    }

    setErrorMessage("");
    const id = navigator.geolocation.watchPosition(
      (p) => {
        setPosition({
          lat: p.coords.latitude,
          lon: p.coords.longitude,
          accuracy: Math.round(p.coords.accuracy),
          updatedAt: new Date(),
        });
        setPermissionState("tracking");
        setTrackingBroadcast(true);
      },
      (err) => {
        setPermissionState("error");
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMessage("Location permission denied. Enable it in browser settings.");
        } else if (err.code === err.TIMEOUT) {
          setErrorMessage("Location request timed out. Try again outdoors.");
        } else {
          setErrorMessage("Unable to read location right now.");
        }
        setTrackingBroadcast(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 20_000,
        maximumAge: 10_000,
      },
    );

    setWatchId(id);
  }

  const isTracking = permissionState === "tracking";

  return (
    <article className="rounded-xl bg-safari-sand/25 p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-safari-charcoal/55">
          Live GPS
        </p>
        <button
          type="button"
          onClick={isTracking ? stopTracking : startTracking}
          className="rounded-full bg-safari-green px-3 py-1 text-xs font-semibold text-safari-ivory transition hover:opacity-90"
        >
          {isTracking ? "Stop" : "Enable"}
        </button>
      </div>

      <p className="mt-2 text-sm text-safari-charcoal/80">
        {isTracking
          ? "Tracking your live location while this app is open."
          : "Tap Enable to share your location in this app."}
      </p>

      {position && (
        <div className="mt-3 space-y-1 text-sm text-safari-charcoal/75">
          <p>
            You: {position.lat.toFixed(4)}, {position.lon.toFixed(4)}
          </p>
          <p>Accuracy: ~{position.accuracy} m</p>
          <p>Updated: {position.updatedAt.toLocaleTimeString()}</p>
        </div>
      )}

      {nearestStop && (
        <div className="mt-3 rounded-lg bg-white/80 px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-safari-charcoal/55">
            Nearest Stop
          </p>
          <p className="font-serif text-lg text-safari-green">
            {nearestStop.stop.propertyName}
          </p>
          <p className="text-sm text-safari-charcoal/75">
            About {nearestStop.miles.toLocaleString()} miles away
          </p>
        </div>
      )}

      {(permissionState === "error" || permissionState === "unsupported") && (
        <p className="mt-3 text-sm font-semibold text-amber-700">{errorMessage}</p>
      )}
    </article>
  );
}
