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

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, BookOpen, Tv, Users, Star } from "lucide-react";

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

      {/* Main Bio Section */}
      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-4">
                {isEN ? "About David J. Woods" : "Über David J. Woods"}
              </h1>
              <p className="text-sm font-medium text-[#2E7D32] mb-4">
                Lic.Psych. · Hypnotherapeut · Dozent & Fachautor · NGH International Trainer
              </p>
              <p className="text-base text-foreground leading-relaxed mb-4">
                {isEN
                  ? "David J. Woods combines psychological expertise, physiological depth, and modern coaching techniques into a method that works: clear, efficient, and solution-oriented. Instead of superficial motivation, it's about real inner strength, mental stability, and conscious self-leadership."
                  : "David J. Woods vereint psychologisches Fachwissen, physiologische Tiefe und moderne Coaching-Techniken zu einer Methode, die wirkt: klar, effizient und lösungsorientiert. Statt oberflächlicher Motivation geht es hier um echte innere Stärke, mentale Stabilität und bewusste Selbstführung."}
              </p>
              <p className="text-base text-foreground leading-relaxed mb-4">
                {isEN
                  ? "With over 40 years of experience and more than 30,000 sessions, David J. Woods is one of the most experienced hypnotherapists in the DACH region. As an NGH International Trainer and developer of the Aktiv-Hypnose© method, he has helped thousands of people achieve lasting change."
                  : "Mit über 40 Jahren Erfahrung und mehr als 30.000 Sitzungen gehört David J. Woods zu den erfahrensten Hypnotherapeuten im DACH-Raum. Als NGH International Trainer und Entwickler der Aktiv-Hypnose© Methode hat er Tausenden von Menschen geholfen, nachhaltige Veränderung zu erreichen."}
              </p>
              <p className="text-base text-foreground leading-relaxed mb-6">
                {isEN
                  ? "His approach is based on the conviction that real change begins in the subconscious mind. Whether it's stopping smoking, overcoming anxiety, weight management, or stress reduction — the Aktiv-Hypnose© method addresses the root cause where the problem originates."
                  : "Sein Ansatz basiert auf der Überzeugung, dass echte Veränderung im Unterbewusstsein beginnt. Ob Raucherentwöhnung, Angstbewältigung, Gewichtsmanagement oder Stressreduktion – die Aktiv-Hypnose© Methode setzt dort an, wo das Problem entsteht."}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="border border-border p-4 text-center bg-[#f4f3ef]">
                  <Award className="w-6 h-6 text-[#1B3A5C] mx-auto mb-2" />
                  <p className="text-xl font-bold text-[#1B3A5C]">40+</p>
                  <p className="text-xs text-muted-foreground">{isEN ? "Years Experience" : "Jahre Erfahrung"}</p>
                </div>
                <div className="border border-border p-4 text-center bg-[#f4f3ef]">
                  <Users className="w-6 h-6 text-[#1B3A5C] mx-auto mb-2" />
                  <p className="text-xl font-bold text-[#1B3A5C]">30.000+</p>
                  <p className="text-xs text-muted-foreground">{isEN ? "Sessions" : "Sitzungen"}</p>
                </div>
                <div className="border border-border p-4 text-center bg-[#f4f3ef]">
                  <BookOpen className="w-6 h-6 text-[#1B3A5C] mx-auto mb-2" />
                  <p className="text-xl font-bold text-[#1B3A5C]">350+</p>
                  <p className="text-xs text-muted-foreground">{isEN ? "Training Pages" : "Seiten Ausbildung"}</p>
                </div>
                <div className="border border-border p-4 text-center bg-[#f4f3ef]">
                  <Tv className="w-6 h-6 text-[#1B3A5C] mx-auto mb-2" />
                  <p className="text-xl font-bold text-[#1B3A5C]">TV</p>
                  <p className="text-xs text-muted-foreground">{isEN ? "Media Appearances" : "Medienauftritte"}</p>
                </div>
              </div>

              {showCH && (
                <div className="bg-[#E8F5E9] border border-[#81C784] p-4 mb-6">
                  <p className="text-sm font-semibold text-[#2E7D32]">EMR Krankenkasse Konform · ZSR Nr. P609264</p>
                  <p className="text-xs text-muted-foreground mt-1">Viele Schweizer Zusatzversicherungen übernehmen einen Teil der Kosten.</p>
                </div>
              )}

              <Link to={getPath("contact", language, country)}>
                <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-6 py-3">
                  {isEN ? "Book Free Discovery Call" : "Kostenloses Erstgespräch vereinbaren"}
                </Button>
              </Link>
            </div>

            {/* Sidebar — Photo + Info */}
            <div>
              <div className="border border-border sticky top-32">
                <img src={davidPortrait} alt="David J. Woods – Lic.Psych., Hypnotherapeut und NGH International Trainer" className="w-full h-auto object-cover" loading="eager" />
                <div className="p-4 bg-[#f4f3ef]">
                  <h3 className="font-bold text-[#1B3A5C] mb-1">David J. Woods</h3>
                  <p className="text-xs text-muted-foreground">Lic.Psych. · Hypnotherapeut</p>
                  <p className="text-xs text-muted-foreground">NGH International Trainer</p>
                  <p className="text-xs text-muted-foreground mt-2">{isEN ? "Developer of Aktiv-Hypnose©" : "Entwickler der Aktiv-Hypnose©"}</p>
                  <div className="flex items-center gap-1 mt-3">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                    <span className="text-xs text-muted-foreground ml-1">5.0 (264)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diplomas & Credentials Section — with images */}
      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-2">
            {isEN ? "Diplomas & Certifications" : "Diplome & Zertifizierungen"}
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            {isEN
              ? "Internationally recognized certifications and professional qualifications."
              : "International anerkannte Zertifizierungen und berufliche Qualifikationen."}
          </p>

          {/* Credential Cards with Badge Images */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-10">
            {/* NGH */}
            <div className="bg-white border border-border p-4 md:p-6 rounded-lg shadow-sm text-center">
              <img src={CDN.nghBadge} alt="NGH International Trainer Zertifikat" className="h-12 md:h-20 mx-auto mb-2 md:mb-4" loading="lazy" />
              <h3 className="font-semibold text-xs md:text-sm text-[#1B3A5C] mb-1 md:mb-2">NGH International Trainer</h3>
              <p className="text-[0.65rem] md:text-xs text-muted-foreground leading-relaxed hidden md:block">
                {isEN
                  ? "Certified by the National Guild of Hypnotists — the world's oldest and largest hypnotherapy organization, founded in 1950 in Boston, USA."
                  : "Zertifiziert von der National Guild of Hypnotists — der weltweit ältesten und größten Hypnose-Organisation, gegründet 1950 in Boston, USA."}
              </p>
            </div>

            {/* EMR */}
            <div className="bg-white border border-border p-4 md:p-6 rounded-lg shadow-sm text-center">
              <img src={CDN.emrBadge} alt="EMR Krankenkasse Konform Badge" className="h-12 md:h-20 mx-auto mb-2 md:mb-4" loading="lazy" />
              <h3 className="font-semibold text-xs md:text-sm text-[#1B3A5C] mb-1 md:mb-2">EMR Krankenkasse Konform</h3>
              <p className="text-[0.65rem] md:text-xs text-muted-foreground leading-relaxed hidden md:block">
                Von Schweizer Krankenkassen anerkannt. ZSR Nr. P609264. Viele Zusatzversicherungen übernehmen einen Teil der Kosten.
              </p>
            </div>

            {/* Lic.Psych */}
            <div className="bg-white border border-border p-4 md:p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-[#1B3A5C] flex items-center justify-center mx-auto mb-2 md:mb-4">
                <span className="text-white text-[0.6rem] md:text-lg font-bold text-center leading-tight">Lic.<br/>Psych.</span>
              </div>
              <h3 className="font-semibold text-xs md:text-sm text-[#1B3A5C] mb-1 md:mb-2">{isEN ? "Licensed Psychologist" : "Lizenzierter Psychologe"}</h3>
              <p className="text-[0.65rem] md:text-xs text-muted-foreground leading-relaxed hidden md:block">
                {isEN
                  ? "University-qualified psychologist with decades of clinical and therapeutic experience."
                  : "Universitär qualifizierter Psychologe mit jahrzehntelanger klinischer und therapeutischer Erfahrung."}
              </p>
            </div>

            {/* Aktiv-Hypnose Developer */}
            <div className="bg-white border border-border p-4 md:p-6 rounded-lg shadow-sm text-center">
              <img src={CDN.logo} alt="Aktiv-Hypnose© Logo" className="h-10 md:h-16 mx-auto mb-2 md:mb-4" loading="lazy" />
              <h3 className="font-semibold text-xs md:text-sm text-[#1B3A5C] mb-1 md:mb-2">{isEN ? "Developer of Aktiv-Hypnose©" : "Entwickler der Aktiv-Hypnose©"}</h3>
              <p className="text-[0.65rem] md:text-xs text-muted-foreground leading-relaxed hidden md:block">
                {isEN
                  ? "Proprietary method combining clinical hypnosis with active participation for faster, lasting results."
                  : "Eigene Methode, die klinische Hypnose mit aktiver Teilnahme kombiniert für schnellere, nachhaltige Ergebnisse."}
              </p>
            </div>

            {/* Author */}
            <Link to={getPath("book", language, country)} className="bg-white border border-border p-4 md:p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-[#2E7D32] flex items-center justify-center mx-auto mb-2 md:mb-4">
                <BookOpen className="w-6 h-6 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="font-semibold text-xs md:text-sm text-[#1B3A5C] mb-1 md:mb-2 group-hover:text-[#2E7D32] transition-colors">{isEN ? "Author & Specialist Writer" : "Autor & Fachautor"}</h3>
              <p className="text-[0.65rem] md:text-xs text-muted-foreground leading-relaxed hidden md:block">
                {isEN
                  ? "Author of 'Go InSide' and numerous specialist publications on hypnotherapy and personal development."
                  : "Autor von 'Go InSide' und zahlreichen Fachpublikationen zu Hypnotherapie und Persönlichkeitsentwicklung."}
              </p>
            </Link>

            {/* TV Expert */}
            <Link to={getPath("media", language, country)} className="bg-white border border-border p-4 md:p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-[#1B3A5C] flex items-center justify-center mx-auto mb-2 md:mb-4">
                <Tv className="w-6 h-6 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="font-semibold text-xs md:text-sm text-[#1B3A5C] mb-1 md:mb-2 group-hover:text-[#2E7D32] transition-colors">{isEN ? "TV Expert & Media Personality" : "TV-Experte & Medienpersönlichkeit"}</h3>
              <p className="text-[0.65rem] md:text-xs text-muted-foreground leading-relaxed hidden md:block">
                {isEN
                  ? "Regular appearances on German and Swiss television as a hypnotherapy expert."
                  : "Regelmäßige Auftritte im deutschen und Schweizer Fernsehen als Hypnose-Experte."}
              </p>
            </Link>
          </div>

          {/* Bekannt Aus — Media Logos */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 text-center">
              {isEN ? "As Seen On" : "Bekannt aus"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 bg-muted/50 rounded-lg p-4">
              {CDN.bekanntAus.map((src, i) => (
                <img key={i} src={src} alt={`David J. Woods bekannt aus TV und Medien – Logo ${i + 1}`} className="h-8 sm:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all mix-blend-multiply" loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ein kurzer Überblick */}
      <section className="bg-white border-b border-border">
        <div className="container-main py-10 lg:py-14">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "A Brief Overview of David J. Woods" : "Ein kurzer Überblick zu David J. Woods"}
          </h2>
          <div className="space-y-4 text-base text-foreground leading-relaxed max-w-4xl">
            <p>
              {isEN
                ? "David J. Woods was born in London and developed an intense interest in hypnosis and psychology from an early age. After studying psychology in Mexico (UNAM), the USA (Boston) and Great Britain (Cambridge), he completed international training programs as a hypnotist and hypnosis trainer."
                : "David J. Woods wurde in London geboren und beschäftigte sich bereits früh intensiv mit Hypnose und Psychologie. Nach seinem Psychologiestudium in Mexiko (UNAM), den USA (Boston) und Großbritannien (Cambridge) absolvierte er internationale Ausbildungen zum Hypnotiseur und Hypnose-Trainer."}
            </p>
            <p>
              {isEN
                ? "His central mission is to help people achieve personal goals, permanently resolve blockages and fully develop their own potential based on depth-psychology-based approaches and clear, understandable connections."
                : "Sein zentrales Anliegen ist es, Menschen auf Basis tiefenpsychologisch fundierter Ansätze und klarer, nachvollziehbarer Zusammenhänge dabei zu unterstützen, persönliche Ziele zu erreichen, Blockaden nachhaltig zu lösen und ihr eigenes Potenzial vollständig zu entfalten."}
            </p>
            <p className="font-semibold">
              {isEN
                ? "David J. Woods has been working successfully in Germany and Switzerland for many years and is currently also working internationally, including in Dubai."
                : "David J. Woods ist seit vielen Jahren erfolgreich in Deutschland und der Schweiz tätig und arbeitet aktuell zusätzlich international, unter anderem in Dubai."}
            </p>

            <h3 className="text-lg font-bold text-[#1B3A5C] pt-4">
              {isEN ? "Early Interest in Hypnosis in Childhood & Youth" : "Frühes Interesse für Hypnose in der Kindheit & Jugend"}
            </h3>
            <p>
              {isEN
                ? "Already in his childhood in England, David J. Woods was fascinated by the subject of hypnosis and hypnotherapy. As a teenager, he gathered his first experiences with the subject and later explored hypnosis more intensively. He also studied depth psychology and various coaching methods."
                : "Bereits in seiner Kindheit in England war David J. Woods vom Thema Hypnose sowie der Hypnosetherapie fasziniert. Daher sammelte er bereits als Jugendlicher erste Erfahrungen mit dem Thema und setzte sich später intensiver mit der Hypnose auseinander. Zudem befasste er sich auch mit der Tiefenpsychologie und verschiedenen Coaching-Methoden."}
            </p>

            <h3 className="text-lg font-bold text-[#1B3A5C] pt-4">
              {isEN ? "Hypnosis Training in South America, England & Germany" : "Hypnose-Ausbildung in Südamerika, England & Deutschland"}
            </h3>
            <p>
              {isEN
                ? "To apply theoretical knowledge in practice, he completed several years of training at various hypnosis institutes. He visited experienced hypnotists and hypnosis trainers not only in South America, but also in England and Germany. David J. Woods speaks fluent German, English and Spanish, allowing him to integrate all practical knowledge."
                : "Um das theoretische Wissen auch in der Praxis zu nutzen, folgte nach seinem Studium eine mehrjährige Ausbildung in verschiedenen Hypnose-Instituten. Dazu besuchte er nicht nur erfahrene Hypnotiseure und Hypnose Ausbilder in Südamerika, sondern auch in England und Deutschland. David J. Woods spricht fließend Deutsch, Englisch und Spanisch, sodass er das ganze praktische Wissen in sich vereinen konnte."}
            </p>

            <h3 className="text-lg font-bold text-[#1B3A5C] pt-4">
              {isEN ? "Certified Hypnosis Trainer of the National Guild of Hypnotists" : "Zertifizierter Hypnose-Ausbilder der National Guild of Hypnotists"}
            </h3>
            <p>
              {isEN
                ? "He applies his 'Aktiv-Hypnose' not only in hypnosis sessions and coaching, but also shares it through hypnosis training programs in Augsburg, Germany and near Zurich in Switzerland. In his training programs, he also certifies participants as Master Hypnotists with NGH certification. David J. Woods is himself a certified hypnosis trainer of the world's largest hypnosis association, the 'National Guild of Hypnotists'."
                : `Seine \u201EAktiv Hypnose\u201C wendet er nicht nur in den Hypnose Sitzungen und Coachings an, sondern gibt sie auch in Form von Hypnose Ausbildungen in Augsburg Deutschland und bei Z\u00FCrich in der Schweiz, an andere Menschen weiter. Bei seinen Ausbildungsprogrammen bildet er die Teilnehmer auch zum Master Hypnotiseur mit NGH-Zertifizierung aus. Denn David J. Woods ist selbst zertifizierter Hypnose Ausbilder des weltweit gr\u00F6\u00DFten Hypnose-Verbands \u201ENational Guild of Hypnotists\u201C.`}
            </p>
          </div>
        </div>
      </section>

      {/* Ein glückliches, bewusstes und freies Leben */}
      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10 lg:py-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2E7D32] mb-2">
            {isEN ? "The Goal:" : "Das Ziel:"}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "A Happy, Conscious and Free Life" : "Ein glückliches, bewusstes und freies Leben"}
          </h2>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
              <p className="text-base text-foreground leading-relaxed">
                {isEN
                  ? "With his psychological and neuroscientific background, hypnotist David Woods practices a very modern hypnosis approach and developed 'Aktiv-Hypnose'. He sees hypnosis as a simple but extremely effective tool to resolve problem situations and improve quality of life for his clients in the shortest possible time. His goal is to help people live their lives more happily, more consciously and more freely. The successes of his work are reported not only by television shows and newspapers, but also by many clients and participants on our website."
                  : `Vor seinem psychologischen und neurowissenschaftlichen Hintergrund praktiziert Hypnotiseur David Woods einen sehr modernen Hypnose Ansatz und entwickelte die \u201EAktiv Hypnose\u201C. Er betrachtet Hypnose als ein einfaches, aber extrem wirkungsvolles Werkzeug, um bei seinen Klienten innerhalb k\u00FCrzester Zeit Problemsituationen aufzul\u00F6sen und die Lebensqualit\u00E4t zu verbessern. Sein Ziel ist es, Menschen dabei zu helfen, ihr Leben gl\u00FCcklicher, bewusster und freier zu gestalten. \u00DCber die Erfolge seiner Arbeit berichten nicht nur Fernsehsendungen und Zeitungen, sondern auch viele Klienten und Teilnehmer auf unserer Website.`}
              </p>
              <div className="mx-auto lg:mx-0 w-64 lg:w-full">
                <ImageLightbox
                  src={diplomNGHCertified}
                  alt="NGH Certified Instructor — David Woods"
                  className="w-full h-auto border border-border"
                />
              </div>
            </div>
        </div>
      </section>

      {/* Kathryn Section */}
      <section className="bg-white border-b border-border">
        <div className="container-main py-10 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
            <div className="mx-auto md:mx-0 w-64 md:w-full">
              <div className="border border-border overflow-hidden rounded-lg">
                <img src={CDN.kathrynPortrait} alt="Kathryn - Psychologische Beraterin" className="w-full h-auto" />
                <div className="p-4 bg-[#f4f3ef]">
                  <h3 className="font-bold text-[#1B3A5C] text-sm">Kathryn</h3>
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
              <h2 className="text-2xl font-bold text-[#1B3A5C] mb-2">
                Kathryn
              </h2>
              <p className="text-sm font-medium text-[#2E7D32] mb-4">
                {isEN
                  ? "Psychological Counselor & Certified Hypnotherapist · Children/Adolescents & Hypno-Birthing"
                  : "Psychologische Beraterin & Zertifizierte Hypnotiseurin · Kinder/Jugendliche & Hypno-Birthing"}
              </p>
              <p className="text-base text-foreground leading-relaxed mb-4">
                {isEN
                  ? "Over many years, Kathryn has intensively studied the fields of psychology and personality development, with a particular focus on educational work with children and adolescents. She completed numerous training programs in modern communication techniques such as NLP and mental coaching, and was personally trained as a Master Hypnotist by David J. Woods."
                  : "Über viele Jahre hinweg setzte sich Kathryn intensiv mit den Themen Psychologie und Persönlichkeitsentwicklung auseinander, insbesondere mit einem Schwerpunkt auf die pädagogische Arbeit mit Kindern und Jugendlichen. Sie absolvierte zahlreiche Ausbildungen in modernen Kommunikationstechniken wie NLP und Mental Coaching und wurde zudem von David J. Woods persönlich zur Master-Hypnotiseurin ausgebildet."}
              </p>
              <p className="text-base text-foreground leading-relaxed mb-4">
                {isEN
                  ? "Kathryn is multilingual, speaking fluent Russian and German as well as excellent English. In our practice, she is your competent contact for Hypno-Birthing as well as hypnosis sessions specifically for children and adolescents."
                  : "Kathryn ist mehrsprachig aufgewachsen und spricht fließend Russisch und Deutsch sowie sehr gutes Englisch. In unserer Praxis ist sie Ihre kompetente Ansprechpartnerin für Hypno-Birthing sowie für Hypnosesitzungen speziell bei Kindern und Jugendlichen."}
              </p>
              <p className="text-base text-foreground leading-relaxed mb-4">
                {isEN
                  ? "Through her empathetic, structured and clear approach, she quickly builds trust and ensures that even young people feel safe and understood during hypnosis. As David J. Woods' partner, Kathryn is responsible for the structured operations of the institute."
                  : "Durch ihre einfühlsame, strukturierte und klare Art schafft sie schnell Vertrauen und sorgt dafür, dass sich auch junge Menschen bei der Hypnose sicher und verstanden fühlen. Als Lebensgefährtin von David J. Woods ist Kathryn für den strukturierten Ablauf des Instituts verantwortlich."}
              </p>
              <p className="text-base text-foreground leading-relaxed mb-6">
                {isEN
                  ? "With her psychological expertise, pedagogical experience and knowledge of homeopathy, Kathryn decisively enriches the team and strengthens the holistic focus of our work, where the whole person is at the center. She also serves as a lecturer in our hypnosis training programs, supporting participants as a knowledgeable contact person."
                  : "Mit ihrer psychologischen Expertise, pädagogischen Erfahrung und ihrem Wissen in Homöopathie bereichert Kathryn das Team entscheidend und stärkt den ganzheitlichen Schwerpunkt unserer Arbeit, bei dem der Mensch in seiner Gesamtheit im Mittelpunkt steht. Darüber hinaus steht sie als Dozentin in unseren Hypnoseausbildungen den Teilnehmerinnen und Teilnehmern als Begleitung und Unterstützung zur Seite."}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  isEN ? "Children & Adolescents" : "Kinder & Jugendliche",
                  "Hypno-Birthing",
                  "NLP",
                  "Mental Coaching",
                  isEN ? "Master Hypnotist" : "Master-Hypnotiseurin",
                  isEN ? "Homeopathy" : "Homöopathie",
                ].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-[#f4f3ef] text-xs font-medium text-[#55504f] border border-border rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to={`${getPath("contact", language, country)}?concern=children`}>
                <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-6 py-3">
                  {isEN ? "Book Session for Children & Teens" : "Sitzung für Kinder & Jugendliche buchen"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence & Methodology */}
      <section className="bg-secondary/50 border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-primary mb-4">
            {isEN ? "Scientific Foundation & Methodology" : "Wissenschaftliche Grundlage & Methodik"}
          </h2>
          <div className="space-y-4 max-w-3xl text-sm text-foreground leading-relaxed">
            <p>
              {isEN
                ? "David J. Woods' Aktiv-Hypnose© method integrates clinical hypnotherapy with evidence-based psychological principles. A comprehensive meta-analysis by Kirsch, Montgomery & Sapirstein (1995), published in the Journal of Consulting and Clinical Psychology, demonstrated that adding hypnosis to cognitive-behavioral therapy (CBT) improved treatment outcomes by an average of 70% across multiple conditions."
                : "David J. Woods' Aktiv-Hypnose© Methode integriert klinische Hypnotherapie mit evidenzbasierten psychologischen Prinzipien. Eine umfassende Meta-Analyse von Kirsch, Montgomery & Sapirstein (1995), veröffentlicht im Journal of Consulting and Clinical Psychology, zeigte, dass die Ergänzung von kognitiver Verhaltenstherapie (KVT) durch Hypnose die Behandlungsergebnisse um durchschnittlich 70% verbesserte."}
            </p>
            <p>
              {isEN
                ? "The World Health Organization (WHO) recognizes hypnotherapy as a valid therapeutic approach. The German Scientific Advisory Council on Psychotherapy (Wissenschaftlicher Beirat Psychotherapie) confirmed the scientific evidence for clinical hypnosis and hypnotherapy in 2006."
                : "Die Weltgesundheitsorganisation (WHO) anerkennt Hypnotherapie als validen therapeutischen Ansatz. Der Wissenschaftliche Beirat Psychotherapie (WBP) bestätigte 2006 die wissenschaftliche Evidenz für klinische Hypnose und Hypnotherapie."}
            </p>
            <p className="text-xs text-muted-foreground italic">
              {isEN
                ? "Sources: Kirsch, Montgomery & Sapirstein, Journal of Consulting and Clinical Psychology, 63(2), 1995; WHO ICD-11; Wissenschaftlicher Beirat Psychotherapie, Gutachten 2006."
                : "Quellen: Kirsch, Montgomery & Sapirstein, Journal of Consulting and Clinical Psychology, 63(2), 1995; WHO ICD-11; Wissenschaftlicher Beirat Psychotherapie, Gutachten 2006."}
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        title={isEN ? "Frequently Asked Questions" : "Häufig gestellte Fragen"}
        items={isEN ? [
          { q: "What qualifications does David J. Woods have?", a: "David J. Woods holds a Lic.Psych. (Licensed Psychologist) degree and is an NGH International Trainer — one of the highest certifications awarded by the National Guild of Hypnotists (USA). He is EMR-recognized in Switzerland (ZSR P609264) and has developed the Aktiv-Hypnose© method." },
          { q: "How much experience does David J. Woods have?", a: "With over 40 years of clinical experience and more than 30,000 documented sessions, David J. Woods is one of the most experienced hypnotherapists in the DACH region (Germany, Austria, Switzerland)." },
          { q: "Is hypnotherapy scientifically recognized?", a: "Yes. The World Health Organization (WHO) recognizes hypnotherapy as a valid therapeutic approach. In Germany, the Scientific Advisory Council on Psychotherapy confirmed the scientific evidence for clinical hypnosis in 2006. Meta-analyses show that hypnosis enhances CBT outcomes by an average of 70% (Kirsch et al., 1995)." },
          { q: "What is the Aktiv-Hypnose© method?", a: "Aktiv-Hypnose© is a proprietary method developed by David J. Woods that combines classical hypnosis with modern psychological techniques, NLP, and coaching principles. It focuses on active client participation rather than passive suggestion." },
          { q: "Does David J. Woods also offer training for therapists?", a: "Yes. David J. Woods offers 6-day intensive training seminars where participants learn his proprietary Aktiv-Hypnose© method and receive an Aktiv-Hypnose© Therapist Diploma upon completion. David is also an NGH International Trainer, one of the highest certifications from the National Guild of Hypnotists (USA)." },
        ] : [
          { q: "Welche Qualifikationen hat David J. Woods?", a: "David J. Woods hat einen Lic.Psych.-Abschluss (lizenzierter Psychologe) und ist NGH International Trainer — eine der höchsten Zertifizierungen der National Guild of Hypnotists (USA). Er ist EMR-anerkannt in der Schweiz (ZSR P609264) und hat die Aktiv-Hypnose© Methode entwickelt." },
          { q: "Wie viel Erfahrung hat David J. Woods?", a: "Mit über 40 Jahren klinischer Erfahrung und mehr als 30.000 dokumentierten Sitzungen gehört David J. Woods zu den erfahrensten Hypnotherapeuten im DACH-Raum (Deutschland, Österreich, Schweiz)." },
          { q: "Ist Hypnotherapie wissenschaftlich anerkannt?", a: "Ja. Die Weltgesundheitsorganisation (WHO) erkennt Hypnotherapie als validen therapeutischen Ansatz an. In Deutschland bestätigte der Wissenschaftliche Beirat Psychotherapie 2006 die wissenschaftliche Evidenz für klinische Hypnose. Meta-Analysen zeigen, dass Hypnose KVT-Ergebnisse um durchschnittlich 70% verbessert (Kirsch et al., 1995)." },
          { q: "Was ist die Aktiv-Hypnose© Methode?", a: "Aktiv-Hypnose© ist eine von David J. Woods entwickelte Methode, die klassische Hypnose mit modernen psychologischen Techniken, NLP und Coaching-Prinzipien kombiniert. Der Fokus liegt auf aktiver Klientenbeteiligung statt passiver Suggestion." },
          { q: "Bietet David J. Woods auch Ausbildungen an?", a: "Ja. David J. Woods bietet 6-tägige Intensiv-Ausbildungsseminare an, in denen die Teilnehmer seine eigene Aktiv-Hypnose© Methode erlernen und nach Abschluss ein Aktiv-Hypnose© Therapeuten-Diplom erhalten. David ist zudem NGH International Trainer — eine der höchsten Zertifizierungen der National Guild of Hypnotists (USA)." },
        ]}
      />

      {/* CTA Section */}
      <section className="bg-[#8b827c] text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Ready for Lasting Change?" : "Bereit für nachhaltige Veränderung?"}
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            {isEN
              ? "Book your free and non-binding discovery call. We take time for you and advise you individually."
              : "Vereinbaren Sie jetzt Ihr kostenloses und unverbindliches Erstgespräch. Wir nehmen uns Zeit für Sie und beraten Sie individuell."}
          </p>
          <Link to={getPath("contact", language, country)}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3 text-base">
              {isEN ? "Free Discovery Call" : "Kostenloses Erstgespräch"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
