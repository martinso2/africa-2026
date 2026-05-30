import type { FlightLeg } from "@/data/flights";
import { formatFlightDate } from "@/data/flights";
import SafariImage from "@/components/SafariImage";
import {
  FlightDateBadge,
  FlightTimeBadge,
} from "@/components/FlightSchedule";

const JKIA_IMAGE = "/images/flights/jkia.jpg";

interface DepartureCardProps {
  flight: FlightLeg;
}

export default function DepartureCard({ flight }: DepartureCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-safari-sand bg-safari-ivory/50 shadow-sm">
      <div className="relative h-40 overflow-hidden sm:h-48">
        <SafariImage
          src={JKIA_IMAGE}
          fallbackSrc={JKIA_IMAGE}
          alt="Jomo Kenyatta International Airport, Nairobi"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
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
          Final charter leg from the Mara — connect at Terminal 1B for Emirates
          EK 720 (departs 4:35 PM).
        </p>
      </div>
    </article>
  );
}
