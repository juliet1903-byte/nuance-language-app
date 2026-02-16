
-- Activity log for tracking lesson completions, exercises, scenarios
CREATE TABLE public.activity_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL, -- 'lesson_complete', 'exercise_complete', 'scenario_complete', 'module_complete'
  module_id TEXT NOT NULL,
  lesson_id TEXT,
  vibe_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_log_user ON public.activity_log(user_id);
CREATE INDEX idx_activity_log_date ON public.activity_log(user_id, created_at);

-- Enable RLS
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activity"
  ON public.activity_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity"
  ON public.activity_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add lessons_completed count to profiles for quick access
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS lessons_completed INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS modules_completed INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS xp INTEGER NOT NULL DEFAULT 0;

-- Enable realtime for activity_log
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_log;
