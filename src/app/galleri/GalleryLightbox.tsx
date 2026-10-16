"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/supabase/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: GalleryImage[];
};

export function GalleryLightbox({ images }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="break-inside-avoid group relative overflow-hidden cursor-pointer"
            onClick={() => openLightbox(i)}
          >
            <Image
              src={img.url}
              alt={img.caption ?? ""}
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

      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-[var(--gold)] transition-colors p-2"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[var(--gold)] transition-colors p-2"
            onClick={showPrev}
          >
            <ChevronLeft size={48} />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[var(--gold)] transition-colors p-2"
            onClick={showNext}
          >
            <ChevronRight size={48} />
          </button>

          <div 
            className="relative w-full h-full max-w-5xl max-h-[80vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={images[selectedIndex].url}
                alt={images[selectedIndex].caption ?? ""}
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
                unoptimized
              />
            </div>
            {images[selectedIndex].caption && (
              <p className="text-white mt-4 text-center max-w-2xl text-lg">
                {images[selectedIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
