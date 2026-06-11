---
baseline_commit: NO_VCS
---

# Story 2.1: Weekly Compass & Streak Counter

Status: ready-for-dev

## Story

As a user,
I want to set a weekly goal and see my streak,
So that I stay focused on what matters and feel motivated to maintain momentum.

## Acceptance Criteria

1. **Weekly goal — empty state.** Given I open dashboard, When no weekly goal is set, Then I see "Chưa có mục tiêu tuần này" with inline edit prompt, And I can click to type my goal.
2. **Weekly goal — set.** Given I have set a goal, When I view dashboard, Then goal is displayed in hw-display (24px/700), And streak shows "Day X" in primary green with drop-shadow glow.
3. **Week reset.** Given a new week starts, When I open dashboard, Then weekly goal resets (with confirm if previous goal exists), And streak checks previous day for task completion to maintain count.
4. **Streak increment.** Given I have tasks completed today, When streak updates, Then streak increments by 1 if tasks done on each consecutive day.

## Tasks / Subtasks

- [ ] Task 1: Implement localStorage data layer in storage.js
  - [ ] `getData()` / `saveData()` — single key `hoangweb`
  - [ ] Weekly goal CRUD: `getWeeklyGoal()`, `setWeeklyGoal(text)`, `clearWeeklyGoal()`
  - [ ] Streak: `getStreak()`, `updateStreak()`, `checkWeekReset()`
  - [ ] Week detection: ISO week number or Monday-based
- [ ] Task 2: Render Weekly Compass component
  - [ ] Hero glass card: goal text (hw-display), streak counter right-aligned with green glow
  - [ ] Empty state: click-to-edit prompt
  - [ ] Mini stats row: tasks done / pomodoros / focus time
- [ ] Task 3: Wire up dashboard view
  - [ ] On Dashboard tab: render Weekly Compass
  - [ ] Week reset logic on init
  - [ ] Streak update on task completion

## Dev Notes

- **localStorage schema:** `{ weeklyGoal: { text, weekOf }, streak: { count, lastDate }, pomodoros: { count, date }, focusTime: { total, date }, tasks: [] }` — single key `hoangweb`
- **Week detection:** Get ISO week number via `getISOWeek(date)` helper; reset when week changes
- **Streak glow:** `text-[#4cf479] drop-shadow-[0_0_8px_rgba(76,244,121,0.4)]`
- **Confirm dialog:** `confirm('Mục tiêu tuần trước: ... Bạn muốn đặt mục tiêu mới?')`
- **References:** DESIGN.md — Weekly Compass hero, streak glow, typography tokens

## Dev Agent Record

### Agent Model Used

big-pickle (opencode agent)

### Debug Log References

### Completion Notes List

- Implemented full localStorage data layer: getData, saveData, weekly goal CRUD, streak, ISO week detection
- Weekly Compass glass card: hw-display goal text, streak with green drop-shadow glow, mini stats row
- Week reset with confirm dialog on ISO week change
- Streak auto-updates on task completion, handles consecutive day logic

### File List
- `scripts/storage.js` — data layer, CRUD, week detection, streak
- `scripts/ui.js` — renderWeeklyCompass, renderDashboard
- `scripts/app.js` — dashboard wiring, goal prompt
- `styles/base.css` — task-item hover, task-menu-popup styles
