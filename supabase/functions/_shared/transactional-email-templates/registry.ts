/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as newLeadNotification } from './new-lead-notification.tsx'
import { template as leadConfirmation } from './lead-confirmation.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'new-lead-notification': newLeadNotification,
  'lead-confirmation': leadConfirmation,
  // Aliases for specific form types (same templates, different log names)
  'new-appointment-notification': newLeadNotification,
  'appointment-confirmation': leadConfirmation,
  'new-seminar-notification': newLeadNotification,
  'seminar-confirmation': leadConfirmation,
}
