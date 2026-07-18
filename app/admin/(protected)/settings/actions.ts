"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { updateSiteSettings } from "@/lib/supabase/queries/settings";
import { requireAdminSession } from "@/lib/supabase/server";
import { defaultSiteSettings } from "@/lib/types/settings";

function getRequiredValue(formData: FormData, key: string, label: string) {
  const value = String(formData.get(key) ?? "").trim();

  if (!value) {
    throw new Error(`${label} is required.`);
  }

  return value;
}

function getOptionalValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveSiteSettingsAction(formData: FormData) {
  try {
    const session = await requireAdminSession();

    await updateSiteSettings(
      {
        business_name: getRequiredValue(formData, "business_name", "Business Name"),
        tagline: getRequiredValue(formData, "tagline", "Tagline"),
        whatsapp_number: getRequiredValue(formData, "whatsapp_number", "WhatsApp Number"),
        email: getRequiredValue(formData, "email", "Email"),
        location: getOptionalValue(formData, "location") || defaultSiteSettings.location,
        opening_hours:
          getOptionalValue(formData, "opening_hours") || defaultSiteSettings.opening_hours,
        instagram_url: getOptionalValue(formData, "instagram_url") || null,
        facebook_url: getOptionalValue(formData, "facebook_url") || null,
        hero_title: getRequiredValue(formData, "hero_title", "Hero Title"),
        hero_description: getRequiredValue(formData, "hero_description", "Hero Description"),
        kittens_page_title: getRequiredValue(
          formData,
          "kittens_page_title",
          "Kittens Page Title",
        ),
        kittens_page_description: getRequiredValue(
          formData,
          "kittens_page_description",
          "Kittens Page Description",
        ),
      },
      session.accessToken,
    );

    revalidateTag("site-settings", "max");
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/breeds");
    revalidatePath("/testimonials");
    revalidatePath("/faq");
    revalidatePath("/contact");
    revalidatePath("/kittens");
  } catch (error) {
    console.error("Failed to save site settings.", error);
    const message =
      error instanceof Error ? encodeURIComponent(error.message) : "Unable to save settings.";
    redirect(`/admin/settings?error=${message}`);
  }

  redirect("/admin/settings?saved=1");
}
