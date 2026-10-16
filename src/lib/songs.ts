import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { Song } from "./supabase/types";

export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[åä]/g, "a")
      .replace(/ö/g, "o")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "sang"
  );
}

export const getSongs = unstable_cache(
  async (): Promise<Song[]> => {
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .order("number", { ascending: true, nullsFirst: false });

      if (error || !data) {
        return [];
      }

      return data as Song[];
    } catch {
      return [];
    }
  },
  ["songs"],
  { tags: ["songs"] }
);

export async function getSong(slug: string): Promise<Song | null> {
  const songs = await getSongs();
  return songs.find((s) => s.slug === slug) ?? null;
}
