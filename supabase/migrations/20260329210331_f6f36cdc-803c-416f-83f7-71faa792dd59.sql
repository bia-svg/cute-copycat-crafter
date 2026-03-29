-- Remove leads from realtime publication
ALTER PUBLICATION supabase_realtime DROP TABLE public.leads;

-- Add explicit deny SELECT for authenticated role on leads
CREATE POLICY "authenticated_cannot_select_leads"
ON public.leads
FOR SELECT
TO authenticated
USING (false);
