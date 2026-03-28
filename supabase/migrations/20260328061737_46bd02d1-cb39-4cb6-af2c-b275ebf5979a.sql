CREATE TABLE public.whatsapp_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clicked_at timestamptz NOT NULL DEFAULT now(),
  page_path text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  user_agent text
);

ALTER TABLE public.whatsapp_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_whatsapp" ON public.whatsapp_clicks
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_read_whatsapp" ON public.whatsapp_clicks
  FOR SELECT TO anon USING (true);