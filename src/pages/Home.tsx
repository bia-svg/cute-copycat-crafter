import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import ServiceCard from "@/components/ServiceCard";
import AcademicSeal from "@/components/AcademicSeal";
import licPsychSeal from "@/assets/lic-psych-seal.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import InlineContactForm from "@/components/InlineContactForm";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import hero1 from "@/assets/david-office-portrait.webp";
import hero1Mobile from "@/assets/david-office-portrait-mobile.webp";
import davidSessionImg from "@/assets/david-portrait-outdoor.jpg";
import corporateSuccessImg from "@/assets/corporate-success.jpg";
import corporateResilienceImg from "@/assets/corporate-resilience.jpg";
import corporateStressImg from "@/assets/corporate-stress.jpg";
import corporateNonsmokerImg from "@/assets/corporate-nonsmoker.jpg";

// Hero slider order (5 images): David am Schreibtisch (start) → others
const heroDesktop = [
  hero1,
  () => import("@/assets/hero-4.webp").then(m => m.default),
  () => import("@/assets/hero-5.webp").then(m => m.default),
  () => import("@/assets/hero-1.webp").then(m => m.default),
  () => import("@/assets/hero-3.webp").then(m => m.default),
];
const heroMobile = [
  hero1Mobile,
  () => import("@/assets/hero-4-mobile.webp").then(m => m.default),
  () => import("@/assets/hero-5-mobile.webp").then(m => m.default),
  () => import("@/assets/hero-1-mobile.webp").then(m => m.default),
  () => import("@/assets/hero-3-mobile.webp").then(m => m.default),
];
import {
  Cigarette, Brain, Scale, Flame, HeartPulse, Users,
  Trophy, Shield, Clock, BookOpen, ArrowRight, Star, Award, BadgeCheck,
  ChevronLeft, ChevronRight, CheckCircle, Tv
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   TV Logo Carousel
   ══════════════════════════════════════════════════════════════ */
function TVLogoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 200, behavior: "smooth" });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
     <div className="relative bg-muted/50 rounded-lg p-2">
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide py-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
        {CDN.bekanntAus.map((src, i) => (
          <img key={i} src={src} alt={`David J. Woods bekannt aus Medien – Logo ${i + 1}`} className="h-7 md:h-9 object-contain shrink-0 saturate-[0.55] opacity-80 hover:opacity-100 hover:saturate-100 transition-all mix-blend-multiply" width={80} height={40} loading="lazy" decoding="async" sizes="(min-width: 768px) 100px, 80px" />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const { language, country, t, isSwiss, isInternational, showCH, showDE } = useLanguage();
  const isMobile = useIsMobile();
  const isEN = language === "en";
  const deferredSectionStyle = {};

  /* ── Hero Slider ── */
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<Record<number, string>>({ 0: hero1 });
  const [loadedMobile, setLoadedMobile] = useState<Record<number, string>>({ 0: hero1Mobile });
  const [showMediaLogos, setShowMediaLogos] = useState(false);
  const totalSlides = 5;

  const goToSlide = (index: number) => {
    if (isMobile) {
      if (loadedMobile[index]) {
        setCurrentSlide(index);
        return;
      }

      const loader = heroMobile[index];
      if (typeof loader === "function") {
        void loader().then((src) => {
          setLoadedMobile((prev) => (prev[index] ? prev : { ...prev, [index]: src }));
          setCurrentSlide(index);
        });
        return;
      }

      setCurrentSlide(index);
      return;
    }

    if (loadedSlides[index]) {
      setCurrentSlide(index);
      return;
    }

    const loader = heroDesktop[index];
    if (typeof loader === "function") {
      void loader().then((src) => {
        setLoadedSlides((prev) => (prev[index] ? prev : { ...prev, [index]: src }));
        setCurrentSlide(index);
      });
      return;
    }

    setCurrentSlide(index);
  };

  const goNext = () => goToSlide((currentSlide + 1) % totalSlides);
  const goPrev = () => goToSlide((currentSlide - 1 + totalSlides) % totalSlides);

  // Preload next slide
  useEffect(() => {
    const next = (currentSlide + 1) % totalSlides;

    if (isMobile) {
      if (!loadedMobile[next] && typeof heroMobile[next] === "function") {
        void (heroMobile[next] as () => Promise<string>)().then((src) =>
          setLoadedMobile((prev) => (prev[next] ? prev : { ...prev, [next]: src }))
        );
      }
      return;
    }

    if (!loadedSlides[next] && typeof heroDesktop[next] === "function") {
      void (heroDesktop[next] as () => Promise<string>)().then((src) =>
        setLoadedSlides((prev) => (prev[next] ? prev : { ...prev, [next]: src }))
      );
    }
  }, [currentSlide, isMobile, loadedMobile, loadedSlides]);

  useEffect(() => {
    if (isMobile) return;

    const interval = window.setInterval(() => {
      const next = (currentSlide + 1) % totalSlides;
      if (loadedSlides[next]) {
        setCurrentSlide(next);
      }
    }, 4500);

    return () => window.clearInterval(interval);
  }, [currentSlide, isMobile, loadedSlides, totalSlides]);

  useEffect(() => {
    const browserWindow = globalThis as typeof window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (browserWindow.requestIdleCallback) {
      const idleId = browserWindow.requestIdleCallback(() => setShowMediaLogos(true), { timeout: 2500 });
      return () => browserWindow.cancelIdleCallback?.(idleId);
    }

    const timeout = browserWindow.setTimeout(() => setShowMediaLogos(true), 1500);
    return () => browserWindow.clearTimeout(timeout);
  }, []);

  /* ── Services ── */
  const services = [
    {
      title: t("service.smoking"),
      description: isEN
        ? "Many people want to quit smoking and try again and again. Smoking is an unpleasant addiction that can cause massive damage not only to you but also to those around you."
        : "Rauchfrei werden – Raucherentwöhnung & Rauchstopp dauerhaft und ohne Druck.",
      href: getPath("smoking", language, country),
      icon: <Cigarette className="w-5 h-5" />,
      image: CDN.stopSmoking,
    },
    {
      title: isEN ? t("service.anxiety") : "Ängste, Panik & Phobien",
      description: isEN
        ? "Overcoming anxieties and phobias is not always easy. Insecurities are a natural protective mechanism that everyone possesses."
        : "Ängste bewältigen, Phobien lösen und belastende Gedanken in den Griff bekommen.",
      href: getPath("anxiety", language, country),
      icon: <Brain className="w-5 h-5" />,
      image: CDN.anxietyRelief,
      imagePosition: "center 40%",
    },
    {
      title: isEN ? t("service.weight") : "Abnehmen & Essverhalten",
      description: isEN
        ? "Losing weight is not always easy, yet every year countless people try one curious diet after another."
        : "Abnehmen, Gewichtsreduktion und Essverhalten nachhaltig verändern.",
      href: getPath("weight", language, country),
      icon: <Scale className="w-5 h-5" />,
      image: CDN.weightLoss,
      imagePosition: "center 30%",
      mobileImagePosition: "25% center",
    },
    {
      title: isEN ? t("service.stress") : "Stress bewältigen",
      description: isEN
        ? "Stress reduction and burnout prevention are incredibly important topics in today's world."
        : "Stress reduzieren, Burnout vorbeugen und innere Ruhe wiederfinden.",
      href: getPath("stress", language, country),
      icon: <Flame className="w-5 h-5" />,
      image: CDN.stressBurnout,
    },
    {
      title: isEN ? t("service.children") : "Kinder & Jugendliche stärken",
      description: isEN
        ? "With hypnosis for children and teenagers, not only problems but also fears can be overcome."
        : "Konzentration stärken, Selbstbewusstsein aufbauen und Ängste lösen.",
      href: getPath("children", language, country),
      icon: <Users className="w-5 h-5" />,
      image: CDN.childrenTeens,
    },
    {
      title: isEN ? t("service.depression") : "Depression & Trauma lösen",
      description: isEN
        ? "Hypnosis for depression and trauma helps you discover new perspectives and regain your joy of life."
        : "Depressionen lösen, Trauma verarbeiten und wieder Lebensfreude spüren.",
      href: getPath("depression", language, country),
      icon: <HeartPulse className="w-5 h-5" />,
      image: CDN.depressionTrauma,
    },
  ];

  /* ── Shop Items ── */
  const priceSmall = isInternational ? "EUR 9,90 / CHF 11,90" : isSwiss ? "CHF 11,90" : "EUR 9,90";
  const priceBig = isInternational ? "EUR 197 / CHF 220" : isSwiss ? "CHF 220" : "EUR 197";
  const shopItems = [
    { title: isEN ? "Stop Smoking" : "Raucherentwöhnung", subtitle: "Hypnose MP3", price: priceSmall },
    { title: isEN ? "Weight Loss" : "Abnehmen", subtitle: "Hypnose MP3", price: priceSmall },
    { title: isEN ? "Deep Relaxation" : "Tiefenentspannung", subtitle: "Hypnose MP3", price: priceSmall },
    { title: isEN ? "30+ Audio Bundle" : "30+ Audio Paket", subtitle: isEN ? "Complete Collection" : "Komplettpaket", price: priceBig },
  ];

  return (
    <>
      <SEO {...pageSEO.home} pageKey="home" />
      <section className="bg-secondary">
        {!isMobile ? (
          <div className="grid md:grid-cols-[340px_1fr] container-main py-2 md:pb-1 gap-8 items-stretch">
            <div className="relative w-[340px] aspect-[4/3] rounded-2xl overflow-hidden mx-auto group self-center">
              {Object.entries(loadedSlides).map(([idx, src]) => (
                <img
                  key={idx}
                  src={src}
                  alt={`David J. Woods – Hypnotherapeut und Psychologe, Foto ${Number(idx) + 1}`}
                  width={360}
                  height={420}
                  sizes="(min-width: 768px) 360px, 100vw"
                  loading={idx === "0" ? "eager" : "lazy"}
                  fetchPriority={idx === "0" ? "high" : "auto"}
                  decoding={idx === "0" ? "sync" : "async"}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${Number(idx) === currentSlide ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <button onClick={goPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Previous">
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button onClick={goNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Next">
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {Array.from({ length: totalSlides }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-2 rounded-full transition-all ${i === currentSlide ? "bg-primary w-6" : "bg-primary/30 w-2"}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between text-center min-w-0 py-1">
              <div className="flex flex-col items-center justify-center flex-1">
                <p className="text-[12.5px] lg:text-[13px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  {isEN
                    ? "Germany · Switzerland · International"
                    : "Deutschland · Schweiz · International"}
                </p>
                <h1 className="mt-3 text-[1.6rem] lg:text-[1.95rem] font-light text-foreground leading-[1.2] tracking-tight">
                  Lic. Psych. <span className="font-medium">David J. Woods</span>
                </h1>
                <div className="mt-5 inline-flex items-center gap-4 select-none" aria-hidden="false">
                  <span className="h-px w-8 lg:w-10 bg-primary/25" aria-hidden="true" />
                  <span className="italic font-light text-primary/90 text-[16px] lg:text-[18px] tracking-[0.06em]" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}>
                    {isEN ? "Freedom Begins in the Mind" : "Freiheit beginnt im Kopf"}
                  </span>
                  <span className="h-px w-8 lg:w-10 bg-primary/25" aria-hidden="true" />
                </div>
                <p className="mt-4 text-foreground/85 text-[13.5px] lg:text-[14.5px] font-normal uppercase tracking-[0.22em] flex items-center justify-center lg:justify-start gap-2.5">
                  <span>{isEN ? "Psychology" : "Psychologie"}</span>
                  <span className="text-primary/60" aria-hidden="true">·</span>
                  <span>{isEN ? "Hypnosis" : "Hypnose"}</span>
                  <span className="text-primary/60" aria-hidden="true">·</span>
                  <span>Transformation</span>
                </p>
                <p className="mt-1.5 text-foreground/70 text-[13px] lg:text-[14px] font-light tracking-[0.01em] text-center lg:text-left">
                  {isEN
                    ? "Individual hypnosis sessions & training"
                    : "Individuelle Hypnose-Sitzungen & Ausbildungen"}
                </p>
              </div>
              <div className="mt-auto pt-2">
                {showMediaLogos ? <TVLogoCarousel /> : <div className="h-12" aria-hidden="true" />}
              </div>
            </div>
          </div>
        ) : (
          <div className="container-main py-3 text-center flex flex-col items-center">
            <p className="text-[11.5px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
              {isEN
                ? "Germany · Switzerland · International"
                : "Deutschland · Schweiz · International"}
            </p>
            <h1 className="mt-2 text-[1.45rem] font-light text-foreground leading-[1.2] tracking-tight">
              Lic. Psych. <span className="font-medium">David J. Woods</span>
            </h1>
            <div className="mt-3 inline-flex items-center gap-3 select-none">
              <span className="h-px w-6 bg-primary/25" aria-hidden="true" />
              <span className="italic font-light text-primary/90 text-[16.5px] tracking-[0.06em]" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}>
                {isEN ? "Freedom Begins in the Mind" : "Freiheit beginnt im Kopf"}
              </span>
              <span className="h-px w-6 bg-primary/25" aria-hidden="true" />
            </div>
            <p className="mt-3 text-[10.5px] text-foreground/85 font-normal uppercase tracking-[0.12em] flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 px-3">
              <span>{isEN ? "Psychology" : "Psychologie"}</span>
              <span className="text-primary/60" aria-hidden="true">·</span>
              <span>{isEN ? "Hypnosis" : "Hypnose"}</span>
              <span className="text-primary/60" aria-hidden="true">·</span>
              <span>Transformation</span>
            </p>
            <p className="mt-1.5 text-foreground/70 text-[12px] font-light tracking-[0.01em] px-3">
              {isEN
                ? "Individual hypnosis sessions & training"
                : "Individuelle Hypnose-Sitzungen & Ausbildungen"}
            </p>
            <div className="mt-6 relative aspect-[4/3] max-h-[320px] rounded-2xl overflow-hidden mx-auto group" style={{ minHeight: "240px" }}>
              {Object.entries(loadedMobile).map(([idx, src]) => (
                <img
                  key={idx}
                  src={src}
                  alt={`David J. Woods – Hypnotherapeut und Psychologe, Foto ${Number(idx) + 1}`}
                  width={600}
                  height={400}
                  sizes="100vw"
                  loading={idx === "0" ? "eager" : "lazy"}
                  fetchPriority={idx === "0" ? "high" : "auto"}
                  decoding={idx === "0" ? "sync" : "async"}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${Number(idx) === currentSlide ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <button onClick={goPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full p-1.5 transition-opacity" aria-label="Previous">
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button onClick={goNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full p-1.5 transition-opacity" aria-label="Next">
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {Array.from({ length: totalSlides }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-2 rounded-full transition-all ${i === currentSlide ? "bg-primary w-6" : "bg-primary/30 w-2"}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>


            <div className="w-full mt-6">
              {showMediaLogos ? <TVLogoCarousel /> : <div className="h-12" aria-hidden="true" />}
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════ AKTIV-HYPNOSE METHOD — slim trust banner ═══════════════════ */}
      <section className="pt-6 pb-6 md:pt-7 md:pb-7 bg-primary/15" style={deferredSectionStyle}>
        <div className="mx-3 md:mx-auto md:max-w-[980px] bg-card rounded-xl border-2 border-[#D1D5DB] py-1.5 md:py-1 px-3 md:px-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <div className="grid md:grid-cols-[290px_1fr] gap-2 md:gap-4 md:items-stretch">
            {/* LEFT (desktop) – credential badges 2x2 + link */}
            <div className="order-2 md:order-1 flex flex-col items-center justify-center gap-1.5 mt-3 md:mt-0">
              {/* Desktop: 2x2 grid – 4 badges, equal height + weight */}
              <div className="hidden md:grid grid-cols-2 gap-2 w-full">
                {/* Entwickler der Aktiv-Hypnose */}
                <div className="flex flex-col items-center justify-between gap-1 bg-secondary rounded-lg px-3 py-2 h-[100px] cursor-pointer transition-all duration-300 ease-out md:hover:scale-[1.22] md:hover:-translate-y-1.5 md:hover:shadow-[0_18px_40px_-10px_rgba(27,58,92,0.35)] md:hover:bg-card md:hover:ring-1 md:hover:ring-primary/30 md:hover:z-20">
                  <Award className="h-10 w-10 text-[#1B3A5C]" strokeWidth={1.4} aria-hidden="true" />
                  <div className="text-center">
                    <div className="font-semibold text-[11.5px] text-foreground/95 leading-tight">{isEN ? "Developer of Aktiv-Hypnose®" : "Entwickler der Aktiv-Hypnose®"}</div>
                    <div className="text-[10px] text-muted-foreground">David J. Woods</div>
                  </div>
                </div>
                {/* NGH International Trainer */}
                <div className="flex flex-col items-center justify-between gap-1 bg-secondary rounded-lg px-3 py-2 h-[100px] cursor-pointer transition-all duration-300 ease-out md:hover:scale-[1.22] md:hover:-translate-y-1.5 md:hover:shadow-[0_18px_40px_-10px_rgba(27,58,92,0.35)] md:hover:bg-card md:hover:ring-1 md:hover:ring-primary/30 md:hover:z-20">
                  <img src={CDN.nghBadge} alt="NGH International Trainer – National Guild of Hypnotists" className="h-12 w-auto object-contain" style={{ filter: "brightness(1.1) contrast(1.12) saturate(1.1)" }} width={140} height={48} loading="lazy" decoding="async" />
                  <div className="text-center">
                    <div className="font-semibold text-[11.5px] text-foreground/95 leading-tight">NGH International Trainer</div>
                  </div>
                </div>
                {/* EMR */}
                <div className="flex flex-col items-center justify-between gap-1 bg-secondary rounded-lg px-3 py-2 h-[100px] cursor-pointer transition-all duration-300 ease-out md:hover:scale-[1.22] md:hover:-translate-y-1.5 md:hover:shadow-[0_18px_40px_-10px_rgba(27,58,92,0.35)] md:hover:bg-card md:hover:ring-1 md:hover:ring-primary/30 md:hover:z-20">
                  <img src={CDN.emrBadge} alt="EMR Krankenkasse Konform – Schweizer Zusatzversicherung anerkannt" className="h-10 w-auto object-contain" width={144} height={40} loading="lazy" decoding="async" />
                  <div className="text-center">
                    <div className="font-semibold text-[11.5px] text-foreground/95 leading-tight">EMR Krankenkasse Konform</div>
                    <div className="text-[10px] text-muted-foreground">ZSR P609264</div>
                  </div>
                </div>
                {/* Licensed Psychologist */}
                <div className="flex flex-col items-center justify-between gap-1 bg-secondary rounded-lg px-3 py-2 md:pb-3 h-[100px] cursor-pointer transition-all duration-300 ease-out md:hover:scale-[1.22] md:hover:-translate-y-1.5 md:hover:shadow-[0_18px_40px_-10px_rgba(27,58,92,0.35)] md:hover:bg-card md:hover:ring-1 md:hover:ring-primary/30 md:hover:z-20">
                  <img src={licPsychSeal} alt="Lic. Psych. – Lizenzierter Psychologe" className="h-[53px] w-[53px] object-contain mb-1" style={{ filter: "brightness(1.28) contrast(1.22) saturate(1.17)" }} width={512} height={512} loading="lazy" decoding="async" />
                  <div className="text-center">
                    <div className="font-semibold text-[11.5px] text-foreground/95 leading-[1.35] text-center">Lic. Psych.<br /><span className="text-[10.5px] tracking-[0.04em]">UNAM</span></div>
                  </div>
                </div>
              </div>
              <Link to={getPath("about", language, country)} className="hidden md:inline-block mt-1.5 mb-0 text-[11.5px] text-[#2E7D32] hover:text-[#1B5E20] font-medium underline underline-offset-4 decoration-[#2E7D32]/50 hover:decoration-[#1B5E20] transition-colors text-center leading-snug">
                {isEN ? "More about David J. Woods & Team" : "Mehr über David J. Woods & Team"}
              </Link>
            </div>

            {/* RIGHT (desktop) / TOP (mobile) – text + bullets, centered */}
            <div className="order-1 md:order-2 flex flex-col items-center text-center md:pl-1 md:h-full md:pt-0 md:pb-1">
              <h2 className="text-lg md:text-[22px] font-medium tracking-[0.01em] text-[#0B1F33] leading-tight mt-1 md:mt-4">
                {isEN ? "Psychology and Hypnotherapy" : "Psychologie und Hypnotherapie"}
              </h2>
              <p className="text-[12px] md:text-[14.5px] text-[#1B3A5C] font-medium leading-snug mt-1 md:mt-1.5 max-w-[640px]">
                {isEN
                  ? "Individual intensive sessions for sustainable change."
                  : "Individuelle Hypnose-Sitzungen für echte Veränderung – direkt an der Ursache."}
              </p>

              {/* Bullets — 2-col on desktop, 6 items */}
              <ul className="mt-2 md:mt-3.5 grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-1 md:gap-y-1 text-[11.5px] md:text-[14px] text-foreground/80 text-left mx-auto w-fit md:justify-items-start leading-snug">
                <li className="flex items-center gap-2 leading-snug"><CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#25D366] shrink-0 relative top-px" /><span>{isEN ? "35+ years of experience" : "Über 35 Jahre Erfahrung"}</span></li>
                <li className="flex items-center gap-2 leading-snug"><CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#25D366] shrink-0 relative top-px" /><span>{isEN ? "2,500+ therapists trained" : "2.500+ Therapeuten ausgebildet"}</span></li>
                <li className="flex items-center gap-2 leading-snug"><CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#25D366] shrink-0 relative top-px" /><span>{isEN ? "30+ international TV appearances" : "30+ internationale TV-Auftritte"}</span></li>
                <li className="flex items-center gap-2 leading-snug"><CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#25D366] shrink-0 relative top-px" /><span>{isEN ? "30,000+ sessions conducted" : "30.000+ Sitzungen durchgeführt"}</span></li>
                <li className="flex items-center gap-2 leading-snug"><CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#25D366] shrink-0 relative top-px" /><span>{isEN ? "Author of Go Inside & MP3 programs" : "Autor von Go Inside & MP3-Programmen"}</span></li>
                <li className="flex items-center gap-2 leading-snug">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#25D366] shrink-0 relative top-px" />
                  <span>266 <span className="text-[#F5B301]">★</span> {isEN ? "5.0 on Google" : "5.0 bei Google"}</span>
                </li>
              </ul>

              {/* Topics row — premium clickable pill buttons */}
              <div className="mt-2.5 md:mt-4 flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-[760px]">
                {(isEN
                  ? [
                      { label: "Become smoke-free", page: "smoking" as const },
                      { label: "Weight loss", page: "weight" as const },
                      { label: "Anxiety & panic", page: "anxiety" as const },
                      { label: "Stress & burnout", page: "stress" as const },
                      { label: "Depression & trauma", page: "depression" as const },
                      { label: "Children & teens", page: "children" as const },
                      { label: "Seminars", page: "training" as const },
                    ]
                  : [
                      { label: "Rauchfrei werden", page: "smoking" as const },
                      { label: "Abnehmen", page: "weight" as const },
                      { label: "Ängste & Panik", page: "anxiety" as const },
                      { label: "Stress & Burnout", page: "stress" as const },
                      { label: "Depression & Trauma", page: "depression" as const },
                      { label: "Kinder & Jugendliche", page: "children" as const },
                      { label: "Ausbildung", page: "training" as const },
                    ]
                ).map((item) => (
                  <Link
                    key={item.page}
                    to={getPath(item.page, language, country)}
                    className="inline-flex items-center px-3.5 md:px-4 py-1.5 md:py-1.5 rounded-full bg-white md:bg-gradient-to-b md:from-white md:to-[#F4F7FA] border border-[#1B3A5C]/40 md:border-[#1B3A5C]/35 text-[11.5px] md:text-[12.5px] font-medium text-[#1B3A5C] tracking-[0.01em] shadow-[0_1.5px_0_0_rgba(27,58,92,0.18),0_2px_4px_-1px_rgba(27,58,92,0.12)] md:shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_1.5px_0_0_rgba(27,58,92,0.22),0_2px_5px_-1px_rgba(27,58,92,0.18),0_4px_10px_-3px_rgba(27,58,92,0.12)] hover:bg-[#1B3A5C] hover:bg-none hover:text-white hover:border-[#1B3A5C] hover:shadow-md active:translate-y-px active:shadow-[0_0_0_1px_rgba(27,58,92,0.25)] transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Primary CTA – Online consultation booking */}
              <div className="mt-4 md:mt-5 md:mb-1 flex flex-col items-center justify-center">
                <Link
                  to={getPath("onlineBeratung", language, country)}
                  className="group inline-flex items-center justify-center bg-gradient-to-b from-[#EAF4FD] to-[#CFE4F7] hover:from-[#DDEDFB] hover:to-[#BCD8F1] text-[#0B1F33] font-semibold text-[13px] md:text-[14.5px] tracking-tight px-7 md:px-10 py-2.5 md:py-3 rounded-xl shadow-[0_3px_10px_rgba(27,58,92,0.12),0_1px_2px_rgba(27,58,92,0.08),inset_0_1px_0_rgba(255,255,255,0.7)] hover:shadow-[0_6px_18px_rgba(27,58,92,0.18),0_2px_4px_rgba(27,58,92,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-200 border border-[#1B3A5C]/30 hover:border-[#1B3A5C]/55 hover:-translate-y-0.5"
                >
                  {isEN ? "Book Online Psychological Consultation" : "Online-Psychologische Beratung buchen"}
                </Link>
                <p className="mt-1.5 text-[11px] md:text-[12px] text-[#1B3A5C]/70 tracking-tight">
                  {isEN ? "Available by phone or video" : "Telefonisch oder per Video möglich"}
                </p>
              </div>

              {/* Mobile: 2x2 badges grid below CTA */}
              <div className="grid md:hidden grid-cols-2 gap-2 w-full mt-3 select-none">
                <div className="flex flex-col items-center justify-between gap-1 bg-secondary rounded-lg px-2 py-2 h-[96px]">
                  <Award className="h-9 w-9 text-[#1B3A5C]" strokeWidth={1.4} aria-hidden="true" />
                  <div className="text-center">
                    <div className="font-semibold text-[10.5px] text-foreground/95 leading-tight">{isEN ? "Developer of Aktiv-Hypnose®" : "Entwickler der Aktiv-Hypnose®"}</div>
                    <div className="text-[9px] text-muted-foreground">David J. Woods</div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-end gap-1.5 bg-secondary rounded-lg px-2 pt-3 pb-2 h-[96px]">
                  <img src={CDN.nghBadge} alt="NGH International Trainer – National Guild of Hypnotists" className="h-[52px] w-auto object-contain pointer-events-none select-none" style={{ filter: "brightness(1.1) contrast(1.12) saturate(1.1)", WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }} width={160} height={52} loading="lazy" decoding="async" draggable={false} onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} />
                  <div className="text-center">
                    <div className="font-semibold text-[10.5px] text-foreground/95 leading-tight">NGH International Trainer</div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-1 bg-secondary rounded-lg px-2 py-2 h-[96px]">
                  <img src={CDN.emrBadge} alt="EMR Krankenkasse Konform – Schweizer Zusatzversicherung anerkannt" className="h-9 w-auto object-contain pointer-events-none select-none" style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }} width={120} height={36} loading="lazy" decoding="async" draggable={false} onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} />
                  <div className="text-center">
                    <div className="font-semibold text-[10.5px] text-foreground/95 leading-tight">EMR Konform</div>
                    <div className="text-[9px] text-muted-foreground">ZSR P609264</div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-1.5 bg-secondary rounded-lg px-2 pt-2.5 pb-3 h-[96px]">
                  <img src={licPsychSeal} alt="Lic. Psych. – Lizenzierter Psychologe" className="h-[46px] w-[46px] object-contain pointer-events-none select-none" style={{ filter: "brightness(1.28) contrast(1.22) saturate(1.17)", WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }} width={512} height={512} loading="lazy" decoding="async" draggable={false} onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} />
                  <div className="text-center">
                    <div className="font-semibold text-[10.5px] text-foreground/95 leading-[1.35] text-center">Lic. Psych.<br /><span className="text-[9.5px] tracking-[0.04em]">UNAM</span></div>
                  </div>
                </div>
              </div>
              <Link to={getPath("about", language, country)} className="md:hidden mt-2 text-[11px] text-[#2E7D32] hover:text-[#1B5E20] font-medium underline underline-offset-4 decoration-[#2E7D32]/50 hover:decoration-[#1B5E20] transition-colors text-center leading-snug">
                {isEN ? "More about David J. Woods & Team" : "Mehr über David J. Woods & Team"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES ═══════════════════ */}
      <section id="sessions" className="py-4 md:py-4 mt-6 md:mt-8 mb-6 md:mb-8 bg-secondary mx-3 md:mx-auto md:max-w-[1200px] border border-primary/15 rounded-2xl" style={deferredSectionStyle}>
        <div className="container-main">
          <h2 className="text-lg md:text-[22px] font-medium tracking-[0.01em] text-[#0B1F33] text-center mb-0.5 md:mb-0 leading-tight">{t("section.services")}</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-2 md:mb-2 md:text-sm">
            {isEN
              ? "Topics can also be combined during the session."
              : "Mehrere Themen können gezielt in einer Sitzung gelöst werden."}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2.5">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRAINING ═══════════════════ */}
      <section className="pt-7 pb-7 md:py-9 bg-primary/15" style={deferredSectionStyle}>
        <div className="mx-6 md:mx-auto md:max-w-[1200px]">
          <Link to={getPath("training", language, country)} className="block max-w-sm md:max-w-5xl mx-auto relative bg-white rounded-2xl overflow-hidden shadow-[0_16px_48px_-8px_rgba(0,0,0,0.3),0_4px_12px_-2px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-[1.01] hover:shadow-[0_20px_56px_-8px_rgba(0,0,0,0.35),0_6px_16px_-2px_rgba(0,0,0,0.18)] cursor-pointer">
            {/* Label + Title */}
            <div className="text-center pt-5 pb-2 md:pt-3 md:pb-1.5 px-5 md:px-10">
              <span className="inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.16em] text-[hsl(213,10%,40%)] border border-[hsl(213,12%,80%)] rounded-full px-3 py-0.5 md:px-3.5 md:py-1 bg-gradient-to-r from-[hsl(213,10%,93%)] to-[hsl(213,10%,96%)] mb-2 md:mb-2 shadow-sm">
                <Award className="w-2.5 h-2.5" />
                {isEN ? "Professional Therapist Training" : "Professionelle Therapeuten-Ausbildung"}
              </span>
              <h2 className="text-sm md:text-[15px] font-light tracking-[0.01em] text-[#4CAF50] leading-tight">
                {isEN ? "Intensive Training" : "Intensiv-Ausbildungen"}
              </h2>
              <p className="text-lg md:text-[22px] font-medium tracking-[0.01em] text-foreground mt-0.5 md:mt-1">
                Aktiv-Hypnose© {isEN ? "Therapist Diploma" : "Therapeuten-Diplom"}
              </p>
            </div>

            {/* Seminar room photo */}
            <div className="px-5 md:px-10 pb-3 md:pb-2.5">
              <div className="rounded-xl overflow-hidden">
                <img
                  src={CDN.trainingSeminar}
                  alt={isEN ? "Professional hypnotherapy training seminar" : "Professionelles Hypnosetherapie-Ausbildungsseminar"}
                  className="w-full h-[7.5rem] md:h-72 object-cover [object-position:50%_52%]"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={600}
                  sizes="(min-width: 768px) 1120px, 100vw"
                />
              </div>
            </div>

            <div className="px-5 pb-5 md:px-10 md:pb-4">
              {/* Compact intro */}
              <p className="text-foreground/75 text-[11px] md:text-[13px] mb-2 text-center max-w-lg md:max-w-[56rem] mx-auto leading-snug md:leading-snug">
                {isEN
                  ? "Intensive seminar in Aktiv-Hypnose®: practical, immediately applicable and intentionally held in small, exclusive groups. Learn effective hypnosis techniques for your profession, self-employment and personal development."
                  : "Intensiv-Seminar in Aktiv-Hypnose®: praxisnah, direkt anwendbar und bewusst in kleinen, exklusiven Gruppen durchgeführt. Erlernen Sie wirkungsvolle Hypnose-Techniken für Beruf, Selbstständigkeit und persönliche Weiterentwicklung."}
              </p>
              <p className="text-[#4CAF50] text-[10.5px] md:text-[12px] mb-3 text-center max-w-lg md:max-w-[56rem] mx-auto leading-snug italic">
                {isEN
                  ? "In 6 days you receive a compact, intensive training format with directly applicable methods."
                  : "In 6 Tagen erhalten Sie ein kompaktes, intensives Ausbildungsformat mit direkt umsetzbaren Methoden."}
              </p>

              {/* Stats — compact grid (short, scannable, equal-height) */}
              <div className="grid grid-cols-5 gap-1.5 md:gap-2.5 mb-4 md:mb-5 mt-3 md:mt-4 pt-1 md:pt-1.5">
                {[
                  { num: "350+", label: isEN ? "pages Manual" : "Seiten Ausbildungsmappe", line2: undefined as string | undefined, hint: undefined as string | undefined, isDiploma: false },
                  { num: "150+", label: isEN ? "Therapy Templates" : "Therapie-Vorlagen", line2: undefined, hint: isEN ? "for many areas of application" : "für viele Anwendungsbereiche", isDiploma: false },
                  { num: "50+", label: isEN ? "Video Trainings" : "Video-Trainings", line2: undefined, hint: isEN ? "real seminar excerpts" : "echte Seminar-Ausschnitte", isDiploma: false },
                  { num: "50+", label: isEN ? "Audio Hypnoses" : "Audio-Hypnosen", line2: undefined, hint: isEN ? "from real sessions" : "aus realen Sitzungen", isDiploma: false },
                  { num: "", label: isEN ? "Diploma Therapist" : "Diplom Therapeut", line2: isEN ? "in Aktiv-Hypnose®" : "in Aktiv-Hypnose®", hint: undefined, isDiploma: true },
                ].map(item => (
                  <div
                    key={item.label}
                    title={item.hint}
                    className="relative text-center bg-white border border-[#E2E8EE] rounded-xl py-2 md:py-3 px-1 md:px-1.5 flex flex-col items-center justify-center min-h-[58px] md:min-h-[78px] overflow-hidden"
                  >
                    {/* subtle green accent bar at top */}
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 md:w-8 h-[2px] rounded-b bg-[#2E7D32]/60" />
                    {item.isDiploma ? (
                      <BadgeCheck className="w-4 h-4 md:w-5 md:h-5 text-[#1B3A5C] mb-0.5" strokeWidth={1.75} />
                    ) : (
                      <div className="text-[13px] md:text-lg font-bold text-[#0B1F33] leading-tight tracking-tight">{item.num}</div>
                    )}
                    <div className="text-[7.5px] md:text-[10.5px] text-foreground/55 leading-tight font-medium mt-0.5">
                      <div className="line-clamp-2">{item.label}</div>
                      {item.line2 && <div className="line-clamp-1">{item.line2}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* EMR badge + arrow hint */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center gap-3">
                  <div className="inline-flex items-center gap-1.5 bg-[hsl(160,30%,95%)] border border-[hsl(160,25%,82%)] rounded-lg px-3 py-1 md:px-3.5 md:py-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#2E7D32] flex-shrink-0" />
                    <span className="text-[10px] md:text-xs font-semibold text-foreground/85 tracking-wide">EMR Krankenkasse Konform</span>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-[#2E7D32] hover:text-[#1B5E20] flex items-center gap-1">
                    {isEN ? "Learn more" : "Mehr erfahren"} →
                  </span>
                </div>
                <p className="text-[9px] md:text-[10.5px] text-foreground/70 text-center max-w-xs md:max-w-md leading-snug font-medium">
                  {isEN
                    ? "EMR-compliant structure – participation certificate available for submission."
                    : "EMR-konform aufgebaut – Teilnahmebestätigung zur Einreichung möglich."}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══════════════════ CORPORATE COACHING ═══════════════════ */}
      <section className="pt-4 md:pt-4 pb-5 md:pb-6 mt-6 md:mt-8 mb-6 md:mb-8 bg-secondary mx-3 md:mx-auto md:max-w-[1200px] border border-primary/15 rounded-2xl" style={deferredSectionStyle}>
        <div className="container-main">
          <h2 className="text-lg md:text-[22px] font-medium tracking-[0.01em] text-[#0B1F33] text-center mb-1 leading-tight">
            {isEN ? "Corporate Coaching & Success Programs" : "Firmencoaching & Erfolgsprogramme"}
          </h2>
          <p className="text-xs md:text-sm text-[#4CAF50] text-center mb-3 md:mb-4 max-w-2xl mx-auto">
            {isEN
              ? "For companies, executives and teams – measurable results through targeted mental work."
              : "Für Unternehmen, Führungskräfte und Teams – messbare Ergebnisse durch gezielte mentale Arbeit."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { icon: <Trophy className="w-6 h-6" />, title: isEN ? "Success Training" : "Erfolgs-Training", desc: isEN ? "Mental strength, focus and performance for executives and teams." : "Mentale Stärke, Fokus und Leistungssteigerung für Führungskräfte und Teams.", href: getPath("corporateErfolg", language, country), image: corporateSuccessImg, imagePosition: "center 45%" },
                { icon: <Shield className="w-6 h-6" />, title: isEN ? "Build Resilience" : "Resilienz stärken", desc: isEN ? "Build stress resistance, handle pressure better and stay sustainably stable." : "Stressresistenz aufbauen, Druck besser bewältigen und nachhaltig stabil bleiben.", href: getPath("corporateResilienz", language, country), image: corporateResilienceImg, imagePosition: "center 40%" },
                { icon: <Clock className="w-6 h-6" />, title: isEN ? "Stress Prevention" : "Stress-Prävention", desc: isEN ? "Reduce stress, prevent burnout and secure clear performance in everyday work." : "Stress reduzieren, Burnout vorbeugen und klare Leistungsfähigkeit im Alltag sichern.", href: getPath("corporateStress", language, country), image: corporateStressImg, imagePosition: "center 45%" },
                { icon: <Cigarette className="w-6 h-6" />, title: isEN ? "Non-Smoker Seminars" : "Nichtraucher-Seminare", desc: isEN ? "'Non-smoker in 3 hours' – effective health promotion for companies and employees." : "'Nichtraucher in 3 Stunden' – effektive Gesundheitsförderung für Unternehmen und Mitarbeiter.", href: getPath("corporateNichtraucher", language, country), image: corporateNonsmokerImg, imagePosition: "center 45%" },
              ].map((item) => (
                <ServiceCard
                  key={item.title}
                  title={item.title}
                  description={item.desc}
                  href={item.href}
                  icon={item.icon}
                  image={item.image}
                  imagePosition={item.imagePosition}
                />
              ))}
            </div>
            <div className="text-center mt-3 md:mt-4">
              <Link
                to={getPath("corporate", language, country)}
                className="inline-flex items-center gap-2 bg-[#ECEEF1] hover:bg-[#E2E5E9] text-[#1B3A5C] text-sm font-medium tracking-wide px-5 py-2.5 rounded-lg border border-[#1B3A5C]/25 shadow-none transition-colors"
              >
                {isEN ? "View All Corporate Programs" : "Alle Firmenprogramme ansehen"}
                <ArrowRight className="w-4 h-4" />
              </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ INLINE CONTACT FORM ═══════════════════ */}
      <section id="contact" className="py-6 md:py-6 bg-[#F8FAFC] border-y border-[#E8EDF3]" style={deferredSectionStyle}>
        <div className="container-main">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg md:text-xl font-light tracking-[0.01em] text-foreground/90 mb-1 text-center">
              {language === "en" ? "Request a free consultation" : "Jetzt Kontakt aufnehmen"}
            </h2>
            <p className="text-sm text-[#2E7D32] mb-3 text-center font-normal">
              {language === "en"
                ? "I'll personally get back to you within 24 hours – often faster via WhatsApp."
                : "Ich melde mich persönlich innerhalb von 24 Stunden – per WhatsApp oft schneller."}
            </p>
            <div className="bg-white rounded-lg border-2 border-[#D1D5DB] p-4 sm:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
              <InlineContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
