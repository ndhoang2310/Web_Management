---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - "_bmad-output/planning-artifacts/prds/prd-web_xam-2026-06-11/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-designs/ux-web_xam-2026-06-11/DESIGN.md"
  - "_bmad-output/planning-artifacts/ux-designs/ux-web_xam-2026-06-11/EXPERIENCE.md"
---

# web_xam - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for web_xam, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR-1: Timer + Spotify — User bấm "Bắt đầu buổi sáng" → timer đếm ngược (mặc định 15 phút, có thể chỉnh). Ô dán link Spotify embed → phát nhạc trong lúc timer chạy. Có thể dừng timer sớm.

FR-2: Daily Task Capture — Hết timer Morning → hiện ô nhập "Hôm nay tôi muốn làm:". Lưu tasks vào localStorage. Tasks tự động xuất hiện trên Dashboard.

FR-3: Default Homepage — Dashboard hiển thị tasks hôm nay (chưa làm/đang làm/hoàn thành), mục tiêu tuần (Weekly Compass), nút "Bắt đầu Pomodoro", streak.

FR-4: Weekly Goal — Dashboard hiện ô "Mục tiêu tuần này" vào đầu tuần. Lưu 1 mục tiêu duy nhất. Reset vào đầu tuần sau (tự động hoặc confirm).

FR-5: Task-Goal Linking — Khi tạo task hằng ngày, checkbox "Task này phục vụ mục tiêu tuần". Dashboard đếm "X/Y tasks hôm nay phục vụ mục tiêu".

FR-6: Pomodoro Mode — Timer 25 phút focus (tùy chỉnh). Hết focus → 5 phút nghỉ + nhắc vận động. Lưu số pomodoro/ngày.

FR-7: Task Completion Reward — Tick hoàn thành task → nút "Nhận thưởng" kích hoạt. Click → mở link reward bên ngoài.

FR-8: Progress Dashboard — Dashboard hiển thị: tasks done, phút focus, pomodoros. Tuần: biểu đồ cột 7 ngày. Streak: số ngày liên tục.

### Non-Functional Requirements

NFR-1: 100% client-side — localStorage cho toàn bộ dữ liệu, không backend, không đăng nhập.

NFR-2: Responsive mobile + desktop — Breakpoint 1024px. Mobile: bottom nav + single column. Desktop: sidebar + 8/4 grid.

NFR-3: Homepage-ready — Hoạt động như tab homepage mặc định của browser (user tự cài).

NFR-4: Timer accuracy — Sử dụng setTimeout/setInterval. Timer chạy kể cả khi tab background? (có Web Workers?).

NFR-5: Offline-capable — localStorage, không cần network (trừ Spotify embed).

### Additional Requirements (Architecture)

- Deploy Cloudflare Pages (free tier) — CDN toàn cầu, preview deployments, rollback 1 click.
- File structure: index.html + scripts/ (storage.js, timer.js, ui.js, app.js).
- State management: 1 key `hoangweb` JSON trong localStorage.
- Data schema: tasks (mảng daily), weeklyGoal, pomodoros (số/ngày), streak (lastDate + count), morningRoutine (timer setting, playlist link).
- Routing: Tab navigation JS thuần — chuyển view bằng tab click.
- Styling: CSS thuần + responsive media queries.
- Build: Không — Cloudflare serve trực tiếp file tĩnh.
- Starter: Custom Vanilla HTML + ES Modules, không CLI starter.

### UX Design Requirements

UX-DR1: Implement glass card system — 2 variants (glass-card: rgba(30,32,32,0.45)+backdrop-blur(12px); glass-card-high: rgba(40,42,43,0.6)+backdrop-blur(16px)).

UX-DR2: Implement 3-state task items — Doing (green left border + play_circle icon), Pending (default glass), Done (dimmed + strikethrough + check_circle).

UX-DR3: Implement navigation — Desktop sidebar (w-64, sticky, 4 tabs + settings). Mobile bottom bar (4 tabs, pb-safe). Active tab highlighted with green.

UX-DR4: Implement dark color system — Background #0c0f0f, surface stack (#121414→#333535), primary #4cf479 (functional only), semantic colors (negative/warning/announcement).

UX-DR5: Implement typography scale — Inter font, 5 levels: display 24px/700, headline 20px/700, title 16px/600, body 14px/400, caption 12px/400, label 10px/700 uppercase.

