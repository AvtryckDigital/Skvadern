import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { GalleryImage } from "@/lib/supabase/types";

const staticGallery = [
  { src: "/images/564734785_2865585923641951_6803562775840569346_n.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/565192044_2865585700308640_353422530656248580_n.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/565664227_2865585790308631_1230713063261803056_n.jpg", alt: "Skvaderspel", caption: "Skvaderspel" },
  { src: "/images/121273191_203711071113726_8115844507210399686_n-e1695760236348.jpg", alt: "Föreningsbild", caption: "Föreningsbild" },
];

const jubilee = [
  { src: "/images/564535060_2865587840308426_1972878052907861132_n.jpg", alt: "75-årsjubileum 2025", caption: "75-årsjubileum 2025" },
  { src: "/images/564240041_2865585950308615_2507079536529675438_n.jpg", alt: "75-årsjubileum 2025", caption: "75-årsjubileum 2025" },
];

export default async function Bilder() {
  const supabase = await createClient();
  const { data: dynamicImages } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<GalleryImage[]>();
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

      {/* Galleri */}
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
            {dynamicImages?.map((img) => (
              <div
                key={img.id}
                className="break-inside-avoid group relative overflow-hidden"
              >
                <Image
                  src={img.url}
                  alt={img.caption ?? "Föreningsbild"}
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
