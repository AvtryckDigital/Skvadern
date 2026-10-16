import { SubscribeButtons } from "@/components/SubscribeButtons";
import EventItem from "@/components/EventItem";
import SectionTitle from "@/components/SectionTitle";
import { getActivities, monthName, parseLocal, todayStockholm } from "@/lib/activities";
import type { Activity } from "@/lib/supabase/types";

export default async function Kalender() {
  const activities = await getActivities();
  const today = todayStockholm();

  const upcoming = activities.filter(
    (a) => (a.end_date ?? a.date).slice(0, 10) >= today
  );
  const past = activities
    .filter((a) => (a.end_date ?? a.date).slice(0, 10) < today)
    .reverse();

  const groupedActivities = upcoming.reduce((acc, activity) => {
    const p = parseLocal(activity.date);
    if (!p) return acc;
    const name = monthName(p.m);
    const monthYear = `${name.charAt(0).toUpperCase() + name.slice(1)} ${p.y}`;

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <section className="py-20 px-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="eyebrow mb-3">
            Kommande aktiviteter
          </p>
          <h1 className="text-5xl font-bold mb-6">
            Kalendarium
          </h1>
          <p className="editorial-text text-base leading-relaxed max-w-xl mx-auto">
            <em>
              Håll koll på föreningens stundande tillställningar nedan. <br />Prenumerera på kalendern för att inte missa nästa aktivitet.
            </em>
          </p>
          <SubscribeButtons />
        </div>
      </section>

      {/* Event cards */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <div
            className="px-5 py-3 mb-2 text-sm border flex items-start sm:items-center gap-3"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-subtle)",
              borderLeft: "3px solid var(--gold)",
            }}
          >
            <span style={{ color: "var(--gold)", fontWeight: 600, letterSpacing: "0.05em" }}>OBS!</span>
            <span className="editorial-text italic">
              Tiderna nedan kan vara preliminära. Exakta tider och detaljer finns alltid i Facebook-evenemanget.
            </span>
          </div>

          {upcoming.length === 0 ? (
            <div
              className="oxford-frame rounded-sm border p-12 text-center"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-subtle)",
              }}
            >
              <p
                className="font-display text-2xl font-bold mb-2"
                style={{ color: "var(--text-dark)" }}
              >
                Inga kommande aktiviteter just nu
              </p>
              <p className="editorial-text text-sm">
                Nya datum läggs upp här så snart de är bestämda.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedActivities).map(([monthYear, monthActivities]) => (
                <section key={monthYear} className="space-y-4">
                  <SectionTitle title={monthYear} className="!mb-6" />
                  <div className="flex flex-col gap-4">
                    {monthActivities.map((event) => (
                      <EventItem key={event.id} activity={event} href={null} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {past.length > 0 && (
            <details
              className="oxford-frame group mt-12 rounded-sm border"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-subtle)",
              }}
            >
              <summary
                className="cursor-pointer list-none px-5 py-4 font-semibold text-xs uppercase tracking-wider marker:hidden flex items-center justify-between"
                style={{ color: "var(--gold)" }}
              >
                <span className="flex items-center gap-2">
                  <span className="inline-block transition-transform group-open:rotate-90">›</span>
                  Tidigare under terminen ({past.length})
                </span>
                <span className="text-xs font-normal" style={{ color: "var(--text-light)" }}>
                  Visa tidigare
                </span>
              </summary>
              <div
                className="flex flex-col gap-3 p-5 border-t opacity-90"
                style={{ borderColor: "var(--border)" }}
              >
                {past.map((event) => (
                  <EventItem key={event.id} activity={event} compact href={null} />
                ))}
              </div>
            </details>
          )}
        </div>
      </section>
    </div>
  );
}
