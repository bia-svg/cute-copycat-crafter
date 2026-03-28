import { ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

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
 * Use on any page that needs FAQ structured data for SEO/GEO.
 */
export default function FAQSection({ title, items }: FAQSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-white border-b border-border">
      <div className="container-main py-10">
        <h2 className="text-xl font-bold text-primary mb-6">{title}</h2>
        <div className="space-y-4 max-w-3xl">
          {items.map((item, i) => (
            <details key={i} className="border border-border bg-secondary/30 group">
              <summary className="font-semibold text-sm text-primary p-4 cursor-pointer hover:bg-secondary transition-colors list-none flex items-center justify-between">
                {item.q}
                <ChevronRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform shrink-0 ml-2" />
              </summary>
              <div className="px-4 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}
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
