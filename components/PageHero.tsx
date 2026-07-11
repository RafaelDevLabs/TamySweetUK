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
  const overlayBackground = usesSideImageHero
    ? "linear-gradient(90deg, rgba(252,249,246,0.90) 0%, rgba(252,249,246,0.82) 18%, rgba(252,249,246,0.35) 32%, rgba(252,249,246,0.03) 46%, transparent 58%)"
    : "linear-gradient(90deg, #FCF9F6 0%, rgba(252,249,246,.98) 16%, rgba(252,249,246,.88) 34%, rgba(252,249,246,.55) 52%, rgba(252,249,246,.15) 68%, transparent 82%)";
  const sectionHeightClassName = isBreedsHero
    ? "md:min-h-[390px] lg:min-h-[430px] xl:min-h-[460px] min-[1600px]:min-h-[500px]"
    : heightClassName;
  const sideImageWrapperClassName = isBreedsHero
    ? "inset-y-0 right-0 w-full md:w-[74%] lg:w-[72%]"
    : "inset-y-0 right-0 w-full md:w-[70%] lg:w-[58%]";
  const desktopTextWidthClassName = isBreedsHero
    ? "max-w-[430px] xl:w-[34%]"
    : usesSideImageHero
      ? "max-w-[430px]"
      : "max-w-[520px]";
  const desktopImageClassName = isBreedsHero
    ? imageClassName
    : imageClassName;
  const desktopImageSizes = isBreedsHero
    ? "(max-width: 1279px) 72vw, 100vw"
    : "(max-width: 1023px) 70vw, 58vw";
  const desktopFadeStyle = {
    background:
      "linear-gradient(90deg, rgba(252,249,246,0.82) 0%, rgba(252,249,246,0.72) 14%, rgba(252,249,246,0.28) 28%, rgba(252,249,246,0.04) 42%, transparent 56%)",
  };

  return (
    <section
      className={`relative isolate mb-16 overflow-hidden bg-[#FCF9F6] ${sectionHeightClassName} ${className}`}
    >
      {usesSideImageHero ? (
        <div className={`absolute -z-20 hidden md:block ${sideImageWrapperClassName}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className={`transition duration-300 ease-out ${isBreedsHero ? "xl:hidden" : ""} ${desktopImageClassName}`}
            sizes={desktopImageSizes}
          />
          {isBreedsHero ? (
            <div
              className="absolute inset-0 xl:hidden"
              style={desktopFadeStyle}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={desktopFadeStyle}
            />
          )}
        </div>
      ) : (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className={`absolute inset-0 -z-20 hidden transition duration-300 ease-out md:block ${imageClassName}`}
          sizes="100vw"
        />
      )}
      {isBreedsHero ? (
        <div className="absolute top-0 right-0 bottom-0 z-0 hidden xl:block h-full w-fit bg-[#FCF9F6]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            priority
            width={1600}
            height={900}
            className="h-full w-auto max-w-none object-contain object-right"
            sizes="(min-width: 1600px) 888px, 816px"
          />
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 w-[220px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(252,249,246,0.98) 0%, rgba(252,249,246,0.92) 28%, rgba(252,249,246,0.48) 62%, rgba(252,249,246,0) 100%)",
            }}
          />
        </div>
      ) : null}
      {usesSideImageHero ? (
        <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col gap-7 px-6 py-10 md:hidden">
          <div className="w-full max-w-[430px] space-y-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
              {eyebrow}
            </p>

            <div className="space-y-4">
              <h1 className={`font-serif font-medium text-[#2F2A2A] ${titleClassName}`}>
                {title}
              </h1>
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

          <div
            className={`relative aspect-[4/3] w-full overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.06)] ${
              isBreedsHero ? "mt-7 rounded-[22px]" : "rounded-[24px]"
            }`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className="object-cover object-center transition duration-300 ease-out"
              sizes="(max-width: 767px) calc(100vw - 3rem), 100vw"
            />
          </div>
        </div>
      ) : null}
      <div
        className={`absolute inset-0 -z-10 ${usesSideImageHero ? "hidden" : ""}`}
        style={{
          background: overlayBackground,
        }}
      />

      <div
        className={`relative z-20 mx-auto hidden w-full max-w-[1180px] items-center px-5 py-8 sm:px-8 md:flex lg:px-12 ${sectionHeightClassName}`}
      >
        <div className={`w-full space-y-5 ${desktopTextWidthClassName}`}>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
            {eyebrow}
          </p>

          <div className="space-y-4">
            <h1 className={`font-serif font-medium text-[#2F2A2A] ${titleClassName}`}>
              {title}
            </h1>
            <div className="flex items-center gap-3 text-[var(--pink-deep)]">
              <span className="text-sm">{"\u2665"}</span>
              <span className="h-px w-11 bg-[#EF6F91]/70" />
            </div>
            {description ? (
              <p
                className={`text-base leading-[1.75] text-[#5F5A5A] sm:text-[17px] ${
                  usesSideImageHero ? "max-w-[430px]" : "max-w-[520px]"
                }`}
              >
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
