import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import BackToTop from "./BackToTop";
import CookieConsent from "./CookieConsent";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 relative z-0">{children}</main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <CookieConsent />
    </div>
  );
}
