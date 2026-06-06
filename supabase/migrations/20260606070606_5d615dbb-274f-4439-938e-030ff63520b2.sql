DROP POLICY IF EXISTS "Anon can read seo snapshots" ON public.seo_snapshots;
REVOKE SELECT ON public.seo_snapshots FROM anon;