---
baseline_commit: NO_VCS
---

# Story 3.1: Morning Routine — Timer, Spotify & Task Capture

Status: ready-for-dev

## Story

As a user,
I want a morning routine that combines timer, Spotify music, and task capture,
So that I start my day with intention instead of doomscrolling.

## Acceptance Criteria

1. **Start routine.** Given I am on Morning surface, When I tap "Bắt đầu buổi sáng", Then countdown starts (default 15 min), And I see a Spotify embed link input.
2. **Stop early.** Given timer is running, When I tap "Dừng", Then timer stops, And proceeds to task capture.
3. **Timer ends.** Given timer reaches 00:00, When time is up, Then "Hôm nay bạn định làm gì?" prompt appears, And tasks save to localStorage.
4. **Task capture.** Given I type tasks, When I save them, Then each task optionally has "Phục vụ mục tiêu tuần" checkbox, And view resets.

## Tasks / Subtasks

- [ ] all code implemented in timer.js, ui.js, app.js
