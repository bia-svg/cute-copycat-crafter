// Attribution capture: persists UTM params and Google Ads click identifiers (gclid/gbraid/wbraid)
// from the FIRST landing page into sessionStorage so they survive in-site navigation.
// Without this, leads submitted from any page other than the landing page lose all UTMs
// and get mis-classified as "organic" in the dashboard.

const KEY = "dw_attribution_v1";
const TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days (also stored in localStorage as backup)

export interface Attribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  landing_path: string | null;
  referrer: string | null;
  captured_at: number;
}

const empty = (): Attribution => ({
  utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null,
  gclid: null, gbraid: null, wbraid: null, landing_path: null, referrer: null, captured_at: 0,
});

function read(): Attribution | null {
  try {
    const s = sessionStorage.getItem(KEY) || localStorage.getItem(KEY);
    if (!s) return null;
    const parsed = JSON.parse(s) as Attribution;
    if (parsed.captured_at && Date.now() - parsed.captured_at > TTL_MS) return null;
    return parsed;
  } catch { return null; }
}

function write(a: Attribution) {
  try {
    const s = JSON.stringify(a);
    sessionStorage.setItem(KEY, s);
    localStorage.setItem(KEY, s);
  } catch { /* ignore */ }
}

/** Call once on app mount and on route changes. Captures UTM/gclid only if URL has them
 *  AND no attribution is already stored (first-touch attribution). */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  const p = url.searchParams;

  const incoming = {
    utm_source: p.get("utm_source"),
    utm_medium: p.get("utm_medium"),
    utm_campaign: p.get("utm_campaign"),
    utm_content: p.get("utm_content"),
    utm_term: p.get("utm_term"),
    gclid: p.get("gclid"),
    gbraid: p.get("gbraid"),
    wbraid: p.get("wbraid"),
  };

  const hasAny = Object.values(incoming).some(Boolean);
  if (!hasAny) return; // nothing to capture this hit

  const existing = read();
  // Last-non-direct touch: overwrite if new paid/utm hit comes in
  const next: Attribution = {
    ...empty(),
    ...(existing || {}),
    ...Object.fromEntries(Object.entries(incoming).filter(([, v]) => v)) as Partial<Attribution>,
    landing_path: existing?.landing_path || url.pathname,
    referrer: existing?.referrer || (document.referrer || null),
    captured_at: Date.now(),
  };
  write(next);
}

/** Read stored attribution merged with current URL params (URL wins). */
export function getAttribution(): Attribution {
  const stored = read() || empty();
  if (typeof window === "undefined") return stored;
  const p = new URL(window.location.href).searchParams;
  const fromUrl = {
    utm_source: p.get("utm_source"),
    utm_medium: p.get("utm_medium"),
    utm_campaign: p.get("utm_campaign"),
    utm_content: p.get("utm_content"),
    utm_term: p.get("utm_term"),
    gclid: p.get("gclid"),
    gbraid: p.get("gbraid"),
    wbraid: p.get("wbraid"),
  };
  return {
    ...stored,
    ...Object.fromEntries(Object.entries(fromUrl).filter(([, v]) => v)) as Partial<Attribution>,
  };
}

/** Classify lead source from attribution data. */
export function classifySource(a: Attribution): "paid" | "organic" | "referral" | "direct" {
  if (a.gclid || a.gbraid || a.wbraid) return "paid";
  const med = (a.utm_medium || "").toLowerCase();
  const src = (a.utm_source || "").toLowerCase();
  if (["cpc", "ppc", "paid", "paidsearch", "paid-search", "display", "cpm"].includes(med)) return "paid";
  if (med === "organic" || src === "google" && !med) return "organic";
  if (a.utm_source) return "referral";
  if (typeof document !== "undefined" && document.referrer) {
    try {
      const ref = new URL(document.referrer).hostname;
      if (ref && ref !== window.location.hostname) return "referral";
    } catch { /* ignore */ }
  }
  return "direct";
}
