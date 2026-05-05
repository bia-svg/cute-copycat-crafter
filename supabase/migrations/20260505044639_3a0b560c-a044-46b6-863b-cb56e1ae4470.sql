
CREATE TABLE IF NOT EXISTS public.dashboard_password_overrides (
  email text PRIMARY KEY,
  password_hash text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.dashboard_password_resets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_dashboard_password_resets_email ON public.dashboard_password_resets(email);

ALTER TABLE public.dashboard_password_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_password_resets ENABLE ROW LEVEL SECURITY;
-- No policies: only service-role (edge functions) can access.
