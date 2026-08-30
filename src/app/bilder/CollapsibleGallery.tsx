"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { GalleryLightbox } from "./GalleryLightbox";
import type { GalleryImage } from "@/lib/supabase/types";

type Props = {
  category: string;
  images: GalleryImage[];
  defaultOpen?: boolean;
};

export function CollapsibleGallery({ category, images, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="py-10 sm:py-16 px-6 border-b" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <div 
          className="flex items-center justify-between cursor-pointer group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "var(--gold)" }}>
              Galleri
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold transition-colors group-hover:text-[var(--gold)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {category}
            </h2>
          </div>
          <button 
            className="p-2 border rounded-full transition-colors group-hover:border-[var(--gold)] group-hover:text-[var(--gold)]"
            style={{ borderColor: "var(--border)", color: "var(--text-mid)" }}
            aria-label={isOpen ? "Fäll ihop galleri" : "Visa galleri"}
          >
            {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
        
        {isOpen && (
          <div className="mt-10 animate-in fade-in slide-in-from-top-4 duration-500">
            <GalleryLightbox images={images} />
          </div>
        )}
      </div>
    </section>
  );
}
