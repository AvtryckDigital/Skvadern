import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { Activity } from "@/lib/supabase/types";

const MONTHS = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];

const WEEKDAYS = ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];

export type Parts = { y: number; m: number; d: number; hh: number | null; mm: number | null };

export function parseLocal(value: string | null | undefined): Parts | null {
  if (!value) return null;
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);
  if (!m) return null;
  return {
    y: +m[1],
    m: +m[2],
    d: +m[3],
    hh: m[4] !== undefined ? +m[4] : null,
    mm: m[5] !== undefined ? +m[5] : null,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Nuvarande datum i Stockholm som "YYYY-MM-DD". */
export function todayStockholm() {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  const d = parts.find((p) => p.type === "day")?.value;
  return `${y}-${m}-${d}`;
}

export function formatDate(value: string | null | undefined, withYear = true) {
  const p = parseLocal(value);
  if (!p) return "";
  return `${p.d} ${MONTHS[p.m - 1]}${withYear ? ` ${p.y}` : ""}`;
}

export function formatTime(value: string | null | undefined) {
  const p = parseLocal(value);
  if (!p || p.hh === null) return "";
  return `${pad(p.hh)}:${pad(p.mm ?? 0)}`;
}

export function weekday(value: string | null | undefined) {
  const p = parseLocal(value);
  if (!p) return "";
  return WEEKDAYS[new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay()];
}

export function monthName(m: number) {
  return MONTHS[m - 1];
}

export function monthShort(value: string | null | undefined) {
  const p = parseLocal(value);
  return p ? MONTHS[p.m - 1].slice(0, 3) : "";
}

export function dayOfMonth(value: string | null | undefined) {
  return parseLocal(value)?.d ?? "";
}

export function formatAcademicTime(value: string | null | undefined) {
  const p = parseLocal(value);
  if (!p || p.hh === null) return "";
  const hours = pad(p.hh);
  const minutes = p.mm ?? 0;
  if (minutes === 15) return `${hours} ak`;
  if (minutes === 30) return `${hours} dk`;
  if (minutes === 45) return `${hours} tk`;
  return `${hours}:${pad(minutes)}`;
}

export function timeRange(startIso: string, endIso?: string | null) {
  const start = formatAcademicTime(startIso);
  if (!endIso) return start;
  const pStart = parseLocal(startIso);
  const pEnd = parseLocal(endIso);
  if (!pStart || !pEnd) return start;

  const startDate = new Date(Date.UTC(pStart.y, pStart.m - 1, pStart.d));
  const endDate = new Date(Date.UTC(pEnd.y, pEnd.m - 1, pEnd.d));
  const diffDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  // Evenemang som slutar samma dag eller inpå småtimmarna nästa dygn (t.ex. 18:00 – 01:00)
  if (diffDays >= 0 && diffDays <= 1) {
    const end = formatTime(endIso);
    if (start && end) return `${start} – ${end}`;
    return start;
  }

  const end = `${formatDate(endIso, false)} ${formatTime(endIso)}`.trim();
  if (start && end) return `${start} – ${end}`;
  return start;
}

export const getActivities = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("activities")
      .select("*")
      .order("date", { ascending: true })
      .returns<Activity[]>();
    return data ?? [];
  },
  ["activities"],
  { tags: ["activities"] }
);

/** Hämtar kommande aktiviteter (där aktiviteten eller dess sluttid inte passerat). */
export async function getUpcomingActivities(limit?: number): Promise<Activity[]> {
  const all = await getActivities();
  const today = todayStockholm();
  const upcoming = all.filter((a) => (a.end_date ?? a.date).slice(0, 10) >= today);
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}
