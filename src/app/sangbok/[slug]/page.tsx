import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getSong, getSongs } from "@/lib/songs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const song = await getSong(slug);
  return {
    title: song ? `${song.title} – Sångbok` : "Sången finns inte",
  };
}

export async function generateStaticParams() {
  const songs = await getSongs();
  return songs.map((s) => ({ slug: s.slug }));
}

export default async function SongPage({ params }: Props) {
  const { slug } = await params;
  const song = await getSong(slug);

  if (!song) {
    notFound();
  }

  const intro = [
    song.melody ? `Melodi: ${song.melody}` : null,
    song.category,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <section
        className="py-16 sm:py-20 px-6 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/sangbok"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] mb-8 transition-colors hover:text-white"
            style={{ color: "var(--gold)" }}
          >
            <ChevronLeft size={16} />
            <span>Tillbaka till Sångboken</span>
          </Link>

          <p
            className="text-xs uppercase tracking-[0.3em] mb-3 font-semibold"
            style={{ color: "var(--gold)" }}
          >
            {song.number != null ? `Nr ${song.number}` : "Sångbok"}
          </p>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--text-dark)",
            }}
          >
            {song.title}
          </h1>

          {intro && (
            <p
              className="text-sm sm:text-base leading-relaxed italic"
              style={{
                fontFamily: "'Lora', serif",
                color: "var(--text-mid)",
              }}
            >
              {intro}
            </p>
          )}
        </div>
      </section>

      {/* Lyrics body */}
      <section className="py-16 sm:py-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Centered lyrics */}
          <div
            className="lyrics text-center leading-loose"
            style={{ color: "var(--text-dark)" }}
          >
            {song.lyrics}
          </div>

          {/* Notes / Kommentar card */}
          {song.notes && (
            <div
              className="oxford-frame mt-16 p-6 border rounded-sm"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-subtle)",
              }}
            >
              <h2
                className="text-lg font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--gold)",
                }}
              >
                Kommentar
              </h2>
              <p
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{
                  fontFamily: "'Lora', serif",
                  color: "var(--text-mid)",
                }}
              >
                {song.notes}
              </p>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
