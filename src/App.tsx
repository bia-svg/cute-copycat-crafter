import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { getLegacyRedirect } from "@/lib/legacyRedirects";
import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import { captureAttribution } from "@/lib/attribution";

// Eager-loaded: most-visited pages (no loading flash)
import Home from "@/pages/Home";
import Erstgespraech from "@/pages/Erstgespraech";
import { SmokingPage, AnxietyPage, WeightPage, StressPage, DepressionPage, ChildrenPage, AdultsPage } from "@/pages/services/index";

// Retry dynamic imports once, then force a one-time reload on stale chunk errors
// (typical after a new deploy invalidates previously cached JS chunk filenames).
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (err: any) {
      const msg = String(err?.message || "");
      const isChunkError =
        /Importing a module script failed|Failed to fetch dynamically imported module|Loading chunk|ChunkLoadError/i.test(
          msg
        );
      if (isChunkError && typeof window !== "undefined") {
        const key = "dw_chunk_reloaded";
        if (!sessionStorage.getItem(key)) {
          sessionStorage.setItem(key, "1");
          window.location.reload();
          // Return a never-resolving promise so React doesn't render an error while reloading.
          return new Promise(() => {}) as any;
        }
      }
      throw err;
    }
  });
}

// Lazy-loaded: less-visited pages
const UeberUns = lazyWithRetry(() => import("@/pages/UeberUns"));
const Kundenmeinungen = lazyWithRetry(() => import("@/pages/Kundenmeinungen"));
const Ausbildung = lazyWithRetry(() => import("@/pages/Ausbildung"));
const CityZurich = lazyWithRetry(() => import("@/pages/CityZurich"));
const CityAugsburg = lazyWithRetry(() => import("@/pages/CityAugsburg"));
const Standorte = lazyWithRetry(() => import("@/pages/Standorte"));
const TvMedien = lazyWithRetry(() => import("@/pages/TvMedien"));
const Erfolgsberichte = lazyWithRetry(() => import("@/pages/Erfolgsberichte"));
const Teilnehmerstimmen = lazyWithRetry(() => import("@/pages/Teilnehmerstimmen"));
const AusbildungsinstitutVideos = lazyWithRetry(() => import("@/pages/AusbildungsinstitutVideos"));
const SeminareUebersicht = lazyWithRetry(() => import("@/pages/SeminareUebersicht"));
const SitzungenUebersicht = lazyWithRetry(() => import("@/pages/SitzungenUebersicht"));
const Terminbestaetigung = lazyWithRetry(() => import("@/pages/Terminbestaetigung"));
const SeminarAnmeldung = lazyWithRetry(() => import("@/pages/SeminarAnmeldung"));
const OnlineBeratung = lazyWithRetry(() => import("@/pages/OnlineBeratung"));
const FirmenCoaching = lazyWithRetry(() => import("@/pages/FirmenCoaching"));
const Blog = lazyWithRetry(() => import("@/pages/Blog"));
const BlogPost = lazyWithRetry(() => import("@/pages/BlogPost"));
const Buch = lazyWithRetry(() => import("@/pages/Buch"));
const Dashboard = lazyWithRetry(() => import("@/pages/Dashboard"));
const WieFunktioniertHypnose = lazyWithRetry(() => import("@/pages/WieFunktioniertHypnose"));
const DashboardLogin = lazyWithRetry(() => import("@/pages/DashboardLogin"));
const DashboardResetPassword = lazyWithRetry(() => import("@/pages/DashboardResetPassword"));
const NotFound = lazyWithRetry(() => import("@/pages/NotFound"));
const Unsubscribe = lazyWithRetry(() => import("@/pages/Unsubscribe"));

const ErfolgsTraining = lazyWithRetry(() => import("@/pages/corporate/ErfolgsTraining"));
const ResilienzVerstaerken = lazyWithRetry(() => import("@/pages/corporate/ResilienzVerstaerken"));
const StressPraevention = lazyWithRetry(() => import("@/pages/corporate/StressPraevention"));
const NichtraucherSeminare = lazyWithRetry(() => import("@/pages/corporate/NichtraucherSeminare"));

const LegalModule = lazyWithRetry(() => import("@/pages/Legal").then(m => ({ default: m.Impressum })));
const DatenschutzPage = lazyWithRetry(() => import("@/pages/Legal").then(m => ({ default: m.Datenschutz })));
const AGBPage = lazyWithRetry(() => import("@/pages/Legal").then(m => ({ default: m.AGB })));

function LegacyRedirect() {
  const location = useLocation();
  const target = getLegacyRedirect(location.pathname);
  if (target) return <Navigate to={target} replace />;
  return null;
}

