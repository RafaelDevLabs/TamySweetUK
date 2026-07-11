import AppShellClient from "@/components/AppShellClient";
import { getSiteSettings } from "@/lib/supabase/queries/settings";

export default async function AppShell({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return <AppShellClient settings={settings}>{children}</AppShellClient>;
}
