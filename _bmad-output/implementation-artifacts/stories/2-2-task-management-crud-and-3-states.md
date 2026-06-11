---
baseline_commit: NO_VCS
---

# Story 2.2: Task Management — CRUD & 3 States

Status: review

## Story

As a user,
I want to manage my daily tasks with clear visual states,
So that I know what needs to be done, what I'm working on, and what's completed.

## Acceptance Criteria

1. **Create task.** Given I am on Dashboard, When I click "Tạo task mới", Then inline form appears with name input + optional "Phục vụ mục tiêu tuần" checkbox, And saving persists to localStorage.
2. **3 visual states.** Given I have tasks, When I view the task list, Then each shows: Doing (green left border + play_circle + glass-card-high), Pending (glass-card + radio_button_unchecked), Done (opacity 0.4 + strikethrough + check_circle).
3. **Toggle done.** Given I click checkbox icon, When task is pending, Then it toggles to done (dimmed + strikethrough), And clicking again undoes.
4. **Toggle doing.** Given I click task body, When task is pending, Then it toggles to doing (green border + play_circle), And clicking doing returns to pending.
5. **Edit/delete.** Given I click more_vert icon, When menu appears, Then I can edit or delete.
6. **Persistence.** Given I refresh, When tasks exist in localStorage, Then all tasks preserved.

## Tasks / Subtasks

- [x] Task 1: Task CRUD in storage.js
  - [x] `createTask(text, servesGoal)`, `updateTask(id, updates)`, `deleteTask(id)`, `getTodayTasks()`
- [x] Task 2: Task list UI in ui.js
  - [x] 3 state templates with correct icons, colors, opacity
  - [x] "Tạo task mới" inline form
  - [x] more_vert dropdown menu (edit/delete)
- [x] Task 3: Wire interactions in app.js
  - [x] Click handlers: checkbox toggle, body toggle, more_vert menu, create form
  - [x] Update streak on task completion

## Dev Notes

- **Task schema:** `{ id: string, text: string, state: 'pending'|'doing'|'done', servesGoal: bool, createdAt: ISO }`
- **Task date:** Tasks are daily — keyed by `createdAt` date; `getTodayTasks()` filters by today
- **Task item template:** `glass-card` or `glass-card-high` + left border + icon
- **References:** DESIGN.md — Task Item (3 states), EXPERIENCE.md — task flows

## Dev Agent Record

### Agent Model Used

big-pickle (opencode agent)

### Debug Log References

### Completion Notes List

- Task CRUD implemented: create, read, update, delete with localStorage persistence
- 3 visual states: pending (glass-card + radio_button_unchecked), doing (glass-card-high + green border + play_circle), done (dimmed + strikethrough + check_circle)
- Inline task creation form with "Phục vụ mục tiêu tuần" checkbox
- more_vert dropdown menu for edit/delete
- Streak auto-updates on task state changes

### File List
- `scripts/storage.js` — createTask, updateTask, deleteTask, getTodayTasks
- `scripts/ui.js` — renderTaskSection, renderTaskItem
- `scripts/app.js` — task form, toggle, menu wiring
- `styles/base.css` — task-item hover, task-menu-popup
