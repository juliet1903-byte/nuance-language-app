
CREATE OR REPLACE FUNCTION public.notify_on_activity()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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

  IF _profile.streak_days IN (3, 7, 14, 30) THEN
    PERFORM public.create_notification(
      NEW.user_id,
      _profile.streak_days || '-Day Streak! 🔥',
      'Amazing consistency! You''re building a great learning habit.',
      'streak',
      'flame',
      '/insights'
    );
  END IF;

  RETURN NEW;
END;
$function$;
