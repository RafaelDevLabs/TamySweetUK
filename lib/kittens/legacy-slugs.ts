const legacyKittenSlugRedirects = {
  "bella-british-shorthair": "luna-british-shorthair",
} as const;

export function getCanonicalKittenSlug(slug: string) {
  return legacyKittenSlugRedirects[slug as keyof typeof legacyKittenSlugRedirects] ?? slug;
}

export function getLegacyKittenSlugRedirect(slug: string) {
  return legacyKittenSlugRedirects[slug as keyof typeof legacyKittenSlugRedirects] ?? null;
}

export function getLegacyKittenSlugsForCanonicalSlug(canonicalSlug: string) {
  return Object.entries(legacyKittenSlugRedirects)
    .filter(([, currentSlug]) => currentSlug === canonicalSlug)
    .map(([legacySlug]) => legacySlug);
}
