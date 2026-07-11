import Image from "next/image";
import Link from "next/link";

import { KITTEN_SELECT } from "@/lib/supabase/queries/kittens";
import { createServerSupabaseClient, requireAdminSession } from "@/lib/supabase/server";
import type { KittenWithImages } from "@/lib/types/kitten";

function getPrimaryImageUrl(kitten: KittenWithImages) {
  const primaryImage =
    kitten.images.find((image) => image.is_primary) ??
    [...kitten.images].sort((a, b) => a.sort_order - b.sort_order)[0];

  if (!primaryImage) {
    return null;
  }

  if (primaryImage.storage_path) {
    const supabase = createServerSupabaseClient();
    const { data } = supabase.storage.from("kitten-images").getPublicUrl(primaryImage.storage_path);
    return data.publicUrl || null;
  }

  return primaryImage.url;
}

const availabilityLabel = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
} as const;

export default async function AdminKittensPage() {
  const session = await requireAdminSession();
  const supabase = createServerSupabaseClient(session.accessToken);
  const { data, error } = await supabase
    .from("kittens")
    .select(KITTEN_SELECT)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .order("sort_order", { referencedTable: "kitten_images", ascending: true });

  if (error) {
    console.error("Failed to fetch admin kittens.", error);
  }

  const kittens = ((data ?? []) as KittenWithImages[]).map((kitten) => ({
    ...kitten,
    primaryImageUrl: getPrimaryImageUrl(kitten),
  }));

  return (
    <section className="space-y-8">
      <div className="rounded-[30px] border border-[#F3E2E6] bg-[linear-gradient(135deg,#fffdfc_0%,#fff6f8_100%)] p-6 shadow-[0_22px_56px_rgba(0,0,0,0.05)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EF6F91]">
              Kittens
            </p>
            <h2 className="mt-3 font-serif text-[38px] leading-[1.02] text-[#2F2A2A] sm:text-[46px]">
              Manage kitten listings
            </h2>
            <p className="mt-3 max-w-[640px] text-[15px] leading-7 text-[#6F6666] sm:text-[16px]">
              Review every listing, check availability at a glance and keep featured kittens ready
              for the public site.
            </p>
          </div>

          <div className="rounded-full border border-[#F7D9E2] bg-white/90 px-4 py-2 text-sm text-[#7B7070] shadow-[0_10px_24px_rgba(239,111,145,0.06)]">
            {kittens.length} kitten{kittens.length === 1 ? "" : "s"} in your listing library
          </div>
        </div>
      </div>

      {kittens.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {kittens.map((kitten) => (
            <article
              key={kitten.id}
              className="overflow-hidden rounded-[30px] border border-[#F3E2E6] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(0,0,0,0.06)]"
            >
              <div className="relative h-[230px] bg-[#FAF7EF]">
                {kitten.primaryImageUrl ? (
                  <Image
                    src={kitten.primaryImageUrl}
                    alt={kitten.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1536px) 28vw, (min-width: 768px) 44vw, 100vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-[#8A7D7D]">
                    No image
                  </div>
                )}

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${getAvailabilityClasses(kitten.availability)}`}
                  >
                    {availabilityLabel[kitten.availability]}
                  </span>
                  {kitten.is_featured ? (
                    <span className="inline-flex rounded-full bg-[#FDECEF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#EF6F91]">
                      Featured
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-[30px] leading-none text-[#2F2A2A]">
                      {kitten.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#7A7272]">{kitten.breed}</p>
                  </div>
                  <p className="text-right text-[28px] font-bold leading-none text-[#EF6F91]">
                    £{kitten.price}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <InfoBadge>{new Date(kitten.created_at).toLocaleDateString("en-GB")}</InfoBadge>
                  <InfoBadge>{kitten.gender}</InfoBadge>
                  <InfoBadge>{kitten.age_label}</InfoBadge>
                </div>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/admin/kittens/${kitten.id}/edit`}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-[#EF6F91] bg-white px-4 text-sm font-semibold !text-[#EF6F91] transition hover:bg-[#FDECEF] hover:!text-[#EF6F91]"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    disabled
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-[#F3E2E6] bg-[#FAF7EF] px-4 text-sm font-semibold text-[#8B7F7F] transition disabled:cursor-not-allowed disabled:opacity-75"
                  >
                    Archive
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[30px] border border-[#F3E2E6] bg-white px-6 py-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <p className="font-serif text-[32px] text-[#2F2A2A]">No kittens found yet</p>
          <p className="mt-3 text-[15px] leading-7 text-[#6F6666]">
            Add your first kitten listing to start managing the cattery from the admin area.
          </p>
          <Link
            href="/admin/kittens/new"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#EF6F91] px-5 text-sm font-semibold !text-white shadow-[0_12px_24px_rgba(239,111,145,0.2)] transition hover:bg-[#E95E84] hover:!text-white"
          >
            Add New Kitten
          </Link>
        </div>
      )}
    </section>
  );
}

function getAvailabilityClasses(availability: keyof typeof availabilityLabel) {
  const classes = {
    available: "bg-[#EAF6EF] text-[#557B62]",
    reserved: "bg-[#F6E8C8] text-[#8C6B28]",
    sold: "bg-[#EFEDEE] text-[#7B7474]",
  } as const;

  return classes[availability];
}

function InfoBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#F6F1E9] px-[10px] py-1 text-[11px] font-medium text-[#736A63]">
      {children}
    </span>
  );
}
