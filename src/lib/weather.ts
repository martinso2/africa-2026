export interface DailyForecast {
  date: string;
  high: number;
  low: number;
  rainChance: number;
  condition: string;
  icon: string;
  sunrise: string;
  sunset: string;
  moonPhase: string;
}

/** OpenWeather + page cache: refresh every 12 hours on Vercel */
export const WEATHER_REVALIDATE_SECONDS = 43_200;

export interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
  };
  daily: DailyForecast[];
  guidance: {
    morning: string;
    midday: string;
    evening: string;
  };
  isSample: boolean;
}

const FORECAST_DAYS = 10;

const SAMPLE_CONDITIONS = [
  { condition: "Partly cloudy", icon: "⛅" },
  { condition: "Sunny", icon: "☀️" },
  { condition: "Light rain", icon: "🌦️" },
  { condition: "Clear", icon: "🌤️" },
  { condition: "Overcast", icon: "☁️" },
];

function moonPhaseLabel(phase: number): string {
  if (phase < 0.03 || phase >= 0.97) return "New Moon";
  if (phase < 0.22) return "Waxing Crescent";
  if (phase < 0.28) return "First Quarter";
  if (phase < 0.47) return "Waxing Gibbous";
  if (phase < 0.53) return "Full Moon";
  if (phase < 0.72) return "Waning Gibbous";
  if (phase < 0.78) return "Last Quarter";
  return "Waning Crescent";
}

function formatHourMinute(hours: number, minutes: number): string {
  const normalizedHours = ((hours % 24) + 24) % 24;
  const period = normalizedHours >= 12 ? "PM" : "AM";
  const hour12 = normalizedHours % 12 || 12;
  const minute = String(minutes).padStart(2, "0");
  return `${hour12}:${minute} ${period}`;
}

function formatUnixWithOffset(unixSeconds: number, offsetSeconds: number): string {
  const date = new Date((unixSeconds + offsetSeconds) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return formatHourMinute(hours, minutes);
}

function sampleMoonPhase(date: Date): number {
  const synodicMonth = 29.53058867;
  const baseNewMoonUtc = Date.UTC(2024, 0, 11, 11, 57, 0);
  const daysSinceBase = (date.getTime() - baseNewMoonUtc) / 86_400_000;
  const normalized = ((daysSinceBase % synodicMonth) + synodicMonth) % synodicMonth;
  return normalized / synodicMonth;
}

function generateSampleForecast(
  lat: number,
  lon: number,
  locationName: string,
): WeatherData {
  const seed = Math.abs(Math.round(lat * 100 + lon * 100));
  const baseTemp = lat > 0 ? 75 : 72;

  const daily: DailyForecast[] = Array.from({ length: FORECAST_DAYS }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const cond = SAMPLE_CONDITIONS[(seed + i) % SAMPLE_CONDITIONS.length];
    const sunriseHour = 6 + ((seed + i) % 2);
    const sunriseMinute = ((seed + i * 7) % 4) * 10;
    const sunsetHour = 18 + ((seed + i) % 2);
    const sunsetMinute = ((seed + i * 5) % 4) * 10;
    const phase = sampleMoonPhase(date);
    return {
      date: date.toISOString().slice(0, 10),
      high: baseTemp + ((seed + i * 3) % 6) - 2,
      low: baseTemp - 15 + ((seed + i) % 4),
      rainChance: (seed + i * 7) % 35,
      condition: cond.condition,
      icon: cond.icon,
      sunrise: formatHourMinute(sunriseHour, sunriseMinute),
      sunset: formatHourMinute(sunsetHour, sunsetMinute),
      moonPhase: moonPhaseLabel(phase),
    };
  });

  const today = daily[0];
  return {
    location: locationName,
    current: {
      temp: Math.round((today.high + today.low) / 2),
      condition: today.condition,
      icon: today.icon,
      humidity: 45 + (seed % 30),
      windSpeed: 5 + (seed % 8),
    },
    daily,
    guidance: {
      morning: `Cool start around ${today.low}°F — pack warm layers for early game drives.`,
      midday: `Warming to ~${today.high}°F — sun protection and breathable fabrics recommended.`,
      evening: `Cooling to ${today.low + 4}°F — add a fleece or light jacket for sundowners.`,
    },
    isSample: true,
  };
}

