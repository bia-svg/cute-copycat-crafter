import { useState, useCallback } from "react";
import { trackFormConversion } from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { sendLeadEmails } from "@/lib/leadEmails";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getPath } from "@/lib/routes";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, MapPin, Shield, Users, Star, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { PHONE_COUNTRIES } from "@/data/phoneCountries";

/* ── Seminar dates ── */
const SEMINAR_DATES = {
  ch: [
    { date: "Mo-Sa, 15.-20. Juni 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "limited" as const },
    { date: "Mo-Sa, 07.-12. Sept. 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "available" as const },
    { date: "Mo-Sa, 23.-28. Nov. 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "available" as const },
  ],
  de: [
    { date: "Mo-Sa, 11.-16. Mai 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "limited" as const },
    { date: "Mo-Sa, 06.-11. Juli 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "available" as const },
    { date: "Mo-Sa, 14.-19. Sept. 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "available" as const },
    { date: "Mo-Sa, 16.-21. Nov. 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "available" as const },
  ],
};

type SeminarCountry = "ch" | "de" | "";

export default function SeminarAnmeldung() {
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const [searchParams] = useSearchParams();

  const [seminarCountry, setSeminarCountry] = useState<SeminarCountry>(
    searchParams.get("country") === "de" ? "de" : searchParams.get("country") === "ch" ? "ch" : ""
  );
  const [selectedDate, setSelectedDate] = useState(searchParams.get("date") || "");
  const [submitted, setSubmitted] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);

  // Phone
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

  const dates = seminarCountry ? SEMINAR_DATES[seminarCountry] : [];
  const selectedDateObj = dates.find(d => d.date === selectedDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) {
      toast.error(isEN ? "Please accept the privacy policy to continue." : "Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren.");
      return;
    }
    if (!selectedDate) {
      toast.error(isEN ? "Please select a seminar date." : "Bitte wählen Sie einen Seminartermin.");
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const firstName = (formData.get("firstName") as string) || "";
    const lastName = (formData.get("lastName") as string) || "";
    const email = (formData.get("email") as string) || "";
    const message = (formData.get("message") as string) || "";

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
      concern: "seminar",
      form_type: "seminar",
      city: seminarCountry === "ch" ? "Schweiz" : "Deutschland",
      country: country.toUpperCase(),
      language: language,
      source,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      tracking_code: referrerPage,
      notes: [`Seminar: ${selectedDate}`, selectedDateObj?.location, message].filter(Boolean).join(" | ") || null,
    };

    try {
      const { error: dbError } = await supabase.from("leads").insert(leadData as any);
      if (dbError) console.error("Lead save error:", dbError);
      await supabase.functions.invoke("notify-lead", { body: { lead: leadData } });

      // Send emails (notification to David + confirmation to submitter)
      await sendLeadEmails({
        name: leadData.name,
        email,
        phone: leadData.phone,
        concern: "Seminar-Anmeldung",
        formType: "seminar",
        city: leadData.city || undefined,
        country: country.toUpperCase(),
        language: country === "int" ? "en" : "de",
        notes: leadData.notes || undefined,
        source,
        utmSource,
        utmMedium,
        utmCampaign,
      });
    } catch (err) {
      console.error("Lead notification error:", err);
    }

    trackFormConversion("seminar", selectedDate);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success(isEN ? "Thank you! We will confirm your spot shortly." : "Vielen Dank! Wir bestätigen Ihren Platz in Kürze.");
  };

  const inputClasses = "w-full border border-border px-3 py-2.5 text-sm bg-white focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C] outline-none transition-colors";
  const basePath = getPath("home", language, country);

  return (
    <>
      <SEO
        titleDE="Seminar-Anmeldung – Aktiv-Hypnose©"
        titleEN="Register for Seminar – Aktiv-Hypnose©"
        descriptionDE="Melden Sie sich für das 6-tägige Aktiv-Hypnose© Ausbildungsseminar an. Wählen Sie Land und Termin."
        descriptionEN="Register for the 6-day Aktiv-Hypnose© training seminar. Choose your country and date."
        pageKey="seminarRegistration"
      />
      <Breadcrumbs items={[
        { name: "Home", path: basePath },
        { name: isEN ? "Training" : "Ausbildung", path: getPath("training", language, country) },
        { name: isEN ? "Register for Seminar" : "Seminar-Anmeldung", path: getPath("seminarRegistration", language, country) },
      ]} />

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full mb-4">
                <GraduationCap className="w-3.5 h-3.5" />
                {isEN ? "6-Day Intensive Training" : "6-Tage Intensiv-Ausbildung"}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-3" style={{ fontFamily: "Georgia, serif" }}>
                {isEN ? "Register for Seminar" : "Seminar-Anmeldung"}
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                {isEN
                  ? "Choose your preferred country and date, then fill in your details. We'll confirm your spot within 24 hours."
                  : "Wählen Sie Ihr bevorzugtes Land und Datum, dann füllen Sie Ihre Daten aus. Wir bestätigen Ihren Platz innerhalb von 24 Stunden."}
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-16 border border-border bg-[#f4f3ef] rounded-lg">
                <CheckCircle className="w-14 h-14 text-[#2E7D32] mx-auto mb-4" />
                <h2 className="text-xl font-bold text-[#1B3A5C] mb-2">{isEN ? "Registration Received!" : "Anmeldung eingegangen!"}</h2>
                <p className="text-muted-foreground mb-1">{isEN ? "We will confirm your spot within 24 hours." : "Wir bestätigen Ihren Platz innerhalb von 24 Stunden."}</p>
                {selectedDate && <p className="text-sm font-semibold text-[#1B3A5C] mt-3">{selectedDate}</p>}
              </div>
            ) : (
              <>
                {/* STEP 1 — Country */}
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-[#1B3A5C] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#1B3A5C] text-white text-xs flex items-center justify-center">1</span>
                    {isEN ? "Choose Country" : "Land wählen"}
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      { key: "ch" as const, flag: "🇨🇭", label: isEN ? "Switzerland" : "Schweiz", sub: "Eschenbach (Zürichsee)" },
                      { key: "de" as const, flag: "🇩🇪", label: isEN ? "Germany" : "Deutschland", sub: "Augsburg" },
                    ]).map(c => (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => { setSeminarCountry(c.key); setSelectedDate(""); }}
                        className={`border p-4 text-left transition-all ${
                          seminarCountry === c.key
                            ? "border-[#1B3A5C] bg-[#1B3A5C]/5 ring-1 ring-[#1B3A5C]"
                            : "border-border bg-white hover:border-[#1B3A5C]/40"
                        }`}
                      >
                        <span className="text-2xl">{c.flag}</span>
                        <p className="font-semibold text-sm text-[#1B3A5C] mt-1">{c.label}</p>
                        <p className="text-xs text-muted-foreground">{c.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* STEP 2 — Date (shows when country selected) */}
                {seminarCountry && (
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-[#1B3A5C] mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#1B3A5C] text-white text-xs flex items-center justify-center">2</span>
                      {isEN ? "Select Date" : "Termin wählen"}
                    </h2>
                    <div className="space-y-2">
                      {dates.map((d, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedDate(d.date)}
                          className={`w-full border p-4 text-left transition-all flex items-center justify-between ${
                            selectedDate === d.date
                              ? "border-[#2E7D32] bg-[#E8F5E9]/50 ring-1 ring-[#2E7D32]"
                              : "border-border bg-white hover:border-[#2E7D32]/40"
                          }`}
                        >
                          <div>
                            <p className="flex items-center gap-2 font-semibold text-sm text-[#1B3A5C]">
                              <Calendar className="w-4 h-4" /> {d.date}
                            </p>
                            <p className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <MapPin className="w-3.5 h-3.5" /> {d.location}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${d.status === "limited" ? "bg-[#FFF3E0] text-[#E65100]" : "bg-[#E8F5E9] text-[#2E7D32]"}`}>
                              {d.status === "limited" ? (isEN ? "Limited" : "Letzte Plätze") : (isEN ? "Available" : "Verfügbar")}
                            </span>
                            {selectedDate === d.date && <CheckCircle className="w-5 h-5 text-[#2E7D32]" />}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                      <Users className="w-3.5 h-3.5" />
                      {isEN ? "Small groups · Max. 12 participants" : "Kleine Gruppen · Max. 12 Teilnehmer"}
                    </div>
                  </div>
                )}

                {/* STEP 3 — Form (shows when date selected) */}
                {selectedDate && (
                  <div className="border border-border p-5 sm:p-6 bg-[#f4f3ef]">
                    <h2 className="text-sm font-semibold text-[#1B3A5C] mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#1B3A5C] text-white text-xs flex items-center justify-center">3</span>
                      {isEN ? "Your Details" : "Ihre Daten"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4 relative z-[51]">
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

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Phone" : "Telefonnummer"} *</label>
                        <div className="flex">
                          <select
                            value={phoneCountry}
                            onChange={(e) => { setPhoneCountry(e.target.value); setPhoneNumber(""); }}
                            className="border border-r-0 border-border px-2 py-2.5 text-sm bg-card focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C] outline-none transition-colors rounded-l-md w-[110px] shrink-0 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_6px_center] pr-5 cursor-pointer"
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

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Message (optional)" : "Nachricht (optional)"}</label>
                        <textarea name="message" rows={3} className={`${inputClasses} resize-none`} />
                      </div>

                      {/* DSGVO */}
                      <div className="border border-border bg-white p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="pt-0.5">
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={gdprConsent}
                              onClick={() => setGdprConsent(!gdprConsent)}
                              className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${gdprConsent ? "bg-[#2E7D32] border-[#2E7D32]" : "bg-white border-border hover:border-[#1B3A5C]"}`}
                            >
                              {gdprConsent && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-foreground leading-relaxed">
                            {isEN ? (
                              <>
                                I agree that my personal data will be processed for the purpose of seminar registration. I have read and accept the{" "}
                                <Link to={getPath("privacy", language, country)} className="text-[#1B3A5C] underline hover:text-[#2E7D32]">privacy policy</Link>. *
                              </>
                            ) : (
                              <>
                                Ich bin damit einverstanden, dass meine personenbezogenen Daten zum Zweck der Seminar-Anmeldung verarbeitet werden. Ich habe die{" "}
                                <Link to={getPath("privacy", language, country)} className="text-[#1B3A5C] underline hover:text-[#2E7D32]">Datenschutzerklärung</Link> gelesen und akzeptiere diese. *
                              </>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Shield className="w-3.5 h-3.5 text-[#2E7D32]" />
                          {isEN ? "Your data is processed in accordance with GDPR." : "Ihre Daten werden DSGVO-konform verarbeitet."}
                        </div>
                      </div>

                      <div className="pb-20 md:pb-0">
                      <Button
                        type="submit"
                        disabled={!gdprConsent}
                        className={`w-full font-semibold py-3 text-white transition-colors relative z-[51] ${gdprConsent ? "bg-[#2E7D32] hover:bg-[#1B5E20]" : "bg-gray-400 cursor-not-allowed"}`}
                      >
                        {isEN ? "Register for Seminar" : "Seminar-Anmeldung absenden"}
                      </Button>
                      </div>

                      <p className="text-[10px] text-muted-foreground text-center">
                        {isEN
                          ? "Your data will only be used to process your registration. We will not share your data with third parties."
                          : "Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anmeldung verwendet. Wir geben Ihre Daten nicht an Dritte weiter."}
                      </p>
                    </form>
                  </div>
                )}

                {/* Trust */}
                <div className="flex items-center justify-center gap-1 mt-8 text-muted-foreground text-sm">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  5.0 — 263 Google {isEN ? "Reviews" : "Bewertungen"}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
