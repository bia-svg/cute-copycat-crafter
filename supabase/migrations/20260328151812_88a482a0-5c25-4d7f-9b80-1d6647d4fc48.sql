-- Add input validation constraints for leads table (DSGVO data minimization)
ALTER TABLE public.leads
  ADD CONSTRAINT leads_name_length CHECK (char_length(name) <= 200),
  ADD CONSTRAINT leads_email_length CHECK (char_length(email) <= 320),
  ADD CONSTRAINT leads_phone_length CHECK (char_length(phone) <= 30),
  ADD CONSTRAINT leads_form_type_valid CHECK (form_type IN ('session', 'seminar', 'corporate', 'training')),
  ADD CONSTRAINT leads_concern_length CHECK (char_length(concern) <= 2000),
  ADD CONSTRAINT leads_notes_length CHECK (char_length(notes) <= 2000);

-- Add input validation constraints for whatsapp_clicks
ALTER TABLE public.whatsapp_clicks
  ADD CONSTRAINT wa_page_path_length CHECK (char_length(page_path) <= 500),
  ADD CONSTRAINT wa_user_agent_length CHECK (char_length(user_agent) <= 1000),
  ADD CONSTRAINT wa_referrer_length CHECK (char_length(referrer) <= 1000);