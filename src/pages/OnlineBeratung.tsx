import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getPath } from "@/lib/routes";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  CalendarClock,
  CalendarDays,
  PhoneCall,
  ShieldCheck,
  Award,
  Sparkles,
  Repeat,
  X,
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
    <div className="relative rounded-xl border-2 border-[#D8E0EA] bg-white p-0 shadow-[0_4px_16px_rgba(27,58,92,0.06)]">
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
        className="calendly-inline-widget mx-auto w-full rounded-xl bg-white h-[1150px] sm:h-[1500px] md:h-[1300px]"
        data-url={CALENDLY_EMBED_URL}
      />
    </div>
  );
}

export default function OnlineBeratung() {
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const basePath = getPath("home", language, country);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarSectionRef = useRef<HTMLDivElement | null>(null);

  const handleOpenCalendar = () => {
    setCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setCalendarOpen(false);
    requestAnimationFrame(() => {
      calendarSectionRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
    });
  };

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
    ? "Professional psychological support for emotional strain, anxiety, stress, inner conflicts and personal processes of change — discreet, empathetic and solution-oriented."
    : "Professionelle psychologische Unterstützung bei emotionalen Belastungen, Ängsten, Stress, inneren Konflikten und persönlichen Veränderungsprozessen — diskret, einfühlsam und lösungsorientiert.";

  return (
    <>
      <SEO
        titleDE="Online Psychologische Beratung | David J. Woods"
        titleEN="Online Psychological Consultation | David J. Woods"
        descriptionDE="Professionelle Online Psychologische Beratung bei emotionalen Belastungen, Stress, Ängsten, inneren Konflikten und persönlichen Veränderungsprozessen. Kurzfristige Termine telefonisch oder online möglich."
        descriptionEN="Professional online psychological consultation for emotional strain, stress, anxiety, inner conflicts and personal processes of change. Short-notice appointments available by phone or online."
        pageKey="onlineBeratung"
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: basePath },
          { name: title, path: getPath("onlineBeratung", language, country) },
        ]}
      />

      {/* HERO — premium private-practice container */}
      <section className="relative bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-7 md:py-10">
          <div className="max-w-5xl mx-auto bg-white border-[1.5px] border-border rounded-3xl shadow-[0_22px_56px_-16px_rgba(27,58,92,0.22),0_6px_18px_-6px_rgba(27,58,92,0.12)] p-6 md:p-9">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-3.5">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#2E7D32]/35" />
                <p className="text-[10.5px] md:text-[12.5px] uppercase tracking-[0.16em] md:tracking-[0.22em] text-[#2E7D32] font-semibold whitespace-nowrap">
                  Lic. Psych. David J. Woods
                </p>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#2E7D32]/35" />
              </div>
              <h1 className="text-[23px] md:text-[32px] font-light tracking-tight text-[#1B3A5C] leading-[1.12]">
                {title}
              </h1>
              <p className="mt-3.5 text-[13.5px] md:text-[15px] text-[#0B1F33]/75 leading-relaxed max-w-xl mx-auto">
                {subtitle}
              </p>
            </div>

            {/* Bullets — compact inner grid */}
            <ul className="mt-6 md:mt-7 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-2.5 border-t border-border pt-5">
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

      {/* CALENDLY — compact premium appointment preview */}
      <section ref={calendarSectionRef} className="bg-[#DDE1E4] border-b border-border scroll-mt-20">
        <div className="container-main py-5 md:py-7">
          <div className="max-w-2xl mx-auto bg-white border-[1.5px] border-[#D8E0EA] rounded-3xl shadow-[0_18px_48px_-12px_rgba(27,58,92,0.20),0_5px_16px_-4px_rgba(27,58,92,0.10),inset_0_1px_0_rgba(255,255,255,0.9)] p-4 md:p-6">
            <div className="text-center mb-2.5">
              <h2 className="text-[15px] md:text-lg font-light text-[#1B3A5C] tracking-tight">
                {isEN ? "View available online appointments" : "Verfügbare Online-Termine anzeigen"}
              </h2>
              <p className="mt-1 text-[11px] md:text-[12px] text-[#0B1F33]/50 tracking-tight">
                {isEN
                  ? "Germany & Austria · €179  ·  Switzerland · CHF 179"
                  : "Deutschland & Österreich · 179 €  ·  Schweiz · 179 CHF"}
              </p>
            </div>

            {calendarOpen ? (
              <>
                <CalendlyInlineEmbed
                  loadingLabel={isEN ? "Loading calendar …" : "Kalender wird geladen …"}
                />
                <div className="mt-3 flex justify-center">
                  <button
                    type="button"
                    onClick={handleCloseCalendar}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-[#f4f3ef] text-[#1B3A5C] font-medium px-6 py-2 text-[12.5px] md:text-[13px] tracking-tight border border-[#D8E0EA] shadow-[0_2px_8px_rgba(27,58,92,0.06)] hover:shadow-[0_4px_12px_rgba(27,58,92,0.10)] whitespace-nowrap"
                  >
                    <X className="w-4 h-4" strokeWidth={2} />
                    {isEN ? "Close calendar" : "Kalender schließen"}
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-[#E2E8EE] bg-[#f4f3ef] px-5 py-4 md:px-8 md:py-5 shadow-[0_2px_10px_-2px_rgba(27,58,92,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]">
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:items-center sm:gap-4 md:gap-5">
                  <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-xl bg-white text-[#2E7D32] border border-[#2E7D32]/20 shadow-[0_2px_6px_rgba(46,125,50,0.12)]">
                    <CalendarDays className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={2} />
                  </span>
                  <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-2 md:gap-3">
                    <button
                      type="button"
                      onClick={handleOpenCalendar}
                      className="inline-flex items-center justify-center rounded-full bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#142b16] font-bold px-8 py-2.5 text-[12.5px] sm:text-[13px] tracking-tight border border-[#2E7D32]/25 shadow-[0_4px_14px_rgba(46,125,50,0.28),0_0_0_1px_rgba(46,125,50,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] hover:shadow-[0_6px_20px_rgba(46,125,50,0.38),0_0_0_1px_rgba(46,125,50,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] whitespace-nowrap transition-shadow"
                    >
                      {isEN ? "Open calendar" : "Kalender öffnen"}
                    </button>
                    <p className="text-[11px] sm:text-[13.5px] text-[#1B3A5C]/50 sm:text-[#1B3A5C] sm:font-medium tracking-tight sm:tracking-normal leading-snug">
                      {isEN ? "To find your preferred appointment" : "Um Ihren gewünschten Termin zu finden"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="mt-2.5 text-[11px] md:text-[11.5px] text-[#0B1F33]/55 text-center leading-snug max-w-2xl mx-auto tracking-tight">
              {isEN
                ? "Payment details will be sent by email."
                : "Die Zahlungsinformationen erhalten Sie per E-Mail."}
            </p>
          </div>
        </div>
      </section>

      {/* INFO / SEO — premium private-practice context */}
      <section className="bg-[#f4f3ef] border-t border-border">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-5xl mx-auto bg-white border-[1.5px] border-border rounded-3xl shadow-[0_22px_56px_-16px_rgba(27,58,92,0.22),0_6px_18px_-6px_rgba(27,58,92,0.12)] p-5 md:p-8">
            <div className="flex items-center justify-center gap-3 mb-3.5 md:mb-4">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#2E7D32]/35" />
              <p className="text-[10px] md:text-[11.5px] uppercase tracking-[0.16em] md:tracking-[0.22em] text-[#2E7D32] font-semibold whitespace-nowrap">
                {isEN ? "Psychological orientation" : "Psychologische Orientierung"}
              </p>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#2E7D32]/35" />
            </div>

            <h2 className="text-[19px] md:text-[24px] font-light tracking-tight text-[#1B3A5C] leading-[1.2] text-center max-w-3xl mx-auto">
              {isEN
                ? "Psychological support for emotional strain and personal processes of change"
                : "Psychologische Unterstützung bei emotionalen Belastungen und persönlichen Veränderungsprozessen"}
            </h2>

            {/* Two-column desktop layout: text + topic grid */}
            <div className="mt-5 md:mt-7 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start">
              <div className="md:col-span-6 space-y-3 text-[13px] md:text-[14px] text-[#0B1F33]/80 leading-relaxed">
                <p>
                  {isEN
                    ? "Not everyone is immediately looking for long-term therapy. Often there is simply the wish for professional online psychological consultation, understanding, a confidential conversation or a clear perspective on a stressful situation."
                    : "Nicht jeder Mensch sucht sofort eine langfristige Therapie. Oft besteht zunächst einfach der Wunsch nach professioneller psychologischer Beratung, Verständnis, einem vertraulichen Gespräch oder einem klaren Blick auf belastende Situationen."}
                </p>
                <p>
                  {isEN
                    ? "Online psychological consultation is aimed at people who feel emotionally burdened, are under stress, experience inner conflicts or find themselves in personal processes of change. Many clients are looking for short-notice professional psychological support, clear orientation and concrete new perspectives."
                    : "Die Online Psychologische Beratung richtet sich an Menschen, die sich emotional belastet fühlen, unter Stress stehen, innere Konflikte erleben oder sich in persönlichen Veränderungsprozessen befinden. Viele Klientinnen und Klienten wünschen sich kurzfristige professionelle psychologische Unterstützung, verständliche Einordnung und konkrete neue Perspektiven."}
                </p>
                <p>
                  {isEN
                    ? "With more than 35 years of practical experience in psychology, hypnosis and counselling, David J. Woods provides psychological consultation individually, discreetly and in a solution-oriented way."
                    : "Mit über 35 Jahren praktischer Erfahrung in Psychologie, Hypnose und Gesprächsführung begleitet David J. Woods seine Klientinnen und Klienten in der psychologischen Beratung individuell, diskret und lösungsorientiert."}
                </p>
              </div>

              {/* Themenfelder — desktop grid, mobile collapsible */}
              <div className="md:col-span-6">
                {(() => {
                  const topics = isEN
                    ? [
                        "Stress & emotional overload",
                        "Anxiety & inner uncertainty",
                        "Inner blocks & self-doubt",
                        "Mental exhaustion",
                        "Personal processes of change",
                        "Professional pressure & emotional strain",
                        "Relationship topics & inner conflicts",
                        "Emotional processing of past experiences",
                        "Motivation & mental strength",
                        "Self-worth & inner stability",
                        "Conversations in difficult life situations",
                        "Short-notice psychological support",
                      ]
                    : [
                        "Stress & emotionale Überlastung",
                        "Ängste & innere Unsicherheit",
                        "Innere Blockaden & Selbstzweifel",
                        "Mentale Erschöpfung",
                        "Persönliche Veränderungsprozesse",
                        "Beruflicher Druck & emotionale Belastung",
                        "Beziehungsthemen & innere Konflikte",
                        "Emotionale Verarbeitung vergangener Erfahrungen",
                        "Motivation & mentale Stärke",
                        "Selbstwert & innere Stabilität",
                        "Gespräche in schwierigen Lebenssituationen",
                        "Kurzfristige psychologische Unterstützung",
                      ];
                  const TopicItem = ({ topic }: { topic: string }) => (
                    <li className="group flex items-center gap-2 rounded-xl border border-border bg-[#f4f3ef] px-3 py-2 text-[12.5px] md:text-[13px] text-[#0B1F33]/85 leading-snug shadow-[0_1px_3px_rgba(27,58,92,0.05)] hover:border-[#2E7D32]/40 hover:bg-[#E8F5E9]/40 hover:shadow-[0_3px_10px_rgba(46,125,50,0.10)] transition-all">
                      <span className="shrink-0 inline-block w-1.5 h-1.5 rounded-full bg-[#2E7D32]/65 group-hover:bg-[#2E7D32]" />
                      <span>{topic}</span>
                    </li>
                  );
                  return (
                    <>
                      {/* Desktop: compact 2-col grid */}
                      <ul className="hidden md:grid grid-cols-2 gap-1.5">
                        {topics.map((t) => <TopicItem key={t} topic={t} />)}
                      </ul>
                      {/* Mobile: collapsible */}
                      <details className="md:hidden group rounded-2xl border border-[#2E7D32]/25 bg-[#f4f3ef] shadow-[0_1px_4px_rgba(27,58,92,0.06)] open:shadow-[0_6px_18px_rgba(27,58,92,0.10)] transition-shadow">
                        <summary className="list-none cursor-pointer flex items-center justify-between px-4 py-3.5 text-[13px] font-medium text-[#1B3A5C] [&::-webkit-details-marker]:hidden active:scale-[0.98] transition-transform">
                          <span>{isEN ? "Topics we address" : "Themen, die wir begleiten"}</span>
                          <span aria-hidden="true" className="ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E8F5E9] border border-[#2E7D32]/30 text-[#2E7D32] shadow-[0_2px_6px_rgba(46,125,50,0.12)] transition-all group-open:rotate-45 group-open:bg-[#C8E6C9] group-open:border-[#2E7D32]/40">
                            <span className="block w-3.5 h-px bg-current relative before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-3.5 before:bg-current" />
                          </span>
                        </summary>
                        <ul className="px-3 pb-3 pt-1 grid grid-cols-1 gap-1.5">
                          {topics.map((t) => <TopicItem key={t} topic={t} />)}
                        </ul>
                      </details>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Latin closing */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-5 border-t border-border text-center">
              <p className="text-[12.5px] md:text-[13.5px] italic text-[#1B3A5C]/75 tracking-tight">
                Mens sana in corpore sano.
              </p>
              <p className="mt-1 text-[11px] md:text-[11.5px] text-[#0B1F33]/55">
                {isEN
                  ? "A healthy mind in a healthy body."
                  : "Ein gesunder Geist in einem gesunden Körper."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

