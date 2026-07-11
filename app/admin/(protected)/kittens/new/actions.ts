"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerSupabaseClient, requireAdminSession } from "@/lib/supabase/server";
import type { KittenAvailability, KittenGender } from "@/lib/types/kitten";

export type NewKittenFormState = {
  error: string | null;
};

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxImageCount = 8;
const maxImageSize = 10 * 1024 * 1024;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sanitizeFileName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "");
}

async function generateUniqueSlug(baseName: string, accessToken: string) {
  const supabase = createServerSupabaseClient(accessToken);
  const baseSlug = slugify(baseName) || `kitten-${Date.now()}`;
  let candidate = baseSlug;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const { data, error } = await supabase
      .from("kittens")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();

    if (error) {
      console.error("Failed while checking slug uniqueness.", error);
      throw new Error("We couldn't validate the kitten slug. Please try again.");
    }

    if (!data) {
      return candidate;
    }

    candidate = `${baseSlug}-${Date.now().toString().slice(-6)}${attempt > 0 ? `-${attempt}` : ""}`;
  }

  return `${baseSlug}-${Date.now().toString().slice(-8)}`;
}

function getCheckboxValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function getOptionalString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value ? value : null;
}

export async function createKitten(
  _prevState: NewKittenFormState,
  formData: FormData,
): Promise<NewKittenFormState> {
  const session = await requireAdminSession();

  const name = String(formData.get("name") ?? "").trim();
  const breed = String(formData.get("breed") ?? "").trim();
  const gender = String(formData.get("gender") ?? "").trim() as KittenGender;
  const ageLabel = String(formData.get("age_label") ?? "").trim();
  const colour = String(formData.get("colour") ?? "").trim();
  const availability = String(formData.get("availability") ?? "").trim() as KittenAvailability;
  const healthStatus = String(formData.get("health_status") ?? "").trim();
  const shortDescription = String(formData.get("short_description") ?? "").trim();
  const priceValue = String(formData.get("price") ?? "").trim();
  const sortOrderValue = String(formData.get("sort_order") ?? "").trim();
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

  const sortOrder = sortOrderValue ? Number(sortOrderValue) : 0;

  if (!Number.isFinite(sortOrder) || sortOrder < 0) {
    return { error: "Sort order must be a valid number greater than or equal to 0." };
  }

  const imageFiles = formData
    .getAll("images")
    .filter((file): file is File => file instanceof File && file.size > 0);

  if (imageFiles.length === 0) {
    return { error: "Please upload at least one image for the kitten." };
  }

  if (imageFiles.length > maxImageCount) {
    return { error: "You can upload a maximum of 8 images per kitten." };
  }

  for (const file of imageFiles) {
    if (!allowedImageTypes.has(file.type)) {
      return { error: "Images must be JPG, PNG or WEBP files." };
    }

    if (file.size > maxImageSize) {
      return { error: "Each image must be 10MB or smaller." };
    }
  }

  try {
    const supabase = createServerSupabaseClient(session.accessToken);
    const slug = await generateUniqueSlug(name, session.accessToken);
    const { data: insertedKitten, error: kittenError } = await supabase
      .from("kittens")
      .insert({
        name,
        slug,
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
        sort_order: sortOrder,
      })
      .select("id, slug")
      .single();

    if (kittenError || !insertedKitten) {
      console.error("Failed to insert kitten.", kittenError);
      return { error: "We couldn't save the kitten details. Please try again." };
    }

    const kittenImages = [];

    for (const [index, file] of imageFiles.entries()) {
      const safeFileName = sanitizeFileName(file.name) || `image-${index + 1}.jpg`;
      const storagePath = `${insertedKitten.slug}/${Date.now()}-${index + 1}-${safeFileName}`;
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from("kitten-images")
        .upload(storagePath, fileBuffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Failed to upload kitten image.", uploadError);
        return { error: "The kitten was saved, but one of the images failed to upload." };
      }

      const { data } = supabase.storage.from("kitten-images").getPublicUrl(storagePath);

      kittenImages.push({
        kitten_id: insertedKitten.id,
        url: data.publicUrl,
        storage_path: storagePath,
        alt_text: `${name} kitten image ${index + 1}`,
        is_primary: index === 0,
        sort_order: index + 1,
      });
    }

    const { error: imageInsertError } = await supabase.from("kitten_images").insert(kittenImages);

    if (imageInsertError) {
      console.error("Failed to insert kitten image rows.", imageInsertError);
      return { error: "Images uploaded, but we couldn't save them to the kitten record." };
    }
  } catch (error) {
    console.error("Unexpected error while creating a kitten.", error);
    return { error: "Something went wrong while creating the kitten. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/kittens");
  redirect("/admin/kittens");
}
