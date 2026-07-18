import Image from "next/image";

export default function FAQHero() {
  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#FCF9F6]">
      <div className="absolute inset-0 z-0 w-full lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[58%]">
        <Image
          src="/hero/hero-home.png"
          alt="TamysweetUK FAQ hero"
          fill
          priority
          fetchPriority="high"
          quality={85}
          className="object-cover object-[62%_center]"
          sizes="(min-width: 1024px) 58vw, 100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#FCF9F6_0%,rgba(252,249,246,.95)_10%,rgba(252,249,246,.72)_24%,rgba(252,249,246,.28)_38%,transparent_52%)]" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-[680px] w-full max-w-[1280px] items-center px-5 py-10 sm:px-8 lg:px-16">
        <div className="w-full max-w-[520px] space-y-5">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
            HOME / FAQ
          </p>

          <div className="space-y-4">
            <h1 className="font-serif text-[44px] leading-[0.9] font-medium tracking-[-0.02em] text-[#2F2A2A] lg:text-[72px]">
              Frequently Asked Questions
            </h1>

            <div className="flex items-center gap-3 text-[var(--pink-deep)]">
              <span className="text-sm">{"\u2665"}</span>
              <span className="h-px w-11 bg-[#EF6F91]/70" />
            </div>

            <p className="max-w-[420px] text-[17px] leading-[1.7] text-[#5D5656]">
              Here are some of the most common questions we receive from current and future
              kitten families.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
