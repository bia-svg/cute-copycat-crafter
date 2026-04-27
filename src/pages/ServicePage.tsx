/*
 * Design: Deutsche Sachlichkeit — Rich Service Page Template
 * Supports multi-section content with H2s, paragraphs, bullet lists, and FAQ.
 * All legacy content from the original site is preserved in full.
 */

import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import { Helmet } from "react-helmet-async";
import InlineContactForm from "@/components/InlineContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";

import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, ChevronRight, Star, ExternalLink } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { getTestimonialsForService } from "@/data/serviceTestimonials";
import { consultationFaqEN, consultationFaqDE } from "@/data/consultationFAQ";
import { trackPageView, trackCtaClick } from "@/lib/ctaTracking";
import { useEffect, useCallback, useState } from "react";
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

const TESTIMONIAL_PREVIEW_CHAR_LIMIT = 75;

function ServiceTestimonialCard({ t, isEN }: { t: ReturnType<typeof getTestimonialsForService>[number]; isEN: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const text = isEN ? t.textEN : t.textDE;
  const needsTruncation = text.length > TESTIMONIAL_PREVIEW_CHAR_LIMIT;
  const displayText = expanded || !needsTruncation
    ? text
    : text.slice(0, TESTIMONIAL_PREVIEW_CHAR_LIMIT).replace(/\s+\S*$/, "") + "…";

  return (
    <div className="border border-border bg-card p-5 flex flex-col">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-sm text-foreground leading-relaxed mb-1 flex-1">
        &bdquo;{displayText}&ldquo;
      </p>
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary hover:text-primary/80 font-medium self-start mb-3 transition-colors"
        >
          {expanded ? (isEN ? "SHOW LESS ▲" : "WENIGER ▲") : (isEN ? "READ MORE »" : "WEITERLESEN »")}
        </button>
      )}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
        <p className="text-xs font-semibold text-primary">{t.name}</p>
        <a href={t.link} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          Google <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
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
  const pagePath = `/${language}/${country}/${slug}`;

  // Track pageview once per mount
  useEffect(() => {
    trackPageView(pagePath);
  }, [pagePath]);

  const handleCtaClick = useCallback(() => {
    const dest = isEN ? "consultation" : "erstgespraech";
    trackCtaClick(pagePath, dest);
  }, [pagePath, isEN]);

  const BASE_URL = "https://david-j-woods.com";

  const breadcrumbItems = [
    { name: isEN ? "Home" : "Startseite", path: `/${language}/${country}` },
    { name: h1, path: `/${language}/${country}/${slug}` },
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={`${BASE_URL}/${language}/${country}/${slug}`} />

        {/* hreflang with proper localized slugs */}
        <link rel="alternate" hrefLang="de-CH" href={`${BASE_URL}/de/ch/${data.slugCH}`} />
        <link rel="alternate" hrefLang="de-DE" href={`${BASE_URL}/de/de/${data.slugDE}`} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en/ch/${data.slugEN}`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/de/ch/${data.slugCH}`} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={`${BASE_URL}/${language}/${country}/${slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={data.image} />
        <meta property="og:site_name" content="David J. Woods — Hypnose & Psychologie" />

        {/* Breadcrumb JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.name,
              item: `${BASE_URL}${item.path}`,
            })),
          })}
        </script>

        {/* Service JSON-LD with AggregateRating for rich snippets (★ stars in SERP) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "@id": `${BASE_URL}/${language}/${country}/${slug}#service`,
            name: title.replace(/ \| .*$/, ""),
            description: metaDesc,
            url: `${BASE_URL}/${language}/${country}/${slug}`,
            image: data.image,
            priceRange: "$$",
            telephone: ["+41 79 131 88 78", "+49 171 953 99 22"],
            address: [
              { "@type": "PostalAddress", streetAddress: "Usteristrasse 23", addressLocality: "Zürich", postalCode: "8001", addressCountry: "CH" },
              { "@type": "PostalAddress", streetAddress: "Viktoriastr. 3b", addressLocality: "Augsburg", postalCode: "86150", addressCountry: "DE" },
            ],
            areaServed: [
              { "@type": "Country", name: "Switzerland" },
              { "@type": "Country", name: "Germany" },
            ],
            provider: {
              "@type": "Person",
              name: "David J. Woods",
              honorificPrefix: "Lic.Psych.",
              jobTitle: "Hypnotherapist, NGH International Trainer",
              url: BASE_URL,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "266",
              bestRating: "5",
            },
            medicalSpecialty: "Hypnotherapy",
          })}
        </script>

        {/* FAQPage JSON-LD — enables expandable FAQ rich result in SERP */}
        {faq && faq.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
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
            })}
          </script>
        )}
      </Helmet>

      <Breadcrumbs items={breadcrumbItems} />

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
              <Link to={getPath("contact", language, country)} onClick={handleCtaClick}>
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
      {sections.map((section, idx) => {
        const isSilver = idx % 2 === 0;
        return (
        <section key={idx} className={`${isSilver ? "bg-[#F1F4F7] border-y border-[#E2E8EE]" : "bg-white border-y border-border"}`}>
          <div className="container-main py-10 md:py-12">
            <div className={`max-w-5xl mx-auto ${isSilver ? "bg-white/80 backdrop-blur-sm border border-[#E2E8EE] shadow-[0_4px_20px_rgba(27,58,92,0.05)]" : "bg-[#F1F4F7]/70 border border-[#E2E8EE]"} rounded-3xl p-5 md:p-7 lg:p-8`}>
              <div className={section.image ? "grid md:grid-cols-2 gap-8 items-start" : ""}>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1B3A5C] mb-5">{section.h2}</h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((p, pi) => (
                      <p key={pi} className="text-base text-foreground leading-relaxed">{p}</p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2">
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
                  <div className="border border-[#E2E8EE] rounded-2xl overflow-hidden">
                    <img src={section.image} alt={section.h2} className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        );
      })}

      {/* Testimonials from Google Reviews */}
      {(() => {
        const testimonials = getTestimonialsForService(data.slugEN);
        if (testimonials.length === 0) return null;
        return (
          <section className="bg-[#F1F4F7] border-y border-[#E2E8EE]">
            <div className="container-main py-10 md:py-12">
              <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E2E8EE] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-7 lg:p-8">
                <h2 className="text-xl font-bold text-primary mb-6 text-center" style={{ fontFamily: "Georgia, serif" }}>
                  {isEN ? "What Our Clients Say" : "Was unsere Klienten sagen"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {testimonials.map((t, i) => (
                    <ServiceTestimonialCard key={i} t={t} isEN={isEN} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Unified FAQ — topic-specific + consultation items */}
      {(() => {
        const consultItems = (isEN ? consultationFaqEN : consultationFaqDE)
          .filter(item => !faq.some(f => f.q.toLowerCase().includes("themen") && item.q.toLowerCase().includes("themen") || f.q.toLowerCase().includes("topics") && item.q.toLowerCase().includes("topics")));
        const allFaq = [...faq, ...consultItems];
        return (
          <section className="bg-white border-y border-border">
            <div className="container-main py-10 md:py-12">
              <div className="max-w-5xl mx-auto bg-[#F1F4F7]/70 border border-[#E2E8EE] rounded-3xl p-5 md:p-7 lg:p-8">
                <h2 className="text-xl font-bold text-primary mb-6 text-center" style={{ fontFamily: "Georgia, serif" }}>
                  {isEN ? "Frequently Asked Questions" : "Häufig gestellte Fragen"}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {allFaq.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="border border-[#E2E8EE] bg-white rounded-2xl px-4 md:px-5"
                    >
                      <AccordionTrigger className="text-sm font-semibold text-primary hover:no-underline py-4 text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              {/* FAQPage Schema */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: allFaq.map((item) => ({
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
        );
      })()}

      {/* Kathryn Section — only on children/teens page, shown BEFORE contact form */}
      {(data.slugEN === "kinder-jugendliche" || data.slugCH === "kinder-jugendliche") && (
        <section className="bg-[#F1F4F7] border-y border-[#E2E8EE]">
          <div className="container-main py-10 md:py-12">
            <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E2E8EE] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-7 lg:p-8">
              <div className="grid md:grid-cols-[260px_1fr] gap-7 items-start">
                <div className="mx-auto md:mx-0 w-60 md:w-full">
                  <div className="border border-[#E2E8EE] overflow-hidden rounded-2xl">
                    <img src={CDN.kathrynPortrait} alt="Kathryn Woods – Kinder- und Jugendtherapeutin" className="w-full h-auto" loading="lazy" />
                    <div className="p-4 bg-[#F1F4F7]">
                      <h3 className="font-bold text-foreground text-sm">Kathryn</h3>
                      <p className="text-xs text-muted-foreground">
                        {isEN ? "Psychological Counselor" : "Psychologische Beraterin"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#1B3A5C]">
                    {isEN ? "Your Therapist: Kathryn" : "Ihre Therapeutin: Kathryn"}
                  </h2>
                  <p className="text-foreground/80 leading-relaxed">
                    {isEN
                      ? "Over many years, Kathryn has intensively studied the fields of psychology and personality development, with a particular focus on educational work with children and adolescents. She completed numerous training programs in modern communication techniques such as NLP and mental coaching, and was personally trained as a Master Hypnotist by David J. Woods."
                      : "Über viele Jahre hinweg setzte sich Kathryn intensiv mit den Themen Psychologie und Persönlichkeitsentwicklung auseinander, insbesondere mit einem Schwerpunkt auf die pädagogische Arbeit mit Kindern und Jugendlichen. Sie absolvierte zahlreiche Ausbildungen in modernen Kommunikationstechniken wie NLP und Mental Coaching und wurde zudem von David J. Woods persönlich zur Master-Hypnotiseurin ausgebildet."}
                  </p>
                  <p className="text-foreground/80 leading-relaxed">
                    {isEN
                      ? "Through her empathetic, structured and clear approach, she quickly builds trust and ensures that even young people feel safe and understood during hypnosis."
                      : "Durch ihre einfühlsame, strukturierte und klare Art schafft sie schnell Vertrauen und sorgt dafür, dass sich auch junge Menschen bei der Hypnose sicher und verstanden fühlen."}
                  </p>
                  <p className="text-foreground/80 leading-relaxed">
                    {isEN
                      ? "Kathryn is multilingual, speaking fluent Russian and German as well as excellent English. In our practice, she is your competent contact for hypnosis sessions specifically for children and adolescents."
                      : "Kathryn ist mehrsprachig aufgewachsen und spricht fließend Russisch und Deutsch sowie sehr gutes Englisch. In unserer Praxis ist sie Ihre kompetente Ansprechpartnerin für Hypnosesitzungen speziell bei Kindern und Jugendlichen."}
                  </p>
                  <Link to={getPath("contact", language, country)}>
                    <Button className="bg-cta text-cta-foreground hover:bg-cta/90 mt-2">
                      {isEN ? "Book a Session with Kathryn" : "Sitzung mit Kathryn buchen"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Consultation CTA Row with Inline Form */}
      <section className="py-10 md:py-14 bg-white border-t border-border">
        <div className="container-main">
          <div className="max-w-2xl mx-auto bg-[#F1F4F7]/70 border border-[#E2E8EE] rounded-3xl p-5 md:p-7 lg:p-8">
            <h2 className="text-lg sm:text-xl font-semibold text-primary mb-4 text-center" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Your Request" : "Ihre Anfrage"}
            </h2>
            <div className="bg-white rounded-2xl border border-[#E2E8EE] p-4 sm:p-6 shadow-[0_4px_20px_-6px_rgba(27,58,92,0.08)]">
              <InlineContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
