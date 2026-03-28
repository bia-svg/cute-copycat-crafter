import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { ArrowLeft } from "lucide-react";

export default function StressPraevention() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const outerCauses = isEN
    ? ["High workload", "Stress & pressure", "Lack of resources (personnel, finances)", "Missing or little positive feedback", "Constant confrontation with problems", "No clear boundary between work and private life", "Unclear or too-high expectations", "Poor work organization & structures", "Bad teamwork, many conflicts", "Overwhelm from overly complex tasks"]
    : ["Hohe Arbeitsbelastung", "Stress & Druck", "Mangelnde Ressourcen (Personal, Finanzmittel)", "Fehlendes oder wenig positives Feedback", "Ständige Konfrontation mit Problemen", "Keine klare Abgrenzung zwischen Beruf und Privatleben", "Unklare oder zu hohe Erwartungen und Zielvorgaben", "Mangelhafte Arbeitsorganisation, Strukturen und Rahmenbedingungen", "Schlechte Teamarbeit, viele Konflikte", "Überforderung durch zu komplexe oder sich ständig ändernde Aufgaben"];

  const innerCauses = isEN
    ? ["High ideals / ambition", "Perfectionism", "Inability to say no", "Fear of rejection", "Fear of not meeting others' expectations", "Fear of failure", "Fear of criticism", "Desire to be the best", "Desire for recognition & appreciation", "Desire for material security"]
    : ["Hohe Ideale / Ehrgeiz", "Perfektionismus", "Unfähigkeit, \"Nein\" zu sagen", "Angst vor Ablehnung", "Angst, den Erwartungen anderer nicht zu entsprechen", "Angst vor Versagen", "Angst vor Kritik", "Wunsch, gut, der/die Beste zu sein", "Wunsch nach Anerkennung, Wertschätzung", "Wunsch nach materieller Sicherheit"];

  const phases = [
    { phase: "1", title: isEN ? "Urge to prove oneself" : "Zwang, sich zu beweisen", quote: isEN ? "I want to achieve something!" : "Ich will etwas schaffen!" },
    { phase: "2", title: isEN ? "Increased effort" : "Verstärkter Einsatz", quote: isEN ? "I need to try even harder!" : "Ich muss mich noch mehr anstrengen!" },
    { phase: "3", title: isEN ? "Subtle neglect of own needs" : "Subtile Vernachlässigung eigener Bedürfnisse", quote: isEN ? "That's not so important right now!" : "Das ist jetzt nicht so wichtig!" },
    { phase: "4", title: isEN ? "Suppression of conflicts & needs" : "Verdrängung von Konflikten & Bedürfnissen", quote: isEN ? "Others don't understand me!" : "Die Anderen verstehen mich nicht!" },
    { phase: "5", title: isEN ? "Reinterpretation of values" : "Umdeutung von Werten", quote: isEN ? "That's not important to me anymore!" : "Das ist mir nicht mehr so wichtig!" },
    { phase: "6", title: isEN ? "Increased denial of problems" : "Verstärkte Verleugnung auftretender Probleme", quote: isEN ? "Nobody understands me!" : "Keiner versteht mich!" },
    { phase: "7", title: isEN ? "Social withdrawal" : "Sozialer Rückzug", quote: isEN ? "I just need peace and quiet now!" : "Ich brauche jetzt einfach nur Ruhe!" },
    { phase: "8", title: isEN ? "Observable behavior changes" : "Beobachtbare Verhaltensänderungen", quote: isEN ? "Withdrawal or aggression, shaky voice" : "Zurückgezogenheit oder Aggressivität, zittrige Stimme" },
    { phase: "9", title: isEN ? "Loss of sense of own personality" : "Verlust des Gefühls der eigenen Persönlichkeit", quote: isEN ? "What actually defines me?" : "Was macht mich eigentlich aus?" },
    { phase: "10", title: isEN ? "Inner emptiness" : "Innere Leere", quote: isEN ? "What am I doing all this for?" : "Wozu mache ich das alles eigentlich?" },
    { phase: "11", title: isEN ? "Depression" : "Depressionen", quote: isEN ? "Does my life even make sense?" : "Macht mein Leben überhaupt noch einen Sinn?" },
    { phase: "12", title: isEN ? "Complete burnout exhaustion" : "Völlige Burnout-Erschöpfung", quote: isEN ? "I can't go on!" : "Ich kann nicht mehr!" },
  ];

  return (
    <>
      <SEO
        titleDE="Stress-Prävention & Burnout-Vorbeugung — David J. Woods"
        titleEN="Stress Prevention & Burnout Prevention — David J. Woods"
        descriptionDE="Stress-Prävention und Burnout-Vorbeugung für Unternehmen. Erfolgs-Training und Resilienz Coaching mit David J. Woods."
        descriptionEN="Stress prevention and burnout prevention for companies. Success training and resilience coaching with David J. Woods."
      />

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <Link to={getPath("corporate", language, country)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" /> {isEN ? "Back to overview" : "Zurück zur Übersicht"}
          </Link>

          <p className="text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-2">Business Coaching</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] leading-tight mb-6">
            {isEN ? "Stress Prevention by David J. Woods" : "Stress-Prävention by David J. Woods"}
          </h1>

          <div className="prose prose-sm max-w-none text-foreground space-y-4">
            <p>
              {isEN
                ? "Stress prevention is one of the central topics for long-term health and performance – both in personal and professional contexts. For over 20 years, David J. Woods has been supporting people from various fields – from business to professional sports to the music and creative industries – with one goal: sustainable mental strength, inner stability and healthy performance."
                : "Stressprävention zählt heute zu den zentralen Themen für langfristige Gesundheit und Leistungsfähigkeit – sowohl im persönlichen als auch im beruflichen Kontext. Seit über 20 Jahren begleitet David J. Woods Menschen aus unterschiedlichsten Bereichen – von der Wirtschaft über den Profisport bis hin zur Musik- und Kreativbranche – mit einem Ziel: nachhaltige mentale Stärke, innere Stabilität und gesunde Leistungsbereitschaft."}
            </p>
            <p>
              {isEN
                ? "Unlike conventional approaches, David J. Woods doesn't focus on short-term stress management, but on forward-looking, profound change. In his success trainings and resilience coachings, stress is not treated in isolation – it is prevented where it originates: in thinking, feeling and acting."
                : "Anders als klassische Ansätze setzt David J. Woods nicht auf kurzfristige Stressbewältigung, sondern auf vorausschauende, tiefgreifende Veränderung. In seinen Erfolgstrainings und Resilienz-Coachings wird Stress nicht isoliert betrachtet – er wird dort verhindert, wo er entsteht: im Denken, Fühlen und Handeln."}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-bold text-[#1B3A5C] mb-4">
                {isEN ? "External Causes of Burnout:" : "Äußere Umstände als Ursache für Burnout:"}
              </h2>
              <ul className="space-y-2">
                {outerCauses.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm">
                    <span className="text-[#1B3A5C] mt-1">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1B3A5C] mb-4">
                {isEN ? "Internal Causes of Burnout:" : "Innere Umstände als Ursache für Burnout:"}
              </h2>
              <ul className="space-y-2">
                {innerCauses.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm">
                    <span className="text-[#1B3A5C] mt-1">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "The 12 Phases of Burnout Development" : "Die 12 Phasen der Burnout-Entwicklung"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {phases.map((p) => (
              <div key={p.phase} className="border border-border p-3 bg-[#f4f3ef]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#1B3A5C] text-white text-xs flex items-center justify-center font-bold">{p.phase}</span>
                  <h3 className="font-semibold text-xs text-[#1B3A5C]">{p.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground italic">&bdquo;{p.quote}&ldquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#8b827c] text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Prevent Burnout — Get in Touch Now" : "Burnout vorbeugen — Jetzt Kontakt aufnehmen"}
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
