---
baseline_commit: NO_VCS
---

# Story 1.4: Responsive Layout & Routing Skeleton

Status: review

## Story

As a user,
I want the layout to adapt between mobile and desktop,
So that I can use Hoàng WEB comfortably on any screen size.

## Acceptance Criteria

1. **Desktop layout.** Given I am on desktop (≥1024px), When I view the page, Then content area has margin-desktop (48px), max-w-6xl, with 8/4 column grid layout, And sidebar is visible, bottom bar is hidden.
2. **Mobile layout.** Given I am on mobile (<1024px), When I view the page, Then content uses margin-mobile (16px), single column layout, And sidebar is hidden, bottom bar is visible, And a top app bar shows "Chào Hoàng" with avatar.
3. **SPA routing.** Given I click/tap a nav tab, When the view switches, Then the JS routing function shows/hides sections, And URL doesn't change (SPA), And active nav state updates.

## Tasks / Subtasks

- [x] Task 1: Add mobile top app bar (AC: #2)
  - [x] Fixed top bar: "Chào Hoàng" left + avatar circle right
  - [x] Hidden on desktop via `lg:hidden`
  - [x] Avatar: initials "H" in green circle
  - [x] Safe area top padding
- [x] Task 2: Add 8/4 grid layout utility (AC: #1)
  - [x] `.hw-grid-desktop`: `lg:grid lg:grid-cols-12 lg:gap-6`
  - [x] `.hw-col-8`: `lg:col-span-8`
  - [x] `.hw-col-4`: `lg:col-span-4`
- [x] Task 3: Verify routing + responsive behavior (AC: #3)
  - [x] Confirm navigate() works
  - [x] Confirm sidebar hidden on mobile, bottom bar hidden on desktop
  - [x] Confirm margins: p-4 lg:p-12

## Dev Notes

- **Mobile top bar:** `fixed top-0 w-full h-14 flex items-center justify-between px-4 z-30 bg-background/70 backdrop-blur-2xl lg:hidden`, `padding-top: env(safe-area-inset-top)`
- **Avatar:** 32x32 circle, bg-primary, text-on-primary, initials "H", `rounded-full`
- **Main content offset:** Already has `pb-20 lg:pb-0` for bottom bar; needs `pt-14 lg:pt-0` for top bar on mobile
- **Grid classes:** Reusable for future dashboard layout (Epic 2)
- **Routing + responsive:** Already implemented in Stories 1.2 + 1.3 — this story formalizes and adds remaining pieces.

### References

- DESIGN.md: Layout & Spacing section, Responsive Breakpoints table
- EXPERIENCE.md: IA (4 surfaces), responsive rules
- Current `ui.js`: renderViews, renderLayout, renderSidebar, renderBottomBar

## Dev Agent Record

### Agent Model Used

big-pickle (opencode agent)

### Debug Log References

### Completion Notes List

- Added mobile top app bar: "Chào Hoàng" with green avatar "H", safe area padding, hidden on desktop
- Added grid layout utilities: `.hw-grid-desktop` (12-col), `.hw-col-8`, `.hw-col-4` for future dashboard
- Added `pt-14 lg:pt-0` to main content for mobile top bar offset
- All routing + responsive behavior verified from previous stories

### File List
- `scripts/ui.js` — added renderMobileTopBar(), pt-14 to main-content
- `styles/base.css` — added .hw-grid-desktop, .hw-col-8, .hw-col-4
