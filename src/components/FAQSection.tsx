import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title: string;
  items: FAQItem[];
}

/**
 * Premium FAQ section with FAQPage JSON-LD schema.
 * Card-style accordion: warm cream background, subtle green accent on open,
 * elegant plus icon, refined spacing. All items closed by default.
 */
export default function FAQSection({ title, items }: FAQSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-[#FAF7F2] border-y border-[#EDE7DC]">
      <div className="container-main py-8 md:py-10">
        <h2
          className="text-xl md:text-2xl font-bold text-primary mb-5 md:mb-7 text-center"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {title}
        </h2>

        <Accordion
          type="single"
          collapsible
          className="max-w-2xl mx-auto space-y-2.5"
        >
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="group border border-[#E5DFD2] bg-white rounded-xl px-5 md:px-6 shadow-[0_1px_2px_rgba(27,58,92,0.04)] hover:border-[#2E7D32]/40 hover:shadow-[0_2px_6px_rgba(46,125,50,0.06)] transition-all data-[state=open]:bg-[#F4F9F4] data-[state=open]:border-[#2E7D32]/40 data-[state=open]:shadow-[0_2px_8px_rgba(46,125,50,0.08)]"
            >
              <AccordionTrigger
                className="text-[15px] md:text-base font-semibold text-primary hover:no-underline py-4 md:py-4.5 text-left gap-4 [&>svg]:hidden"
              >
                <span className="flex-1">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] transition-all group-data-[state=open]:rotate-45 group-data-[state=open]:bg-[#2E7D32] group-data-[state=open]:text-white"
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/75 leading-relaxed pb-5 pt-0 pr-10">
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
