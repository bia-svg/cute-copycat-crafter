/**
 * Shop page — Self-Hypnosis Audio Programs, Books & Digital Products
 * Deutsche Sachlichkeit style
 * Seminars are EXCLUDED — they are premium and live on the Ausbildung page
 */
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";
import { ShoppingCart, Clock, Star, Headphones, BookOpen, Download, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CDN } from "@/lib/cdn";



interface Product {
  id: string;
  titleDE: string;
  titleEN: string;
  descDE: string;
  descEN: string;
  price: string;
  priceCHF?: string;
  category: "audio" | "book" | "bundle";
  image: string;
  duration?: string;
  featured?: boolean;
  benefitsDE?: string[];
  benefitsEN?: string[];
}

const products: Product[] = [
  {
    id: "hypnose-audios-30",
    titleDE: "30+ Hypnose Audio-Aufnahmen für zu Hause",
    titleEN: "30+ Hypnosis Audio Recordings for Home Use",
    descDE: "Professionelle Hypnose-Aufnahmen von David J. Woods für Entspannung, Raucherentwöhnung, Abnehmen, Stressabbau und mehr. Sofort verfügbar als Download.",
    descEN: "Professional hypnosis recordings by David J. Woods for relaxation, smoking cessation, weight loss, stress relief and more. Instantly available as download.",
    price: "\u20ac 197",
    priceCHF: "CHF 220",
    category: "bundle",
    image: CDN.heroSession,
    featured: true,
    benefitsDE: [
      "30+ professionelle Aufnahmen",
      "Raucherentwöhnung, Abnehmen, Stress, Ängste",
      "Von David J. Woods persönlich gesprochen",
      "Sofortiger Download nach Kauf",
      "Lebenslanger Zugang",
    ],
    benefitsEN: [
      "30+ professional recordings",
      "Smoking, weight loss, stress, anxiety",
      "Personally recorded by David J. Woods",
      "Instant download after purchase",
      "Lifetime access",
    ],
  },
  {
    id: "audio-raucherentwoehnung",
    titleDE: "Hypnose Audio: Raucherentwöhnung",
    titleEN: "Hypnosis Audio: Stop Smoking",
    descDE: "Gezielte Hypnose-Aufnahme für die Raucherentwöhnung. Unterstützt den Prozess des Aufhörens auf der Ebene des Unterbewusstseins.",
    descEN: "Targeted hypnosis recording for smoking cessation. Supports the quitting process at the subconscious level.",
    price: "\u20ac 9,90",
    priceCHF: "CHF 12,90",
    category: "audio",
    image: CDN.stopSmoking,
    duration: "ca. 35 Min.",
  },
  {
    id: "audio-abnehmen",
    titleDE: "Hypnose Audio: Abnehmen & Gewichtsreduktion",
    titleEN: "Hypnosis Audio: Weight Loss",
    descDE: "Professionelle Hypnose-Aufnahme für nachhaltiges Abnehmen. Verändern Sie Ihr Essverhalten auf der Ebene des Unterbewusstseins.",
    descEN: "Professional hypnosis recording for sustainable weight loss. Change your eating behavior at the subconscious level.",
    price: "\u20ac 9,90",
    priceCHF: "CHF 12,90",
    category: "audio",
    image: CDN.weightLoss,
    duration: "ca. 30 Min.",
  },
  {
    id: "audio-entspannung",
    titleDE: "Hypnose Audio: Tiefenentspannung & Stressabbau",
    titleEN: "Hypnosis Audio: Deep Relaxation & Stress Relief",
    descDE: "Finden Sie tiefe Entspannung und bauen Sie Stress nachhaltig ab. Ideal für den täglichen Gebrauch.",
    descEN: "Find deep relaxation and sustainably reduce stress. Ideal for daily use.",
    price: "\u20ac 9,90",
    priceCHF: "CHF 12,90",
    category: "audio",
    image: CDN.stressBurnout,
    duration: "ca. 25 Min.",
  },
  {
    id: "audio-aengste",
    titleDE: "Hypnose Audio: Ängste & Phobien überwinden",
    titleEN: "Hypnosis Audio: Overcome Fears & Phobias",
    descDE: "Gezielte Hypnose-Aufnahme zum Abbau von Ängsten und Phobien. Stärken Sie Ihr Selbstvertrauen.",
    descEN: "Targeted hypnosis recording for reducing fears and phobias. Strengthen your self-confidence.",
    price: "\u20ac 9,90",
    priceCHF: "CHF 12,90",
    category: "audio",
    image: CDN.anxietyRelief,
    duration: "ca. 30 Min.",
  },
  {
    id: "audio-selbstvertrauen",
    titleDE: "Hypnose Audio: Selbstvertrauen stärken",
    titleEN: "Hypnosis Audio: Build Self-Confidence",
    descDE: "Stärken Sie Ihr Selbstvertrauen und Selbstwertgefühl mit dieser professionellen Hypnose-Aufnahme.",
    descEN: "Strengthen your self-confidence and self-esteem with this professional hypnosis recording.",
    price: "\u20ac 9,90",
    priceCHF: "CHF 12,90",
    category: "audio",
    image: CDN.depressionTrauma,
    duration: "ca. 28 Min.",
  },
  {
    id: "audio-schlaf",
    titleDE: "Hypnose Audio: Besser Schlafen",
    titleEN: "Hypnosis Audio: Better Sleep",
    descDE: "Finden Sie zurück zu erholsamem Schlaf. Diese Aufnahme hilft Ihnen, schneller einzuschlafen und tiefer zu schlafen.",
    descEN: "Find your way back to restful sleep. This recording helps you fall asleep faster and sleep more deeply.",
    price: "\u20ac 9,90",
    priceCHF: "CHF 12,90",
    category: "audio",
    image: CDN.heroSession,
    duration: "ca. 32 Min.",
  },
  {
    id: "buch-go-inside",
    titleDE: "Buch: 'Go InSide' \u2014 David J. Woods",
    titleEN: "Book: 'Go InSide' \u2014 David J. Woods",
    descDE: "Das Buch von David J. Woods über die Kraft der Aktiv-Hypnose\u00a9 und den Weg zu nachhaltiger Veränderung. Erhältlich als Taschenbuch und E-Book.",
    descEN: "David J. Woods' book about the power of Aktiv-Hypnose\u00a9 and the path to lasting change. Available as paperback and e-book.",
    price: "\u20ac 24,90",
    priceCHF: "CHF 29,90",
    category: "book",
    image: CDN.aboutAktivHypnose,
    featured: true,
    benefitsDE: [
      "Einblicke in die Aktiv-Hypnose\u00a9 Methode",
      "Praxisnahe Fallbeispiele",
      "Selbsthypnose-Techniken für zu Hause",
      "Als Taschenbuch und E-Book erhältlich",
    ],
    benefitsEN: [
      "Insights into the Aktiv-Hypnose\u00a9 method",
      "Practical case studies",
      "Self-hypnosis techniques for home use",
      "Available as paperback and e-book",
    ],
  },
];

