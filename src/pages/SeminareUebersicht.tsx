import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { GraduationCap, MessageSquare, Calendar, PlayCircle } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import diplomImg from "@/assets/diplom-aktiv-hypnose.webp";
import sessionImg from "@/assets/david-session.webp";
import officeImg from "@/assets/david-woods-office.jpg";
import heroImg from "@/assets/hero-3.webp";

export default function SeminareUebersicht() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const items = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Aktiv-Hypnose® Therapeut",
      desc: isEN ? "6-Day intensive training" : "6-Tage Intensiv-Ausbildung",
      href: getPath("training", language, country),
      image: diplomImg,
      imagePosition: "center 35%",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: isEN ? "Participant Voices" : "Teilnehmerstimmen",
      desc: isEN ? "Experiences of our seminar participants" : "Erfahrungen unserer Seminarteilnehmer",
      href: `/${language}/${country}/${isEN ? "participant-voices" : "teilnehmerstimmen"}`,
      image: sessionImg,
      imagePosition: "center 40%",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: isEN ? "Day Seminar" : "Tagesseminar",
      desc: isEN ? "Another seminar coming soon" : "Hier kommt später ein weiteres Seminar",
      href: "#",
      image: heroImg,
      imagePosition: "center 45%",
      disabled: true,
    },
    {
      icon: <PlayCircle className="w-6 h-6" />,
      title: isEN ? "Hypnosis Institute" : "Hypnoseinstitut",
      desc: isEN ? "Insights into the training" : "Einblicke in die Ausbildung",
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
        <div className="container-main py-3.5 md:py-5 lg:py-6">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl px-5 py-4 md:px-7 md:py-5 shadow-sm text-center">
            <p className="text-[11px] md:text-xs font-medium text-[#2E7D32] uppercase tracking-wider mb-1.5 md:mb-2">
              {isEN ? "Seminars & Trainings" : "Seminare & Ausbildungen"}
            </p>
            <h1 className="text-xl sm:text-2xl md:text-[1.7rem] font-light text-[#1B3A5C] leading-snug md:leading-[1.2] mb-2 md:mb-2.5 tracking-tight">
              {isEN ? "Insights into our seminars and trainings" : "Einblicke in unsere Seminare und Ausbildungen"}
            </h1>
            <p className="text-[13.5px] md:text-[14.5px] text-foreground/80 leading-snug md:leading-[1.55] max-w-2xl mx-auto font-medium">
              {isEN
                ? "A clear overview of all our seminars and trainings — practice-oriented and directly with Lic. Psych. David J. Woods."
                : "Ein klarer Überblick über alle Seminare und Ausbildungen — praxisnah und direkt mit Lic. Psych. David J. Woods."}
            </p>
          </div>
        </div>
      </section>

      {/* Items grid */}
      <section className="bg-[#E8EDF3]">
        <div className="container-main py-3.5 md:py-5">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-3.5 md:p-5 shadow-sm">
            <h2 className="text-base md:text-lg font-light text-[#1B3A5C] mb-2.5 md:mb-3 text-center tracking-tight">
              {isEN ? "Our seminars & trainings" : "Unsere Seminare & Ausbildungen"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              {items.map((item) => (
                <div key={item.title} className="topics-compact relative">
                  {item.disabled && (
                    <div className="absolute top-2 right-2 z-10 text-[10px] uppercase tracking-wider bg-white/90 text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                      {isEN ? "Soon" : "Bald"}
                    </div>
                  )}
                  {item.disabled ? (
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