function weatherCodeToCondition(code: number): { condition: string; icon: string } {
  if (code === 0) return { condition: "Clear", icon: "☀️" };
  if (code <= 3) return { condition: "Partly cloudy", icon: "⛅" };
  if (code <= 48) return { condition: "Foggy", icon: "🌫️" };
  if (code <= 57) return { condition: "Drizzle", icon: "🌦️" };
  if (code <= 67) return { condition: "Rain", icon: "🌧️" };
  if (code <= 77) return { condition: "Snow", icon: "❄️" };
  if (code <= 82) return { condition: "Showers", icon: "🌧️" };
  if (code <= 86) return { condition: "Snow showers", icon: "❄️" };
  if (code <= 99) return { condition: "Thunderstorm", icon: "⛈️" };
  return { condition: "Variable", icon: "🌤️" };
}

async function fetchOpenWeatherMap(
  lat: number,
  lon: number,
  locationName: string,
  apiKey: string,
): Promise<WeatherData> {
  const url = new URL("https://api.openweathermap.org/data/3.0/onecall");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "imperial");
  url.searchParams.set("exclude", "minutely,hourly,alerts");

  const res = await fetch(url.toString(), {
    next: { revalidate: WEATHER_REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`OpenWeatherMap error: ${res.status}`);
  }

  const data = await res.json();
  const timezoneOffsetSeconds = Number(data.timezone_offset ?? 0);
  const currentCond = weatherCodeToCondition(data.current?.weather?.[0]?.id ?? 800);

  const daily: DailyForecast[] = (data.daily ?? []).slice(0, FORECAST_DAYS).map(
    (day: {
      dt: number;
      temp: { max: number; min: number };
      pop: number;
      sunrise?: number;
      sunset?: number;
      moon_phase?: number;
      weather: { id: number }[];
    }) => {
      const cond = weatherCodeToCondition(day.weather?.[0]?.id ?? 800);
      return {
        date: new Date(day.dt * 1000).toISOString().slice(0, 10),
        high: Math.round(day.temp.max),
        low: Math.round(day.temp.min),
        rainChance: Math.round((day.pop ?? 0) * 100),
        condition: cond.condition,
        icon: cond.icon,
        sunrise: day.sunrise
          ? formatUnixWithOffset(day.sunrise, timezoneOffsetSeconds)
          : "—",
        sunset: day.sunset
          ? formatUnixWithOffset(day.sunset, timezoneOffsetSeconds)
          : "—",
        moonPhase: moonPhaseLabel(day.moon_phase ?? 0),
      };
    },
  );

  const today = daily[0];
  return {
    location: locationName,
    current: {
      temp: Math.round(data.current?.temp ?? today?.high ?? 72),
      condition: currentCond.condition,
      icon: currentCond.icon,
      humidity: data.current?.humidity ?? 50,
      windSpeed: Math.round(data.current?.wind_speed ?? 6),
    },
    daily,
    guidance: {
      morning: `Early start ~${today?.low ?? 58}°F — layer up for dawn game drives.`,
      midday: `Peak ~${today?.high ?? 79}°F — hat, sunscreen, and light neutral clothing.`,
      evening: `Sunset cool-down ~${(today?.low ?? 58) + 4}°F — bring a warm layer for the vehicle.`,
    },
    isSample: false,
  };
}

function getWeatherApiKey(): string | undefined {
  const key =
    process.env.WEATHER_API_KEY ?? process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  if (!key || key === "your_weather_api_key_here") return undefined;
  return key;
}

export async function getWeather(
  lat: number,
  lon: number,
  locationName: string,
): Promise<WeatherData> {
  const apiKey = getWeatherApiKey();

  if (!apiKey) {
    return generateSampleForecast(lat, lon, locationName);
  }

  try {
    return await fetchOpenWeatherMap(lat, lon, locationName, apiKey);
  } catch {
    const sample = generateSampleForecast(lat, lon, locationName);
    return sample;
  }
}
