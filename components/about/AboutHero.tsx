import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="mb-16 bg-[linear-gradient(180deg,#FCF9F6_0%,#FFFDFB_100%)] [background-image:radial-gradient(circle_at_80%_40%,rgba(239,111,145,.08),transparent_60%),linear-gradient(180deg,#FCF9F6_0%,#FFFDFB_100%)]">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-7 px-5 py-10 sm:px-8 md:min-h-[520px] md:grid-cols-[46%_54%] md:gap-8 lg:grid-cols-[42%_58%] lg:gap-12 lg:px-6">
        <div className="order-1">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
            HOME / ABOUT US
          </p>

          <div className="mt-4 space-y-4">
            <h1 className="font-serif text-[42px] leading-[1.05] font-medium text-[#2F2A2A] sm:text-[48px] lg:text-[72px]">
              Our Story
            </h1>
            <div className="flex items-center gap-3 text-[var(--pink-deep)]">
              <span className="text-sm">{"\u2665"}</span>
              <span className="h-px w-11 bg-[#EF6F91]/70" />
            </div>
            <p className="max-w-[520px] text-[16px] leading-[1.8] text-[#5F5A5A] lg:text-[17px]">
              TamysweetUK began with one much-loved family cat and grew into a passion for
              raising healthy, affectionate kittens in a loving home.
            </p>
          </div>
        </div>

        <div className="order-2 mt-7 md:mt-0">
          <div className="group relative h-[360px] w-full overflow-hidden rounded-[24px] bg-[#FFF8FA] shadow-[0_24px_60px_rgba(47,42,42,0.08)] md:h-[430px] md:rounded-[28px] lg:h-[520px] lg:rounded-[30px] lg:shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
            <Image
              src="/hero/hero-newAbout.png"
              alt="TamysweetUK about page hero"
              fill
              priority
              className="object-cover object-[36%_32%] transition duration-300 ease-out group-hover:scale-[1.015]"
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 54vw, 56vw"
            />

            <div className="absolute bottom-5 left-5 hidden w-[220px] rounded-[22px] border border-[rgba(243,214,222,.9)] bg-[rgba(255,255,255,.92)] p-[18px] shadow-[0_18px_45px_rgba(0,0,0,.10)] backdrop-blur-[12px] transition duration-300 ease-out hover:-translate-y-0.5 md:block lg:w-[240px]">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FDECEF] text-[#EF6F91]">
                  <PawIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[16px] font-semibold text-[#2F2A2A]">Family Raised</p>
                  <p className="mt-1 text-[14px] leading-[1.6] text-[#5F5A5A]">
                    Healthy kittens,
                    <br />
                    raised with love and care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8.1 10.7c-1.2 0-2.2-1.2-2.2-2.7S6.9 5.3 8.1 5.3s2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM15.9 10.7c-1.2 0-2.2-1.2-2.2-2.7s1-2.7 2.2-2.7 2.2 1.2 2.2 2.7-1 2.7-2.2 2.7ZM5 15.3c-1 0-1.8-1-1.8-2.3S4 10.7 5 10.7s1.8 1 1.8 2.3S6 15.3 5 15.3Zm14 0c-1 0-1.8-1-1.8-2.3s.8-2.3 1.8-2.3 1.8 1 1.8 2.3-.8 2.3-1.8 2.3Zm-7 4.4c-2.6 0-4.6-1.1-4.6-3 0-1.4 1.2-2.6 2.4-3.2.6-.3 1.3-.2 1.9.1.2.1.4.2.6.2s.4-.1.6-.2c.6-.3 1.3-.4 1.9-.1 1.2.6 2.4 1.8 2.4 3.2 0 1.9-2 3-4.6 3Z" />
    </svg>
  );
}