function GeoRedirect() {
  const [target, setTarget] = useState("/de/int");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language || (navigator as any).userLanguage || "de";
    const lang = browserLang.toLowerCase().startsWith("en") ? "en" : "de";

    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(data => {
        const cc = (data.country_code || "").toUpperCase();
        if (cc === "CH" || cc === "LI") setTarget(`/${lang}/ch`);
        else if (cc === "DE" || cc === "AT") setTarget(`/${lang}/de`);
        else setTarget(`/${lang}/int`);
      })
      .catch(() => setTarget(`/${lang}/int`))
      .finally(() => setReady(true));
  }, []);

  if (!ready) return null;
  return <Navigate to={target} replace />;
}

// Disable browser's automatic scroll restoration so refresh/back always starts at top
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  try { window.history.scrollRestoration = "manual"; } catch {}
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const isFirstLoad = (typeof window !== "undefined") && !(window as any).__dwScrollInit;

  useEffect(() => {
    captureAttribution();
    const prevPage = sessionStorage.getItem("dw_current_page");
    if (prevPage) sessionStorage.setItem("dw_prev_page", prevPage);
    sessionStorage.setItem("dw_current_page", pathname);

    // On initial load (refresh / direct visit / back-navigation reload):
    // always start at the top and strip any hash from the URL.
    if (isFirstLoad) {
      (window as any).__dwScrollInit = true;
      if (window.location.hash) {
        try {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        } catch {}
      }
      window.scrollTo(0, 0);
    } else if (hash) {
      const scrollToHash = (attempt = 0) => {
        const el = document.querySelector(hash) as HTMLElement | null;
        if (!el) {
          if (attempt < 10) setTimeout(() => scrollToHash(attempt + 1), 100);
          else window.scrollTo(0, 0);
          return;
        }
        const header = document.querySelector("header") as HTMLElement | null;
        const headerH = header ? header.getBoundingClientRect().height : 0;
        const top = el.getBoundingClientRect().top + window.scrollY - headerH + 152;
        window.scrollTo({ top, behavior: "smooth" });
      };
      setTimeout(() => scrollToHash(), 100);
    } else {
      window.scrollTo(0, 0);
    }
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "virtual_page_view",
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname, hash]);
  return null;
}

function PageFallback() {
  return <div className="min-h-[50vh]" />;
}

