
# Enforce 14px Minimum Text on Mobile

## What changes
All text elements currently sized at 10px or 11px will be bumped to 14px (`text-sm`) on mobile. Elements at 12px (`text-xs`) are already close but will also be raised to 14px for consistency.

## Files and changes

### 1. `src/index.css` -- Global floor rule
Add a base rule (no media query, so it applies at all sizes) that enforces `font-size: max(inherit, 0.875rem)` (14px) on text elements inside `main`. The existing desktop rule already overrides this to 16px at `lg`.

### 2. `src/components/BottomNav.tsx`
- Line 47: Change `text-[10px]` to `text-xs` (12px) for bottom nav labels. These sit outside `main` so the global rule won't reach them, but 12px is the standard iOS tab-bar label size and should stay compact. **If you prefer 14px here too, let me know** -- but nav labels at 14px may look oversized.

### 3. `src/pages/Profile.tsx`
- Line 69: `text-[11px]` to `text-xs` (stat labels)
- Line 129: `text-[11px]` to `text-xs` (version string)

### 4. `src/pages/Stats.tsx`
- Lines 212, 231, 248: `text-[11px]` to `text-xs` (stat sub-labels)

### 5. `src/components/TrendingCard.tsx`
- Line 19: `text-[10px]` to `text-xs` (badge text)

All remaining `text-xs` instances across Library, SocialTranslator, ScenarioExercise, FillGapExercise, and LearningPath will be caught by the global CSS floor rule in `index.css`, so no individual file edits are needed for those.

## Technical detail
The global rule in `index.css` will look like:

```text
main :where(p, span, label, li, td, th, a, button) {
  font-size: max(inherit, 0.875rem);   /* 14px floor */
}

@media (min-width: 1024px) {
  main :where(p, span, label, li, td, th, a, button) {
    font-size: max(inherit, 1rem);     /* 16px floor -- already exists */
  }
}
```

The desktop rule overrides the mobile one. The `:where()` selector keeps specificity at zero so explicit utility classes can still go smaller if needed via a `.text-floor-none` escape hatch.
