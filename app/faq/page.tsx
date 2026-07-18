import type { Metadata } from "next";

import CTAButton from "@/components/CTAButton";
import FAQAccordion from "@/components/FAQAccordion";
import FAQHero from "@/components/faq/FAQHero";
import StructuredData from "@/components/seo/StructuredData";
import { faqItems } from "@/lib/mock-kittens";
import { createSeoMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/seo/schema";

const extendedFaqItems =
  faqItems.length >= 9
    ? faqItems
    : [
        ...faqItems,
        {
          question: "Do you register your kittens?",
          answer:
            "Where applicable, kittens are registered with the relevant recognised organisation and the documentation is provided to their new family.",
        },
        {
          question: "What if I can no longer keep my kitten?",
          answer:
            "Please contact us first. We care deeply about every kitten we raise and will always try to help find the safest and most responsible solution.",
        },
      ];

export const metadata: Metadata = createSeoMetadata({
  title: "Kitten FAQ",
  description:
    "Find answers to common questions about available kittens, reservations, health checks, registration, and bringing a TamysweetUK kitten home.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <div className="bg-[#FCF9F6] pb-10 lg:pb-14">
      <StructuredData
        data={[
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          createFaqSchema(extendedFaqItems),
        ]}
      />
      <FAQHero />

      <div className="px-4 pt-0 sm:px-6 lg:px-6">
        <div className="mx-auto w-full max-w-[980px]">
          <FAQAccordion items={extendedFaqItems} />

          <section className="mt-14 flex flex-col gap-5 rounded-[28px] border border-[#F3D6DE] bg-[linear-gradient(90deg,#FFF7FA_0%,#FFFFFF_100%)] px-5 py-6 shadow-[0_20px_60px_rgba(239,111,145,0.08)] sm:px-8 lg:mt-[56px] lg:flex-row lg:items-center lg:gap-5 lg:px-8 lg:py-5">
            <div className="flex shrink-0 items-center justify-start text-[#EF6F91]">
              <HeartIcon className="h-10 w-10" />
            </div>

            <div className="max-w-[420px] lg:flex-1">
              <h3 className="font-serif text-[28px] leading-[1.05] text-[#2F2A2A] sm:text-[30px]">
                Still have a question?
              </h3>
              <p className="mt-2 text-[14px] leading-6 text-[#666666] sm:text-[15px]">
                I&apos;m here to help. Feel free to get in touch.
              </p>
            </div>

            <div className="lg:ml-auto">
              <CTAButton
                href="/contact"
                className="w-full justify-center px-7 py-3 lg:min-w-[170px] lg:w-auto"
              >
                <span>Contact Me</span>
                <PawIcon className="ml-2 h-5 w-5 text-white" />
              </CTAButton>
            </div>
          </section>
        </div>
      </div>
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
