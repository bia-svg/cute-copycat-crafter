import { useState, useEffect } from "react";
import { trackFormConversion } from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { getPath } from "@/lib/routes";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, MapPin, Clock, Shield } from "lucide-react";
import { toast } from "sonner";

/* ── Seminar dates (shared with Ausbildung) ── */
const SEMINAR_DATES_CH = [
  { date: "Mo-Sa, 15.-20. Juni 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach" },
  { date: "Mo-Sa, 07.-12. Sept. 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach" },
];
const SEMINAR_DATES_DE = [
  { date: "Mo-Sa, 11.-16. Mai 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg" },
  { date: "Mo-Sa, 06.-11. Juli 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg" },
  { date: "Mo-Sa, 14.-19. Sept. 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg" },
];

type FormType = "session" | "seminar";

export default function Erstgespraech() {
  const { language, country, t, isSwiss, isInternational, showCH, showDE } = useLanguage();
  const isEN = language === "en";
  const isDE = language === "de";
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [formType, setFormType] = useState<FormType>(
    searchParams.get("type") === "seminar" ? "seminar" : "session"
  );
  const [selectedDate, setSelectedDate] = useState(searchParams.get("date") || "");
  const [selectedConcern, setSelectedConcern] = useState(searchParams.get("concern") || "");

  useEffect(() => {
    if (searchParams.get("type") === "seminar") {
      setFormType("seminar");
      if (searchParams.get("date")) setSelectedDate(searchParams.get("date") || "");
    }
  }, [searchParams]);

  const allDates = [
    ...(showCH ? SEMINAR_DATES_CH : []),
    ...(showDE ? SEMINAR_DATES_DE : []),
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) {
      toast.error(isEN ? "Please accept the privacy policy to continue." : "Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren.");
      return;
    }
    trackFormConversion(formType, formType === "seminar" ? selectedDate : undefined);
    setSubmitted(true);
    toast.success(isEN ? "Thank you! We will contact you shortly." : "Vielen Dank! Wir melden uns in Kürze bei Ihnen.");
  };

  const inputClasses = "w-full border border-border px-3 py-2.5 text-sm bg-white focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C] outline-none transition-colors";

  return (
    <>
      <SEO {...pageSEO.contact} />

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — Info */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-4">
                {formType === "seminar"
                  ? (isEN ? "Register for Seminar" : "Seminar-Anmeldung")
                  : (isEN ? "Book Your Free Discovery Call" : "Kostenloses Erstgespräch vereinbaren")}
              </h1>
              <p className="text-base text-foreground leading-relaxed mb-6">
                {formType === "seminar"
                  ? (isEN
                    ? "Register for the Aktiv-Hypnose© training seminar. We will confirm your spot and send you all details."
                    : "Melden Sie sich für das Aktiv-Hypnose© Ausbildungsseminar an. Wir bestätigen Ihren Platz und senden Ihnen alle Details.")
                  : (isEN
                    ? "Do you have questions or would you like to learn more about our method? Book a free and non-binding discovery call now. We take time for you and advise you individually."
                    : "Haben Sie Fragen oder möchten Sie mehr über unsere Methode erfahren? Vereinbaren Sie jetzt ein kostenloses und unverbindliches Erstgespräch. Wir nehmen uns Zeit für Sie und beraten Sie individuell.")}
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
                    <Phone className="w-4 h-4 text-[#1B3A5C]" /> +49 171 9539922
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
                      <input type="text" required autoComplete="given-name" className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Last Name" : "Nachname"} *</label>
                      <input type="text" required autoComplete="family-name" className={inputClasses} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">E-Mail *</label>
                    <input type="email" required autoComplete="email" className={inputClasses} />
                  </div>

                  {/* Phone + PLZ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Phone" : "Telefonnummer"} *</label>
                      <input type="tel" required autoComplete="tel" className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Postal Code / City" : "PLZ / Ortschaft"}</label>
                      <input type="text" autoComplete="postal-code" className={inputClasses} />
                    </div>
                  </div>

                  {/* ── Type Toggle: Session vs Seminar ── */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">
                      {isEN ? "What are you interested in?" : "Wofür interessieren Sie sich?"} *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormType("session")}
                        className={`px-4 py-2.5 text-sm font-medium border transition-colors ${
                          formType === "session"
                            ? "bg-[#1B3A5C] text-white border-[#1B3A5C]"
                            : "bg-white text-foreground border-border hover:border-[#1B3A5C]"
                        }`}
                      >
                        {isEN ? "Therapy Session" : "Therapie-Sitzung"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormType("seminar")}
                        className={`px-4 py-2.5 text-sm font-medium border transition-colors ${
                          formType === "seminar"
                            ? "bg-[#1B3A5C] text-white border-[#1B3A5C]"
                            : "bg-white text-foreground border-border hover:border-[#1B3A5C]"
                        }`}
                      >
                        {isEN ? "Seminar / Training" : "Seminar / Ausbildung"}
                      </button>
                    </div>
                  </div>

                  {/* ── Conditional Fields ── */}
                  {formType === "session" ? (
                    <>
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
                        <select className={inputClasses}>
                          <option value="">{isEN ? "Please select..." : "Bitte wählen..."}</option>
                          <option value="zurich">Zürich — 5 Elements TCM (CH)</option>
                          <option value="eschenbach">Eschenbach — Fit und Gesund (CH)</option>
                          <option value="augsburg">Augsburg — Regus HELIO (DE)</option>
                          <option value="online">{isEN ? "Online Session" : "Online-Sitzung"}</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Seminar Date Selection */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          {isEN ? "Preferred Seminar Date" : "Gewünschter Seminartermin"} *
                        </label>
                        <select
                          required
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className={inputClasses}
                        >
                          <option value="">{isEN ? "Please select a date..." : "Bitte Termin wählen..."}</option>
                          {showCH && SEMINAR_DATES_CH.map((d, i) => (
                            <option key={`ch-${i}`} value={d.date}>
                              🇨🇭 {d.date} — {d.location}
                            </option>
                          ))}
                          {showDE && SEMINAR_DATES_DE.map((d, i) => (
                            <option key={`de-${i}`} value={d.date}>
                              🇩🇪 {d.date} — {d.location}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {/* Best time to reach */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Best time to reach you?" : "Wann sind Sie am besten erreichbar?"}</label>
                    <input type="text" placeholder={isEN ? "e.g. mornings, after 14:00" : "z.B. vormittags, nach 14:00 Uhr"} className={inputClasses} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Message" : "Kommentar oder Nachricht"}</label>
                    <textarea rows={4} className={`${inputClasses} resize-none`} />
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
                    {formType === "seminar"
                      ? (isEN ? "Register for Seminar" : "Seminar-Anmeldung absenden")
                      : (isEN ? "Send Request" : "Absenden")}
                  </Button>

                  <p className="text-[10px] text-muted-foreground text-center">
                    {isEN
                      ? "Your data will only be used to process your request. We will not share your data with third parties."
                      : "Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Wir geben Ihre Daten nicht an Dritte weiter."}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
