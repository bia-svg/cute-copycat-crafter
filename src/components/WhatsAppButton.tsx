import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Captures UTM params from the current URL and appends them
 * to the WhatsApp message for conversion tracking.
 */
function getUtmParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const result: Record<string, string> = {};
  utmKeys.forEach((key) => {
    const val = params.get(key);
    if (val) result[key] = val;
  });
  return result;
}

function buildWhatsAppUrl(): string {
  const phone = "491719539922";
  const utms = getUtmParams();
  let message = "Hallo, ich interessiere mich für eine Hypnose-Sitzung.";
  if (Object.keys(utms).length > 0) {
    const tag = Object.entries(utms).map(([k, v]) => `${k}=${v}`).join("&");
    message += `\n\n[ref: ${tag}]`;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function WhatsAppButton() {
  const handleClick = () => {
    const utms = getUtmParams();

    // GTM dataLayer event
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "whatsapp_click",
      ...utms,
    });

    // Log to database (fire-and-forget)
    supabase.from("whatsapp_clicks").insert({
      page_path: window.location.pathname,
      utm_source: utms.utm_source || null,
      utm_medium: utms.utm_medium || null,
      utm_campaign: utms.utm_campaign || null,
      utm_term: utms.utm_term || null,
      utm_content: utms.utm_content || null,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
    } as any).then(({ error }) => {
      if (error) console.error("WhatsApp click log error:", error);
    });
  };

  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-24 right-4 z-50 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 md:bottom-6 md:right-6 md:p-4"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

/**
 * Utility: call this from any form submission to track UTM conversion.
 * Fires: GTM dataLayer, Meta Pixel Lead, GA4 generate_lead, Google Ads conversion.
 */
export function trackFormConversion(formType: string, selectedDate?: string) {
  const utms = getUtmParams();

  // 1. GTM dataLayer event (for GA4 + Google Ads tags configured in GTM)
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event: "generate_lead",
    form_type: formType,
    selected_date: selectedDate || "",
    ...utms,
  });

  // 2. Meta Pixel Lead event
  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("track", "Lead", {
      content_name: formType,
      ...utms,
    });
  }

  // 3. Google Ads conversion (gtag fallback if GTM doesn't handle it)
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "conversion", {
      send_to: "AW-618560943/generate_lead",
    });
  }
}
