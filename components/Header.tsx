"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { SiteSettings } from "@/lib/types/settings";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/kittens", label: "Kittens" },
  { href: "/about", label: "About Us" },
  { href: "/breeds", label: "British Shorthair" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#F3E2E6] bg-white/96 backdrop-blur-xl">
      <div className="mx-auto grid h-[72px] w-full max-w-[1280px] grid-cols-[1fr_auto] items-center gap-4 px-5 sm:px-6 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <div className="relative h-[72px] w-[72px] shrink-0">
            <Image
              src="/design/logo.png"
              alt="TamysweetUK logo"
              fill
              className="object-contain"
              sizes="72px"
            />
          </div>
          <div className="space-y-1">
            <p className="font-serif text-[28px] leading-none font-medium text-[#2F2A2A]">
              {settings.business_name}
            </p>
            <p className="text-[12px] text-[#7A7474]">{settings.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative inline-flex flex-col items-center text-sm transition duration-[250ms] hover:text-[#EF6F91] ${
                  active ? "font-semibold !text-[#EF6F91]" : "text-[#2F2A2A]"
                }`}
              >
                <span className={active ? "!text-[#EF6F91]" : ""}>{item.label}</span>
                <span
                  className={`mt-1 h-0.5 rounded-full bg-[#EF6F91] transition-all duration-[250ms] ${
                    active ? "w-[18px] opacity-100" : "w-0 opacity-0 group-hover:w-[18px] group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden justify-self-end lg:block">
          <Link
            href="/contact"
            className="inline-flex h-[46px] items-center justify-center gap-2 rounded-full bg-[#EF6F91] px-[26px] text-sm font-semibold !text-white shadow-[0_12px_30px_rgba(239,111,145,0.22)] transition duration-[250ms] hover:bg-[#E95E84] hover:!text-white"
          >
            <span className="!text-white">Enquire Now</span>
            <PawIcon className="h-[15px] w-[15px] fill-current text-white" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--line)] px-4 text-sm font-medium text-[var(--foreground)] lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-[var(--line)] bg-white lg:hidden">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-2 px-5 py-4 sm:px-6">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    active ? "bg-[var(--pink-soft)] font-semibold text-[var(--pink-deep)]" : "text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--pink)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(239,111,145,0.22)] transition hover:bg-[var(--pink-deep)]"
            >
              <span>Enquire Now</span>
              <PawIcon className="h-[15px] w-[15px] fill-current text-white" />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
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
