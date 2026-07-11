import Image from "next/image";
import Link from "next/link";

import { buildWhatsAppUrl } from "@/components/WhatsAppButton";
import type { SiteSettings } from "@/lib/types/settings";

export default function HomeHero({ settings }: { settings: SiteSettings }) {
  const title = settings.hero_title;
  const [beforeLoving, afterLoving] = title.includes("Loving")
    ? title.split("Loving")
    : [title, ""];
  const highlightedTitle = title.includes("Loving");

  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#FCF9F6]">
      <div className="absolute inset-0 z-0 w-full lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[58%]">
        <Image
          src="/hero/hero-home.png"
          alt="TamysweetUK kittens"
          fill
          priority
          className="object-cover object-[62%_center]"
          sizes="(min-width: 1024px) 58vw, 100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#FCF9F6_0%,rgba(252,249,246,.95)_10%,rgba(252,249,246,.72)_24%,rgba(252,249,246,.28)_38%,transparent_52%)]" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-[680px] w-full max-w-[1280px] items-center px-5 py-10 sm:px-8 lg:px-16">
        <div className="w-full max-w-[520px] space-y-6">
          <div className="space-y-4">
            <h1 className="font-serif text-[44px] leading-[0.9] font-medium tracking-[-0.02em] text-[#2F2A2A] lg:text-[72px]">
              {highlightedTitle ? (
                <>
                  {beforeLoving}
                  <span className="text-[0.93em] text-[var(--pink-deep)]">Loving</span>
                  {afterLoving}
                </>
              ) : (
                title
              )}
            </h1>

            <div className="flex items-center gap-3 text-[var(--pink-deep)]">
              <span className="text-sm">{"\u2665"}</span>
              <span className="h-px w-11 bg-[#EF6F91]/70" />
            </div>

            <p className="max-w-[420px] text-[17px] leading-[1.7] text-[#5D5656]">
              Trusted UK kitten seller.
              <br />
              {settings.hero_description}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-[14px]">
            <Link
              href="/kittens"
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-full bg-[var(--pink)] px-[26px] text-sm font-semibold !text-white shadow-[0_10px_24px_rgba(239,111,145,0.22)] transition duration-[250ms] hover:-translate-y-0.5 hover:bg-[var(--pink-deep)] hover:!text-white"
            >
              <span className="!text-white">View Kittens</span>
              <PawIcon className="h-[15px] w-[15px] fill-current text-white" />
            </Link>

            <a
              href={buildWhatsAppUrl("Hello, I'm interested in your kittens.", settings.whatsapp_number)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-full border-[1.5px] border-[var(--pink)] bg-white/85 px-[26px] text-sm font-semibold !text-[var(--pink-deep)] transition duration-[250ms] hover:bg-[#FDECEF] hover:!text-[var(--pink-deep)]"
            >
              <span className="!text-[var(--pink-deep)]">Contact Us</span>
              <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[var(--pink)]">
                <WhatsAppIcon className="h-[10px] w-[10px] text-[var(--pink-deep)]" />
              </span>
            </a>
          </div>

          <div className="mt-9 flex flex-col gap-4 text-[15px] font-medium text-[#6D735E] sm:flex-row sm:flex-wrap sm:gap-x-[40px] sm:gap-y-4">
            <div className="flex items-center gap-2.5">
              <ShieldIcon className="h-5 w-5 text-[#7F8A6B]" />
              <span>Health Checked</span>
            </div>
            <div className="flex items-center gap-2.5">
              <AwardIcon className="h-5 w-5 text-[#7F8A6B]" />
              <span>Vaccinated</span>
            </div>
            <div className="flex items-center gap-2.5">
              <HeartIcon className="h-5 w-5 text-[#7F8A6B]" />
              <span>Well Socialised</span>
            </div>
          </div>

          <div className="mt-[30px] flex w-full max-w-[460px] items-center gap-[18px] rounded-[24px] border border-[rgba(239,111,145,0.18)] bg-[rgba(255,255,255,0.58)] px-6 py-[22px] shadow-[0_18px_45px_rgba(0,0,0,0.06)] backdrop-blur-[18px] [webkit-backdrop-filter:blur(18px)]">
            <TrophyIcon className="h-[30px] w-[30px] shrink-0 text-[#EF6F91] sm:h-10 sm:w-10" />
            <span className="hidden h-[52px] w-px shrink-0 bg-[rgba(239,111,145,0.18)] sm:block" />
            <div>
              <p className="text-[19px] font-bold text-[#2F2A2A] sm:text-[20px]">TICA Registered</p>
              <p className="mt-1 text-[14px] leading-[1.55] text-[#5F5A5A] sm:text-[15px]">
                Every kitten comes with
                <br />
                official pedigree documentation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-5 z-20 hidden h-[104px] w-[260px] items-center gap-4 rounded-[22px] border border-[rgba(255,255,255,0.40)] bg-[rgba(255,255,255,0.62)] px-[22px] py-[18px] shadow-[0_18px_45px_rgba(0,0,0,0.08)] backdrop-blur-[20px] transition duration-[250ms] hover:-translate-y-0.5 sm:right-8 md:flex md:w-[280px] lg:bottom-[54px] lg:right-[72px] lg:w-[300px] [webkit-backdrop-filter:blur(20px)]">
        <div className="relative h-[44px] w-[44px] shrink-0 lg:h-[64px] lg:w-[64px]">
          <Image
            src="/design/brand-icon-small.png"
            alt="TamysweetUK brand icon"
            fill
            className="scale-[1.35] object-contain"
            sizes="(min-width: 1024px) 64px, 44px"
          />
        </div>
        <div>
          <p className="text-[17px] font-bold tracking-tight text-[#2F2A2A] lg:text-[18px]">
            TamysweetUK
          </p>
          <p className="mt-1 text-[15px] leading-[1.35] text-[#5F5858]">
            Healthy kittens,
            <br />
            happy homes.
          </p>
        </div>
      </div>
    </section>
  );
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <ellipse cx="7" cy="8" rx="2" ry="3" />
      <ellipse cx="12" cy="6.5" rx="2" ry="3" />
      <ellipse cx="17" cy="8" rx="2" ry="3" />
      <ellipse cx="19.5" cy="12" rx="1.8" ry="2.6" />
      <path d="M12 11.5c-2.8 0-5.8 2.2-5.8 5 0 1.5 1.2 2.3 2.5 2.3 1.2 0 1.9-.6 3.3-.6s2.1.6 3.3.6c1.3 0 2.5-.8 2.5-2.3 0-2.8-3-5-5.8-5Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M20 11.6a8 8 0 1 1-14.8 4.2L4 20l4.4-1.1A8 8 0 1 1 20 11.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.7 8.9c.2-.5.5-.5.7-.5h.6c.2 0 .4.1.5.4l.8 1.9c.1.2.1.4 0 .6l-.3.5c-.1.2-.1.3 0 .4.3.6.8 1.2 1.4 1.7.6.4 1.2.8 1.5.9.2.1.3.1.4 0l.6-.7c.2-.2.4-.3.6-.2l1.7.8c.2.1.4.2.4.5v.5c0 .3-.2.6-.5.7-.5.2-1 .3-1.5.2-1-.2-2.2-.8-3.5-1.9-1.5-1.1-2.4-2.5-2.8-3.6-.3-.7-.2-1.5.2-2.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 3l7 3v5c0 4.7-2.8 8-7 10-4.2-2-7-5.3-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m8.8 12.2 2.1 2.1 4.3-4.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AwardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M10 13.5 8 21l4-2 4 2-2-7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M8 4.5h8v2.2a4 4 0 0 1-2.8 3.8L13 13h2.1a1 1 0 0 1 1 1V16H7.9v-2a1 1 0 0 1 1-1H11l-.2-2.5A4 4 0 0 1 8 6.7V4.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6H5.8A1.8 1.8 0 0 0 4 7.8c0 2 1.6 3.7 3.6 3.7H8M16 6h2.2A1.8 1.8 0 0 1 20 7.8c0 2-1.6 3.7-3.6 3.7H16M9 19.5h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
