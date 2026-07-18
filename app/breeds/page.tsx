import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import CTAButton from "@/components/CTAButton";
import BreedsHero from "@/components/breeds/BreedsHero";
import MeetTheParents from "@/components/breed/MeetTheParents";
import StructuredData from "@/components/seo/StructuredData";
import { createSeoMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

const britishShorthair = {
  title: "About British Shorthair",
  image: "/breed/breed1.png",
  description:
    "The British Shorthair is calm, affectionate and easy-going. They have a plush coat, round face and sweet, gentle nature that makes them perfect family companions.",
  perfectFor: "Families, first-time cat owners and apartment living.",
  href: "/kittens?breed=British%20Shorthair",
  traits: [
    ["Calm & Easygoing", "cat"],
    ["Great with Families", "heart"],
    ["Low Maintenance", "sparkle"],
    ["Lifespan 12-16 years", "clock"],
  ] as const,
};

export const metadata: Metadata = createSeoMetadata({
  title: "British Shorthair Breed Information",
  description:
    "Discover the British Shorthair breed, including temperament, family suitability, and what makes these calm, affectionate cats such popular companions.",
  path: "/breeds",
});

export default function BreedsPage() {
  return (
    <div className="bg-[#FCF9F6] pb-16">
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Breeds", path: "/breeds" },
        ])}
      />
      <BreedsHero />

      <main className="px-4 md:px-7 lg:px-6">
        <div className="mx-auto w-full max-w-[1180px]">
          <article className="grid w-full gap-7 overflow-hidden rounded-[30px] border border-[#F3D6DE] bg-white p-8 shadow-[0_25px_70px_rgba(239,111,145,0.08)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_30px_75px_rgba(239,111,145,0.12)] lg:grid-cols-[320px_minmax(0,1fr)_260px] lg:gap-9 lg:overflow-visible">
            <div className="relative aspect-[4/3] min-h-[260px] w-full overflow-hidden rounded-[24px] shadow-[0_18px_45px_rgba(0,0,0,0.06)] lg:w-[320px]">
              <Image src={britishShorthair.image} alt="British Shorthair cat with a plush coat and round face" fill className="object-cover" sizes="(max-width: 1023px) 100vw, 34vw" />
            </div>

            <div className="flex min-w-0 flex-col justify-center">
              <h2 className="font-serif text-[30px] leading-[1.04] text-[#2F2A2A] lg:text-[42px]">{britishShorthair.title}</h2>
              <Divider />
              <p className="mt-6 text-[16px] leading-[1.75] text-[#5F5A5A]">{britishShorthair.description}</p>
              <div className="mt-8 flex flex-wrap items-start justify-between gap-x-7 gap-y-4">
                {britishShorthair.traits.map(([label, icon]) => (
                  <div key={label} className="flex min-w-[128px] flex-1 items-start gap-3.5 sm:min-w-[145px]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FDEAF0] text-[#EF6F91]"><TraitIcon kind={icon} /></div>
                    <p className="pt-0.5 text-[13px] leading-5 text-[#5F5A5A]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="self-stretch lg:min-w-[260px]">
              <div className="flex h-full min-h-[220px] flex-col justify-center gap-[18px] rounded-[24px] border border-[#F3D6DE] bg-[linear-gradient(180deg,#FFF7FA_0%,#FFFFFF_100%)] p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#FDEAF0] text-[#EF6F91]"><PawIcon className="h-7 w-7" /></div>
                <h3 className="font-serif text-[30px] leading-tight text-[#2F2A2A]">Perfect For</h3>
                <p className="text-[15px] leading-[1.75] text-[#5F5A5A]">{britishShorthair.perfectFor}</p>
                <Divider />
                <Link href={britishShorthair.href} className="inline-flex h-[52px] w-full items-center justify-center rounded-xl border border-[#EF6F91] bg-white px-5 text-sm font-semibold text-[#EF6F91] transition duration-200 hover:-translate-y-0.5 hover:bg-[#EF6F91] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF6F91]">View Kittens</Link>
              </div>
            </div>
          </article>

          <MeetTheParents />

          <section className="mt-9 flex flex-col gap-5 rounded-[28px] border border-[#F3D6DE] bg-[linear-gradient(90deg,#FFF7FA_0%,#FFFFFF_100%)] px-5 py-6 shadow-[0_20px_60px_rgba(239,111,145,0.08)] sm:px-8 lg:flex-row lg:items-center lg:gap-5 lg:px-8 lg:py-5">
            <div className="flex shrink-0 items-center justify-start text-[#EF6F91]">
              <HeartIcon className="h-10 w-10" />
            </div>

            <div className="max-w-[560px] lg:flex-1">
              <h2 className="font-serif text-[28px] leading-[1.05] text-[#2F2A2A] sm:text-[30px]">
                Each British Shorthair kitten is raised with love, care and attention in our family home.
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-[#666666] sm:text-[15px]">
                We focus on health, socialisation and perfect matching to ensure every kitten goes to the right forever home.
              </p>
            </div>

            <div className="lg:ml-auto">
              <CTAButton
                href="/contact"
                className="w-full justify-center px-7 py-3 lg:min-w-[230px] lg:w-auto"
              >
                <span>Enquire About a Kitten</span>
                <PawIcon className="ml-2 h-5 w-5 text-white" />
              </CTAButton>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Divider() { return <div className="mt-[18px] flex items-center gap-3 text-[#EF6F91]"><span className="h-px w-12 bg-[#EF6F91]" /><PawIcon className="h-4 w-4" /><span className="h-px w-12 bg-[#EF6F91]" /></div>; }
function TraitIcon({ kind }: { kind: "cat" | "heart" | "sparkle" | "clock" }) { return kind === "heart" ? <HeartIcon className="h-5 w-5" /> : kind === "sparkle" ? <SparkleIcon className="h-5 w-5" /> : kind === "clock" ? <ClockIcon className="h-5 w-5" /> : <CatIcon className="h-5 w-5" />; }
function PawIcon({ className }: { className?: string }) { return <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor"><path d="M8.1 10.7c-1.2 0-2.2-1.2-2.2-2.7S6.9 5.3 8.1 5.3s2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM15.9 10.7c-1.2 0-2.2-1.2-2.2-2.7s1-2.7 2.2-2.7 2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM5 15.3c-1 0-1.8-1-1.8-2.3S4 10.7 5 10.7s1.8 1 1.8 2.3S6 15.3 5 15.3Zm14 0c-1 0-1.8-1-1.8-2.3s.8-2.3 1.8-2.3 1.8 1 1.8 2.3-.8 2.3-1.8 2.3Zm-7 4.4c-2.6 0-4.6-1.1-4.6-3 0-1.4 1.2-2.6 2.4-3.2.6-.3 1.3-.2 1.9.1.2.1.4.2.6.2s.4-.1.6-.2c.6-.3 1.3-.4 1.9-.1 1.2.6 2.4 1.8 2.4 3.2 0 1.9-2 3-4.6 3Z" /></svg>; }
function CatIcon({ className }: { className?: string }) { return <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none"><path d="m7 10.3-1.8-4.5L9 8.2 12 6.7l3 1.5 3.8-2.4-1.8 4.5v5.1a5.2 5.2 0 0 1-5.2 5.2h-.6A5.2 5.2 0 0 1 6 15.4v-5.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.3 13.2h.01M14.7 13.2h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /><path d="M10.2 16.1c1.1 1 2.5 1 3.6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>; }
function HeartIcon({ className }: { className?: string }) { return <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none"><path d="M12 20s-7-4.4-7-9.8A4.2 4.2 0 0 1 9.2 6c1.2 0 2.3.5 2.8 1.5C12.5 6.5 13.6 6 14.8 6A4.2 4.2 0 0 1 19 10.2C19 15.6 12 20 12 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function SparkleIcon({ className }: { className?: string }) { return <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.2 2.2M15.8 15.8 18 18M18 6l-2.2 2.2M8.2 15.8 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>; }
function ClockIcon({ className }: { className?: string }) { return <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" /><path d="M12 8v4.2l2.8 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
