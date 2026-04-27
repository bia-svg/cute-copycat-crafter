-- SEO snapshots: stores weekly aggregated GSC metrics for long-term history
CREATE TABLE public.seo_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  snapshot_date DATE NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  ctr NUMERIC(8,6) NOT NULL DEFAULT 0,
  position NUMERIC(8,3) NOT NULL DEFAULT 0,
  -- Position distribution buckets
  keywords_top3 INTEGER NOT NULL DEFAULT 0,
  keywords_4_10 INTEGER NOT NULL DEFAULT 0,
  keywords_11_20 INTEGER NOT NULL DEFAULT 0,
  keywords_21_plus INTEGER NOT NULL DEFAULT 0,
  total_keywords INTEGER NOT NULL DEFAULT 0,
  -- Snapshots of top items as JSON for trend analysis
  top_queries JSONB,
  top_pages JSONB,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_seo_snapshots_date ON public.seo_snapshots(snapshot_date);
CREATE INDEX idx_seo_snapshots_period ON public.seo_snapshots(period_start, period_end);

ALTER TABLE public.seo_snapshots ENABLE ROW LEVEL SECURITY;

-- Only service role can write/read (dashboard reads via edge function)
CREATE POLICY "Service role can manage seo snapshots"
ON public.seo_snapshots
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Allow anon SELECT so dashboard (no auth) can read history directly
CREATE POLICY "Anon can read seo snapshots"
ON public.seo_snapshots
FOR SELECT
TO anon
USING (true);