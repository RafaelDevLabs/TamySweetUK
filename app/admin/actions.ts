"use server";

import { redirect } from "next/navigation";

import { clearAdminSessionCookies } from "@/lib/supabase/server";

export async function logoutAdmin() {
  await clearAdminSessionCookies();
  redirect("/admin/login");
}
