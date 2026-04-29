import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPath } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function WieFunktioniertHypnose() {
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const basePath = getPath("home", language, country);

  const title = isEN ? "How Does Hypnosis Work?" : "Wie funktioniert Hypnose?";
  const subtitle = isEN
    ? "An understandable insight into the effect and safety of modern hypnosis"
    : "Ein verständlicher Einblick in die Wirkung und Sicherheit moderner Hypnose";
  const intro = isEN
    ? "Hypnosis is not a loss of control, but a natural state of focused attention. In this short video you receive an understandable insight into how modern hypnosis works, why there is no reason to fear it, and why it is used today professionally and responsibly."
    : "Hypnose ist kein Kontrollverlust, sondern ein natürlicher Zustand fokussierter Aufmerksamkeit. In diesem kurzen Video erhalten Sie einen verständlichen Einblick, wie moderne Hypnose funktioniert, warum man keine Angst davor haben muss und weshalb sie heute professionell und verantwortungsvoll eingesetzt wird.";

  return (
    <>
      <SEO
        titleDE="Wie funktioniert Hypnose? | Verständlich erklärt — David J. Woods"
        titleEN="How Does Hypnosis Work? | Clearly Explained — David J. Woods"
        descriptionDE="Wie funktioniert Hypnose wirklich? Verständlicher Einblick in moderne Hypnose: kein Kontrollverlust, sondern fokussierte Aufmerksamkeit. Video von David J. Woods."
        descriptionEN="How does hypnosis really work? An understandable insight into modern hypnosis: not loss of control, but focused attention. Video by David J. Woods."
      />
      <Breadcrumbs items={[
        { name: "Home", path: basePath },
        { name: title, path: getPath("howHypnosisWorks", language, country) },
      ]} />

      {/* Hero */}
      <section className="bg-[#EAF1F8] border-b border-border">
        <div className="container-main py-10 lg:py-14 text-center">
          <h1
            className="text-2xl md:text-3xl lg:text-4xl font-light text-[#1B3A5C] mb-3 tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {title}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Video + intro */}
      <section className="bg-white border-b border-border">
        <div className="container-main py-10 lg:py-14">
          <div className="max-w-3xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden border border-border shadow-sm">
              <iframe
                src="https://www.youtube.com/embed/nQo8M8-pRyc?rel=0"
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                title={isEN ? "Why you don't need to fear hypnosis" : "Warum man keine Angst vor Hypnose haben muss"}
                loading="eager"
              />
            </div>

            <p className="text-sm md:text-base text-foreground/80 leading-relaxed mt-6 text-center max-w-2xl mx-auto">
              {intro}
            </p>

            <div className="flex justify-center mt-8">
              <Button asChild size="lg" className="bg-[#1B3A5C] hover:bg-[#1B3A5C]/90 text-white">
                <Link to={basePath + "#sessions"}>
                  {isEN ? "Go to hypnosis sessions" : "Zu den Hypnose-Sitzungen"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
