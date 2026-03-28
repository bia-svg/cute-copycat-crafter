import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPath } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tv } from "lucide-react";

type Video = {
  type: "vimeo" | "youtube";
  id: string;
  titleDE: string;
  titleEN: string;
  descDE: string;
  descEN: string;
};

const videos: Video[] = [
  {
    type: "vimeo", id: "85952877",
    titleDE: "TV Hypnosen — Abnehmen mit Hypnose",
    titleEN: "TV Hypnosis — Weight Loss with Hypnosis",
    descDE: "Live-Demonstration: Abnehmen mit Hypnose, 09.05.2012",
    descEN: "Live demonstration: Weight loss with hypnosis",
  },
  {
    type: "vimeo", id: "85669798",
    titleDE: "TV Rauchentwöhnung mit David J. Woods",
    titleEN: "TV Stop Smoking with David J. Woods",
    descDE: "Rauchfrei durch Hypnose — TV-Beitrag",
    descEN: "Smoke-free through hypnosis — TV segment",
  },
  {
    type: "vimeo", id: "521457145",
    titleDE: "Blitzhypnose — Rapid Hypnose",
    titleEN: "Flash Hypnosis — Rapid Hypnosis",
    descDE: "Schnelle Hypnose-Induktion live demonstriert",
    descEN: "Rapid hypnosis induction demonstrated live",
  },
  {
    type: "vimeo", id: "521459700",
    titleDE: "Blitzhypnose — Live-Demonstration",
    titleEN: "Flash Hypnosis — Live Demonstration",
    descDE: "Weitere Demonstration der Blitzhypnose-Technik",
    descEN: "Another demonstration of the flash hypnosis technique",
  },
  {
    type: "vimeo", id: "521464028",
    titleDE: "Blitzhypnose — Weitere Demonstration",
    titleEN: "Flash Hypnosis — Another Demonstration",
    descDE: "David J. Woods zeigt Blitzhypnose live",
    descEN: "David J. Woods demonstrates flash hypnosis live",
  },
  {
    type: "youtube", id: "orLhcv7h43Y",
    titleDE: "David J. Woods — Hypnose im Fernsehen",
    titleEN: "David J. Woods — Hypnosis on TV",
    descDE: "TV-Auftritt mit Hypnose-Demonstration",
    descEN: "TV appearance with hypnosis demonstration",
  },
  {
    type: "youtube", id: "pzivsl7ykGM",
    titleDE: "Hypnose-Demonstration — Live im Studio",
    titleEN: "Hypnosis Demonstration — Live in Studio",
    descDE: "Live-Hypnose vor Studiopublikum",
    descEN: "Live hypnosis in front of studio audience",
  },
  {
    type: "youtube", id: "Y3HO46uyXHU",
    titleDE: "David Woods — Hypnotherapie erklärt",
    titleEN: "David Woods — Hypnotherapy Explained",
    descDE: "Interview über Hypnotherapie und ihre Wirkung",
    descEN: "Interview about hypnotherapy and its effects",
  },
  {
    type: "youtube", id: "GyPp8zOy2nE",
    titleDE: "Hypnose in der Praxis",
    titleEN: "Hypnosis in Practice",
    descDE: "Praktische Anwendung der Hypnose",
    descEN: "Practical application of hypnosis",
  },
  {
    type: "youtube", id: "p72nlj_kkes",
    titleDE: "David J. Woods — Medienauftritt",
    titleEN: "David J. Woods — Media Appearance",
    descDE: "Weiterer Medienauftritt von David J. Woods",
    descEN: "Another media appearance by David J. Woods",
  },
  {
    type: "youtube", id: "cgBo7ZytpUQ",
    titleDE: "Hypnose live — TV-Beitrag",
    titleEN: "Hypnosis Live — TV Segment",
    descDE: "Live-Hypnose im Fernsehen",
    descEN: "Live hypnosis on television",
  },
  {
    type: "youtube", id: "j8SCSNn7DR0",
    titleDE: "David Woods — Interview & Demonstration",
    titleEN: "David Woods — Interview & Demonstration",
    descDE: "Interview und Hypnose-Demonstration",
    descEN: "Interview and hypnosis demonstration",
  },
  {
    type: "vimeo", id: "419881622",
    titleDE: "Hypnose-Session — Aufzeichnung",
    titleEN: "Hypnosis Session — Recording",
    descDE: "Aufgezeichnete Hypnose-Session",
    descEN: "Recorded hypnosis session",
  },
  {
    type: "youtube", id: "t-8hQbH725o",
    titleDE: "David J. Woods — Weitere TV-Aufnahme",
    titleEN: "David J. Woods — More TV Footage",
    descDE: "Weitere TV-Aufnahme mit David J. Woods",
    descEN: "More TV footage featuring David J. Woods",
  },
  {
    type: "vimeo", id: "85741539",
    titleDE: "Hypnose im Schweizer Fernsehen",
    titleEN: "Hypnosis on Swiss Television",
    descDE: "David J. Woods im Schweizer TV",
    descEN: "David J. Woods on Swiss TV",
  },
];

function getEmbedUrl(video: Video) {
  if (video.type === "vimeo") {
    return `https://player.vimeo.com/video/${video.id}?dnt=true&title=1&byline=1&portrait=1`;
  }
  return `https://www.youtube.com/embed/${video.id}?rel=0`;
}

export default function TvMedien() {
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const basePath = getPath("home", language, country);

  return (
    <>
      <SEO {...pageSEO.media} pageKey="media" />
      <Breadcrumbs items={[
        { name: "Home", path: basePath },
        { name: isEN ? "About" : "Über uns", path: getPath("about", language, country) },
        { name: isEN ? "TV & Media" : "TV & Medien", path: getPath("media", language, country) },
      ]} />
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
              <div key={`${video.type}-${video.id}`} className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
                <div className="aspect-video">
                  <iframe
                    src={getEmbedUrl(video)}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
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
