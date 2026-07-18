const breedSlug = "british-shorthair";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildDefaultKittenSlug(name: string) {
  const nameSlug = slugify(name);

  if (!nameSlug) {
    return "";
  }

  if (nameSlug.endsWith(`-${breedSlug}`) || nameSlug === breedSlug) {
    return nameSlug;
  }

  return `${nameSlug}-${breedSlug}`;
}
