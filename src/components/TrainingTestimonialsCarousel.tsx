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
    <section className="border-b border-border" style={{ background: "linear-gradient(180deg, #ECEAE3 0%, #F1EFE8 55%, #ECEAE3 100%)" }}>
      <div className="container-main py-5 md:py-7 lg:py-8">
        <div className="group/sec relative max-w-3xl mx-auto bg-gradient-to-b from-white to-[#FBFCFD] border border-[#1B3A5C]/25 rounded-2xl md:rounded-3xl px-4 py-5 md:px-7 md:py-7 shadow-[0_1px_2px_rgba(27,58,92,0.06),0_8px_22px_rgba(27,58,92,0.10),0_36px_80px_-26px_rgba(27,58,92,0.45)] ring-1 ring-white/90 hover:shadow-[0_2px_5px_rgba(27,58,92,0.08),0_12px_28px_rgba(27,58,92,0.12),0_44px_96px_-26px_rgba(27,58,92,0.50)] hover:-translate-y-[2px] transition-[transform,box-shadow] duration-300 ease-out before:content-[''] before:absolute before:top-0 before:left-8 before:right-8 before:h-[2px] before:rounded-b-full before:bg-gradient-to-r before:from-transparent before:via-[#1B3A5C]/35 before:to-transparent">
        <div className="max-w-2xl mx-auto text-center mb-2.5 md:mb-4">
          <h2 className="text-base md:text-xl font-light text-[#1B3A5C] mb-1 text-center tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "What Our Seminar Participants Say" : "Das sagen unsere Seminarteilnehmer"}
          </h2>
          <p className="text-[11px] md:text-[13px] text-muted-foreground text-center max-w-xl mx-auto leading-snug">
            {isEN
              ? "Real video testimonials from participants of the Aktiv-Hypnose® Training"
              : "Echte Video-Erfahrungsberichte von Teilnehmern der Aktiv-Hypnose® Ausbildung"}
          </p>
        </div>

        <div className="max-w-xl mx-auto relative">
          <Carousel setApi={setApi} opts={{ loop: true, align: "start", startIndex: 0 }} className="relative">
            <CarouselContent>
              {trainingTestimonials.map((t, i) => (
                <CarouselItem key={i}>
                  <div className="bg-card border border-[#1B3A5C]/15 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(27,58,92,0.05),0_10px_30px_-12px_rgba(27,58,92,0.28)] ring-1 ring-white/70">
                    <div className="aspect-video bg-black relative">
                      <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 z-10" />
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
                    <div className="p-3 md:p-5 bg-gradient-to-b from-white to-[#FAFBFC]">
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
              className="hidden md:flex h-12 w-12 -left-6 lg:-left-16 bg-gradient-to-b from-white to-[#F4F6F8] shadow-[0_1px_1px_rgba(255,255,255,0.85)_inset,0_2px_6px_rgba(27,58,92,0.10),0_10px_28px_-10px_rgba(27,58,92,0.30)] border border-[#1B3A5C]/22 text-[#1B3A5C] hover:bg-[#1B3A5C] hover:from-[#1B3A5C] hover:to-[#16314D] hover:text-white hover:border-[#1B3A5C] hover:shadow-[0_4px_14px_rgba(27,58,92,0.35)] hover:-translate-y-[1px] transition-all duration-300"
            >
              <ChevronLeft className="!h-6 !w-6" />
            </CarouselPrevious>
            <CarouselNext
              aria-label={isEN ? "Next testimonial" : "Nächstes Video"}
              className="hidden md:flex h-12 w-12 -right-6 lg:-right-16 bg-gradient-to-b from-white to-[#F4F6F8] shadow-[0_1px_1px_rgba(255,255,255,0.85)_inset,0_2px_6px_rgba(27,58,92,0.10),0_10px_28px_-10px_rgba(27,58,92,0.30)] border border-[#1B3A5C]/22 text-[#1B3A5C] hover:bg-[#1B3A5C] hover:from-[#1B3A5C] hover:to-[#16314D] hover:text-white hover:border-[#1B3A5C] hover:shadow-[0_4px_14px_rgba(27,58,92,0.35)] hover:-translate-y-[1px] transition-all duration-300"
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
          <div className="flex justify-center items-center gap-2 mt-3 md:mt-5">
            {trainingTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i
                    ? "w-7 bg-gradient-to-r from-[#1B3A5C] to-[#2A4F7A] shadow-[0_1px_3px_rgba(27,58,92,0.35),0_0_8px_rgba(27,58,92,0.20)]"
                    : "w-2 bg-[#1B3A5C]/25 hover:bg-[#1B3A5C]/45"
                }`}
              />
            ))}
          </div>


          {/* Counter for clear progress indication */}
          <div className="text-center mt-2 text-[11px] md:text-xs text-muted-foreground tabular-nums">
            {current + 1} / {trainingTestimonials.length}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
