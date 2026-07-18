import Image from "next/image";

export default function BreedsHero() {
  return (
    <section className="mb-16 bg-[#FCF9F6]">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-7 px-5 py-10 sm:px-8 md:min-h-[440px] md:grid-cols-[45%_55%] md:gap-8 lg:min-h-[500px] lg:grid-cols-[42%_58%] lg:gap-12 lg:px-6">
        <div className="order-1">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
            HOME / BRITISH SHORTHAIR
          </p>

          <div className="mt-4 space-y-4">
            <h1 className="font-serif text-[42px] leading-[1.05] font-medium text-[#2F2A2A] sm:text-[52px] lg:text-[72px]">
              British Shorthair Kittens
            </h1>
            <div className="flex items-center gap-3 text-[var(--pink-deep)]">
              <span className="text-sm">{"\u2665"}</span>
              <span className="h-px w-11 bg-[#EF6F91]/70" />
            </div>
            <p className="max-w-[430px] text-base leading-[1.75] text-[#5F5A5A] sm:text-[17px]">
              We specialise exclusively in British Shorthair kittens, raised in our family home
              with careful attention to health, temperament and socialisation.
            </p>
          </div>
        </div>

        <div className="order-2 mt-7 md:mt-0">
          <div className="relative w-full overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#FFFDFB_0%,#FFF7FA_100%)] shadow-[0_28px_70px_rgba(0,0,0,0.08)] aspect-[4/3] md:rounded-[26px] lg:rounded-[30px] lg:aspect-[16/10]">
            <Image
              src="/hero/breeds_hero.png"
              alt="TamysweetUK breeds page hero"
              fill
              priority
              fetchPriority="high"
              quality={85}
              className="object-cover object-center"
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 55vw, 58vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
