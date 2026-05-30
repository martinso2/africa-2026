import type { FlightLeg } from "@/data/flights";
import { formatFlightDate } from "@/data/flights";
import {
  FlightDateBadge,
  FlightTimeBadge,
} from "@/components/FlightSchedule";

interface DepartureCardProps {
  flight: FlightLeg;
}

export default function DepartureCard({ flight }: DepartureCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-safari-sand bg-safari-ivory/50 shadow-sm">
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-safari-green sm:h-48">
        <div className="absolute inset-0 bg-gradient-to-br from-safari-green to-safari-green-light opacity-90" />
        <span className="relative text-5xl" aria-hidden="true">
          ✈️
        </span>
        <span className="absolute left-4 top-4 rounded-full bg-safari-sand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-safari-charcoal">
          Homeward
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl text-safari-green">
          Jomo Kenyatta International Airport
        </h3>
        <p className="mt-1 text-sm text-safari-charcoal/70">Nairobi, Kenya</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <FlightDateBadge>{formatFlightDate(flight.date)}</FlightDateBadge>
          <FlightTimeBadge>Charter arrives {flight.arrivalTime}</FlightTimeBadge>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-safari-charcoal/80">
          Final charter leg from the Mara — connect for your international flight
          home.
        </p>
      </div>
    </article>
  );
}
