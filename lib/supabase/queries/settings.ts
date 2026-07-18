import { unstable_cache } from "next/cache";
import { cache } from "react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  defaultSiteSettings,
  type SiteSettings,
  type SiteSettingsInput,
} from "@/lib/types/settings";

const SETTINGS_SELECT = `
  id,
  business_name,
  tagline,
  whatsapp_number,
  email,
  location,
  opening_hours,
  instagram_url,
  facebook_url,
  hero_title,
  hero_description,
  kittens_page_title,
  kittens_page_description,
  updated_at
`;

function mergeWithDefaults(settings?: Partial<SiteSettings> | null): SiteSettings {
  return {
    ...defaultSiteSettings,
    ...settings,
  };
}

const getCachedSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    try {
      const supabase = createServerSupabaseClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select(SETTINGS_SELECT)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Failed to load site settings from Supabase.", error);
        return defaultSiteSettings;
      }

      return mergeWithDefaults((data ?? null) as Partial<SiteSettings> | null);
    } catch (error) {
      console.error("Unexpected error while loading site settings.", error);
      return defaultSiteSettings;
    }
  },
  ["site-settings"],
  { revalidate: 300, tags: ["site-settings"] },
);

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  return getCachedSiteSettings();
});

export async function updateSiteSettings(
  input: SiteSettingsInput,
  accessToken: string,
): Promise<SiteSettings> {
  try {
    const authedSupabase = createServerSupabaseClient(accessToken);
    const { data: existing, error: existingError } = await authedSupabase
      .from("site_settings")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existingError) {
      console.error("Failed to find existing site settings row.", existingError);
      throw new Error("We couldn't load the current settings. Please try again.");
    }

    const payload = {
      business_name: input.business_name,
      tagline: input.tagline,
      whatsapp_number: input.whatsapp_number,
      email: input.email,
      location: input.location,
      opening_hours: input.opening_hours,
      instagram_url: input.instagram_url?.trim() ? input.instagram_url.trim() : null,
      facebook_url: input.facebook_url?.trim() ? input.facebook_url.trim() : null,
      hero_title: input.hero_title,
      hero_description: input.hero_description,
      kittens_page_title: input.kittens_page_title,
      kittens_page_description: input.kittens_page_description,
    };

    const query = existing?.id
      ? authedSupabase.from("site_settings").update(payload).eq("id", existing.id)
      : authedSupabase.from("site_settings").insert(payload);

    const { data, error } = await query.select(SETTINGS_SELECT).single();

    if (error || !data) {
      console.error("Failed to save site settings.", error);
      throw new Error("We couldn't save the settings. Please try again.");
    }

    return mergeWithDefaults(data as SiteSettings);
  } catch (error) {
    console.error("Unexpected error while updating site settings.", error);
    throw error;
  }
}
