"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-[14px]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentId = `faq-answer-${index}`;

        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-[18px] border transition-all duration-200 ease-out ${
              isOpen
                ? "border-[#EF6F91] bg-[linear-gradient(180deg,#FFF8FB_0%,#FFFFFF_100%)] shadow-[0_20px_50px_rgba(239,111,145,0.10)]"
                : "border-[#F3D6DE] bg-white shadow-[0_14px_36px_rgba(0,0,0,0.04)] hover:-translate-y-[2px]"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="flex min-h-[68px] w-full items-center justify-between gap-4 px-5 py-0 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-[#EF6F91] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm transition-all duration-200 ease-out ${
                    isOpen
                      ? "border-[#EF6F91] bg-[#EF6F91] text-white"
                      : "border-[#F3D6DE] bg-[#FFF7FA] text-[#EF6F91]"
                  }`}
                >
                  {isOpen ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                </span>
                <span className="text-[16px] leading-[1.5] font-semibold text-[#2F2A2A] sm:text-[17px]">
                  {item.question}
                </span>
              </div>
              <ChevronIcon
                className={`h-5 w-5 shrink-0 text-[#EF6F91] transition-transform duration-200 ease-out ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id={contentId}
              className={`grid transition-all duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mt-1 border-t border-[rgba(243,214,222,0.8)] px-1 pb-[22px] pt-[18px] text-[15px] leading-[1.8] text-[#666666] sm:ml-[52px] sm:px-3 sm:pb-6 sm:pt-[18px]">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
