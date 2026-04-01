
CREATE TABLE public.dashboard_login_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  success boolean NOT NULL DEFAULT false,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.dashboard_login_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage login logs"
  ON public.dashboard_login_logs FOR ALL
  TO public
  USING (auth.role() = 'service_role'::text)
  WITH CHECK (auth.role() = 'service_role'::text);
