
-- Seminar capacity configuration table
CREATE TABLE public.seminar_capacity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seminar_date text NOT NULL,
  seminar_country text NOT NULL CHECK (seminar_country IN ('ch', 'de')),
  max_capacity integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (seminar_date, seminar_country)
);

ALTER TABLE public.seminar_capacity ENABLE ROW LEVEL SECURITY;

-- Only service_role can manage capacity config
CREATE POLICY "Service role can manage seminar capacity"
  ON public.seminar_capacity FOR ALL
  TO public
  USING (auth.role() = 'service_role'::text)
  WITH CHECK (auth.role() = 'service_role'::text);

-- Allow anon to read capacity (for frontend dashboard via edge function)
CREATE POLICY "Anon can read seminar capacity"
  ON public.seminar_capacity FOR SELECT
  TO anon
  USING (true);

-- Insert initial capacity data
INSERT INTO public.seminar_capacity (seminar_date, seminar_country, max_capacity) VALUES
  ('Mo-Sa, 15.-20. Juni 2026', 'ch', 24),
  ('Mo-Sa, 07.-12. Sept. 2026', 'ch', 24),
  ('Mo-Sa, 23.-28. Nov. 2026', 'ch', 24),
  ('Mo-Sa, 11.-16. Mai 2026', 'de', 14),
  ('Mo-Sa, 06.-11. Juli 2026', 'de', 14),
  ('Mo-Sa, 14.-19. Sept. 2026', 'de', 14),
  ('Mo-Sa, 16.-21. Nov. 2026', 'de', 14);
