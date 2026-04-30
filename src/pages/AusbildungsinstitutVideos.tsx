/*
 * Ausbildungsinstitut Videos — Einblicke in das Ausbildungsinstitut
 * Vorbereitung für 3 Promo-/Image-Videos. Video-Links werden später ergänzt.
 */

import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPath } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlayCircle, MessageSquare } from "lucide-react";

// Platzhalter — Video-Links werden später vom Kunden geliefert.
// Sobald verfügbar: `embedUrl` (YouTube/Vimeo) eintragen, dann wird statt des
// Platzhalters automatisch das eingebettete Video angezeigt.
const videos: Array<{
  titleDE: string;
  titleEN: string;
  descDE: string;
  descEN: string;
  embedUrl?: string;
}> = [
  {
    titleDE: "Einblick ins Ausbildungsinstitut",
    titleEN: "Insight into the Training Institute",
    descDE: "Persönlicher Einblick in das Aktiv-Hypnose® Ausbildungsinstitut von David J. Woods – Atmosphäre, Methodik und Eindrücke.",
    descEN: "A personal insight into David J. Woods' Aktiv-Hypnose® training institute – atmosphere, methodology and impressions.",
    embedUrl: "https://player.vimeo.com/video/419881622?h=0&badge=0&autopause=0&player_id=0&app_id=58479",
  },
  {
    titleDE: "Einblick ins Ausbildungsinstitut",
    titleEN: "Insight into the Training Institute",
    descDE: "Persönlicher Einblick in das Aktiv-Hypnose® Ausbildungsinstitut von David J. Woods – Atmosphäre, Methodik und Eindrücke.",
    descEN: "A personal insight into David J. Woods' Aktiv-Hypnose® training institute – atmosphere, methodology and impressions.",
    embedUrl: "https://www.youtube.com/embed/t-8hQbH725o",
  },
  {
    titleDE: "Einblick ins Ausbildungsinstitut",
    titleEN: "Insight into the Training Institute",
    descDE: "Persönlicher Einblick in das Aktiv-Hypnose® Ausbildungsinstitut von David J. Woods – Atmosphäre, Methodik und Eindrücke.",
    descEN: "A personal insight into David J. Woods' Aktiv-Hypnose® training institute – atmosphere, methodology and impressions.",
    embedUrl: "https://www.youtube.com/embed/orLhcv7h43Y",
  },
];

export default function AusbildungsinstitutVideos() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  return (
    <>
      <SEO
        titleDE="Ausbildungsinstitut Videos – Einblicke"
        titleEN="Training Institute Videos – Insights"
        descriptionDE="Exklusive Video-Einblicke in das Aktiv-Hypnose® Ausbildungsinstitut von David J. Woods."
        descriptionEN="Exclusive video insights into the Aktiv-Hypnose® training institute by David J. Woods."
        breadcrumbs={[
          { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
          { name: isEN ? "Training Institute Videos" : "Ausbildungsinstitut Videos", path: `/${language}/${country}/ausbildungsinstitut-videos` },
        ]}
      />
      <Breadcrumbs items={[
        { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
        { name: isEN ? "Training Institute Videos" : "Ausbildungsinstitut Videos", path: `/${language}/${country}/ausbildungsinstitut-videos` },
      ]} />

      {/* Compact Intro */}
      <section className="bg-background pt-6 pb-4 md:pt-8 md:pb-5 border-b border-border/60">
        <div className="container-main max-w-3xl text-center">
          <h1 className="text-2xl md:text-3xl font-light text-foreground tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "The Hypnosis Institute" : "Das Hypnose Institut"}
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            {isEN
              ? "Exclusive insights into the Aktiv-Hypnose® training institute – atmosphere, methodology and behind the scenes."
              : "Exklusive Einblicke in das Aktiv-Hypnose® Ausbildungsinstitut – Atmosphäre, Methodik und Eindrücke hinter den Kulissen."}
          </p>
        </div>
      </section>

      {/* Videos */}
      <section className="bg-background py-12 md:py-16">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {videos.map((v, i) => (
              <div key={i} className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="aspect-video bg-secondary flex items-center justify-center">
                  {v.embedUrl ? (
                    <iframe
                      src={v.embedUrl}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={isEN ? v.titleEN : v.titleDE}
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground gap-2">
                      <PlayCircle className="w-12 h-12 opacity-60" />
                      <span className="text-xs">{isEN ? "Video coming soon" : "Video folgt in Kürze"}</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-base font-medium text-foreground mb-2">
                    {isEN ? v.titleEN : v.titleDE}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isEN ? v.descEN : v.descDE}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#E8EDF3] py-8 lg:py-10">
        <div className="container-main">
          <div className="relative max-w-2xl mx-auto bg-white border border-[#1B3A5C]/15 rounded-2xl px-6 py-7 md:px-10 md:py-8 text-center shadow-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ECEEF1] text-[#1B3A5C] text-[11px] font-medium border border-[#1B3A5C]/25 px-3 py-0.5 rounded-full tracking-wide uppercase">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </div>
            <h2 className="text-xl md:text-2xl font-light text-foreground mb-2 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Interested in the Training?" : "Interesse an der Ausbildung?"}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-4">
              {isEN
                ? "Book your free discovery call and learn more about the Aktiv-Hypnose® training."
                : "Vereinbaren Sie Ihr kostenloses Erstgespräch und erfahren Sie mehr über die Aktiv-Hypnose® Ausbildung."}
            </p>
            <Link to={getPath("contact", language, country)}>
              <Button className="bg-[#ECEEF1] hover:bg-[#E2E5E9] text-[#1B3A5C] font-medium px-6 py-2.5 text-sm md:text-base border border-[#1B3A5C]/25 shadow-none">
                <MessageSquare className="w-4 h-4 mr-2" />
                {isEN ? "Free Discovery Call" : "Kostenloses Erstgespräch"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
