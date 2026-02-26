

## Plan: Add subtle badge above hero headline

**Location**: `src/pages/Landing.tsx`, inside the hero `<section>`, just before the `<motion.h1>`.

**Implementation**:
Add a `<motion.span>` pill badge with:
- Text: "The #1 Communication Tool for Business English Learners"
- Classes: `relative inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4 border`
- Background: `bg-cta/10` (uses existing blue CTA color at 10% opacity)
- Text: `text-cta` (darker blue)
- Border: `border-cta/20` (very subtle blue border)
- Fade-in animation matching existing stagger pattern (delay between page load and h1)

Single file change: `src/pages/Landing.tsx`, inserting ~6 lines before the `<motion.h1>` element.

