import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { MessageCircle, BookOpen } from "lucide-react";

const BOOK_IMAGE = "https://shop.david-j-woods.com/wp-content/uploads/2020/11/david-woods-buch-go-inside.png";

function buildWhatsAppBookUrl(): string {
  const phone = "491719539922";
  const message = 'Hallo, ich habe Interesse am Buch "Go InSide" von David Woods. K\u00f6nnen Sie mir weitere Informationen geben?';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function Buch() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  return (
    <>
      <SEO
        titleDE="Buch: Go InSide — Das David-Woods-Hypnose-Programm"
        titleEN="Book: Go InSide — The David Woods Hypnosis Program"
        descriptionDE="Go InSide: Das David-WOODS-Hypnose-Programm von David Woods & Elisabeth Engler. Abnehmen, Raucherentwöhnung, Selbstbewusstsein. 136 Seiten. ISBN 3934473881."
        descriptionEN="Go InSide: The David WOODS Hypnosis Program by David Woods & Elisabeth Engler. Weight loss, quit smoking, self-confidence. 136 pages. ISBN 3934473881."
      />

      {/* Hero */}
      <section className="bg-white border-b border-border">
        <div className="container-main py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Book Image */}
            <div className="flex justify-center">
              <div className="max-w-sm">
                <img
                  src={BOOK_IMAGE}
                  alt="Buch Go InSide von David Woods"
                  className="w-full h-auto shadow-lg rounded-lg"
                />
              </div>
            </div>

            {/* Book Info */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2E7D32] mb-2">
                {isEN ? "Book by David J. Woods" : "Buch von David J. Woods"}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] mb-4">
                Go InSide
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                {isEN
                  ? "The David WOODS Hypnosis Program"
                  : "Das David-WOODS-Hypnose-Programm"}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {isEN ? "by David Woods & Elisabeth Engler" : "von David Woods & Elisabeth Engler"}
              </p>

              <p className="text-3xl font-bold text-[#1B3A5C] mb-6">34,90 €</p>

              <p className="text-base text-foreground leading-relaxed mb-6">
                {isEN
                  ? "Live a happy and healthy life! Delete 'bugs' and mental blocks from your subconscious! Renew your self-image! In 3 steps you will learn — in detail and easy to follow — with many exercises and tips, your mental reprogramming."
                  : 'F\u00fchren Sie ein gl\u00fcckliches und gesundes Leben! L\u00f6schen Sie \u201eBugs\u201c und Denkblockaden Ihres Unterbewusstseins! Erneuern Sie Ihr Selbstbild! In 3 Schritten erlernen Sie \u2013 ausf\u00fchrlich und leicht nachvollziehbar \u2013 mit vielen \u00dcbungen und Tipps Ihre geistige Umprogrammierung.'}
              </p>

              <p className="text-base text-foreground leading-relaxed mb-8">
                {isEN
                  ? "David Woods' unique hypnosis texts for weight loss, smoking cessation and boosting self-confidence, hunger rules, important weight loss tips, affirmations, David Woods' anti-smoking menu, relaxation and breathing exercises, as well as suitable sports."
                  : "David Woods einzigartige Hypnosetexte zum Abnehmen, zur Raucherentwöhnung und zur Steigerung des Selbstbewusstseins, Hungerregeln, wichtige Ratschläge zum Abnehmen, Affirmationen, David Woods Anti-Raucher-Menü, Entspannungs- und Atemübungen, sowie geeignete Sportarten."}
              </p>

              {/* WhatsApp CTA */}
              <a
                href={buildWhatsAppBookUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                {isEN ? "I'm interested — Contact via WhatsApp" : "Ich habe Interesse — Kontakt via WhatsApp"}
              </a>

              <p className="text-xs text-muted-foreground mt-3">
                {isEN
                  ? "Send us a message on WhatsApp and we'll get back to you promptly."
                  : "Senden Sie uns eine Nachricht auf WhatsApp und wir melden uns umgehend bei Ihnen."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-[#f4f3ef] border-b border-border">
        <div className="container-main py-10">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-6">
            {isEN ? "Description" : "Beschreibung"}
          </h2>

          <div className="max-w-3xl space-y-4">
            <p className="text-base text-foreground leading-relaxed">
              {isEN
                ? "Live a happy and healthy life! Delete 'bugs' and mental blocks from your subconscious! Renew your self-image! In 3 steps you will learn — in detail and easy to follow — with many exercises and tips, your mental reprogramming."
                : "Führen Sie ein glückliches und gesundes Leben! Löschen Sie „Bugs" und Denkblockaden Ihres Unterbewusstseins! Erneuern Sie Ihr Selbstbild! In 3 Schritten erlernen Sie – ausführlich und leicht nachvollziehbar – mit vielen Übungen und Tipps Ihre geistige Umprogrammierung."}
            </p>

            <p className="text-base text-foreground leading-relaxed">
              {isEN
                ? "David Woods' unique hypnosis texts for weight loss, smoking cessation and boosting self-confidence, hunger rules, important weight loss tips, affirmations, David Woods' anti-smoking menu, relaxation and breathing exercises, as well as suitable sports."
                : "David Woods einzigartige Hypnosetexte zum Abnehmen, zur Raucherentwöhnung und zur Steigerung des Selbstbewusstseins, Hungerregeln, wichtige Ratschläge zum Abnehmen, Affirmationen, David Woods Anti-Raucher-Menü, Entspannungs- und Atemübungen, sowie geeignete Sportarten."}
            </p>

            {/* Book Details */}
            <div className="bg-white border border-border p-6 mt-6">
              <h3 className="font-semibold text-[#1B3A5C] mb-4">{isEN ? "Book Details" : "Buchdetails"}</h3>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <span className="text-muted-foreground">ISBN:</span>
                <span className="font-medium">3934473881</span>
                <span className="text-muted-foreground">EAN:</span>
                <span className="font-medium">9783934473881</span>
                <span className="text-muted-foreground">{isEN ? "Pages:" : "Seiten:"}</span>
                <span className="font-medium">136</span>
                <span className="text-muted-foreground">{isEN ? "Publisher:" : "Verlag:"}</span>
                <span className="font-medium">Compbook</span>
                <span className="text-muted-foreground">{isEN ? "Authors:" : "Autoren:"}</span>
                <span className="font-medium">David Woods & Elisabeth Engler</span>
              </div>
            </div>

            {/* About Co-Author */}
            <div className="bg-white border border-border p-6">
              <h3 className="font-semibold text-[#1B3A5C] mb-3">{isEN ? "About the Co-Author" : "Über die Co-Autorin"}</h3>
              <p className="text-sm text-foreground leading-relaxed">
                {isEN
                  ? "Elisabeth Engler was born in Munich in 1963. For 10 years she was a self-employed bookseller. Since 1994, her interest in NT (New Thinking) has grown — including removing blockages, cosmic ordering, consciousness work, positive thinking, mental programming, and meditation. Since 2005 she has worked as an author and NT therapist."
                  : "Elisabeth Engler wurde 1963 in München geboren. 10 Jahre lang war sie selbständige Buchhändlerin. Seit 1994 ist ihr Interesse mit NT gestiegen (z.B. Entfernung von Blockaden, kosmisches Bestellsystem, Bewusstseinsarbeit, positivem Denken, geistigen Programmierungen, Meditation.) Ab 2005 arbeitet sie als Autorin und NT-Therapeutin (New Thinking)."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#8b827c] text-white">
        <div className="container-main py-10 text-center">
          <BookOpen className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Interested in Go InSide?" : "Interesse an Go InSide?"}
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            {isEN
              ? "Contact us via WhatsApp for more information or to order your copy."
              : "Kontaktieren Sie uns via WhatsApp für weitere Informationen oder um Ihr Exemplar zu bestellen."}
          </p>
          <a
            href={buildWhatsAppBookUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-8 py-3 rounded-lg transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            {isEN ? "Contact via WhatsApp" : "Kontakt via WhatsApp"}
          </a>
        </div>
      </section>
    </>
  );
}
