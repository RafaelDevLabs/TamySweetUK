import AboutHero from "@/components/about/AboutHero";
import CTAButton from "@/components/CTAButton";
import Image from "next/image";

const trustFeatures = [
  {
    title: "Raised in Home",
    description:
      "Our kittens grow up inside our family home surrounded by love and daily care.",
    icon: <HomeIcon className="h-[38px] w-[38px] sm:h-12 sm:w-12" />,
  },
  {
    title: "Health First",
    description:
      "Every kitten is vet checked, vaccinated and carefully prepared before joining their new family.",
    icon: <HealthIcon className="h-[38px] w-[38px] sm:h-12 sm:w-12" />,
  },
  {
    title: "Well Socialised",
    description:
      "Handled every day and confidently introduced to everyday household life.",
    icon: <SocialIcon className="h-[38px] w-[38px] sm:h-12 sm:w-12" />,
  },
  {
    title: "Lifetime Support",
    description: "We stay in touch after adoption and are always happy to help.",
    icon: <SupportIcon className="h-[38px] w-[38px] sm:h-12 sm:w-12" />,
  },
];

const values = [
  {
    title: "Family Raised",
    description:
      "Every kitten is raised in our family home with love, daily care, and plenty of gentle handling.",
    icon: <HomeHeartIcon className="h-8 w-8" />,
  },
  {
    title: "Health First",
    description:
      "Health and wellbeing always come first, with proper care, vet checks, and nutrition.",
    icon: <ShieldIcon className="h-8 w-8" />,
  },
  {
    title: "Lifetime Support",
    description:
      "We're here for you long after adoption with advice, guidance, and lifelong support.",
    icon: <HandHeartIcon className="h-8 w-8" />,
  },
];

const storyParagraphs = [
  "TamysweetUK began in 2020 with our very first family cat. What started as a love for one special pet quickly grew into a passion for the breed, and before long our family had grown too. As we learned more about caring for and raising cats, we became dedicated to providing them with the happiest, healthiest lives possible.",
  "Our journey into breeding began with our very first litter. Meeting families from all walks of life and helping them find their perfect kitten was an experience we will never forget. We met couples celebrating engagements, families searching for a lifelong companion, and parents choosing a surprise Christmas gift. Seeing the happiness our kittens brought into people's lives made us realise that breeding was about so much more than kittens\u2014it was about creating lifelong bonds between pets and their families.",
  "Over the past six years, TamysweetUK has continued to grow through experience, knowledge, and an unwavering commitment to the health and wellbeing of our cats. Every one of our breeding cats is treasured as part of the family, receiving exceptional care, love, and attention every single day.",
  "Today, our mission remains the same as it was from the very beginning: to raise healthy, well-socialised, affectionate kittens that are ready to become cherished members of their new families. We are proud of the reputation we have built and are honoured to have helped so many families welcome a TamysweetUK kitten into their homes.",
];

const storyStats = [
  {
    label: "5+ Years Experience",
    icon: <SparkleIcon className="h-4.5 w-4.5" />,
  },
  {
    label: "Family Raised",
    icon: <HomeHeartIcon className="h-4.5 w-4.5" />,
  },
  {
    label: "Health Checked",
    icon: <ShieldIcon className="h-4.5 w-4.5" />,
  },
  {
    label: "UK Based",
    icon: <PinIcon className="h-4.5 w-4.5" />,
  },
];

export const metadata = {
  title: "About TamysweetUK",
};

