import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState, type ReactNode } from "react";

function BadgeCard({ children, label, info }: { children: ReactNode; label: ReactNode; info: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, [open]);
  return (
    <div
      ref={ref}
      onClick={() => setOpen((o) => !o)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="group relative bg-white border border-[#E8EDF3] py-3.5 md:py-4 px-2.5 md:px-3 rounded-xl text-center hover:shadow-md hover:border-[#D0DAE6] transition-all duration-300 flex flex-col items-center justify-between min-h-[108px] md:min-h-[128px] select-none cursor-default"
    >
      <div className="flex-1 flex items-center justify-center w-full">{children}</div>
      <h3 className="mt-2.5 md:mt-3 font-light text-[10px] md:text-xs text-[#1B3A5C] leading-tight tracking-tight select-none">{label}</h3>
      <div
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[200px] md:w-[220px] z-20 transition-all duration-200 ease-out ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
        }`}
      >
        <div className="bg-[#1B3A5C] text-white text-[11px] md:text-[11.5px] leading-snug font-light px-3 py-2 rounded-lg shadow-lg select-none">
          {info}
        </div>
      </div>
    </div>
  );
}

import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import davidPortrait from "@/assets/david-woods-portrait.webp";
import diplomNGHCertified from "@/assets/diplom-ngh-certified-instructor.webp";
import ImageLightbox from "@/components/ImageLightbox";
import licPsychSeal from "@/assets/lic-psych-seal.png";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, BookOpen, Tv, Users, Star, Globe, GraduationCap } from "lucide-react";

export default function UeberUns() {
  const { language, country, isSwiss, showCH } = useLanguage();
  const isEN = language === "en";

  return (
    <>
      <SEO {...pageSEO.about} pageKey="about" breadcrumbs={[
        { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
        { name: isEN ? "About Us" : "Über uns", path: getPath("about", language, country) },
      ]} />
      <Breadcrumbs items={[
        { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
        { name: isEN ? "About Us" : "Über uns", path: getPath("about", language, country) },
      ]} />

      {/* HERO — Compact premium executive profile (portrait + name + intro + stats unified) */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-5 md:py-7">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr_220px] gap-4 md:gap-5 lg:gap-6 items-stretch">
              {/* Portrait */}
              <div className="mx-auto md:mx-0 w-40 md:w-full">
                <div className="border border-[#E8EDF3] rounded-2xl overflow-hidden h-full">
                  <img
                    src={davidPortrait}
                    alt="David J. Woods – Lic.Psych., Hypnotherapeut und NGH International Trainer"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Name + intro */}
              <div className="text-center md:text-left flex flex-col justify-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2E7D32] mb-1.5">
                  {isEN ? "About" : "Über"}
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-[32px] font-light text-[#1B3A5C] leading-[1.1] mb-1.5 tracking-tight">
                  David J. Woods
                </h1>
                <p className="text-[13px] md:text-sm text-foreground/75 leading-snug mb-2">
                  Lic.&nbsp;Psych. · {isEN ? "Hypnotherapist" : "Hypnotherapeut"} · NGH International Trainer · {isEN ? "Developer of Aktiv-Hypnose®" : "Entwickler der Aktiv-Hypnose®"}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                  <span className="text-xs text-muted-foreground ml-1">5.0 (266) · Google</span>
                </div>
                <div className="hidden md:block h-px w-12 bg-[#1B3A5C]/20 mb-3" />
                <h2 className="text-base md:text-lg font-medium text-[#1B3A5C] mb-1.5 tracking-tight leading-snug">
                  {isEN ? "Psychology, Depth & Modern Hypnosis" : "Psychologie, Tiefe & moderne Hypnose"}
                </h2>
                <p className="text-[13.5px] md:text-sm text-foreground/85 leading-relaxed">
                  {isEN ? (
                    <><strong className="text-[#1B3A5C] font-semibold">David J. Woods</strong> integrates <strong className="text-[#1B3A5C] font-semibold">psychology</strong>, <strong className="text-[#1B3A5C] font-semibold">neurology</strong> and <strong className="text-[#1B3A5C] font-semibold">physiology</strong> with modern hypnosis — direct, structured, results-oriented. Over <strong className="text-[#1B3A5C] font-semibold">35+ years</strong> of clinical practice and <strong className="text-[#1B3A5C] font-semibold">30,000+ sessions</strong> form the basis of his proprietary method <strong className="text-[#1B3A5C] font-semibold">Aktiv-Hypnose©</strong>.</>
                  ) : (
                    <><strong className="text-[#1B3A5C] font-semibold">David J. Woods</strong> verbindet <strong className="text-[#1B3A5C] font-semibold">Psychologie</strong>, <strong className="text-[#1B3A5C] font-semibold">Neurologie</strong> und <strong className="text-[#1B3A5C] font-semibold">Physiologie</strong> mit moderner Hypnose — direkt, strukturiert, ergebnisorientiert. Über <strong className="text-[#1B3A5C] font-semibold">35+ Jahre</strong> klinische Praxis und <strong className="text-[#1B3A5C] font-semibold">30.000+ Sitzungen</strong> bilden die Grundlage seiner Methode <strong className="text-[#1B3A5C] font-semibold">Aktiv-Hypnose©</strong>.</>
                  )}
                </p>
                {showCH && (
                  <div className="hidden md:block mt-3 bg-[#E8F5E9] border border-[#81C784] rounded-lg px-3 py-2">
                    <p className="text-[12.5px] font-semibold text-[#2E7D32]">EMR Krankenkasse Konform · ZSR Nr. P609264</p>
                  </div>
                )}
              </div>

              {/* Stats — compact column on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-2 lg:h-full">
                {[
                  { Icon: Award, val: "35+", label: isEN ? "Years Experience" : "Jahre Erfahrung" },
                  { Icon: Users, val: "30.000+", label: isEN ? "Sessions" : "Sitzungen" },
                  { Icon: GraduationCap, val: isEN ? "2,500+" : "2.500+", label: isEN ? "Trained Hypnotists" : "ausgeb. Hypnotiseure" },
                  { Icon: Tv, val: "30+", label: isEN ? "TV & Media" : "TV & Medien" },
                ].map(({ Icon, val, label }, i) => (
                  <div key={i} className="bg-gradient-to-br from-white to-[#F1F4F7] border border-[#E8EDF3] rounded-lg px-2.5 py-2 lg:py-2.5 text-center lg:text-left shadow-[0_1px_4px_rgba(27,58,92,0.04)] lg:flex lg:items-center lg:gap-2.5 lg:flex-1">
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-[#1B3A5C] mx-auto lg:mx-0 mb-0.5 lg:mb-0 flex-shrink-0" strokeWidth={1.6} />
                    <div>
                      <p className="text-base lg:text-lg font-semibold text-[#1B3A5C] leading-none">{val}</p>
                      <p className="text-[10px] lg:text-[11px] text-muted-foreground mt-0.5 leading-tight">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIPLOMAS & CERTIFICATIONS — silver-grey banner */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-7">
            <div className="text-center mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2E7D32] mb-2">
                {isEN ? "Credentials" : "Qualifikationen"}
              </p>
              <h2 className="text-lg sm:text-xl md:text-2xl font-light text-[#1B3A5C] mb-2 tracking-tight">
                {isEN ? "Diplomas & Certifications" : "Diplome & Zertifizierungen"}
              </h2>
              <div className="mx-auto h-px w-12 bg-[#1B3A5C]/25" />
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 mb-5">
              <BadgeCard
                label="NGH International Trainer"
                info={isEN ? "Certified trainer of the National Guild of Hypnotists (USA) — the world's largest hypnosis association." : "Zertifizierter Ausbilder der National Guild of Hypnotists (USA) — weltweit größter Hypnose-Berufsverband."}
              >
                <img src={CDN.nghBadge} alt="NGH International Trainer Zertifikat" className="h-9 md:h-12 mx-auto" loading="lazy" />
              </BadgeCard>
              <BadgeCard
                label="EMR Konform"
                info={isEN ? "Recognized by EMR (ZSR P609264) — eligible for reimbursement by Swiss complementary health insurance." : "Vom EMR anerkannt (ZSR P609264) — von Schweizer Zusatzversicherungen erstattungsfähig."}
              >
                <img src={CDN.emrBadge} alt="EMR Krankenkasse Konform Badge" className="h-9 md:h-12 mx-auto" loading="lazy" />
              </BadgeCard>
              <BadgeCard
                label={<>Lic. Psych.<br /><span className="text-[9px] md:text-[11px] tracking-[0.04em]">UNAM</span></>}
                info={isEN ? "Licensed Psychologist — UNAM, one of Latin America's most renowned universities." : "Lizenzierter Psychologe — UNAM, eine der renommiertesten Universitäten Lateinamerikas."}
              >
                <img src={licPsychSeal} alt="Lic. Psych. – Academic Seal" className="h-11 md:h-[53px] w-11 md:w-[53px] object-contain mx-auto" style={{ filter: "brightness(1.28) contrast(1.22) saturate(1.17)" }} loading="lazy" width={512} height={512} />
              </BadgeCard>
              <BadgeCard
                label={isEN ? "Aktiv-Hypnose© Developer" : "Entwickler Aktiv-Hypnose©"}
                info={isEN ? "Developer of the proprietary Aktiv-Hypnose© method — actively engaging body and emotions during the session." : "Entwickler der eigenständigen Methode Aktiv-Hypnose© — mit aktiver Einbindung von Körper und Emotionen."}
              >
                <img src={CDN.logo} alt="Aktiv-Hypnose© Logo" className="h-7 md:h-10 mx-auto" loading="lazy" />
              </BadgeCard>
              <BadgeCard
                label={isEN ? "Author & Specialist" : "Autor & Fachautor"}
                info={isEN ? "Author of specialist books and articles on hypnosis, change work and behavior patterns." : "Autor von Fachbüchern und Beiträgen zu Hypnose, Veränderungsarbeit und Verhaltensmustern."}
              >
                <div className="w-9 h-9 md:w-12 md:h-12 bg-[#2E7D32] rounded-lg flex items-center justify-center mx-auto">
                  <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </BadgeCard>
              <BadgeCard
                label={isEN ? "TV Expert & Media" : "TV-Experte & Medien"}
                info={isEN ? "Regular media expert on hypnosis — featured in television, radio and print across DACH." : "Gefragter Medienexperte zum Thema Hypnose — vertreten in TV, Radio und Print im DACH-Raum."}
              >
                <div className="w-9 h-9 md:w-12 md:h-12 bg-[#1B3A5C] rounded-lg flex items-center justify-center mx-auto">
                  <Tv className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </BadgeCard>
            </div>


            {/* Bekannt aus — full color, more visible */}
            <div className="bg-white border border-[#E8EDF3] rounded-2xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1B3A5C] mb-3 text-center">
                {isEN ? "As Seen On" : "Bekannt aus"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {CDN.bekanntAus.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`David J. Woods bekannt aus TV und Medien – Logo ${i + 1}`}
                    className="h-8 sm:h-10 w-auto opacity-100 hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW — premium executive profile, compact */}
      <section className="bg-[#F1F4F7] border-b border-[#E2E8EE]">
        <div className="container-main py-7 md:py-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6 md:mb-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2E7D32] mb-2">
                {isEN ? "Professional Profile" : "Professionelles Profil"}
              </p>
              <h2 className="text-xl sm:text-2xl md:text-[28px] font-light text-[#1B3A5C] tracking-tight leading-tight">
                {isEN ? "A Brief Overview of David J. Woods" : "Ein kurzer Überblick zu David J. Woods"}
              </h2>
              <div className="mx-auto mt-3 h-px w-12 bg-[#1B3A5C]/25" />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-fr">
              {[
                {
                  num: "01",
                  icon: Globe,
                  accent: "#1B3A5C",
                  tint: "bg-[#EEF2F7]",
                  title: isEN ? "International Background" : "Internationaler Werdegang",
                  body: isEN ? (
                    <>Born in London. Studied psychology at <strong className="text-[#1B3A5C] font-semibold">UNAM</strong> (Mexico), in <strong className="text-[#1B3A5C] font-semibold">Boston</strong>, <strong className="text-[#1B3A5C] font-semibold">San Francisco</strong> and <strong className="text-[#1B3A5C] font-semibold">Cambridge</strong>, followed by international training as hypnotist and trainer. Today active in <strong className="text-[#1B3A5C] font-semibold">Germany</strong>, <strong className="text-[#1B3A5C] font-semibold">Switzerland</strong> and internationally — including <strong className="text-[#1B3A5C] font-semibold">Dubai</strong>.</>
                  ) : (
                    <>Geboren in London. Psychologiestudium an der <strong className="text-[#1B3A5C] font-semibold">UNAM</strong> (Mexiko) sowie in <strong className="text-[#1B3A5C] font-semibold">Boston</strong>, <strong className="text-[#1B3A5C] font-semibold">San Francisco</strong> und <strong className="text-[#1B3A5C] font-semibold">Cambridge</strong>, gefolgt von internationalen Ausbildungen zum Hypnotiseur und Trainer. Heute tätig in <strong className="text-[#1B3A5C] font-semibold">Deutschland</strong>, der <strong className="text-[#1B3A5C] font-semibold">Schweiz</strong> und international — u.a. in <strong className="text-[#1B3A5C] font-semibold">Dubai</strong>.</>
                  ),
                },
                {
                  num: "02",
                  icon: GraduationCap,
                  accent: "#1B3A5C",
                  tint: "bg-[#EEF2F7]",
                  title: isEN ? "Training across 3 Continents" : "Ausbildung auf 3 Kontinenten",
                  body: isEN ? (
                    <>Several years of practical training in hypnosis institutes across <strong className="text-[#1B3A5C] font-semibold">3 continents</strong> — South America, England and Germany. Fluent in German, English and Spanish, combining international practical knowledge in one person.</>
                  ) : (
                    <>Mehrjährige praktische Ausbildung in Hypnose-Instituten auf <strong className="text-[#1B3A5C] font-semibold">3 Kontinenten</strong> — Südamerika, England und Deutschland. Spricht fließend Deutsch, Englisch und Spanisch und vereint internationales Praxiswissen in einer Person.</>
                  ),
                },
                {
                  num: "03",
                  icon: Award,
                  accent: "#2E7D32",
                  tint: "bg-[#ECF3EE]",
                  title: isEN ? "NGH Certified Trainer" : "Zertifizierter NGH-Ausbilder",
                  body: isEN ? (
                    <>Certified <strong className="text-[#1B3A5C] font-semibold">NGH-Trainer</strong> of the National Guild of Hypnotists — the world's largest hypnosis association. Trains participants in his Aktiv-Hypnose© method to become certified "Therapists in Aktiv-Hypnose©" in Augsburg and near Zurich.</>
                  ) : (
                    <>Zertifizierter <strong className="text-[#1B3A5C] font-semibold">NGH-Ausbilder</strong> der National Guild of Hypnotists – des weltweit größten Hypnose-Verbands. Bildet Teilnehmer in seiner Aktiv-Hypnose© Methode zu „Therapeuten in Aktiv-Hypnose©" aus – in Augsburg und bei Zürich.</>
                  ),
                },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <article
                    key={i}
                    className="group relative bg-white border border-[#E2E8EE] rounded-2xl p-5 md:p-6 flex flex-col shadow-[0_1px_2px_rgba(27,58,92,0.04)] transition-all duration-300 md:hover:-translate-y-0.5 md:hover:shadow-[0_8px_28px_rgba(27,58,92,0.08)] md:hover:border-[#CBD5E1]"
                  >
                    <span className="absolute top-5 right-5 text-[10px] font-semibold tracking-[0.2em] text-[#1B3A5C]/30">
                      {card.num}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${card.tint} flex items-center justify-center mb-4`}>
                      <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} style={{ color: card.accent }} />
                    </div>
                    <h3 className="text-[15px] md:text-base font-medium text-[#1B3A5C] leading-snug tracking-tight mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[13.5px] md:text-sm text-foreground/80 leading-[1.7]">
                      {card.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* GOAL — A happy, conscious, free life — concise */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 lg:gap-8 items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2E7D32] mb-2">
                  {isEN ? "The Goal" : "Das Ziel"}
                </p>
                <h2 className="text-xl sm:text-2xl md:text-[26px] font-light text-[#1B3A5C] mb-3 tracking-tight leading-tight">
                  {isEN ? "A Happy, Conscious and Free Life" : "Ein glückliches, bewusstes und freies Leben"}
                </h2>
                <p className="text-sm md:text-[15px] text-foreground leading-relaxed mb-4">
                  {isEN ? (
                    <>A psychologically and neuroscientifically grounded approach. <strong className="text-[#1B3A5C] font-semibold">Aktiv-Hypnose©</strong> as a precise tool to resolve patterns at their root — efficient, clear, lasting.</>
                  ) : (
                    <>Ein psychologisch und neurowissenschaftlich fundierter Ansatz. Die <strong className="text-[#1B3A5C] font-semibold">Aktiv-Hypnose©</strong> als präzises Werkzeug, um Muster an der Wurzel zu lösen — effizient, klar, nachhaltig.</>
                  )}
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13px] md:text-sm text-foreground/85">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-[#2E7D32] flex-shrink-0" />{isEN ? "Clinical experience" : "Klinische Erfahrung"}</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-[#2E7D32] flex-shrink-0" />{isEN ? "Modern hypnosis methods" : "Moderne Hypnosemethoden"}</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-[#2E7D32] flex-shrink-0" />{isEN ? "Direct, proven approach" : "Direkter, bewährter Ansatz"}</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-[#2E7D32] flex-shrink-0" />{isEN ? "Lasting results" : "Nachhaltige Ergebnisse"}</li>
                </ul>
              </div>
              <div className="mx-auto lg:mx-0 w-44 lg:w-full">
                <ImageLightbox
                  src={diplomNGHCertified}
                  alt="NGH Certified Instructor — David Woods"
                  className="w-full h-auto border border-[#E8EDF3] rounded-xl"
                />
                <p className="mt-2 text-[11px] text-center text-muted-foreground tracking-wide">
                  NGH Certified Instructor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KATHRYN — premium banner, image height matches text */}
      <section className="bg-[#F8FAFC] border-b border-[#E8EDF3]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-7">
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-5 md:gap-7 items-stretch">
              <div className="mx-auto md:mx-0 w-56 md:w-full">
                <div className="border border-[#E8EDF3] rounded-2xl overflow-hidden h-full flex flex-col">
                  <img
                    src={CDN.kathrynPortrait}
                    alt="Kathryn - Psychologische Beraterin"
                    className="w-full h-auto object-cover flex-1"
                    loading="lazy"
                  />
                  <div className="p-3 bg-[#F1F4F7]">
                    <h3 className="font-light text-[#1B3A5C] text-sm tracking-tight">Kathryn</h3>
                    <p className="text-xs text-muted-foreground">
                      {isEN ? "Psychological Counselor" : "Psychologische Beraterin"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isEN ? "Certified Hypnotherapist" : "Zertifizierte Hypnotiseurin"}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-light text-[#1B3A5C] mb-1 tracking-tight">
                  Kathryn
                </h2>
                <p className="text-xs md:text-sm font-medium text-[#2E7D32] mb-3">
                  {isEN
                    ? "Psychological Counselor & Certified Hypnotherapist · Children/Adolescents & Hypno-Birthing"
                    : "Psychologische Beraterin & Zertifizierte Hypnotiseurin · Kinder/Jugendliche & Hypno-Birthing"}
                </p>
                <p className="text-sm md:text-base text-foreground leading-relaxed mb-2.5">
                  {isEN
                    ? "Over many years, Kathryn has intensively studied psychology and personality development, with a focus on educational work with children and adolescents. She completed numerous training programs in NLP and mental coaching, and was personally trained as a Master Hypnotist by David J. Woods."
                    : "Über viele Jahre setzte sich Kathryn intensiv mit Psychologie und Persönlichkeitsentwicklung auseinander, mit Schwerpunkt auf der pädagogischen Arbeit mit Kindern und Jugendlichen. Sie absolvierte zahlreiche Ausbildungen in NLP und Mental Coaching und wurde von David J. Woods persönlich zur Master-Hypnotiseurin ausgebildet."}
                </p>
                <p className="text-sm md:text-base text-foreground leading-relaxed mb-2.5">
                  {isEN
                    ? "Kathryn is multilingual, speaking fluent Russian and German as well as excellent English. In our practice, she is your competent contact for Hypno-Birthing as well as hypnosis sessions specifically for children and adolescents."
                    : "Kathryn ist mehrsprachig aufgewachsen und spricht fließend Russisch und Deutsch sowie sehr gutes Englisch. In unserer Praxis ist sie Ihre kompetente Ansprechpartnerin für Hypno-Birthing sowie für Hypnosesitzungen speziell bei Kindern und Jugendlichen."}
                </p>
                <p className="text-sm md:text-base text-foreground leading-relaxed mb-2.5">
                  {isEN
                    ? "Through her empathetic, structured and clear approach, she quickly builds trust and ensures that even young people feel safe and understood during hypnosis. As David J. Woods' partner, Kathryn is responsible for the structured operations of the institute."
                    : "Durch ihre einfühlsame, strukturierte und klare Art schafft sie schnell Vertrauen und sorgt dafür, dass sich auch junge Menschen bei der Hypnose sicher und verstanden fühlen. Als Lebensgefährtin von David J. Woods ist Kathryn für den strukturierten Ablauf des Instituts verantwortlich."}
                </p>
                <p className="text-sm md:text-base text-foreground leading-relaxed mb-4">
                  {isEN
                    ? "With her psychological expertise, pedagogical experience and knowledge of homeopathy, Kathryn enriches the team and strengthens the holistic focus of our work. She also serves as a lecturer in our hypnosis training programs."
                    : "Mit ihrer psychologischen Expertise, pädagogischen Erfahrung und ihrem Wissen in Homöopathie bereichert Kathryn das Team und stärkt den ganzheitlichen Schwerpunkt unserer Arbeit. Darüber hinaus steht sie als Dozentin in unseren Hypnoseausbildungen zur Seite."}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {[
                    isEN ? "Children & Adolescents" : "Kinder & Jugendliche",
                    "Hypno-Birthing",
                    "NLP",
                    "Mental Coaching",
                    isEN ? "Master Hypnotist" : "Master-Hypnotiseurin",
                    isEN ? "Homeopathy" : "Homöopathie",
                  ].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-[#F1F4F7] text-xs font-medium text-[#1B3A5C] border border-[#E8EDF3] rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to={`${getPath("contact", language, country)}?concern=children`}>
                  <Button className="bg-[#c8e6c9] hover:bg-[#a5d6a7] text-[#1B3A1F] font-medium px-5 py-2.5">
                    {isEN ? "Consult with Kathryn" : "Von Kathryn beraten lassen"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENTIFIC FOUNDATION — compact silver banner */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-6 md:py-8">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-6">
            <h2 className="text-base sm:text-lg md:text-xl font-light text-[#1B3A5C] mb-3 tracking-tight">
              {isEN ? "Scientific Foundation & Methodology" : "Wissenschaftliche Grundlage & Methodik"}
            </h2>
            <div className="space-y-2.5 text-sm text-foreground leading-relaxed">
              <p>
                {isEN
                  ? "David J. Woods' Aktiv-Hypnose© method integrates clinical hypnotherapy with evidence-based psychological principles. A meta-analysis by Kirsch, Montgomery & Sapirstein (1995) in the Journal of Consulting and Clinical Psychology showed that adding hypnosis to CBT improved treatment outcomes by an average of 70%."
                  : "David J. Woods' Aktiv-Hypnose© Methode integriert klinische Hypnotherapie mit evidenzbasierten psychologischen Prinzipien. Eine Meta-Analyse von Kirsch, Montgomery & Sapirstein (1995) im Journal of Consulting and Clinical Psychology zeigte, dass die Ergänzung von KVT durch Hypnose die Behandlungsergebnisse um durchschnittlich 70 % verbesserte."}
              </p>
              <p>
                {isEN
                  ? "The WHO recognizes hypnotherapy as a valid therapeutic approach. The German Scientific Advisory Council on Psychotherapy confirmed the scientific evidence for clinical hypnosis and hypnotherapy in 2006."
                  : "Die WHO anerkennt Hypnotherapie als validen therapeutischen Ansatz. Der Wissenschaftliche Beirat Psychotherapie (WBP) bestätigte 2006 die wissenschaftliche Evidenz für klinische Hypnose und Hypnotherapie."}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {isEN
                  ? "Sources: Kirsch, Montgomery & Sapirstein, Journal of Consulting and Clinical Psychology, 63(2), 1995; WHO ICD-11; Wissenschaftlicher Beirat Psychotherapie, Gutachten 2006."
                  : "Quellen: Kirsch, Montgomery & Sapirstein, Journal of Consulting and Clinical Psychology, 63(2), 1995; WHO ICD-11; Wissenschaftlicher Beirat Psychotherapie, Gutachten 2006."}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA — Next Step */}
      <section className="bg-[#E8EDF3] py-4 md:py-6">
        <div className="container-main">
          <div className="relative max-w-2xl mx-auto bg-white border border-[#E8EDF3] rounded-2xl px-6 py-5 md:px-10 md:py-6 text-center shadow-[0_4px_20px_rgba(27,58,92,0.06)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1B3A5C] text-white text-xs font-semibold px-4 py-1 rounded-full tracking-wide uppercase">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </div>
            <h2 className="text-xl md:text-2xl font-light text-[#1B3A5C] mb-2 tracking-tight">
              {isEN ? "Ready for Lasting Change?" : "Bereit für nachhaltige Veränderung?"}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-3">
              {isEN
                ? "Arrange a non-binding telephone consultation. We take time for your concern and advise you individually."
                : "Vereinbaren Sie eine unverbindliche telefonische Erstberatung. Wir nehmen uns Zeit für Ihr Anliegen und beraten Sie individuell."}
            </p>
            <Link to={getPath("contact", language, country)}>
              <Button className="bg-[#c8e6c9] hover:bg-[#a5d6a7] text-[#1B3A1F] font-medium px-7 py-3">
                {isEN ? "Request Consultation" : "Beratung anfragen"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
