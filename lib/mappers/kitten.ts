import { getSupabaseClient } from "@/lib/supabase/client";
import type { Kitten as MockKitten } from "@/lib/mock-kittens";
import type { KittenAvailability, KittenWithImages } from "@/lib/types/kitten";

export const availabilityMap: Record<KittenAvailability, MockKitten["availability"]> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};

export const genderMap = {
  male: "Male",
  female: "Female",
} as const;

export function resolveImageUrl(image: KittenWithImages["images"][number]) {
  if (image.storage_path) {
    const supabase = getSupabaseClient();
    const { data } = supabase.storage.from("kitten-images").getPublicUrl(image.storage_path);

    if (data.publicUrl) {
      return data.publicUrl;
    }
  }

  return image.url;
}

export function resolveKittenImageUrls(kitten: KittenWithImages) {
  const sortedImages = [...kitten.images].sort((a, b) => a.sort_order - b.sort_order);
  const primaryFirst = sortedImages.sort((a, b) => Number(b.is_primary) - Number(a.is_primary));
  const images = primaryFirst.map(resolveImageUrl).filter(Boolean);

  return images.length > 0 ? images : ["/kittens/1.jpg"];
}

export function mapSupabaseKittenToCard(kitten: KittenWithImages): MockKitten {
  return {
    id: kitten.id,
    slug: kitten.slug,
    name: kitten.name,
    breed: kitten.breed,
    gender: genderMap[kitten.gender],
    age: kitten.age_label,
    colour: kitten.colour,
    price: kitten.price,
    availability: availabilityMap[kitten.availability],
    healthStatus: kitten.health_status,
    temperament: kitten.temperament ?? "",
    description: kitten.description ?? kitten.short_description,
    images: resolveKittenImageUrls(kitten),
    included: [
      kitten.vaccinated ? "Vaccinated" : null,
      kitten.wormed ? "Wormed" : null,
      kitten.litter_trained ? "Litter trained" : null,
      kitten.tica_registered ? "TICA registered" : null,
    ].filter((value): value is string => Boolean(value)),
  };
}
