import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function NichtraucherSeminare() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const risks = [
    isEN ? "Many sick days & long absences" : "Viele Krankheitstage & lange Fehlzeiten",
    isEN ? "High costs for employers due to illness" : "Hohe Kosten für Arbeitgeber durch Krankheit",
    isEN ? "Lack of concentration & missing focus" : "Mangelnde Konzentration & fehlender Fokus",
    isEN ? "No full utilization of performance potential" : "Keine Ausschöpfung des Leistungspotenzials",
    isEN ? "Stagnating or absent performance" : "Stagnierende bzw. ausbleibende Leistung",
    isEN ? "Missing role model function & bad image" : "Fehlende Vorbildfunktion & schlechtes Image",
  ];

  const results = [
    isEN ? "Smoking cessation in just 3 hours" : "Rauchentwöhnung in nur 3 Stunden",
    isEN ? "Fewer sick days for your employees" : "Weniger Krankheitstage Ihrer Mitarbeiter",
    isEN ? "Increased concentration at work" : "Gesteigerte Konzentration an der Arbeit",
    isEN ? "Better performance & discipline" : "Bessere Leistungsfähigkeit & Disziplin",
    isEN ? "Balance & real vitality" : "Ausgeglichenheit & echte Vitalität",
  ];

  const phases = [
    { title: isEN ? "Phase 1: Information" : "Phase 1: Informationsvermittlung", desc: isEN ? "We begin with a comprehensive information phase of approximately 45 minutes. This is followed by a 15-minute smoking break where participants can consciously smoke." : "Wir beginnen mit einer umfangreichen Informationsphase von ungefähr 45 Minuten. Im Anschluss daran folgt eine 15-minütige Raucherpause, in welcher die Teilnehmer ganz bewusst rauchen können." },
    { title: isEN ? "Phase 2: Causes & Reasons" : "Phase 2: Ursachen & Gründe", desc: isEN ? "In the second phase, we work together to find the causes of participants' smoking and identify reasons that speak for quitting." : "Dabei finden wir gemeinsam die Ursachen für das Rauchen der Teilnehmer und arbeiten Gründe heraus, die dafürsprechen mit dem Rauchen aufzuhören." },
    { title: isEN ? "Phase 3: Excessive Smoking Break" : "Phase 3: Exzessive Raucherpause", desc: isEN ? "After the second phase, participants have twice as much time for a break and are tasked with smoking as much as possible in this short time." : "Nach Abschluss der zweiten Phase folgt erneut eine Raucherpause, für welche die Teilnehmer doppelt so viel Zeit haben. Dabei bekommen sie den Auftrag, so viel zu rauchen, wie es für sie in dieser kurzen Zeit möglich erscheint." },
    { title: isEN ? "Phase 4: Finally Smoke-Free!" : "Phase 4: Endlich Rauchfrei!", desc: isEN ? "In the final phase, we ask the crucial question 'Do you really want to quit smoking?' followed by the decisive smoking cessation and a farewell round." : "In der letzten Phase stellen wir die entscheidende Frage 'Wollt ihr wirklich aufhören zu rauchen?'. Anschließend folgt die maßgebliche Rauchentwöhnung sowie eine Abschiedsrunde." },
  ];

  return (
    <>
      <SEO
        titleDE="Rauchfrei in 3 Stunden — Nichtraucher-Seminare für Unternehmen"
        titleEN="Smoke-Free in 3 Hours — Non-Smoker Seminars for Companies"
        descriptionDE="Das 'Rauchfrei in 3 Stunden'-Programm von David J. Woods. Effektive Rauchentwöhnung für Mitarbeiter und Führungskräfte direkt in Ihrem Unternehmen."
        descriptionEN="The 'Smoke-Free in 3 Hours' program by David J. Woods. Effective smoking cessation for employees and executives directly at your company."
      />

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <Link to={getPath("corporate", language, country)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" /> {isEN ? "Back to overview" : "Zurück zur Übersicht"}
          </Link>

          <p className="text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-2">Business Coaching</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] leading-tight mb-6">
            {isEN ? "Smoke-Free in 3 Hours — Seminar by David J. Woods" : "Rauchfrei in 3 Stunden — Seminar by David J. Woods"}
          </h1>

          <div className="prose prose-sm max-w-none text-foreground space-y-4">
            <p>
              {isEN
                ? "The 'Smoke-Free in 3 Hours' program delivers exactly what it promises. In just 3 hours, David J. Woods turns participants into non-smokers. What makes it special, besides the short time, is the permanence of this smoking cessation. David J. Woods works entirely without pressure, using exclusively his specially developed method."
                : "Das \u201eRauchfrei in 3 Stunden\u201c-Programm hält genau das, was es spricht. Denn in gerade 3 Stunden macht David J. Woods die Teilnehmer der Rauchentwöhnung zu Nichtrauchern. Das Besondere dabei ist neben der kurzen Zeit auch die Dauerhaftigkeit dieser Rauchentwöhnung. Dabei arbeitet David J. Woods ganz ohne Druck, sondern ausschließlich mit seiner speziell entwickelten Methode."}
            </p>
            <p className="font-semibold text-[#1B3A5C]">
              {isEN ? "Directly at your company!" : "Direkt bei Ihnen im Unternehmen!"}
            </p>
            <p>
              {isEN
                ? "For this special business coaching, we are happy to come directly to your company and offer you a unique group smoking cessation. All you need is a room with enough space, comfortable seating, a flip chart, and an audio system with microphone."
                : "Für dieses spezielle Business Coaching kommen wir gerne auch direkt in Ihre Firma und bieten Ihnen eine einzigartige Rauchentwöhnung in der Gruppe an. Alles, was Sie dazu brauchen, ist ein Raum mit ausreichend Platz, eine bequeme Bestuhlung, ein Flip Chart sowie eine Audio-Anlage mit Mikrofon."}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "Against these disadvantages & risks:" : "Gegen folgende Nachteile & Risiken:"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {risks.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm">
                <span className="text-red-500">✕</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "The 4 Phases of the Program" : "Der Ablauf der Rauchfrei von David J. Woods"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {phases.map((p, i) => (
              <div key={i} className="border border-border p-5 bg-[#f4f3ef]">
                <h3 className="font-semibold text-sm text-[#1B3A5C] mb-2">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "Results of the program:" : "Die Ergebnisse des Programms:"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {results.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#8b827c] text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Book the Smoke-Free Seminar" : "Rauchfrei-Seminar buchen"}
          </h2>
          <Link to={`${getPath("contact", language, country)}?concern=corporate`}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3 text-base">
              {isEN ? "Contact Us" : "Jetzt Kontakt aufnehmen"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
