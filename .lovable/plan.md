
## Forgot Password with Rate Limiting

### Overview
Add a complete forgot password flow with a 10-minute cooldown between reset requests to prevent abuse. The rate limiting will be enforced client-side via `localStorage` timestamps (simple and effective since the backend already has its own email sending limits).

### Changes

#### 1. New Page: `src/pages/ResetPassword.tsx`
- Handles the `/reset-password` route where users land after clicking the email link
- Detects `type=recovery` in the URL hash
- Shows a "Set New Password" form
- Calls `supabase.auth.updateUser({ password })` to save the new password
- Redirects to `/dashboard` on success

#### 2. Update: `src/pages/Auth.tsx`
- Add a "Forgot password?" link below the sign-in password field
- Clicking it reveals an inline email input + submit button (or toggles to a forgot-password view)
- On submit, checks `localStorage` for a timestamp key (`nuance-last-reset-request`)
- If less than 10 minutes have passed, shows a toast: "Please wait X minutes before requesting another reset"
- Otherwise, calls `supabase.auth.resetPasswordForEmail(email, { redirectTo: origin + '/reset-password' })`
- Stores the current timestamp in `localStorage`
- Shows confirmation toast: "Check your email for a reset link"

#### 3. Update: `src/App.tsx`
- Add route: `<Route path="/reset-password" element={<ResetPassword />} />`

### Rate Limiting Logic
```
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes
const lastRequest = localStorage.getItem("nuance-last-reset-request");
if (lastRequest && Date.now() - Number(lastRequest) < COOLDOWN_MS) {
  const minutesLeft = Math.ceil((COOLDOWN_MS - (Date.now() - Number(lastRequest))) / 60000);
  // show "wait X minutes" toast
  return;
}
// proceed with reset, then:
localStorage.setItem("nuance-last-reset-request", String(Date.now()));
```

### Technical Details
- **Rate limiting approach**: Client-side `localStorage` timestamp. This is appropriate because the authentication system already has server-side rate limits on emails, and this adds a UX-level guard to prevent accidental spam. A determined attacker could bypass it, but the server-side limits remain as the real safeguard.
- **No database table needed** -- the cooldown is per-browser via `localStorage`.
- **Reset password page** listens for the `PASSWORD_RECOVERY` event from `onAuthStateChange` to confirm the recovery session is active before allowing password update.
