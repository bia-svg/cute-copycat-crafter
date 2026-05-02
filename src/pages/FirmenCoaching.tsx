import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { Trophy, Shield, Clock, Cigarette, ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import corporateSuccessImg from "@/assets/corporate-success.jpg";
import corporateResilienceImg from "@/assets/corporate-resilience.jpg";
import corporateStressImg from "@/assets/corporate-stress.jpg";
import corporateNonsmokerImg from "@/assets/corporate-nonsmoker.jpg";

export default function FirmenCoaching() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const topics = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: isEN ? "Success Training" : "Erfolgs-Training",
      desc: isEN
        ? "In the success coaching, participants learn that hard work alone is no guarantee for success. Success is ultimately decided in the mind."
        : "Im Erfolgscoaching lernen die Teilnehmer, dass harte Arbeit und häufiges Training allein noch lange keine Garantie für Erfolg sind. Denn letztendlich entscheidet sich Erfolg im Kopf.",
      href: getPath("corporateErfolg", language, country),
      image: corporateSuccessImg,
      imagePosition: "center 45%",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: isEN ? "Resilience Building" : "Resilienz-Verstärken",
      desc: isEN
        ? "Through resilience coaching, participants work primarily on inner strength — essential in difficult times, under pressure, stress or problems."
        : "Durch das Resilienz Coaching arbeiten die Teilnehmer vor allem an der inneren Stärke. Diese ist vor allem in schweren Zeiten und bei aufkommendem Druck sowie Ärger, Stress oder Problemen wichtig.",
      href: getPath("corporateResilienz", language, country),
      image: corporateResilienceImg,
      imagePosition: "center 40%",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: isEN ? "Stress Prevention" : "Stress-Prävention",
      desc: isEN
        ? "David J. Woods and his team have been supporting people from business, sports, and the music industry with burnout prevention for over 20 years."
        : "Mit der Burnout-Prävention unterstützen David J. Woods und sein Team seit mehr als 20 Jahren Menschen aus Wirtschaft, Leistungssport und vielen weiteren Tätigkeitsfeldern.",
      href: getPath("corporateStress", language, country),
      image: corporateStressImg,
      imagePosition: "center 45%",
    },
    {
      icon: <Cigarette className="w-6 h-6" />,
      title: isEN ? "Non-Smoker Seminars" : "Nichtraucher Seminare",
      desc: isEN
        ? "The 'Non-smoker in 3 hours' program is more than simple smoking cessation. It permanently boosts your employees' performance."
        : "Das Programm \u201eNichtraucher in 3 Stunden\u201c ist mehr als eine einfache Rauchentwöhnung. Denn durch dieses Business Coaching steigern Ihre Mitarbeiter dauerhaft ihre Leistungsfähigkeit.",
      href: getPath("corporateNichtraucher", language, country),
      image: corporateNonsmokerImg,
      imagePosition: "center 45%",
    },
  ];

  const benefits = [
    isEN
      ? "Executives gain clarity, make better decisions and act with greater confidence"
      : "Führungskräfte gewinnen Klarheit, treffen bessere Entscheidungen und handeln souveräner",
    isEN
      ? "Employees develop more personal responsibility, motivation and focus"
      : "Mitarbeiter entwickeln mehr Eigenverantwortung, Motivation und Fokus",
    isEN
      ? "Teams work more efficiently, with less friction and clearer communication"
      : "Teams arbeiten effizienter, mit weniger Reibung und klarer Kommunikation",
    isEN
      ? "Productivity rises measurably through mental stability and clear goal orientation"
      : "Produktivität steigt messbar durch mentale Stabilität und klare Zielausrichtung",
    isEN
      ? "Absences and stress are reduced, performance stays consistently high"
      : "Fehlzeiten und Stress werden reduziert, Leistungsfähigkeit bleibt konstant hoch",
    isEN
      ? "Company culture becomes more stable, solution-oriented and resilient"
      : "Unternehmenskultur wird stabiler, lösungsorientierter und resilienter",
  ];

  return (
    <>
      <SEO {...pageSEO.corporate} pageKey="corporate" breadcrumbs={[
        { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
        { name: isEN ? "Business Coaching" : "Firmen-Coaching", path: getPath("corporate", language, country) },
      ]} />
      <Breadcrumbs items={[
        { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
        { name: isEN ? "Business Coaching" : "Firmen-Coaching", path: getPath("corporate", language, country) },
      ]} />

      {/* Hero — Premium silver-grey */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-4 md:py-6 lg:py-8">
          <div className="bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-4 md:p-6 shadow-sm">
            <p className="text-xs md:text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-1.5 md:mb-2">
              {isEN ? "For Companies & Organizations" : "Für Firmen & Organisationen"}
            </p>
            <h1 className="text-xl sm:text-3xl font-light text-[#1B3A5C] leading-snug md:leading-[1.2] mb-2 md:mb-2.5 tracking-tight">
              {isEN ? "Leadership & Performance Coaching for Companies" : "Leadership & Performance Coaching für Unternehmen"}
            </h1>
            <p className="text-sm md:text-base text-foreground/80 leading-snug md:leading-[1.55] max-w-3xl md:max-w-2xl">
              {isEN
                ? "Professional Leadership & Performance Coaching supports companies in strategically developing executives and employees, unlocking potential, and sustainably improving collaboration. Through individually tailored coaching impulses, leadership skills, personal responsibility, motivation and team dynamics are strengthened."
                : "Professionelles Leadership & Performance Coaching unterstützt Unternehmen dabei, Führungskräfte und Mitarbeiter gezielt weiterzuentwickeln, Potenziale freizusetzen und die Zusammenarbeit nachhaltig zu verbessern. Durch individuell abgestimmte Coaching-Impulse werden Führungskompetenz, Eigenverantwortung, Motivation und Teamdynamik gestärkt."}
            </p>
          </div>
        </div>
      </section>

      {/* Topics — Banner */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-4 md:py-7">
          <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-4 md:p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-light text-[#1B3A5C] mb-3 md:mb-4 text-center tracking-tight">
              {isEN ? "Topics for Your Company" : "Themen für Ihr Unternehmen"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
              {topics.map((item) => (
                <ServiceCard
                  key={item.title}
                  title={item.title}
                  description={item.desc}
                  href={item.href}
                  icon={item.icon}
                  image={item.image}
                  imagePosition={item.imagePosition}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits — Banner */}
      <section className="bg-[#E8EDF3]">
        <div className="container-main py-4 md:py-7">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-4 md:p-5 shadow-sm">
            <h2 className="text-lg md:text-xl font-light text-[#1B3A5C] mb-3 md:mb-4 tracking-tight">
              {isEN ? "Why Leadership & Performance Coaching is decisive:" : "Warum Leadership & Performance Coaching entscheidend ist:"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5 md:gap-y-2">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-2 text-[13px] md:text-sm leading-snug">
                  <span className="text-[#2E7D32] mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] md:text-sm text-muted-foreground mt-3 md:mt-3.5 max-w-3xl leading-snug md:leading-[1.5]">
              {isEN
                ? "Leadership & Performance Coaching creates the foundation for sustainable results — because real performance gains begin in the thinking and behaviour of the people."
                : "Leadership & Performance Coaching schafft die Grundlage für nachhaltige Ergebnisse – denn echte Leistungssteigerung beginnt im Denken und Verhalten der Menschen."}
            </p>
          </div>
        </div>
      </section>

      {/* Evidence — Banner */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-4 md:py-7">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-4 md:p-5 shadow-sm">
            <h2 className="text-lg md:text-xl font-light text-primary mb-2.5 md:mb-3 tracking-tight">
              {isEN ? "Science-Backed Approach" : "Wissenschaftlich fundierter Ansatz"}
            </h2>
            <div className="space-y-2 md:space-y-2.5 max-w-3xl text-[13px] md:text-sm text-foreground/80 leading-snug md:leading-[1.5]">
              <p>
                {isEN
                  ? "Studies show that hypnosis-based methods significantly improve performance and stress resilience — with effect sizes that can surpass classical coaching approaches."
                  : "Studien zeigen, dass hypnosebasierte Methoden die Leistungsfähigkeit und Stressresilienz signifikant verbessern – mit Effektstärken, die klassischen Coaching-Ansätzen überlegen sein können."}
              </p>
              <p>
                {isEN
                  ? "Companies benefit measurably: fewer absences, higher productivity and more stable teams."
                  : "Unternehmen profitieren messbar: weniger Ausfälle, höhere Produktivität und stabilere Teams."}
              </p>
              <p className="text-[10px] md:text-[11px] text-muted-foreground/70 italic leading-snug pt-0.5">
                {isEN
                  ? "Sources: International Journal of Clinical and Experimental Hypnosis; American Psychological Association (APA)."
                  : "Quellen: International Journal of Clinical and Experimental Hypnosis; American Psychological Association (APA)."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        title={isEN ? "Frequently Asked Questions" : "Häufig gestellte Fragen"}
        items={isEN ? [
          { q: "How does corporate coaching with hypnosis work?", a: "Our corporate coaching combines proven psychological methods with hypnosis techniques to achieve deep, lasting behavioral change. Sessions can be conducted individually or in groups, either at your premises or in our practice." },
          { q: "How long does a corporate coaching program take?", a: "Programs are individually tailored. A typical engagement includes an initial consultation, 4-8 coaching sessions, and a follow-up assessment. Intensive workshops like 'Non-Smoker in 3 Hours' are single-day events." },
          { q: "Is corporate coaching scientifically proven?", a: "Yes. Multiple meta-analyses show that hypnosis-based coaching achieves higher effect sizes than traditional coaching alone. The International Journal of Clinical and Experimental Hypnosis reports effect sizes of d=0.82 for workplace performance improvement." },
          { q: "What ROI can we expect from coaching investments?", a: "The American Psychological Association reports a $4 return for every $1 invested in employee mental health programs, through reduced absenteeism, higher productivity, and improved retention." },
          { q: "Can sessions be conducted in English?", a: "Yes. David J. Woods conducts all sessions in both German and English. International teams and English-speaking executives are welcome." },
        ] : [
          { q: "Wie funktioniert Firmen-Coaching mit Hypnose?", a: "Unser Firmen-Coaching kombiniert bewährte psychologische Methoden mit Hypnosetechniken, um tiefgreifende, dauerhafte Verhaltensveränderungen zu erreichen. Sitzungen können einzeln oder in Gruppen durchgeführt werden." },
          { q: "Wie lange dauert ein Coaching-Programm?", a: "Programme werden individuell zugeschnitten. Ein typisches Engagement umfasst ein Erstgespräch, 4-8 Coaching-Sitzungen und eine Nachbewertung. Intensiv-Workshops wie 'Nichtraucher in 3 Stunden' sind Eintagesveranstaltungen." },
          { q: "Ist Firmen-Coaching wissenschaftlich belegt?", a: "Ja. Mehrere Meta-Analysen zeigen, dass hypnosebasiertes Coaching höhere Effektstärken erzielt als traditionelles Coaching allein. Das International Journal of Clinical and Experimental Hypnosis berichtet Effektstärken von d=0,82 für Verbesserung der Arbeitsleistung." },
          { q: "Welchen ROI können wir von Coaching-Investitionen erwarten?", a: "Die American Psychological Association berichtet von 4 $ Rendite pro investiertem Dollar in Mitarbeiter-Mental-Health-Programme — durch weniger Fehlzeiten, höhere Produktivität und bessere Mitarbeiterbindung." },
          { q: "Können Sitzungen auf Englisch durchgeführt werden?", a: "Ja. David J. Woods führt alle Sitzungen auf Deutsch und Englisch durch. Internationale Teams und englischsprachige Führungskräfte sind willkommen." },
        ]}
      />

      <section className="bg-[#E8EDF3] py-3.5 md:py-4 lg:py-5">
        <div className="container-main">
          <div className="relative max-w-2xl mx-auto bg-white border border-[#1B3A5C]/15 rounded-2xl px-5 py-4 md:px-10 md:py-5 text-center shadow-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ECEEF1] text-[#1B3A5C] text-xs font-medium border border-[#1B3A5C]/25 px-4 py-1 rounded-full tracking-wide uppercase">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </div>
            <h2 className="text-xl md:text-2xl font-light text-foreground mb-1.5 md:mb-1.5 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Take the Next Step for Your Team" : "Der nächste Schritt für Ihr Team"}
            </h2>
            <p className="text-[13px] md:text-[15px] text-muted-foreground max-w-xl mx-auto mb-2.5 md:mb-3 leading-snug">
              {isEN
                ? "Discover how our corporate programs can strengthen your team's performance, resilience, and well-being."
                : "Erfahren Sie, wie unsere Firmenprogramme die Leistung, Resilienz und das Wohlbefinden Ihres Teams stärken können."}
            </p>
            <Link to={`${getPath("contact", language, country)}?concern=corporate`}>
              <Button className="bg-[#ECEEF1] hover:bg-[#E2E5E9] text-[#1B3A5C] font-medium px-8 py-3 text-base border border-[#1B3A5C]/25 shadow-none">
                {isEN ? "Request a Consultation" : "Beratung anfragen"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
