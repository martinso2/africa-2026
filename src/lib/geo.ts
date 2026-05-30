const EARTH_RADIUS_KM = 6371;
const KM_TO_MI = 0.621371;

export interface Coordinates {
  lat: number;
  lon: number;
}

export function haversineDistanceKm(from: Coordinates, to: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(to.lat - from.lat);
  const dLon = toRad(to.lon - from.lon);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.lat)) *
      Math.cos(toRad(to.lat)) *
      Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function toMiles(km: number): number {
  return Math.round(km * KM_TO_MI);
}

export function formatMiles(from: Coordinates, to: Coordinates): string {
  const miles = toMiles(haversineDistanceKm(from, to));
  return `${miles.toLocaleString()} mi`;
}

export function totalRouteMiles(points: Coordinates[]): number {
  let totalKm = 0;
  for (let i = 0; i < points.length - 1; i++) {
    totalKm += haversineDistanceKm(points[i], points[i + 1]);
  }
  return toMiles(totalKm);
}

export function formatTotalRouteMiles(points: Coordinates[]): string {
  return `${totalRouteMiles(points).toLocaleString()} mi total`;
}
