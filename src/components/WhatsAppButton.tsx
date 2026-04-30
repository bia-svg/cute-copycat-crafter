import { useLanguage } from "@/contexts/LanguageContext";

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

function buildWhatsAppUrl(country: string): string {
  const phone = country === "ch" ? "41791318878" : "491719539922";
  const utms = getUtmParams();
  const message = "Hallo Herr Woods, ich interessiere mich für Hypnose und hätte gerne weitere Informationen.";
  if (Object.keys(utms).length > 0) {
    const tag = Object.entries(utms).map(([k, v]) => `${k}=${v}`).join("&");
    return `https://wa.me/${phone}?text=${encodeURIComponent(message + "\n\n[ref: " + tag + "]")}`;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function WhatsAppButton() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const handleClick = () => {
    const utms = getUtmParams();

    // GTM dataLayer event
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "whatsapp_click",
      ...utms,
    });

    // Log to database lazily (fire-and-forget, dynamic import)
    import("@/integrations/supabase/client").then(({ supabase }) => {
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
    });
  };

  return (
    <a
      href={buildWhatsAppUrl(country)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-7 right-2 z-[39] flex items-center gap-2 bg-[#4CAF50]/90 hover:bg-[#43A047] text-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-[1.03] md:bottom-5 md:right-5 px-5 py-2 md:px-6 md:py-2.5 backdrop-blur-sm border border-[#1B3A5C]/40"
      aria-label="WhatsApp Schnell-Info"
    >
      <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="currentColor">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.052 9.38L1.056 31.2l6.076-1.952a15.9 15.9 0 008.872 2.684C24.828 31.932 32 24.756 32 16.004S24.828 0 16.004 0zm9.32 22.612c-.388 1.1-2.272 2.1-3.14 2.168-.868.072-1.668.388-5.616-1.168-4.744-1.872-7.74-6.736-7.976-7.048-.232-.312-1.912-2.544-1.912-4.852s1.212-3.444 1.644-3.912c.432-.468.94-.584 1.256-.584.312 0 .624.004.9.016.288.012.676-.108 1.056.808.388.94 1.32 3.228 1.436 3.46.116.232.192.504.04.812-.156.312-.232.504-.46.776-.232.272-.484.608-.692.816-.232.232-.472.484-.204.94.272.46 1.204 1.984 2.584 3.216 1.776 1.584 3.272 2.076 3.736 2.308.46.232.736.192 1.004-.116.272-.312 1.16-1.352 1.468-1.816.312-.464.62-.388 1.048-.232.428.156 2.716 1.28 3.18 1.512.46.232.768.348.884.54.116.192.116 1.1-.272 2.2z"/>
      </svg>
      <span className="text-xs md:text-sm font-medium whitespace-nowrap tracking-wide">
        WhatsApp Schnell-Info
      </span>
    </a>
  );
}

/**
 * Utility: call this from any form submission to track UTM conversion.
 */
export function trackFormConversion(formType: string, selectedDate?: string) {
  const utms = getUtmParams();

  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event: "generate_lead",
    form_type: formType,
    selected_date: selectedDate || "",
    ...utms,
  });

  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("track", "Lead", {
      content_name: formType,
      ...utms,
    });
  }

  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "conversion", {
      send_to: "AW-618560943/generate_lead",
    });
  }
}
