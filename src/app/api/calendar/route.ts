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
    ...activities.flatMap((event) => {
      // Försök parsa datumet, hoppa över om det är ogiltigt
      const start = new Date(event.date);
      if (isNaN(start.getTime())) return []; // Hoppa över event med trasigt datum

      let end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Default 2 timmar
      if (event.end_date) {
        const parsedEnd = new Date(event.end_date);
        if (!isNaN(parsedEnd.getTime())) {
          end = parsedEnd;
        }
      }

      const formatIcs = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

      const startDateStr = formatIcs(start);
      const endDateStr = formatIcs(end);
      const nowStr = formatIcs(new Date());

      return [
        "BEGIN:VEVENT",
        `UID:${event.id}@skvadern.se`,
        `DTSTAMP:${nowStr}`,
        `DTSTART:${startDateStr}`,
        `DTEND:${endDateStr}`,
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
