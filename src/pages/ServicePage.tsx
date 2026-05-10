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
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import FAQSection from "@/components/FAQSection";
import { getTestimonialsForService } from "@/data/serviceTestimonials";
import { consultationFaqEN, consultationFaqDE } from "@/data/consultationFAQ";
import { trackPageView, trackCtaClick } from "@/lib/ctaTracking";
import { useEffect, useCallback, useState } from "react";
export interface ContentSection {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
  paragraphsAfter?: string[];
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
  eyebrowCH?: string;
  eyebrowDE?: string;
  eyebrowEN?: string;
  ctaCH?: string;
  ctaDE?: string;
  ctaEN?: string;
  heroAsideCH?: string;
  heroAsideDE?: string;
  heroAsideEN?: string;
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
    <div className="border border-border bg-card p-3.5 flex flex-col">
      <div className="flex gap-0.5 mb-2">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-[13px] text-foreground leading-snug mb-1 flex-1">
        &bdquo;{displayText}&ldquo;
      </p>
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] text-primary hover:text-primary/80 font-medium self-start mb-2 transition-colors"
        >
          {expanded ? (isEN ? "SHOW LESS ▲" : "WENIGER ▲") : (isEN ? "READ MORE »" : "WEITERLESEN »")}
        </button>
      )}
      <div className="flex items-center justify-between mt-auto pt-1.5 border-t border-border/50">
        <p className="text-[11px] font-semibold text-primary">{t.name}</p>
        <a href={t.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          Google <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

function ServiceTestimonialsMobileCarousel({ testimonials, isEN }: { testimonials: ReturnType<typeof getTestimonialsForService>; isEN: boolean }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
        <CarouselContent>
          {testimonials.map((t, i) => (
            <CarouselItem key={i}>
              <ServiceTestimonialCard t={t} isEN={isEN} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2 mt-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              current === i ? "w-5 bg-[#1B3A5C]" : "w-1.5 bg-muted-foreground/40"
            }`}
          />
        ))}
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
  const eyebrow = isEN ? data.eyebrowEN : (isSwiss ? data.eyebrowCH : data.eyebrowDE);
  const ctaLabel = isEN ? data.ctaEN : (isSwiss ? data.ctaCH : data.ctaDE);
  const heroAside = isEN ? data.heroAsideEN : (isSwiss ? data.heroAsideCH : data.heroAsideDE);

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

      {/* Unified premium section system (silver/white alternating, rounded inner cards) — applied to all service pages */}
      {/* Hero — soft silver-grey background, compact, balanced */}
      <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
        <div className="container-main py-6 md:py-8 lg:py-10">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              <div>
                <p className="text-xs md:text-sm font-medium text-[#2E7D32] uppercase tracking-wider mb-2">
                  {eyebrow ?? "Lic.Psych. David J. Woods"}
                </p>
                <h1 className="text-2xl sm:text-3xl font-light text-[#1B3A5C] leading-tight mb-3 tracking-tight">
                  {h1}
                </h1>
                <div className="space-y-1.5 mb-4">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                {/* Compact intro: only first paragraph in hero */}
                <div className="space-y-2">
                  {intro[0].split("\n\n").map((p, i) => (
                    <p key={i} className="text-sm md:text-base text-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="border border-[#E8EDF3] rounded-2xl overflow-hidden">
                  <img src={data.image} alt={h1} className="w-full h-auto" loading="eager" />
                  <div className="bg-[#E8F5E9] border-t border-[#81C784] p-2.5">
                    <p className="text-xs font-semibold text-[#2E7D32]">EMR Krankenkasse Konform · ZSR Nr. P609264</p>
                  </div>
                </div>
                {heroAside && (
                  <div className="space-y-2">
                    {heroAside.split("\n\n").map((p, i) => (
                      <p key={i} className="text-sm md:text-base text-foreground leading-relaxed">{p}</p>
                    ))}
                  </div>
                )}
                <Link to={getPath("contact", language, country)} onClick={handleCtaClick} className="self-start">
                  <Button className="bg-[#d8ebd4] hover:bg-[#c8e6c9] text-[#1a3a2e] font-normal text-[11.5px] md:text-[12.5px] px-4 md:px-5 py-1 md:py-1.5 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#1B3A5C]/25">
                    {ctaLabel ?? t("nav.cta")}
                  </Button>
                </Link>
              </div>
            </div>
            {/* Remaining intro paragraphs below hero grid for full content preservation */}
            {intro.length > 1 && (
              <div className="mt-5 pt-5 border-t border-[#E8EDF3] grid md:grid-cols-2 gap-x-6 gap-y-3">
                {intro.slice(1).map((p, i) => (
                  <p key={i} className="text-sm text-foreground leading-relaxed">{p}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content sections — alternating A/B with inner white rounded cards */}
      {sections.map((section, idx) => {
        const isA = idx % 2 === 0;
        return (
          <section key={idx} className={`${isA ? "bg-[#F8FAFC] border-[#E8EDF3]" : "bg-[#E8EDF3] border-[#D8E0EA]"} border-b`}>
            <div className="container-main py-6 md:py-9">
              <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E8EDF3] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-5 md:p-7">
                <div className={section.image ? "grid md:grid-cols-2 gap-6 items-start" : ""}>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-light text-[#1B3A5C] mb-3 tracking-tight">{section.h2}</h2>
                    <div className="space-y-3">
                      {section.paragraphs.map((p, pi) => (
                        <p key={pi} className="text-sm md:text-base text-foreground leading-relaxed">{p}</p>
                      ))}
                    </div>
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                        {section.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2 text-sm text-foreground">
                            <ChevronRight className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.paragraphsAfter && section.paragraphsAfter.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {section.paragraphsAfter.map((p, pi) => (
                          <p key={pi} className="text-sm md:text-base text-foreground leading-relaxed">{p}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  {section.image && (
                    <div className="border border-[#E8EDF3] rounded-2xl overflow-hidden">
                      <img src={section.image} alt={section.h2} className="w-full h-auto object-cover" loading="lazy" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Kathryn Section — only on children/teens page, shown after hero/intro sections, before testimonials */}
      {(data.slugEN === "kinder-jugendliche" || data.slugCH === "kinder-jugendliche") && (
        <section className="bg-[#E8EDF3] border-b border-[#D8E0EA]">
          <div className="container-main py-4 md:py-6">
            <div className="max-w-5xl mx-auto bg-white border border-[#E2E8EE] rounded-2xl shadow-[0_2px_4px_rgba(27,58,92,0.04),0_12px_32px_-8px_rgba(27,58,92,0.10)] p-4 md:p-5">
              <div className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-6 items-start">
                <div className="mx-auto md:mx-0 w-44 sm:w-48 md:w-full">
                  <div className="border border-[#E2E8EE] overflow-hidden rounded-xl bg-white shadow-[0_2px_4px_rgba(27,58,92,0.04),0_10px_24px_-10px_rgba(27,58,92,0.12)]">
                    <img
                      src={CDN.kathrynPortrait}
                      alt="Kathryn Woods – Kinder- und Jugendtherapeutin"
                      className="w-full h-52 md:h-60 object-cover object-[center_20%]"
                      loading="lazy"
                    />
                    <div className="px-3 py-2 bg-white border-t border-[#EEF2F6]">
                      <h3 className="font-light text-[#1B3A5C] text-sm tracking-tight">Kathryn</h3>
                      <p className="text-[11px] text-muted-foreground">
                        {isEN ? "Psychological Counselor" : "Psychologische Beraterin"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <h2 className="text-lg md:text-xl font-light text-[#1B3A5C] tracking-tight">
                    {isEN ? "Your Therapist: Kathryn" : "Ihre Therapeutin: Kathryn"}
                  </h2>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {isEN
                      ? "Psychological counselor and certified hypnotist with a focus on children and adolescents. Personally trained as a Master Hypnotist by David J. Woods."
                      : "Psychologische Beraterin und zertifizierte Hypnotiseurin mit Schwerpunkt auf Kinder und Jugendliche. Persönlich von David J. Woods zur Master-Hypnotiseurin ausgebildet."}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-foreground/85 mt-1">
                    {[
                      isEN ? "Psychological counselor" : "Psychologische Beraterin",
                      isEN ? "Certified hypnotist" : "Zertifizierte Hypnotiseurin",
                      isEN ? "Focus: children & teens" : "Schwerpunkt Kinder & Jugendliche",
                      "Hypno-Birthing",
                      isEN ? "NLP & Mental Coaching" : "NLP & Mental Coaching",
                      isEN ? "Personally trained by David J. Woods" : "Persönlich ausgebildet durch David J. Woods",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-[#1B3A5C]/50 shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground pt-1">
                    {isEN ? "Speaks fluent Russian and German." : "Spricht fließend Russisch und Deutsch."}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      isEN ? "Children & Teens" : "Kinder & Jugendliche",
                      "Hypno-Birthing",
                      "NLP",
                      isEN ? "Master Hypnotist" : "Master-Hypnotiseurin",
                    ].map((label) => (
                      <span
                        key={label}
                        className="inline-flex items-center rounded-full border border-[#E2E8EE] bg-[#F5F7FA] px-2.5 py-0.5 text-[11px] font-medium text-[#1B3A5C]/80"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Link to={getPath("contact", language, country)}>
                      <Button className="bg-cta text-cta-foreground hover:bg-cta/90">
                        {isEN ? "Request a session for children & teenagers" : "Sitzung für Kinder und Jugendliche anfragen"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Unified FAQ — uses shared FAQSection (centered, green plus, green open state) */}
      {(() => {
        const consultItems = (isEN ? consultationFaqEN : consultationFaqDE)
          .filter(item => !faq.some(f => f.q.toLowerCase().includes("themen") && item.q.toLowerCase().includes("themen") || f.q.toLowerCase().includes("topics") && item.q.toLowerCase().includes("topics")));
        const allFaq = [...faq, ...consultItems];
        return (
          <FAQSection
            sectionClassName="bg-[#DDE1E4] border-y border-border"
            title={isEN ? "Frequently Asked Questions" : "Häufig gestellte Fragen"}
            items={allFaq}
          />
        );
      })()}

      {/* Testimonials from Google Reviews — placed after FAQ, before contact form. Distinct subtle grey to separate from contact section. */}
      {(() => {
        const testimonials = getTestimonialsForService(data.slugEN);
        if (testimonials.length === 0) return null;
        return (
          <section className="bg-[#ECEFF3] border-b border-[#DDE2E8]">
            <div className="container-main py-3 md:py-4">
              <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-[#E2E8EE] rounded-3xl shadow-[0_4px_20px_rgba(27,58,92,0.05)] p-3 md:p-4">
                <h2 className="text-base sm:text-lg md:text-xl font-light text-[#1B3A5C] mb-2 text-center tracking-tight">
                  {isEN ? "What Our Clients Say" : "Was unsere Klienten sagen"}
                </h2>
                {/* Desktop: 3-column grid */}
                <div className="hidden md:grid grid-cols-3 gap-3">
                  {testimonials.map((t, i) => (
                    <ServiceTestimonialCard key={i} t={t} isEN={isEN} />
                  ))}
                </div>
                {/* Mobile: swipeable carousel — slider logic unchanged */}
                <div className="md:hidden">
                  <ServiceTestimonialsMobileCarousel testimonials={testimonials} isEN={isEN} />
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Consultation CTA Row with Inline Form */}
      <section id="contact" className="py-6 md:py-6 bg-[#F8FAFC] border-y border-[#E8EDF3]">
        <div className="container-main">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg sm:text-xl font-light text-primary mb-1 text-center tracking-tight">
              {isEN ? "Request a free consultation" : "Jetzt Kontakt aufnehmen"}
            </h2>
            <p className="text-sm text-[#2E7D32] mb-3 text-center font-normal">
              {isEN
                ? "I'll personally get back to you within 24 hours – often faster via WhatsApp."
                : "Ich melde mich persönlich innerhalb von 24 Stunden – per WhatsApp oft schneller."}
            </p>
            <div className="bg-white rounded-2xl border-2 border-[#D1D5DB] p-4 sm:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
              <InlineContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
