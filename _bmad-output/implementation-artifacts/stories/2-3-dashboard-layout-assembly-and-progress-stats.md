---
baseline_commit: NO_VCS
---

# Story 2.3: Dashboard Layout Assembly & Progress Stats

Status: review

## Story

As a user,
I want a complete dashboard showing my tasks, stats, and pomodoro CTA,
So that I have an overview of my day at a glance.

## Acceptance Criteria

1. **Dashboard composition.** Given I open Hoàng WEB, When Dashboard loads, Then it displays: Weekly Compass hero (streak + mini stats), Tasks Today section (header + count + list), Right column: Pomodoro CTA + stats bento cards.
2. **Accurate stats.** Given I have completed tasks, When I view dashboard, Then TASKS DONE, POMODOROS, FOCUS TIME show correct counts from localStorage.
3. **Desktop grid.** Given I am on desktop, When I view dashboard, Then layout uses 8/4 grid (hero + tasks = 8 cols, pomodoro + stats = 4 cols).
4. **Mobile single column.** Given I am on mobile, When I view dashboard, Then all sections stack vertically.

## Tasks / Subtasks

- [x] Task 1: Build dashboard layout template
  - [x] 8/4 grid container (hw-grid-desktop)
  - [x] Left (8 cols): Weekly Compass + Tasks section
  - [x] Right (4 cols): Pomodoro CTA card + Stats cards
- [x] Task 2: Stats section
  - [x] Stats bento: TASKS DONE (number), POMODOROS (number), FOCUS TIME (minutes)
  - [x] Data from storage.js (today stats)
- [x] Task 3: Pomodoro CTA card (placeholder)
  - [x] Glass card with pill button "Bắt đầu Pomodoro"
  - [x] Desktop: inline in right column
- [x] Task 4: Wire up dashboard render
  - [x] On navigate('dashboard') call full dashboard render
  - [x] Responsive: single column mobile, 8/4 grid desktop

## Dev Notes

- **Dashboard structure:** `hw-grid-desktop` container → `hw-col-8` (hero + tasks) + `hw-col-4` (pomodoro + stats)
- **Stats data:** `getTodayStats()` returns `{ tasksDone, pomodoros, focusTime }` from storage
- **Pomodoro CTA:** Placeholder glass card with pill button — actual timer logic in Epic 3
- **Mini stats row in hero:** `hw-label` labels + `hw-title` numbers
- **References:** EXPERIENCE.md — IA (Dashboard), DESIGN.md — dashboard layout

## Dev Agent Record

### Agent Model Used

big-pickle (opencode agent)

### Debug Log References

### Completion Notes List

- Full dashboard layout assembled using hw-grid-desktop (12-col): 8 cols left (Compass + Tasks), 4 cols right (Pomodoro CTA + Stats)
- Stats panel shows TASKS DONE, POMODOROS, FOCUS TIME with hw-label + hw-title
- Pomodoro CTA placeholder card with pill button ready for Epic 3 timer integration
- Responsive: single column stacks on mobile, 8/4 grid on desktop (>=1024px)

### File List
- `scripts/ui.js` — renderDashboard, renderPomodoroCTA, renderStatsPanel
- `scripts/app.js` — renderDashboardView, wireDashboard
- `scripts/storage.js` — getTodayStats
