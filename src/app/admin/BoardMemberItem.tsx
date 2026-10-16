"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Edit2, X, Check, Mail, User } from "lucide-react";
import { deleteBoardMember, editBoardMember } from "./board-actions";
import type { BoardMember } from "@/lib/supabase/types";

export function BoardMemberItem({ member }: { member: BoardMember }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleEdit(formData: FormData) {
    setIsPending(true);
    setErrorMsg(null);
    try {
      const result = await editBoardMember(member.id, formData);
      if (result?.error) {
        setErrorMsg(result.error);
      } else {
        setIsEditing(false);
      }
    } catch {
      setErrorMsg("Kunde inte spara ändringarna.");
    } finally {
      setIsPending(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Är du säker på att du vill ta bort posten "${member.role} (${member.name})"?`)) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteBoardMember(member.id);
    } catch {
      alert("Kunde inte ta bort posten.");
      setIsDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <form
        action={handleEdit}
        className="flex flex-col gap-4 p-5 border rounded-sm"
        style={{
          borderColor: "var(--gold)",
          borderLeft: "3px solid var(--gold)",
          backgroundColor: "var(--bg-subtle)",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" style={{ color: "var(--text-light)" }}>
              Ämbetstitel *
            </label>
            <input
              name="role"
              defaultValue={member.role}
              required
              className="px-3 py-2 text-sm border bg-transparent"
              style={{ borderColor: "var(--border)", color: "var(--text-dark)" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" style={{ color: "var(--text-light)" }}>
              Namn *
            </label>
            <input
              name="name"
              defaultValue={member.name}
              required
              className="px-3 py-2 text-sm border bg-transparent"
              style={{ borderColor: "var(--border)", color: "var(--text-dark)" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" style={{ color: "var(--text-light)" }}>
              Rollbeskrivning
            </label>
            <input
              name="role_description"
              defaultValue={member.role_description || ""}
              placeholder="t.ex. Ordförande"
              className="px-3 py-2 text-sm border bg-transparent"
              style={{ borderColor: "var(--border)", color: "var(--text-dark)" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" style={{ color: "var(--text-light)" }}>
              E-post
            </label>
            <input
              name="email"
              type="email"
              defaultValue={member.email || ""}
              placeholder="t.ex. patron@skvadern.net"
              className="px-3 py-2 text-sm border bg-transparent"
              style={{ borderColor: "var(--border)", color: "var(--text-dark)" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" style={{ color: "var(--text-light)" }}>
              Ordning
            </label>
            <input
              name="sort_order"
              type="number"
              defaultValue={member.sort_order}
              className="px-3 py-2 text-sm border bg-transparent"
              style={{ borderColor: "var(--border)", color: "var(--text-dark)" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" style={{ color: "var(--text-light)" }}>
              Ny bild (fil)
            </label>
            <input
              name="image_file"
              type="file"
              accept="image/*"
              className="px-2 py-1.5 text-xs border bg-transparent file:mr-2 file:py-1 file:px-2 file:border-0 file:text-xs file:font-semibold file:bg-[#C9A050] file:text-[#12100E]"
              style={{ borderColor: "var(--border)", color: "var(--text-dark)" }}
            />
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-3">
            <label className="text-xs uppercase" style={{ color: "var(--text-light)" }}>
              Bild-URL (befintlig eller extern länk)
            </label>
            <input
              name="image_url"
              defaultValue={member.image || ""}
              placeholder="/images/... eller https://..."
              className="px-3 py-2 text-sm border bg-transparent"
              style={{ borderColor: "var(--border)", color: "var(--text-dark)" }}
            />
          </div>
        </div>

        {errorMsg && (
          <div className="text-red-400 text-sm mt-1">{errorMsg}</div>
        )}

        <div className="flex gap-2 justify-end mt-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            disabled={isPending}
            className="flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider border transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--text-light)" }}
          >
            <X size={14} />
            <span>Avbryt</span>
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors disabled:opacity-50"
            style={{ backgroundColor: "var(--gold)", color: "var(--bg)" }}
          >
            <Check size={14} />
            <span>{isPending ? "Sparar..." : "Spara ändringar"}</span>
          </button>
        </div>
      </form>
    );
  }

  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-sm transition-colors hover:border-[#c5a059]/40"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-subtle)",
      }}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Sorteringsordning badge */}
        <span
          className="w-7 h-7 flex-shrink-0 flex items-center justify-center text-xs font-semibold rounded-full border"
          style={{
            borderColor: "rgba(201, 160, 80, 0.3)",
            color: "var(--gold-light)",
            backgroundColor: "var(--bg)",
          }}
          title={`Ordning: ${member.sort_order}`}
        >
          {member.sort_order}
        </span>

        {/* Thumbnail eller avatar */}
        <div
          className="w-12 h-14 flex-shrink-0 relative overflow-hidden rounded-sm border p-0.5"
          style={{
            borderColor: "rgba(201, 160, 80, 0.25)",
            backgroundColor: "var(--bg)",
          }}
        >
          {member.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#dfbe76]">
              <span className="font-display font-bold text-sm">
                {member.role.slice(0, 1)}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="font-display text-lg font-bold truncate"
              style={{ color: "var(--text-dark)" }}
            >
              {member.role}
            </h3>
            {member.role_description && (
              <span className="font-serif text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#dfbe76] px-2 py-0.5 rounded-xs border border-[#c5a059]/20 bg-[#12100E]">
                {member.role_description}
              </span>
            )}
          </div>
          <p className="font-serif text-sm italic text-[#CFC4B4] truncate">
            {member.name}
          </p>
          {member.email && (
            <p className="text-xs text-[#B0A494] flex items-center gap-1.5 mt-0.5 truncate">
              <Mail size={12} className="opacity-70 flex-shrink-0" />
              <span className="truncate">{member.email}</span>
            </p>
          )}
        </div>
      </div>

      {/* Knappar */}
      <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs uppercase tracking-wider border rounded-xs transition-colors hover:border-[#c5a059] hover:text-[#dfbe76]"
          style={{ borderColor: "var(--border)", color: "var(--text-light)" }}
          title="Redigera post"
        >
          <Edit2 size={13} />
          <span>Ändra</span>
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-1 px-3 py-1.5 text-xs uppercase tracking-wider border rounded-xs transition-colors text-red-400 border-red-900/40 hover:bg-red-950/40 disabled:opacity-50"
          title="Ta bort post"
        >
          <Trash2 size={13} />
          <span>{isDeleting ? "Tar bort..." : "Ta bort"}</span>
        </button>
      </div>
    </div>
  );
}
