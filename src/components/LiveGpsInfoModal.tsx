"use client";

import { useEffect, useState } from "react";
import { setLocationSnapshot, setTrackingState } from "@/lib/liveGps";

export default function LiveGpsInfoModal() {
  const [open, setOpen] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState(
    "Location is currently off. Enable it if you want live trip context.",
  );
  const isTracking = watchId !== null;

  useEffect(() => {
    return () => {
      if (watchId !== null && typeof navigator !== "undefined" && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
      setTrackingState(false);
      setLocationSnapshot(null);
    };
  }, [watchId]);

  function startTracking() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatusMessage("Location is not supported on this browser/device.");
      setTrackingState(false);
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setStatusMessage("Live GPS is on. You can disable this at any time.");
        setTrackingState(true);
        setLocationSnapshot({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: Math.round(position.coords.accuracy),
          updatedAt: new Date().toISOString(),
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setStatusMessage(
            "Location permission was denied. Enable location in browser settings to use Live GPS.",
          );
        } else {
          setStatusMessage(
            "We could not read your location right now. Check signal/GPS and try again.",
          );
        }
        setWatchId(null);
        setTrackingState(false);
        setLocationSnapshot(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 20_000,
        maximumAge: 10_000,
      },
    );

    setWatchId(id);
  }

  function stopTracking() {
    if (watchId !== null && typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
    }
    setWatchId(null);
    setStatusMessage("Location sharing is off.");
    setTrackingState(false);
    setLocationSnapshot(null);
  }

  function handlePrimaryAction() {
    if (isTracking) {
      stopTracking();
    } else {
      startTracking();
    }
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-safari-green shadow-lg shadow-emerald-900/25 transition hover:bg-emerald-300"
      >
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-safari-green" aria-hidden="true" />
        Live GPS
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-safari-charcoal/65 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="live-gps-modal-title"
        >
          <div className="w-full max-w-lg rounded-2xl border border-safari-sand/80 bg-white p-5 shadow-2xl sm:p-6">
            <h3 id="live-gps-modal-title" className="font-serif text-2xl text-safari-green">
              Live GPS guidance
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-safari-charcoal/80">
              Live GPS helps your family quickly see where you are in relation to safari stops,
              airstrips, and transfer points. When enabled, your position appears on the maps for
              easier coordination and timing.
            </p>

            <div className="mt-4 rounded-xl bg-safari-ivory/80 p-3 text-sm text-safari-charcoal/80">
              <p className="font-semibold text-safari-green">How privacy works</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Tracking starts only after you tap Enable in this dialog.</li>
                <li>Location runs only while this app is open on your device.</li>
                <li>If denied, enable location permission in your browser settings.</li>
              </ul>
            </div>

            <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-900">
              {statusMessage}
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-safari-sand/70 px-4 py-2 text-sm font-semibold text-safari-charcoal transition hover:bg-safari-ivory"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={handlePrimaryAction}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-safari-green px-4 py-2 text-sm font-semibold text-safari-ivory transition hover:opacity-90"
              >
                {isTracking ? "Disable Live GPS" : "Enable Live GPS"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
