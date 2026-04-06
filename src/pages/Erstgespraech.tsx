import { useLanguage } from "@/contexts/LanguageContext";
import { consultationFaqEN, consultationFaqDE } from "@/data/consultationFAQ";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { getPath } from "@/lib/routes";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import InlineContactForm from "@/components/InlineContactForm";

export default function Erstgespraech() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const basePath = getPath("home", language, country);

  return (
    <>
      <SEO {...pageSEO.contact} pageKey="contact" />
      <Breadcrumbs items={[
        { name: "Home", path: basePath },
        { name: isEN ? "Free Discovery Call" : "Erstgespräch", path: getPath("contact", language, country) },
      ]} />

      <section className="py-10 lg:py-14 bg-[#F5F3EF]">
        <div className="container-main">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2 text-center">
              {isEN ? "Get More Information" : "Mehr Informationen erhalten"}
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-4 leading-snug">
              {isEN
                ? <>Send your request here and I will reply within 24 hours.<br />Or use the green WhatsApp button for a faster response.</>
                : <>Senden Sie hier Ihre Anfrage und ich melde mich innerhalb von 24 Stunden.<br />Oder nutzen Sie den grünen WhatsApp-Button für eine schnellere Antwort.</>}
            </p>
            <div className="bg-white rounded-lg border border-border/60 p-4 sm:p-6 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)]">
              <InlineContactForm />
            </div>

            {/* Seminar link */}
            <div className="text-center pt-4 mt-4">
              <p className="text-xs text-muted-foreground mb-1">
                {isEN ? "Interested in our training seminars?" : "Interesse an unseren Ausbildungsseminaren?"}
              </p>
              <Link
                to={getPath("seminarRegistration", language, country)}
                className="text-xs text-primary hover:underline"
              >
                {isEN ? "→ Register for a Seminar" : "→ Zur Seminar-Anmeldung"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#f4f3ef] border-t border-border">
        <div className="container-main py-10 lg:py-14">
          <h2 className="text-xl font-bold text-primary mb-6">
            {isEN ? "Frequently Asked Questions" : "Häufig gestellte Fragen"}
          </h2>
          <div className="space-y-5 max-w-3xl">
            {(isEN ? consultationFaqEN : consultationFaqDE).map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-sm text-primary mb-1">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
