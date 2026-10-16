"use client";

import { useRef, useState } from "react";
import { addBoardMember } from "./board-actions";
import { PlusCircle, Upload } from "lucide-react";

export function AddBoardMemberForm({ nextSortOrder = 1 }: { nextSortOrder?: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const result = await addBoardMember(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      } else {
        setSuccessMsg("Styrelseposten har lagts till framgångsrikt!");
        formRef.current?.reset();
      }
    } catch {
      setErrorMsg("Ett oväntat fel uppstod när posten skulle sparas.");
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Ämbetstitel */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="bm-role"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Ämbetstitel *
          </label>
          <input
            id="bm-role"
            name="role"
            type="text"
            required
            placeholder="t.ex. Patron eller Bokhållare"
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>

        {/* Namn */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="bm-name"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Namn *
          </label>
          <input
            id="bm-name"
            name="name"
            type="text"
            required
            placeholder="t.ex. Broder Patron eller Förnamn Efternamn"
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>

        {/* Rollbeskrivning */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="bm-desc"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Beskrivning / Post
          </label>
          <input
            id="bm-desc"
            name="role_description"
            type="text"
            placeholder="t.ex. Ordförande, Skattmästare"
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>

        {/* E-post */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="bm-email"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            E-postadress
          </label>
          <input
            id="bm-email"
            name="email"
            type="email"
            placeholder="t.ex. patron@skvadern.net"
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>

        {/* Sorteringsordning */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="bm-sort"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Sorteringsordning
          </label>
          <input
            id="bm-sort"
            name="sort_order"
            type="number"
            defaultValue={nextSortOrder}
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>

        {/* Ladda upp porträttbild */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="bm-file"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Porträttbild (fil)
          </label>
          <input
            id="bm-file"
            name="image_file"
            type="file"
            accept="image/*"
            className="px-3 py-2 text-xs border bg-transparent file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-[#C9A050] file:text-[#12100E] hover:file:opacity-90"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>

        {/* Bild-URL (alternativ) */}
        <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-3">
          <label
            htmlFor="bm-img-url"
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-light)" }}
          >
            Eller bild-URL (valfritt om du redan har bildlänk)
          </label>
          <input
            id="bm-img-url"
            name="image_url"
            type="text"
            placeholder="t.ex. /images/profil/patron.jpg eller https://..."
            className="px-4 py-3 text-sm border bg-transparent outline-none transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 text-sm text-red-400 bg-red-950/30 border border-red-800 rounded-sm">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-3 text-sm text-emerald-300 bg-emerald-950/30 border border-emerald-800 rounded-sm">
          {successMsg}
        </div>
      )}

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
          style={{
            backgroundColor: "var(--gold)",
            color: "var(--bg)",
          }}
        >
          <PlusCircle size={16} />
          <span>{isPending ? "Sparar..." : "Lägg till ämbetsman"}</span>
        </button>
      </div>
    </form>
  );
}
