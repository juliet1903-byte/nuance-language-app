

## Problem

The modules in `src/data/modules.ts` are ordered differently from the Learning Path levels in `LearningPath.tsx`:

```text
Learning Path order:          Module array order:
─────────────────────         ────────────────────
Natural Flow:                 1. Starting Strong
  → DEI Fundamentals (#7)     2. Meeting Room
  → Career Moves (#6)         3. Across Cultures
Specialist:                   4. Managing Up
  → Starting Strong (#1)      5. Difficult Convos
  → Meeting Room (#2)         6. Career Moves
Collaborator:                 7. DEI Fundamentals
  → Across Cultures (#3)      8. Common Mistakes
  → Difficult Convos (#5)
Influencer:
  → Managing Up (#4)
  → Common Mistakes (#8)
```

The "All Modules" carousel on the dashboard and elsewhere shows modules 1-8 in a sequence that doesn't match the learning path progression.

## Solution

Reorder the `modules` array in `src/data/modules.ts` to match the Learning Path level order, and renumber them 1-8:

| New # | Module | Level |
|-------|--------|-------|
| 1 | DEI Fundamentals | Natural Flow |
| 2 | Career Moves | Natural Flow |
| 3 | Starting Strong | Specialist |
| 4 | Meeting Room | Specialist |
| 5 | Across Cultures | Collaborator |
| 6 | Difficult Conversations | Collaborator |
| 7 | Managing Up | Influencer |
| 8 | Common Mistakes | Influencer |

### Changes

**`src/data/modules.ts`** — Reorder the 8 module objects in the array to match the learning path sequence above, updating their `number` fields accordingly (1-8).

No other files need changes since everything references modules by `id`, not by array position or number (except the "Continue where you left" logic which iterates the array in order — which will now correctly follow the learning path).

