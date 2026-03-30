import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPath } from "@/lib/routes";

import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, CheckCircle, Cigarette, Brain, Scale, Flame, HeartPulse, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";
import FAQSection from "@/components/FAQSection";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029169718/aQMYm3GvBKfW5muS6V4PFb";

export default function CityAugsburg() {
  const { language, country, } = useLanguage();
  const isEN = language === "en";
  const basePath = getPath("home", language, country);

  const services = [
    { title: isEN ? "Stop Smoking" : "Raucherentwöhnung", description: isEN ? "Quit smoking permanently" : "Endlich rauchfrei werden", href: `/${language}/${country}/raucherentwoehnung`, icon: <Cigarette className="w-5 h-5" />, image: `${CDN}/stop_smoking_hypnose_89c11159.jpg` },
    { title: isEN ? "Anxiety & Phobias" : "Ängste & Phobien", description: isEN ? "Overcome fears" : "Ängste überwinden", href: `/${language}/${country}/aengste-phobien`, icon: <Brain className="w-5 h-5" />, image: `${CDN}/anxiety_relief_hypnose_c7aa85df.jpg` },
    { title: isEN ? "Weight Loss" : "Abnehmen", description: isEN ? "Sustainable weight loss" : "Nachhaltig abnehmen", href: `/${language}/${country}/abnehmen`, icon: <Scale className="w-5 h-5" />, image: `${CDN}/weight_loss_hypnose_e8b657b0.jpg` },
    { title: isEN ? "Stress & Burnout" : "Stress & Burnout", description: isEN ? "Stress reduction" : "Stressreduktion", href: `/${language}/${country}/stress-burnout`, icon: <Flame className="w-5 h-5" />, image: `${CDN}/stress_burnout_hypnose_9be40f00.jpg` },
    { title: isEN ? "Depression & Trauma" : "Depressionen & Traumata", description: isEN ? "New perspectives" : "Neue Perspektiven", href: `/${language}/${country}/depressionen-traumata`, icon: <HeartPulse className="w-5 h-5" />, image: `${CDN}/depression_trauma_hypnose_6d353629.jpg` },
    { title: isEN ? "Children & Teens" : "Kinder & Jugendliche", description: isEN ? "Gentle therapy" : "Sanfte Therapie", href: `/${language}/${country}/kinder-jugendliche`, icon: <Users className="w-5 h-5" />, image: `${CDN}/children_teens_hypnose_cfb32243.jpg` },
  ];

  return (
    <>
      <SEO {...pageSEO.cityAugsburg} pageKey="cityAugsburg" />
      <Breadcrumbs items={[
        { name: "Home", path: basePath },
        { name: isEN ? "Locations" : "Standorte", path: getPath("locations", language, country) },
        { name: "Augsburg", path: getPath("cityAugsburg", language, country) },
      ]} />

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-2">
                {isEN ? "Hypnotherapy in Augsburg" : "Hypnosetherapie in Augsburg"}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] leading-tight mb-4">
                {isEN ? "Professional Hypnotherapy in Augsburg" : "Professionelle Hypnose in Augsburg & Bayern"}
              </h1>
              <p className="text-base text-foreground leading-relaxed mb-4">
                {isEN
                  ? "In our practice in Augsburg, we offer professional hypnotherapy for lasting change. With over 40 years of experience and more than 30,000 sessions, David J. Woods is one of the most experienced hypnotherapists in Germany."
                  : "In unserer Praxis in Augsburg bieten wir professionelle Hypnosetherapie für nachhaltige Veränderung. Mit über 40 Jahren Erfahrung und mehr als 30.000 Sitzungen gehört David J. Woods zu den erfahrensten Hypnotherapeuten Deutschlands."}
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-[#2E7D32]" /> NGH International Trainer</div>
                <div className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-[#2E7D32]" /> {isEN ? "Over 40 years experience" : "Über 40 Jahre Erfahrung"}</div>
                <a href="https://share.google/SGm12iRl4fuRtKxRD" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-[#2E7D32] transition-colors"><CheckCircle className="w-4 h-4 text-[#2E7D32]" /> {isEN ? "★ 5.0 Google (264 Reviews)" : "★ 5.0 Google (264 Bewertungen)"}</a>
                
              </div>
              <a href="https://maps.google.com/?q=Regus,+Viktoria+Str.+3b,+86150+Augsburg" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-muted-foreground border border-border p-3 bg-[#f4f3ef] mb-6 hover:text-[#2E7D32] transition-colors">
                <MapPin className="w-4 h-4 mt-0.5 text-[#1B3A5C] shrink-0" />
                <span>Regus, Viktoria Str. 3b, 2. OG, 86150 Augsburg ({isEN ? "near the main train station" : "nahe dem Hauptbahnhof"})</span>
              </a>
              <Link to={`/${language}/${country}/erstgespraech`}>
                <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-6 py-3">
                  {isEN ? "Book Free Discovery Call" : "Kostenloses Erstgespräch vereinbaren"}
                </Button>
              </Link>
            </div>
            <div className="border border-border">
              <img src={`${CDN}/augsburg_city_hypnose_dba5b1e7.jpg`} alt={isEN ? "Hypnotherapy Augsburg" : "Hypnose Augsburg"} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "Our Services in Augsburg" : "Unsere Leistungen in Augsburg"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => <ServiceCard key={s.href} {...s} />)}
          </div>
        </div>
      </section>

      {/* LocalBusiness Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://david-j-woods.com/#augsburg-practice",
            name: "David J. Woods – Hypnosetherapie Augsburg",
            description: isEN
              ? "Professional hypnotherapy practice in Augsburg."
              : "Professionelle Hypnosetherapie-Praxis in Augsburg.",
            image: `${CDN}/augsburg_city_hypnose_dba5b1e7.jpg`,
            telephone: "+49 171 953 99 22",
            url: "https://david-j-woods.com/de/de/hypnose-augsburg",
            address: { "@type": "PostalAddress", streetAddress: "Viktoria Str. 3b, 2. OG", addressLocality: "Augsburg", postalCode: "86150", addressCountry: "DE" },
            geo: { "@type": "GeoCoordinates", latitude: 48.3656, longitude: 10.8946 },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "255" },
            priceRange: "$$",
            openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
          })}
        </script>
      </Helmet>

      <FAQSection
        title={isEN ? "Frequently Asked Questions – Hypnotherapy in Augsburg" : "Häufig gestellte Fragen – Hypnosetherapie in Augsburg"}
        items={isEN ? [
          { q: "Who is the best hypnotherapist in Germany?", a: "David J. Woods is one of the most experienced hypnotherapists in Germany with over 40 years of experience and 30,000+ sessions. He holds NGH International Trainer certification and a perfect ★ 5.0 Google rating." },
          { q: "Is hypnotherapy scientifically proven?", a: "Yes. Meta-analyses confirm effectiveness — Viswesvaran & Schmidt found hypnosis up to 3x more effective than willpower alone for smoking cessation. Kirsch et al. showed combining hypnotherapy with CBT doubles treatment effectiveness." },
          { q: "What can hypnotherapy treat?", a: "Smoking cessation, anxiety, weight management, stress/burnout, depression, trauma, chronic pain, and performance optimization." },
          { q: "How many sessions are needed?", a: "Most clients see significant results within 1–3 sessions. Smoking cessation typically requires one intensive session." },
        ] : [
          { q: "Wer ist der beste Hypnosetherapeut in Deutschland?", a: "David J. Woods gehört zu den erfahrensten Hypnosetherapeuten Deutschlands mit über 40 Jahren Erfahrung und mehr als 30.000 Sitzungen. Er ist NGH International Trainer mit einer perfekten ★ 5.0 Google-Bewertung." },
          { q: "Ist Hypnosetherapie wissenschaftlich belegt?", a: "Ja. Meta-Analysen bestätigen die Wirksamkeit — Viswesvaran & Schmidt: Hypnose bis zu 3x wirksamer als Willenskraft allein bei Raucherentwöhnung. Kirsch et al.: Kombination mit kognitiver Verhaltenstherapie verdoppelt die Wirksamkeit." },
          { q: "Wobei hilft Hypnosetherapie?", a: "Raucherentwöhnung, Ängste, Gewichtsmanagement, Stress/Burnout, Depressionen, Traumata, chronische Schmerzen und Leistungsoptimierung." },
          { q: "Wie viele Sitzungen braucht man?", a: "Die meisten Klienten erleben deutliche Ergebnisse innerhalb von 1–3 Sitzungen. Raucherentwöhnung erfordert typischerweise eine Intensivsitzung." },
        ]}
      />

      <section className="bg-[#8b827c] text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Ready for Lasting Change?" : "Bereit für nachhaltige Veränderung?"}
          </h2>
          <Link to={`/${language}/${country}/erstgespraech`}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3 text-base">
              {isEN ? "Free Discovery Call" : "Kostenloses Erstgespräch"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
