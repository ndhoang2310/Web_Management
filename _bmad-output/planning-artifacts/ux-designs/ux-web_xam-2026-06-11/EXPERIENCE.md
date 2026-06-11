---
name: Hoàng WEB
status: final
sources:
  - {planning_artifacts}/prds/prd-web_xam-2026-06-11/prd.md
  - {planning_artifacts}/architecture.md
  - {planning_artifacts}/ux-designs/ux-web_xam-2026-06-11/imports/stitch-dashboard.html
updated: 2026-06-11
---

# Hoàng WEB — Experience Spine

> Single-surface responsive web, 100% client-side (localStorage). Dark theme Spotify-inspired. DESIGN.md is the visual identity reference; this spine is the experience. Personal project, 1 user (tác giả).

## Foundation

Single-surface responsive web. HTML/CSS/JS thuần — không framework, không build step, deploy Cloudflare Pages static. 100% client-side — localStorage cho mọi dữ liệu. `DESIGN.md` là visual identity reference. Single-user — không đăng nhập, không multi-device.

## Information Architecture

| Surface | Reached from | Purpose |
|---------|-------------|---------|
| Dashboard | App open (default tab) | Tasks hôm nay, Weekly Compass, streak, pomodoro start, stats mini |
| Morning | Tab bar / sidebar | Morning Routine timer + Spotify embed + task capture |
| Focus | Tab bar / sidebar | Pomodoro 25/5 timer + vận động notification |
| Stats | Tab bar / sidebar | Progress Tracker: biểu đồ cột 7 ngày, streak calendar, focus time |
| Settings | Sidebar (desktop) / chưa có mobile entry | Cài đặt timer, reset data, theme (v2) |

Desktop **sidebar** (4 nav links + settings). Mobile **bottom bar** (4 tabs — Dashboard, Morning, Focus, Stats). Settings chỉ trên desktop sidebar.

> Composition reference: `mockups/stitch-dashboard.html`. Spine wins on conflict.

## Voice and Tone

Cá nhân, ấm áp, tối giản. Không corporate, không gamification rẻ tiền. Cảm giác như "nhật ký tập trung" hơn là "productivity tool".

| Do | Don't |
|----|-------|
| "Hôm nay bạn định làm gì?" | "Let's get productive! 🚀" |
| "Đứng dậy, vươn vai, uống nước!" | "Take a break!" |
| "Chưa có mục tiêu tuần này." | "Set a weekly goal to maximize your potential!" |
| "3 tasks còn lại" | "You have 3 remaining items." |
| "Hôm nay: 5 tasks done, 3 pomodoros" | "Amazing progress today! 🔥" |

## Component Patterns

Behavioral. Visual specs live in `DESIGN.md.Components`.

| Component | Surface | Behavioral rules |
|-----------|---------|------------------|
| Task item | Dashboard | Click task → toggle done/pending. Click icon area → start focus mode on this task. 3 states: doing / pending / done. |
| Weekly Compass hero | Dashboard | Inline edit: click mục tiêu → editable. Auto-save. Reset đầu tuần (confirm). Streak counter bên phải — decorative, không tương tác. |
| Pomodoro start button | Dashboard | Click → chuyển sang Focus surface + bắt đầu timer. Desktop in right column, mobile as FAB. |
| Morning timer | Morning | Nút "Bắt đầu buổi sáng" → timer đếm ngược. Ô dán Spotify embed ở dưới. Timer xong → modal capture tasks. |
| Focus timer | Focus | Timer lớn center. 25:00 focus → 5:00 nghỉ. Start/Pause/Stop. Đếm số pomodoro. |
| Reward trigger | Dashboard (task) | Tick done → nút "Nhận thưởng" sáng. Click → mở link reward ngoài. |
| Stats display | Stats | Bar chart 7 ngày (đơn giản). Calendar streak. Focus time summary. |

## State Patterns

| State | Surface | Treatment |
|-------|---------|-----------|
| Cold open | Dashboard | Load tasks từ localStorage. Hiện sẵn Weekly Compass + streak + tasks. |
| No tasks today | Dashboard | "Hôm nay chưa có task nào." + nút "Tạo task mới". Morning Routine sẽ capture tasks. |
| Task empty | Dashboard | Empty state text. |
| No weekly goal | Dashboard | "Chưa có mục tiêu tuần này" + inline edit prompt. |
| Timer running | Focus / Morning | Large countdown. Pause available. Spotify embed playing in background. |
| Timer done (focus) | Focus | "Đứng dậy, vươn vai, uống nước!" notification trên màn hình. Chuyển auto sang 5-min break. |
| Timer done (morning) | Morning | Modal/highlight: "Hôm nay bạn định làm gì?" + text input. |
| Reward ready | Dashboard | Nút "Nhận thưởng" chuyển disabled → glowing enabled. |
| No rewards pending | Dashboard | Nút "Nhận thưởng" ẩn hoặc disabled. |
| End of day | Dashboard | Summary: tasks done, pomodoros, focus time. Streak updated. |

