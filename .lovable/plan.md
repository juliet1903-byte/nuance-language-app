

## Enable Email Delivery for Contact Form

### What will happen
1. Securely store your Resend API key as a backend secret
2. Update the contact form backend function sender name to "Nuance AI Language App"
3. After this, contact form messages will be delivered to your inbox

### Technical Details

**Secret to add:**
- `RESEND_API_KEY` with the value you provided

**File to update: `supabase/functions/send-contact/index.ts`**
- Change sender name from `"Nuance Contact"` to `"Nuance AI Language App"`
- The rest of the function already handles Resend correctly

**No other changes needed** -- the function already checks for `RESEND_API_KEY` and uses Resend when available.

