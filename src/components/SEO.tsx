import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language, Country } from "@/contexts/LanguageContext";

interface SEOProps {
  titleDE: string;
  titleEN: string;
  descriptionDE: string;
  descriptionEN: string;
  /** Page key for hreflang slug resolution */
  pageKey?: string;
  /** Override og:image per page */
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Breadcrumb items: [{name, path}] */
  breadcrumbs?: { name: string; path: string }[];
}

const BASE_URL = "https://david-j-woods.com";

const OG_IMAGE_DEFAULT = "https://david-j-woods.com/images/og-default.jpg";

/* ── Slug maps for hreflang resolution ── */
const slugMapDE: Record<string, string> = {
  home: "", smoking: "raucherentwoehnung", anxiety: "aengste-phobien",
  weight: "abnehmen", stress: "stress-burnout", depression: "depressionen-traumata",
  children: "kinder-jugendliche", adults: "erwachsene", training: "ausbildung",
  corporate: "firmen-coaching",
  corporateErfolg: "firmen-coaching/erfolgs-training",
  corporateResilienz: "firmen-coaching/resilienz-verstaerken",
  corporateStress: "firmen-coaching/stress-praevention",
  corporateNichtraucher: "firmen-coaching/nichtraucher-seminare",
  about: "ueber-uns", testimonials: "kundenmeinungen", successStories: "erfolgsberichte",
  media: "tv-medien", contact: "erstgespraech", locations: "standorte",
  cityZurich: "hypnose-zuerich", cityAugsburg: "hypnose-augsburg",
  blog: "blog", book: "buch-go-inside",
  impressum: "impressum", privacy: "datenschutz", terms: "agb",
};

const slugMapEN: Record<string, string> = {
  home: "", smoking: "stop-smoking", anxiety: "anxiety-phobias",
  weight: "weight-loss", stress: "stress-burnout", depression: "depression-trauma",
  children: "children-teens", adults: "adults", training: "training",
  corporate: "business-coaching",
  corporateErfolg: "business-coaching/success-training",
  corporateResilienz: "business-coaching/resilience-building",
  corporateStress: "business-coaching/stress-prevention",
  corporateNichtraucher: "business-coaching/non-smoker-seminars",
  about: "about-us", testimonials: "testimonials", successStories: "success-stories",
  media: "tv-media", contact: "consultation", locations: "locations",
  cityZurich: "hypnosis-zurich", cityAugsburg: "hypnosis-augsburg",
  blog: "blog", book: "book-go-inside",
  impressum: "imprint", privacy: "privacy-policy", terms: "terms",
};

function buildUrl(lang: Language, country: Country, pageKey?: string): string {
  const slugMap = lang === "en" ? slugMapEN : slugMapDE;
  const slug = pageKey ? (slugMap[pageKey] ?? "") : "";
  return `${BASE_URL}/${lang}/${country}${slug ? `/${slug}` : ""}`;
}

