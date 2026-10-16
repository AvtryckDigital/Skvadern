"use client";

import Link from "next/link";
import { Trash2, ExternalLink } from "lucide-react";
import { deleteSong } from "./song-actions";
import type { Song } from "@/lib/supabase/types";

export function SongItem({ song }: { song: Song }) {
  const deleteWithId = deleteSong.bind(null, song.id);

  return (
    <div
      className="flex items-start gap-4 px-5 py-4 border group rounded-sm transition-all hover:border-[var(--gold)]/40"
      style={{
        borderColor: "var(--border)",
        borderLeft: "3px solid var(--gold)",
        backgroundColor: "var(--bg-subtle)",
      }}
    >
      {/* Nummer */}
      <div
        className="w-10 shrink-0 text-center font-bold text-lg pt-0.5"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "var(--gold)",
        }}
      >
        {song.number ?? "–"}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3
            className="font-bold text-base"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--text-dark)",
            }}
          >
            {song.title}
          </h3>
          {song.category && (
            <span
              className="text-[0.7rem] uppercase tracking-wider px-2 py-0.5 border rounded-sm"
              style={{
                borderColor: "var(--border)",
                color: "var(--gold)",
                backgroundColor: "var(--bg)",
              }}
            >
              {song.category}
            </span>
          )}
        </div>

        <div className="text-xs mt-1" style={{ color: "var(--text-light)" }}>
          {song.melody && <span>Melodi: {song.melody}</span>}
          {song.melody && song.notes && " · "}
          {song.notes && <span className="italic">{song.notes}</span>}
        </div>

        {/* Utdrag ur text */}
        <p
          className="text-xs mt-2 line-clamp-2 italic"
          style={{
            fontFamily: "'Lora', serif",
            color: "var(--text-mid)",
          }}
        >
          {song.lyrics.split("\n")[0]}…
        </p>
      </div>

      {/* Åtgärder */}
      <div className="flex items-center gap-1 shrink-0">
        <Link
          href={`/sangbok/${song.slug}`}
          target="_blank"
          title="Visa sång på webbplatsen"
          className="p-2 rounded transition-all duration-200 hover:text-[var(--gold)] hover:bg-[var(--gold)]/10"
          style={{ color: "var(--text-light)" }}
        >
          <ExternalLink size={16} />
        </Link>
        <form action={deleteWithId}>
          <button
            type="submit"
            aria-label={`Ta bort ${song.title}`}
            title="Ta bort sång"
            className="p-2 rounded transition-all duration-200 hover:text-red-400 hover:bg-red-400/10"
            style={{ color: "var(--text-light)" }}
          >
            <Trash2 size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
