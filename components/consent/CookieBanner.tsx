"use client";

import Link from "next/link";

import { useConsent } from "@/components/consent/ConsentProvider";

export default function CookieBanner() {
  const { canShowBanner, acceptAll, rejectOptional, openSettings } = useConsent();

  if (!canShowBanner) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-[90] px-4 sm:px-6">
      <section className="mx-auto max-w-[1100px] rounded-[28px] border border-[#F3D6DE] bg-[linear-gradient(180deg,#FFF8FB_0%,#FFFDFC_100%)] p-5 shadow-[0_24px_60px_rgba(47,42,42,0.14)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[680px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
              Cookie choices
            </p>
            <p className="mt-3 text-[15px] leading-7 text-[#4F4A4A]">
              We only use optional cookies or similar technologies if you allow them. Necessary
              technologies remain active for security and core site functions.
            </p>
            <Link
              href="/cookie-policy"
              className="mt-3 inline-flex text-sm font-semibold text-[#EF6F91] underline-offset-4 transition hover:underline"
            >
              Read the Cookie Policy
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#EF6F91] px-5 text-sm font-semibold text-white transition hover:bg-[#E95E84] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF6F91] focus-visible:ring-offset-2"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={rejectOptional}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#EF6F91] bg-white px-5 text-sm font-semibold text-[#EF6F91] transition hover:bg-[#FDECEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF6F91] focus-visible:ring-offset-2"
            >
              Reject optional
            </button>
            <button
              type="button"
              onClick={() => openSettings(document.activeElement instanceof HTMLElement ? document.activeElement : null)}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#F3D6DE] bg-white px-5 text-sm font-semibold text-[#2F2A2A] transition hover:border-[#EF6F91] hover:text-[#EF6F91] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF6F91] focus-visible:ring-offset-2"
            >
              Manage preferences
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
