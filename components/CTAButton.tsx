import Link from "next/link";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-[var(--pink)] !text-white visited:!text-white hover:!text-white shadow-[0_14px_35px_rgba(239,127,151,0.28)] hover:bg-[var(--pink-deep)]"
      : "border border-[var(--pink)] bg-white/90 text-[var(--pink-deep)] hover:bg-[var(--pink-soft)]";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
