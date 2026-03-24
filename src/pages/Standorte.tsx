import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { getPath } from "@/lib/routes";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ArrowRight } from "lucide-react";

export default function Standorte() {
  const { language, country, t, showCH, showDE } = useLanguage();
  const isEN = language === "en";

  const locations = [
    ...(showCH
      ? [
          {
            city: "Zürich",
            subtitle: isEN ? "Main Practice Switzerland" : "Hauptpraxis Schweiz",
            address: ["Brandschenkestrasse 60", "8002 Zürich"],
            phone: "+41 44 888 09 01",
            href: getPath("cityZurich", language, country),
          },
        ]
      : []),
    ...(showDE
      ? [
          {
            city: "Augsburg",
            subtitle: isEN ? "Practice Germany" : "Praxis Deutschland",
            address: ["Viktoriastrasse 3", "86150 Augsburg"],
            phone: "+49 171 9539922",
            href: getPath("cityAugsburg", language, country),
          },
        ]
      : []),
  ];

  return (
    <>
      <SEO {...pageSEO.locations} />
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container-main text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Our Locations" : "Unsere Standorte"}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            {isEN
              ? "Visit us at our practices in Switzerland and Germany"
              : "Besuchen Sie uns in unseren Praxen in der Schweiz und Deutschland"}
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {locations.map((loc) => (
              <div key={loc.city} className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{loc.city}</h2>
                    <p className="text-sm text-muted-foreground">{loc.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="text-foreground">
                    {loc.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-primary hover:underline">
                    <Phone className="w-4 h-4" /> {loc.phone}
                  </a>
                </div>
                <Link to={loc.href}>
                  <Button variant="outline" className="w-full group">
                    {isEN ? "Learn More" : "Mehr erfahren"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link to={getPath("contact", language, country)}>
              <Button className="bg-cta text-cta-foreground hover:bg-cta/90 text-lg px-8 py-6">
                {t("nav.cta")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
