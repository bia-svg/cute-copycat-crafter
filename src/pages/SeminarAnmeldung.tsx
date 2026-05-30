import { useState, useEffect, useRef } from "react";
import { trackFormConversion } from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { sendLeadEmails } from "@/lib/leadEmails";
import { logFormSubmission } from "@/lib/formSubmissionLog";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getPath } from "@/lib/routes";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, MapPin, Shield, Users, Star, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { getAttribution, classifySource } from "@/lib/attribution";


/* ── Seminar dates ── */
const SEMINAR_DATES_ALL = {
  ch: [
    { date: "Mo-Sa, 15.-20. Juni 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "limited" as const },
    { date: "Mo-Sa, 07.-12. Sept. 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "available" as const },
    // Temporär ausgeblendet — kann durch Entfernen von `hidden: true` wieder eingeblendet werden
    { date: "Mo-Sa, 23.-28. Nov. 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "available" as const, hidden: true },
  ],
  de: [
    // Archiviert: Mo-Sa, 11.-16. Mai 2026 — Hotel am Alten Park, Augsburg
    { date: "Mo-Sa, 06.-11. Juli 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "limited" as const },
    { date: "Mo-Sa, 14.-19. Sept. 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "available" as const },
    // Temporär ausgeblendet — kann durch Entfernen von `hidden: true` wieder eingeblendet werden
    { date: "Mo-Sa, 16.-21. Nov. 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "available" as const, hidden: true },
  ],
};

const SEMINAR_DATES = {
  ch: SEMINAR_DATES_ALL.ch.filter((d) => !(d as { hidden?: boolean }).hidden),
  de: SEMINAR_DATES_ALL.de.filter((d) => !(d as { hidden?: boolean }).hidden),
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [agbConsent, setAgbConsent] = useState(false);
  const [seminarCounts, setSeminarCounts] = useState<Record<string, number>>({});
  const [showAllDates, setShowAllDates] = useState(false);
  const INITIAL_DATES_VISIBLE = 2;

  // Fetch seminar registration counts for early bird logic
  useEffect(() => {
    supabase.functions.invoke("seminar-counts").then(({ data }) => {
      if (data?.counts) setSeminarCounts(data.counts);
    }).catch(() => {});
  }, []);

  const EARLY_BIRD_THRESHOLD = 3;
  // Check if any seminar for a country still qualifies for early bird (≤3 registrations)
  const hasEarlyBirdForCountry = (countryKey: "ch" | "de") => {
    const countryDates = SEMINAR_DATES[countryKey];
    return countryDates.some(d => (seminarCounts[`${countryKey}::${d.date}`] || 0) < EARLY_BIRD_THRESHOLD);
  };
  const hasEarlyBirdForDate = (countryKey: "ch" | "de", date: string) => {
    return (seminarCounts[`${countryKey}::${date}`] || 0) < EARLY_BIRD_THRESHOLD;
  };

  // Phone
  const [phoneNumber, setPhoneNumber] = useState("");

  const dates = seminarCountry ? SEMINAR_DATES[seminarCountry] : [];
  const selectedDateObj = dates.find(d => d.date === selectedDate);
  const visibleDates = showAllDates ? dates : dates.slice(0, INITIAL_DATES_VISIBLE);
  const hiddenDatesCount = Math.max(0, dates.length - INITIAL_DATES_VISIBLE);

  // Auto-expand if a preselected date is in the hidden range
  useEffect(() => {
    if (selectedDate && dates.length > INITIAL_DATES_VISIBLE) {
      const idx = dates.findIndex(d => d.date === selectedDate);
      if (idx >= INITIAL_DATES_VISIBLE) setShowAllDates(true);
    }
  }, [selectedDate, seminarCountry]);

  // Smooth-scroll Step 3 / form into view after a date is selected (skip on initial mount / URL preselect)
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (!selectedDate) return;
    const t = setTimeout(() => {
      const el = document.getElementById("seminar-step-3");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(t);
  }, [selectedDate]);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstName = ((formData.get("firstName") as string) || "").trim();
    const lastName = ((formData.get("lastName") as string) || "").trim();
    const email = ((formData.get("email") as string) || "").trim();
    const street = ((formData.get("street") as string) || "").trim();
    const postalCode = ((formData.get("postalCode") as string) || "").trim();
    const cityField = ((formData.get("city") as string) || "").trim();
    const countryField = ((formData.get("countryField") as string) || "").trim();
    const dobDay = ((formData.get("dobDay") as string) || "").trim();
    const dobMonth = ((formData.get("dobMonth") as string) || "").trim();
    const dobYear = ((formData.get("dobYear") as string) || "").trim();
    const profession = ((formData.get("profession") as string) || "").trim();
    const message = ((formData.get("message") as string) || "").trim();
    const phone = phoneNumber.trim();

    const fail = (selector: string, msgDE: string, msgEN: string) => {
      form.querySelector<HTMLElement>(selector)?.focus();
      toast.error(isEN ? msgEN : msgDE);
    };

    if (!gdprConsent) return fail('button[role="checkbox"]', 'Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren.', 'Please accept the privacy policy to continue.');
    if (!agbConsent) return fail('button[role="checkbox"]', 'Bitte akzeptieren Sie die AGB, um fortzufahren.', 'Please accept the terms and conditions to continue.');
    if (!selectedDate) return toast.error(isEN ? 'Please select a seminar date.' : 'Bitte wählen Sie einen Seminartermin.');
    if (!firstName) return fail('input[name="firstName"]', 'Bitte geben Sie Ihren Vornamen ein.', 'Please enter your first name.');
    if (!lastName) return fail('input[name="lastName"]', 'Bitte geben Sie Ihren Nachnamen ein.', 'Please enter your last name.');
    if (!dobDay || !dobMonth || !dobYear) return fail('input[name="dobDay"]', 'Bitte geben Sie Ihr Geburtsdatum ein.', 'Please enter your date of birth.');
    if (!street) return fail('input[name="street"]', 'Bitte geben Sie Strasse und Hausnummer ein.', 'Please enter your street and number.');
    if (!postalCode) return fail('input[name="postalCode"]', 'Bitte geben Sie die Postleitzahl ein.', 'Please enter your postal code.');
    if (!cityField) return fail('input[name="city"]', 'Bitte geben Sie den Ort ein.', 'Please enter your city.');
    if (!countryField) return fail('input[name="countryField"]', 'Bitte geben Sie das Land ein.', 'Please enter your country.');
    if (!email) return fail('input[name="email"]', 'Bitte geben Sie Ihre E-Mail ein.', 'Please enter your email address.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail('input[name="email"]', 'Bitte geben Sie eine gültige E-Mail ein.', 'Please enter a valid email address.');
    if (!phone) return fail('input[type="tel"]', 'Bitte geben Sie Ihre Telefonnummer ein.', 'Please enter your phone number.');
    if (!profession) return fail('input[name="profession"]', 'Bitte geben Sie Ihren Beruf ein.', 'Please enter your profession.');

    setIsSubmitting(true);

    const dobStr = dobDay && dobMonth && dobYear ? `${dobDay}.${dobMonth}.${dobYear}` : "";
    const fullAddress = [street, `${postalCode} ${cityField}`.trim(), countryField].filter(Boolean).join(", ");

    const attribution = getAttribution();
    const utmSource = attribution.utm_source;
    const utmMedium = attribution.utm_medium;
    const utmCampaign = attribution.utm_campaign;
    const utmContent = attribution.utm_content;
    const utmTerm = attribution.utm_term;
    const source = classifySource(attribution);

    const referrerPage = document.referrer ? new URL(document.referrer).pathname : sessionStorage.getItem("dw_prev_page") || null;

    // Get registration number
    let regNumber = "";
    try {
      const { data: regData } = await supabase.functions.invoke("generate-registration-number");
      regNumber = regData?.registrationNumber ? String(regData.registrationNumber) : "";
    } catch (err) {
      console.error("Registration number error:", err);
    }

    const leadData = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone: phoneNumber.trim(),
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
      notes: [`Reg#${regNumber}`, `Seminar: ${selectedDate}`, selectedDateObj?.location, `Beruf: ${profession}`, `Geb: ${dobStr}`, `Adresse: ${fullAddress}`, message].filter(Boolean).join(" | ") || null,
      user_agent: navigator.userAgent || null,
    };

    try {
      const { error: dbError } = await supabase.from("leads").insert(leadData as any);
      if (dbError) {
        console.error("Lead save error:", dbError);
        logFormSubmission({ formType: "seminar", status: "error", errorMessage: dbError.message, formData: { name: leadData.name, concern: leadData.concern, city: leadData.city, country: leadData.country } });
        toast.error(isEN ? "An error occurred. Please try again." : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
        setIsSubmitting(false);
        return;
      }
      logFormSubmission({ formType: "seminar", status: "success", formData: { name: leadData.name, city: leadData.city, country: leadData.country } });

      // Show success immediately
      trackFormConversion("seminar", selectedDate);
      setRegistrationNumber(regNumber);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success(isEN ? "Thank you! We will confirm your spot shortly." : "Vielen Dank! Wir bestätigen Ihren Platz in Kürze.");

      // Fire notifications in background
      supabase.functions.invoke("notify-lead", { body: { lead: leadData } }).catch(err => console.error("Slack error:", err));
      // Festpreis: 2.290 für DE und CH
      const isCH = seminarCountry === "ch";
      const bookedPrice = isCH ? "CHF 2.290.-" : "€2.290,-";
      const priceType = "Festpreis";
      const regularPrice = isCH ? "CHF 2.290.-" : "€2.290,-";
      const savingsAmount = undefined;


      sendLeadEmails({
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
        seminarDate: selectedDate,
        seminarLocation: selectedDateObj?.location || undefined,
        message: message || undefined,
        address: fullAddress || undefined,
        street: street || undefined,
        postalCode: postalCode || undefined,
        cityName: cityField || undefined,
        countryName: countryField || undefined,
        dateOfBirth: dobStr || undefined,
        profession: profession || undefined,
        registrationNumber: regNumber || undefined,
        bookedPrice,
        priceType,
        regularPrice: undefined,
        savingsAmount,
      }).catch(err => console.error("Email error:", err));
    } catch (err) {
      console.error("Lead save error:", err);
      toast.error(isEN ? "An error occurred. Please try again." : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full border border-border px-3 py-1.5 text-sm bg-white focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C] outline-none transition-colors";
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
        <div className="container-main py-3 lg:py-4">
          <div className="max-w-3xl mx-auto">
            {/* Header — compact */}
            <div className="text-center mb-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full mb-2">
                <GraduationCap className="w-3 h-3" />
                {isEN ? "6-Day Intensive Training" : "6-Tage Intensiv-Ausbildung"}
              </div>
              <h1 className="text-xl sm:text-2xl font-light text-[#1B3A5C] mb-2 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                {isEN ? "Register for Seminar" : "Seminar-Anmeldung"}
              </h1>
              <p className="text-sm sm:text-[15px] font-normal text-[#1B5E20] tracking-wide mt-3">
                {isEN ? "An intensive comprehensive program for those who want to learn more." : "Ein intensives Komplettprogramm für Menschen, die mehr lernen möchten."}
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-16 border border-border bg-[#f4f3ef] rounded-lg">
                <CheckCircle className="w-14 h-14 text-[#2E7D32] mx-auto mb-4" />
                <h2 className="text-xl font-light text-[#1B3A5C] mb-2 tracking-tight">{isEN ? "Registration Received!" : "Anmeldung eingegangen!"}</h2>
                {registrationNumber && (
                  <p className="text-lg font-semibold text-[#2E7D32] mb-3">
                    {isEN ? "Registration No." : "Anmelde-Nr."}: {registrationNumber}
                  </p>
                )}
                {selectedDate && <p className="text-sm font-semibold text-[#1B3A5C] mb-4">{selectedDate}</p>}
                <p className="text-muted-foreground mb-1">
                  {isEN ? "We will confirm your spot within 24 hours." : "Wir bestätigen Ihren Platz innerhalb von 24 Stunden."}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isEN ? "You will receive a written invoice by email." : "Sie erhalten eine schriftliche Rechnung per E-Mail."}
                </p>
              </div>
            ) : (
              <>
                {/* STEPS 1 + 2 wrapper — soft silver-grey backdrop, compact */}
                <div className="mb-4 rounded-2xl bg-[#FAF8F4] border border-[#EDE8DF] p-3 sm:p-4">
                {/* STEP 1 — Country */}
                <div className="mb-3.5">
                  <h2 className="text-sm font-light text-[#1B3A5C] mb-2 flex items-center gap-2 tracking-tight">
                    <span className="w-5 h-5 rounded-full bg-[#1B3A5C] text-white text-[11px] flex items-center justify-center">1</span>
                    {isEN ? "Choose Country" : "Land wählen"}
                  </h2>
                  <div className="grid grid-cols-2 gap-2.5">
                    {([
                      { key: "de" as const, flag: "🇩🇪", label: isEN ? "Germany" : "Deutschland" },
                      { key: "ch" as const, flag: "🇨🇭", label: isEN ? "Switzerland" : "Schweiz" },
                    ]).map(c => {
                      const isActive = seminarCountry === c.key;
                      const activeClasses = c.key === "de"
                        ? "border-[#1B3A5C]/60 bg-[#E6EEF7] ring-1 ring-[#1B3A5C]/30"
                        : "border-[#2E7D32]/50 bg-[#E8F5E9] ring-1 ring-[#2E7D32]/25";
                      const hoverClasses = c.key === "de"
                        ? "hover:border-[#1B3A5C]/40"
                        : "hover:border-[#2E7D32]/40";
                      return (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => { setSeminarCountry(c.key); setSelectedDate(""); }}
                          className={`border rounded-xl px-3 py-1.5 text-left transition-all flex items-center gap-2.5 ${
                            isActive ? activeClasses : `border-[#E2E8EE] bg-white ${hoverClasses}`
                          }`}
                        >
                          <span className="text-lg leading-none">{c.flag}</span>
                          <p className="font-semibold text-sm text-[#1B3A5C] leading-tight">{c.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 2 — Date */}
                {seminarCountry && (
                  <div>
                    <h2 className="text-sm font-light text-[#1B3A5C] mb-1.5 flex items-center gap-2 tracking-tight">
                      <span className="w-5 h-5 rounded-full bg-[#1B3A5C] text-white text-[11px] flex items-center justify-center">2</span>
                      {isEN ? "Select Date" : "Termin wählen"}
                    </h2>
                    <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2E7D32] bg-white px-2.5 py-1 rounded-full border border-[#2E7D32]/20 shadow-sm">
                      <GraduationCap className="w-3 h-3" />
                      {isEN ? "Therapist in Aktiv-Hypnose®" : "Therapeut in Aktiv-Hypnose®"}
                    </div>
                    <div className="space-y-1.5">
                    {visibleDates.map((d, i) => {
                        return (

                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedDate(d.date)}
                          className={`group relative w-full border rounded-lg p-2.5 text-left cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-[#2E7D32]/60 hover:bg-[#F4FAF5] ${
                            selectedDate === d.date
                              ? "border-[#2E7D32] bg-[#E8F5E9] ring-2 ring-[#2E7D32]/30 shadow-sm"
                              : "border-border bg-white"
                          }`}
                        >
                          {selectedDate === d.date && (
                            <span className="absolute top-2 right-2 inline-flex items-center gap-1 text-[10px] font-semibold text-white bg-[#2E7D32] px-2 py-[3px] rounded-full shadow-sm">
                              <CheckCircle className="w-3 h-3" />
                              {isEN ? "Selected" : "Ausgewählt"}
                            </span>
                          )}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="flex items-center gap-2 font-semibold text-sm text-[#1B3A5C]">
                                <Calendar className="w-4 h-4" /> {d.date}
                              </p>
                              <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-0.5 leading-tight">
                                <MapPin className="w-3 h-3 shrink-0" /> {d.location}
                              </p>
                            </div>
                          </div>
                          {/* Price display */}
                          <div className="mt-2 pt-2 border-t border-border/30">
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                              <span className="inline-flex items-baseline gap-1 text-[#1B3A5C]">
                                <span className="text-[10px] font-normal tracking-wide">{seminarCountry === "ch" ? "CHF" : "€"}</span>
                                <span className="text-[15px] font-semibold tracking-tight">{seminarCountry === "ch" ? "2.290.–" : "2.290,–"}</span>
                              </span>
                              <span className="text-[10.5px] font-medium text-[#1B3A5C]/75 bg-[#F1F4F7] border border-[#E2E8EE] px-2 py-[3px] rounded-full whitespace-nowrap">
                                {isEN ? "Small intensive group · Max. 10 participants" : "Kleine Intensivgruppe · Max. 10 Teilnehmer"}
                              </span>
                            </div>
                          </div>

                        </button>
                        );
                      })}
                    </div>
                    {hiddenDatesCount > 0 && (
                      <div className="text-center mt-2.5">
                        <button
                          type="button"
                          onClick={() => setShowAllDates((v) => !v)}
                          className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B3A5C] border border-[#1B3A5C]/25 hover:border-[#1B3A5C]/50 hover:bg-white rounded-full px-4 py-1.5 transition-all"
                        >
                          {showAllDates
                            ? (isEN ? "Show fewer dates" : "Weniger Termine anzeigen")
                            : (isEN ? `Show all dates (+${hiddenDatesCount})` : `Weitere Termine anzeigen (+${hiddenDatesCount})`)}
                        </button>
                      </div>
                    )}
                  </div>
                )}
                </div>
                {/* /STEPS 1+2 wrapper */}

                {/* STEP 3 — Form */}
                {selectedDate && (
                   <div id="seminar-step-3" className={`scroll-mt-20 border p-3 sm:p-4 ${seminarCountry === "de" ? "border-[#1B3A5C]/20 bg-[#EEF4FB]" : "border-[#2E7D32]/20 bg-[#EEF6EF]"}`}>
                    <h2 className="text-sm font-light text-[#1B3A5C] mb-2.5 flex items-center gap-2 tracking-tight">
                      <span className="w-6 h-6 rounded-full bg-[#1B3A5C] text-white text-xs flex items-center justify-center">3</span>
                      {isEN ? "Your Details" : "Ihre Daten"}
                    </h2>
                    <form onSubmit={handleSubmit} noValidate className="space-y-2.5 relative z-[51]">
                      {/* Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "First Name" : "Vorname"} *</label>
                          <input type="text" name="firstName" required autoComplete="given-name" className={inputClasses} />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Last Name" : "Nachname"} *</label>
                          <input type="text" name="lastName" required autoComplete="family-name" className={inputClasses} />
                        </div>
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Date of Birth" : "Geburtsdatum"} *</label>
                        <div className="grid grid-cols-3 gap-2">
                          <input type="text" name="dobDay" required placeholder={isEN ? "DD" : "TT"} maxLength={2} pattern="\d{1,2}" className={inputClasses} />
                          <input type="text" name="dobMonth" required placeholder={isEN ? "MM" : "MM"} maxLength={2} pattern="\d{1,2}" className={inputClasses} />
                          <input type="text" name="dobYear" required placeholder={isEN ? "YYYY" : "JJJJ"} maxLength={4} pattern="\d{4}" className={inputClasses} />
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Street & Number" : "Strasse & Hausnummer"} *</label>
                        <input type="text" name="street" required autoComplete="street-address" className={inputClasses} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Postal Code" : "PLZ"} *</label>
                          <input type="text" name="postalCode" required autoComplete="postal-code" className={inputClasses} />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "City" : "Ort"} *</label>
                          <input type="text" name="city" required autoComplete="address-level2" className={inputClasses} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Country" : "Land"} *</label>
                        <input type="text" name="countryField" required autoComplete="country-name" className={inputClasses} />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">E-Mail *</label>
                        <input type="email" name="email" required autoComplete="email" className={inputClasses} />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Phone number including country code" : "Telefonnummer inklusive Vorwahl"} *</label>
                        <input
                          type="tel"
                          required
                          autoComplete="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className={inputClasses}
                        />
                      </div>

                      {/* Profession */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Profession" : "Beruf"} *</label>
                        <input type="text" name="profession" required className={inputClasses} />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Message (optional)" : "Nachricht (optional)"}</label>
                        <textarea name="message" rows={2} className={`${inputClasses} resize-none`} />
                      </div>

                      {/* DSGVO + AGB */}
                      <div className="border border-border bg-white p-3 space-y-2.5">
                        {/* Privacy */}
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

                        {/* AGB */}
                        <div className="flex items-start gap-3">
                          <div className="pt-0.5">
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={agbConsent}
                              onClick={() => setAgbConsent(!agbConsent)}
                              className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${agbConsent ? "bg-[#2E7D32] border-[#2E7D32]" : "bg-white border-border hover:border-[#1B3A5C]"}`}
                            >
                              {agbConsent && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-foreground leading-relaxed">
                            {isEN ? (
                              <>
                                I have read and accept the{" "}
                                <Link to={getPath("terms", language, country)} className="text-[#1B3A5C] underline hover:text-[#2E7D32]">terms and conditions (AGB)</Link>. *
                              </>
                            ) : (
                              <>
                                Ich habe die{" "}
                                <Link to={getPath("terms", language, country)} className="text-[#1B3A5C] underline hover:text-[#2E7D32]">Allgemeinen Geschäftsbedingungen (AGB)</Link> gelesen und akzeptiere diese. *
                              </>
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Shield className="w-3.5 h-3.5 text-[#2E7D32]" />
                          {isEN ? "Your data is processed in accordance with GDPR." : "Ihre Daten werden DSGVO-konform verarbeitet."}
                        </div>
                      </div>

                      <div className="pb-3 md:pb-0">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full font-medium py-3 transition-colors relative z-[40] ${!isSubmitting ? "bg-[#c8e6c9] hover:bg-[#a5d6a7] text-[#1B3A1F]" : "bg-gray-400 text-white cursor-not-allowed"}`}
                        >
                          {isEN ? "Register for Seminar" : "Seminar-Anmeldung absenden"}
                        </Button>
                      </div>

                      <p className="text-xs text-slate-600 text-center leading-relaxed mt-1">
                        {isEN
                          ? "By registering you will receive a written invoice. Your data will only be used to process your registration."
                          : "Mit Ihrer Anmeldung erhalten Sie eine schriftliche Rechnung. Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anmeldung verwendet."}
                      </p>
                    </form>
                  </div>
                )}

                {/* Trust */}
                <div className="flex items-center justify-center gap-1 mt-8 text-muted-foreground text-sm">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  5.0 — 266 Google {isEN ? "Reviews" : "Bewertungen"}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
