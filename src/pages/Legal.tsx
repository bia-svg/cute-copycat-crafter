import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";


export function Impressum() {
  const { language, country, } = useLanguage();
  const isEN = language === "en";
  return (
    <>
      <SEO {...pageSEO.impressum} pageKey="impressum" />
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
              <p>{isEN ? "Please contact us via WhatsApp or phone." : "Bitte kontaktieren Sie uns per WhatsApp oder Telefon."}</p>
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
  const { language, country, } = useLanguage();
  const isEN = language === "en";
  return (
    <>
      <SEO {...pageSEO.privacy} pageKey="privacy" />
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
  return (
    <>
      <SEO {...pageSEO.terms} />
      <section className="bg-white">
        <div className="container-main py-8 lg:py-12 max-w-3xl">
          <h1 className="text-2xl font-bold text-primary mb-2">AGB</h1>
          <p className="text-lg text-muted-foreground mb-8">AGBs für die Ausbildungen und Einzel- und Gruppensitzungen</p>

          <div className="space-y-6 text-sm text-foreground leading-relaxed">
            {/* Datenschutz Hinweis */}
            <div>
              <h2 className="font-semibold text-primary mb-2">Datenschutz Hinweis</h2>
              <p>Ihre personengebundenen Daten, die z.B. durch Nutzung der Kontaktseite oder Emails an uns übermittelt werden, werden nur im Rahmen der gesetzlichen Vorschriften des Bundesdatenschutzgesetzes (BDSG) sowie des Teledienstdatenschutzgesetzes (TDDSG) erhoben. Eine Weitergabe an Dritte ist ausgeschlossen. Die endgültige Löschung der Daten bedarf einer schriftlichen Mitteilung.</p>
            </div>

            {/* 1. Hypnose-Sitzungen */}
            <div>
              <h2 className="font-semibold text-primary mb-2">1. Hypnose-Sitzungen</h2>
              <p>Termine für Einzelsitzungen können telefonisch, per Email und auch in persönlicher Absprache vereinbart werden. Die Rechtsverbindlichkeit besteht dabei nicht erst in einer schriftlichen Auftragsform oder Zusage, sondern entsteht bereits durch eine Vereinbarung per Email oder mündlich. Die Anmeldebestätigung kann per E-Mail versendet werden. Mit Absenden des Anmelde-Formulars per E-Mail erklärt sich der Absender mit den AGBs einverstanden.</p>
              <p className="mt-2">Der Erfolg einer Hypnose hängt maßgeblich von dem Willen und der Aufmerksamkeit des Klienten ab. Die Tätigkeit des Hypnotiseurs ersetzt nicht die eines Arztes, Psychiaters oder Heilpraktikers. Der Hypnotiseur behandelt weder Krankheiten noch stellt er Diagnosen. Als Resultat der Hypnose wird ein stark verbessertes Lebensgefühl angestrebt, das sich in der Regel auch positiv auf die Therapie psychischer und körperlicher Krankheiten auswirken kann.</p>
              <p className="mt-2">Der Hypnotiseur arbeitet eng mit Ärzten und Psychotherapeuten zusammen und behält sich das Recht vor, Sie im Bedarfsfall an Spezialisten zu verweisen. Bei minderjährigen Klienten muss die Terminbestätigung von einem Erziehungsberechtigten erfolgen.</p>
            </div>

            {/* 2. Teilnahme an einer Ausbildung */}
            <div>
              <h2 className="font-semibold text-primary mb-2">2. Teilnahme an einer Ausbildung</h2>
              <p>Eine Teilnahme an Ausbildungen ist ab 18 Jahren möglich. Die Anmeldung für Ausbildungen ist grundsätzlich nur auf unserem Anmeldeformular in der Website möglich. Die Anmeldung ist für den Teilnehmer verbindlich. Die Teilnahmegebühr ist laut dem Zahlungsziel der Rechnung zu begleichen.</p>
              <p className="mt-2">Bei Anmeldungen wird die Anzahlung der Seminargebühr wie in der Seminarbeschreibung angegeben, abgerechnet. Bei einer kurzfristigen Anmeldung, d.h. innerhalb von 14 Tagen vor Beginn einer Ausbildung, ist die Teilnahmegebühr in voller Höhe unmittelbar nach Erhalt der Anmeldebestätigung/Rechnung zu zahlen.</p>
              <p className="mt-2">Die Anmeldebestätigung/Rechnung kann per E-Mail versendet werden. Mit Absenden des Anmelde-Formulars auf unserer Homepage erklärt sich der Absender mit den AGBs einverstanden. Der Rechnungsbetrag beinhaltet die derzeit gültige MwSt. Im Falle einer MwSt. Befreiung unsererseits ist der Teilnehmer nicht berechtigt diese rückwirkend von uns einzufordern.</p>
              <p className="mt-2">Der Erfolg einer Hypnose-Ausbildung hängt maßgeblich von dem Willen und der Aufmerksamkeit des Klienten ab. Der Hypnotiseur / Ausbildungsleiter arbeitet eng mit Ärzten und Psychotherapeuten zusammen.</p>
              <p className="mt-2">Die Inanspruchnahme von Rabatten ist nur möglich, wenn die angebotenen Leistungen vom Kunden – wie in der Rabattaktion erläutert – auch in vollem Umfang genutzt und gezahlt werden. Wurde ein Rabatt vom Hypnoseinstitut David Woods für bestimmte Leistungen wie z.B. Ausbildungen, gewährt und wurden die Leistungen nicht genutzt beziehungsweise – in vollem Umfang bezahlt, so muss der Kunde den gewährten Rabatt an das Hypnoseinstitut David Woods zurück erstatten.</p>
              <p className="mt-2">Die Seminare (außer Praxis Workshops) können jederzeit für 50% des jeweils gültigen Seminarpreises wiederholt werden, sofern Plätze vorhanden sind.</p>
            </div>

            {/* 3. Abrechnung */}
            <div>
              <h2 className="font-semibold text-primary mb-2">3. Abrechnung</h2>
              <p>Die Abrechnung erfolgt immer direkt zwischen mir als Hypnotiseur und dem Klienten. Eine Abrechnung gegenüber Dritten, wie z.B. Versicherungen, ist nicht möglich. Die Zahlung des Rechnungsbetrages erfolgt im Anschluss an die Hypnose-Sitzungen direkt in bar. In Ausnahmefällen und bei Ausbildungen kann eine Vorauszahlung per Überweisung (Vorkasse) verlangt werden.</p>
              <p className="mt-2">Maßgeblich für die Einhaltung der Zahlungsfrist ist der Eingang der Zahlung auf dem Bankkonto. In Ausnahmefällen ist nach Rücksprache eine Ratenzahlung möglich. Im Falle eines Zahlungsverzuges behalte ich mir vor, Mahngebühren sowie Verzugszinsen in üblicher Höhe in Rechnung zu stellen.</p>
              <p className="mt-2">Die Fälligkeit eines Rechnungsbetrages oder Teilbetrages kann nicht von einem unmittelbaren Erfolg abhängig gemacht werden. Die Seminarteilnehmer erklären sich damit einverstanden, dass mit ihnen während der Seminare gedrehte Filme im Internet verwendet werden dürfen. Sollte dies ein Teilnehmer nicht wünschen, erklärt er dies schriftlich beim Seminar.</p>
              <p className="mt-2 font-semibold">ZOOM-Calls und Vor-Ort-Termine nur gegen Vorauszahlung!</p>
            </div>

            {/* 4. Rücktritt Sitzungen */}
            <div>
              <h2 className="font-semibold text-primary mb-2">4. Rücktritt von Terminen für Hypnose-Sitzungen</h2>
              <p>Absagen einer vereinbarten Sitzung sind bis 5 volle Werktage vor dem Termin kostenlos möglich. Bei späteren Absagen bis 2 volle Werktage vor dem Termin wird eine Gebühr von 50 % des Sitzungspreises fällig. Bei unangekündigtem Fernbleiben oder Absage weniger als 2 volle Werktage vor dem vereinbarten Termin stellen wir gemäß § 615 BGB den vollen Sitzungspreis in Rechnung.</p>
              <p className="mt-2">Dem Kunden bleibt jederzeit das Recht vorbehalten, nachzuweisen, dass der geltend gemachte Schaden nicht oder nicht in dieser Höhe angefallen ist.</p>
            </div>

            {/* 5. Rücktritt Ausbildung */}
            <div>
              <h2 className="font-semibold text-primary mb-2">5. Rücktritt von der Teilnahme an einer Ausbildung</h2>
              <p>Ein Rücktritt ist prinzipiell nicht möglich, jedoch kann in Ausnahmefällen der Termin einmal verschoben werden. Absagen innerhalb von 14 Tagen vor dem Termin oder Nichterscheinen können nicht berücksichtigt werden, die Seminargebühr wird in voller Höhe fällig. Nach Rücksprache mit unserem Institut kann eine geeignete Ersatzperson den Ausbildungstermin wahrnehmen. Bricht ein Teilnehmer nach Ausbildungsbeginn diese ab, werden erfolgte Zahlungen nicht zurückerstattet.</p>
              <p className="mt-2">Wird ein Ausbildungstermin von Herrn Woods selbst storniert und ersatzlos gestrichen, wird die Vorauszahlung erstattet. Ausbildungstermine können aus wichtigem Grund (zu geringe Teilnehmerzahl, Krankheit des Ausbildungsleiters, o.ä.) ersatzlos abgesagt werden. Die Absage erfolgt, sofern noch möglich, per E-Mail oder telefonisch. Bereits erfolgte Zahlungen werden in diesem Fall unverzüglich zurückerstattet.</p>
              <p className="mt-2">Terminverschiebungen aufgrund höherer Gewalt berechtigen nicht zur Rückforderungen bereits bezahlter Beträge. Im Falle einer Erkrankung des Ausbildungsleiters oder anderer nicht vorhersehbarer Ereignisse, die den Einsatz des angegeben Ausbildungsleiters unmöglich machen, sind wir ermächtigt, einen anderen qualifizierten Dozenten für die betreffende Ausbildung einzusetzen.</p>
              <p className="mt-2">Dem Kunden bleibt jederzeit das Recht vorbehalten, nachzuweisen, dass der geltend gemachte Schaden nicht oder nicht in dieser Höhe angefallen ist.</p>
            </div>

            {/* 6. Tagesseminare */}
            <div>
              <h2 className="font-semibold text-primary mb-2">6. Teilnahme an den Tagesseminaren</h2>
              <p>Die Teilnahme an den Tagesseminaren ist verbindlich. Kosten können nicht zurück erstattet werden. Sie können jedoch die Teilnahme an andere Personen übertragen. Dies muss jedoch von der Life Coaching Schweiz GmbH telefonisch oder schriftlich bestätigt werden. Sollte das Seminar wegen Krankheit des Seminarleiters oder zu wenigen Teilnehmern abgesagt werden, können die Kosten zum vollen Preis zurückerstattet werden.</p>
            </div>

            {/* 7. Ablehnung */}
            <div>
              <h2 className="font-semibold text-primary mb-2">7. Ablehnung/Ausschluss von Teilnehmern/Klienten</h2>
              <p>Hypnotiseur und Ausbildungsleiter David Woods ist ermächtigt, Teilnehmer vor/während der Ausbildung / Einzelsitzung ohne Angabe von Gründen abzulehnen. Bereits gezahlte Gebühren werden in diesem Fall anteilsmäßig zurückerstattet.</p>
              <p className="mt-2">Teilnehmer, die wiederholt den Ablauf von Ausbildungen oder Einzelsitzungen stören oder die Ausbildung / die Einzelsitzung zur Anwerbung von Personen bzw. zum Verkauf von Fremdprodukten missbrauchen, können vom Ausbildungsleiter oder der Geschäftsleitung von der Ausbildung / von der Einzelsitzung ausgeschlossen werden. Die Ausbildungs- oder Einzelsitzungsgebühr ist in diesem Fall zu 100 v.H. zu entrichten.</p>
            </div>

            {/* 8. Ersatz */}
            <div>
              <h2 className="font-semibold text-primary mb-2">8. Recht zum qualifizierten Ersatz</h2>
              <p>Im kurzfristigen Krankheitsfall von Herrn Woods oder einem seiner Mitarbeiter ist es der Life Coaching Schweiz GmbH gestattet, die vereinbarte Hypnosesitzung von einem gleichwertig qualifizierten Hypnotiseur durchführen zu lassen.</p>
            </div>

            {/* 9. Datenschutz */}
            <div>
              <h2 className="font-semibold text-primary mb-2">9. Datenschutz</h2>
              <p>Aufzeichnungen über die Hypnose, sofern vorhanden, sind Dritten nicht zugänglich und werden längstens 8 Jahre aufbewahrt. Eine Herausgabe von Unterlagen erfolgt nur in Ausnahmefällen und nach vorheriger Absprache. Die Löschung der Daten bedarf einer schriftlichen Mitteilung.</p>
              <p className="mt-2">Die Seminarteilnehmer erklären sich damit einverstanden, dass mit ihnen während der Seminare gedrehte Filme im Internet verwendet werden dürfen. Sollte dies ein Teilnehmer nicht wünschen, erklärt er dies schriftlich beim Seminar.</p>
            </div>

            {/* 10. Gerichtsstand */}
            <div>
              <h2 className="font-semibold text-primary mb-2">10. Gerichtsstand</h2>
              <p>Gerichtsstand ist St. Gallen.</p>
            </div>

            {/* 11. Online-Streitbeilegung */}
            <div>
              <h2 className="font-semibold text-primary mb-2">11. Informationen zur Online-Streitbeilegung</h2>
              <p>Die EU-Kommission stellt eine Internetplattform zur Online-Beilegung von Streitigkeiten (sog. „OS-Plattform") bereit. Die OS-Plattform dient als Anlaufstelle zur außergerichtlichen Beilegung von Streitigkeiten betreffend vertragliche Verpflichtungen, die aus Online-Kaufverträgen erwachsen. Die OS-Plattform ist unter folgendem Link erreichbar: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://ec.europa.eu/consumers/odr</a></p>
            </div>

            {/* 12. Salvatorische Klausel */}
            <div>
              <h2 className="font-semibold text-primary mb-2">12. Salvatorische Klausel</h2>
              <p>Sollte eine der vorstehenden Klauseln der AGB ungültig sein, so wird damit die Wirksamkeit der übrigen Bestimmungen nicht beeinflusst. An die Stelle einer unwirksamen Bedingung tritt eine solche, welche den gesetzlichen Regelungen unter Berücksichtigung des Vertragszweckes am nächsten kommt.</p>
              <p className="mt-2 text-muted-foreground">Augsburg, 18.05.2015</p>
            </div>

            {/* ════════ ONLINE SHOP AGBs ════════ */}
            <hr className="border-border my-8" />
            <h2 className="text-xl font-bold text-primary mb-4">AGBs für den Online Shop</h2>

            {/* §1 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§1 Allgemeines</h3>
              <p>1. Sämtliche, auch zukünftige, Lieferungen und Leistungen von david-j-woods.com erfolgen ausschließlich aufgrund der nachstehenden Bedingungen. Bei Auftragserteilung, spätestens mit der Entgegennahme unserer Waren, gelten diese Bedingungen als angenommen.</p>
              <p className="mt-2">2. Einkaufsbedingungen des Käufers wird hiermit widersprochen. Das Verkaufspersonal ist nicht berechtigt, Einkaufsbedingungen des Käufers als verbindlich anzuerkennen. Mündliche Nebenabreden bedürfen zu ihrer Wirksamkeit der schriftlichen Bestätigung.</p>
              <p className="mt-2">3. Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein, so bleiben die Bedingungen im Übrigen voll wirksam.</p>
            </div>

            {/* §2 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§2 Vertragsschluss</h3>
              <p>1. Die Angebote und Preislisten sind freibleibend. Ein Zwischenverkauf von noch nicht verbindlich bestellter Ware ist stets vorbehalten.</p>
              <p className="mt-2">2. Sämtliche Bestellungen müssen schriftlich bzw. fernschriftlich bestätigt werden. Die Bestätigung kann durch die Auslieferung der bestellten Ware ersetzt werden.</p>
            </div>

            {/* §3 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§3 Lieferfristen, Lieferzeit</h3>
              <p>1. Lieferfristen und -termine gelten nur annähernd, es sei denn, dass diese schriftlich und ausdrücklich als verbindlich bezeichnet wurden.</p>
              <p className="mt-2">2. Lieferfristen und Liefertermine verlängern sich um den Zeitraum, um den der Käufer mit seinen Verpflichtungen in Verzug ist. Gleiches gilt bei Ereignissen höherer Gewalt.</p>
              <p className="mt-2">3. Erfolgt die Abnahme der Ware durch Verschulden des Käufers nicht rechtzeitig, so steht uns nach Setzung einer Nachfrist von 10 Tagen das Recht zu, eine Rückstandsrechnung auszustellen oder vom Vertrag zurückzutreten.</p>
            </div>

            {/* §4 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§4 Unterbrechung der Lieferung</h3>
              <p>Wird die Einhaltung von Lieferterminen durch Gründe verzögert oder unmöglich gemacht, die nicht zu vertreten sind (z.B. höhere Gewalt, Arbeitskämpfe, behördliche Maßnahmen), so verlängert sich die Liefer- bzw. Abnahmefrist um die Dauer der Verhinderung, längstens jedoch um 8 Wochen. Schadensersatzansprüche sind ausgeschlossen.</p>
            </div>

            {/* §5 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§5 Nachlieferungsfrist</h3>
              <p>Bei Vertragsabschluss wird automatisch eine Nachlieferungsfrist von 18 Tagen vereinbart. Nach ergebnislosem Ablauf dieser Nachlieferungsfrist kann der Käufer vom Vertrag zurücktreten.</p>
            </div>

            {/* §6 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§6 Versand, Gefahrenübergang und Teillieferung</h3>
              <p>1. Verpackung, Versandweg und Transportmittel sind mangels besonderer Vereinbarung unserer Wahl überlassen. Die Versandkosten trägt grundsätzlich der Käufer.</p>
              <p className="mt-2">2. Die Gefahr geht spätestens auf den Käufer über, sobald die Waren unser Lager verlassen haben. Dies gilt auch für Teillieferungen.</p>
            </div>

            {/* §7 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§7 Zahlung</h3>
              <p>1. Die Rechnung wird zum Tage der Lieferung bzw. der Bereitstellung der Ware ausgestellt.</p>
              <p className="mt-2">2. Es gelten die bei Auftragserteilung vereinbarten Zahlungsbedingungen. Ist keine Zahlungsbedingung schriftlich festgelegt worden, tritt automatisch „netto zahlbar bei Warenerhalt" in Kraft.</p>
              <p className="mt-2">3. Die Zahlung hat ausschließlich an uns zu erfolgen.</p>
              <p className="mt-2">4. Werden anstelle von barem Geld Schecks gegeben, so werden diese nur erfüllungshalber angenommen.</p>
            </div>

            {/* §8 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§8 Zahlungsverzug</h3>
              <p>1. Bei Zahlung nach Fälligkeit können Verzugszinsen in Höhe der banküblichen Sollzinsen, mindestens 5% über dem Basiszinssatz, verlangt werden.</p>
              <p className="mt-2">2. Ist der Käufer mit einer Zahlung in Verzug, kann für noch ausstehende Lieferung Zahlung vor Ablieferung verlangt werden.</p>
              <p className="mt-2">3. Wird die entsprechende Zahlung nicht gewährt, kann vom Vertrag zurückgetreten und Schadensersatz in Höhe von mindestens 30% vom Auftragswert verlangt werden.</p>
              <p className="mt-2">4. Der Käufer ist nicht berechtigt, den Kaufpreis wegen etwaiger Gegenansprüche zurückzubehalten. Ein Aufrechnungsrecht besteht nur bei unbestrittenen oder rechtskräftig festgestellten Ansprüchen.</p>
            </div>

            {/* §9 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§9 Eigentumsvorbehalt</h3>
              <p>Alle gelieferten Waren bleiben bis zur Erfüllung sämtlicher Ansprüche unser Eigentum (Vorbehaltsware). Bei laufender Rechnung gilt das vorbehaltene Eigentum zur Sicherung unserer Saldoforderung.</p>
            </div>

            {/* §10 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§10 Mängelrüge und Gewährleistungen</h3>
              <p>1. Der Käufer hat die Ware unverzüglich nach Erhalt zu überprüfen. Handelsübliche, technisch nicht vermeidbare Abweichungen dürfen nicht beanstandet werden.</p>
              <p className="mt-2">2. Erkennbare Mängel und Fehlbestände sind innerhalb von 5 Arbeitstagen nach Ablieferung schriftlich anzuzeigen, versteckte Mängel innerhalb von 3 Tagen nach Entdeckung.</p>
              <p className="mt-2">3. Bei berechtigter und fristgerechter Mängelrüge wird mangelhafte Ware nur in Originalverpackung zurückgenommen und innerhalb von 10 Tagen nach Rückempfang ersetzt.</p>
            </div>

            {/* §11 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§11 Erfüllungsort/Gerichtsstand</h3>
              <p>1. Erfüllungsort für sämtliche Leistungen und Gegenleistungen ist der Sitz in 86150 Augsburg.</p>
              <p className="mt-2">2. Für sämtliche Ansprüche aus den abgeschlossenen Kaufverträgen ist, soweit der Käufer Kaufmann ist, Gerichtsstand der Sitz des Unternehmens.</p>
            </div>

            {/* §12 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§12 Haftungsausschluss</h3>
              <p>Soweit als Auftragnehmer nach Vorgaben und Weisung des Auftraggebers den oder die Vertragsgegenstände herzustellen ist, haftet der Auftraggeber dafür, dass dadurch keine Rechte Dritter verletzt werden. Der Auftraggeber ist verpflichtet, allen entstehenden Schaden zu ersetzen und von möglichen Schadensersatzansprüchen Dritter freizustellen.</p>
            </div>

            {/* §13 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§13 Schlussbestimmungen</h3>
              <p>Es gilt das Recht der Bundesrepublik Deutschland. Die Bestimmungen des UN-Kaufrechts finden keine Anwendung. Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertrag unser Geschäftssitz.</p>
            </div>

            {/* §14 Widerrufsbelehrung Waren */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§14 Widerrufsbelehrung für Waren</h3>
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
              <h3 className="font-semibold text-primary mb-2">§15 Widerrufsbelehrung für digitale Inhalte</h3>
              <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>
            </div>

            {/* §16 */}
            <div>
              <h3 className="font-semibold text-primary mb-2">§16 Informationen zur Online-Streitbeilegung</h3>
              <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://ec.europa.eu/consumers/odr</a></p>
              <p className="mt-2">Alternative Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO und § 36 VSBG: Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
