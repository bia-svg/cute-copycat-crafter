import { useState, useCallback } from "react";
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
import { PHONE_COUNTRIES } from "@/data/phoneCountries";

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
  const [selectedConcern, setSelectedConcern] = useState(defaultConcern || "");
  const defaultPhoneCountry = country === "ch" ? "+41" : "+49";
  const [phoneCountry, setPhoneCountry] = useState(defaultPhoneCountry);
  const [phoneNumber, setPhoneNumber] = useState("");

  const selectedPhoneCountry = PHONE_COUNTRIES.find(c => c.code === phoneCountry) || PHONE_COUNTRIES[0];

  const handlePhoneChange = useCallback((value: string) => {
    const cleaned = value.replace(/[^\d\s]/g, "");
    const digitsOnly = cleaned.replace(/\s/g, "");
    if (digitsOnly.length <= selectedPhoneCountry.maxDigits) {
      setPhoneNumber(cleaned);
    }
  }, [selectedPhoneCountry.maxDigits]);

  const inputClasses = "w-full border border-border px-3 py-2 text-sm bg-white focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C] outline-none transition-colors";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstName = ((formData.get("firstName") as string) || "").trim();
    const lastName = ((formData.get("lastName") as string) || "").trim();
    const email = ((formData.get("email") as string) || "").trim();
    const postalCity = ((formData.get("postalCode") as string) || "").trim();
    const message = ((formData.get("message") as string) || "").trim();
    const bestTime = ((formData.get("bestTime") as string) || "").trim();
    const location = ((formData.get("location") as string) || "").trim();
    const phone = phoneNumber.trim();

    const fail = (selector: string, msgDE: string, msgEN: string) => {
      form.querySelector<HTMLElement>(selector)?.focus();
      toast.error(isEN ? msgEN : msgDE);
    };

    if (!firstName) return fail('input[name="firstName"]', 'Bitte geben Sie Ihren Vornamen ein.', 'Please enter your first name.');
    if (!lastName) return fail('input[name="lastName"]', 'Bitte geben Sie Ihren Nachnamen ein.', 'Please enter your last name.');
    if (!email) return fail('input[name="email"]', 'Bitte geben Sie Ihre E-Mail ein.', 'Please enter your email address.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail('input[name="email"]', 'Bitte geben Sie eine gültige E-Mail ein.', 'Please enter a valid email address.');
    if (!phone) return fail('input[type="tel"]', 'Bitte geben Sie Ihre Telefonnummer ein.', 'Please enter your phone number.');
    if (!selectedConcern) return fail('select[name="concern"]', 'Bitte wählen Sie Ihr Anliegen aus.', 'Please select your concern.');
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
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone: `${phoneCountry} ${phoneNumber}`.trim(),
      concern: selectedConcern,
      form_type: "session" as const,
      postal_code: postalCity.split(/\s+/)[0] || null,
      city: postalCity.split(/\s+/).slice(1).join(" ") || location || null,
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
        logFormSubmission({ formType: "session", status: "error", errorMessage: dbError.message, formData: { name: leadData.name, concern: leadData.concern } });
        const userMsg = dbError.message?.includes("duplicate")
          ? (isEN ? "This inquiry was already submitted. Please try with different details." : "Diese Anfrage wurde bereits gesendet. Bitte versuchen Sie es mit anderen Angaben.")
          : (isEN ? "A technical error occurred while sending. Please try again or contact us directly." : "Beim Senden ist ein technischer Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.");
        toast.error(userMsg);
        setIsSubmitting(false);
        return;
      }
      logFormSubmission({ formType: "session", status: "success", formData: { name: leadData.name, concern: leadData.concern } });
      trackFormConversion("session");
      setSubmitted(true);
      toast.success(isEN ? "Thank you! We will contact you shortly." : "Vielen Dank! Wir melden uns in Kürze bei Ihnen.");

      supabase.functions.invoke("notify-lead", { body: { lead: leadData } }).catch(err => console.error("Slack error:", err));
      sendLeadEmails({
        name: leadData.name,
        email,
        phone: leadData.phone,
        concern: selectedConcern,
        formType: "contact",
        city: leadData.city || undefined,
        country: country.toUpperCase(),
        language: country === "int" ? "en" : "de",
        notes: leadData.notes || undefined,
        source,
        utmSource,
        utmMedium,
        utmCampaign,
        bestTime: bestTime || undefined,
        message: message || undefined,
        postalCode: postalCity.split(/\s+/)[0] || undefined,
        cityName: postalCity.split(/\s+/).slice(1).join(" ") || undefined,
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
      <div className="text-center py-8">
        <CheckCircle className="w-10 h-10 text-[#2E7D32] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-primary mb-1">{isEN ? "Thank You!" : "Vielen Dank!"}</h3>
        <p className="text-sm text-muted-foreground">{isEN ? "We will contact you shortly." : "Wir melden uns in Kürze bei Ihnen."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "First Name" : "Vorname"} *</label>
          <input type="text" name="firstName" required autoComplete="given-name" className={inputClasses} />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Last Name" : "Nachname"} *</label>
          <input type="text" name="lastName" required autoComplete="family-name" className={inputClasses} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">E-Mail *</label>
        <input type="email" name="email" required autoComplete="email" className={inputClasses} />
      </div>

      {/* Phone + Postal Code */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Phone" : "Telefonnummer"} *</label>
          <div className="flex">
            <select
              value={phoneCountry}
              onChange={(e) => { setPhoneCountry(e.target.value); setPhoneNumber(""); }}
              className="border border-r-0 border-border px-2 py-2.5 text-sm bg-card focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C] outline-none transition-colors w-[110px] shrink-0 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_6px_center] pr-5 cursor-pointer"
            >
              {PHONE_COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>{c.flag} {c.iso} {c.code}</option>
              ))}
            </select>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder={selectedPhoneCountry.placeholder}
              maxLength={selectedPhoneCountry.maxDigits + 4}
              className={`${inputClasses} border-l-0`}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {isEN ? `Max ${selectedPhoneCountry.maxDigits} digits` : `Max. ${selectedPhoneCountry.maxDigits} Ziffern`}
          </p>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Postal Code / City" : "PLZ / Ortschaft"}</label>
          <input type="text" name="postalCode" autoComplete="postal-code" className={inputClasses} />
        </div>
      </div>

      {/* Concern */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "What is your concern?" : "Was ist Ihr Anliegen?"} *</label>
        <select name="concern" className={inputClasses} value={selectedConcern} onChange={(e) => setSelectedConcern(e.target.value)}>
          <option value="">{isEN ? "Please select..." : "Bitte wählen..."}</option>
          <option value="smoking">{isEN ? "Stop Smoking" : "Raucherentwöhnung"}</option>
          <option value="anxiety">{isEN ? "Anxiety & Phobias" : "Ängste & Phobien"}</option>
          <option value="weight">{isEN ? "Weight Loss" : "Abnehmen"}</option>
          <option value="stress">{isEN ? "Stress & Burnout" : "Stress & Burnout"}</option>
          <option value="depression">{isEN ? "Depression & Trauma" : "Depressionen & Traumata"}</option>
          <option value="children">{isEN ? "Children & Teens" : "Kinder & Jugendliche"}</option>
          <option value="corporate">{isEN ? "Corporate Coaching" : "Firmencoaching"}</option>
          <option value="other">{isEN ? "Other" : "Sonstiges"}</option>
        </select>
      </div>

      {/* Preferred Location */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Preferred Location" : "Bevorzugter Standort"}</label>
        <select name="location" className={inputClasses}>
          <option value="">{isEN ? "Please select..." : "Bitte wählen..."}</option>
          <option value="zurich">Zürich — 5 Elements TCM (CH)</option>
          <option value="eschenbach">Eschenbach — Fit und Gesund (CH)</option>
          <option value="augsburg">Augsburg — Regus HELIO (DE)</option>
          <option value="online">{isEN ? "Online Session" : "Online-Sitzung"}</option>
        </select>
      </div>

      {/* Best time to reach */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Best time to reach you?" : "Wann sind Sie am besten erreichbar?"}</label>
        <input type="text" name="bestTime" placeholder={isEN ? "e.g. mornings, after 14:00" : "z.B. vormittags, nach 14:00 Uhr"} className={inputClasses} />
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Message" : "Kommentar oder Nachricht"}</label>
        <textarea name="message" rows={3} className={`${inputClasses} resize-none`} />
      </div>

      {/* GDPR */}
      <div className="border border-border bg-white p-3 space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="gdprConsent"
            checked={gdprConsent}
            onChange={(e) => setGdprConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
          />
          <span className="text-xs text-foreground leading-relaxed">
            {isEN ? (
              <>
                I agree that my personal data will be processed for the purpose of contacting me. I have read and accept the{" "}
                <Link to={getPath("privacy", language, country)} className="underline hover:text-primary">privacy policy</Link>. *
              </>
            ) : (
              <>
                Ich stimme zu, dass meine personenbezogenen Daten zum Zweck der Kontaktaufnahme verarbeitet werden. Ich habe die{" "}
                <Link to={getPath("privacy", language, country)} className="underline hover:text-primary">Datenschutzerklärung</Link> gelesen und akzeptiert. *
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
          : (isEN ? "Request Your Free Consultation" : "Kostenloses Erstgespräch anfragen")}
      </Button>
    </form>
  );
}
