import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import { createSeoMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createSeoMetadata({
  title: "Privacy Policy",
  description: "Read the current TamysweetUK privacy policy draft and the latest privacy information published on the website.",
  path: "/privacy-policy",
});

const lastUpdated = "18 July 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FCF9F6] px-5 py-10 sm:px-8">
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <article className="mx-auto max-w-[980px] rounded-[32px] border border-[#F3E2E6] bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.05)] sm:p-8 lg:p-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
          Privacy Policy
        </p>
        <h1 className="mt-3 font-serif text-[40px] leading-[1.02] text-[#2F2A2A] sm:text-[48px]">
          TamysweetUK privacy policy draft
        </h1>
        <p className="mt-4 text-[16px] leading-8 text-[#5F5A5A]">
          This draft reflects the current audited website behaviour as at {lastUpdated}. It should
          be reviewed and completed with the business owner before being treated as final.
        </p>

        <PolicySection title="1. Identity and contact details">
          <p>[BUSINESS LEGAL NAME REQUIRED]</p>
          <p>[BUSINESS CONTACT EMAIL REQUIRED]</p>
          <p>[BUSINESS ADDRESS OR SERVICE ADDRESS REQUIRED]</p>
        </PolicySection>

        <PolicySection title="2. Data collected">
          <p>
            The public website currently collects personal data only when a visitor chooses to
            include it in a WhatsApp enquiry message generated from the contact form or by using
            direct contact methods such as email or WhatsApp links.
          </p>
          <p>
            The website also processes limited technical data needed for page delivery, image
            hosting through Supabase public storage URLs, and administrator authentication.
          </p>
        </PolicySection>

        <PolicySection title="3. Contact enquiries">
          <p>
            The contact form collects: full name, email address, optional phone number, kitten or
            breed interest, subject, and message content.
          </p>
          <p>
            In the current implementation, that form does not submit to the website server or a
            database. Instead, it prepares a message and opens WhatsApp on the user&apos;s device.
          </p>
          <p>[OWNER CONFIRMATION REQUIRED: enquiry retention period]</p>
        </PolicySection>

        <PolicySection title="4. Kitten enquiries and reservations">
          <p>
            The current public codebase does not include an online reservation workflow, checkout,
            or payment submission form.
          </p>
          <p>[OWNER CONFIRMATION REQUIRED: reservation data collected]</p>
          <p>[OWNER CONFIRMATION REQUIRED: payment provider]</p>
        </PolicySection>

        <PolicySection title="5. WhatsApp communication">
          <p>
            If you use the contact form or WhatsApp buttons, you are redirected to WhatsApp using
            an outbound link. Any information you then send is processed by WhatsApp under its own
            terms and privacy practices.
          </p>
          <p>
            TamysweetUK does not control WhatsApp&apos;s own tracking or retention practices. Please
            review WhatsApp&apos;s privacy information before sending sensitive information.
          </p>
        </PolicySection>

        <PolicySection title="6. Customer records">
          <p>
            The current codebase does not show a dedicated customer-records system on the public
            site beyond administrator-managed kitten and site settings content in Supabase.
          </p>
          <p>[OWNER CONFIRMATION REQUIRED: customer records retained outside the website]</p>
        </PolicySection>

        <PolicySection title="7. Website technical data">
          <p>
            The audited public website does not currently run analytics, advertising pixels, chat
            widgets, social-media embeds, or optional tracking scripts.
          </p>
          <p>
            Public pages use Next.js and Supabase-hosted images. If a visitor saves cookie
            preferences, the site stores only the consent decision itself in first-party browser
            storage.
          </p>
        </PolicySection>

        <PolicySection title="8. Admin authentication">
          <p>
            The protected admin area uses Supabase authentication with first-party HTTP-only cookies
            named <span className="font-semibold text-[#2F2A2A]">tamysweetuk-admin-access-token</span>{" "}
            and <span className="font-semibold text-[#2F2A2A]">tamysweetuk-admin-refresh-token</span>.
          </p>
          <p>
            These cookies are used only for secure administrator sign-in and are not part of public
            analytics or marketing preferences.
          </p>
        </PolicySection>

        <PolicySection title="9. Purposes of processing">
          <ul className="list-disc pl-5">
            <li>To respond to enquiries initiated by the visitor.</li>
            <li>To present kitten listings and site content.</li>
            <li>To operate and secure the administrator area.</li>
            <li>To record a visitor&apos;s cookie-preference choice if they save one.</li>
          </ul>
        </PolicySection>

        <PolicySection title="10. Lawful bases">
          <p>
            Likely lawful bases include steps taken at the request of the individual, legitimate
            interests in running and securing the website, and consent where optional technologies
            are introduced.
          </p>
          <p>[OWNER CONFIRMATION REQUIRED: lawful bases by business process]</p>
        </PolicySection>

        <PolicySection title="11. Data sharing">
          <p>
            Based on the current codebase, website infrastructure involves Next.js hosting and
            Supabase services. WhatsApp may also process data when a user chooses to open a
            WhatsApp link.
          </p>
          <p>[OWNER CONFIRMATION REQUIRED: any additional service providers or manual data sharing]</p>
        </PolicySection>

        <PolicySection title="12. International transfers">
          <p>
            Some website providers may process data outside the UK, depending on the services used
            and their infrastructure arrangements.
          </p>
          <p>[OWNER CONFIRMATION REQUIRED: international data transfers]</p>
        </PolicySection>

        <PolicySection title="13. Retention periods">
          <p>
            The current codebase does not define business retention periods for enquiries,
            reservations, or customer communications.
          </p>
          <p>[OWNER CONFIRMATION REQUIRED: enquiry retention period]</p>
          <p>[OWNER CONFIRMATION REQUIRED: customer record retention period]</p>
        </PolicySection>

        <PolicySection title="14. Security">
          <p>
            The audited site uses server-side cookies for admin authentication, does not expose
            token values in the public UI, and keeps optional tracking technologies disabled by
            default.
          </p>
        </PolicySection>

        <PolicySection title="15. Individual rights">
          <p>
            Depending on the circumstances, individuals may have rights to access, correct, erase,
            restrict, object to, or request portability of personal data, and to withdraw consent
            where processing relies on consent.
          </p>
        </PolicySection>

        <PolicySection title="16. Complaints">
          <p>
            Individuals may raise concerns with TamysweetUK first and may also have the right to
            complain to the UK Information Commissioner&apos;s Office if they believe their data has
            been handled unlawfully.
          </p>
        </PolicySection>

        <PolicySection title="17. Children">
          <p>
            The website markets family-raised kittens but does not appear to offer services
            specifically to children. Parents or guardians should contact TamysweetUK on behalf of
            minors where appropriate.
          </p>
        </PolicySection>

        <PolicySection title="18. Policy updates">
          <p>
            This page should be updated whenever the business process changes materially, optional
            tracking technologies are introduced, or retention/contact details are confirmed.
          </p>
          <p>
            Please also review the{" "}
            <Link href="/cookie-policy" className="font-semibold text-[#EF6F91] underline-offset-4 hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
        </PolicySection>
      </article>
    </div>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 space-y-3">
      <h2 className="font-serif text-[30px] leading-tight text-[#2F2A2A]">{title}</h2>
      <div className="space-y-3 text-[16px] leading-8 text-[#5F5A5A]">{children}</div>
    </section>
  );
}
