
-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info', -- 'progress', 'lesson', 'streak', 'level_up', 'welcome', 'info'
  icon TEXT DEFAULT 'info', -- icon hint for frontend
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT, -- optional navigation link
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

-- Users can update own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete own notifications
CREATE POLICY "Users can delete own notifications"
ON public.notifications
FOR DELETE
USING (auth.uid() = user_id);

-- System can insert notifications (via triggers/functions)
-- We need a service-level insert, so we'll use a security definer function
CREATE OR REPLACE FUNCTION public.create_notification(
  _user_id UUID,
  _title TEXT,
  _message TEXT,
  _type TEXT DEFAULT 'info',
  _icon TEXT DEFAULT 'info',
  _link TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, icon, link)
  VALUES (_user_id, _title, _message, _type, _icon, _link);
END;
$$;

-- Create trigger to send welcome notification on new user
CREATE OR REPLACE FUNCTION public.notify_on_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.create_notification(
    NEW.id,
    'Welcome to Nuance! 🎉',
    'Start your first module to begin building your professional communication skills.',
    'welcome',
    'sparkles',
    '/dashboard'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_profile_created_notify
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.notify_on_new_user();

-- Create trigger to notify on activity milestones
CREATE OR REPLACE FUNCTION public.notify_on_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _profile RECORD;
BEGIN
  SELECT * INTO _profile FROM public.profiles WHERE id = NEW.user_id;

  IF NEW.activity_type = 'module_complete' THEN
    PERFORM public.create_notification(
      NEW.user_id,
      'Module Completed! 🏆',
      'Great work! You finished module "' || NEW.module_id || '". Keep the momentum going!',
      'progress',
      'trophy',
      '/progress'
    );
  END IF;

  IF NEW.activity_type = 'lesson_complete' THEN
    -- Every 5 lessons milestone
    IF _profile.lessons_completed > 0 AND (_profile.lessons_completed % 5) = 0 THEN
      PERFORM public.create_notification(
        NEW.user_id,
        _profile.lessons_completed || ' Lessons Completed! 📚',
        'You''ve reached a milestone. Keep learning to level up!',
        'progress',
        'book',
        '/progress'
      );
    END IF;
  END IF;

  -- Streak milestones
  IF _profile.streak_days IN (3, 7, 14, 30) THEN
    PERFORM public.create_notification(
      NEW.user_id,
      _profile.streak_days || '-Day Streak! 🔥',
      'Amazing consistency! You''re building a great learning habit.',
      'streak',
      'flame',
      '/stats'
    );
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_activity_notify
AFTER INSERT ON public.activity_log
FOR EACH ROW
EXECUTE FUNCTION public.notify_on_activity();

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Index for fast queries
CREATE INDEX idx_notifications_user_id ON public.notifications (user_id, created_at DESC);
CREATE INDEX idx_notifications_unread ON public.notifications (user_id, is_read) WHERE is_read = false;
