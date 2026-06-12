---
title: 'Tab Thống kê — Hôm nay / Tuần / Tháng + Chart.js'
type: 'feature'
created: '2026-06-12'
status: 'done'
baseline_commit: 5e07dc822eccaea92a66572a93bceacf7cfe84fd
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Tab "Thống kê" (`stats`) chỉ hiển thị placeholder "Nội dung đang được xây dựng...". Dashboard đã có mini-stats hôm nay nhưng thiếu biểu đồ tuần và phân tích dữ liệu lịch sử.

**Approach:** Xây dựng trang thống kê đầy đủ với 3 chế độ xem (Hôm nay / Tuần này / Tháng này), biểu đồ cột Chart.js cho dữ liệu tuần, và các card tóm tắt số liệu. Dữ liệu lấy từ localStorage hiện có.

## Boundaries & Constraints

**Always:**
- Dùng Chart.js CDN (`https://cdn.jsdelivr.net/npm/chart.js`) — thêm 1 dòng `<script>` vào `index.html`
- Giữ nguyên data schema hiện tại (`pomodoros[date]`, `focusTime[date]`, `tasks[].createdAt`)
- Giao diện glass-card + dark theme nhất quán với toàn bộ app
- Mọi thứ client-side, localStorage, không backend

**Ask First:**
- Nếu muốn thêm loại biểu đồ khác ngoài cột (line, pie...)
- Nếu muốn xuất dữ liệu hoặc thêm bộ lọc ngày tùy chỉnh

**Never:**
- Không dùng framework chart nào ngoài Chart.js
- Không thay đổi data schema của các tính năng khác
- Không fetch dữ liệu từ bên ngoài

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Tab mới, chưa có dữ liệu | localStorage rỗng, không tasks/pomodoros | Hiển thị 0 cho tất cả số liệu, biểu đồ trống có label ngày | Không lỗi |
| Chế độ Tuần, có dữ liệu 3/7 ngày | 3 ngày có tasks/pomo, 4 ngày trống | Biểu đồ 7 cột, 4 cột giá trị 0, đúng thứ tự T2→CN | Không crash |
| Chế độ Tháng, ngày đầu tháng | Chưa có dữ liệu tháng này | Hiển thị tổng = 0, biểu đồ tuần trống | Không lỗi |
| Chuyển tab khi đang xem stats | navigate('dashboard') → quay lại stats | Biểu đồ được tạo lại (không bị trùng canvas) | Destroy Chart cũ trước khi tạo mới |
| Dữ liệu ngày bị corrupt | `pomodoros['invalid']` hoặc giá trị NaN | Bỏ qua ngày lỗi, hiển thị 0 | parse an toàn, fallback 0 |

</frozen-after-approval>

## Code Map

- `index.html` — Thêm Chart.js CDN `<script>`
- `scripts/storage.js` — `getWeekStats()` và `getMonthStats()` helpers mới
- `scripts/ui.js` — `renderStatsView(mode, data)` render HTML cho 3 chế độ, khởi tạo Chart.js
- `scripts/app.js` — `renderStatsViewFn()` dispatch + `wireStatsView()` event handler cho tab selector

## Tasks & Acceptance

**Execution:**
- [x] `index.html` — Thêm `<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0">` trước các module script
- [x] `scripts/storage.js` — Thêm `getWeekStats()` trả về mảng 7 phần tử `{day, label, tasksDone, pomodoros, focusTime}` từ thứ 2 tuần hiện tại, và `getMonthStats()` trả về `{tasksDone, pomodoros, focusTime, totalDays}`
- [x] `scripts/ui.js` — Thêm `renderStatsView(mode, weekData, todayData, monthData)` render: (a) thanh chọn Hôm nay/Tuần/Tháng, (b) card tổng quan, (c) canvas Chart.js cho chế độ Tuần + Tháng. Export `renderStatsView`
- [x] `scripts/app.js` — Thêm branch `stats` trong `renderView()`, tạo `renderStatsViewFn()` gọi storage lấy data rồi render, tạo `wireStatsView()` xử lý click chuyển chế độ và quản lý Chart instance (destroy cũ trước create mới). Import `renderStatsView` từ ui.js

