

## Problem

The `overflow-hidden` on the `<main>` container (line 52) clips the top of the avatar's `ring-2 ring-offset-2` decoration, since the avatar is the first visual element inside and the ring extends outside its box.

## Fix

Add `pt-2` (or similar small top padding) to the avatar's wrapping `<section>` so the ring has room to render without being clipped. This is the minimal change that preserves the existing `overflow-hidden` (which is needed for the `LoginBanner` blur effect).

**File:** `src/pages/Profile.tsx`, line 55  
- Change `<section className="flex flex-col items-center text-center">` to `<section className="flex flex-col items-center text-center pt-2">`

