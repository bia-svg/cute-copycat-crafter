/*
 * Design: Deutsche Sachlichkeit — Rich Service Page Template
 * Supports multi-section content with H2s, paragraphs, bullet lists, and FAQ.
 * All legacy content from the original site is preserved in full.
 */

import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import { Helmet } from "react-helmet-async";


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ChevronRight } from "lucide-react";

export interface ContentSection {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
  image?: string;
}

export interface ServicePageData {
  slugCH: string;
  slugDE: string;
  slugEN: string;
  titleCH: string;
  titleDE: string;
  titleEN: string;
  metaDescCH: string;
  metaDescDE: string;
  metaDescEN: string;
  h1CH: string;
  h1DE: string;
  h1EN: string;
  benefitsCH: string[];
  benefitsEN: string[];
  introDE: string[];
  introCH: string[];
  introEN: string[];
  sectionsCH: ContentSection[];
  sectionsDE: ContentSection[];
  sectionsEN: ContentSection[];
  image: string;
  faqCH: { q: string; a: string }[];
  faqEN: { q: string; a: string }[];
}

export default function ServicePage({ data }: { data: ServicePageData }) {
  const { language, country, t, isSwiss, showCH } = useLanguage();
  const isEN = language === "en";

  // Content selection: language determines text, country determines location-specific data
  // CH content = German with Swiss specifics, DE content = German with DE specifics, EN = English
  // For INT: show CH content in DE, EN content in EN (covers both regions)
  const title = isEN ? data.titleEN : (isSwiss ? data.titleCH : data.titleDE);
  const metaDesc = isEN ? data.metaDescEN : (isSwiss ? data.metaDescCH : data.metaDescDE);
  const h1 = isEN ? data.h1EN : (isSwiss ? data.h1CH : data.h1DE);
  const benefits = isEN ? data.benefitsEN : data.benefitsCH;
  const intro = isEN ? data.introEN : (isSwiss ? data.introCH : data.introDE);
  const sections = isEN ? data.sectionsEN : (isSwiss ? data.sectionsCH : data.sectionsDE);
  const faq = isEN ? data.faqEN : data.faqCH;

  const slug = isEN ? data.slugEN : (isSwiss ? data.slugCH : data.slugDE);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={`https://david-j-woods.com/${language}/${country}/${slug}`} />
      </Helmet>

      {/* Hero */}
      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-2">
                Lic.Psych. David J. Woods
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] leading-tight mb-4">
                {h1}
              </h1>
              <div className="space-y-2 mb-6">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              {/* Intro paragraphs — full legacy text */}
              <div className="space-y-4 mb-6">
                {intro.map((p, i) => (
                  <p key={i} className="text-base text-foreground leading-relaxed">{p}</p>
                ))}
              </div>
              <Link to={getPath("contact", language, country)}>
                <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-6 py-3">
                  {t("nav.cta")}
                </Button>
              </Link>
            </div>
            <div className="border border-border">
              <img src={data.image} alt={h1} className="w-full h-auto" loading="eager" />
              <div className="bg-[#E8F5E9] border-t border-[#81C784] p-3">
                <p className="text-xs font-semibold text-[#2E7D32]">EMR Krankenkasse Konform · ZSR Nr. P609264</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rich Content Sections — preserving all legacy H2s and paragraphs */}
      {sections.map((section, idx) => (
        <section key={idx} className={`${idx % 2 === 0 ? "bg-[#f4f3ef]" : "bg-white"} border-b border-border`}>
          <div className="container-main py-10">
            <div className={section.image ? "grid md:grid-cols-2 gap-8 items-start" : ""}>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1B3A5C] mb-5">{section.h2}</h2>
                <div className="space-y-4 max-w-3xl">
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi} className="text-base text-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-5 space-y-2 max-w-3xl">
                    {section.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2 text-sm text-foreground">
                        <ChevronRight className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {section.image && (
                <div className="border border-border rounded-lg overflow-hidden">
                  <img src={section.image} alt={section.h2} className="w-full h-auto object-cover" loading="lazy" />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* FAQ with Schema.org FAQPage markup */}
      {faq.length > 0 && (
        <section className="bg-white border-b border-border">
          <div className="container-main py-10">
            <h2 className="text-xl font-bold text-[#1B3A5C] mb-6">
              {isEN ? "Frequently Asked Questions" : "Häufig gestellte Fragen"}
            </h2>
            <div className="space-y-4 max-w-3xl">
              {faq.map((item, i) => (
                <details key={i} className="border border-border bg-[#f4f3ef] group">
                  <summary className="font-semibold text-sm text-[#1B3A5C] p-4 cursor-pointer hover:bg-[#EEEEEE] transition-colors list-none flex items-center justify-between">
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
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faq.map((item) => ({
                    "@type": "Question",
                    name: item.q,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: item.a,
                    },
                  })),
                }),
              }} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#8b827c] text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Ready for Lasting Change?" : "Bereit für nachhaltige Veränderung?"}
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            {isEN
              ? "Book your free and non-binding discovery call today."
              : "Vereinbaren Sie jetzt Ihr kostenloses und unverbindliches Erstgespräch."}
          </p>
          <Link to={getPath("contact", language, country)}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3 text-base">
              {t("nav.cta")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
