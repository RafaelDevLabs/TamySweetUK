"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { logoutAdmin } from "@/app/admin/actions";

const navigationItems = [
  {
    href: "/admin",
    label: "Dashboard",
    description: "Overview & stats",
    icon: <DashboardIcon className="h-5 w-5" />,
  },
  {
    href: "/admin/kittens",
    label: "Kittens",
    description: "Manage listings",
    icon: <CatIcon className="h-5 w-5" />,
  },
  {
    href: "/admin/kittens/new",
    label: "Add New Kitten",
    description: "Create a new profile",
    icon: <PlusIcon className="h-5 w-5" />,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    description: "Business & site details",
    icon: <SettingsIcon className="h-5 w-5" />,
  },
];

export default function AdminLayout({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FCF9F6]">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-6 px-4 py-4 sm:px-6 lg:h-screen lg:flex-row lg:gap-8 lg:px-8 lg:py-6">
        <aside className="flex min-h-[calc(100dvh-2rem)] w-full shrink-0 flex-col rounded-[32px] border border-[#F3E2E6] bg-[linear-gradient(180deg,#fffdfc_0%,#fff7f9_100%)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.05)] sm:min-h-[calc(100dvh-3rem)] lg:min-h-0 lg:w-[320px] lg:p-6">
          <div className="rounded-[28px] border border-[#F7D9E2] bg-white/85 p-4 shadow-[0_12px_28px_rgba(239,111,145,0.08)] backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="relative h-[72px] w-[72px] shrink-0">
                <Image
                  src="/design/logo.png"
                  alt="TamysweetUK"
                  fill
                  className="object-contain"
                  sizes="72px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EF6F91]">
                  TamysweetUK Admin
                </p>
                <h1 className="mt-1 font-serif text-[32px] leading-none text-[#2F2A2A]">
                  Breeder Suite
                </h1>
                <p className="mt-2 truncate text-sm text-[#7D7272]">{userEmail}</p>
              </div>
            </div>
          </div>

          <nav className="mt-6 space-y-2.5">
            {navigationItems.map((item) => {
              const isActive = getIsActiveAdminRoute(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-[24px] border px-4 py-3.5 transition ${
                    isActive
                      ? "border-[#F7D9E2] bg-white text-[#EF6F91] shadow-[0_14px_30px_rgba(239,111,145,0.08)]"
                      : "border-transparent bg-transparent text-[#2F2A2A] hover:border-[#F7D9E2] hover:bg-white/80 hover:text-[#EF6F91]"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition ${
                      isActive
                        ? "bg-[#FDECEF] text-[#EF6F91]"
                        : "bg-white/80 text-[#8E7E7E] group-hover:bg-[#FCF2F5] group-hover:text-[#EF6F91]"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="mt-0.5 block text-xs text-[#8E7E7E]">{item.description}</span>
                  </span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      isActive ? "bg-[#EF6F91]" : "bg-[#F3E2E6] group-hover:bg-[#EF6F91]/40"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-[24px] border border-[#F7E8D0] bg-[#FAF7EF] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B88C5B]">
              Quick note
            </p>
            <p className="mt-2 text-sm leading-6 text-[#6B625A]">
              Featured kittens added here can appear on the homepage automatically when marked as
              featured.
            </p>
          </div>

          <div className="mt-auto hidden pt-6 lg:block">
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
        </aside>

        <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto rounded-[32px] border border-[#F3E2E6] bg-white/75 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.04)] backdrop-blur-sm sm:p-5 lg:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function getIsActiveAdminRoute(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === href;
  }

  if (href === "/admin/kittens") {
    return pathname === href || pathname.startsWith("/admin/kittens/") && !pathname.startsWith("/admin/kittens/new");
  }

  if (href === "/admin/kittens/new") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M4 13.5h6V20H4v-6.5ZM14 4h6v9h-6V4ZM14 17h6v3h-6v-3ZM4 4h6v5H4V4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m8 9-2-4 3.5 2L12 5.5 14.5 7 18 5l-2 4v4.2A5.8 5.8 0 0 1 10.2 19h-.4A5.8 5.8 0 0 1 4 13.2V9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.3 12.2h.01M14.7 12.2h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M10 15c1.2 1 2.8 1 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 5v14M5 12h14"
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

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM19 12a7.2 7.2 0 0 0-.1-1.2l2-1.5-2-3.5-2.4 1a8.3 8.3 0 0 0-2-1.1L14 3h-4l-.5 2.7a8.3 8.3 0 0 0-2 1.1l-2.4-1-2 3.5 2 1.5A7.2 7.2 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.5 2.4-1a8.3 8.3 0 0 0 2 1.1L10 21h4l.5-2.7a8.3 8.3 0 0 0 2-1.1l2.4 1 2-3.5-2-1.5c.1-.4.1-.8.1-1.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
