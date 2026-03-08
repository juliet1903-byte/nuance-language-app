

## Plan: Show rank position instead of lesson count in leaderboard

Replace the "X lessons" subtitle under each user's name with their rank position (e.g., "Position #1").

### Changes

**`src/components/Leaderboard.tsx`**
- Replace `{entry.lessons_completed} lessons` with `Position #{idx + 1}` in the leaderboard list items.

Single line change, no database or structural modifications needed.

