import { useState, useCallback } from "react";
import { trackFormConversion } from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { getPath } from "@/lib/routes";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, MapPin, Clock, Shield } from "lucide-react";
import { toast } from "sonner";


import { PHONE_COUNTRIES } from "@/data/phoneCountries";

export default function Erstgespraech() {
  const { language, country, t, isSwiss, isInternational, showCH, showDE } = useLanguage();
  const isEN = language === "en";
  const isDE = language === "de";
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState(searchParams.get("concern") || "");

  // Phone country code — CH pre-selected for Swiss site, DE for German site
  const defaultPhoneCountry = country === "ch" ? "+41" : "+49";
  const [phoneCountry, setPhoneCountry] = useState(defaultPhoneCountry);
  const [phoneNumber, setPhoneNumber] = useState("");

  const selectedPhoneCountry = PHONE_COUNTRIES.find(c => c.code === phoneCountry) || PHONE_COUNTRIES[0];

  const handlePhoneChange = useCallback((value: string) => {
    // Only allow digits and spaces
    const cleaned = value.replace(/[^\d\s]/g, "");
    const digitsOnly = cleaned.replace(/\s/g, "");
    if (digitsOnly.length <= selectedPhoneCountry.maxDigits) {
      setPhoneNumber(cleaned);
    }
  }, [selectedPhoneCountry.maxDigits]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) {
      toast.error(isEN ? "Please accept the privacy policy to continue." : "Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren.");
      return;
    }

    // Collect form data from the form elements
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const firstName = (formData.get("firstName") as string) || "";
    const lastName = (formData.get("lastName") as string) || "";
    const email = (formData.get("email") as string) || "";
    const postalCity = (formData.get("postalCode") as string) || "";
    const message = (formData.get("message") as string) || "";
    const bestTime = (formData.get("bestTime") as string) || "";
    const location = (formData.get("location") as string) || "";
    

    // Extract UTM params from URL
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
      language: language,
      source,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      tracking_code: referrerPage,
      notes: [bestTime && `Best time: ${bestTime}`, message].filter(Boolean).join(" | ") || null,
    };

    try {
      // Save to database
      const { error: dbError } = await supabase.from("leads").insert(leadData as any);
      if (dbError) console.error("Lead save error:", dbError);

      // Notify (email + Slack)
      await supabase.functions.invoke("notify-lead", { body: { lead: leadData } });
    } catch (err) {
      console.error("Lead notification error:", err);
    }

    trackFormConversion("session");
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success(isEN ? "Thank you! We will contact you shortly." : "Vielen Dank! Wir melden uns in Kürze bei Ihnen.");
  };

  const inputClasses = "w-full border border-border px-3 py-2.5 text-sm bg-white focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C] outline-none transition-colors";

  const basePath = getPath("home", language, country);

  return (
    <>
      <SEO {...pageSEO.contact} pageKey="contact" />
      <Breadcrumbs items={[
        { name: "Home", path: basePath },
        { name: isEN ? "Free Discovery Call" : "Erstgespräch", path: getPath("contact", language, country) },
      ]} />

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — Info */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-4">
                {isEN ? "Book Your Free Discovery Call" : "Kostenloses Erstgespräch vereinbaren"}
              </h1>
              <p className="text-base text-foreground leading-relaxed mb-6">
                {isEN
                  ? "Do you have questions or would you like to learn more about our method? Book a free and non-binding discovery call now. We take time for you and advise you individually."
                  : "Haben Sie Fragen oder möchten Sie mehr über unsere Methode erfahren? Vereinbaren Sie jetzt ein kostenloses und unverbindliches Erstgespräch. Wir nehmen uns Zeit für Sie und beraten Sie individuell."}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm"><CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" /><span>{isEN ? "Free and non-binding" : "Kostenlos und unverbindlich"}</span></div>
                <div className="flex items-center gap-3 text-sm"><CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" /><span>{isEN ? "Personal consultation" : "Persönliche Beratung"}</span></div>
                <div className="flex items-center gap-3 text-sm"><CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" /><span>{isEN ? "Over 40 years of experience" : "Über 40 Jahre Erfahrung"}</span></div>
                <div className="flex items-center gap-3 text-sm"><Clock className="w-4 h-4 text-[#2E7D32] shrink-0" /><span>{isEN ? "Response within 24 hours" : "Antwort innerhalb von 24 Stunden"}</span></div>
              </div>

              {/* Contact Info Card */}
              <div className="border border-border p-4 bg-[#f4f3ef] space-y-3">
                <h3 className="font-semibold text-sm text-[#1B3A5C]">{isEN ? "Direct Contact" : "Direkter Kontakt"}</h3>
                {showCH && (
                  <a href="tel:+41791318878" className="flex items-center gap-2 text-sm hover:text-[#1B3A5C] transition-colors">
                    <Phone className="w-4 h-4 text-[#1B3A5C]" /> +41 79 131 88 78
                  </a>
                )}
                {showDE && (
                  <a href="tel:+491719539922" className="flex items-center gap-2 text-sm hover:text-[#1B3A5C] transition-colors">
                    <Phone className="w-4 h-4 text-[#1B3A5C]" /> +49 171 953 99 22
                  </a>
                )}
                {showCH && (
                  <>
                    {isInternational && <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">🇨🇭 {isDE ? "Schweiz" : "Switzerland"}</p>}
                    <a href="https://maps.google.com/?q=5+Elements+TCM+GmbH,+Usteristrasse+23,+8001+Zürich" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm hover:text-[#2E7D32] transition-colors">
                      <MapPin className="w-4 h-4 text-[#1B3A5C] mt-0.5 shrink-0" />
                      5 Elements TCM GmbH, Beim Löwenplatz, Usteristrasse 23, 8001 Zürich
                    </a>
                    <a href="https://maps.google.com/?q=Fit+und+Gesund+Center,+Churzhaslen+3,+8733+Eschenbach" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm hover:text-[#2E7D32] transition-colors">
                      <MapPin className="w-4 h-4 text-[#1B3A5C] mt-0.5 shrink-0" />
                      Fit+Gsund, Churzhaslen 3, 8733 Eschenbach (am Zürichsee)
                    </a>
                  </>
                )}
                {showDE && (
                  <>
                    {isInternational && <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">🇩🇪 {isDE ? "Deutschland" : "Germany"}</p>}
                    <a href="https://maps.google.com/?q=Regus,+Viktoria+Str.+3b,+86150+Augsburg" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm hover:text-[#2E7D32] transition-colors">
                      <MapPin className="w-4 h-4 text-[#1B3A5C] mt-0.5 shrink-0" />
                      {isDE ? "Sitzungen" : "Sessions"}: Regus, Viktoria Str. 3b, 2. OG, 86150 Augsburg
                    </a>
                    <a href="https://maps.google.com/?q=Hotel+am+Alten+Park,+Fröhlich+Str.+17,+86150+Augsburg" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm hover:text-[#2E7D32] transition-colors">
                      <MapPin className="w-4 h-4 text-[#1B3A5C] mt-0.5 shrink-0" />
                      {isDE ? "Seminare" : "Seminars"}: Hotel am Alten Park, Fröhlich Str. 17, 86150 Augsburg
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Right — Form */}
            <div className="border border-border p-5 sm:p-6 bg-[#f4f3ef]">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-[#2E7D32] mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-[#1B3A5C] mb-2">{isEN ? "Thank You!" : "Vielen Dank!"}</h2>
                  <p className="text-muted-foreground">{isEN ? "We will contact you shortly." : "Wir melden uns in Kürze bei Ihnen."}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-lg font-bold text-[#1B3A5C] mb-2">{isEN ? "Contact Form" : "Kontaktformular"}</h2>

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

                  {/* Phone + PLZ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Postal Code / City" : "PLZ / Ortschaft"}</label>
                      <input type="text" name="postalCode" autoComplete="postal-code" className={inputClasses} />
                    </div>
                  </div>

                  {/* Topic / Service Selection */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "What is your concern?" : "Was ist Ihr Anliegen?"} *</label>
                    <select required className={inputClasses} value={selectedConcern} onChange={(e) => setSelectedConcern(e.target.value)}>
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

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Message" : "Kommentar oder Nachricht"}</label>
                    <textarea name="message" rows={4} className={`${inputClasses} resize-none`} />
                  </div>

                  {/* ── DSGVO / GDPR Opt-in Toggle ── */}
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
                      <div>
                        <p className="text-xs text-foreground leading-relaxed">
                          {isEN ? (
                            <>
                              I agree that my personal data will be processed for the purpose of contacting me. I have read and accept the{" "}
                              <Link to={getPath("privacy", language, country)} className="text-[#1B3A5C] underline hover:text-[#2E7D32]">privacy policy</Link>. *
                            </>
                          ) : (
                            <>
                              Ich bin damit einverstanden, dass meine personenbezogenen Daten zum Zweck der Kontaktaufnahme verarbeitet werden. Ich habe die{" "}
                              <Link to={getPath("privacy", language, country)} className="text-[#1B3A5C] underline hover:text-[#2E7D32]">Datenschutzerklärung</Link> gelesen und akzeptiere diese. *
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-3.5 h-3.5 text-[#2E7D32]" />
                      {isEN ? "Your data is processed in accordance with GDPR." : "Ihre Daten werden DSGVO-konform verarbeitet."}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!gdprConsent}
                    className={`w-full font-semibold py-3 text-white transition-colors ${gdprConsent ? "bg-[#2E7D32] hover:bg-[#1B5E20]" : "bg-gray-400 cursor-not-allowed"}`}
                  >
                    {isEN ? "Send Request" : "Absenden"}
                  </Button>

                  <p className="text-[10px] text-muted-foreground text-center">
                    {isEN
                      ? "Your data will only be used to process your request. We will not share your data with third parties."
                      : "Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Wir geben Ihre Daten nicht an Dritte weiter."}
                  </p>

                  {/* Seminar link */}
                  <div className="text-center pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      {isEN ? "Interested in our training seminars?" : "Interesse an unseren Ausbildungsseminaren?"}
                    </p>
                    <Link
                      to={getPath("seminarRegistration", language, country)}
                      className="text-xs text-primary hover:underline"
                    >
                      {isEN ? "→ Register for a Seminar" : "→ Zur Seminar-Anmeldung"}
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
