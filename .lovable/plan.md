

## Plan: Dynamic Trending Section

The trending section in `src/pages/Index.tsx` is hardcoded. It should automatically pull the newest item from each category using the same data arrays defined in `src/pages/Library.tsx`.

### Changes

1. **Extract shared content data** — Move the `articles`, `videos` arrays (and their imports) from `src/pages/Library.tsx` into a new file `src/data/content.ts`. Both Library and Index will import from there.

2. **Update `src/pages/Library.tsx`** — Remove the inline `articles` and `videos` arrays/imports; import from `src/data/content.ts` instead.

3. **Update `src/pages/Index.tsx`** — Remove hardcoded `trendingItems` and asset imports for trending. Instead, import `articles` and `videos` from `src/data/content.ts`, then dynamically pick:
   - First article without a `badge` field (newest article)
   - Second article without a `badge` field (second newest)
   - First item with `badge: "Deep Dive"` (newest deep dive)
   - First video (newest video)

   Build `trendingItems` dynamically with appropriate badge labels and colors.

### Result
When new content is added to `src/data/content.ts` (which Library already uses as its source of truth), the trending section will automatically reflect the newest materials without manual updates.

