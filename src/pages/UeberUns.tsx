import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import davidPortrait from "@/assets/david-woods-portrait.jpg";


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, BookOpen, Tv, Users, Star } from "lucide-react";

export default function UeberUns() {
  const { language, country, isSwiss, showCH } = useLanguage();
  const isEN = language === "en";

  return (
    <>
      <SEO {...pageSEO.about} />

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
                <img src={davidPortrait} alt="David J. Woods" className="w-full h-auto object-cover" />
                <div className="p-4 bg-[#f4f3ef]">
                  <h3 className="font-bold text-[#1B3A5C] mb-1">David J. Woods</h3>
                  <p className="text-xs text-muted-foreground">Lic.Psych. · Hypnotherapeut</p>
                  <p className="text-xs text-muted-foreground">NGH International Trainer</p>
                  <p className="text-xs text-muted-foreground mt-2">{isEN ? "Developer of Aktiv-Hypnose©" : "Entwickler der Aktiv-Hypnose©"}</p>
                  <div className="flex items-center gap-1 mt-3">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                    <span className="text-xs text-muted-foreground ml-1">5.0 (255)</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* NGH */}
            <div className="bg-white border border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src={CDN.nghBadge} alt="NGH International Trainer" className="h-20 w-auto shrink-0" />
              </div>
              <h3 className="font-semibold text-sm text-[#1B3A5C] mb-2">NGH International Trainer</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEN
                  ? "Certified by the National Guild of Hypnotists — the world's oldest and largest hypnotherapy organization, founded in 1950 in Boston, USA."
                  : "Zertifiziert von der National Guild of Hypnotists — der weltweit ältesten und größten Hypnose-Organisation, gegründet 1950 in Boston, USA."}
              </p>
            </div>

            {/* EMR (CH only) */}
            {showCH && (
              <div className="bg-white border border-border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={CDN.emrBadge} alt="EMR Krankenkasse Konform" className="h-20 w-auto shrink-0" />
                </div>
                <h3 className="font-semibold text-sm text-[#1B3A5C] mb-2">EMR Krankenkasse Konform</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Von Schweizer Krankenkassen anerkannt. ZSR Nr. P609264. Viele Zusatzversicherungen übernehmen einen Teil der Kosten.
                </p>
              </div>
            )}

            {/* Lic.Psych */}
            <div className="bg-white border border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-[#1B3A5C] flex items-center justify-center shrink-0">
                  <span className="text-white text-lg font-bold text-center leading-tight">Lic.<br/>Psych.</span>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-[#1B3A5C] mb-2">{isEN ? "Licensed Psychologist" : "Lizenzierter Psychologe"}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEN
                  ? "University-qualified psychologist with decades of clinical and therapeutic experience."
                  : "Universitär qualifizierter Psychologe mit jahrzehntelanger klinischer und therapeutischer Erfahrung."}
              </p>
            </div>

            {/* Aktiv-Hypnose Developer */}
            <div className="bg-white border border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src={CDN.logo} alt="Aktiv-Hypnose©" className="h-16 w-auto shrink-0" />
              </div>
              <h3 className="font-semibold text-sm text-[#1B3A5C] mb-2">{isEN ? "Developer of Aktiv-Hypnose©" : "Entwickler der Aktiv-Hypnose©"}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEN
                  ? "Proprietary method combining clinical hypnosis with active participation for faster, lasting results."
                  : "Eigene Methode, die klinische Hypnose mit aktiver Teilnahme kombiniert für schnellere, nachhaltige Ergebnisse."}
              </p>
            </div>

            {/* Author */}
            <Link to={getPath("book", language, country)} className="bg-white border border-border p-6 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-[#2E7D32] flex items-center justify-center shrink-0">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="font-semibold text-sm text-[#1B3A5C] mb-2 group-hover:text-[#2E7D32] transition-colors">{isEN ? "Author & Specialist Writer" : "Autor & Fachautor"}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEN
                  ? "Author of 'Go InSide' and numerous specialist publications on hypnotherapy and personal development."
                  : "Autor von 'Go InSide' und zahlreichen Fachpublikationen zu Hypnotherapie und Persönlichkeitsentwicklung."}
              </p>
            </Link>

            {/* TV Expert */}
            <Link to={getPath("media", language, country)} className="bg-white border border-border p-6 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-[#1B3A5C] flex items-center justify-center shrink-0">
                  <Tv className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="font-semibold text-sm text-[#1B3A5C] mb-2 group-hover:text-[#2E7D32] transition-colors">{isEN ? "TV Expert & Media Personality" : "TV-Experte & Medienpersönlichkeit"}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
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
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {CDN.bekanntAus.map((src, i) => (
                <img key={i} src={src} alt={`Bekannt aus ${i + 1}`} className="h-8 sm:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all mix-blend-multiply" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kathryn Section */}
      <section className="bg-white border-b border-border">
        <div className="container-main py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
            <div className="mx-auto lg:mx-0">
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
