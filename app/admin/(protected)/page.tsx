import Link from "next/link";

import { logoutAdmin } from "@/app/admin/actions";
import AdminStatCard from "@/components/admin/AdminStatCard";
import { createServerSupabaseClient, requireAdminSession } from "@/lib/supabase/server";

type DashboardStat = {
  label: string;
  value: number;
  hint: string;
  tone: "pink" | "mint" | "gold" | "slate";
  icon: React.ReactNode;
};

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();
  const supabase = createServerSupabaseClient(session.accessToken);

  const [totalResult, availableResult, reservedResult, soldResult] = await Promise.all([
    supabase.from("kittens").select("*", { count: "exact", head: true }),
    supabase.from("kittens").select("*", { count: "exact", head: true }).eq("availability", "available"),
    supabase.from("kittens").select("*", { count: "exact", head: true }).eq("availability", "reserved"),
    supabase.from("kittens").select("*", { count: "exact", head: true }).eq("availability", "sold"),
  ]);

  const stats: DashboardStat[] = [
    {
      label: "Total kittens",
      value: totalResult.count ?? 0,
      hint: "All active listings in your Supabase database.",
      tone: "pink",
      icon: <PawIcon className="h-6 w-6" />,
    },
    {
      label: "Available",
      value: availableResult.count ?? 0,
      hint: "Ready to be featured and shared with families.",
      tone: "mint",
      icon: <SparkleIcon className="h-6 w-6" />,
    },
    {
      label: "Reserved",
      value: reservedResult.count ?? 0,
      hint: "Kittens currently held for confirmed families.",
      tone: "gold",
      icon: <RibbonIcon className="h-6 w-6" />,
    },
    {
      label: "Sold",
      value: soldResult.count ?? 0,
      hint: "Placed into happy homes across your waiting list.",
      tone: "slate",
      icon: <HomeIcon className="h-6 w-6" />,
    },
  ];

  return (
    <section className="space-y-8">
      <div className="rounded-[30px] border border-[#F3E2E6] bg-[linear-gradient(135deg,#fffdfc_0%,#fff6f8_100%)] p-6 shadow-[0_22px_56px_rgba(0,0,0,0.05)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EF6F91]">
              Overview
            </p>
            <h2 className="mt-3 font-serif text-[38px] leading-[1.02] text-[#2F2A2A] sm:text-[46px]">
              Welcome back
            </h2>
            <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-[#6F6666] sm:text-[16px]">
              Keep your litters, featured homepage kittens and availability beautifully organised
              from one premium breeder dashboard.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/kittens"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#EF6F91] px-5 text-sm font-semibold !text-[#EF6F91] transition hover:bg-[#FDECEF] hover:!text-[#EF6F91]"
            >
              View all kittens
            </Link>
            <Link
              href="/admin/kittens/new"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#EF6F91] px-5 text-sm font-semibold !text-white shadow-[0_12px_24px_rgba(239,111,145,0.2)] transition hover:bg-[#E95E84] hover:!text-white"
            >
              Add New Kitten
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <AdminStatCard
            key={item.label}
            label={item.label}
            value={item.value}
            hint={item.hint}
            tone={item.tone}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[30px] border border-[#F3E2E6] bg-white p-6 shadow-[0_20px_46px_rgba(0,0,0,0.04)] sm:p-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EF6F91]">
            Workflow
          </p>
          <h3 className="mt-3 font-serif text-[30px] text-[#2F2A2A]">Today&apos;s next steps</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              "Add new litters with strong gallery images.",
              "Mark standout kittens as featured for the homepage.",
              "Keep availability current before enquiries arrive.",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#F6E4E8] bg-[#FFFDFC] p-4"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FDECEF] text-sm font-semibold text-[#EF6F91]">
                  0{index + 1}
                </span>
                <p className="mt-3 text-sm leading-6 text-[#6F6666]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-[#F3E2E6] bg-[#FAF7EF] p-6 shadow-[0_20px_46px_rgba(0,0,0,0.04)] sm:p-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#B88C5B]">
            Quick actions
          </p>
          <h3 className="mt-3 font-serif text-[30px] text-[#2F2A2A]">Keep everything fresh</h3>
          <p className="mt-3 text-[15px] leading-7 text-[#6F6666]">
            Update featured kittens, add new arrivals and keep image galleries ready for families.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/kittens"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#EF6F91] px-5 text-sm font-semibold !text-[#EF6F91] transition hover:bg-[#FDECEF] hover:!text-[#EF6F91]"
            >
              Manage Kittens
            </Link>
            <Link
              href="/admin/kittens/new"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#EF6F91] px-5 text-sm font-semibold !text-white shadow-[0_12px_24px_rgba(239,111,145,0.2)] transition hover:bg-[#E95E84] hover:!text-white"
            >
              Publish New Kitten
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#EF6F91] px-5 text-sm font-semibold !text-white shadow-[0_14px_28px_rgba(239,111,145,0.22)] transition hover:bg-[#E95E84] hover:!text-white"
          >
            <LogoutIcon className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </form>
      </div>
    </section>
  );
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <ellipse cx="7" cy="8" rx="2" ry="3" />
      <ellipse cx="12" cy="6.5" rx="2" ry="3" />
      <ellipse cx="17" cy="8" rx="2" ry="3" />
      <ellipse cx="19.5" cy="12" rx="1.8" ry="2.6" />
      <path d="M12 11.5c-2.8 0-5.8 2.2-5.8 5 0 1.5 1.2 2.3 2.5 2.3 1.2 0 1.9-.6 3.3-.6s2.1.6 3.3.6c1.3 0 2.5-.8 2.5-2.3 0-2.8-3-5-5.8-5Z" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3ZM18.5 15.5l.8 2 .2.5.5.2 2 .8-2 .8-.5.2-.2.5-.8 2-.8-2-.2-.5-.5-.2-2-.8 2-.8.5-.2.2-.5.8-2ZM5 14l1 2.5L8.5 17 6 18l-1 2.5L4 18l-2.5-1L4 16.5 5 14Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RibbonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM9 12.5 7.5 20l4.5-2.4 4.5 2.4-1.5-7.5"
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
        d="M4 11.5 12 5l8 6.5v7A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 20v-5h5v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M14 7l5 5-5 5M19 12H9M10 4H6.5A2.5 2.5 0 0 0 4 6.5v11A2.5 2.5 0 0 0 6.5 20H10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
