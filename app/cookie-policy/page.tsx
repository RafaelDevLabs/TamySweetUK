import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import { AUDITED_TECHNOLOGIES, AUDIT_NOTES, CONSENT_VERSION } from "@/lib/consent/config";
import { createSeoMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createSeoMetadata({
  title: "Cookie Policy",
  description: "Learn how TamysweetUK uses cookies, local storage, consent preferences, and similar website technologies.",
  path: "/cookie-policy",
});

const lastUpdated = "18 July 2026";

export default function CookiePolicyPage() {
  const websiteTechnologies = AUDITED_TECHNOLOGIES.filter(
    (technology) => technology.scope !== "admin-only",
  );

  return (
    <div className="bg-[#FCF9F6] px-5 py-10 sm:px-8">
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookie-policy" },
        ])}
      />
      <article className="mx-auto max-w-[980px] rounded-[32px] border border-[#F3E2E6] bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.05)] sm:p-8 lg:p-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
          Cookie Policy
        </p>
        <h1 className="mt-3 font-serif text-[40px] leading-[1.02] text-[#2F2A2A] sm:text-[48px]">
          How TamysweetUK uses cookies and similar technologies
        </h1>
        <p className="mt-4 text-[16px] leading-8 text-[#5F5A5A]">
          This page explains what cookies and similar technologies are, what TamysweetUK currently
          uses on this website, and how you can review your choices. Last updated: {lastUpdated}.
        </p>

        <section className="mt-8 space-y-4">
          <h2 className="font-serif text-[30px] leading-tight text-[#2F2A2A]">What these technologies are</h2>
          <p className="text-[16px] leading-8 text-[#5F5A5A]">
            Cookies are small text files placed on your device by a website. Similar technologies
            can include local storage, session storage, or other browser-based methods used to
            remember settings or support core services.
          </p>
          <p className="text-[16px] leading-8 text-[#5F5A5A]">
            TamysweetUK currently uses only strictly necessary website storage for administrator
            sign-in and, if you choose to save settings, your cookie-preference record.
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="font-serif text-[30px] leading-tight text-[#2F2A2A]">Current position on consent</h2>
          <p className="text-[16px] leading-8 text-[#5F5A5A]">{AUDIT_NOTES.bannerDecision}</p>
          <p className="text-[16px] leading-8 text-[#5F5A5A]">
            Analytics, marketing, and optional preference technologies are currently prepared in
            the codebase to remain off by default. They are not active on the public website at
            this stage.
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="font-serif text-[30px] leading-tight text-[#2F2A2A]">Categories we use</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <CategoryCard
              title="Necessary"
              description="Always active for security, administrator authentication, and saving your consent choice."
            />
            <CategoryCard
              title="Preferences"
              description="Currently inactive. Reserved for optional convenience features if they are added later."
            />
            <CategoryCard
              title="Analytics"
              description="Currently inactive and off by default. No analytics service is active on the public website."
            />
            <CategoryCard
              title="Marketing"
              description="Currently inactive and off by default. No advertising or remarketing technology is active."
            />
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="font-serif text-[30px] leading-tight text-[#2F2A2A]">Technologies currently identified</h2>
          <div className="overflow-x-auto rounded-[24px] border border-[#F3E2E6]">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-[#FFF7FA] text-[#2F2A2A]">
                <tr>
                  <TableHeading>Name</TableHeading>
                  <TableHeading>Provider</TableHeading>
                  <TableHeading>Purpose</TableHeading>
                  <TableHeading>Storage</TableHeading>
                  <TableHeading>Category</TableHeading>
                  <TableHeading>Duration</TableHeading>
                  <TableHeading>Consent</TableHeading>
                </tr>
              </thead>
              <tbody>
                {websiteTechnologies.map((technology) => (
                  <tr key={technology.name} className="border-t border-[#F3E2E6] align-top">
                    <TableCell>{technology.name}</TableCell>
                    <TableCell>{technology.provider}</TableCell>
                    <TableCell>{technology.purpose}</TableCell>
                    <TableCell>{technology.storageType}</TableCell>
                    <TableCell>{technology.category}</TableCell>
                    <TableCell>{technology.duration}</TableCell>
                    <TableCell>{technology.consentRequired}</TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="font-serif text-[30px] leading-tight text-[#2F2A2A]">How your choice is saved</h2>
          <p className="text-[16px] leading-8 text-[#5F5A5A]">
            If you save cookie preferences, TamysweetUK stores only the decision itself, the
            consent version, and the time it was saved. The current consent version is{" "}
            <span className="font-semibold text-[#2F2A2A]">{CONSENT_VERSION}</span>.
          </p>
          <p className="text-[16px] leading-8 text-[#5F5A5A]">
            You can reopen <span className="font-semibold text-[#2F2A2A]">Cookie settings</span> at
            any time from the footer to review, change, or withdraw optional choices.
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="font-serif text-[30px] leading-tight text-[#2F2A2A]">Browser controls and external services</h2>
          <p className="text-[16px] leading-8 text-[#5F5A5A]">
            Most browsers also allow you to manage or delete stored website data directly.
            Clearing browser storage may remove saved preferences or sign you out of protected
            admin areas.
          </p>
          <p className="text-[16px] leading-8 text-[#5F5A5A]">
            Outbound links such as WhatsApp, Instagram, or Facebook can send you to third-party
            services after you click them. TamysweetUK does not control those services&apos; own
            cookies or privacy practices.
          </p>
        </section>

        <section className="mt-8 rounded-[24px] border border-[#F3E2E6] bg-[#FCF9F6] px-5 py-5">
          <h2 className="font-serif text-[28px] leading-tight text-[#2F2A2A]">Business details needing confirmation</h2>
          <ul className="mt-4 space-y-2 text-[15px] leading-7 text-[#5F5A5A]">
            <li>[BUSINESS LEGAL NAME REQUIRED]</li>
            <li>[BUSINESS CONTACT EMAIL REQUIRED]</li>
            <li>[BUSINESS ADDRESS OR SERVICE ADDRESS REQUIRED]</li>
          </ul>
          <p className="mt-4 text-[15px] leading-7 text-[#5F5A5A]">
            For more information, please see the{" "}
            <Link href="/privacy-policy" className="font-semibold text-[#EF6F91] underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </article>
    </div>
  );
}

function CategoryCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[24px] border border-[#F3E2E6] bg-[#FFFDFC] px-5 py-5">
      <h3 className="text-[18px] font-semibold text-[#2F2A2A]">{title}</h3>
      <p className="mt-3 text-[15px] leading-7 text-[#5F5A5A]">{description}</p>
    </div>
  );
}

function TableHeading({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em]">{children}</th>;
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 text-[14px] leading-6 text-[#5F5A5A]">{children}</td>;
}
