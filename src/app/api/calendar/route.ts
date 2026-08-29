import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";
import type { Activity } from "@/lib/supabase/types";

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
      const startDateStr = formatIcsDate(event.date);
      let endDateStr = "";
      if (event.end_date) {
        endDateStr = formatIcsDate(event.end_date);
      } else {
        const endDate = new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000);
        endDateStr = formatIcsDate(endDate.toISOString());
      }

      return [
        "BEGIN:VEVENT",
        `UID:${event.id}@skvadern.se`,
        `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
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
