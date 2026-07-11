import { unstable_cache } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { KittenWithImages } from "@/lib/types/kitten";

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

const getCachedKittens = unstable_cache(
  async (): Promise<KittenWithImages[]> => {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("kittens")
      .select(KITTEN_SELECT)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .order("sort_order", { referencedTable: "kitten_images", ascending: true });

    if (error) {
      throw new Error(`Failed to fetch kittens from Supabase: ${error.message}`);
    }

    return (data ?? []) as KittenWithImages[];
  },
  ["kittens-all"],
  { revalidate: 120 },
);

const getCachedFeaturedKittens = unstable_cache(
  async (limit: number): Promise<KittenWithImages[]> => {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("kittens")
      .select(KITTEN_SELECT)
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .order("sort_order", { referencedTable: "kitten_images", ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch featured kittens from Supabase: ${error.message}`);
    }

    return (data ?? []) as KittenWithImages[];
  },
  ["kittens-featured"],
  { revalidate: 120 },
);

const getCachedKittenBySlug = unstable_cache(
  async (slug: string): Promise<KittenWithImages | null> => {
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

    return (data ?? null) as KittenWithImages | null;
  },
  ["kitten-by-slug"],
  { revalidate: 120 },
);

export async function getKittens(): Promise<KittenWithImages[]> {
  return getCachedKittens();
}

export async function getFeaturedKittens(limit = 4): Promise<KittenWithImages[]> {
  return getCachedFeaturedKittens(limit);
}

export async function getKittenBySlug(slug: string): Promise<KittenWithImages | null> {
  return getCachedKittenBySlug(slug);
}
