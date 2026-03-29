CREATE SEQUENCE IF NOT EXISTS public.seminar_registration_seq START WITH 12145 INCREMENT BY 1;

CREATE OR REPLACE FUNCTION public.next_seminar_registration_number()
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT nextval('public.seminar_registration_seq');
$$;