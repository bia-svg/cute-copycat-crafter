import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOProps {
  titleDE: string;
  titleEN: string;
  descriptionDE: string;
  descriptionEN: string;
  path?: string;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = "https://david-j-woods.com";

export default function SEO({ titleDE, titleEN, descriptionDE, descriptionEN, path, jsonLd }: SEOProps) {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  const title = isEN ? titleEN : titleDE;
  const description = isEN ? descriptionEN : descriptionDE;
  const fullTitle = `${title} | David J. Woods`;
  const currentPath = path || `/${language}/${country}`;
  const canonicalUrl = `${BASE_URL}${currentPath}`;

  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "David J. Woods — Hypnose & Psychologie",
    description: descriptionDE,
    url: BASE_URL,
    telephone: ["+41 44 888 09 01", "+49 171 9539922"],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Usteristrasse 23",
        addressLocality: "Zürich",
        postalCode: "8001",
        addressCountry: "CH",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Viktoria Str 3b",
        addressLocality: "Augsburg",
        postalCode: "86150",
        addressCountry: "DE",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "255",
      bestRating: "5",
    },
    founder: {
      "@type": "Person",
      name: "David J. Woods",
      jobTitle: "Lic.Psych., Hypnotherapeut, NGH International Trainer",
    },
    areaServed: [
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Country", name: "Germany" },
    ],
    sameAs: [
      "https://www.google.com/maps/place/David+J.+Woods",
    ],
  };

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang for multi-region/multi-language */}
      <link rel="alternate" hrefLang="de-CH" href={`${BASE_URL}/de/ch${path?.replace(/^\/(de|en)\/(ch|de|int)/, "") || ""}`} />
      <link rel="alternate" hrefLang="de-DE" href={`${BASE_URL}/de/de${path?.replace(/^\/(de|en)\/(ch|de|int)/, "") || ""}`} />
      <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en/ch${path?.replace(/^\/(de|en)\/(ch|de|int)/, "") || ""}`} />
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/de/ch${path?.replace(/^\/(de|en)\/(ch|de|int)/, "") || ""}`} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={country === "de" ? "de_DE" : "de_CH"} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultJsonLd)}
      </script>
    </Helmet>
  );
}
