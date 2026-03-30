import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr, Button,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "David J. Woods"

interface NewLeadProps {
  name?: string
  email?: string
  phone?: string
  concern?: string
  formType?: string
  city?: string
  country?: string
  language?: string
  notes?: string
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
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

const NewLeadNotificationEmail = (props: NewLeadProps) => {
  const isEN = props.language === 'en'
  const isSession = props.formType === 'session'
  const isSeminar = props.formType === 'seminar'

  return (
    <Html lang={isEN ? 'en' : 'de'} dir="ltr">
      <Head />
      <Preview>{isEN ? 'New Lead' : 'Neuer Lead'}: {props.name || (isEN ? 'Unknown' : 'Unbekannt')} — {props.concern || props.formType || (isEN ? 'Contact' : 'Kontakt')}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>📋 {isEN ? 'New Lead Received' : 'Neuer Lead eingegangen'}</Heading>

          {isSeminar && props.registrationNumber && (
            <Section style={regBox}>
              <Text style={regLabel}>{isEN ? 'Registration #' : 'Anmelde-Nr.'}</Text>
              <Text style={regValue}>{props.registrationNumber}</Text>
            </Section>
          )}

          {/* Contact Info */}
          <Section style={infoBox}>
            <Text style={sectionTitle}>{isEN ? '👤 Contact Information' : '👤 Kontaktdaten'}</Text>
            <Text style={label}>{isEN ? 'Name' : 'Name'}</Text>
            <Text style={value}>{props.name || '—'}</Text>
            <Text style={label}>{isEN ? 'Email' : 'E-Mail'}</Text>
            <Text style={value}>{props.email || '—'}</Text>
            <Text style={label}>{isEN ? 'Phone' : 'Telefon'}</Text>
            <Text style={value}>{props.phone || '—'}</Text>
            {props.address && (
              <>
                <Text style={label}>{isEN ? 'Address' : 'Adresse'}</Text>
                <Text style={value}>{props.address}</Text>
              </>
            )}
            <Text style={label}>{isEN ? 'City / Country' : 'Stadt / Land'}</Text>
            <Text style={value}>{[props.city, props.country].filter(Boolean).join(', ') || '—'}</Text>
            {props.dateOfBirth && (
              <>
                <Text style={label}>{isEN ? 'Date of Birth' : 'Geburtsdatum'}</Text>
                <Text style={value}>{props.dateOfBirth}</Text>
              </>
            )}
            {props.profession && (
              <>
                <Text style={label}>{isEN ? 'Profession' : 'Beruf'}</Text>
                <Text style={value}>{props.profession}</Text>
              </>
            )}
            <Text style={label}>{isEN ? 'Language' : 'Sprache'}</Text>
            <Text style={value}>{props.language || '—'}</Text>
          </Section>

          {/* Request Details */}
          <Section style={infoBox}>
            <Text style={sectionTitle}>{isEN ? '📝 Request Details' : '📝 Anfrage-Details'}</Text>
            <Text style={label}>{isEN ? 'Type' : 'Typ'}</Text>
            <Text style={value}>
              {isSession ? (isEN ? 'Session / Appointment' : 'Sitzung / Termin')
                : isSeminar ? (isEN ? 'Seminar Registration' : 'Seminar-Anmeldung')
                : props.formType || '—'}
            </Text>
            {props.concern && (
              <>
                <Text style={label}>{isEN ? 'Concern' : 'Anliegen'}</Text>
                <Text style={value}>{props.concern}</Text>
              </>
            )}

            {isSession && props.sessionDate && (
              <>
                <Text style={label}>{isEN ? 'Session Date' : 'Sitzungsdatum'}</Text>
                <Text style={value}>{props.sessionDate}</Text>
              </>
            )}
            {isSession && props.sessionTime && (
              <>
                <Text style={label}>{isEN ? 'Session Time' : 'Sitzungszeit'}</Text>
                <Text style={value}>{props.sessionTime}</Text>
              </>
            )}
            {isSession && props.sessionLocation && (
              <>
                <Text style={label}>{isEN ? 'Session Location' : 'Sitzungsort'}</Text>
                <Text style={value}>{props.sessionLocation}</Text>
              </>
            )}

            {isSeminar && props.seminarDate && (
              <>
                <Text style={label}>{isEN ? 'Seminar Date' : 'Seminartermin'}</Text>
                <Text style={value}>{props.seminarDate}</Text>
              </>
            )}
            {isSeminar && props.seminarLocation && (
              <>
                <Text style={label}>{isEN ? 'Seminar Location' : 'Seminarort'}</Text>
                <Text style={value}>{props.seminarLocation}</Text>
              </>
            )}

            {props.bestTime && (
              <>
                <Text style={label}>{isEN ? 'Best Time to Reach' : 'Beste Erreichbarkeit'}</Text>
                <Text style={value}>{props.bestTime}</Text>
              </>
            )}
            {props.message && (
              <>
                <Text style={label}>{isEN ? 'Message' : 'Nachricht'}</Text>
                <Text style={value}>{props.message}</Text>
              </>
            )}
          </Section>

          <Hr style={hr} />

          {/* Reply to Lead Buttons */}
          {props.email && (
            <Section style={{ textAlign: 'center' as const, margin: '16px 0' }}>
              <Button
                href={`mailto:${props.email}?subject=${encodeURIComponent(
                  props.language === 'en'
                    ? `Re: Your ${props.formType === 'seminar' ? 'Seminar Registration' : 'Inquiry'} — ${SITE_NAME}`
                    : `Re: Ihre ${props.formType === 'seminar' ? 'Seminar-Anmeldung' : 'Anfrage'} — ${SITE_NAME}`
                )}`}
                style={replyButton}
              >
                {`✉️ Reply to ${props.name?.split(' ')[0] || 'Lead'}`}
              </Button>
              {props.phone && (
                <>
                  <Button
                    href={`https://wa.me/${props.phone.replace(/[\s\-\(\)]/g, '').replace(/^\+/, '')}`}
                    style={whatsappButton}
                  >
                    {`💬 WhatsApp ${props.name?.split(' ')[0] || 'Lead'}`}
                  </Button>
                  <Button
                    href={`tel:${props.phone.replace(/\s/g, '')}`}
                    style={callButton}
                  >
                    {`📞 Call ${props.name?.split(' ')[0] || 'Lead'}`}
                  </Button>
                </>
              )}
            </Section>
          )}

          <Section style={trackingBox}>
            <Text style={trackingTitle}>Tracking</Text>
            <Text style={trackingText}>
              {isEN ? 'Source' : 'Quelle'}: {props.source || 'organic'}
              {props.utmSource && ` | utm_source: ${props.utmSource}`}
              {props.utmMedium && ` | utm_medium: ${props.utmMedium}`}
              {props.utmCampaign && ` | utm_campaign: ${props.utmCampaign}`}
            </Text>
          </Section>

          {isSession && (
            <>
              <Hr style={thinHr} />

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

          <Text style={footer}>
            {isEN
              ? `This email was sent automatically by ${SITE_NAME}.`
              : `Diese E-Mail wurde automatisch von ${SITE_NAME} gesendet.`}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: NewLeadNotificationEmail,
  subject: (data: Record<string, any>) => {
    const name = data.name || (data.language === 'en' ? 'Unknown' : 'Unbekannt')
    const isEN = data.language === 'en'

    if (data.formType === 'seminar') {
      const regPart = data.registrationNumber ? ` #${data.registrationNumber}` : ''
      return isEN
        ? `New Seminar Registration${regPart}: ${name}`
        : `Neue Seminar-Anmeldung${regPart}: ${name}`
    }
    if (data.formType === 'session') {
      return isEN
        ? `New Session Confirmation: ${name}`
        : `Neue Sitzungsbestätigung: ${name}`
    }
    return isEN
      ? `New Lead: ${name}`
      : `Neuer Lead: ${name}`
  },
  to: 'info@hypnoseinstitut-woods.com',
  displayName: 'New lead notification',
  previewData: {
    name: 'Max Mustermann',
    email: 'max@example.com',
    phone: '+41 79 123 45 67',
    concern: 'Seminar-Anmeldung',
    formType: 'seminar',
    city: 'Schweiz',
    country: 'CH',
    language: 'de',
    address: 'Bahnhofstrasse 10, 8001 Zürich, Schweiz',
    seminarDate: 'Mo-Sa, 15.-20. Juni 2026',
    seminarLocation: '"Fit+Gsund" Churzhaslen 3, 8733 Eschenbach',
    dateOfBirth: '12.05.1985',
    profession: 'Psychologin',
    registrationNumber: '12145',
    message: 'Freue mich auf das Seminar',
    source: 'organic',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '24px 28px', maxWidth: '600px' }
const h1 = { fontSize: '20px', fontWeight: 'bold' as const, color: '#1B3A5C', margin: '0 0 20px' }
const infoBox = { backgroundColor: '#f8f8f6', padding: '16px 20px', borderRadius: '4px', margin: '0 0 12px' }
const sectionTitle = { fontSize: '14px', fontWeight: '700' as const, color: '#1B3A5C', margin: '0 0 12px', borderBottom: '1px solid #e5e5e5', paddingBottom: '8px' }
const label = { fontSize: '11px', fontWeight: '600' as const, color: '#888', textTransform: 'uppercase' as const, margin: '10px 0 2px', letterSpacing: '0.5px' }
const value = { fontSize: '14px', color: '#333', margin: '0 0 4px', lineHeight: '1.4' }
const regBox = { backgroundColor: '#E8F5E9', padding: '12px 20px', borderRadius: '4px', margin: '0 0 16px', textAlign: 'center' as const }
const regLabel = { fontSize: '11px', color: '#2E7D32', fontWeight: '600' as const, textTransform: 'uppercase' as const, margin: '0 0 4px', letterSpacing: '0.5px' }
const regValue = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1B3A5C', margin: '0' }
const hr = { borderColor: '#e5e5e5', margin: '16px 0' }
const trackingBox = { padding: '0' }
const trackingTitle = { fontSize: '11px', fontWeight: '600' as const, color: '#888', textTransform: 'uppercase' as const, margin: '0 0 4px' }
const trackingText = { fontSize: '12px', color: '#666', margin: '0' }
const footer = { fontSize: '11px', color: '#aaa', margin: '24px 0 0', textAlign: 'center' as const }
const replyButton = { backgroundColor: '#1B3A5C', color: '#ffffff', padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' as const, textDecoration: 'none', display: 'inline-block' as const, margin: '0 8px 8px 0' }
const whatsappButton = { backgroundColor: '#25D366', color: '#ffffff', padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' as const, textDecoration: 'none', display: 'inline-block' as const, margin: '0 8px 8px 0' }
const callButton = { backgroundColor: '#2E7D32', color: '#ffffff', padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' as const, textDecoration: 'none', display: 'inline-block' as const, margin: '0 0 8px 0' }
const thinHr = { borderColor: '#e0e0e0', margin: '16px 0' }
const sessionInfoText = { fontSize: '13px', color: '#444', margin: '0 0 8px', lineHeight: '1.5' }
const locationHeading = { fontSize: '13px', fontWeight: 'bold' as const, color: '#1B3A5C', margin: '12px 0 4px' }
const locationText = { fontSize: '13px', color: '#444', margin: '0 0 8px', lineHeight: '1.6' }
const pricingText = { fontSize: '13px', color: '#444', margin: '0 0 10px', lineHeight: '1.6' }
const cancelText = { fontSize: '12px', color: '#666', margin: '0 0 8px', lineHeight: '1.5' }
const closingText = { fontSize: '13px', color: '#444', margin: '0', lineHeight: '1.6' }
