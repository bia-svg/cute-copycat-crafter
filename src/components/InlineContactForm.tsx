import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sendLeadEmails } from "@/lib/leadEmails";
import { logFormSubmission } from "@/lib/formSubmissionLog";
import { trackFormConversion } from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearchParams, Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface InlineContactFormProps {
  defaultConcern?: string;
}

export default function InlineContactForm({ defaultConcern }: InlineContactFormProps) {
  const { language, country, isSwiss } = useLanguage();
  const isEN = language === "en";
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const inputClasses = "w-full border border-border px-2.5 py-1.5 text-sm bg-white focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C] outline-none transition-colors";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fullName = ((formData.get("fullName") as string) || "").trim();
    const email = ((formData.get("email") as string) || "").trim();
    const postalCode = ((formData.get("postalCode") as string) || "").trim();
    const message = ((formData.get("message") as string) || "").trim();
    const bestTime = ((formData.get("bestTime") as string) || "").trim();
    const phone = phoneNumber.trim();

    const fail = (selector: string, msgDE: string, msgEN: string) => {
      form.querySelector<HTMLElement>(selector)?.focus();
      toast.error(isEN ? msgEN : msgDE);
    };

    if (!fullName) return fail('input[name="fullName"]', 'Bitte geben Sie Ihren Namen ein.', 'Please enter your full name.');
    if (!email) return fail('input[name="email"]', 'Bitte geben Sie Ihre E-Mail ein.', 'Please enter your email address.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail('input[name="email"]', 'Bitte geben Sie eine gültige E-Mail ein.', 'Please enter a valid email address.');
    if (!phone) return fail('input[type="tel"]', 'Bitte geben Sie Ihre Telefonnummer ein.', 'Please enter your phone number.');
    if (!postalCode) return fail('input[name="postalCode"]', 'Bitte geben Sie Ihre Postleitzahl und Ihren Ort ein.', 'Please enter your postal code and city.');
    if (!gdprConsent) return fail('input[name="gdprConsent"]', 'Bitte akzeptieren Sie die Datenschutzerklärung.', 'Please accept the privacy policy.');

    setIsSubmitting(true);

    const utmSource = searchParams.get("utm_source") || null;
    const utmMedium = searchParams.get("utm_medium") || null;
    const utmCampaign = searchParams.get("utm_campaign") || null;
    const utmContent = searchParams.get("utm_content") || null;
    const utmTerm = searchParams.get("utm_term") || null;
    const source = utmMedium === "cpc" || utmSource === "google" ? "paid" : utmSource ? "referral" : "organic";

    const referrerPage = document.referrer ? new URL(document.referrer).pathname : sessionStorage.getItem("dw_prev_page") || null;

    const leadData = {
      name: fullName,
      email,
      phone: phoneNumber.trim(),
      concern: defaultConcern || "general",
      form_type: "session" as const,
      postal_code: postalCode || null,
      city: null,
      country: country.toUpperCase(),
      language,
      source,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      tracking_code: referrerPage,
      notes: [bestTime && `Best time: ${bestTime}`, message].filter(Boolean).join(" | ") || null,
      user_agent: navigator.userAgent || null,
    };

    try {
      const { error: dbError } = await supabase.from("leads").insert(leadData as any);
      if (dbError) {
        console.error("Lead save error:", dbError);
        logFormSubmission({ formType: "session", status: "error", errorMessage: dbError.message, formData: { name: leadData.name } });
        const userMsg = dbError.message?.includes("duplicate")
          ? (isEN ? "This inquiry was already submitted. Please try with different details." : "Diese Anfrage wurde bereits gesendet. Bitte versuchen Sie es mit anderen Angaben.")
          : (isEN ? "A technical error occurred while sending. Please try again or contact us directly." : "Beim Senden ist ein technischer Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.");
        toast.error(userMsg);
        setIsSubmitting(false);
        return;
      }
      logFormSubmission({ formType: "session", status: "success", formData: { name: leadData.name } });
      trackFormConversion("session");
      setSubmitted(true);
      toast.success(isEN ? "Thank you! We will contact you shortly." : "Vielen Dank! Wir melden uns in Kürze bei Ihnen.");

      supabase.functions.invoke("notify-lead", { body: { lead: leadData } }).catch(err => console.error("Slack error:", err));
      sendLeadEmails({
        name: leadData.name,
        email,
        phone: leadData.phone,
        concern: defaultConcern || "general",
        formType: "contact",
        city: undefined,
        country: country.toUpperCase(),
        language: country === "int" ? "en" : "de",
        notes: leadData.notes || undefined,
        source,
        utmSource,
        utmMedium,
        utmCampaign,
        bestTime: bestTime || undefined,
        message: message || undefined,
        postalCode: postalCode || undefined,
        countryName: country === "ch" ? "Schweiz" : country === "int" ? "International" : "Deutschland",
      }).catch(err => console.error("Email error:", err));
    } catch (err) {
      console.error("Lead save error:", err);
      toast.error(isEN ? "An error occurred. Please try again." : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-lg p-4 mb-3">
          <CheckCircle className="w-8 h-8 text-[#2E7D32] mx-auto mb-2" />
          <h3 className="text-base font-bold text-[#2E7D32] mb-1">
            {isEN ? "✓ Your request was sent." : "✓ Ihre Anfrage wurde gesendet."}
          </h3>
          <p className="text-sm text-[#2E7D32]/80">
            {isEN ? "We'll be in touch within 24 hours." : "Wir melden uns innerhalb von 24 Stunden."}
          </p>
        </div>
        <Button disabled className="w-full bg-gray-400 text-white font-semibold py-3 cursor-not-allowed">
          {isEN ? "Sent ✓" : "Gesendet ✓"}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2.5">
      {/* Full Name */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Full Name" : "Vor- und Nachname"} *</label>
        <input type="text" name="fullName" required autoComplete="name" className={inputClasses} />
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">E-Mail *</label>
        <input type="email" name="email" required autoComplete="email" className={inputClasses} />
      </div>

      {/* Phone + Postal Code */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Phone incl. area code" : "Tel. mit Vorwahl"} *</label>
          <input
            type="tel"
            required
            autoComplete="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Postal code / City" : "PLZ / Ort"} *</label>
          <input type="text" name="postalCode" required autoComplete="postal-code" className={inputClasses} />
        </div>
      </div>

      {/* Best time to reach */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Available from – to" : "Erreichbar von – bis"}</label>
        <input type="text" name="bestTime" autoComplete="off" className={inputClasses} />
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Your concern / Message" : "Ihr Anliegen / Nachricht"}</label>
        <textarea name="message" rows={2} className={`${inputClasses} resize-none`} />
      </div>

      {/* GDPR */}
      <div className="border border-border bg-white p-2.5 space-y-1.5">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            name="gdprConsent"
            checked={gdprConsent}
            onChange={(e) => setGdprConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
          />
          <span className="text-xs text-foreground leading-snug">
            {isEN ? (
              <>
                I have read the{" "}
                <Link to={getPath("privacy", language, country)} className="underline hover:text-primary">privacy policy</Link>{" "}
                and agree to be contacted. *
              </>
            ) : (
              <>
                Ich habe die{" "}
                <Link to={getPath("privacy", language, country)} className="underline hover:text-primary">Datenschutzerklärung</Link>{" "}
                gelesen und stimme der Kontaktaufnahme zu. *
              </>
            )}
          </span>
        </label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold py-3"
      >
        {isSubmitting
          ? (isEN ? "Sending..." : "Wird gesendet...")
          : (isEN ? "Request without obligation" : "Unverbindlich anfragen")}
      </Button>

      <p className="text-[10px] text-muted-foreground text-center">
        {isEN
          ? "We reply within 24 hours — or use the WhatsApp button for a quicker response."
          : "Wir antworten innerhalb von 24 Stunden — oder nutzen Sie den WhatsApp-Button für eine schnellere Antwort."}
      </p>
    </form>
  );
}
