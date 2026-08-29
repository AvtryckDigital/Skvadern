"use client";

import { useState } from "react";
import { Trash2, Edit2, X, Check } from "lucide-react";
import { deleteActivity, editActivity } from "./actions";
import type { Activity } from "@/lib/supabase/types";

function formatDateTime(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time };
}

export function ActivityItem({ activity }: { activity: Activity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { date, time } = formatDateTime(activity.date);
  
  let endTimeStr = "";
  if (activity.end_date) {
    const end = formatDateTime(activity.end_date);
    endTimeStr = ` - ${end.time}`;
  }

  const deleteWithId = deleteActivity.bind(null, activity.id);

  async function handleEdit(formData: FormData) {
    setIsPending(true);
    try {
      await editActivity(activity.id, formData);
      setIsEditing(false);
    } catch (e) {
      console.error(e);
      alert("Kunde inte spara");
    } finally {
      setIsPending(false);
    }
  }

  if (isEditing) {
    return (
      <form
        action={handleEdit}
        className="flex flex-col gap-4 px-5 py-5 border"
        style={{
          borderColor: "var(--gold)",
          borderLeft: "3px solid var(--gold)",
          backgroundColor: "var(--bg-subtle)",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" style={{ color: "var(--text-light)" }}>Aktivitet *</label>
            <input name="title" defaultValue={activity.title} required className="px-3 py-2 text-sm border bg-transparent" style={{ borderColor: "var(--border)", color: "var(--text-dark)" }} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" style={{ color: "var(--text-light)" }}>Starttid *</label>
            <input name="date" type="datetime-local" defaultValue={activity.date.slice(0, 16)} required className="px-3 py-2 text-sm border bg-transparent" style={{ borderColor: "var(--border)", color: "var(--text-dark)" }} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" style={{ color: "var(--text-light)" }}>Sluttid (valfritt)</label>
            <input name="end_date" type="datetime-local" defaultValue={activity.end_date ? activity.end_date.slice(0, 16) : ""} className="px-3 py-2 text-sm border bg-transparent" style={{ borderColor: "var(--border)", color: "var(--text-dark)" }} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" style={{ color: "var(--text-light)" }}>Plats</label>
            <input name="location" defaultValue={activity.location || ""} className="px-3 py-2 text-sm border bg-transparent" style={{ borderColor: "var(--border)", color: "var(--text-dark)" }} />
          </div>
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-xs uppercase" style={{ color: "var(--text-light)" }}>Beskrivning</label>
            <input name="description" defaultValue={activity.description || ""} className="px-3 py-2 text-sm border bg-transparent" style={{ borderColor: "var(--border)", color: "var(--text-dark)" }} />
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-1 px-4 py-2 text-xs uppercase tracking-widest border transition-colors hover:bg-black/5"
            style={{ borderColor: "var(--border)", color: "var(--text-light)" }}
          >
            <X size={14} /> Avbryt
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-1 px-4 py-2 text-xs uppercase tracking-widest transition-colors hover:brightness-110 disabled:opacity-50"
            style={{ backgroundColor: "var(--gold)", color: "var(--bg)" }}
          >
            <Check size={14} /> Spara
          </button>
        </div>
      </form>
    );
  }

  return (
    <div
      className="flex items-center gap-4 px-5 py-4 border group"
      style={{
        borderColor: "var(--border)",
        borderLeft: "3px solid var(--gold)",
        backgroundColor: "var(--bg-subtle)",
      }}
    >
      <div className="flex-1 min-w-0">
        <div
          className="font-semibold text-sm"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "var(--text-dark)",
          }}
        >
          {activity.title}
        </div>
        <div
          className="text-xs mt-0.5"
          style={{ color: "var(--text-light)" }}
        >
          {date} · {time}{endTimeStr}
          {activity.location && ` · ${activity.location}`}
        </div>
        {activity.description && (
          <div
            className="text-xs mt-1 italic"
            style={{ color: "var(--text-light)" }}
          >
            {activity.description}
          </div>
        )}
      </div>
      
      <div className="flex-shrink-0 flex opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          aria-label={`Redigera ${activity.title}`}
          className="p-2 rounded transition-all duration-200 hover:text-[var(--gold)] hover:bg-[var(--gold)]/10"
          style={{ color: "var(--text-light)" }}
        >
          <Edit2 size={16} />
        </button>
        <form action={deleteWithId}>
          <button
            type="submit"
            aria-label={`Ta bort ${activity.title}`}
            className="p-2 rounded transition-all duration-200 hover:text-red-400 hover:bg-red-400/10"
            style={{ color: "var(--text-light)" }}
          >
            <Trash2 size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
