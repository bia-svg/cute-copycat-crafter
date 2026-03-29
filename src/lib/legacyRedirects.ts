/**
 * Maps old site paths to new /de/de/ paths.
 * Defined as [pattern, target] tuples — checked in order, first match wins.
 * Patterns use startsWith logic unless exact.
 */

const defined = "/de/de";

// Exact and prefix-based redirects
const exactRedirects: Record<string, string> = {
  "/standorte-anfahrt": `${defined}/erstgespraech`,
  "/hypnose-ausbildungen": `${defined}/ausbildung`,
  "/Hypnose-Ausbildung-Deutschland": `${defined}/ausbildung`,
  "/Hypnose-Ausbildung-Schweiz": `${defined}/ausbildung`,
  "/hypnose/endlich-nichtraucher": `${defined}/raucherentwoehnung`,
  "/hypnose/stress-burnout": `${defined}/stress-burnout`,
  "/hypnose/depressionen-traumata": `${defined}/depressionen-traumata`,
  "/hypnose/aengste-phobien": `${defined}/aengste-phobien`,
  "/hypnose/kinder-jugendliche": `${defined}/kinder-jugendliche`,
  "/hypnose/abnehmen": `${defined}/abnehmen`,
  "/hypnose-sitzungen": `${defined}`,
  "/impressum": `${defined}/impressum`,
  "/datenschutzerklaerung": `${defined}/datenschutz`,
  "/ueber-david-j-woods": `${defined}/ueber-uns`,
  "/firmen-coaching": `${defined}/firmen-coaching`,
  "/business-coaching/erfolgs-training": `${defined}/firmen-coaching/erfolgs-training`,
  "/business-coaching/resilienz-verstaerken": `${defined}/firmen-coaching/resilienz-verstaerken`,
  "/business-coaching/stress-praevention": `${defined}/firmen-coaching/stress-praevention`,
  "/business-coaching/nichtraucher-seminare": `${defined}/firmen-coaching/nichtraucher-seminare`,
  "/kundenmeinungen": `${defined}/kundenmeinungen`,
  "/erfolgsberichte": `${defined}/erfolgsberichte`,
  "/tv-medien": `${defined}/tv-medien`,
  "/blog": `${defined}/blog`,
  "/terminbestaetigung": `${defined}/terminbestaetigung`,
  "/agb": `${defined}/agb`,
  "/agbs": `${defined}/agb`,
  "/standort-augsburg": `${defined}/hypnose-augsburg`,
  "/content/seminaranmeldung": `${defined}/seminar-anmeldung`,
  "/content/kontaktanfrage": `${defined}/erstgespraech`,
  "/ablauf-des-seminars": `${defined}/ausbildung`,
  "/lp-aktiv-hypnose": `${defined}/ausbildung`,
  "/shop": `${defined}`,
  "/wie-funktioniert-hypnose": `${defined}`,
  "/widerrufsrecht": `${defined}/agb`,
  "/versandarten": `${defined}`,
  "/warenkorb": `${defined}`,
  "/mein-konto": `${defined}`,
  "/cookies": `${defined}/datenschutz`,
  "/disclaimer": `${defined}/impressum`,
  "/vip": `${defined}`,
  "/user": `${defined}`,
  "/video-calls": `${defined}/erstgespraech`,
  "/intensiv-sitzung.html": `${defined}`,
  "/hypnoseinstitut-david-woods.html": `${defined}`,
  "/hypnose-tages-seminar-david-woods.html": `${defined}/ausbildung`,
  "/seminaranmeldung-ngh.html": `${defined}/seminar-anmeldung`,
  "/seminarraum-vermietung.html": `${defined}`,
  "/anmeldung-hypnose-praxis-workshop.html": `${defined}/seminar-anmeldung`,
  "/shop/hypnose-cd-insomnia.html": `${defined}`,
  "/shop/hypnose-cd-continental-drifts.html": `${defined}`,
  "/shop/hypnose-cd-ich-bin-ich.html": `${defined}`,
  "/portfolio/hypnose-bei-aengsten-phobien": `${defined}/aengste-phobien`,
  "/cmi-david-j-woods": `${defined}/ueber-uns`,
  "/cmh-randa-marina-augustin": `${defined}/ueber-uns`,
};

// Prefix-based redirects (order matters — more specific first)
const prefixRedirects: [string, string][] = [
  ["/business-coaching/", `${defined}/firmen-coaching`],
  ["/kundenmeinungen/", `${defined}/kundenmeinungen`],
  ["/erfolgsberichte/", `${defined}/erfolgsberichte`],
  ["/blog/referenz/", `${defined}/tv-medien`],
  ["/blog/", `${defined}/blog`],
  ["/product-category/", `${defined}/ausbildung`],
  ["/produkt-kategorie/", `${defined}/ausbildung`],
  ["/produkt/seminar-deutschland/", `${defined}/seminar-anmeldung`],
  ["/produkt/seminar-schweiz/", `${defined}/seminar-anmeldung`],
  ["/produkt/seminar/", `${defined}/seminar-anmeldung`],
  ["/produkt/hypnose-mp3", `${defined}`],
  ["/produkt/", `${defined}`],
  ["/seminare/", `${defined}/ausbildung`],
  ["/seminar/", `${defined}/ausbildung`],
  ["/author/", `${defined}/blog`],
  ["/sites/", `${defined}`],
  ["/hypnose/", `${defined}`],
];

/**
 * Returns the redirect target for a legacy path, or null if no match.
 */
export function getLegacyRedirect(pathname: string): string | null {
  // Strip trailing slash for matching (but keep "/" as-is)
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  // Also strip tel: suffixes from old broken links
  const withoutTel = clean.replace(/\/tel:[^/]*$/, "");

  // Check exact matches
  const exact = exactRedirects[withoutTel] || exactRedirects[clean];
  if (exact) return exact;

  // Check prefix matches
  for (const [prefix, target] of prefixRedirects) {
    if (withoutTel.startsWith(prefix) || clean.startsWith(prefix)) {
      return target;
    }
  }

  return null;
}
