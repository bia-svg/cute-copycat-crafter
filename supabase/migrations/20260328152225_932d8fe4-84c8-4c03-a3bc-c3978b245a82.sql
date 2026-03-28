-- Replace permissive INSERT policies with validated ones

-- Leads: require non-empty name & valid email format
DROP POLICY "anon_insert_leads" ON public.leads;
CREATE POLICY "anon_insert_leads" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (
    char_length(trim(name)) > 0
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(email) <= 320
    AND (phone IS NULL OR char_length(phone) <= 30)
    AND form_type IN ('session', 'seminar', 'corporate', 'training')
    AND converted IS NOT TRUE
  );

-- WhatsApp clicks: require valid page_path
DROP POLICY "anon_insert_whatsapp" ON public.whatsapp_clicks;
CREATE POLICY "anon_insert_whatsapp" ON public.whatsapp_clicks
  FOR INSERT TO anon
  WITH CHECK (
    page_path IS NOT NULL
    AND char_length(page_path) > 0
    AND char_length(page_path) <= 500
  );