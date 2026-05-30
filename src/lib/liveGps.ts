export const GPS_TRACKING_STORAGE_KEY = "africa2026:gps-tracking";
export const GPS_TRACKING_EVENT = "africa2026:gps-tracking-changed";
export const GPS_LOCATION_STORAGE_KEY = "africa2026:gps-location";
export const GPS_LOCATION_EVENT = "africa2026:gps-location-changed";

export interface LiveGpsSnapshot {
  lat: number;
  lon: number;
  accuracy: number;
  updatedAt: string;
}

export function setTrackingState(isTracking: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GPS_TRACKING_STORAGE_KEY, isTracking ? "on" : "off");
  } catch {
    // Ignore storage failures (private mode, storage blocked).
  }

  window.dispatchEvent(
    new CustomEvent(GPS_TRACKING_EVENT, {
      detail: { tracking: isTracking },
    }),
  );
}

export function readTrackingState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(GPS_TRACKING_STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

export function setLocationSnapshot(snapshot: LiveGpsSnapshot | null) {
  if (typeof window === "undefined") return;

  try {
    if (snapshot) {
      localStorage.setItem(GPS_LOCATION_STORAGE_KEY, JSON.stringify(snapshot));
    } else {
      localStorage.removeItem(GPS_LOCATION_STORAGE_KEY);
    }
  } catch {
    // Ignore storage failures.
  }

  window.dispatchEvent(
    new CustomEvent(GPS_LOCATION_EVENT, {
      detail: { snapshot },
    }),
  );
}

export function readLocationSnapshot(): LiveGpsSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(GPS_LOCATION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LiveGpsSnapshot;
    if (
      typeof parsed.lat !== "number" ||
      typeof parsed.lon !== "number" ||
      typeof parsed.accuracy !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
