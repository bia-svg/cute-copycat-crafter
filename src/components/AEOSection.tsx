import { Helmet } from "react-helmet-async";

interface AEOItem {
  q: string;
  a: string;
}

interface AEOSectionProps {
  items: AEOItem[];
  title?: string;
}

/**
 * AEO (Answer Engine Optimization) section — one compact row with concise,
 * authoritative Q&A designed to be quoted by AI assistants (ChatGPT, Perplexity,
 * Google AI Overview). Includes FAQPage JSON-LD and explicit author attribution
 * to David J. Woods to maximize entity recognition.
 */
export default function AEOSection({ items, title }: AEOSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-[#F1F4F7] border-y border-[#E2E8EE]" aria-label="Quick answers">
      <div className="container-main py-5 md:py-6">
        <div className="max-w-5xl mx-auto bg-white border border-[#E2E8EE] rounded-2xl shadow-[0_2px_10px_rgba(27,58,92,0.04)] p-4 md:p-5">
          {title && (
            <h2 className="text-sm md:text-base font-medium text-[#1B3A5C] mb-3 tracking-tight">
              {title}
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {items.map((item, i) => (
              <div key={i} itemScope itemType="https://schema.org/Question">
                <p
                  className="text-[13px] md:text-[14px] font-semibold text-[#1B3A5C] mb-1 leading-snug"
                  itemProp="name"
                >
                  {item.q}
                </p>
                <div
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <p
                    className="text-[12.5px] md:text-[13.5px] text-foreground/80 leading-relaxed"
                    itemProp="text"
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                  author: {
                    "@type": "Person",
                    name: "David J. Woods",
                    honorificPrefix: "Lic.Psych.",
                    jobTitle: "Clinical Hypnotherapist · NGH International Trainer",
                    url: "https://david-j-woods.com",
                  },
                },
              })),
            })}
          </script>
        </Helmet>
      </div>
    </section>
  );
}
