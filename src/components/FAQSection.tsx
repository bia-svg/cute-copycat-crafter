import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title: string;
  items: FAQItem[];
}

/**
 * Reusable FAQ section with FAQPage JSON-LD schema.
 * Uses accordion display — one item open at a time.
 */
export default function FAQSection({ title, items }: FAQSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-white border-b border-border">
      <div className="container-main py-10">
        <h2 className="text-xl font-bold text-primary mb-6">{title}</h2>
        <Accordion type="single" collapsible className="max-w-3xl space-y-2">
          {items.map((item, i) => (
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

        {/* FAQPage Schema */}
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            })}
          </script>
        </Helmet>
      </div>
    </section>
  );
}
