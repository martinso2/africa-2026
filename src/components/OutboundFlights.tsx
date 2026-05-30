import { InternationalJourneySection } from "@/components/InternationalJourneySection";
import GroundTransferSection from "@/components/GroundTransferSection";
import { OUTBOUND_JOURNEY } from "@/data/internationalFlights";

export default function OutboundFlights() {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="mb-5 sm:mb-6">
        <h2 className="font-serif text-2xl text-safari-green sm:text-3xl">
          Getting to Kenya
        </h2>
        <p className="mt-2 text-safari-charcoal/70">
          New York → Dubai → Nairobi — Emirates
        </p>
      </div>

      <InternationalJourneySection
        journey={OUTBOUND_JOURNEY}
        sectionId="international-flights"
        footnote="Depart JFK Thu Jun 4, 11:20 AM · Arrive Nairobi Fri Jun 5, 2:30 PM · Hemingways check-in Fri Jun 5."
      />

      <GroundTransferSection />
    </div>
  );
}
