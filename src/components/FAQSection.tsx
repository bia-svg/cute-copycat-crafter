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
  sectionClassName?: string;
}

/**
 * Premium FAQ section with FAQPage JSON-LD schema.
 * Card-style accordion: warm cream background, subtle green accent on open,
 * elegant plus icon, refined spacing. All items closed by default.
 */
export default function FAQSection({ title, items, sectionClassName }: FAQSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={sectionClassName ?? "bg-[#DDE1E4] border-y border-border"}>
      <div className="container-main py-2.5 md:py-4">
        <h2 className="text-lg md:text-xl font-light tracking-tight text-foreground/90 leading-tight mb-1.5 md:mb-3 text-center">
          {title}
        </h2>

        <div className="max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto bg-white/70 backdrop-blur-sm border border-[#C5CCD6] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-1.5 md:p-3 lg:p-3.5">
          <Accordion
            type="single"
            collapsible
            className="space-y-0.5 md:space-y-1"
          >
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="group border-2 border-[#B5BDC9] bg-white rounded-2xl px-3.5 md:px-5 shadow-[0_1px_3px_rgba(27,58,92,0.08)] hover:border-[#2E7D32]/70 hover:bg-[#FAFBFC] hover:shadow-[0_2px_6px_rgba(0,0,0,0.06)] transition-all data-[state=open]:bg-[#F4F9F4] data-[state=open]:border-[#2E7D32]/60 data-[state=open]:shadow-[0_2px_8px_rgba(46,125,50,0.08)]"
              >
                <AccordionTrigger
                  className="text-[13px] md:text-[14.5px] font-normal text-foreground/80 hover:no-underline py-1.5 md:py-1.5 text-left gap-3 md:gap-4 [&>svg]:hidden"
                >
                  <span className="flex-1">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#2F3A4A]/15 text-[#2F3A4A] transition-all group-data-[state=open]:rotate-45 group-data-[state=open]:bg-[#2E7D32] group-data-[state=open]:text-white"
                  >
                    <Plus className="h-4 w-4" strokeWidth={3.5} />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[12.5px] md:text-[13.5px] text-foreground/75 leading-snug md:leading-[1.5] pb-2.5 md:pb-3 pt-0 pr-10">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

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
