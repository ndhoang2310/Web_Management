---
title: Hoàng WEB
status: final
created: 2026-06-11
updated: 2026-06-11
---

# PRD: Hoàng WEB
*Dự án cá nhân — quản lý cuộc sống & tập trung.*

## 0. Document Purpose
PRD này dành cho chính tác giả (người build) làm tài liệu định hướng phát triển. Sản phẩm là web cá nhân, không public. Cấu trúc: Glossary định nghĩa thuật ngữ → Vision → User Journey → Features kèm FRs → Non-Goals → MVP Scope → Success Metrics.

## 1. Vision
Hoàng WEB là dự án cá nhân giúp tôi thay đổi thói quen và lấy lại khả năng tập trung vào những việc thực sự quan trọng. Nó thay thế doomscrolling bằng những nghi thức có chủ đích — từ buổi sáng đơn giản đến phần thưởng xứng đáng sau khi hoàn thành việc.

## 2. Target User

### 2.1 Jobs To Be Done
- **Sáng:** Giúp tôi có buổi sáng đơn giản — vệ sinh cá nhân → note tasks → ăn sáng, thay vì với điện thoại ngay khi mở mắt
- **Học:** Trang chủ mặc định mỗi khi ngồi vào bàn (thay vì YouTube/Facebook) — không cần suy nghĩ "mở gì"
- **Thưởng:** Xong task → mở quyền được thưởng (game / nhạc), tạo động lực hoàn thành việc

### 2.2 Non-Users (v1)
- Không dành cho người khác — chỉ 1 user duy nhất là tác giả

### 2.3 Key User Journeys

#### UJ-1: Một ngày cùng Hoàng WEB
- **⏰ 6h30 — Thức dậy**
  - Mở Hoàng WEB (trang chủ mặc định của browser)
  - Bấm "Bắt đầu buổi sáng" → timer vệ sinh cá nhân + Spotify playlist nền
  - Hoàn thành → web hỏi: *"Hôm nay bạn định làm gì?"*
  - Gõ tasks → 7h đi học
- **⏰ 11h30 — Trưa**
  - Về, ăn trưa, nghỉ ngơi
- **⏰ 14h30 — Dậy**
  - Mở Hoàng WEB → dashboard hiện tasks còn lại (học code, chuẩn bị bài)
  - Chọn 1 task → Bắt đầu Pomodoro 25 phút
  - Hết pomodoro → web nhắc đứng dậy vận động
  - Lặp lại cho đến khi hoàn thành task
- **🎮 Reward**
  - Tick hoàn thành task → nút "Nhận thưởng" sáng lên
  - Mở game / YouTube / nhạc tự chọn
- **🌙 Tổng kết**
  - Dashboard hiển thị: "Hôm nay: X tasks done, Y phút focus, Z pomodoros"

## 3. Glossary
- **Hoàng WEB** — Tên sản phẩm, web cá nhân quản lý thói quen và tập trung
- **Weekly Compass** — Mục tiêu duy nhất trong tuần, định hướng các tasks hằng ngày
- **Morning Routine** — Chuỗi buổi sáng: timer vệ sinh cá nhân + Spotify + capture tasks
- **Focus Timer** — Đồng hồ Pomodoro (25/5) có nhắc vận động giữa giờ
- **Reward-Box** — Cơ chế mở thưởng sau khi hoàn thành task
- **Dashboard** — Trang chủ hiển thị tasks hôm nay + tiến trình + thống kê
- **Task** — Một việc cụ thể cần làm trong ngày
- **Pomodoro** — Phiên tập trung 25 phút, sau đó nghỉ 5 phút
- **Streak** — Số ngày liên tục sử dụng Hoàng WEB

## 4. Features

### 4.1 🌅 Morning Routine
**Mô tả:** Buổi sáng, user mở Hoàng WEB, bấm "Bắt đầu buổi sáng" → timer vệ sinh cá nhân chạy. Trong lúc đó, user có thể dán link Spotify playlist để phát nhạc nền. Hết timer → web hỏi "Hôm nay bạn làm gì?" và lưu tasks. Realizes UJ-1.

