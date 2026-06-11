# Hoàng WEB — Google Stitch Handoff Prompt

## Project

**Hoàng WEB** — web cá nhân, 1 user (tác giả), thay thế doomscrolling bằng thói quen có chủ đích. 100% client-side, HTML/CSS/JS thuần, localStorage, deploy Cloudflare Pages.

## Target User

Tôi — Hoàng. Cần 1 web nhẹ, tối giản, mở là dùng, cảm giác như "bộ điều khiển cuộc sống" hơn là "app làm việc".

## Screens / Views Cần Design

### 1. Dashboard (Trang chủ)
- Tasks hôm nay (3 trạng thái: chưa làm / đang làm / hoàn thành)
- Mục tiêu tuần (Weekly Compass — 1 mục tiêu duy nhất, reset đầu tuần)
- Streak counter (số ngày liên tục)
- Nút "Bắt đầu Pomodoro" nổi bật
- Thanh tab ngang: Dashboard | Morning | Focus | Stats
- Stats mini: "Hôm nay: X tasks done, Y pomodoros, Z phút focus"

### 2. Morning Routine
- Nút "Bắt đầu buổi sáng" lớn → timer đếm ngược (mặc định 15 phút)
- Ô dán link Spotify embed trong lúc timer chạy
- Khi hết timer: modal/ô nhập "Hôm nay tôi muốn làm:" → lưu tasks
- Có thể dừng timer sớm

### 3. Focus Timer (Pomodoro)
- Timer lớn ở giữa: 25:00 focus mode (có thể chỉnh)
- Khi hết focus → chuyển 5:00 nghỉ + notification "Đứng dậy, vươn vai, uống nước!"
- Đếm số pomodoro hoàn thành trong ngày
- Nút Start/Pause/Stop

### 4. Reward-Box
- Khi tick hoàn thành task → nút "Nhận thưởng" sáng lên (disabled → enabled)
- Click → mở link reward bên ngoài (game / YouTube / nhạc)
- Không chứa reward trong web — chỉ cấp "quyền được thưởng"

### 5. Progress Tracker (Stats)
- Hôm nay: tasks done, phút focus, pomodoros
- Tuần này: biểu đồ cột 7 ngày
- Streak calendar đơn giản

## Design System: Spotify-Inspired

### Theme
- **Dark immersive**: Near-black nền (`#121212`), surface `#181818`–`#1f1f1f`
- **UI recedes**, content (tasks, timer, stats) = hero
- **Accent duy nhất**: Spotify Green `#1ed760` — functional (CTAs, active, play), không decorative
- **Semantic colors**: Negative Red `#f3727f`, Warning Orange `#ffa42b`, Blue `#539df5`

### Typography
- **Font**: system stack (không load web font — web cá nhân, tối ưu tốc độ)
  - Fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- **Scale**: compact (10px–24px range)
- **Button labels**: uppercase + letter-spacing 1.4px–2px (nếu làm nút)
- **Weight binary**: mostly 700 (bold) or 400 (regular), sparingly 600

### Geometry
- **Buttons**: pill shape (border-radius: 500px–9999px)
- **Circular controls**: border-radius: 50% (play buttons, icons)
- **Cards**: border-radius: 6px–8px
- **Inputs**: pill (border-radius: 500px)
- **Badges**: border-radius: 2px

### Elevation & Depth
- Base: `#121212`
- Surface (Level 1): `#181818` hoặc `#1f1f1f`
- Elevated (Level 2): `rgba(0,0,0,0.3) 0px 8px 8px`
- Dialog (Level 3): `rgba(0,0,0,0.5) 0px 8px 24px`
- Input inset: `rgb(18,18,18) 0px 1px 0px, rgb(124,124,124) 0px 0px 0px 1px inset`

### Spacing
- Base unit: 8px
- Scale: 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 15, 16, 20px

### Responsive
- Breakpoints: <425 / 425–576 / 576–768 / 768–896 / 896–1024 / 1024–1280 / >1280
- Single column → sidebar + main
- Tab bar ở mobile, sidebar ở desktop

## Constraints
- HTML/CSS/JS thuần — không framework, không build step
- localStorage — không backend
- 1 file HTML (`index.html`) + modules trong `scripts/`
- Deploy trên Cloudflare Pages (static)
- Tối ưu tốc độ, nhẹ, không dependency

## Tone
- Cá nhân, ấm áp, tối giản
- Không corporate, không gamification rẻ tiền
- Cảm giác như "nhật ký tập trung" hơn là "productivity tool"
