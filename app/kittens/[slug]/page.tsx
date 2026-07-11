import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import KittenDetailContent from "@/components/kitten/KittenDetailContent";
import KittenGallery from "@/components/kitten/KittenGallery";
import {
  availabilityMap,
  genderMap,
  resolveKittenImageUrls,
} from "@/lib/mappers/kitten";
import { getSiteSettings } from "@/lib/supabase/queries/settings";
import { getKittenBySlug } from "@/lib/supabase/queries/kittens";

type KittenDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: KittenDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const kitten = await getKittenBySlug(slug);

    if (!kitten) {
      return {
        title: "Kitten | TamysweetUK",
        description: "Meet our kittens at TamysweetUK.",
      };
    }

    return {
      title: `${kitten.name} | ${kitten.breed} Kitten | TamysweetUK`,
      description: kitten.short_description,
    };
  } catch (error) {
    console.error(`Failed to load kitten metadata for slug "${slug}".`, error);

    return {
      title: "Kitten | TamysweetUK",
      description: "Meet our kittens at TamysweetUK.",
    };
  }
}

export default async function KittenDetailPage({ params }: KittenDetailPageProps) {
  const { slug } = await params;
  let kitten = null;

  try {
    kitten = await getKittenBySlug(slug);
  } catch (error) {
    console.error(`Failed to load kitten detail page for slug "${slug}".`, error);
  }

  if (!kitten) {
    notFound();
  }

  const availability = availabilityMap[kitten.availability];
  const gender = genderMap[kitten.gender];
  const images = resolveKittenImageUrls(kitten);
  const settings = await getSiteSettings();
  const details = [
    { label: "Breed", value: kitten.breed },
    { label: "Gender", value: gender },
    { label: "Age", value: kitten.age_label },
    { label: "Colour", value: kitten.colour },
    { label: "Health", value: kitten.health_status },
    { label: "Temperament", value: kitten.temperament ?? "Sweet, calm & playful" },
  ];
  const included = [
    kitten.vaccinated || kitten.wormed ? "Vaccinated & wormed" : null,
    kitten.health_status ? "Health checked by our vet" : null,
    kitten.litter_trained ? "Litter trained" : null,
    kitten.microchipped ? "Microchipped" : null,
    kitten.tica_registered ? "TICA Registered" : null,
    kitten.parents_can_be_seen ? "Parents can be seen" : null,
    "Lifetime support",
  ].filter((value): value is string => Boolean(value));

  return (
    <div className="bg-white px-4 pb-[72px] pt-6 sm:px-6 sm:pb-[72px] sm:pt-8">
      <div className="mx-auto max-w-[980px] space-y-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--pink-deep)] transition duration-200 hover:opacity-80">
            Home
          </Link>
          <span className="text-[var(--line-strong)]">&gt;</span>
          <Link
            href="/kittens"
            className="text-[var(--pink-deep)] transition duration-200 hover:opacity-80"
          >
            Kittens
          </Link>
          <span className="text-[var(--line-strong)]">&gt;</span>
          <span className="text-[var(--muted)]">{kitten.name}</span>
        </nav>

        <KittenGallery images={images} name={kitten.name} availability={availability} />
        <KittenDetailContent
          availability={availability}
          rawAvailability={kitten.availability}
          name={kitten.name}
          breed={kitten.breed}
          gender={gender}
          whatsappNumber={settings.whatsapp_number}
          shortDescription={kitten.short_description}
          description={kitten.description}
          price={kitten.price}
          details={details}
          included={included}
        />
      </div>
    </div>
  );
}
