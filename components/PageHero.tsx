import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
  imageClassName?: string;
  heightClassName?: string;
  titleClassName?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt = "TamysweetUK page hero",
  className = "",
  imageClassName = "object-cover object-[68%_center]",
  heightClassName = "min-h-[380px] lg:min-h-[520px]",
  titleClassName = "text-[42px] leading-[1.05] sm:text-[52px] lg:text-[72px]",
}: PageHeroProps) {
  const isKittensHero = className.includes("page-hero-kittens");
  const isBreedsHero = className.includes("page-hero-breeds");
  const usesSideImageHero = isKittensHero || isBreedsHero;
  const sectionHeightClassName = isBreedsHero
    ? "md:min-h-[390px] lg:min-h-[430px] xl:min-h-[460px] min-[1600px]:min-h-[500px]"
    : heightClassName;
  const sideImageWrapperClassName = isBreedsHero
    ? "md:w-[74%] lg:w-[72%]"
    : "md:w-[70%] lg:w-[58%]";
  const desktopTextWidthClassName = isBreedsHero
    ? "max-w-[430px] xl:w-[34%]"
    : "max-w-[430px]";
  const desktopImageSizes = isBreedsHero
    ? "(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) 72vw, 100vw"
    : "(max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) 70vw, 58vw";

  if (usesSideImageHero) {
    return (
      <section
        className={`relative isolate mb-16 overflow-hidden bg-[#FCF9F6] ${sectionHeightClassName} ${className}`}
      >
        <div className="relative z-20 mx-auto w-full max-w-[1180px] px-6 py-10 md:hidden">
          <HeroCopy
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleClassName={titleClassName}
          />
        </div>

        <div
          className={`relative z-10 mx-auto mb-10 aspect-[4/3] w-[calc(100%-3rem)] overflow-hidden rounded-[24px] shadow-[0_18px_45px_rgba(0,0,0,0.06)] md:absolute md:inset-y-0 md:right-0 md:mb-0 md:h-full md:w-full md:rounded-none md:shadow-none ${sideImageWrapperClassName}`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            fetchPriority="high"
            quality={85}
            className={`transition duration-300 ease-out ${imageClassName}`}
            sizes={desktopImageSizes}
          />
          <div
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(252,249,246,0.82) 0%, rgba(252,249,246,0.72) 14%, rgba(252,249,246,0.28) 28%, rgba(252,249,246,0.04) 42%, transparent 56%)",
            }}
          />
        </div>

        <div
          className={`relative z-20 mx-auto hidden w-full max-w-[1180px] items-center px-5 py-8 sm:px-8 md:flex lg:px-12 ${sectionHeightClassName}`}
        >
          <div className={`w-full ${desktopTextWidthClassName}`}>
            <HeroCopy
              eyebrow={eyebrow}
              title={title}
              description={description}
              titleClassName={titleClassName}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative isolate mb-16 overflow-hidden bg-[#FCF9F6] ${sectionHeightClassName} ${className}`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        fetchPriority="high"
        quality={85}
        className={`absolute inset-0 -z-20 hidden transition duration-300 ease-out md:block ${imageClassName}`}
        sizes="100vw"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, #FCF9F6 0%, rgba(252,249,246,.98) 16%, rgba(252,249,246,.88) 34%, rgba(252,249,246,.55) 52%, rgba(252,249,246,.15) 68%, transparent 82%)",
        }}
      />
      <div
        className={`relative z-20 mx-auto hidden w-full max-w-[1180px] items-center px-5 py-8 sm:px-8 md:flex lg:px-12 ${sectionHeightClassName}`}
      >
        <div className="w-full max-w-[520px]">
          <HeroCopy
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleClassName={titleClassName}
          />
        </div>
      </div>
    </section>
  );
}

function HeroCopy({
  eyebrow,
  title,
  description,
  titleClassName,
}: Pick<PageHeroProps, "eyebrow" | "title" | "description" | "titleClassName">) {
  return (
    <div className="space-y-5">
      <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
        {eyebrow}
      </p>
      <div className="space-y-4">
        <h1 className={`font-serif font-medium text-[#2F2A2A] ${titleClassName}`}>{title}</h1>
        <div className="flex items-center gap-3 text-[var(--pink-deep)]">
          <span className="text-sm">{"\u2665"}</span>
          <span className="h-px w-11 bg-[#EF6F91]/70" />
        </div>
        {description ? (
          <p className="max-w-[430px] text-base leading-[1.75] text-[#5F5A5A] sm:text-[17px]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
