"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { slugify } from "@/lib/songs";

export async function addSong(formData: FormData) {
  const supabase = await createClient();

  const title = (formData.get("title") as string)?.trim();
  if (!title) {
    return { error: "Titel måste anges." };
  }

  const lyrics = (formData.get("lyrics") as string)?.trim();
  if (!lyrics) {
    return { error: "Sångtext måste anges." };
  }

  const numberRaw = formData.get("number") as string;
  const number = numberRaw ? parseInt(numberRaw, 10) : null;

  const category = (formData.get("category") as string)?.trim() || null;
  const melody = (formData.get("melody") as string)?.trim() || null;
  const notes = (formData.get("notes") as string)?.trim() || null;

  const customSlug = (formData.get("slug") as string)?.trim();
  const slug = customSlug ? slugify(customSlug) : slugify(title);

  const { error } = await supabase.from("songs").insert({
    title,
    slug,
    number,
    category,
    melody,
    lyrics,
    notes,
  });

  if (error) {
    console.error("Error adding song:", error);
    if (error.message.includes("does not exist") || error.message.includes("schema cache")) {
      return {
        error:
          "Tabellen 'songs' finns inte i Supabase än. Kör skriptet supabase/songs.sql i Supabase SQL Editor.",
      };
    }
    return { error: error.message };
  }

  revalidateTag("songs", "max");
  revalidatePath("/sangbok");
  revalidatePath(`/sangbok/${slug}`);
  revalidatePath("/admin/sangbok");

  return { success: true };
}

export async function deleteSong(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("songs").delete().eq("id", id);

  if (error) {
    console.error("Error deleting song:", error);
    throw new Error(error.message);
  }

  revalidateTag("songs", "max");
  revalidatePath("/sangbok");
  revalidatePath("/admin/sangbok");
}
