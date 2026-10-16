import { createClient } from "@/lib/supabase/server";
import { AddBoardMemberForm } from "../AddBoardMemberForm";
import { BoardMemberItem } from "../BoardMemberItem";
import { SeedBoardButton } from "../SeedBoardButton";
import type { BoardMember } from "@/lib/supabase/types";

export const metadata = {
  title: "Styrelsen | Admin",
};

export default async function AdminStyrelsenPage() {
  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from("board_members")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<BoardMember[]>();

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-2 font-semibold"
          style={{ color: "var(--gold)" }}
        >
          Styrelsen
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Hantera styrelsen & ämbetsmän
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-light)" }}>
          Lägg till nya ämbetstitlar, ändra namn, roller, e-post, ordning och porträttbilder.
        </p>
      </div>

      {/* Databas-varning om tabellen saknas i Supabase */}
      {error && (
        <div
          className="mb-8 p-5 border rounded-sm"
          style={{
            borderColor: "rgba(201, 160, 80, 0.4)",
            backgroundColor: "var(--bg-subtle)",
          }}
        >
          <h2
            className="text-base font-bold mb-1"
            style={{ color: "var(--gold-light)" }}
          >
            Tabellen board_members är inte skapad i Supabase ännu
          </h2>
          <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-mid)" }}>
            För att spara styrelseposter i databasen behöver tabellen skapas. Kör SQL-skriptet i filen{" "}
            <code className="px-1.5 py-0.5 rounded bg-black/40 text-amber-200">
              supabase/board_members.sql
            </code>{" "}
            i din Supabase SQL Editor.
          </p>
          <p className="text-xs italic text-stone-400">
            Felmeddelande från databasen: {error.message}
          </p>
        </div>
      )}

      {/* Formulär för att lägga till */}
      <section className="mb-12">
        <h2
          className="text-xl font-semibold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Lägg till ämbetstitel / styrelsepost
        </h2>
        <AddBoardMemberForm nextSortOrder={(members?.length ?? 0) + 1} />
      </section>

      {/* Lista med befintliga poster */}
      <section>
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <h2
            className="text-xl font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nuvarande styrelseposter
            <span
              className="ml-3 text-sm font-normal"
              style={{ color: "var(--text-light)" }}
            >
              ({members?.length ?? 0})
            </span>
          </h2>

          {(!members || members.length === 0) && !error && (
            <SeedBoardButton />
          )}
        </div>

        {!members || members.length === 0 ? (
          <div
            className="p-8 text-center border rounded-sm flex flex-col items-center gap-4"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-light)" }}>
              Inga styrelsemedlemmar finns i databasen ännu.
            </p>
            <SeedBoardButton />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {members.map((member) => (
              <BoardMemberItem key={member.id} member={member} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
