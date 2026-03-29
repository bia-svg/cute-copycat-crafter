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
}

const NewLeadNotificationEmail = (props: NewLeadProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Neuer Lead: {props.name || 'Unbekannt'} — {props.formType || 'Kontakt'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>📋 Neuer Lead eingegangen</Heading>
        <Section style={infoBox}>
          <Text style={label}>Name</Text>
          <Text style={value}>{props.name || '—'}</Text>
          
          <Text style={label}>E-Mail</Text>
          <Text style={value}>{props.email || '—'}</Text>
          
          <Text style={label}>Telefon</Text>
          <Text style={value}>{props.phone || '—'}</Text>
          
          <Text style={label}>Anliegen</Text>
          <Text style={value}>{props.concern || '—'}</Text>
          
          <Text style={label}>Formular</Text>
          <Text style={value}>{props.formType || '—'}</Text>
          
          <Text style={label}>Stadt / Land</Text>
          <Text style={value}>{[props.city, props.country].filter(Boolean).join(', ') || '—'}</Text>
          
          <Text style={label}>Sprache</Text>
          <Text style={value}>{props.language || '—'}</Text>
          
          {props.notes && (
            <>
              <Text style={label}>Notizen</Text>
              <Text style={value}>{props.notes}</Text>
            </>
          )}
        </Section>

        <Hr style={hr} />

        <Section style={trackingBox}>
          <Text style={trackingTitle}>Tracking</Text>
          <Text style={trackingText}>
            Quelle: {props.source || 'organic'}
            {props.utmSource && ` | utm_source: ${props.utmSource}`}
            {props.utmMedium && ` | utm_medium: ${props.utmMedium}`}
            {props.utmCampaign && ` | utm_campaign: ${props.utmCampaign}`}
          </Text>
        </Section>

        <Text style={footer}>
          Diese E-Mail wurde automatisch von {SITE_NAME} gesendet.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewLeadNotificationEmail,
  subject: (data: Record<string, any>) => `Neuer Lead: ${data.name || 'Unbekannt'} — ${data.formType || 'Kontakt'}`,
  to: 'info@david-j-woods.com',
  displayName: 'New lead notification',
  previewData: {
    name: 'Max Mustermann',
    email: 'max@example.com',
    phone: '+41 79 123 45 67',
    concern: 'Rauchentwöhnung',
    formType: 'session',
    city: 'Zürich',
    country: 'CH',
    language: 'de',
    notes: 'Best time: morgens | Interessiert an 2 Sitzungen',
    source: 'paid',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'hypnose-zuerich',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '24px 28px', maxWidth: '600px' }
const h1 = { fontSize: '20px', fontWeight: 'bold' as const, color: '#1B3A5C', margin: '0 0 20px' }
const infoBox = { backgroundColor: '#f8f8f6', padding: '16px 20px', borderRadius: '4px', margin: '0 0 16px' }
const label = { fontSize: '11px', fontWeight: '600' as const, color: '#888', textTransform: 'uppercase' as const, margin: '12px 0 2px', letterSpacing: '0.5px' }
const value = { fontSize: '14px', color: '#333', margin: '0 0 4px', lineHeight: '1.4' }
const hr = { borderColor: '#e5e5e5', margin: '16px 0' }
const trackingBox = { padding: '0' }
const trackingTitle = { fontSize: '11px', fontWeight: '600' as const, color: '#888', textTransform: 'uppercase' as const, margin: '0 0 4px' }
const trackingText = { fontSize: '12px', color: '#666', margin: '0' }
const footer = { fontSize: '11px', color: '#aaa', margin: '24px 0 0', textAlign: 'center' as const }
