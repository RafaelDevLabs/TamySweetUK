type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--pink-deep)]">
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-4">
        <h2 className="font-serif text-4xl leading-tight text-balance text-[var(--foreground)] sm:text-5xl">
          <span className="fancy-underline">{title}</span>
        </h2>
        {description ? (
          <p className="text-base leading-8 text-[var(--muted)] sm:text-lg">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
