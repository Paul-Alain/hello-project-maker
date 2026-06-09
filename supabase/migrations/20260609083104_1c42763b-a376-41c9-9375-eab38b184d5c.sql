
-- 1) review_tokens: restrict SELECT to staff (public lookups go through server with service role)
DROP POLICY IF EXISTS "public_read_token" ON public.review_tokens;
CREATE POLICY "Staff read review tokens"
  ON public.review_tokens FOR SELECT
  TO authenticated
  USING (public.is_staff(auth.uid()));

-- 2) app_config: restrict SELECT to staff
DROP POLICY IF EXISTS "Authenticated can read app config" ON public.app_config;
CREATE POLICY "Staff read app config"
  ON public.app_config FOR SELECT
  TO authenticated
  USING (public.is_staff(auth.uid()));

-- 3) email_unsubscribe_tokens: deny direct app access (service role bypasses RLS)
CREATE POLICY "No direct access to unsubscribe tokens"
  ON public.email_unsubscribe_tokens FOR SELECT
  TO anon, authenticated
  USING (false);

-- 4) bootstrap_admin: revoke EXECUTE from anon/authenticated (called via service role)
REVOKE EXECUTE ON FUNCTION public.bootstrap_admin(uuid) FROM anon, authenticated, PUBLIC;
