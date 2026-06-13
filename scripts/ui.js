const TABS = [
  { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
  { id: 'morning', icon: 'wb_sunny', label: 'Buổi sáng' },
  { id: 'focus', icon: 'timer', label: 'Tập trung' },
  { id: 'stats', icon: 'bar_chart', label: 'Thống kê' },
]

export function renderLayout() {
  const app = document.getElementById('app')
  app.innerHTML = `
    ${renderMobileTopBar()}
    ${renderSidebar()}
    ${renderViews()}
    ${renderBottomBar()}
    <div id="fab-container"></div>
  `
}

function renderMobileTopBar() {
  return `
    <header id="mobile-top-bar" class="lg:hidden fixed top-0 w-full h-14 flex items-center justify-between px-4 z-30" style="background: rgba(9,9,9,0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.12); padding-top: env(safe-area-inset-top); height: calc(56px + env(safe-area-inset-top))">
      <span class="hw-title" style="color: #f7f9fa">Chào Hoàng</span>
      <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style="background: var(--accent)">
        <span class="text-xs font-bold" style="color: #f7f9fa">H</span>
      </div>
    </header>
  `
}

function renderSidebar() {
  return `
    <aside id="sidebar" class="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen z-40" style="width: 290px; background: rgba(9,9,9,0.62); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-right: 1px solid rgba(255,255,255,0.12); padding: 32px 16px 16px">
      <div class="px-4 py-4 mb-8">
        <div class="sidebar-brand" style="color: #f7f9fa">Hoàng</div>
        <div class="sidebar-sub mt-1">Focus cockpit</div>
      </div>
      <nav class="flex-1 space-y-1" id="sidebar-nav">
        ${TABS.map(t => renderSidebarItem(t, false)).join('')}
      </nav>
      <div style="border-top: 1px solid rgba(255,255,255,0.12); padding-top: 12px">
        <a class="nav-item flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors" data-tab="settings" style="color: #8a8a8a">
          <span class="material-symbols-outlined" style="font-size: 20px">settings</span>
          <span style="font-size: 14px">Cài đặt</span>
        </a>
      </div>
    </aside>
  `
}

function renderSidebarItem(tab, isActive) {
  const bg = isActive ? 'rgba(175,80,255,0.14)' : 'transparent'
  const border = isActive ? '1px solid rgba(175,80,255,0.38)' : '1px solid transparent'
  const color = isActive ? '#af50ff' : '#8a8a8a'
  const weight = isActive ? '600' : '400'
  const fill = isActive ? 1 : 0
  const glow = isActive ? 'box-shadow: 0 0 12px rgba(175,80,255,0.12)' : ''
  return `
    <a class="nav-item flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer" data-tab="${tab.id}" style="background: ${bg}; border: ${border}; color: ${color}; font-weight: ${weight}; ${glow}">
      <span class="material-symbols-outlined" style="font-size: 20px; font-variation-settings: 'FILL' ${fill}">${tab.icon}</span>
      <span style="font-size: 14px">${tab.label}</span>
    </a>
  `
}

function renderBottomBar() {
  return `
    <nav id="bottom-bar" class="lg:hidden fixed bottom-0 w-full z-50" style="background: rgba(9,9,9,0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-top: 1px solid rgba(255,255,255,0.12); padding-bottom: env(safe-area-inset-bottom)">
      <div class="flex justify-around items-center h-16" id="bottom-nav">
        ${TABS.map(t => renderBottomItem(t, false)).join('')}
      </div>
    </nav>
  `
}

function renderBottomItem(tab, isActive) {
  return `
    <a class="bottom-nav-item flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors min-w-[64px] min-h-[44px]" data-tab="${tab.id}">
      <span class="material-symbols-outlined" style="font-size: 24px; font-variation-settings: 'FILL' ${isActive ? 1 : 0}; color: ${isActive ? '#af50ff' : '#8a8a8a'}">${tab.icon}</span>
      <span style="font-size: 10px; font-weight: ${isActive ? 600 : 400}; color: ${isActive ? '#af50ff' : '#8a8a8a'}">${tab.label}</span>
    </a>
  `
}

function renderViews() {
  return `
    <main id="main-content" class="main-offset min-h-screen pt-14 lg:pt-0 pb-20 lg:pb-0">
      <section id="view-dashboard" class="view-section hidden p-4 lg:p-12 max-w-6xl mx-auto"></section>
      <section id="view-morning" class="view-section hidden p-4 lg:p-12 max-w-6xl mx-auto"></section>
      <section id="view-focus" class="view-section hidden p-4 lg:p-12 max-w-6xl mx-auto"></section>
      <section id="view-stats" class="view-section hidden p-4 lg:p-12 max-w-6xl mx-auto"></section>
    </main>
  `
}

export function renderStatsView(mode, weekData, todayData, monthData, monthWeekData) {
  const modes = [
    { id: 'today', label: 'Hôm nay' },
    { id: 'week', label: 'Tuần này' },
    { id: 'month', label: 'Tháng này' },
  ]

  const selectorHtml = modes.map(m => `
    <button class="stats-mode-btn px-6 py-2 rounded-full font-semibold cursor-pointer transition-all hover:brightness-110 active:scale-95"
      data-mode="${m.id}"
      style="${mode === m.id ? 'background: #af50ff; color: #f7f9fa; box-shadow: 0 0 16px rgba(175,80,255,0.25)' : 'background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10); color: #8a8a8a'}">
      ${m.label}
    </button>
  `).join('')

  let contentHtml = ''

  if (mode === 'today') {
    contentHtml = `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div class="glass-card p-6 text-center">
          <span class="material-symbols-outlined" style="font-size: 36px; color: #af50ff">check_circle</span>
          <div class="hw-display mt-3" style="color: #f7f9fa; font-size: 40px">${todayData.tasksDone}</div>
          <div class="hw-mono mt-1" style="color: #8a8a8a">Tasks Done</div>
        </div>
        <div class="glass-card p-6 text-center">
          <span class="material-symbols-outlined" style="font-size: 36px; color: #ffa42b">timer</span>
          <div class="hw-display mt-3" style="color: #f7f9fa; font-size: 40px">${todayData.pomodoros}</div>
          <div class="hw-mono mt-1" style="color: #8a8a8a">Pomodoros</div>
        </div>
        <div class="glass-card p-6 text-center">
          <span class="material-symbols-outlined" style="font-size: 36px; color: #57b8ff">schedule</span>
          <div class="hw-display mt-3" style="color: #f7f9fa; font-size: 40px">${todayData.focusTime}<span style="font-size: 18px; color: #8a8a8a">m</span></div>
          <div class="hw-mono mt-1" style="color: #8a8a8a">Focus Time</div>
        </div>
      </div>
    `
  } else {
    const chartData = mode === 'week' ? weekData : monthWeekData

    const summaryHtml = mode === 'month'
      ? renderMonthSummary(monthData)
      : renderWeekSummary(weekData)

    contentHtml = `
      <div class="glass-card p-6 mt-6">
        <div style="height: 300px">
          <canvas id="stats-chart"></canvas>
        </div>
      </div>
      ${summaryHtml}
    `
  }

  return `
    <div class="max-w-3xl mx-auto space-y-4 pt-4" id="stats-content">
      <div class="flex items-center justify-between">
        <h2 class="hw-headline" style="color: #f7f9fa">Thống kê</h2>
        <div class="flex gap-2">${selectorHtml}</div>
      </div>
      ${contentHtml}
    </div>
  `
}

function renderWeekSummary(weekData) {
  const total = weekData.reduce((acc, d) => ({
    tasksDone: acc.tasksDone + d.tasksDone,
    pomodoros: acc.pomodoros + d.pomodoros,
    focusTime: acc.focusTime + d.focusTime,
  }), { tasksDone: 0, pomodoros: 0, focusTime: 0 })

  return `
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <div class="glass-card p-4 text-center">
        <div class="hw-title" style="color: #af50ff">${total.tasksDone}</div>
        <div class="hw-mono mt-1" style="color: #8a8a8a">Tasks tuần</div>
      </div>
      <div class="glass-card p-4 text-center">
        <div class="hw-title" style="color: #ffa42b">${total.pomodoros}</div>
        <div class="hw-mono mt-1" style="color: #8a8a8a">Pomodoros tuần</div>
      </div>
      <div class="glass-card p-4 text-center">
        <div class="hw-title" style="color: #57b8ff">${total.focusTime}m</div>
        <div class="hw-mono mt-1" style="color: #8a8a8a">Focus tuần</div>
      </div>
    </div>
  `
}

function renderMonthSummary(monthData) {
  return `
    <div class="glass-card p-6 mt-4">
      <div class="hw-mono mb-4" style="color: #8a8a8a">TỔNG THÁNG</div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="text-center">
          <div class="hw-display" style="color: #af50ff; font-size: 32px">${monthData.tasksDone}</div>
          <div class="hw-mono mt-1" style="color: #8a8a8a">Tasks Done</div>
        </div>
        <div class="text-center">
          <div class="hw-display" style="color: #ffa42b; font-size: 32px">${monthData.pomodoros}</div>
          <div class="hw-mono mt-1" style="color: #8a8a8a">Pomodoros</div>
        </div>
        <div class="text-center">
          <div class="hw-display" style="color: #57b8ff; font-size: 32px">${monthData.focusTime}<span style="font-size: 16px">m</span></div>
          <div class="hw-mono mt-1" style="color: #8a8a8a">Focus Time</div>
        </div>
        <div class="text-center">
          <div class="hw-display" style="color: #f7f9fa; font-size: 32px">${monthData.totalDays}</div>
          <div class="hw-mono mt-1" style="color: #8a8a8a">Ngày hoạt động</div>
        </div>
      </div>
    </div>
  `
}

export function initStatsChart(chartData) {
  const canvas = document.getElementById('stats-chart')
  if (!canvas) return null
  if (typeof Chart === 'undefined') return null

  try {
    const ctx = canvas.getContext('2d')
    const labels = chartData.map(d => d.label)

    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Tasks Done',
            data: chartData.map(d => d.tasksDone),
            backgroundColor: 'rgba(175,80,255,0.25)',
            borderColor: '#af50ff',
            borderWidth: 1.5,
            borderRadius: 4,
          },
          {
            label: 'Pomodoros',
            data: chartData.map(d => d.pomodoros),
            backgroundColor: 'rgba(255,162,43,0.25)',
            borderColor: '#ffa42b',
            borderWidth: 1.5,
            borderRadius: 4,
          },
          {
            label: 'Focus Time (m)',
            data: chartData.map(d => d.focusTime),
            backgroundColor: 'rgba(83,157,245,0.2)',
            borderColor: '#539df5',
            borderWidth: 1.5,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#6b6b6b',
              font: { family: 'Inter', size: 12 },
              usePointStyle: true,
              padding: 16,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: '#828384', font: { family: 'Inter', size: 12 } },
            grid: { color: 'rgba(255,255,255,0.1)' },
          },
          y: {
            beginAtZero: true,
            ticks: { color: '#828384', font: { family: 'Inter', size: 12 }, stepSize: 1 },
            grid: { color: 'rgba(255,255,255,0.1)' },
          },
        },
      },
    })
  } catch {
    return null
  }
}

