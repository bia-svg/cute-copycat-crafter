import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "cookie_consent_v1";
const CONSENT_VERSION = "v1";

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

async function logConsent(choice: "granted" | "denied", language: string) {
  try {
    await supabase.from("consent_logs").insert({
      choice,
      consent_version: CONSENT_VERSION,
      language,
      page_path: typeof window !== "undefined" ? window.location.pathname : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
    });
  } catch {}
}

function updateConsent(granted: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
  } catch {}
  const state = granted ? "granted" : "denied";
  window.dataLayer = window.dataLayer || [];
  // Proper Consent Mode v2 signal (gtag arguments-style push)
  window.dataLayer.push(["consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  }]);
  if (granted) {
    try { window.dispatchEvent(new Event("cookie-consent-granted")); } catch {}
  }
}

export default function CookieConsent() {
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (!v) {
        // Defer slightly to avoid LCP impact
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    updateConsent(true);
    setVisible(false);
    void logConsent("granted", language);
  };
  const handleReject = () => {
    updateConsent(false);
    setVisible(false);
    void logConsent("denied", language);
  };

  const privacyPath = getPath("privacy", language, country);

  const txt = isEN
    ? {
        body: "We use essential cookies to operate this site and, with your consent, analytics cookies (Google Analytics, Microsoft Clarity, Google Ads) to improve our service.",
        more: "Privacy Policy",
        accept: "Accept",
        reject: "Reject",
      }
    : {
        body: "Wir verwenden notwendige Cookies für den Betrieb dieser Website und – mit Ihrer Einwilligung – Analyse-Cookies (Google Analytics, Microsoft Clarity, Google Ads) zur Verbesserung unseres Angebots.",
        more: "Datenschutz",
        accept: "Akzeptieren",
        reject: "Ablehnen",
      };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={isEN ? "Cookie consent" : "Cookie-Einwilligung"}
      className="fixed bottom-3 left-3 right-3 sm:left-4 sm:bottom-4 sm:right-auto sm:max-w-md z-[38]"
    >
      <div className="bg-white border border-[#E2E8EE] shadow-lg rounded-2xl p-4 text-[13px] leading-snug text-[#1B3A5C]">
        <p className="mb-3">
          {txt.body}{" "}
          <Link to={privacyPath} className="underline hover:text-[#2E7D32]">
            {txt.more}
          </Link>
          .
        </p>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={handleReject}
            className="px-3 py-1.5 rounded-full border border-[#E2E8EE] text-[#1B3A5C] hover:bg-[#F1F4F7] text-xs font-medium transition-colors"
          >
            {txt.reject}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-1.5 rounded-full bg-[#2E7D32] text-white hover:bg-[#256628] text-xs font-semibold transition-colors"
          >
            {txt.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
