import { useLanguage } from "@/contexts/LanguageContext";


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Anna M.", location: "Zürich", rating: 5, textDE: "Ich habe nach nur einer Sitzung mit dem Rauchen aufgehört. Unglaublich! Herr Woods hat eine sehr professionelle und einfühlsame Art.", textEN: "I quit smoking after just one session. Incredible! Mr. Woods has a very professional and empathetic approach." },
  { name: "Thomas K.", location: "Augsburg", rating: 5, textDE: "Meine Flugangst ist nach zwei Sitzungen komplett verschwunden. Ich kann es kaum glauben, aber ich freue mich jetzt sogar auf Flugreisen.", textEN: "My fear of flying completely disappeared after two sessions. I can hardly believe it, but I'm actually looking forward to flying now." },
  { name: "Sandra L.", location: "München", rating: 5, textDE: "Endlich konnte ich mein Gewicht dauerhaft reduzieren. Keine Diät hat so nachhaltig gewirkt wie die Hypnose bei Herrn Woods.", textEN: "I was finally able to permanently reduce my weight. No diet has worked as sustainably as hypnosis with Mr. Woods." },
  { name: "Michael R.", location: "Bern", rating: 5, textDE: "Die Stressreduktion durch Hypnose hat mein Leben verändert. Ich schlafe wieder durch und kann mich viel besser konzentrieren.", textEN: "The stress reduction through hypnosis has changed my life. I sleep through the night again and can concentrate much better." },
  { name: "Petra W.", location: "Stuttgart", rating: 5, textDE: "Herr Woods ist ein absoluter Profi. Seine Methode ist fundiert und die Ergebnisse sprechen für sich. Sehr empfehlenswert!", textEN: "Mr. Woods is an absolute professional. His method is well-founded and the results speak for themselves. Highly recommended!" },
  { name: "Christian B.", location: "Luzern", rating: 5, textDE: "Ich war anfangs skeptisch, aber nach der ersten Sitzung war ich überzeugt. Die Aktiv-Hypnose© ist wirklich anders als alles, was ich bisher probiert habe.", textEN: "I was skeptical at first, but after the first session I was convinced. Aktiv-Hypnose© is truly different from anything I've tried before." },
  { name: "Julia H.", location: "Augsburg", rating: 5, textDE: "Die Ausbildung bei David J. Woods war die beste Investition in meine berufliche Zukunft. Praxisnah, fundiert und inspirierend.", textEN: "The training with David J. Woods was the best investment in my professional future. Practical, well-founded, and inspiring." },
  { name: "Robert S.", location: "Zürich", rating: 5, textDE: "Mein Sohn hatte grosse Prüfungsangst. Nach den Sitzungen mit Kathryn ist er viel selbstbewusster und ruhiger geworden.", textEN: "My son had severe exam anxiety. After the sessions with Kathryn, he has become much more confident and calmer." },
];

export default function Kundenmeinungen() {
  const { language, country, } = useLanguage();
  const isEN = language === "en";

  return (
    <>

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C]">
                {isEN ? "Client Testimonials" : "Kundenmeinungen"}
              </h1>
              <a href="https://share.google/9hUU4WXKePPhY8VWE" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground mt-1 hover:text-[#2E7D32] transition-colors inline-block">
                {isEN ? "5.0 / 5 on Google · 255 Reviews" : "5.0 / 5 bei Google · 255 Bewertungen"}
              </a>
            </div>
            <a href="https://share.google/9hUU4WXKePPhY8VWE" target="_blank" rel="noopener noreferrer" className="flex gap-0.5 hover:opacity-80 transition-opacity">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-border p-5 bg-[#f4f3ef]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  "{isEN ? t.textEN : t.textDE}"
                </p>
                <p className="text-xs font-semibold text-[#1B3A5C]">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="https://share.google/9hUU4WXKePPhY8VWE" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-[#1B3A5C] text-[#1B3A5C]">
                {isEN ? "Read All Google Reviews" : "Alle Google-Bewertungen lesen"}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#8b827c] text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Ready for Your Own Success Story?" : "Bereit für Ihre eigene Erfolgsgeschichte?"}
          </h2>
          <Link to={`/${language}/${country}/erstgespraech`}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3 text-base">
              {isEN ? "Free Discovery Call" : "Kostenloses Erstgespräch"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
