import { useLanguage } from "@/contexts/LanguageContext";


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy, Shield, Clock, Cigarette, CheckCircle } from "lucide-react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029169718/aQMYm3GvBKfW5muS6V4PFb";

export default function FirmenCoaching() {
  const { language, country, isSwiss } = useLanguage();
  const isEN = language === "en";

  const topics = [
    { icon: <Trophy className="w-5 h-5" />, title: isEN ? "Success Training" : "Erfolgs-Training", desc: isEN ? "Success is ultimately decided in the mind, not just through hard work. Unlock the full potential of your team." : "Letztendlich entscheidet sich Erfolg im Kopf, nicht nur durch harte Arbeit. Entfesseln Sie das volle Potenzial Ihres Teams." },
    { icon: <Shield className="w-5 h-5" />, title: isEN ? "Resilience Building" : "Resilienz-Verstärken", desc: isEN ? "Build inner strength for challenging times and pressure situations. Equip your team with mental resilience." : "Innere Stärke aufbauen für schwere Zeiten und Drucksituationen. Statten Sie Ihr Team mit mentaler Resilienz aus." },
    { icon: <Clock className="w-5 h-5" />, title: isEN ? "Stress Prevention" : "Stress-Prävention", desc: isEN ? "Burnout prevention for leaders and teams across all industries. Reduce sick days and increase productivity." : "Burnout-Prävention für Führungskräfte und Teams aus allen Bereichen. Reduzieren Sie Krankheitstage und steigern Sie die Produktivität." },
    { icon: <Cigarette className="w-5 h-5" />, title: isEN ? "Non-Smoker Seminars" : "Nichtraucher-Seminare", desc: isEN ? "'Non-smoker in 3 hours' — a unique seminar for companies that care about employee health." : "\"Nichtraucher in 3 Stunden\" — ein einzigartiges Seminar für Unternehmen, denen die Gesundheit ihrer Mitarbeiter am Herzen liegt." },
  ];

  return (
    <>
      />

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-2">
                {isEN ? "For Companies & Organizations" : "Für Firmen & Organisationen"}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] leading-tight mb-4">
                {isEN ? "Corporate Coaching: Maximize Your Team's Potential" : "Firmencoaching: Leistungsfähigkeit Ihres Teams maximieren"}
              </h1>
              <p className="text-base text-foreground leading-relaxed mb-6">
                {isEN
                  ? "David J. Woods offers tailored coaching programs for businesses of all sizes. From stress prevention and resilience building to non-smoker seminars — invest in your team's mental health and performance."
                  : "David J. Woods bietet maßgeschneiderte Coaching-Programme für Unternehmen jeder Größe. Von Stress-Prävention und Resilienz-Aufbau bis hin zu Nichtraucher-Seminaren — investieren Sie in die mentale Gesundheit und Leistungsfähigkeit Ihres Teams."}
              </p>
              <div className="space-y-2 mb-6">
                {[
                  isEN ? "Customized programs for your company" : "Maßgeschneiderte Programme für Ihr Unternehmen",
                  isEN ? "On-site or at our locations" : "Vor Ort oder an unseren Standorten",
                  isEN ? "Measurable results" : "Messbare Ergebnisse",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to={`/${language}/${country}/erstgespraech`}>
                <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-6 py-3">
                  {isEN ? "Request a Consultation" : "Beratungsgespräch anfragen"}
                </Button>
              </Link>
            </div>
            <div className="border border-border">
              <img src={`${CDN}/corporate_coaching_d312f3cb.jpg`} alt={isEN ? "Corporate Coaching" : "Firmencoaching"} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "Our Corporate Programs" : "Unsere Firmen-Programme"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {topics.map((item) => (
              <div key={item.title} className="bg-white border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#1B3A5C]">{item.icon}</span>
                  <h3 className="font-semibold text-[#1B3A5C]">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#8b827c] text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Invest in Your Team's Potential" : "Investieren Sie in das Potenzial Ihres Teams"}
          </h2>
          <Link to={`/${language}/${country}/erstgespraech`}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3 text-base">
              {isEN ? "Request Consultation" : "Beratung anfragen"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
