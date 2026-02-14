
# Fix Outfit Font Loading Reliability

## Problem
The Outfit font is loaded via `@import url(...)` inside `src/index.css`. This method is less reliable and slower than using `<link>` tags in the HTML head. When the import fails or is slow, the browser falls back to a serif font instead of Outfit.

## Changes

### 1. `index.html` -- Add font `<link>` tags
Add Google Fonts preconnect hints and a `<link>` stylesheet reference in the `<head>`, before the Vite script. This ensures the browser starts fetching the font early and reliably.

```text
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Note: adding weight 700 as well, in case any `font-bold` usage needs it.

### 2. `src/index.css` -- Remove the `@import`
Delete line 1 (`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');`) since the font is now loaded from `index.html`. Keeping both would cause a duplicate request.

## Why this fixes it
- `<link>` in HTML is discovered by the browser's preload scanner immediately, before any CSS is parsed.
- `@import` in CSS is only discovered after the CSS file itself is fetched and parsed, creating a waterfall delay.
- Preconnect hints further speed up the DNS/TLS handshake to Google Fonts.
