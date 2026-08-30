"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { uploadImage } from "./gallery-actions";
import { ImagePlus } from "lucide-react";

export function GalleryUploadForm() {
  const [state, action, pending] = useActionState(uploadImage, null);
  const [previews, setPreviews] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form and preview after successful upload
  useEffect(() => {
    if (state === null && !pending && previews.length > 0) {
      // null state + no pending = successful submit
    }
  }, [state, pending, previews]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setPreviews(files.map(file => URL.createObjectURL(file)));
    } else {
      setPreviews([]);
    }
  }

  // Reset after successful upload (state goes null→null but form resets via key trick)
  const [uploadKey, setUploadKey] = useState(0);
  const prevPending = useRef(false);
  useEffect(() => {
    if (prevPending.current && !pending && !state?.error) {
      setPreviews([]);
      setUploadKey((k) => k + 1);
    }
    prevPending.current = pending;
  }, [pending, state]);

  return (
    <form
      key={uploadKey}
      ref={formRef}
      action={action}
      className="p-6 border flex flex-col gap-5"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-subtle)",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* File picker */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="image"
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--text-light)" }}
          >
            Bild *
          </label>
          <label
            htmlFor="image"
            className="flex items-center gap-3 px-4 py-3 text-sm border cursor-pointer transition-colors duration-200 hover:border-[var(--gold)]"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-light)",
              backgroundColor: "var(--bg)",
            }}
          >
            <ImagePlus size={16} style={{ color: "var(--gold)" }} />
            <span>{previews.length > 0 ? `${previews.length} bilder valda…` : "Välj bilder…"}</span>
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            multiple
            required
            className="sr-only"
            onChange={handleFileChange}
          />
        </div>

        {/* Caption */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="caption"
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--text-light)" }}
          >
            Bildtext
          </label>
          <input
            id="caption"
            name="caption"
            type="text"
            placeholder="t.ex. Glada skvadrar"
            className="px-4 py-3 text-sm border bg-transparent outline-none"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="category"
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--text-light)" }}
          >
            Kategori (Valfritt)
          </label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="t.ex. Julspel eller Spel 2026"
            className="px-4 py-3 text-sm border bg-transparent outline-none"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>
      </div>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {previews.map((preview, i) => (
            <div key={i} className="relative w-40 h-28 overflow-hidden border" style={{ borderColor: "var(--border)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt={`Förhandsvisning ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {state?.error && (
        <p
          className="text-sm py-2 px-4 border"
          style={{
            color: "#e07070",
            borderColor: "rgba(224,112,112,0.3)",
            backgroundColor: "rgba(224,112,112,0.07)",
          }}
        >
          {state.error}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="px-8 py-3 text-sm uppercase tracking-widest font-medium transition-all duration-200 disabled:opacity-50 hover:brightness-110 hover:shadow-[0_0_16px_rgba(201,160,80,0.35)]"
          style={{ backgroundColor: "var(--gold)", color: "var(--bg)" }}
        >
          {pending ? "Laddar upp…" : "Ladda upp"}
        </button>
      </div>
    </form>
  );
}
