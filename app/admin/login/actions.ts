"use server";

import { redirect } from "next/navigation";

import { createServerSupabaseClient, setAdminSessionCookies } from "@/lib/supabase/server";

export type AdminAuthFormState = {
  error: string | null;
};

export async function loginAdmin(
  _prevState: AdminAuthFormState,
  formData: FormData,
): Promise<AdminAuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter both your email and password." };
  }

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      console.error("Admin sign-in failed.", error);
      return { error: "We couldn't sign you in. Please check your credentials and try again." };
    }

    await setAdminSessionCookies(data.session);
  } catch (error) {
    console.error("Unexpected admin sign-in error.", error);
    return { error: "Something went wrong while signing in. Please try again." };
  }

  redirect("/admin");
}
