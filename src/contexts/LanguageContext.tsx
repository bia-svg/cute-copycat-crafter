import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Language = "de" | "en";
export type Country = "ch" | "de" | "int";

interface LanguageContextType {
  language: Language;
  country: Country;
  setLanguage: (l: Language) => void;
  setCountry: (c: Country) => void;
  t: (key: string) => string;
  isSwiss: boolean;
  isGerman: boolean;
  isInternational: boolean;
  showCH: boolean;
  showDE: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

const translations: Record<string, Record<Language, string>> = {
  "nav.home": { de: "Home", en: "Home" },
  "nav.sessions": { de: "Sitzungen", en: "Sessions" },
  "nav.training": { de: "Ausbildung", en: "Training" },
  "nav.locations": { de: "Standorte", en: "Locations" },
  "nav.about": { de: "Über uns", en: "About Us" },
  "nav.cta": { de: "Kostenloses Erstgespräch", en: "Free Discovery Call" },
  "nav.contact": { de: "Kontakt", en: "Contact" },

  "service.smoking": { de: "Raucherentwöhnung", en: "Stop Smoking" },
  "service.anxiety": { de: "Ängste & Phobien", en: "Anxiety & Phobias" },
  "service.weight": { de: "Abnehmen", en: "Weight Loss" },
  "service.stress": { de: "Stress & Burnout", en: "Stress & Burnout" },
  "service.depression": { de: "Depressionen & Traumata", en: "Depression & Trauma" },
  "service.children": { de: "Kinder & Jugendliche", en: "Children & Teens" },
  "service.corporate": { de: "Firmencoaching", en: "Corporate Coaching" },

  "section.services": { de: "Intensiv Einzelsitzungen", en: "Intensive Individual Sessions" },
  "section.training": { de: "Intensiv-Ausbildungen · Aktiv-Hypnose© Therapeuten-Diplom", en: "Intensive Training · Aktiv-Hypnose© Therapist Diploma" },
  "section.shop": { de: "Onlineshop für Ihre Selbsthypnose", en: "Online Shop for Self-Hypnosis" },

  "footer.impressum": { de: "Impressum", en: "Legal Notice" },
  "footer.datenschutz": { de: "Datenschutz", en: "Privacy Policy" },
  "footer.agb": { de: "AGB", en: "Terms" },
  "footer.rights": { de: "Alle Rechte vorbehalten.", en: "All rights reserved." },

  "country.ch": { de: "Schweiz", en: "Switzerland" },
  "country.de": { de: "Deutschland", en: "Germany" },
  "country.int": { de: "International", en: "International" },
};

function detectFromPath(path: string): { language: Language; country: Country } {
  const parts = path.split("/").filter(Boolean);
  const lang = (parts[0] === "en" ? "en" : "de") as Language;
  const countryPart = parts[1];
  let country: Country = "ch";
  if (countryPart === "de") country = "de";
  else if (countryPart === "int") country = "int";
  return { language: lang, country };
}

function getSlugFromPath(path: string): string {
  const parts = path.split("/").filter(Boolean);
  return parts.slice(2).join("/");
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguageState] = useState<Language>(() => detectFromPath(window.location.pathname).language);
  const [country, setCountryState] = useState<Country>(() => detectFromPath(window.location.pathname).country);

  useEffect(() => {
    const detected = detectFromPath(location.pathname);
    if (detected.language !== language) setLanguageState(detected.language);
    if (detected.country !== country) setCountryState(detected.country);
  }, [location.pathname]);

  const setLanguage = useCallback((newLang: Language) => {
    if (newLang === language) return;
    const slug = getSlugFromPath(location.pathname);
    const newPath = `/${newLang}/${country}${slug ? `/${slug}` : ""}`;
    setLanguageState(newLang);
    navigate(newPath);
  }, [language, country, location.pathname, navigate]);

  const setCountry = useCallback((newCountry: Country) => {
    if (newCountry === country) return;
    const slug = getSlugFromPath(location.pathname);
    const newPath = `/${language}/${newCountry}${slug ? `/${slug}` : ""}`;
    setCountryState(newCountry);
    navigate(newPath);
  }, [language, country, location.pathname, navigate]);

  const t = useCallback((key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry["de"] || key;
  }, [language]);

  const isSwiss = country === "ch";
  const isGerman = country === "de";
  const isInternational = country === "int";
  const showCH = country === "ch" || country === "int";
  const showDE = country === "de" || country === "int";

  return (
    <LanguageContext.Provider value={{
      language, country, setLanguage, setCountry, t,
      isSwiss, isGerman, isInternational, showCH, showDE,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}
