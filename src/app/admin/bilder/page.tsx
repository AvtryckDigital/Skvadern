import { createClient } from "@/lib/supabase/server";
import { deleteImage } from "../gallery-actions";
import { Trash2 } from "lucide-react";
import { GalleryUploadForm } from "../GalleryUploadForm";
import { CategorySorter } from "../CategorySorter";
import type { GalleryImage } from "@/lib/supabase/types";

export const metadata = {
  title: "Bilder | Admin",
};

export default async function AdminBilderPage() {
  const supabase = await createClient();

  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<GalleryImage[]>();

  const groupedImages = (images || []).reduce((acc, img) => {
    const cat =
      img.category && img.category.trim() !== "" ? img.category : "Övrigt";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(img);
    return acc;
  }, {} as Record<string, GalleryImage[]>);

  const categories = Object.keys(groupedImages).sort((a, b) => {
    const cleanA = a.replace(/^\d+\.\s*/, "");
    const cleanB = b.replace(/^\d+\.\s*/, "");

    if (cleanA === "Övrigt") return 1;
    if (cleanB === "Övrigt") return -1;

    const matchA = a.match(/^(\d+)\./);
    const matchB = b.match(/^(\d+)\./);
    const numA = matchA ? parseInt(matchA[1], 10) : 9999;
    const numB = matchB ? parseInt(matchB[1], 10) : 9999;

    if (numA !== numB) {
      return numA - numB;
    }
    return cleanA.localeCompare(cleanB);
  });

  const cleanCategories = categories
    .map((c) => c.replace(/^\d+\.\s*/, ""))
    .filter((c) => c !== "Övrigt");

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-2 font-semibold"
          style={{ color: "var(--gold)" }}
        >
          Bilder
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Fotogalleri
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-light)" }}>
          Ladda upp, kategorisera och hantera föreningens bilder.
        </p>
      </div>

      <section className="mb-8">
        <CategorySorter initialCategories={cleanCategories} />
      </section>

      <section className="mb-12">
        <GalleryUploadForm />
      </section>

      {/* Uploaded images list */}
      <section>
        <h2
          className="text-xl font-semibold mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Uppladdade bilder
          <span
            className="ml-3 text-sm font-normal"
            style={{ color: "var(--text-light)" }}
          >
            ({images?.length ?? 0})
          </span>
        </h2>

        {!images || images.length === 0 ? (
          <p
            className="text-sm py-8 text-center border rounded-sm"
            style={{ color: "var(--text-light)", borderColor: "var(--border)" }}
          >
            Inga bilder uppladdade ännu.
          </p>
        ) : (
          <div className="flex flex-col gap-10">
            {categories.map((category) => {
              const cleanCategory = category.replace(/^\d+\.\s*/, "");
              return (
                <div key={category}>
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{
                      color: "var(--text-dark)",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {cleanCategory}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {groupedImages[category].map((image) => {
                      const deleteWithId = deleteImage.bind(null, image.id);
                      return (
                        <div
                          key={image.id}
                          className="group relative border overflow-hidden rounded-sm"
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
                                backgroundColor: "rgba(0,0,0,0.65)",
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </form>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
