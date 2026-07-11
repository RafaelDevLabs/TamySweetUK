"use client";

import { usePathname } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { SiteSettings } from "@/lib/types/settings";

export default function AppShellClient({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: SiteSettings;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute ? <Header settings={settings} /> : null}
      <main className={isAdminRoute ? "min-h-screen bg-[#FCF9F6]" : undefined}>{children}</main>
      {!isAdminRoute ? <Footer settings={settings} /> : null}
    </>
  );
}
