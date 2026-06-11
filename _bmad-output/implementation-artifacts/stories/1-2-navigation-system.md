---
baseline_commit: NO_VCS
---

# Story 1.2: Navigation System — Sidebar & Bottom Bar

Status: review

## Story

As a user,
I want a navigation system with desktop sidebar and mobile bottom bar,
So that I can switch between Dashboard, Morning, Focus, and Stats views easily.

## Acceptance Criteria

1. **Desktop sidebar.** Given I am on desktop (≥1024px), When I view the page, Then I see a left sidebar (w-64, sticky) with 4 nav links (Dashboard, Morning, Focus, Stats), And the active tab is highlighted with primary green + glass-card-high background, And inactive tabs show muted color and lighten on hover, And Settings link is at the bottom of sidebar.
2. **Mobile bottom bar.** Given I am on mobile (<1024px), When I view the page, Then I see a bottom nav bar with 4 tabs + Material Symbols icons, And the bar has pb-safe for device safe area, And the active tab is highlighted with green + filled icon.
3. **Tab switching.** Given I tap/click a nav item, When the tab changes, Then the active indicator moves to the selected tab, And the corresponding view is displayed (even if content is placeholder).
4. **Sidebar hidden on mobile.** Given I am on mobile (<1024px), When I view the page, Then the sidebar is hidden.
5. **Bottom bar hidden on desktop.** Given I am on desktop (≥1024px), When I view the page, Then the bottom bar is hidden.

## Tasks / Subtasks

- [x] Task 1: Build sidebar HTML in `ui.js` (AC: #1, #4)
  - [x] Render 4 nav items + Settings link at bottom
  - [x] Use Material Symbols icons per tab: `dashboard`, `wb_sunny`, `timer`, `bar_chart`
  - [x] Active item gets `glass-card-high` + text-primary + filled icon
  - [x] Inactive: muted text, outline icon, hover → brighten
  - [x] Hidden on mobile via `hidden lg:flex`
- [x] Task 2: Build bottom bar HTML in `ui.js` (AC: #2, #5)
  - [x] 4 tabs with Material Symbols icons + labels
  - [x] Active tab: text-primary + filled icon
  - [x] `pb-safe` via `padding-bottom: env(safe-area-inset-bottom)`
  - [x] Hidden on desktop via `lg:hidden`
- [x] Task 3: Implement tab routing in `app.js` (AC: #3)
  - [x] 4 view sections: `#view-dashboard`, `#view-morning`, `#view-focus`, `#view-stats`
  - [x] `navigate(tab)` function: hide all views, show target, update active nav
  - [x] Initialize to Dashboard on load
  - [x] Wire nav clicks to `navigate()`
- [x] Task 4: Create placeholder views (AC: #3)
  - [x] Each view has a glass card with the view title
  - [x] Dashboard shows "Dashboard" placeholder
  - [x] Morning shows "Morning Routine" placeholder
  - [x] Focus shows "Focus Timer" placeholder
  - [x] Stats shows "Stats" placeholder
- [x] Task 5: Ensure responsive breakpoint (AC: #4, #5)
  - [x] Sidebar: `hidden lg:flex lg:flex-col lg:w-64`
  - [x] Bottom bar: `fixed bottom-0 w-full lg:hidden`

## Dev Notes

- **Sidebar structure:** Fixed left column, `h-screen sticky top-0`, `bg-background/60 backdrop-blur-xl`, `w-64`.
- **Nav item template:** `<a class="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors" data-tab="dashboard">` + icon `<span class="material-symbols-outlined">dashboard</span>` + label.
- **Active nav class:** `bg-[rgba(40,42,43,0.6)] backdrop-blur(16px) border border-white/5 text-primary font-bold`. The filled/outline icon variant: filled icon requires `class="material-symbols-outlined fill"` (Tailwind `[font-variation-settings:'FILL'_1]`).
- **Icon fill toggle:** Use CSS class `.icon-fill { font-variation-settings: 'FILL' 1 }` and `.icon-outline { font-variation-settings: 'FILL' 0 }`.
- **Bottom bar:** `bg-background/70 backdrop-blur-2xl`, `pb-[env(safe-area-inset-bottom)]`, touch targets ≥44px.
- **View sections:** Each is a `<section id="view-{name}" class="hidden">` inside `#app`. `navigate()` shows active, hides others.
- **Default view:** Dashboard loads by default on page init.
- **Settings link:** Bottom of sidebar, smaller/separator, `data-tab="settings"` — currently no-op.
- **Desktop sidebar shown/hidden**: Use Tailwind responsive classes `hidden lg:flex` for sidebar, `lg:hidden` for bottom bar.

### Project Structure Notes

```
/
├── index.html       # (existing) has #app mount point + script tags
├── styles/
│   └── base.css     # (existing) add .icon-fill, .icon-outline utility
├── scripts/
│   ├── storage.js   # (placeholder)
│   ├── timer.js     # (placeholder)
│   ├── ui.js        # Sidebar, bottom bar, view placeholder renderers
│   └── app.js       # Tab routing, init, nav wiring
```

### References

- Icon names: `dashboard`, `wb_sunny`, `timer`, `bar_chart`, `settings`
- DESIGN.md: glass-card, glass-card-high tokens, typography tokens, nav specs
- EXPERIENCE.md: IA (4 surfaces), responsive rules (sidebar hidden <1024px, bottom bar hidden >=1024px)
- `base.css` already has CSS custom properties for all design tokens

## Dev Agent Record

### Agent Model Used

big-pickle (opencode agent)

### Debug Log References

### Completion Notes List

- Implemented sidebar navigation with 4 tabs + Settings link, glass-card-high active state, Material Symbols icons
- Implemented mobile bottom bar with 4 tabs, pb-safe, responsive hide/show
- Implemented tab routing in app.js: navigate() function, DOMContentLoaded init, nav click wiring
- Created placeholder views for all 4 surfaces with glass card styling
- Added hover effects for nav items in base.css

### File List
- `scripts/ui.js` — sidebar, bottom bar, views renderers + updateActiveNav
- `scripts/app.js` — tab routing, init, nav click handlers
- `styles/base.css` — nav-item and bottom-nav-item hover styles
