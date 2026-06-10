import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { GraduationCap, MessageSquare, Calendar, PlayCircle } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { ArrowRight } from "lucide-react";
import { CDN } from "@/lib/cdn";
import diplomImg from "@/assets/diplom-aktiv-hypnose.webp";
import sessionImg from "@/assets/david-session.webp";
import officeImg from "@/assets/david-woods-office.jpg";
import heroImg from "@/assets/hero-4.webp";

export default function SeminareUebersicht() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const items = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Aktiv-Hypnose® Therapeut",
      desc: isEN ? "6-Day Intensive Training" : "6-Tage Intensiv-Ausbildung",
      href: getPath("training", language, country),
      image: CDN.trainingSeminar,
      imagePosition: "center 45%",
      featured: true,
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: isEN ? "Participant Voices" : "Teilnehmerstimmen",
      desc: isEN ? "Experiences of our graduates" : "Erfahrungen unserer Absolventen",
      href: `/${language}/${country}/${isEN ? "participant-voices" : "teilnehmerstimmen"}`,
      image: sessionImg,
      imagePosition: "center 40%",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: isEN ? "Day Seminar" : "Tagesseminar",
      desc: isEN ? "In Preparation" : "In Vorbereitung",
      href: "#",
      image: heroImg,
      imagePosition: "center 45%",
      disabled: true,
    },
    {
      icon: <PlayCircle className="w-6 h-6" />,
      title: isEN ? "Videos & Insights" : "Videos & Einblicke",
      desc: isEN ? "Training and Practice" : "Ausbildung und Praxis",
      href: `/${language}/${country}/${isEN ? "training-institute-videos" : "ausbildungsinstitut-videos"}`,
      image: officeImg,
      imagePosition: "center 45%",
    },
  ];

  const breadcrumbs = [
    { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
    { name: isEN ? "Seminars & Trainings" : "Seminare & Ausbildungen", path: getPath("trainingOverview", language, country) },
  ];

  return (
    <>
      <SEO {...pageSEO.trainingOverview} pageKey="trainingOverview" breadcrumbs={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-2 md:py-3 text-center">
          <h1 className="text-xl sm:text-2xl md:text-[1.7rem] font-light text-[#1B3A5C] tracking-tight">
            {isEN ? "SEMINARS & TRAININGS" : "SEMINARE & AUSBILDUNGEN"}
          </h1>
        </div>
      </section>

      {/* Last-Minute Hinweis */}
      <section className="bg-[#E8EDF3]">
        <div className="container-main pb-3.5 md:pb-5">
          <Link
            to={getPath("training", language, "ch") + "?country=ch#dates"}
            className="block max-w-3xl mx-auto text-center text-[13px] md:text-sm font-medium text-[#1B5E20] bg-[#2E7D32]/10 border border-[#2E7D32]/25 rounded-full px-5 py-2.5 hover:bg-[#2E7D32]/20 transition-colors"
          >
            {isEN
              ? "🟢 Swiss Intensive Training · Last-minute spot available · CHF 1'990 instead of CHF 2'290 →"
              : "🟢 Schweizer Intensiv-Ausbildung · Last-Minute-Platz verfügbar · CHF 1’990 statt CHF 2’290 →"}
          </Link>
        </div>
      </section>

      {/* Items grid */}
      <section className="bg-[#E8EDF3]">
        <style>{`
          .seminare-cards .service-card-image { aspect-ratio: 4 / 3 !important; }
          .seminare-cards .md\\:hidden { display: none !important; }
          .seminare-cards .hidden.md\\:block { display: block !important; }
        `}</style>
        <div className="container-main pb-3.5 md:pb-5">
          <div className="max-w-5xl mx-auto">
            <div className="seminare-cards grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              {items.map((item) => (
                <div key={item.title} className="topics-compact relative">
                  {item.disabled && (
                    <div className="absolute top-2 right-2 z-10 text-[10px] uppercase tracking-wider bg-white/90 text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                      {isEN ? "Soon" : "Bald"}
                    </div>
                  )}
                  {item.featured ? (
                    <Link
                      to={item.href}
                      className="group block bg-gradient-to-b from-white to-[#FBFCFD] border border-[#1B3A5C]/30 rounded-lg overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.9)_inset,0_2px_4px_rgba(27,58,92,0.08),0_12px_28px_-10px_rgba(27,58,92,0.20),0_36px_70px_-28px_rgba(27,58,92,0.42)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.95)_inset,0_3px_6px_rgba(27,58,92,0.10),0_16px_34px_-10px_rgba(27,58,92,0.24),0_44px_84px_-28px_rgba(27,58,92,0.48)] hover:-translate-y-[2px] transition-all duration-300 ease-out"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ objectPosition: item.imagePosition }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                        <div className="absolute top-12 md:top-14 left-4 md:left-5 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-[#2E7D32]/30 text-[#1B5E20] text-[10.5px] md:text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-pulse" />
                          {isEN ? "Upcoming Dates" : "Nächste Termine"}
                        </div>

                        <div className="absolute top-4 right-4 md:top-4 md:right-4 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-md ring-2 ring-white overflow-hidden">
                          <img
                            src={diplomImg}
                            alt={isEN ? "Aktiv-Hypnose® Certificate" : "Aktiv-Hypnose® Urkunde"}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: "center 30%" }}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        <div className="absolute left-3 right-3 bottom-2.5 text-white">
                          <div className="text-[11px] md:text-[12px] font-medium opacity-95 leading-tight">
                            {isEN ? "Germany & Switzerland" : "Deutschland & Schweiz"}
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pt-1.5 pb-2.5 service-card-body">
                        <div className="flex items-center gap-2 text-primary mb-0.5">
                          {item.icon}
                          <h3 className="font-semibold text-foreground text-sm leading-snug">{item.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground leading-[1.45]">{item.desc}</p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2E7D32] group-hover:text-[#1B5E20] mt-1 group-hover:gap-2 transition-all">
                          {isEN ? "Learn more" : "Mehr erfahren"} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  ) : item.disabled ? (
                    <div className="opacity-70 pointer-events-none">
                      <ServiceCard
                        title={item.title}
                        description={item.desc}
                        href={item.href}
                        icon={item.icon}
                        image={item.image}
                        imagePosition={item.imagePosition}
                      />
                    </div>
                  ) : (
                    <ServiceCard
                      title={item.title}
                      description={item.desc}
                      href={item.href}
                      icon={item.icon}
                      image={item.image}
                      imagePosition={item.imagePosition}
                    />
                  )}
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
              {isEN ? "Questions about a seminar?" : "Fragen zu einem Seminar?"}
            </h2>
            <p className="text-[12.5px] md:text-[14px] text-foreground/80 max-w-md mx-auto mb-2 leading-snug">
              {isEN
                ? "We are happy to advise you personally on the right training."
                : "Wir beraten Sie gerne persönlich zur passenden Ausbildung."}
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
