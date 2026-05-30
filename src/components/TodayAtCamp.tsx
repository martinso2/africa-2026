import { type SafariStop, TRIP } from "@/data/itinerary";
import { formatShortDate, getCurrentStop, getUpcomingStop } from "@/lib/dates";
import type { WeatherData } from "@/lib/weather";

interface TodayAtCampProps {
  stops: SafariStop[];
  weatherByStop: WeatherData[];
}

function dayDiff(targetDateIso: string, now: Date): number {
  const start = Date.parse(`${now.toISOString().slice(0, 10)}T00:00:00`);
  const target = Date.parse(`${targetDateIso}T00:00:00`);
  return Math.max(0, Math.ceil((target - start) / 86_400_000));
}

export default function TodayAtCamp({ stops, weatherByStop }: TodayAtCampProps) {
  const now = new Date();
  const todayIso = now.toISOString().slice(0, 10);
  const currentStop = getCurrentStop(now);
  const upcomingStop = getUpcomingStop(now);
  const currentIndex = currentStop
    ? stops.findIndex((stop) => stop.id === currentStop.id)
    : -1;
  const weather = currentIndex >= 0 ? weatherByStop[currentIndex] : null;
  const todayForecast = weather?.daily[0];

  const beforeTrip = todayIso < TRIP.startDate;
  const afterTrip = todayIso > TRIP.endDate;

  const primaryStatus = beforeTrip
    ? `Safari begins in ${dayDiff(TRIP.startDate, now)} days`
    : afterTrip
      ? "Safari complete"
      : "Today at camp";

  return (
    <section
      id="today-camp"
      className="mb-8 rounded-2xl border border-safari-sand/80 bg-white p-4 shadow-sm sm:mb-10 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-serif text-2xl text-safari-green sm:text-3xl">
          {primaryStatus}
        </h2>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          Offline ready
        </span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <article className="rounded-xl bg-safari-sand/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-safari-charcoal/55">
            Camp
          </p>
          <p className="mt-1 font-serif text-xl text-safari-green">
            {currentStop?.propertyName ?? "—"}
          </p>
          <p className="text-sm text-safari-charcoal/70">{currentStop?.location ?? "—"}</p>
          {!afterTrip && upcomingStop && (
            <p className="mt-2 text-sm font-semibold text-safari-charcoal/80">
              Next transfer: {upcomingStop.propertyName} on{" "}
              {formatShortDate(upcomingStop.checkIn)}
            </p>
          )}
        </article>

        <article className="rounded-xl bg-safari-sand/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-safari-charcoal/55">
            Sky
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-5xl leading-none" aria-hidden="true">
              {weather?.current.icon ?? "🌤️"}
            </span>
            <div>
              <p className="text-2xl font-semibold text-safari-charcoal">
                {weather ? `${weather.current.temp}°F` : "—"}
              </p>
              <p className="text-sm text-safari-charcoal/70">
                {weather?.current.condition ?? "Weather unavailable"}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-xl bg-safari-sand/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-safari-charcoal/55">
            Light Window
          </p>
          <p className="mt-2 text-sm font-semibold text-safari-charcoal/80">
            Sunrise {todayForecast?.sunrise ?? "—"} · Sunset{" "}
            {todayForecast?.sunset ?? "—"}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-3xl leading-none" aria-hidden="true">
              🌙
            </span>
            <p className="text-sm font-semibold text-safari-charcoal/80">
              {todayForecast?.moonPhase ?? "Moon phase unavailable"}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
