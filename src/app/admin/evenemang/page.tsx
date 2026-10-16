import { createClient } from "@/lib/supabase/server";
import { AddActivityForm } from "../AddActivityForm";
import { ActivityItem } from "../ActivityItem";
import type { Activity } from "@/lib/supabase/types";

export const metadata = {
  title: "Evenemang | Admin",
};

export default async function AdminEvenemangPage() {
  const supabase = await createClient();

  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .order("date", { ascending: true })
    .returns<Activity[]>();

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-2 font-semibold"
          style={{ color: "var(--gold)" }}
        >
          Evenemang
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Hantera kalendarium
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-light)" }}>
          Lägg till, redigera eller ta bort aktiviteter och sittningar.
        </p>
      </div>

      {/* Add activity form */}
      <section className="mb-12">
        <h2
          className="text-xl font-semibold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Lägg till aktivitet
        </h2>
        <AddActivityForm />
      </section>

      {/* Activity list */}
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Aktiviteter i kalendern
          <span
            className="ml-3 text-sm font-normal"
            style={{ color: "var(--text-light)" }}
          >
            ({activities?.length ?? 0})
          </span>
        </h2>

        {!activities || activities.length === 0 ? (
          <p
            className="text-sm py-8 text-center border rounded-sm"
            style={{ color: "var(--text-light)", borderColor: "var(--border)" }}
          >
            Inga aktiviteter tillagda ännu.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
