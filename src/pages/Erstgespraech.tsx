import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
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
            <div className="bg-white rounded-lg border border-border/40 p-4 sm:p-6 shadow-[0_4px_20px_-6px_rgba(27,58,92,0.12)]">
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
          <Accordion type="single" collapsible className="max-w-3xl space-y-2">
            {(isEN ? consultationFaqEN : consultationFaqDE).map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border bg-secondary/30 rounded-md px-4"
              >
                <AccordionTrigger className="text-sm font-semibold text-primary hover:no-underline py-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
