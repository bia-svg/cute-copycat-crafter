import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ComingSoon from "@/pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <LanguageProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/de/ch" replace />} />
          <Route path="/:lang/:country" element={<Home />} />
          <Route path="/:lang/:country/*" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </LanguageProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
