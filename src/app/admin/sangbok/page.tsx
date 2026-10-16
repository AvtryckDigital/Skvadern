import { getSongs } from "@/lib/songs";
import { AddSongForm } from "../AddSongForm";
import { SongItem } from "../SongItem";

export const metadata = {
  title: "Sångbok | Admin",
};

export default async function AdminSangbokPage() {
  const songs = await getSongs();

  const categories = [
    ...new Set(songs.map((s) => s.category).filter((c): c is string => !!c)),
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-2 font-semibold"
          style={{ color: "var(--gold)" }}
        >
          Sångbok
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Hantera sånger
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-light)" }}>
          Lägg till nya sånger och hantera föreningens sångbok.
        </p>
      </div>

      {/* Add song form */}
      <section className="mb-12">
        <h2
          className="text-xl font-semibold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Lägg till ny sång
        </h2>
        <AddSongForm categories={categories} />
      </section>

      {/* Songs list */}
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Sånger i sångboken
          <span
            className="ml-3 text-sm font-normal"
            style={{ color: "var(--text-light)" }}
          >
            ({songs.length})
          </span>
        </h2>

        {songs.length === 0 ? (
          <p
            className="text-sm py-8 text-center border rounded-sm"
            style={{ color: "var(--text-light)", borderColor: "var(--border)" }}
          >
            Inga sånger tillagda ännu.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {songs.map((song) => (
              <SongItem key={song.slug || song.id} song={song} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
