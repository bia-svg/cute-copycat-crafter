import { useLanguage } from "@/contexts/LanguageContext";
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
          <img key={i} src={src} alt={`Bekannt aus ${i + 1}`} className="h-8 md:h-10 object-contain shrink-0 opacity-60 hover:opacity-100 transition-opacity" loading="lazy" />
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
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
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="bg-secondary">
        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-2 container-main py-12 gap-8 items-center">
          {/* Image */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            {heroSlides.map((src, i) => (
              <img key={i} src={src} alt={`David J. Woods ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
                loading={i === 0 ? "eager" : "lazy"} />
            ))}
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
              ? (isEN ? "Hypnotherapy in Zurich & Augsburg — David J. Woods" : "Hypnosetherapie in Zürich & Augsburg — Lic. Psych. David J. Woods")
              : country === "ch"
              ? (isEN ? "Hypnotherapy in Zurich — David J. Woods" : "Hypnosetherapie in Zürich — Lic. Psych. David J. Woods")
              : (isEN ? "Hypnotherapy in Augsburg — David J. Woods" : "Hypnose in Augsburg — Lic. Psych. David J. Woods")}
          </h1>
          <p className="italic text-muted-foreground">{isEN ? '"Freedom Begins in the Mind"' : '"Freiheit beginnt im Kopf"'}</p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {isEN
              ? "With his self-developed Aktiv-Hypnose© method, David J. Woods combines clinical psychology with targeted hypnotherapy. With over 40 years of experience he conducted more than 30,000 sessions for smoking cessation, weight loss, anxiety relief, and peak performance."
              : "Mit seiner selbst entwickelten Aktiv-Hypnose© Methode verbindet David J. Woods klinische Psychologie mit gezielter Hypnotherapie. Mit über 40 Jahren Erfahrung hat er mehr als 30.000 Sitzungen durchgeführt — für Raucherentwöhnung, Gewichtsreduktion, Angstbewältigung und Leistungssteigerung."}
          </p>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            {heroSlides.map((src, i) => (
              <img key={i} src={src} alt={`David J. Woods ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
                loading={i === 0 ? "eager" : "lazy"} />
            ))}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {heroSlides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${i === currentSlide ? "bg-primary w-6" : "bg-primary/30 w-2"}`} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link to={getPath("contact", language, country)}>
              <Button className="w-full bg-cta text-cta-foreground hover:bg-cta/90">{isEN ? "Free Discovery Call" : "Kostenloses Erstgespräch"}</Button>
            </Link>
            <Link to={getPath("about", language, country)}>
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
            {showCH && (
              <div className="flex items-center gap-3 bg-secondary rounded-lg p-3">
                <img src={CDN.emrBadge} alt="EMR" className="h-12" />
                <div>
                  <div className="font-semibold text-sm text-foreground">EMR Krankenkasse Konform</div>
                  <div className="text-xs text-muted-foreground">ZSR P609264 — {isEN ? "Recognized by Swiss health insurance" : "Von Schweizer Krankenkassen anerkannt"}</div>
                </div>
              </div>
            )}
            <Link to={getPath("about", language, country)}>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-2">
                {isEN ? "More About Our Method" : "Mehr über unsere Methode"}
              </Button>
            </Link>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img src={CDN.heroSession} alt={isEN ? "Hypnotherapy Session" : "Hypnosetherapie Sitzung"} className="w-full h-full object-cover" loading="lazy" />
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <img src={CDN.nghBadge} alt="NGH" className="h-16 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground">NGH International Trainer</h3>
              <p className="text-sm text-muted-foreground">National Guild of Hypnotists</p>
            </div>
            {showCH && (
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <img src={CDN.emrBadge} alt="EMR" className="h-16 mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">EMR Krankenkasse Konform</h3>
                <p className="text-sm text-muted-foreground">ZSR P609264</p>
              </div>
            )}
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">40+</div>
              <h3 className="font-semibold text-foreground">{isEN ? "Years of Experience" : "Jahre Erfahrung"}</h3>
              <p className="text-sm text-muted-foreground">30.000+ {isEN ? "Sessions" : "Sitzungen"}</p>
            </div>
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="text-center p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-center gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <h3 className="font-semibold text-foreground">5.0 / 5 Google</h3>
              <p className="text-sm text-muted-foreground">255 {isEN ? "Reviews" : "Bewertungen"}</p>
            </a>
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
              { icon: <Trophy className="w-8 h-8" />, title: isEN ? "Success Training" : "Erfolgs-Training", desc: isEN ? "Success is ultimately decided in the mind." : "Letztendlich entscheidet sich Erfolg im Kopf." },
              { icon: <Shield className="w-8 h-8" />, title: isEN ? "Resilience Building" : "Resilienz-Verstärken", desc: isEN ? "Build inner strength for challenging times." : "Innere Stärke aufbauen für schwere Zeiten." },
              { icon: <Clock className="w-8 h-8" />, title: isEN ? "Stress Prevention" : "Stress-Prävention", desc: isEN ? "Burnout prevention for leaders and teams." : "Burnout-Prävention für Führungskräfte und Teams." },
              { icon: <Cigarette className="w-8 h-8" />, title: isEN ? "Non-Smoker Seminars" : "Nichtraucher-Seminare", desc: isEN ? "'Non-smoker in 3 hours' — corporate wellness." : "'Nichtraucher in 3 Stunden' — Firmen-Wellness." },
            ].map((item) => (
              <div key={item.title} className="bg-primary-foreground/10 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-3 opacity-90">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to={getPath("corporate", language, country)}>
              <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
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
            {showCH && (
              <div className="flex items-center gap-2 bg-secondary rounded p-2 mb-6">
                <CheckCircle className="w-4 h-4 text-cta" />
                <span className="text-sm font-medium text-foreground">EMR Krankenkasse Konform</span>
              </div>
            )}
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

      {/* ═══════════════════ ONLINE SHOP ═══════════════════ */}
      <section className="py-16 bg-secondary">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">{t("section.shop")}</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
            {isEN
              ? "Support your transformation at home with our professional hypnosis audio programs."
              : "Unterstützen Sie Ihre Transformation zuhause mit unseren professionellen Hypnose-Audioprogrammen."}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shopItems.map((item) => (
              <Link to={getPath("shop", language, country)} key={item.title}
                className="bg-card border border-border rounded-lg p-5 text-center hover:shadow-md transition-shadow group">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{item.subtitle}</div>
                <h3 className="font-semibold text-foreground mb-3">{item.title}</h3>
                <div className="text-lg font-bold text-primary">{item.price}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to={getPath("shop", language, country)}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                {isEN ? "Visit Online Shop" : "Zum Onlineshop"}
              </Button>
            </Link>
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
          <a href="#" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mb-6">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />)}
            </div>
            <span className="text-sm ml-1">5.0/5 — 255 Google {isEN ? "Reviews" : "Bewertungen"}</span>
          </a>
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
