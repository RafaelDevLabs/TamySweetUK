import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  DEFAULT_CONSENT_DRAFT,
  OPTIONAL_CONSENT_CATEGORIES,
  OPTIONAL_STORAGE_KEYS,
} from "@/lib/consent/config";
import type { ConsentDraft, ConsentState, OptionalConsentCategory } from "@/lib/consent/types";

function supportsLocalStorage() {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) {
      return false;
    }

    const testKey = "__tamysweetuk-consent-test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function isConsentState(value: unknown): value is ConsentState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    candidate.necessary === true &&
    OPTIONAL_CONSENT_CATEGORIES.every((category) => typeof candidate[category] === "boolean") &&
    candidate.version === CONSENT_VERSION &&
    typeof candidate.savedAt === "string"
  );
}

export function createConsentState(draft: ConsentDraft): ConsentState {
  return {
    necessary: true,
    ...draft,
    version: CONSENT_VERSION,
    savedAt: new Date().toISOString(),
  };
}

export function readStoredConsent(): ConsentState | null {
  if (!supportsLocalStorage()) {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    return isConsentState(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

export function saveStoredConsent(consent: ConsentState) {
  if (!supportsLocalStorage()) {
    return;
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
}

export function clearOptionalStorage(category: OptionalConsentCategory) {
  if (!supportsLocalStorage()) {
    return;
  }

  for (const storageKey of OPTIONAL_STORAGE_KEYS[category]) {
    window.localStorage.removeItem(storageKey);
  }
}

export function clearDeclinedOptionalStorage(draft: ConsentDraft) {
  for (const category of OPTIONAL_CONSENT_CATEGORIES) {
    if (!draft[category]) {
      clearOptionalStorage(category);
    }
  }
}

export function getDefaultConsentDraft() {
  return { ...DEFAULT_CONSENT_DRAFT };
}
