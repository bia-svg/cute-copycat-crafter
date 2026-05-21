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

function CalendlyInlineEmbed({
  onLoaded,
  visible,
  isEN,
}: {
  onLoaded?: () => void;
  visible: boolean;
  isEN: boolean;
}) {
  const [showFallback, setShowFallback] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let iframeObserver: MutationObserver | null = null;
    let calendlyReadyTimeout: number | null = null;
    let iframeElement: HTMLIFrameElement | null = null;
    let hasReportedLoaded = false;

    let fallbackTimeout: number | null = null;

    const markLoaded = () => {
      if (cancelled || hasReportedLoaded) return;
      hasReportedLoaded = true;
      if (calendlyReadyTimeout) {
        window.clearTimeout(calendlyReadyTimeout);
        calendlyReadyTimeout = null;
      }
      if (fallbackTimeout) {
        window.clearTimeout(fallbackTimeout);
        fallbackTimeout = null;
      }
      setShowFallback(false);
      iframeObserver?.disconnect();
      onLoaded?.();
    };

    const triggerFallback = () => {
      if (cancelled || hasReportedLoaded) return;
      hasReportedLoaded = true;
      if (calendlyReadyTimeout) {
        window.clearTimeout(calendlyReadyTimeout);
        calendlyReadyTimeout = null;
      }
      iframeObserver?.disconnect();
      setShowFallback(true);
      // Signal parent so the loading state ends and the close button appears.
      onLoaded?.();
    };

    // Visual readiness check: after 5s, verify the iframe actually rendered
    // measurable content. If not (blank/white on older devices), show fallback.
    fallbackTimeout = window.setTimeout(() => {
      if (cancelled || hasReportedLoaded) return;
      const iframe = containerRef.current?.querySelector("iframe");
      const renderedHeight = iframe?.getBoundingClientRect().height ?? 0;
      // Calendly sets the iframe height via page_height_resize once content
      // is rendered. If still near zero, the embed is effectively blank.
      if (!iframe || renderedHeight < 200) {
        triggerFallback();
      }
    }, 5000);


    const attachIframeListener = () => {
      const nextIframe = containerRef.current?.querySelector("iframe");
      if (!nextIframe || nextIframe === iframeElement) return false;
      iframeElement = nextIframe;
      return true;
    };

    const handleCalendlyMessage = (e: MessageEvent) => {
      if (typeof e.origin !== "string" || !e.origin.includes("calendly.com")) return;
      const data = e.data as { event?: string } | undefined;
      if (!data || typeof data.event !== "string") return;
      // Only real content-rendered events count as "loaded".
      if (
        data.event === "calendly.event_type_viewed" ||
        data.event === "calendly.profile_page_viewed" ||
        data.event === "calendly.page_height_resize"
      ) {
        markLoaded();
      }
    };

    window.addEventListener("message", handleCalendlyMessage);

    const initWidget = () => {
      if (cancelled || !containerRef.current || !window.Calendly?.initInlineWidget) return;

      containerRef.current.innerHTML = "";
      iframeElement = null;
      hasReportedLoaded = false;
      window.Calendly.initInlineWidget({
        url: CALENDLY_EMBED_URL,
        parentElement: containerRef.current,
      });

      if (!attachIframeListener()) {
        iframeObserver = new MutationObserver(() => {
          if (attachIframeListener()) {
            iframeObserver?.disconnect();
          }
        });

        iframeObserver.observe(containerRef.current, { childList: true, subtree: true });
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
      if (calendlyReadyTimeout) {
        window.clearTimeout(calendlyReadyTimeout);
      }
      if (fallbackTimeout) {
        window.clearTimeout(fallbackTimeout);
      }
      iframeObserver?.disconnect();
      iframeElement?.removeEventListener("load", markLoaded);
      window.removeEventListener("message", handleCalendlyMessage);
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


  const wrapperVisible = visible || showFallback;

  return (
    <div
      className={`relative rounded-xl border-2 border-[#D8E0EA] bg-white p-0 shadow-[0_4px_16px_rgba(27,58,92,0.06)] transition-opacity duration-500 ease-out ${
        wrapperVisible ? "opacity-100" : "opacity-0 pointer-events-none h-0 overflow-hidden border-0 shadow-none"
      }`}
      aria-hidden={!wrapperVisible}
    >
      <div
        ref={containerRef}
        className={`calendly-inline-widget mx-auto w-full rounded-xl bg-white ${
          showFallback && !visible ? "hidden" : "h-[1150px] sm:h-[1500px] md:h-[1300px]"
        }`}
        data-url={CALENDLY_EMBED_URL}
      />
      {showFallback && !visible && (
        <div className="flex flex-col items-center justify-center text-center px-6 py-10 md:py-14 gap-4">
          <p className="text-[14px] md:text-[15px] text-[#1B3A5C]/80 max-w-md leading-relaxed">
            {isEN
              ? "The calendar could not be fully loaded on this device."
              : "Der Kalender konnte auf diesem Gerät nicht vollständig geladen werden."}
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2E7D32] hover:bg-[#26682A] text-white font-medium px-6 py-2.5 text-[13px] md:text-[13.5px] tracking-tight shadow-[0_2px_8px_rgba(46,125,50,0.20)] hover:shadow-[0_4px_14px_rgba(46,125,50,0.28)] transition-all"
          >
            {isEN ? "Open calendar directly" : "Kalender direkt öffnen"}
          </a>
        </div>
      )}
    </div>
  );
}




export default function OnlineBeratung() {
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const basePath = getPath("home", language, country);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const calendarSectionRef = useRef<HTMLDivElement | null>(null);
  const calendarMaxTimerRef = useRef<number | null>(null);
  const calendarLoadResolvedRef = useRef(false);
  const MAX_LOADING_MS = 2400;

  useEffect(() => {
    return () => {
      if (calendarMaxTimerRef.current) {
        window.clearTimeout(calendarMaxTimerRef.current);
      }
    };
  }, []);

  const handleOpenCalendar = () => {
    setCalendarLoaded(false);
    setCalendarOpen(true);
    calendarLoadResolvedRef.current = false;
    if (calendarMaxTimerRef.current) window.clearTimeout(calendarMaxTimerRef.current);
    calendarMaxTimerRef.current = window.setTimeout(() => {
      calendarLoadResolvedRef.current = true;
      setCalendarLoaded(true);
    }, MAX_LOADING_MS);
  };

  const handleCalendarLoaded = () => {
    if (calendarLoadResolvedRef.current) return;

    calendarLoadResolvedRef.current = true;
    if (calendarMaxTimerRef.current) {
      window.clearTimeout(calendarMaxTimerRef.current);
      calendarMaxTimerRef.current = null;
    }
    setCalendarLoaded(true);
  };


  const handleCloseCalendar = () => {
    if (calendarMaxTimerRef.current) {
      window.clearTimeout(calendarMaxTimerRef.current);
      calendarMaxTimerRef.current = null;
    }
    calendarLoadResolvedRef.current = false;
    setCalendarOpen(false);
    setCalendarLoaded(false);
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
      ]
    : [
        { icon: CalendarClock, text: "Kurzfristige Online-Termine möglich" },
        { icon: PhoneCall, text: "Telefonisch oder per Video" },
        { icon: ShieldCheck, text: "Vertraulich & individuell" },
        { icon: Award, text: "35+ Jahre praktische Erfahrung" },
      ];

  const title = isEN ? "Online Psychological Support" : "Online Psychologische Unterstützung";
  const subtitle = isEN
    ? "For emotional strain, anxiety, stress, inner conflicts and personal processes of change."
    : "Bei emotionalen Belastungen, Ängsten, Stress, inneren Konflikten und persönlichen Veränderungsprozessen.";

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
        <div className="container-main py-4 md:py-5">
          <div className="max-w-3xl mx-auto bg-white border-[1.5px] border-border rounded-3xl shadow-[0_22px_56px_-16px_rgba(27,58,92,0.22),0_6px_18px_-6px_rgba(27,58,92,0.12)] p-4 md:p-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-2.5">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#2E7D32]/35" />
                <p className="text-[10.5px] md:text-[12.5px] uppercase tracking-[0.16em] md:tracking-[0.22em] text-[#2E7D32] font-semibold whitespace-nowrap">
                  Lic. Psych. David J. Woods
                </p>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#2E7D32]/35" />
              </div>
              <h1 className="text-[23px] md:text-[32px] font-light tracking-tight text-[#1B3A5C] leading-[1.12]">
                {title}
              </h1>
              <p className="mt-2.5 text-[13.5px] md:text-[15px] text-[#0B1F33]/75 leading-relaxed max-w-xl mx-auto">
                {subtitle}
              </p>
            </div>

            {/* Bullets — clean airy 2-col grid */}
            <ul className="mt-4 md:mt-4 max-w-xl mx-auto flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-x-7 gap-y-2.5 border-t border-border pt-4">
              {bullets.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center justify-center sm:justify-start gap-2.5 text-[12.5px] md:text-[13.5px] text-[#0B1F33]/80 leading-snug sm:basis-[calc(50%-1rem)]">

                  <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#E8F5EE] to-[#F0F7F3] text-[#2E7D32] border border-[#2E7D32]/20 shadow-[0_0_0_3px_rgba(46,125,50,0.04)]">
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
        <div className="container-main py-4 md:py-5">
          <div className="max-w-2xl mx-auto bg-white border-[1.5px] border-[#D8E0EA] rounded-3xl shadow-[0_18px_48px_-12px_rgba(27,58,92,0.20),0_5px_16px_-4px_rgba(27,58,92,0.10),inset_0_1px_0_rgba(255,255,255,0.9)] p-4 md:p-6">
            <div className="text-center mb-2.5">
              <h2 className="text-[17px] md:text-[21px] font-medium text-[#1B3A5C] tracking-tight">
                {isEN ? "Available online appointments" : "Verfügbare Online-Termine"}
              </h2>
              <p className="mt-1 text-[12px] md:text-[13px] text-[#0B1F33]/85 font-medium tracking-tight">
                {isEN
                  ? "Germany & Austria · €99  ·  Switzerland · CHF 99"
                  : "Deutschland & Österreich · €99  ·  Schweiz · CHF 99"}
              </p>
            </div>

            {calendarOpen && (
              <CalendlyInlineEmbed
                visible={calendarLoaded}
                onLoaded={handleCalendarLoaded}
                isEN={isEN}
              />
            )}

            {calendarOpen && calendarLoaded ? (
              <div className="mt-3 flex justify-center animate-fade-in">
                <button
                  type="button"
                  onClick={handleCloseCalendar}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-[#f4f3ef] text-[#1B3A5C] font-medium px-6 py-2 text-[12.5px] md:text-[13px] tracking-tight border border-[#D8E0EA] shadow-[0_2px_8px_rgba(27,58,92,0.06)] hover:shadow-[0_4px_12px_rgba(27,58,92,0.10)] whitespace-nowrap"
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                  {isEN ? "Close calendar" : "Kalender schließen"}
                </button>
              </div>
            ) : (
              <div
                className={`relative rounded-2xl border bg-[#f4f3ef] px-5 py-4 md:px-8 md:py-5 transition-all duration-500 ease-out ${
                  calendarOpen && !calendarLoaded
                    ? "border-[#2E7D32]/30 shadow-[0_0_0_1px_rgba(46,125,50,0.08),0_6px_22px_-6px_rgba(46,125,50,0.22),0_3px_14px_-3px_rgba(27,58,92,0.10),inset_0_1px_0_rgba(255,255,255,0.6)] animate-soft-glow"
                    : "border-[#D4D0CA] shadow-[0_3px_14px_-3px_rgba(27,58,92,0.10),0_1px_4px_-1px_rgba(27,58,92,0.05),inset_0_1px_0_rgba(255,255,255,0.6)]"
                }`}
              >
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:items-center sm:gap-4 md:gap-5">
                  <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-xl bg-white text-[#2E7D32] border border-[#2E7D32]/20 shadow-[0_2px_6px_rgba(46,125,50,0.12)]">
                    <CalendarDays className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={2} />
                  </span>
                  <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-2 md:gap-3">
                    <button
                      type="button"
                      onClick={handleOpenCalendar}
                      disabled={calendarOpen && !calendarLoaded}
                      aria-busy={calendarOpen && !calendarLoaded}
                      className="inline-flex items-center justify-center rounded-full bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#142b16] font-bold px-8 py-2.5 text-[12.5px] sm:text-[13px] tracking-tight border border-[#2E7D32]/25 shadow-[0_4px_14px_rgba(46,125,50,0.28),0_0_0_1px_rgba(46,125,50,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] hover:shadow-[0_6px_20px_rgba(46,125,50,0.38),0_0_0_1px_rgba(46,125,50,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] whitespace-nowrap transition-all duration-300 disabled:cursor-default disabled:hover:bg-[#E8F5E9]"
                    >
                      <span key={calendarOpen ? "loading" : "idle"} className="animate-fade-in">
                        {calendarOpen && !calendarLoaded
                          ? isEN ? "Loading calendar …" : "Kalender wird geladen …"
                          : isEN ? "Open calendar" : "Kalender öffnen"}
                      </span>
                    </button>
                    <p className="text-[11px] sm:text-[13.5px] text-[#1B3A5C]/50 sm:text-[#1B3A5C] sm:font-medium tracking-tight sm:tracking-normal leading-snug">
                      {isEN ? "To find your preferred appointment" : "Um Ihren gewünschten Termin zu finden"}
                    </p>
                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      </section>

      {/* INFO / SEO — premium private-practice context */}
      <section className="bg-[#f4f3ef] border-t border-border">
        <div className="container-main py-4 md:py-5">
          <div className="max-w-5xl mx-auto bg-white border-[1.5px] border-border rounded-3xl shadow-[0_22px_56px_-16px_rgba(27,58,92,0.22),0_6px_18px_-6px_rgba(27,58,92,0.12)] p-4 md:p-6">
            <div className="flex items-center justify-center gap-3 mb-2.5 md:mb-3.5">
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
            <div className="mt-4 md:mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
              <div className="md:col-span-6 md:pt-1 space-y-2.5 text-[13px] md:text-[14px] text-[#0B1F33]/80 leading-relaxed">
                <p className="text-[13.5px] md:text-[15px] text-[#1B3A5C] font-medium leading-snug">
                  {isEN
                    ? "A confidential space for orientation, clarity and emotional relief."
                    : "Ein vertraulicher Raum für Orientierung, Klarheit und emotionale Entlastung."}
                </p>
                <p>
                  {isEN
                    ? "Not everyone is immediately looking for long-term therapy."
                    : "Nicht jeder Mensch sucht sofort eine langfristige Therapie."}
                </p>
                <p>
                  {isEN
                    ? "Often there is simply the wish for orientation, a confidential conversation and professional psychological support in stressful life situations."
                    : "Oft besteht zunächst einfach der Wunsch nach Orientierung, einem vertraulichen Gespräch und professioneller psychologischer Unterstützung in belastenden Lebenssituationen."}
                </p>
                <p>
                  {isEN
                    ? "Online support is aimed at people with emotional strain, stress, inner conflicts or personal processes of change."
                    : "Die Online-Unterstützung richtet sich an Menschen mit emotionalen Belastungen, Stress, inneren Konflikten oder persönlichen Veränderungsprozessen."}
                </p>
                <p>
                  {isEN
                    ? "With more than 35 years of practical experience, David J. Woods accompanies clients discreetly, individually and in a solution-oriented way."
                    : "Mit über 35 Jahren praktischer Erfahrung begleitet David J. Woods Klientinnen und Klienten diskret, individuell und lösungsorientiert."}
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
                    <li className="group flex items-center gap-2 rounded-xl border border-border bg-[#f4f3ef] px-2.5 py-1.5 text-[12px] md:text-[12.5px] text-[#0B1F33]/85 leading-snug shadow-[0_1px_3px_rgba(27,58,92,0.05)] hover:border-[#2E7D32]/40 hover:bg-[#E8F5E9]/40 hover:shadow-[0_3px_10px_rgba(46,125,50,0.10)] transition-all">
                      <span className="shrink-0 inline-block w-1.5 h-1.5 rounded-full bg-[#2E7D32]/65 group-hover:bg-[#2E7D32]" />
                      <span>{topic}</span>
                    </li>
                  );
                  return (
                    <>
                      {/* Desktop: compact 2-col grid */}
                      <ul className="hidden md:grid grid-cols-2 gap-1">
                        {topics.map((t) => <TopicItem key={t} topic={t} />)}
                      </ul>
                      {/* Mobile: collapsible */}
                      <details className="md:hidden group rounded-2xl border border-[#2E7D32]/25 bg-[#f4f3ef] shadow-[0_1px_4px_rgba(27,58,92,0.06)] open:shadow-[0_6px_18px_rgba(27,58,92,0.10)] transition-shadow">
                        <summary className="list-none cursor-pointer flex items-center justify-between px-4 py-3 text-[13px] font-medium text-[#1B3A5C] [&::-webkit-details-marker]:hidden active:scale-[0.98] transition-transform">
                          <span>{isEN ? "Topics we address" : "Themen, die wir begleiten"}</span>
                          <span aria-hidden="true" className="ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E8F5E9] border border-[#2E7D32]/30 text-[#2E7D32] shadow-[0_2px_6px_rgba(46,125,50,0.12)] transition-all group-open:rotate-45 group-open:bg-[#C8E6C9] group-open:border-[#2E7D32]/40">
                            <span className="block w-3.5 h-px bg-current relative before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-3.5 before:bg-current" />
                          </span>
                        </summary>
                        <ul className="px-3 pb-3 pt-1 grid grid-cols-1 gap-1">
                          {topics.map((t) => <TopicItem key={t} topic={t} />)}
                        </ul>
                      </details>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Latin closing */}
            <div className="mt-3 md:mt-4 pt-2.5 md:pt-3 border-t border-border text-center">
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

