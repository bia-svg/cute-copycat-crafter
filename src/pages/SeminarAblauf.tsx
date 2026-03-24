/*
 * Seminar Ablauf (Seminar Schedule) — 6-Day Intensive Curriculum
 * Replicates and improves on original david-j-woods.com/ablauf-des-seminars/
 */

import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Brain, Zap, Stethoscope, Users, Heart, GraduationCap,
  CheckCircle, BookOpen, Clock, ArrowRight, Award
} from "lucide-react";

const GOOGLE_REVIEWS_URL = "#";

export default function SeminarAblauf() {
  const { language, country, t, showCH } = useLanguage();
  const isEN = language === "en";

  const days = [
    {
      day: 1,
      icon: <Brain className="w-6 h-6" />,
      titleDE: "Hypnose und Psychologie",
      titleEN: "Hypnosis & Psychology",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
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
      day: 2,
      icon: <Zap className="w-6 h-6" />,
      titleDE: "Hypnose-Techniken und Anwendung",
      titleEN: "Hypnosis Techniques & Application",
      color: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-600",
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
      day: 3,
      icon: <Stethoscope className="w-6 h-6" />,
      titleDE: "Klinische Hypnose und therapeutische Anwendungen",
      titleEN: "Clinical Hypnosis & Therapeutic Applications",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
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
      day: 4,
      icon: <Users className="w-6 h-6" />,
      titleDE: "Spezialtechniken und Zielgruppen",
      titleEN: "Special Techniques & Target Groups",
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600",
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
      day: 5,
      icon: <Heart className="w-6 h-6" />,
      titleDE: "Tiefentherapie und Transformation",
      titleEN: "Deep Therapy & Transformation",
      color: "bg-rose-50 border-rose-200",
      iconColor: "text-rose-600",
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
      day: 6,
      icon: <GraduationCap className="w-6 h-6" />,
      titleDE: "Praxisvertiefung und Supervision",
      titleEN: "Practice Deepening & Supervision",
      color: "bg-teal-50 border-teal-200",
      iconColor: "text-teal-600",
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

      {/* Hero */}
      <section className="bg-[#f4f3ef] py-12 md:py-16">
        <div className="container-main">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32] mb-3">
              {isEN ? "6-Day Intensive Training" : "6-Tage Intensiv-Ausbildung"}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B3A5C] mb-4" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Seminar Schedule" : "Seminarablauf"}
            </h1>
            <p className="text-lg text-[#55504f] leading-relaxed mb-6">
              {isEN
                ? "A comprehensive, practice-oriented curriculum developed over 40 years of clinical experience. Each day builds on the previous, combining theory with immediate hands-on application."
                : "Ein umfassendes, praxisorientiertes Curriculum, entwickelt aus über 40 Jahren klinischer Erfahrung. Jeder Tag baut auf dem vorherigen auf und verbindet Theorie mit sofortiger praktischer Anwendung."}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-[#55504f]">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#2E7D32]" /> {isEN ? "6 Days, 09:30–17:00" : "6 Tage, 09:30–17:00 Uhr"}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-[#2E7D32]" /> {isEN ? "350+ Page Manual" : "350+ Seiten Ausbildungsmappe"}</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#2E7D32]" /> Aktiv-Hypnose© Therapeuten-Diplom</span>
            </div>
          </div>
        </div>
      </section>

      {/* Day-by-Day Curriculum */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-main">
          <div className="max-w-4xl mx-auto space-y-6">
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
                    <h2 className="text-xl font-bold text-[#1B3A5C]">
                      {isEN ? day.titleEN : day.titleDE}
                    </h2>
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

      {/* Materials Included */}
      <section className="bg-[#f4f3ef] py-12 md:py-16">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-[#1B3A5C] text-center mb-8" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "What's Included" : "Im Preis enthalten"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              { num: "350+", labelDE: "Seiten Ausbildungsmappe", labelEN: "Page Training Manual" },
              { num: "150+", labelDE: "Seiten Beispieltexte", labelEN: "Pages Sample Scripts" },
              { num: "50+", labelDE: "Kurzvideos", labelEN: "Short Videos" },
              { num: "50+", labelDE: "Hypnose Audioaufnahmen", labelEN: "Hypnosis Audio Recordings" },
              { num: "1", labelDE: "Aktiv-Hypnose© Diplom", labelEN: "Aktiv-Hypnose© Diploma" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-border p-4 text-center rounded-lg">
                <p className="text-2xl font-bold text-[#2E7D32]">{item.num}</p>
                <p className="text-xs text-muted-foreground mt-1">{isEN ? item.labelEN : item.labelDE}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B3A5C] text-white py-12 md:py-16">
        <div className="container-main text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Ready to Start Your Training?" : "Bereit für Ihre Ausbildung?"}
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-6">
            {isEN
              ? "View upcoming seminar dates and secure your spot in the next intensive training."
              : "Sehen Sie die nächsten Seminartermine und sichern Sie sich Ihren Platz in der nächsten Intensiv-Ausbildung."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={getPath("training", language, country)}>
              <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-6 py-3">
                {isEN ? "View Seminar Dates" : "Seminartermine ansehen"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to={getPath("contact", language, country)}>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-6 py-3">
                {isEN ? "Free Discovery Call" : "Kostenloses Erstgespräch"}
              </Button>
            </Link>
          </div>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-6 text-white/60 hover:text-white/90 transition-colors text-sm">
            ★ 5.0/5 — 255 Google {isEN ? "Reviews" : "Bewertungen"}
          </a>
        </div>
      </section>
    </>
  );
}
