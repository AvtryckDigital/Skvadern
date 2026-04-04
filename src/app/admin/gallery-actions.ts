"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const BUCKET = "gallery";

export async function uploadImage(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const supabase = await createClient();

  const file = formData.get("image") as File;
  const caption = (formData.get("caption") as string) || null;

  if (!file || file.size === 0) return { error: "Ingen fil vald." };

  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}.${ext}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, { contentType: file.type });

  if (uploadError) return { error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(uploadData.path);

  const { error: dbError } = await supabase
    .from("gallery_images")
    .insert({ url: publicUrl, caption });

  if (dbError) return { error: dbError.message };

  revalidatePath("/bilder");
  revalidatePath("/admin");
  return null;
}

export async function deleteImage(id: string, _formData: FormData) {
  const supabase = await createClient();

  const { data: image } = await supabase
    .from("gallery_images")
    .select("url")
    .eq("id", id)
    .single();

  if (image?.url) {
    const storagePath = image.url.split(
      `/storage/v1/object/public/${BUCKET}/`
    )[1];
    if (storagePath) {
      await supabase.storage.from(BUCKET).remove([storagePath]);
    }
  }

  await supabase.from("gallery_images").delete().eq("id", id);

  revalidatePath("/bilder");
  revalidatePath("/admin");
}
