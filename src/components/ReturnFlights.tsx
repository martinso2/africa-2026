import { InternationalJourneySection } from "@/components/InternationalJourneySection";
import { RETURN_JOURNEY } from "@/data/internationalFlights";

export default function ReturnFlights() {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="mb-5 sm:mb-6">
        <h2 className="font-serif text-2xl text-safari-green sm:text-3xl">
          Heading Home
        </h2>
        <p className="mt-2 text-safari-charcoal/70">
          Nairobi → Dubai → New York — Emirates Business
        </p>
      </div>

      <InternationalJourneySection
        journey={RETURN_JOURNEY}
        sectionId="return-flights"
        footnote="Departs NBO Terminal 1B Mon Jun 15, 4:35 PM · Arrive JFK Terminal 4 Tue Jun 16, 8:50 AM — after the Mara charter lands at JKIA (10:40 AM)."
      />
    </div>
  );
}
