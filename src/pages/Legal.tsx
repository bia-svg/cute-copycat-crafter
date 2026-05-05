import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPath } from "@/lib/routes";

export function Impressum() {
  const { language, country, } = useLanguage();
  const isEN = language === "en";
  const basePath = getPath("home", language, country);
  return (
    <>
      <SEO {...pageSEO.impressum} pageKey="impressum" />
      <Breadcrumbs items={[
        { name: "Home", path: basePath },
        { name: isEN ? "Legal Notice" : "Impressum", path: getPath("impressum", language, country) },
      ]} />
      <section className="bg-white">
        <div className="container-main py-8 lg:py-12 max-w-3xl">
          <h1 className="text-2xl font-light text-[#1B3A5C] mb-6 tracking-tight">{isEN ? "Legal Notice" : "Impressum"}</h1>
          <div className="space-y-5 text-sm text-foreground leading-relaxed">
            <div>
              <h2 className="font-light text-[#1B3A5C] mb-1 tracking-tight">{isEN ? "Provider Identification" : "Anbieterkennzeichnung"}</h2>
              <p className="font-semibold">Life Coaching Schweiz GmbH</p>
            </div>
            <div>
              <h2 className="font-light text-[#1B3A5C] mb-1 tracking-tight">{isEN ? "Owner / Contact Person" : "Inhaber / Ansprechpartner"}</h2>
              <p>David J. Woods Lic. Psych.</p>
              <p className="text-muted-foreground">Academic Degree in Psychology (UNAM)</p>
            </div>
            <div>
              <h2 className="font-light text-[#1B3A5C] mb-1 tracking-tight">{isEN ? "Company Registration" : "Firmennummer"}</h2>
              <p>CHE-300.048.592, Handelsregister</p>
            </div>
            <div>
              <h2 className="font-light text-[#1B3A5C] mb-1 tracking-tight">{isEN ? "Contact" : "Kontakt"}</h2>
              <p>{isEN ? "Please contact us via WhatsApp or phone." : "Bitte kontaktieren Sie uns per WhatsApp oder Telefon."}</p>
            </div>
            <div>
              <h2 className="font-light text-[#1B3A5C] mb-1 tracking-tight">{isEN ? "In Cooperation with" : "In Kooperation mit"}</h2>
              <p>Hypnose24 GmbH</p>
              <p>Wellness24 GmbH</p>
            </div>
            <div>
              <h2 className="font-light text-[#1B3A5C] mb-1 tracking-tight">{isEN ? "Professional Qualifications" : "Berufsbezeichnung"}</h2>
              <p>Lic.Psych. (Univ.) — {isEN ? "Licensed Psychologist" : "Lizenzierter Psychologe"}</p>
              <p>NGH International Trainer</p>
              <p>EMR {isEN ? "recognized" : "anerkannt"} (ZSR Nr. P609264)</p>
            </div>
            <div>
              <h2 className="font-light text-[#1B3A5C] mb-1 tracking-tight">{isEN ? "Practice Locations" : "Praxisstandorte"}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                <div className="p-3 bg-[#f4f3ef] rounded">
                  <p className="font-semibold text-[#1B3A5C]">Zürich 🇨🇭</p>
                  <p>5 Elements TCM GmbH</p>
                  <p>Beim Löwenplatz, Usteristrasse 23</p>
                  <p>8001 Zürich</p>
                </div>
                <div className="p-3 bg-[#f4f3ef] rounded">
                  <p className="font-semibold text-[#1B3A5C]">Eschenbach 🇨🇭</p>
                  <p>Fit+Gsund</p>
                  <p>Churzhaslen 3</p>
                  <p>8733 Eschenbach (am Zürichsee)</p>
                </div>
                <div className="p-3 bg-[#f4f3ef] rounded">
                  <p className="font-semibold text-[#1B3A5C]">Augsburg 🇩🇪</p>
                  <p>Regus</p>
                  <p>Viktoria Str. 3b, 2. OG</p>
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
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const basePath = getPath("home", language, country);

  const revokeConsent = () => {
    try {
      localStorage.removeItem("cookie_consent_v1");
      window.dispatchEvent(new Event("cookie-consent-revoked"));
      window.location.reload();
    } catch {}
  };

  return (
    <>
      <SEO {...pageSEO.privacy} pageKey="privacy" />
      <Breadcrumbs items={[
        { name: "Home", path: basePath },
        { name: isEN ? "Privacy Policy" : "Datenschutz", path: getPath("privacy", language, country) },
      ]} />
      <section className="bg-white">
        <div className="container-main py-8 lg:py-12 max-w-3xl">
          <h1 className="text-2xl font-light text-[#1B3A5C] mb-6 tracking-tight">
            {isEN ? "Privacy Policy" : "Datenschutzerklärung"}
          </h1>
          <div className="space-y-5 text-sm text-foreground leading-relaxed">

            <p className="text-muted-foreground">
              {isEN
                ? "Last updated: 5 May 2026. This policy describes how we process personal data on this website in accordance with the EU General Data Protection Regulation (GDPR), the German Federal Data Protection Act (BDSG) and the Telecommunications-Telemedia Data Protection Act (TTDSG)."
                : "Stand: 5. Mai 2026. Diese Erklärung beschreibt die Verarbeitung personenbezogener Daten auf dieser Website gemäß DSGVO, BDSG und TTDSG."}
            </p>

            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">
                {isEN ? "1. Controller" : "1. Verantwortlicher"}
              </h2>
              <p>Life Coaching Schweiz GmbH</p>
              <p>David J. Woods (Lic.Psych.)</p>
              <p>Usteristrasse 23, 8001 Zürich (CH) · Viktoriastrasse 3, 86150 Augsburg (DE)</p>
              <p>+41 79 131 88 78 · +49 171 953 99 22</p>
            </div>

            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">
                {isEN ? "2. Data we process" : "2. Verarbeitete Daten"}
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>{isEN ? "Server log data: IP address, browser, time of request (Art. 6(1)(f) GDPR — secure operation)." : "Server-Logs: IP-Adresse, Browser, Zeitstempel (Art. 6 Abs. 1 lit. f DSGVO — sicherer Betrieb)."}</li>
                <li>{isEN ? "Form data: name, email, phone, postal code, city, message (Art. 6(1)(b) GDPR — pre-contractual contact)." : "Formulardaten: Name, E-Mail, Telefon, PLZ, Ort, Nachricht (Art. 6 Abs. 1 lit. b DSGVO — Vertragsanbahnung)."}</li>
                <li>{isEN ? "Analytics & ads cookies: only with your consent (Art. 6(1)(a) GDPR, § 25(1) TTDSG)." : "Analyse- & Werbe-Cookies: nur mit Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG)."}</li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">
                {isEN ? "3. Cookies & tracking" : "3. Cookies & Tracking"}
              </h2>
              <p>
                {isEN
                  ? "Tracking tools (Google Analytics 4, Google Ads, Microsoft Clarity, Meta Pixel via Google Tag Manager) only run after you click \"Accept\". Without consent only technically necessary cookies are used."
                  : "Tracking-Tools (Google Analytics 4, Google Ads, Microsoft Clarity, Meta Pixel via Google Tag Manager) werden erst nach Ihrer Einwilligung („Akzeptieren\") aktiviert. Ohne Einwilligung werden ausschließlich technisch notwendige Cookies eingesetzt."}
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Google Analytics 4 / Google Ads</strong> — Google Ireland Ltd. (EU) / Google LLC (USA, EU-US DPF). IP-Anonymisierung & Consent Mode v2 aktiv.</li>
                <li><strong>Microsoft Clarity</strong> — Microsoft Ireland Ltd. Session-Replay; Eingabefelder werden maskiert.</li>
                <li><strong>Google Tag Manager</strong> — Tag-Verwaltung; setzt selbst keine Tracking-Cookies.</li>
              </ul>
              <button
                type="button"
                onClick={revokeConsent}
                className="mt-3 inline-flex items-center px-4 py-1.5 rounded-full bg-[#1B3A5C] text-white text-xs font-semibold hover:bg-[#15304b] transition-colors"
              >
                {isEN ? "Revoke / change cookie settings" : "Cookie-Einstellungen widerrufen / ändern"}
              </button>
            </div>

            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">
                {isEN ? "4. Data hosting & processors" : "4. Hosting & Auftragsverarbeiter"}
              </h2>
              <p>
                {isEN
                  ? "Website infrastructure and database (Lovable Cloud / Supabase) — EU region. Transactional emails via Resend. All processors are bound by Art. 28 GDPR data processing agreements."
                  : "Website-Infrastruktur und Datenbank (Lovable Cloud / Supabase) — EU-Region. Transaktions-E-Mails über Resend. Alle Auftragsverarbeiter sind durch AVV nach Art. 28 DSGVO gebunden."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">
                {isEN ? "5. Retention" : "5. Speicherdauer"}
              </h2>
              <p>{isEN ? "Form data: until purpose ends, max. 3 years. Server logs: 7 days. Consent records: 3 years (proof obligation). Tax-relevant documents: 10 years (§ 147 AO)." : "Formulardaten: bis zur Zweckerreichung, max. 3 Jahre. Server-Logs: 7 Tage. Einwilligungs-Nachweise: 3 Jahre. Steuerlich relevante Unterlagen: 10 Jahre (§ 147 AO)."}</p>
            </div>

            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">
                {isEN ? "6. Your rights (Art. 15–22 GDPR)" : "6. Ihre Rechte (Art. 15–22 DSGVO)"}
              </h2>
              <p>
                {isEN
                  ? "You have the right to access, rectification, erasure, restriction, data portability, and to object to processing. You may withdraw consent at any time without affecting prior lawful processing. Contact: info@david-j-woods.com."
                  : "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung können Sie jederzeit widerrufen, ohne dass dies die Rechtmäßigkeit der bisherigen Verarbeitung berührt. Kontakt: info@david-j-woods.com."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">
                {isEN ? "7. Right to lodge a complaint" : "7. Beschwerderecht"}
              </h2>
              <p>{isEN ? "You may lodge a complaint with a supervisory authority — e.g. the Bavarian State Office for Data Protection Supervision (BayLDA) or your local DPA." : "Sie können sich bei einer Aufsichtsbehörde beschweren — z. B. Bayerisches Landesamt für Datenschutzaufsicht (BayLDA) oder Ihrer zuständigen Landesdatenschutzbehörde."}</p>
            </div>

            <div>
              <h2 className="font-semibold text-[#1B3A5C] mb-1">
                {isEN ? "8. SSL/TLS encryption" : "8. SSL/TLS-Verschlüsselung"}
              </h2>
              <p>{isEN ? "All data transmission is encrypted via TLS (HTTPS)." : "Die gesamte Datenübertragung erfolgt verschlüsselt über TLS (HTTPS)."}</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export function AGB() {
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const basePath = getPath("home", language, country);
  return (
    <>
      <SEO {...pageSEO.terms} pageKey="terms" />
      <Breadcrumbs items={[
        { name: "Home", path: basePath },
        { name: isEN ? "Terms & Conditions" : "AGB", path: getPath("terms", language, country) },
      ]} />
      <section className="bg-white">
        <div className="container-main py-8 lg:py-12 max-w-3xl">
          <h1 className="text-2xl font-light text-primary mb-2 tracking-tight">AGB</h1>
          <p className="text-lg text-muted-foreground mb-8">AGBs für die Ausbildungen und Einzel- und Gruppensitzungen</p>

          <div className="space-y-6 text-sm text-foreground leading-relaxed">
            {/* Datenschutz Hinweis */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">Datenschutz Hinweis</h2>
              <p>Ihre personengebundenen Daten, die z.B. durch Nutzung der Kontaktseite oder Emails an uns übermittelt werden, werden nur im Rahmen der gesetzlichen Vorschriften des Bundesdatenschutzgesetzes (BDSG) sowie des Teledienstdatenschutzgesetzes (TDDSG) erhoben. Eine Weitergabe an Dritte ist ausgeschlossen. Die endgültige Löschung der Daten bedarf einer schriftlichen Mitteilung.</p>
            </div>

            {/* 1. Hypnose-Sitzungen */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">1. Hypnose-Sitzungen</h2>
              <p>Termine für Einzelsitzungen können telefonisch, per Email und auch in persönlicher Absprache vereinbart werden. Die Rechtsverbindlichkeit besteht dabei nicht erst in einer schriftlichen Auftragsform oder Zusage, sondern entsteht bereits durch eine Vereinbarung per Email oder mündlich. Die Anmeldebestätigung kann per E-Mail versendet werden. Mit Absenden des Anmelde-Formulars per E-Mail erklärt sich der Absender mit den AGBs einverstanden.</p>
              <p className="mt-2">Der Erfolg einer Hypnose hängt maßgeblich von dem Willen und der Aufmerksamkeit des Klienten ab. Die Tätigkeit des Hypnotiseurs ersetzt nicht die eines Arztes, Psychiaters oder Heilpraktikers. Der Hypnotiseur behandelt weder Krankheiten noch stellt er Diagnosen. Als Resultat der Hypnose wird ein stark verbessertes Lebensgefühl angestrebt, das sich in der Regel auch positiv auf die Therapie psychischer und körperlicher Krankheiten auswirken kann.</p>
              <p className="mt-2">Der Hypnotiseur arbeitet eng mit Ärzten und Psychotherapeuten zusammen und behält sich das Recht vor, Sie im Bedarfsfall an Spezialisten zu verweisen. Bei minderjährigen Klienten muss die Terminbestätigung von einem Erziehungsberechtigten erfolgen.</p>
            </div>

            {/* 2. Teilnahme an einer Ausbildung */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">2. Teilnahme an einer Ausbildung</h2>
              <p>Eine Teilnahme an Ausbildungen ist ab 18 Jahren möglich. Die Anmeldung für Ausbildungen ist grundsätzlich nur auf unserem Anmeldeformular in der Website möglich. Die Anmeldung ist für den Teilnehmer verbindlich. Die Teilnahmegebühr ist laut dem Zahlungsziel der Rechnung zu begleichen.</p>
              <p className="mt-2">Bei Anmeldungen wird die Anzahlung der Seminargebühr wie in der Seminarbeschreibung angegeben, abgerechnet. Bei einer kurzfristigen Anmeldung, d.h. innerhalb von 14 Tagen vor Beginn einer Ausbildung, ist die Teilnahmegebühr in voller Höhe unmittelbar nach Erhalt der Anmeldebestätigung/Rechnung zu zahlen.</p>
              <p className="mt-2">Die Anmeldebestätigung/Rechnung kann per E-Mail versendet werden. Mit Absenden des Anmelde-Formulars auf unserer Homepage erklärt sich der Absender mit den AGBs einverstanden. Der Rechnungsbetrag beinhaltet die derzeit gültige MwSt. Im Falle einer MwSt. Befreiung unsererseits ist der Teilnehmer nicht berechtigt diese rückwirkend von uns einzufordern.</p>
              <p className="mt-2">Der Erfolg einer Hypnose-Ausbildung hängt maßgeblich von dem Willen und der Aufmerksamkeit des Klienten ab. Der Hypnotiseur / Ausbildungsleiter arbeitet eng mit Ärzten und Psychotherapeuten zusammen.</p>
              <p className="mt-2">Die Inanspruchnahme von Rabatten ist nur möglich, wenn die angebotenen Leistungen vom Kunden – wie in der Rabattaktion erläutert – auch in vollem Umfang genutzt und gezahlt werden. Wurde ein Rabatt vom Hypnoseinstitut David Woods für bestimmte Leistungen wie z.B. Ausbildungen, gewährt und wurden die Leistungen nicht genutzt beziehungsweise – in vollem Umfang bezahlt, so muss der Kunde den gewährten Rabatt an das Hypnoseinstitut David Woods zurück erstatten.</p>
              <p className="mt-2">Die Seminare (außer Praxis Workshops) können jederzeit für 50% des jeweils gültigen Seminarpreises wiederholt werden, sofern Plätze vorhanden sind.</p>
            </div>

            {/* 3. Abrechnung */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">3. Abrechnung</h2>
              <p>Die Abrechnung erfolgt immer direkt zwischen mir als Hypnotiseur und dem Klienten. Eine Abrechnung gegenüber Dritten, wie z.B. Versicherungen, ist nicht möglich. Die Zahlung des Rechnungsbetrages erfolgt im Anschluss an die Hypnose-Sitzungen direkt in bar. In Ausnahmefällen und bei Ausbildungen kann eine Vorauszahlung per Überweisung (Vorkasse) verlangt werden.</p>
              <p className="mt-2">Maßgeblich für die Einhaltung der Zahlungsfrist ist der Eingang der Zahlung auf dem Bankkonto. In Ausnahmefällen ist nach Rücksprache eine Ratenzahlung möglich. Im Falle eines Zahlungsverzuges behalte ich mir vor, Mahngebühren sowie Verzugszinsen in üblicher Höhe in Rechnung zu stellen.</p>
              <p className="mt-2">Die Fälligkeit eines Rechnungsbetrages oder Teilbetrages kann nicht von einem unmittelbaren Erfolg abhängig gemacht werden. Die Seminarteilnehmer erklären sich damit einverstanden, dass mit ihnen während der Seminare gedrehte Filme im Internet verwendet werden dürfen. Sollte dies ein Teilnehmer nicht wünschen, erklärt er dies schriftlich beim Seminar.</p>
              <p className="mt-2 font-semibold">ZOOM-Calls und Vor-Ort-Termine nur gegen Vorauszahlung!</p>
            </div>

            {/* 4. Rücktritt Sitzungen */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">4. Rücktritt von Terminen für Hypnose-Sitzungen</h2>
              <p>Absagen einer vereinbarten Sitzung sind bis 5 volle Werktage vor dem Termin kostenlos möglich. Bei späteren Absagen bis 2 volle Werktage vor dem Termin wird eine Gebühr von 50 % des Sitzungspreises fällig. Bei unangekündigtem Fernbleiben oder Absage weniger als 2 volle Werktage vor dem vereinbarten Termin stellen wir gemäß § 615 BGB den vollen Sitzungspreis in Rechnung.</p>
              <p className="mt-2">Dem Kunden bleibt jederzeit das Recht vorbehalten, nachzuweisen, dass der geltend gemachte Schaden nicht oder nicht in dieser Höhe angefallen ist.</p>
            </div>

            {/* 5. Rücktritt Ausbildung */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">5. Rücktritt von der Teilnahme an einer Ausbildung</h2>
              <p>Ein Rücktritt ist prinzipiell nicht möglich, jedoch kann in Ausnahmefällen der Termin einmal verschoben werden. Absagen innerhalb von 14 Tagen vor dem Termin oder Nichterscheinen können nicht berücksichtigt werden, die Seminargebühr wird in voller Höhe fällig. Nach Rücksprache mit unserem Institut kann eine geeignete Ersatzperson den Ausbildungstermin wahrnehmen. Bricht ein Teilnehmer nach Ausbildungsbeginn diese ab, werden erfolgte Zahlungen nicht zurückerstattet.</p>
              <p className="mt-2">Wird ein Ausbildungstermin von Herrn Woods selbst storniert und ersatzlos gestrichen, wird die Vorauszahlung erstattet. Ausbildungstermine können aus wichtigem Grund (zu geringe Teilnehmerzahl, Krankheit des Ausbildungsleiters, o.ä.) ersatzlos abgesagt werden. Die Absage erfolgt, sofern noch möglich, per E-Mail oder telefonisch. Bereits erfolgte Zahlungen werden in diesem Fall unverzüglich zurückerstattet.</p>
              <p className="mt-2">Terminverschiebungen aufgrund höherer Gewalt berechtigen nicht zur Rückforderungen bereits bezahlter Beträge. Im Falle einer Erkrankung des Ausbildungsleiters oder anderer nicht vorhersehbarer Ereignisse, die den Einsatz des angegeben Ausbildungsleiters unmöglich machen, sind wir ermächtigt, einen anderen qualifizierten Dozenten für die betreffende Ausbildung einzusetzen.</p>
              <p className="mt-2">Dem Kunden bleibt jederzeit das Recht vorbehalten, nachzuweisen, dass der geltend gemachte Schaden nicht oder nicht in dieser Höhe angefallen ist.</p>
            </div>

            {/* 6. Tagesseminare */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">6. Teilnahme an den Tagesseminaren</h2>
              <p>Die Teilnahme an den Tagesseminaren ist verbindlich. Kosten können nicht zurück erstattet werden. Sie können jedoch die Teilnahme an andere Personen übertragen. Dies muss jedoch von der Life Coaching Schweiz GmbH telefonisch oder schriftlich bestätigt werden. Sollte das Seminar wegen Krankheit des Seminarleiters oder zu wenigen Teilnehmern abgesagt werden, können die Kosten zum vollen Preis zurückerstattet werden.</p>
            </div>

            {/* 7. Ablehnung */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">7. Ablehnung/Ausschluss von Teilnehmern/Klienten</h2>
              <p>Hypnotiseur und Ausbildungsleiter David Woods ist ermächtigt, Teilnehmer vor/während der Ausbildung / Einzelsitzung ohne Angabe von Gründen abzulehnen. Bereits gezahlte Gebühren werden in diesem Fall anteilsmäßig zurückerstattet.</p>
              <p className="mt-2">Teilnehmer, die wiederholt den Ablauf von Ausbildungen oder Einzelsitzungen stören oder die Ausbildung / die Einzelsitzung zur Anwerbung von Personen bzw. zum Verkauf von Fremdprodukten missbrauchen, können vom Ausbildungsleiter oder der Geschäftsleitung von der Ausbildung / von der Einzelsitzung ausgeschlossen werden. Die Ausbildungs- oder Einzelsitzungsgebühr ist in diesem Fall zu 100 v.H. zu entrichten.</p>
            </div>

            {/* 8. Ersatz */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">8. Recht zum qualifizierten Ersatz</h2>
              <p>Im kurzfristigen Krankheitsfall von Herrn Woods oder einem seiner Mitarbeiter ist es der Life Coaching Schweiz GmbH gestattet, die vereinbarte Hypnosesitzung von einem gleichwertig qualifizierten Hypnotiseur durchführen zu lassen.</p>
            </div>

            {/* 9. Datenschutz */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">9. Datenschutz</h2>
              <p>Aufzeichnungen über die Hypnose, sofern vorhanden, sind Dritten nicht zugänglich und werden längstens 8 Jahre aufbewahrt. Eine Herausgabe von Unterlagen erfolgt nur in Ausnahmefällen und nach vorheriger Absprache. Die Löschung der Daten bedarf einer schriftlichen Mitteilung.</p>
              <p className="mt-2">Die Seminarteilnehmer erklären sich damit einverstanden, dass mit ihnen während der Seminare gedrehte Filme im Internet verwendet werden dürfen. Sollte dies ein Teilnehmer nicht wünschen, erklärt er dies schriftlich beim Seminar.</p>
            </div>

            {/* 10. Gerichtsstand */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">10. Gerichtsstand</h2>
              <p>Gerichtsstand ist St. Gallen.</p>
            </div>

            {/* 11. Online-Streitbeilegung */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">11. Informationen zur Online-Streitbeilegung</h2>
              <p>Die EU-Kommission stellt eine Internetplattform zur Online-Beilegung von Streitigkeiten (sog. „OS-Plattform") bereit. Die OS-Plattform dient als Anlaufstelle zur außergerichtlichen Beilegung von Streitigkeiten betreffend vertragliche Verpflichtungen, die aus Online-Kaufverträgen erwachsen. Die OS-Plattform ist unter folgendem Link erreichbar: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://ec.europa.eu/consumers/odr</a></p>
            </div>

            {/* 12. Salvatorische Klausel */}
            <div>
              <h2 className="font-light text-primary mb-2 tracking-tight">12. Salvatorische Klausel</h2>
              <p>Sollte eine der vorstehenden Klauseln der AGB ungültig sein, so wird damit die Wirksamkeit der übrigen Bestimmungen nicht beeinflusst. An die Stelle einer unwirksamen Bedingung tritt eine solche, welche den gesetzlichen Regelungen unter Berücksichtigung des Vertragszweckes am nächsten kommt.</p>
              <p className="mt-2 text-muted-foreground">Augsburg, 18.05.2015</p>
            </div>

            {/* ════════ ONLINE SHOP AGBs ════════ */}
            <hr className="border-border my-8" />
            <h2 className="text-xl font-light text-primary mb-4 tracking-tight">AGBs für den Online Shop</h2>

            {/* §1 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§1 Allgemeines</h3>
              <p>1. Sämtliche, auch zukünftige, Lieferungen und Leistungen von david-j-woods.com erfolgen ausschließlich aufgrund der nachstehenden Bedingungen. Bei Auftragserteilung, spätestens mit der Entgegennahme unserer Waren, gelten diese Bedingungen als angenommen.</p>
              <p className="mt-2">2. Einkaufsbedingungen des Käufers wird hiermit widersprochen. Das Verkaufspersonal ist nicht berechtigt, Einkaufsbedingungen des Käufers als verbindlich anzuerkennen. Mündliche Nebenabreden bedürfen zu ihrer Wirksamkeit der schriftlichen Bestätigung.</p>
              <p className="mt-2">3. Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein, so bleiben die Bedingungen im Übrigen voll wirksam.</p>
            </div>

            {/* §2 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§2 Vertragsschluss</h3>
              <p>1. Die Angebote und Preislisten sind freibleibend. Ein Zwischenverkauf von noch nicht verbindlich bestellter Ware ist stets vorbehalten.</p>
              <p className="mt-2">2. Sämtliche Bestellungen müssen schriftlich bzw. fernschriftlich bestätigt werden. Die Bestätigung kann durch die Auslieferung der bestellten Ware ersetzt werden.</p>
            </div>

            {/* §3 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§3 Lieferfristen, Lieferzeit</h3>
              <p>1. Lieferfristen und -termine gelten nur annähernd, es sei denn, dass diese schriftlich und ausdrücklich als verbindlich bezeichnet wurden.</p>
              <p className="mt-2">2. Lieferfristen und Liefertermine verlängern sich um den Zeitraum, um den der Käufer mit seinen Verpflichtungen in Verzug ist. Gleiches gilt bei Ereignissen höherer Gewalt.</p>
              <p className="mt-2">3. Erfolgt die Abnahme der Ware durch Verschulden des Käufers nicht rechtzeitig, so steht uns nach Setzung einer Nachfrist von 10 Tagen das Recht zu, eine Rückstandsrechnung auszustellen oder vom Vertrag zurückzutreten.</p>
            </div>

            {/* §4 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§4 Unterbrechung der Lieferung</h3>
              <p>Wird die Einhaltung von Lieferterminen durch Gründe verzögert oder unmöglich gemacht, die nicht zu vertreten sind (z.B. höhere Gewalt, Arbeitskämpfe, behördliche Maßnahmen), so verlängert sich die Liefer- bzw. Abnahmefrist um die Dauer der Verhinderung, längstens jedoch um 8 Wochen. Schadensersatzansprüche sind ausgeschlossen.</p>
            </div>

            {/* §5 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§5 Nachlieferungsfrist</h3>
              <p>Bei Vertragsabschluss wird automatisch eine Nachlieferungsfrist von 18 Tagen vereinbart. Nach ergebnislosem Ablauf dieser Nachlieferungsfrist kann der Käufer vom Vertrag zurücktreten.</p>
            </div>

            {/* §6 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§6 Versand, Gefahrenübergang und Teillieferung</h3>
              <p>1. Verpackung, Versandweg und Transportmittel sind mangels besonderer Vereinbarung unserer Wahl überlassen. Die Versandkosten trägt grundsätzlich der Käufer.</p>
              <p className="mt-2">2. Die Gefahr geht spätestens auf den Käufer über, sobald die Waren unser Lager verlassen haben. Dies gilt auch für Teillieferungen.</p>
            </div>

            {/* §7 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§7 Zahlung</h3>
              <p>1. Die Rechnung wird zum Tage der Lieferung bzw. der Bereitstellung der Ware ausgestellt.</p>
              <p className="mt-2">2. Es gelten die bei Auftragserteilung vereinbarten Zahlungsbedingungen. Ist keine Zahlungsbedingung schriftlich festgelegt worden, tritt automatisch „netto zahlbar bei Warenerhalt" in Kraft.</p>
              <p className="mt-2">3. Die Zahlung hat ausschließlich an uns zu erfolgen.</p>
              <p className="mt-2">4. Werden anstelle von barem Geld Schecks gegeben, so werden diese nur erfüllungshalber angenommen.</p>
            </div>

            {/* §8 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§8 Zahlungsverzug</h3>
              <p>1. Bei Zahlung nach Fälligkeit können Verzugszinsen in Höhe der banküblichen Sollzinsen, mindestens 5% über dem Basiszinssatz, verlangt werden.</p>
              <p className="mt-2">2. Ist der Käufer mit einer Zahlung in Verzug, kann für noch ausstehende Lieferung Zahlung vor Ablieferung verlangt werden.</p>
              <p className="mt-2">3. Wird die entsprechende Zahlung nicht gewährt, kann vom Vertrag zurückgetreten und Schadensersatz in Höhe von mindestens 30% vom Auftragswert verlangt werden.</p>
              <p className="mt-2">4. Der Käufer ist nicht berechtigt, den Kaufpreis wegen etwaiger Gegenansprüche zurückzubehalten. Ein Aufrechnungsrecht besteht nur bei unbestrittenen oder rechtskräftig festgestellten Ansprüchen.</p>
            </div>

            {/* §9 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§9 Eigentumsvorbehalt</h3>
              <p>Alle gelieferten Waren bleiben bis zur Erfüllung sämtlicher Ansprüche unser Eigentum (Vorbehaltsware). Bei laufender Rechnung gilt das vorbehaltene Eigentum zur Sicherung unserer Saldoforderung.</p>
            </div>

            {/* §10 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§10 Mängelrüge und Gewährleistungen</h3>
              <p>1. Der Käufer hat die Ware unverzüglich nach Erhalt zu überprüfen. Handelsübliche, technisch nicht vermeidbare Abweichungen dürfen nicht beanstandet werden.</p>
              <p className="mt-2">2. Erkennbare Mängel und Fehlbestände sind innerhalb von 5 Arbeitstagen nach Ablieferung schriftlich anzuzeigen, versteckte Mängel innerhalb von 3 Tagen nach Entdeckung.</p>
              <p className="mt-2">3. Bei berechtigter und fristgerechter Mängelrüge wird mangelhafte Ware nur in Originalverpackung zurückgenommen und innerhalb von 10 Tagen nach Rückempfang ersetzt.</p>
            </div>

            {/* §11 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§11 Erfüllungsort/Gerichtsstand</h3>
              <p>1. Erfüllungsort für sämtliche Leistungen und Gegenleistungen ist der Sitz in 86150 Augsburg.</p>
              <p className="mt-2">2. Für sämtliche Ansprüche aus den abgeschlossenen Kaufverträgen ist, soweit der Käufer Kaufmann ist, Gerichtsstand der Sitz des Unternehmens.</p>
            </div>

            {/* §12 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§12 Haftungsausschluss</h3>
              <p>Soweit als Auftragnehmer nach Vorgaben und Weisung des Auftraggebers den oder die Vertragsgegenstände herzustellen ist, haftet der Auftraggeber dafür, dass dadurch keine Rechte Dritter verletzt werden. Der Auftraggeber ist verpflichtet, allen entstehenden Schaden zu ersetzen und von möglichen Schadensersatzansprüchen Dritter freizustellen.</p>
            </div>

            {/* §13 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§13 Schlussbestimmungen</h3>
              <p>Es gilt das Recht der Bundesrepublik Deutschland. Die Bestimmungen des UN-Kaufrechts finden keine Anwendung. Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertrag unser Geschäftssitz.</p>
            </div>

            {/* §14 Widerrufsbelehrung Waren */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§14 Widerrufsbelehrung für Waren</h3>
              <p className="font-semibold">Widerrufsrecht</p>
              <p className="mt-1">Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.</p>
              <p className="mt-2">Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
              <p className="mt-2 font-semibold">Folgen des Widerrufs</p>
              <p className="mt-1">Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten, unverzüglich und spätestens binnen vierzehn Tagen zurückzuzahlen. Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen an uns zurückzusenden. Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.</p>
              <div className="mt-3 p-4 bg-secondary border border-border rounded">
                <p className="font-semibold mb-2">Muster-Widerrufsformular</p>
                <p>An: Wellness24 GmbH, c/o Regus Business Center, Viktoria Str 3b, 86150 Augsburg, Deutschland</p>
                <p className="mt-1">E-Mail: info@hypnoseinstitut-woods.com</p>
                <p className="mt-2">Hiermit widerrufe(n) ich/wir den abgeschlossenen Vertrag über den Kauf der folgenden Waren / die Erbringung der folgenden Dienstleistung:</p>
                <p className="mt-1">– Bestellt am / erhalten am</p>
                <p>– Name des/der Verbraucher(s)</p>
                <p>– Anschrift des/der Verbraucher(s)</p>
                <p>– Unterschrift (nur bei Mitteilung auf Papier)</p>
                <p>– Datum</p>
              </div>
            </div>

            {/* §15 Widerrufsbelehrung digitale Inhalte */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§15 Widerrufsbelehrung für digitale Inhalte</h3>
              <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>
            </div>

            {/* §16 */}
            <div>
              <h3 className="font-light text-primary mb-2 tracking-tight">§16 Informationen zur Online-Streitbeilegung</h3>
              <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://ec.europa.eu/consumers/odr</a></p>
              <p className="mt-2">Alternative Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO und § 36 VSBG: Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
