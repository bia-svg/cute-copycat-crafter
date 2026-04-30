/*
 * Teilnehmerstimmen — Stimmen unserer Seminarteilnehmer / Ausbildungsteilnehmer
 * Eigene Seite, fokussiert ausschliesslich auf Ausbildungs-/Seminarfeedback.
 */

import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPath } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, MessageSquare } from "lucide-react";

const trainingTestimonials = [
  {
    name: "Sibylle Wenger",
    vimeoId: "414796794",
    topicDE: "Balance Coach & Familientherapeutin",
    topicEN: "Balance Coach & Family Therapist",
    quoteDE: "Mein Name ist Sibylle Wenger; ich bin Balance Coach und systemischer Familientherapeut. David J. Woods habe ich vor ungefähr acht Jahren über Freunde kennengelernt. Damals habe ich ihm erzählt, dass ich in die Coaching-Schiene gehen will. Er erklärte mir daraufhin, dass die Hypnose etwas ganz Tolles für mich wäre und lud mich ein, seine erste Probandin zu sein.",
    quoteEN: "My name is Sibylle Wenger; I'm a balance coach and systemic family therapist. I met David J. Woods about eight years ago through friends. Back then I told him I wanted to go into coaching. He explained that hypnosis would be something great for me and invited me to be his first test subject.",
  },
  {
    name: "Helmut Sokopp",
    vimeoId: "420049552",
    topicDE: "Hypnose-Praxis München & Los Angeles",
    topicEN: "Hypnosis Practice Munich & Los Angeles",
    quoteDE: "Mein Name ist Helmut Sokopp; ich bin 45 Jahre alt und habe meine Hypnose-Praxis in München. Schon vor über 15 Jahren habe ich meine Hypnose Ausbildung bei David J. Woods gemacht. Ich pendle immer hin und her zwischen Los Angeles und München und arbeite in beiden Ländern im Bereich Coaching.",
    quoteEN: "My name is Helmut Sokopp; I'm 45 years old and have my hypnosis practice in Munich. I did my hypnosis training with David J. Woods over 15 years ago. I commute between Los Angeles and Munich and work in coaching in both countries.",
  },
  {
    name: "Marcus Schönberger",
    vimeoId: "420054338",
    topicDE: "Spezialist für Vermögenssicherung",
    topicEN: "Asset Protection Specialist",
    quoteDE: "Mein Name ist Marcus Schönberger; ich bin Spezialist für Vermögenssicherung. Ich habe David J. Woods auf einem Vertriebsseminar kennenlernen dürfen. Damals war ich schon in Trennung beziehungsweise schon in der Scheidung und dann war es für mich sehr akut, sodass David mit mir eine Blitzhypnose gemacht hat.",
    quoteEN: "My name is Marcus Schönberger; I'm a specialist in asset protection. I met David J. Woods at a sales seminar. At the time I was already separating — going through a divorce — and it was very acute for me, so David did a flash hypnosis session with me.",
  },
  {
    name: "Michael Cappello",
    vimeoId: "420057448",
    topicDE: "Geschäftsführer & Business Coach",
    topicEN: "CEO & Business Coach",
    quoteDE: "Mein Name ist Michael Cappello; ich bin seit über 20 Jahren Geschäftsführer in unterschiedlichen Unternehmen und richte diese strategisch neu aus. Dazu habe ich mich bereits im Bereich Business Coaching und Werte-und-Sinn Coaching engagiert, wobei ich Menschen auf ihrem Weg zum persönlichen Erfolg begleite.",
    quoteEN: "My name is Michael Cappello; I've been a managing director in various companies for over 20 years, strategically realigning them. I've also been involved in business coaching and values-and-purpose coaching, guiding people on their path to personal success.",
  },
  {
    name: "Sina Wegener",
    vimeoId: "420060536",
    topicDE: "Opernsängerin & Gesangslehrerin",
    topicEN: "Opera Singer & Voice Teacher",
    quoteDE: "Mein Name ist Sina Wegener; ich bin studierte Opernsängerin und Gesangslehrerin aus Karlsruhe. Auf die Hypnose bin ich schon vor ungefähr einem Jahr gestoßen. Damals habe ich auf YouTube Videos über Hypnose gefunden, aufgrund meiner persönlichen Geschichte, da ich einfach schon seit vier bis fünf Jahren dabei bin, mich persönlich weiterzuentwickeln.",
    quoteEN: "My name is Sina Wegener; I'm a trained opera singer and voice teacher from Karlsruhe. I discovered hypnosis about a year ago when I found videos about it on YouTube, driven by my personal journey of self-development over the past four to five years.",
  },
  {
    name: "Nora Lobjanidze",
    vimeoId: "423800554",
    topicDE: "Fitness-Model, Moderatorin & Coach",
    topicEN: "Fitness Model, Presenter & Coach",
    quoteDE: "Mein Name ist Nora Lobjanidze; ich bin Fitness-Model, Moderatorin und Coach. Ich habe vor ungefähr drei bis vier Jahren die Hypnose Ausbildung bei David J. Woods gemacht und ich war einfach begeistert. Unabhängig davon, dass ich es für meine Kunden im Coaching einsetzen konnte, habe ich das gelernte Wissen auch für mich selbst genutzt.",
    quoteEN: "My name is Nora Lobjanidze; I'm a fitness model, presenter and coach. I did my hypnosis training with David J. Woods about three to four years ago and I was simply amazed. Beyond using it for my coaching clients, I also applied the knowledge I learned to myself.",
  },
  {
    name: "Benedikt Hessler",
    vimeoId: "420047365",
    topicDE: "Unternehmer & Energie-Branche",
    topicEN: "Entrepreneur & Energy Sector",
    quoteDE: "Mein Name ist Benedikt Hessler; ich bin beruflich selbstständig und erfülle den Menschen ihre Wohnwünsche. Zudem bin ich auch noch in der Energie-Branche tätig. Ich bin Kunde bei David J. Woods seit mittlerweile eineinhalb Jahren. Hier habe ich immer wieder Hypnose Sitzungen, die mich dabei unterstützen, voller Selbstvertrauen und Motivation zu sein.",
    quoteEN: "My name is Benedikt Hessler; I'm self-employed, helping people fulfill their housing dreams, and I also work in the energy sector. I've been a client of David J. Woods for about a year and a half now, having regular hypnosis sessions that support me in being full of confidence and motivation.",
  },
];