UX-DR6: Responsive layout — Mobile: margin 16px, single column. Desktop: margin 48px, max-w-6xl, 8/4 grid.

UX-DR7: Ambient glow decorations — 3 fixed blur circles (500px, blur(40px), pointer-events none) — desktop only.

UX-DR8: Pill buttons + circular timer — Nút rounded-full (9999px). Timer ring circular (50%, border-4 primary/20, animated spin).

UX-DR9: Weekly Compass hero — Glass card với streak counter right-aligned, inline edit weekly goal, mini stats row (tasks done, pomodoros, focus time).

UX-DR10: Pomodoro CTA dual — Desktop: inline right column. Mobile: FAB (fixed bottom-24 left-1/2). Both: pill, bg-primary, green glow shadow.

UX-DR11: Vietnamese-friendly voice — Friendly, personal. "Hôm nay bạn định làm gì?", "Đứng dậy, vươn vai, uống nước!". Không English corporate.

UX-DR12: Safe area — Bottom nav có pb-safe, touch targets ≥44px.

UX-DR13: Task completion feedback — Click checkbox → check_circle icon + opacity 0.4 + title strikethrough. Undo possible.

UX-DR14: Streak counter glow — Drop-shadow green glow trên streak number, ambient green blur circle background.

### FR Coverage Map

FR1 (Timer+Spotify): Epic 3
FR2 (Daily Task Capture): Epic 3
FR3 (Dashboard Homepage): Epic 2
FR4 (Weekly Goal): Epic 2
FR5 (Task-Goal Linking): Epic 2
FR6 (Pomodoro Mode): Epic 3
FR7 (Task Completion Reward): Epic 3
FR8 (Progress Dashboard): Epic 2

## Epic List

### Epic 1: Core Shell — Foundation & Deploy
Người dùng có thể truy cập Hoàng WEB qua trình duyệt, thấy UI system hoàn chỉnh (dark theme, navigation desktop/mobile, glass card components) dù chưa có dữ liệu.
**FRs covered:** (foundation)
**UX-DRs covered:** 1, 3, 4, 5, 6, 7, 12

#### Story 1.1: Project Scaffold & Cloudflare Deploy

As a developer,
I want to set up the project structure and deploy pipeline,
So that Hoàng WEB is accessible online and ready for development.

**Acceptance Criteria:**

**Given** the project is initialized
**When** I push to the main branch
**Then** Cloudflare Pages auto-builds and deploys the site within 30 seconds
**And** the site is accessible at hoangweb.pages.dev

**Given** the project has a file structure
**When** I open the repository
**Then** I see index.html at root, scripts/ folder with storage.js, timer.js, ui.js, app.js
**And** all files are valid HTML/CSS/JS without build step

#### Story 1.2: Navigation System — Sidebar & Bottom Bar

As a user,
I want a navigation system with desktop sidebar and mobile bottom bar,
So that I can switch between Dashboard, Morning, Focus, and Stats views easily.

**Acceptance Criteria:**

**Given** I am on desktop (≥1024px)
**When** I view the page
**Then** I see a left sidebar (w-64, sticky) with 4 nav links: Dashboard, Morning, Focus, Stats
**And** the active tab is highlighted with primary green + glass-card-high background
**And** inactive tabs show muted color and lighten on hover
**And** Settings link is at the bottom of sidebar

**Given** I am on mobile (<1024px)
**When** I view the page
**Then** I see a bottom navigation bar with 4 tabs and icons
**And** the bar has pb-safe for device safe area
**And** the active tab is highlighted with green + filled icon

**Given** I tap/click a nav item
**When** the tab changes
**Then** the active indicator moves to the selected tab
**And** the corresponding view is displayed (even if content is placeholder)

#### Story 1.3: Dark Theme & Glass UI System

As a user,
I want a dark theme UI with glass card components and ambient glow,
So that the interface feels immersive and premium like Spotify.

**Acceptance Criteria:**

