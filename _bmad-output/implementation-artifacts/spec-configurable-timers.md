---
title: 'Cấu hình thời gian timer — Morning & Pomodoro'
type: 'feature'
created: '2026-06-12'
baseline_commit: NO_VCS
status: 'done'
---

## Intent

**Problem:** Morning routine timer cố định 15 phút, Pomodoro timer cố định 25/5 — không cho phép người dùng tuỳ chỉnh thời gian theo nhu cầu.

**Approach:** Thêm UI để đổi thời gian đếm ngược buổi sáng; thay fixed 25/5 bằng input tổng thời gian muốn tập trung, tự động tính số Pomodoro rounds và chạy tuần tự.

## Boundaries & Constraints

**Always:** Giữ nguyên break 5 phút. Giữ nguyên cấu trúc hiện tại (100% client-side, localStorage, không framework). Tất cả timer dùng chung `createTimer` engine. Dữ liệu lưu trong key `hoangweb`.

**Ask First:** Thay đổi font-size/giao diện timer display.

**Never:** Không thêm dependency mới. Không thay đổi cách tính streak/weekly goal. Không phá vỡ reward box hay FAB.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Đổi thời gian morning | Chọn 30 phút trên select | Timer hiển thị 30:00, khi start chạy 30 phút | Giá trị mặc định 15 nếu không có |
| Focus total = 90 phút | 90 → 3 rounds (25+5 each) | Chạy round 1→2→3 xong, total time = 90 | Total ≥ 25 là hợp lệ |
| Focus total = 25 phút | 25 → 1 focus, không break | Chạy 25 focus xong, thông báo hoàn thành | Total = 25 hợp lệ |
| Focus total = 30 phút | 30 → 1 round (25+5) | 25 focus → 5 break → xong | Total = 30 hợp lệ |
| Focus total = 100 phút | 100 → 3 rounds + 10 focus cuối | 3×(25+5) + 10 focus → xong | Total ≥ 25 hợp lệ |
| Focus total < 25 phút | 10 | N/A | Chặn, hiển thị "Tối thiểu 25 phút" |

## Code Map

- `scripts/timer.js` — engine đếm ngược, thêm sequential runner cho Pomodoro multi-round
- `scripts/storage.js` — `addPomodoro(minutes)` nhận tham số động, thêm `focusConfig`
- `scripts/ui.js` — morning view: thêm select thời gian; focus view: thêm input tổng thời gian + hiển thị round progress
- `scripts/app.js` — morning wiring: cập nhật timer khi đổi thời gian; focus wiring: sequential Pomodoro runner

## Tasks & Acceptance

**Execution:**
- [x] `scripts/timer.js` — thêm `createSequentialTimer(totalMinutes, onRoundChange, onComplete)` dùng `createTimer` bên trong
- [x] `scripts/storage.js` — sửa `addPomodoro(minutes)`, thêm `getFocusConfig()`, `saveFocusConfig()`
- [x] `scripts/ui.js` — morning: select 5/10/15/20/30/45/60 phút; focus: input total + round X/Y indicator
- [x] `scripts/app.js` — morning: wire select → restart timer; focus: sequential rounds runner

**Acceptance Criteria:**
- Given morning view, when chọn thời gian trên select, then timer display cập nhật và khi Bắt đầu chạy đúng số phút đã chọn
- Given focus view, when nhập 90 phút và bắt đầu, then chạy 3 rounds (25 focus + 5 break), display "Round 1/3" → "Round 2/3" → "Round 3/3" → hoàn thành
- Given focus view, when input < 25 phút, then hiển thị lỗi và không cho start
- Given focus đang chạy sequential, when tạm dừng, then pause/resume đúng round hiện tại
- Given focus đang chạy, when stop, thì reset toàn bộ sequence
- Given morning đổi thời gian khi timer đang chạy, thì timer restart với thời gian mới

## Suggested Review Order

**Sequential Pomodoro engine**

- Core logic: tính rounds, chạy focus→break tuần tự, callback mỗi phase
  [`timer.js:66`](../../scripts/timer.js#L66)

- Wiring Pomodoro: render focus view, start/pause/stop sequential timer, xử lý session complete → lưu stats
  [`app.js:395`](../../scripts/app.js#L395)

**Cấu hình thời gian UI**

- Morning: select dropdown 5–60 phút, cập nhật display + restart timer nếu đang chạy
  [`ui.js:265`](../../scripts/ui.js#L265)

- Focus: input number total time, hiển thị error nếu < 25 phút, lưu vào localStorage
  [`ui.js:307`](../../scripts/ui.js#L307)

- Helper UI functions: round progress, error show/hide, focus stats
  [`ui.js:360`](../../scripts/ui.js#L360)

**Storage layer**

- `addPomodoro(minutes)` nhận tham số động, get/set focusConfig
  [`storage.js:113`](../../scripts/storage.js#L113)

**External quick-start wiring**

- FAB và Dashboard CTA start sequential timer từ bên ngoài view
  [`app.js:516`](../../scripts/app.js#L516)

## Design Notes

**Sequential Pomodoro algorithm:**
```
fullRounds = floor(totalMinutes / 30)
lastFocus = totalMinutes - (fullRounds * 30)
```
Mỗi round: 25 focus → 5 break (nếu chưa phải round cuối hoặc còn lastFocus)
Sau tất cả rounds: nếu lastFocus > 0, chạy thêm focus ngắn
Lưu pomodoro count = fullRounds + (lastFocus >= 25 ? 1 : 0)

**Focus total time input:** Default 60 phút (hiển thị 2 rounds). Lưu vào localStorage qua `focusConfig`.

## Verification

**Manual checks:**
- Mở Morning view, chọn thời gian, bấm Bắt đầu — timer chạy đúng
- Vào Focus, nhập 60, bấm Bắt đầu — chạy 2 rounds, đếm pomodoro = 2
- Vào Focus, nhập 20 (<25) — thấy thông báo lỗi
- Vào Focus, nhập 95 — chạy 3 rounds (90) + 5 focus cuối, đếm pomodoro = 3
- FAB và CTA Dashboard cũng start sequential với total mặc định