function AppRoutes() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <LegacyRedirect />
          <Routes>
            <Route path="/" element={<GeoRedirect />} />
            <Route path="/:lang/:country" element={<Home />} />

            <Route path="/:lang/:country/raucherentwoehnung" element={<SmokingPage />} />
            <Route path="/:lang/:country/aengste-phobien" element={<AnxietyPage />} />
            <Route path="/:lang/:country/abnehmen" element={<WeightPage />} />
            <Route path="/:lang/:country/stress-burnout" element={<StressPage />} />
            <Route path="/:lang/:country/depressionen-traumata" element={<DepressionPage />} />
            <Route path="/:lang/:country/kinder-jugendliche" element={<ChildrenPage />} />
            <Route path="/:lang/:country/erwachsene" element={<AdultsPage />} />

            <Route path="/:lang/:country/stop-smoking" element={<SmokingPage />} />
            <Route path="/:lang/:country/anxiety-phobias" element={<AnxietyPage />} />
            <Route path="/:lang/:country/weight-loss" element={<WeightPage />} />
            <Route path="/:lang/:country/depression-trauma" element={<DepressionPage />} />
            <Route path="/:lang/:country/children-teens" element={<ChildrenPage />} />
            <Route path="/:lang/:country/adults" element={<AdultsPage />} />

            <Route path="/:lang/:country/ausbildung" element={<Ausbildung />} />
            <Route path="/:lang/:country/seminar-ablauf" element={<Navigate to={`/${window.location.pathname.split('/')[1]}/${window.location.pathname.split('/')[2]}/ausbildung#curriculum`} replace />} />
            <Route path="/:lang/:country/firmen-coaching" element={<FirmenCoaching />} />
            <Route path="/:lang/:country/firmen-coaching/erfolgs-training" element={<ErfolgsTraining />} />
            <Route path="/:lang/:country/firmen-coaching/resilienz-verstaerken" element={<ResilienzVerstaerken />} />
            <Route path="/:lang/:country/firmen-coaching/stress-praevention" element={<StressPraevention />} />
            <Route path="/:lang/:country/firmen-coaching/nichtraucher-seminare" element={<NichtraucherSeminare />} />

            <Route path="/:lang/:country/training" element={<Ausbildung />} />
            <Route path="/:lang/:country/seminare-uebersicht" element={<SeminareUebersicht />} />
            <Route path="/:lang/:country/seminars-overview" element={<SeminareUebersicht />} />
            <Route path="/:lang/:country/hypnose-sitzungen-uebersicht" element={<SitzungenUebersicht />} />
            <Route path="/:lang/:country/hypnosis-sessions-overview" element={<SitzungenUebersicht />} />
            <Route path="/:lang/:country/teilnehmerstimmen" element={<Teilnehmerstimmen />} />
            <Route path="/:lang/:country/participant-voices" element={<Teilnehmerstimmen />} />
            <Route path="/:lang/:country/ausbildungsinstitut-videos" element={<AusbildungsinstitutVideos />} />
            <Route path="/:lang/:country/training-institute-videos" element={<AusbildungsinstitutVideos />} />
            <Route path="/:lang/:country/seminar-schedule" element={<Navigate to={`/${window.location.pathname.split('/')[1]}/${window.location.pathname.split('/')[2]}/training#curriculum`} replace />} />
            <Route path="/:lang/:country/business-coaching" element={<FirmenCoaching />} />
            <Route path="/:lang/:country/business-coaching/success-training" element={<ErfolgsTraining />} />
            <Route path="/:lang/:country/business-coaching/resilience-building" element={<ResilienzVerstaerken />} />
            <Route path="/:lang/:country/business-coaching/stress-prevention" element={<StressPraevention />} />
            <Route path="/:lang/:country/business-coaching/non-smoker-seminars" element={<NichtraucherSeminare />} />

            <Route path="/:lang/:country/ueber-uns" element={<UeberUns />} />
            <Route path="/:lang/:country/kundenmeinungen" element={<Kundenmeinungen />} />
            <Route path="/:lang/:country/erfolgsberichte" element={<Erfolgsberichte />} />
            <Route path="/:lang/:country/tv-medien" element={<TvMedien />} />

            <Route path="/:lang/:country/about-us" element={<UeberUns />} />
            <Route path="/:lang/:country/testimonials" element={<Kundenmeinungen />} />
            <Route path="/:lang/:country/success-stories" element={<Erfolgsberichte />} />
            <Route path="/:lang/:country/tv-media" element={<TvMedien />} />

            <Route path="/:lang/:country/erstgespraech" element={<Erstgespraech />} />
            <Route path="/:lang/:country/terminbestaetigung" element={<Terminbestaetigung />} />
            <Route path="/:lang/:country/seminar-anmeldung" element={<SeminarAnmeldung />} />
            <Route path="/:lang/:country/consultation" element={<Erstgespraech />} />
            <Route path="/:lang/:country/appointment-confirmation" element={<Terminbestaetigung />} />
            <Route path="/:lang/:country/seminar-registration" element={<SeminarAnmeldung />} />
            <Route path="/:lang/:country/online-psychologische-beratung" element={<OnlineBeratung />} />
            <Route path="/:lang/:country/online-psychological-consultation" element={<OnlineBeratung />} />
            <Route path="/:lang/:country/online-beratung" element={<OnlineBeratung />} />
            <Route path="/:lang/:country/online-consultation" element={<OnlineBeratung />} />
            <Route path="/:lang/:country/appointment-confirmation" element={<Terminbestaetigung />} />

             <Route path="/:lang/:country/standorte" element={<Navigate to="/de/de/erstgespraech" replace />} />
            <Route path="/:lang/:country/hypnose-zuerich" element={<CityZurich />} />
            <Route path="/:lang/:country/hypnose-augsburg" element={<CityAugsburg />} />
            <Route path="/:lang/:country/locations" element={<Navigate to="/de/de/erstgespraech" replace />} />
            <Route path="/:lang/:country/hypnosis-zurich" element={<CityZurich />} />
            <Route path="/:lang/:country/hypnosis-augsburg" element={<CityAugsburg />} />

            <Route path="/:lang/:country/blog" element={<Blog />} />
            <Route path="/:lang/:country/blog/:slug" element={<BlogPost />} />

            <Route path="/:lang/:country/buch-go-inside" element={<Buch />} />
            <Route path="/:lang/:country/book-go-inside" element={<Buch />} />

            <Route path="/:lang/:country/wie-funktioniert-hypnose" element={<WieFunktioniertHypnose />} />
            <Route path="/:lang/:country/how-hypnosis-works" element={<WieFunktioniertHypnose />} />

            <Route path="/:lang/:country/impressum" element={<LegalModule />} />
            <Route path="/:lang/:country/datenschutz" element={<DatenschutzPage />} />
            <Route path="/:lang/:country/agb" element={<AGBPage />} />
            <Route path="/:lang/:country/imprint" element={<LegalModule />} />
            <Route path="/:lang/:country/privacy-policy" element={<DatenschutzPage />} />
            <Route path="/:lang/:country/terms" element={<AGBPage />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/login" element={<DashboardLogin />} />
            <Route path="/dashboard/reset-password" element={<DashboardResetPassword />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </LanguageProvider>
  );
}

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <Toaster position="top-right" richColors />
  </HelmetProvider>
);

export default App;
