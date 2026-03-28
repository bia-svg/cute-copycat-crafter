import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";

// Lazy-loaded pages for code splitting
const Erstgespraech = lazy(() => import("@/pages/Erstgespraech"));
const UeberUns = lazy(() => import("@/pages/UeberUns"));
const Kundenmeinungen = lazy(() => import("@/pages/Kundenmeinungen"));
const Ausbildung = lazy(() => import("@/pages/Ausbildung"));
const CityZurich = lazy(() => import("@/pages/CityZurich"));
const CityAugsburg = lazy(() => import("@/pages/CityAugsburg"));
const Standorte = lazy(() => import("@/pages/Standorte"));
const TvMedien = lazy(() => import("@/pages/TvMedien"));
const Erfolgsberichte = lazy(() => import("@/pages/Erfolgsberichte"));
const Terminbestaetigung = lazy(() => import("@/pages/Terminbestaetigung"));
const FirmenCoaching = lazy(() => import("@/pages/FirmenCoaching"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Buch = lazy(() => import("@/pages/Buch"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const DashboardLogin = lazy(() => import("@/pages/DashboardLogin"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const ErfolgsTraining = lazy(() => import("@/pages/corporate/ErfolgsTraining"));
const ResilienzVerstaerken = lazy(() => import("@/pages/corporate/ResilienzVerstaerken"));
const StressPraevention = lazy(() => import("@/pages/corporate/StressPraevention"));
const NichtraucherSeminare = lazy(() => import("@/pages/corporate/NichtraucherSeminare"));

const LegalModule = lazy(() => import("@/pages/Legal").then(m => ({ default: m.Impressum })));
const DatenschutzPage = lazy(() => import("@/pages/Legal").then(m => ({ default: m.Datenschutz })));
const AGBPage = lazy(() => import("@/pages/Legal").then(m => ({ default: m.AGB })));

const SmokingPage = lazy(() => import("@/pages/services/index").then(m => ({ default: m.SmokingPage })));
const AnxietyPage = lazy(() => import("@/pages/services/index").then(m => ({ default: m.AnxietyPage })));
const WeightPage = lazy(() => import("@/pages/services/index").then(m => ({ default: m.WeightPage })));
const StressPage = lazy(() => import("@/pages/services/index").then(m => ({ default: m.StressPage })));
const DepressionPage = lazy(() => import("@/pages/services/index").then(m => ({ default: m.DepressionPage })));
const ChildrenPage = lazy(() => import("@/pages/services/index").then(m => ({ default: m.ChildrenPage })));
const AdultsPage = lazy(() => import("@/pages/services/index").then(m => ({ default: m.AdultsPage })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "virtual_page_view",
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);
  return null;
}

function PageFallback() {
  return <div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
}

function AppRoutes() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/de/ch" replace />} />
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
            <Route path="/:lang/:country/consultation" element={<Erstgespraech />} />
            <Route path="/:lang/:country/appointment-confirmation" element={<Terminbestaetigung />} />

            <Route path="/:lang/:country/standorte" element={<Standorte />} />
            <Route path="/:lang/:country/hypnose-zuerich" element={<CityZurich />} />
            <Route path="/:lang/:country/hypnose-augsburg" element={<CityAugsburg />} />
            <Route path="/:lang/:country/locations" element={<Standorte />} />
            <Route path="/:lang/:country/hypnosis-zurich" element={<CityZurich />} />
            <Route path="/:lang/:country/hypnosis-augsburg" element={<CityAugsburg />} />

            <Route path="/:lang/:country/blog" element={<Blog />} />
            <Route path="/:lang/:country/blog/:slug" element={<BlogPost />} />

            <Route path="/:lang/:country/buch-go-inside" element={<Buch />} />
            <Route path="/:lang/:country/book-go-inside" element={<Buch />} />

            <Route path="/:lang/:country/impressum" element={<LegalModule />} />
            <Route path="/:lang/:country/datenschutz" element={<DatenschutzPage />} />
            <Route path="/:lang/:country/agb" element={<AGBPage />} />
            <Route path="/:lang/:country/imprint" element={<LegalModule />} />
            <Route path="/:lang/:country/privacy-policy" element={<DatenschutzPage />} />
            <Route path="/:lang/:country/terms" element={<AGBPage />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/login" element={<DashboardLogin />} />

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
  </HelmetProvider>
);

export default App;
