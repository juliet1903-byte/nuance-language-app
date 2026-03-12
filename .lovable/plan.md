

## Plan: Add Help & Support / Feedback Page

### What
Create a new `/help` page with a contact/feedback form identical to the footer's "Get in Touch" form, and wire the "Help & Support" button in Profile to navigate there.

### Changes

**1. Create `src/pages/HelpSupport.tsx`**
- Page with `AppLayout`, back arrow header (same pattern as Profile)
- Contact form reusing the same logic as `Footer.tsx`: name, email, message fields calling `send-contact` edge function
- Styled for the app's card-based look (bg-card, rounded-2xl) rather than the dark footer theme
- Toast feedback on success/error

**2. Update `src/pages/Profile.tsx`** (line 347)
- Add `onClick={() => navigate("/help")}` to the Help & Support button

**3. Update `src/App.tsx`**
- Import `HelpSupport` and add route `<Route path="/help" element={<HelpSupport />} />`

