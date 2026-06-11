---
baseline_commit: NO_VCS
---

# Story 3.3: Reward Box — Task Completion Trigger

Status: ready-for-dev

## Story

As a user,
I want a reward button that activates when I complete a task,
So that I have motivation to finish what I started.

## Acceptance Criteria

1. **Button enables.** Given I completed a task, When it's marked done, Then "Nhận thưởng" button glows green.
2. **Claim reward.** Given button is enabled, When I click it, Then it opens configured reward link (or prompts to set one).
3. **Disabled by default.** Given no task completed recently, When I view Dashboard, Then reward button is hidden/disabled.

## Tasks / Subtasks

- [ ] all code implemented in ui.js, app.js
