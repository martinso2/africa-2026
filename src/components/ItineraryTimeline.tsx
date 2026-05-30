import { ITINERARY } from "@/data/itinerary";
import { formatDateRange, formatShortDate, getStopStatus } from "@/lib/dates";

export default function ItineraryTimeline() {
  return (
    <section id="itinerary" className="scroll-mt-20">
      <div className="mb-8">
        <h2 className="font-serif text-3xl text-safari-green">Itinerary</h2>
        <p className="mt-2 text-safari-charcoal/70">
          Ten nights across four extraordinary properties
        </p>
      </div>

      <ol className="relative space-y-0">
        {ITINERARY.map((stop, index) => {
          const status = getStopStatus(stop);
          const isLast = index === ITINERARY.length - 1;

          return (
            <li key={stop.id} className="relative flex gap-4 pb-8 sm:gap-6">
              {!isLast && (
                <div className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 bg-safari-sand sm:left-[19px]" />
              )}

              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 sm:h-10 sm:w-10 ${
                    status === "current"
                      ? "border-safari-green bg-safari-green text-safari-ivory"
                      : status === "completed"
                        ? "border-safari-green/40 bg-safari-sand text-safari-green"
                        : "border-safari-sand bg-white text-safari-charcoal/50"
                  }`}
                >
                  <span className="text-xs font-bold sm:text-sm">{index + 1}</span>
                </div>
              </div>

              <div className="min-w-0 flex-1 rounded-2xl border border-safari-sand/80 bg-white p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg text-safari-green sm:text-xl">
                      {stop.propertyName}
                    </h3>
                    <p className="text-sm text-safari-charcoal/60">{stop.location}</p>
                  </div>
                  {status === "current" && (
                    <span className="rounded-full bg-safari-green/10 px-3 py-1 text-xs font-semibold text-safari-green">
                      Now
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-safari-charcoal">
                  {formatDateRange(stop.checkIn, stop.checkOut)}
                </p>
                <p className="mt-1 text-xs text-safari-charcoal/50">
                  Check-in {formatShortDate(stop.checkIn)} · Check-out{" "}
                  {formatShortDate(stop.checkOut)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-safari-charcoal/75">
                  {stop.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
