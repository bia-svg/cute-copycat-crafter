import { useLanguage } from "@/contexts/LanguageContext";


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tv, Newspaper, Radio } from "lucide-react";

export default function TvMedien() {
  const { language, country, } = useLanguage();
  const isEN = language === "en";

  const mediaItems = [
    { type: "tv", title: "TV Augsburg", desc: isEN ? "Live demonstration of hypnosis techniques" : "Live-Demonstration von Hypnosetechniken", icon: <Tv className="w-5 h-5" /> },
    { type: "tv", title: "RTL / SAT.1", desc: isEN ? "Expert interview on hypnotherapy" : "Experteninterview zum Thema Hypnotherapie", icon: <Tv className="w-5 h-5" /> },
    { type: "press", title: "Augsburger Allgemeine", desc: isEN ? "Feature article on Aktiv-Hypnose©" : "Reportage über Aktiv-Hypnose©", icon: <Newspaper className="w-5 h-5" /> },
    { type: "radio", title: "Radio Augsburg", desc: isEN ? "Interview on stop smoking with hypnosis" : "Interview zum Thema Raucherentwöhnung mit Hypnose", icon: <Radio className="w-5 h-5" /> },
  ];

  return (
    <>
        title={isEN ? "TV & Media | David J. Woods Hypnotherapy" : "TV & Medien | Hypnose David J. Woods"}
        description={isEN ? "David J. Woods in TV and media. Expert interviews, live demonstrations and press coverage." : "David J. Woods in TV und Medien. Experteninterviews, Live-Demonstrationen und Presseberichte."}
      />

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-2">
            {isEN ? "TV & Media" : "TV & Medien"}
          </h1>
          <p className="text-base text-muted-foreground mb-8">
            {isEN ? "David J. Woods is a recognized expert in the media. Here is a selection of his appearances." : "David J. Woods ist ein anerkannter Experte in den Medien. Hier eine Auswahl seiner Auftritte."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mediaItems.map((item, i) => (
              <div key={i} className="border border-border p-5 bg-[#f4f3ef]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#1B3A5C]">{item.icon}</span>
                  <h3 className="font-semibold text-[#1B3A5C]">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#8b827c] text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Press Inquiries" : "Presseanfragen"}
          </h2>
          <p className="text-white/80 mb-6">
            {isEN ? "For media inquiries, please contact us directly." : "Für Medienanfragen kontaktieren Sie uns bitte direkt."}
          </p>
          <Link to={`/${language}/${country}/erstgespraech`}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3">
              {isEN ? "Contact" : "Kontakt"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
