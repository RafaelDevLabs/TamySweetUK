import { availabilityMap, buildKittenImageAltText, resolveKittenImageUrls } from "@/lib/mappers/kitten";
import { createAbsoluteUrl, getSiteUrl, isMeaningfulSocialUrl } from "@/lib/seo/metadata";
import type { SiteSettings } from "@/lib/types/settings";
import type { KittenCardData, KittenWithImages } from "@/lib/types/kitten";

type JsonLdRecord = Record<string, unknown>;

type BreadcrumbItem = {
  name: string;
  path: string;
};

const schemaAvailabilityMap = {
  [availabilityMap.available.toLowerCase()]: "InStock",
  [availabilityMap.reserved.toLowerCase()]: "PreOrder",
  [availabilityMap.sold.toLowerCase()]: "SoldOut",
} as const;

export function createOrganizationSchema(settings: SiteSettings): JsonLdRecord {
  const sameAs = [settings.instagram_url, settings.facebook_url].filter(isMeaningfulSocialUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.business_name,
    url: getSiteUrl(),
    logo: createAbsoluteUrl("/design/brand-mark-minimal.svg"),
    image: createAbsoluteUrl("/design/big-logo.jpg"),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function createWebsiteSchema(settings: SiteSettings): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.business_name,
    url: getSiteUrl(),
    description: settings.tagline,
    inLanguage: "en-GB",
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: createAbsoluteUrl(item.path),
    })),
  };
}

export function createFaqSchema(items: Array<{ question: string; answer: string }>): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createKittenListSchema(kittens: KittenCardData[]): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: kittens.map((kitten, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: createAbsoluteUrl(`/kittens/${kitten.slug}`),
      name: kitten.name,
    })),
  };
}

export function createKittenProductSchema(kitten: KittenWithImages): JsonLdRecord {
  const imageUrls = resolveKittenImageUrls(kitten);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: kitten.name,
    description: kitten.short_description,
    category: kitten.breed,
    url: createAbsoluteUrl(`/kittens/${kitten.slug}`),
    image: imageUrls,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Breed", value: kitten.breed },
      { "@type": "PropertyValue", name: "Gender", value: kitten.gender },
      { "@type": "PropertyValue", name: "Colour", value: kitten.colour },
      { "@type": "PropertyValue", name: "Age", value: kitten.age_label },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: kitten.price,
      availability: `https://schema.org/${schemaAvailabilityMap[availabilityMap[kitten.availability].toLowerCase() as keyof typeof schemaAvailabilityMap]}`,
      url: createAbsoluteUrl(`/kittens/${kitten.slug}`),
    },
  };
}

export function createKittenImageAlts(kitten: KittenWithImages) {
  const orderedImages = [...kitten.images]
    .sort((a, b) => a.sort_order - b.sort_order)
    .sort((a, b) => Number(b.is_primary) - Number(a.is_primary));

  return orderedImages.map(
    (image, index) =>
      image.alt_text?.trim() ||
      buildKittenImageAltText({
        name: kitten.name,
        breed: kitten.breed,
        colour: kitten.colour,
        index,
      }),
  );
}
