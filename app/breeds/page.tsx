import Image from "next/image";
import Link from "next/link";

import BreedsHero from "@/components/breeds/BreedsHero";
import CTAButton from "@/components/CTAButton";

const breeds = [
  {
    title: "British Shorthair",
    image: "/breed/breed1.png",
    description:
      "The British Shorthair is calm, affectionate and easy-going. They have a plush coat, round face and sweet, gentle nature that makes them perfect family companions.",
    perfectFor: "Families, first-time cat owners and apartment living.",
    href: "/kittens?breed=British%20Shorthair",
    traits: [
      { label: "Calm & Easygoing", icon: "cat" as const },
      { label: "Great with Families", icon: "heart" as const },
      { label: "Low Maintenance", icon: "sparkle" as const },
      { label: "Lifespan 12-16 years", icon: "clock" as const },
    ],
  },
  {
    title: "British Longhair",
    image: "/breed/breed2.png",
    description:
      "With their plush long coat and affectionate personality, British Longhairs are gentle, sweet and love being around people. They are playful but also enjoy their quiet time.",
    perfectFor: "Families and anyone looking for a loving and calm companion.",
    href: "/kittens?breed=British%20Longhair",
    traits: [
      { label: "Affectionate", icon: "heart" as const },
      { label: "Gentle & Playful", icon: "cat" as const },
      { label: "Regular Grooming", icon: "sparkle" as const },
      { label: "Lifespan 12-16 years", icon: "clock" as const },
    ],
  },
  {
    title: "Scottish Fold",
    image: "/breed/breed3.png",
    description:
      "Known for their unique folded ears and round eyes, Scottish Folds are sweet, curious and affectionate cats that love to be part of the family.",
    perfectFor: "Families, seniors and anyone wanting a calm and cuddly cat.",
    href: "/kittens?breed=Scottish%20Fold",
    traits: [
      { label: "Sweet & Gentle", icon: "heart" as const },
      { label: "Adaptable", icon: "cat" as const },
      { label: "Low Maintenance", icon: "sparkle" as const },
      { label: "Lifespan 11-15 years", icon: "clock" as const },
    ],
  },
  {
    title: "Other Beautiful Breeds",
    image: "/breed/breed4.png",
    description:
      "We occasionally have other wonderful breeds available. Each kitten is special and raised with the same love, care and commitment.",
    perfectFor: "Those looking for something a little different.",
    href: "/kittens",
    traits: [
      { label: "Unique Personalities", icon: "cat" as const },
      { label: "Raised with Love", icon: "heart" as const },
      { label: "Health Checked", icon: "sparkle" as const },
      { label: "Varies", icon: "clock" as const },
    ],
  },
] as const;

export const metadata = {
  title: "Breeds",
};

