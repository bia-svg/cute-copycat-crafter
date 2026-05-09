import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getPath } from "@/lib/routes";
import Breadcrumbs from "@/components/Breadcrumbs";
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
    <div className="relative rounded-xl border-2 border-[#D8E0EA] bg-white p-1 md:p-1.5 shadow-[0_4px_16px_rgba(27,58,92,0.06)]">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2.5 rounded-xl bg-white/95">
          <span
            className="inline-block h-5 w-5 rounded-full border-2 border-[#D7DEE6] border-t-[#1B3A5C] animate-spin"
            aria-hidden="true"
          />
          <p className="text-[12.5px] text-[#1B3A5C]/70 tracking-tight">{loadingLabel}</p>
        </div>
      )}
      <div
        ref={containerRef}
        className="calendly-inline-widget mx-auto w-full overflow-hidden rounded-lg bg-white h-[1020px] sm:h-[1080px] md:h-[1040px]"
        data-url={CALENDLY_EMBED_URL}
        style={{ minWidth: "320px", overscrollBehavior: "contain" }}
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
        { icon: CalendarClock, text: "Short-notice online appointments available" },
        { icon: PhoneCall, text: "By phone or video" },
        { icon: ShieldCheck, text: "Confidential & individual" },
        { icon: Award, text: "35+ years of practical experience" },
        { icon: Sparkles, text: "Intensive, solution-oriented approach" },
        { icon: Repeat, text: "Creditable toward a later intensive session" },
      ]
    : [
        { icon: CalendarClock, text: "Kurzfristige Online-Termine möglich" },
        { icon: PhoneCall, text: "Telefonisch oder per Video" },
        { icon: ShieldCheck, text: "Vertraulich & individuell" },
        { icon: Award, text: "35+ Jahre praktische Erfahrung" },
        { icon: Sparkles, text: "Intensiv- und lösungsorientierter Ansatz" },
        { icon: Repeat, text: "Auf spätere Intensivsitzung anrechenbar" },
      ];

  const title = isEN ? "Confidential Online Psychological Consultation" : "Vertrauliche Online Psychologische Beratung";
  const subtitle = isEN
    ? "Professional psychological support for emotional strain, anxiety, stress, inner conflicts or personal processes of change — flexibly by phone or online."
    : "Professionelle psychologische Unterstützung bei emotionalen Belastungen, Ängsten, Stress, inneren Konflikten oder persönlichen Veränderungsprozessen — flexibel telefonisch oder online.";

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

      {/* HERO — unified premium container system (matches Service pages) */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-6 md:py-8">
          <div className="max-w-5xl mx-auto bg-white/85 backdrop-blur-sm border-2 border-[#D8E0EA] rounded-3xl shadow-[0_8px_30px_rgba(27,58,92,0.07)] p-5 md:p-7">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-[#2E7D32]/20" />
                <p className="text-[11px] md:text-[12.5px] uppercase tracking-[0.22em] text-[#1B3A5C]/90 font-semibold">
                  Lic. Psych. David J. Woods
                </p>
                <span className="h-px w-8 bg-[#2E7D32]/20" />
              </div>
              <h1 className="text-[22px] md:text-[30px] font-light tracking-tight text-[#1B3A5C] leading-[1.15]">
                {title}
              </h1>
              <p className="mt-2.5 text-[13.5px] md:text-[15px] text-[#1B3A5C]/85 font-normal leading-snug tracking-tight">
                {subtitle}
              </p>
              <p className="mt-2 text-[12.5px] md:text-[13.5px] text-[#0B1F33]/65 leading-snug max-w-xl mx-auto">
                {isEN
                  ? "Personal support for emotional strain, mental challenges, anxiety, stress, inner conflicts or processes of change – flexibly by phone or online."
                  : "Persönliche Unterstützung bei emotionalen Belastungen, mentalen Herausforderungen, Ängsten, Stress, inneren Konflikten oder Veränderungsprozessen – flexibel telefonisch oder online."}
              </p>
            </div>

            {/* Bullets — compact inner grid */}
            <ul className="mt-5 md:mt-6 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 border-t border-[#E2E8EE] pt-4">
              {bullets.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5 text-[12.5px] md:text-[13.5px] text-[#0B1F33]/80 leading-snug">
                  <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#E8F5EE] to-[#F0F7F3] text-[#2E7D32] border border-[#2E7D32]/20 shadow-[0_0_0_3px_rgba(46,125,50,0.04)]">
                    <Icon className="w-3 h-3" strokeWidth={2} />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CALENDLY — unified container system (white card on silver) */}
      <section className="bg-[#F8FAFC] border-b border-[#E8EDF3]">
        <div className="container-main py-6 md:py-8">
          <div className="max-w-3xl mx-auto bg-white/85 backdrop-blur-sm border-2 border-[#D8E0EA] rounded-3xl shadow-[0_8px_30px_rgba(27,58,92,0.07)] p-4 md:p-5">
            <div className="text-center mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-light text-[#1B3A5C] tracking-tight mb-1">
                {isEN ? "Book your appointment" : "Termin buchen"}
              </h2>
              <p className="text-[12.5px] md:text-[13px] text-[#1B3A5C]/70">
                {isEN
                  ? "Choose a time that suits you – directly in the calendar below."
                  : "Wählen Sie direkt im Kalender unten einen passenden Termin."}
              </p>
            </div>

            {/* Premium info badges — always-visible price & duration transparency */}
            <div className="mb-4 md:mb-5 flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
              {[
                isEN ? "60 min online consultation" : "60 Min. Online-Beratung",
                isEN ? "Germany & Austria: €179" : "Deutschland & Österreich: 179 €",
                isEN ? "Switzerland: CHF 179" : "Schweiz: 179 CHF",
                isEN ? "By phone or video" : "Telefonisch oder per Video",
                isEN ? "Creditable toward intensive session" : "Auf Intensivsitzung anrechenbar",
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-[#2E7D32]/18 bg-gradient-to-b from-[#F8FBF9] to-white px-2.5 py-1 text-[11px] md:text-[11.5px] text-[#1B3A5C]/85 tracking-tight shadow-[0_1px_2px_rgba(27,58,92,0.04)]"
                >
                  {label}
                </span>
              ))}
            </div>

            <CalendlyInlineEmbed
              loadingLabel={isEN ? "Loading calendar …" : "Kalender wird geladen …"}
            />

            <p className="mt-3 md:mt-4 text-[11.5px] md:text-[12.5px] text-foreground/65 text-center leading-snug max-w-2xl mx-auto">
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