**Functional Requirements:**

#### FR-1: Timer + Spotify
User có thể bấm nút "Bắt đầu buổi sáng" → timer đếm ngược (mặc định 15 phút, có thể chỉnh). Có ô dán link Spotify embed → phát nhạc trong lúc timer chạy.

**Consequences (testable):**
- Timer đếm ngược chính xác đến giây
- Nhạc Spotify phát được khi dán link embed hợp lệ
- Có thể dừng timer sớm

#### FR-2: Daily Task Capture
Hết timer → hiện ô nhập "Hôm nay tôi muốn làm:". Lưu tasks vào localStorage. Tasks tự động xuất hiện trên Dashboard.

**Consequences (testable):**
- Tasks nhập vào hiển thị ngay trên Dashboard sau khi lưu
- Không mất tasks khi refresh trang

### 4.2 🏠 Dashboard
**Mô tả:** Trang chủ mặc định mỗi khi mở browser. Hiển thị tasks hôm nay, tiến trình, timer. Cho phép bắt đầu Focus Timer hoặc chọn task để làm. Realizes UJ-1.

**Functional Requirements:**

#### FR-3: Default Homepage
Dashboard hiển thị:
- Tasks hôm nay (từ Morning Routine), phân loại: chưa làm / đang làm / hoàn thành
- Mục tiêu tuần (từ Weekly Compass)
- Nút "Bắt đầu Pomodoro" / "Bắt đầu task"
- Streak: số ngày liên tục

**Consequences (testable):**
- Dashboard load tasks từ localStorage
- Click vào task → chuyển sang Focus Timer mode
- Streak tăng 1 nếu có ít nhất 1 task hoàn thành trong ngày

### 4.3 📋 Weekly Compass
**Mô tả:** Đầu tuần (hoặc khi chưa có mục tiêu), Dashboard hiện ô nhập "Mục tiêu tuần này". Mỗi task hằng ngày có thể gắn nhãn "phục vụ mục tiêu tuần". Realizes UJ-1.

**Functional Requirements:**

#### FR-4: Weekly Goal
Dashboard hiện ô "Mục tiêu tuần này" vào đầu tuần. Lưu 1 mục tiêu duy nhất. Reset vào đầu tuần sau (tự động hoặc confirm).

**Consequences (testable):**
- Chỉ lưu được 1 mục tiêu / tuần
- Đầu tuần mới → tự động reset
- Mục tiêu hiển thị trên Dashboard

#### FR-5: Task-Goal Linking
Khi tạo task hằng ngày, có checkbox "Task này phục vụ mục tiêu tuần". Dashboard hiển thị: "X/Y tasks hôm nay phục vụ mục tiêu".

**Consequences (testable):**
- Checkbox hiển thị khi nhập task
- Dashboard đếm đúng số tasks được gắn nhãn

### 4.4 🍅 Focus Timer
**Mô tả:** Pomodoro 25 phút focus → 5 phút nghỉ. Trong lúc nghỉ, web nhắc đứng dậy vận động. Realizes UJ-1.

**Functional Requirements:**

#### FR-6: Pomodoro Mode
Timer 25 phút focus (tùy chỉnh được). Hết focus → chuyển sang 5 phút nghỉ. Lưu số pomodoro hoàn thành / ngày.

**Consequences (testable):**
- Timer đếm ngược chính xác
- Notification "Đứng dậy, vươn vai, uống nước!" khi hết focus
- Chuyển tự động giữa focus và nghỉ
- Đếm số pomodoro hoàn thành

### 4.5 🎮 Reward-Box
**Mô tả:** Khi tick hoàn thành task, nút "Nhận thưởng" sáng lên. User tự chọn thưởng (game / YouTube / nhạc). Web không chứa reward, chỉ cấp "quyền được thưởng". Realizes UJ-1.

