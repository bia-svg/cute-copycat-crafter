import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getPath } from "@/lib/routes";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import {
  CalendarClock,
  PhoneCall,
  ShieldCheck,
  Award,
  Sparkles,
  Repeat,
} from "lucide-react";

const CALENDLY_URL = "https://calendly.com/info-cug/online-psychologische-beratung";

export default function OnlineBeratung() {
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const basePath = getPath("home", language, country);
  const calendlyRef = useRef<HTMLDivElement>(null);

  const bullets = isEN
    ? [
        { icon: CalendarClock, text: "Flexible online appointments" },
        { icon: PhoneCall, text: "Available by phone or online" },
        { icon: ShieldCheck, text: "Confidential & individual" },
        { icon: Award, text: "35+ years of experience" },
        { icon: Sparkles, text: "Intensive, solution-oriented approach" },
        { icon: Repeat, text: "Can be credited toward a later intensive session" },
      ]
    : [
        { icon: CalendarClock, text: "Flexible Online-Termine" },
        { icon: PhoneCall, text: "Telefonisch oder online möglich" },
        { icon: ShieldCheck, text: "Vertraulich & individuell" },
        { icon: Award, text: "35+ Jahre Erfahrung" },
        { icon: Sparkles, text: "Intensiv- und lösungsorientierter Ansatz" },
        { icon: Repeat, text: "Beratung kann auf spätere Intensivsitzung angerechnet werden" },
      ];

  const faq = isEN
    ? [
        {
          q: "How does the online consultation work?",
          a: "After booking, you receive a confirmation with the appointment details and payment information. The consultation lasts approximately 60 minutes and takes place by phone or video — whichever you prefer. Together we look at your situation, clarify your goal and define the next concrete step.",
        },
        {
          q: "Is the consultation by phone or video?",
          a: "Both are possible. Many clients prefer the phone because it is unobtrusive and discreet. Video calls (Zoom, Google Meet, WhatsApp Video) are also available on request.",
        },
        {
          q: "Can the consultation be credited toward an intensive session?",
          a: "Yes. If you decide to book a subsequent intensive session on site within a reasonable time frame, the cost of the online consultation is credited in full toward the price of the intensive session.",
        },
        {
          q: "How is payment made?",
          a: "After booking you receive the payment details by email, SMS or WhatsApp. The appointment is firmly reserved as soon as the payment has been received.",
        },
        {
          q: "Is the consultation confidential?",
          a: "Absolutely. As a licensed psychologist (Lic. Psych.), David J. Woods is bound by professional confidentiality. All conversations and content are treated strictly confidentially.",
        },
      ]
    : [
        {
          q: "Wie läuft die Online-Beratung ab?",
          a: "Nach der Buchung erhalten Sie eine Bestätigung mit den Termindetails und den Zahlungsinformationen. Die Beratung dauert ca. 60 Minuten und findet telefonisch oder per Video statt – ganz wie Sie es bevorzugen. Gemeinsam schauen wir auf Ihre Situation, klären Ihr Anliegen und definieren den nächsten konkreten Schritt.",
        },
        {
          q: "Erfolgt die Beratung telefonisch oder per Video?",
          a: "Beides ist möglich. Viele Klientinnen und Klienten bevorzugen das Telefon, da es unaufdringlich und diskret ist. Auf Wunsch sind auch Videocalls (Zoom, Google Meet, WhatsApp-Video) möglich.",
        },
        {
          q: "Kann die Beratung auf eine Intensivsitzung angerechnet werden?",
          a: "Ja. Wenn Sie sich innerhalb eines angemessenen Zeitraums für eine anschließende Intensivsitzung vor Ort entscheiden, werden die Kosten der Online-Beratung vollständig auf den Preis der Intensivsitzung angerechnet.",
        },
        {
          q: "Wie erfolgt die Zahlung?",
          a: "Nach der Buchung erhalten Sie die Zahlungsinformationen per E-Mail, SMS oder WhatsApp. Der Termin wird verbindlich reserviert, sobald die Zahlung eingegangen ist.",
        },
        {
          q: "Ist die Beratung vertraulich?",
          a: "Selbstverständlich. Als lizenzierter Psychologe (Lic. Psych.) unterliegt David J. Woods der beruflichen Schweigepflicht. Alle Gespräche und Inhalte werden streng vertraulich behandelt.",
        },
      ];

  const title = isEN ? "Online Psychological Consultation" : "Online Psychologische Beratung";
  const subtitle = isEN
    ? "Confidential online psychological consultation with Lic. Psych. David J. Woods"
    : "Vertrauliche psychologische Online-Beratung mit Lic. Psych. David J. Woods";

  useEffect(() => {
    if (!calendlyRef.current) return;
    const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <SEO
        titleDE="Online Psychologische Beratung – Lic. Psych. David J. Woods"
        titleEN="Online Psychological Consultation – Lic. Psych. David J. Woods"
        descriptionDE="Vertrauliche psychologische Online-Beratung mit Lic. Psych. David J. Woods – flexibel telefonisch oder online. 35+ Jahre Erfahrung."
        descriptionEN="Confidential online psychological consultation with Lic. Psych. David J. Woods – flexibly by phone or online. 35+ years of experience."
        pageKey="contact"
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: basePath },
          { name: title, path: getPath("onlineBeratung", language, country) },
        ]}
      />

      {/* HERO */}
      <section className="bg-[#F1F4F7] border-b border-[#E2E8EE]">
        <div className="container-main py-10 md:py-14">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-[#2E7D32] font-medium mb-3">
              Lic. Psych. David J. Woods
            </p>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-[#0B1F33] leading-tight">
              {title}
            </h1>
            <p className="mt-4 text-sm md:text-[15px] text-[#1B3A5C] font-normal leading-relaxed">
              {subtitle}
            </p>
            <p className="mt-5 text-[13.5px] md:text-[15px] text-foreground/75 leading-relaxed max-w-2xl mx-auto">
              {isEN
                ? "Personal support for emotional strain, mental challenges, anxiety, stress, inner conflicts or processes of change – flexibly by phone or online."
                : "Persönliche Unterstützung bei emotionalen Belastungen, mentalen Herausforderungen, Ängsten, Stress, inneren Konflikten oder Veränderungsprozessen – flexibel telefonisch oder online."}
            </p>
          </div>

          {/* Bullets */}
          <div className="max-w-4xl mx-auto mt-8 md:mt-10">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 bg-white border border-[#E2E8EE] rounded-2xl p-5 md:p-6 shadow-[0_4px_20px_rgba(27,58,92,0.05)]">
              {bullets.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-[13.5px] md:text-[14.5px] text-foreground/85 leading-snug">
                  <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E8F5E9] text-[#2E7D32]">
                    <Icon className="w-4 h-4" strokeWidth={1.8} />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PRICE + CALENDLY */}
      <section className="bg-white border-b border-[#E2E8EE]">
        <div className="container-main py-10 md:py-14">
          {/* Price block */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#F8FAFC] border border-[#D7DEE6] rounded-2xl p-6 md:p-8 text-center shadow-[0_2px_10px_rgba(27,58,92,0.04)]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {isEN ? "Investment" : "Honorar"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                <div className="bg-white border border-[#E2E8EE] rounded-xl px-4 py-4">
                  <div className="text-[12px] text-muted-foreground mb-1">
                    {isEN ? "Germany & Austria" : "Deutschland & Österreich"}
                  </div>
                  <div className="text-2xl md:text-[28px] font-light text-[#0B1F33] tracking-tight">
                    179 €
                  </div>
                </div>
                <div className="bg-white border border-[#E2E8EE] rounded-xl px-4 py-4">
                  <div className="text-[12px] text-muted-foreground mb-1">
                    {isEN ? "Switzerland" : "Schweiz"}
                  </div>
                  <div className="text-2xl md:text-[28px] font-light text-[#0B1F33] tracking-tight">
                    179 CHF
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[12.5px] md:text-[13px] text-[#2E7D32] leading-snug max-w-xl mx-auto">
                {isEN
                  ? "The cost of the online consultation can be credited toward a subsequent on-site intensive session."
                  : "Die Kosten der Online-Beratung können bei anschließender Intensivsitzung vor Ort angerechnet werden."}
              </p>
            </div>
          </div>

          {/* Calendly embed */}
          <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-xl md:text-2xl font-light text-[#0B1F33] text-center tracking-tight mb-2">
              {isEN ? "Book your appointment" : "Termin buchen"}
            </h2>
            <p className="text-[13px] md:text-sm text-muted-foreground text-center mb-5">
              {isEN
                ? "Choose a time that suits you – directly in the calendar below."
                : "Wählen Sie direkt im Kalender unten einen passenden Termin."}
            </p>
            <div
              ref={calendlyRef}
              className="calendly-inline-widget bg-white border border-[#E2E8EE] rounded-2xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] overflow-hidden"
              data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=0B1F33&primary_color=2E7D32`}
              style={{ minWidth: 320, minHeight: 720 }}
            />

            <p className="mt-5 text-[12.5px] md:text-[13.5px] text-foreground/70 text-center leading-relaxed max-w-2xl mx-auto">
              {isEN
                ? "After booking you will receive the payment information by email, SMS or WhatsApp. The appointment is firmly reserved once the payment has been received."
                : "Nach der Buchung erhalten Sie die Zahlungsinformationen per E-Mail, SMS oder WhatsApp. Der Termin wird nach Zahlungseingang verbindlich reserviert."}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title={isEN ? "Frequently Asked Questions" : "Häufig gestellte Fragen"}
        items={faq}
        sectionClassName="bg-[#F1F4F7] border-t border-[#E2E8EE]"
      />
    </>
  );
}
