"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4" style={{ backgroundColor: "var(--bg)", color: "var(--text-dark)" }}>
      <h2 className="text-2xl font-bold font-serif">Något gick fel!</h2>
      <p className="text-red-500">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 mt-4 text-sm uppercase tracking-widest transition-colors border"
        style={{
          borderColor: "var(--border)",
          color: "var(--text-dark)",
        }}
      >
        Försök igen
      </button>
    </div>
  );
}
