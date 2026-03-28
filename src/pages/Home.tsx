import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import hero1 from "@/assets/hero-1.jpeg";
import hero2 from "@/assets/hero-2.jpeg";
import hero3 from "@/assets/hero-3.jpeg";
import hero4 from "@/assets/hero-4.jpeg";
import hero5 from "@/assets/hero-5.jpeg";
import davidSessionImg from "@/assets/david-office-portrait.jpeg";

const heroSlides = [hero1, hero2, hero3, hero4, hero5];
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
    <div className="relative">
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide py-2" style={{ scrollbarWidth: "none" }}>
        {CDN.bekanntAus.map((src, i) => (
          <img key={i} src={src} alt={`David J. Woods bekannt aus Medien – Logo ${i + 1}`} className="h-8 md:h-10 object-contain shrink-0 opacity-60 hover:opacity-100 transition-opacity mix-blend-multiply" loading="lazy" />
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
  const isEN = language === "en";

  /* ── Hero Slider ── */
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = heroSlides.length;
  const goNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    const interval = setInterval(goNext, 3000);
    return () => clearInterval(interval);
  }, [totalSlides]);

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
        : "Die Hypnose gegen Depressionen sowie die Hypnose gegen Traumata hilft Ihnen dabei, neue Perspektiven zu entdecken und Ihre Lebensfreude wiederzugewinnen.",
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
        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-2 container-main py-12 gap-8 items-center">
          {/* Image */}
          <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden mx-auto group">
            {heroSlides.map((src, i) => (
              <img key={i} src={src} alt={`David J. Woods – Hypnotherapeut und Psychologe, Foto ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
                />
            ))}
            <button onClick={goPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Previous">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button onClick={goNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Next">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {heroSlides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${i === currentSlide ? "bg-primary w-6" : "bg-primary/30 w-2"}`}
                  aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {isInternational
                ? (isEN ? "Hypnotherapy Sessions and Seminars Across Germany or Switzerland — David J. Woods" : "Hypnosetherapie-Sitzungen und Seminare in Deutschland oder der Schweiz — David J. Woods")
                : country === "ch"
                ? (isEN ? "Hypnotherapy Sessions and Seminars Across Switzerland — David J. Woods" : "Hypnosetherapie-Sitzungen und Seminare in der Schweiz — David J. Woods")
                : (isEN ? "Hypnotherapy Sessions and Seminars Across Germany — David J. Woods" : "Hypnosetherapie-Sitzungen und Seminare in Deutschland — David J. Woods")}
            </h1>
            <p className="text-lg italic text-muted-foreground">
              {isEN ? '"Freedom Begins in the Mind"' : '"Freiheit beginnt im Kopf"'}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              {isEN
                ? "With his self-developed Aktiv-Hypnose© method, David J. Woods combines clinical psychology with targeted hypnotherapy. With over 40 years of experience he conducted more than 30,000 sessions for smoking cessation, weight loss, anxiety relief, and peak performance."
                : "Mit seiner selbst entwickelten Aktiv-Hypnose© Methode verbindet David J. Woods klinische Psychologie mit gezielter Hypnotherapie. Mit über 40 Jahren Erfahrung hat er mehr als 30.000 Sitzungen durchgeführt — für Raucherentwöhnung, Gewichtsreduktion, Angstbewältigung und Leistungssteigerung."}
            </p>
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
              <TVLogoCarousel />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden container-main py-8 space-y-6">
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            {isInternational
              ? (isEN ? "Hypnotherapy Sessions and Seminars Across Germany or Switzerland — David J. Woods" : "Hypnosetherapie-Sitzungen und Seminare in Deutschland oder der Schweiz — David J. Woods")
              : country === "ch"
              ? (isEN ? "Hypnotherapy Sessions and Seminars Across Switzerland — David J. Woods" : "Hypnosetherapie-Sitzungen und Seminare in der Schweiz — David J. Woods")
              : (isEN ? "Hypnotherapy Sessions and Seminars Across Germany — David J. Woods" : "Hypnosetherapie-Sitzungen und Seminare in Deutschland — David J. Woods")}
          </h1>
          <p className="italic text-muted-foreground">{isEN ? '"Freedom Begins in the Mind"' : '"Freiheit beginnt im Kopf"'}</p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {isEN
              ? "With his self-developed Aktiv-Hypnose© method, David J. Woods combines clinical psychology with targeted hypnotherapy. With over 40 years of experience he conducted more than 30,000 sessions for smoking cessation, weight loss, anxiety relief, and peak performance."
              : "Mit seiner selbst entwickelten Aktiv-Hypnose© Methode verbindet David J. Woods klinische Psychologie mit gezielter Hypnotherapie. Mit über 40 Jahren Erfahrung hat er mehr als 30.000 Sitzungen durchgeführt — für Raucherentwöhnung, Gewichtsreduktion, Angstbewältigung und Leistungssteigerung."}
          </p>
          <div className="relative aspect-[4/3] max-h-[280px] rounded-2xl overflow-hidden mx-auto group">
            {heroSlides.map((src, i) => (
              <img key={i} src={src} alt={`David J. Woods – Hypnotherapeut und Psychologe, Foto ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
                />
            ))}
            <button onClick={goPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full p-1.5 transition-opacity" aria-label="Previous">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button onClick={goNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full p-1.5 transition-opacity" aria-label="Next">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {heroSlides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${i === currentSlide ? "bg-primary w-6" : "bg-primary/30 w-2"}`} />
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
            <TVLogoCarousel />
          </div>
        </div>
      </section>

      {/* ═══════════════════ AKTIV-HYPNOSE METHOD ═══════════════════ */}
      <section className="py-16">
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
              <img src={CDN.emrBadge} alt="EMR Krankenkasse Konform – Schweizer Zusatzversicherung anerkannt" className="h-12" loading="lazy" />
              <div>
                <div className="font-semibold text-sm text-foreground">EMR Krankenkasse Konform</div>
                <div className="text-xs text-muted-foreground">ZSR P609264 — {isEN ? "Recognized by Swiss health insurance" : "Von Schweizer Krankenkassen anerkannt"}</div>
              </div>
            </div>
            <Link to={getPath("about", language, country)}>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-2">
                {isEN ? "More About Our Method" : "Mehr über unsere Methode"}
              </Button>
            </Link>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img src={davidSessionImg} alt={isEN ? "David J. Woods during a hypnotherapy session in his practice" : "David J. Woods während einer Hypnosetherapie-Sitzung in seiner Praxis"} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES ═══════════════════ */}
      <section className="py-16 bg-secondary">
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
      <section className="py-16">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            {isEN ? "Qualifications & Certifications" : "Qualifikationen & Zertifizierungen"}
          </h2>




          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary flex items-center justify-center shrink-0 rounded">
                  <span className="text-primary-foreground text-sm font-bold text-center leading-tight">Lic.<br/>Psych.</span>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-2">{isEN ? "Licensed Psychologist" : "Lizenzierter Psychologe"}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEN
                  ? "University-qualified psychologist with decades of clinical and therapeutic experience."
                  : "Universitär qualifizierter Psychologe mit jahrzehntelanger klinischer und therapeutischer Erfahrung."}
              </p>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <img src={CDN.logo} alt="Aktiv-Hypnose© Logo – Methode von David J. Woods" className="h-14 w-auto shrink-0" loading="lazy" />
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-2">{isEN ? "Developer of Aktiv-Hypnose©" : "Entwickler der Aktiv-Hypnose©"}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEN
                  ? "Proprietary method combining clinical hypnosis with active participation for faster, lasting results."
                  : "Eigene Methode, die klinische Hypnose mit aktiver Teilnahme kombiniert für schnellere, nachhaltige Ergebnisse."}
              </p>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <img src={CDN.nghBadge} alt="NGH International Trainer Zertifikat – National Guild of Hypnotists" className="h-16 mx-auto mb-3" loading="lazy" />
              <h3 className="font-semibold text-foreground">NGH International Trainer</h3>
              <p className="text-sm text-muted-foreground">National Guild of Hypnotists</p>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <img src={CDN.emrBadge} alt="EMR Krankenkasse Konform Badge – ZSR P609264" className="h-16 mx-auto mb-3" loading="lazy" />
              <h3 className="font-semibold text-foreground">EMR Krankenkasse Konform</h3>
              <p className="text-sm text-muted-foreground">ZSR P609264</p>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">40+</div>
              <h3 className="font-semibold text-foreground">{isEN ? "Years of Experience" : "Jahre Erfahrung"}</h3>
              <p className="text-sm text-muted-foreground">30.000+ {isEN ? "Sessions" : "Sitzungen"}</p>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="flex justify-center gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <h3 className="font-semibold text-foreground">5.0 / 5 Google</h3>
              <p className="text-sm text-muted-foreground">255 {isEN ? "Reviews" : "Bewertungen"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CORPORATE COACHING ═══════════════════ */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            {isEN ? "Corporate Coaching" : "Firmencoaching"}
          </h2>
          <p className="text-center opacity-80 max-w-2xl mx-auto mb-10">
            {isEN
              ? "Performance Coaching: Maximize Your Team's Potential. We offer tailored solutions for companies of all sizes."
              : "Erfolgs-Coaching: Leistungsfähigkeit maximieren. Wir bieten maßgeschneiderte Lösungen für Unternehmen jeder Größe."}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Trophy className="w-8 h-8" />, title: isEN ? "Success Training" : "Erfolgs-Training", desc: isEN ? "Success is ultimately decided in the mind." : "Letztendlich entscheidet sich Erfolg im Kopf.", href: getPath("corporateErfolg", language, country) },
              { icon: <Shield className="w-8 h-8" />, title: isEN ? "Resilience Building" : "Resilienz-Verstärken", desc: isEN ? "Build inner strength for challenging times." : "Innere Stärke aufbauen für schwere Zeiten.", href: getPath("corporateResilienz", language, country) },
              { icon: <Clock className="w-8 h-8" />, title: isEN ? "Stress Prevention" : "Stress-Prävention", desc: isEN ? "Burnout prevention for leaders and teams." : "Burnout-Prävention für Führungskräfte und Teams.", href: getPath("corporateStress", language, country) },
              { icon: <Cigarette className="w-8 h-8" />, title: isEN ? "Non-Smoker Seminars" : "Nichtraucher-Seminare", desc: isEN ? "'Non-smoker in 3 hours' — corporate wellness." : "'Nichtraucher in 3 Stunden' — Firmen-Wellness.", href: getPath("corporateNichtraucher", language, country) },
            ].map((item) => (
              <Link key={item.title} to={item.href} className="bg-primary-foreground/10 rounded-lg p-6 text-center hover:bg-primary-foreground/20 transition-colors group">
                <div className="flex justify-center mb-3 opacity-90">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm opacity-80 mb-4">{item.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium opacity-70 group-hover:opacity-100">
                  {isEN ? "Learn more" : "Mehr erfahren"} →
                </span>
              </Link>
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
      <section className="py-16">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">{t("section.training")}</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
            {isEN ? "Aktiv-Hypnose© Therapist Diploma — 6-Day Intensive Training" : "Aktiv-Hypnose© Therapeuten-Diplom — 6-Tage Intensiv-Ausbildung"}
          </p>
          <div className="bg-card border border-border rounded-lg p-8 max-w-3xl mx-auto">
            <p className="text-foreground/80 leading-relaxed mb-6">
              {isEN
                ? "Training for people who want to create real change – well-founded, practical, and sustainably effective. Training takes place in small groups and is strictly limited."
                : "Ausbildung für Menschen, die echte Veränderung bewirken wollen – fundiert, praxisnah und nachhaltig wirksam. Die Ausbildung findet bewusst in kleinen Gruppen statt und ist strikt begrenzt."}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {[
                { num: "350+", label: isEN ? "Pages Training Manual" : "Seiten Ausbildungsmappe" },
                { num: "150+", label: isEN ? "Pages Example Texts" : "Seiten Beispieltexte" },
                { num: "50+", label: isEN ? "Short Videos" : "Kurzvideos" },
                { num: "50+", label: isEN ? "Audio Recordings" : "Audioaufnahmen" },
                { num: "✓", label: isEN ? "Aktiv-Hypnose© Diploma" : "Aktiv-Hypnose© Diplom" },
              ].map(item => (
                <div key={item.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">{item.num}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-secondary rounded p-2 mb-6">
              <CheckCircle className="w-4 h-4 text-cta" />
              <span className="text-sm font-medium text-foreground">EMR Krankenkasse Konform</span>
            </div>
            <div className="text-center">
              <Link to={getPath("training", language, country)}>
                <Button className="bg-cta text-cta-foreground hover:bg-cta/90">
                  {isEN ? "All Training Details" : "Alle Ausbildungsdetails"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section className="py-20 bg-cta text-cta-foreground">
        <div className="container-main text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isEN ? "Ready for Lasting Change?" : "Bereit für nachhaltige Veränderung?"}
          </h2>
          <p className="opacity-90 max-w-xl mx-auto mb-6">
            {isEN
              ? "Book your free and non-binding discovery call. We take time for you and advise you individually."
              : "Vereinbaren Sie jetzt Ihr kostenloses und unverbindliches Erstgespräch. Wir nehmen uns Zeit für Sie und beraten Sie individuell."}
          </p>
          <div className="inline-flex items-center gap-1 mb-6">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />)}
            </div>
            <span className="text-sm ml-1">5.0/5 — 255 Google {isEN ? "Reviews" : "Bewertungen"}</span>
          </div>
          <div>
            <Link to={getPath("contact", language, country)}>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold">
                {t("nav.cta")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