export function renderViewPlaceholder(viewId) {
  const titles = {
    dashboard: 'Dashboard',
    morning: 'Morning Routine',
    focus: 'Focus Timer',
    stats: 'Thống kê',
  }
  return `
    <div class="glass-card p-6 lg:p-8">
      <h2 class="hw-headline" style="color: #f7f9fa">${titles[viewId]}</h2>
      <p class="hw-body" style="margin-top: 8px; color: #8a8a8a">Nội dung đang được xây dựng...</p>
    </div>
  `
}

export function updateActiveNav(activeTab) {
  document.querySelectorAll('.nav-item').forEach(el => {
    const tab = el.dataset.tab
    const isActive = tab === activeTab
    const icon = el.querySelector('.material-symbols-outlined')
    const label = el.querySelector('span:last-child')

    if (isActive) {
      el.style.background = 'rgba(175,80,255,0.14)'
      el.style.border = '1px solid rgba(175,80,255,0.38)'
      el.style.color = '#af50ff'
      el.style.fontWeight = '600'
      el.style.boxShadow = '0 0 12px rgba(175,80,255,0.12)'
      if (icon) icon.style.fontVariationSettings = "'FILL' 1"
    } else {
      el.style.background = 'transparent'
      el.style.border = '1px solid transparent'
      el.style.color = '#8a8a8a'
      el.style.fontWeight = '400'
      el.style.boxShadow = 'none'
      if (icon) icon.style.fontVariationSettings = "'FILL' 0"
    }
  })

  document.querySelectorAll('.bottom-nav-item').forEach(el => {
    const tab = el.dataset.tab
    const isActive = tab === activeTab
    const icon = el.querySelector('.material-symbols-outlined')
    const label = el.querySelector('span:last-child')

    if (isActive) {
      if (icon) { icon.style.color = '#af50ff'; icon.style.fontVariationSettings = "'FILL' 1" }
      if (label) { label.style.color = '#af50ff'; label.style.fontWeight = '600' }
    } else {
      if (icon) { icon.style.color = '#8a8a8a'; icon.style.fontVariationSettings = "'FILL' 0" }
      if (label) { label.style.color = '#8a8a8a'; label.style.fontWeight = '400' }
    }
  })
}

