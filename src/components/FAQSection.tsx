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
    <section className={sectionClassName ?? "border-y border-border"} style={sectionClassName ? undefined : { background: "linear-gradient(180deg, #C6CDD4 0%, #CFD5DB 55%, #C9CFD5 100%)" }}>
      <div className="container-main py-4 md:py-6">
        <h2 className="text-base md:text-lg font-light tracking-tight text-foreground/80 leading-tight mb-2 md:mb-3 text-center">
          {title}
        </h2>

        <div className="relative max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto bg-gradient-to-b from-white to-[#FBFCFD] border border-[#1B3A5C]/25 rounded-3xl shadow-[0_1px_2px_rgba(27,58,92,0.06),0_8px_22px_rgba(27,58,92,0.10),0_36px_80px_-26px_rgba(27,58,92,0.45)] ring-1 ring-white/90 hover:shadow-[0_2px_5px_rgba(27,58,92,0.08),0_12px_28px_rgba(27,58,92,0.12),0_44px_96px_-26px_rgba(27,58,92,0.50)] hover:-translate-y-[2px] transition-[transform,box-shadow] duration-300 ease-out p-3 md:p-5 lg:p-6 before:content-[''] before:absolute before:top-0 before:left-8 before:right-8 before:h-[2px] before:rounded-b-full before:bg-gradient-to-r before:from-transparent before:via-[#1B3A5C]/35 before:to-transparent">
          <Accordion
            type="single"
            collapsible
            className="space-y-1 md:space-y-1.5"
          >
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="group border border-[#B5BDC9] bg-white rounded-2xl px-4 md:px-6 shadow-[0_1px_2px_rgba(27,58,92,0.05)] hover:border-[#2E7D32]/55 hover:bg-[#FAFCFA] hover:shadow-[0_2px_10px_-2px_rgba(46,125,50,0.18),0_0_0_1px_rgba(46,125,50,0.08)] transition-all duration-300 data-[state=open]:bg-[#F0F7F2] data-[state=open]:border-[#2E7D32]/70 data-[state=open]:shadow-[0_4px_18px_rgba(46,125,50,0.14),0_0_0_1px_rgba(46,125,50,0.12)]"
              >
                <AccordionTrigger
                  className="text-[13px] md:text-[14.5px] font-normal text-foreground/80 hover:no-underline py-2 md:py-2.5 text-left gap-3 md:gap-4 [&>svg]:hidden"
                >
                  <span className="flex-1">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-b from-[#EEF1F4] to-[#DCE2E8] text-[#2F3A4A] border border-[#1B3A5C]/15 shadow-[0_1px_1px_rgba(255,255,255,0.7)_inset,0_1px_2px_-1px_rgba(27,58,92,0.15)] group-hover:border-[#2E7D32]/35 group-hover:shadow-[0_1px_1px_rgba(255,255,255,0.8)_inset,0_2px_6px_-1px_rgba(46,125,50,0.30)] transition-all group-data-[state=open]:rotate-45 group-data-[state=open]:bg-gradient-to-b group-data-[state=open]:from-[#3E9D44] group-data-[state=open]:to-[#2E7D32] group-data-[state=open]:text-white group-data-[state=open]:border-[#2E7D32] group-data-[state=open]:shadow-[0_2px_8px_rgba(46,125,50,0.35)]"
                  >
                    <Plus className="h-4 w-4" strokeWidth={3} />
                  </span>
                </AccordionTrigger>

                <AccordionContent className="text-[12.5px] md:text-[13.5px] text-foreground/80 leading-snug md:leading-[1.55] pb-3.5 md:pb-4 pt-1 md:pt-1.5 pr-10">
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
