import SongSearch from "@/components/SongSearch";
import { getSongs } from "@/lib/songs";

export const metadata = {
  title: "Sångbok",
  description: "Skvaderns sångbok med snapsvisor och traditionella sånger.",
};

export default async function SongbookPage() {
  const songs = await getSongs();

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <section className="py-20 px-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="eyebrow mb-3">
            Sjung med
          </p>
          <h1 className="text-5xl font-bold mb-6">
            Sångbok
          </h1>
          <p className="editorial-text text-base leading-relaxed max-w-xl mx-auto">
            <em>
              Skvaderns visor, punsch- och snapsvisor till fest, sittning och SkvaderSpel.
            </em>
          </p>
        </div>
      </section>

      {/* Sök och sånglista */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {songs.length === 0 ? (
            <div
              className="oxford-frame rounded-sm border p-12 text-center"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-subtle)",
              }}
            >
              <h2
                className="text-2xl font-bold mb-3"
                style={{ color: "var(--text-dark)" }}
              >
                Sångboken fylls på
              </h2>
              <p className="editorial-text text-sm leading-relaxed">
                Inga sånger har lagts upp ännu. Lägg till sånger i adminpanelen eller kom tillbaka snart!
              </p>
            </div>
          ) : (
            <SongSearch
              songs={songs.map(({ slug, title, number, category, melody, lyrics, notes }) => ({
                slug,
                title,
                number,
                category,
                melody,
                lyrics,
                notes,
              }))}
            />
          )}
        </div>
      </section>
    </div>
  );
}
