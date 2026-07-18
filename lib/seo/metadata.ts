import type { Metadata } from "next";

const SITE_URL = "https://www.tamysweetuk.co.uk";
export const DEFAULT_SEO_TITLE = "TamysweetUK | Healthy British Shorthair Kittens";
export const DEFAULT_SEO_DESCRIPTION =
  "Trusted UK British Shorthair kitten seller. Healthy, vaccinated and well-socialised kittens looking for loving homes.";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const DEFAULT_OG_IMAGE_ALT = "TamysweetUK - Healthy kittens, happy homes";

type SeoMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function getSiteUrl() {
  return SITE_URL;
}

export function createAbsoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function isMeaningfulSocialUrl(url: string | null | undefined) {
  if (!url) {
    return false;
  }

  const normalized = url.trim().replace(/\/$/, "").toLowerCase();

  return normalized !== "https://instagram.com" && normalized !== "https://facebook.com";
}

export function createSeoMetadata({
  title,
  description,
  path = "/",
  keywords,
}: SeoMetadataInput): Metadata {
  const absoluteUrl = createAbsoluteUrl(path);
  const absoluteImageUrl = createAbsoluteUrl(DEFAULT_OG_IMAGE);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: "TamysweetUK",
      title,
      description,
      url: absoluteUrl,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImageUrl],
    },
  };
}
