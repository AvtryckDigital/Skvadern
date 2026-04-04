import { createClient } from "@/lib/supabase/server";
import { CalendarDays, Clock, Tag, MapPin, FileText } from "lucide-react";
import type { Activity } from "@/lib/supabase/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function Kalender() {
  const supabase = await createClient();

  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .order("date", { ascending: true })
    .returns<Activity[]>();

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <section className="py-20 px-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "var(--gold)" }}
          >
            Kommande aktiviteter
          </p>
          <h1
            className="text-5xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kalender
          </h1>
          <p
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            <em>
              Håll koll på föreningens stundande tillställningar och reservera
              plats i kalendern.
            </em>
          </p>
        </div>
      </section>

      {/* Event cards */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {!activities || activities.length === 0 ? (
            <p
              className="text-center py-16 text-sm"
              style={{ color: "var(--text-light)" }}
            >
              Inga kommande aktiviteter just nu.
            </p>
          ) : (
            activities.map((event) => (
              <div
                key={event.id}
                className="border flex flex-col"
                style={{
                  borderColor: "var(--border)",
                  borderLeft: "3px solid var(--gold)",
                  backgroundColor: "var(--bg-subtle)",
                }}
              >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 p-6">
                {/* Aktivitet */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Tag
                    size={16}
                    style={{ color: "var(--gold)" }}
                    className="flex-shrink-0"
                  />
                  <div>
                    <div
                      className="text-xs uppercase tracking-widest mb-0.5"
                      style={{ color: "var(--text-light)" }}
                    >
                      Aktivitet
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "var(--text-dark)" }}
                    >
                      {event.title}
                    </div>
                  </div>
                </div>

         

                <div
                  className="hidden sm:block w-px h-8 mx-6 flex-shrink-0"
                  style={{ backgroundColor: "var(--border)" }}
                />

                {/* Datum */}
                <div className="flex items-center gap-3 sm:w-30 flex-shrink-0">
                  <CalendarDays
                    size={16}
                    style={{ color: "var(--gold)" }}
                    className="flex-shrink-0"
                  />
                  <div>
                    <div
                      className="text-xs uppercase tracking-widest mb-0.5"
                      style={{ color: "var(--text-light)" }}
                    >
                      Datum
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "var(--text-dark)" }}
                    >
                      {formatDate(event.date)}
                    </div>
                  </div>
                </div>

                <div
                  className="hidden sm:block w-px h-8 mx-6 flex-shrink-0"
                  style={{ backgroundColor: "var(--border)" }}
                />

                {/* Tid */}
                <div className="flex items-center gap-3 sm:w-16 flex-shrink-0">
                  <Clock
                    size={16}
                    style={{ color: "var(--gold)" }}
                    className="flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div
                      className="text-xs uppercase tracking-widest mb-0.5"
                      style={{ color: "var(--text-light)" }}
                    >
                      Tid
                    </div>
                    <div
                      className="text-sm font-semibold truncate"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "var(--text-dark)",
                        
                      }}
                    >
                      {formatTime(event.date)}

                      
                    </div>
                  </div>
                </div>

                <div
                  className="hidden sm:block w-px h-8 mx-6 flex-shrink-0"
                  style={{ backgroundColor: "var(--border)" }}
                />

                {/* Plats */}
                <div className="flex items-center gap-3 sm:w-52 flex-shrink-0">
                  <MapPin
                    size={16}
                    style={{ color: "var(--gold)" }}
                    className="flex-shrink-0"
                  />
                  <div>
                    <div
                      className="text-xs uppercase tracking-widest mb-0.5"
                      style={{ color: "var(--text-light)" }}
                    >
                      Plats
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--text-mid)" }}
                    >
                      <span style={{ color: "var(--text-dark)" }}>
                        {event.location ?? "Meddelas senare"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Beskrivning — visas bara om den finns */}
              {event.description && (
                <div
                  className="flex items-start gap-3 px-6 pb-5 pt-4 border-t"
                  style={{ borderColor: "var(--border)" }}
                >
                  <FileText
                    size={16}
                    style={{ color: "var(--gold)" }}
                    className="flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <div
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: "var(--text-light)" }}
                    >
                      Beskrivning
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "var(--text-dark)",
                      }}
                    >
                      {event.description}
                    </p>
                  </div>
                </div>
              )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
