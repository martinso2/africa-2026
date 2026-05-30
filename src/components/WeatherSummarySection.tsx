import type { SafariStop } from "@/data/itinerary";
import type { WeatherData } from "@/lib/weather";

interface WeatherSummarySectionProps {
  stops: SafariStop[];
  weatherByStop: WeatherData[];
}

function moonPhaseIcon(moonPhase: string): string {
  switch (moonPhase) {
    case "New Moon":
      return "🌑";
    case "Waxing Crescent":
      return "🌒";
    case "First Quarter":
      return "🌓";
    case "Waxing Gibbous":
      return "🌔";
    case "Full Moon":
      return "🌕";
    case "Waning Gibbous":
      return "🌖";
    case "Last Quarter":
      return "🌗";
    case "Waning Crescent":
      return "🌘";
    default:
      return "🌙";
  }
}

export default function WeatherSummarySection({
  stops,
  weatherByStop,
}: WeatherSummarySectionProps) {
  const usingSampleData = weatherByStop.some((weather) => weather.isSample);

  return (
    <section id="weather-summary" className="mb-10 scroll-mt-20 sm:mb-14">
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-safari-green sm:text-3xl">
          Sky Conditions
        </h2>
        <p className="mt-2 text-safari-charcoal/70">
          Quick weather-only snapshot across each safari stop.
        </p>
        {usingSampleData && (
          <p className="mt-2 text-sm font-semibold text-amber-700">
            Using sample weather data for one or more locations.
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stops.map((stop, index) => {
          const weather = weatherByStop[index];
          const today = weather.daily[0];

          return (
            <article
              key={stop.id}
              className="rounded-2xl border border-safari-sand/80 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-safari-charcoal/50">
                {stop.region}
              </p>
              <h3 className="mt-1 font-serif text-xl text-safari-green">
                {stop.propertyName}
              </h3>

              <div className="mt-4 flex items-center gap-4 rounded-xl bg-safari-sand/25 p-3">
                <span className="text-6xl leading-none" aria-hidden="true">
                  {weather.current.icon}
                </span>
                <div>
                  <p className="text-base font-bold text-safari-charcoal">
                    {weather.current.condition}
                  </p>
                  <p className="text-sm text-safari-charcoal/70">
                    Now {weather.current.temp}°F
                  </p>
                  {today && (
                    <p className="text-xs font-semibold text-safari-charcoal/60">
                      High {today.high}° · Low {today.low}°
                    </p>
                  )}
                </div>
              </div>

              <details className="mt-4 rounded-xl border border-safari-sand/70 bg-safari-ivory/60">
                <summary className="cursor-pointer list-none px-3 py-2 text-sm font-semibold text-safari-green marker:content-['']">
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true">▾</span>
                    Daily Forecast
                  </span>
                </summary>
                <div className="space-y-2 border-t border-safari-sand/60 px-3 py-3">
                  {weather.daily.map((day) => (
                    <div
                      key={`${stop.id}-${day.date}`}
                      className="flex items-center justify-between rounded-md bg-white px-2.5 py-2 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-safari-charcoal">
                          {new Date(`${day.date}T00:00:00`).toLocaleDateString(
                            "en-US",
                            { weekday: "short", month: "short", day: "numeric" },
                          )}
                        </p>
                        <p className="text-xs text-safari-charcoal/60">
                          {day.condition} · Rain {day.rainChance}%
                        </p>
                        <p className="text-xs text-safari-charcoal/60">
                          Sunrise {day.sunrise} · Sunset {day.sunset}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-3xl leading-none" aria-hidden="true">
                            {moonPhaseIcon(day.moonPhase)}
                          </span>
                          <p className="text-xs font-semibold text-safari-charcoal/70">
                            {day.moonPhase}
                          </p>
                        </div>
                      </div>
                      <div className="ml-3 flex items-center gap-2 whitespace-nowrap">
                        <span className="text-2xl leading-none" aria-hidden="true">
                          {day.icon}
                        </span>
                        <p className="text-sm font-semibold text-safari-charcoal">
                          {day.high}°/{day.low}°
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </article>
          );
        })}
      </div>
    </section>
  );
}
