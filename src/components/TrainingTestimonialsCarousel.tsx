import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";

const trainingTestimonials = [
  {
    name: "Sibylle Wenger",
    vimeoId: "414796794",
    topicDE: "Balance Coach & Familientherapeutin",
    topicEN: "Balance Coach & Family Therapist",
  },
  {
    name: "Helmut Sokopp",
    vimeoId: "420049552",
    topicDE: "Hypnose-Praxis München & Los Angeles",
    topicEN: "Hypnosis Practice Munich & Los Angeles",
  },
  {
    name: "Marcus Schönberger",
    vimeoId: "420054338",
    topicDE: "Spezialist für Vermögenssicherung",
    topicEN: "Asset Protection Specialist",
  },
  {
    name: "Michael Cappello",
    vimeoId: "420057448",
    topicDE: "Geschäftsführer & Business Coach",
    topicEN: "CEO & Business Coach",
  },
];

export default function TrainingTestimonialsCarousel() {
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  return (
    <section className="bg-secondary/40 py-12 md:py-16">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B3A5C] mb-3" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "What Our Seminar Participants Say" : "Das sagen unsere Seminarteilnehmer"}
          </h2>
          <p className="text-base text-muted-foreground">
            {isEN
              ? "Real video testimonials from participants of the Aktiv-Hypnose® Training"
              : "Echte Video-Erfahrungsberichte von Teilnehmern der Aktiv-Hypnose® Ausbildung"}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="relative">
            <CarouselContent>
              {trainingTestimonials.map((t, i) => (
                <CarouselItem key={i}>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="aspect-video bg-black">
                      <iframe
                        src={`https://player.vimeo.com/video/${t.vimeoId}?h=0&badge=0&autopause=0&player_id=0&app_id=58479`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={t.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 md:p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-base md:text-lg font-bold text-foreground">{t.name}</h3>
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                          {isEN ? t.topicEN : t.topicDE}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-12" />
          </Carousel>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {trainingTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  current === i ? "w-6 bg-[#1B3A5C]" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>

          {/* Link to all testimonials */}
          <div className="text-center mt-7">
            <Link
              to={getPath("successStories", language, country)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B3A5C] hover:text-[#2E7D32] underline underline-offset-4 decoration-1 transition-colors"
            >
              {isEN ? "View more testimonials" : "Weitere Erfahrungsberichte ansehen"}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
