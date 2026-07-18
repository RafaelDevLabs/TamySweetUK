"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import CookieBanner from "@/components/consent/CookieBanner";
import CookieSettings from "@/components/consent/CookieSettings";
import { OPTIONAL_CONSENT_FEATURES_ACTIVE } from "@/lib/consent/config";
import {
  clearDeclinedOptionalStorage,
  createConsentState,
  getDefaultConsentDraft,
  readStoredConsent,
  saveStoredConsent,
} from "@/lib/consent/storage";
import type { ConsentDraft, ConsentState } from "@/lib/consent/types";

type ConsentContextValue = {
  consent: ConsentState | null;
  isReady: boolean;
  isSettingsOpen: boolean;
  canShowBanner: boolean;
  openSettings: (trigger?: HTMLElement | null) => void;
  closeSettings: () => void;
  savePreferences: (draft: ConsentDraft) => void;
  acceptAll: () => void;
  rejectOptional: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent must be used within a ConsentProvider.");
  }

  return context;
}

export default function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(() =>
    typeof window === "undefined" ? null : readStoredConsent(),
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [returnFocusElement, setReturnFocusElement] = useState<HTMLElement | null>(null);
  const isReady = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  function persistConsent(draft: ConsentDraft) {
    const nextConsent = createConsentState(draft);
    clearDeclinedOptionalStorage(draft);
    saveStoredConsent(nextConsent);
    setConsent(nextConsent);
    setIsSettingsOpen(false);
  }

  function openSettings(trigger?: HTMLElement | null) {
    setReturnFocusElement(trigger ?? null);
    setIsSettingsOpen(true);
  }

  function closeSettings() {
    setIsSettingsOpen(false);
  }

  function acceptAll() {
    persistConsent({
      preferences: true,
      analytics: true,
      marketing: true,
    });
  }

  function rejectOptional() {
    persistConsent(getDefaultConsentDraft());
  }

  useEffect(() => {
    function handleOpenSettings() {
      openSettings(document.activeElement instanceof HTMLElement ? document.activeElement : null);
    }

    window.addEventListener("tamysweetuk:open-cookie-settings", handleOpenSettings);

    return () => {
      window.removeEventListener("tamysweetuk:open-cookie-settings", handleOpenSettings);
    };
  }, []);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        isReady,
        isSettingsOpen,
        canShowBanner: OPTIONAL_CONSENT_FEATURES_ACTIVE && isReady && !consent,
        openSettings,
        closeSettings,
        savePreferences: persistConsent,
        acceptAll,
        rejectOptional,
      }}
    >
      {children}
      <CookieBanner />
      {isSettingsOpen ? <CookieSettings returnFocusElement={returnFocusElement} /> : null}
    </ConsentContext.Provider>
  );
}
