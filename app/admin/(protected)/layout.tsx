import AdminLayout from "@/components/admin/AdminLayout";
import { requireAdminSession } from "@/lib/supabase/server";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  return <AdminLayout userEmail={session.user.email ?? "Signed in"}>{children}</AdminLayout>;
}
