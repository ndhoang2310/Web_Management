---
baseline_commit: NO_VCS
---

# Story 1.3: Dark Theme & Glass UI System

Status: review

## Story

As a user,
I want a dark theme UI with glass card components and ambient glow,
So that the interface feels immersive and premium like Spotify.

## Acceptance Criteria

1. **Dark theme foundation.** Given the page loads, When I view any surface, Then background is near-black (#0c0f0f), And text is #e2e2e2 with Inter font, And typography scale matches: display 24px/700, headline 20px/700, title 16px/600, body 14px/400, label 10px/700 uppercase.
2. **Glass card styles.** Given there is a card, When I inspect its style, Then it uses glass-card (rgba(30,32,32,0.45) + backdrop-blur(12px) + border rgba(133,149,131,0.15)), And elevated variant uses glass-card-high (rgba(40,42,43,0.6) + backdrop-blur(16px)).
3. **Ambient glow.** Given I am on desktop, When the page renders, Then ambient glow circles (500px blur(40px)) appear at top-left, top-right, and bottom, And they are non-interactive (pointer-events: none).
4. **Green functional only.** Given I check color usage, When any accent element is shown, Then green (#4cf479) is used only for functional/active elements, not decorative backgrounds.

## Tasks / Subtasks

- [x] Task 1: Add glass card CSS utility classes (AC: #2)
  - [x] `.glass-card`: background, backdrop-filter, border, box-shadow, border-radius from tokens
  - [x] `.glass-card-high`: elevated variant
- [x] Task 2: Add typography utility classes (AC: #1)
  - [x] `.hw-display`: 24px/700/-0.02em
  - [x] `.hw-headline`: 20px/700/-0.01em
  - [x] `.hw-title`: 16px/600
  - [x] `.hw-body`: 14px/400
  - [x] `.hw-caption`: 12px/400
  - [x] `.hw-label`: 10px/700/+0.05em uppercase
- [x] Task 3: Add ambient glow to layout (AC: #3)
  - [x] 3 divs: top-left (green), top-right (white), bottom (green)
  - [x] CSS: fixed, 500px, blur(40px), pointer-events none, z-index -1
  - [x] Hidden on mobile, visible on desktop
- [x] Task 4: Verify green usage (AC: #4)
  - [x] Ensure no decorative green backgrounds in any existing styles/components

## Dev Notes

- **Glass card CSS** uses existing CSS custom properties from `base.css` (`--hw-glass-bg`, `--hw-glass-high-bg`, etc.)
- **Ambient glow positions:** top-left: `top-[-200px] left-[-200px]`, top-right: `top-[-200px] right-[-200px]`, bottom: `bottom-[-200px] left-1/2 -translate-x-1/2`
- **Ambient glow only on desktop:** Wrap in `<div class="hidden lg:block">` + `pointer-events-none`
- **Typography classes** map directly from DESIGN.md type scale table
- **Green usage check:** In existing code, green is only used for: nav active state (text + border), icon fill toggle. No decorative green backgrounds exist. Story 1.3 just formalizes this constraint.

### Project Structure Notes

```
/
├── styles/
│   └── base.css        # ADD glass-card, glass-card-high, typography utilities, ambient glow CSS
├── scripts/
│   └── ui.js           # ADD ambient glow HTML to renderLayout
```

### References

- DESIGN.md: glass-card tokens (lines 83-93), typography scale (lines 140-147), ambient glow (lines 224-235)
- base.css: existing CSS custom properties at `:root`

## Dev Agent Record

### Agent Model Used

big-pickle (opencode agent)

### Debug Log References

### Completion Notes List

- Added `.glass-card` and `.glass-card-high` CSS classes using existing design tokens
- Added full typography scale: `.hw-display`, `.hw-headline`, `.hw-title`, `.hw-body`, `.hw-caption`, `.hw-label`
- Added ambient glow: 3 fixed blur circles (top-left green, top-right white, bottom green), desktop only
- Refactored `renderViewPlaceholder` to use `.glass-card` and `.hw-headline` classes
- Verified green (#4cf479) only used functionally (nav active state, icon fills) — no decorative green backgrounds

### File List
- `styles/base.css` — glass-card, glass-card-high, typography utilities, .hw-glow
- `scripts/ui.js` — added renderAmbientGlow(), refactored placeholder to use CSS classes
