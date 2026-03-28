import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function ResilienzVerstaerken() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const pillars = [
    { title: isEN ? "Optimism" : "Optimismus", desc: isEN ? "Stay positive even in difficult times and focus on the light at the end of the tunnel." : "Gerade in schweren Zeiten ist es wichtiger denn je, sich nicht unterkriegen zu lassen und den Fokus auf das Positive zu richten." },
    { title: isEN ? "Acceptance" : "Akzeptanz", desc: isEN ? "Accept the facts to gain strength for action instead of wasting energy on denial." : "Die Tatsachen akzeptieren, um Kraft für Handlungen zu gewinnen, anstatt Energie in Ablehnung zu verschwenden." },
    { title: isEN ? "Solution Orientation" : "Lösungsorientierung", desc: isEN ? "Focus on solutions rather than problems. Move from victim to creator." : "Fokus auf Lösungen statt auf Probleme. Aus der Opfer-Rolle in die Gestalter-Position wechseln." },
    { title: isEN ? "Leaving the Victim Role" : "Verlassen der Opfer-Rolle", desc: isEN ? "Move into the creator role with optimistic, solution-oriented thinking." : "In die Gestalter-Rolle wechseln mit optimistischem, lösungsorientiertem Denken." },
    { title: isEN ? "Taking Responsibility" : "Verantwortungsübernahme", desc: isEN ? "Take responsibility as the creator of your own life." : "Verantwortung übernehmen als Gestalter des eigenen Lebens." },
    { title: isEN ? "Network Building" : "Netzwerk-Aufbau", desc: isEN ? "Build strong relationships that provide support in difficult times." : "Starke Beziehungen aufbauen, die in schweren Zeiten Halt geben." },
    { title: isEN ? "Future Planning" : "Zukunftsplanung", desc: isEN ? "Think ahead and plan solutions for possible crises in good times." : "Vorausblickendes Denken und Handeln, auch in guten Zeiten über Lösungen nachdenken." },
  ];

  const coachingBenefits = [
    isEN ? "Develop mental stability" : "Entwicklung geistiger Stabilität",
    isEN ? "Use challenges as growth opportunities" : "Nutzen von Herausforderungen als Wachstumschancen",
    isEN ? "Withstand pressure & stress without harm" : "Problemloses Aushalten von Druck & Stress ohne Schaden",
    isEN ? "Train crisis-proof skills" : "Training von krisenfesten Fähigkeiten",
    isEN ? "Quick balance after setbacks" : "Schnelles Gleichgewicht nach Tiefschlägen",
    isEN ? "Further development in all life situations" : "Weiterentwicklung in allen Lebenssituationen",
    isEN ? "Examine own values & beliefs" : "Auseinandersetzung mit eigenen Werten & Glaubenssätzen",
    isEN ? "Strengthen decision-making courage" : "Stärkung von Entscheidungsmut und Vertrauen in das Leben",
  ];

  const steps = [
    isEN ? "Analysis of your own resilience profile" : "Analyse des eigenen Resilienz-Profils",
    isEN ? "Resilience toolkit for office life" : "Resilienz-Baukasten für den Büroalltag",
    isEN ? "Review basic patterns, attitudes & evaluations" : "Grundmuster, Einstellungen & Bewertungen überprüfen",
    isEN ? "Learn and use mindfulness" : "Achtsamkeit kennenlernen und nutzen",
    isEN ? "Recognize scope for action more clearly" : "Handlungsspielräume klarer erkennen",
    isEN ? "Define concrete plans and strengthen commitment" : "Konkrete Vorhaben festlegen und Commitment stärken",
    isEN ? "Reflection & transfer using personal case studies" : "Reflexion & Transfer anhand persönlicher Fallbeispiele",
  ];

  return (
    <>
      <SEO
        titleDE="Resilienz Coaching für Unternehmen — David J. Woods"
        titleEN="Resilience Coaching for Companies — David J. Woods"
        descriptionDE="Resilienz Coaching für innere Stärke. Die 7 Säulen der Resilienz. Meistern Sie Herausforderungen durch innere Stärke."
        descriptionEN="Resilience coaching for inner strength. The 7 pillars of resilience. Master challenges through inner strength."
      />

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <Link to={getPath("corporate", language, country)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" /> {isEN ? "Back to overview" : "Zurück zur Übersicht"}
          </Link>

          <p className="text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-2">Business Coaching</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] leading-tight mb-6">
            {isEN ? "Resilience Coaching by David J. Woods" : "Resilienz Coaching by David J. Woods"}
          </h1>

          <div className="prose prose-sm max-w-none text-foreground space-y-4">
            <p>
              {isEN
                ? "A resilience coaching for inner strength is a great opportunity not only in difficult times. In today's world, performance pressure at work, conflicts with colleagues, or personal setbacks affect more and more people. The key is how we deal with negative experiences. Inner strength enables us to better handle challenges instead of seeing them as insurmountable hurdles."
                : "Ein Resilienz Coaching für innere Stärke ist nicht nur in schweren Zeiten eine großartige Möglichkeit. Denn gerade in der heutigen Zeit setzen Leistungsdruck im Beruf, Ärger mit Kollegen oder persönliche Schicksalsschläge vielen Menschen immer stärker zu. Doch wir alle erleben immer wieder negative Erfahrungen im Laufe unseres Lebens, weshalb es entscheidend ist, wie wir mit diesen umgehen. Innere Stärke ermöglicht es uns, besser mit negativen Erfahrungen umzugehen und Herausforderungen anzunehmen."}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "The 7 Pillars of Resilience" : "Die 7 Säulen der Resilienz"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((p, i) => (
              <div key={i} className="bg-white border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#1B3A5C] text-white text-xs flex items-center justify-center font-bold">{i + 1}</span>
                  <h3 className="font-semibold text-sm text-[#1B3A5C]">{p.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-border">
        <div className="container-main py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-bold text-[#1B3A5C] mb-4">{isEN ? "Resilience Coaching Benefits:" : "Resilienz Coaching für innere Stärke:"}</h2>
              <div className="space-y-2">
                {coachingBenefits.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1B3A5C] mb-4">{isEN ? "Concrete Steps:" : "Konkrete Schritte im Resilienz Coaching:"}</h2>
              <div className="space-y-2">
                {steps.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#8b827c] text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Start Your Resilience Coaching Now" : "Starten Sie jetzt mit dem Resilienz Coaching"}
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
