export interface DailyForecast {
  date: string;
  high: number;
  low: number;
  rainChance: number;
  condition: string;
  icon: string;
}

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

const SAMPLE_CONDITIONS = [
  { condition: "Partly cloudy", icon: "⛅" },
  { condition: "Sunny", icon: "☀️" },
  { condition: "Light rain", icon: "🌦️" },
  { condition: "Clear", icon: "🌤️" },
  { condition: "Overcast", icon: "☁️" },
];

function generateSampleForecast(
  lat: number,
  lon: number,
  locationName: string,
): WeatherData {
  const seed = Math.abs(Math.round(lat * 100 + lon * 100));
  const baseTemp = lat > 0 ? 24 : 22;

  const daily: DailyForecast[] = Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const cond = SAMPLE_CONDITIONS[(seed + i) % SAMPLE_CONDITIONS.length];
    return {
      date: date.toISOString().slice(0, 10),
      high: baseTemp + ((seed + i * 3) % 6) - 2,
      low: baseTemp - 8 + ((seed + i) % 4),
      rainChance: (seed + i * 7) % 35,
      condition: cond.condition,
      icon: cond.icon,
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
      windSpeed: 8 + (seed % 12),
    },
    daily,
    guidance: {
      morning: `Cool start around ${today.low}°C — pack warm layers for early game drives.`,
      midday: `Warming to ~${today.high}°C — sun protection and breathable fabrics recommended.`,
      evening: `Cooling to ${today.low + 2}°C — add a fleece or light jacket for sundowners.`,
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
  url.searchParams.set("units", "metric");
  url.searchParams.set("exclude", "minutely,hourly,alerts");

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`OpenWeatherMap error: ${res.status}`);
  }

  const data = await res.json();
  const currentCond = weatherCodeToCondition(data.current?.weather?.[0]?.id ?? 800);

  const daily: DailyForecast[] = (data.daily ?? []).slice(0, 10).map(
    (day: {
      dt: number;
      temp: { max: number; min: number };
      pop: number;
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
      };
    },
  );

  const today = daily[0];
  return {
    location: locationName,
    current: {
      temp: Math.round(data.current?.temp ?? today?.high ?? 22),
      condition: currentCond.condition,
      icon: currentCond.icon,
      humidity: data.current?.humidity ?? 50,
      windSpeed: Math.round(data.current?.wind_speed ?? 10),
    },
    daily,
    guidance: {
      morning: `Early start ~${today?.low ?? 14}°C — layer up for dawn game drives.`,
      midday: `Peak ~${today?.high ?? 26}°C — hat, sunscreen, and light neutral clothing.`,
      evening: `Sunset cool-down ~${(today?.low ?? 14) + 2}°C — bring a warm layer for the vehicle.`,
    },
    isSample: false,
  };
}

export async function getWeather(
  lat: number,
  lon: number,
  locationName: string,
): Promise<WeatherData> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!apiKey || apiKey === "your_weather_api_key_here") {
    return generateSampleForecast(lat, lon, locationName);
  }

  try {
    return await fetchOpenWeatherMap(lat, lon, locationName, apiKey);
  } catch {
    const sample = generateSampleForecast(lat, lon, locationName);
    return sample;
  }
}
