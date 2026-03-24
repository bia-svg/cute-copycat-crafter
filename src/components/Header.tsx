import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import {
  Menu, X, ChevronDown, Phone,
  Cigarette, Brain, Scale, Flame, HeartPulse, Users,
  GraduationCap, Building2, Tv, Star, MessageSquare, User,
  BookOpen, MapPin, Trophy, Newspaper, Award, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { language, country, setLanguage, setCountry, t, isSwiss, showCH } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const isDE = language === "de";

  const countryOptions = [
    { value: "ch" as const, label: "Switzerland", flag: "🇨🇭" },
    { value: "de" as const, label: "Germany", flag: "🇩🇪" },
    { value: "int" as const, label: "International", flag: "🌍" },
  ];
  const languageOptions = [
    { value: "de" as const, label: "Deutsch" },
    { value: "en" as const, label: "English" },
  ];
  const currentCountry = countryOptions.find(c => c.value === country) || countryOptions[0];
  const currentLanguage = languageOptions.find(l => l.value === language) || languageOptions[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) setCountryDropdownOpen(false);
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) setLangDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => { setMobileOpen(false); setMobileAccordion(null); }, [location.pathname]);

  const handleMouseEnter = (menu: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(menu);
  };
  const handleMouseLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 150);
  };

  /* ── Menu Data ── */

  const therapyGoals = [
    { icon: <Cigarette className="w-5 h-5" />, label: isDE ? "Raucherentwöhnung" : "Stop Smoking", desc: isDE ? "Endlich rauchfrei werden" : "Quit smoking permanently", href: getPath("smoking", language, country) },
    { icon: <Brain className="w-5 h-5" />, label: isDE ? "Ängste & Phobien" : "Anxiety & Phobias", desc: isDE ? "Ängste dauerhaft überwinden" : "Overcome fears permanently", href: getPath("anxiety", language, country) },
    { icon: <Scale className="w-5 h-5" />, label: isDE ? "Abnehmen" : "Weight Loss", desc: isDE ? "Essverhalten nachhaltig verändern" : "Change eating habits sustainably", href: getPath("weight", language, country) },
    { icon: <Flame className="w-5 h-5" />, label: isDE ? "Stress & Burnout" : "Stress & Burnout", desc: isDE ? "Stressreduktion & Prävention" : "Stress reduction & prevention", href: getPath("stress", language, country) },
    { icon: <HeartPulse className="w-5 h-5" />, label: isDE ? "Depressionen & Traumata" : "Depression & Trauma", desc: isDE ? "Neue Perspektiven entdecken" : "Discover new perspectives", href: getPath("depression", language, country) },
  ];

  const audiences = [
    { icon: <User className="w-5 h-5" />, label: isDE ? "Erwachsene" : "Adult Individual", desc: isDE ? "Persönliche 1:1 Sitzungen mit David" : "Personal 1:1 sessions with David", href: getPath("smoking", language, country) },
    { icon: <Users className="w-5 h-5" />, label: isDE ? "Kinder & Jugendliche" : "Children & Teens", desc: isDE ? "Sanfte Therapie mit Kathryn" : "Gentle therapy with Kathryn", href: getPath("children", language, country) },
    { icon: <Building2 className="w-5 h-5" />, label: isDE ? "Firmen & Unternehmen" : "Corporate & Business", desc: isDE ? "Coaching für Teams & Führungskräfte" : "Coaching for teams & leaders", href: getPath("corporate", language, country) },
  ];

  const trainingItems = [
    { icon: <GraduationCap className="w-5 h-5" />, label: isDE ? "Hypnose-Ausbildung" : "Hypnosis Training", desc: isDE ? "NGH-zertifiziertes Therapeuten-Diplom" : "NGH-certified therapist diploma", href: getPath("training", language, country) },
    { icon: <Calendar className="w-5 h-5" />, label: isDE ? "Seminar-Ablauf" : "Seminar Schedule", desc: isDE ? "6-Tage Intensiv-Curriculum" : "6-day intensive curriculum", href: getPath("seminarSchedule", language, country) },
    { icon: <Building2 className="w-5 h-5" />, label: isDE ? "Firmen-Coaching" : "Corporate Coaching", desc: isDE ? "Coaching für Teams & Führungskräfte" : "Coaching for teams & leaders", href: getPath("corporate", language, country) },
  ];

  const aboutItems = [
    { icon: <User className="w-5 h-5" />, label: isDE ? "David J. Woods & Team" : "David J. Woods & Team", desc: isDE ? "Lic.Psych. · Über 40 Jahre Erfahrung" : "Lic.Psych. · 40+ years experience", href: getPath("about", language, country) },
    { icon: <Tv className="w-5 h-5" />, label: isDE ? "TV & Medien" : "TV & Media", desc: isDE ? "Medienauftritte & Presse" : "Media appearances & press", href: getPath("media", language, country) },
    { icon: <Star className="w-5 h-5" />, label: isDE ? "Kundenmeinungen" : "Testimonials", desc: isDE ? "5.0/5 bei Google · 255 Bewertungen" : "5.0/5 on Google · 255 reviews", href: getPath("testimonials", language, country) },
    { icon: <Trophy className="w-5 h-5" />, label: isDE ? "Erfolgsberichte" : "Success Stories", desc: isDE ? "Video-Erfahrungsberichte unserer Klienten" : "Video testimonials from our clients", href: getPath("successStories", language, country) },
    { icon: <Newspaper className="w-5 h-5" />, label: "Blog", desc: isDE ? "Artikel & Wissen rund um Hypnose" : "Articles & knowledge about hypnosis", href: getPath("blog", language, country) },
    { icon: <MapPin className="w-5 h-5" />, label: isDE ? "Standorte" : "Locations", desc: isDE ? "Unsere Praxen in der Schweiz & Deutschland" : "Our practices in Switzerland & Germany", href: getPath("locations", language, country) },
  ];

  /* ── Shared Components ── */

  const MenuItemLink = ({ icon, label, desc, href }: { icon: React.ReactNode; label: string; desc: string; href: string }) => (
    <Link to={href} onClick={() => setActiveMenu(null)} className="flex items-start gap-3 p-3 rounded-md hover:bg-secondary transition-colors">
      <span className="text-primary mt-0.5">{icon}</span>
      <div>
        <div className="font-medium text-sm text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </Link>
  );

  const SidebarCard = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-2 self-start">
      {children}
    </div>
  );

  const MegaMenuPanel = ({ id, children }: { id: string; children: React.ReactNode }) => {
    if (activeMenu !== id) return null;
    return (
      <div className="absolute left-0 right-0 top-full z-50">
        <div className="bg-card border-b border-border shadow-lg">
          <div onMouseEnter={() => handleMouseEnter(id)} onMouseLeave={handleMouseLeave}>
            <div className="container-main py-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MobileSection = ({ id, title, items }: { id: string; title: string; items: typeof therapyGoals }) => (
    <div className="border-b border-border">
      <button onClick={() => setMobileAccordion(mobileAccordion === id ? null : id)} className="flex items-center justify-between w-full px-4 py-3 text-left font-medium text-foreground">
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === id ? "rotate-180" : ""}`} />
      </button>
      {mobileAccordion === id && (
        <div className="px-4 pb-3 space-y-1">
          {items.map((item) => (
            <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} className="flex items-start gap-3 p-2 rounded-md hover:bg-secondary">
              <span className="text-primary mt-0.5">{item.icon}</span>
              <div>
                <div className="text-sm font-medium text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs sm:text-xs">
        <div className="container-main flex items-center justify-center sm:justify-between py-2 sm:py-1.5 gap-4">
          <div className="hidden sm:flex items-center gap-4">
            {isSwiss ? (
              <a href="tel:+41448880901" className="flex items-center gap-1 hover:underline">
                <Phone className="w-3 h-3" /> +41 44 888 09 01
              </a>
            ) : (
              <a href="tel:+491719539922" className="flex items-center gap-1 hover:underline">
                <Phone className="w-3 h-3" /> +49 171 9539922
              </a>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm sm:text-xs">
            <div className="relative" ref={countryDropdownRef}>
              <button onClick={() => setCountryDropdownOpen(!countryDropdownOpen)} className="flex items-center gap-1.5 hover:underline font-medium">
                {currentCountry.flag} <span className="hidden sm:inline">{currentCountry.label}</span> <ChevronDown className="w-3 h-3" />
              </button>
              {countryDropdownOpen && (
                <div className="absolute right-0 mt-1 bg-card text-foreground border border-border rounded shadow-md min-w-[140px] z-50">
                  {countryOptions.map(opt => (
                    <button key={opt.value} onClick={() => { setCountry(opt.value); setCountryDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary flex items-center gap-2 ${opt.value === country ? "font-bold" : ""}`}>
                      {opt.flag} {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative" ref={langDropdownRef}>
              <button onClick={() => setLangDropdownOpen(!langDropdownOpen)} className="flex items-center gap-1.5 hover:underline font-medium">
                {currentLanguage.label} <ChevronDown className="w-3 h-3" />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 bg-card text-foreground border border-border rounded shadow-md min-w-[100px] z-50">
                  {languageOptions.map(opt => (
                    <button key={opt.value} onClick={() => { setLanguage(opt.value); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary ${opt.value === language ? "font-bold" : ""}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-[#8b827c] text-white text-xs">
        <div className="container-main flex items-center justify-center gap-1.5 py-1.5 flex-wrap">
          {showCH && (
            <>
              <span>EMR-Krankenkasse Konform</span>
              <span className="opacity-50">·</span>
            </>
          )}
          <span>NGH International Trainer</span>
          <span className="opacity-50">·</span>
          <span>★ 5.0 / 5 Google (255)</span>
          <span className="opacity-50">·</span>
          <span>{isDE ? "Über 40 Jahre Erfahrung" : "40+ Years Experience"}</span>
          <span className="opacity-50">·</span>
          <span>{isDE ? "30.000+ Sitzungen" : "30,000+ Sessions"}</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-main flex items-center justify-between h-16">
        <Link to={getPath("home", language, country)} className="flex items-center gap-2">
          <img src={CDN.logo} alt="David J. Woods" className="h-10" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <div className="relative" onMouseEnter={() => handleMouseEnter("sessions")} onMouseLeave={handleMouseLeave}>
            <button className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary flex items-center gap-1">
              {t("nav.sessions")} <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="relative" onMouseEnter={() => handleMouseEnter("training")} onMouseLeave={handleMouseLeave}>
            <button className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary flex items-center gap-1">
              {t("nav.training")} <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="relative" onMouseEnter={() => handleMouseEnter("about")} onMouseLeave={handleMouseLeave}>
            <button className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary flex items-center gap-1">
              {t("nav.about")} <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          <Link to={getPath("contact", language, country)}>
            <Button className="ml-2 bg-cta text-cta-foreground hover:bg-cta/90 text-sm">
              {t("nav.cta")}
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Mega Menu: Hypnosetherapie ── */}
      <MegaMenuPanel id="sessions">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {isDE ? "Therapieziele" : "Therapy Goals"}
            </h4>
            <div className="space-y-1">
              {therapyGoals.map(item => <MenuItemLink key={item.label} {...item} />)}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {isDE ? "Zielgruppen" : "Audiences"}
            </h4>
            <div className="space-y-1">
              {audiences.map(item => <MenuItemLink key={item.label} {...item} />)}
            </div>
          </div>
          <SidebarCard>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-cta" />
              <span className="font-semibold text-sm text-foreground">NGH International Trainer</span>
            </div>
            {showCH && (
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-cta" />
                <span className="font-semibold text-sm text-foreground">EMR-Krankenkasse Konform</span>
              </div>
            )}
            <Link to={getPath("contact", language, country)} onClick={() => setActiveMenu(null)}>
              <Button size="sm" className="w-full bg-cta text-cta-foreground hover:bg-cta/90 text-xs">
                {isDE ? "Erstgespräch buchen" : "Book Discovery Call"}
              </Button>
            </Link>
          </SidebarCard>
        </div>
      </MegaMenuPanel>

      {/* ── Mega Menu: Ausbildung ── */}
      <MegaMenuPanel id="training">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {isDE ? "Ausbildung & Seminare" : "Training & Seminars"}
            </h4>
            <div className="space-y-1">
              {trainingItems.map(item => <MenuItemLink key={item.label} {...item} />)}
            </div>
          </div>
          <SidebarCard>
            <p className="font-semibold text-sm text-foreground">
              {isDE ? "Nächste Termine" : "Upcoming Dates"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isDE ? "Kleine Gruppen · Maximale Lernintensität" : "Small groups · Maximum learning intensity"}
            </p>
            <Link to={getPath("training", language, country)} onClick={() => setActiveMenu(null)}>
              <Button size="sm" className="w-full bg-cta text-cta-foreground hover:bg-cta/90 text-xs">
                {isDE ? "Seminartermine ansehen" : "View Seminar Dates"}
              </Button>
            </Link>
          </SidebarCard>
        </div>
      </MegaMenuPanel>

      {/* ── Mega Menu: Über uns ── */}
      <MegaMenuPanel id="about">
        <div className="grid md:grid-cols-3 gap-6">
           <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {aboutItems.map(item => <MenuItemLink key={item.label} {...item} />)}
            </div>
          </div>
          <SidebarCard>
            <p className="font-semibold text-sm text-foreground">Lic.Psych. David J. Woods</p>
            <p className="text-xs text-muted-foreground">
              {isDE ? "Hypnotherapeut · Dozent & Fachautor" : "Hypnotherapist · Lecturer & Author"}
            </p>
            <div className="flex items-center gap-1 text-yellow-500">
              {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              <span className="text-xs text-muted-foreground ml-1">5.0 (255)</span>
            </div>
            <Link to={getPath("about", language, country)} onClick={() => setActiveMenu(null)}>
              <Button size="sm" className="w-full bg-cta text-cta-foreground hover:bg-cta/90 text-xs">
                {isDE ? "Mehr erfahren" : "Learn More"}
              </Button>
            </Link>
          </SidebarCard>
        </div>
      </MegaMenuPanel>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border max-h-[80vh] overflow-y-auto">
          {/* Home */}
          <Link to={getPath("home", language, country)} onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 font-medium text-foreground border-b border-border">
            Home
          </Link>

          {/* Hypnosetherapie */}
          <div className="border-b border-border">
            <button onClick={() => setMobileAccordion(mobileAccordion === "sessions" ? null : "sessions")} className="flex items-center justify-between w-full px-4 py-3 text-left font-medium text-foreground">
              {t("nav.sessions")}
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === "sessions" ? "rotate-180" : ""}`} />
            </button>
            {mobileAccordion === "sessions" && (
              <div className="px-4 pb-3 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 pt-1 pb-1">
                  {isDE ? "Therapieziele" : "Therapy Goals"}
                </p>
                {therapyGoals.map((item) => (
                  <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} className="flex items-start gap-3 p-2 rounded-md hover:bg-secondary">
                    <span className="text-primary mt-0.5">{item.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </Link>
                ))}
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 pt-3 pb-1">
                  {isDE ? "Zielgruppen" : "Audiences"}
                </p>
                {audiences.map((item) => (
                  <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} className="flex items-start gap-3 p-2 rounded-md hover:bg-secondary">
                    <span className="text-primary mt-0.5">{item.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Ausbildung */}
          <MobileSection id="training" title={t("nav.training")} items={trainingItems} />

          {/* Über uns */}
          <MobileSection id="about" title={t("nav.about")} items={aboutItems} />

          {/* Country & Language selectors */}
          <div className="border-b border-border px-4 py-3 flex items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1.5">{isDE ? "Region" : "Region"}</p>
              <div className="flex gap-1">
                {countryOptions.map(opt => (
                  <button key={opt.value} onClick={() => setCountry(opt.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded border ${opt.value === country ? "border-primary bg-primary/10 font-semibold text-primary" : "border-border text-foreground"}`}>
                    {opt.flag} <span className="text-xs">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-b border-border px-4 py-3 flex items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1.5">{isDE ? "Sprache" : "Language"}</p>
              <div className="flex gap-1">
                {languageOptions.map(opt => (
                  <button key={opt.value} onClick={() => setLanguage(opt.value)}
                    className={`px-4 py-1.5 text-sm rounded border ${opt.value === language ? "border-primary bg-primary/10 font-semibold text-primary" : "border-border text-foreground"}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-4">
            <Link to={getPath("contact", language, country)} onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-cta text-cta-foreground hover:bg-cta/90">
                {t("nav.cta")}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
