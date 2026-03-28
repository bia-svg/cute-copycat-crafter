import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { Trophy, Shield, Clock, Cigarette, ArrowRight } from "lucide-react";

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
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: isEN ? "Resilience Building" : "Resilienz-Verstärken",
      desc: isEN
        ? "Through resilience coaching, participants work primarily on inner strength — essential in difficult times, under pressure, stress or problems."
        : "Durch das Resilienz Coaching arbeiten die Teilnehmer vor allem an der inneren Stärke. Diese ist vor allem in schweren Zeiten und bei aufkommendem Druck sowie Ärger, Stress oder Problemen wichtig.",
      href: getPath("corporateResilienz", language, country),
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: isEN ? "Stress Prevention" : "Stress-Prävention",
      desc: isEN
        ? "David J. Woods and his team have been supporting people from business, sports, and the music industry with burnout prevention for over 20 years."
        : "Mit der Burnout-Prävention unterstützen David J. Woods und sein Team seit mehr als 20 Jahren Menschen aus Wirtschaft, Leistungssport und vielen weiteren Tätigkeitsfeldern.",
      href: getPath("corporateStress", language, country),
    },
    {
      icon: <Cigarette className="w-6 h-6" />,
      title: isEN ? "Non-Smoker Seminars" : "Nichtraucher Seminare",
      desc: isEN
        ? "The 'Non-smoker in 3 hours' program is more than simple smoking cessation. It permanently boosts your employees' performance."
        : "Das Programm \u201eNichtraucher in 3 Stunden\u201c ist mehr als eine einfache Rauchentwöhnung. Denn durch dieses Business Coaching steigern Ihre Mitarbeiter dauerhaft ihre Leistungsfähigkeit.",
      href: getPath("corporateNichtraucher", language, country),
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
      <SEO {...pageSEO.corporate} />

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {topics.map((item) => (
              <Link key={item.title} to={item.href} className="bg-white border border-border p-6 hover:border-[#1B3A5C] transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#1B3A5C]">{item.icon}</span>
                  <h3 className="font-semibold text-[#1B3A5C]">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#2E7D32] group-hover:underline">
                  Details <ArrowRight className="w-4 h-4" />
                </span>
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
