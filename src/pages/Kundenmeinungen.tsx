import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPath } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const CHAR_LIMIT = 280;

function TestimonialCard({ t, index }: { t: typeof testimonials[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = t.textDE.length > CHAR_LIMIT;
  const displayText = expanded || !needsTruncation ? t.textDE : t.textDE.slice(0, CHAR_LIMIT) + "…";

  return (
    <div className="border border-border p-5 bg-secondary flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, j) => (
            <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded">
          {t.topic}
        </span>
      </div>
      <p className="text-sm text-foreground leading-relaxed mb-3 flex-1">
        &bdquo;{displayText}&ldquo;
      </p>
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary hover:text-primary/80 font-medium self-start mb-3 transition-colors"
        >
          {expanded ? "WENIGER ▲" : "WEITERLESEN »"}
        </button>
      )}
      <div className="mt-auto pt-2 border-t border-border/50">
        <p className="text-xs font-semibold text-primary">{t.name}</p>
        <p className="text-xs text-muted-foreground">{t.location}</p>
      </div>
    </div>
  );
}

export default function Kundenmeinungen() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  return (
    <>
      <SEO {...pageSEO.testimonials} pageKey="testimonials" breadcrumbs={[
        { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
        { name: isEN ? "Testimonials" : "Kundenmeinungen", path: getPath("testimonials", language, country) },
      ]} />
      <Breadcrumbs items={[
        { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
        { name: isEN ? "Testimonials" : "Kundenmeinungen", path: getPath("testimonials", language, country) },
      ]} />
      <section className="bg-background border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-light text-primary tracking-tight">
                {isEN ? "Client Testimonials" : "Kundenmeinungen"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                <a href="https://share.google/SGm12iRl4fuRtKxRD" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">
                  {isEN ? "★ 5.0 at Google · 266 Reviews" : "★ 5.0 bei Google · 266 Bewertungen"}
                </a>
              </p>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="https://share.google/SGm12iRl4fuRtKxRD" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary/80 underline transition-colors">
              {isEN ? "Read All Google Reviews →" : "Alle Google-Bewertungen lesen →"}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#E8EDF3] py-5 lg:py-7">
        <div className="container-main">
          <div className="relative max-w-2xl mx-auto bg-white border border-[#1B3A5C]/15 rounded-2xl px-6 py-5 md:px-10 md:py-6 text-center shadow-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ECEEF1] text-[#1B3A5C] text-[11px] font-medium border border-[#1B3A5C]/25 px-3 py-0.5 rounded-full tracking-wide uppercase">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </div>
            <h2 className="text-xl md:text-2xl font-light text-foreground mb-1.5 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Ready for Your Own Success Story?" : "Bereit für Ihre eigene Erfolgsgeschichte?"}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-3">
              {isEN
                ? "Book your free discovery call and take the first step towards positive change."
                : "Vereinbaren Sie Ihr kostenloses Erstgespräch und machen Sie den ersten Schritt zu positiver Veränderung."}
            </p>
            <Link to={`/${language}/${country}/erstgespraech`}>
              <Button className="bg-[#ECEEF1] hover:bg-[#E2E5E9] text-[#1B3A5C] font-medium px-6 py-2.5 text-sm md:text-base border border-[#1B3A5C]/25 shadow-none">
                {isEN ? "Free Discovery Call" : "Kostenloses Erstgespräch"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
