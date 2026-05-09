import { useEffect, useRef, useState } from "react";
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
const CALENDLY_EMBED_URL = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=0B1F33&primary_color=2E7D32`;

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

function CalendlyInlineEmbed({ loadingLabel }: { loadingLabel: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const initWidget = () => {
      if (cancelled || !containerRef.current || !window.Calendly?.initInlineWidget) return;

      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: CALENDLY_EMBED_URL,
        parentElement: containerRef.current,
      });
      // Calendly injects an iframe; mark loaded once it appears
      const iframe = containerRef.current.querySelector("iframe");
      if (iframe) {
        iframe.addEventListener("load", () => !cancelled && setLoaded(true), { once: true });
        // Fallback in case load event already fired
        setTimeout(() => !cancelled && setLoaded(true), 1500);
      } else {
        setTimeout(() => !cancelled && setLoaded(true), 1500);
      }
    };

    const existingStyle = document.querySelector<HTMLLinkElement>(
      'link[href="https://assets.calendly.com/assets/external/widget.css"]',
    );

    if (!existingStyle) {
      const style = document.createElement("link");
      style.rel = "stylesheet";
      style.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(style);
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );

    if (window.Calendly?.initInlineWidget) {
      initWidget();
    } else if (existingScript) {
      existingScript.addEventListener("load", initWidget);
    } else {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.addEventListener("load", initWidget);
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      existingScript?.removeEventListener("load", initWidget);

      const appendedScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]',
      );
      appendedScript?.removeEventListener("load", initWidget);

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="relative rounded-2xl border border-[#E6E1D6] bg-[#FBF8F2] p-1.5 md:p-2 shadow-[0_2px_14px_rgba(27,58,92,0.05)]">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#FBF8F2]/95">
          <span
            className="inline-block h-6 w-6 rounded-full border-2 border-[#D7DEE6] border-t-[#1B3A5C] animate-spin"
            aria-hidden="true"
          />
          <p className="text-[13px] text-[#1B3A5C]/70 tracking-tight">{loadingLabel}</p>
        </div>
      )}
      <div
        ref={containerRef}
        className="calendly-inline-widget mx-auto w-full overflow-hidden rounded-xl bg-[#FBF8F2] h-[980px] sm:h-[820px] md:h-[720px]"
        data-url={CALENDLY_EMBED_URL}
        style={{ minWidth: "320px" }}
      />
    </div>
  );
}

export default function OnlineBeratung() {
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const basePath = getPath("home", language, country);

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
          a: "Both are possible. Many clients prefer the phone because it is uncomplicated and discreet. Video calls via Zoom, Microsoft Teams or WhatsApp Video are also available on request.",
        },
        {
          q: "Can the consultation be credited toward an intensive session?",
          a: "Yes. If you decide to book a subsequent intensive session on site within a reasonable time frame, the cost of the online consultation is credited in full toward the price of the intensive session.",
        },
        {
          q: "How is payment made?",
          a: "After booking you receive the payment details by email, SMS or WhatsApp.\nThe appointment is firmly reserved as soon as the payment has been received or proof of payment has been provided.",
        },
        {
          q: "Is the consultation confidential?",
          a: "Yes. The consultation takes place in a confidential and discreet setting.\n\nDavid J. Woods is an academically trained psychologist with decades of practical experience in psychology, hypnosis and counselling.\n\nPersonal information and the content of the consultation are of course treated confidentially.",
        },
      ]
    : [
        {
          q: "Wie läuft die Online-Beratung ab?",
          a: "Nach der Buchung erhalten Sie eine Bestätigung mit den Termindetails und den Zahlungsinformationen. Die Beratung dauert ca. 60 Minuten und findet telefonisch oder per Video statt – ganz wie Sie es bevorzugen. Gemeinsam schauen wir auf Ihre Situation, klären Ihr Anliegen und definieren den nächsten konkreten Schritt.",
        },
        {
          q: "Erfolgt die Beratung telefonisch oder per Video?",
          a: "Beides ist möglich. Viele Klientinnen und Klienten bevorzugen das Telefon, da es unkompliziert und diskret ist. Auf Wunsch sind auch Video-Calls über Zoom, Microsoft Teams oder WhatsApp-Video möglich.",
        },
        {
          q: "Kann die Beratung auf eine Intensivsitzung angerechnet werden?",
          a: "Ja. Wenn Sie sich innerhalb eines angemessenen Zeitraums für eine anschließende Intensivsitzung vor Ort entscheiden, werden die Kosten der Online-Beratung vollständig auf den Preis der Intensivsitzung angerechnet.",
        },
        {
          q: "Wie erfolgt die Zahlung?",
          a: "Nach der Buchung erhalten Sie die Zahlungsinformationen per E-Mail, SMS oder WhatsApp.\nDer Termin wird verbindlich reserviert, sobald die Zahlung eingegangen ist oder ein Zahlungsnachweis übermittelt wurde.",
        },
        {
          q: "Ist die Beratung vertraulich?",
          a: "Ja. Die Beratung findet in einem vertraulichen und diskreten Rahmen statt.\n\nDavid J. Woods ist akademisch ausgebildeter Psychologe mit jahrzehntelanger praktischer Erfahrung im Bereich Psychologie, Hypnose und Gesprächsführung.\n\nPersönliche Informationen und Inhalte der Beratung werden selbstverständlich vertraulich behandelt.",
        },
      ];

  const title = isEN ? "Online Psychological Consultation" : "Online Psychologische Beratung";
  const subtitle = isEN
    ? "Confidential psychological consultation by phone or online video"
    : "Vertrauliche Online- und Telefonberatung";

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

      {/* HERO — soft warm gradient with subtle blue accent */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F0] via-[#F6F3EC] to-[#F1EEE5] border-b border-[#EAE4D6]">
        {/* Subtle decorative accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(27,58,92,0.05), transparent 70%), radial-gradient(ellipse 40% 30% at 100% 100%, rgba(27,58,92,0.03), transparent 70%)",
          }}
        />
        <div className="relative container-main py-14 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Fine separator line above eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#1B3A5C]/30" />
              <p className="text-[10.5px] md:text-[11.5px] uppercase tracking-[0.24em] text-[#1B3A5C]/75 font-medium">
                Lic. Psych. David J. Woods
              </p>
              <span className="h-px w-8 bg-[#1B3A5C]/30" />
            </div>
            <h1 className="text-[28px] md:text-[40px] font-light tracking-tight text-[#0B1F33] leading-[1.15]">
              {title}
            </h1>
            <p className="mt-5 text-[14px] md:text-[16px] text-[#1B3A5C]/85 font-normal leading-relaxed tracking-tight">
              {subtitle}
            </p>
            <p className="mt-4 text-[13.5px] md:text-[15px] text-[#0B1F33]/65 leading-relaxed max-w-2xl mx-auto">
              {isEN
                ? "Personal support for emotional strain, mental challenges, anxiety, stress, inner conflicts or processes of change – flexibly by phone or online."
                : "Persönliche Unterstützung bei emotionalen Belastungen, mentalen Herausforderungen, Ängsten, Stress, inneren Konflikten oder Veränderungsprozessen – flexibel telefonisch oder online."}
            </p>
          </div>

          {/* Bullets — warm ivory card, monochrome blue icons */}
          <div className="max-w-4xl mx-auto mt-10 md:mt-12">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3.5 bg-gradient-to-b from-white to-[#FBF8F2] border border-[#EAE4D6] rounded-2xl p-6 md:p-7 shadow-[0_2px_14px_rgba(27,58,92,0.04),inset_0_1px_0_rgba(255,255,255,0.7)]">
                {bullets.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-[13.5px] md:text-[14.5px] text-[#0B1F33]/80 leading-snug">
                    <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#EEF3F8] text-[#1B3A5C] border border-[#1B3A5C]/10">
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.7} />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      {/* PRICE — clean, premium, ruhig */}
      <section className="bg-gradient-to-b from-[#F1EEE5] to-[#F6F3EC] border-b border-[#EAE4D6]">
        <div className="container-main py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6 md:mb-7">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="h-px w-6 bg-[#1B3A5C]/25" />
                <p className="text-[10.5px] uppercase tracking-[0.26em] text-[#1B3A5C]/65 font-medium">
                  {isEN ? "Investment" : "Honorar"}
                </p>
                <span className="h-px w-6 bg-[#1B3A5C]/25" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#EAE4D6] rounded-2xl px-6 py-7 text-center shadow-[0_1px_4px_rgba(27,58,92,0.03),inset_0_1px_0_rgba(255,255,255,0.8)]">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#1B3A5C]/55 mb-2.5">
                  {isEN ? "Germany & Austria" : "Deutschland & Österreich"}
                </div>
                <div className="text-[34px] md:text-[38px] font-extralight text-[#0B1F33] tracking-tight leading-none">
                  179<span className="text-[20px] md:text-[22px] font-light text-[#1B3A5C]/70 ml-1">€</span>
                </div>
              </div>
              <div className="bg-white border border-[#EAE4D6] rounded-2xl px-6 py-7 text-center shadow-[0_1px_4px_rgba(27,58,92,0.03),inset_0_1px_0_rgba(255,255,255,0.8)]">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#1B3A5C]/55 mb-2.5">
                  {isEN ? "Switzerland" : "Schweiz"}
                </div>
                <div className="text-[34px] md:text-[38px] font-extralight text-[#0B1F33] tracking-tight leading-none">
                  179<span className="text-[20px] md:text-[22px] font-light text-[#1B3A5C]/70 ml-1">CHF</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-[12.5px] md:text-[13px] text-[#1B3A5C]/70 leading-relaxed text-center max-w-xl mx-auto">
              {isEN
                ? "The fee for the online consultation can be credited toward a subsequent on-site intensive session."
                : "Das Honorar der Online-Beratung kann bei anschließender Intensivsitzung vor Ort angerechnet werden."}
            </p>
          </div>
        </div>
      </section>

      {/* CALENDLY — soft beige section */}
      <section className="bg-[#F6F3EC] border-b border-[#E6E1D6]">
        <div className="container-main pt-8 md:pt-10 pb-3 md:pb-4">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-6 md:mb-7">
              <h2 className="text-xl md:text-2xl font-light text-[#0B1F33] tracking-tight mb-2">
                {isEN ? "Book your appointment" : "Termin buchen"}
              </h2>
              <p className="text-[13px] md:text-sm text-[#1B3A5C]/70">
                {isEN
                  ? "Choose a time that suits you – directly in the calendar below."
                  : "Wählen Sie direkt im Kalender unten einen passenden Termin."}
              </p>
            </div>

            <CalendlyInlineEmbed
              loadingLabel={isEN ? "Loading calendar …" : "Kalender wird geladen …"}
            />

            <p className="mt-5 md:mt-6 text-[12.5px] md:text-[13px] text-foreground/70 text-center leading-relaxed max-w-2xl mx-auto">
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

