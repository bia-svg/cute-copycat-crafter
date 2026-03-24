import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";
import { CDN } from "@/lib/cdn";
import { Phone, MapPin } from "lucide-react";

export default function Footer() {
  const { language, country, t, showCH, showDE } = useLanguage();
  const isEN = language === "en";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-main py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo & Info */}
          <div>
            <img src={CDN.logo} alt="David J. Woods" className="h-10 brightness-0 invert mb-4" />
            <p className="text-sm opacity-80">
              {isEN ? "Aktiv-Hypnose© — Psychology and Hypnotherapy for lasting change." : "Aktiv-Hypnose© — Psychologie und Hypnotherapie für nachhaltige Veränderung."}
            </p>
            <div className="flex gap-3 mt-4">
              {showCH && <img src={CDN.emrBadge} alt="EMR" className="h-10 bg-primary-foreground/10 rounded p-1" />}
              <img src={CDN.nghBadge} alt="NGH" className="h-10 bg-primary-foreground/10 rounded p-1" />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">{isEN ? "Contact" : "Kontakt"}</h4>
            <div className="space-y-2 text-sm opacity-80">
              {showCH && (
                <>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium opacity-100">Zürich</div>
                      <div>5 Elements TCM GmbH, Beim Löwenplatz</div>
                      <div>Usteristrasse 23, 8001 Zürich</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium opacity-100">Eschenbach</div>
                      <div>Fit+Gsund, Churzhaslen 3</div>
                      <div>8733 Eschenbach (am Zürichsee)</div>
                    </div>
                  </div>
                  <a href="tel:+41448880901" className="flex items-center gap-1 mt-1 hover:underline">
                    <Phone className="w-3 h-3" /> +41 44 888 09 01
                  </a>
                </>
              )}
              {showDE && (
                <div className="flex items-start gap-2 mt-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium opacity-100">Augsburg</div>
                    <div>Regus, Viktoria Str. 3b, 2. OG</div>
                    <div>86150 Augsburg</div>
                    <a href="tel:+491719539922" className="flex items-center gap-1 mt-1 hover:underline">
                      <Phone className="w-3 h-3" /> +49 171 9539922
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3">{isEN ? "Quick Links" : "Schnellzugriff"}</h4>
            <div className="space-y-2 text-sm opacity-80">
              <Link to={getPath("about", language, country)} className="block hover:underline hover:opacity-100">
                {t("nav.about")}
              </Link>
              <Link to={getPath("contact", language, country)} className="block hover:underline hover:opacity-100">
                {t("nav.cta")}
              </Link>
              <Link to={getPath("training", language, country)} className="block hover:underline hover:opacity-100">
                {t("nav.training")}
              </Link>
              <Link to={getPath("shop", language, country)} className="block hover:underline hover:opacity-100">
                Shop
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-70">
          <div>© {new Date().getFullYear()} David J. Woods. {t("footer.rights")}</div>
          <div className="flex gap-4">
            <Link to={getPath("impressum", language, country)} className="hover:underline">{t("footer.impressum")}</Link>
            <Link to={getPath("privacy", language, country)} className="hover:underline">{t("footer.datenschutz")}</Link>
            <Link to={getPath("terms", language, country)} className="hover:underline">{t("footer.agb")}</Link>
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
