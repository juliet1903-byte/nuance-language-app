
## Show Logged-In User Avatar on Landing Page

### Problem
When a logged-in user visits the landing page (`/`), they see a "Sign In" button even though they're already authenticated. They need a way to quickly navigate back to their dashboard.

### Changes

#### `src/pages/Landing.tsx`
- Import `useAuth` fields: `user`, `profile` (already imported but only destructuring `enterGuestMode`)
- Import `LetterAvatar` component
- In the nav bar, replace the "Sign In" button conditionally:
  - **If user is logged in**: Show a clickable `LetterAvatar` (with the user's name/email) plus "Go to Dashboard" text. Clicking navigates to `/dashboard`.
  - **If not logged in**: Keep the existing "Sign In" button as-is.

### Technical Details

**Nav bar update (lines 37-45):**
```tsx
<nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
  <Logo className="h-8" />
  {user ? (
    <button
      onClick={() => navigate("/dashboard")}
      className="flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-80 transition-opacity"
    >
      <LetterAvatar name={profile?.display_name} email={user.email} size="sm" />
      <span>{profile?.display_name || user.email?.split("@")[0]}</span>
    </button>
  ) : (
    <button
      onClick={() => navigate("/auth")}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      Sign In
    </button>
  )}
</nav>
```

**Imports to add:**
- `LetterAvatar` from `@/components/LetterAvatar`

**Destructuring update:**
- Change `const { enterGuestMode } = useAuth()` to `const { enterGuestMode, user, profile } = useAuth()`

**Files modified:**
- `src/pages/Landing.tsx`
