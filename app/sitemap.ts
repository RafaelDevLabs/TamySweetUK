import type { MetadataRoute } from "next";

import { createAbsoluteUrl } from "@/lib/seo/metadata";
import { getKittens } from "@/lib/supabase/queries/kittens";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const kittens = await getKittens().catch(() => []);

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/about",
    "/breeds",
    "/contact",
    "/cookie-policy",
    "/faq",
    "/kittens",
    "/privacy-policy",
    "/testimonials",
  ].map((path) => ({
    url: createAbsoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/kittens" ? 0.9 : 0.7,
  }));

  const kittenRoutes: MetadataRoute.Sitemap = kittens.map((kitten) => ({
    url: createAbsoluteUrl(`/kittens/${kitten.slug}`),
    lastModified: kitten.created_at,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...kittenRoutes];
}