export function renderDashboard(goal, streak, tasks, stats) {
  const servesText = goal ? `Phục vụ: "${goal.text}"` : ''
  return `
    <div class="hw-grid-desktop">
      <div class="hw-col-8 space-y-6">
        ${renderWeeklyCompass(goal, streak, stats)}
        ${renderTaskSection(tasks, servesText)}
      </div>
      <div class="hw-col-4 space-y-6">
        ${renderPomodoroCTA()}
        ${renderStatsPanel(stats)}
      </div>
    </div>
  `
}

function renderWeeklyCompass(goal, streak, stats) {
  const goalHtml = goal
    ? `<span class="hw-headline" style="color: #f7f9fa; font-size: 28px">${goal.text}</span>`
    : `<span class="hw-body" style="color: #8a8a8a; cursor: pointer" id="goal-empty">+ Đặt mục tiêu tuần này</span>`

  return `
    <div class="glass-card hero-card p-6 lg:p-8" style="position: relative; overflow: hidden">
      <div class="hw-mono mb-3" style="color: #af50ff">FOCUS PASS</div>
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          ${goal ? goalHtml : `<p class="hw-headline" style="color: #f7f9fa">Hôm nay bạn bay tới đâu?</p>`}
          ${!goal ? goalHtml : ''}
        </div>
        <div class="text-right flex-shrink-0">
          <div class="hw-mono" style="color: #8a8a8a">STREAK</div>
          <div class="hw-display" style="color: #af50ff; font-size: 48px; filter: drop-shadow(0 0 12px rgba(175,80,255,0.35))">Day ${streak.count}</div>
        </div>
      </div>
      <hr class="hw-divider" style="margin: 20px 0">
      <div class="flex gap-8">
        <div>
          <span class="hw-mono" style="color: #8a8a8a">Tasks Done</span>
          <div class="hw-title" style="color: #f7f9fa; font-size: 20px">${stats.tasksDone}</div>
        </div>
        <div>
          <span class="hw-mono" style="color: #8a8a8a">Pomodoros</span>
          <div class="hw-title" style="color: #f7f9fa; font-size: 20px">${stats.pomodoros}</div>
        </div>
        <div>
          <span class="hw-mono" style="color: #8a8a8a">Focus Time</span>
          <div class="hw-title" style="color: #f7f9fa; font-size: 20px">${stats.focusTime}<span style="font-size: 14px; color: #8a8a8a">m</span></div>
        </div>
      </div>
    </div>
  `
}

