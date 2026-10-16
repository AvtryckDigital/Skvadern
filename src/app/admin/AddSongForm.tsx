"use client";

import { useRef, useState } from "react";
import { addSong } from "./song-actions";

export function AddSongForm({
  categories = [],
}: {
  categories?: string[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const result = await addSong(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      } else {
        setSuccessMsg("Sången har lagts till i sångboken!");
        formRef.current?.reset();
      }
    } catch {
      setErrorMsg("Ett oväntat fel uppstod vid sparandet.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="p-6 border flex flex-col gap-5 rounded-sm"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-subtle)",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Titel */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="song-title"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Titel *
          </label>
          <input
            id="song-title"
            name="title"
            type="text"
            required
            placeholder="t.ex. Var Skvader eller Helan går"
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>

        {/* Nummer */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="song-number"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Nummer i sångboken
          </label>
          <input
            id="song-number"
            name="number"
            type="number"
            min="1"
            placeholder="t.ex. 1"
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>

        {/* Kategori */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="song-category"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Kategori
          </label>
          <input
            id="song-category"
            name="category"
            type="text"
            list="category-suggestions"
            placeholder="t.ex. Snapsvisor, Skvadern, Punschvisor"
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
          <datalist id="category-suggestions">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
            <option value="Snapsvisor" />
            <option value="Punschvisor" />
            <option value="Ölvisor" />
            <option value="Skvadern" />
            <option value="Högtidsvisor" />
          </datalist>
        </div>

        {/* Melodi */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="song-melody"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Melodi
          </label>
          <input
            id="song-melody"
            name="melody"
            type="text"
            placeholder="t.ex. Vårvindar friska eller Helan går"
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="song-lyrics"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Sångtext *
          </label>
          <textarea
            id="song-lyrics"
            name="lyrics"
            required
            rows={10}
            placeholder={`Skriv verserna här...\n\nLämna en tom rad mellan varje vers.`}
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors font-mono"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
          <p className="text-xs" style={{ color: "var(--text-light)" }}>
            Radbrytningar sparas precis som du skriver dem. Lämna en tom rad mellan verserna.
          </p>
        </div>

        {/* Kommentar */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="song-notes"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Kommentar / Noter (valfritt)
          </label>
          <input
            id="song-notes"
            name="notes"
            type="text"
            placeholder="t.ex. Sjunges när maten bärs in under SkvaderSpel"
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="song-slug"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Webbadress / Slug (valfritt)
          </label>
          <input
            id="song-slug"
            name="slug"
            type="text"
            placeholder="Skapas automatiskt från titeln om tomt (t.ex. var-skvader)"
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>
      </div>

      {/* Meddelanden */}
      {errorMsg && (
        <div
          className="text-sm py-3 px-4 border rounded-sm"
          style={{
            color: "#f87171",
            borderColor: "rgba(248, 113, 113, 0.3)",
            backgroundColor: "rgba(248, 113, 113, 0.08)",
          }}
        >
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div
          className="text-sm py-3 px-4 border rounded-sm"
          style={{
            color: "#4ade80",
            borderColor: "rgba(74, 222, 128, 0.3)",
            backgroundColor: "rgba(74, 222, 128, 0.08)",
          }}
        >
          {successMsg}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-3 text-sm uppercase tracking-widest font-medium transition-all duration-200 hover:brightness-110 disabled:opacity-50"
          style={{
            backgroundColor: "var(--gold)",
            color: "var(--bg)",
          }}
        >
          {isPending ? "Sparar…" : "Lägg till sång"}
        </button>
      </div>
    </form>
  );
}
