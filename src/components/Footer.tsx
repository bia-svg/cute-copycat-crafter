import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import { Phone, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

export default function Footer() {
  const { language, country, t } = useLanguage();
  const isEN = language === "en";
  const [institutesOpen, setInstitutesOpen] = useState(false);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-main py-12">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
          {/* Logo & Info + Institutes (stacked on desktop) */}
          <div className="space-y-6">
            {/* Logo */}
            <div>
              <img src={CDN.logo} alt="David J. Woods – Hypnose und Psychologie Logo" className="h-11 w-auto brightness-0 invert mb-4" width={180} height={44} loading="lazy" />
              <p className="text-sm opacity-80">
                {isEN ? "Aktiv-Hypnose© — Psychology and Hypnotherapy for lasting change." : "Aktiv-Hypnose© — Psychologie und Hypnotherapie für nachhaltige Veränderung."}
              </p>
            </div>

            {/* Institutes accordion - below logo */}
            <div>
              <button
                onClick={() => setInstitutesOpen(!institutesOpen)}
                className="flex items-center gap-2 font-semibold mb-2 w-full text-left hover:opacity-90 transition-opacity"
                aria-expanded={institutesOpen}
              >
                <span>{isEN ? "Main Institutes in Germany and Switzerland" : "Hauptstandorte in Deutschland und der Schweiz"}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${institutesOpen ? "rotate-180" : ""}`} />
              </button>

              {institutesOpen && (
                <div className="space-y-4 text-sm opacity-80 mt-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                  {/* Germany */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base" role="img" aria-label="Germany">🇩🇪</span>
                      <span className="font-medium opacity-100">{isEN ? "Germany" : "Deutschland"}</span>
                      <a href="tel:+491719539922" className="flex items-center gap-1 hover:underline ml-auto text-xs">
                        <Phone className="w-3 h-3" /> +49 171 953 99 22
                      </a>
                    </div>
                    <div className="pl-6">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium opacity-100">Augsburg</div>
                          <div>Regus, Viktoria Str. 3b, 2. OG</div>
                          <div>86150 Augsburg</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Switzerland */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base" role="img" aria-label="Switzerland">🇨🇭</span>
                      <span className="font-medium opacity-100">{isEN ? "Switzerland" : "Schweiz"}</span>
                      <a href="tel:+41791318878" className="flex items-center gap-1 hover:underline ml-auto text-xs">
                        <Phone className="w-3 h-3" /> +41 79 131 88 78
                      </a>
                    </div>
                    <div className="space-y-2 pl-6">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium opacity-100">Zürich</div>
                          <div>5 Elements TCM GmbH, Beim Löwenplatz</div>
                          <div>Usteristrasse 23, 8001 Zürich</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium opacity-100">Eschenbach</div>
                          <div>Fit+Gsund, Churzhaslen 3</div>
                          <div>8733 Eschenbach (am Zürichsee)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{isEN ? "Quick Links" : "Schnellzugriff"}</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm opacity-80">
              {/* About Us */}
              <div>
                <h5 className="inline-block bg-primary-foreground/15 text-primary-foreground px-2.5 py-1 rounded text-[11px] uppercase tracking-wider font-semibold mb-2">{isEN ? "About Us" : "Über uns"}</h5>
                <div className="space-y-1">
                  <Link to={getPath("about", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "David J. Woods & Team" : "David J. Woods & Team"}</Link>
                  <Link to={getPath("media", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "TV & Media" : "TV & Medien"}</Link>
                  <Link to={getPath("successStories", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "Success Stories" : "Erfolgsberichte"}</Link>
                  <Link to={getPath("blog", language, country)} className="block hover:underline hover:opacity-100">Blog</Link>
                  <Link to={getPath("testimonials", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "Testimonials" : "Kundenmeinungen"}</Link>
                </div>
              </div>

              {/* Business & Training */}
              <div className="space-y-4">
                <div>
                  <h5 className="inline-block bg-primary-foreground/15 text-primary-foreground px-2.5 py-1 rounded text-[11px] uppercase tracking-wider font-semibold mb-2">{isEN ? "Business Coaching" : "Firmencoaching"}</h5>
                  <Link to={getPath("corporate", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "All Corporate Programs" : "Alle Firmenprogramme"}</Link>
                </div>
                <div>
                  <h5 className="inline-block bg-primary-foreground/15 text-primary-foreground px-2.5 py-1 rounded text-[11px] uppercase tracking-wider font-semibold mb-2">{isEN ? "Training" : "Ausbildung"}</h5>
                  <Link to={getPath("training", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "Learn to Be a Hypnotherapist" : "Hypnosetherapeut werden"}</Link>
                </div>
              </div>

              {/* Hypnotherapy */}
              <div className="col-span-2">
                <h5 className="inline-block bg-primary-foreground/15 text-primary-foreground px-2.5 py-1 rounded text-[11px] uppercase tracking-wider font-semibold mb-2 max-md:mx-auto max-md:block max-md:text-center max-md:w-fit">{isEN ? "Hypnotherapy" : "Hypnosetherapie"}</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                  <Link to={getPath("smoking", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "Stop Smoking" : "Raucherentwöhnung"}</Link>
                  <Link to={getPath("stress", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "Stress & Burnout" : "Stress & Burnout"}</Link>
                  <Link to={getPath("anxiety", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "Anxiety & Phobias" : "Ängste & Phobien"}</Link>
                  <Link to={getPath("depression", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "Depression & Trauma" : "Depressionen & Traumata"}</Link>
                  <Link to={getPath("weight", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "Weight Loss" : "Abnehmen"}</Link>
                  <Link to={getPath("adults", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "Adults / Individual Sessions" : "Erwachsene / Einzelsitzungen"}</Link>
                  <Link to={getPath("children", language, country)} className="block hover:underline hover:opacity-100">{isEN ? "Children & Teens" : "Kinder & Jugendliche"}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-70">
          <div>© {new Date().getFullYear()} David J. Woods. {t("footer.rights")}</div>
          <div className="flex items-center gap-4">
            <Link to={getPath("impressum", language, country)} className="hover:underline">{t("footer.impressum")}</Link>
            <Link to={getPath("privacy", language, country)} className="hover:underline">{t("footer.datenschutz")}</Link>
            <Link to={getPath("terms", language, country)} className="hover:underline">{t("footer.agb")}</Link>
            <Link to={`/${language}/${country}/terminbestaetigung`} className="opacity-30 hover:opacity-70 transition-opacity text-[10px]">
              {isEN ? "Appointment Confirmation" : "Terminbestätigung"}
            </Link>
            <span className="w-px h-3 bg-primary-foreground/30" />
            <a href="https://de.linkedin.com/in/david-j-woods-85b30b186/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-100 transition-opacity">
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/hypnoseinstitut_woods/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-100 transition-opacity">
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="border-t border-primary-foreground/20 mt-6 pt-4 text-xs text-center opacity-60 max-w-3xl mx-auto">
          Wir weisen ausdrücklich darauf hin, dass unsere Tätigkeit NICHT die Tätigkeit eines Arztes, Psychiaters oder Heilpraktikers ersetzt. Wir behandeln weder Krankheiten noch stellen wir medizinische Diagnosen.
        </div>
      </div>
    </footer>
  );
}
