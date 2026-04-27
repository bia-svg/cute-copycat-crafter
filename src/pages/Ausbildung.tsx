/*
 * Ausbildung — Unified Training Page
 * Merges: Hypnose-Ausbildungen + Ablauf des Seminars
 * Storytelling flow: Why → What → How (Day-by-Day) → What's Included → Dates → CTA
 */

import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import FAQSection from "@/components/FAQSection";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import diplomAktivHypnose from "@/assets/diplom-aktiv-hypnose.webp";
import diplomNGH from "@/assets/diplom-ngh-instructor.webp";

import ImageLightbox from "@/components/ImageLightbox";
import TrainingTestimonialsCarousel from "@/components/TrainingTestimonialsCarousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  CheckCircle, Calendar, MapPin, Users, ArrowRight,
  Brain, Zap, Stethoscope, Heart, GraduationCap,
  BookOpen, Clock, Award, Star, MessageSquare, Shield
} from "lucide-react";

const GOOGLE_REVIEWS_URL = "#";
const CDN_BASE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029169718/aQMYm3GvBKfW5muS6V4PFb";

export default function Ausbildung() {
  const { language, country, isInternational, showCH, showDE } = useLanguage();
  const [activeTab, setActiveTab] = useState<"ch" | "de">("de");
  const [showAllDates, setShowAllDates] = useState(false);
  const INITIAL_DATES_VISIBLE = 2;
  const isEN = language === "en";

  const [seminarCounts, setSeminarCounts] = useState<Record<string, number>>({});
  useEffect(() => {
    supabase.functions.invoke("seminar-counts").then(({ data }) => {
      if (data?.counts) setSeminarCounts(data.counts);
    }).catch(() => {});
  }, []);
  const EARLY_BIRD_THRESHOLD = 3;
  const hasEarlyBirdForCountry = (countryKey: "ch" | "de", dates: { date: string }[]) => {
    return dates.some(d => (seminarCounts[`${countryKey}::${d.date}`] || 0) < EARLY_BIRD_THRESHOLD);
  };

  /* ── Seminar Dates ── */
  const datesCH = [
    { date: "Mo-Sa, 15.-20. Juni 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "limited" as const },
    { date: "Mo-Sa, 07.-12. Sept. 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "available" as const },
    { date: "Mo-Sa, 23.-28. Nov. 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "available" as const },
  ];
  const datesDE = [
    { date: "Mo-Sa, 11.-16. Mai 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "limited" as const, forceEarlyBird: true },
    { date: "Mo-Sa, 06.-11. Juli 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "available" as const },
    { date: "Mo-Sa, 14.-19. Sept. 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "available" as const },
    { date: "Mo-Sa, 16.-21. Nov. 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "available" as const },
  ];

  /* ── 6-Day Curriculum ── */
  const days = [
    {
      day: 1, icon: <Brain className="w-6 h-6" />,
      titleDE: "Hypnose und Psychologie", titleEN: "Hypnosis & Psychology",
      color: "bg-blue-50 border-blue-200", iconColor: "text-blue-600",
      topicsDE: [
        "Bewusstsein und Unterbewusstsein: Zusammenhänge und Wirkmechanismen",
        "Gehirnwellen und Trancezustände: Gamma, Beta, Alpha, Theta, Delta",
        "Psychosomatik: Wie Gedanken den Körper beeinflussen",
        "Rapportaufbau: Vertrauen schaffen und vertiefen",
        "Erste Hypnose-Einleitungen und Vertiefungstechniken",
      ],
      topicsEN: [
        "Consciousness and subconscious: connections and mechanisms",
        "Brain waves and trance states: Gamma, Beta, Alpha, Theta, Delta",
        "Psychosomatics: How thoughts influence the body",
        "Building rapport: Creating and deepening trust",
        "First hypnosis inductions and deepening techniques",
      ],
    },
    {
      day: 2, icon: <Zap className="w-6 h-6" />,
      titleDE: "Hypnose-Techniken und Anwendung", titleEN: "Hypnosis Techniques & Application",
      color: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-600",
      topicsDE: [
        "Klassische und moderne Induktionstechniken, Vertiefungen und Ausleitungen",
        "Hypnose in verschiedenen Positionen: Sitzen, Stehen, Liegen, Fallen",
        "Blitzhypnose und Schnellinduktionen (Rapid Induction Techniken)",
        "Selbsthypnose: Einführung und Anwendungsfelder",
        "Praktische Übungen mit sofortigem Feedback",
      ],
      topicsEN: [
        "Classical and modern induction techniques, deepening and emergence",
        "Hypnosis in various positions: sitting, standing, lying, falling",
        "Rapid induction techniques and instant hypnosis",
        "Self-hypnosis: introduction and applications",
        "Practical exercises with immediate feedback",
      ],
    },
    {
      day: 3, icon: <Stethoscope className="w-6 h-6" />,
      titleDE: "Klinische Hypnose und therapeutische Anwendungen", titleEN: "Clinical Hypnosis & Therapeutic Applications",
      color: "bg-purple-50 border-purple-200", iconColor: "text-purple-600",
      topicsDE: [
        "Anamnese und Diagnostik: Professionelle Vorgehensweise",
        "Ängste und Phobien verstehen und behandeln",
        "Suchtthemen: Raucherentwöhnung, Gewichtsreduktion, Spielsucht, Alkohol",
        "Zwangsstörungen, Depressionen, PTBS, bipolare Störungen, Borderline",
        "Schmerztherapie mit Hypnoanalgesie und Hypnoanästhesie",
      ],
      topicsEN: [
        "Anamnesis and diagnostics: professional approach",
        "Understanding and treating anxiety and phobias",
        "Addiction topics: smoking cessation, weight loss, gambling, alcohol",
        "OCD, depression, PTSD, bipolar disorder, borderline",
        "Pain therapy with hypno-analgesia and hypno-anesthesia",
      ],
    },
    {
      day: 4, icon: <Users className="w-6 h-6" />,
      titleDE: "Spezialtechniken und Zielgruppen", titleEN: "Special Techniques & Target Groups",
      color: "bg-amber-50 border-amber-200", iconColor: "text-amber-600",
      topicsDE: [
        "Hypnose bei Kindern und Jugendlichen",
        "Gesprächsführung: Das Vorgespräch als Schlüssel zum Erfolg",
        "Aktiv-Hypnose© Techniken in der Psychotherapie",
        "EMDR-Technik in der Hypnose: Desensibilisierung und Reprozessierung",
        "Praktische Übungen und Beispieltexte für verschiedene Szenarien",
      ],
      topicsEN: [
        "Hypnosis for children and adolescents",
        "Conversation techniques: the pre-session as key to success",
        "Aktiv-Hypnose© techniques in psychotherapy",
        "EMDR technique in hypnosis: desensitization and reprocessing",
        "Practical exercises and sample scripts for various scenarios",
      ],
    },
    {
      day: 5, icon: <Heart className="w-6 h-6" />,
      titleDE: "Tiefentherapie und Transformation", titleEN: "Deep Therapy & Transformation",
      color: "bg-rose-50 border-rose-200", iconColor: "text-rose-600",
      topicsDE: [
        "Befreiung von Konditionierungen und alten Traumata",
        "Flooding-Technik und Skala-Arbeit",
        "Therapeutische Regression bis zur Geburt",
        "Aging-To-Cause-Technik: Ursachen gezielt bearbeiten",
        "Begleitung von Sensitivität, Intimität und Nähe",
      ],
      topicsEN: [
        "Liberation from conditioning and old traumas",
        "Flooding technique and scale work",
        "Therapeutic regression to birth",
        "Aging-to-cause technique: targeted root cause work",
        "Guidance on sensitivity, intimacy and closeness",
      ],
    },
    {
      day: 6, icon: <GraduationCap className="w-6 h-6" />,
      titleDE: "Praxisvertiefung und Supervision", titleEN: "Practice Deepening & Supervision",
      color: "bg-teal-50 border-teal-200", iconColor: "text-teal-600",
      topicsDE: [
        "Wiederholung und Vertiefung aller Inhalte der Ausbildungswoche",
        "Klärung offener Fragen und individueller Unsicherheiten",
        "Intensives Üben zentraler Techniken in Kleingruppen",
        "Abschluss-Supervision und Festigung der therapeutischen Sicherheit",
        "Klärung offener Fragen zur Umsetzung in der Praxis und zum Praxisaufbau",
      ],
      topicsEN: [
        "Review and deepening of all training week content",
        "Clarification of open questions and individual uncertainties",
        "Intensive practice of core techniques in small groups",
        "Final supervision and consolidation of therapeutic confidence",
        "Guidance on implementation in practice and building your practice",
      ],
    },
  ];

  return (
    <>
      <SEO {...pageSEO.training} pageKey="training" />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO: Why this training exists
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32] mb-2">
                {isEN ? "6-Day Intensive Training" : "6-Tage Intensiv-Ausbildung"}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] leading-tight font-bold text-[#1B3A5C] mb-3" style={{ fontFamily: "Georgia, serif" }}>
                {isEN
                  ? "Become a Certified Aktiv-Hypnose© Therapist"
                  : "Werden Sie zertifizierter Aktiv-Hypnose© Therapeut"}
              </h1>
              <p className="text-sm lg:text-base text-[#55504f] leading-relaxed mb-4">
                {isEN
                  ? "In just 6 days, you'll learn a proven, hands-on method for real change work. Not a superficial weekend certification, but a high-quality intensive training with a clear system, direct application, and professional guidance. Ideal for anyone who wants to support people safely and effectively."
                  : "In nur 6 Tagen lernen Sie eine fundierte, praxisnahe Methode für echte Veränderungsarbeit. Keine oberflächliche Wochenend-Zertifizierung, sondern eine hochwertige Intensiv-Ausbildung mit klarem System, direkter Anwendung und professioneller Begleitung. Ideal für alle, die Menschen sicher und wirksam begleiten möchten."}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#55504f] mb-4">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#2E7D32]" /> {isEN ? "6-Day Intensive Training" : "6 Tage Intensiv-Ausbildung"}</span>
                <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-[#2E7D32]" /> {isEN ? "Specialist Practitioner Diploma" : "Therapeuten-Diplom"}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#dates">
                  <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-6 py-2.5">
                    {isEN ? "View Dates & Register" : "Termine & Anmeldung"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="#curriculum">
                  <Button variant="outline" className="border-[#55504f] text-[#55504f] font-semibold px-6 py-2.5">
                    {isEN ? "See Full Curriculum" : "Gesamtes Curriculum"}
                  </Button>
                </a>
              </div>
            </div>
            <div className="border border-border rounded-lg overflow-hidden shadow-sm">
              <img src={`${CDN_BASE}/training_seminar_979f1a53.jpg`} alt={isEN ? "Hypnotherapy Training Seminar" : "Hypnose Ausbildung Seminar"} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — What makes this different
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-border">
        <div className="container-main py-6 lg:py-10">
          <h2 className="text-xl md:text-2xl font-bold text-[#1B3A5C] mb-1 text-center" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "What Makes This Training Different" : "Was diese Ausbildung besonders macht"}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground text-center mb-5 md:mb-6 max-w-2xl mx-auto">
            {isEN
              ? "Not a mass-market course. Not a certificate mill. A serious premium training with real depth, built on 30,000+ clinical sessions."
              : "Kein Massenkurs. Keine Zertifikatsfabrik. Eine seriöse Premium-Ausbildung mit echter Tiefe, aufgebaut auf 30.000+ klinischen Sitzungen."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: <Shield className="w-6 h-6 text-[#1B3A5C]" />, titleDE: "35+ Jahre klinische Praxis", titleEN: "35+ Years of Clinical Practice", textDE: "Jede gelehrte Technik wurde in Tausenden realer klinischer Sitzungen getestet und verfeinert. Eine methodenbasierte Expertenausbildung.", textEN: "Every technique taught has been tested and refined in thousands of real clinical sessions. This is method-based expert training." },
              { icon: <Users className="w-6 h-6 text-[#1B3A5C]" />, titleDE: "Kleingruppen-Format", titleEN: "Small Group Format", textDE: "Strikt begrenzte Teilnehmerzahl garantiert persönliche Betreuung, individuelles Feedback und maximale Lernintensität. Ein selektives Lernerlebnis.", textEN: "Strictly limited participants ensure personal attention, individual feedback, and maximum learning intensity. A selective learning experience." },
              { icon: <Zap className="w-6 h-6 text-[#1B3A5C]" />, titleDE: "Praxis ab Tag 1", titleEN: "Hands-On from Day 1", textDE: "Sie schauen nicht nur zu — Sie hypnotisieren. Jeder Tag verbindet Theorie mit sofortiger praktischer Anwendung. Eine transformative Praxisausbildung.", textEN: "You won't just watch — you'll hypnotize. Every day combines theory with immediate application. A transformational practical training." },
            ].map((c, i) => (
              <div key={i} className="group relative bg-white border border-[#1B3A5C]/20 rounded-2xl p-7 text-center shadow-[0_4px_16px_rgba(27,58,92,0.08)] hover:shadow-[0_14px_36px_rgba(27,58,92,0.16)] hover:border-[#1B3A5C]/45 hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1B3A5C]/10 to-[#1B3A5C]/5 ring-1 ring-[#1B3A5C]/10 mb-4 group-hover:from-[#1B3A5C]/15 group-hover:to-[#1B3A5C]/8 transition-colors">
                  {c.icon}
                </div>
                <h3 className="font-bold text-base text-[#1B3A5C] mb-2">{isEN ? c.titleEN : c.titleDE}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{isEN ? c.textEN : c.textDE}</p>
              </div>
            ))}
          </div>

          {/* EMR Badge */}
          <div className="mt-6 md:mt-8 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-[#e8f5e9] border border-[#a5d6a7] rounded-full px-4 py-1.5">
              <img src={CDN.emrBadge} alt="EMR Badge" className="w-5 h-5 object-contain" />
              <span className="text-xs font-semibold text-[#2E7D32] tracking-wide">EMR Krankenkasse konform</span>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground max-w-md leading-relaxed">
              {isEN
                ? "EMR-compliant structure. Upon request, participants receive an hours and course content certificate for possible submission."
                : "EMR-konform aufgebaut. Auf Wunsch erhalten Teilnehmer einen Stunden- und Inhaltsnachweis zur möglichen Einreichung."}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION — Upcoming Dates with Country Tabs (moved up)
          ═══════════════════════════════════════════════════════════ */}
      <section id="dates" className="bg-[#f4f3ef] border-b border-border scroll-mt-20">
        <div className="container-main py-10 lg:py-14">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Upcoming Training Dates" : "Kommende Ausbildungstermine"}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6 max-w-xl mx-auto">
            {isEN
              ? "Choose your preferred country and seminar date, then fill in your details. We'll confirm your place within 24 hours."
              : "Wählen Sie Ihr bevorzugtes Land und Seminar-Datum, dann füllen Sie Ihre Daten aus. Wir bestätigen Ihren Platz innerhalb von 24 Stunden."}
          </p>

          {/* Country Tabs */}
          <div className="flex justify-center gap-3 mb-8 max-w-md mx-auto">
            <button
              onClick={() => { setActiveTab("de"); setShowAllDates(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 font-semibold text-sm transition-all ${
                activeTab === "de"
                  ? "border-primary bg-primary/15 text-foreground shadow-md"
                  : "border-border bg-white text-foreground hover:border-primary/40"
              }`}
            >
              <span className="text-lg">🇩🇪</span>
              {isEN ? "Germany" : "Deutschland"}
            </button>
            <button
              onClick={() => { setActiveTab("ch"); setShowAllDates(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 font-semibold text-sm transition-all ${
                activeTab === "ch"
                  ? "border-primary bg-primary/15 text-foreground shadow-md"
                  : "border-border bg-white text-foreground hover:border-primary/40"
              }`}
            >
              🇨🇭 {isEN ? "Switzerland" : "Schweiz"}
            </button>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {/* CH Content */}
            {activeTab === "ch" && (
              <>
                <div className="relative overflow-hidden bg-gradient-to-br from-[#F4FAF5] via-white to-[#EAF5EC] border border-[#81C784]/60 rounded-3xl px-6 py-6 text-center shadow-[0_6px_20px_rgba(46,125,50,0.08)]">
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#2E7D32]/5 blur-2xl pointer-events-none" />
                  <p className="relative text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2E7D32] mb-3">
                    {isEN ? "6-Day Intensive Certification" : "6-Tage Intensiv-Zertifizierung"}
                  </p>
                  {hasEarlyBirdForCountry("ch", datesCH) ? (
                    <>
                      <div className="relative flex items-baseline justify-center gap-3 mb-3">
                        <span className="text-sm text-muted-foreground/70 line-through">CHF 2.990.-</span>
                        <span className="text-3xl font-bold text-[#1B3A5C] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>CHF 2.690.-</span>
                      </div>
                      <span className="relative inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2E7D32]/90 bg-white/70 border border-[#2E7D32]/20 px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                        {isEN ? "Early Bird Price — Limited Time" : "Frühbucher-Preis — Nur für kurze Zeit"}
                      </span>
                    </>
                  ) : (
                    <span className="relative text-3xl font-bold text-[#1B3A5C] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>CHF 2.990.-</span>
                  )}
                </div>
                {(showAllDates ? datesCH : datesCH.slice(0, INITIAL_DATES_VISIBLE)).map((d, i) => (
                  <div key={`ch-${i}`} className="border border-[#1B3A5C]/12 p-5 bg-white rounded-2xl shadow-[0_2px_10px_rgba(27,58,92,0.05)] hover:shadow-[0_6px_18px_rgba(27,58,92,0.10)] hover:border-[#1B3A5C]/25 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-2 font-semibold text-sm text-[#1B3A5C]">
                        <Calendar className="w-4 h-4" /> {d.date}
                      </p>
                      <p className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <MapPin className="w-3.5 h-3.5" /> {d.location}
                      </p>
                      <p className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Clock className="w-3.5 h-3.5" /> {isEN ? "Mon–Fri 10:00–17:00 · Sat 10:00–15:00" : "Mo–Fr 10:00–17:00 · Sa 10:00–15:00"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {(seminarCounts[`ch::${d.date}`] || 0) < EARLY_BIRD_THRESHOLD && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32]">
                            {isEN ? "Early Bird" : "Frühbucher"}
                          </span>
                        )}
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${d.status === "limited" ? "bg-[#FFF3E0] text-[#E65100]" : "bg-[#E8F5E9] text-[#2E7D32]"}`}>
                          {d.status === "limited" ? (isEN ? "Limited seats" : "Letzte Plätze") : (isEN ? "Available" : "Verfügbar")}
                        </span>
                      </div>
                      <Link to={`/${language}/${country}/${language === "en" ? "seminar-registration" : "seminar-anmeldung"}?country=ch&date=${encodeURIComponent(d.date)}`}>
                        <Button size="sm" className="bg-cta hover:bg-cta/90 text-cta-foreground text-xs whitespace-nowrap">
                          {isEN ? "Secure Your Place →" : "Platz sichern →"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* DE Content */}
            {activeTab === "de" && (
              <>
                <div className="relative overflow-hidden bg-gradient-to-br from-[#F2F8FE] via-white to-[#E5EFFB] border border-[#90CAF9]/60 rounded-3xl px-6 py-6 text-center shadow-[0_6px_20px_rgba(21,101,192,0.08)]">
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#1565C0]/5 blur-2xl pointer-events-none" />
                  <p className="relative text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1565C0] mb-3">
                    {isEN ? "6-Day Intensive Certification" : "6-Tage Intensiv-Zertifizierung"}
                  </p>
                  {hasEarlyBirdForCountry("de", datesDE) ? (
                    <>
                      <div className="relative flex items-baseline justify-center gap-3 mb-3">
                        <span className="text-sm text-muted-foreground/70 line-through">€2.790,-</span>
                        <span className="text-3xl font-bold text-[#1B3A5C] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>€2.490,-</span>
                      </div>
                      <span className="relative inline-flex items-center gap-1.5 text-[11px] font-medium text-[#1565C0]/90 bg-white/70 border border-[#1565C0]/20 px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1565C0]" />
                        {isEN ? "Early Bird Price — Limited Time" : "Frühbucher-Preis — Nur für kurze Zeit"}
                      </span>
                    </>
                  ) : (
                    <span className="relative text-3xl font-bold text-[#1B3A5C] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>€2.790,-</span>
                  )}
                </div>
                {(showAllDates ? datesDE : datesDE.slice(0, INITIAL_DATES_VISIBLE)).map((d, i) => (
                  <div key={`de-${i}`} className="border border-[#1B3A5C]/12 p-5 bg-white rounded-2xl shadow-[0_2px_10px_rgba(27,58,92,0.05)] hover:shadow-[0_6px_18px_rgba(27,58,92,0.10)] hover:border-[#1B3A5C]/25 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-2 font-semibold text-sm text-[#1B3A5C]">
                        <Calendar className="w-4 h-4" /> {d.date}
                      </p>
                      <p className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <MapPin className="w-3.5 h-3.5" /> {d.location}
                      </p>
                      <p className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Clock className="w-3.5 h-3.5" /> {isEN ? "Mon–Fri 10:00–17:00 · Sat 10:00–15:00" : "Mo–Fr 10:00–17:00 · Sa 10:00–15:00"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {((seminarCounts[`de::${d.date}`] || 0) < EARLY_BIRD_THRESHOLD || (d as any).forceEarlyBird) && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E3F2FD] text-[#1565C0]">
                            {isEN ? "Early Bird" : "Frühbucher"}
                          </span>
                        )}
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${d.status === "limited" ? "bg-[#FFF3E0] text-[#E65100]" : "bg-[#E8F5E9] text-[#2E7D32]"}`}>
                          {d.status === "limited" ? (isEN ? "Limited seats" : "Letzte Plätze") : (isEN ? "Available" : "Verfügbar")}
                        </span>
                      </div>
                      <Link to={`/${language}/${country}/${language === "en" ? "seminar-registration" : "seminar-anmeldung"}?country=de&date=${encodeURIComponent(d.date)}`}>
                        <Button size="sm" className="bg-cta hover:bg-cta/90 text-cta-foreground text-xs whitespace-nowrap">
                          {isEN ? "Secure Your Place →" : "Platz sichern →"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {(() => {
            const totalForTab = activeTab === "ch" ? datesCH.length : datesDE.length;
            const hidden = totalForTab - INITIAL_DATES_VISIBLE;
            if (hidden <= 0) return null;
            return (
              <div className="text-center mt-5">
                <button
                  onClick={() => setShowAllDates((v) => !v)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B3A5C] border border-[#1B3A5C]/25 hover:border-[#1B3A5C]/50 hover:bg-white rounded-full px-5 py-2 transition-all"
                >
                  {showAllDates
                    ? (isEN ? "Show fewer dates" : "Weniger Termine anzeigen")
                    : (isEN ? `Show all dates (+${hidden})` : `Weitere Termine anzeigen (+${hidden})`)}
                </button>
              </div>
            );
          })()}
          <p className="text-xs text-muted-foreground text-center mt-4 italic">
            {isEN
              ? "Early Bird pricing available for a limited time or until the current intake is full."
              : "Frühbucher-Preis verfügbar für begrenzte Zeit oder bis die aktuelle Gruppe voll ist."}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION — Day-by-Day Curriculum
          ═══════════════════════════════════════════════════════════ */}
      <section id="curriculum" className="bg-white border-b border-border scroll-mt-20">
        <div className="container-main py-8 lg:py-12">
          <h2 className="text-xl md:text-2xl font-bold text-[#1B3A5C] mb-1 text-center" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Your 6-Day Journey" : "Ihre 6-Tage Reise"}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground text-center mb-6 md:mb-8 max-w-2xl mx-auto">
            {isEN
              ? "Each day builds on the previous, taking you from fundamentals to advanced clinical techniques."
              : "Jeder Tag baut auf dem vorherigen auf und führt Sie von den Grundlagen zu fortgeschrittenen klinischen Techniken."}
          </p>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {days.map((day) => (
              <div key={day.day} className="bg-[#f4f3ef] border border-border rounded-lg p-4 md:p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-white text-[#1B3A5C]">
                    {day.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#2E7D32]">
                      {isEN ? `Day ${day.day}` : `Tag ${day.day}`}
                    </p>
                    <h3 className="text-sm md:text-base font-bold text-[#1B3A5C]">
                      {isEN ? day.titleEN : day.titleDE}
                    </h3>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {(isEN ? day.topicsEN : day.topicsDE).map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#55504f]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2E7D32] mt-0.5 shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DIPLOMAS — Visual proof of certification (Ihr Abschluss)
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-6 lg:py-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#1B3A5C] mb-1 text-center" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Your Certification" : "Ihr Abschluss"}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground text-center mb-4 md:mb-5 max-w-2xl mx-auto">
            {isEN
              ? "Upon completion, you receive internationally recognized diplomas."
              : "Nach Abschluss erhalten Sie international anerkannte Diplome."}
          </p>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="border border-border rounded-lg overflow-hidden shadow-sm mb-2 max-w-[200px] md:max-w-[260px] bg-white">
                <ImageLightbox src={diplomNGH} alt="NGH Certified Instructor — David Woods" className="w-full h-auto" />
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <Shield className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-sm text-[#1B3A5C]" style={{ fontFamily: "Georgia, serif" }}>
                  {isEN ? "NGH Certified Instructor" : "NGH-zertifizierter Instructor"}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground max-w-sm">
                {isEN
                  ? "This certificate proves that David J. Woods is a certified hypnosis instructor accredited by the National Guild of Hypnotists (NGH) — the world's largest and most respected hypnosis organization."
                  : "Dieses Zertifikat belegt, dass David J. Woods ein zertifizierter Hypnose-Instructor ist, akkreditiert durch die National Guild of Hypnotists (NGH) — die weltweit grösste und angesehenste Hypnose-Organisation."}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="border border-border rounded-lg overflow-hidden shadow-sm mb-2 max-w-[200px] md:max-w-[260px] bg-white">
                <ImageLightbox src={diplomAktivHypnose} alt="Diplom — Therapeut in Aktiv-Hypnose" className="w-full h-auto" />
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <h3 className="font-semibold text-sm text-[#1B3A5C]" style={{ fontFamily: "Georgia, serif" }}>
                  {isEN ? "Your Diploma" : "Ihr Diplom"}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground max-w-sm">
                {isEN
                  ? "This is the diploma you receive upon completing the 6-day seminar — your official certification as a Therapist in Aktiv-Hypnose®."
                  : "Dieses Diplom erhalten Sie nach Abschluss des 6-tägigen Seminars — Ihre offizielle Zertifizierung als Therapeut/in in Aktiv-Hypnose®."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          INCLUDED — Alles, was Sie erhalten
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-border">
        <div className="container-main py-10 lg:py-14">
          <h2 className="text-xl md:text-2xl font-bold text-[#1B3A5C] mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Everything You Receive" : "Alles, was Sie erhalten"}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            {isEN
              ? "A complete package of materials, certification and ongoing support."
              : "Ein vollständiges Paket aus Materialien, Zertifizierung und laufender Begleitung."}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 max-w-5xl mx-auto">
            {[
              { n: "350+", l: isEN ? "Pages of training manual" : "Seiten Ausbildungsmappe" },
              { n: "150+", l: isEN ? "Pages of sample texts" : "Seiten Beispieltexte" },
              { n: "50+", l: isEN ? "Short videos" : "Kurzvideos" },
              { n: "50+", l: isEN ? "Audio recordings" : "Audioaufnahmen" },
              { n: "1", l: isEN ? "Aktiv-Hypnose® Diploma" : "Aktiv-Hypnose® Diplom" },
              { n: "∞", l: isEN ? "Ongoing support" : "Laufende Unterstützung" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#f4f3ef] border border-border rounded-2xl p-4 md:p-5 text-center flex flex-col items-center justify-center min-h-[110px] shadow-sm"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#1B3A5C] mb-1" style={{ fontFamily: "Georgia, serif" }}>
                  {item.n}
                </div>
                <div className="text-xs md:text-[13px] text-muted-foreground leading-snug">
                  {item.l}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-8 rounded-2xl border border-[#2E7D32]/30 bg-[#2E7D32]/5 p-4 md:p-5">
            <p className="text-sm md:text-[15px] text-[#1B3A5C] leading-relaxed">
              <span className="font-semibold text-[#2E7D32]">
                {isEN ? "For EMR members:" : "Für EMR-Mitglieder:"}
              </span>{" "}
              {isEN
                ? "Detailed certificate of hours and content for possible EMR submission included."
                : "Ausführlicher Stunden- und Inhaltsnachweis zur möglichen EMR-Einreichung inklusive."}
            </p>
          </div>
        </div>
      </section>

      {/* Educational hypnosis video moved to dedicated page /wie-funktioniert-hypnose */}

      {/* ═══════════════════════════════════════════════════════════
          SECTION — Training Participant Video Testimonials
          ═══════════════════════════════════════════════════════════ */}
      <TrainingTestimonialsCarousel />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — FAQ + Final CTA
          ═══════════════════════════════════════════════════════════ */}

      <FAQSection
        title={isEN ? "Frequently Asked Questions" : "Häufig gestellte Fragen"}
        items={isEN ? [
          { q: "What certification do I receive after the training?", a: "You receive the Aktiv-Hypnose Therapist Diploma, based on the method developed by David J. Woods over more than 35 years of clinical practice. David himself is a respected international trainer with many years of training experience. The training is structured to be EMR-compliant. Upon request, participants receive a detailed certificate of hours and content, which may be submitted depending on the country, specialization, and individual requirements. Recognition is always at the discretion of the relevant authority." },
          { q: "Do I need prior experience in hypnosis or psychology?", a: "No. The 6-day intensive training is designed so that both beginners and experienced practitioners can follow optimally. What is primarily taught is the Aktiv-Hypnose© method developed by David J. Woods — based on over 35 years of psychological, therapeutic, and practical experience. Even after the training, you remain supported through the WhatsApp group, and David J. Woods continues to be available as a contact for questions." },
          { q: "How many participants are in each training group?", a: "Groups are intentionally kept at a manageable size to ensure intensive, hands-on learning with personal feedback. This creates the ideal balance: enough participants for plenty of practical exercises, genuine self-experience, and varied partner work — yet small enough that David J. Woods and his team always maintain oversight and can respond to each participant individually. This structure is precisely what makes the training particularly effective, personal, and practical." },
          { q: "What is Aktiv-Hypnose© and why is it different?", a: "Aktiv-Hypnose© is a method developed by David J. Woods that combines modern hypnosis with well-founded psychological and physiological knowledge. Unlike purely passive approaches, the client is actively involved in the change process — physically, verbally, and emotionally. This allows deeply rooted imprints, emotional burdens, and unconscious behavioral patterns to often be addressed particularly quickly, specifically, and sustainably. The method combines decades of practical experience, therapeutic expertise, and highly effective techniques into a particularly direct, profound, and effective approach for real change." },
          { q: "Can I practice professionally after the 6-day training?", a: "Yes — after completing the 6-day intensive training and receiving the Aktiv-Hypnose© Therapist Diploma, you have a very strong, practice-oriented foundation for working professionally with Aktiv-Hypnose©. In this training, you learn not only classical hypnosis fundamentals, but a method developed by David J. Woods over decades with tools, techniques, and therapeutic processes that are hardly taught anywhere else in this combination. During the seminar, intensive practical work takes place: you can implement exercises directly, train with each other, and additionally film or document important demonstrations yourself so you can confidently deepen what you've learned later. Additionally, you receive a comprehensive training folder with over 350 pages, more than 150 example texts, over 50 videos, and over 50 audio recordings. This gives you not only the knowledge for an immediate start, but enough material to continue practicing, consolidating, and building your own therapeutic confidence for many months to well over a year. The training provides you with the tools — true mastery then comes through application, practice, and experience. That is exactly what this training is designed for." },
          { q: "What is the scientific basis for hypnotherapy?", a: "Hypnotherapy is recognized by the World Health Organization (WHO) and validated by numerous meta-analyses. A landmark study by Kirsch et al. (1995) showed that adding hypnosis to cognitive-behavioral therapy improves outcomes by 70%. The German Scientific Advisory Council confirmed the evidence for clinical hypnosis in 2006." },
        ] : [
          { q: "Welches Zertifikat erhalte ich nach der Ausbildung?", a: "Sie erhalten das Aktivhypnose Therapeut Diploma der von David J. Woods entwickelten Methode, die auf über 35 Jahren klinischer Praxis basiert. David selbst ist ein geschätzter internationaler Trainer mit langjähriger Ausbildungserfahrung. Die Ausbildung ist EMR-konform aufgebaut. Teilnehmer erhalten auf Wunsch einen ausführlichen Stunden- und Inhaltsnachweis, der je nach Land, Fachrichtung und Voraussetzungen gegebenenfalls eingereicht werden kann. Eine Anerkennung liegt stets im Ermessen der jeweiligen Stelle." },
          { q: "Brauche ich Vorkenntnisse in Hypnose oder Psychologie?", a: "Nein. Die 6-tägige Intensiv-Ausbildung ist so aufgebaut, dass sowohl Anfänger als auch erfahrene Praktiker optimal folgen können. Vermittelt wird überwiegend die von David J. Woods entwickelte Aktiv-Hypnose© – basierend auf über 35 Jahren psychologischer, therapeutischer und praktischer Erfahrung. Auch nach der Ausbildung bleiben Sie über die WhatsApp-Gruppe betreut, und David J. Woods steht bei Fragen weiterhin als Ansprechpartner zur Verfügung." },
          { q: "Wie viele Teilnehmer sind in jeder Gruppe?", a: "Die Gruppen werden bewusst in einer gut überschaubaren Größe gehalten, damit intensives, praxisnahes Lernen mit persönlichem Feedback möglich bleibt. So entsteht die ideale Balance: genügend Teilnehmer für viele praktische Übungen, echte Selbsterfahrung und abwechslungsreiche Partnerarbeit – gleichzeitig aber klein genug, damit David J. Woods und sein Team jederzeit den Überblick behalten und individuell auf jeden Teilnehmer eingehen können. Genau diese Struktur macht die Ausbildung besonders effektiv, persönlich und alltagstauglich." },
          { q: "Was ist Aktiv-Hypnose© und warum ist sie anders?", a: "Aktiv-Hypnose© ist eine von David J. Woods entwickelte Methode, die moderne Hypnose mit fundiertem psychologischem und physiologischem Wissen verbindet. Im Unterschied zu rein passiven Ansätzen wird der Klient aktiv in den Veränderungsprozess einbezogen – körperlich, verbal und emotional. Dadurch können tief sitzende Prägungen, emotionale Belastungen und unbewusste Verhaltensmuster oft besonders schnell, gezielt und nachhaltig bearbeitet werden. Die Methode vereint jahrzehntelange Praxiserfahrung, therapeutisches Fachwissen und hochwirksame Techniken zu einem besonders direkten, tiefgehenden und effektiven Ansatz für echte Veränderung." },
          { q: "Kann ich nach der 6-Tage-Ausbildung professionell arbeiten?", a: "Ja – nach Abschluss der 6-tägigen Intensiv-Ausbildung und dem Aktiv-Hypnose© Therapeuten-Diplom verfügen Sie über ein sehr starkes, praxisnahes Fundament, um professionell mit Aktiv-Hypnose© zu arbeiten. In dieser Ausbildung lernen Sie nicht nur klassische Hypnose-Grundlagen, sondern eine von David J. Woods über Jahrzehnte entwickelte Methode mit Werkzeugen, Techniken und therapeutischen Abläufen, die in dieser Kombination kaum irgendwo anders vermittelt werden. Während des Seminars wird intensiv praktisch gearbeitet: Sie können Übungen direkt umsetzen, gegenseitig trainieren und wichtige Demonstrationen zusätzlich selbst filmen oder dokumentieren, damit Sie das Gelernte später sicher weiter vertiefen können. Zusätzlich erhalten Sie eine umfangreiche Ausbildungsmappe mit über 350 Seiten, mehr als 150 Beispieltexten, über 50 Videos sowie über 50 Audioaufnahmen. Damit haben Sie nicht nur das Wissen für den direkten Start, sondern genug Material, um über viele Monate bis weit über ein Jahr hinaus sicher weiter zu üben, zu festigen und Ihre eigene therapeutische Sicherheit aufzubauen. Die Ausbildung vermittelt Ihnen die Werkzeuge – echte Meisterschaft entsteht dann durch Anwenden, Üben und Erfahrung. Genau dafür ist diese Ausbildung aufgebaut." },
          { q: "Was ist die wissenschaftliche Grundlage der Hypnotherapie?", a: "Hypnotherapie ist von der Weltgesundheitsorganisation (WHO) anerkannt und durch zahlreiche Meta-Analysen validiert. Eine Landmark-Studie von Kirsch et al. (1995) zeigte, dass die Ergänzung von KVT durch Hypnose die Ergebnisse um 70% verbessert. Der Wissenschaftliche Beirat Psychotherapie bestätigte 2006 die Evidenz für klinische Hypnose." },
        ]}
      />

      <section className="bg-background py-4 md:py-6">
        <div className="container-main">
          <div className="relative max-w-2xl mx-auto bg-primary/10 border border-primary/25 rounded-2xl px-6 py-6 md:px-8 md:py-7 text-center shadow-sm">
            {/* Decorative top accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide uppercase">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Your Journey Starts Here" : "Ihre Reise beginnt hier"}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-4">
              {isEN
                ? "In 6 days, you'll gain the knowledge, the confidence, and the diploma to support people professionally. Are you ready?"
                : "In 6 Tagen gewinnen Sie das Wissen, die Sicherheit und das Diplom, um Menschen professionell zu begleiten. Sind Sie bereit?"}
            </p>
            <Link to={`${getPath("seminarRegistration", language, country)}?country=de`}>
              <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-7 py-2.5 text-sm md:text-base">
                {isEN ? "Register for Seminar" : "Zum Seminar anmelden"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-3 mt-3 text-muted-foreground text-xs md:text-sm">
              <a href="https://share.google/SGm12iRl4fuRtKxRD" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                5.0 — 266 Google {isEN ? "Reviews" : "Bewertungen"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