export default function Teilnehmerstimmen() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  return (
    <>
      <SEO
        titleDE="Teilnehmerstimmen – Aktiv-Hypnose® Ausbildung"
        titleEN="Participant Voices – Aktiv-Hypnose® Training"
        descriptionDE="Echte Video-Erfahrungsberichte unserer Seminar- und Ausbildungsteilnehmer der Aktiv-Hypnose® Ausbildung mit David J. Woods."
        descriptionEN="Authentic video testimonials from participants of the Aktiv-Hypnose® training and seminars with David J. Woods."
        breadcrumbs={[
          { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
          { name: isEN ? "Participant Voices" : "Teilnehmerstimmen", path: `/${language}/${country}/teilnehmerstimmen` },
        ]}
      />
      <Breadcrumbs items={[
        { name: isEN ? "Home" : "Startseite", path: getPath("home", language, country) },
        { name: isEN ? "Participant Voices" : "Teilnehmerstimmen", path: `/${language}/${country}/teilnehmerstimmen` },
      ]} />

      {/* Compact Intro */}
      <section className="bg-background pt-6 pb-4 md:pt-8 md:pb-5 border-b border-border/60">
        <div className="container-main max-w-3xl text-center">
          <h1 className="text-2xl md:text-3xl font-light text-foreground tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Voices of Our Seminar Participants" : "Stimmen unserer Seminarteilnehmer"}
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            {isEN
              ? "Authentic video testimonials from participants of the Aktiv-Hypnose® training."
              : "Echte Video-Erfahrungsberichte von Teilnehmern der Aktiv-Hypnose® Ausbildung."}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-semibold text-foreground">5.0</span>
            <span>— 266 Google {isEN ? "Reviews" : "Bewertungen"}</span>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="bg-background py-12 md:py-16">
        <div className="container-main">
          <div className="space-y-12 max-w-4xl mx-auto">
            {trainingTestimonials.map((t, i) => (
              <div key={i} className="border border-border rounded-lg overflow-hidden bg-card">
                <div className="aspect-video">
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
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <h3 className="text-lg font-light text-foreground tracking-tight">{t.name}</h3>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                      {isEN ? t.topicEN : t.topicDE}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &bdquo;{isEN ? t.quoteEN : t.quoteDE}&ldquo;
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
              {isEN ? "Become Part of the Next Training" : "Werden Sie Teil der nächsten Ausbildung"}
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
