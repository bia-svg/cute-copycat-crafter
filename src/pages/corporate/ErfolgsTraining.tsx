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

      {/* Results — Banner */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-6 md:py-9">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-7 shadow-sm">
            <h2 className="text-xl font-light text-[#1B3A5C] mb-5 tracking-tight">
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
          <div className="relative bg-footer/[0.07] border border-footer/20 rounded-2xl px-8 py-8 text-center max-w-2xl w-full">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-footer text-footer-foreground text-xs font-medium px-4 py-1 rounded-full whitespace-nowrap">
              {isEN ? "Next Step" : "N\u00e4chster Schritt"}
            </span>
            <h2 className="text-xl font-light text-primary mb-2 mt-2 tracking-tight">
              {isEN ? "Request a Free Consultation" : "Kostenlose Beratung anfragen"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {isEN ? "Take the next step for your team." : "Gehen Sie den n\u00e4chsten Schritt f\u00fcr Ihr Team."}
            </p>
            <Link to={`${getPath("contact", language, country)}?concern=corporate`}>
              <Button className="bg-footer hover:bg-footer/90 text-footer-foreground font-medium px-8 py-3 text-base border border-footer/40 shadow-none">
                {isEN ? "Contact Us" : "Jetzt Kontakt aufnehmen"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
