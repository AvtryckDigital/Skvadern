"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { DEFAULT_BOARD_MEMBERS } from "@/lib/board";

const BUCKET = "gallery";

export async function addBoardMember(formData: FormData) {
  const supabase = await createClient();

  const role = (formData.get("role") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const role_description = (formData.get("role_description") as string)?.trim() || null;
  const email = (formData.get("email") as string)?.trim() || null;
  const sortOrderStr = formData.get("sort_order") as string;
  const sort_order = sortOrderStr ? parseInt(sortOrderStr, 10) : 0;
  let image = (formData.get("image_url") as string)?.trim() || null;

  if (!role || !name) {
    return { error: "Både ämbetstitel och namn måste anges." };
  }

  // Om användaren laddade upp en bildfil
  const imageFile = formData.get("image_file") as File | null;
  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop() || "jpg";
    const filename = `board/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filename, imageFile, { contentType: imageFile.type });

    if (uploadError) {
      return { error: `Kunde inte ladda upp bild: ${uploadError.message}` };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(uploadData.path);

    image = publicUrl;
  }

  const { error } = await supabase.from("board_members").insert({
    role,
    name,
    role_description,
    email,
    image,
    sort_order,
  });

  if (error) {
    return { error: error.message };
  }

  try {
    revalidateTag("board", "max");
  } catch {
    // fallback if revalidateTag signature differs
  }
  revalidatePath("/admin/styrelsen");
  revalidatePath("/styrelsen");
  revalidatePath("/styrelse");
  return { success: true };
}

export async function editBoardMember(id: string | number, formData: FormData) {
  const supabase = await createClient();

  const role = (formData.get("role") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const role_description = (formData.get("role_description") as string)?.trim() || null;
  const email = (formData.get("email") as string)?.trim() || null;
  const sortOrderStr = formData.get("sort_order") as string;
  const sort_order = sortOrderStr ? parseInt(sortOrderStr, 10) : 0;
  let image = (formData.get("image_url") as string)?.trim() || null;

  if (!role || !name) {
    return { error: "Både ämbetstitel och namn måste anges." };
  }

  // Om användaren laddade upp en ny bildfil
  const imageFile = formData.get("image_file") as File | null;
  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop() || "jpg";
    const filename = `board/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filename, imageFile, { contentType: imageFile.type });

    if (uploadError) {
      return { error: `Kunde inte ladda upp bild: ${uploadError.message}` };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(uploadData.path);

    image = publicUrl;
  }

  const { error, data } = await supabase
    .from("board_members")
    .update({
      role,
      name,
      role_description,
      email,
      image,
      sort_order,
    })
    .eq("id", id)
    .select();

  if (error) {
    return { error: error.message };
  }
  if (!data || data.length === 0) {
    return {
      error:
        "Kunde inte uppdatera posten. Kontrollera att du har UPDATE-behörighet i Supabase RLS.",
    };
  }

  try {
    revalidateTag("board", "max");
  } catch {
    // fallback
  }
  revalidatePath("/admin/styrelsen");
  revalidatePath("/styrelsen");
  revalidatePath("/styrelse");
  return { success: true };
}

export async function deleteBoardMember(id: string | number) {
  const supabase = await createClient();

  const { error } = await supabase.from("board_members").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  try {
    revalidateTag("board", "max");
  } catch {
    // fallback
  }
  revalidatePath("/admin/styrelsen");
  revalidatePath("/styrelsen");
  revalidatePath("/styrelse");
  return { success: true };
}

export async function seedBoardMembersAction() {
  const supabase = await createClient();

  const inserts = DEFAULT_BOARD_MEMBERS.map((m) => ({
    role: m.role,
    name: m.name,
    role_description: m.role_description,
    email: m.email,
    image: m.image,
    sort_order: m.sort_order,
  }));

  const { error } = await supabase.from("board_members").insert(inserts);

  if (error) {
    return { error: error.message };
  }

  try {
    revalidateTag("board", "max");
  } catch {
    // fallback
  }
  revalidatePath("/admin/styrelsen");
  revalidatePath("/styrelsen");
  revalidatePath("/styrelse");
  return { success: true };
}
