import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { ArrowLeft } from "lucide-react";
import corporateNonsmokerImg from "@/assets/corporate-nonsmoker.jpg";

export default function NichtraucherSeminare() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const reasonsLeft = isEN
    ? [
        "High costs from sick leave",
        "Productivity loss in daily work",
        "Concentration issues among employees",
        "Additional breaks and downtime",
      ]
    : [
        "Hohe Kosten durch Krankheitsausfälle",
        "Produktivitätsverlust im Arbeitsalltag",
        "Konzentrationsprobleme bei Mitarbeitern",
        "Zusätzliche Pausen und Ausfallzeiten",
      ];

  const reasonsRight = isEN
    ? [
        "Lower team performance",
        "Negative impact on company image",
        "Lack of role-model leadership",
        "Long-term health risks",
      ]
    : [
        "Geringere Leistungsfähigkeit im Team",
        "Negativer Einfluss auf das Unternehmensimage",
        "Fehlende Vorbildfunktion von Führungskräften",
        "Langfristige Gesundheitsrisiken",
      ];

  const benefits = isEN
    ? [
        { title: "Immediate Effect", desc: "Participants are non-smokers right after the seminar." },
        { title: "Fewer Absences", desc: "Reduced sick days within the company." },
        { title: "Higher Productivity", desc: "More focus, energy and performance." },
        { title: "Better Team Dynamics", desc: "Fewer interruptions, more stability." },
        { title: "Sustainable Change", desc: "Long-term success instead of short-term motivation." },
      ]
    : [
        { title: "Sofortige Wirkung", desc: "Teilnehmer sind direkt nach dem Seminar Nichtraucher." },
        { title: "Weniger Fehlzeiten", desc: "Reduzierte Krankheitsausfälle im Unternehmen." },
        { title: "Höhere Produktivität", desc: "Mehr Fokus, Energie und Leistungsfähigkeit." },
        { title: "Bessere Teamdynamik", desc: "Weniger Unterbrechungen und mehr Stabilität." },
        { title: "Nachhaltige Veränderung", desc: "Langfristiger Erfolg statt kurzfristiger Motivation." },
      ];

  const phases = isEN
    ? [
        { title: "Phase 1 — Clarity & Preparation", desc: "Understanding habits and mental patterns." },
        { title: "Phase 2 — Identifying Causes", desc: "Recognizing individual triggers for smoking." },
        { title: "Phase 3 — Mental Shift", desc: "Targeted change at the subconscious level." },
        { title: "Phase 4 — Smoke-Free", desc: "A sustainable solution without withdrawal stress." },
      ]
    : [
        { title: "Phase 1 — Klarheit & Vorbereitung", desc: "Verstehen der Gewohnheiten und mentalen Muster." },
        { title: "Phase 2 — Ursachen erkennen", desc: "Individuelle Auslöser für das Rauchen identifizieren." },
        { title: "Phase 3 — Mentale Umstellung", desc: "Gezielte Veränderung im Unterbewusstsein." },
        { title: "Phase 4 — Rauchfrei", desc: "Nachhaltige Lösung ohne Entzugsstress." },
      ];

  const results = isEN
    ? [
        "Employees become non-smokers in a short time",
        "Fewer sick days",
        "Significantly higher concentration at work",
        "More energy and performance",
        "Long-term relief for the company",
      ]
    : [
        "Mitarbeiter werden in kurzer Zeit Nichtraucher",
        "Weniger Krankheitsausfälle",
        "Deutlich höhere Konzentration im Arbeitsalltag",
        "Mehr Energie und Leistungsfähigkeit",
        "Langfristige Entlastung für das Unternehmen",
      ];

  const suitable = isEN
    ? [
        "Companies with a large workforce",
        "Firms focused on health & performance",
        "Teams with high workload and stress levels",
        "Organizations aiming to reduce long-term costs",
      ]
    : [
        "Unternehmen mit hoher Mitarbeiteranzahl",
        "Firmen mit Fokus auf Gesundheit & Performance",
        "Teams mit hoher Belastung und Stresslevel",
        "Organisationen, die Kosten langfristig senken wollen",
      ];

  return (
    <>
      <SEO
        titleDE="Nichtraucher-Seminar für Unternehmen — Rauchfrei in 3 Stunden"
        titleEN="Non-Smoker Seminar for Companies — Smoke-Free in 3 Hours"
        descriptionDE="Rauchfrei in 3 Stunden — das Nichtraucher-Seminar für Unternehmen von David J. Woods. Schnell, nachhaltig und direkt bei Ihnen im Unternehmen."
        descriptionEN="Smoke-free in 3 hours — the non-smoker seminar for companies by David J. Woods. Fast, sustainable and delivered on-site."
        pageKey="corporateNichtraucher"
        breadcrumbs={[
          { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
          { name: isEN ? "Business Coaching" : "Firmen-Coaching", path: getPath("corporate", language, country) },
          { name: isEN ? "Non-Smoker Seminars" : "Nichtraucher-Seminare", path: getPath("corporateNichtraucher", language, country) },
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
                {isEN ? "Non-Smoker Seminar for Companies" : "Nichtraucher-Seminar für Unternehmen"}
              </h1>
              <p className="text-sm md:text-base text-[#1B3A5C]/80 mb-3 leading-snug">
                {isEN
                  ? "Smoke-free in just 3 hours — boost health, performance and productivity in your team."
                  : "Rauchfrei in nur 3 Stunden – steigern Sie Gesundheit, Leistungsfähigkeit und Produktivität in Ihrem Team."}
              </p>
              <div className="text-sm text-foreground/85 space-y-2 leading-snug">
                <p>
                  {isEN
                    ? "Smoking costs companies money, energy and performance every day. Sick leave, lack of concentration and reduced resilience are the direct consequences."
                    : "Rauchen kostet Unternehmen täglich Geld, Energie und Leistungsfähigkeit. Fehlzeiten, Konzentrationsprobleme und reduzierte Belastbarkeit sind direkte Folgen."}
                </p>
                <p>
                  {isEN
                    ? "With the \u201eSmoke-Free in 3 Hours\u201c seminar, David J. Woods delivers a fast, effective and sustainable solution for companies."
                    : "Mit dem \u201eRauchfrei in 3 Stunden\u201c-Seminar bietet David J. Woods eine schnelle, effektive und nachhaltige Lösung für Unternehmen."}
                </p>
                <p>
                  {isEN
                    ? "In just a few hours, employees become non-smokers — without pressure, without withdrawal stress, through targeted change at the subconscious level."
                    : "In nur wenigen Stunden werden Mitarbeiter zu Nichtrauchern – ohne Druck, ohne Entzugsstress, sondern durch gezielte Veränderung im Unterbewusstsein."}
                </p>
                <p>
                  {isEN
                    ? "The seminar takes place directly at your company and is ideally suited for groups and teams."
                    : "Das Seminar findet direkt bei Ihnen im Unternehmen statt und eignet sich ideal für Gruppen und Teams."}
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
                src={corporateNonsmokerImg}
                alt={isEN ? "Non-Smoker Seminar" : "Nichtraucher-Seminar"}
                className="w-full h-44 md:h-full md:max-h-[320px] object-cover rounded-2xl border border-[#E2E8EE]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why companies should act — 2 columns */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-6 md:py-8">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-8 shadow-sm">
            <h2 className="text-xl md:text-2xl font-light text-[#1B3A5C] mb-5 md:mb-6 tracking-tight text-center">
              {isEN ? "Why Companies Should Act" : "Warum Unternehmen handeln sollten"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <ul className="space-y-2.5">
                {reasonsLeft.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-[15px] text-foreground/85">
                    <span className="text-[#2E7D32] mt-1">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2.5">
                {reasonsRight.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-[15px] text-foreground/85">
                    <span className="text-[#2E7D32] mt-1">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Benefits */}
      <section className="bg-[#F1F4F7]">
        <div className="container-main py-6 md:py-8">
          <div className="max-w-5xl mx-auto bg-[#E8EDF3] border border-[#D8E0EA] rounded-2xl shadow-[0_10px_40px_-25px_rgba(27,58,92,0.18)] overflow-hidden">
            <div className="px-5 md:px-8 pt-5 md:pt-6 pb-3 md:pb-4 text-center border-b border-[#D8E0EA]">
              <p className="text-[10px] font-medium text-[#2E7D32] uppercase tracking-[0.2em] mb-1.5">Benefits</p>
              <h2 className="text-lg md:text-xl font-light text-[#1B3A5C] tracking-tight">
                {isEN ? "The Benefits of the Non-Smoker Seminar" : "Die Vorteile des Nichtraucher-Seminars"}
              </h2>
            </div>
            <div className="px-5 md:px-8 py-5 md:py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {benefits.map((el, i) => (
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

      {/* Phases */}
      <section className="bg-[#E8EDF3]">
        <div className="container-main py-6 md:py-8">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-7 shadow-sm">
            <div className="text-center mb-5 md:mb-6">
              <h2 className="text-xl md:text-2xl font-light text-[#1B3A5C] tracking-tight">
                {isEN ? "How the Seminar Works" : "So läuft das Seminar ab"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {phases.map((p, i) => (
                <div key={i} className="bg-white border border-[#E2E8EE] rounded-2xl p-4 shadow-[0_1px_2px_rgba(27,58,92,0.04)] hover:shadow-[0_8px_24px_-12px_rgba(27,58,92,0.18)] transition-shadow">
                  <span className="inline-flex w-8 h-8 rounded-full bg-[#1B3A5C] text-white text-sm font-medium items-center justify-center tabular-nums mb-3">
                    {i + 1}
                  </span>
                  <h3 className="text-[14px] font-medium text-[#1B3A5C] tracking-tight mb-1 leading-tight">{p.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
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

      {/* Suitable for */}
      <section className="bg-[#F8FAFC]">
        <div className="container-main py-6 md:py-8">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-5 md:p-8 shadow-sm">
            <h2 className="text-xl md:text-2xl font-light text-[#1B3A5C] tracking-tight text-center mb-5 md:mb-6">
              {isEN ? "Which Companies Is This For?" : "Für welche Unternehmen ist das geeignet?"}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
              {suitable.map((r) => (
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
      <section className="bg-[#E8EDF3]">
        <div className="container-main py-7 md:py-9 flex justify-center">
          <div className="relative bg-white border border-[#1B3A5C]/15 rounded-2xl px-8 py-7 text-center max-w-2xl w-full">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ECEEF1] text-[#1B3A5C] text-xs font-medium border border-[#1B3A5C]/25 px-4 py-1 rounded-full whitespace-nowrap">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </span>
            <h2 className="text-xl md:text-2xl font-light text-[#1B3A5C] mb-2 mt-2 tracking-tight">
              {isEN ? "Secure the Non-Smoker Seminar for Your Team" : "Jetzt Nichtraucher-Seminar für Ihr Team sichern"}
            </h2>
            <p className="text-sm md:text-[15px] text-muted-foreground mb-4 leading-snug">
              {isEN
                ? "Boost health and performance in your company."
                : "Steigern Sie Gesundheit und Leistungsfähigkeit in Ihrem Unternehmen."}
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
