

# Landing Page and Authentication System

## Overview
Create a polished landing page at `/` using the app's light theme and brand colors, with full authentication and guest mode support.

## 1. Landing Page (`src/pages/Landing.tsx`)

**Design**: Light theme with warm beige background (`bg-background`), white card sections, Outfit font throughout.

**Structure**:
- **Nav bar**: Nuance logo (left), "Sign In" text button (right)
- **Hero section**:
  - Headline: "Speak with Impact. Lead with Nuance."
  - Subheadline: "You've mastered the basics. Now, master the nuance. Refactor your business communication to lead, influence, and impact."
  - "Join Nuance" button (brand blue / `bg-cta`)
  - "Try as Guest" button (green accent / `bg-accent` outline)
- **Product showcase**: Uploaded `hero_1.png` displayed in a styled container with rounded corners and shadow
- **Features section**: Three cards -- Vibe IQ, Learning Path (4 levels), Daily Streaks
- **Footer CTA**: Repeated "Join Nuance" call-to-action

## 2. Database Setup (Migration)

Create a `profiles` table:

| Column | Type | Details |
|--------|------|---------|
| id | uuid | PK, FK to auth.users(id) ON DELETE CASCADE |
| display_name | text | nullable |
| vibe_iq | integer | default 0 |
| learning_level | integer | default 1 (1-4) |
| streak_days | integer | default 0 |
| last_active_date | date | nullable, for streak calculation |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

**RLS policies**: Users can SELECT and UPDATE only their own row.

**Trigger**: Auto-create a profile row when a new user signs up.

## 3. Authentication

### Auth Context (`src/components/AuthContext.tsx`)
- Provides `user`, `profile`, `isGuest`, `signIn`, `signUp`, `signOut`, `enterGuestMode`
- Listens to `onAuthStateChange` (set up before `getSession`)
- Fetches profile data when user is authenticated

### Auth Page (`src/pages/Auth.tsx`)
- Tabbed Sign Up / Sign In form (email + password)
- Uses brand blue CTA button styling
- Redirects to `/dashboard` on success

### Guest Mode
- "Try as Guest" sets a flag in localStorage (`nuance-guest`)
- No anonymous Supabase sign-ups
- Guest users can access the Social Translator demo freely
- Guest users see "Login to Save Progress" banners overlaying:
  - Vibe IQ dashboard (Stats page)
  - Streak counters (Progress page, LearningPath component)
- Guest mode is a one-time demo; the flag persists to encourage registration

## 4. Routing Changes

### `src/App.tsx`
- `/` -- Landing page (public)
- `/auth` -- Auth page (public)
- `/dashboard` -- Current Index/home (protected or guest-accessible)
- All other routes remain the same but wrapped with auth awareness

### Navigation Updates
- `DesktopSidebar`: Home link changes from `/` to `/dashboard`
- `BottomNav`: Home link changes from `/` to `/dashboard`

## 5. Guest Banners

Create a reusable `LoginBanner` component that overlays content with a blurred backdrop and "Login to Save Progress" message with a "Sign Up" CTA button.

Apply it on:
- **Stats page**: Over the Vibe IQ Mastery section
- **Progress page**: Over the streak counter and activity calendar
- **LearningPath component**: Over the streak badge

## Files Summary

**New files**:
- `src/pages/Landing.tsx`
- `src/pages/Auth.tsx`
- `src/components/AuthContext.tsx`
- `src/components/LoginBanner.tsx`

**Modified files**:
- `src/App.tsx` -- New routes, AuthProvider wrapper
- `src/components/DesktopSidebar.tsx` -- Home link to `/dashboard`
- `src/components/BottomNav.tsx` -- Home link to `/dashboard`
- `src/pages/Stats.tsx` -- Guest banner over Vibe IQ section
- `src/pages/Progress.tsx` -- Guest banner over streaks/calendar
- `src/components/LearningPath.tsx` -- Guest banner over streak badge

## Technical Details

### Database Migration SQL
```text
-- profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  vibe_iq integer DEFAULT 0 NOT NULL,
  learning_level integer DEFAULT 1 NOT NULL,
  streak_days integer DEFAULT 0 NOT NULL,
  last_active_date date,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### Auth Context Pattern
- `onAuthStateChange` listener registered before `getSession()` call
- Profile fetched via Supabase client on auth state change
- Guest mode tracked via React state + localStorage (no Supabase auth)

### Landing Page Colors
- Background: `bg-background` (warm beige #F4F3F1)
- Cards: `bg-card` (white)
- Primary CTA: `bg-cta text-cta-foreground` (brand blue)
- Secondary CTA: `border-accent text-accent` (green outline)
- Text: `text-foreground` / `text-muted-foreground`

