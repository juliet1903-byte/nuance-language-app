
CREATE TABLE public.review_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  module_id text NOT NULL,
  lesson_id text NOT NULL,
  card_type text NOT NULL DEFAULT 'flashcard',
  card_front text NOT NULL,
  card_back text NOT NULL,
  ease_factor real NOT NULL DEFAULT 2.5,
  interval_days integer NOT NULL DEFAULT 1,
  repetitions integer NOT NULL DEFAULT 0,
  next_review_at timestamp with time zone NOT NULL DEFAULT now(),
  last_reviewed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.review_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own review cards"
  ON public.review_cards FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own review cards"
  ON public.review_cards FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own review cards"
  ON public.review_cards FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE UNIQUE INDEX review_cards_unique_card ON public.review_cards (user_id, lesson_id, card_front);
CREATE INDEX review_cards_due ON public.review_cards (user_id, next_review_at);
