"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

const BUCKET = "gallery";

export async function uploadImage(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const supabase = await createClient();

  const files = formData.getAll("image") as File[];
  const caption = (formData.get("caption") as string) || null;
  const category = (formData.get("category") as string) || null;

  if (!files || files.length === 0) return { error: "Ingen fil vald." };

  const validFiles = files.filter(f => f.size > 0);
  if (validFiles.length === 0) return { error: "Ingen giltig fil vald." };

  const insertData = [];

  for (const file of validFiles) {
    const ext = file.name.split(".").pop();
    // Use a random string plus timestamp to prevent collisions when uploading simultaneously
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filename, file, { contentType: file.type });

    if (uploadError) return { error: uploadError.message };

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(uploadData.path);

    insertData.push({ url: publicUrl, caption, category });
  }

  const { error: dbError } = await supabase
    .from("gallery_images")
    .insert(insertData);

  if (dbError) return { error: dbError.message };

  revalidateTag("gallery", "max");
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

  revalidateTag("gallery", "max");
  revalidatePath("/admin");
}

export async function updateCategoryOrder(orderedCleanCategories: string[]) {
  const supabase = await createClient();

  const { data: allImages } = await supabase.from("gallery_images").select("id, category");
  if (!allImages) return;

  for (const img of allImages) {
    if (!img.category) continue;
    const cleanCat = img.category.replace(/^\d+\.\s*/, '');
    const index = orderedCleanCategories.indexOf(cleanCat);
    
    let newCatName = cleanCat;
    if (index !== -1) {
      newCatName = `${index + 1}. ${cleanCat}`;
    }

    if (img.category !== newCatName) {
      const { error } = await supabase.from("gallery_images").update({ category: newCatName }).eq("id", img.id);
      if (error) {
        console.error("Failed to update category order:", error);
        throw new Error(error.message);
      }
    }
  }

  revalidateTag("gallery", "max");
  revalidatePath("/admin");
  revalidatePath("/bilder");
}
