/*
 * Erfolgsberichte (Success Stories) — Video Testimonials
 * Replicates and improves on original david-j-woods.com/erfolgsberichte/
 */

import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Star, Play, Quote, ArrowRight, CheckCircle, MessageSquare
} from "lucide-react";

const GOOGLE_REVIEWS_URL = "#";

export default function Erfolgsberichte() {
  const { language, country, t, showCH } = useLanguage();
  const isEN = language === "en";

  const videoTestimonials = [
    {
      name: "Sibylle Wenger",
      topicDE: "Raucherentwöhnung",
      topicEN: "Smoking Cessation",
      quoteDE: "Nach nur einer Sitzung war ich rauchfrei. David hat mir geholfen, eine 20-jährige Gewohnheit endlich loszulassen.",
      quoteEN: "After just one session I was smoke-free. David helped me finally let go of a 20-year habit.",
    },
    {
      name: "Helmut Sokopp",
      topicDE: "Stressbewältigung",
      topicEN: "Stress Management",
      quoteDE: "Die Aktiv-Hypnose© hat mir geholfen, meinen Burnout zu überwinden und neue Kraft zu finden.",
      quoteEN: "Aktiv-Hypnose© helped me overcome my burnout and find new strength.",
    },
    {
      name: "Marcus Schönberger",
      topicDE: "Gewichtsreduktion",
      topicEN: "Weight Loss",
      quoteDE: "Durch die Hypnose hat sich mein Essverhalten grundlegend verändert. 15 kg weniger und ich fühle mich großartig.",
      quoteEN: "Through hypnosis my eating behavior fundamentally changed. 15 kg less and I feel great.",
    },
    {
      name: "Michael Cappello",
      topicDE: "Angstbewältigung",
      topicEN: "Anxiety Relief",
      quoteDE: "Meine Flugangst ist komplett verschwunden. Ich kann jetzt wieder ohne Probleme fliegen.",
      quoteEN: "My fear of flying has completely disappeared. I can now fly again without any problems.",
    },
    {
      name: "Sina Wegener",
      topicDE: "Persönliche Entwicklung",
      topicEN: "Personal Development",
      quoteDE: "Die Sitzungen haben mir geholfen, mein Selbstbewusstsein aufzubauen und beruflich durchzustarten.",
      quoteEN: "The sessions helped me build my self-confidence and take off professionally.",
    },
    {
      name: "Nora Lobjanidze",
      topicDE: "Trauma-Therapie",
      topicEN: "Trauma Therapy",
      quoteDE: "David hat mir geholfen, alte Traumata zu verarbeiten. Ich fühle mich endlich frei und leicht.",
      quoteEN: "David helped me process old traumas. I finally feel free and light.",
    },
    {
      name: "Benedikt Hessler",
      topicDE: "Leistungssteigerung",
      topicEN: "Performance Enhancement",
      quoteDE: "Als Sportler hat mir die Hypnose geholfen, mentale Blockaden zu lösen und Bestleistungen abzurufen.",
      quoteEN: "As an athlete, hypnosis helped me overcome mental blocks and achieve peak performance.",
    },
  ];

  return (
    <>

      {/* Hero */}
      <section className="bg-[#f4f3ef] py-12 md:py-16">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32] mb-3">
              {isEN ? "Real Results, Real People" : "Echte Ergebnisse, echte Menschen"}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B3A5C] mb-4" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Success Stories" : "Erfolgsberichte"}
            </h1>
            <p className="text-lg text-[#55504f] leading-relaxed mb-6">
              {isEN
                ? "Discover how our hypnotherapy sessions and success coaching have sustainably changed the lives of our clients and helped them achieve new successes."
                : "Erfahren Sie, wie unsere Hypnosesitzungen und Erfolgscoachings das Leben unserer Klienten nachhaltig verändert und ihnen zu neuen Erfolgen verholfen haben."}
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-[#55504f]">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="font-semibold">5.0 / 5</span>
              <span>— 255 Google {isEN ? "Reviews" : "Bewertungen"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Grid */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {videoTestimonials.map((testimonial, i) => (
              <div key={i} className="border border-border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                {/* Video placeholder */}
                <div className="relative bg-gradient-to-br from-[#1B3A5C] to-[#2a5a8c] aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                    <p className="text-sm font-medium opacity-80">{isEN ? "Video Testimonial" : "Video-Erfahrungsbericht"}</p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-0.5 mb-2">
                    {[1,2,3,4,5].map(j => <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <Quote className="w-5 h-5 text-[#2E7D32]/30 mb-1" />
                  <p className="text-sm text-[#55504f] italic leading-relaxed mb-3">
                    {isEN ? testimonial.quoteEN : testimonial.quoteDE}
                  </p>
                  <div className="border-t border-border pt-3">
                    <p className="text-sm font-semibold text-[#1B3A5C]">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{isEN ? testimonial.topicEN : testimonial.topicDE}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#f4f3ef] py-10">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            {[
              { num: "30.000+", labelDE: "Sitzungen", labelEN: "Sessions" },
              { num: "40+", labelDE: "Jahre Erfahrung", labelEN: "Years Experience" },
              { num: "30+", labelDE: "Länder", labelEN: "Countries" },
              { num: "5.0/5", labelDE: "Google Bewertung", labelEN: "Google Rating" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-[#2E7D32]">{stat.num}</p>
                <p className="text-xs text-muted-foreground mt-1">{isEN ? stat.labelEN : stat.labelDE}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews CTA */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Read All Google Reviews" : "Alle Google-Bewertungen lesen"}
          </h2>
          <p className="text-[#55504f] max-w-xl mx-auto mb-6">
            {isEN
              ? "See what our clients say about their experience with David J. Woods on Google."
              : "Lesen Sie, was unsere Klienten über ihre Erfahrung mit David J. Woods bei Google sagen."}
          </p>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-6 py-3">
              {isEN ? "View Google Reviews" : "Google-Bewertungen ansehen"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1B3A5C] text-white py-12 md:py-16">
        <div className="container-main text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Write Your Own Success Story" : "Schreiben Sie Ihre eigene Erfolgsgeschichte"}
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-6">
            {isEN
              ? "Book your free discovery call and take the first step towards positive change."
              : "Vereinbaren Sie Ihr kostenloses Erstgespräch und machen Sie den ersten Schritt zu positiver Veränderung."}
          </p>
          <Link to={getPath("contact", language, country)}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3">
              <MessageSquare className="w-4 h-4 mr-2" />
              {isEN ? "Free Discovery Call" : "Kostenloses Erstgespräch"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
