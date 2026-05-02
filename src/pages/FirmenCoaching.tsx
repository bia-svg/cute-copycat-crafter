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
    isEN ? "Strengthen executives: More confidence, better decisions" : "Führungskräfte stärken: Mehr Souveränität, bessere Entscheidungen",
    isEN ? "Develop employees: More self-confidence & motivation" : "Mitarbeiter entwickeln: Mehr Selbstvertrauen und Motivation",
    isEN ? "Improve teams: Better collaboration, less friction" : "Teams verbessern: Bessere Zusammenarbeit, weniger Reibung",
    isEN ? "Increase productivity: Motivated teams work more efficiently" : "Produktivität steigern: Motivierte Teams arbeiten effizienter",
    isEN ? "Increase retention: Satisfied employees stay more loyal" : "Mitarbeiterbindung erhöhen: Zufriedene Mitarbeiter bleiben loyaler",
    isEN ? "Strengthen company culture: More stability & solution orientation" : "Unternehmenskultur stärken: Mehr Stabilität und Lösungsorientierung",
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
        <div className="container-main py-4 md:py-8 lg:py-10">
          <div className="bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-4 md:p-7 shadow-sm">
            <p className="text-xs md:text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-1.5 md:mb-2">
              {isEN ? "For Companies & Organizations" : "Für Firmen & Organisationen"}
            </p>
            <h1 className="text-xl sm:text-3xl font-light text-[#1B3A5C] leading-snug md:leading-tight mb-2 md:mb-3 tracking-tight">
              {isEN ? "Leadership & Performance Coaching for Companies" : "Leadership & Performance Coaching für Unternehmen"}
            </h1>
            <p className="text-sm md:text-base text-foreground/80 leading-snug md:leading-relaxed max-w-3xl">
              {isEN
                ? "Professional Leadership & Performance Coaching supports companies in strategically developing executives and employees, unlocking potential, and sustainably improving collaboration. Through individually tailored coaching impulses, leadership skills, personal responsibility, motivation and team dynamics are strengthened."
                : "Professionelles Leadership & Performance Coaching unterstützt Unternehmen dabei, Führungskräfte und Mitarbeiter gezielt weiterzuentwickeln, Potenziale freizusetzen und die Zusammenarbeit nachhaltig zu verbessern. Durch individuell abgestimmte Coaching-Impulse werden Führungskompetenz, Eigenverantwortung, Motivation und Teamdynamik gestärkt."}
            </p>
          </div>
        </div>
      </section>

      {/* Topics — Banner */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-4 md:py-9">
          <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-4 md:p-7 shadow-sm">
            <h2 className="text-lg md:text-xl font-light text-[#1B3A5C] mb-3 md:mb-5 text-center tracking-tight">
              {isEN ? "Topics for Your Company" : "Themen für Ihr Unternehmen"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-5">
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
        <div className="container-main py-4 md:py-9">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-4 md:p-7 shadow-sm">
            <h2 className="text-lg md:text-xl font-light text-[#1B3A5C] mb-3 md:mb-5 tracking-tight">
              {isEN ? "Why Leadership & Performance Coaching is valuable:" : "Warum Leadership & Performance Coaching wertvoll ist:"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-3">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-2 text-[13px] md:text-sm leading-snug">
                  <span className="text-[#2E7D32] mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] md:text-sm text-muted-foreground mt-3 md:mt-5 max-w-3xl leading-snug">
              {isEN
                ? "Leadership & Performance Coaching creates the foundation for growth, clarity and sustainable development — because real business success starts with the people who shape it every day."
                : "Leadership & Performance Coaching schafft die Grundlage für Wachstum, Klarheit und nachhaltige Entwicklung — denn echter Unternehmenserfolg beginnt bei den Menschen, die ihn täglich gestalten."}
            </p>
          </div>
        </div>
      </section>

      {/* Evidence — Banner */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-7 shadow-sm">
            <h2 className="text-xl font-light text-primary mb-4 tracking-tight">
              {isEN ? "Science-Backed Approach" : "Wissenschaftlich fundierter Ansatz"}
            </h2>
            <div className="space-y-3 max-w-3xl text-sm text-foreground/80 leading-relaxed">
              <p>
                {isEN
                  ? "A meta-analysis published in the International Journal of Clinical and Experimental Hypnosis (2019) found that hypnosis-based interventions significantly improve workplace performance and stress resilience, with effect sizes comparable to or exceeding traditional coaching methods (d = 0.82)."
                  : "Eine Meta-Analyse im International Journal of Clinical and Experimental Hypnosis (2019) zeigt, dass hypnosebasierte Interventionen die Arbeitsleistung und Stressresilienz signifikant verbessern — mit Effektstärken vergleichbar oder höher als traditionelle Coaching-Methoden (d = 0,82)."}
              </p>
              <p>
                {isEN
                  ? "According to a study by the American Psychological Association (APA, 2020), organizations that invest in mental health and coaching programs see a return of $4 for every $1 invested, through reduced absenteeism and increased productivity."
                  : "Laut einer Studie der American Psychological Association (APA, 2020) erzielen Unternehmen, die in Mental-Health- und Coaching-Programme investieren, einen Return von 4 $ pro investiertem Dollar — durch weniger Fehlzeiten und höhere Produktivität."}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {isEN
                  ? "Sources: Int. Journal of Clinical and Experimental Hypnosis, Vol. 67(3), 2019; APA Center for Organizational Excellence, 2020."
                  : "Quellen: Int. Journal of Clinical and Experimental Hypnosis, Vol. 67(3), 2019; APA Center for Organizational Excellence, 2020."}
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

      <section className="bg-[#E8EDF3] py-5 lg:py-7">
        <div className="container-main">
          <div className="relative max-w-2xl mx-auto bg-white border border-[#1B3A5C]/15 rounded-2xl px-6 py-6 md:px-10 md:py-7 text-center shadow-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ECEEF1] text-[#1B3A5C] text-xs font-medium border border-[#1B3A5C]/25 px-4 py-1 rounded-full tracking-wide uppercase">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-2.5 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Take the Next Step for Your Team" : "Der nächste Schritt für Ihr Team"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-4">
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
