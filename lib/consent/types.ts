export type ConsentCategory = "necessary" | "preferences" | "analytics" | "marketing";

export type OptionalConsentCategory = Exclude<ConsentCategory, "necessary">;

export type ConsentState = {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  version: string;
  savedAt: string;
};

export type ConsentDraft = Pick<ConsentState, "preferences" | "analytics" | "marketing">;

export type ConsentCategoryDefinition = {
  key: ConsentCategory;
  title: string;
  description: string;
  required: boolean;
};

export type AuditedTechnology = {
  name: string;
  provider: string;
  purpose: string;
  storageType: string;
  category: ConsentCategory;
  duration: string;
  scope: "public" | "admin-only" | "public-and-admin";
  consentRequired: "yes" | "no" | "requires-production-verification";
  affectedFile: string;
  recommendedAction: string;
};
