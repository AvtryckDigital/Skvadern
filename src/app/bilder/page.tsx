import Image from "next/image";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { GalleryImage } from "@/lib/supabase/types";
import { CollapsibleGallery } from "./CollapsibleGallery";

const getGalleryImages = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<GalleryImage[]>();
    return data ?? [];
  },
  ["gallery-images"],
  { tags: ["gallery"] }
);


export default async function Bilder() {
  const dynamicImages = await getGalleryImages();

  // Gruppera dynamiska bilder efter kategori
  const groupedImages = dynamicImages.reduce((acc, img) => {
    const cat = img.category && img.category.trim() !== "" ? img.category : "Övrigt";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(img);
    return acc;
  }, {} as Record<string, GalleryImage[]>);

  // Vi kan sortera kategorierna så "Övrigt" hamnar sist (om man vill)
  const categories = Object.keys(groupedImages).sort((a, b) => {
    if (a === "Övrigt") return 1;
    if (b === "Övrigt") return -1;
    return a.localeCompare(b);
  });

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/564240041_2865585950308615_2507079536529675438_n.jpg"
          alt="Bilder"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />
        <div className="relative z-10 text-center px-6">
          <h1
            className="text-5xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bilder
          </h1>
        </div>
      </section>

      {/* Foto-credits */}
      <section className="py-6 px-6 border-b" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm italic" style={{ color: "var(--text-light)" }}>
            Ett hjärtligt tack till Br. Jansson för hans fotografering och dokumentation av föreningens upplevelser.
          </p>
        </div>
      </section>

      {/* --- AUTOMATISKA KATEGORIER FRÅN SUPABASE --- */}
      {categories.map((category, index) => (
        <CollapsibleGallery 
          key={category} 
          category={category} 
          images={groupedImages[category]} 
          defaultOpen={index === 0} 
        />
      ))}

    </div>
  );
}
