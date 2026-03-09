

## Color Contrast Audit & Fixes (WCAG AA)

I've calculated contrast ratios for every text/background combination across both themes. Here are the failures and fixes.

### Issues Found

| Location | Pair | Ratio | Required | Fix |
|----------|------|-------|----------|-----|
| Global (light) | muted-foreground on background | 4.2:1 | 4.5:1 | Darken to 44% lightness |
| Global (light) | accent (green) text on white card | 3.1:1 | 4.5:1 | Darken to 36% lightness |
| LearningPath | White lock icon on muted circle | 1.4:1 | 3:1 | Use muted-foreground instead |
| Profile, Insights | `muted-foreground/70` helper text | ~2.5:1 | 4.5:1 | Remove opacity |
| Progress calendar | `muted-foreground/50` day numbers | ~2.0:1 | 4.5:1 | Remove opacity |
| Footer | Copyright `hsl(220,8%,40%)` on dark | 2.9:1 | 4.5:1 | Lighten to 50% |
| Leaderboard | Yellow-500 crown/score on white | 2.0:1 | 3:1/4.5:1 | Use amber-600/700 |
| Leaderboard | Gray-400 silver medal on white | 2.6:1 | 3:1 | Use gray-500 |

### Changes

**`src/index.css`** — Light theme only:
- `--muted-foreground`: `220 8% 46%` → `220 8% 44%`
- `--accent`: `152 40% 46%` → `152 40% 36%`
- `--vibe-nuanced`: `152 40% 46%` → `152 40% 36%`

Dark theme values stay the same (they already pass).

**`src/components/LearningPath.tsx`** — Lock icon: `text-white` → `text-muted-foreground`

**`src/pages/Profile.tsx`** — Remove `/70` opacity from helper text

**`src/pages/Insights.tsx`** — Remove `/70` opacity from three stat descriptions

**`src/pages/Progress.tsx`** — Remove `/50` opacity from calendar day numbers and lock icons

**`src/components/Footer.tsx`** — Copyright color: `hsl(220,8%,40%)` → `hsl(220,8%,50%)`

**`src/components/Leaderboard.tsx`** — Crown icon: `text-yellow-500` → `text-amber-600`; silver medal: `text-gray-400` → `text-gray-500`; #1 score text: `text-yellow-500` → `text-amber-700`

