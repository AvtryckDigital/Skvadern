import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import type { Activity } from "@/lib/supabase/types";
import {
  dayOfMonth,
  formatDate,
  monthShort,
  timeRange,
  weekday,
} from "@/lib/activities";

export default function EventItem({
  activity,
  compact = false,
  href,
}: {
  activity: Activity;
  compact?: boolean;
  href?: string | null;
}) {
  const time = timeRange(activity.date, activity.end_date);
  const isSpel = /spel/i.test(activity.title);
  const targetHref = href !== undefined ? href : `/kalender#activity-${activity.id}`;

  return (
    <article
      id={`activity-${activity.id}`}
      className={`oxford-frame group/card relative flex gap-4 rounded-sm border p-4 sm:gap-5 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        isSpel
          ? "border-[var(--gold)]/60 ring-1 ring-[var(--gold)]/20"
          : "hover:border-[var(--gold)]/50"
      }`}
      style={{
        borderColor: isSpel ? undefined : "var(--border)",
        backgroundColor: "var(--bg-subtle)",
      }}
    >
      {/* Datumruta / Box med dag och månad i Ypsilon-stil */}
      <div
        className={`flex w-16 shrink-0 flex-col items-center justify-center rounded-sm py-2 text-center sm:w-[4.5rem] border ${
          isSpel
            ? "border-[var(--gold)]/50 shadow-sm"
            : ""
        }`}
        style={{
          borderColor: isSpel ? undefined : "var(--border)",
          backgroundColor: "var(--bg)",
          borderLeft: isSpel ? "3px solid var(--gold)" : undefined,
        }}
        aria-hidden
      >
        <span
          className="text-3xl font-bold leading-none"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "var(--text-dark)",
          }}
        >
          {dayOfMonth(activity.date)}
        </span>
        <span
          className="mt-1 text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: "var(--gold)" }}
        >
          {monthShort(activity.date)}
        </span>
      </div>

      {/* Evenemangsinnehåll */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3
            className="text-xl font-bold leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--text-dark)",
            }}
          >
            {targetHref ? (
              <Link
                href={targetHref}
                className="decoration-[var(--gold)]/60 underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover/card:underline"
              >
                {activity.title}
              </Link>
            ) : (
              activity.title
            )}
          </h3>

          {isSpel && (
            <span
              className="inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: "rgba(201, 160, 80, 0.45)",
                backgroundColor: "rgba(201, 160, 80, 0.12)",
                color: "var(--gold)",
              }}
            >
              Spel
            </span>
          )}
        </div>

        <p className="sr-only">
          {weekday(activity.date)} {formatDate(activity.date)}
        </p>

        <div
          className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs"
          style={{ color: "var(--text-mid)" }}
        >
          <span className="capitalize">{weekday(activity.date)}</span>
          {time && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} style={{ color: "var(--gold)" }} aria-hidden />
              <span>{time}</span>
            </span>
          )}
          {activity.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} style={{ color: "var(--gold)" }} aria-hidden />
              <span>{activity.location}</span>
            </span>
          )}
        </div>

        {activity.description && !compact && (
          <p
            className="mt-3 text-sm leading-relaxed whitespace-pre-line"
            style={{
              fontFamily: "'Lora', serif",
              color: "var(--text-mid)",
            }}
          >
            {activity.description}
          </p>
        )}

        {activity.description && compact && (
          <p
            className="mt-2.5 text-xs leading-relaxed line-clamp-2"
            style={{
              fontFamily: "'Lora', serif",
              color: "var(--text-mid)",
            }}
          >
            {activity.description}
          </p>
        )}
      </div>
    </article>
  );
}
