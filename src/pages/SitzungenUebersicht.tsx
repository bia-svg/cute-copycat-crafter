import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { Cigarette, Brain, Scale, Flame, Users, HeartPulse, ArrowRight } from "lucide-react";
import { CDN } from "@/lib/cdn";
import type { ReactNode } from "react";

interface CompactTopicCardProps {
  title: string;
  href: string;
  icon: ReactNode;
  image: string;
  imagePosition?: string;
  mobileImagePosition?: string;
  ctaText: string;
}

function CompactTopicCard({
  title,
  href,
  icon,
  image,
  imagePosition = "center center",
  mobileImagePosition,
  ctaText,
}: CompactTopicCardProps) {
  const mobilePos = mobileImagePosition ?? imagePosition;
  return (
    <Link
      to={href}
      className="group block bg-gradient-to-b from-white to-[#FBFCFD] border border-[#1B3A5C]/18 rounded-xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.85)_inset,0_1px_2px_rgba(27,58,92,0.05),0_8px_22px_-8px_rgba(27,58,92,0.10),0_28px_60px_-28px_rgba(27,58,92,0.32)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.92)_inset,0_2px_5px_rgba(27,58,92,0.07),0_12px_28px_-8px_rgba(27,58,92,0.13),0_36px_76px_-28px_rgba(27,58,92,0.38)] hover:-translate-y-[2px] transition-all duration-300 ease-out"
    >
      <div className="flex md:hidden items-center gap-4 p-4">
        <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={title}
            width={80}
            height={80}
            sizes="80px"
            style={{ objectPosition: mobilePos }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-primary mb-1">
            {icon}
            <h3 className="font-semibold text-foreground text-[0.95rem] leading-snug">{title}</h3>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2E7D32] group-hover:text-[#1B5E20] group-hover:gap-1.5 transition-all">
            {ctaText} <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            width={640}
            height={480}
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            style={{ objectPosition: imagePosition }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="px-3.5 pt-2 pb-2.5">
          <div className="flex items-center gap-1.5 text-primary mb-1">
            {icon}
            <h3 className="font-semibold text-foreground text-[0.95rem] leading-snug">{title}</h3>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2E7D32] group-hover:text-[#1B5E20] group-hover:gap-1.5 transition-all">
            {ctaText} <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function SitzungenUebersicht() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const items = [
    {
      icon: <Cigarette className="w-5 h-5" />,
      title: isEN ? "Quit Smoking" : "Rauchfrei werden",
      href: getPath("smoking", language, country),
      image: CDN.stopSmoking,
      imagePosition: "center 45%",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: isEN ? "Overcome Anxiety & Panic" : "Ängste & Panik bewältigen",
      href: getPath("anxiety", language, country),
      image: CDN.anxietyRelief,
      imagePosition: "center 40%",
    },
    {
      icon: <Scale className="w-5 h-5" />,
      title: isEN ? "Weight Reduction" : "Gewichtsreduktion",
      href: getPath("weight", language, country),
      image: CDN.weightLoss,
      imagePosition: "center 30%",
      mobileImagePosition: "25% center",
    },
    {
      icon: <Flame className="w-5 h-5" />,
      title: isEN ? "Stress & Burnout" : "Stress & Burnout",
      href: getPath("stress", language, country),
      image: CDN.stressBurnout,
      imagePosition: "center 45%",
    },
    {
      icon: <HeartPulse className="w-5 h-5" />,
      title: isEN ? "Process Trauma" : "Trauma bewältigen",
      href: getPath("depression", language, country),
      image: CDN.depressionTrauma,
      imagePosition: "center 45%",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: isEN ? "Strengthen Children & Teens" : "Kinder & Jugendliche stärken",
      href: getPath("children", language, country),
      image: CDN.childrenTeens,
      imagePosition: "center 35%",
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
        <div className="container-main py-2 md:py-2.5">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-2xl px-4 py-2.5 md:px-6 md:py-3 shadow-sm text-center">
            <p className="text-[10px] md:text-[11px] font-medium text-[#2E7D32] uppercase tracking-wider mb-1">
              {isEN ? "Hypnosis Sessions" : "Hypnose-Sitzungen"}
            </p>
            <h1 className="text-lg sm:text-xl md:text-[1.5rem] font-light text-[#1B3A5C] leading-tight mb-1 tracking-tight">
              {isEN ? "More Freedom. More Quality of Life." : "Mehr Freiheit. Mehr Lebensqualität."}
            </h1>
            <p className="text-[12.5px] md:text-[13.5px] text-foreground/80 leading-snug max-w-2xl mx-auto font-medium">
              {isEN
                ? "Quit smoking · Overcome anxiety & panic · Lose weight · Reduce stress · Process trauma"
                : "Rauchfrei werden · Ängste & Panik bewältigen · Abnehmen · Stress reduzieren · Trauma verarbeiten"}
            </p>
          </div>
        </div>
      </section>

      {/* Items grid */}
      <section className="bg-[#E8EDF3]">
        <div className="container-main pt-1.5 pb-3.5 md:pt-2 md:pb-5">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl p-3 md:p-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2.5">
              {items.map((item) => (
                <CompactTopicCard
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                  image={item.image}
                  imagePosition={item.imagePosition}
                  mobileImagePosition={item.mobileImagePosition}
                  ctaText={isEN ? "View Topic" : "Thema ansehen"}
                />
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
