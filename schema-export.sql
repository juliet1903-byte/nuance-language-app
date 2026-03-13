-- =============================================
-- FULL SCHEMA EXPORT — Nuance App
-- Generated 2026-03-13
-- =============================================

-- 1. PROFILES
CREATE TABLE public.profiles (
  id uuid NOT NULL PRIMARY KEY,
  display_name text,
  avatar_url text,
  vibe_iq integer NOT NULL DEFAULT 0,
  learning_level integer NOT NULL DEFAULT 1,
  streak_days integer NOT NULL DEFAULT 0,
  last_active_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  lessons_completed integer NOT NULL DEFAULT 0,
  modules_completed integer NOT NULL DEFAULT 0,
  xp integer NOT NULL DEFAULT 0,
  leaderboard_opt_in boolean NOT NULL DEFAULT false
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO public USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO public USING (auth.uid() = id);

-- 2. ACTIVITY_LOG
CREATE TABLE public.activity_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  activity_type text NOT NULL,
  module_id text NOT NULL,
  lesson_id text,
  vibe_score integer,
  tone_mode text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own activity" ON public.activity_log
  FOR INSERT TO public WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own activity" ON public.activity_log
  FOR SELECT TO public USING (auth.uid() = user_id);

-- 3. NOTIFICATIONS
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info',
  icon text DEFAULT 'info',
  link text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT TO public USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE TO public USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications" ON public.notifications
  FOR DELETE TO public USING (auth.uid() = user_id);

-- 4. REVIEW_CARDS
CREATE TABLE public.review_cards (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  module_id text NOT NULL,
  lesson_id text NOT NULL,
  card_type text NOT NULL DEFAULT 'flashcard',
  card_front text NOT NULL,
  card_back text NOT NULL,
  ease_factor real NOT NULL DEFAULT 2.5,
  interval_days integer NOT NULL DEFAULT 1,
  repetitions integer NOT NULL DEFAULT 0,
  next_review_at timestamptz NOT NULL DEFAULT now(),
  last_reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.review_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own review cards" ON public.review_cards
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own review cards" ON public.review_cards
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own review cards" ON public.review_cards
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- 5. UNIQUE INDEXES (used for upsert conflict targets)
CREATE UNIQUE INDEX IF NOT EXISTS review_cards_user_lesson_front_idx
  ON public.review_cards (user_id, lesson_id, card_front);

-- 6. FUNCTIONS

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, split_part(NEW.email, '@', 1));
  RETURN NEW;
END;
$$;

-- Create notification helper
CREATE OR REPLACE FUNCTION public.create_notification(
  _user_id uuid, _title text, _message text,
  _type text DEFAULT 'info', _icon text DEFAULT 'info', _link text DEFAULT NULL
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, icon, link)
  VALUES (_user_id, _title, _message, _type, _icon, _link);
END;
$$;

-- Welcome notification on new user
CREATE OR REPLACE FUNCTION public.notify_on_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  PERFORM public.create_notification(
    NEW.id,
    'Welcome to Nuance! 🎉',
    'Start your first module to begin building your professional communication skills.',
    'welcome', 'sparkles', '/dashboard'
  );
  RETURN NEW;
END;
$$;

-- Activity-based notifications
CREATE OR REPLACE FUNCTION public.notify_on_activity()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE
  _profile RECORD;
BEGIN
  SELECT * INTO _profile FROM public.profiles WHERE id = NEW.user_id;

  IF NEW.activity_type = 'module_complete' THEN
    PERFORM public.create_notification(
      NEW.user_id, 'Module Completed! 🏆',
      'Great work! You finished module "' || NEW.module_id || '". Keep the momentum going!',
      'progress', 'trophy', '/progress'
    );
  END IF;

  IF NEW.activity_type = 'lesson_complete' THEN
    IF _profile.lessons_completed > 0 AND (_profile.lessons_completed % 5) = 0 THEN
      PERFORM public.create_notification(
        NEW.user_id, _profile.lessons_completed || ' Lessons Completed! 📚',
        'You''ve reached a milestone. Keep learning to level up!',
        'progress', 'book', '/progress'
      );
    END IF;
  END IF;

  IF _profile.streak_days IN (3, 7, 14, 30) THEN
    PERFORM public.create_notification(
      NEW.user_id, _profile.streak_days || '-Day Streak! 🔥',
      'Amazing consistency! You''re building a great learning habit.',
      'streak', 'flame', '/insights'
    );
  END IF;

  RETURN NEW;
END;
$$;

-- Leaderboard
CREATE OR REPLACE FUNCTION public.get_leaderboard()
RETURNS TABLE(user_id uuid, display_name text, avatar_url text, vibe_iq integer, lessons_completed integer)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT id, display_name, avatar_url, vibe_iq, lessons_completed
  FROM public.profiles
  WHERE leaderboard_opt_in = true AND vibe_iq > 0
  ORDER BY vibe_iq DESC LIMIT 50;
$$;

-- Leaderboard rank
CREATE OR REPLACE FUNCTION public.get_my_leaderboard_rank(_user_id uuid)
RETURNS TABLE(rank bigint, total_participants bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  WITH ranked AS (
    SELECT id, vibe_iq, ROW_NUMBER() OVER (ORDER BY vibe_iq DESC) as rn
    FROM public.profiles WHERE leaderboard_opt_in = true AND vibe_iq > 0
  )
  SELECT
    COALESCE((SELECT rn FROM ranked WHERE id = _user_id), 0) as rank,
    (SELECT COUNT(*) FROM ranked) as total_participants;
$$;

-- 7. TRIGGERS (attach to auth.users — run these in the Supabase SQL editor)
-- CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- CREATE TRIGGER on_auth_user_created_notify AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.notify_on_new_user();

-- CREATE TRIGGER on_activity_notify AFTER INSERT ON public.activity_log
--   FOR EACH ROW EXECUTE FUNCTION public.notify_on_activity();

-- 8. STORAGE
-- Run in Supabase dashboard: create a public bucket named "avatars"

-- 9. REALTIME (if needed)
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
