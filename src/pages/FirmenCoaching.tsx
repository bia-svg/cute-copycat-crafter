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

  const challenges = [
    isEN
      ? "Top performers operate under constant pressure and lose focus"
      : "Leistungsträger arbeiten unter konstantem Druck und verlieren Fokus",
    isEN
      ? "Executives make decisions hesitantly or too late"
      : "Führungskräfte treffen Entscheidungen unsicher oder zu spät",
    isEN
      ? "Teams perform below their potential despite high competence"
      : "Teams arbeiten unter ihren Möglichkeiten trotz hoher Kompetenz",
    isEN
      ? "Stress, overload and internal friction slow down results"
      : "Stress, Überlastung und interne Reibung bremsen die Ergebnisse",
    isEN
      ? "Goals are set, but not consistently achieved"
      : "Ziele werden gesetzt, aber nicht konsequent erreicht",
  ];

  const heroHighlights = [
    isEN ? "Clearer decisions" : "Klarere Entscheidungen",
    isEN ? "More focus and execution power" : "Mehr Fokus und Umsetzungskraft",
    isEN ? "Less stress and friction" : "Weniger Stress und Reibung",
    isEN ? "Significantly higher productivity" : "Deutlich höhere Produktivität",
  ];

  const investReasons = [
    isEN ? "Decisions are delayed" : "Entscheidungen werden verzögert",
    isEN ? "Pressure leads to mistakes" : "Druck führt zu Fehlern",
    isEN ? "Teams perform below their potential" : "Teams arbeiten unter ihrem Potenzial",
    isEN ? "Performance fluctuates strongly" : "Leistung schwankt stark",
  ];

  const benefits = [
    isEN
      ? "Clearer and faster decisions at leadership level"
      : "Klarere und schnellere Entscheidungen auf Führungsebene",
    isEN
      ? "Significantly higher execution speed in the team"
      : "Deutlich höhere Umsetzungsgeschwindigkeit im Team",
    isEN
      ? "More focus and less distraction in everyday work"
      : "Mehr Fokus und weniger Ablenkung im Arbeitsalltag",
    isEN
      ? "Reduction of stress and mental overload"
      : "Reduktion von Stress und mentaler Überlastung",
    isEN
      ? "Stable performance even under pressure"
      : "Stabilere Leistung auch unter Druck",
    isEN
      ? "Better collaboration and less internal friction"
      : "Bessere Zusammenarbeit und weniger interne Reibung",
    isEN
      ? "Measurable increase in productivity and results"
      : "Messbare Steigerung von Produktivität und Ergebnissen",
  ];

  const formats = [
    isEN ? "Intensive workshops for teams" : "Intensiv-Workshops für Teams",
    isEN ? "One-to-one coaching for executives" : "Einzel-Coaching für Führungskräfte",
    isEN ? "Combination of both approaches" : "Kombination aus beiden Ansätzen",
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

      {/* Hero — Premium silver-grey, centered */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-3.5 md:py-5 lg:py-6">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl px-5 py-4 md:px-7 md:py-5 shadow-sm text-center">
            <p className="text-[11px] md:text-xs font-medium text-[#2E7D32] uppercase tracking-wider mb-1.5 md:mb-2">
              {isEN ? "Business Coaching" : "Business Coaching"}
            </p>
            <h1 className="text-xl sm:text-2xl md:text-[1.7rem] font-light text-[#1B3A5C] leading-snug md:leading-[1.2] mb-2 md:mb-2.5 tracking-tight">
              {isEN ? "Success Training for Companies" : "Erfolgs-Training für Unternehmen"}
            </h1>
            <p className="text-[13.5px] md:text-[14.5px] text-foreground/80 leading-snug md:leading-[1.55] max-w-2xl mx-auto mb-2 md:mb-2.5 font-medium">
              {isEN
                ? "Sustainably increase the performance of your executives and employees — through targeted mental and performance coaching."
                : "Steigern Sie nachhaltig die Leistungsfähigkeit Ihrer Führungskräfte und Mitarbeiter – durch gezieltes Mental- und Performance Coaching."}
            </p>
            <div className="text-[13px] md:text-[14px] text-foreground/75 leading-snug md:leading-[1.55] max-w-2xl mx-auto space-y-1.5 md:space-y-2 text-left md:text-center">
              <p>
                {isEN
                  ? "David J. Woods works with companies, executives and high-performance teams that have to deliver results consistently under pressure. The focus is on clarity, execution power, mental stability and sustainable performance growth."
                  : "David J. Woods arbeitet mit Unternehmen, Führungskräften und High-Performance-Teams, die unter Druck konstant Ergebnisse liefern müssen. Im Fokus stehen Klarheit, Umsetzungskraft, mentale Stabilität und nachhaltige Leistungssteigerung."}
              </p>
              <p>
                {isEN
                  ? "Because the problem is rarely a lack of knowledge — but blockages, stress, pressure and unconscious behavioural patterns. This is exactly where the success training begins."
                  : "Denn nicht fehlendes Wissen ist das Problem – sondern Blockaden, Stress, Druck und unbewusste Verhaltensmuster. Genau hier setzt das Erfolgs-Training an."}
              </p>
              <p>
                {isEN
                  ? "Implementation takes place individually inside your company or in intensive one-to-one sessions — in Germany, Austria or Switzerland."
                  : "Die Umsetzung erfolgt individuell in Ihrem Unternehmen oder in intensiven Einzelsessions – in Deutschland, Österreich oder der Schweiz."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero — Narrower, premium, content-rich */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-3.5 md:py-5 lg:py-6">
          <div className="max-w-[640px] mx-auto bg-white/85 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl px-5 py-4 md:px-7 md:py-5 shadow-sm text-center">
            <p className="text-[11px] md:text-xs font-medium text-[#2E7D32] uppercase tracking-wider mb-1.5 md:mb-2">
              {isEN ? "Business Coaching" : "Business Coaching"}
            </p>
            <h1 className="text-xl sm:text-2xl md:text-[1.7rem] font-light text-[#1B3A5C] leading-snug md:leading-[1.2] mb-2 md:mb-2.5 tracking-tight">
              {isEN ? "Success Training for Companies" : "Erfolgs-Training für Unternehmen"}
            </h1>
            <p className="text-[13.5px] md:text-[14.5px] text-foreground/85 leading-snug md:leading-[1.5] mb-2 md:mb-2.5 font-medium">
              {isEN
                ? "Measurably increase the performance of your executives and employees."
                : "Steigern Sie messbar die Leistungsfähigkeit Ihrer Führungskräfte und Mitarbeiter."}
            </p>
            <div className="text-[13px] md:text-[13.5px] text-foreground/75 leading-snug md:leading-[1.55] space-y-1.5 md:space-y-2 text-left">
              <p>
                {isEN
                  ? "Success Training is not about motivation or theory — but about clear results in everyday work: better decisions, higher execution speed and stable performance under pressure."
                  : "Im Erfolgs-Training geht es nicht um Motivation oder Theorie – sondern um klare Ergebnisse im Alltag: bessere Entscheidungen, höhere Umsetzungsgeschwindigkeit und stabile Leistung unter Druck."}
              </p>
              <p>
                {isEN
                  ? "David J. Woods works with executives and teams that have to perform consistently. Through targeted mental and performance coaching, blockages are released and performance potential is unlocked."
                  : "David J. Woods arbeitet mit Führungskräften und Teams, die konstant funktionieren müssen. Durch gezieltes Mental- und Performance Coaching werden Blockaden gelöst und Leistungspotenziale freigesetzt."}
              </p>
            </div>
            <div className="mt-3 md:mt-3.5 pt-3 md:pt-3.5 border-t border-[#E8EDF3]">
              <p className="text-[11.5px] md:text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-1.5 md:mb-2">
                {isEN ? "Typical results:" : "Typische Ergebnisse:"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 md:gap-y-1.5 text-left">
                {heroHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-[12.5px] md:text-[13.5px] leading-snug">
                    <span className="text-[#2E7D32] mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Companies Invest — Banner */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-3.5 md:py-5">
          <div className="max-w-[640px] mx-auto bg-white/85 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-4 md:p-5 shadow-sm">
            <h2 className="text-base md:text-lg font-light text-[#1B3A5C] mb-2 md:mb-2.5 tracking-tight text-center">
              {isEN ? "Why companies invest here" : "Warum Unternehmen hier investieren"}
            </h2>
            <p className="text-[13px] md:text-[13.5px] text-foreground/80 leading-snug md:leading-[1.55] mb-2.5 md:mb-3 text-center">
              {isEN
                ? "Many companies don't have a knowledge problem — but an execution problem."
                : "Viele Unternehmen haben kein Wissensproblem – sondern ein Umsetzungsproblem."}
            </p>
            <p className="text-[12.5px] md:text-[13px] text-foreground/75 leading-snug mb-2 md:mb-2.5">
              {isEN
                ? "Strategies are in place, goals are clear, but:"
                : "Strategien sind vorhanden, Ziele sind klar, aber:"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1 md:gap-y-1.5">
              {investReasons.map((item) => (
                <div key={item} className="flex items-start gap-2 text-[12.5px] md:text-[13.5px] leading-snug">
                  <span className="text-[#2E7D32] mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[12.5px] md:text-[13.5px] text-muted-foreground mt-3 md:mt-3.5 leading-snug md:leading-[1.5] text-center">
              {isEN
                ? "This is exactly where the success training begins."
                : "Genau hier setzt das Erfolgs-Training an."}
            </p>
          </div>
        </div>
      </section>

      {/* Topics — Banner */}
      <section className="bg-[#E8EDF3]">
        <div className="container-main py-3.5 md:py-5">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-3.5 md:p-5 shadow-sm">
            <h2 className="text-base md:text-lg font-light text-[#1B3A5C] mb-2.5 md:mb-3 text-center tracking-tight">
              {isEN ? "Topics for Your Company" : "Themen für Ihr Unternehmen"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              {topics.map((item) => (
                <div key={item.title} className="topics-compact">
                  <ServiceCard
                    title={item.title}
                    description={item.desc}
                    href={item.href}
                    icon={item.icon}
                    image={item.image}
                    imagePosition={item.imagePosition}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits — Banner */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-3.5 md:py-5">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-3.5 md:p-5 shadow-sm">
            <h2 className="text-base md:text-lg font-light text-[#1B3A5C] mb-2.5 md:mb-3 tracking-tight text-center">
              {isEN ? "Results you can expect:" : "Diese Resultate können Sie erwarten:"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1 md:gap-y-1.5">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-2 text-[12.5px] md:text-[13.5px] leading-snug">
                  <span className="text-[#2E7D32] mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[12.5px] md:text-[13.5px] text-muted-foreground mt-2.5 md:mt-3 max-w-2xl mx-auto leading-snug md:leading-[1.5] text-center">
              {isEN
                ? "The aim is not motivation — but lasting change in behaviour and thinking."
                : "Ziel ist nicht Motivation – sondern nachhaltige Veränderung im Verhalten und Denken."}
            </p>
          </div>
        </div>
      </section>

      {/* Implementation — Banner */}
      <section className="bg-[#E8EDF3]">
        <div className="container-main py-3.5 md:py-5">
          <div className="max-w-[640px] mx-auto bg-white/85 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-4 md:p-5 shadow-sm">
            <h2 className="text-base md:text-lg font-light text-[#1B3A5C] mb-2 md:mb-2.5 tracking-tight text-center">
              {isEN ? "How the Success Training is implemented" : "Wie das Erfolgs-Training umgesetzt wird"}
            </h2>
            <p className="text-[13px] md:text-[13.5px] text-foreground/80 leading-snug md:leading-[1.55] mb-2.5 md:mb-3 text-center">
              {isEN
                ? "The training is individually tailored to your company."
                : "Das Training wird individuell auf Ihr Unternehmen abgestimmt."}
            </p>
            <p className="text-[12.5px] md:text-[13px] text-foreground/75 leading-snug mb-2 md:mb-2.5">
              {isEN ? "Possible formats:" : "Mögliche Formate:"}
            </p>
            <div className="space-y-1 md:space-y-1.5">
              {formats.map((item) => (
                <div key={item} className="flex items-start gap-2 text-[12.5px] md:text-[13.5px] leading-snug">
                  <span className="text-[#2E7D32] mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[12.5px] md:text-[13.5px] text-foreground/75 mt-3 md:mt-3.5 leading-snug md:leading-[1.55]">
              {isEN
                ? "Implementation takes place directly inside your company or in intensive one-to-one sessions."
                : "Die Umsetzung erfolgt direkt bei Ihnen im Unternehmen oder in intensiven Einzelsessions."}
            </p>
            <p className="text-[12.5px] md:text-[13.5px] text-muted-foreground mt-2 md:mt-2.5 leading-snug md:leading-[1.5] text-center italic">
              {isEN
                ? "The goal is always: fast, noticeable and sustainable results."
                : "Ziel ist immer: schnelle, spürbare und nachhaltige Ergebnisse."}
            </p>
          </div>
        </div>
      </section>

      {/* Evidence — Banner */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-3.5 md:py-5">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-3.5 md:p-4 shadow-sm">
            <h2 className="text-base md:text-lg font-light text-primary mb-2 md:mb-2.5 tracking-tight text-center">
              {isEN ? "Science-Backed Approach" : "Wissenschaftlich fundierter Ansatz"}
            </h2>
            <div className="space-y-1.5 md:space-y-2 text-[12.5px] md:text-[13.5px] text-foreground/80 leading-snug md:leading-[1.5]">
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
              <p className="text-[9.5px] md:text-[10.5px] text-muted-foreground/60 italic leading-snug pt-1">
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
          { q: "How does corporate coaching work in practice?", a: "Programs are individually tailored to your company. Typical elements are analysis, targeted coaching impulses and direct application in everyday work." },
          { q: "How quickly are first results visible?", a: "In many cases, first changes appear after just a few sessions — especially in leadership, communication and stress behaviour." },
          { q: "Is the effect sustainable?", a: "Yes. The aim is not short-term motivation, but a lasting change of thinking and behavioural patterns." },
          { q: "Which companies is this suitable for?", a: "For companies of any size — particularly valuable in contexts of high responsibility, performance pressure or change processes." },
          { q: "Can sessions be conducted in English?", a: "Yes, all programs are also fully available in English." },
        ] : [
          { q: "Wie läuft ein Firmen-Coaching konkret ab?", a: "Die Programme werden individuell auf Ihr Unternehmen abgestimmt. Typisch sind Analyse, gezielte Coaching-Impulse und die direkte Umsetzung im Arbeitsalltag." },
          { q: "Wie schnell sind erste Ergebnisse sichtbar?", a: "In vielen Fällen zeigen sich erste Veränderungen bereits nach wenigen Sitzungen – insbesondere in Führung, Kommunikation und Stressverhalten." },
          { q: "Ist der Effekt nachhaltig?", a: "Ja. Ziel ist nicht kurzfristige Motivation, sondern eine dauerhafte Veränderung von Denk- und Verhaltensmustern." },
          { q: "Für welche Unternehmen ist das geeignet?", a: "Für Unternehmen jeder Größe – besonders sinnvoll bei hoher Verantwortung, Leistungsdruck oder Veränderungsprozessen." },
          { q: "Können Sitzungen auf Englisch durchgeführt werden?", a: "Ja, alle Programme sind auch vollständig auf Englisch möglich." },
        ]}
      />

      {/* Audience — Banner */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-3.5 md:py-5">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-3.5 md:p-5 shadow-sm">
            <h2 className="text-base md:text-lg font-light text-[#1B3A5C] mb-2.5 md:mb-3 tracking-tight text-center">
              {isEN ? "Who is this training for?" : "Für wen ist dieses Training geeignet?"}
            </h2>
            <div className="space-y-1.5 md:space-y-2 text-[12.5px] md:text-[13.5px] text-foreground/80 leading-snug md:leading-[1.55] text-center max-w-2xl mx-auto">
              <p>
                {isEN
                  ? "For companies that expect more than classical workshops."
                  : "Für Unternehmen, die mehr erwarten als klassische Workshops."}
              </p>
              <p>
                {isEN
                  ? "For executives who carry responsibility and have to perform under pressure."
                  : "Für Führungskräfte, die Verantwortung tragen und unter Druck funktionieren müssen."}
              </p>
              <p>
                {isEN
                  ? "For teams that should unlock their full potential — not just in theory, but in everyday work."
                  : "Für Teams, die ihr volles Potenzial ausschöpfen sollen – nicht nur theoretisch, sondern im Alltag."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#E8EDF3] py-3 md:py-3.5 lg:py-4">
        <div className="container-main">
          <div className="relative max-w-xl mx-auto bg-white border border-[#1B3A5C]/15 rounded-2xl px-5 py-3.5 md:px-8 md:py-4 text-center shadow-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ECEEF1] text-[#1B3A5C] text-[10.5px] font-medium border border-[#1B3A5C]/25 px-3.5 py-0.5 rounded-full tracking-wide uppercase">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </div>
            <h2 className="text-lg md:text-xl font-light text-foreground mb-1 md:mb-1 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Take the Next Step for Your Team" : "Der nächste Schritt für Ihr Team"}
            </h2>
            <p className="text-[12.5px] md:text-[14px] text-muted-foreground max-w-md mx-auto mb-2 md:mb-2.5 leading-snug">
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
