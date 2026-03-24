import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Kundenmeinungen() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                {isEN ? "Client Testimonials" : "Kundenmeinungen"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {isEN ? "5.0 / 5 on Google · 255 Reviews" : "5.0 / 5 bei Google · 255 Bewertungen"}
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
              <div key={i} className="border border-border p-5 bg-secondary">
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
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  &bdquo;{t.textDE}&ldquo;
                </p>
                <p className="text-xs font-semibold text-primary">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {isEN ? "Read All Google Reviews" : "Alle Google-Bewertungen lesen"}
            </p>
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