export default function BreedsPage() {
  return (
    <div className="bg-[#FCF9F6] pb-16">
      <BreedsHero />

      <div className="px-5 sm:px-8">
        <div className="mx-auto w-full max-w-[1180px] space-y-8 lg:space-y-[56px]">
          {breeds.map((breed) => (
            <article
              key={breed.title}
              className="grid w-full gap-7 overflow-hidden rounded-[30px] border border-[#F3D6DE] bg-white p-8 shadow-[0_25px_70px_rgba(239,111,145,0.08)] transition-transform duration-200 ease-out hover:-translate-y-[3px] lg:grid-cols-[320px_minmax(0,1fr)_260px] lg:gap-9 lg:overflow-visible"
            >
              <div className="relative w-full max-w-full aspect-[4/3] min-h-[260px] overflow-hidden rounded-[24px] shadow-[0_18px_45px_rgba(0,0,0,0.06)] lg:w-[320px]">
                <Image
                  src={breed.image}
                  alt={breed.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 100vw, 34vw"
                />
              </div>

              <div className="min-w-0 flex flex-col justify-center">
                <h2 className="font-serif text-[30px] leading-[1.04] text-[#2F2A2A] lg:text-[42px]">
                  {breed.title}
                </h2>
                <div className="mt-[18px] flex items-center gap-3 text-[#EF6F91]">
                  <span className="h-px w-12 bg-[#EF6F91]" />
                  <PawIcon className="h-4 w-4" />
                  <span className="h-px w-12 bg-[#EF6F91]" />
                </div>
                <p className="mt-6 text-[16px] leading-[1.75] text-[#5F5A5A]">
                  {breed.description}
                </p>

                <div className="mt-8 flex flex-wrap items-start justify-between gap-x-7 gap-y-4">
                  {breed.traits.map((trait) => (
                    <div
                      key={trait.label}
                      className="flex min-w-[128px] flex-1 items-start gap-3.5 sm:min-w-[145px]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FDEAF0] text-[#EF6F91]">
                        <TraitIcon kind={trait.icon} />
                      </div>
                      <p className="pt-0.5 text-[13px] leading-5 text-[#5F5A5A]">{trait.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="self-stretch lg:min-w-[260px]">
                <div className="flex h-full min-h-[220px] flex-col justify-center gap-[18px] rounded-[24px] border border-[#F3D6DE] bg-[linear-gradient(180deg,#FFF7FA_0%,#FFFFFF_100%)] p-7 lg:rounded-[24px] lg:border-l lg:border-l-[#F3D6DE]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#FDEAF0] text-[#EF6F91]">
                    <PawIcon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-[30px] leading-tight text-[#2F2A2A]">
                    Perfect For
                  </h3>
                  <p className="text-[15px] leading-[1.75] text-[#5F5A5A]">{breed.perfectFor}</p>
                  <div className="flex items-center gap-3 text-[#EF6F91]">
                    <span className="h-px flex-1 bg-[#EF6F91]" />
                    <PawIcon className="h-4 w-4" />
                    <span className="h-px flex-1 bg-[#EF6F91]" />
                  </div>
                  <Link
                    href={breed.href}
                    className="inline-flex h-[52px] w-full items-center justify-center rounded-xl border border-[#EF6F91] bg-white px-5 text-sm font-semibold text-[#EF6F91] transition duration-200 hover:-translate-y-0.5 hover:bg-[#EF6F91] hover:text-white"
                  >
                    View Kittens
                  </Link>
                </div>
              </div>
            </article>
          ))}

          <section className="flex flex-col gap-6 rounded-[28px] border border-[#F3D6DE] bg-[linear-gradient(90deg,#FFF7FA_0%,#FFFFFF_100%)] px-6 py-6 shadow-[0_18px_48px_rgba(0,0,0,0.05)] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="shrink-0 text-[#EF6F91]">
                <OutlineHeartIcon className="h-12 w-12" />
              </div>
              <div className="max-w-[470px]">
                <p className="text-[18px] leading-[1.5] font-medium text-[#2F2A2A] sm:text-[20px]">
                  Each breed has its own charm,
                  <br />
                  but all our kittens have one thing in common:
                  <br />
                  they are loved from day one.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <CTAButton href="/contact" className="w-full justify-center px-7 py-3.5 lg:min-w-[230px] lg:w-auto">
                <span>Enquire About a Kitten</span>
                <PawIcon className="ml-2 h-4 w-4 text-white" />
              </CTAButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function TraitIcon({ kind }: { kind: "cat" | "heart" | "sparkle" | "clock" }) {
  if (kind === "heart") {
    return <HeartIcon className="h-5 w-5" />;
  }

  if (kind === "sparkle") {
    return <SparkleIcon className="h-5 w-5" />;
  }

  if (kind === "clock") {
    return <ClockIcon className="h-5 w-5" />;
  }

  return <CatIcon className="h-5 w-5" />;
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8.1 10.7c-1.2 0-2.2-1.2-2.2-2.7S6.9 5.3 8.1 5.3s2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM15.9 10.7c-1.2 0-2.2-1.2-2.2-2.7s1-2.7 2.2-2.7 2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM5 15.3c-1 0-1.8-1-1.8-2.3S4 10.7 5 10.7s1.8 1 1.8 2.3S6 15.3 5 15.3Zm14 0c-1 0-1.8-1-1.8-2.3s.8-2.3 1.8-2.3 1.8 1 1.8 2.3-.8 2.3-1.8 2.3Zm-7 4.4c-2.6 0-4.6-1.1-4.6-3 0-1.4 1.2-2.6 2.4-3.2.6-.3 1.3-.2 1.9.1.2.1.4.2.6.2s.4-.1.6-.2c.6-.3 1.3-.4 1.9-.1 1.2.6 2.4 1.8 2.4 3.2 0 1.9-2 3-4.6 3Z" />
    </svg>
  );
}

function CatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m7 10.3-1.8-4.5L9 8.2 12 6.7l3 1.5 3.8-2.4-1.8 4.5v5.1a5.2 5.2 0 0 1-5.2 5.2h-.6A5.2 5.2 0 0 1 6 15.4v-5.1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.3 13.2h.01M14.7 13.2h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M10.2 16.1c1.1 1 2.5 1 3.6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
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

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.2 2.2M15.8 15.8 18 18M18 6l-2.2 2.2M8.2 15.8 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 8v4.2l2.8 1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OutlineHeartIcon({ className }: { className?: string }) {
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
