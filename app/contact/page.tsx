import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { buildWhatsAppUrl } from "@/components/WhatsAppButton";
import StructuredData from "@/components/seo/StructuredData";
import { createSeoMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema } from "@/lib/seo/schema";
import { getSiteSettings } from "@/lib/supabase/queries/settings";
import Image from "next/image";

import CTAButton from "@/components/CTAButton";
import ContactForm from "./contact-form";

export async function generateMetadata(): Promise<Metadata> {
  return createSeoMetadata({
    title: "Contact TamysweetUK",
    description: `Contact TamysweetUK to ask about available kittens, future litters, viewings, or finding the right kitten for your family in the UK.`,
    path: "/contact",
    image: "/hero/hero-about.png",
    keywords: ["contact TamysweetUK", "kitten enquiries UK", "available kittens contact"],
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const socialLinks = [
    settings.instagram_url
      ? { href: settings.instagram_url, label: "Instagram", icon: "instagram" as const }
      : null,
    settings.facebook_url
      ? { href: settings.facebook_url, label: "Facebook", icon: "facebook" as const }
      : null,
    {
      href: buildWhatsAppUrl("Hello, I'd love to learn more about your kittens.", settings.whatsapp_number),
      label: "WhatsApp",
      icon: "whatsapp" as const,
    },
  ].filter(
    (
      item,
    ): item is { href: string; label: string; icon: "instagram" | "facebook" | "whatsapp" } =>
      Boolean(item),
  );

  const contactItems = [
    { label: "Email", value: settings.email, icon: "mail" as const },
    { label: "Phone", value: settings.whatsapp_number, icon: "phone" as const },
    { label: "Location", value: settings.location, icon: "pin" as const },
    { label: "Opening Hours", value: settings.opening_hours, icon: "clock" as const },
  ];

  return (
    <div className="bg-[#FCF9F6] pb-16">
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="HOME / CONTACT"
        title="Get in Touch"
        description="Have a question or ready to welcome a kitten into your home? We'd love to hear from you."
        imageSrc="/hero/hero-about.png"
        imageAlt="TamysweetUK contact and kitten enquiry page"
        className="page-hero-kittens"
        imageClassName="object-cover object-center md:object-[75%_center] lg:object-[72%_center]"
      />

      <div className="px-5 sm:px-8">
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-[58%_42%] lg:gap-9">
          <ContactForm whatsappNumber={settings.whatsapp_number} />

          <aside className="h-fit rounded-[28px] border border-[#F3D6DE] bg-white p-6 shadow-[0_20px_60px_rgba(239,111,145,0.08)] transition duration-200 ease-out hover:-translate-y-[2px] sm:p-8 lg:p-9">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
              Contact Details
            </p>
            <h2 className="mt-3 font-serif text-[34px] leading-[1.08] text-[#2F2A2A] sm:text-[40px]">
              Let&apos;s Connect
            </h2>
            <p className="mt-4 text-[16px] leading-8 text-[#5F5A5A]">
              We&apos;re always happy to talk about available kittens, future litters and finding
              the right match for your family.
            </p>

            <div className="mt-8 space-y-[30px]">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[#FDEAF0] text-[#EF6F91]">
                    <ContactIcon kind={item.icon} className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#EF6F91]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[16px] leading-7 text-[#5F5A5A]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-[#F3D6DE] bg-[linear-gradient(180deg,#FFF8FB_0%,#FFFFFF_100%)] p-6">
              <h3 className="font-serif text-[30px] leading-tight text-[#2F2A2A]">
                Follow Our Journey
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#5F5A5A]">
                See our kittens grow and get updates on available litters.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex h-11 items-center gap-2 rounded-full border border-[#F3D6DE] bg-white px-[18px] text-sm font-semibold text-[#EF6F91] transition duration-200 hover:-translate-y-[2px] hover:bg-[#EF6F91] hover:text-white"
                  >
                    <SocialIcon
                      kind={item.icon}
                      className="h-[18px] w-[18px] transition-colors duration-200 group-hover:text-white"
                    />
                    <span className="transition-colors duration-200 group-hover:text-white">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <section className="mx-auto mt-10 w-full max-w-[1180px]">
          <div className="flex flex-col gap-6 rounded-[28px] border border-[#F3D6DE] bg-[linear-gradient(90deg,#FFF7FA_0%,#FFFFFF_100%)] px-6 py-9 shadow-[0_20px_60px_rgba(239,111,145,0.08)] transition duration-200 ease-out hover:-translate-y-[2px] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12">
            <div className="flex items-center gap-5 lg:flex-1">
              <div className="relative hidden h-20 w-20 overflow-hidden rounded-[20px] shadow-[0_10px_24px_rgba(0,0,0,0.06)] sm:block">
                <Image
                  src="/design/big-logo.jpg"
                  alt="TamysweetUK logo"
                  fill
                  className="object-contain object-center"
                  sizes="80px"
                />
              </div>
              <div className="max-w-[640px]">
                <div className="flex items-center gap-3 text-[#EF6F91]">
                  <HeartIcon className="h-5 w-5" />
                  <span className="text-[12px] font-semibold uppercase tracking-[0.18em]">
                    Ready to Connect
                  </span>
                </div>
                <h2 className="mt-3 font-serif text-[32px] leading-[1.08] text-[#2F2A2A] sm:text-[40px]">
                  Every kitten deserves the perfect home.
                </h2>
                <p className="mt-3 text-[16px] leading-8 text-[#5F5A5A]">
                  Let&apos;s find the perfect match for your family.
                </p>
              </div>
            </div>

            <div className="w-full lg:mr-6 lg:w-auto lg:self-center">
              <CTAButton href="/kittens" className="h-[54px] w-full justify-center px-8 py-3.5 lg:min-w-[240px] lg:w-auto">
                <span>View Available Kittens</span>
                <PawIcon className="ml-2.5 h-6 w-6 text-white" />
              </CTAButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ContactIcon({
  kind,
  className,
}: {
  kind: "mail" | "phone" | "pin" | "clock";
  className?: string;
}) {
  if (kind === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
        <path
          d="M6.8 4.5h2.7l1.1 4.3-1.7 1.7a14.8 14.8 0 0 0 4.6 4.6l1.7-1.7 4.3 1.1v2.7c0 .7-.6 1.3-1.3 1.3A14.9 14.9 0 0 1 5.5 5.8c0-.7.6-1.3 1.3-1.3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
        <path
          d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (kind === "clock") {
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

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m5 7 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({
  kind,
  className,
}: {
  kind: "instagram" | "facebook" | "whatsapp";
  className?: string;
}) {
  if (kind === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M13.4 21v-7.6H16l.4-3h-3v-1.9c0-.9.2-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.9v2.2H8v3h2.6V21h2.8Z" />
      </svg>
    );
  }

  if (kind === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M17.5 6.8A8 8 0 0 0 4.8 16.2L3.6 20.4l4.3-1.1A8 8 0 1 0 17.5 6.8Zm-5.5 11a5.6 5.6 0 0 1-2.8-.8l-.2-.1-2.5.6.7-2.4-.2-.2a5.6 5.6 0 1 1 5 2.9Zm3.1-4.2c-.2-.1-1.1-.6-1.2-.7-.2-.1-.3-.1-.4.1-.1.2-.5.7-.6.8-.1.1-.2.1-.4 0a4.6 4.6 0 0 1-2.3-2c-.1-.2 0-.3.1-.4l.3-.3c.1-.1.1-.2.2-.3.1-.1 0-.2 0-.3l-.5-1.2c-.1-.2-.2-.2-.3-.2h-.3c-.1 0-.3 0-.4.2-.2.2-.7.7-.7 1.6s.7 1.8.8 1.9c.1.1 1.4 2.2 3.4 3 .5.2.9.4 1.2.5.5.2 1 .2 1.4.1.4-.1 1.1-.5 1.2-.9.2-.4.2-.8.1-.9-.1-.1-.2-.1-.4-.2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
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

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8.1 10.7c-1.2 0-2.2-1.2-2.2-2.7S6.9 5.3 8.1 5.3s2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM15.9 10.7c-1.2 0-2.2-1.2-2.2-2.7s1-2.7 2.2-2.7 2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM5 15.3c-1 0-1.8-1-1.8-2.3S4 10.7 5 10.7s1.8 1 1.8 2.3S6 15.3 5 15.3Zm14 0c-1 0-1.8-1-1.8-2.3s.8-2.3 1.8-2.3 1.8 1 1.8 2.3-.8 2.3-1.8 2.3Zm-7 4.4c-2.6 0-4.6-1.1-4.6-3 0-1.4 1.2-2.6 2.4-3.2.6-.3 1.3-.2 1.9.1.2.1.4.2.6.2s.4-.1.6-.2c.6-.3 1.3-.4 1.9-.1 1.2.6 2.4 1.8 2.4 3.2 0 1.9-2 3-4.6 3Z" />
    </svg>
  );
}
