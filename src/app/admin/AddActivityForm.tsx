"use client";

import { useState, useRef } from "react";
import { addActivity } from "./actions";

export function AddActivityForm() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setErrorMsg(null);
    try {
      const result = await addActivity(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      } else {
        formRef.current?.reset();
      }
    } catch (e: any) {
      console.error(e);
      setErrorMsg("Något gick fel vid skapandet av aktiviteten.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="p-6 border flex flex-col gap-5"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-subtle)",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="title"
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--text-light)" }}
          >
            Aktivitet *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="t.ex. SkvaderSpel"
            className="px-4 py-3 text-sm border bg-transparent outline-none"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--text-light)" }}
          >
            Starttid *
          </label>
          <div className="flex gap-2">
            <input
              name="start_date"
              type="date"
              required
              className="flex-1 px-4 py-3 text-sm border bg-transparent outline-none"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-dark)",
                backgroundColor: "var(--bg)",
                colorScheme: "dark",
              }}
            />
            <input
              name="start_time"
              type="time"
              required
              className="w-28 px-4 py-3 text-sm border bg-transparent outline-none"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-dark)",
                backgroundColor: "var(--bg)",
                colorScheme: "dark",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--text-light)" }}
          >
            Sluttid (valfritt)
          </label>
          <div className="flex gap-2">
            <input
              name="end_date"
              type="date"
              className="flex-1 px-4 py-3 text-sm border bg-transparent outline-none"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-dark)",
                backgroundColor: "var(--bg)",
                colorScheme: "dark",
              }}
            />
            <input
              name="end_time"
              type="time"
              className="w-28 px-4 py-3 text-sm border bg-transparent outline-none"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-dark)",
                backgroundColor: "var(--bg)",
                colorScheme: "dark",
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="location"
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--text-light)" }}
          >
            Plats
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="t.ex. Norrlands Nation"
            className="px-4 py-3 text-sm border bg-transparent outline-none"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="description"
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--text-light)" }}
          >
            Beskrivning
          </label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Valfri anteckning"
            className="px-4 py-3 text-sm border bg-transparent outline-none"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-dark)",
              backgroundColor: "var(--bg)",
            }}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="text-red-500 text-sm mt-2">{errorMsg}</div>
      )}

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-3 text-sm uppercase tracking-widest font-medium transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_16px_rgba(201,160,80,0.35)] disabled:opacity-50"
          style={{
            backgroundColor: "var(--gold)",
            color: "var(--bg)",
          }}
        >
          {isPending ? "Sparar..." : "Lägg till"}
        </button>
      </div>
    </form>
  );
}
