/**
 * Time utilities — Cameroon (Yaoundé / Bafoussam)
 * Zone: Africa/Douala (UTC+1, pas de DST)
 */

export const CAM_TZ = "Africa/Douala";
export const CAM_OFFSET = "+01:00";

/**
 * Retourne la date/heure actuelle AU CAMEROUN (Date object fiable)
 */
export function nowCamDate(): Date {
  // Convertit l'heure actuelle en heure locale Cameroun
  return new Date(
    new Intl.DateTimeFormat("en-US", {
      timeZone: CAM_TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date())
  );
}

/**
 * Timestamp actuel (basé sur heure système UTC → fiable pour comparaisons)
 */
export function nowCam(): number {
  // IMPORTANT: Date.now() est la référence absolue
  // Toutes les dates sont converties avec +01:00 donc compatible
  return Date.now();
}

/**
 * Date du jour au Cameroun (YYYY-MM-DD)
 */
export function todayCam(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CAM_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/**
 * Convertit une date + heure Cameroun en timestamp UTC
 * Exemple: 2026-06-08 + 14:00 → timestamp global
 */
export function dateTimeMsCam(
  date: string,
  time?: string | null,
  fallback = "00:00"
): number {
  const t = (time ?? fallback).slice(0, 5);

  // Force interprétation en heure Cameroun
  return new Date(`${date}T${t}:00${CAM_OFFSET}`).getTime();
}

/**
 * Vérifie si un départ est passé
 */
export function isDeparturePassed(
  departureDate: string,
  departureTime?: string | null
): boolean {
  const departure = dateTimeMsCam(departureDate, departureTime, "11:00");
  return departure <= nowCam();
}

/**
 * Vérifie si une arrivée est déjà passée (avec marge 1 min)
 */
export function isArrivalPast(
  arrivalDate: string,
  arrivalTime?: string | null
): boolean {
  const arrival = dateTimeMsCam(arrivalDate, arrivalTime, "14:00");
  return arrival < nowCam() - 60_000;
}
