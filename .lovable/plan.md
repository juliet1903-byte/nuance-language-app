

## Plan: Remove fake users & show lessons completed

Two changes to `src/components/Leaderboard.tsx`:

1. **Remove fake users** — Delete the `FAKE_USERS` array (lines 111-118) and the merge logic (lines 125-126). Use only real data from `get_leaderboard`.

2. **Replace "Position #X" with lessons completed** — Change line 69-71 from `Position #{idx + 1}` to `{entry.lessons_completed} lessons completed`.

