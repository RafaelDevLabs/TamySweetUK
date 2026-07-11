import { getSupabaseClient } from "@/lib/supabase/client";
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

export async function getKittens(): Promise<KittenWithImages[]> {
  const supabase = getSupabaseClient();
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
}

export async function getFeaturedKittens(limit = 4): Promise<KittenWithImages[]> {
  const supabase = getSupabaseClient();
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
}

export async function getKittenBySlug(slug: string): Promise<KittenWithImages | null> {
  const supabase = getSupabaseClient();
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
}