function renderTaskSection(tasks, servesText) {
  const pendingTasks = tasks.filter(t => t.state !== 'done')
  const count = pendingTasks.length
  const hasTasks = tasks.length > 0
  return `
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="hw-headline" style="color: #f7f9fa">Kế hoạch hôm nay <span class="hw-body" style="color: #8a8a8a">(${count} còn lại)</span></h2>
      </div>
      <div class="space-y-2" id="task-list">
        ${hasTasks ? tasks.map(t => renderTaskItem(t, servesText)).join('') : `
          <div class="glass-card p-6 text-center" style="border-style: dashed">
            <span class="material-symbols-outlined" style="font-size: 32px; color: #8a8a8a">flight_takeoff</span>
            <p class="hw-body mt-2" style="color: #8a8a8a">Chưa có nhiệm vụ nào — thêm một điểm đến cho hôm nay.</p>
          </div>
        `}
      </div>
      <button id="btn-add-task" class="w-full mt-3 py-3 px-4 flex items-center gap-3 cursor-pointer transition-all" style="background: rgba(255,255,255,0.055); border: 1px dashed rgba(255,255,255,0.12); border-radius: 12px">
        <span class="material-symbols-outlined" style="font-size: 20px; color: #8a8a8a">add</span>
        <span class="hw-body" style="color: #8a8a8a">Tạo task mới</span>
      </button>
    </div>
  `
}

