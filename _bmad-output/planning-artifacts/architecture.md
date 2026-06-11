---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: ["_bmad-output/planning-artifacts/prds/prd-web_xam-2026-06-11/prd.md"]
workflowType: 'architecture'
project_name: 'web_xam'
user_name: 'Hoàng'
date: '2026-06-11'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (8 FRs, 6 features):**
- Morning Routine (FR-1, FR-2): Timer + Spotify + daily task capture
- Dashboard (FR-3): Trang chủ, tasks hôm nay, weekly goal, streak
- Weekly Compass (FR-4, FR-5): Mục tiêu tuần, task-goal linking
- Focus Timer (FR-6): Pomodoro 25/5 + nhắc vận động
- Reward-Box (FR-7): Task done → reward
- Progress Tracker (FR-8): Dashboard thống kê theo ngày/tuần/tháng

**Non-Functional Requirements:**
- 100% client-side (localStorage), không backend
- Responsive mobile + desktop
- Hoạt động như tab homepage mặc định

**Scale & Complexity:**
- Primary domain: Frontend web (HTML/CSS/JS thuần)
- Complexity level: Thấp
- Số component: ~6 (tương ứng 6 features + shared utilities)

### Technical Constraints & Dependencies
- Chỉ client-side, không server
- localStorage cho toàn bộ dữ liệu
- Timer sử dụng setTimeout/setInterval
- Spotify: paste link embed, không API

### Cross-Cutting Concerns Identified
- State management: localStorage read/write pattern xuyên suốt
- Routing: single-page, chuyển view bằng JS thuần
- Timer accuracy: setTimeout không chính xác khi tab background

### Hosting & CI/CD Decision: Cloudflare Pages

**Lựa chọn:** Cloudflare Pages (so với GitHub Pages và Netlify)

**Lý do:**
- CDN toàn cầu, tốc độ nhanh nhất
- Free tier không giới hạn băng thông
- Preview Deployments cho mỗi PR/branch
- Rollback 1 click
- 500 builds/tháng free — dư cho web cá nhân

**CI/CD Pipeline:**
- Git push → Cloudflare webhook → auto build & deploy (30s)
- Zero config (JS thuần, không build step)
- Preview URL cho từng nhánh trước khi merge

### File Structure Decision: Hybrid (HTML + JS Modules)

**index.html** — HTML skeleton, import modules
**scripts/**
- `storage.js` — localStorage CRUD (module)
- `timer.js` — Pomodoro + Morning timer logic (module)
- `ui.js` — Render dashboard, weekly, reward UI (module)
- `app.js` — Entry point, routing giữa các views

Lý do: 1 entry point, logic tách riêng, dễ AI gen từng module, dễ mở rộng v2.

## Starter Template Evaluation

### Primary Technology Domain
Frontend web tĩnh — HTML/CSS/JS thuần (ES modules), không framework.

### Starter Options Considered
- **Framework starters (Next.js, Vite, etc.)** — Overkill. Web tĩnh 1 user, không cần SSR, routing, build.
- **Vanilla HTML + JS modules** — Phù hợp. 0 dependency, vibe code với AI, deploy thẳng lên Cloudflare.
- **Single HTML file** — Quá đơn giản, khó maintain khi thêm feature.

### Selected Starter: Custom — Vanilla HTML + ES Modules
Không dùng CLI tool starter. Cấu trúc file như đã chọn ở File Structure Decision.

**Architectural Decisions:**
- **Language:** HTML5 + CSS3 + JavaScript (ES modules)
- **Styling:** CSS thuần, responsive media queries
- **Build:** Không — Cloudflare serve trực tiếp file tĩnh
- **Testing:** Thủ công (manual) — cá nhân, không cần CI test
- **Code organization:** Module pattern (storage.js, timer.js, ui.js, app.js)

## Core Architectural Decisions

### Data Architecture
- **Storage:** localStorage, 1 key `hoangweb` chứa toàn bộ JSON state
- **Schema gồm:** tasks (mảng daily tasks), weeklyGoal, pomodoros (số lượng/ngày), streak (ngày cuối + count), morningRoutine (timer setting, playlist link)

### Frontend Architecture
- **Routing:** Tab navigation (thanh tab ngang, chuyển giữa các view)
- **State management:** Đọc/ghi trực tiếp vào localStorage object, render lại UI
- **Pattern:** Module pattern — storage.js quản lý data, ui.js render, app.js routing

### Infrastructure & Deployment
- **Hosting:** Cloudflare Pages (free tier)
- **Custom domain:** Không — dùng `hoangweb.pages.dev`
- **CI/CD:** Git push → auto build & deploy (30s)
