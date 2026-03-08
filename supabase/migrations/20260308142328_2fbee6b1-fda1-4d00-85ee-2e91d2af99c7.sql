
-- Update handle_new_user to auto-set display_name from email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, split_part(NEW.email, '@', 1));
  RETURN NEW;
END;
$function$;

-- Backfill existing profiles that have no display_name
UPDATE public.profiles
SET display_name = split_part(u.email, '@', 1)
FROM auth.users u
WHERE profiles.id = u.id
AND (profiles.display_name IS NULL OR profiles.display_name = '');
