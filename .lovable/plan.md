
# Theme-Aware Logo Update

## Overview
Replace the current logo with the new uploaded SVG, rendered as an inline React component that automatically switches between dark (`#1E1F22`) and white (`#FFFFFF`) based on the active theme.

## What changes

### 1. Copy the new SVG to the project
Save the uploaded file to `src/assets/logo_1.svg` for reference/fallback.

### 2. Create `src/components/Logo.tsx`
A React component that renders the new SVG inline with all `fill` and `stroke` values set to `currentColor` instead of `#1E1F22`. Since the logo is fully monochromatic, every colored attribute becomes `currentColor`, inheriting from the parent's CSS `color` -- which is already controlled by the theme system (`--foreground`).

The component accepts a `className` prop for sizing (default `h-8`).

### 3. Update usages
- **`src/pages/Index.tsx`** -- replace `<img src={logo} ...>` with `<Logo />`, remove the old logo import.
- **`src/components/DesktopSidebar.tsx`** -- same replacement.

### Technical notes
- No conditional logic or theme hooks needed inside the component. `currentColor` handles light/dark automatically.
- The existing `text-foreground` class (or inherited foreground color) ensures the logo is near-black in light mode and light/white in dark mode.
