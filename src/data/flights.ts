export interface FlightPoint {
  name: string;
  coordinates: { lat: number; lon: number };
}

export interface FlightLeg {
  id: string;
  date: string;
  fromStopId: string;
  toStopId: string;
  departure: FlightPoint;
  arrival: FlightPoint;
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}

export const FLIGHTS: FlightLeg[] = [
  {
    id: "wilson-enasoit",
    date: "2026-06-06",
    fromStopId: "hemingways",
    toStopId: "enasoit",
    departure: {
      name: "Wilson Airport (Nairobi)",
      coordinates: { lat: -1.3217, lon: 36.8148 },
    },
    arrival: {
      name: "Enasoit Airstrip",
      coordinates: { lat: 0.2833, lon: 37.0667 },
    },
    operator: "Boskovic Charters",
    departureTime: "10:00 AM",
    arrivalTime: "10:40 AM",
    duration: "40 min",
  },
  {
    id: "enasoit-loisaba",
    date: "2026-06-09",
    fromStopId: "enasoit",
    toStopId: "loisaba",
    departure: {
      name: "Enasoit Airstrip",
      coordinates: { lat: 0.2833, lon: 37.0667 },
    },
    arrival: {
      name: "Loisaba Airstrip",
      coordinates: { lat: 0.6333, lon: 37.2833 },
    },
    operator: "Tropic Charters",
    departureTime: "10:00 AM",
    arrivalTime: "10:22 AM",
    duration: "22 min",
  },
  {
    id: "loisaba-naboisho",
    date: "2026-06-12",
    fromStopId: "loisaba",
    toStopId: "naboisho",
    departure: {
      name: "Loisaba Airstrip",
      coordinates: { lat: 0.6333, lon: 37.2833 },
    },
    arrival: {
      name: "Mara Ol Seki Airstrip",
      coordinates: { lat: -1.4167, lon: 35.2 },
    },
    operator: "Boskovic Charters",
    departureTime: "10:00 AM",
    arrivalTime: "11:00 AM",
    duration: "1 hr",
  },
  {
    id: "naboisho-jkia",
    date: "2026-06-15",
    fromStopId: "naboisho",
    toStopId: "departure",
    departure: {
      name: "Mara Ol Seki Airstrip",
      coordinates: { lat: -1.4167, lon: 35.2 },
    },
    arrival: {
      name: "Jomo Kenyatta International Airport (Nairobi)",
      coordinates: { lat: -1.3192, lon: 36.9278 },
    },
    operator: "Boskovic Charters",
    departureTime: "10:00 AM",
    arrivalTime: "10:40 AM",
    duration: "40 min",
  },
];

export function getFlightLeg(
  fromStopId: string,
  toStopId: string,
): FlightLeg | undefined {
  return FLIGHTS.find(
    (f) => f.fromStopId === fromStopId && f.toStopId === toStopId,
  );
}

export function getOutboundFlight(fromStopId: string): FlightLeg | undefined {
  return FLIGHTS.find((f) => f.fromStopId === fromStopId);
}

export function formatFlightDate(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
