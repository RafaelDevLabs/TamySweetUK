"use client";

import { usePathname } from "next/navigation";

import ConsentProvider from "@/components/consent/ConsentProvider";
import ConsentScripts from "@/components/consent/ConsentScripts";
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

  if (isAdminRoute) {
    return <main className="min-h-screen bg-[#FCF9F6]">{children}</main>;
  }

  return (
    <ConsentProvider>
      <ConsentScripts />
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </ConsentProvider>
  );
}
