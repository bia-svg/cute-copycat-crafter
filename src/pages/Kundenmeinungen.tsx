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
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                {isEN ? "Client Testimonials" : "Kundenmeinungen"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                <a href="https://share.google/SGm12iRl4fuRtKxRD" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">
                  {isEN ? "★ 5.0 at Google · 264 Reviews" : "★ 5.0 bei Google · 264 Bewertungen"}
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

      <section className="bg-muted-foreground text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Ready for Your Own Success Story?" : "Bereit für Ihre eigene Erfolgsgeschichte?"}
          </h2>
          <Link to={`/${language}/${country}/erstgespraech`}>
            <Button className="bg-cta hover:bg-cta/90 text-cta-foreground font-semibold px-8 py-3 text-base">
              {isEN ? "Free Discovery Call" : "Kostenloses Erstgespräch"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
