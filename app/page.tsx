import type { Metadata } from "next";

import AboutPreview from "@/components/AboutPreview";
import CTAButton from "@/components/CTAButton";
import KittenCard from "@/components/KittenCard";
import StructuredData from "@/components/seo/StructuredData";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeHero from "@/components/home/HomeHero";
import { mapSupabaseKittenToCard } from "@/lib/mappers/kitten";
import { createSeoMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createKittenListSchema,
  createOrganizationSchema,
  createWebsiteSchema,
} from "@/lib/seo/schema";
import { getSiteSettings } from "@/lib/supabase/queries/settings";
import { getFeaturedKittens } from "@/lib/supabase/queries/kittens";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return createSeoMetadata({
    title: "Family-Raised Kittens in the UK",
    description: `${settings.hero_description} View available kittens, learn about our breeding approach, and get in touch with TamysweetUK.`,
    path: "/",
    image: "/hero/hero-home.png",
    keywords: ["family-raised kittens UK", "TamysweetUK", "available kittens", "British Shorthair kittens UK"],
  });
}

export default async function HomePage() {
  const [featuredKittens, settings] = await Promise.all([
    getFeaturedKittens(4).catch((error) => {
      console.error("Failed to load featured kittens for the homepage.", error);
      return [];
    }),
    getSiteSettings(),
  ]);

  const mappedFeaturedKittens = featuredKittens.map(mapSupabaseKittenToCard);

  return (
    <div>
      <StructuredData
        data={[
          createOrganizationSchema(settings),
          createWebsiteSchema(settings),
          createBreadcrumbSchema([{ name: "Home", path: "/" }]),
          createKittenListSchema(featuredKittens),
        ]}
      />
      <HomeHero settings={settings} />
      <div className="bg-[#FCF9F6] pt-8 sm:pt-10 lg:pt-8">
        <div>
          <HomeFeatures />
        </div>

        <section className="mx-auto w-full max-w-[1280px] px-5 pb-[42px] pt-24 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-[620px] text-center">
            <p className="-mt-[6px] mb-3 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#EF6F91]">
              Our Kittens
            </p>
            <h2 className="font-serif text-[42px] leading-[1.05] font-medium text-[#2F2A2A] sm:text-[48px] lg:text-[56px]">
              Available Kittens
            </h2>
            <span className="mx-auto mt-[14px] mb-6 block h-0.5 w-[88px] rounded-full bg-[#EF6F91]" />
            <div className="mx-auto mb-12 max-w-[620px] text-[16px] leading-[1.7] text-[#6F6666]">
              <p>We have beautiful kittens looking for their forever homes.</p>
              <p>Each one has a unique personality and is full of love.</p>
            </div>
          </div>

          {mappedFeaturedKittens.length > 0 ? (
            <div className="grid justify-items-center gap-7 md:grid-cols-2 xl:grid-cols-4">
              {mappedFeaturedKittens.map((kitten, index) => (
                <KittenCard key={kitten.id} kitten={kitten} prioritizeImage={index < 4} />
              ))}
            </div>
          ) : (
            <p className="text-center text-[16px] text-[#6F6666]">No kittens available.</p>
          )}

          <div className="mt-[42px] flex justify-center">
            <CTAButton href="/kittens" className="min-w-[190px] justify-center">
              View All Kittens
            </CTAButton>
          </div>
        </section>
      </div>

      <AboutPreview />
    </div>
  );
}
