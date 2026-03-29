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
  // Structured fields
  address?: string
  sessionDate?: string
  sessionTime?: string
  sessionLocation?: string
  dateOfBirth?: string
  seminarDate?: string
  seminarLocation?: string
  bestTime?: string
  message?: string
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

          <Text style={text}>
            {isEN
              ? 'If you have any questions in the meantime, feel free to reach out to us directly.'
              : 'Sollten Sie in der Zwischenzeit Fragen haben, können Sie sich gerne direkt an uns wenden.'}
          </Text>

          <Button style={ctaButton} href="https://david-j-woods.com">
            {isEN ? 'Visit our website' : 'Unsere Website besuchen'}
          </Button>

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
  subject: (data: Record<string, any>) =>
    data.language === 'en'
      ? 'Your request has been received — David J. Woods'
      : 'Ihre Anfrage wurde empfangen — David J. Woods',
  displayName: 'Lead confirmation to submitter',
  previewData: {
    name: 'Maria',
    concern: 'Rauchentwöhnung',
    formType: 'session',
    email: 'maria@example.com',
    phone: '+41 79 123 45 67',
    address: 'Bahnhofstrasse 10, 8001 Zürich',
    sessionDate: '15.03.2026',
    sessionTime: 'Nachmittags',
    sessionLocation: 'Zürich – 5 Elements TCM, Usteristrasse 23',
    dateOfBirth: '12.05.1985',
    message: 'Interessiert an 2 Sitzungen',
    language: 'de',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '24px 28px', maxWidth: '600px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1B3A5C', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.6', margin: '0 0 16px' }
const summaryBox = { backgroundColor: '#f8f8f6', padding: '16px 20px', borderRadius: '4px', margin: '0 0 20px' }
const summaryLine = { fontSize: '13px', color: '#333', margin: '0 0 6px', lineHeight: '1.5' }
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
