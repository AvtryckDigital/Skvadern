"use client";

import { useState } from "react";
import { seedBoardMembersAction } from "./board-actions";
import { Sparkles } from "lucide-react";

export function SeedBoardButton() {
  const [isPending, setIsPending] = useState(false);

  async function handleSeed() {
    if (!confirm("Vill du läsa in Skvaderns 8 traditionella sågverksposter (Patron, Vice Patron etc.) till databasen?")) {
      return;
    }
    setIsPending(true);
    try {
      const res = await seedBoardMembersAction();
      if (res?.error) {
        alert("Kunde inte lägga till: " + res.error);
      }
    } catch {
      alert("Ett oväntat fel uppstod.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSeed}
      disabled={isPending}
      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold border border-[#c5a059] text-[#dfbe76] hover:bg-[#c5a059] hover:text-[#12100E] transition-colors disabled:opacity-50 rounded-xs"
    >
      <Sparkles size={14} />
      <span>{isPending ? "Läser in..." : "Läs in Skvaderns 8 standardposter"}</span>
    </button>
  );
}