**Given** the page loads
**When** I view any surface
**Then** the background is near-black (#0c0f0f)
**And** text is #e2e2e2 with Inter font family
**And** the typography scale matches: display 24px/700, headline 20px/700, title 16px/600, body 14px/400, label 10px/700 uppercase

**Given** there is a card on the page
**When** I inspect its style
**Then** it uses glass-card: rgba(30,32,32,0.45) + backdrop-blur(12px) + border rgba(133,149,131,0.15)
**And** elevated variants use glass-card-high: rgba(40,42,43,0.6) + backdrop-blur(16px)

**Given** I am on desktop
**When** the page renders
**Then** ambient glow circles (500px blur(40px)) appear at top-left, top-right, and bottom
**And** they are non-interactive (pointer-events: none)

**Given** I check the color usage
**When** any accent element is shown
**Then** green (#4cf479) is used only for functional/active elements, not decorative backgrounds

#### Story 1.4: Responsive Layout & Routing Skeleton

As a user,
I want the layout to adapt between mobile and desktop,
So that I can use Hoàng WEB comfortably on any screen size.

**Acceptance Criteria:**

**Given** I am on desktop (≥1024px)
**When** I view the page
**Then** content area has margin-desktop (48px), max-w-6xl, with 8/4 column grid layout
**And** sidebar is visible, bottom bar is hidden

**Given** I am on mobile (<1024px)
**When** I view the page
**Then** content uses margin-mobile (16px), single column layout
**And** sidebar is hidden, bottom bar is visible
**And** a top app bar shows "Chào Hoàng" with avatar

**Given** I click/tap a nav tab
**When** the view switches
**Then** the JS routing function shows/hides the corresponding section
**And** the browser URL doesn't change (SPA)
**And** the active nav state updates

### Epic 2: Dashboard & Task Management
Người dùng có thể xem dashboard với tasks hôm nay (3 trạng thái), đặt mục tiêu tuần, link task với mục tiêu, xem streak và thống kê nhanh.
**FRs covered:** FR3, FR4, FR5, FR8
**UX-DRs covered:** 2, 9, 13, 14

#### Story 2.1: Weekly Compass & Streak Counter

As a user,
I want to set a weekly goal and see my streak,
So that I stay focused on what matters and feel motivated to maintain momentum.

**Acceptance Criteria:**

**Given** I open the dashboard
**When** no weekly goal is set
**Then** I see "Chưa có mục tiêu tuần này" with an inline edit prompt
**And** I can click to type my goal

**Given** I have set a weekly goal
**When** I view the dashboard
**Then** the goal is displayed in display typography (24px/700) in the hero section
**And** streak counter shows "Day X" in primary green with drop-shadow glow

**Given** a new week starts (detected by date)
**When** I open the dashboard
**Then** the weekly goal resets (with confirm dialog if previous goal exists)
**And** the streak checks for at least 1 task done in previous day to maintain count

**Given** I have tasks completed today
**When** streak updates
**Then** streak increments by 1 if at least 1 task was completed on each consecutive day

#### Story 2.2: Task Management — CRUD & 3 States

As a user,
I want to manage my daily tasks with clear visual states,
So that I know what needs to be done, what I'm working on, and what's completed.

**Acceptance Criteria:**

**Given** I am on the Dashboard
**When** I click "Tạo task mới"
**Then** an inline form appears with task name input and optional "Phục vụ mục tiêu tuần" checkbox
**And** saving persists the task to localStorage immediately

**Given** I have tasks
**When** I view the task list
**Then** each task shows with 3 possible states:
- Doing: green left border (3px), play_circle icon, glass-card-high background
- Pending: default glass-card background, radio_button_unchecked icon
- Done: dimmed (opacity 0.4), strikethrough title, check_circle icon

**Given** I click a task's checkbox icon
**When** the task is pending
**Then** it toggles to done (dimmed + strikethrough)
**And** clicking again undoes the completion

**Given** I click the task body area
**When** the task is pending
**Then** it toggles to "doing" state (green border + play_circle)
**And** clicking a doing task returns it to pending

**Given** I click the more_vert icon on a task
**When** the menu appears
**Then** I can edit or delete the task

**Given** I refresh the page
**When** tasks exist in localStorage
**Then** all tasks are preserved and displayed correctly

#### Story 2.3: Dashboard Layout Assembly & Progress Stats

As a user,
I want a complete dashboard showing my tasks, stats, and pomodoro CTA,
So that I have an overview of my day at a glance.

**Acceptance Criteria:**

**Given** I open Hoàng WEB
**When** the Dashboard view loads
**Then** it displays in order:
1. Weekly Compass hero (with streak right-aligned, mini stats row: tasks done / pomodoros / focus time)
2. Tasks Today section (header with count + task list)
3. Right column (desktop): Pomodoro CTA card + stats bento cards

**Given** I have completed tasks
**When** I view the dashboard
**Then** TASKS DONE, POMODOROS, FOCUS TIME show accurate counts from localStorage

**Given** I am on desktop
**When** I view the dashboard
**Then** the layout uses 8/4 grid (hero + tasks take 8 cols, pomodoro + stats take 4 cols)

**Given** I am on mobile
**When** I view the dashboard
**Then** all sections stack vertically in single column

### Epic 3: Routines & Rewards
Người dùng có thể bắt đầu Morning Routine (timer + Spotify + task capture), chạy Pomodoro focus timer, và nhận thưởng sau khi hoàn thành task.
**FRs covered:** FR1, FR2, FR6, FR7
**UX-DRs covered:** 8, 10, 11

#### Story 3.1: Morning Routine — Timer, Spotify & Task Capture

As a user,
I want a morning routine that combines timer, Spotify music, and task capture,
So that I start my day with intention instead of doomscrolling.

**Acceptance Criteria:**

**Given** I am on the Morning surface
**When** I tap "Bắt đầu buổi sáng"
**Then** a countdown timer starts (default 15 minutes, configurable in Settings)
**And** I see an input field to paste a Spotify embed link
**And** when a valid embed link is pasted, the Spotify player renders inline

**Given** the timer is running
**When** I tap "Dừng"
**Then** the timer stops early
**And** proceeds to the task capture step

**Given** the timer reaches 00:00
**When** time is up
**Then** a prompt appears: "Hôm nay bạn định làm gì?" with a text input
**And** each task I type and save is persisted to localStorage
**And** tasks appear on the Dashboard immediately

**Given** I have typed tasks
**When** I save them
**Then** each task optionally has a "Phục vụ mục tiêu tuần" checkbox (if weekly goal exists)
**And** the morning routine view resets, ready for tomorrow

#### Story 3.2: Focus Timer — Pomodoro 25/5

As a user,
I want a Pomodoro timer that alternates between focus and break,
So that I can work in focused sprints with built-in rest.

**Acceptance Criteria:**

**Given** I am on the Focus surface
**When** I tap "Bắt đầu"
**Then** the timer starts at 25:00 and counts down every second
**And** I can pause and resume at any time
**And** I can stop the timer entirely

**Given** the focus timer reaches 00:00
**When** the session ends
**Then** a notification appears: "Đứng dậy, vươn vai, uống nước!"
**And** the timer auto-switches to 5:00 break mode

**Given** the break timer reaches 00:00
**When** break ends
**Then** a notification appears: "Tiếp tục focus nào!"
**And** the timer resets to 25:00 ready for next session

**Given** I complete a Pomodoro session
**When** the focus timer ends
**Then** the pomodoro count for today increments by 1
**And** focus time (in minutes) is added to today's stats
**And** all data persists in localStorage

**Given** I am on the Dashboard
**When** I look at stats
**Then** the number of today's pomodoros and total focus time are displayed

#### Story 3.3: Reward Box — Task Completion Trigger

As a user,
I want a reward button that activates when I complete a task,
So that I have motivation to finish what I started.

**Acceptance Criteria:**

**Given** I have completed a task (ticked done on Dashboard)
**When** the task is marked done
**Then** the "Nhận thưởng" button becomes enabled (glowing green)
**And** it was disabled/hidden before completion

**Given** the "Nhận thưởng" button is enabled
**When** I click it
**Then** the app opens a new tab/window for a reward link (user-configured, e.g. game/YouTube/music)
**Or** shows a prompt to paste my reward link
**And** the button returns to disabled state after use

**Given** no task has been completed recently
**When** I view the Dashboard
**Then** the reward button is either hidden or clearly disabled
**And** I cannot trigger a reward without a fresh task completion

#### Story 3.4: FAB — Mobile Pomodoro Quick Start

As a mobile user,
I want a floating action button to quickly start a Pomodoro,
So that I don't have to navigate to the Focus tab first.

**Acceptance Criteria:**

**Given** I am on mobile (<1024px)
**When** I view any surface
**Then** a floating pill button appears fixed at bottom-center: bg-primary, green glow shadow, "Bắt đầu Pomodoro"

**Given** I tap the FAB
**When** the button is clicked
**Then** the app navigates to the Focus surface
**And** immediately starts a 25-minute Pomodoro session

**Given** I am on desktop (≥1024px)
**When** I view the Dashboard
**Then** the Pomodoro CTA appears inline in the right column (not as FAB)
**And** clicking it navigates to Focus and starts the timer
