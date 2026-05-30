import { ITINERARY, TRIP, type SafariStop } from "@/data/itinerary";

export function formatDateRange(checkIn: string, checkOut: string): string {
  const inDate = new Date(`${checkIn}T12:00:00`);
  const outDate = new Date(`${checkOut}T12:00:00`);
  const inStr = inDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const outStr = outDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return `${inStr} – ${outStr}`;
}

export function formatShortDate(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getCurrentStop(referenceDate = new Date()): SafariStop | null {
  const today = referenceDate.toISOString().slice(0, 10);

  if (today < TRIP.startDate) {
    return ITINERARY[0];
  }
  if (today > TRIP.endDate) {
    return ITINERARY[ITINERARY.length - 1];
  }

  return (
    ITINERARY.find(
      (stop) => today >= stop.checkIn && today < stop.checkOut,
    ) ?? ITINERARY[ITINERARY.length - 1]
  );
}

export function getUpcomingStop(referenceDate = new Date()): SafariStop | null {
  const today = referenceDate.toISOString().slice(0, 10);

  if (today >= TRIP.endDate) {
    return null;
  }

  const current = getCurrentStop(referenceDate);
  if (!current) return ITINERARY[0] ?? null;

  const currentIndex = ITINERARY.findIndex((s) => s.id === current.id);
  if (currentIndex === -1 || currentIndex >= ITINERARY.length - 1) {
    return null;
  }

  return ITINERARY[currentIndex + 1];
}

export function getStopStatus(
  stop: SafariStop,
  referenceDate = new Date(),
): "upcoming" | "current" | "completed" {
  const today = referenceDate.toISOString().slice(0, 10);
  if (today < stop.checkIn) return "upcoming";
  if (today >= stop.checkOut) return "completed";
  return "current";
}
