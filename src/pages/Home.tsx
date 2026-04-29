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
import hero1 from "@/assets/hero-4.webp";
import hero1Mobile from "@/assets/hero-4-mobile.webp";
import davidSessionImg from "@/assets/david-portrait-outdoor.jpg";
import corporateSuccessImg from "@/assets/corporate-success.jpg";
import corporateResilienceImg from "@/assets/corporate-resilience.jpg";
import corporateStressImg from "@/assets/corporate-stress.jpg";
import corporateNonsmokerImg from "@/assets/corporate-nonsmoker.jpg";
import davidOfficePortrait from "@/assets/david-office-portrait.webp";
import davidOfficePortraitMobile from "@/assets/david-office-portrait-mobile.webp";

// Hero slider order (5 images): Flipchart → Active work → Therapeutic session → Conversation at table → Desk with cup
const heroDesktop = [
  hero1,
  () => import("@/assets/hero-5.webp").then(m => m.default),
  () => import("@/assets/hero-1.webp").then(m => m.default),
  () => import("@/assets/hero-3.webp").then(m => m.default),
  () => Promise.resolve(davidOfficePortrait),
];
const heroMobile = [
  hero1Mobile,
  () => import("@/assets/hero-5-mobile.webp").then(m => m.default),
  () => import("@/assets/hero-1-mobile.webp").then(m => m.default),
  () => import("@/assets/hero-3-mobile.webp").then(m => m.default),
  () => Promise.resolve(davidOfficePortraitMobile),
];
import {
  Cigarette, Brain, Scale, Flame, HeartPulse, Users,
  Trophy, Shield, Clock, BookOpen, ArrowRight, Star, Award,
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
     <div className="relative bg-muted/50 rounded-lg p-3">
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide py-2" style={{ scrollbarWidth: "none" }}>
        {CDN.bekanntAus.map((src, i) => (
          <img key={i} src={src} alt={`David J. Woods bekannt aus Medien – Logo ${i + 1}`} className="h-8 md:h-10 object-contain shrink-0 opacity-100 hover:opacity-100 transition-opacity mix-blend-multiply" width={80} height={40} loading="lazy" decoding="async" sizes="(min-width: 768px) 100px, 80px" />
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
        : "Viele Menschen wollen aufhören zu rauchen und versuchen es daher immer wieder. Denn Rauchen ist eine unangenehme Sucht, die nicht nur Ihnen, sondern auch Ihrem Umfeld massiven Schaden zufügen kann.",
      href: getPath("smoking", language, country),
      icon: <Cigarette className="w-5 h-5" />,
      image: CDN.stopSmoking,
    },
    {
      title: t("service.anxiety"),
      description: isEN
        ? "Overcoming anxieties and phobias is not always easy. Insecurities are a natural protective mechanism that everyone possesses."
        : "Wer Ängste loswerden und Phobien überwinden möchte, hat es nicht immer leicht. Denn Unsicherheiten sind ein natürlicher Schutzmechanismus.",
      href: getPath("anxiety", language, country),
      icon: <Brain className="w-5 h-5" />,
      image: CDN.anxietyRelief,
    },
    {
      title: t("service.weight"),
      description: isEN
        ? "Losing weight is not always easy, yet every year countless people try one curious diet after another."
        : "Abnehmen ist nicht immer leicht und doch testen jedes Jahr unzählige Menschen eine kuriose Diät nach der anderen.",
      href: getPath("weight", language, country),
      icon: <Scale className="w-5 h-5" />,
      image: CDN.weightLoss,
    },
    {
      title: t("service.stress"),
      description: isEN
        ? "Stress reduction and burnout prevention are incredibly important topics in today's world."
        : "Die Stressreduktion sowie die Burnout-Prävention sind gerade in der heutigen Zeit ein unglaublich wichtiges Thema.",
      href: getPath("stress", language, country),
      icon: <Flame className="w-5 h-5" />,
      image: CDN.stressBurnout,
    },
    {
      title: t("service.children"),
      description: isEN
        ? "With hypnosis for children and teenagers, not only problems but also fears can be overcome."
        : "Mit der Hypnose für Kinder sowie der Hypnose für Jugendliche können nicht nur Probleme, sondern auch Ängste bewältigt werden.",
      href: getPath("children", language, country),
      icon: <Users className="w-5 h-5" />,
      image: CDN.childrenTeens,
    },
    {
      title: t("service.depression"),
      description: isEN
        ? "Hypnosis for depression and trauma helps you discover new perspectives and regain your joy of life."
        : "Die hypnotische Begleitung hilft Ihnen dabei, neue Perspektiven zu entdecken und Ihre Lebensfreude wiederzugewinnen.",
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
          <div className="grid md:grid-cols-[360px_1fr] container-main py-4 gap-6 items-center">
            <div className="relative w-[360px] aspect-[4/5] rounded-2xl overflow-hidden mx-auto group">
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

            <div className="flex flex-col justify-center space-y-3 text-center min-w-0">
              <h1 className="text-[1.65rem] lg:text-[2rem] font-bold text-foreground leading-tight tracking-tight">
                Lic. Psych. David J. Woods
              </h1>
              <p className="text-sm font-semibold tracking-wide text-foreground/70">
                {isEN
                  ? "Germany 🇩🇪 · Switzerland 🇨🇭 · International 🌍"
                  : "Deutschland 🇩🇪 · Schweiz 🇨🇭 · International 🌍"}
              </p>
              <p className="text-xl lg:text-2xl italic font-semibold text-cta">
                {isEN ? '"Freedom Begins in the Mind"' : '„Freiheit beginnt im Kopf"'}
              </p>
              <p className="text-foreground/80 text-base font-medium">
                {isEN
                  ? "Psychology · Hypnosis · Deep Transformation"
                  : "Psychologie · Hypnose · Tiefgreifende Veränderung"}
              </p>
              <div>
                <p className="text-xs text-muted-foreground mb-2">{isEN ? "As Seen On" : "Bekannt aus"}</p>
                {showMediaLogos ? <TVLogoCarousel /> : <div className="h-12" aria-hidden="true" />}
              </div>
            </div>
          </div>
        ) : (
          <div className="container-main py-3 space-y-2 text-center">
            <h1 className="text-xl font-bold text-foreground leading-tight tracking-tight">
              Lic. Psych. David J. Woods
            </h1>
            <p className="text-xs font-semibold tracking-wide text-foreground/70">
              {isEN
                ? "Germany 🇩🇪 · Switzerland 🇨🇭 · International 🌍"
                : "Deutschland 🇩🇪 · Schweiz 🇨🇭 · International 🌍"}
            </p>
            <p className="italic font-semibold text-cta text-base">{isEN ? '"Freedom Begins in the Mind"' : '„Freiheit beginnt im Kopf"'}</p>
            <p className="text-sm text-foreground/80 font-medium">
              {isEN
                ? "Psychology · Hypnosis · Deep Transformation"
                : "Psychologie · Hypnose · Tiefgreifende Veränderung"}
            </p>
            <div className="relative aspect-[4/3] max-h-[240px] rounded-2xl overflow-hidden mx-auto group" style={{ minHeight: "180px" }}>
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


            <div>
              <p className="text-xs text-muted-foreground mb-2">{isEN ? "As Seen On" : "Bekannt aus"}</p>
              {showMediaLogos ? <TVLogoCarousel /> : <div className="h-12" aria-hidden="true" />}
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════ AKTIV-HYPNOSE METHOD ═══════════════════ */}
      <section className="py-6 md:py-10 bg-primary/15" style={deferredSectionStyle}>
        <div className="mx-3 md:mx-auto md:max-w-[1200px] bg-card rounded-2xl border border-primary/15 py-4 md:py-6 shadow-sm">
        <div className="container-main">
          {/* Desktop: side-by-side | Mobile: text only, no photo */}
          <div className="grid md:grid-cols-[1fr_auto] gap-3 md:gap-6 items-center">
            <div className="space-y-1.5 md:space-y-3 text-center md:text-left">
              <p className="text-xs font-semibold text-cta uppercase tracking-wider">
                {isEN ? "Aktiv-Hypnose© Method" : "Aktiv-Hypnose© Methode"}
              </p>
              <h2 className="text-lg md:text-2xl font-bold text-foreground leading-tight">
                {isEN ? "Psychology and Hypnotherapy for Lasting Change" : "Psychologie und Hypnotherapie für nachhaltige Veränderung"}
              </h2>
              <p className="text-xs md:text-sm text-foreground/80 leading-snug">
                {isEN
                  ? "David J. Woods combines psychological expertise, physiological depth, and modern coaching techniques into a method that works: clear, efficient, and solution-oriented."
                  : "David J. Woods vereint psychologisches Fachwissen, physiologische Tiefe und moderne Coaching-Techniken zu einer Methode, die wirkt: klar, effizient und lösungsorientiert."}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-xs md:text-sm text-foreground/80 text-left mt-2">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cta shrink-0" />{isEN ? "35+ years of experience" : "Über 35 Jahre Erfahrung"}</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cta shrink-0" />{isEN ? "30,000+ sessions conducted" : "30.000+ Sitzungen durchgeführt"}</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cta shrink-0" />{isEN ? "2,500+ therapists trained" : "2.500+ Therapeuten ausgebildet"}</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cta shrink-0" />{isEN ? "Author of Go Inside & MP3 programs" : "Autor von Go Inside & MP3-Programmen"}</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cta shrink-0" />{isEN ? "30+ international TV appearances" : "30+ internationale TV-Auftritte"}</li>
              </ul>
            </div>
            {/* Photo – desktop only */}
            <div className="hidden md:block rounded-lg overflow-hidden w-[260px] shrink-0">
              <img src={davidSessionImg} alt={isEN ? "David J. Woods – Licensed Psychologist and Hypnotherapist" : "David J. Woods – Lic. Psych. und Hypnosetherapeut"} className="w-full h-auto object-cover object-top rounded-lg" loading="lazy" decoding="async" width={1200} height={800} sizes="260px" />
            </div>
          </div>
          {/* EMR + Button below on all screens */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3 md:mt-4">
            <div className="flex items-center gap-2 bg-secondary rounded-md p-2">
              <img src={CDN.emrBadge} alt="EMR Krankenkasse Konform – Schweizer Zusatzversicherung anerkannt" className="h-9 md:h-10" width={64} height={40} loading="lazy" decoding="async" />
              <div>
                <div className="font-semibold text-xs text-foreground">EMR Krankenkasse Konform</div>
                <div className="text-[11px] text-muted-foreground">ZSR P609264</div>
              </div>
            </div>
            <Link to={getPath("about", language, country)} className="text-sm text-foreground/70 hover:text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors">
              {isEN ? "More about David J. Woods & Team" : "Mehr über David J. Woods & Team"}
            </Link>
          </div>
        </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES ═══════════════════ */}
      <section id="sessions" className="py-4 md:py-4 bg-secondary mx-3 md:mx-auto md:max-w-[1200px] border border-primary/15 rounded-2xl" style={deferredSectionStyle}>
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-0.5 md:mb-0">{t("section.services")}</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-2 md:mb-2 md:text-sm">
            {isEN
              ? "Topics can also be combined during the session."
              : "Dabei können Themen im Zuge der Sitzung auch kombiniert werden."}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2.5">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ QUALIFICATIONS ═══════════════════ */}
      <section className="py-6 md:py-10 bg-primary/15" style={deferredSectionStyle}>
        <div className="mx-3 md:mx-auto md:max-w-[1200px] bg-card rounded-2xl border border-primary/15 py-6 md:py-8 shadow-sm">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-5 md:mb-7">
            {isEN ? "Qualifications & Certifications" : "Qualifikationen & Zertifizierungen"}
          </h2>




          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-4xl md:max-w-5xl mx-auto">
            {/* 1 – Licensed Psychologist */}
            <div className="text-center p-3 md:p-6 bg-card border border-border rounded-lg shadow-sm transition-all duration-300 md:hover:scale-[1.35] md:hover:shadow-xl md:hover:z-10">
              <img src={licPsychSeal} alt="Lic. Psych. – Academic Seal" className="h-14 md:h-24 w-14 md:w-24 object-contain mx-auto mb-2 md:mb-3" loading="lazy" decoding="async" width={512} height={512} sizes="(min-width: 768px) 96px, 56px" />
              <h3 className="font-semibold text-xs md:text-sm text-foreground">{isEN ? "Licensed Psychologist" : "Lizenzierter Psychologe"}</h3>
            </div>
            {/* 2 – Aktiv-Hypnose© */}
            <div className="text-center p-3 md:p-6 bg-card border border-border rounded-lg shadow-sm flex flex-col items-center justify-center transition-all duration-300 md:hover:scale-[1.35] md:hover:shadow-xl md:hover:z-10">
              <img src={CDN.logo} alt="Aktiv-Hypnose© Logo" className="h-8 md:h-16 w-auto object-contain shrink-0 mx-auto mb-2 md:mb-3" loading="lazy" decoding="async" width={160} height={64} />
              <h3 className="font-semibold text-xs md:text-sm text-foreground">{isEN ? "Developer of Aktiv-Hypnose©" : "Entwickler der Aktiv-Hypnose©"}</h3>
            </div>
            {/* 3 – NGH */}
            <div className="text-center p-3 md:p-6 bg-card border border-border rounded-lg shadow-sm transition-all duration-300 md:hover:scale-[1.35] md:hover:shadow-xl md:hover:z-10">
              <img src={CDN.nghBadge} alt="NGH International Trainer" className="h-10 md:h-20 w-10 md:w-20 object-contain mx-auto mb-2 md:mb-3" loading="lazy" decoding="async" width={160} height={160} />
              <h3 className="font-semibold text-xs md:text-sm text-foreground">NGH International Trainer</h3>
            </div>
            {/* 4 – EMR */}
            <div className="text-center p-3 md:p-6 bg-card border border-border rounded-lg shadow-sm transition-all duration-300 md:hover:scale-[1.35] md:hover:shadow-xl md:hover:z-10">
              <img src={CDN.emrBadge} alt="EMR Krankenkasse Konform – ZSR P609264" className="h-10 md:h-20 object-contain mx-auto mb-2 md:mb-3" loading="lazy" decoding="async" width={160} height={80} />
              <h3 className="font-semibold text-xs md:text-sm text-foreground">{isEN ? "EMR Approved" : "EMR Krankenkasse Konform"}</h3>
              <p className="text-[0.6rem] md:text-xs text-muted-foreground">ZSR P609264</p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ═══════════════════ CORPORATE COACHING ═══════════════════ */}
        <section className="py-5 md:py-8 bg-muted/50" style={deferredSectionStyle}>
        <div className="container-main">
          <div className="bg-card border border-border rounded-2xl shadow-sm px-4 py-5 md:px-8 md:py-7">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-1 text-foreground">
              {isEN ? "Corporate Coaching" : "Firmencoaching"}
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-3 md:mb-4 text-sm md:text-base leading-snug">
              {isEN
                ? "Performance Coaching: Maximize Your Team's Potential. We offer tailored solutions for companies of all sizes."
                : "Erfolgs-Coaching: Leistungsfähigkeit maximieren. Wir bieten maßgeschneiderte Lösungen für Unternehmen jeder Größe."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { icon: <Trophy className="w-6 h-6" />, title: isEN ? "Success Training" : "Erfolgs-Training", desc: isEN ? "Success is ultimately decided in the mind." : "Letztendlich entscheidet sich Erfolg im Kopf.", href: getPath("corporateErfolg", language, country), image: corporateSuccessImg },
                { icon: <Shield className="w-6 h-6" />, title: isEN ? "Resilience Building" : "Resilienz-Verstärken", desc: isEN ? "Build inner strength for challenging times." : "Innere Stärke aufbauen für schwere Zeiten.", href: getPath("corporateResilienz", language, country), image: corporateResilienceImg },
                { icon: <Clock className="w-6 h-6" />, title: isEN ? "Stress Prevention" : "Stress-Prävention", desc: isEN ? "Burnout prevention for leaders and teams." : "Burnout-Prävention für Führungskräfte und Teams.", href: getPath("corporateStress", language, country), image: corporateStressImg },
                { icon: <Cigarette className="w-6 h-6" />, title: isEN ? "Non-Smoker Seminars" : "Nichtraucher-Seminare", desc: isEN ? "'Non-smoker in 3 hours' — corporate wellness." : "'Nichtraucher in 3 Stunden' — Firmen-Wellness.", href: getPath("corporateNichtraucher", language, country), image: corporateNonsmokerImg },
              ].map((item) => (
                <ServiceCard
                  key={item.title}
                  title={item.title}
                  description={item.desc}
                  href={item.href}
                  icon={item.icon}
                  image={item.image}
                />
              ))}
            </div>
            <div className="text-center mt-4 md:mt-5">
              <Link to={getPath("corporate", language, country)}>
                <Button className="bg-cta hover:bg-cta/90 text-cta-foreground font-semibold">
                  {isEN ? "All Corporate Programs" : "Alle Firmen-Programme"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRAINING ═══════════════════ */}
      <section className="py-5 md:py-5 bg-primary/15" style={deferredSectionStyle}>
        <div className="mx-6 md:mx-auto md:max-w-[1200px]">
          <Link to={getPath("training", language, country)} className="block max-w-sm md:max-w-5xl mx-auto relative bg-white rounded-2xl overflow-hidden shadow-[0_16px_48px_-8px_rgba(0,0,0,0.3),0_4px_12px_-2px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-[1.01] hover:shadow-[0_20px_56px_-8px_rgba(0,0,0,0.35),0_6px_16px_-2px_rgba(0,0,0,0.18)] cursor-pointer">
            {/* Label + Title */}
            <div className="text-center pt-5 pb-2 md:pt-6 md:pb-3 px-5 md:px-10">
              <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-[hsl(213,10%,35%)] border border-[hsl(213,12%,78%)] rounded-full px-4 py-1 md:px-5 md:py-1.5 bg-gradient-to-r from-[hsl(213,10%,91%)] to-[hsl(213,10%,95%)] mb-3 md:mb-4 shadow-sm">
                <Award className="w-3 h-3" />
                {isEN ? "Professional Therapist Training" : "Professionelle Therapeuten-Ausbildung"}
              </span>
              <h2 className="text-lg md:text-[1.75rem] font-bold text-foreground leading-tight">
                {isEN ? "Intensive Training" : "Intensiv-Ausbildungen"}
              </h2>
              <p className="text-base md:text-xl font-bold text-foreground/90 mt-1 md:mt-2">
                Aktiv-Hypnose© {isEN ? "Therapist Diploma" : "Therapeuten-Diplom"}
              </p>
            </div>

            {/* Seminar room photo */}
            <div className="px-5 md:px-10 pb-3 md:pb-3">
              <div className="rounded-xl overflow-hidden">
                <img
                  src={CDN.trainingSeminar}
                  alt={isEN ? "Professional hypnotherapy training seminar" : "Professionelles Hypnosetherapie-Ausbildungsseminar"}
                  className="w-full h-44 md:h-72 object-cover"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={500}
                  sizes="(min-width: 768px) 1120px, 100vw"
                />
              </div>
            </div>

            <div className="px-5 pb-5 md:px-10 md:pb-6">
              {/* Compact intro */}
              <p className="text-foreground/75 text-[11px] md:text-sm mb-3 md:mb-5 text-center max-w-lg mx-auto leading-snug md:leading-relaxed">
                {isEN
                  ? "Training for people who want to create real change – practical, effective, in small strictly limited groups."
                  : "Ausbildung für Menschen, die echte Veränderung bewirken wollen – praxisnah, wirksam, in kleinen strikt begrenzten Gruppen."}
              </p>

              {/* Stats — compact grid */}
              <div className="grid grid-cols-5 gap-1 md:gap-3 mb-3 md:mb-5">
                {[
                  { num: "350+", label: isEN ? "Pages Manual" : "Seiten Mappe" },
                  { num: "150+", label: isEN ? "Example Texts" : "Beispieltexte" },
                  { num: "50+", label: isEN ? "Videos" : "Videos" },
                  { num: "50+", label: isEN ? "Audio" : "Audio" },
                  { num: "✓", label: isEN ? "Diploma" : "Diplom" },
                ].map(item => (
                  <div key={item.label} className="text-center bg-gradient-to-b from-[hsl(213,10%,95%)] to-[hsl(213,10%,92%)] border border-[hsl(213,12%,82%)] rounded-lg py-1.5 md:py-3 px-0.5 md:px-1">
                    <div className="text-xs md:text-xl font-bold text-primary">{item.num}</div>
                    <div className="text-[6px] md:text-[10px] text-muted-foreground leading-tight font-medium mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* EMR badge + arrow hint */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center justify-center gap-3">
                  <div className="inline-flex items-center gap-1.5 bg-[hsl(160,30%,95%)] border border-[hsl(160,25%,82%)] rounded-lg px-3 py-1.5 md:px-4 md:py-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cta flex-shrink-0" />
                    <span className="text-[10px] md:text-xs font-semibold text-foreground/85 tracking-wide">EMR Krankenkasse Konform</span>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-primary flex items-center gap-1">
                    {isEN ? "View Details" : "Details ansehen"} →
                  </span>
                </div>
                <p className="text-[9px] md:text-[11px] text-muted-foreground/80 text-center max-w-xs md:max-w-sm leading-snug">
                  {isEN
                    ? "EMR-compliant structure. Participants receive an optional hours and course content certificate for possible submission."
                    : "EMR-konform aufgebaut. Auf Wunsch erhalten Teilnehmer einen Stunden- und Inhaltsnachweis zur möglichen Einreichung."}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>


      {/* ═══════════════════ INLINE CONTACT FORM ═══════════════════ */}
      <section className="py-10 md:py-16 bg-[#F8FAFC] border-y border-[#E8EDF3]" style={deferredSectionStyle}>
        <div className="container-main">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold text-primary mb-3 text-center">
              {language === "en" ? "Request a free consultation" : "Unverbindlich beraten lassen"}
            </h2>
            <div className="bg-white rounded-lg border-2 border-[#D1D5DB] p-4 sm:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
              <InlineContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
