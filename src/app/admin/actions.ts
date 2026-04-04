"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addActivity(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("activities").insert({
    title: formData.get("title") as string,
    date: formData.get("date") as string,
    description: (formData.get("description") as string) || null,
    location: (formData.get("location") as string) || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/kalender");
  revalidatePath("/admin");
}

export async function deleteActivity(id: string, _formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/kalender");
  revalidatePath("/admin");
}
