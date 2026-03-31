
-- Table to track CTA button clicks on service pages
CREATE TABLE public.cta_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clicked_at timestamptz NOT NULL DEFAULT now(),
  page_path text NOT NULL,
  destination text NOT NULL,
  user_agent text
);

ALTER TABLE public.cta_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_cta_clicks" ON public.cta_clicks
  FOR INSERT TO anon WITH CHECK (
    page_path IS NOT NULL AND char_length(page_path) > 0 AND char_length(page_path) <= 500
  );

CREATE POLICY "service_role_select_cta_clicks" ON public.cta_clicks
  FOR SELECT TO public USING (auth.role() = 'service_role'::text);

-- Table to track pageviews on service pages
CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  viewed_at timestamptz NOT NULL DEFAULT now(),
  page_path text NOT NULL,
  user_agent text
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_page_views" ON public.page_views
  FOR INSERT TO anon WITH CHECK (
    page_path IS NOT NULL AND char_length(page_path) > 0 AND char_length(page_path) <= 500
  );

CREATE POLICY "service_role_select_page_views" ON public.page_views
  FOR SELECT TO public USING (auth.role() = 'service_role'::text);
