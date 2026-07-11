"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { loginAdmin, type AdminAuthFormState } from "@/app/admin/login/actions";

const initialState: AdminAuthFormState = {
  error: null,
};

export default function AdminLoginForm() {
  const [state, formAction] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-[#2F2A2A]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-12 w-full rounded-2xl border border-[#F3E2E6] bg-[#FFFDFC] px-4 text-[#2F2A2A] outline-none transition placeholder:text-[#A59696] focus:border-[#EF6F91]"
          placeholder="hello@tamysweetuk.co.uk"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-[#2F2A2A]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-12 w-full rounded-2xl border border-[#F3E2E6] bg-[#FFFDFC] px-4 text-[#2F2A2A] outline-none transition placeholder:text-[#A59696] focus:border-[#EF6F91]"
          placeholder="Enter your password"
        />
      </div>

      {state.error ? (
        <div className="rounded-2xl border border-[#F5CDD8] bg-[#FFF4F7] px-4 py-3 text-sm text-[#B24F6D]">
          {state.error}
        </div>
      ) : null}

      <LoginSubmitButton />
    </form>
  );
}

function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#EF6F91] px-5 text-sm font-semibold !text-white shadow-[0_12px_24px_rgba(239,111,145,0.2)] transition hover:bg-[#E95E84] hover:!text-white disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}
