import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
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

          <Section style={trackingBox}>
            <Text style={trackingTitle}>Tracking</Text>
            <Text style={trackingText}>
              {isEN ? 'Source' : 'Quelle'}: {props.source || 'organic'}
              {props.utmSource && ` | utm_source: ${props.utmSource}`}
              {props.utmMedium && ` | utm_medium: ${props.utmMedium}`}
              {props.utmCampaign && ` | utm_campaign: ${props.utmCampaign}`}
            </Text>
          </Section>

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
    const isSessionConfirmation = data.formType === 'session' && data.concern?.includes('Terminbestätigung')

    if (data.formType === 'seminar') {
      const regPart = data.registrationNumber ? ` #${data.registrationNumber}` : ''
      return isEN
        ? `New Seminar Registration${regPart}: ${name}`
        : `Neue Seminar-Anmeldung${regPart}: ${name}`
    }
    if (isSessionConfirmation) {
      return isEN
        ? `New Session Confirmation: ${name}`
        : `Neue Sitzungsbestätigung: ${name}`
    }
    return isEN
      ? `New Lead: ${name}`
      : `Neuer Lead: ${name}`
  },
  to: 'info@david-j-woods.com',
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
