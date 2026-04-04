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
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: isEN ? "Resilience Building" : "Resilienz-Verstärken",
      desc: isEN
        ? "Through resilience coaching, participants work primarily on inner strength — essential in difficult times, under pressure, stress or problems."
        : "Durch das Resilienz Coaching arbeiten die Teilnehmer vor allem an der inneren Stärke. Diese ist vor allem in schweren Zeiten und bei aufkommendem Druck sowie Ärger, Stress oder Problemen wichtig.",
      href: getPath("corporateResilienz", language, country),
      image: corporateResilienceImg,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: isEN ? "Stress Prevention" : "Stress-Prävention",
      desc: isEN
        ? "David J. Woods and his team have been supporting people from business, sports, and the music industry with burnout prevention for over 20 years."
        : "Mit der Burnout-Prävention unterstützen David J. Woods und sein Team seit mehr als 20 Jahren Menschen aus Wirtschaft, Leistungssport und vielen weiteren Tätigkeitsfeldern.",
      href: getPath("corporateStress", language, country),
      image: corporateStressImg,
    },
    {
      icon: <Cigarette className="w-6 h-6" />,
      title: isEN ? "Non-Smoker Seminars" : "Nichtraucher Seminare",
      desc: isEN
        ? "The 'Non-smoker in 3 hours' program is more than simple smoking cessation. It permanently boosts your employees' performance."
        : "Das Programm \u201eNichtraucher in 3 Stunden\u201c ist mehr als eine einfache Rauchentwöhnung. Denn durch dieses Business Coaching steigern Ihre Mitarbeiter dauerhaft ihre Leistungsfähigkeit.",
      href: getPath("corporateNichtraucher", language, country),
      image: corporateNonsmokerImg,
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

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <p className="text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-2">
            {isEN ? "For Companies & Organizations" : "Für Firmen & Organisationen"}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] leading-tight mb-4">
            {isEN ? "Leadership & Performance Coaching for Companies" : "Leadership & Performance Coaching für Unternehmen"}
          </h1>
          <p className="text-base text-foreground leading-relaxed mb-6 max-w-3xl">
            {isEN
              ? "Professional Leadership & Performance Coaching supports companies in strategically developing executives and employees, unlocking potential, and sustainably improving collaboration. Through individually tailored coaching impulses, leadership skills, personal responsibility, motivation and team dynamics are strengthened."
              : "Professionelles Leadership & Performance Coaching unterstützt Unternehmen dabei, Führungskräfte und Mitarbeiter gezielt weiterzuentwickeln, Potenziale freizusetzen und die Zusammenarbeit nachhaltig zu verbessern. Durch individuell abgestimmte Coaching-Impulse werden Führungskompetenz, Eigenverantwortung, Motivation und Teamdynamik gestärkt."}
          </p>
        </div>
      </section>

      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "Topics for Your Company" : "Themen für Ihr Unternehmen"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {topics.map((item) => (
              <Link key={item.title} to={item.href} className="block bg-white border border-border rounded-lg shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 group overflow-hidden">
                {/* Mobile: horizontal card matching session service cards */}
                <div className="flex md:hidden">
                  <div className="w-28 min-h-[7rem] shrink-0 bg-primary/5 flex items-center justify-center">
                    <span className="text-primary w-10 h-10">{item.icon}</span>
                  </div>
                  <div className="flex flex-col justify-center p-4 min-w-0">
                    <h3 className="font-semibold text-foreground text-[0.95rem] leading-tight mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-cta group-hover:gap-2 transition-all">
                      Details <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                {/* Desktop: vertical card */}
                <div className="hidden md:block p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-primary">{item.icon}</span>
                    <h3 className="font-semibold text-primary">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-cta group-hover:gap-2 transition-all">
                    Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "Why Leadership & Performance Coaching is valuable:" : "Warum Leadership & Performance Coaching wertvoll ist:"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm">
                <span className="text-[#2E7D32] mt-0.5">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6 max-w-3xl">
            {isEN
              ? "Leadership & Performance Coaching creates the foundation for growth, clarity and sustainable development — because real business success starts with the people who shape it every day."
              : "Leadership & Performance Coaching schafft die Grundlage für Wachstum, Klarheit und nachhaltige Entwicklung — denn echter Unternehmenserfolg beginnt bei den Menschen, die ihn täglich gestalten."}
          </p>
        </div>
      </section>

      {/* Evidence-Based Section */}
      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-primary mb-4">
            {isEN ? "Science-Backed Approach" : "Wissenschaftlich fundierter Ansatz"}
          </h2>
          <div className="space-y-4 max-w-3xl text-sm text-foreground leading-relaxed">
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

      <section className="bg-[#8b827c] text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Invest in Your Team's Potential" : "Investieren Sie in das Potenzial Ihres Teams"}
          </h2>
          <Link to={`${getPath("contact", language, country)}?concern=corporate`}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3 text-base">
              {isEN ? "Request Consultation" : "Beratung anfragen"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
