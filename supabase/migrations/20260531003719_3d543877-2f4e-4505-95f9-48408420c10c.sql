
-- 1. dashboard_password_overrides: explicit service_role policies
CREATE POLICY "Service role can manage password overrides"
ON public.dashboard_password_overrides
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 2. dashboard_password_resets: explicit service_role policies
CREATE POLICY "Service role can manage password resets"
ON public.dashboard_password_resets
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 3. consent_logs: replace permissive insert policy with validated one
DROP POLICY IF EXISTS "Anyone can insert consent log" ON public.consent_logs;
CREATE POLICY "Anon can insert validated consent log"
ON public.consent_logs
FOR INSERT
TO anon, authenticated
WITH CHECK (
  choice IS NOT NULL
  AND char_length(choice) <= 50
  AND (page_path IS NULL OR char_length(page_path) <= 500)
  AND (language IS NULL OR char_length(language) <= 10)
  AND (user_agent IS NULL OR char_length(user_agent) <= 1000)
  AND (ip_hash IS NULL OR char_length(ip_hash) <= 128)
  AND char_length(consent_version) <= 20
);

-- 4. form_submissions_log: tighten anon insert with constraints
DROP POLICY IF EXISTS "anon_insert_form_log" ON public.form_submissions_log;
CREATE POLICY "anon_insert_form_log"
ON public.form_submissions_log
FOR INSERT
TO anon
WITH CHECK (
  form_type IS NOT NULL
  AND char_length(form_type) <= 50
  AND status IN ('success', 'error', 'pending')
  AND (page_path IS NULL OR char_length(page_path) <= 500)
  AND (user_agent IS NULL OR char_length(user_agent) <= 1000)
  AND (error_message IS NULL OR char_length(error_message) <= 2000)
  AND (form_data IS NULL OR pg_column_size(form_data) <= 8192)
);

-- 5. Lock down SECURITY DEFINER functions: only service_role and postgres owner may execute
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.next_seminar_registration_number() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.next_seminar_registration_number() TO service_role;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
