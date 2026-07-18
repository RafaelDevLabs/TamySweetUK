import Image from "next/image";
import Link from "next/link";

import { buildKittenImageAltText } from "@/lib/mappers/kitten";
import type { KittenCard as Kitten } from "@/lib/mock-kittens";

type KittenCardProps = {
  kitten: Kitten;
  prioritizeImage?: boolean;
};

const availabilityStyles: Record<Kitten["availability"], string> = {
  Available: "bg-[#EAF6EF] text-[#557B62]",
  Reserved: "bg-[#F6E8C8] text-[#8C6B28]",
  Sold: "bg-[#EFEDEE] text-[#7B7474]",
};

export default function KittenCard({ kitten, prioritizeImage = false }: KittenCardProps) {
  return (
    <article className="group mx-auto w-full max-w-[285px] overflow-hidden rounded-[26px] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(0,0,0,0.1)]">
      <div className="relative h-[240px] overflow-hidden rounded-t-[26px] bg-[#F8F3EE]">
        <Image
          src={kitten.images[0]}
          alt={buildKittenImageAltText({
            name: kitten.name,
            breed: kitten.breed,
            colour: kitten.colour,
            index: 0,
          })}
          fill
          priority={prioritizeImage}
          loading={prioritizeImage ? "eager" : "lazy"}
          className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1280px) 285px, (min-width: 768px) 44vw, 100vw"
        />

        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${availabilityStyles[kitten.availability]}`}
          >
            {kitten.availability}
          </span>
        </div>

        <button
          type="button"
          aria-label={`Save ${kitten.name}`}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--pink-deep)] shadow-[0_10px_26px_rgba(0,0,0,0.08)]"
        >
          <HeartIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5">
        <div className="mt-[10px]">
          <h3 className="font-serif text-[28px] leading-none text-[#2F2A2A]">{kitten.name}</h3>
          <p className="mt-1.5 text-sm text-[#7A7272]">{kitten.breed}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <DetailBadge>{kitten.gender}</DetailBadge>
          <DetailBadge>{kitten.age}</DetailBadge>
          <DetailBadge>{kitten.colour}</DetailBadge>
        </div>

        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A9292]">Price</p>
          <p className="mt-1 text-[32px] font-bold leading-none text-[#EF6F91]">
            {"\u00A3"}
            {kitten.price}
          </p>
        </div>

        <Link
          href={`/kittens/${kitten.slug}`}
          className="mt-4 inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#EAE7D5] px-4 text-sm font-medium text-[#4D4B3F] transition hover:bg-[#dfdbc6]"
        >
          <span>View Details</span>
          <span className="relative h-4 w-4 shrink-0">
            <Image
              src="/design/brand-icon.png"
              alt=""
              fill
              className="object-contain"
              sizes="16px"
            />
          </span>
        </Link>
      </div>
    </article>
  );
}

function DetailBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#F6F1E9] px-[10px] py-1 text-[11px] font-medium text-[#736A63]">
      {children}
    </span>
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
