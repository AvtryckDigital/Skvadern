"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Dices, Search, X } from "lucide-react";
import type { Song } from "@/lib/supabase/types";

export type SongListItem = Pick<
  Song,
  "slug" | "title" | "number" | "category" | "melody" | "lyrics"
> & {
  notes?: string | null;
};

/** Normaliserar text: gemener, rensar skiljetecken till mellanslag, trimmar */
function norm(s: string | null | undefined): string {
  if (!s) return "";
  return s
    .toLowerCase()
    .replace(/[,\.:;!\?\"\'\(\)\[\]\/\\–—\-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Accent-vikning: hanterar även sökningar där å/ä/ö skrivits som a/o eller é som e */
function fold(s: string | null | undefined): string {
  return norm(s)
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/é/g, "e");
}

/** Returnerar första raden ur texten som matchar något av sökorden */
function matchingLine(lyrics: string, queryWords: string[]) {
  if (!lyrics || queryWords.length === 0) return null;
  const lines = lyrics.split(/\r?\n/);
  for (const line of lines) {
    const lNorm = norm(line);
    const lFold = fold(line);
    if (queryWords.some((w) => lNorm.includes(w) || lFold.includes(fold(w)))) {
      return line.trim();
    }
  }
  return null;
}

/** Case-insensitive highlight som bevarar originaltextens skiftläge */
function Highlight({ text, query }: { text: string | null | undefined; query: string }) {
  if (!text) return null;
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;

  // Skapa unika ord från söksträngen för sökmarkering
  const words = [
    ...new Set(
      trimmed
        .split(/\s+/)
        .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .filter(Boolean)
    ),
  ];

  if (words.length === 0) return <>{text}</>;

  try {
    const regex = new RegExp(`(${words.join("|")})`, "gi");
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark
              key={i}
              className="rounded-sm px-0.5 text-inherit"
              style={{ backgroundColor: "rgba(201, 160, 80, 0.35)" }}
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  } catch {
    return <>{text}</>;
  }
}

export default function SongSearch({ songs }: { songs: SongListItem[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");

  const categories = useMemo(
    () =>
      [
        ...new Set(
          songs.map((s) => s.category).filter((c): c is string => !!c)
        ),
      ].sort((a, b) => a.localeCompare(b, "sv")),
    [songs]
  );

  const results = useMemo(() => {
    const qTrimmed = query.trim();
    const qNorm = norm(qTrimmed);
    const qFold = fold(qTrimmed);

    return songs
      .filter((s) => {
        if (!category) return true;
        return (
          (s.category ?? "").toLowerCase() === category.toLowerCase()
        );
      })
      .map((s) => {
        if (!qNorm) return { song: s, line: null as string | null, rank: 0 };

        const termsNorm = qNorm.split(" ").filter(Boolean);
        const termsFold = qFold.split(" ").filter(Boolean);

        const titleN = norm(s.title);
        const titleF = fold(s.title);
        const melN = norm(s.melody);
        const melF = fold(s.melody);
        const catN = norm(s.category);
        const catF = fold(s.category);
        const notesN = norm(s.notes);
        const notesF = fold(s.notes);
        const lyricsN = norm(s.lyrics);
        const lyricsF = fold(s.lyrics);
        const numStr = String(s.number ?? "");

        // Sökordet matchar exakt sångnumret
        const matchesNumber = numStr === qNorm || numStr === termsNorm[0];

        // Kontrollera om varje term i sökningen finns i någon del av sången
        const allTermsMatch = termsNorm.every((term, i) => {
          const termF = termsFold[i] || fold(term);
          return (
            numStr === term ||
            titleN.includes(term) ||
            titleF.includes(termF) ||
            melN.includes(term) ||
            melF.includes(termF) ||
            catN.includes(term) ||
            catF.includes(termF) ||
            notesN.includes(term) ||
            notesF.includes(termF) ||
            lyricsN.includes(term) ||
            lyricsF.includes(termF)
          );
        });

        if (!matchesNumber && !allTermsMatch) {
          return null;
        }

        // Rangordning:
        // 0: Exakt siffermatch eller titelmatch
        // 1: Melodimatch
        // 2: Noter/kategorimatch
        // 3: Textmatch
        const inTitle =
          matchesNumber ||
          titleN.includes(qNorm) ||
          titleF.includes(qFold) ||
          termsNorm.every((t, i) => titleN.includes(t) || titleF.includes(termsFold[i]));

        const inMelody =
          melN.includes(qNorm) ||
          melF.includes(qFold) ||
          termsNorm.every((t, i) => melN.includes(t) || melF.includes(termsFold[i]));

        const inNotesOrCat =
          catN.includes(qNorm) ||
          notesN.includes(qNorm) ||
          termsNorm.every(
            (t, i) =>
              catN.includes(t) ||
              notesN.includes(t) ||
              catF.includes(termsFold[i]) ||
              notesF.includes(termsFold[i])
          );

        const line = !inTitle ? matchingLine(s.lyrics, termsNorm) : null;
        const rank = inTitle ? 0 : inMelody ? 1 : inNotesOrCat ? 2 : 3;

        return { song: s, line, rank };
      })
      .filter(
        (x): x is { song: SongListItem; line: string | null; rank: number } => !!x
      )
      .sort((a, b) => a.rank - b.rank);
  }, [songs, query, category]);

  const handleRandomSong = () => {
    const pool = results.length > 0 ? results.map((r) => r.song) : songs;
    if (pool.length === 0) return;
    const randomSong = pool[Math.floor(Math.random() * pool.length)];
    router.push(`/sangbok/${randomSong.slug}`);
  };

  return (
    <div>
      {/* Search Header Controls */}
      <div
        className="sticky top-20 z-10 -mx-4 px-4 py-4 backdrop-blur sm:mx-0 sm:px-0 border-b mb-6"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "rgba(18, 16, 14, 0.95)",
        }}
      >
        <label htmlFor="sok" className="sr-only">
          Sök i sångboken
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--gold)" }}
              aria-hidden
            />
            <input
              id="sok"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Sök på titel, melodi eller en rad ur texten…"
              autoComplete="off"
              className="w-full rounded-sm border py-3 pl-11 pr-11 text-sm outline-none transition-colors"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-subtle)",
                color: "var(--text-dark)",
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Rensa sökningen"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 transition-colors hover:text-white"
                style={{ color: "var(--text-light)" }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleRandomSong}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm border px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200 hover:brightness-110"
            style={{
              borderColor: "var(--gold)",
              backgroundColor: "var(--bg-subtle)",
              color: "var(--gold)",
            }}
            title="Öppna en slumpmässig visa ur sångboken"
          >
            <Dices size={16} />
            <span>Slumpa visa</span>
          </button>
        </div>

        {/* Category Pills */}
        {categories.length > 0 && (
          <div
            className="mt-3.5 flex flex-wrap gap-2"
            role="group"
            aria-label="Filtrera på kategori"
          >
            {["", ...categories].map((c) => (
              <button
                key={c || "alla"}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className="rounded-sm px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all"
                style={{
                  border: "1px solid",
                  borderColor: category === c ? "var(--gold)" : "var(--border)",
                  backgroundColor:
                    category === c ? "var(--gold)" : "var(--bg-subtle)",
                  color: category === c ? "var(--bg)" : "var(--text-mid)",
                }}
              >
                {c || "Alla"}
              </button>
            ))}
          </div>
        )}
      </div>

      <p
        className="mb-4 text-xs uppercase tracking-wider"
        style={{ color: "var(--text-light)" }}
        aria-live="polite"
      >
        {query.trim() || category
          ? `${results.length} ${results.length === 1 ? "sång" : "sånger"} hittades`
          : `${songs.length} sånger`}
      </p>

      {results.length === 0 ? (
        <div
          className="oxford-frame rounded-sm border p-12 text-center"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-subtle)",
          }}
        >
          <p
            className="text-base"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            <em>Ingen sång matchade sökningen.</em>
          </p>
        </div>
      ) : (
        <ul
          className="divide-y overflow-hidden rounded-sm border"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-subtle)",
          }}
        >
          {results.map(({ song, line }) => (
            <li key={song.slug}>
              <Link
                href={`/sangbok/${song.slug}`}
                className="group flex gap-4 px-5 py-4 transition-colors hover:bg-white/5"
              >
                <span
                  className="w-10 shrink-0 pt-0.5 text-right font-bold text-xl"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "var(--gold)",
                  }}
                  aria-hidden
                >
                  {song.number ?? ""}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block text-lg font-bold leading-snug group-hover:text-[var(--gold)] transition-colors"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "var(--text-dark)",
                    }}
                  >
                    <Highlight text={song.title} query={query} />
                  </span>
                  <span
                    className="block text-xs mt-0.5"
                    style={{ color: "var(--text-mid)" }}
                  >
                    {song.melody && (
                      <>
                        Melodi: <Highlight text={song.melody} query={query} />
                      </>
                    )}
                    {song.melody && song.category && " · "}
                    {song.category}
                  </span>
                  {line && (
                    <span
                      className="mt-1 block truncate text-xs italic"
                      style={{
                        fontFamily: "'Lora', serif",
                        color: "var(--text-light)",
                      }}
                    >
                      &rdquo;
                      <Highlight text={line} query={query} />
                      &rdquo;
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
