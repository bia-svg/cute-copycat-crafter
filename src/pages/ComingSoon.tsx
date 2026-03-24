import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";

const pageTitles: Record<string, Record<string, string>> = {
  "raucherentwoehnung": { de: "Raucherentwöhnung", en: "Stop Smoking" },
  "aengste-phobien": { de: "Ängste & Phobien", en: "Anxiety & Phobias" },
  "abnehmen": { de: "Abnehmen", en: "Weight Loss" },
  "stress-burnout": { de: "Stress & Burnout", en: "Stress & Burnout" },
  "depressionen-traumata": { de: "Depressionen & Traumata", en: "Depression & Trauma" },
  "kinder-jugendliche": { de: "Kinder & Jugendliche", en: "Children & Teens" },
  "ausbildung": { de: "Ausbildung", en: "Training" },
  "firmen-coaching": { de: "Firmencoaching", en: "Corporate Coaching" },
  "ueber-uns": { de: "Über uns", en: "About Us" },
  "kundenmeinungen": { de: "Kundenmeinungen", en: "Testimonials" },
  "erfolgsberichte": { de: "Erfolgsberichte", en: "Success Stories" },
  "tv-medien": { de: "TV & Medien", en: "TV & Media" },
  "erstgespraech": { de: "Erstgespräch", en: "Discovery Call" },
  "hypnose-zuerich": { de: "Hypnose Zürich", en: "Hypnosis Zurich" },
  "hypnose-augsburg": { de: "Hypnose Augsburg", en: "Hypnosis Augsburg" },
  "impressum": { de: "Impressum", en: "Legal Notice" },
  "datenschutz": { de: "Datenschutz", en: "Privacy Policy" },
  "agb": { de: "AGB", en: "Terms" },
  "blog": { de: "Blog", en: "Blog" },
  "shop": { de: "Shop", en: "Shop" },
};

export default function ComingSoon() {
  const { language, country } = useLanguage();
  const { "*": slug } = useParams();
  const isEN = language === "en";
  const titles = slug ? pageTitles[slug] : null;
  const title = titles ? titles[language] || titles["de"] : slug || "Page";

  return (
    <section className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="container-main text-center space-y-6 max-w-lg">
        <Clock className="w-16 h-16 text-primary mx-auto" />
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground text-lg">
          {isEN
            ? "This page is currently being built. Check back soon!"
            : "Diese Seite wird gerade erstellt. Schauen Sie bald wieder vorbei!"}
        </p>
        <Link to={getPath("home", language, country)}>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isEN ? "Back to Home" : "Zurück zur Startseite"}
          </Button>
        </Link>
      </div>
    </section>
  );
}
