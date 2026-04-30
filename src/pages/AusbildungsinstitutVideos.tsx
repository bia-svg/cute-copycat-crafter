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
    titleDE: "Video 2 – folgt in Kürze",
    titleEN: "Video 2 – coming soon",
    descDE: "Einblick in das Ausbildungsinstitut – Video wird in Kürze ergänzt.",
    descEN: "Insight into the training institute – video will be added shortly.",
  },
  {
    titleDE: "Video 3 – folgt in Kürze",
    titleEN: "Video 3 – coming soon",
    descDE: "Einblick in das Ausbildungsinstitut – Video wird in Kürze ergänzt.",
    descEN: "Insight into the training institute – video will be added shortly.",
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

      {/* Hero */}
      <section className="bg-primary/15 py-12 md:py-16">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-light text-foreground mb-4 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Training Institute Videos" : "Ausbildungsinstitut Videos"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isEN
                ? "Exclusive insights into the Aktiv-Hypnose® training institute – atmosphere, methodology and behind the scenes."
                : "Exklusive Einblicke in das Aktiv-Hypnose® Ausbildungsinstitut – Atmosphäre, Methodik und Eindrücke hinter den Kulissen."}
            </p>
          </div>
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
      <section className="bg-background py-10 lg:py-14">
        <div className="container-main">
          <div className="relative max-w-2xl mx-auto bg-primary/10 border border-primary/25 rounded-2xl px-6 py-10 md:px-10 md:py-12 text-center shadow-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full tracking-wide uppercase">
              {isEN ? "Next Step" : "Nächster Schritt"}
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Interested in the Training?" : "Interesse an der Ausbildung?"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              {isEN
                ? "Book your free discovery call and learn more about the Aktiv-Hypnose® training."
                : "Vereinbaren Sie Ihr kostenloses Erstgespräch und erfahren Sie mehr über die Aktiv-Hypnose® Ausbildung."}
            </p>
            <Link to={getPath("contact", language, country)}>
              <Button className="bg-cta hover:bg-cta/90 text-cta-foreground font-medium px-8 py-3 text-base">
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
