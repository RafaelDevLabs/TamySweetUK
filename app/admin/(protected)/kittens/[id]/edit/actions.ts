"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerSupabaseClient, requireAdminSession } from "@/lib/supabase/server";
import type { KittenAvailability, KittenGender, KittenImage } from "@/lib/types/kitten";

export type EditKittenFormState = {
  error: string | null;
};

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxImageCount = 8;
const maxImageSize = 10 * 1024 * 1024;

function sanitizeFileName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "");
}

function getCheckboxValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function getOptionalString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value ? value : null;
}

export async function updateKitten(
  _prevState: EditKittenFormState,
  formData: FormData,
): Promise<EditKittenFormState> {
  const session = await requireAdminSession();
  let currentKittenSlug = "";
  const kittenId = String(formData.get("kitten_id") ?? "").trim();

  if (!kittenId) {
    return { error: "We couldn't identify which kitten to update." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const breed = String(formData.get("breed") ?? "").trim();
  const gender = String(formData.get("gender") ?? "").trim() as KittenGender;
  const ageLabel = String(formData.get("age_label") ?? "").trim();
  const colour = String(formData.get("colour") ?? "").trim();
  const availability = String(formData.get("availability") ?? "").trim() as KittenAvailability;
  const healthStatus = String(formData.get("health_status") ?? "").trim();
  const shortDescription = String(formData.get("short_description") ?? "").trim();
  const priceValue = String(formData.get("price") ?? "").trim();
  const dateOfBirth = getOptionalString(formData, "date_of_birth");
  const temperament = getOptionalString(formData, "temperament");
  const description = getOptionalString(formData, "description");

  if (
    !name ||
    !breed ||
    !ageLabel ||
    !colour ||
    !healthStatus ||
    !shortDescription ||
    !priceValue
  ) {
    return { error: "Please complete all required fields before saving the kitten." };
  }

  if (gender !== "male" && gender !== "female") {
    return { error: "Gender must be either male or female." };
  }

  if (!["available", "reserved", "sold"].includes(availability)) {
    return { error: "Availability must be available, reserved or sold." };
  }

  const price = Number(priceValue);
  if (!Number.isFinite(price) || price < 0) {
    return { error: "Price must be a valid number greater than or equal to 0." };
  }

  const newImageFiles = formData
    .getAll("images")
    .filter((file): file is File => file instanceof File && file.size > 0);

  if (newImageFiles.length > maxImageCount) {
    return { error: "You can upload a maximum of 8 images per kitten." };
  }

  for (const file of newImageFiles) {
    if (!allowedImageTypes.has(file.type)) {
      return { error: "Images must be JPG, PNG or WEBP files." };
    }

    if (file.size > maxImageSize) {
      return { error: "Each image must be 10MB or smaller." };
    }
  }

  const keptExistingIds = formData
    .getAll("existing_image_ids")
    .map((value) => String(value).trim())
    .filter(Boolean);
  const removedExistingIds = new Set(
    formData
      .getAll("removed_existing_image_ids")
      .map((value) => String(value).trim())
      .filter(Boolean),
  );

  if (keptExistingIds.length + newImageFiles.length === 0) {
    return { error: "Please keep or upload at least one image for the kitten." };
  }

  if (keptExistingIds.length + newImageFiles.length > maxImageCount) {
    return { error: "A kitten can have a maximum of 8 images." };
  }

  try {
    const supabase = createServerSupabaseClient(session.accessToken);
    const { data: currentKitten, error: currentKittenError } = await supabase
      .from("kittens")
      .select("id, slug, images:kitten_images(id, storage_path, sort_order)")
      .eq("id", kittenId)
      .order("sort_order", { referencedTable: "kitten_images", ascending: true })
      .maybeSingle();

    if (currentKittenError || !currentKitten) {
      console.error("Failed to load the current kitten for update.", currentKittenError);
      return { error: "We couldn't load the kitten you want to update." };
    }

    currentKittenSlug = currentKitten.slug;

    const currentImages = (currentKitten.images ?? []) as Array<
      Pick<KittenImage, "id" | "storage_path" | "sort_order">
    >;

    const { error: updateError } = await supabase
      .from("kittens")
      .update({
        name,
        breed,
        gender,
        date_of_birth: dateOfBirth,
        age_label: ageLabel,
        colour,
        price,
        availability,
        health_status: healthStatus,
        temperament,
        short_description: shortDescription,
        description,
        vaccinated: getCheckboxValue(formData, "vaccinated"),
        wormed: getCheckboxValue(formData, "wormed"),
        litter_trained: getCheckboxValue(formData, "litter_trained"),
        microchipped: getCheckboxValue(formData, "microchipped"),
        tica_registered: getCheckboxValue(formData, "tica_registered"),
        parents_can_be_seen: getCheckboxValue(formData, "parents_can_be_seen"),
        is_featured: getCheckboxValue(formData, "is_featured"),
      })
      .eq("id", kittenId);

    if (updateError) {
      console.error("Failed to update kitten details.", updateError);
      return { error: "We couldn't save the kitten changes. Please try again." };
    }

    const imagesToDelete = currentImages.filter((image) => removedExistingIds.has(image.id));

    if (imagesToDelete.length > 0) {
      const storagePaths = imagesToDelete
        .map((image) => image.storage_path)
        .filter((value): value is string => Boolean(value));

      if (storagePaths.length > 0) {
        const { error: storageDeleteError } = await supabase.storage
          .from("kitten-images")
          .remove(storagePaths);

        if (storageDeleteError) {
          console.error("Failed to delete removed kitten image files.", storageDeleteError);
        }
      }

      const { error: imageDeleteError } = await supabase
        .from("kitten_images")
        .delete()
        .in("id", imagesToDelete.map((image) => image.id));

      if (imageDeleteError) {
        console.error("Failed to delete removed kitten image rows.", imageDeleteError);
        return { error: "We couldn't remove one of the old kitten images." };
      }
    }

    const insertedImageIds: string[] = [];

    for (const [index, file] of newImageFiles.entries()) {
      const safeFileName = sanitizeFileName(file.name) || `image-${index + 1}.jpg`;
      const storagePath = `${currentKitten.slug}/${Date.now()}-${index + 1}-${safeFileName}`;
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from("kitten-images")
        .upload(storagePath, fileBuffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Failed to upload new kitten image.", uploadError);
        return { error: "We couldn't upload one of the new kitten images." };
      }

      const { data: publicUrlData } = supabase.storage.from("kitten-images").getPublicUrl(storagePath);

      const { data: insertedImage, error: insertedImageError } = await supabase
        .from("kitten_images")
        .insert({
          kitten_id: kittenId,
          url: publicUrlData.publicUrl,
          storage_path: storagePath,
          alt_text: `${name} kitten image ${index + 1}`,
          is_primary: false,
          sort_order: 999 + index,
        })
        .select("id")
        .single();

      if (insertedImageError || !insertedImage) {
        console.error("Failed to insert new kitten image row.", insertedImageError);
        return { error: "A new image uploaded, but we couldn't attach it to the kitten." };
      }

      insertedImageIds.push(insertedImage.id);
    }

    const orderedExistingIds = keptExistingIds.filter(
      (id, index, list) =>
        !removedExistingIds.has(id) &&
        list.indexOf(id) === index &&
        currentImages.some((image) => image.id === id),
    );
    const finalImageOrder = [...orderedExistingIds, ...insertedImageIds];

    await Promise.all(
      finalImageOrder.map((imageId, index) =>
        supabase
          .from("kitten_images")
          .update({
            sort_order: index + 1,
            is_primary: index === 0,
          })
          .eq("id", imageId)
          .eq("kitten_id", kittenId),
      ),
    );
  } catch (error) {
    console.error("Unexpected error while updating a kitten.", error);
    return { error: "Something went wrong while updating the kitten. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/kittens");
  if (currentKittenSlug) {
    revalidatePath(`/kittens/${currentKittenSlug}`);
  }
  redirect("/admin/kittens");
}
