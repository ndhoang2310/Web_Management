---
baseline_commit: NO_VCS
---

# Story 3.2: Focus Timer — Pomodoro 25/5

Status: ready-for-dev

## Story

As a user,
I want a Pomodoro timer that alternates between focus and break,
So that I can work in focused sprints with built-in rest.

## Acceptance Criteria

1. **Start/pause/stop.** Given I am on Focus surface, When I tap "Bắt đầu", Then timer starts 25:00 countdown, And I can pause/resume/stop.
2. **Focus ends.** Given focus timer reaches 00:00, When session ends, Then "Đứng dậy, vươn vai, uống nước!" notification appears, And auto-switches to 5:00 break.
3. **Break ends.** Given break timer reaches 00:00, When break ends, Then "Tiếp tục focus nào!" notification appears, And resets to 25:00.
4. **Stats.** Given I complete a Pomodoro, When focus timer ends, Then pomodoro count + focus time increment in localStorage.
5. **Dashboard.** Given I am on Dashboard, When I look at stats, Then today's pomodoros and focus time displayed.

## Tasks / Subtasks

- [ ] all code implemented in timer.js, ui.js, app.js
