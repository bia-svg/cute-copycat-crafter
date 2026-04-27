import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  {
    name: "Sina Wegener",
    vimeoId: "420060536",
    topicDE: "Opernsängerin & Gesangslehrerin",
    topicEN: "Opera Singer & Voice Teacher",
  },
  {
    name: "Nora Lobjanidze",
    vimeoId: "423800554",
    topicDE: "Fitness-Model, Moderatorin & Coach",
    topicEN: "Fitness Model, Presenter & Coach",
  },
  {
    name: "Benedikt Hessler",
    vimeoId: "420047365",
    topicDE: "Unternehmer & Energie-Branche",
    topicEN: "Entrepreneur & Energy Sector",
  },
];

export default function TrainingTestimonialsCarousel() {
  const { language } = useLanguage();
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
    <section className="bg-secondary/40 py-5 md:py-9">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center mb-3 md:mb-6">
          <h2 className="text-lg md:text-3xl font-bold text-[#1B3A5C] mb-1.5 md:mb-3" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "What Our Seminar Participants Say" : "Das sagen unsere Seminarteilnehmer"}
          </h2>
          <p className="text-[12px] md:text-base text-muted-foreground leading-snug">
            {isEN
              ? "Real video testimonials from participants of the Aktiv-Hypnose® Training"
              : "Echte Video-Erfahrungsberichte von Teilnehmern der Aktiv-Hypnose® Ausbildung"}
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <Carousel setApi={setApi} opts={{ loop: true, align: "start", startIndex: 0 }} className="relative">
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
                    <div className="p-3 md:p-5">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="text-sm md:text-lg font-bold text-foreground">{t.name}</h3>
                        <span className="text-[10px] md:text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
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

            {/* Desktop arrows: large, prominent, outside the card */}
            <CarouselPrevious
              aria-label={isEN ? "Previous testimonial" : "Vorheriges Video"}
              className="hidden md:flex h-12 w-12 -left-6 lg:-left-16 bg-white shadow-lg border-[#1B3A5C]/20 text-[#1B3A5C] hover:bg-[#1B3A5C] hover:text-white hover:border-[#1B3A5C] transition-colors"
            >
              <ChevronLeft className="!h-6 !w-6" />
            </CarouselPrevious>
            <CarouselNext
              aria-label={isEN ? "Next testimonial" : "Nächstes Video"}
              className="hidden md:flex h-12 w-12 -right-6 lg:-right-16 bg-white shadow-lg border-[#1B3A5C]/20 text-[#1B3A5C] hover:bg-[#1B3A5C] hover:text-white hover:border-[#1B3A5C] transition-colors"
            >
              <ChevronRight className="!h-6 !w-6" />
            </CarouselNext>

            {/* Mobile arrows: visible, overlayed on the video edges */}
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label={isEN ? "Previous testimonial" : "Vorheriges Video"}
              className="md:hidden absolute left-2 top-[28%] -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/95 shadow-lg border border-[#1B3A5C]/20 text-[#1B3A5C] flex items-center justify-center active:scale-95 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label={isEN ? "Next testimonial" : "Nächstes Video"}
              className="md:hidden absolute right-2 top-[28%] -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/95 shadow-lg border border-[#1B3A5C]/20 text-[#1B3A5C] flex items-center justify-center active:scale-95 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </Carousel>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
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

          {/* Counter for clear progress indication */}
          <div className="text-center mt-3 text-xs text-muted-foreground tabular-nums">
            {current + 1} / {trainingTestimonials.length}
          </div>
        </div>
      </div>
    </section>
  );
}
