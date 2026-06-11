---
baseline_commit: NO_VCS
---

# Story 3.4: FAB — Mobile Pomodoro Quick Start

Status: ready-for-dev

## Story

As a mobile user,
I want a floating action button to quickly start a Pomodoro,
So that I don't have to navigate to the Focus tab first.

## Acceptance Criteria

1. **FAB visible.** Given I am on mobile (<1024px), When I view any surface, Then FAB appears fixed bottom-center with green glow.
2. **FAB action.** Given I tap FAB, When clicked, Then app navigates to Focus and starts 25-min Pomodoro.
3. **Desktop hidden.** Given I am on desktop (>=1024px), When I view Dashboard, Then Pomodoro CTA is inline in right column (not FAB).

## Tasks / Subtasks

- [ ] all code implemented in ui.js, app.js
