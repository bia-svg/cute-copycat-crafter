CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  concern text,
  form_type text NOT NULL DEFAULT 'session',
  postal_code text,
  city text,
  country text,
  source text DEFAULT 'direct',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  tracking_code text UNIQUE,
  converted boolean DEFAULT false,
  notes text
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_read_leads" ON public.leads FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_leads" ON public.leads FOR INSERT TO anon WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;