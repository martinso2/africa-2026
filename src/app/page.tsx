import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StopCard from "@/components/StopCard";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import AccommodationCard from "@/components/AccommodationCard";
import WeatherCard from "@/components/WeatherCard";
import NotesSection from "@/components/NotesSection";
import { ITINERARY } from "@/data/itinerary";
import { getCurrentStop, getUpcomingStop } from "@/lib/dates";
import { getWeather } from "@/lib/weather";

export default async function Home() {
  const currentStop = getCurrentStop();
  const upcomingStop = getUpcomingStop();

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
        <section className="mb-14">
          <h2 className="mb-6 font-serif text-2xl text-safari-green sm:text-3xl">
            Where We Are
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {currentStop && (
              <StopCard stop={currentStop} label="Current Stop" variant="current" />
            )}
            {upcomingStop ? (
              <StopCard stop={upcomingStop} label="Up Next" variant="upcoming" />
            ) : (
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-safari-sand bg-safari-ivory/30 p-8 text-center text-sm text-safari-charcoal/60">
                Safari complete — safe travels home!
              </div>
            )}
          </div>
        </section>

        <section id="accommodations" className="mb-14 scroll-mt-20">
          <div className="mb-8">
            <h2 className="font-serif text-3xl text-safari-green">Accommodations</h2>
            <p className="mt-2 text-safari-charcoal/70">
              Four hand-picked properties across Kenya
            </p>
          </div>
          <div className="space-y-8">
            {ITINERARY.map((stop) => (
              <AccommodationCard key={stop.id} stop={stop} />
            ))}
          </div>
        </section>

        <section className="mb-14">
          <ItineraryTimeline />
        </section>

        <section id="weather" className="mb-14 scroll-mt-20">
          <div className="mb-8">
            <h2 className="font-serif text-3xl text-safari-green">Weather</h2>
            <p className="mt-2 text-safari-charcoal/70">
              Forecasts for each stop along the journey
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {ITINERARY.map((stop, i) => (
              <WeatherCard
                key={stop.id}
                stopName={stop.propertyName}
                weather={weatherResults[i]}
              />
            ))}
          </div>
        </section>

        <section id="notes" className="scroll-mt-20">
          <div className="mb-8">
            <h2 className="font-serif text-3xl text-safari-green">
              Packing & Photography
            </h2>
            <p className="mt-2 text-safari-charcoal/70">
              Location-specific guidance for clothing and camera gear
            </p>
          </div>
          <div className="space-y-6">
            {ITINERARY.map((stop) => (
              <NotesSection key={stop.id} stop={stop} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-safari-sand/60 bg-safari-green py-8 text-center text-sm text-safari-sand">
        <p className="font-serif text-lg text-safari-ivory">Martin Family Safari 2026</p>
        <p className="mt-1 text-safari-sand/70">June 5–15 · Kenya</p>
      </footer>
    </>
  );
}
