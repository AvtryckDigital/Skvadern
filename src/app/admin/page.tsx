import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { addActivity, deleteActivity } from "./actions";
import { deleteImage } from "./gallery-actions";
import { logout } from "@/app/login/actions";
import { Trash2 } from "lucide-react";
import { GalleryUploadForm } from "./GalleryUploadForm";
import { ActivityItem } from "./ActivityItem";
import type { Activity, GalleryImage } from "@/lib/supabase/types";

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

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .order("date", { ascending: true })
    .returns<Activity[]>();

  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<GalleryImage[]>();

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "calc(100vh - 80px)" }}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: "var(--gold)" }}
            >
              Admin
            </p>
            <h1
              className="text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Hantera kalender
            </h1>
            <p className="text-sm mt-2" style={{ color: "var(--text-light)" }}>
              Inloggad som {user.email}
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="btn-outline text-xs uppercase tracking-widest px-4 py-2 border transition-colors duration-200"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-light)",
              }}
            >
              Logga ut
            </button>
          </form>
        </div>

        {/* Add activity form */}
        <section className="mb-14">
          <div className="w-10 h-px mb-6" style={{ backgroundColor: "var(--gold)" }} />
          <h2
            className="text-xl font-semibold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Lägg till aktivitet
          </h2>
          <form
            action={addActivity}
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

            <div>
              <button
                type="submit"
                className="px-8 py-3 text-sm uppercase tracking-widest font-medium transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_16px_rgba(201,160,80,0.35)]"
                style={{
                  backgroundColor: "var(--gold)",
                  color: "var(--bg)",
                }}
              >
                Lägg till
              </button>
            </div>
          </form>
        </section>

        {/* Activity list */}
        <section>
          <h2
            className="text-xl font-semibold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kommande aktiviteter
            <span
              className="ml-3 text-sm font-normal"
              style={{ color: "var(--text-light)" }}
            >
              ({activities?.length ?? 0})
            </span>
          </h2>

          {!activities || activities.length === 0 ? (
            <p
              className="text-sm py-8 text-center border"
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

        {/* Divider */}
        <div className="my-14 h-px" style={{ backgroundColor: "var(--border)" }} />

        {/* Gallery section */}
        <section>
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "var(--gold)" }}
          >
            Fotogalleri
          </p>
          <h2
            className="text-xl font-semibold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Föreningens stunder
          </h2>

          <GalleryUploadForm />

          {/* Uploaded images list */}
          <div className="mt-8">
            <h3
              className="text-sm font-medium mb-4 uppercase tracking-widest"
              style={{ color: "var(--text-light)" }}
            >
              Uppladdade bilder ({images?.length ?? 0})
            </h3>

            {!images || images.length === 0 ? (
              <p
                className="text-sm py-8 text-center border"
                style={{ color: "var(--text-light)", borderColor: "var(--border)" }}
              >
                Inga bilder uppladdade ännu.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {images.map((image) => {
                  const deleteWithId = deleteImage.bind(null, image.id);
                  return (
                    <div
                      key={image.id}
                      className="group relative border overflow-hidden"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.url}
                        alt={image.caption ?? ""}
                        className="w-full h-28 object-cover"
                      />
                      {image.caption && (
                        <p
                          className="px-2 py-1.5 text-xs truncate"
                          style={{ color: "var(--text-light)" }}
                        >
                          {image.caption}
                        </p>
                      )}
                      <form
                        action={deleteWithId}
                        className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <button
                          type="submit"
                          aria-label="Ta bort bild"
                          className="p-1.5 rounded transition-all duration-200 hover:text-red-400 hover:bg-red-400/10"
                          style={{
                            color: "white",
                            backgroundColor: "rgba(0,0,0,0.55)",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </form>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
