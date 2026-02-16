
## Add Zero State for Tone Profile Chart (Fed by Real Usage Data)

### Problem
The Tone Profile chart on the Stats page currently shows hardcoded mock data (62% Leader / 38% Colleague). It should start empty and populate from actual Social Translator usage.

### Changes

#### 1. Database Migration
Add an optional `tone_mode` column to the `activity_log` table to track which mode was used during Social Translator translations.

```sql
ALTER TABLE public.activity_log ADD COLUMN tone_mode TEXT;
```

#### 2. Log Tone Usage in Social Translator (`src/components/SocialTranslator.tsx`)
After a successful translation, insert an `activity_log` entry with:
- `activity_type`: `"translation_complete"`
- `module_id`: `"social-translator"`
- `tone_mode`: the selected tone (`"leader"` or `"colleague"` or `"neutral"`)

This requires the authenticated user, so import `useAuth` and only log when a user is signed in.

#### 3. Update `useProgress` Hook (`src/hooks/useProgress.ts`)
- Expose the `activityLog` data (already done).
- The Stats page will compute tone distribution from it directly.

#### 4. Update Stats Page (`src/pages/Stats.tsx`)
- Remove the hardcoded `toneData` constant.
- Compute tone distribution dynamically from `activityLog` entries where `activity_type === "translation_complete"`.
- Count entries with `tone_mode === "leader"` vs `tone_mode === "colleague"` (exclude "neutral" from the pie chart, or include it as a third segment).
- **Zero state**: When no translation data exists, show a message like "Use the Social Translator to see your tone profile" instead of the pie chart.
- When data exists, calculate percentages and render the pie chart as before.

### Technical Details

**Tone calculation logic (Stats.tsx):**
```tsx
const translations = activityLog.filter(a => a.activity_type === "translation_complete" && a.tone_mode);
const leaderCount = translations.filter(a => a.tone_mode === "leader").length;
const colleagueCount = translations.filter(a => a.tone_mode === "colleague").length;
const total = leaderCount + colleagueCount;

// If total === 0, show empty state
// Otherwise, compute percentages and render chart
```

**Zero state UI**: A muted text message centered where the chart would be, encouraging the user to try the Social Translator.

**Files modified:**
- `supabase/migrations/` -- new migration for `tone_mode` column
- `src/components/SocialTranslator.tsx` -- log translation activity
- `src/pages/Stats.tsx` -- dynamic tone data + zero state
- `src/integrations/supabase/types.ts` -- will auto-update after migration
