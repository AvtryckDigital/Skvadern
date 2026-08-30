"use client";

import { useState, useTransition } from "react";
import { updateCategoryOrder } from "./gallery-actions";

type Props = {
  initialCategories: string[];
};

export function CategorySorter({ initialCategories }: Props) {
  const [categories, setCategories] = useState(initialCategories);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const handleSelect = (index: number, newCategory: string) => {
    setSuccess(false);
    const oldIndex = categories.indexOf(newCategory);
    const newCats = [...categories];
    
    // Swap them
    if (oldIndex !== -1) {
      newCats[oldIndex] = newCats[index];
    }
    newCats[index] = newCategory;
    
    setCategories(newCats);
  };

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateCategoryOrder(categories);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err: any) {
        console.error(err);
        alert("Ett fel uppstod vid sparandet! Kontrollera att du har lagt till UPDATE-rättigheter (RLS Policy) för 'gallery_images' i Supabase.");
      }
    });
  };

  if (categories.length === 0) return null;

  return (
    <div className="p-6 border mb-8 flex flex-col gap-5" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}>
      <h3 className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
        Sortera gallerier
      </h3>
      <p className="text-sm" style={{ color: "var(--text-mid)" }}>
        Välj vilken kategori som ska visas på vilken position.
      </p>

      <div className="flex flex-col gap-3">
        {categories.map((cat, index) => (
          <div key={index} className="flex items-center gap-4">
            <span 
              className="text-sm font-bold w-6" 
              style={{ color: "var(--gold)" }}
            >
              {index + 1}.
            </span>
            <select
              value={cat}
              onChange={(e) => handleSelect(index, e.target.value)}
              className="px-4 py-2 text-sm border bg-transparent outline-none flex-1"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-dark)",
                backgroundColor: "var(--bg)",
              }}
            >
              {categories.map((optionCat) => (
                <option key={optionCat} value={optionCat}>
                  {optionCat}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="px-6 py-2 text-xs uppercase tracking-widest font-medium transition-all duration-200 disabled:opacity-50 hover:brightness-110"
          style={{ backgroundColor: "var(--gold)", color: "var(--bg)" }}
        >
          {isPending ? "Sparar..." : "Spara ordning"}
        </button>
        {success && (
          <span className="text-sm" style={{ color: "var(--gold)" }}>
            Ordningen sparades!
          </span>
        )}
      </div>
    </div>
  );
}
