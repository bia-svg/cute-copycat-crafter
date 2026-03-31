/*
 * Design: Deutsche Sachlichkeit — Rich Service Page Template
 * Supports multi-section content with H2s, paragraphs, bullet lists, and FAQ.
 * All legacy content from the original site is preserved in full.
 */

import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";

import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, ChevronRight, Star, ExternalLink } from "lucide-react";
import { getTestimonialsForService } from "@/data/serviceTestimonials";
import { consultationFaqEN, consultationFaqDE } from "@/data/consultationFAQ";
import { trackPageView, trackCtaClick } from "@/lib/ctaTracking";
import { useEffect, useCallback } from "react";

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

      {/* Testimonials from Google Reviews */}
      {(() => {
        const testimonials = getTestimonialsForService(data.slugEN);
        if (testimonials.length === 0) return null;
        return (
          <section className="bg-secondary border-b border-border">
            <div className="container-main py-10">
              <h2 className="text-xl font-bold text-primary mb-6">
                {isEN ? "What Our Clients Say" : "Was unsere Klienten sagen"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {testimonials.map((t, i) => (
                  <div key={i} className="border border-border bg-card p-5 flex flex-col">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-3 flex-1">
                      &bdquo;{t.text}&ldquo;
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                      <p className="text-xs font-semibold text-primary">{t.name}</p>
                      <a href={t.link} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                        Google <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Unified FAQ — topic-specific + consultation items */}
      <section className="bg-white border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-xl font-bold text-primary mb-6">
            {isEN ? "Frequently Asked Questions" : "Häufig gestellte Fragen"}
          </h2>
          <div className="space-y-5 max-w-3xl">
            {[...faq, ...(isEN ? consultationFaqEN : consultationFaqDE)].map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-sm text-primary mb-1">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          {/* FAQPage Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [...faq, ...(isEN ? consultationFaqEN : consultationFaqDE)].map((item) => ({
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

      {/* Consultation CTA Row */}
      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-3">
            {isEN ? "Take the First Step with a Free Consultation" : "Machen Sie den ersten Schritt mit einem kostenlosen Erstgespräch"}
          </h2>
          <p className="text-foreground/80 mb-2">
            {isEN
              ? "Receive a professional, honest first assessment of your situation and discover whether this approach feels right for you."
              : "Erhalten Sie eine professionelle, ehrliche Ersteinschätzung Ihrer Situation und finden Sie heraus, ob dieser Ansatz der richtige für Sie ist."}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            {isEN
              ? "Approx. 10–30 minutes • Professional • Honest • Individual"
              : "Ca. 10–30 Minuten • Professionell • Ehrlich • Individuell"}
          </p>
          <Link to={getPath("contact", language, country)} onClick={handleCtaClick}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3 text-base">
              {isEN ? "Request Your Free Consultation" : "Kostenloses Erstgespräch anfragen"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Kathryn Section — only on children/teens page */}
      {(data.slugEN === "kinder-jugendliche" || data.slugCH === "kinder-jugendliche") && (
        <section className="bg-secondary border-t border-border">
          <div className="container-main py-12">
            <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
              <div className="mx-auto md:mx-0">
                <div className="border border-border overflow-hidden rounded-lg">
                  <img src={CDN.kathrynPortrait} alt="Kathryn Woods – Kinder- und Jugendtherapeutin" className="w-full h-auto" loading="lazy" />
                  <div className="p-4 bg-card">
                    <h3 className="font-bold text-foreground text-sm">Kathryn</h3>
                    <p className="text-xs text-muted-foreground">
                      {isEN ? "Psychological Counselor" : "Psychologische Beraterin"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
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
          <Link to={getPath("contact", language, country)} onClick={handleCtaClick}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3 text-base">
              {t("nav.cta")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
