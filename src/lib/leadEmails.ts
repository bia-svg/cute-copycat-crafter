import { supabase } from "@/integrations/supabase/client";

interface LeadEmailData {
  name: string;
  email: string;
  phone?: string;
  concern?: string;
  formType: string;
  city?: string;
  country?: string;
  language?: string;
  notes?: string;
  source?: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  // Structured fields for organized display
  address?: string;
  sessionDate?: string;
  sessionTime?: string;
  sessionLocation?: string;
  dateOfBirth?: string;
  seminarDate?: string;
  seminarLocation?: string;
  bestTime?: string;
  message?: string;
  profession?: string;
  registrationNumber?: string;
}

/**
 * Sends two transactional emails for a new lead:
 * 1. Notification to info@david-j-woods.com
 * 2. Confirmation copy to the person who submitted
 */
export async function sendLeadEmails(data: LeadEmailData) {
  const id = crypto.randomUUID();

  const sharedTemplateData = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    concern: data.concern,
    formType: data.formType,
    city: data.city,
    country: data.country,
    language: data.language,
    notes: data.notes,
    source: data.source,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    address: data.address,
    sessionDate: data.sessionDate,
    sessionTime: data.sessionTime,
    sessionLocation: data.sessionLocation,
    dateOfBirth: data.dateOfBirth,
    seminarDate: data.seminarDate,
    seminarLocation: data.seminarLocation,
    bestTime: data.bestTime,
    message: data.message,
  };

  // 1. Notify David
  try {
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "new-lead-notification",
        recipientEmail: "info@david-j-woods.com",
        idempotencyKey: `lead-notify-${id}`,
        templateData: sharedTemplateData,
      },
    });
  } catch (err) {
    console.error("Lead notification email error:", err);
  }

  // 2. Confirmation to the submitter
  try {
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "lead-confirmation",
        recipientEmail: data.email,
        idempotencyKey: `lead-confirm-${id}`,
        templateData: {
          ...sharedTemplateData,
          name: data.name.split(" ")[0], // first name only for greeting
        },
      },
    });
  } catch (err) {
    console.error("Lead confirmation email error:", err);
  }
}
