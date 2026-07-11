export type SiteSettings = {
  id: string | null;
  business_name: string;
  tagline: string;
  whatsapp_number: string;
  email: string;
  location: string;
  opening_hours: string;
  instagram_url: string | null;
  facebook_url: string | null;
  hero_title: string;
  hero_description: string;
  kittens_page_title: string;
  kittens_page_description: string;
  updated_at: string | null;
};

export type SiteSettingsInput = Omit<SiteSettings, "id" | "updated_at">;

export const defaultSiteSettings: SiteSettings = {
  id: null,
  business_name: "TamysweetUK",
  tagline: "Healthy kittens, happy homes",
  whatsapp_number: "+447700900000",
  email: "hello@tamysweetuk.co.uk",
  location: "Manchester, United Kingdom",
  opening_hours: "Mon - Sun, 9:00 AM - 8:00 PM",
  instagram_url: "https://instagram.com",
  facebook_url: "https://facebook.com",
  hero_title: "Adorable Kittens Looking for Loving Homes",
  hero_description: "Healthy, happy and raised with love.",
  kittens_page_title: "Our Kittens",
  kittens_page_description:
    "All of our kittens are raised in a loving home environment, health checked, vaccinated and well socialised.",
  updated_at: null,
};
