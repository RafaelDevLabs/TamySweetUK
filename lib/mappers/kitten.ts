import type { KittenCard as MockKitten } from "@/lib/mock-kittens";
import type { KittenAvailability, KittenCardData, KittenImage, KittenWithImages } from "@/lib/types/kitten";

export const availabilityMap: Record<KittenAvailability, MockKitten["availability"]> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};

export const genderMap = {
  male: "Male",
  female: "Female",
} as const;

export function resolveImageUrl(image: KittenImage) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");

  if (image.storage_path && supabaseUrl) {
    const encodedPath = image.storage_path
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");

    return `${supabaseUrl}/storage/v1/object/public/kitten-images/${encodedPath}`;
  }

  return image.url;
}

export function resolveKittenImageUrls(kitten: Pick<KittenWithImages, "images">) {
  const sortedImages = [...kitten.images].sort((a, b) => a.sort_order - b.sort_order);
  const primaryFirst = sortedImages.sort((a, b) => Number(b.is_primary) - Number(a.is_primary));
  const images = primaryFirst.map(resolveImageUrl).filter(Boolean);

  return images.length > 0 ? images : ["/kittens/1.jpg"];
}

export function buildKittenImageAltText({
  name,
  breed,
  colour,
  index,
}: {
  name: string;
  breed: string;
  colour: string;
  index: number;
}) {
  const photoLabel = index === 0 ? "portrait" : `photo ${index + 1}`;

  return `${name}, ${colour} ${breed} kitten ${photoLabel}`;
}

export function mapSupabaseKittenToCard(kitten: KittenCardData): MockKitten {
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
    images: resolveKittenImageUrls(kitten),
  };
}
