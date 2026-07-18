"use client";

import { useConsent } from "@/components/consent/ConsentProvider";

export default function ConsentScripts() {
  return (
    <>
      <AnalyticsScripts />
      <MarketingScripts />
    </>
  );
}

function AnalyticsScripts() {
  const { consent } = useConsent();

  if (!consent?.analytics) {
    return null;
  }

  return null;
}

function MarketingScripts() {
  const { consent } = useConsent();

  if (!consent?.marketing) {
    return null;
  }

  return null;
}
