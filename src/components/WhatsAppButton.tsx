import { MessageCircle } from "lucide-react";

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
    // Fire conversion event for analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "whatsapp_open", {
        event_category: "conversion",
        ...getUtmParams(),
      });
    }
    // Also dispatch custom event for any listener
    window.dispatchEvent(new CustomEvent("conversion", {
      detail: { type: "whatsapp_open", ...getUtmParams() },
    }));
  };

  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

/**
 * Utility: call this from any form submission to track UTM conversion.
 * Usage: trackFormConversion("erstgespraech_form")
 */
export function trackFormConversion(formName: string) {
  const utms = getUtmParams();
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "form_submission", {
      event_category: "conversion",
      form_name: formName,
      ...utms,
    });
  }
  window.dispatchEvent(new CustomEvent("conversion", {
    detail: { type: "form_submission", form_name: formName, ...utms },
  }));
}
