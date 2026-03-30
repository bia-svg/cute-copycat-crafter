import { supabase } from "@/integrations/supabase/client";

interface FormLogEntry {
  formType: string;
  status: "success" | "error" | "validation_error";
  errorMessage?: string;
  formData?: Record<string, any>;
}

/**
 * Log a form submission attempt (success or failure) to form_submissions_log.
 * Fire-and-forget — never blocks the UI.
 */
export function logFormSubmission(entry: FormLogEntry) {
  // Strip sensitive fields from formData before logging
  const safeData = entry.formData ? { ...entry.formData } : undefined;
  if (safeData) {
    delete safeData.email;
    delete safeData.phone;
    // keep name, form_type, concern, city, country for debugging
  }

  supabase
    .from("form_submissions_log" as any)
    .insert({
      form_type: entry.formType,
      status: entry.status,
      error_message: entry.errorMessage || null,
      form_data: safeData || null,
      page_path: window.location.pathname,
      user_agent: navigator.userAgent || null,
    })
    .then(({ error }) => {
      if (error) console.error("Form log insert error:", error);
    });
}
