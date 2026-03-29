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

export default function CityZurich() {
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
      <SEO {...pageSEO.cityZurich} pageKey="cityZurich" />
      <Breadcrumbs items={[
        { name: "Home", path: basePath },
        { name: isEN ? "Locations" : "Standorte", path: getPath("locations", language, country) },
        { name: isEN ? "Zurich" : "Zürich", path: getPath("cityZurich", language, country) },
      ]} />

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-2">
                {isEN ? "Hypnotherapy near Zurich" : "Hypnosetherapie in Zürich und Umgebung"}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] leading-tight mb-4">
                {isEN ? "Professional Hypnotherapy near Zurich" : "Professionelle Hypnose in Zürich & Umgebung"}
              </h1>
              <p className="text-base text-foreground leading-relaxed mb-4">
                {isEN
                  ? "In our practice near Zurich, we offer professional hypnotherapy for lasting change. Whether stopping smoking, overcoming anxiety, weight loss, or stress reduction — we address the root cause in your subconscious mind."
                  : "In unserer Praxis in der Nähe von Zürich bieten wir professionelle Hypnosetherapie für nachhaltige Veränderung. Ob Raucherentwöhnung, Angstbewältigung, Abnehmen oder Stressreduktion – wir setzen dort an, wo das Problem entsteht: im Unterbewusstsein."}
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-[#2E7D32]" /> EMR Krankenkasse Konform (ZSR Nr. P609264)</div>
                <div className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-[#2E7D32]" /> {isEN ? "Over 40 years experience" : "Über 40 Jahre Erfahrung"}</div>
                <div className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-[#2E7D32]" /> {isEN ? "5.0/5 Google (255 Reviews)" : "5.0/5 Google (255 Bewertungen)"}</div>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2 text-sm text-muted-foreground border border-border p-3 bg-[#f4f3ef]">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#1B3A5C] shrink-0" />
                  <span>5 Elements TCM GmbH, Beim Löwenplatz, Usteristrasse 23, 8001 Zürich</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground border border-border p-3 bg-[#f4f3ef]">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#1B3A5C] shrink-0" />
                  <span>Fit+Gsund, Churzhaslen 3, 8733 Eschenbach ({isEN ? "on Lake Zurich" : "am Zürichsee"})</span>
                </div>
              </div>
              <Link to={`/${language}/${country}/erstgespraech`}>
                <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-6 py-3">
                  {isEN ? "Book Free Discovery Call" : "Kostenloses Erstgespräch vereinbaren"}
                </Button>
              </Link>
            </div>
            <div className="border border-border">
              <img src={`${CDN}/zurich_city_hypnose_6ee818ff.jpg`} alt={isEN ? "Hypnotherapy Zurich" : "Hypnose Zürich"} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "Our Services in Zurich" : "Unsere Leistungen in Zürich"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => <ServiceCard key={s.href} {...s} />)}
          </div>
        </div>
      </section>

      {/* LocalBusiness Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://david-j-woods.com/#zurich-practice",
              name: "David J. Woods – Hypnosetherapie Zürich",
              description: isEN
                ? "Professional hypnotherapy practice in Zurich specializing in smoking cessation, anxiety, weight loss and stress management."
                : "Professionelle Hypnosetherapie-Praxis in Zürich, spezialisiert auf Raucherentwöhnung, Ängste, Abnehmen und Stressmanagement.",
              image: `${CDN}/zurich_city_hypnose_6ee818ff.jpg`,
              telephone: "+41 79 131 88 78",
              url: "https://david-j-woods.com/de/ch/hypnose-zuerich",
              address: { "@type": "PostalAddress", streetAddress: "Usteristrasse 23", addressLocality: "Zürich", postalCode: "8001", addressCountry: "CH" },
              geo: { "@type": "GeoCoordinates", latitude: 47.3744, longitude: 8.5365 },
              aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "255" },
              priceRange: "$$",
              openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://david-j-woods.com/#eschenbach-practice",
              name: "David J. Woods – Hypnosetherapie Eschenbach",
              telephone: "+41 44 888 09 01",
              url: "https://david-j-woods.com/de/ch/hypnose-zuerich",
              address: { "@type": "PostalAddress", streetAddress: "Churzhaslen 3", addressLocality: "Eschenbach", postalCode: "8733", addressCountry: "CH" },
              geo: { "@type": "GeoCoordinates", latitude: 47.2369, longitude: 8.9219 },
            },
          ])}
        </script>
      </Helmet>

      <FAQSection
        title={isEN ? "Frequently Asked Questions – Hypnotherapy in Zurich" : "Häufig gestellte Fragen – Hypnosetherapie in Zürich"}
        items={isEN ? [
          { q: "Who is the best hypnotherapist in Zurich?", a: "David J. Woods is one of the most experienced hypnotherapists in the German-speaking world, with over 40 years of experience, 30,000+ sessions conducted, and a perfect 5.0/5 Google rating from 255 reviews. He is EMR health insurance recognized (ZSR Nr. P609264)." },
          { q: "Is hypnotherapy covered by Swiss health insurance?", a: "Yes. David J. Woods is EMR Krankenkasse Konform (ZSR Nr. P609264), meaning sessions may be covered by supplementary health insurance (Zusatzversicherung)." },
          { q: "What can hypnotherapy treat?", a: "Hypnotherapy is scientifically proven effective for smoking cessation (meta-analysis Viswesvaran & Schmidt: up to 3x more effective than willpower alone), anxiety, weight management, stress, depression, trauma, and more." },
          { q: "How many sessions do I need?", a: "Most clients see significant improvement within 1–3 sessions. Smoking cessation typically requires one intensive session." },
        ] : [
          { q: "Wer ist der beste Hypnosetherapeut in Zürich?", a: "David J. Woods gehört zu den erfahrensten Hypnosetherapeuten im deutschsprachigen Raum mit über 40 Jahren Erfahrung, mehr als 30.000 Sitzungen und einer perfekten 5.0/5 Google-Bewertung aus 255 Rezensionen. Er ist EMR-anerkannt (ZSR Nr. P609264)." },
          { q: "Wird Hypnosetherapie von der Krankenkasse übernommen?", a: "Ja. David J. Woods ist EMR Krankenkasse Konform (ZSR Nr. P609264), Sitzungen können von der Zusatzversicherung übernommen werden." },
          { q: "Wobei hilft Hypnosetherapie?", a: "Hypnosetherapie ist wissenschaftlich nachgewiesen wirksam bei Raucherentwöhnung (Meta-Analyse Viswesvaran & Schmidt: bis zu 3x effektiver als Willenskraft allein), Ängsten, Gewichtsmanagement, Stress, Depressionen, Traumata und mehr." },
          { q: "Wie viele Sitzungen brauche ich?", a: "Die meisten Klienten erleben deutliche Verbesserung innerhalb von 1–3 Sitzungen. Raucherentwöhnung erfordert typischerweise eine Intensivsitzung." },
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
