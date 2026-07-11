import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, type Session, type SupabaseClient, type User } from "@supabase/supabase-js";

const ADMIN_ACCESS_COOKIE = "tamysweetuk-admin-access-token";
const ADMIN_REFRESH_COOKIE = "tamysweetuk-admin-refresh-token";

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL. Add it to your .env.local file before using Supabase.",
    );
  }

  if (!anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Add it to your .env.local file before using Supabase.",
    );
  }

  return { url, anonKey };
}

export function createServerSupabaseClient(accessToken?: string): SupabaseClient {
  const { url, anonKey } = getSupabaseEnv();

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : undefined,
  });
}

export type AdminSession = {
  accessToken: string;
  refreshToken: string | null;
  user: User;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ADMIN_ACCESS_COOKIE)?.value;
  const refreshToken = cookieStore.get(ADMIN_REFRESH_COOKIE)?.value ?? null;

  if (!accessToken) {
    return null;
  }

  const supabase = createServerSupabaseClient(accessToken);
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    console.error("Failed to read admin session from Supabase.", error);
    return null;
  }

  return {
    accessToken,
    refreshToken,
    user: data.user,
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function setAdminSessionCookies(session: Session) {
  const cookieStore = await cookies();
  const secure = process.env.NODE_ENV === "production";
  const expires = session.expires_at ? new Date(session.expires_at * 1000) : undefined;

  cookieStore.set(ADMIN_ACCESS_COOKIE, session.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    expires,
  });

  cookieStore.set(ADMIN_REFRESH_COOKIE, session.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });
}

export async function clearAdminSessionCookies() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_ACCESS_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });

  cookieStore.set(ADMIN_REFRESH_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}
