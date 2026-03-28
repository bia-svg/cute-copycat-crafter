import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Erstgespraech from "@/pages/Erstgespraech";
import UeberUns from "@/pages/UeberUns";
import Kundenmeinungen from "@/pages/Kundenmeinungen";
import Ausbildung from "@/pages/Ausbildung";

import CityZurich from "@/pages/CityZurich";
import CityAugsburg from "@/pages/CityAugsburg";
import Standorte from "@/pages/Standorte";
import TvMedien from "@/pages/TvMedien";
import Erfolgsberichte from "@/pages/Erfolgsberichte";
import Terminbestaetigung from "@/pages/Terminbestaetigung";
import FirmenCoaching from "@/pages/FirmenCoaching";
import {
  ErfolgsTraining, ResilienzVerstaerken, StressPraevention, NichtraucherSeminare
} from "@/pages/corporate/index";
import { Impressum, Datenschutz, AGB } from "@/pages/Legal";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Buch from "@/pages/Buch";
import Dashboard from "@/pages/Dashboard";
import DashboardLogin from "@/pages/DashboardLogin";
import {
  SmokingPage, AnxietyPage, WeightPage,
  StressPage, DepressionPage, ChildrenPage, AdultsPage
} from "@/pages/services/index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // GTM virtual pageview for SPA
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "virtual_page_view",
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/de/ch" replace />} />

          {/* Home */}
          <Route path="/:lang/:country" element={<Home />} />

          {/* Services */}
          <Route path="/:lang/:country/raucherentwoehnung" element={<SmokingPage />} />
          <Route path="/:lang/:country/aengste-phobien" element={<AnxietyPage />} />
          <Route path="/:lang/:country/abnehmen" element={<WeightPage />} />
          <Route path="/:lang/:country/stress-burnout" element={<StressPage />} />
          <Route path="/:lang/:country/depressionen-traumata" element={<DepressionPage />} />
          <Route path="/:lang/:country/kinder-jugendliche" element={<ChildrenPage />} />
          <Route path="/:lang/:country/erwachsene" element={<AdultsPage />} />

          {/* Training & Corporate */}
          <Route path="/:lang/:country/ausbildung" element={<Ausbildung />} />
          <Route path="/:lang/:country/seminar-ablauf" element={<Navigate to={`/${window.location.pathname.split('/')[1]}/${window.location.pathname.split('/')[2]}/ausbildung#curriculum`} replace />} />
          <Route path="/:lang/:country/firmen-coaching" element={<FirmenCoaching />} />

          {/* About */}
          <Route path="/:lang/:country/ueber-uns" element={<UeberUns />} />
          <Route path="/:lang/:country/kundenmeinungen" element={<Kundenmeinungen />} />
          <Route path="/:lang/:country/erfolgsberichte" element={<Erfolgsberichte />} />
          <Route path="/:lang/:country/tv-medien" element={<TvMedien />} />

          {/* Contact */}
          <Route path="/:lang/:country/erstgespraech" element={<Erstgespraech />} />
          <Route path="/:lang/:country/terminbestaetigung" element={<Terminbestaetigung />} />

          {/* Locations */}
          <Route path="/:lang/:country/standorte" element={<Standorte />} />
          <Route path="/:lang/:country/hypnose-zuerich" element={<CityZurich />} />
          <Route path="/:lang/:country/hypnose-augsburg" element={<CityAugsburg />} />

          {/* Blog */}
          <Route path="/:lang/:country/blog" element={<Blog />} />
          <Route path="/:lang/:country/blog/:slug" element={<BlogPost />} />

          {/* Book */}
          <Route path="/:lang/:country/buch-go-inside" element={<Buch />} />

          {/* Legal */}
          <Route path="/:lang/:country/impressum" element={<Impressum />} />
          <Route path="/:lang/:country/datenschutz" element={<Datenschutz />} />
          <Route path="/:lang/:country/agb" element={<AGB />} />

          {/* Dashboard (internal, not linked anywhere) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/login" element={<DashboardLogin />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </LanguageProvider>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
