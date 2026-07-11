import { saveSiteSettingsAction } from "@/app/admin/(protected)/settings/actions";
import { getSiteSettings } from "@/lib/supabase/queries/settings";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const fallbackSearchParams: Record<string, string | string[] | undefined> = {};
  const [settings, resolvedSearchParams] = await Promise.all([
    getSiteSettings(),
    searchParams ?? Promise.resolve(fallbackSearchParams),
  ]);

  const saved = resolvedSearchParams.saved === "1";
  const errorParam = resolvedSearchParams.error;
  const error = Array.isArray(errorParam) ? errorParam[0] : errorParam;

  return (
    <section className="space-y-8">
      <div className="rounded-[30px] border border-[#F3E2E6] bg-[linear-gradient(135deg,#fffdfc_0%,#fff6f8_100%)] p-6 shadow-[0_22px_56px_rgba(0,0,0,0.05)] sm:p-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EF6F91]">
          Settings
        </p>
        <h2 className="mt-3 font-serif text-[38px] leading-[1.02] text-[#2F2A2A] sm:text-[46px]">
          Site Settings
        </h2>
        <p className="mt-3 max-w-[720px] text-[15px] leading-7 text-[#6F6666] sm:text-[16px]">
          Update contact details, social links and basic website content.
        </p>
      </div>

      {saved ? (
        <div className="rounded-[24px] border border-[#D9EEDB] bg-[#F5FFF6] px-5 py-4 text-sm text-[#42664A]">
          Settings saved successfully.
        </div>
      ) : null}

      {error ? (
        <div className="rounded-[24px] border border-[#F5CDD8] bg-[#FFF4F7] px-5 py-4 text-sm text-[#B24F6D]">
          {decodeURIComponent(error)}
        </div>
      ) : null}

      <form action={saveSiteSettingsAction} className="space-y-6">
        <SettingsCard
          title="Business"
          description="Core branding and business information shown across the website."
        >
          <Field label="Business Name" name="business_name" defaultValue={settings.business_name} required />
          <Field label="Tagline" name="tagline" defaultValue={settings.tagline} required />
          <Field label="Location" name="location" defaultValue={settings.location} />
          <Field label="Opening Hours" name="opening_hours" defaultValue={settings.opening_hours} />
        </SettingsCard>

        <SettingsCard
          title="Contact"
          description="WhatsApp, email and social links used on public pages."
        >
          <Field
            label="WhatsApp Number"
            name="whatsapp_number"
            defaultValue={settings.whatsapp_number}
            required
          />
          <Field label="Email" name="email" type="email" defaultValue={settings.email} required />
          <Field
            label="Instagram URL"
            name="instagram_url"
            type="url"
            defaultValue={settings.instagram_url ?? ""}
          />
          <Field
            label="Facebook URL"
            name="facebook_url"
            type="url"
            defaultValue={settings.facebook_url ?? ""}
          />
        </SettingsCard>

        <SettingsCard
          title="Homepage Hero"
          description="Main homepage headline and supporting copy."
        >
          <TextAreaField
            label="Hero Title"
            name="hero_title"
            rows={3}
            defaultValue={settings.hero_title}
            required
          />
          <TextAreaField
            label="Hero Description"
            name="hero_description"
            rows={3}
            defaultValue={settings.hero_description}
            required
          />
        </SettingsCard>

        <SettingsCard
          title="Kittens Page"
          description="Hero content used on the public kittens listing page."
        >
          <Field
            label="Kittens Page Title"
            name="kittens_page_title"
            defaultValue={settings.kittens_page_title}
            required
          />
          <TextAreaField
            label="Kittens Page Description"
            name="kittens_page_description"
            rows={3}
            defaultValue={settings.kittens_page_description}
            required
          />
        </SettingsCard>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#EF6F91] px-6 text-sm font-semibold !text-white shadow-[0_12px_24px_rgba(239,111,145,0.2)] transition hover:bg-[#E95E84] hover:!text-white"
          >
            Save Settings
          </button>
        </div>
      </form>
    </section>
  );
}

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[30px] border border-[#F3E2E6] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sm:p-8">
      <div className="mb-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EF6F91]">
          {title}
        </p>
        <p className="mt-3 max-w-[720px] text-[15px] leading-7 text-[#6F6666] sm:text-[16px]">
          {description}
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required = false,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue: string;
  required?: boolean;
  type?: string;
}) {
  const autoComplete = getFieldAutoComplete(name);

  return (
    <label htmlFor={name} className="space-y-2">
      <span className="text-sm font-medium text-[#2F2A2A]">{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        required={required}
        className="h-12 w-full rounded-2xl border border-[#F3E2E6] bg-[#FFFDFC] px-4 text-[#2F2A2A] outline-none transition placeholder:text-[#A59696] focus:border-[#EF6F91]"
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  rows,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue: string;
  rows: number;
  required?: boolean;
}) {
  return (
    <label htmlFor={name} className="space-y-2 md:col-span-2">
      <span className="text-sm font-medium text-[#2F2A2A]">{label}</span>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        autoComplete="off"
        required={required}
        className="w-full rounded-2xl border border-[#F3E2E6] bg-[#FFFDFC] px-4 py-3 text-[#2F2A2A] outline-none transition placeholder:text-[#A59696] focus:border-[#EF6F91]"
      />
    </label>
  );
}

function getFieldAutoComplete(name: string) {
  switch (name) {
    case "business_name":
      return "organization";
    case "tagline":
    case "opening_hours":
    case "hero_title":
    case "hero_description":
    case "kittens_page_title":
    case "kittens_page_description":
      return "off";
    case "location":
      return "address-level2";
    case "whatsapp_number":
      return "tel";
    case "email":
      return "email";
    case "instagram_url":
    case "facebook_url":
      return "url";
    default:
      return "off";
  }
}
