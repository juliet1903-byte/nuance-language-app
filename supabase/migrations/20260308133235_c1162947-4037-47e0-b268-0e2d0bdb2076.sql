
-- Add leaderboard opt-in column to profiles
ALTER TABLE public.profiles ADD COLUMN leaderboard_opt_in boolean NOT NULL DEFAULT false;

-- Create a secure function to get leaderboard data (only opted-in users)
CREATE OR REPLACE FUNCTION public.get_leaderboard()
RETURNS TABLE(user_id uuid, display_name text, avatar_url text, vibe_iq integer, lessons_completed integer)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, display_name, avatar_url, vibe_iq, lessons_completed
  FROM public.profiles
  WHERE leaderboard_opt_in = true AND vibe_iq > 0
  ORDER BY vibe_iq DESC
  LIMIT 50;
$$;

-- Create a function to get current user's rank even if not opted in
CREATE OR REPLACE FUNCTION public.get_my_leaderboard_rank(_user_id uuid)
RETURNS TABLE(rank bigint, total_participants bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH ranked AS (
    SELECT id, vibe_iq, ROW_NUMBER() OVER (ORDER BY vibe_iq DESC) as rn
    FROM public.profiles
    WHERE leaderboard_opt_in = true AND vibe_iq > 0
  )
  SELECT 
    COALESCE((SELECT rn FROM ranked WHERE id = _user_id), 0) as rank,
    (SELECT COUNT(*) FROM ranked) as total_participants;
$$;
