
CREATE TABLE public.form_submissions_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL,
  status text NOT NULL DEFAULT 'success',
  error_message text,
  form_data jsonb,
  page_path text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.form_submissions_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_form_log" ON public.form_submissions_log
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "service_role_select_form_log" ON public.form_submissions_log
  FOR SELECT TO public
  USING (auth.role() = 'service_role');
