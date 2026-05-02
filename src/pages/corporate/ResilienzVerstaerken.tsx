import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { CheckCircle, ArrowLeft } from "lucide-react";
import corporateResilienceImg from "@/assets/corporate-resilience.jpg";

export default function ResilienzVerstaerken() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const pillars = [
    {
      title: isEN ? "Optimism" : "Optimismus",
      desc: isEN
        ? "Focus on solutions instead of problems – stay capable of acting even under pressure."
        : "Fokus auf Lösungen statt Probleme – auch unter Druck handlungsfähig bleiben.",
    },
    {
      title: isEN ? "Acceptance" : "Akzeptanz",
      desc: isEN
        ? "Recognise situations clearly and direct energy purposefully towards solutions."
        : "Situationen klar erkennen und Energie gezielt für Lösungen einsetzen.",
    },
    {
      title: isEN ? "Solution Orientation" : "Lösungsorientierung",
      desc: isEN
        ? "Move from problem-thinking to action – concrete steps instead of standstill."
        : "Vom Problemdenken ins Handeln wechseln – konkrete Schritte statt Stillstand.",
    },
    {
      title: isEN ? "Personal Responsibility" : "Eigenverantwortung",
      desc: isEN
        ? "Take responsibility and actively shape outcomes instead of reacting."
        : "Verantwortung übernehmen und aktiv gestalten statt reagieren.",
    },
    {
      title: isEN ? "Self-Efficacy" : "Selbstwirksamkeit",
      desc: isEN
        ? "Trust in your own ability to master challenges successfully."
        : "Vertrauen in die eigene Fähigkeit, Herausforderungen erfolgreich zu meistern.",
    },
    {
      title: isEN ? "Network & Support" : "Netzwerk & Unterstützung",
      desc: isEN
        ? "Strong relationships create stability – especially in demanding phases."
        : "Starke Beziehungen schaffen Stabilität – besonders in anspruchsvollen Phasen.",
    },
    {
      title: isEN ? "Future Orientation" : "Zukunftsorientierung",
      desc: isEN
        ? "A clear view forward – define goals and pursue them consistently."
        : "Klarer Blick nach vorne – Ziele definieren und konsequent umsetzen.",
    },
  ];

  const coachingBenefits = [
    isEN ? "Mental stability under pressure" : "Mentale Stabilität unter Druck",
    isEN ? "Confident handling of stress & strain" : "Souveräner Umgang mit Stress & Belastung",
    isEN ? "Faster recovery after setbacks" : "Schnelleres Gleichgewicht nach Rückschlägen",
    isEN ? "Clearer decisions in difficult situations" : "Klarere Entscheidungen in schwierigen Situationen",
    isEN ? "More focus and inner calm in daily work" : "Mehr Fokus und innere Ruhe im Arbeitsalltag",
    isEN ? "Stronger leadership competence" : "Stärkere Führungskompetenz",
    isEN ? "Sustainable personal development" : "Nachhaltige persönliche Entwicklung",
  ];

  const steps = [
    isEN ? "Analysis of the current stress and strain situation" : "Analyse der aktuellen Stress- und Belastungssituation",
    isEN ? "Identification of limiting thought and behaviour patterns" : "Identifikation limitierender Denk- und Verhaltensmuster",
    isEN ? "Development of concrete strategies for daily work" : "Entwicklung konkreter Strategien für den Arbeitsalltag",
    isEN ? "Training of focus, clarity and decision-making ability" : "Training von Fokus, Klarheit und Entscheidungsfähigkeit",
    isEN ? "Practical implementation directly in the company" : "Praktische Umsetzung direkt im Unternehmen",
    isEN ? "Integration into existing leadership and team structures" : "Integration in bestehende Führungs- und Teamstrukturen",
    isEN ? "Sustainable anchoring of the new strategies" : "Nachhaltige Verankerung der neuen Strategien",
  ];

  return (
    <>
      <SEO
        titleDE="Resilienz Coaching für Unternehmen — David J. Woods"
        titleEN="Resilience Coaching for Companies — David J. Woods"
        descriptionDE="Resilienz Coaching für Unternehmen. Mentale Widerstandskraft für Führungskräfte und Teams – stabile Leistung unter Druck."
        descriptionEN="Resilience coaching for companies. Mental strength for leaders and teams – stable performance under pressure."
        pageKey="corporateResilienz"
        breadcrumbs={[
          { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
          { name: isEN ? "Business Coaching" : "Firmen-Coaching", path: getPath("corporate", language, country) },
          { name: isEN ? "Resilience Building" : "Resilienz-Verstärken", path: getPath("corporateResilienz", language, country) },
        ]}
      />

      {/* Hero */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-5 md:py-7">
          <Link to={getPath("corporate", language, country)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="w-4 h-4" /> {isEN ? "Back to overview" : "Zurück zur Übersicht"}
          </Link>
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-4 md:p-6 shadow-sm grid md:grid-cols-[1.35fr_1fr] gap-4 md:gap-6 md:items-center">
            <div>
              <p className="text-xs font-medium text-[#2E7D32] uppercase tracking-wider mb-1.5">Business Coaching</p>
              <h1 className="text-xl sm:text-2xl md:text-[1.6rem] font-light text-[#1B3A5C] leading-tight mb-2 tracking-tight">
                {isEN ? "Resilience Coaching for Companies" : "Resilienz Coaching für Unternehmen"}
              </h1>
              <p className="text-sm text-foreground/90 leading-snug mb-2.5">
                {isEN
                  ? "Specifically strengthen the mental resilience of your leaders and employees – for stable performance under pressure, in change and in demanding situations."
                  : "Stärken Sie gezielt die mentale Widerstandskraft Ihrer Führungskräfte und Mitarbeiter – für stabile Leistung auch unter Druck, in Veränderung und in anspruchsvollen Situationen."}
              </p>

              <div className="prose prose-sm max-w-none text-foreground/85 space-y-1.5 text-sm leading-snug">
                <p>
                  {isEN
                    ? "Resilience is a decisive success factor in business today. Stress, pressure, rapid change and high expectations are part of daily work."
                    : "Resilienz ist heute ein entscheidender Erfolgsfaktor im Unternehmen. Stress, Druck, schnelle Veränderungen und hohe Erwartungen gehören zum Alltag."}
                </p>
                <p>
                  {isEN
                    ? "Resilience Coaching with David J. Woods is not about theory – but about concrete, measurable results: clear decisions, stable performance and confident handling of challenges."
                    : "Im Resilienz Coaching mit David J. Woods geht es nicht um Theorie – sondern um konkrete, messbare Ergebnisse: klare Entscheidungen, stabile Leistung und souveräner Umgang mit Herausforderungen."}
                </p>
                <p>
                  {isEN
                    ? "The focus is on sustainably changing thought and behaviour patterns – exactly where stress arises and performance is lost."
                    : "Der Fokus liegt auf der nachhaltigen Veränderung von Denk- und Verhaltensmustern – genau dort, wo Stress entsteht und Leistung verloren geht."}
                </p>
                <p>
                  {isEN
                    ? "Delivered directly on-site or in intensive one-to-one coaching – in Germany, Austria and Switzerland."
                    : "Umsetzung direkt im Unternehmen oder in intensiven Einzelcoachings – in Deutschland, Österreich und der Schweiz."}
                </p>
              </div>

              <div className="mt-3.5">
                <Link to={`${getPath("contact", language, country)}?concern=corporate`}>
                  <Button className="bg-[#ECEEF1] hover:bg-[#E2E5E9] text-[#1B3A5C] font-medium px-6 py-2.5 border border-[#1B3A5C]/25 shadow-none">
                    {isEN ? "Request Consultation" : "Beratung anfragen"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:order-last">
              <img
                src={corporateResilienceImg}
                alt={isEN ? "Resilience Coaching" : "Resilienz Coaching"}
                className="w-full h-40 md:h-full md:max-h-[300px] object-cover rounded-2xl border border-[#E2E8EE]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7 Pillars — dark editorial timeline */}
      <section className="bg-[#F1F4F7]">
        <div className="container-main py-10 md:py-14">
          <div className="max-w-4xl mx-auto bg-[#2A2F36] rounded-3xl shadow-[0_20px_60px_-30px_rgba(20,24,30,0.45)] overflow-hidden">
            <div className="px-6 md:px-12 pt-9 md:pt-12 pb-6 md:pb-8 text-center border-b border-white/10">
              <p className="text-[11px] font-medium text-white/55 uppercase tracking-[0.22em] mb-2.5">
                {isEN ? "Framework" : "Framework"}
              </p>
              <h2 className="text-2xl md:text-[1.8rem] font-light text-white tracking-tight">
                {isEN ? "The 7 Pillars of Resilience" : "Die 7 Säulen der Resilienz"}
              </h2>
            </div>

            <div className="relative px-6 md:px-12 py-8 md:py-10">
              <div className="absolute left-[42px] md:left-[64px] top-8 bottom-8 w-px bg-white/10" aria-hidden />

              <ol className="space-y-5 md:space-y-6">
                {pillars.map((p, i) => (
                  <li key={i} className="relative grid grid-cols-[44px_1fr] md:grid-cols-[64px_1fr] gap-4 md:gap-6 items-start">
                    <div className="relative flex items-center justify-center">
                      <span className="relative z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/[0.06] text-white text-sm md:text-base font-medium flex items-center justify-center tabular-nums ring-1 ring-white/15 ring-offset-4 ring-offset-[#2A2F36]">
                        {i + 1}
                      </span>
                    </div>
                    <div className="min-w-0 pt-1.5 md:pt-2">
                      <h3 className="text-[15px] md:text-base font-medium text-white tracking-tight mb-1">
                        {p.title}
                      </h3>
                      <p className="text-sm text-white/65 leading-snug">{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

            <div className="relative px-6 md:px-12 py-8 md:py-10">
              {/* vertical guide line */}
              <div className="absolute left-[42px] md:left-[64px] top-8 bottom-8 w-px bg-white/10" aria-hidden />

              <ol className="space-y-5 md:space-y-6">
                {pillars.map((p, i) => (
                  <li key={i} className="relative grid grid-cols-[44px_1fr] md:grid-cols-[64px_1fr] gap-4 md:gap-6 items-start">
                    <div className="relative flex items-center justify-center">
                      <span className="relative z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white text-[#1B3A5C] text-sm md:text-base font-medium flex items-center justify-center tabular-nums ring-4 ring-[#1B3A5C]">
                        {i + 1}
                      </span>
                    </div>
                    <div className="min-w-0 pt-1.5 md:pt-2">
                      <h3 className="text-[15px] md:text-base font-medium text-white tracking-tight mb-1">
                        {p.title}
                      </h3>
                      <p className="text-sm text-white/70 leading-snug">{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits + Steps */}
      <section className="bg-[#E8EDF3]">
        <div className="container-main py-8 md:py-10">
          <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10">
              <div>
                <h2 className="text-lg md:text-xl font-light text-[#1B3A5C] mb-5 tracking-tight">
                  {isEN ? "Resilience Coaching for Your Company:" : "Resilienz Coaching für Ihr Unternehmen:"}
                </h2>
                <div className="space-y-3.5">
                  {coachingBenefits.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-[15px]">
                      <CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0 mt-1" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-light text-[#1B3A5C] mb-5 tracking-tight">
                  {isEN ? "How Resilience is Trained Concretely:" : "So wird Resilienz konkret trainiert:"}
                </h2>
                <div className="space-y-3.5">
                  {steps.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-[15px]">
                      <CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0 mt-1" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-10 md:py-12 flex justify-center">
          <div className="relative bg-white border border-[#1B3A5C]/15 rounded-2xl px-8 py-8 text-center max-w-2xl w-full">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ECEEF1] text-[#1B3A5C] text-xs font-medium border border-[#1B3A5C]/25 px-4 py-1 rounded-full whitespace-nowrap">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </span>
            <h2 className="text-xl md:text-2xl font-light text-primary mb-2 mt-2 tracking-tight">
              {isEN ? "Start Resilience Coaching Now" : "Starten Sie jetzt mit Resilienz Coaching"}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-5">
              {isEN
                ? "Strengthen your team sustainably – for more stability, focus and performance in daily work."
                : "Stärken Sie Ihr Team nachhaltig – für mehr Stabilität, Fokus und Leistung im Alltag."}
            </p>
            <Link to={`${getPath("contact", language, country)}?concern=corporate`}>
              <Button className="bg-[#ECEEF1] hover:bg-[#E2E5E9] text-[#1B3A5C] font-medium px-8 py-3 text-base border border-[#1B3A5C]/25 shadow-none">
                {isEN ? "Request Consultation" : "Beratung anfragen"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
