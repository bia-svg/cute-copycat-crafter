import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { Cigarette, Brain, Scale, Flame, Users, HeartPulse } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { CDN } from "@/lib/cdn";

export default function SitzungenUebersicht() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const items = [
    {
      icon: <Cigarette className="w-6 h-6" />,
      title: isEN ? "Stop Smoking" : "Raucherentwöhnung",
      desc: isEN
        ? "Become permanently smoke-free — without a constant inner struggle."
        : "Dauerhaft rauchfrei werden — ohne ständigen inneren Kampf.",
      href: getPath("smoking", language, country),
      image: CDN.stopSmoking,
      imagePosition: "center 45%",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: isEN ? "Anxiety, Panic & Phobias" : "Ängste, Panik & Phobien",
      desc: isEN
        ? "Resolve fears, phobias and stressful thoughts at their root."
        : "Ängste, Phobien und belastende Gedanken an der Wurzel lösen.",
      href: getPath("anxiety", language, country),
      image: CDN.anxietyRelief,
      imagePosition: "center 40%",
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: isEN ? "Weight Loss & Eating Habits" : "Abnehmen & Essverhalten",
      desc: isEN
        ? "Sustainably change your eating behaviour — without dieting pressure."
        : "Essverhalten und Gewicht nachhaltig verändern — ohne Diätdruck.",
      href: getPath("weight", language, country),
      image: CDN.weightLoss,
      imagePosition: "center 30%",
      mobileImagePosition: "25% center",
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: isEN ? "Manage Stress" : "Stress bewältigen",
      desc: isEN
        ? "Reduce stress, prevent burnout and find inner calm again."
        : "Stress reduzieren, Burnout vorbeugen und innere Ruhe wiederfinden.",
      href: getPath("stress", language, country),
      image: CDN.stressBurnout,
      imagePosition: "center 45%",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: isEN ? "Strengthen Children & Teens" : "Kinder & Jugendliche stärken",
      desc: isEN
        ? "Build focus, self-confidence and gently resolve fears."
        : "Konzentration stärken, Selbstbewusstsein aufbauen und Ängste lösen.",
      href: getPath("children", language, country),
      image: CDN.childrenTeens,
      imagePosition: "center 35%",
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      title: isEN ? "Resolve Depression & Trauma" : "Depressionen & Trauma lösen",
      desc: isEN
        ? "Discover new perspectives and regain joy in life."
        : "Neue Perspektiven entdecken und Lebensfreude zurückgewinnen.",
      href: getPath("depression", language, country),
      image: CDN.depressionTrauma,
      imagePosition: "center 45%",
    },
  ];

  const breadcrumbs = [
    { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
    { name: isEN ? "Hypnosis Sessions" : "Hypnose-Sitzungen", path: getPath("sessionsOverview", language, country) },
  ];

  return (
    <>
      <SEO {...pageSEO.sessionsOverview} pageKey="sessionsOverview" breadcrumbs={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-3.5 md:py-5 lg:py-6">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl px-5 py-4 md:px-7 md:py-5 shadow-sm text-center">
            <p className="text-[11px] md:text-xs font-medium text-[#2E7D32] uppercase tracking-wider mb-1.5 md:mb-2">
              {isEN ? "Hypnosis Sessions" : "Hypnose-Sitzungen"}
            </p>
            <h1 className="text-xl sm:text-2xl md:text-[1.7rem] font-light text-[#1B3A5C] leading-snug md:leading-[1.2] mb-2 md:mb-2.5 tracking-tight">
              {isEN ? "More Freedom. More Quality of Life." : "Mehr Freiheit. Mehr Lebensqualität."}
            </h1>
            <p className="text-[13.5px] md:text-[14.5px] text-foreground/80 leading-snug md:leading-[1.55] max-w-2xl mx-auto font-medium">
              {isEN
                ? "Support for smoking cessation, weight reduction, anxiety, panic attacks, stress, burnout, trauma recovery and personal change."
                : "Unterstützung bei Rauchstopp, Gewichtsreduktion, Ängsten, Panikattacken, Stress, Burnout, Traumabewältigung und persönlicher Veränderung."}
            </p>
          </div>
        </div>
      </section>

      {/* Items grid */}
      <section className="bg-[#E8EDF3]">
        <style>{`
          .sitzungen-cards .service-card-image { aspect-ratio: 4 / 3 !important; }
          .sitzungen-cards .md\\:hidden { display: none !important; }
          .sitzungen-cards .hidden.md\\:block { display: block !important; }
        `}</style>
        <div className="container-main py-3.5 md:py-5">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-3.5 md:p-5 shadow-sm">
            <h2 className="text-base md:text-lg font-light text-[#1B3A5C] mb-2.5 md:mb-3 text-center tracking-tight">
              {isEN ? "Our intensive individual sessions" : "Unsere intensiven Einzelsitzungen"}
            </h2>
            <div className="sitzungen-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
              {items.map((item) => (
                <div key={item.title} className="topics-compact">
                  <ServiceCard
                    title={item.title}
                    description={item.desc}
                    href={item.href}
                    icon={item.icon}
                    image={item.image}
                    imagePosition={item.imagePosition}
                    mobileImagePosition={item.mobileImagePosition}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="bg-[#E8EDF3] py-3 md:py-3.5 lg:py-4">
        <div className="container-main">
          <div className="relative max-w-xl mx-auto bg-white border border-[#1B3A5C]/15 rounded-2xl px-5 py-3.5 md:px-8 md:py-4 text-center shadow-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ECEEF1] text-[#1B3A5C] text-[10.5px] font-medium border border-[#1B3A5C]/25 px-3.5 py-0.5 rounded-full tracking-wide uppercase">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </div>
            <h2 className="text-lg md:text-xl font-light text-foreground mb-1 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Questions about a session?" : "Fragen zu einer Sitzung?"}
            </h2>
            <p className="text-[12.5px] md:text-[14px] text-foreground/80 max-w-md mx-auto mb-2 leading-snug">
              {isEN
                ? "We are happy to advise you personally on the right session."
                : "Wir beraten Sie gerne persönlich zur passenden Sitzung."}
            </p>
            <Link to={getPath("contact", language, country)}>
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