function renderTaskItem(task, servesText) {
  const isDoing = task.state === 'doing'
  const isDone = task.state === 'done'
  const icon = isDone ? 'check_circle' : (isDoing ? 'play_circle' : 'radio_button_unchecked')
  const iconColor = isDone ? '#af50ff' : (isDoing ? '#af50ff' : '#8a8a8a')

  let style = ''
  if (isDoing) style = 'background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.16); border-left: 3px solid #af50ff; border-radius: 12px'
  else if (isDone) style = 'background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; opacity: 0.45'
  else style = 'background: rgba(255,255,255,0.055); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px'

  return `
    <div class="task-item flex items-center gap-3 p-4 cursor-pointer transition-all" style="${style}" data-task-id="${task.id}">
      <span class="material-symbols-outlined task-check" style="font-size: 24px; font-variation-settings: 'FILL' ${isDone ? 1 : 0}; color: ${iconColor}">${icon}</span>
      <span class="flex-1 hw-body task-text" style="color: ${isDone ? '#8a8a8a' : '#f7f9fa'}; ${isDone ? 'text-decoration: line-through' : ''}">${task.text}</span>
      ${task.servesGoal ? '<span class="material-symbols-outlined" style="font-size: 16px; color: #af50ff">flag</span>' : ''}
      <span class="material-symbols-outlined task-menu" style="font-size: 20px; color: #8a8a8a; cursor: pointer">more_vert</span>
    </div>
  `
}

function renderPomodoroCTA() {
  return `
    <div class="glass-card p-6 text-center">
      <div class="hw-mono mb-2" style="color: #8a8a8a">SESSION CONTROL</div>
      <span class="material-symbols-outlined" style="font-size: 48px; color: #af50ff">timer</span>
      <h3 class="hw-title mt-3" style="color: #f7f9fa">Pomodoro</h3>
      <p class="hw-caption mt-1" style="color: #8a8a8a">25 phút tập trung</p>
      <button id="btn-pomodoro-cta" class="btn-pill mt-5" style="padding: 12px 40px">
        Bắt đầu
      </button>
    </div>
  `
}

function renderStatsPanel(stats) {
  return `
    <div class="glass-card p-6">
      <h3 class="hw-mono mb-4" style="color: #8a8a8a">TODAY TELEMETRY</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between py-2" style="border-bottom: 1px solid rgba(255,255,255,0.1)">
          <span class="hw-body" style="color: #8a8a8a">Tasks hoàn thành</span>
          <span class="hw-title" style="color: #af50ff">${stats.tasksDone}</span>
        </div>
        <div class="flex items-center justify-between py-2" style="border-bottom: 1px solid rgba(255,255,255,0.1)">
          <span class="hw-body" style="color: #8a8a8a">Pomodoro</span>
          <span class="hw-title" style="color: #af50ff">${stats.pomodoros}</span>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="hw-body" style="color: #8a8a8a">Thời gian focus</span>
          <span class="hw-title" style="color: #af50ff">${stats.focusTime}m</span>
        </div>
      </div>
    </div>
  `
}

export function renderMorningView(settings) {
  const options = [5, 10, 15, 20, 30, 45, 60].map(m =>
    `<option value="${m}" ${settings.timerMinutes === m ? 'selected' : ''}>${m} phút</option>`
  ).join('')
  return `
    <div class="max-w-xl mx-auto space-y-6 pt-4" id="morning-content">
      <div class="glass-card p-8 text-center" id="morning-timer-card">
        <div class="w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-6 timer-circle" style="border: 4px solid rgba(175,80,255,0.14)">
          <span id="morning-time" class="hw-display" style="font-size: 36px; color: #af50ff">${String(settings.timerMinutes).padStart(2, '0')}:00</span>
        </div>
        <div class="mb-4">
          <label class="hw-mono" style="color: #8a8a8a; display: block; margin-bottom: 10px">THỜI GIAN</label>
          <select id="morning-time-select" class="px-4 py-2.5 rounded-lg outline-none transition-colors cursor-pointer" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #f7f9fa; font-size: 14px">
            ${options}
          </select>
        </div>
        <button id="btn-morning-start" class="btn-pill">Bắt đầu buổi sáng</button>
        <button id="btn-morning-stop" class="btn-ghost hidden" style="color: #f3727f; margin-left: 8px">Dừng</button>
      </div>
      <div class="glass-card p-6">
        <h3 class="hw-mono mb-3" style="color: #8a8a8a">SPOTIFY PLAYLIST</h3>
        <input id="spotify-input" type="text" class="ghost-input w-full" placeholder="Dán link Spotify embed..." value="${settings.playlistLink}">
        <div id="spotify-embed" class="mt-3 ${settings.playlistLink ? '' : 'hidden'}">
          <iframe id="spotify-iframe" src="${settings.playlistLink}" width="100%" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style="border-radius: 12px"></iframe>
        </div>
      </div>
      <div id="morning-task-capture" class="hidden"></div>
    </div>
  `
}

