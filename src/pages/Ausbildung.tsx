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
  const isEN = language === "en";

  /* ── Seminar Dates ── */
  const datesCH = [
    { date: "Mo-Sa, 15.-20. Juni 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "limited" as const },
    { date: "Mo-Sa, 07.-12. Sept. 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "available" as const },
    { date: "Mo-Sa, 23.-28. Nov. 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach", status: "available" as const },
  ];
  const datesDE = [
    { date: "Mo-Sa, 11.-16. Mai 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg", status: "limited" as const },
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
        <div className="container-main py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32] mb-3">
                {isEN ? "Premium 6-Day Intensive Certification" : "Premium 6-Tage Intensiv-Zertifizierung"}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B3A5C] mb-3" style={{ fontFamily: "Georgia, serif" }}>
                {isEN
                  ? "Become a Certified Aktiv-Hypnose© Therapist"
                  : "Werden Sie zertifizierter Aktiv-Hypnose© Therapeut"}
              </h1>
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap className="w-5 h-5 text-[#2E7D32]" />
                <span className="text-sm font-semibold text-[#1B3A5C]">
                  {isEN ? "Specialist Practitioner Diploma" : "Therapeuten-Diplom"}
                </span>
              </div>
              <p className="text-base lg:text-lg text-[#55504f] leading-relaxed mb-5">
                {isEN
                  ? "This is not a weekend certificate course. It's an exclusive, high-level practitioner training where you learn to create real, lasting change — in yourself and in your clients. Developed over 40 years of clinical practice by Lic.Psych. David J. Woods, this method-based expert training combines psychology, neuroscience, and hands-on hypnotherapy into a system that works from day one."
                  : "Dies ist kein Wochenend-Zertifikatskurs. Es ist eine exklusive, hochwertige Praktiker-Ausbildung, in der Sie lernen, echte, nachhaltige Veränderung zu bewirken — bei sich selbst und bei Ihren Klienten. Entwickelt über 40 Jahre klinischer Praxis von Lic.Psych. David J. Woods, verbindet diese methodenbasierte Expertenausbildung Psychologie, Neurowissenschaft und praktische Hypnotherapie zu einem System, das ab dem ersten Tag wirkt."}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[#55504f] mb-6">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#2E7D32]" /> {isEN ? "6 Days, 10:00–17:00" : "6 Tage, 10:00–17:00 Uhr"}</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#2E7D32]" /> {isEN ? "Small Group Premium Format" : "Premium-Kleingruppen"}</span>
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#2E7D32]" /> Aktiv-Hypnose© Diplom</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#dates">
                  <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-6 py-3">
                    {isEN ? "View Dates & Register" : "Termine & Anmeldung"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="#curriculum">
                  <Button variant="outline" className="border-[#55504f] text-[#55504f] font-semibold px-6 py-3">
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
        <div className="container-main py-10 lg:py-14">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "What Makes This Training Different" : "Was diese Ausbildung besonders macht"}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            {isEN
              ? "Not a mass-market course. Not a certificate mill. A serious premium training with real depth, built on 30,000+ clinical sessions."
              : "Kein Massenkurs. Keine Zertifikatsfabrik. Eine seriöse Premium-Ausbildung mit echter Tiefe, aufgebaut auf 30.000+ klinischen Sitzungen."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="border border-border p-6 text-center">
              <Shield className="w-8 h-8 text-[#1B3A5C] mx-auto mb-3" />
              <h3 className="font-bold text-sm text-[#1B3A5C] mb-2">{isEN ? "40+ Years of Clinical Practice" : "40+ Jahre klinische Praxis"}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEN
                  ? "Every technique taught has been tested and refined in thousands of real clinical sessions. This is method-based expert training."
                  : "Jede gelehrte Technik wurde in Tausenden realer klinischer Sitzungen getestet und verfeinert. Eine methodenbasierte Expertenausbildung."}
              </p>
            </div>
            <div className="border border-border p-6 text-center">
              <Users className="w-8 h-8 text-[#1B3A5C] mx-auto mb-3" />
              <h3 className="font-bold text-sm text-[#1B3A5C] mb-2">{isEN ? "Small Group Premium Format" : "Premium-Kleingruppen"}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEN
                  ? "Strictly limited participants ensure personal attention, individual feedback, and maximum learning intensity. A selective learning experience."
                  : "Strikt begrenzte Teilnehmerzahl garantiert persönliche Betreuung, individuelles Feedback und maximale Lernintensität. Ein selektives Lernerlebnis."}
              </p>
            </div>
            <div className="border border-border p-6 text-center">
              <Zap className="w-8 h-8 text-[#1B3A5C] mx-auto mb-3" />
              <h3 className="font-bold text-sm text-[#1B3A5C] mb-2">{isEN ? "Hands-On from Day 1" : "Praxis ab Tag 1"}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEN
                  ? "You won't just watch — you'll hypnotize. Every day combines theory with immediate application. A transformational practical training."
                  : "Sie schauen nicht nur zu — Sie hypnotisieren. Jeder Tag verbindet Theorie mit sofortiger praktischer Anwendung. Eine transformative Praxisausbildung."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DIPLOMAS — Visual proof of certification
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-border">
        <div className="container-main py-10 lg:py-14">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Your Certification" : "Ihr Abschluss"}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            {isEN
              ? "Upon completion, you receive internationally recognized diplomas."
              : "Nach Abschluss erhalten Sie international anerkannte Diplome."}
          </p>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="border border-border rounded-lg overflow-hidden shadow-sm mb-4">
                <ImageLightbox src={diplomNGH} alt="NGH Certified Instructor — David Woods" className="w-full h-auto" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-[#1B3A5C]" style={{ fontFamily: "Georgia, serif" }}>
                  {isEN ? "NGH Certified Instructor" : "NGH-zertifizierter Instructor"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
                {isEN
                  ? "This certificate proves that David J. Woods is a certified hypnosis instructor accredited by the National Guild of Hypnotists (NGH) — the world's largest and most respected hypnosis organization."
                  : "Dieses Zertifikat belegt, dass David J. Woods ein zertifizierter Hypnose-Instructor ist, akkreditiert durch die National Guild of Hypnotists (NGH) — die weltweit grösste und angesehenste Hypnose-Organisation."}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="border border-border rounded-lg overflow-hidden shadow-sm mb-4">
                <ImageLightbox src={diplomAktivHypnose} alt="Diplom — Therapeut in Aktiv-Hypnose" className="w-full h-auto" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-[#1B3A5C]" style={{ fontFamily: "Georgia, serif" }}>
                  {isEN ? "Your Diploma" : "Ihr Diplom"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
                {isEN
                  ? "This is the diploma you receive upon completing the 6-day seminar — your official certification as a Therapist in Aktiv-Hypnose®."
                  : "Dieses Diplom erhalten Sie nach Abschluss des 6-tägigen Seminars — Ihre offizielle Zertifizierung als Therapeut/in in Aktiv-Hypnose®."}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — Day-by-Day Curriculum
          ═══════════════════════════════════════════════════════════ */}
      <section id="curriculum" className="bg-[#f4f3ef] border-b border-border scroll-mt-20">
        <div className="container-main py-10 lg:py-14">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Your 6-Day Journey" : "Ihre 6-Tage Reise"}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            {isEN
              ? "Each day builds on the previous, taking you from fundamentals to advanced clinical techniques."
              : "Jeder Tag baut auf dem vorherigen auf und führt Sie von den Grundlagen zu fortgeschrittenen klinischen Techniken."}
          </p>
          <div className="max-w-4xl mx-auto space-y-5">
            {days.map((day) => (
              <div key={day.day} className={`border rounded-lg p-6 ${day.color}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-full bg-white shadow-sm ${day.iconColor}`}>
                    {day.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {isEN ? `Day ${day.day}` : `Tag ${day.day}`}
                    </p>
                    <h3 className="text-lg font-bold text-[#1B3A5C]">
                      {isEN ? day.titleEN : day.titleDE}
                    </h3>
                  </div>
                </div>
                <ul className="space-y-2 ml-1">
                  {(isEN ? day.topicsEN : day.topicsDE).map((topic, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#55504f]">
                      <CheckCircle className="w-4 h-4 text-[#2E7D32] mt-0.5 shrink-0" />
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
          SECTION 4 — What's Included
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-border">
        <div className="container-main py-10 lg:py-14">
          <h2 className="text-2xl font-bold text-[#1B3A5C] text-center mb-8" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Everything You Receive" : "Alles, was Sie erhalten"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { num: "350+", labelDE: "Seiten Ausbildungsmappe", labelEN: "Page Training Manual", icon: <BookOpen className="w-5 h-5" /> },
              { num: "150+", labelDE: "Seiten Beispieltexte", labelEN: "Pages Sample Scripts", icon: <MessageSquare className="w-5 h-5" /> },
              { num: "50+", labelDE: "Kurzvideos", labelEN: "Short Videos", icon: <Zap className="w-5 h-5" /> },
              { num: "50+", labelDE: "Audioaufnahmen", labelEN: "Audio Recordings", icon: <Heart className="w-5 h-5" /> },
              { num: "1", labelDE: "Aktiv-Hypnose© Diplom", labelEN: "Aktiv-Hypnose© Diploma", icon: <Award className="w-5 h-5" /> },
              { num: "∞", labelDE: "Laufende Unterstützung", labelEN: "Ongoing Support", icon: <Shield className="w-5 h-5" /> },
            ].map((item, i) => (
              <div key={i} className="bg-[#f4f3ef] border border-border p-4 text-center rounded-lg">
                <div className="text-[#2E7D32] mx-auto mb-2 flex justify-center">{item.icon}</div>
                <p className="text-2xl font-bold text-[#1B3A5C]">{item.num}</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{isEN ? item.labelEN : item.labelDE}</p>
              </div>
            ))}
          </div>

          {showCH && (
            <div className="bg-[#E8F5E9] border border-[#81C784] p-4 mt-8 max-w-2xl mx-auto text-center rounded-lg">
              <p className="text-sm font-semibold text-[#2E7D32]">EMR Krankenkasse Konform · ZSR Nr. P609264</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isEN
                  ? "Many Swiss supplementary insurances cover part of the costs."
                  : "Viele Schweizer Zusatzversicherungen übernehmen einen Teil der Kosten."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — Upcoming Dates
          ═══════════════════════════════════════════════════════════ */}
      <section id="dates" className="bg-[#f4f3ef] border-b border-border scroll-mt-20">
        <div className="container-main py-10 lg:py-14">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Upcoming Training Dates" : "Nächste Ausbildungstermine"}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            {isEN
              ? "Places are strictly limited to ensure the highest quality. Secure yours now."
              : "Die Plätze sind strikt begrenzt, um höchste Qualität zu gewährleisten. Sichern Sie sich Ihren jetzt."}
          </p>
          <div className="space-y-6 max-w-2xl mx-auto">
            {showCH && (
              <>
                {isInternational && <p className="text-xs font-semibold text-[#8b827c] uppercase tracking-wider mt-2 mb-1">🇨🇭 {isEN ? "Switzerland" : "Schweiz"}</p>}
                {/* CH Pricing Box */}
                <div className="bg-white border border-[#81C784] rounded-lg p-5 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#2E7D32] mb-2">
                    {isEN ? "6-Day Intensive Certification" : "6-Tage Intensiv-Zertifizierung"}
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <span className="text-base text-muted-foreground line-through">CHF 3.290,-</span>
                    <span className="text-2xl font-bold text-[#1B3A5C]">CHF 2.990,-</span>
                  </div>
                  <span className="inline-block text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full">
                    {isEN ? "Early Bird Price — Limited Time" : "Frühbucher-Preis — Nur für kurze Zeit"}
                  </span>
                </div>
                {datesCH.map((d, i) => (
                  <div key={`ch-${i}`} className="border border-border p-5 bg-white rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${d.status === "limited" ? "bg-[#FFF3E0] text-[#E65100]" : "bg-[#E8F5E9] text-[#2E7D32]"}`}>
                        {d.status === "limited" ? (isEN ? "Limited seats" : "Letzte freie Plätze") : (isEN ? "Seats available" : "Plätze verfügbar")}
                      </span>
                      <Link to={`/${language}/${country}/${language === "en" ? "seminar-registration" : "seminar-anmeldung"}?country=ch&date=${encodeURIComponent(d.date)}`}>
                        <Button size="sm" className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs">
                          {isEN ? "Secure Your Place" : "Platz sichern"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            )}
            {showDE && (
              <>
                {isInternational && <p className="text-xs font-semibold text-[#8b827c] uppercase tracking-wider mt-3 mb-1">🇩🇪 {isEN ? "Germany" : "Deutschland"}</p>}
                {/* DE Pricing Box */}
                <div className="bg-white border border-[#90CAF9] rounded-lg p-5 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1565C0] mb-2">
                    {isEN ? "6-Day Intensive Certification" : "6-Tage Intensiv-Zertifizierung"}
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <span className="text-base text-muted-foreground line-through">€2.790,-</span>
                    <span className="text-2xl font-bold text-[#1B3A5C]">€2.490,-</span>
                  </div>
                  <span className="inline-block text-xs font-semibold bg-[#E3F2FD] text-[#1565C0] px-3 py-1 rounded-full">
                    {isEN ? "Early Bird Price — Limited Time" : "Frühbucher-Preis — Nur für kurze Zeit"}
                  </span>
                </div>
                {datesDE.map((d, i) => (
                  <div key={`de-${i}`} className="border border-border p-5 bg-white rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${d.status === "limited" ? "bg-[#FFF3E0] text-[#E65100]" : "bg-[#E8F5E9] text-[#2E7D32]"}`}>
                        {d.status === "limited" ? (isEN ? "Limited seats" : "Letzte freie Plätze") : (isEN ? "Seats available" : "Plätze verfügbar")}
                      </span>
                      <Link to={`/${language}/${country}/${language === "en" ? "seminar-registration" : "seminar-anmeldung"}?country=de&date=${encodeURIComponent(d.date)}`}>
                        <Button size="sm" className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs">
                          {isEN ? "Secure Your Place" : "Platz sichern"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2 italic">
            {isEN
              ? "Early Bird pricing available for a limited time or until the current intake is full."
              : "Frühbucher-Preis verfügbar für begrenzte Zeit oder bis die aktuelle Gruppe voll ist."}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          VIDEO — Intensiv-Ausbildungen
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10 lg:py-14">
          <h2 className="text-xl font-bold text-[#1B3A5C] mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Intensive Training Programs" : "Intensiv-Ausbildungen"}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Aktiv-Hypnose© Therapeuten-Diplom
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden border border-border shadow-sm">
              <iframe
                src="https://www.youtube.com/embed/nQo8M8-pRyc?rel=0"
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                title="Intensiv-Ausbildungen · Aktiv-Hypnose© Therapeuten-Diplom"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — FAQ + Final CTA
          ═══════════════════════════════════════════════════════════ */}

      <FAQSection
        title={isEN ? "Frequently Asked Questions" : "Häufig gestellte Fragen"}
        items={isEN ? [
          { q: "What certification do I receive after the training?", a: "You receive the Aktiv-Hypnose© Therapist Diploma — David J. Woods' proprietary method developed over 40 years of clinical practice. David himself is an NGH-certified International Trainer, which ensures the highest teaching standard. In Switzerland, the training is EMR-compliant (ZSR P609264), enabling health insurance billing." },
          { q: "Do I need prior experience in hypnosis or psychology?", a: "No prior experience is required. The 6-day intensive training is designed for beginners and experienced practitioners alike. David J. Woods teaches from the fundamentals to advanced techniques in a structured curriculum." },
          { q: "How many participants are in each training group?", a: "Groups are intentionally kept small (typically 8–12 participants) to ensure intensive, hands-on learning with personal feedback from David J. Woods." },
          { q: "What is Aktiv-Hypnose© and why is it different?", a: "Aktiv-Hypnose© is a clinical method developed by Lic.Psych. David J. Woods that combines psychology, neuroscience, and practical hypnotherapy. Unlike passive approaches, it actively involves the client in the therapeutic process, leading to faster and more lasting results." },
          { q: "Can I practice professionally after the 6-day training?", a: "Yes. After completing the training and receiving your Aktiv-Hypnose© Therapist Diploma, you are qualified to work as a hypnotherapist. The training includes practical guidance on building a successful practice." },
          { q: "What is the scientific basis for hypnotherapy?", a: "Hypnotherapy is recognized by the World Health Organization (WHO) and validated by numerous meta-analyses. A landmark study by Kirsch et al. (1995) showed that adding hypnosis to cognitive-behavioral therapy improves outcomes by 70%. The German Scientific Advisory Council confirmed the evidence for clinical hypnosis in 2006." },
        ] : [
          { q: "Welches Zertifikat erhalte ich nach der Ausbildung?", a: "Sie erhalten das Aktiv-Hypnose© Therapeuten-Diplom — die von David J. Woods über 40 Jahre klinischer Praxis entwickelte Methode. David selbst ist NGH-zertifizierter International Trainer, was höchsten Ausbildungsstandard garantiert. In der Schweiz ist die Ausbildung EMR-konform (ZSR P609264), was die Abrechnung über Krankenkassen ermöglicht." },
          { q: "Brauche ich Vorkenntnisse in Hypnose oder Psychologie?", a: "Nein. Die 6-tägige Intensiv-Ausbildung ist für Anfänger und erfahrene Praktiker gleichermaßen konzipiert. David J. Woods unterrichtet von den Grundlagen bis zu fortgeschrittenen Techniken." },
          { q: "Wie viele Teilnehmer sind in jeder Gruppe?", a: "Gruppen werden bewusst klein gehalten (typischerweise 8–12 Teilnehmer), um intensives, praxisnahes Lernen mit persönlichem Feedback von David J. Woods zu gewährleisten." },
          { q: "Was ist Aktiv-Hypnose© und warum ist sie anders?", a: "Aktiv-Hypnose© ist eine klinische Methode, die von Lic.Psych. David J. Woods entwickelt wurde und Psychologie, Neurowissenschaft und praktische Hypnotherapie verbindet. Im Gegensatz zu passiven Ansätzen wird der Klient aktiv in den therapeutischen Prozess einbezogen, was zu schnelleren und nachhaltigeren Ergebnissen führt." },
          { q: "Kann ich nach der 6-Tage-Ausbildung professionell arbeiten?", a: "Ja. Nach Abschluss der Ausbildung und Erhalt Ihres Aktiv-Hypnose© Therapeuten-Diploms sind Sie qualifiziert, als Hypnotherapeut/in zu arbeiten. Die Ausbildung beinhaltet praktische Anleitung zum Aufbau einer erfolgreichen Praxis." },
          { q: "Was ist die wissenschaftliche Grundlage der Hypnotherapie?", a: "Hypnotherapie ist von der Weltgesundheitsorganisation (WHO) anerkannt und durch zahlreiche Meta-Analysen validiert. Eine Landmark-Studie von Kirsch et al. (1995) zeigte, dass die Ergänzung von KVT durch Hypnose die Ergebnisse um 70% verbessert. Der Wissenschaftliche Beirat Psychotherapie bestätigte 2006 die Evidenz für klinische Hypnose." },
        ]}
      />

      <section className="bg-[#1B3A5C] text-white">
        <div className="container-main py-12 lg:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Your Journey Starts Here" : "Ihre Reise beginnt hier"}
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-6">
            {isEN
              ? "In 6 days, you'll have the skills, the confidence, and the diploma to help people transform their lives. The only question is: are you ready?"
              : "In 6 Tagen haben Sie die Fähigkeiten, das Selbstvertrauen und das Diplom, um Menschen bei der Transformation ihres Lebens zu helfen. Die einzige Frage ist: Sind Sie bereit?"}
          </p>
          <Link to={getPath("seminarRegistration", language, country)}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3 text-base">
              {isEN ? "Register for Seminar" : "Zum Seminar anmelden"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-1 mt-6 text-white/60 text-sm">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            5.0 — 263 Google {isEN ? "Reviews" : "Bewertungen"}
          </div>
        </div>
      </section>
    </>
  );
}
