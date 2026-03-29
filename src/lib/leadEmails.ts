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
}

/**
 * Sends two transactional emails for a new lead:
 * 1. Notification to info@david-j-woods.com
 * 2. Confirmation copy to the person who submitted
 */
export async function sendLeadEmails(data: LeadEmailData) {
  const id = crypto.randomUUID();

  // 1. Notify David
  try {
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "new-lead-notification",
        recipientEmail: "info@david-j-woods.com",
        idempotencyKey: `lead-notify-${id}`,
        templateData: {
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
        },
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
          name: data.name.split(" ")[0], // first name only
          concern: data.concern,
          formType: data.formType,
          notes: data.notes,
          language: data.language,
        },
      },
    });
  } catch (err) {
    console.error("Lead confirmation email error:", err);
  }
}
