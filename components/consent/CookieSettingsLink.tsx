"use client";

import { useConsent } from "@/components/consent/ConsentProvider";

export default function CookieSettingsLink() {
  const { openSettings } = useConsent();

  return (
    <button
      type="button"
      onClick={(event) => openSettings(event.currentTarget)}
      className="text-[15px] text-[#2F2A2A] transition duration-200 hover:text-[#EF6F91]"
    >
      Cookie settings
    </button>
  );
}
