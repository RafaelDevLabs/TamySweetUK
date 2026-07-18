import type { Metadata } from "next";
import Image from "next/image";

import CTAButton from "@/components/CTAButton";
import PageHero from "@/components/PageHero";
import StructuredData from "@/components/seo/StructuredData";
import { createSeoMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

const stats = [
  {
    value: "5+ Years",
    label: "Breeding with love and dedication",
    icon: "heart" as const,
  },
  {
    value: "200+",
    label: "Happy families and counting",
    icon: "home" as const,
  },
  {
    value: "5.0",
    label: "Average rating from our customers",
    icon: "star" as const,
  },
  {
    value: "100%",
    label: "Would recommend us to their friends",
    icon: "sparkle" as const,
  },
] as const;

const testimonials = [
  {
    text: "We adopted our British Shorthair boy and he is simply perfect. Healthy, playful and so affectionate. You can see how much love and care goes into raising these kittens.",
    name: "Emma W.",
    location: "London, UK",
    image: "/testimonials/testimonial1.png",
  },
  {
    text: "Our little British Longhair girl is the sweetest addition to our family. The whole process was so smooth and we received great support even after bringing her home.",
    name: "James T.",
    location: "Manchester, UK",
    image: "/testimonials/testimonial2.png",
  },
  {
    text: "From the first message to the day we picked up our kitten, the experience was amazing. You can tell they truly care about every kitten and where they go.",
    name: "Sophie R.",
    location: "Bristol, UK",
    image: "/testimonials/testimonial3.png",
  },
  {
    text: "We got our Scottish Fold boy and he is absolutely adorable. So calm, cuddly and well-socialised. We couldn't be happier.",
    name: "Daniel K.",
    location: "Edinburgh, UK",
    image: "/testimonials/testimonial4.png",
  },
  {
    text: "I highly recommend TamysweetUK. Our kitten is healthy, confident and the perfect companion. We are so grateful.",
    name: "Megan L.",
    location: "Birmingham, UK",
    image: "/testimonials/testimonial5.png",
  },
  {
    text: "It's clear that these kittens are raised in a loving home. Our family adores our new girl. Thank you for everything!",
    name: "Charlotte & Mark",
    location: "Leeds, UK",
    image: "/testimonials/testimonial6.png",
  },
] as const;

export const metadata: Metadata = createSeoMetadata({
  title: "Customer Testimonials",
  description:
    "Read feedback from TamysweetUK families who have welcomed one of our kittens into their homes across the UK.",
  path: "/testimonials",
  image: "/hero/hero-about.png",
});

export default function TestimonialsPage() {
  return (
    <div className="bg-[#FCF9F6] pb-16">
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/testimonials" },
        ])}
      />
      <PageHero
        eyebrow="HOME / TESTIMONIALS"
        title="What Our Families Say"
        description="Nothing makes us happier than hearing how our kittens have brought joy to their new families. Here are some kind words from our amazing customers."
        imageSrc="/hero/hero-about.png"
        imageAlt="TamysweetUK customer testimonials"
        className="page-hero-kittens"
        imageClassName="object-cover object-center md:object-[75%_center] lg:object-[72%_center]"
      />

      <div className="px-5 sm:px-8">
        <div className="mx-auto w-full max-w-[1180px]">
          <section className="grid overflow-hidden rounded-[28px] border border-[#F3D6DE] bg-[linear-gradient(90deg,#FFF7FA_0%,#FFFFFF_100%)] shadow-[0_18px_48px_rgba(0,0,0,0.05)] sm:grid-cols-2 xl:flex xl:items-stretch xl:justify-between">
            {stats.map((stat, index) => (
              <article
                key={stat.value}
                className="relative flex flex-1 items-center gap-4 px-5 py-7 text-left transition-transform duration-200 ease-out hover:-translate-y-[3px] sm:px-7 sm:py-7 lg:px-8 lg:py-8"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F7C9D6] bg-[#FFF8FB] text-[#EF6F91]">
                  <StatIcon kind={stat.icon} />
                </div>
                <div className="min-w-0">
                  <p className="font-serif text-[28px] leading-none font-bold text-[#2F2A2A] lg:text-[30px]">
                    {stat.value}
                  </p>
                  {stat.value === "5.0" ? (
                    <div className="mt-1 flex items-center gap-1 text-[#EF6F91]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <StarIcon key={starIndex} className="h-[14px] w-[14px]" />
                      ))}
                    </div>
                  ) : null}
                  <p className="mt-1 max-w-[140px] text-[12px] leading-[1.45] text-[#666666] lg:text-[12.5px]">
                    {stat.label}
                  </p>
                </div>
                {index !== stats.length - 1 ? (
                  <span className="absolute right-0 top-1/2 hidden h-[44px] w-px -translate-y-1/2 bg-[#F3D6DE]/70 xl:block" />
                ) : null}
              </article>
            ))}
          </section>

          <section className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={`${testimonial.name}-${testimonial.location}`}
                className="flex min-h-[620px] flex-col justify-between rounded-[26px] border border-[#F3D6DE] bg-white p-8 shadow-[0_20px_60px_rgba(239,111,145,0.08)] transition-all duration-250 ease-out hover:-translate-y-[5px] hover:shadow-[0_30px_70px_rgba(239,111,145,0.12)]"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDEAF0] text-[#EF6F91]">
                    <QuoteIcon className="h-12 w-12" />
                  </div>
                  <p className="mt-6 line-clamp-5 text-[16px] leading-[1.8] text-[#5F5A5A]">
                    {testimonial.text}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#FDEAF0] font-serif text-lg text-[#EF6F91]">
                      {initialsFromName(testimonial.name)}
                    </div>
                    <div>
                      <p className="text-[16px] font-semibold text-[#2F2A2A]">{testimonial.name}</p>
                      <p className="text-[14px] text-[#777777]">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="mt-[10px] flex gap-[10px] text-[#EF6F91]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon key={index} className="h-[18px] w-[18px]" />
                    ))}
                  </div>
                </div>

                <div className="relative mt-5 h-[180px] overflow-hidden rounded-[18px] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name} from ${testimonial.location}, a TamysweetUK kitten owner`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  />
                </div>
              </article>
            ))}
          </section>

          <section className="mt-10 flex flex-col gap-6 rounded-[28px] border border-[#F3D6DE] bg-[linear-gradient(90deg,#FFF7FA_0%,#FFFFFF_100%)] px-6 py-6 shadow-[0_18px_48px_rgba(0,0,0,0.05)] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="shrink-0 text-[#EF6F91]">
                <HeartIcon className="h-12 w-12" />
              </div>
              <div className="max-w-[520px]">
                <h2 className="text-[18px] leading-[1.5] font-medium text-[#2F2A2A] sm:text-[20px]">
                  Join our happy families
                </h2>
                <p className="mt-2 text-[13px] leading-5 text-[#5F5A5A] sm:text-[14px]">
                  Our kittens are raised with love and care,
                  <br />
                  ready to bring joy to your home.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <CTAButton href="/kittens" className="w-full justify-center px-7 py-3.5 lg:min-w-[210px] lg:w-auto">
                <span>View Available Kittens</span>
                <PawIcon className="ml-2 h-4 w-4 text-white" />
              </CTAButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function initialsFromName(name: string) {
  return name
    .split(/[\s&.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function StatIcon({ kind }: { kind: "heart" | "home" | "star" | "sparkle" }) {
  if (kind === "home") {
    return <HomeIcon className="h-5 w-5" />;
  }

  if (kind === "star") {
    return <StarOutlineIcon className="h-5 w-5" />;
  }

  if (kind === "sparkle") {
    return <ChatIcon className="h-5 w-5" />;
  }

  return <HeartIcon className="h-5 w-5" />;
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9.8 7.5c-2.3 1.1-3.8 3.5-3.8 6v3h5.2v-4H8.9c.2-1.5 1.2-2.9 2.8-3.7l-1-1.3Zm8.2 0c-2.3 1.1-3.8 3.5-3.8 6v3h5.2v-4h-2.3c.2-1.5 1.2-2.9 2.8-3.7l-1-1.3Z"
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

function HomeIcon({ className }: { className?: string }) {
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

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="m12 3.8 2.5 5.1 5.6.8-4 4 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-4 5.6-.8L12 3.8Z" />
    </svg>
  );
}

function StarOutlineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m12 3.8 2.5 5.1 5.6.8-4 4 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-4 5.6-.8L12 3.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 19c4.4 0 8-2.9 8-6.5S16.4 6 12 6 4 8.9 4 12.5c0 1.5.6 2.9 1.7 4L5 20l3.6-1.4c1 .3 2.2.4 3.4.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 12.5h.01M12 12.5h.01M15 12.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
