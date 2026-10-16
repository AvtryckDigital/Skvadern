import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { GalleryImage } from "@/lib/supabase/types";
import { CollapsibleGallery } from "./CollapsibleGallery";

export const metadata = {
  title: "Galleri | Skvaderns Hembygdsförening",
  description:
    "Bilder och minnen från Skvaderns evenemang, middagar och SkvaderSpel.",
};

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

export default async function GalleriPage() {
  const dynamicImages = await getGalleryImages();

  // Gruppera dynamiska bilder efter kategori
  const groupedImages = dynamicImages.reduce((acc, img) => {
    const cat = img.category && img.category.trim() !== "" ? img.category : "Övrigt";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(img);
    return acc;
  }, {} as Record<string, GalleryImage[]>);

  // Sortera kategorierna så "Övrigt" hamnar sist
  const categories = Object.keys(groupedImages).sort((a, b) => {
    const cleanA = a.replace(/^\d+\.\s*/, '');
    const cleanB = b.replace(/^\d+\.\s*/, '');

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

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* Hero Header */}
      <section
        className="relative border-b py-20 px-6"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="eyebrow mb-3">Fotoarkiv & Minnen</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#F4ECE1]">
            Galleri
          </h1>
          <p className="editorial-text text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-[#CFC4B4]">
            <em>
              Ögonblick och minnen från Skvaderns sittningar, SkvaderSpel, resor och
              traditioner genom åren.
            </em>
          </p>
        </div>
      </section>

      {/* --- AUTOMATISKA KATEGORIER FRÅN SUPABASE --- */}
      {categories.map((category, index) => {
        const cleanCategory = category.replace(/^\d+\.\s*/, '');
        return (
          <CollapsibleGallery 
            key={category} 
            category={cleanCategory} 
            images={groupedImages[category]} 
            defaultOpen={index === 0} 
          />
        );
      })}
    </div>
  );
}
