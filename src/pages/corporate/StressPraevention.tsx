import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { ArrowLeft } from "lucide-react";
import corporateStressImg from "@/assets/corporate-stress.jpg";

export default function StressPraevention() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const coreElements = isEN
    ? [
        { title: "Mental Clarity", desc: "Structure thoughts and reduce overwhelm." },
        { title: "Handling Pressure", desc: "Stay composed — even under high load." },
        { title: "Emotional Stability", desc: "Respond calmly instead of reacting impulsively." },
        { title: "Focus & Prioritization", desc: "Less distraction — more execution." },
        { title: "Boundaries & Energy", desc: "Set clear limits and steer energy deliberately." },
        { title: "Sustainable Routines", desc: "Build structures that relieve long-term." },
      ]
    : [
        { title: "Mentale Klarheit", desc: "Gedanken strukturieren und Überforderung reduzieren." },
        { title: "Umgang mit Druck", desc: "Souverän bleiben – auch unter hoher Belastung." },
        { title: "Emotionale Stabilität", desc: "Gelassen reagieren statt impulsiv handeln." },
        { title: "Fokus & Priorisierung", desc: "Weniger Ablenkung – mehr Umsetzung." },
        { title: "Abgrenzung & Energie", desc: "Klare Grenzen setzen und Energie gezielt steuern." },
        { title: "Nachhaltige Routinen", desc: "Strukturen schaffen, die dauerhaft entlasten." },
      ];

  const outerCauses = isEN
    ? ["High workload and time pressure", "Unclear structures and processes", "Lack of prioritization", "Constant availability", "Conflicts within the team", "Lack of resources"]
    : ["Hohe Arbeitsbelastung und Zeitdruck", "Unklare Strukturen und Prozesse", "Fehlende Priorisierung", "Permanente Erreichbarkeit", "Konflikte im Team", "Mangel an Ressourcen"];

  const innerCauses = isEN
    ? ["Perfectionism and high standards", "Difficulty setting boundaries", "Fear of mistakes or criticism", "Inner performance pressure", "Lack of mental recovery", "Excessive self-demand"]
    : ["Perfektionismus und hoher Anspruch", "Schwierigkeit, Grenzen zu setzen", "Angst vor Fehlern oder Kritik", "Innerer Leistungsdruck", "Fehlende mentale Erholung", "Überhöhte Selbstanforderung"];

  const results = isEN
    ? [
        "Significantly fewer stress-related absences",
        "More stable performance under pressure",
        "Higher day-to-day productivity",
        "Fewer conflicts within the team",
        "Clearer decisions at leadership level",
        "More focus and execution power",
        "Sustainable relief for employees",
      ]
    : [
        "Deutlich weniger stressbedingte Ausfälle",
        "Stabilere Leistung unter Druck",
        "Höhere Produktivität im Alltag",
        "Weniger Konflikte im Team",
        "Klarere Entscheidungen auf Führungsebene",
        "Mehr Fokus und Umsetzungskraft",
        "Nachhaltige Entlastung der Mitarbeiter",
      ];

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
        titleDE="Stress-Prävention für Unternehmen — David J. Woods"
        titleEN="Stress Prevention for Companies — David J. Woods"
        descriptionDE="Stress-Prävention und Burnout-Vorbeugung für Unternehmen. Nachhaltige Reduktion von Stress, stabile Leistung und klare Ergebnisse im Alltag."
        descriptionEN="Stress prevention and burnout prevention for companies. Sustainable stress reduction, stable performance and clear day-to-day results."
        pageKey="corporateStress"
        breadcrumbs={[
          { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
          { name: isEN ? "Business Coaching" : "Firmen-Coaching", path: getPath("corporate", language, country) },
          { name: isEN ? "Stress Prevention" : "Stress-Prävention", path: getPath("corporateStress", language, country) },
        ]}
      />

      {/* Hero */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-6 md:py-8">
          <Link
            to={getPath("corporate", language, country)}
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#1B3A5C] bg-white/70 border border-[#1B3A5C]/15 rounded-lg px-3.5 py-2 hover:bg-white hover:border-[#1B3A5C]/25 hover:shadow-[0_2px_8px_rgba(27,58,92,0.08)] transition-all duration-200 mb-5"
          >
            <ArrowLeft className="w-5 h-5" />
            {isEN ? "View all programs" : "Alle Programme ansehen"}
          </Link>
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-4 md:p-6 shadow-sm grid md:grid-cols-[1.35fr_1fr] gap-4 md:gap-6 md:items-center">
            <div>
              <p className="text-xs font-medium text-[#2E7D32] uppercase tracking-wider mb-2">Business Coaching</p>
              <h1 className="text-2xl md:text-3xl font-light text-[#1B3A5C] leading-tight mb-3 tracking-tight">
                {isEN ? "Stress Prevention for Companies" : "Stress-Prävention für Unternehmen"}
              </h1>
              <p className="text-sm md:text-base text-[#1B3A5C]/80 mb-3 leading-snug">
                {isEN
                  ? "Reduce stress, stabilize your team's performance and prevent burnout — sustainably and measurably."
                  : "Reduzieren Sie Stress, stabilisieren Sie die Leistungsfähigkeit Ihres Teams und verhindern Sie Burnout – nachhaltig und messbar."}
              </p>
              <div className="text-sm text-foreground/85 space-y-2 leading-snug">
                <p>
                  {isEN
                    ? "Stress is one of the biggest performance blockers in companies. High pressure, constant availability and rising expectations push employees and leaders to their limits over time."
                    : "Stress ist einer der größten Leistungsblocker in Unternehmen. Hoher Druck, permanente Erreichbarkeit und steigende Erwartungen führen dazu, dass Mitarbeiter und Führungskräfte langfristig an ihre Grenzen kommen."}
                </p>
                <p>
                  {isEN
                    ? "The problem is not the load itself — it is how we deal with it."
                    : "Das Problem ist nicht die Belastung selbst – sondern der Umgang damit."}
                </p>
                <p>
                  {isEN
                    ? "In David J. Woods' stress prevention program, the decisive thinking and behavior patterns that lead to overload, inner pressure and performance drops are changed."
                    : "Im Stress-Präventions-Programm von David J. Woods werden die entscheidenden Denk- und Verhaltensmuster verändert, die zu Überlastung, innerem Druck und Leistungsabfall führen."}
                </p>
                <p>
                  {isEN
                    ? "The focus is on clear results in everyday work: more calm, better decisions and stable performance even in demanding situations."
                    : "Der Fokus liegt auf klaren Ergebnissen im Alltag: mehr Ruhe, bessere Entscheidungen und stabile Leistung auch in anspruchsvollen Situationen."}
                </p>
                <p>
                  {isEN
                    ? "Delivered on-site at the company or in intensive one-on-one coachings — in Germany, Austria and Switzerland."
                    : "Umsetzung direkt im Unternehmen oder in intensiven Einzelcoachings – in Deutschland, Österreich und der Schweiz."}
                </p>
              </div>
              <div className="mt-4">
                <Link to={`${getPath("contact", language, country)}?concern=corporate`}>
                  <Button className="bg-[#1B3A5C] hover:bg-[#16304D] text-white font-medium px-6 py-2.5 text-sm rounded-xl">
                    {isEN ? "Request Consultation" : "Beratung anfragen"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:order-last">
              <img
                src={corporateStressImg}
                alt={isEN ? "Stress Prevention" : "Stress-Prävention"}
                className="w-full h-44 md:h-full md:max-h-[320px] object-cover rounded-2xl border border-[#E2E8EE]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Elements */}
      <section className="bg-[#F1F4F7]">
        <div className="container-main py-6 md:py-8">
          <div className="max-w-5xl mx-auto bg-[#E8EDF3] border border-[#D8E0EA] rounded-2xl shadow-[0_10px_40px_-25px_rgba(27,58,92,0.18)] overflow-hidden">
            <div className="px-5 md:px-8 pt-5 md:pt-6 pb-3 md:pb-4 text-center border-b border-[#D8E0EA]">
              <p className="text-[10px] font-medium text-[#2E7D32] uppercase tracking-[0.2em] mb-1.5">Framework</p>
              <h2 className="text-lg md:text-xl font-light text-[#1B3A5C] tracking-tight">
                {isEN ? "The 6 Core Elements of Effective Stress Prevention" : "Die 6 Kernelemente effektiver Stress-Prävention"}
              </h2>
            </div>
            <div className="px-5 md:px-8 py-5 md:py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {coreElements.map((el, i) => (
                  <div key={i} className="bg-white border border-[#E2E8EE] rounded-2xl p-4 md:p-5 shadow-[0_1px_2px_rgba(27,58,92,0.04)] hover:shadow-[0_8px_24px_-12px_rgba(27,58,92,0.18)] transition-shadow">
                    <span className="inline-flex w-8 h-8 rounded-full bg-[#1B3A5C] text-white text-sm font-medium items-center justify-center tabular-nums mb-3">
                      {i + 1}
                    </span>
                    <h3 className="text-[15px] font-medium text-[#1B3A5C] tracking-tight mb-1">{el.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-snug">{el.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Causes — 2 columns, business focused */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-6 md:py-8">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-8 shadow-sm">
            <h2 className="text-xl md:text-2xl font-light text-[#1B3A5C] mb-5 md:mb-6 tracking-tight text-center">
              {isEN ? "Why Stress Arises in Companies" : "Warum Stress im Unternehmen entsteht"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <h3 className="text-base md:text-lg font-medium text-[#1B3A5C] mb-3 tracking-tight">
                  {isEN ? "External Factors" : "Äußere Faktoren"}
                </h3>
                <ul className="space-y-2.5">
                  {outerCauses.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-[15px] text-foreground/85">
                      <span className="text-[#2E7D32] mt-1">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-medium text-[#1B3A5C] mb-3 tracking-tight">
                  {isEN ? "Internal Factors" : "Innere Faktoren"}
                </h3>
                <ul className="space-y-2.5">
                  {innerCauses.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-[15px] text-foreground/85">
                      <span className="text-[#2E7D32] mt-1">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Burnout Phases */}
      <section className="bg-[#E8EDF3]">
        <div className="container-main py-6 md:py-8">
          <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-7 shadow-sm">
            <div className="text-center mb-5 md:mb-6">
              <h2 className="text-xl md:text-2xl font-light text-[#1B3A5C] tracking-tight mb-2">
                {isEN ? "The 12 Phases of Burnout Development" : "Die 12 Phasen der Burnout-Entwicklung"}
              </h2>
              <p className="text-sm md:text-[15px] text-muted-foreground max-w-2xl mx-auto leading-snug">
                {isEN
                  ? "Burnout doesn't happen suddenly — it develops step by step. Recognizing it early is decisive."
                  : "Burnout entsteht nicht plötzlich – sondern entwickelt sich schrittweise. Frühzeitiges Erkennen ist entscheidend."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {phases.map((p) => (
                <div
                  key={p.phase}
                  className="bg-white border border-[#E2E8EE] rounded-2xl p-3.5 shadow-[0_1px_2px_rgba(27,58,92,0.04)] hover:shadow-[0_8px_24px_-12px_rgba(27,58,92,0.18)] transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#1B3A5C] text-white text-xs flex items-center justify-center font-medium tabular-nums">
                      {p.phase}
                    </span>
                    <h3 className="font-medium text-[13px] text-[#1B3A5C] tracking-tight leading-tight">{p.title}</h3>
                  </div>
                  <p className="text-[12px] text-muted-foreground italic leading-snug">&bdquo;{p.quote}&ldquo;</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results for Companies */}
      <section className="bg-[#F1F4F7]">
        <div className="container-main py-6 md:py-8">
          <div className="max-w-4xl mx-auto bg-white border border-[#E2E8EE] rounded-3xl p-5 md:p-8 shadow-sm">
            <h2 className="text-xl md:text-2xl font-light text-[#1B3A5C] tracking-tight text-center mb-5 md:mb-6">
              {isEN ? "Results Companies Achieve" : "Diese Ergebnisse erzielen Unternehmen"}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
              {results.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-[15px] text-foreground/85">
                  <span className="text-[#2E7D32] mt-1">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-7 md:py-9 flex justify-center">
          <div className="relative bg-white border border-[#1B3A5C]/15 rounded-2xl px-8 py-7 text-center max-w-2xl w-full">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ECEEF1] text-[#1B3A5C] text-xs font-medium border border-[#1B3A5C]/25 px-4 py-1 rounded-full whitespace-nowrap">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </span>
            <h2 className="text-xl md:text-2xl font-light text-[#1B3A5C] mb-2 mt-2 tracking-tight">
              {isEN ? "Reduce Stress. Secure Performance." : "Stress reduzieren. Leistung sichern."}
            </h2>
            <p className="text-sm md:text-[15px] text-muted-foreground mb-4 leading-snug">
              {isEN
                ? "Strengthen your team sustainably and prevent long-term absences."
                : "Stärken Sie Ihr Team nachhaltig und verhindern Sie langfristige Ausfälle."}
            </p>
            <Link to={`${getPath("contact", language, country)}?concern=corporate`}>
              <Button className="bg-[#1B3A5C] hover:bg-[#16304D] text-white font-medium px-8 py-3 text-base rounded-xl">
                {isEN ? "Request Consultation" : "Beratung anfragen"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
