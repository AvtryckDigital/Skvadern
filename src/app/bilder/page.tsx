import Image from "next/image";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { GalleryImage } from "@/lib/supabase/types";

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
  { revalidate: 60, tags: ["gallery"] }
);

const staticGallery = [
  

  { src: "/images/jc_prickare.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/joar1.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },

  { src: "/images/spel3.jpg", alt: "Skvaderspel", caption: "Skvaderspel" }, 

  { src: "/images/spel5.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/spel6.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/spel7.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/spel8.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/spel9.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/spel10.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/spel11.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/spel12.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/spel13.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },

  { src: "/images/spel2.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/spel1.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },




];

const jubilee = [
  { src: "/images/564535060_2865587840308426_1972878052907861132_n.jpg", alt: "75-årsjubileum 2025", caption: "75-årsjubileum 2025" },
  { src: "/images/564240041_2865585950308615_2507079536529675438_n.jpg", alt: "75-årsjubileum 2025", caption: "75-årsjubileum 2025" },
];

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
      {categories.map((category) => (
        <section key={category} className="py-16 px-6 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "var(--gold)" }}>
                Galleri
              </p>
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {category}
              </h2>
            </div>
            
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {groupedImages[category].map((img) => (
                <div key={img.id} className="break-inside-avoid group relative overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.caption ?? category}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                  {img.caption && (
                    <div
                      className="absolute inset-x-0 bottom-0 py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
                    >
                      <p className="text-xs text-white">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* --- GAMLA/BEFINTLIGA BILDER (Föreningens stunder) --- */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "var(--gold)" }}>
              Fotogalleri
            </p>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Föreningens stunder
            </h2>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {staticGallery.map((img, i) => (
              <div
                key={i}
                className="break-inside-avoid group relative overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
                />
                <div
                  className="absolute inset-x-0 bottom-0 py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
                >
                  <p className="text-xs text-white">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jubileum */}
      <section className="py-16 px-6 border-t" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "var(--gold)" }}>
              2025
            </p>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              75-års Jubileum
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {jubilee.map((img, i) => (
              <div key={i} className="overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={700}
                  height={450}
                  className="w-full h-auto object-cover"
                />
                <p className="text-xs mt-2" style={{ color: "var(--text-light)" }}>{img.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
