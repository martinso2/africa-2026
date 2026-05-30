import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import OutboundFlights from "@/components/OutboundFlights";
import ReturnFlights from "@/components/ReturnFlights";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import SafariStopSection from "@/components/SafariStopSection";
import { ITINERARY, TRIP } from "@/data/itinerary";
import { getWeather } from "@/lib/weather";

export default async function Home() {
  const weatherResults = await Promise.all(
    ITINERARY.map((stop) =>
      getWeather(
        stop.coordinates.lat,
        stop.coordinates.lon,
        stop.weatherLocationName,
      ),
    ),
  );

  return (
    <>
      <Navigation />
      <Hero />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <OutboundFlights />

        <section id="stops" className="scroll-mt-20">
          <div className="mb-10">
            {/* <h2 className="font-serif text-3xl text-safari-green">Safari Stops!!!</h2>
            <p className="mt-2 text-safari-charcoal/70">
              Accommodation, charter flights, weather, and notes — everything for
              each location
            </p> */}
          </div>
          <div className="space-y-16">
            {ITINERARY.map((stop, i) => (
              <SafariStopSection
                key={stop.id}
                stop={stop}
                weather={weatherResults[i]}
              />
            ))}
          </div>
        </section>

        <ReturnFlights />

        <section className="mb-14">
          <ItineraryTimeline />
        </section>
      </main>

      <footer className="border-t border-safari-sand/60 bg-safari-green py-8 text-center text-sm text-safari-sand">
        <p className="font-serif text-lg text-safari-ivory">{TRIP.title}</p>
        <p className="mt-1 text-safari-sand/70">
          {TRIP.dates} · Kenya
        </p>
        <p className="mt-3 text-safari-sand/60">
          © Martin-Software, LLC
        </p>
      </footer>
    </>
  );
}
