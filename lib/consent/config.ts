import type {
  AuditedTechnology,
  ConsentCategoryDefinition,
  ConsentDraft,
  OptionalConsentCategory,
} from "@/lib/consent/types";

export const CONSENT_VERSION = "1.1";
export const CONSENT_STORAGE_KEY = "tamysweetuk-consent";

export const CONSENT_CATEGORIES: ConsentCategoryDefinition[] = [
  {
    key: "necessary",
    title: "Necessary",
    description: "Required for security, admin authentication, and saving your consent choice.",
    required: true,
  },
  {
    key: "preferences",
    title: "Preferences",
    description: "Used for optional convenience features such as remembering display choices.",
    required: false,
  },
  {
    key: "analytics",
    title: "Analytics",
    description: "Used to understand website usage and improve performance.",
    required: false,
  },
  {
    key: "marketing",
    title: "Marketing",
    description: "Used for advertising, remarketing, or third-party campaign measurement.",
    required: false,
  },
];

export const DEFAULT_CONSENT_DRAFT: ConsentDraft = {
  preferences: false,
  analytics: false,
  marketing: false,
};

export const OPTIONAL_CONSENT_CATEGORIES: OptionalConsentCategory[] = [
  "preferences",
  "analytics",
  "marketing",
];

export const OPTIONAL_CONSENT_FEATURES_ACTIVE = true;

export const OPTIONAL_STORAGE_KEYS: Record<OptionalConsentCategory, string[]> = {
  preferences: [],
  analytics: [],
  marketing: [],
};

export const AUDITED_TECHNOLOGIES: AuditedTechnology[] = [
  {
    name: "tamysweetuk-admin-access-token",
    provider: "TamysweetUK / Supabase",
    purpose: "Keeps an authenticated administrator signed in across protected admin routes.",
    storageType: "First-party HTTP-only cookie",
    category: "necessary",
    duration: "Matches the Supabase session expiry returned at login; requires production verification.",
    scope: "admin-only",
    consentRequired: "no",
    affectedFile: "lib/supabase/server.ts",
    recommendedAction: "Keep as necessary admin authentication storage; do not expose through public consent preferences.",
  },
  {
    name: "tamysweetuk-admin-refresh-token",
    provider: "TamysweetUK / Supabase",
    purpose: "Supports administrator session continuity and re-authentication.",
    storageType: "First-party HTTP-only cookie",
    category: "necessary",
    duration: "30 days from issuance in the current implementation.",
    scope: "admin-only",
    consentRequired: "no",
    affectedFile: "lib/supabase/server.ts",
    recommendedAction: "Keep as necessary admin authentication storage; verify the configured lifecycle in production.",
  },
  {
    name: CONSENT_STORAGE_KEY,
    provider: "TamysweetUK",
    purpose: "Stores the visitor's consent choices and consent-version timestamp.",
    storageType: "First-party localStorage entry",
    category: "necessary",
    duration: "Until changed by the visitor or invalidated by a consent-version update.",
    scope: "public-and-admin",
    consentRequired: "no",
    affectedFile: "lib/consent/storage.ts",
    recommendedAction: "Keep minimal and store only the consent decision.",
  },
  {
    name: "@vercel/analytics",
    provider: "Vercel",
    purpose: "Measures page views and basic website usage to help improve the public website.",
    storageType: "Analytics script request; no first-party cookie is set by this project.",
    category: "analytics",
    duration: "Session-level event processing by Vercel; no local browser storage key is configured.",
    scope: "public",
    consentRequired: "yes",
    affectedFile: "components/consent/ConsentScripts.tsx",
    recommendedAction: "Load only after the visitor enables analytics consent.",
  },
];

export const AUDIT_NOTES = {
  bannerDecision:
    "A public consent banner is shown because optional Vercel Web Analytics can load after the visitor enables analytics consent.",
  productionStatement:
    "Implemented according to the current audited website behaviour and documented UK guidance; final business-policy details require owner confirmation.",
};
