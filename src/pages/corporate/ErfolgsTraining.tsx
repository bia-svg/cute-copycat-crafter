import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { CheckCircle, ArrowLeft } from "lucide-react";
import corporateSuccessImg from "@/assets/corporate-success.jpg";

export default function ErfolgsTraining() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const audienceTopics = [
    isEN ? "Uncertainty in decision-making" : "Unsicherheit in Entscheidungen",
    isEN ? "Blockages in critical moments" : "Blockaden in wichtigen Momenten",
    isEN ? "Performance pressure and high expectations" : "Leistungsdruck und Erwartungshaltung",
    isEN ? "Stage fright in presentations or appearances" : "Lampenfieber bei Präsentationen oder Auftritten",
    isEN ? "Lack of clarity and focus in everyday work" : "Fehlende Klarheit und Fokus im Alltag",
    isEN ? "Mental overload and stress" : "Mentale Überlastung und Stress",
    isEN ? "Difficulties in communication and team dynamics" : "Schwierigkeiten in Kommunikation und Teamdynamik",
  ];

  const applicationAreas = [
    isEN ? "Leadership development and decision strength" : "Führungskräfte-Entwicklung und Entscheidungsstärke",
    isEN ? "Sales teams (closing strength, self-confidence)" : "Vertriebsteams (Abschlussstärke, Selbstsicherheit)",
    isEN ? "Presentations and stage appearances" : "Präsentationen und Bühnenauftritte",
    isEN ? "Handling pressure, stress and high responsibility" : "Umgang mit Druck, Stress und hoher Verantwortung",
    isEN ? "Team dynamics and collaboration" : "Teamdynamik und Zusammenarbeit",
    isEN ? "Performance increase in day-to-day business" : "Leistungssteigerung im Tagesgeschäft",
  ];

  const results = [
    isEN ? "Clearer decisions and more leadership confidence" : "Klarere Entscheidungen und mehr Führungssicherheit",
    isEN ? "Significantly higher execution speed" : "Deutlich höhere Umsetzungsgeschwindigkeit",
    isEN ? "More focus and mental stability" : "Mehr Fokus und mentale Stabilität",
    isEN ? "Reduction of stress and inner pressure" : "Reduktion von Stress und innerem Druck",
    isEN ? "Better communication within the team" : "Bessere Kommunikation im Team",
    isEN ? "Stronger presence in meetings and presentations" : "Stärkere Präsenz bei Meetings und Präsentationen",
    isEN ? "Measurable increase in performance and productivity" : "Messbare Steigerung von Leistung und Produktivität",
  ];

  const trainingFormats = [
    isEN ? "Intensive Session" : "Intensiv-Session",
    isEN ? "Workshop" : "Workshop",
    isEN ? "Or accompanying coaching" : "Oder begleitendes Coaching",
  ];

  return (
    <>
      {/* SEO: title/desc + BreadcrumbList JSON-LD */}
      <SEO
        titleDE="Erfolgs-Training für Unternehmen — David J. Woods"
        titleEN="Success Training for Companies — David J. Woods"
        descriptionDE="Individuelles Erfolgs-Training für Ihr Unternehmen. Maximale Leistungsfähigkeit Ihrer Mitarbeiter und Führungskräfte durch Mentalcoaching."
        descriptionEN="Individual success training for your company. Maximum performance of your employees and executives through mental coaching."
        pageKey="corporateErfolg"
        breadcrumbs={[
          { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
          { name: isEN ? "Business Coaching" : "Firmen-Coaching", path: getPath("corporate", language, country) },
          { name: isEN ? "Success Training" : "Erfolgs-Training", path: getPath("corporateErfolg", language, country) },
        ]}
      />

      {/* Hero */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-6 md:py-8 lg:py-10">
          <Link to={getPath("corporate", language, country)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-3">
            <ArrowLeft className="w-4 h-4" /> {isEN ? "Back to overview" : "Zurück zur Übersicht"}
          </Link>
          <div className="bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-7 shadow-sm grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_340px] gap-5 md:gap-7 md:items-stretch">
            <div>
            <p className="text-xs md:text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-2">
              {isEN ? "Business Coaching" : "Business Coaching"}
            </p>
            <h1 className="text-2xl sm:text-3xl font-light text-[#1B3A5C] leading-tight mb-4 tracking-tight">
              {isEN ? "Success Training by David J. Woods" : "Erfolgs-Training by David J. Woods"}
            </h1>

            <div className="prose prose-sm max-w-none text-foreground/85 space-y-3">
              <p>
                {isEN
                  ? "David J. Woods and his team unlock the maximum performance potential of your employees and executives — an individual mental coaching designed for public figures and leaders from business, politics, media, entertainment and sports who consistently need to deliver peak results."
                  : "David J. Woods und sein Team entfalten das maximale Leistungspotenzial Ihrer Mitarbeiter und Führungskräfte — ein individuelles Mentalcoaching, speziell entwickelt für Personen des öffentlichen Lebens sowie Führungskräfte aus Wirtschaft, Politik, Medien, Entertainment und Sport, die dauerhaft Spitzenergebnisse abrufen müssen."}
              </p>
              <p>
                {isEN
                  ? "Hard work alone does not guarantee success: our subconscious controls emotions, behaviors and thought patterns. We work precisely there — and tailor every session individually to you and your team, on-site at your company if desired, in Germany, Austria or Switzerland."
                  : "Harte Arbeit allein garantiert noch keinen Erfolg: Unser Unterbewusstsein steuert Emotionen, Verhaltensweisen und Denkmuster. Genau dort setzen wir an — und passen jede Session individuell an Sie und Ihr Team an, auf Wunsch direkt bei Ihnen im Unternehmen, in Deutschland, Österreich oder der Schweiz."}
              </p>
            </div>

            <div className="mt-5">
              <Link to={`${getPath("contact", language, country)}?concern=corporate`}>
                <Button className="bg-[#1B3A5C] hover:bg-[#16304D] text-white font-medium px-6 py-2.5 text-sm rounded-xl">
                  {isEN ? "Request Consultation" : "Beratung anfragen"}
                </Button>
              </Link>
            </div>
            </div>
            <div className="md:order-last">
              <img
                src={corporateSuccessImg}
                alt={isEN ? "Success Training" : "Erfolgs-Training"}
                className="w-full h-48 md:h-full md:min-h-[260px] object-cover rounded-2xl border border-[#E2E8EE]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-7 shadow-sm">
            <h2 className="text-xl font-light text-[#1B3A5C] mb-3 tracking-tight">
              {isEN ? "Who is this Success Training for?" : "Für wen ist dieses Erfolgs-Training gedacht?"}
            </h2>
            <p className="text-[14px] text-foreground/80 leading-relaxed mb-4">
              {isEN
                ? "This Success Training is aimed at companies, executives and teams that have to function under pressure and want to systematically increase their performance."
                : "Dieses Erfolgs-Training richtet sich an Unternehmen, Führungskräfte und Teams, die unter Druck funktionieren müssen und ihre Leistung gezielt steigern wollen."}
            </p>
            <p className="text-[13px] font-medium text-[#1B3A5C] mb-2.5">
              {isEN ? "Typical topics solved in the training:" : "Typische Themen, die im Training gelöst werden:"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5 mb-4">
              {audienceTopics.map((item) => (
                <div key={item} className="flex items-start gap-2 text-[13.5px] leading-snug">
                  <span className="text-[#2E7D32] mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[13.5px] text-muted-foreground leading-snug italic">
              {isEN
                ? "The goal is not more knowledge — but tangible change in behaviour and daily performance."
                : "Ziel ist nicht mehr Wissen – sondern spürbare Veränderung im Verhalten und in der täglichen Leistung."}
            </p>
          </div>
        </div>
      </section>

      {/* Application Areas */}
      <section className="bg-[#E8EDF3]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-3xl mx-auto bg-white/85 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-7 shadow-sm">
            <h2 className="text-xl font-light text-[#1B3A5C] mb-3 tracking-tight">
              {isEN ? "Typical Application Areas in the Company" : "Typische Einsatzbereiche im Unternehmen"}
            </h2>
            <p className="text-[14px] text-foreground/80 leading-relaxed mb-4">
              {isEN
                ? "The Success Training is individually tailored to your company and can be applied in a targeted way across various areas:"
                : "Das Erfolgs-Training wird individuell auf Ihr Unternehmen zugeschnitten und kann gezielt in verschiedenen Bereichen eingesetzt werden:"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5 mb-4">
              {applicationAreas.map((item) => (
                <div key={item} className="flex items-start gap-2 text-[13.5px] leading-snug">
                  <span className="text-[#2E7D32] mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[13.5px] text-muted-foreground leading-snug italic">
              {isEN
                ? "Whether individuals or entire teams — the focus is always on concrete results."
                : "Ob Einzelpersonen oder ganze Teams – der Fokus liegt immer auf konkreten Ergebnissen."}
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-7 shadow-sm">
            <h2 className="text-xl font-light text-[#1B3A5C] mb-4 tracking-tight">
              {isEN ? "Results you can expect:" : "Diese Resultate können Sie erwarten:"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
              {results.map((item) => (
                <div key={item} className="flex items-start gap-2 text-[13.5px] leading-snug">
                  <CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#E8EDF3]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-3xl mx-auto bg-white/85 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-7 shadow-sm">
            <h2 className="text-xl font-light text-[#1B3A5C] mb-3 tracking-tight">
              {isEN ? "How does the training work in practice?" : "Wie läuft das Training konkret ab?"}
            </h2>
            <p className="text-[14px] text-foreground/80 leading-relaxed mb-3">
              {isEN
                ? "After a brief preliminary discussion, the training is precisely tailored to your company and your goals."
                : "Nach einem kurzen Vorgespräch wird das Training exakt auf Ihr Unternehmen und Ihre Ziele abgestimmt."}
            </p>
            <p className="text-[13px] font-medium text-[#1B3A5C] mb-2">
              {isEN ? "Implementation as:" : "Die Umsetzung erfolgt als:"}
            </p>
            <div className="space-y-1.5 mb-3">
              {trainingFormats.map((item) => (
                <div key={item} className="flex items-start gap-2 text-[13.5px] leading-snug">
                  <span className="text-[#2E7D32] mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[13.5px] text-muted-foreground leading-snug italic">
              {isEN
                ? "First changes are noticeable after a short time — with a sustainable effect on performance and behaviour."
                : "Bereits nach kurzer Zeit sind erste Veränderungen spürbar – mit nachhaltigem Effekt auf Leistung und Verhalten."}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-8 md:py-10 flex justify-center">
          <div className="relative bg-white border border-[#1B3A5C]/15 rounded-2xl px-8 py-8 text-center max-w-2xl w-full">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ECEEF1] text-[#1B3A5C] text-xs font-medium border border-[#1B3A5C]/25 px-4 py-1 rounded-full whitespace-nowrap">
              {isEN ? "Next Step" : "N\u00e4chster Schritt"}
            </span>
            <h2 className="text-xl font-light text-primary mb-2 mt-2 tracking-tight">
              {isEN ? "Request a Free Consultation" : "Kostenlose Beratung anfragen"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {isEN ? "Take the next step for your team." : "Gehen Sie den n\u00e4chsten Schritt f\u00fcr Ihr Team."}
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
