import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tv } from "lucide-react";

const videos = [
  {
    vimeoId: "85952877",
    titleDE: "TV Hypnosen — Abnehmen mit Hypnose",
    titleEN: "TV Hypnosis — Weight Loss with Hypnosis",
    descDE: "Live-Demonstration: Abnehmen mit Hypnose, 09.05.2012",
    descEN: "Live demonstration: Weight loss with hypnosis",
  },
  {
    vimeoId: "85669798",
    titleDE: "TV Rauchentwöhnung mit David J. Woods",
    titleEN: "TV Stop Smoking with David J. Woods",
    descDE: "Rauchfrei durch Hypnose — TV-Beitrag",
    descEN: "Smoke-free through hypnosis — TV segment",
  },
  {
    vimeoId: "521457145",
    titleDE: "Blitzhypnose — Rapid Hypnose",
    titleEN: "Flash Hypnosis — Rapid Hypnosis",
    descDE: "Schnelle Hypnose-Induktion live demonstriert",
    descEN: "Rapid hypnosis induction demonstrated live",
  },
  {
    vimeoId: "521459700",
    titleDE: "Blitzhypnose — Live-Demonstration",
    titleEN: "Flash Hypnosis — Live Demonstration",
    descDE: "Weitere Demonstration der Blitzhypnose-Technik",
    descEN: "Another demonstration of the flash hypnosis technique",
  },
];

export default function TvMedien() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  return (
    <>
      <SEO {...pageSEO.media} />
      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="flex items-center gap-3 mb-2">
            <Tv className="w-7 h-7 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">
              {isEN ? "David J. Woods in TV, Radio and Print" : "David J. Woods in TV, Radio und Print"}
            </h1>
          </div>
          <p className="text-base text-muted-foreground mb-10 max-w-3xl">
            {isEN
              ? "Discover how David J. Woods became known through leading media platforms for his groundbreaking hypnosis techniques and brought them to a wide audience."
              : "Entdecken Sie, wie David J. Woods durch führende Medienplattformen für seine bahnbrechenden Hypnosetechniken bekannt wurde und einem breiten Publikum nahegebracht hat."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div key={video.vimeoId} className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
                <div className="aspect-video">
                  <iframe
                    src={`https://player.vimeo.com/video/${video.vimeoId}?dnt=true&title=1&byline=1&portrait=1`}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    allowFullScreen
                    title={isEN ? video.titleEN : video.titleDE}
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">
                    {isEN ? video.titleEN : video.titleDE}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isEN ? video.descEN : video.descDE}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#8b827c] text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Press Inquiries" : "Presseanfragen"}
          </h2>
          <p className="text-white/80 mb-6">
            {isEN ? "For media inquiries, please contact us directly." : "Für Medienanfragen kontaktieren Sie uns bitte direkt."}
          </p>
          <Link to={`/${language}/${country}/erstgespraech`}>
            <Button className="bg-cta hover:bg-cta/90 text-cta-foreground font-semibold px-8 py-3">
              {isEN ? "Contact" : "Kontakt"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
