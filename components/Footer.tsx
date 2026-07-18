import Image from "next/image";
import Link from "next/link";

import CookieSettingsLink from "@/components/consent/CookieSettingsLink";
import type { SiteSettings } from "@/lib/types/settings";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/kittens", label: "Available Kittens" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

function sanitizePhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/\D/g, "");
}

export default function Footer({ settings }: { settings: SiteSettings }) {
  const touchLinks = [
    {
      href: `https://wa.me/${sanitizePhoneNumber(settings.whatsapp_number)}`,
      label: "WhatsApp",
    },
    ...(settings.instagram_url ? [{ href: settings.instagram_url, label: "Instagram" }] : []),
    ...(settings.facebook_url ? [{ href: settings.facebook_url, label: "Facebook" }] : []),
  ];

  return (
    <footer className="mt-0 border-t border-[#F3E2E6] bg-[#FCF9F6]">
      <div className="mx-auto w-full max-w-[1280px] px-6 pb-5 pt-9 sm:px-8 sm:pb-6 sm:pt-10 lg:px-6 lg:pb-6 lg:pt-12">
        <div className="grid gap-7 md:grid-cols-3 md:items-center md:gap-8">
          <div className="space-y-2.5">
            <div className="flex items-center gap-4">
              <div className="relative h-[56px] w-[56px] shrink-0">
                <Image
                  src="/design/logo.png"
                  alt="TamysweetUK logo"
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>
              <div>
                <p className="font-serif text-[24px] leading-none text-[#2F2A2A] lg:text-[26px]">
                  {settings.business_name}
                </p>
                <p className="mt-1 text-[13px] text-[#6F6666]">{settings.tagline}</p>
              </div>
            </div>

            <p className="max-w-sm text-[14px] leading-5 text-[#6F6666]">
              {settings.location}
              <br />
              {settings.opening_hours}
            </p>
          </div>

          <FooterColumn title="Explore">
            {exploreLinks.map((item) => (
              <FooterLink key={item.href + item.label} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in Touch">
            {touchLinks.map((item) => (
              <FooterLink key={item.href + item.label} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-[#F3E2E6] pt-4 text-sm text-[#6F6666] md:flex-row md:items-center md:justify-between">
          <p>2026 {settings.business_name}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy-policy" className="transition duration-200 hover:text-[#EF6F91]">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="transition duration-200 hover:text-[#EF6F91]">
              Cookie Policy
            </Link>
            <CookieSettingsLink />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 md:self-center">
      <FooterHeading>{title}</FooterHeading>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
      {children}
    </p>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("tel:");

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="text-[15px] text-[#2F2A2A] transition duration-200 hover:text-[#EF6F91]"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-[15px] text-[#2F2A2A] transition duration-200 hover:text-[#EF6F91]"
    >
      {children}
    </Link>
  );
}
