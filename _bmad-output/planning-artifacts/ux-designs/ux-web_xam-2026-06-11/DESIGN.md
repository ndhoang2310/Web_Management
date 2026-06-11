---
name: Hoàng WEB
description: 'Web cá nhân — quản lý cuộc sống & tập trung. Dark theme Spotify-inspired, glassmorphism surfaces, Tailwind CSS.'
colors:
  background: '#0c0f0f'
  surface-dim: '#121414'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  surface-bright: '#37393a'
  surface: '#121414'
  primary: '#4cf479'
  primary-container: '#1ed760'
  primary-fixed: '#69ff89'
  primary-fixed-dim: '#34e36a'
  on-primary: '#003913'
  on-primary-container: '#005721'
  on-background: '#e2e2e2'
  on-surface: '#e2e2e2'
  on-surface-variant: '#bbcbb8'
  outline: '#859583'
  outline-variant: '#3c4a3c'
  error: '#ffb4ab'
  error-container: '#93000a'
  on-error: '#690005'
  on-error-container: '#ffdad6'
  semantic-negative: '#f3727f'
  semantic-warning: '#ffa42b'
  semantic-announcement: '#539df5'
typography:
  display:
    fontFamily: Inter
    fontSize: 24px
    lineHeight: 32px
    letterSpacing: -0.02em
    fontWeight: '700'
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    lineHeight: 28px
    letterSpacing: -0.01em
    fontWeight: '700'
  title-sm:
    fontFamily: Inter
    fontSize: 16px
    lineHeight: 24px
    fontWeight: '600'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    lineHeight: 20px
    fontWeight: '400'
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    lineHeight: 16px
    fontWeight: '400'
  label-xs:
    fontFamily: Inter
    fontSize: 10px
    lineHeight: 12px
    letterSpacing: 0.05em
    fontWeight: '700'
rounded:
  DEFAULT: 16px
  sm: 8px
  md: 12px
  lg: 32px
  xl: 48px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  base: 8px
  margin-mobile: 16px
  margin-desktop: 48px
components:
  glass-card:
    background: 'rgba(30, 32, 32, 0.45)'
    backdrop-filter: blur(12px)
    border: '1px solid rgba(133, 149, 131, 0.15)'
    box-shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
    radius: '{rounded.DEFAULT}'
  glass-card-high:
    background: 'rgba(40, 42, 43, 0.6)'
    backdrop-filter: blur(16px)
    border: '1px solid rgba(255, 255, 255, 0.08)'
    radius: '{rounded.DEFAULT}'
  task-item-doing:
    background: '{surface-container-high}'
    border-left: '3px solid {colors.primary}'
    radius: '{rounded.DEFAULT}'
  task-item-pending:
    background: 'rgba(30, 32, 32, 0.45)'
    radius: '{rounded.DEFAULT}'
  task-item-done:
    background: 'rgba(255, 255, 255, 0.05)'
    border: '1px solid rgba(255, 255, 255, 0.05)'
    radius: '{rounded.DEFAULT}'
    opacity: '0.4'
  pill-button:
    radius: '{rounded.full}'
    padding: '{spacing.md} {spacing.xl}'
    font: '{typography.title-sm}'
  circular-timer:
    radius: '50%'
    border: '4px solid {colors.primary}20'
  ambient-glow:
    width: 500px
    height: 500px
    background: 'radial-gradient(circle, rgba(76, 244, 121, 0.08) 0%, transparent 70%)'
    filter: blur(40px)
status: final
created: 2026-06-11
updated: 2026-06-11
---

## Brand & Style

Hoàng WEB là web cá nhân — một "bộ điều khiển cuộc sống" tối giản, thay thế doomscrolling bằng thói quen có chủ đích. Lấy cảm hứng từ Spotify: nền tối gần như đen tuyền (`#0c0f0f`) nơi UI lùi vào bóng tối, nội dung (tasks, timer, stats) là chính. Điểm nhấn xanh lá (`#4cf479`) chỉ dùng functional — không trang trí. Hiệu ứng glassmorphism (backdrop blur, border trong suốt, shadow nặng) tạo cảm giác "thiết bị âm thanh cao cấp" hơn là "app năng suất".

## Colors

- **Background (`#0c0f0f`)** — Tối hơn Spotify's #121212. Depth qua surface stack: `surface-dim` → `surface-container-low` → `container` → `container-high` → `container-highest`. Class: `bg-background/60 backdrop-blur-xl`.
- **Primary Green (`#4cf479` đến `#1ed760`)** — Dùng cho: nút CTA, active tab, icon timer, streak counter, viền task "đang làm". Không dùng cho nền, khung trang trí, hay badge trạng thái.
- **Primary glow effect** — Green glow trên streak (`drop-shadow-[0_0_8px_rgba(76,244,121,0.4)]`), timer (`shadow-[0_12px_40px_rgba(76,244,121,0.3)]`), ambient blur (`radial-gradient rgba(76,244,121,0.08)`).
- **Semantic colors** — Negative red (`#f3727f`), warning orange (`#ffa42b`), announcement blue (`#539df5`). Dùng cho text/icon cảnh báo.
- **Text** — `on-background: #e2e2e2` (primary), `on-surface-variant: #bbcbb8` (muted).
- **Error** — Material-inspired: `error: #ffb4ab`, `error-container: #93000a`.

## Typography

Hệ thống type compact, functional. Tất cả text sử dụng **Inter** (system font stack fallback — không load web font phụ):

| Role | Size | Weight | Line H | Letter-Spacing |
|------|------|--------|--------|----------------|
| Display (hero) | 24px | 700 | 32px | -0.02em |
| Headline | 20px | 700 | 28px | -0.01em |
| Title | 16px | 600 | 24px | normal |
| Body | 14px | 400 | 20px | normal |
| Caption | 12px | 400 | 16px | normal |
| Label (uppercase) | 10px | 700 | 12px | +0.05em |

