"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function addActivity(formData: FormData) {
  const supabase = await createClient();

  const end_date = formData.get("end_date") as string;
  const { error } = await supabase.from("activities").insert({
    title: formData.get("title") as string,
    date: formData.get("date") as string,
    end_date: end_date || null,
    description: (formData.get("description") as string) || null,
    location: (formData.get("location") as string) || null,
  });

  if (error) throw new Error(error.message);

  revalidateTag("activities");
  revalidatePath("/admin");
}

export async function editActivity(id: string, formData: FormData) {
  const supabase = await createClient();

  const end_date = formData.get("end_date") as string;
  const { error, data } = await supabase
    .from("activities")
    .update({
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      end_date: end_date || null,
      description: (formData.get("description") as string) || null,
      location: (formData.get("location") as string) || null,
    })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) {
    throw new Error("Kunde inte uppdatera. Har du glömt att lägga till UPDATE-rättigheter (RLS Policy) i Supabase?");
  }

  revalidateTag("activities");
  revalidatePath("/admin");
}

export async function deleteActivity(id: string, _formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidateTag("activities", "max");
  revalidatePath("/admin");
}
