export interface InternationalAirport {
  city: string;
  airport: string;
  code: string;
  time: string;
  coordinates: { lat: number; lon: number };
  /** +1 if arrival is the next calendar day */
  nextDay?: boolean;
}

export interface InternationalLeg {
  date: string;
  from: InternationalAirport;
  to: InternationalAirport;
  flightNumber: string;
  airline: string;
  duration: string;
}

export interface InternationalJourney {
  id: string;
  title: string;
  route: string;
  legs: InternationalLeg[];
  layover?: DubaiLayover;
}

export interface DubaiLayover {
  image: string;
  imageAlt: string;
  arriveDate: string;
  arriveTime: string;
  departDate: string;
  departTime: string;
  duration: string;
  note: string;
}

export const INTERNATIONAL_FLIGHT_HERO = "/images/flights/emirates-first.jpg";
export const INTERNATIONAL_FLIGHT_HERO_ALT =
  "Emirates First Class private suite on board";

const JFK = { lat: 40.6413, lon: -73.7781 };
const DXB = { lat: 25.2532, lon: 55.3657 };
const NBO = { lat: -1.3192, lon: 36.9278 };

export const INTERNATIONAL_JOURNEYS: InternationalJourney[] = [
  {
    id: "outbound",
    title: "Outbound to Kenya",
    route: "JFK → Dubai → Nairobi",
    legs: [
      {
        date: "2026-06-04",
        from: {
          city: "New York",
          airport: "John F. Kennedy International",
          code: "JFK",
          time: "11:20 AM",
          coordinates: JFK,
        },
        to: {
          city: "Dubai",
          airport: "Dubai International",
          code: "DXB",
          time: "7:55 AM",
          coordinates: DXB,
          nextDay: true,
        },
        flightNumber: "EK 204",
        airline: "Emirates",
        duration: "12h 35m",
      },
      {
        date: "2026-06-05",
        from: {
          city: "Dubai",
          airport: "Dubai International",
          code: "DXB",
          time: "10:30 AM",
          coordinates: DXB,
        },
        to: {
          city: "Nairobi",
          airport: "Jomo Kenyatta International",
          code: "NBO",
          time: "2:30 PM",
          coordinates: NBO,
        },
        flightNumber: "EK 719",
        airline: "Emirates",
        duration: "4h 00m",
      },
    ],
    layover: {
      image: "/images/flights/dubai-lounge.jpg",
      imageAlt: "Emirates lounge at Dubai International Airport",
      arriveDate: "2026-06-05",
      arriveTime: "7:55 AM",
      departDate: "2026-06-05",
      departTime: "10:30 AM",
      duration: "2h 35m",
      note: "Morning connection at DXB — Emirates lounge between JFK and Nairobi legs.",
    },
  },
  {
    id: "return",
    title: "Return to New York",
    route: "Nairobi → Dubai → JFK",
    legs: [
      {
        date: "2026-06-15",
        from: {
          city: "Nairobi",
          airport: "Jomo Kenyatta International",
          code: "NBO",
          time: "4:35 PM",
          coordinates: NBO,
        },
        to: {
          city: "Dubai",
          airport: "Dubai International",
          code: "DXB",
          time: "10:40 PM",
          coordinates: DXB,
        },
        flightNumber: "EK 720",
        airline: "Emirates",
        duration: "5h 05m",
      },
      {
        date: "2026-06-16",
        from: {
          city: "Dubai",
          airport: "Dubai International",
          code: "DXB",
          time: "2:50 AM",
          coordinates: DXB,
        },
        to: {
          city: "New York",
          airport: "John F. Kennedy International",
          code: "JFK",
          time: "8:50 AM",
          coordinates: JFK,
        },
        flightNumber: "EK 203",
        airline: "Emirates",
        duration: "14h 00m",
      },
    ],
    layover: {
      image: "/images/flights/dubai-terminal.jpg",
      imageAlt: "Dubai International Airport terminal concourse",
      arriveDate: "2026-06-15",
      arriveTime: "10:40 PM",
      departDate: "2026-06-16",
      departTime: "2:50 AM",
      duration: "4h 10m",
      note: "Overnight connection at DXB before the long haul home to JFK.",
    },
  },
];

export const OUTBOUND_JOURNEY = INTERNATIONAL_JOURNEYS.find(
  (j) => j.id === "outbound",
)!;

export const RETURN_JOURNEY = INTERNATIONAL_JOURNEYS.find(
  (j) => j.id === "return",
)!;

export function getJourneyWaypoints(journeyId: "outbound" | "return") {
  const journey = INTERNATIONAL_JOURNEYS.find((j) => j.id === journeyId)!;
  const points = journey.legs.map((leg) => ({
    code: leg.from.code,
    name: `${leg.from.city} (${leg.from.code})`,
    lat: leg.from.coordinates.lat,
    lon: leg.from.coordinates.lon,
  }));
  const last = journey.legs[journey.legs.length - 1].to;
  points.push({
    code: last.code,
    name: `${last.city} (${last.code})`,
    lat: last.coordinates.lat,
    lon: last.coordinates.lon,
  });
  return points;
}

export function formatInternationalDate(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDay(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
