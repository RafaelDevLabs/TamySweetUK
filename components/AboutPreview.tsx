import Image from "next/image";

import CTAButton from "@/components/CTAButton";

const highlights = [
  {
    label: "TICA Registered",
    icon: <AwardIcon className="h-4 w-4 text-[#EF6F91]" />,
  },
  {
    label: "Family Home Raised",
    icon: <HomeIcon className="h-4 w-4 text-[#EF6F91]" />,
  },
  {
    label: "Health Checked",
    icon: <ShieldIcon className="h-4 w-4 text-[#EF6F91]" />,
  },
  {
    label: "Lifetime Support",
    icon: <HeartIcon className="h-4 w-4 text-[#EF6F91]" />,
  },
];

export default function AboutPreview() {
  return (
    <section className="bg-[#FCF9F6] pb-10 pt-[72px]">
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-5 min-[553px]:gap-12 min-[553px]:px-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-center lg:gap-9 lg:px-16">
        <div className="relative h-[280px] overflow-hidden rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] min-[553px]:h-[320px] lg:h-[430px]">
          <Image
            src="/design/home-about.png"
            alt="TamysweetUK kittens"
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 52vw, 100vw"
          />
        </div>

        <div className="text-center lg:text-left">
          <p className="mb-3 text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91] lg:text-left">
            About Us
          </p>
          <h2 className="text-center font-serif text-[38px] leading-[1.05] font-medium text-[#2F2A2A] min-[553px]:text-[44px] lg:text-left lg:text-[48px]">
            Healthy Kittens,
            <br />
            Happy Homes.
          </h2>
          <div className="mx-auto mt-5 max-w-[520px] space-y-[18px] text-[16.5px] leading-[1.8] text-[#5F5A5A] min-[553px]:max-w-[600px] lg:mx-0 lg:max-w-[520px]">
            <p>
              TamysweetUK began in 2020 with one much-loved family cat. What started as a love for
              a special companion soon grew into a passion for raising healthy, affectionate
              British Shorthair kittens in a warm family home.
            </p>
            <p>
              Every kitten is raised with love, daily socialisation, and the very best care before
              joining a family of their own. We&apos;re proud to have helped so many families welcome
              a lifelong companion into their home.
            </p>
          </div>

          <div className="mt-[26px] flex flex-wrap justify-center gap-3 lg:justify-start">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full border border-[#F3E2E6] bg-white px-[14px] py-2 text-[14px] font-medium text-[#EF6F91]"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-[22px] flex justify-center lg:justify-start">
            <CTAButton href="/about">
              <span>Learn More About Us</span>
              <PawIcon className="ml-2 h-4 w-4 text-white" />
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function AwardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M10 13.5 8 21l4-2 4 2-2-7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M4 11.5 12 5l8 6.5v7A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 20v-5h5v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 3l7 3v5c0 4.7-2.8 8-7 10-4.2-2-7-5.3-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m8.8 12.2 2.1 2.1 4.3-4.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 20s-7-4.4-7-9.8A4.2 4.2 0 0 1 9.2 6c1.2 0 2.3.5 2.8 1.5C12.5 6.5 13.6 6 14.8 6A4.2 4.2 0 0 1 19 10.2C19 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8.1 10.7c-1.2 0-2.2-1.2-2.2-2.7S6.9 5.3 8.1 5.3s2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM15.9 10.7c-1.2 0-2.2-1.2-2.2-2.7s1-2.7 2.2-2.7 2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM5 15.3c-1 0-1.8-1-1.8-2.3S4 10.7 5 10.7s1.8 1 1.8 2.3S6 15.3 5 15.3Zm14 0c-1 0-1.8-1-1.8-2.3s.8-2.3 1.8-2.3 1.8 1 1.8 2.3-.8 2.3-1.8 2.3Zm-7 4.4c-2.6 0-4.6-1.1-4.6-3 0-1.4 1.2-2.6 2.4-3.2.6-.3 1.3-.2 1.9.1.2.1.4.2.6.2s.4-.1.6-.2c.6-.3 1.3-.4 1.9-.1 1.2.6 2.4 1.8 2.4 3.2 0 1.9-2 3-4.6 3Z" />
    </svg>
  );
}
