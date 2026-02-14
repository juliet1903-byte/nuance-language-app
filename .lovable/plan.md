

## Replace Trending Card Covers

The four uploaded abstract images will be copied into the project and used as the Trending card covers, replacing the current article images.

### Steps

1. Copy the four uploaded images into `src/assets/`:
   - `user-uploads://Frame_2-2.png` -> `src/assets/trending-1.png`
   - `user-uploads://Frame_4-2.png` -> `src/assets/trending-2.png`
   - `user-uploads://Frame_5-2.png` -> `src/assets/trending-3.png`
   - `user-uploads://Frame_6-2.png` -> `src/assets/trending-4.png`

2. Update `src/pages/Index.tsx`:
   - Replace the old article image imports (`article-warm-intro.jpg`, `article-interview.jpg`, `article-cultures.jpg`, `article-burnout.jpg`) with the new trending image imports
   - Update the `trendingItems` array to reference the new images

### Technical Details

In `src/pages/Index.tsx`, the import section will change from:
```
import articleWarmIntro from "@/assets/article-warm-intro.jpg";
import articleInterview from "@/assets/article-interview.jpg";
import articleCultures from "@/assets/article-cultures.jpg";
import articleBurnout from "@/assets/article-burnout.jpg";
```
to:
```
import trending1 from "@/assets/trending-1.png";
import trending2 from "@/assets/trending-2.png";
import trending3 from "@/assets/trending-3.png";
import trending4 from "@/assets/trending-4.png";
```

The `trendingItems` array will use these new imports. Card titles and badges remain unchanged.

