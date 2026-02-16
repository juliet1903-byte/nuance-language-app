

## Enable Browser Password Manager Support on Auth Page

The sign-in and sign-up forms on `/auth` are missing `autocomplete` attributes on their input fields. Adding these standard HTML attributes will allow Chrome (and other browsers) to suggest saved credentials and offer to save new ones.

### Changes

**File: `src/pages/Auth.tsx`**

Add `autocomplete` attributes to all form inputs:

- **Sign In form:**
  - Email input: `autoComplete="email"`
  - Password input: `autoComplete="current-password"`

- **Sign Up form:**
  - Display Name input: `autoComplete="name"`
  - Email input: `autoComplete="email"`
  - Password input: `autoComplete="new-password"`

These are standard HTML autocomplete tokens that browsers use to identify credential fields for autofill and password saving prompts.