export default function SEO({
  titleDE, titleEN, descriptionDE, descriptionEN,
  pageKey, ogImage, jsonLd, breadcrumbs,
}: SEOProps) {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const title = isEN ? titleEN : titleDE;
  const description = isEN ? descriptionEN : descriptionDE;
  const fullTitle = `${title} | David J. Woods`;
  const canonicalUrl = buildUrl(language, country, pageKey);
  const resolvedOgImage = ogImage || OG_IMAGE_DEFAULT;

  /* ── Default structured data ── */
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "David J. Woods — Hypnose & Psychologie",
    description: descriptionDE,
    url: BASE_URL,
    telephone: ["+41 44 888 09 01", "+49 171 9539922"],
    address: [
      { "@type": "PostalAddress", streetAddress: "Usteristrasse 23", addressLocality: "Zürich", postalCode: "8001", addressCountry: "CH" },
      { "@type": "PostalAddress", streetAddress: "Viktoria Str 3b", addressLocality: "Augsburg", postalCode: "86150", addressCountry: "DE" },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "255", bestRating: "5" },
    founder: { "@type": "Person", name: "David J. Woods", jobTitle: "Lic.Psych., Hypnotherapeut, NGH International Trainer" },
    areaServed: [{ "@type": "Country", name: "Switzerland" }, { "@type": "Country", name: "Germany" }],
    sameAs: ["https://www.google.com/maps/place/David+J.+Woods"],
  };

  /* ── Person schema for GEO/Entity Authority ── */
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "David J. Woods",
    givenName: "David",
    familyName: "Woods",
    honorificPrefix: "Lic.Psych.",
    jobTitle: "Hypnotherapeut, Dozent & Fachautor, NGH International Trainer",
    url: BASE_URL,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029169718/aQMYm3GvBKfW5muS6V4PFb/david-woods-og.jpg",
    description: "Licensed psychologist and hypnotherapist with over 40 years of clinical experience and more than 30,000 documented sessions. NGH International Trainer, EMR-recognized (ZSR P609264). Developer of the Aktiv-Hypnose© method. Author of 'Go Inside'. Practices in Zurich (Switzerland) and Augsburg (Germany).",
    knowsAbout: [
      "Clinical Hypnotherapy", "Cognitive Behavioral Hypnosis", "Smoking Cessation",
      "Anxiety Disorders", "Phobia Treatment", "Weight Management Psychology",
      "Stress & Burnout Prevention", "Depression & Trauma Therapy",
      "Corporate Performance Coaching", "Resilience Training",
      "NLP (Neuro-Linguistic Programming)", "Self-Hypnosis Techniques",
    ],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Professional License", name: "Lic.Psych. — Licensed Psychologist" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Professional Certification", name: "NGH International Trainer — National Guild of Hypnotists" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Professional Recognition", name: "EMR Krankenkasse Konform — ZSR Nr. P609264" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Method Development", name: "Developer of Aktiv-Hypnose© Method" },
    ],
    worksFor: {
      "@type": "Organization",
      name: "David J. Woods — Hypnose & Psychologie",
      url: BASE_URL,
      address: [
        { "@type": "PostalAddress", streetAddress: "Usteristrasse 23", addressLocality: "Zürich", postalCode: "8001", addressCountry: "CH" },
        { "@type": "PostalAddress", streetAddress: "Viktoria Str 3b", addressLocality: "Augsburg", postalCode: "86150", addressCountry: "DE" },
      ],
    },
    alumniOf: [
      { "@type": "EducationalOrganization", name: "National Guild of Hypnotists (NGH)", url: "https://ngh.net" },
    ],
    sameAs: [
      "https://www.google.com/maps/place/David+J.+Woods",
      "https://vimeo.com/davidjwoods",
    ],
    award: [
      "NGH International Trainer Certification",
      "EMR Health Insurance Recognition (Switzerland)",
    ],
  };

  /* ── Breadcrumb structured data ── */
  const breadcrumbJsonLd = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  } : null;

  /* ── Combine all JSON-LD ── */
  const allJsonLd = [
    ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [defaultJsonLd, personJsonLd]),
    ...(breadcrumbJsonLd ? [breadcrumbJsonLd] : []),
  ];

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang — properly localized slugs */}
      {pageKey && (
        <>
          <link rel="alternate" hrefLang="de-CH" href={buildUrl("de", "ch", pageKey)} />
          <link rel="alternate" hrefLang="de-DE" href={buildUrl("de", "de", pageKey)} />
          <link rel="alternate" hrefLang="en" href={buildUrl("en", "ch", pageKey)} />
          <link rel="alternate" hrefLang="x-default" href={buildUrl("de", "ch", pageKey)} />
        </>
      )}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={isEN ? "en_US" : (country === "de" ? "de_DE" : "de_CH")} />
      <meta property="og:site_name" content="David J. Woods — Hypnose & Psychologie" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* JSON-LD */}
      {allJsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
}
