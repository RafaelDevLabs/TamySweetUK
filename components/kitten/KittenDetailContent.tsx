import CTAButton from "@/components/CTAButton";
import { buildWhatsAppUrl } from "@/components/WhatsAppButton";
import type { KittenAvailability } from "@/lib/types/kitten";

type DetailItem = {
  label: string;
  value: string;
};

type KittenDetailContentProps = {
  availability: "Available" | "Reserved" | "Sold";
  rawAvailability: KittenAvailability;
  name: string;
  breed: string;
  gender: string;
  whatsappNumber: string;
  shortDescription: string;
  description: string | null;
  price: number;
  details: DetailItem[];
  included: string[];
};

const detailIconMap: Record<string, React.ReactNode> = {
  Breed: <HeartIcon className="h-4.5 w-4.5" />,
  Gender: <UserIcon className="h-4.5 w-4.5" />,
  Colour: <SparkleIcon className="h-4.5 w-4.5" />,
  Age: <ClockIcon className="h-4.5 w-4.5" />,
  Health: <ShieldIcon className="h-4.5 w-4.5" />,
  Temperament: <SmileIcon className="h-4.5 w-4.5" />,
};

export default function KittenDetailContent({
  availability,
  rawAvailability,
  name,
  breed,
  gender,
  whatsappNumber,
  shortDescription,
  description,
  price,
  details,
  included,
}: KittenDetailContentProps) {
  const whatsappMessage = `Hello, I'm interested in ${name}, the ${breed} kitten listed on TamysweetUK.`;
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage, whatsappNumber);
  const readinessCopy =
    rawAvailability === "sold"
      ? "This kitten has already found a loving home"
      : "Ready to go to their new home";

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-3">
          <p className="font-serif text-[42px] leading-[0.96] tracking-[-0.02em] text-[var(--foreground)] sm:text-[56px]">
            {name}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-[var(--pink-deep)] sm:text-base">
            <span className="inline-flex items-center gap-2">
              <HeartIcon className="h-4 w-4" />
              {breed}
            </span>
            <span className="inline-flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              {gender}
            </span>
            <span className="inline-flex items-center gap-2">
              <DotIcon className="h-3.5 w-3.5" />
              {availability}
            </span>
          </div>
        </div>

        <p className="max-w-[760px] text-base leading-[1.75] text-[#4F4A4A] sm:text-[18px]">
          {shortDescription}
        </p>
      </div>

      <section className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3">
        {details.map((detail) => (
          <div key={detail.label} className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--pink-soft)] text-[var(--pink-deep)]">
              {detailIconMap[detail.label] ?? <SparkleIcon className="h-4.5 w-4.5" />}
            </span>
            <div className="space-y-1">
              <p className="text-[15px] font-semibold text-[var(--foreground)]">{detail.label}</p>
              <p className="text-[15px] leading-6 text-[var(--muted)]">{detail.value}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-[34px] rounded-[24px] border border-[#F3E2E6] bg-white p-7">
        <div className="grid gap-5 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div className="rounded-[20px] bg-[var(--pink-soft)] px-5 py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Price
            </p>
            <p className="mt-2 text-4xl font-semibold leading-none text-[var(--pink-deep)] sm:text-[42px]">
              £{price}
            </p>
            <p className="mt-3 text-sm leading-6 text-[#5F5A5A] sm:text-[15px]">{readinessCopy}</p>
          </div>

          <div className="grid gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#EF6F91] px-6 text-sm font-semibold !text-white shadow-[0_14px_35px_rgba(239,127,151,0.24)] transition duration-250 hover:-translate-y-0.5 hover:bg-[var(--pink-deep)] hover:!text-white visited:!text-white"
            >
              <WhatsAppIcon className="h-4.5 w-4.5" />
              Enquire via WhatsApp
            </a>
            <CTAButton
              href="/kittens"
              variant="secondary"
              className="h-14 w-full px-6 py-0 !text-[var(--pink-deep)] hover:!text-[var(--pink-deep)] visited:!text-[var(--pink-deep)]"
            >
              Back to Kittens
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#F3E2E6] bg-[#FCF9F6] px-5 py-6 sm:px-6">
        <p className="font-serif text-[28px] leading-tight text-[var(--foreground)] sm:text-[32px]">
          Our Kittens Come With
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {included.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 text-[15px] leading-7 text-[var(--foreground)] sm:text-base"
            >
              <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(239,111,145,0.12)] text-[var(--pink-deep)]">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[820px] space-y-4">
        <p className="font-serif text-[36px] leading-tight text-[#2F2A2A] sm:text-[48px]">
          Meet {name}
        </p>
        <div className="space-y-4 text-base leading-8 text-[var(--muted)]">
          <p>{description ?? shortDescription}</p>
          {description ? <p>{shortDescription}</p> : null}
        </div>
      </section>
    </div>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        d="M12 20.4s-6.9-4.4-9.2-8.1C.8 9.1 2 5.4 5.5 4.5c2-.5 4 .2 5.2 1.8 1.2-1.6 3.2-2.3 5.2-1.8 3.5.9 4.7 4.6 2.7 7.8-2.3 3.7-9.2 8.1-9.2 8.1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 20a7 7 0 0 1 14 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 3v4" strokeLinecap="round" />
      <path d="M12 17v4" strokeLinecap="round" />
      <path d="M3 12h4" strokeLinecap="round" />
      <path d="M17 12h4" strokeLinecap="round" />
      <path d="m6 6 2.2 2.2" strokeLinecap="round" />
      <path d="m15.8 15.8 2.2 2.2" strokeLinecap="round" />
      <path d="m18 6-2.2 2.2" strokeLinecap="round" />
      <path d="m8.2 15.8-2.2 2.2" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.8v4.8l3.2 1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        d="M12 3.8 6 6v5.2c0 4 2.3 7 6 9 3.7-2 6-5 6-9V6l-6-2.2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m9.4 12 1.7 1.8 3.6-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SmileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.2 14.1c.7 1 1.8 1.5 2.8 1.5s2.1-.5 2.8-1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 10.2h.01" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 10.2h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className={className}>
      <path d="m5.5 12.5 4.2 4.2 8.8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
      <path
        d="M20 11.8A8 8 0 0 1 8.4 19l-4 .9.9-3.8A8 8 0 1 1 20 11.8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.8c.2-.4.4-.4.7-.4h.6c.2 0 .4 0 .5.4l.5 1.4c.1.3 0 .4-.2.6l-.4.5c-.1.1-.2.3 0 .6.3.7.8 1.3 1.4 1.8.3.2.5.1.7 0l.5-.4c.2-.1.4-.2.6-.1l1.3.6c.4.2.4.3.4.5v.6c0 .3 0 .5-.4.7-.4.2-1 .4-1.6.3-.8-.1-1.8-.5-3-1.5-1-.8-1.8-1.8-2.2-2.6-.4-.9-.5-1.6-.4-2.1.1-.6.3-1.2.5-1.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
