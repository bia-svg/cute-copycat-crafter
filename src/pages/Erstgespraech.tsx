import { useLanguage } from "@/contexts/LanguageContext";
import { consultationFaqEN, consultationFaqDE } from "@/data/consultationFAQ";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { getPath } from "@/lib/routes";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import InlineContactForm from "@/components/InlineContactForm";
import FAQSection from "@/components/FAQSection";

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

      {/* Form section — silver-grey premium background, white inner card */}
      <section className="py-8 md:py-12 bg-[#F8FAFC] border-y border-[#E8EDF3]">
        <div className="container-main">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-light text-primary mb-1 text-center tracking-tight">
              {isEN ? "Request a free consultation" : "Jetzt Kontakt aufnehmen"}
            </h1>
            <p className="text-sm text-[#2E7D32] mb-4 text-center font-normal">
              {isEN
                ? "I'll personally get back to you within 24 hours – often faster via WhatsApp."
                : "Ich melde mich persönlich innerhalb von 24 Stunden – per WhatsApp oft schneller."}
            </p>
            <div className="bg-white rounded-2xl border-2 border-[#D1D5DB] p-4 sm:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
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

      {/* FAQ Section — unified style (centered, green plus, mint open state) */}
      <FAQSection
        title={isEN ? "Frequently Asked Questions" : "Häufig gestellte Fragen"}
        items={isEN ? consultationFaqEN : consultationFaqDE}
        sectionClassName="bg-[#F8FAFC] border-t border-[#E2E8EE]"
      />
    </>
  );
}
