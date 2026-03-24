import { useLanguage } from "@/contexts/LanguageContext";


export function Impressum() {
  const { language, country, } = useLanguage();
  const isEN = language === "en";
  return (
    <>
      <section className="bg-white">
        <div className="container-main py-8 lg:py-12 max-w-3xl">
          <h1 className="text-2xl font-bold text-[#1B3A5C] mb-6">{isEN ? "Legal Notice" : "Impressum"}</h1>
          <div className="space-y-5 text-sm text-foreground leading-relaxed">
            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">{isEN ? "Provider Identification" : "Anbieterkennzeichnung"}</h2>
              <p className="font-semibold">Life Coaching Schweiz GmbH</p>
            </div>
            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">{isEN ? "Owner / Contact Person" : "Inhaber / Ansprechpartner"}</h2>
              <p>David J. Woods Lic. Psych.</p>
              <p className="text-muted-foreground">Academic Degree in Psychology (UNAM)</p>
            </div>
            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">{isEN ? "Company Registration" : "Firmennummer"}</h2>
              <p>CHE-300.048.592, Handelsregister</p>
            </div>
            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">{isEN ? "Contact" : "Kontakt"}</h2>
              <p>E-Mail: <a href="mailto:info@david-j-woods.com" className="text-[#1B3A5C] underline hover:text-[#2E7D32]">info@david-j-woods.com</a></p>
            </div>
            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">{isEN ? "In Cooperation with" : "In Kooperation mit"}</h2>
              <p>Hypnose24 GmbH</p>
              <p>Wellness24 GmbH</p>
            </div>
            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">{isEN ? "Professional Qualifications" : "Berufsbezeichnung"}</h2>
              <p>Lic.Psych. (Univ.) — {isEN ? "Licensed Psychologist" : "Lizenzierter Psychologe"}</p>
              <p>NGH International Trainer</p>
              <p>EMR {isEN ? "recognized" : "anerkannt"} (ZSR Nr. P609264)</p>
            </div>
            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">{isEN ? "Practice Locations" : "Praxisstandorte"}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                <div className="p-3 bg-[#f4f3ef] rounded">
                  <p className="font-semibold text-[#1B3A5C]">Zürich 🇨🇭</p>
                  <p>5 Elements TCM</p>
                  <p>Usteristrasse 23</p>
                  <p>8001 Zürich</p>
                </div>
                <div className="p-3 bg-[#f4f3ef] rounded">
                  <p className="font-semibold text-[#1B3A5C]">Eschenbach 🇨🇭</p>
                  <p>Fit und Gesund Center</p>
                  <p>Churzhaslen 3</p>
                  <p>8733 Eschenbach</p>
                </div>
                <div className="p-3 bg-[#f4f3ef] rounded">
                  <p className="font-semibold text-[#1B3A5C]">Augsburg 🇩🇪</p>
                  <p>Regus Business Center</p>
                  <p>HELIO Center</p>
                  <p>Viktoriastraße 3b</p>
                  <p>86150 Augsburg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Datenschutz() {
  const { language, country, } = useLanguage();
  const isEN = language === "en";
  return (
    <>
      <section className="bg-white">
        <div className="container-main py-8 lg:py-12 max-w-3xl">
          <h1 className="text-2xl font-bold text-[#1B3A5C] mb-6">{isEN ? "Privacy Policy" : "Datenschutzerklärung"}</h1>
          <div className="space-y-4 text-sm text-foreground leading-relaxed">
            <p>{isEN ? "We take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy." : "Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung."}</p>
            <h2 className="font-semibold text-[#1B3A5C]">{isEN ? "Data Collection on Our Website" : "Datenerfassung auf unserer Website"}</h2>
            <p>{isEN ? "The data processing on this website is carried out by the website operator. You can find the contact details of the website operator in the legal notice of this website." : "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen."}</p>
            <h2 className="font-semibold text-[#1B3A5C]">{isEN ? "Contact Form" : "Kontaktformular"}</h2>
            <p>{isEN ? "If you send us inquiries via the contact form, your details from the inquiry form, including the contact details you provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions." : "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert."}</p>
            <h2 className="font-semibold text-[#1B3A5C]">{isEN ? "Cookies" : "Cookies"}</h2>
            <p>{isEN ? "This website uses cookies. These are small text files that your web browser stores on your device. Cookies help us make our website more user-friendly, effective, and secure." : "Diese Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen."}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function AGB() {
  const { language, country, } = useLanguage();
  const isEN = language === "en";
  return (
    <>
      <section className="bg-white">
        <div className="container-main py-8 lg:py-12 max-w-3xl">
          <h1 className="text-2xl font-bold text-[#1B3A5C] mb-6">{isEN ? "Terms & Conditions" : "Allgemeine Geschäftsbedingungen"}</h1>
          <div className="space-y-4 text-sm text-foreground leading-relaxed">
            <h2 className="font-semibold text-[#1B3A5C]">{isEN ? "Scope" : "Geltungsbereich"}</h2>
            <p>{isEN ? "These General Terms and Conditions apply to all services provided by David J. Woods, Hypnose Institut." : "Diese Allgemeinen Geschäftsbedingungen gelten für alle Leistungen von David J. Woods, Hypnose Institut."}</p>
            <h2 className="font-semibold text-[#1B3A5C]">{isEN ? "Appointments & Cancellation" : "Terminvereinbarung & Stornierung"}</h2>
            <p>{isEN ? "Appointments can be made by phone, email, or through the contact form on our website. Cancellations must be made at least 48 hours before the scheduled appointment." : "Termine können telefonisch, per E-Mail oder über das Kontaktformular auf unserer Website vereinbart werden. Stornierungen müssen mindestens 48 Stunden vor dem vereinbarten Termin erfolgen."}</p>
            <h2 className="font-semibold text-[#1B3A5C]">{isEN ? "Disclaimer" : "Haftungsausschluss"}</h2>
            <p>{isEN ? "Hypnosis is not a substitute for medical or psychological treatment. We recommend that you consult a doctor for any health concerns." : "Hypnose ist kein Ersatz für eine ärztliche oder psychologische Behandlung. Wir empfehlen Ihnen, bei gesundheitlichen Beschwerden einen Arzt aufzusuchen."}</p>
          </div>
        </div>
      </section>
    </>
  );
}