**Functional Requirements:**

#### FR-7: Task Completion Reward
Tick hoàn thành task → nút "Nhận thưởng" kích hoạt. Click → web mở link/user tự mở reward bên ngoài. Không giới hạn số lượng reward, nhưng chỉ reward sau khi hoàn thành.

**Consequences (testable):**
- Nút "Nhận thưởng" chỉ sáng khi có task vừa được tick hoàn thành
- Không thể nhận thưởng nếu chưa có task nào done

### 4.6 📊 Progress Tracker
**Mô tả:** Dashboard tổng quan theo ngày / tuần / tháng: tasks done, focus time, pomodoros. Biểu đồ cột đơn giản. Realizes UJ-1.

**Functional Requirements:**

#### FR-8: Progress Dashboard
Dashboard hiển thị:
- Hôm nay: tasks done, phút focus, pomodoros
- Tuần này: biểu đồ cột 7 ngày
- Streak: số ngày liên tục

**Consequences (testable):**
- Số liệu cập nhật real-time
- Biểu đồ cột hiển thị đúng dữ liệu từng ngày
- Streak tính chính xác (không reset nếu dùng mỗi ngày)

## 5. Non-Goals (Explicit)
- **Không phải app chặn web** — Hoàng WEB không block YouTube/Facebook, chỉ redirect dopamine
- **Không có backend / đăng nhập** — toàn bộ dữ liệu trên localStorage
- **Không đồng bộ đa thiết bị** — chỉ hoạt động trên 1 browser
- **Không phải social network** — không chat, không follow, không share
- **Không tích hợp Spotify API chính thức** — chỉ paste link embed
- **Không có game tích hợp sẵn** — reward là link/mở app bên ngoài
- **Không push notification mobile** — web chỉ chạy khi tab mở

## 6. MVP Scope

### 6.1 In Scope (v1 — build được với vibe coding)
- Dashboard trang chủ + tasks hôm nay
- Weekly Compass (mục tiêu tuần + link task)
- Morning Routine (timer + task capture)
- Focus Timer (Pomodoro 25/5)
- Reward-Box (task done → reward)
- Progress Tracker (dashboard thống kê + streak)

### 6.2 Out of Scope for MVP
- Spotify API chính thức → defer v2 (dùng paste link cho MVP) `[NOTE FOR PM]`
- Theme / tùy chỉnh giao diện → defer v2
- Đồng bộ nhiều thiết bị → không có kế hoạch
- Mobile app native → không có kế hoạch (responsive web đủ)

## 7. Success Metrics
**Primary**
- **SM-1**: Streak — số ngày liên tục mở Hoàng WEB. Target: 7 ngày liên tục trong tuần đầu. Validates FR-3, FR-8.

**Secondary**
- **SM-2**: Tasks done / ngày — trung bình 3+ tasks / ngày sau tuần 2. Validates FR-2, FR-5.
- **SM-3**: Focus time — trung bình 2+ pomodoros / ngày sau tuần 2. Validates FR-6.

**Counter-metrics (do not optimize)**
- **SM-C1**: Thời gian ở reward — không tối ưu cho "nhiều reward", reward chỉ là động lực, không phải mục tiêu. Counterbalances SM-2.

## 8. Open Questions
1. Có nên thêm notification âm thanh cho Focus Timer? (web Audio API)
2. Dùng Chart.js cho biểu đồ hay tự vẽ canvas?
3. Morning Routine timer nên mặc định 15 phút hay để user set? — `[ASSUMPTION: 15 phút trong MVP]`

## 9. Assumptions Index
- **FR-1**: Timer vệ sinh cá nhân mặc định 15 phút, có thể chỉnh
- **FR-3**: Hoàng WEB là tab homepage mặc định của browser (user tự cài)
- **FR-7**: User tự mở reward bên ngoài, web chỉ show nút
- **Spotify**: Chỉ paste link embed, không gọi API chính thức
- **Storage**: localStorage đủ cho 1 user — không cần backend
