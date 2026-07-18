import type { Metadata } from "next";

const SITE_URL = "https://tamysweetuk.co.uk";
const DEFAULT_OG_IMAGE = "/design/big-logo.jpg";

type SeoMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
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
  image = DEFAULT_OG_IMAGE,
  keywords,
}: SeoMetadataInput): Metadata {
  const absoluteUrl = createAbsoluteUrl(path);
  const absoluteImageUrl = createAbsoluteUrl(image);

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
          alt: title,
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
