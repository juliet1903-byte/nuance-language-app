
## Blurred Mock Profile for Guest Users

### Problem
The Profile page currently shows an empty state for guests (a generic User icon + "Join Nuance" button). The Stats page uses a better pattern: it renders the full UI with mock data and overlays a blurred `LoginBanner` on top. The Profile page should follow the same approach.

### Changes

#### `src/pages/Profile.tsx`
Replace the guest `showBanner` branch (the empty state with User icon and "Join Nuance" button) with the same full profile layout used for authenticated users, but populated with mock/placeholder data and wrapped in a `relative` container with the `LoginBanner` overlay.

**Mock data shown behind the blur:**
- LetterAvatar with letter "U" (or a generic User icon)
- Display name: "New User"
- Email: "user@example.com"
- Level badge: "Natural Flow"
- Quick stats: 0 Day Streak, 0/8 Modules, 0 Vibe IQ
- Preferences section (Notifications toggle, Dark Mode toggle, Language row)
- Account section (Privacy, Help)

**Overlay:** The `LoginBanner` component (same lock icon + "Login to Save Progress" + "Sign Up" button with blurred backdrop) positioned absolutely over the entire mock profile content, identical to how it's used on the Stats page.

### Technical Details

- Remove the `showBanner ? (...) : (...)` ternary that currently splits guest vs authenticated views
- Always render the full profile layout
- When `showBanner` is true, use mock values for `displayName`, `levelName`, `quickStats`, and `user?.email`
- Wrap the profile content sections in a `relative` container and conditionally render `<LoginBanner />` inside it when `showBanner` is true
- No new components or database changes needed
