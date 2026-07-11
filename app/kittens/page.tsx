import CTAButton from "@/components/CTAButton";
import KittensCatalog from "@/components/kittens/KittensCatalog";
import PageHero from "@/components/PageHero";
import { mapSupabaseKittenToCard } from "@/lib/mappers/kitten";
import { getSiteSettings } from "@/lib/supabase/queries/settings";
import { getKittens } from "@/lib/supabase/queries/kittens";

export const metadata = {
  title: "Our Kittens",
};

export const dynamic = "force-dynamic";

export default async function KittensPage() {
  let kittens: Awaited<ReturnType<typeof getKittens>> = [];

  try {
    kittens = await getKittens();
  } catch (error) {
    console.error("Failed to load kittens for the /kittens page.", error);
  }

  const mappedKittens = kittens.map(mapSupabaseKittenToCard);
  const settings = await getSiteSettings();

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="HOME / KITTENS"
        title={settings.kittens_page_title}
        description={settings.kittens_page_description}
        imageSrc="/hero/hero-about.png"
        imageAlt="TamysweetUK kittens page hero"
        className="page-hero-kittens"
        imageClassName="object-cover object-center md:object-[75%_center] lg:object-[72%_center]"
      />

      <KittensCatalog kittens={mappedKittens} />

      <section className="section-wrap pt-16">
        <div className="soft-panel flex flex-col gap-5 rounded-[2rem] px-6 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <div className="shrink-0 text-[#EF6F91]">
              <HeartIcon className="h-10 w-10" />
            </div>
            <div>
            <p className="font-serif text-[28px] leading-[1.05] text-[var(--foreground)] sm:text-3xl">
              Can&apos;t find the perfect kitten?
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)] sm:text-[15px]">
              Join our waiting list and we&apos;ll let you know when new kittens become available.
            </p>
            </div>
          </div>
          <CTAButton href="/contact" className="w-full justify-center px-7 py-3.5 md:w-auto">
            <span>Join Waiting List</span>
            <PawIcon className="ml-2 h-4 w-4 text-white" />
          </CTAButton>
        </div>
      </section>
    </div>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 20s-7-4.4-7-9.8A4.2 4.2 0 0 1 9.2 6c1.2 0 2.3.5 2.8 1.5C12.5 6.5 13.6 6 14.8 6A4.2 4.2 0 0 1 19 10.2C19 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8.1 10.7c-1.2 0-2.2-1.2-2.2-2.7S6.9 5.3 8.1 5.3s2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM15.9 10.7c-1.2 0-2.2-1.2-2.2-2.7s1-2.7 2.2-2.7 2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM5 15.3c-1 0-1.8-1-1.8-2.3S4 10.7 5 10.7s1.8 1 1.8 2.3S6 15.3 5 15.3Zm14 0c-1 0-1.8-1-1.8-2.3s.8-2.3 1.8-2.3 1.8 1 1.8 2.3-.8 2.3-1.8 2.3Zm-7 4.4c-2.6 0-4.6-1.1-4.6-3 0-1.4 1.2-2.6 2.4-3.2.6-.3 1.3-.2 1.9.1.2.1.4.2.6.2s.4-.1.6-.2c.6-.3 1.3-.4 1.9-.1 1.2.6 2.4 1.8 2.4 3.2 0 1.9-2 3-4.6 3Z" />
    </svg>
  );
}
