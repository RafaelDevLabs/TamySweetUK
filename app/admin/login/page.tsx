import { redirect } from "next/navigation";

import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FCF9F6] px-5 py-10">
      <div className="w-full max-w-[460px] rounded-[32px] border border-[#F3E2E6] bg-white px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.05)] sm:px-8 sm:py-10">
        <div className="mb-8 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EF6F91]">
            TamysweetUK Admin
          </p>
          <h1 className="mt-3 font-serif text-[42px] leading-[1.02] text-[#2F2A2A]">Welcome back</h1>
          <p className="mt-3 text-[15px] leading-7 text-[#6F6666]">
            Sign in to manage featured kittens, listings and images.
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </div>
  );
}
