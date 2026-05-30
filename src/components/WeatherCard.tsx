import type { WeatherData } from "@/lib/weather";

interface WeatherCardProps {
  stopName: string;
  weather: WeatherData;
}

export default function WeatherCard({ stopName, weather }: WeatherCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-safari-sand/80 bg-white shadow-sm">
      <div className="border-b border-safari-sand/60 bg-safari-green/5 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-xl text-safari-green">{stopName}</h3>
            <p className="text-sm text-safari-charcoal/60">{weather.location}</p>
          </div>
          {weather.isSample && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              Sample Data
            </span>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-4 rounded-xl bg-safari-sand/20 p-4">
          <span className="text-4xl" aria-hidden="true">
            {weather.current.icon}
          </span>
          <div>
            <p className="text-3xl font-light text-safari-charcoal">
              {weather.current.temp}°F
            </p>
            <p className="text-sm text-safari-charcoal/70">
              {weather.current.condition}
            </p>
            <p className="mt-1 text-xs text-safari-charcoal/50">
              Humidity {weather.current.humidity}% · Wind {weather.current.windSpeed} mph
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
            Daily Guidance
          </p>
          <div className="space-y-2">
            {[
              { label: "Morning", text: weather.guidance.morning },
              { label: "Midday", text: weather.guidance.midday },
              { label: "Evening", text: weather.guidance.evening },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-safari-ivory/80 px-3 py-2.5 text-sm"
              >
                <span className="font-semibold text-safari-green">{item.label}: </span>
                <span className="text-safari-charcoal/80">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