- **Label-xs uppercase** dùng cho nhãn system (STREAK, TASKS DONE, POMODOROS) — tracking wide, tạo cảm giác "label" thay vì "content".
- Nút dùng `title-sm` (16px/600) — không uppercase (khác Spotify), giữ tone cá nhân thay vì corporate.

## Layout & Spacing

- **Spacing scale**: 4-based (4, 8, 16, 24, 32px) với named tokens `gutter: 16px`, `margin-mobile: 16px`, `margin-desktop: 48px`.
- **Layout**: single page app, sidebar (desktop, w-64) + main content flex-grow. Mobile: không sidebar, bottom nav bar thay thế.
- **Max content**: `max-w-6xl` với responsive padding.
- **Grid**: `grid-cols-1` mobile → `lg:grid-cols-12` desktop (8+4 split: primary content + sidebar widgets).

### Responsive Breakpoints (Tailwind defaults + lg: 1024px)

| Viewport | Sidebar | Nav | Layout |
|----------|---------|-----|--------|
| `<1024px` | hidden | Bottom bar (4 tabs) | Single column |
| `>=1024px` | visible (w-64) | Sidebar links | 8/4 grid |

## Elevation & Depth

- **Base (Level 0)**: `background: #0c0f0f`.
- **Surface (Level 1)**: `surface-container: #1e2020` — cards, sections, sidebar.
- **Glass card**: `rgba(30,32,32,0.45) + backdrop-blur(12px) + border rgba(133,149,131,0.15) + shadow 0 8px 32px rgba(0,0,0,0.3)`.
- **Elevated glass**: `rgba(40,42,43,0.6) + backdrop-blur(16px) + border rgba(255,255,255,0.08)`.
- **Pomodoro timer ring**: `border-4 border-primary/20` với animated spin border.
- **Ambient glow**: Fixed `500px` blur circles (green, white, off) tạo depth atmospheric — pointer-events none.
- **Shadow philosophy**: Nặng (0.3-0.5 opacity) vì trên nền tối, shadow nhẹ là vô hình. Nút CTA có `shadow-[0_12px_40px_rgba(76,244,121,0.3)]` — hiệu ứng "nổi" dramatic.

## Shapes

- **Cards**: `rounded-lg` (16px) — mềm mại hơn Spotify (6-8px) nhờ glass effect.
- **Buttons**: `rounded-full` (9999px) — pill shape, Spotify-style.
- **Circular**: `rounded-full` + `w-10 h-10` (avatar), `w-32 h-32` (timer ring, 50% custom).
- **Task list**: Không pill — card vuông với `rounded-lg` (16px), task "đang làm" có `border-left: 3px solid primary`.

## Components

### Glass Card
```css
background: rgba(30, 32, 32, 0.45);
backdrop-filter: blur(12px);
border: 1px solid rgba(133, 149, 131, 0.15);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
border-radius: 16px;
```
Container cho section (Weekly Compass, Pomodoro Card, Stats Bento).

### Glass Card High
```css
background: rgba(40, 42, 43, 0.6);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
```
Dùng cho nav item active, task "đang làm" card.

### Task Item (3 states)
- **Doing**: `glass-card-high` + `border-left: 3px solid primary` + `play_circle` icon green.
- **Pending**: `glass-card` + `radio_button_unchecked` icon muted.
- **Done**: `bg-white/5 border-white/5` + `opacity-40` + `check_circle` icon green dimmed + title strikethrough.

### Pomodoro Timer Button (CTA)
- Pill shape, `bg-primary text-on-primary`, `shadow-[0_12px_40px_rgba(76,244,121,0.3)]`.
- Hover: `brightness-110`. Active: `scale-95`.
- Mobile: FAB (`fixed bottom-24 left-1/2`). Desktop: inside right column.

### Nav (Desktop Sidebar)
- `w-64 h-screen sticky top-0`, `bg-background/60 backdrop-blur-xl`.
- Active item: `glass-card-high + text-primary font-bold` + filled icon.
- Inactive: `text-on-surface-variant/80 hover:text-on-surface`.

### Nav (Mobile Bottom Bar)
- `fixed bottom-0 w-full`, `bg-background/70 backdrop-blur-2xl`.
- 4 tabs: Dashboard, Morning, Focus, Stats.
- Active: `text-primary font-bold` + icon drop-shadow glow.

### Ambient Glow
```css
position: fixed;
width: 500px;
height: 500px;
border-radius: 50%;
background: radial-gradient(circle, rgba(76, 244, 121, 0.08) 0%, transparent 70%);
filter: blur(40px);
z-index: -1;
pointer-events: none;
```
3 instances: top-left (green), top-right (white), bottom (green). Desktop only.

## Do's and Don'ts

### Do
- Dùng nền `#0c0f0f` làm nền tối nhất — depth qua surface shade variation.
- Glass effect với `backdrop-blur` + border trong suốt cho card.
- Green (`#4cf479`) chỉ cho active/CTA — functional, không decorative.
- Pill shape (`rounded-full`) cho tất cả nút.
- Shadow nặng (0.3-0.5 opacity) trên nền tối.
- Ambient glow tạo depth atmospheric.
- Inter font — không load thêm web font.

### Don't
- Không dùng green decorative (nền, khung, badge không cần thiết).
- Không dùng surface sáng — dark immersion là core.
- Không skip pill geometry trên nút.
- Không dùng shadow nhẹ — vô hình trên nền tối.
- Không thêm brand color khác ngoài green + grays.
- Không dùng border solid thô — dùng glass/shadow-based borders.
- Bottom bar mobile luôn có `pb-safe` cho safe area.
