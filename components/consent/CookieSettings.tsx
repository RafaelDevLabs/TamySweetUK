"use client";

import { useEffect, useId, useRef, useState } from "react";

import { useConsent } from "@/components/consent/ConsentProvider";
import {
  CONSENT_CATEGORIES,
  DEFAULT_CONSENT_DRAFT,
  OPTIONAL_CONSENT_FEATURES_ACTIVE,
} from "@/lib/consent/config";
import type { ConsentDraft, OptionalConsentCategory } from "@/lib/consent/types";

function getDraftFromConsent(consent: ReturnType<typeof useConsent>["consent"]): ConsentDraft {
  if (!consent) {
    return { ...DEFAULT_CONSENT_DRAFT };
  }

  return {
    preferences: consent.preferences,
    analytics: consent.analytics,
    marketing: consent.marketing,
  };
}

export default function CookieSettings({
  returnFocusElement,
}: {
  returnFocusElement?: HTMLElement | null;
}) {
  const { consent, isSettingsOpen, closeSettings, savePreferences, acceptAll, rejectOptional } =
    useConsent();
  const [draft, setDraft] = useState<ConsentDraft>(() => getDraftFromConsent(consent));
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isSettingsOpen) {
      return;
    }

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableElements = dialog?.querySelectorAll<HTMLElement>(
      'button, [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusableElements?.[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSettings();
        return;
      }

      if (event.key !== "Tab" || !focusableElements || focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      returnFocusElement?.focus();
    };
  }, [closeSettings, isSettingsOpen, returnFocusElement]);

  if (!isSettingsOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(32,24,26,0.45)] px-4 py-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeSettings();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-[30px] border border-[#F3D6DE] bg-[#FFFDFC] p-6 shadow-[0_30px_80px_rgba(47,42,42,0.18)] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
              Cookie settings
            </p>
            <h2 id={titleId} className="mt-3 font-serif text-[34px] leading-[1.08] text-[#2F2A2A]">
              Manage your privacy choices
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-[#5F5A5A]">
              Necessary technologies stay active for security and core services. All optional
              categories are off by default.
            </p>
            {!OPTIONAL_CONSENT_FEATURES_ACTIVE ? (
              <p className="mt-3 rounded-[18px] border border-[#F3E2E6] bg-[#FCF9F6] px-4 py-3 text-sm leading-6 text-[#6F6666]">
                TamysweetUK is not currently using optional analytics, marketing, or preference
                technologies on the public website. These controls are provided as a foundation for
                future changes.
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={closeSettings}
            aria-label="Close cookie settings"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F3D6DE] bg-white text-[#2F2A2A] transition hover:border-[#EF6F91] hover:text-[#EF6F91] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF6F91] focus-visible:ring-offset-2"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {CONSENT_CATEGORIES.map((category) => (
            <section
              key={category.key}
              className="rounded-[24px] border border-[#F3E2E6] bg-white px-5 py-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-[520px]">
                  <h3 className="text-[16px] font-semibold text-[#2F2A2A]">{category.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-[#5F5A5A]">{category.description}</p>
                </div>

                {category.required ? (
                  <span className="inline-flex h-10 items-center rounded-full bg-[#FDECEF] px-4 text-sm font-semibold text-[#EF6F91]">
                    Always active
                  </span>
                ) : (
                  <label className="inline-flex items-center gap-3 text-sm font-medium text-[#2F2A2A]">
                    <span className="sr-only">{category.title}</span>
                    <input
                      type="checkbox"
                      checked={draft[category.key as OptionalConsentCategory]}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          [category.key]: event.target.checked,
                        }))
                      }
                      className="h-5 w-5 rounded border-[#E7C9D1] accent-[#EF6F91]"
                    />
                    <span>{draft[category.key as OptionalConsentCategory] ? "On" : "Off"}</span>
                  </label>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => savePreferences(draft)}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#EF6F91] px-5 text-sm font-semibold text-white transition hover:bg-[#E95E84] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF6F91] focus-visible:ring-offset-2"
          >
            Save preferences
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="inline-flex h-11 items-center justify-center rounded-full border border-[#EF6F91] bg-white px-5 text-sm font-semibold text-[#EF6F91] transition hover:bg-[#FDECEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF6F91] focus-visible:ring-offset-2"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={rejectOptional}
            className="inline-flex h-11 items-center justify-center rounded-full border border-[#F3D6DE] bg-white px-5 text-sm font-semibold text-[#2F2A2A] transition hover:border-[#EF6F91] hover:text-[#EF6F91] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF6F91] focus-visible:ring-offset-2"
          >
            Reject optional
          </button>
          <button
            type="button"
            onClick={closeSettings}
            className="inline-flex h-11 items-center justify-center rounded-full border border-transparent bg-transparent px-2 text-sm font-semibold text-[#6F6666] transition hover:text-[#2F2A2A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF6F91] focus-visible:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M6 6 18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
