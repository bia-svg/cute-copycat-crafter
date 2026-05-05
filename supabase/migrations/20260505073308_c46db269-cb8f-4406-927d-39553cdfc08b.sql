CREATE TABLE public.consent_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  choice TEXT NOT NULL CHECK (choice IN ('granted','denied')),
  consent_version TEXT NOT NULL DEFAULT 'v1',
  language TEXT,
  page_path TEXT,
  user_agent TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.consent_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert consent log"
ON public.consent_logs
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX idx_consent_logs_created_at ON public.consent_logs (created_at DESC);