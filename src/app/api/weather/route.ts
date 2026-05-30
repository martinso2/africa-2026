import { NextRequest, NextResponse } from "next/server";
import { getWeather } from "@/lib/weather";

export const revalidate = 86400;

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("lat");
  const lon = request.nextUrl.searchParams.get("lon");
  const location = request.nextUrl.searchParams.get("location") ?? "Safari";

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat or lon" }, { status: 400 });
  }

  const weather = await getWeather(parseFloat(lat), parseFloat(lon), location);
  return NextResponse.json(weather);
}
