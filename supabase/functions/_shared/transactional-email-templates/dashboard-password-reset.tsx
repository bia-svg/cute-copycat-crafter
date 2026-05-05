/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Button, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ResetProps {
  resetUrl?: string
  email?: string
}

const DashboardPasswordResetEmail = (props: ResetProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Dashboard Passwort zurücksetzen / Reset your dashboard password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Dashboard Password Reset</Heading>

        <Text style={text}>
          Hallo,
          <br /><br />
          Sie (oder jemand) haben das Zurücksetzen des Passworts für das Dashboard angefordert
          ({props.email}). Klicken Sie auf den Button unten, um ein neues Passwort festzulegen.
          Dieser Link ist <strong>1 Stunde</strong> gültig.
        </Text>

        <Section style={{ textAlign: 'center', margin: '24px 0' }}>
          <Button style={ctaButton} href={props.resetUrl}>Neues Passwort festlegen</Button>
        </Section>

        <Text style={textSmall}>
          Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:
          <br />
          <a href={props.resetUrl} style={{ color: '#1B3A5C', wordBreak: 'break-all' }}>{props.resetUrl}</a>
        </Text>

        <Hr style={hr} />

        <Heading style={h2}>English</Heading>
        <Text style={text}>
          You (or someone) requested a password reset for the dashboard ({props.email}).
          Click the button above to set a new password. This link is valid for <strong>1 hour</strong>.
        </Text>

        <Text style={footer}>
          Wenn Sie diese Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail.
          <br />
          If you did not request this, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DashboardPasswordResetEmail,
  subject: 'Dashboard Password Reset — David J. Woods',
  displayName: 'Dashboard password reset',
  previewData: {
    resetUrl: 'https://david-j-woods.com/dashboard/reset-password?token=abc&email=test@example.com',
    email: 'test@example.com',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '24px 28px', maxWidth: '600px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1B3A5C', margin: '0 0 16px' }
const h2 = { fontSize: '16px', fontWeight: 'bold' as const, color: '#1B3A5C', margin: '16px 0 8px' }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.6', margin: '0 0 16px' }
const textSmall = { fontSize: '12px', color: '#666', lineHeight: '1.5', margin: '0 0 16px' }
const ctaButton = {
  backgroundColor: '#1B3A5C',
  color: '#ffffff',
  padding: '12px 28px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '600' as const,
  textDecoration: 'none',
  display: 'inline-block' as const,
}
const hr = { borderColor: '#e5e5e5', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#999', margin: '0', lineHeight: '1.6' }
