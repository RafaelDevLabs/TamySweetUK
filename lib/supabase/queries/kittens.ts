import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getCanonicalKittenSlug, getLegacyKittenSlugsForCanonicalSlug } from "@/lib/kittens/legacy-slugs";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { KittenCardData, KittenImage, KittenWithImages } from "@/lib/types/kitten";

const KITTEN_CARD_SELECT = `
  id,
  name,
  slug,
  breed,
  gender,
  age_label,
  colour,
  price,
  availability,
  short_description,
  sort_order,
  created_at
`;

const KITTEN_IMAGE_SELECT = `
  id,
  kitten_id,
  url,
  storage_path,
  alt_text,
  is_primary,
  sort_order,
  created_at
`;

export const KITTEN_SELECT = `
  id,
  name,
  slug,
  breed,
  gender,
  date_of_birth,
  age_label,
  colour,
  price,
  availability,
  health_status,
  temperament,
  short_description,
  description,
  vaccinated,
  wormed,
  litter_trained,
  microchipped,
  tica_registered,
  parents_can_be_seen,
  is_featured,
  sort_order,
  created_at,
  updated_at,
  images:kitten_images (
    id,
    kitten_id,
    url,
    storage_path,
    alt_text,
    is_primary,
    sort_order,
    created_at
  )
`;

async function addPrimaryImages(kittens: Omit<KittenCardData, "images">[]): Promise<KittenCardData[]> {
  if (kittens.length === 0) {
    return [];
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("kitten_images")
    .select(KITTEN_IMAGE_SELECT)
    .in(
      "kitten_id",
      kittens.map((kitten) => kitten.id),
    )
    .eq("is_primary", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch primary kitten images from Supabase: ${error.message}`);
  }

  const imagesByKittenId = new Map<string, KittenImage>();
  for (const image of (data ?? []) as KittenImage[]) {
    if (!imagesByKittenId.has(image.kitten_id)) {
      imagesByKittenId.set(image.kitten_id, image);
    }
  }

  return kittens.map((kitten) => ({
    ...kitten,
    slug: getCanonicalKittenSlug(kitten.slug),
    images: imagesByKittenId.has(kitten.id) ? [imagesByKittenId.get(kitten.id)!] : [],
  }));
}

const getCachedKittens = unstable_cache(
  async (): Promise<KittenCardData[]> => {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("kittens")
      .select(KITTEN_CARD_SELECT)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch kittens from Supabase: ${error.message}`);
    }

    return addPrimaryImages((data ?? []) as Omit<KittenCardData, "images">[]);
  },
  ["kittens-all-v2"],
  { revalidate: 120, tags: ["kittens"] },
);

const getCachedFeaturedKittens = unstable_cache(
  async (limit: number): Promise<KittenCardData[]> => {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("kittens")
      .select(KITTEN_CARD_SELECT)
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch featured kittens from Supabase: ${error.message}`);
    }

    return addPrimaryImages((data ?? []) as Omit<KittenCardData, "images">[]);
  },
  ["kittens-featured-v2"],
  { revalidate: 120, tags: ["kittens"] },
);

async function fetchKittenBySlug(slug: string): Promise<KittenWithImages | null> {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("kittens")
      .select(KITTEN_SELECT)
      .eq("slug", slug)
      .order("sort_order", { referencedTable: "kitten_images", ascending: true })
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch kitten "${slug}" from Supabase: ${error.message}`);
    }

    if (data) {
      return {
        ...(data as KittenWithImages),
        slug: getCanonicalKittenSlug((data as KittenWithImages).slug),
      };
    }

    const legacySlugs = getLegacyKittenSlugsForCanonicalSlug(slug);

    if (legacySlugs.length === 0) {
      return null;
    }

    const { data: legacyData, error: legacyError } = await supabase
      .from("kittens")
      .select(KITTEN_SELECT)
      .in("slug", legacySlugs)
      .order("sort_order", { referencedTable: "kitten_images", ascending: true })
      .limit(1)
      .maybeSingle();

    if (legacyError) {
      throw new Error(`Failed to fetch legacy kitten "${slug}" from Supabase: ${legacyError.message}`);
    }

    if (!legacyData) {
      return null;
    }

    return {
      ...(legacyData as KittenWithImages),
      slug,
    };
}

export const getKittens = cache(async (): Promise<KittenCardData[]> => {
  return getCachedKittens();
});

export const getFeaturedKittens = cache(async (limit = 4): Promise<KittenCardData[]> => {
  return getCachedFeaturedKittens(limit);
});

export const getKittenBySlug = cache(async (slug: string): Promise<KittenWithImages | null> => {
  return unstable_cache(
    async () => fetchKittenBySlug(slug),
    ["kitten-by-slug-v3", slug],
    { revalidate: 120, tags: ["kittens"] },
  )();
});
