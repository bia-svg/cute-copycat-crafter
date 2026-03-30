import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr, Button,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "David J. Woods"

interface LeadConfirmationProps {
  name?: string
  concern?: string
  formType?: string
  notes?: string
  language?: string
  phone?: string
  email?: string
  address?: string
  sessionDate?: string
  sessionTime?: string
  sessionLocation?: string
  dateOfBirth?: string
  seminarDate?: string
  seminarLocation?: string
  bestTime?: string
  message?: string
  profession?: string
  registrationNumber?: string
}

const LeadConfirmationEmail = (props: LeadConfirmationProps) => {
  const isEN = props.language === 'en'
  const isSession = props.formType === 'session'
  const isSeminar = props.formType === 'seminar'

  const formTypeLabel = isSession
    ? (isEN ? 'Session / Appointment' : 'Sitzung / Termin')
    : isSeminar
      ? (isEN ? 'Seminar Registration' : 'Seminar-Anmeldung')
      : props.formType

  return (
    <Html lang={isEN ? 'en' : 'de'} dir="ltr">
      <Head />
      <Preview>
        {isEN
          ? `Thank you, ${props.name || ''}! We received your request.`
          : `Vielen Dank, ${props.name || ''}! Wir haben Ihre Anfrage erhalten.`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {isEN
              ? `Thank you${props.name ? `, ${props.name}` : ''}!`
              : `Vielen Dank${props.name ? `, ${props.name}` : ''}!`}
          </Heading>

          {isSeminar && props.registrationNumber && (
            <Section style={regNumberBox}>
              <Text style={regNumberLabel}>
                {isEN ? 'Registration Number' : 'Anmelde-Nr.'}
              </Text>
              <Text style={regNumberValue}>
                {props.registrationNumber}
              </Text>
            </Section>
          )}

          <Text style={text}>
            {isEN
              ? 'We have received your request and will get back to you as soon as possible. Below is a summary of the information you submitted:'
              : 'Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden. Nachfolgend eine Zusammenfassung Ihrer übermittelten Daten:'}
          </Text>

          <Section style={summaryBox}>
            {formTypeLabel && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Request type' : 'Anfragetyp'}:</strong> {formTypeLabel}
              </Text>
            )}
            {props.concern && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Concern' : 'Anliegen'}:</strong> {props.concern}
              </Text>
            )}
            {props.email && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Email' : 'E-Mail'}:</strong> {props.email}
              </Text>
            )}
            {props.phone && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Phone' : 'Telefon'}:</strong> {props.phone}
              </Text>
            )}
            {props.address && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Address' : 'Adresse'}:</strong> {props.address}
              </Text>
            )}
            {props.dateOfBirth && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Date of Birth' : 'Geburtsdatum'}:</strong> {props.dateOfBirth}
              </Text>
            )}
            {props.profession && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Profession' : 'Beruf'}:</strong> {props.profession}
              </Text>
            )}

            {/* Session-specific */}
            {isSession && props.sessionDate && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Session Date' : 'Sitzungsdatum'}:</strong> {props.sessionDate}
              </Text>
            )}
            {isSession && props.sessionTime && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Session Time' : 'Sitzungszeit'}:</strong> {props.sessionTime}
              </Text>
            )}
            {isSession && props.sessionLocation && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Session Location' : 'Sitzungsort'}:</strong> {props.sessionLocation}
              </Text>
            )}

            {/* Seminar-specific */}
            {isSeminar && props.seminarDate && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Seminar Date' : 'Seminartermin'}:</strong> {props.seminarDate}
              </Text>
            )}
            {isSeminar && props.seminarLocation && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Seminar Location' : 'Seminarort'}:</strong> {props.seminarLocation}
              </Text>
            )}

            {/* General */}
            {props.bestTime && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Best time to reach you' : 'Beste Erreichbarkeit'}:</strong> {props.bestTime}
              </Text>
            )}
            {props.message && (
              <Text style={summaryLine}>
                <strong>{isEN ? 'Your message' : 'Ihre Nachricht'}:</strong> {props.message}
              </Text>
            )}
          </Section>

          {isSeminar && (
            <Section style={invoiceNote}>
              <Text style={invoiceText}>
                {isEN
                  ? '📄 You will receive a written invoice by email shortly.'
                  : '📄 Sie erhalten in Kürze eine schriftliche Rechnung per E-Mail.'}
              </Text>
            </Section>
          )}

          <Text style={text}>
            {isEN
              ? 'If you have any questions in the meantime, feel free to reach out to us directly.'
              : 'Sollten Sie in der Zwischenzeit Fragen haben, können Sie sich gerne direkt an uns wenden.'}
          </Text>

          <Button style={ctaButton} href="https://david-j-woods.com">
            {isEN ? 'Visit our website' : 'Unsere Website besuchen'}
          </Button>

          {isSession && (
            <>
              <Hr style={hr} />

              <Text style={sessionInfoText}>
                Unsere Hypnosesitzungen werden vor Ort in bar bezahlt.
              </Text>
              <Text style={sessionInfoText}>
                Ich akzeptiere die Allgemeinen Geschäftsbedingungen
              </Text>
              <Text style={sessionInfoText}>
                Ich willige ein, dass diese Website meine übermittelten Informationen speichert, sodass meine Anfrage beantwortet werden kann.
              </Text>

              <Hr style={thinHr} />

              <Text style={locationHeading}>Sitzungen in Deutschland:</Text>
              <Text style={locationText}>
                Regus Business center.<br />
                Viktoria Str 3b. 2 Floor<br />
                86150 Augsburg (Am Hauptbahnhof)
              </Text>

              <Text style={locationHeading}>Sitzungen in der Schweiz:</Text>
              <Text style={locationText}>
                Zürich – Beim Löwenplatz<br />
                Usteristrasse 23 ·<br />
                8001 Zürich<br />
                (In den Räumen von 5 Elements TCM GmbH<br />
                5 Gehminuten vom Hauptbahnhof)
              </Text>
              <Text style={locationText}>
                ZISAG AG / Fit &amp; Gsund<br />
                Linke Eingang / 2. Stock<br />
                Churzhaslen 3.<br />
                8733 Eschenbach (Am Zürichsee)
              </Text>

              <Hr style={thinHr} />

              <Text style={pricingText}>
                <strong>Intensiv Sitzungen ca. 2,5 Std.</strong><br />
                In Deutschland kosten 690 Euro.<br />
                In der Schweiz kosten 750 CHF.
              </Text>
              <Text style={pricingText}>
                <strong>Aufbau Sitzungen ca. 2 Std</strong><br />
                In Deutschland kosten 590 Euro.<br />
                In der Schweiz kosten 650 CHF.
              </Text>
              <Text style={pricingText}>
                EMR Krankenkasse Konform<br />
                ZSR Nr. P609264<br />
                &quot;Erfahrungs Medizinische Register&quot;
              </Text>

              <Hr style={thinHr} />

              <Text style={sessionInfoText}>
                Die Bezahlung der Sitzung erfolgt vor Ort in bar.
              </Text>

              <Hr style={thinHr} />

              <Text style={cancelText}>
                Bitte beachten Sie auch unsere Allgemeinen Geschäftsbedingungen für Sitzungen unter:{' '}
                <a href="https://david-j-woods.com/agbs/" style={{ color: '#1B3A5C' }}>https://david-j-woods.com/agbs/</a>
              </Text>
              <Text style={cancelText}>
                Absagen einer vereinbarten Sitzung sind bis 5 volle Werktage vor dem Termin kostenlos möglich. Bei späteren Absagen bis 2 volle Werktage vor dem Termin wird eine Gebühr von 50 % des Sitzungspreises fällig. Bei Unangekündigten Fernbleiben oder Absage weniger als 2 volle Werktage vor dem vereinbarten Termin stellen wir gemäß § 615 BGB den vollen Sitzungspreis in Rechnung.
              </Text>

              <Hr style={thinHr} />

              <Text style={closingText}>
                Wir freuen uns auf Ihren Besuch<br /><br />
                Ihr Team von Hypnose-Institut David J. Woods<br />
                Life Coaching Schweiz GmbH<br />
                Wellness24 GmbH
              </Text>
            </>
          )}

          <Hr style={hr} />

          <Text style={footer}>
            {isEN ? 'Best regards,' : 'Mit freundlichen Grüssen,'}<br />
            {SITE_NAME}<br />
            Aktiv-Hypnose© — {isEN ? 'Psychology & Hypnotherapy' : 'Psychologie & Hypnotherapie'}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: LeadConfirmationEmail,
  subject: (data: Record<string, any>) => {
    const isEN = data.language === 'en'
    const isSessionConfirmation = data.formType === 'session' && data.concern?.includes('Terminbestätigung')
    if (data.formType === 'seminar' && data.registrationNumber) {
      return isEN
        ? `Registration #${data.registrationNumber} — David J. Woods`
        : `Anmeldung #${data.registrationNumber} — David J. Woods`
    }
    if (isSessionConfirmation) {
      return isEN
        ? 'Session confirmed — David J. Woods'
        : 'Sitzung bestätigt — David J. Woods'
    }
    return isEN
      ? 'Your request has been received — David J. Woods'
      : 'Ihre Anfrage wurde empfangen — David J. Woods'
  },
  displayName: 'Lead confirmation to submitter',
  previewData: {
    name: 'Maria',
    concern: 'Seminar-Anmeldung',
    formType: 'seminar',
    email: 'maria@example.com',
    phone: '+41 79 123 45 67',
    address: 'Bahnhofstrasse 10, 8001 Zürich, Schweiz',
    seminarDate: 'Mo-Sa, 15.-20. Juni 2026',
    seminarLocation: '"Fit+Gsund" Churzhaslen 3, 8733 Eschenbach',
    dateOfBirth: '12.05.1985',
    profession: 'Psychologin',
    registrationNumber: '12145',
    message: 'Freue mich auf das Seminar',
    language: 'de',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '24px 28px', maxWidth: '600px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1B3A5C', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.6', margin: '0 0 16px' }
const summaryBox = { backgroundColor: '#f8f8f6', padding: '16px 20px', borderRadius: '4px', margin: '0 0 20px' }
const summaryLine = { fontSize: '13px', color: '#333', margin: '0 0 6px', lineHeight: '1.5' }
const regNumberBox = { backgroundColor: '#E8F5E9', padding: '12px 20px', borderRadius: '4px', margin: '0 0 16px', textAlign: 'center' as const }
const regNumberLabel = { fontSize: '11px', color: '#2E7D32', fontWeight: '600' as const, textTransform: 'uppercase' as const, margin: '0 0 4px', letterSpacing: '0.5px' }
const regNumberValue = { fontSize: '24px', fontWeight: 'bold' as const, color: '#1B3A5C', margin: '0' }
const invoiceNote = { backgroundColor: '#FFF8E1', padding: '12px 16px', borderRadius: '4px', margin: '0 0 16px' }
const invoiceText = { fontSize: '13px', color: '#5D4037', margin: '0' }
const ctaButton = {
  backgroundColor: '#2E7D32',
  color: '#ffffff',
  padding: '10px 24px',
  borderRadius: '4px',
  fontSize: '14px',
  fontWeight: '600' as const,
  textDecoration: 'none',
  display: 'inline-block' as const,
}
const hr = { borderColor: '#e5e5e5', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#999', margin: '0', lineHeight: '1.6' }