export function renderFocusView(config) {
  return `
    <div class="max-w-xl mx-auto space-y-6 pt-4" id="focus-content">
      <div class="glass-card p-8 text-center">
        <div class="w-48 h-48 mx-auto rounded-full flex items-center justify-center mb-6 timer-circle" style="border: 4px solid rgba(175,80,255,0.14)">
          <span id="focus-time" class="hw-display" style="font-size: 42px; color: #af50ff">25:00</span>
        </div>
        <div class="hw-mono mb-2" id="focus-phase-label" style="color: #8a8a8a">FOCUS</div>
        <div class="hw-body mb-4" id="focus-round-info" style="color: #af50ff; display: none"></div>
        <div class="mb-4">
          <label class="hw-mono" style="color: #8a8a8a; display: block; margin-bottom: 10px">TỔNG THỜI GIAN TẬP TRUNG</label>
          <div class="flex items-center justify-center gap-2">
            <input id="focus-total-input" type="number" min="25" max="480" value="${config.totalMinutes}" class="w-20 px-3 py-2.5 rounded-lg text-center outline-none transition-colors" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #f7f9fa; font-size: 14px">
            <span class="hw-mono" style="color: #8a8a8a">phút</span>
          </div>
          <div id="focus-error" class="hw-caption mt-2" style="color: #f3727f; display: none">Tối thiểu 25 phút</div>
        </div>
        <div class="flex justify-center gap-3">
          <button id="btn-focus-start" class="btn-pill">Bắt đầu</button>
          <button id="btn-focus-pause" class="btn-ghost hidden">Tạm dừng</button>
          <button id="btn-focus-stop" class="btn-ghost hidden" style="color: #f3727f">Dừng</button>
        </div>
      </div>
      <div class="glass-card p-6 text-center">
        <div class="hw-mono mb-3" style="color: #8a8a8a">HÔM NAY</div>
        <div class="flex justify-center gap-8 mt-3">
          <div><span class="hw-title" style="color: #af50ff" id="today-pomodoros">0</span><span class="hw-caption" style="color: #8a8a8a; margin-left: 4px">pomodoro</span></div>
          <div><span class="hw-title" style="color: #af50ff" id="today-focus-minutes">0</span><span class="hw-caption" style="color: #8a8a8a; margin-left: 4px">phút</span></div>
        </div>
      </div>
    </div>
  `
}

export function renderFAB() {
  return `
    <button id="fab-pomodoro" class="lg:hidden fixed z-40 btn-pill" style="bottom: calc(84px + env(safe-area-inset-bottom)); left: 50%; transform: translateX(-50%); padding: 12px 28px">
      Bắt đầu Pomodoro
    </button>
  `
}

export function renderRewardBox(tasks) {
  const hasDone = tasks.some(t => t.state === 'done')
  if (!hasDone) return ''
  return `
    <div class="glass-card p-6 text-center">
      <span class="material-symbols-outlined" style="font-size: 36px; color: #af50ff">card_giftcard</span>
      <h3 class="hw-title mt-2" style="color: #f7f9fa">Có task hoàn thành!</h3>
      <p class="hw-caption mt-1" style="color: #8a8a8a">Tự thưởng cho bản thân nào</p>
      <button id="btn-reward" class="btn-pill mt-3 animate-pulse">
        Nhận thưởng
      </button>
    </div>
  `
}

export function updateTimerDisplay(id, time) {
  const el = document.getElementById(id)
  if (el) el.textContent = time
}

export function updateFocusStats(pomodoros, minutes) {
  const p = document.getElementById('today-pomodoros')
  const m = document.getElementById('today-focus-minutes')
  if (p) p.textContent = pomodoros
  if (m) m.textContent = minutes
}

export function updateFocusRoundInfo(current, total, phase, minutes) {
  const info = document.getElementById('focus-round-info')
  const label = document.getElementById('focus-phase-label')
  if (info) {
    info.style.display = 'block'
    info.textContent = `Round ${current}/${total}`
  }
  if (label) {
    label.textContent = phase === 'focus' ? `FOCUS ${minutes}:00` : `BREAK ${minutes}:00`
  }
}

export function hideFocusRoundInfo() {
  const info = document.getElementById('focus-round-info')
  if (info) info.style.display = 'none'
}

export function showFocusError(msg) {
  const err = document.getElementById('focus-error')
  if (err) { err.textContent = msg; err.style.display = 'block' }
}

export function hideFocusError() {
  const err = document.getElementById('focus-error')
  if (err) err.style.display = 'none'
}