const categoryIcons = {
  audio: <Headphones className="w-4 h-4" />,
  book: <BookOpen className="w-4 h-4" />,
  bundle: <Download className="w-4 h-4" />,
};

const categoryLabelsDE = { audio: "Audio-Programm", book: "Buch", bundle: "Audio-Paket" };
const categoryLabelsEN = { audio: "Audio Program", book: "Book", bundle: "Audio Bundle" };

export default function Shop() {
  const { language, country, t, isInternational, showCH, showDE } = useLanguage();
  const isDE = language !== "en";
  const isSwiss = country === "ch";
  const catLabels = isDE ? categoryLabelsDE : categoryLabelsEN;

  const featured = products.filter(p => p.featured);
  const audios = products.filter(p => p.category === "audio");

  return (
    <>

      {/* Hero */}
      <section className="bg-[#55504f] text-white py-14">
        <div className="container-main">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-2">
            {isDE ? "Online Shop für Selbsthypnose" : "Online Shop for Self-Hypnosis"}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {isDE ? "Hypnose-Audios & Bücher" : "Hypnosis Audios & Books"}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {isDE
              ? "Professionelle Selbsthypnose-Programme von David J. Woods \u2014 für nachhaltige Veränderung bequem von zu Hause. Sofort als Download verfügbar."
              : "Professional self-hypnosis programs by David J. Woods \u2014 for lasting change from the comfort of your home. Instantly available as download."}
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 bg-white">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-8">
            {isDE ? "Empfohlene Angebote" : "Featured Offers"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featured.map((product) => (
              <div key={product.id} className="border-2 border-[#2E7D32] bg-white overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img src={product.image} alt={isDE ? product.titleDE : product.titleEN} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    {categoryIcons[product.category]}
                    <span>{catLabels[product.category]}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1B3A5C] mb-2">{isDE ? product.titleDE : product.titleEN}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{isDE ? product.descDE : product.descEN}</p>
                  {product.benefitsDE && (
                    <ul className="space-y-1.5 mb-5">
                      {(isDE ? product.benefitsDE : product.benefitsEN)?.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-2xl font-bold text-[#1B3A5C]">{isInternational && product.priceCHF ? `${product.price} / ${product.priceCHF}` : isSwiss && product.priceCHF ? product.priceCHF : product.price}</span>
                    <Link to={getPath("contact", language, country)}>
                      <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold">
                        {isDE ? "Jetzt bestellen" : "Order Now"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Individual Audio Programs */}
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-2">
            {isDE ? "Einzelne Hypnose-Audios" : "Individual Hypnosis Audios"}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            {isDE
              ? "Jedes Audio-Programm ist von David J. Woods persönlich gesprochen und auf ein spezifisches Thema ausgerichtet."
              : "Each audio program is personally recorded by David J. Woods and focused on a specific topic."}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {audios.map((product) => (
              <div key={product.id} className="border border-border bg-white hover:shadow-md transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img src={product.image} alt={isDE ? product.titleDE : product.titleEN} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Headphones className="w-3.5 h-3.5" />
                    <span>{catLabels.audio}</span>
                    {product.duration && <><span>\u00b7</span><Clock className="w-3 h-3" /><span>{product.duration}</span></>}
                  </div>
                  <h3 className="text-base font-bold text-[#1B3A5C] mb-2">{isDE ? product.titleDE : product.titleEN}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{isDE ? product.descDE : product.descEN}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-lg font-bold text-[#1B3A5C]">{isInternational && product.priceCHF ? `${product.price} / ${product.priceCHF}` : isSwiss && product.priceCHF ? product.priceCHF : product.price}</span>
                    <Link to={getPath("contact", language, country)}>
                      <Button variant="outline" size="sm" className="text-[#2E7D32] border-[#2E7D32] hover:bg-[#2E7D32] hover:text-white">
                        {isDE ? "Bestellen" : "Order"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upsell to Training */}
      <section className="py-10 bg-[#f4f3ef] border-t border-border">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-2">
                {isDE ? "Professionelle Ausbildung gesucht?" : "Looking for Professional Training?"}
              </h2>
              <p className="text-muted-foreground">
                {isDE
                  ? "Werden Sie zertifizierter Hypnosetherapeut mit dem 6-Tage Intensiv-Seminar von David J. Woods. Aktiv-Hypnose© Therapeuten-Diplom inklusive."
                  : "Become a certified hypnotherapist with the 6-day intensive seminar by David J. Woods. Aktiv-Hypnose© Therapist Diploma included."}
              </p>
            </div>
            <Link to={getPath("training", language, country)}>
              <Button className="bg-[#1B3A5C] hover:bg-[#0F2A4A] text-white font-semibold px-8 whitespace-nowrap">
                {isDE ? "Zur Ausbildung" : "View Training"} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#8b827c] text-white py-10">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isDE ? "Fragen zu unseren Produkten?" : "Questions About Our Products?"}
          </h2>
          <p className="text-white/80 mb-4 max-w-xl mx-auto">
            {isDE
              ? "Wir beraten Sie gerne persönlich. Kontaktieren Sie uns für individuelle Empfehlungen."
              : "We are happy to advise you personally. Contact us for individual recommendations."}
          </p>
          <div className="flex items-center justify-center gap-2 mb-5">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            <span className="text-white/90 text-sm ml-2">5.0 — 264 Google {isDE ? "Bewertungen" : "Reviews"}</span>
          </div>
          <Link to={getPath("contact", language, country)}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3 text-base">
              {isDE ? "Kontakt aufnehmen" : "Get in Touch"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
