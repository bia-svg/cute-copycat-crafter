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
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import {
  CheckCircle, Calendar, MapPin, Users, ArrowRight,
  Brain, Zap, Stethoscope, Heart, GraduationCap,
  BookOpen, Clock, Award, Star, MessageSquare, Shield, ArrowLeft
} from "lucide-react";

const GOOGLE_REVIEWS_URL = "#";
const CDN_BASE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029169718/aQMYm3GvBKfW5muS6V4PFb";

export default function Ausbildung() {
  const { language, country, isInternational, showCH, showDE } = useLanguage();
  const [activeTab, setActiveTab] = useState<"ch" | "de">("de");
  const [showAllDates, setShowAllDates] = useState(false);
  const INITIAL_DATES_VISIBLE = 2;
  const isEN = language === "en";

  const [curriculumApi, setCurriculumApi] = useState<CarouselApi>();
  const [curriculumIndex, setCurriculumIndex] = useState(0);
  useEffect(() => {
    if (!curriculumApi) return;
    setCurriculumIndex(curriculumApi.selectedScrollSnap());
    const onSelect = () => setCurriculumIndex(curriculumApi.selectedScrollSnap());
    curriculumApi.on("select", onSelect);
    return () => { curriculumApi.off("select", onSelect); };
  }, [curriculumApi]);

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
  const datesCH: { date: string; location: string; status: "available" | "limited"; forceEarlyBird?: boolean }[] = [
    { date: "Mo-Sa, 15.-20. Juni 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "limited" as const },
    { date: "Mo-Sa, 07.-12. Sept. 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "available" as const },
    { date: "Mo-Sa, 23.-28. Nov. 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "available" as const },
  ];
  const datesDE: { date: string; location: string; status: "available" | "limited"; forceEarlyBird?: boolean }[] = [
    /* Archiviert: Mo-Sa, 11.-16. Mai 2026 — Hotel am Alten Park, Augsburg */
    { date: "Mo-Sa, 06.-11. Juli 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "limited" as const },
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

  /* ── SEO: Course JSON-LD built from REAL curriculum + REAL upcoming dates ──
     Helps Google show course rich results and feeds AI Overviews / GEO with structured
     facts: provider, mode, language, schedule, price (EUR/CHF), duration. */
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: isEN ? "Aktiv-Hypnose© Training — 6-Day Intensive" : "Aktiv-Hypnose© Ausbildung — 6-Tage-Intensivkurs",
    description: isEN
      ? "6-day intensive hypnosis training by NGH International Trainer Lic. Psych. David J. Woods. Aktiv-Hypnose© Therapist Diploma. EMR-recognized in Switzerland."
      : "6-Tage Intensiv-Ausbildung in Hypnose mit NGH International Trainer Lic. Psych. David J. Woods. Aktiv-Hypnose© Therapeuten-Diplom. EMR-anerkannt in der Schweiz.",
    inLanguage: isEN ? "en" : "de",
    educationalCredentialAwarded: "Aktiv-Hypnose© Therapeuten-Diplom",
    timeRequired: "P6D",
    syllabusSections: days.map((d) => ({
      "@type": "Syllabus",
      name: isEN ? d.titleEN : d.titleDE,
      description: (isEN ? d.topicsEN : d.topicsDE).join("; "),
    })),
    provider: {
      "@type": "Organization",
      name: "David J. Woods — Hypnose & Psychologie",
      url: "https://david-j-woods.com",
      sameAs: "https://david-j-woods.com",
    },
    instructor: {
      "@type": "Person",
      name: "David J. Woods",
      honorificPrefix: "Lic.Psych.",
      jobTitle: "NGH International Trainer, Hypnotherapist",
    },
    hasCourseInstance: [
      ...datesCH.map((d) => ({
        "@type": "CourseInstance",
        name: `Aktiv-Hypnose© Ausbildung — ${d.date}`,
        courseMode: "onsite",
        location: { "@type": "Place", name: d.location, address: { "@type": "PostalAddress", addressCountry: "CH" } },
        inLanguage: "de",
        offers: { "@type": "Offer", price: "2290", priceCurrency: "CHF", availability: "https://schema.org/InStock", url: "https://david-j-woods.com/de/ch/ausbildung" },
      })),
      ...datesDE.map((d) => ({
        "@type": "CourseInstance",
        name: `Aktiv-Hypnose© Ausbildung — ${d.date}`,
        courseMode: "onsite",
        location: { "@type": "Place", name: d.location, address: { "@type": "PostalAddress", addressCountry: "DE" } },
        inLanguage: "de",
        offers: { "@type": "Offer", price: "2490", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: "https://david-j-woods.com/de/de/ausbildung" },
      })),
    ],
  };

  /* ── SEO: Event JSON-LD per seminar date ──
     Each upcoming training date is also exposed as a schema.org/Event so it can appear in
     Google "Events" rich results. Dates are derived from the REAL date strings above using
     a small parser (no fabricated data). */
  const monthMap: Record<string, number> = {
    jan: 1, januar: 1, january: 1,
    feb: 2, februar: 2, february: 2,
    mar: 3, mär: 3, märz: 3, march: 3,
    apr: 4, april: 4,
    mai: 5, may: 5,
    jun: 6, juni: 6, june: 6,
    jul: 7, juli: 7, july: 7,
    aug: 8, august: 8,
    sep: 9, sept: 9, september: 9,
    okt: 10, oct: 10, oktober: 10, october: 10,
    nov: 11, november: 11,
    dez: 12, dec: 12, dezember: 12, december: 12,
  };
  /** Parses strings like "Mo-Sa, 15.-20. Juni 2026" → { start: "2026-06-15", end: "2026-06-20" } */
  const parseDateRange = (s: string): { start: string; end: string } | null => {
    const m = s.match(/(\d{1,2})\.?\s*[-–]\s*(\d{1,2})\.\s*([A-Za-zäöüÄÖÜ.]+)\s*(\d{4})/);
    if (!m) return null;
    const [, d1, d2, monthRaw, year] = m;
    const month = monthMap[monthRaw.toLowerCase().replace(/\.$/, "")];
    if (!month) return null;
    const pad = (n: string | number) => String(n).padStart(2, "0");
    return { start: `${year}-${pad(month)}-${pad(d1)}`, end: `${year}-${pad(month)}-${pad(d2)}` };
  };
  const buildEvent = (
    d: { date: string; location: string },
    countryCode: "CH" | "DE",
    price: string,
    currency: "CHF" | "EUR",
    url: string,
  ) => {
    const range = parseDateRange(d.date);
    if (!range) return null;
    return {
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      name: `Aktiv-Hypnose© Ausbildung — ${d.date}`,
      description: "6-Tage Intensiv-Ausbildung in Hypnose mit NGH International Trainer Lic. Psych. David J. Woods. Aktiv-Hypnose© Therapeuten-Diplom.",
      startDate: range.start,
      endDate: range.end,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: d.location,
        address: { "@type": "PostalAddress", addressCountry: countryCode },
      },
      organizer: {
        "@type": "Organization",
        name: "David J. Woods — Hypnose & Psychologie",
        url: "https://david-j-woods.com",
      },
      performer: { "@type": "Person", name: "David J. Woods" },
      inLanguage: "de",
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: currency,
        availability: "https://schema.org/InStock",
        url,
        validFrom: new Date().toISOString().split("T")[0],
      },
    };
  };
  const eventJsonLd = [
    ...datesCH.map(d => buildEvent(d, "CH", "2490", "CHF", "https://david-j-woods.com/de/ch/ausbildung")),
    ...datesDE.map(d => buildEvent(d, "DE", "2490", "EUR", "https://david-j-woods.com/de/de/ausbildung")),
  ].filter(Boolean) as Record<string, unknown>[];

  const allSchemaForPage = [courseJsonLd, ...eventJsonLd];

  return (
    <>
      {/* SEO: BreadcrumbList + Course JSON-LD (overrides default org schema for this page) */}
      <SEO
        {...pageSEO.training}
        pageKey="training"
        jsonLd={allSchemaForPage}
        breadcrumbs={[
          { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
          { name: isEN ? "Training" : "Ausbildung", path: getPath("training", language, country) },
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO: Why this training exists
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#f4f3ef] border-b border-border relative overflow-hidden">
        {/* Subtle premium connecting glow between text & image (desktop only) */}
        <div aria-hidden className="hidden lg:block pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[60%] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
        <div className="container-main py-3 md:py-5 lg:py-7 relative">
          <Link to={getPath("trainingOverview", language, country)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-3">
            <ArrowLeft className="w-4 h-4" /> {isEN ? "Back to overview" : "Zurück zur Übersicht"}
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-3 md:gap-4 lg:gap-5 md:items-start items-center">
            <div className="contents md:block md:pl-8 lg:pl-16 xl:pl-24 2xl:pl-28">
              <div className="order-1 md:order-none">
                <p className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-[#2E7D32] mb-2 md:mb-2.5">
                  {isEN ? "6-Day Intensive Training" : "6-Tage Intensiv-Ausbildung"}
                </p>
                <h1 className="text-[1.4rem] sm:text-3xl lg:text-[2.25rem] leading-tight font-light text-[#1B3A5C] mb-4 md:mb-4 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                  {isEN ? "Aktiv-Hypnose© Therapist" : "Aktiv-Hypnose© Therapeut"}
                </h1>
                <ul className="space-y-1.5 md:space-y-1.5 lg:space-y-2 mb-4 md:mb-4">
                  {(isEN ? [
                    "Developed from 35+ years of therapeutic experience",
                    "Effective methods for real change work",
                    "Modern hypnosis & psychological expertise",
                    "Deep work, EMDR & transformation techniques",
                    "Small groups & personal guidance",
                    "Continued support after the seminar",
                  ] : [
                    "Entwickelt aus 35+ Jahren therapeutischer Erfahrung",
                    "Effektive Methoden für echte Veränderungsarbeit",
                    "Moderne Hypnose & psychologisches Fachwissen",
                    "Tiefenarbeit, EMDR & Transformationstechniken",
                    "Kleine Gruppen & persönliche Begleitung",
                    "Begleitung auch nach dem Seminar",
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12px] md:text-[13px] lg:text-sm text-[#55504f] leading-snug">
                      <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {/* EMR trust signal — clean, premium inline indicator */}
                <div className="flex items-center gap-2 mb-4 lg:mt-3 lg:mb-6">
                  <img
                    src={CDN.emrBadge}
                    alt="EMR"
                    className="h-7 md:h-8 w-auto opacity-95 flex-shrink-0"
                    loading="lazy"
                  />
                  <span className="text-[11px] md:text-[11.5px] leading-snug">
                    <span className="text-[#1B3A5C] font-semibold">
                      {isEN ? "EMR-compliant" : "EMR-konform"}
                    </span>
                    <span className="text-[#55504f]/60 mx-1">·</span>
                    <span className="text-[#55504f]/60">
                      {isEN
                        ? "Hours & content certificate for submission"
                        : "Stunden & Inhaltsnachweis zur Einreichung"}
                    </span>
                  </span>
                </div>
                {/* Desktop-only CTA */}
                <div className="hidden md:flex md:mt-3">
                  <a
                    href="#curriculum"
                    className="inline-flex group"
                    aria-label={isEN ? "What you'll directly learn" : "Was Sie direkt lernen werden"}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("curriculum");
                      if (!el) return;
                      const header = document.querySelector("header") as HTMLElement | null;
                      const headerH = header ? header.getBoundingClientRect().height : 0;
                      const top = el.getBoundingClientRect().top + window.scrollY - headerH + 152;
                      window.scrollTo({ top, behavior: "smooth" });
                    }}
                  >
                    <Button
                      className="bg-white text-[#1B3A5C] hover:bg-[#EEF3F9] active:bg-[#D6E3F0] border-[1.5px] border-[#1B3A5C] hover:border-[#16314D] font-semibold px-5 py-1.5 h-9 text-[13px] tracking-[0.01em] rounded-lg shadow-[0_2px_4px_rgba(27,58,92,0.14),0_6px_14px_rgba(27,58,92,0.14)] hover:shadow-[0_4px_8px_rgba(27,58,92,0.18),0_12px_24px_rgba(27,58,92,0.20)] transition-all duration-200 hover:-translate-y-[1.5px] active:translate-y-[1px] active:shadow-[0_1px_2px_rgba(27,58,92,0.12)]"
                    >
                      <BookOpen className="w-3.5 h-3.5 mr-2 text-[#1B3A5C] transition-transform duration-200 group-hover:scale-110" />
                      <span>{isEN ? "What you'll directly learn" : "Was Sie direkt lernen werden"}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2 text-[#1B3A5C] transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Button>
                  </a>
                </div>
              </div>
              <div className="order-2 md:hidden">
                <figure className="relative overflow-hidden bg-gradient-to-br from-white via-[#FBFBFA] to-[#F2F2EF] border border-[#E5E4DF] rounded-2xl px-5 pt-4 pb-3 md:px-6 md:pt-5 md:pb-3.5 shadow-[0_1px_1px_rgba(27,58,92,0.02),0_10px_28px_-20px_rgba(27,58,92,0.14)] ring-1 ring-white/70">
                  <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_15%,#1B3A5C_0,transparent_55%),radial-gradient(circle_at_85%_90%,#1B3A5C_0,transparent_60%)]" />
                  <div className="relative bg-white border border-[#E0DFD9] rounded-[3px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.035),0_8px_20px_-12px_rgba(27,58,92,0.16),0_18px_40px_-24px_rgba(27,58,92,0.16)] mx-auto max-w-[280px] md:max-w-[310px] select-none -translate-y-1">
                    <img
                      src={diplomAktivHypnose}
                      alt={isEN ? "Aktiv-Hypnose® Therapist Diploma" : "Aktiv-Hypnose® Therapeuten-Diplom"}
                      className="w-full h-auto pointer-events-none select-none"
                      loading="eager"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </div>
                  <figcaption className="relative mt-1.5 md:mt-2 text-center">
                    <p className="text-[11px] md:text-[11.5px] text-[#3a3735] leading-snug max-w-[42ch] mx-auto">
                      {isEN
                        ? "This certification is awarded upon completion of the 6-day seminar as a Therapist in Aktiv-Hypnose®."
                        : "Diese Zertifizierung erhalten Sie nach Abschluss des 6-tägigen Seminars als Therapeut/in in Aktiv-Hypnose®."}
                    </p>
                  </figcaption>
                </figure>
              </div>
              {/* Mobile-only CTA (below image) */}
              <div className="order-3 md:hidden flex justify-center mt-3">
                <a
                  href="#curriculum"
                  className="w-full group"
                  aria-label={isEN ? "What you'll directly learn" : "Was Sie direkt lernen werden"}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("curriculum");
                    if (!el) return;
                    const header = document.querySelector("header") as HTMLElement | null;
                    const headerH = header ? header.getBoundingClientRect().height : 0;
                    const top = el.getBoundingClientRect().top + window.scrollY - headerH + 152;
                    window.scrollTo({ top, behavior: "smooth" });
                  }}
                >
                  <Button
                    className="w-full justify-center text-center bg-white text-[#1B3A5C] hover:bg-[#EEF3F9] active:bg-[#D6E3F0] border-[1.5px] border-[#1B3A5C] hover:border-[#16314D] font-semibold px-4 py-2 h-11 text-[13px] tracking-[0.01em] rounded-lg shadow-[0_2px_5px_rgba(27,58,92,0.14),0_6px_16px_rgba(27,58,92,0.16)] hover:shadow-[0_4px_10px_rgba(27,58,92,0.18),0_12px_24px_rgba(27,58,92,0.22)] transition-all duration-200 hover:-translate-y-[1.5px] active:translate-y-[1px]"
                  >
                    <BookOpen className="w-3.5 h-3.5 mr-2 flex-shrink-0 text-[#1B3A5C] transition-transform duration-200 group-hover:scale-110" />
                    <span className="truncate-none whitespace-normal">{isEN ? "What you'll directly learn" : "Was Sie direkt lernen werden"}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2 flex-shrink-0 text-[#1B3A5C] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden md:block md:pr-2 lg:pr-4 xl:pr-5">
              <figure className="relative overflow-hidden bg-gradient-to-br from-white via-[#FBFBFA] to-[#EFEFEC] border border-[#E5E4DF] rounded-2xl px-5 pt-4 pb-3 lg:px-7 lg:pt-5 lg:pb-4 xl:px-8 xl:pt-6 xl:pb-5 shadow-[0_1px_1px_rgba(27,58,92,0.02),0_14px_36px_-24px_rgba(27,58,92,0.16),0_28px_60px_-32px_rgba(27,58,92,0.14)] ring-1 ring-white/70">
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_18%_12%,#1B3A5C_0,transparent_55%),radial-gradient(circle_at_88%_92%,#1B3A5C_0,transparent_60%)]" />
                <div aria-hidden className="pointer-events-none absolute inset-x-6 top-3 h-px bg-gradient-to-r from-transparent via-[#D8D7D2] to-transparent" />
                <div aria-hidden className="pointer-events-none absolute inset-x-6 bottom-3 h-px bg-gradient-to-r from-transparent via-[#D8D7D2] to-transparent" />
                <div className="relative bg-white border border-[#E0DFD9] rounded-[3px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.035),0_10px_24px_-14px_rgba(27,58,92,0.18),0_24px_50px_-26px_rgba(27,58,92,0.18)] mx-auto max-w-[280px] lg:max-w-[360px] xl:max-w-[400px] select-none -translate-y-1.5">
                  <img
                    src={diplomAktivHypnose}
                    alt={isEN ? "Aktiv-Hypnose® Therapist Diploma" : "Aktiv-Hypnose® Therapeuten-Diplom"}
                    className="w-full h-auto pointer-events-none select-none"
                    loading="eager"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
                <figcaption className="relative mt-2 xl:mt-2.5 text-center">
                  <p className="text-[11.5px] xl:text-[12px] text-[#3a3735] leading-snug max-w-[44ch] mx-auto">
                    {isEN
                      ? "This certification is awarded upon completion of the 6-day seminar as a Therapist in Aktiv-Hypnose®."
                      : "Diese Zertifizierung erhalten Sie nach Abschluss des 6-tägigen Seminars als Therapeut/in in Aktiv-Hypnose®."}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — What makes this different
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#DDE1E4] border-b border-border">
        <div className="container-main py-3 md:py-6 lg:py-8">
          <div className="max-w-5xl mx-auto bg-white border border-[#2E7D32]/15 rounded-2xl md:rounded-3xl px-4 py-4 md:px-9 md:py-6 shadow-[0_1px_2px_rgba(27,58,92,0.04),0_14px_36px_-22px_rgba(27,58,92,0.18)] ring-1 ring-white">
            <h2 className="text-lg md:text-2xl font-light text-[#1B3A5C] mb-1 text-center tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "What Makes This Training Different" : "Was diese Ausbildung besonders macht"}
            </h2>
            <p className="text-[11px] md:text-sm text-muted-foreground text-center mb-2.5 md:mb-4 max-w-2xl mx-auto leading-snug">
              {isEN
                ? "Intensive premium training with real depth, built on 30,000+ clinical sessions."
                : "Intensive Premium-Ausbildung mit echter Tiefe, aufgebaut auf 30.000+ klinischen Sitzungen."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 md:gap-2.5">
              {[
                { icon: <Shield className="w-[14px] h-[14px] md:w-4 md:h-4 text-[#2E7D32]" strokeWidth={1.75} />, titleDE: "35+ Jahre klinische Praxis", titleEN: "35+ Years of Clinical Practice", textDE: "Jede Technik in Tausenden realer Sitzungen verfeinert — methodenbasierte Expertenausbildung.", textEN: "Every technique refined across thousands of real sessions — method-based expert training." },
                { icon: <Users className="w-[14px] h-[14px] md:w-4 md:h-4 text-[#2E7D32]" strokeWidth={1.75} />, titleDE: "Kleingruppen-Format", titleEN: "Small Group Format", textDE: "Begrenzte Teilnehmerzahl für persönliche Betreuung und maximale Lernintensität.", textEN: "Limited group size for personal attention and maximum learning intensity." },
                { icon: <Zap className="w-[14px] h-[14px] md:w-4 md:h-4 text-[#2E7D32]" strokeWidth={1.75} />, titleDE: "Praxis ab Tag 1", titleEN: "Hands-On from Day 1", textDE: "Sie hypnotisieren selbst — Theorie verbunden mit sofortiger praktischer Anwendung.", textEN: "You hypnotize yourself — theory paired with immediate practical application." },
              ].map((c, i) => (
                <div key={i} className="group relative bg-white border border-[#2E7D32]/20 rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-2.5 text-left shadow-[0_1px_2px_rgba(27,58,92,0.03)] md:hover:shadow-[0_4px_14px_-8px_rgba(46,125,50,0.18)] md:hover:border-[#2E7D32]/35 transition-all duration-300">
                  <div className="flex items-start gap-2 md:gap-2.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-md bg-[#2E7D32]/[0.06] ring-1 ring-[#2E7D32]/15 shrink-0 mt-px">
                      {c.icon}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-medium text-[13px] md:text-[13.5px] text-[#1B3A5C] leading-snug tracking-tight mb-0.5">{isEN ? c.titleEN : c.titleDE}</h3>
                      <p className="text-[11px] md:text-[11.5px] text-muted-foreground leading-snug max-w-[42ch]">{isEN ? c.textEN : c.textDE}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Inline divider with compact label ── */}
            <div className="mt-3.5 md:mt-5 mb-2.5 md:mb-3.5 flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#2E7D32]/25" />
              <span className="text-[10.5px] md:text-[11.5px] uppercase tracking-[0.16em] text-[#1B3A5C]/75 font-medium whitespace-nowrap">
                {isEN ? "Included in Your Package" : "Im Ausbildungspaket enthalten"}
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#2E7D32]/25" />
            </div>

            {/* ── Compact stat badges ── */}
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-1.5 md:gap-2">
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
                  className="bg-white border border-[#2E7D32]/35 rounded-md md:rounded-lg px-1.5 py-1.5 md:px-2 md:py-2 min-h-[56px] md:min-h-[68px] flex flex-col items-center justify-center text-center gap-0.5 md:gap-1 shadow-[0_1px_1px_rgba(27,58,92,0.02)] md:hover:border-[#2E7D32]/45 transition-colors duration-200"
                >
                  <span className="text-[15px] md:text-[18px] font-semibold text-[#1B3A5C] leading-none tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                    {item.n}
                  </span>
                  <span className="text-[9.5px] md:text-[11px] text-[#1B3A5C]/70 leading-tight font-medium px-0.5">
                    {item.l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION — Day-by-Day Curriculum (premium framed carousel)
          ═══════════════════════════════════════════════════════════ */}
      <section id="curriculum" className="bg-[#f4f3ef] border-b border-border scroll-mt-20">
        <div className="container-main py-2.5 md:py-4 lg:py-6">
          <div className="max-w-5xl mx-auto bg-white border border-[#1B3A5C]/15 rounded-2xl md:rounded-3xl px-3 py-3 md:px-9 md:py-5 shadow-[0_1px_2px_rgba(27,58,92,0.04),0_14px_36px_-22px_rgba(27,58,92,0.18)] ring-1 ring-white">
            <h2 className="text-lg md:text-2xl font-light text-[#1B3A5C] mb-1 text-center tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Your 6-Day Journey" : "Ihre 6-Tage-Reise"}
            </h2>
            <p className="text-[11px] md:text-sm text-muted-foreground text-center mb-2.5 md:mb-4 max-w-2xl mx-auto leading-snug">
              {isEN
                ? "Each day builds on the previous, taking you from fundamentals to advanced clinical techniques."
                : "Jeder Tag baut auf dem vorherigen auf und führt Sie von den Grundlagen zu fortgeschrittenen klinischen Techniken."}
            </p>
            <div className="relative px-1 md:px-10">
                  <Carousel
                    setApi={setCurriculumApi}
                    opts={{ align: "start", loop: false, slidesToScroll: 1 }}
                    className="relative"
                  >
                    <CarouselContent className="-ml-2 md:-ml-3">
                      {days.map((day) => (
                        <CarouselItem key={day.day} className="pl-2 md:pl-3 basis-full md:basis-1/3">
                          <div className="h-full bg-gradient-to-b from-white to-[#F8FAF8] border border-[#2E7D32]/45 rounded-xl md:rounded-2xl p-2.5 md:p-3.5 shadow-[0_4px_20px_rgba(27,58,92,0.07),0_1px_3px_rgba(46,125,50,0.06),0_8px_28px_-6px_rgba(46,125,50,0.10)] ring-1 ring-[#2E7D32]/15 hover:shadow-[0_8px_30px_rgba(27,58,92,0.10),0_2px_5px_rgba(46,125,50,0.08),0_12px_36px_-8px_rgba(46,125,50,0.14)] hover:border-[#2E7D32]/60 transition-shadow duration-300">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="p-2 rounded-xl bg-[#2E7D32]/10 ring-1 ring-[#2E7D32]/35 text-[#1B3A5C] shrink-0 shadow-[0_2px_6px_rgba(46,125,50,0.12)]">
                                {day.icon}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#2E7D32] leading-tight">
                                  {isEN ? `Day ${day.day}` : `Tag ${day.day}`}
                                </p>
                                <h3 className="text-sm md:text-[15px] font-light text-[#1B3A5C] leading-tight tracking-tight">
                                  {isEN ? day.titleEN : day.titleDE}
                                </h3>
                              </div>
                            </div>
                            <ul className="space-y-1">
                              {(isEN ? day.topicsEN : day.topicsDE).map((topic, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-[11px] md:text-xs text-[#55504f] leading-snug">
                                  <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#2E7D32] mt-0.5 shrink-0" />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious
                      aria-label={isEN ? "Previous days" : "Vorherige Tage"}
                      className="hidden md:flex h-9 w-9 -left-2 lg:-left-4 bg-white border-[#1B3A5C]/25 text-[#1B3A5C] hover:bg-[#1B3A5C] hover:text-white hover:border-[#1B3A5C] shadow-sm"
                    />
                    <CarouselNext
                      aria-label={isEN ? "Next days" : "Nächste Tage"}
                      className="hidden md:flex h-9 w-9 -right-2 lg:-right-4 bg-white border-[#1B3A5C]/25 text-[#1B3A5C] hover:bg-[#1B3A5C] hover:text-white hover:border-[#1B3A5C] shadow-sm"
                    />
                  </Carousel>
                  {/* Mobile dots */}
                  <div className="md:hidden flex justify-center gap-1.5 mt-3">
                    {days.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => curriculumApi?.scrollTo(i)}
                        aria-label={`${isEN ? "Day" : "Tag"} ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          curriculumIndex === i ? "w-5 bg-[#1B3A5C]" : "w-1.5 bg-[#1B3A5C]/25"
                        }`}
                      />
                    ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION — Upcoming Dates with Country Tabs (premium framed)
          ═══════════════════════════════════════════════════════════ */}
      <section id="dates" className="bg-[#DDE1E4] border-b border-border scroll-mt-20">
        <div className="container-main py-3 md:py-6 lg:py-8">
          <div className="max-w-4xl mx-auto bg-white border border-[#1B3A5C]/15 rounded-2xl md:rounded-3xl px-4 py-4 md:px-9 md:py-6 shadow-[0_1px_2px_rgba(27,58,92,0.04),0_14px_36px_-22px_rgba(27,58,92,0.18)] ring-1 ring-white">
            <h2 className="text-lg md:text-2xl font-light text-[#1B3A5C] mb-1 text-center tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Upcoming Training Dates" : "Kommende Ausbildungstermine"}
            </h2>
            <div className="flex justify-center mb-3">
              <div className="inline-flex items-center gap-2 text-[13px] sm:text-sm font-medium text-[#2E7D32] bg-[#E8F5E9]/80 px-4 py-2 rounded-full border border-[#2E7D32]/20 shadow-sm">
                <GraduationCap className="w-4 h-4" />
                {isEN ? "Therapist in Aktiv-Hypnose®" : "Therapeut in Aktiv-Hypnose®"}
              </div>
            </div>

            {/* Country Tabs */}
            <div className="flex justify-center gap-2 md:gap-3 mb-4 md:mb-6 max-w-md mx-auto">
              <button
                onClick={() => { setActiveTab("de"); setShowAllDates(false); }}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 px-4 rounded-lg border font-semibold text-sm transition-all ${
                  activeTab === "de"
                    ? "border-[#C5CCD4] bg-[#EAEEF2] text-[#1B3A5C] shadow-[0_1px_3px_rgba(27,58,92,0.06)]"
                    : "border-[#E2E8EE] bg-white text-[#1B3A5C]/70 hover:border-[#C5CCD4] hover:text-[#1B3A5C]"
                }`}
              >
                <span className="text-base">🇩🇪</span>
                {isEN ? "Germany" : "Deutschland"}
              </button>
              <button
                onClick={() => { setActiveTab("ch"); setShowAllDates(false); }}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 px-4 rounded-lg border font-semibold text-sm transition-all ${
                  activeTab === "ch"
                    ? "border-[#C5CCD4] bg-[#EAEEF2] text-[#1B3A5C] shadow-[0_1px_3px_rgba(27,58,92,0.06)]"
                    : "border-[#E2E8EE] bg-white text-[#1B3A5C]/70 hover:border-[#C5CCD4] hover:text-[#1B3A5C]"
                }`}
              >
                <span className="text-base">🇨🇭</span> {isEN ? "Switzerland" : "Schweiz"}
              </button>
            </div>

            <div className="space-y-2.5 md:space-y-4">
              {/* CH Content */}
              {activeTab === "ch" && (
                <>
                  {(showAllDates ? datesCH : datesCH.slice(0, INITIAL_DATES_VISIBLE)).map((d, i) => (
                    <div key={`ch-${i}`} className="border border-[#2E7D32]/30 p-3.5 md:p-4 bg-white rounded-2xl shadow-[0_2px_8px_rgba(46,125,50,0.08)] hover:shadow-[0_6px_16px_rgba(46,125,50,0.14)] hover:border-[#2E7D32]/50 transition-all ring-1 ring-[#2E7D32]/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                      <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2">
                        <div className="flex flex-wrap items-center justify-center gap-1.5">
                          {d.status === "limited" && (
                            <>
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#FFF3E0] text-[#E65100]">
                                {isEN ? "Limited seats" : "Letzte Plätze"}
                              </span>
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32]">
                                {isEN ? "Save 200.–" : "200.– sparen"}
                              </span>
                            </>
                          )}
                          {d.status !== "limited" && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32]">
                              {isEN ? "Available" : "Verfügbar"}
                            </span>
                          )}
                        </div>
                        <Link to={`/${language}/${country}/${language === "en" ? "seminar-registration" : "seminar-anmeldung"}?country=ch`}>
                          <Button size="sm" className="bg-white text-[#1B3A5C] border-2 border-[#1B3A5C]/30 hover:border-[#1B3A5C]/60 hover:bg-[#F1F4F7] text-[11px] sm:text-xs whitespace-nowrap rounded-lg font-semibold h-7 px-2.5 sm:h-9 sm:px-3">
                            {isEN ? "More Info →" : "Mehr Info →"}
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
                  {(showAllDates ? datesDE : datesDE.slice(0, INITIAL_DATES_VISIBLE)).map((d, i) => (
                    <div key={`de-${i}`} className="border border-[#2E7D32]/30 p-3.5 md:p-4 bg-white rounded-2xl shadow-[0_2px_8px_rgba(46,125,50,0.08)] hover:shadow-[0_6px_16px_rgba(46,125,50,0.14)] hover:border-[#2E7D32]/50 transition-all ring-1 ring-[#2E7D32]/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                      <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2">
                        <div className="flex flex-wrap items-center justify-center gap-1.5">
                          {d.status === "limited" ? (
                            <>
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#FFF3E0] text-[#E65100]">
                                {isEN ? "Limited seats" : "Letzte Plätze"}
                              </span>
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32]">
                                {isEN ? "Save 200,-" : "200,- sparen"}
                              </span>
                            </>
                          ) : (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32]">
                              {isEN ? "Available" : "Verfügbar"}
                            </span>
                          )}
                        </div>
                        <Link to={`/${language}/${country}/${language === "en" ? "seminar-registration" : "seminar-anmeldung"}?country=de`}>
                          <Button size="sm" className="bg-white text-[#1B3A5C] border-2 border-[#1B3A5C]/30 hover:border-[#1B3A5C]/60 hover:bg-[#F1F4F7] text-[11px] sm:text-xs whitespace-nowrap rounded-lg font-semibold h-7 px-2.5 sm:h-9 sm:px-3">
                            {isEN ? "More Info →" : "Mehr Info →"}
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
          </div>
        </div>
      </section>


      {/* Educational hypnosis video moved to dedicated page /wie-funktioniert-hypnose */}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — FAQ + Final CTA
          ═══════════════════════════════════════════════════════════ */}

      <FAQSection
        sectionClassName="bg-[#f4f3ef] border-y border-border"
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
          { q: "Kann ich nach der 6-Tage-Ausbildung professionell arbeiten?", a: "Ja – nach Abschluss der 6-tägigen Intensiv-Ausbildung und dem Aktiv-Hypnose© Therapeuten-Diplom verfügen Sie über ein sehr starkes, praxisnahes Fundament, um professionell mit Aktiv-Hypnose© zu arbeiten. In dieser Ausbildung lernen Sie nicht nur klassische Hypnose-Grundlagen, sondern eine von David J. Woods über Jahrzehnte entwickelte Methode mit Werkzeugen, Techniken und therapeutischen Abläufen, die in dieser Kombination kaum irgendwo anders vermittelt werden. Während des Seminars wird intensiv praktisch gearbeitet: Sie können Übungen direkt umsetzen, gegenseitig trainieren und wichtige Demonstrationen zusätzlich selbst filmen oder dokumentieren, damit Sie das Gelernte später sicher weiter vertiefen können. Zusätzlich erhalten Sie eine umfangreiche Ausbildungsmappe mit über 350 Seiten, mehr als 150 Seiten Beispieltexten, über 50 Videos sowie über 50 Audioaufnahmen. Damit haben Sie nicht nur das Wissen für den direkten Start, sondern genug Material, um über viele Monate bis weit über ein Jahr hinaus sicher weiter zu üben, zu festigen und Ihre eigene therapeutische Sicherheit aufzubauen. Die Ausbildung vermittelt Ihnen die Werkzeuge – echte Meisterschaft entsteht dann durch Anwenden, Üben und Erfahrung. Genau dafür ist diese Ausbildung aufgebaut." },
          { q: "Was ist die wissenschaftliche Grundlage der Hypnotherapie?", a: "Hypnotherapie ist von der Weltgesundheitsorganisation (WHO) anerkannt und durch zahlreiche Meta-Analysen validiert. Eine Landmark-Studie von Kirsch et al. (1995) zeigte, dass die Ergänzung von KVT durch Hypnose die Ergebnisse um 70% verbessert. Der Wissenschaftliche Beirat Psychotherapie bestätigte 2006 die Evidenz für klinische Hypnose." },
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION — Training Participant Video Testimonials
          ═══════════════════════════════════════════════════════════ */}
      <TrainingTestimonialsCarousel />

      <section className="bg-[#DDE1E4] py-3 md:py-5">
        <div className="container-main">
          <div className="relative max-w-xl mx-auto bg-gradient-to-br from-white via-[#F1F4F7] to-[#E8ECEF] border border-[#1B3A5C]/18 rounded-2xl px-4 py-3.5 md:px-6 md:py-4 text-center shadow-[0_4px_18px_rgba(27,58,92,0.08)]">
            {/* Decorative top accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ECEEF1] text-[#1B3A5C] text-[9px] md:text-[10px] font-medium px-3 py-0.5 rounded-full tracking-wide uppercase border border-[#1B3A5C]/25">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </div>
            <h2 className="text-base md:text-lg font-light text-foreground mb-1 md:mb-1.5 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Your Journey Starts Here" : "Ihre Reise beginnt hier"}
            </h2>
            <p className="text-[12px] md:text-sm text-muted-foreground max-w-md mx-auto mb-2 md:mb-3 leading-snug">
              {isEN
                ? "In 6 days, you'll gain the knowledge, the confidence, and the diploma to support people professionally. Are you ready?"
                : "In 6 Tagen gewinnen Sie das Wissen, die Sicherheit und das Diplom, um Menschen professionell zu begleiten. Sind Sie bereit?"}
            </p>
            <Link to={`${getPath("seminarRegistration", language, country)}?country=de`}>
              <Button className="bg-[#c8e6c9] hover:bg-[#a5d6a7] text-[#1B3A1F] font-medium px-5 py-2 md:px-6 md:py-2.5 text-[13px] md:text-sm rounded-full shadow-[0_4px_14px_rgba(46,125,50,0.30)] hover:shadow-[0_6px_20px_rgba(46,125,50,0.40)] transition-all">
                {isEN ? "View Next Step" : "Nächsten Schritt ansehen"}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-3 mt-2.5 md:mt-4 text-muted-foreground text-[11px] md:text-sm">
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
