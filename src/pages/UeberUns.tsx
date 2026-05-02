import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import davidPortrait from "@/assets/david-woods-portrait.webp";
import diplomNGHCertified from "@/assets/diplom-ngh-certified-instructor.webp";
import ImageLightbox from "@/components/ImageLightbox";
import licPsychSeal from "@/assets/lic-psych-seal.png";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, BookOpen, Tv, Users, Star, Globe, GraduationCap, Sparkles } from "lucide-react";

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

      {/* HERO — Premium silver-grey banner with portrait integrated */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-6 md:py-8 lg:py-10">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-7">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-5 md:gap-7 items-center">
              <div className="mx-auto md:mx-0 w-44 md:w-full">
                <div className="border border-[#E8EDF3] rounded-2xl overflow-hidden">
                  <img
                    src={davidPortrait}
                    alt="David J. Woods – Lic.Psych., Hypnotherapeut und NGH International Trainer"
                    className="w-full h-auto object-cover"
                    loading="eager"
                  />
                </div>
              </div>
              <div className="text-center md:text-left">
                <p className="text-xs font-medium text-[#2E7D32] uppercase tracking-wider mb-2">
                  {isEN ? "About" : "Über"}
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1B3A5C] leading-tight mb-2 tracking-tight">
                  David J. Woods
                </h1>
                <p className="text-sm md:text-base text-foreground/80 leading-snug mb-3">
                  Lic.&nbsp;Psych. · {isEN ? "Hypnotherapist" : "Hypnotherapeut"} · NGH International Trainer · {isEN ? "Developer of Aktiv-Hypnose®" : "Entwickler der Aktiv-Hypnose®"}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                  <span className="text-xs text-muted-foreground ml-1">5.0 (266) · Google</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO + STATS — text left, badges right, soft silver background */}
      <section className="bg-[#F8FAFC] border-b border-[#E8EDF3]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-6 lg:gap-8 items-stretch">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-light text-[#1B3A5C] mb-3 tracking-tight">
                  {isEN ? "Psychology, Depth & Modern Coaching" : "Psychologie, Tiefe & modernes Coaching"}
                </h2>
                <p className="text-sm md:text-base text-foreground leading-relaxed mb-3">
                  {isEN
                    ? "David J. Woods combines psychological expertise, physiological depth, and modern coaching techniques into a method that works: clear, efficient, and solution-oriented. Instead of superficial motivation, it's about real inner strength, mental stability, and conscious self-leadership."
                    : "David J. Woods vereint psychologisches Fachwissen, physiologische Tiefe und moderne Coaching-Techniken zu einer Methode, die wirkt: klar, effizient und lösungsorientiert. Statt oberflächlicher Motivation geht es um echte innere Stärke, mentale Stabilität und bewusste Selbstführung."}
                </p>
                <p className="text-sm md:text-base text-foreground leading-relaxed mb-3">
                  {isEN
                    ? "With over 35+ years of experience and more than 30,000 sessions, he is among the most experienced hypnotherapists in the DACH region. As an NGH International Trainer and developer of the Aktiv-Hypnose© method, he has supported thousands of people in achieving lasting change."
                    : "Mit über 35+ Jahren Erfahrung und mehr als 30.000 Sitzungen gehört er zu den erfahrensten Hypnotherapeuten im DACH-Raum. Als NGH International Trainer und Entwickler der Aktiv-Hypnose© Methode hat er Tausenden von Menschen geholfen, nachhaltige Veränderung zu erreichen."}
                </p>
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  {isEN
                    ? "His approach is based on the conviction that real change begins in the subconscious — whether stopping smoking, overcoming anxiety, weight management or stress reduction."
                    : "Sein Ansatz basiert auf der Überzeugung, dass echte Veränderung im Unterbewusstsein beginnt – ob Raucherentwöhnung, Angstbewältigung, Gewichtsmanagement oder Stressreduktion."}
                </p>
                {showCH && (
                  <div className="hidden md:block mt-4 bg-[#E8F5E9] border border-[#81C784] rounded-xl p-3">
                    <p className="text-sm font-semibold text-[#2E7D32]">EMR Krankenkasse Konform · ZSR Nr. P609264</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Viele Schweizer Zusatzversicherungen übernehmen einen Teil der Kosten.</p>
                  </div>
                )}
              </div>

              {/* Stats — 2x2 mobile, balanced 1-column on desktop to fully fill right side */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 md:gap-3 lg:h-full lg:content-stretch">
                <div className="bg-gradient-to-br from-white to-[#F1F4F7] border border-[#E8EDF3] rounded-xl p-3 lg:p-4 text-center lg:text-left shadow-[0_2px_8px_rgba(27,58,92,0.04)] lg:flex lg:items-center lg:gap-4 lg:flex-1">
                  <Award className="w-5 h-5 lg:w-7 lg:h-7 text-[#1B3A5C] mx-auto lg:mx-0 mb-1 lg:mb-0 flex-shrink-0" />
                  <div>
                    <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#1B3A5C] leading-none">35+</p>
                    <p className="text-[0.7rem] md:text-xs lg:text-sm text-muted-foreground mt-1">{isEN ? "Years Experience" : "Jahre Erfahrung"}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-[#F1F4F7] border border-[#E8EDF3] rounded-xl p-3 lg:p-4 text-center lg:text-left shadow-[0_2px_8px_rgba(27,58,92,0.04)] lg:flex lg:items-center lg:gap-4 lg:flex-1">
                  <Users className="w-5 h-5 lg:w-7 lg:h-7 text-[#1B3A5C] mx-auto lg:mx-0 mb-1 lg:mb-0 flex-shrink-0" />
                  <div>
                    <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#1B3A5C] leading-none">30.000+</p>
                    <p className="text-[0.7rem] md:text-xs lg:text-sm text-muted-foreground mt-1">{isEN ? "Sessions" : "Sitzungen"}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-[#F1F4F7] border border-[#E8EDF3] rounded-xl p-3 lg:p-4 text-center lg:text-left shadow-[0_2px_8px_rgba(27,58,92,0.04)] lg:flex lg:items-center lg:gap-4 lg:flex-1">
                  <GraduationCap className="w-5 h-5 lg:w-7 lg:h-7 text-[#1B3A5C] mx-auto lg:mx-0 mb-1 lg:mb-0 flex-shrink-0" />
                  <div>
                    <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#1B3A5C] leading-none">{isEN ? "2,500+" : "2.500+"}</p>
                    <p className="text-[0.7rem] md:text-xs lg:text-sm text-muted-foreground mt-1">{isEN ? "Trained Hypnotists" : "ausgebildete Hypnotiseure"}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-[#F1F4F7] border border-[#E8EDF3] rounded-xl p-3 lg:p-4 text-center lg:text-left shadow-[0_2px_8px_rgba(27,58,92,0.04)] lg:flex lg:items-center lg:gap-4 lg:flex-1">
                  <Tv className="w-5 h-5 lg:w-7 lg:h-7 text-[#1B3A5C] mx-auto lg:mx-0 mb-1 lg:mb-0 flex-shrink-0" />
                  <div>
                    <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#1B3A5C] leading-none">30+</p>
                    <p className="text-[0.7rem] md:text-xs lg:text-sm text-muted-foreground mt-1">{isEN ? "TV & Media" : "TV- & Medienauftritte"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIPLOMAS & CERTIFICATIONS — silver-grey banner */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-7">
            <div className="text-center mb-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-light text-[#1B3A5C] mb-1 tracking-tight">
                {isEN ? "Diplomas & Certifications" : "Diplome & Zertifizierungen"}
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                {isEN
                  ? "Internationally recognized certifications and professional qualifications."
                  : "International anerkannte Zertifizierungen und berufliche Qualifikationen."}
              </p>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 mb-5">
              <div className="bg-white border border-[#E8EDF3] p-2.5 md:p-3 rounded-xl text-center">
                <img src={CDN.nghBadge} alt="NGH International Trainer Zertifikat" className="h-9 md:h-12 mx-auto mb-1.5" loading="lazy" />
                <h3 className="font-light text-[10px] md:text-xs text-[#1B3A5C] leading-tight tracking-tight">NGH International Trainer</h3>
              </div>
              <div className="bg-white border border-[#E8EDF3] p-2.5 md:p-3 rounded-xl text-center">
                <img src={CDN.emrBadge} alt="EMR Krankenkasse Konform Badge" className="h-9 md:h-12 mx-auto mb-1.5" loading="lazy" />
                <h3 className="font-light text-[10px] md:text-xs text-[#1B3A5C] leading-tight tracking-tight">EMR Konform</h3>
              </div>
              <div className="bg-white border border-[#E8EDF3] p-2.5 md:p-3 rounded-xl text-center">
                <img src={licPsychSeal} alt="Lic. Psych. – Academic Seal" className="h-10 md:h-12 w-10 md:w-12 object-contain mx-auto mb-1.5" loading="lazy" width={512} height={512} />
                <h3 className="font-light text-[10px] md:text-xs text-[#1B3A5C] leading-tight tracking-tight">{isEN ? "Licensed Psychologist" : "Lizenzierter Psychologe"}</h3>
              </div>
              <div className="bg-white border border-[#E8EDF3] p-2.5 md:p-3 rounded-xl text-center">
                <img src={CDN.logo} alt="Aktiv-Hypnose© Logo" className="h-7 md:h-10 mx-auto mb-1.5" loading="lazy" />
                <h3 className="font-light text-[10px] md:text-xs text-[#1B3A5C] leading-tight tracking-tight">{isEN ? "Aktiv-Hypnose© Developer" : "Entwickler Aktiv-Hypnose©"}</h3>
              </div>
              <Link to={getPath("book", language, country)} className="bg-white border border-[#E8EDF3] p-2.5 md:p-3 rounded-xl text-center hover:shadow-md transition-shadow group">
                <div className="w-9 h-9 md:w-12 md:h-12 bg-[#2E7D32] rounded-lg flex items-center justify-center mx-auto mb-1.5">
                  <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="font-light text-[10px] md:text-xs text-[#1B3A5C] leading-tight group-hover:text-[#2E7D32] transition-colors tracking-tight">{isEN ? "Author & Specialist" : "Autor & Fachautor"}</h3>
              </Link>
              <Link to={getPath("media", language, country)} className="bg-white border border-[#E8EDF3] p-2.5 md:p-3 rounded-xl text-center hover:shadow-md transition-shadow group">
                <div className="w-9 h-9 md:w-12 md:h-12 bg-[#1B3A5C] rounded-lg flex items-center justify-center mx-auto mb-1.5">
                  <Tv className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="font-light text-[10px] md:text-xs text-[#1B3A5C] leading-tight group-hover:text-[#2E7D32] transition-colors tracking-tight">{isEN ? "TV Expert & Media" : "TV-Experte & Medien"}</h3>
              </Link>
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

      {/* OVERVIEW — content blocks instead of long flowing text */}
      <section className="bg-[#F8FAFC] border-b border-[#E8EDF3]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-7">
            <div className="text-center mb-5">
              <h2 className="text-lg sm:text-xl md:text-2xl font-light text-[#1B3A5C] mb-1 tracking-tight">
                {isEN ? "A Brief Overview of David J. Woods" : "Ein kurzer Überblick zu David J. Woods"}
              </h2>
              <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
                {isEN
                  ? "From early fascination in London to international training and certified expertise."
                  : "Von früher Faszination in London bis zu internationaler Ausbildung und zertifizierter Expertise."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {/* Card 1 — Overview */}
              <div className="bg-white border border-[#E8EDF3] rounded-2xl p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#1B3A5C]/10 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-[#1B3A5C]" />
                  </div>
                  <h3 className="text-sm font-light text-[#1B3A5C] leading-tight tracking-tight">
                    {isEN ? "International Background" : "Internationaler Werdegang"}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-foreground leading-relaxed">
                  {isEN
                    ? "Born in London. Studied psychology in Mexico (UNAM), the USA (Boston) and Great Britain (Cambridge), followed by international training as a hypnotist and hypnosis trainer. Today active in Germany, Switzerland and internationally, including Dubai."
                    : "Geboren in London. Psychologiestudium in Mexiko (UNAM), den USA (Boston) und Großbritannien (Cambridge), gefolgt von internationalen Ausbildungen zum Hypnotiseur und Hypnose-Trainer. Heute tätig in Deutschland, der Schweiz und international, u.a. in Dubai."}
                </p>
              </div>

              {/* Card 2 — Early Interest */}
              <div className="bg-white border border-[#E8EDF3] rounded-2xl p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2E7D32]/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#2E7D32]" />
                  </div>
                  <h3 className="text-sm font-light text-[#1B3A5C] leading-tight tracking-tight">
                    {isEN ? "Early Interest in Hypnosis" : "Frühes Interesse für Hypnose"}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-foreground leading-relaxed">
                  {isEN
                    ? "Already fascinated by hypnosis and hypnotherapy in his childhood in England. As a teenager he gained his first experiences and later engaged intensively with depth psychology and various coaching methods."
                    : "Bereits in seiner Kindheit in England war David J. Woods von Hypnose und Hypnosetherapie fasziniert. Als Jugendlicher sammelte er erste Erfahrungen und befasste sich später intensiv mit Tiefenpsychologie und verschiedenen Coaching-Methoden."}
                </p>
              </div>

              {/* Card 3 — Training */}
              <div className="bg-white border border-[#E8EDF3] rounded-2xl p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#1B3A5C]/10 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-[#1B3A5C]" />
                  </div>
                  <h3 className="text-sm font-light text-[#1B3A5C] leading-tight tracking-tight">
                    {isEN ? "Training in 3 Continents" : "Ausbildung auf 3 Kontinenten"}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-foreground leading-relaxed">
                  {isEN
                    ? "Several years of practical training in hypnosis institutes in South America, England and Germany. Fluent in German, English and Spanish — combining international practical knowledge in one person."
                    : "Mehrjährige praktische Ausbildung in Hypnose-Instituten in Südamerika, England und Deutschland. Spricht fließend Deutsch, Englisch und Spanisch und vereint internationales Praxiswissen in einer Person."}
                </p>
              </div>

              {/* Card 4 — NGH Certified Trainer */}
              <div className="bg-white border border-[#E8EDF3] rounded-2xl p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2E7D32]/10 flex items-center justify-center">
                    <Award className="w-4 h-4 text-[#2E7D32]" />
                  </div>
                  <h3 className="text-sm font-light text-[#1B3A5C] leading-tight tracking-tight">
                    {isEN ? "NGH Certified Trainer" : "Zertifizierter NGH-Ausbilder"}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-foreground leading-relaxed">
                  {isEN
                    ? "Certified hypnosis trainer of the National Guild of Hypnotists — the world's largest hypnosis association. Trains participants in his proprietary Aktiv-Hypnose© method to become certified 'Therapists in Aktiv-Hypnose©' in Augsburg and near Zurich."
                    : `Zertifizierter Hypnose-Ausbilder der National Guild of Hypnotists – des weltweit größten Hypnose-Verbands. Bildet Teilnehmer in seiner Aktiv-Hypnose© Methode zu „Therapeuten in Aktiv-Hypnose©" aus – in Augsburg und bei Zürich.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOAL — A happy, conscious, free life — compacted */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2E7D32] mb-1.5">
              {isEN ? "The Goal:" : "Das Ziel:"}
            </p>
            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-[#1B3A5C] mb-4 tracking-tight">
              {isEN ? "A Happy, Conscious and Free Life" : "Ein glückliches, bewusstes und freies Leben"}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-5 lg:gap-7 items-start">
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {isEN
                  ? "With his psychological and neuroscientific background, David Woods practices a very modern hypnosis approach and developed the 'Aktiv-Hypnose©'. He sees hypnosis as a simple but extremely effective tool to resolve problem situations and improve quality of life for his clients in the shortest time. His goal is to help people live more happily, consciously and freely. The successes are reported by television, newspapers and many clients on our website."
                  : `Vor seinem psychologischen und neurowissenschaftlichen Hintergrund praktiziert David Woods einen sehr modernen Hypnose-Ansatz und entwickelte die „Aktiv-Hypnose©". Er betrachtet Hypnose als ein einfaches, aber extrem wirkungsvolles Werkzeug, um bei seinen Klienten in kürzester Zeit Problemsituationen aufzulösen und die Lebensqualität zu verbessern. Sein Ziel ist es, Menschen dabei zu helfen, ihr Leben glücklicher, bewusster und freier zu gestalten. Über die Erfolge berichten Fernsehsendungen, Zeitungen und viele Klienten auf unserer Website.`}
              </p>
              <div className="mx-auto lg:mx-0 w-52 lg:w-full">
                <ImageLightbox
                  src={diplomNGHCertified}
                  alt="NGH Certified Instructor — David Woods"
                  className="w-full h-auto border border-[#E8EDF3] rounded-xl"
                />
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
                    {isEN ? "Book Session for Children & Teens" : "Sitzung für Kinder & Jugendliche buchen"}
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
      <section className="bg-[#E8EDF3] py-6 md:py-9">
        <div className="container-main">
          <div className="relative max-w-2xl mx-auto bg-white border border-[#E8EDF3] rounded-2xl px-6 py-8 md:px-10 md:py-10 text-center shadow-[0_4px_20px_rgba(27,58,92,0.06)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1B3A5C] text-white text-xs font-semibold px-4 py-1 rounded-full tracking-wide uppercase">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </div>
            <h2 className="text-xl md:text-2xl font-light text-[#1B3A5C] mb-3 tracking-tight">
              {isEN ? "Ready for Lasting Change?" : "Bereit für nachhaltige Veränderung?"}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-5">
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
