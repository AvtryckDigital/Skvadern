import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";
import type { Activity } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabase = createPublicClient();
  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .order("date", { ascending: true })
    .returns<Activity[]>();

  if (!activities) {
    return new NextResponse("Kunde inte hämta kalender", { status: 500 });
  }

  const formatIcsDate = (dateString: string) => {
    return new Date(dateString).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Skvadern//Kalender//SV",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:Skvadern",
    "X-WR-TIMEZONE:Europe/Stockholm",
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
    "BEGIN:VTIMEZONE",
    "TZID:Europe/Stockholm",
    "BEGIN:DAYLIGHT",
    "TZOFFSETFROM:+0100",
    "TZOFFSETTO:+0200",
    "TZNAME:CEST",
    "DTSTART:19700329T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:+0200",
    "TZOFFSETTO:+0100",
    "TZNAME:CET",
    "DTSTART:19701025T030000",
    "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
    "END:STANDARD",
    "END:VTIMEZONE",
    ...activities.flatMap((event) => {
      // Hämta ut siffrorna från datumen, oavsett tidszon
      const parseLocalToUTC = (dateStr: string) => {
        const parts = dateStr.match(/\d+/g);
        if (!parts || parts.length < 5) return new Date(NaN);
        return new Date(Date.UTC(
          parseInt(parts[0], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[2], 10),
          parseInt(parts[3], 10),
          parseInt(parts[4], 10),
          parseInt(parts[5] || "0", 10)
        ));
      };

      const start = parseLocalToUTC(event.date);
      if (isNaN(start.getTime())) return [];

      let end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
      if (event.end_date) {
        const parsedEnd = parseLocalToUTC(event.end_date);
        if (!isNaN(parsedEnd.getTime())) {
          end = parsedEnd;
        }
      }

      // Formatera UTC-tiden till en iCal "floating" tidssträng
      const formatIcsLocal = (d: Date) => {
        const pad = (n: number) => n.toString().padStart(2, "0");
        return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`;
      };

      // Tidsstämpel för när feeden genereras (måste vara UTC med 'Z')
      const formatIcsUtc = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

      const startDateStr = formatIcsLocal(start);
      const endDateStr = formatIcsLocal(end);
      const nowStr = formatIcsUtc(new Date());

      return [
        "BEGIN:VEVENT",
        `UID:${event.id}@skvadern.se`,
        `DTSTAMP:${nowStr}`,
        `DTSTART;TZID=Europe/Stockholm:${startDateStr}`,
        `DTEND;TZID=Europe/Stockholm:${endDateStr}`,
        `SUMMARY:${event.title || ""}`,
        `DESCRIPTION:${(event.description || "").replace(/\n/g, "\\n")}`,
        `LOCATION:${event.location || ""}`,
        "END:VEVENT",
      ];
    }),
    "END:VCALENDAR",
  ];

  return new NextResponse(icsLines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="skvadern.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
