

# Logo Click Navigation

## Change
Make the Logo component clickable so it navigates to the landing page (`/`) when clicked.

## Technical Details

**File: `src/components/Logo.tsx`**
- Wrap the SVG in a `Link` (from `react-router-dom`) pointing to `/`
- Add `cursor-pointer` styling
- The component is used in the Landing page nav, the Dashboard header (mobile), and the DesktopSidebar -- in all cases, clicking the logo should return to the homepage