**Acceptance Criteria:**
- Given tab Thống kê được click, when chưa có dữ liệu, then hiển thị tất cả số = 0 và không crash
- Given đã có pomodoro + task done hôm nay, when mở tab Thống kê, then số liệu hôm nay khớp với dashboard
- Given chọn chế độ "Tuần này", when có dữ liệu 3 ngày, then biểu đồ 7 cột hiển thị với 3 cột có giá trị > 0
- Given chọn chế độ "Tháng này", when đã có dữ liệu tháng, then card tổng hiển thị đúng tổng tasks done, pomodoros, focus time
- Given đang ở chế độ Tuần, when chuyển sang Tháng, then biểu đồ cũ bị destroy và biểu đồ mới được vẽ (không lỗi canvas đã dùng)

## Design Notes

**Chart.js color scheme (khớp dark theme):**
```js
{ borderColor: '#4cf479', backgroundColor: 'rgba(76,244,121,0.25)' }
```
Grid/ticks: `#859583` opacity 0.2. Font: Inter 12px.

**Tab selector pattern:** Ba nút pill nằm ngang, active = `bg-[#4cf479] text-[#003913]`, inactive = glass-card style, giống các nút trong app.

**Card layout:** Chế độ Hôm nay: 3 card lớn (Tasks Done / Pomodoros / Focus Time). Chế độ Tuần: biểu đồ cột + 3 card nhỏ bên dưới. Chế độ Tháng: biểu đồ cột + card tổng.

**Chart instance:** Lưu vào biến module-level `let chartInstance = null`. Trước khi tạo chart mới, `chartInstance?.destroy()`.

## Spec Change Log

- **2026-06-12** — Review loop 1 patches:
  - Added `Number()` coercion in `getWeekStats()` for pomodoros/focusTime values (safe parse, fallback 0)
  - Added null-guard on `task.createdAt` in `getWeekStats()`, `getMonthStats()`, `getMonthWeekStats()`
  - Added `typeof Chart === 'undefined'` guard + try/catch in `initStatsChart()` for CDN failure resilience
  - Improved month week labels from `T28-3` to `28/5 - 3/6` format for cross-month clarity
  - Added task-only days to `activeDays` Set in `getMonthStats()`
  - Responsive grids: `grid-cols-1 sm:grid-cols-3` / `grid-cols-2 sm:grid-cols-4` for mobile
  - Design note alignment: Task Done bg opacity 0.25, grid opacity 0.2, tick font size 12
  - Removed unused parameters from `wireStatsView()`
  - KEEP: chart destroy-before-recreate pattern, glass-card theming, 3-mode selector UI, dark theme color scheme for Chart.js

## Verification

**Manual checks (no CLI):**
- Mở `index.html` bằng Live Server hoặc mở trực tiếp file
- Click tab "Thống kê" → xác nhận hiển thị chế độ Hôm nay với số liệu
- Click "Tuần này" → biểu đồ 7 cột hiển thị
- Click "Tháng này" → card tổng + biểu đồ hiển thị
- Chuyển qua tab khác → quay lại → vẫn hiển thị đúng
- Thêm task + pomodoro → quay lại tab Thống kê → số liệu cập nhật

## Suggested Review Order

**Entry point — route dispatch + chart lifecycle**

- Tab `stats` dispatch in `renderView()` and chart destroy-before-create management
  [`app.js:34`](../../scripts/app.js#L34)
- Core render controller: fetches all data, destroys old chart, renders view, wires events
  [`app.js:542`](../../scripts/app.js#L542)

**Data layer — weekly & monthly aggregation**

- `getWeekStats()` — 7-day sliding window from Monday, with Number coercion + null-guards
  [`storage.js:151`](../../scripts/storage.js#L151)
- `getMonthStats()` — monthly totals + active-days counting from tasks + pomodoros + focusTime
  [`storage.js:175`](../../scripts/storage.js#L175)
- `getMonthWeekStats()` — groups month data into ISO weeks for bar chart
  [`storage.js:210`](../../scripts/storage.js#L210)

**View layer — rendering + Chart.js integration**

- `renderStatsView()` — 3-mode selector UI + today cards / week/month canvas layout
  [`ui.js:99`](../../scripts/ui.js#L99)
- `initStatsChart()` — Chart.js bar chart with CDN-fail guard, try/catch, dark theme config
  [`ui.js:215`](../../scripts/ui.js#L215)
- `renderWeekSummary()` + `renderMonthSummary()` — summary cards below charts
  [`ui.js:164`](../../scripts/ui.js#L164)

**Config**

- Chart.js CDN script tag
  [`index.html:36`](../../index.html#L36)

