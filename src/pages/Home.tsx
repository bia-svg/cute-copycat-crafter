import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import InlineContactForm from "@/components/InlineContactForm";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import hero1 from "@/assets/hero-1.webp";
import hero1Mobile from "@/assets/hero-1-mobile.webp";
import davidSessionImg from "@/assets/david-office-portrait.webp";
import davidSessionMobile from "@/assets/david-office-portrait-mobile.webp";
import corporateSuccessImg from "@/assets/corporate-success.jpg";
import corporateResilienceImg from "@/assets/corporate-resilience.jpg";
import corporateStressImg from "@/assets/corporate-stress.jpg";
import corporateNonsmokerImg from "@/assets/corporate-nonsmoker.jpg";

// Lazy-load remaining hero slides
const heroDesktop = [
  hero1,
  () => import("@/assets/hero-2.webp").then(m => m.default),
  () => import("@/assets/hero-3.webp").then(m => m.default),
  () => import("@/assets/hero-4.webp").then(m => m.default),
  () => import("@/assets/hero-5.webp").then(m => m.default),
];
const heroMobile = [
  hero1Mobile,
  () => import("@/assets/hero-2-mobile.webp").then(m => m.default),
  () => import("@/assets/hero-3-mobile.webp").then(m => m.default),
  () => import("@/assets/hero-4-mobile.webp").then(m => m.default),
  () => import("@/assets/hero-5-mobile.webp").then(m => m.default),
];
import {
  Cigarette, Brain, Scale, Flame, HeartPulse, Users,
  Trophy, Shield, Clock, BookOpen, ArrowRight, Star, Award,
  ChevronLeft, ChevronRight, CheckCircle
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
          <img key={i} src={src} alt={`David J. Woods bekannt aus Medien – Logo ${i + 1}`} className="h-8 md:h-10 object-contain shrink-0 opacity-60 hover:opacity-100 transition-opacity mix-blend-multiply" width={80} height={32} loading="lazy" />
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
    }, 5000);

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
          <div className="grid md:grid-cols-2 container-main py-12 gap-8 items-center">
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden mx-auto group" style={{ minHeight: "400px" }}>
              {loadedSlides[currentSlide] && (
                <img
                  key={currentSlide}
                  src={loadedSlides[currentSlide]}
                  alt={`David J. Woods – Hypnotherapeut und Psychologe, Foto ${currentSlide + 1}`}
                  width={400}
                  height={500}
                  loading="eager"
                  fetchPriority={currentSlide === 0 ? "high" : "auto"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
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

            <div className="space-y-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight">
                Lic. Psych. David J. Woods
              </h1>
              <p className="text-lg italic font-semibold text-cta">
                {isEN ? '"Freedom Begins in the Mind"' : '„Freiheit beginnt im Kopf"'}
              </p>
              <div className="text-foreground/80 leading-relaxed text-[0.95rem]">
                <p className="mb-2">
                  {isEN
                    ? "Expert psychological knowledge, modern hypnosis and profound transformation – established in Germany, Switzerland and internationally."
                    : "Fundiertes psychologisches Fachwissen, moderne Hypnose und tiefgreifende Transformation – etabliert in Deutschland, der Schweiz und international."}
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cta shrink-0" />{isEN ? "Over 40 years of experience" : "Über 40 Jahre Erfahrung"}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cta shrink-0" />{isEN ? "More than 30,000 sessions conducted" : "Mehr als 30.000 durchgeführte Sitzungen"}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cta shrink-0" />{isEN ? "Over 2,500 trained hypnotherapists" : "Über 2.500 ausgebildete Hypnotiseure"}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cta shrink-0" />{isEN ? 'Author of "Go Inside" & professional MP3 downloads' : "Autor von Go Inside und Entwickler professioneller MP3-Downloads"}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cta shrink-0" />{isEN ? "International media presence with 30+ TV appearances" : "Internationale Medienpräsenz mit über 30 internationalen TV-Auftritten"}</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to={getPath("contact", language, country)}>
                  <Button className="bg-cta text-cta-foreground hover:bg-cta/90">
                    {isEN ? "Free Discovery Call" : "Kostenloses Erstgespräch"}
                  </Button>
                </Link>
                <Link to={getPath("about", language, country)}>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    {isEN ? "About the Method" : "Über die Methode"}
                  </Button>
                </Link>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">{isEN ? "As Seen On" : "Bekannt aus"}</p>
                {showMediaLogos ? <TVLogoCarousel /> : <div className="h-12" aria-hidden="true" />}
              </div>
            </div>
          </div>
        ) : (
          <div className="container-main py-8 space-y-6">
            <h1 className="text-2xl font-bold text-foreground leading-tight tracking-tight">
              Lic. Psych. David J. Woods
            </h1>
            <p className="italic font-semibold text-cta">{isEN ? '"Freedom Begins in the Mind"' : '„Freiheit beginnt im Kopf"'}</p>
            <div className="text-sm text-foreground/80 leading-relaxed space-y-2">
              <p>
                {isEN
                  ? "David J. Woods combines clinical psychology with targeted medical hypnotherapy. With over 40 years of experience, he has conducted more than 30,000 sessions and trained over 2,500 people in hypnotherapy."
                  : "David J. Woods verbindet klinische Psychologie mit gezielter medizinischer Hypnotherapie. Mit über 40 Jahren Erfahrung hat er mehr als 30.000 Sitzungen durchgeführt und über 2.500 Menschen in Hypnotherapie ausgebildet."}
              </p>
              <p>
                {isEN
                  ? 'He is the author of the book "Go Inside" and has contributed to many professional publications. He has also developed over 100 audio files; numerous MP3 and CD downloads are available to his clients.'
                  : 'Er ist Autor des Buches „Go Inside" und war an vielen Fachpublikationen beteiligt. Zudem hat er über 100 Audio-Dateien entwickelt; zahlreiche MP3- und CD-Downloads stehen seinen Klienten zur Verfügung.'}
              </p>
              <p>
                {isEN
                  ? "Over 60 international TV appearances as well as numerous reports in media, magazines, and newspapers."
                  : "Über 60 internationale TV-Auftritte sowie zahlreiche Berichte in Medien, Magazinen und Zeitungen."}
              </p>
            </div>
            <div className="relative aspect-[4/3] max-h-[280px] rounded-2xl overflow-hidden mx-auto group" style={{ minHeight: "210px" }}>
              {loadedMobile[currentSlide] && (
                <img
                  key={currentSlide}
                  src={loadedMobile[currentSlide]}
                  alt={`David J. Woods – Hypnotherapeut und Psychologe, Foto ${currentSlide + 1}`}
                  width={600}
                  height={400}
                  loading="eager"
                  fetchPriority={currentSlide === 0 ? "high" : "auto"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
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
            <div className="flex flex-col gap-3">
              <Link to={getPath("contact", language, country)} className="block">
                <Button className="w-full bg-cta text-cta-foreground hover:bg-cta/90">{isEN ? "Free Discovery Call" : "Kostenloses Erstgespräch"}</Button>
              </Link>
              <Link to={getPath("about", language, country)} className="block">
                <Button variant="outline" className="w-full border-primary text-primary">{isEN ? "About the Method" : "Über die Methode"}</Button>
              </Link>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">{isEN ? "As Seen On" : "Bekannt aus"}</p>
              {showMediaLogos ? <TVLogoCarousel /> : <div className="h-12" aria-hidden="true" />}
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════ AKTIV-HYPNOSE METHOD ═══════════════════ */}
      <section className="py-16" style={deferredSectionStyle}>
        <div className="container-main grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold text-cta uppercase tracking-wider">
              {isEN ? "Aktiv-Hypnose© Method" : "Aktiv-Hypnose© Methode"}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {isEN ? "Psychology and Hypnotherapy for Lasting Change" : "Psychologie und Hypnotherapie für nachhaltige Veränderung"}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {isEN
                ? "David J. Woods combines psychological expertise, physiological depth, and modern coaching techniques into a method that works: clear, efficient, and solution-oriented."
                : "David J. Woods vereint psychologisches Fachwissen, physiologische Tiefe und moderne Coaching-Techniken zu einer Methode, die wirkt: klar, effizient und lösungsorientiert."}
            </p>
            <p className="text-foreground/70 leading-relaxed">
              {isEN
                ? "Even if many are initially unsure — the process leads to a state of focused clarity where transformation becomes possible."
                : "Auch wenn viele anfangs unsicher sind – der Prozess führt in einen Zustand fokussierter Klarheit, in dem Transformation möglich wird."}
            </p>
            <div className="flex items-center gap-3 bg-secondary rounded-lg p-3">
              <img src={CDN.emrBadge} alt="EMR Krankenkasse Konform – Schweizer Zusatzversicherung anerkannt" className="h-12" width={77} height={48} loading="lazy" />
              <div>
                <div className="font-semibold text-sm text-foreground">EMR Krankenkasse Konform</div>
                <div className="text-xs text-muted-foreground">ZSR P609264</div>
              </div>
            </div>
            <Link to={getPath("about", language, country)}>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-2">
                {isEN ? "More About Our Method" : "Mehr über unsere Methode"}
              </Button>
            </Link>
          </div>
          <div className="rounded-lg overflow-hidden">
            <picture>
              <source media="(max-width: 767px)" srcSet={davidSessionMobile} type="image/webp" />
              <img src={davidSessionImg} alt={isEN ? "David J. Woods during a hypnotherapy session in his practice" : "David J. Woods während einer Hypnosetherapie-Sitzung in seiner Praxis"} className="w-full h-full object-cover" loading="lazy" width={1200} height={800} />
            </picture>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES ═══════════════════ */}
      <section className="py-16 bg-secondary" style={deferredSectionStyle}>
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">{t("section.services")}</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
            {isEN
              ? "Topics can also be combined during the session. Additionally, you receive over 30 hypnosis audio recordings for home use."
              : "Dabei können Themen im Zuge der Sitzung auch kombiniert werden. Zusätzlich erhalten Sie über 30 Hypnose Audioaufnahmen für zuhause."}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ QUALIFICATIONS ═══════════════════ */}
      <section className="py-16" style={deferredSectionStyle}>
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            {isEN ? "Qualifications & Certifications" : "Qualifikationen & Zertifizierungen"}
          </h2>




          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <div className="text-center p-4 md:p-6 bg-card border border-border rounded-lg shadow-sm">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary flex items-center justify-center shrink-0 rounded mx-auto mb-3">
                <span className="text-primary-foreground text-[0.65rem] md:text-sm font-bold text-center leading-tight">Lic.<br/>Psych.</span>
              </div>
              <h3 className="font-semibold text-xs md:text-sm text-foreground mb-1 md:mb-2">{isEN ? "Licensed Psychologist" : "Lizenzierter Psychologe"}</h3>
              <p className="text-[0.65rem] md:text-xs text-muted-foreground leading-relaxed hidden md:block">
                {isEN
                  ? "University-qualified psychologist with decades of clinical and therapeutic experience."
                  : "Universitär qualifizierter Psychologe mit jahrzehntelanger klinischer und therapeutischer Erfahrung."}
              </p>
            </div>
            <div className="text-center p-4 md:p-6 bg-card border border-border rounded-lg shadow-sm">
              <img src={CDN.logo} alt="Aktiv-Hypnose© Logo – Methode von David J. Woods" className="h-10 md:h-14 w-auto shrink-0 mx-auto mb-3" width={84} height={56} loading="lazy" />
              <h3 className="font-semibold text-xs md:text-sm text-foreground mb-1 md:mb-2">{isEN ? "Developer of Aktiv-Hypnose©" : "Entwickler der Aktiv-Hypnose©"}</h3>
              <p className="text-[0.65rem] md:text-xs text-muted-foreground leading-relaxed hidden md:block">
                {isEN
                  ? "Proprietary method combining clinical hypnosis with active participation for faster, lasting results."
                  : "Eigene Methode, die klinische Hypnose mit aktiver Teilnahme kombiniert für schnellere, nachhaltige Ergebnisse."}
              </p>
            </div>
            <div className="text-center p-4 md:p-6 bg-card border border-border rounded-lg shadow-sm">
              <img src={CDN.nghBadge} alt="NGH International Trainer Zertifikat – National Guild of Hypnotists" className="h-12 md:h-16 mx-auto mb-2 md:mb-3" width={64} height={64} loading="lazy" />
              <h3 className="font-semibold text-xs md:text-base text-foreground">NGH International Trainer</h3>
            </div>
            <div className="text-center p-4 md:p-6 bg-card border border-border rounded-lg shadow-sm">
              <img src={CDN.emrBadge} alt="EMR Krankenkasse Konform Badge – ZSR P609264" className="h-12 md:h-16 mx-auto mb-2 md:mb-3" width={102} height={64} loading="lazy" />
              <h3 className="font-semibold text-xs md:text-base text-foreground">EMR Krankenkasse Konform</h3>
              <p className="text-[0.65rem] md:text-sm text-muted-foreground">ZSR P609264</p>
            </div>
            <div className="text-center p-4 md:p-6 bg-card border border-border rounded-lg shadow-sm">
              <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">40+</div>
              <h3 className="font-semibold text-xs md:text-base text-foreground">{isEN ? "Years of Experience" : "Jahre Erfahrung"}</h3>
              <p className="text-[0.65rem] md:text-sm text-muted-foreground">30.000+ {isEN ? "Sessions" : "Sitzungen"}</p>
            </div>
            <a href="https://share.google/SGm12iRl4fuRtKxRD" target="_blank" rel="noopener noreferrer" className="text-center p-4 md:p-6 bg-card border border-border rounded-lg shadow-sm hover:border-primary/50 transition-colors">
              <div className="flex justify-center gap-0.5 mb-1 md:mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <h3 className="font-semibold text-xs md:text-base text-foreground">5.0 Google</h3>
              <p className="text-[0.65rem] md:text-sm text-muted-foreground">264 {isEN ? "Reviews" : "Bewertungen"}</p>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CORPORATE COACHING ═══════════════════ */}
       <section className="py-16 bg-muted/50" style={deferredSectionStyle}>
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-foreground">
            {isEN ? "Corporate Coaching" : "Firmencoaching"}
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
            {isEN
              ? "Performance Coaching: Maximize Your Team's Potential. We offer tailored solutions for companies of all sizes."
              : "Erfolgs-Coaching: Leistungsfähigkeit maximieren. Wir bieten maßgeschneiderte Lösungen für Unternehmen jeder Größe."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
          <div className="text-center mt-8">
            <Link to={getPath("corporate", language, country)}>
              <Button className="bg-cta hover:bg-cta/90 text-cta-foreground font-semibold">
                {isEN ? "All Corporate Programs" : "Alle Firmen-Programme"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRAINING ═══════════════════ */}
      <section className="py-8 md:py-16" style={deferredSectionStyle}>
        <div className="container-main">
          <h2 className="text-lg md:text-3xl font-bold text-foreground text-center mb-0.5 md:mb-3">{t("section.training")}</h2>
          <p className="text-center text-muted-foreground text-xs md:text-base max-w-2xl mx-auto mb-2 md:mb-8">
            {isEN ? "Aktiv-Hypnose© Therapist Diploma — 6-Day Intensive Training" : "Aktiv-Hypnose© Therapeuten-Diplom — 6-Tage Intensiv-Ausbildung"}
          </p>
          <div className="bg-card border border-border rounded-lg p-3 md:p-8 max-w-3xl mx-auto">
            <p className="text-foreground/80 leading-snug text-xs md:text-base mb-3 md:mb-6">
              {isEN
                ? "Training for people who want to create real change – practical, effective, and held in small, strictly limited groups."
                : "Ausbildung für Menschen, die echte Veränderung bewirken wollen – praxisnah, wirksam und in kleinen, strikt begrenzten Gruppen."}
            </p>
            <div className="grid grid-cols-3 gap-1.5 md:gap-4 mb-3 md:mb-6">
              {[
                { num: "350+", label: isEN ? "Pages Training Manual" : "Seiten Ausbildungsmappe" },
                { num: "150+", label: isEN ? "Pages Example Texts" : "Seiten Beispieltexte" },
                { num: "50+", label: isEN ? "Short Videos" : "Kurzvideos" },
                { num: "50+", label: isEN ? "Audio Recordings" : "Audioaufnahmen" },
                { num: "✓", label: isEN ? "Aktiv-Hypnose© Diploma" : "Aktiv-Hypnose© Diplom" },
              ].map(item => (
                <div key={item.label} className="text-center">
                  <div className="text-base md:text-2xl font-bold text-primary">{item.num}</div>
                  <div className="text-[9px] md:text-xs text-muted-foreground leading-tight">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 bg-secondary rounded p-1 md:p-2 mb-2 md:mb-6">
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-cta" />
              <span className="text-[11px] md:text-sm font-medium text-foreground">EMR Krankenkasse Konform</span>
            </div>
            <div className="text-center">
              <Link to={getPath("training", language, country)}>
                <Button className="bg-cta text-cta-foreground hover:bg-cta/90 text-xs md:text-base px-4 py-1.5 md:px-6 md:py-2">
                  {isEN ? "All Training Details" : "Alle Ausbildungsdetails"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════ INLINE CONTACT FORM ═══════════════════ */}
      <section className="py-16 bg-[#f4f3ef]" style={deferredSectionStyle}>
        <div className="container-main">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">
              {isEN ? "Take the First Step with a Free Consultation" : "Machen Sie den ersten Schritt mit einem kostenlosen Erstgespräch"}
            </h2>
            <p className="text-center text-foreground/80 text-sm md:text-base mb-5">
              {isEN
                ? "Send your request here and I will reply within 24 hours. Or use the WhatsApp button for a faster response."
                : "Senden Sie hier Ihre Anfrage und ich melde mich innerhalb von 24 Stunden. Oder nutzen Sie den WhatsApp-Button für eine schnellere Antwort."}
            </p>
            <div className="border border-border p-5 sm:p-6 bg-white">
              <InlineContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
