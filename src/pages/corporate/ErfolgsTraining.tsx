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

  const results = [
    isEN ? "Real teamwork & better results" : "Echtes Teamwork & bessere Ergebnisse",
    isEN ? "Maximizing performance potential" : "Ausschöpfung des Leistungspotenzials",
    isEN ? "Maximum implementation strength" : "Maximale Umsetzungsstärke jedes einzelnen",
    isEN ? "Increased focus & productivity" : "Steigerung von Fokus & Produktivität",
    isEN ? "Greater employee satisfaction" : "Größere Zufriedenheit der Mitarbeiter",
    isEN ? "Achievement of set goals" : "Erreichung der gesteckten Ziele",
    isEN ? "Simply more success in the company" : "Einfach mehr Erfolg im Unternehmen",
  ];

  return (
    <>
      <SEO
        titleDE="Erfolgs-Training für Unternehmen — David J. Woods"
        titleEN="Success Training for Companies — David J. Woods"
        descriptionDE="Individuelles Erfolgs-Training für Ihr Unternehmen. Maximale Leistungsfähigkeit Ihrer Mitarbeiter und Führungskräfte durch Mentalcoaching."
        descriptionEN="Individual success training for your company. Maximum performance of your employees and executives through mental coaching."
      />

      {/* Hero */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-6 md:py-8 lg:py-10">
          <Link to={getPath("corporate", language, country)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-3">
            <ArrowLeft className="w-4 h-4" /> {isEN ? "Back to overview" : "Zurück zur Übersicht"}
          </Link>
          <div className="bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-7 shadow-sm grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_340px] gap-5 md:gap-7 items-start">
            <div>
            <p className="text-xs md:text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-2">
              {isEN ? "Business Coaching" : "Business Coaching"}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] leading-tight mb-4">
              {isEN ? "Success Training by David J. Woods" : "Erfolgs-Training by David J. Woods"}
            </h1>

            <div className="prose prose-sm max-w-none text-foreground/85 space-y-3">
              <h3 className="text-base md:text-lg font-semibold text-[#1B3A5C]">
                {isEN ? "Individual Success Training for Your Company with Real Results" : "Individuelles Erfolgs-Training für Ihr Unternehmen mit echten Ergebnissen"}
              </h3>
              <p>
                {isEN
                  ? "With success training, David J. Woods and his team ensure the maximum performance potential of your employees and executives. To consistently deliver peak performance and top results, one must be mentally and physically fit. David J. Woods and his team have developed individual success coaching specifically for public figures, executives from business, politics, media, entertainment and sports."
                  : "Mit einem Erfolgs-Training sorgen David J. Woods und sein Team für die Entfaltung des maximalen Leistungspotenzials Ihrer Mitarbeiter und Führungskräfte im Unternehmen. Denn um dauerhaft Höchstleistungen und Spitzenergebnisse abrufen und erzielen zu können, muss man mental und körperlich fit sein. Dazu haben David J. Woods und sein starkes Team speziell für Personen des öffentlichen Lebens, aber auch Führungskräfte – aus Wirtschaft, Politik, Medien, Entertainment und Sport – ein individuelles Erfolgscoaching entwickelt."}
              </p>

              <h3 className="text-base md:text-lg font-semibold text-[#1B3A5C]">
                {isEN ? "Increase the performance of your employees & executives through mental coaching" : "Durch das Mentalcoaching steigern Sie die Leistungsfähigkeit Ihrer Mitarbeiter & Führungskräfte"}
              </h3>
              <p>
                {isEN
                  ? "Hard work and regular training are incredibly important. But hard training alone is not enough to stay permanently focused and consistently tap into your full potential. Our subconscious controls our emotions, behaviors, and thought patterns. When we are distracted at this level, no amount of willpower or discipline will produce top results in the long run."
                  : "Harte Arbeit und regelmäßiges Training sind sowohl für Sportler und Menschen der Öffentlichkeit als auch für Mitarbeiter und Führungskräfte unglaublich wichtig. Doch hartes Training allein reicht nicht aus, um dauerhaft fokussiert zu sein und stetig das gesamte Potenzial abzurufen. Denn nur der Einsatz allein garantiert noch lange keinen Erfolg! Unser Unterbewusstsein steuert unsere Emotionen und Verhaltensweisen sowie Denkmuster."}
              </p>

              <h3 className="text-base md:text-lg font-semibold text-[#1B3A5C]">
                {isEN ? "Book Success Training in Germany, Austria or Switzerland!" : "Erfolgs-Training in Deutschland, Österreich oder der Schweiz buchen!"}
              </h3>
              <p>
                {isEN
                  ? "We offer our success training not as a standard package, but as individual mental coaching. This means we tailor the business coaching individually to you and the participants. We are also happy to come to your company."
                  : "Daher bieten wir Ihnen unser Erfolgs-Training nicht als Standardangebot, sondern als individuelles Mentalcoaching an. Dies bedeutet, dass wir das Business Coaching individuell an Sie bzw. die Teilnehmer anpassen. Dazu kommen wir auch gerne zu Ihnen ins Unternehmen."}
              </p>
            </div>
            </div>
            <div className="md:order-last">
              <img
                src={corporateSuccessImg}
                alt={isEN ? "Success Training" : "Erfolgs-Training"}
                className="w-full h-48 md:h-full md:max-h-[340px] object-cover rounded-2xl border border-[#E2E8EE]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results — Banner */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-7 shadow-sm">
            <h2 className="text-xl font-bold text-[#1B3A5C] mb-5">
              {isEN ? "Results you can expect:" : "Diese Resultate können Sie erwarten:"}
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
        </div>
      </section>

      <section className="bg-[#E8EDF3]">
        <div className="container-main py-8 md:py-10 flex justify-center">
          <div className="relative bg-primary/10 border border-primary/25 rounded-2xl px-8 py-8 text-center max-w-2xl w-full">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
              {isEN ? "Next Step" : "N\u00e4chster Schritt"}
            </span>
            <h2 className="text-xl font-bold text-primary mb-2 mt-2">
              {isEN ? "Request a Free Consultation" : "Kostenlose Beratung anfragen"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {isEN ? "Take the next step for your team." : "Gehen Sie den n\u00e4chsten Schritt f\u00fcr Ihr Team."}
            </p>
            <Link to={`${getPath("contact", language, country)}?concern=corporate`}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 text-base">
                {isEN ? "Contact Us" : "Jetzt Kontakt aufnehmen"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
