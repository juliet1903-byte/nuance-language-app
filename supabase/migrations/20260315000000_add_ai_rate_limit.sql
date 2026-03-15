ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS ai_requests_today integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ai_requests_reset_at timestamptz NOT NULL DEFAULT now();

CREATE OR REPLACE FUNCTION public.check_and_increment_ai_requests(
  p_user_id uuid,
  p_limit integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_today date := CURRENT_DATE;
  v_allowed boolean;
BEGIN
  UPDATE public.profiles
  SET
    ai_requests_today = CASE
      WHEN ai_requests_reset_at::date < v_today THEN 1
      ELSE ai_requests_today + 1
    END,
    ai_requests_reset_at = CASE
      WHEN ai_requests_reset_at::date < v_today THEN now()
      ELSE ai_requests_reset_at
    END
  WHERE id = p_user_id
    AND (
      ai_requests_reset_at::date < v_today
      OR ai_requests_today < p_limit
    )
  RETURNING (ai_requests_today <= p_limit) INTO v_allowed;

  RETURN COALESCE(v_allowed, false);
END;
$$;

GRANT EXECUTE ON FUNCTION public.check_and_increment_ai_requests(uuid, integer) TO service_role;