export default function AboutPage() {
  return (
    <div className="pb-16">
      <AboutHero />

      <div className="section-wrap">
        <section className="w-full">
          <div className="mx-auto w-full max-w-[1120px]">
            <div className="grid overflow-hidden rounded-[28px] border border-[#E8DDC7] bg-[#FAF7EF] px-8 py-7 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:grid-cols-2 xl:grid-cols-4">
              {trustFeatures.map((item, index) => (
                <article
                  key={item.title}
                  className="relative flex flex-col items-center justify-center px-6 py-7 text-center sm:px-8"
                >
                  <div className="text-[#7A7F5C]">{item.icon}</div>
                  <h2 className="mt-[14px] text-[15px] font-bold text-[#2F2A2A]">
                    {item.title}
                  </h2>
                  <p className="mt-2 max-w-[200px] text-[13px] leading-[1.5] text-[#5F5A5A]">
                    {item.description}
                  </p>
                  {index !== trustFeatures.length - 1 ? (
                    <span className="absolute right-0 top-1/2 hidden h-[52%] w-px -translate-y-1/2 bg-[#E8DDC7] xl:block" />
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 grid w-full max-w-[1180px] gap-8 md:grid-cols-[42%_58%] md:gap-9 lg:mb-[88px] lg:grid-cols-[minmax(0,46%)_minmax(0,54%)] lg:gap-14">
          <div className="order-2 hidden md:order-1 md:block md:self-start lg:sticky lg:top-[120px] lg:self-start">
            {/* TODO: Replace /design/home-about.png with /public/about/about-kittens.jpg when the dedicated asset is added. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#F8F3F1] shadow-[0_24px_60px_rgba(47,42,42,0.08)] sm:rounded-[28px] md:aspect-square md:max-h-[460px] lg:max-h-[540px]">
              <Image
                src="/design/home-about.png"
                alt="TamysweetUK kittens at home"
                fill
                className="object-cover"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 42vw, 46vw"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
                OUR STORY
              </p>
              <h2 className="mt-3 font-serif text-[36px] leading-[1.06] font-medium text-[#2F2A2A] sm:text-[42px] lg:text-[56px]">
                Why We Do This
              </h2>
            </div>

            <div className="mt-6 md:mt-0" />

            <div className="mt-6 md:mt-7">
              <div className="md:hidden">
                {/* TODO: Replace /design/home-about.png with /public/about/about-kittens.jpg when the dedicated asset is added. */}
                <div className="relative my-6 aspect-[4/3] overflow-hidden rounded-[22px] bg-[#F8F3F1] shadow-[0_24px_60px_rgba(47,42,42,0.08)]">
                  <Image
                    src="/design/home-about.png"
                    alt="TamysweetUK kittens at home"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>

              <div className="max-w-[620px]">
                {storyParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mb-[22px] text-[16px] leading-[1.75] text-[#5F5A5A] last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              {storyStats.map((item) => (
                <div
                  key={item.label}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[#F3D6DE] bg-white px-[18px] py-3 text-center text-[14px] font-semibold text-[#4F4A4A] shadow-[0_10px_26px_rgba(0,0,0,0.035)] sm:w-auto sm:justify-start sm:text-left"
                >
                  <span className="text-[#EF6F91] [&>svg]:h-5 [&>svg]:w-5">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mb-[72px] w-full max-w-[1180px] lg:mb-12">
          <div className="mx-auto max-w-[640px] text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
              Our Values
            </p>
            <h2 className="mt-3 font-serif text-[38px] leading-[1.06] font-medium text-[#2F2A2A] sm:text-[46px]">
              The heart behind every kitten we raise
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3 text-[#EF6F91]">
              <span className="h-px w-14 bg-[#EF6F91]" />
              <PawIcon className="h-4.5 w-4.5" />
              <span className="h-px w-14 bg-[#EF6F91]" />
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="flex flex-col gap-5 rounded-[24px] border border-[#F3D6DE] bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.04)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(239,111,145,0.12)] sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="inline-flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[22px] border border-[#F7C9D6] bg-[linear-gradient(135deg,#FDEAF0_0%,#FFF7FA_100%)] text-[#EF6F91] shadow-[0_18px_35px_rgba(239,111,145,0.16)]">
                  {value.icon}
                </div>
                <div>
                  <h3 className="font-serif text-[24px] leading-tight text-[#2F2A2A] sm:text-[26px]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-[#5F5A5A]">
                    {value.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1180px]">
          <div className="flex flex-col gap-6 rounded-[28px] border border-[#F3D6DE] bg-[linear-gradient(90deg,#FFF7FA_0%,#FFFFFF_100%)] px-6 py-7 shadow-[0_22px_56px_rgba(0,0,0,0.05)] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center lg:w-auto">
              <div className="shrink-0 text-[#EF6F91]">
                <OutlineHeartIcon className="h-12 w-12" />
              </div>
              <div className="w-full max-w-none lg:max-w-[540px]">
                <p className="w-full max-w-none text-[18px] leading-[1.5] font-medium text-[#2F2A2A] sm:text-[20px]">
                  Every kitten deserves a loving home. Thank you for considering adoption.
                </p>
                <p className="mt-3 w-full max-w-none text-[14px] leading-[1.65] text-[#5F5A5A] sm:text-[14px]">
                  If you have any questions, feel free to get in touch - I&apos;d love to hear
                  from you!
                </p>
              </div>
            </div>

            <div className="shrink-0 max-lg:w-full">
              <CTAButton
                href="/contact"
                className="w-full justify-center px-7 py-3.5 max-lg:min-h-[54px] lg:min-w-[170px] lg:w-auto"
              >
                <span>Get in Touch</span>
                <PawIcon className="ml-2 h-4 w-4 text-white" />
              </CTAButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
      <path
        d="M8 21.5 24 9l16 12.5v16A2.5 2.5 0 0 1 37.5 40h-27A2.5 2.5 0 0 1 8 37.5v-16Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 40V27.5h12V40"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 23.5c1.2-2.1 5-2.3 5.8.7.6 2.4-1.4 4.2-5.8 6.8-4.4-2.6-6.4-4.4-5.8-6.8.8-3 4.6-2.8 5.8-.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HealthIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
      <path
        d="M24 39s-12-7.5-12-16.7A7.2 7.2 0 0 1 19.2 15c2 0 3.9.8 4.8 2.6.9-1.8 2.8-2.6 4.8-2.6a7.2 7.2 0 0 1 7.2 7.3C36 31.5 24 39 24 39Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 25h5l2.2-4.2L27 29l2.2-4H33"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
      <path
        d="M15.5 20 12.5 12.5l6.2 4 5.3-2.7 5.3 2.7 6.2-4-3 7.5v8.5c0 5.1-4.1 9.2-9.2 9.2h-.6c-5.1 0-9.2-4.1-9.2-9.2V20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 24.8h.01M28.5 24.8h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M21 30c1.8 1.7 4.2 1.7 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M30.8 14.6c.7-1.1 2.5-1.2 3 .3.4 1.2-.8 2.3-3 3.6-2.3-1.3-3.4-2.4-3-3.6.5-1.5 2.3-1.4 3-.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.4 10.6c.5-.8 1.8-.9 2.2.2.3 1-.5 1.7-2.2 2.8-1.7-1.1-2.5-1.8-2.2-2.8.4-1.1 1.7-1 2.2-.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupportIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 16.5A2.5 2.5 0 0 1 14.5 14h19A2.5 2.5 0 0 1 36 16.5v18A2.5 2.5 0 0 1 33.5 37h-19A2.5 2.5 0 0 1 12 34.5v-18Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 11v6M32 11v6M12 21h24"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31.5" cy="30.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M31.5 27.5v3.3l2.2 1.5M19 29l2.5 2.5 5-5"
        stroke="currentColor"
        strokeWidth="1.6"
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

function HomeHeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M4.5 10.2 12 4.5l7.5 5.7v8a1.8 1.8 0 0 1-1.8 1.8H6.3a1.8 1.8 0 0 1-1.8-1.8v-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 14.1c.7-1.1 2.6-1.2 3.1.4.4 1.3-.8 2.4-3.1 3.8-2.4-1.4-3.5-2.5-3.1-3.8.5-1.6 2.4-1.5 3.1-.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.2 2.2M15.8 15.8 18 18M18 6l-2.2 2.2M8.2 15.8 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.8" />
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

function HandHeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M7.5 12.5 10 10a2.1 2.1 0 0 1 3 0l1 1a2.1 2.1 0 0 1 0 3l-1.4 1.4a4.8 4.8 0 0 1-3.4 1.4H7.5a2.5 2.5 0 0 1-2.5-2.5V14a1.5 1.5 0 0 1 1.5-1.5h1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 7.8c.8-1.3 2.9-1.4 3.5.4.5 1.5-.9 2.7-3.5 4.2-2.7-1.5-4-2.7-3.5-4.2.6-1.8 2.7-1.7 3.5-.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1 14.9 16 13a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8l-1.8 1.8a4.1 4.1 0 0 1-2.9 1.2H11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OutlineHeartIcon({ className }: { className?: string }) {
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