## Interaction Primitives

- **Tap/click to act**. Không long-press, không drag-drop (v1).
- **Task checkbox toggle**: click `radio_button_unchecked` → `check_circle` + dim. Click lại → undo.
- **Inline edit**: mục tiêu tuần click text → edit mode → blur to save.
- **Tab navigation**: click tab → chuyển surface. Active tab highlighted.
- **Timer start/stop**: button click. Không có keyboard shortcut (v1).
- **Banned**: carousels, modal stacks > 1 level, animations cản trở task flow, notification permission request.

## Accessibility Floor

Behavioral. Visual contrast lives in `DESIGN.md`.

- **Interactive targets**: tất cả nút và nav item đủ kích thước touch (≥44px).
- **Focus indicators**: Tailwind `focus:ring` mặc định. Green glow cho interactive elements.
- **Color contrast**: Nền tối + text `#e2e2e2` (tỉ lệ tương phản cao). Green `#4cf479` trên `#003913` (on-primary) đọc được.
- **Touch targets mobile**: Bottom nav tab items, task items, FAB — đủ lớn cho thumb reach.
- **Safe area**: Bottom nav có `pb-safe` cho iOS notch/home indicator.
- **No motion dependency**: Timer updates text mỗi giây — không phụ thuộc animation để hiển thị trạng thái.
- **Font scaling**: Tỉ lệ relative (rem-based khi có thể) — tôn trọng browser zoom.

## Key Flows

### Flow 1 — A new day (Hoàng, 6:30 AM)

1. Mở browser → tab Dashboard mặc định (Hoàng WEB là homepage).
2. Streak counter hiện: "Day 12".
3. Weekly Compass hiện: mục tiêu tuần (nếu chưa có → inline edit prompt).
4. Bấm tab **Morning** → "Bắt đầu buổi sáng".
5. Timer 15 phút đếm ngược. Dán link Spotify embed → nhạc nền.
6. **Climax**: Timer xong → "Hôm nay bạn định làm gì?" — gõ tasks → tasks xuất hiện trên Dashboard.
7. Sang Dashboard → tasks hôm nay đã có (0 pending, X tasks mới).

### Flow 2 — Focus session (Hoàng, 14:30, sau giấc trưa)

1. Mở Hoàng WEB → Dashboard hiện tasks còn lại.
2. Chọn task → bấm nút "Bắt đầu Pomodoro" (hoặc FAB mobile).
3. Chuyển sang Focus surface → timer 25:00 chạy.
4. **Climax**: Timer kêu → "Đứng dậy, vươn vai, uống nước!" → chuyển 5:00 break.
5. Lặp lại cho đến khi task done.
6. Về Dashboard → tick task → "Nhận thưởng" sáng.

### Flow 3 — Reward moment (Hoàng, sau khi hoàn thành task khó)

1. Dashboard: task vừa tick hoàn thành.
2. Nút "Nhận thưởng" glowing green.
3. Click → mở game / YouTube / nhạc tự chọn (link ngoài).
4. **Climax**: Không có "chọn reward" trong web — chỉ cấp quyền. User tự mở.

### Flow 4 — End of day reflection (Hoàng, tối)

1. Dashboard hoặc Stats: "Hôm nay: X tasks done, Y pomodoros, Z phút focus".
2. Streak: số ngày liên tục.
3. Nếu tuần đã qua → Stats hiển thị biểu đồ 7 ngày.
4. **Climax**: Nhìn streak + biểu đồ → motivation cho ngày mai.

## Responsive & Platform

| Viewport | Navigation | Layout key changes |
|----------|-----------|-------------------|
| `<1024px` (mobile/tablet) | Bottom bar 4 tabs + top app bar | Single column. FAB cho Pomodoro. Sidebar ẩn. |
| `>=1024px` (desktop) | Sidebar (w-64) | Grid 8/4 columns. Ambient glow hiện. Bottom bar ẩn. |

- **Mobile**: `margin-mobile: 16px`, bottom nav `pb-safe`, FAB `bottom-24`.
- **Desktop**: `margin-desktop: 48px`, `max-w-6xl`, sidebar `sticky`.
- **No tablet-specific layout**: Bottom nav + content co giãn tự nhiên giữa mobile và desktop.
