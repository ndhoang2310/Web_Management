const TABS = [
  { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
  { id: 'morning', icon: 'wb_sunny', label: 'Buổi sáng' },
  { id: 'focus', icon: 'timer', label: 'Tập trung' },
  { id: 'stats', icon: 'bar_chart', label: 'Thống kê' },
]

export function renderLayout() {
  const app = document.getElementById('app')
  app.innerHTML = `
    ${renderTopNav()}
    ${renderViews()}
    ${renderBottomBar()}
    <div id="fab-container"></div>
  `
}

function renderTopNav() {
  return `
    <header id="top-nav" class="fixed top-0 w-full z-40" style="background: rgba(3,8,6,0.55); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); border-bottom: 1px solid rgba(226,244,213,0.12); padding-top: env(safe-area-inset-top)">
      <div class="lg:hidden flex items-center justify-between px-4" style="height: 56px">
        <span class="hw-title" style="color: #f4f1df">Chào Hoàng</span>
        <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style="background: #8fdc7d">
          <span class="text-xs font-bold" style="color: #f4f1df">H</span>
        </div>
      </div>
      <div class="hidden lg:flex items-center justify-between px-6" style="height: 56px">
        <div class="flex items-center gap-6">
          <div class="flex items-baseline gap-3">
            <span style="font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif; font-size: 26px; font-weight: 700; color: #f4f1df; letter-spacing: 0.08em; text-transform: uppercase">hoàng</span>
            <span style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 12px; font-weight: 400; color: rgba(244,241,223,0.42); letter-spacing: 0.04em">tĩnh lặng</span>
          </div>
          <nav class="flex items-center gap-1" id="top-nav-tabs">
            ${TABS.map(t => renderTopNavItem(t, false)).join('')}
          </nav>
        </div>
        <button id="btn-settings" class="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer" style="background: transparent; border: none; color: rgba(244,241,223,0.54)" aria-label="Cài đặt">
          <span class="material-symbols-outlined" style="font-size: 20px">settings</span>
        </button>
      </div>
    </header>
  `
}

function renderTopNavItem(tab, isActive) {
  const bg = isActive ? 'rgba(143,220,125,0.14)' : 'transparent'
  const border = isActive ? '1px solid rgba(143,220,125,0.38)' : '1px solid transparent'
  const color = isActive ? '#8fdc7d' : 'rgba(244,241,223,0.54)'
  const weight = isActive ? '600' : '400'
  const fill = isActive ? 1 : 0
  const glow = isActive ? 'box-shadow: 0 0 12px rgba(143,220,125,0.12)' : ''
  return `
    <a class="nav-item flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer" data-tab="${tab.id}" role="tab" aria-label="${tab.label}" style="background: ${bg}; border: ${border}; color: ${color}; font-weight: ${weight}; font-size: 14px; ${glow}">
      <span class="material-symbols-outlined" style="font-size: 18px; font-variation-settings: 'FILL' ${fill}">${tab.icon}</span>
      ${tab.label}
    </a>
  `
}

function renderBottomBar() {
  return `
    <nav id="bottom-bar" class="lg:hidden fixed bottom-0 w-full z-50" style="background: rgba(3,8,6,0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-top: 1px solid rgba(226,244,213,0.12); padding-bottom: env(safe-area-inset-bottom)">
      <div class="flex justify-around items-center h-16" id="bottom-nav">
        ${TABS.map(t => renderBottomItem(t, false)).join('')}
      </div>
    </nav>
  `
}

function renderBottomItem(tab, isActive) {
  return `
    <a class="bottom-nav-item flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors min-w-[64px] min-h-[44px]" data-tab="${tab.id}" role="tab" aria-label="${tab.label}">
      <span class="material-symbols-outlined" style="font-size: 24px; font-variation-settings: 'FILL' ${isActive ? 1 : 0}; color: ${isActive ? '#8fdc7d' : 'rgba(244,241,223,0.54)'}">${tab.icon}</span>
      <span style="font-size: 10px; font-weight: ${isActive ? 600 : 400}; color: ${isActive ? '#8fdc7d' : 'rgba(244,241,223,0.54)'}">${tab.label}</span>
    </a>
  `
}

function renderViews() {
  return `
    <main id="main-content" class="min-h-screen pt-14 pb-20 lg:pb-4">
      <section id="view-dashboard" class="view-section hidden p-4 lg:px-10 lg:pt-6 max-w-7xl mx-auto"></section>
      <section id="view-morning" class="view-section hidden p-4 lg:px-10 lg:pt-6 max-w-xl mx-auto"></section>
      <section id="view-focus" class="view-section hidden p-4 lg:px-10 lg:pt-6 max-w-xl mx-auto"></section>
      <section id="view-stats" class="view-section hidden p-4 lg:px-10 lg:pt-6 max-w-3xl mx-auto"></section>
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
      style="${mode === m.id ? 'background: #8fdc7d; color: #f4f1df; box-shadow: 0 0 16px rgba(143,220,125,0.25)' : 'background: rgba(226,244,213,0.06); border: 1px solid rgba(226,244,213,0.10); color: rgba(244,241,223,0.54)'}">
      ${m.label}
    </button>
  `).join('')

  let contentHtml = ''

  if (mode === 'today') {
    contentHtml = `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div class="glass-card p-6 text-center">
          <span class="material-symbols-outlined" style="font-size: 36px; color: #8fdc7d">check_circle</span>
          <div class="hw-display mt-3" style="color: #f4f1df; font-size: 40px">${todayData.tasksDone}</div>
          <div class="hw-mono mt-1" style="color: rgba(244,241,223,0.54)">Tasks Done</div>
        </div>
        <div class="glass-card p-6 text-center">
          <span class="material-symbols-outlined" style="font-size: 36px; color: #f2b85b">timer</span>
          <div class="hw-display mt-3" style="color: #f4f1df; font-size: 40px">${todayData.pomodoros}</div>
          <div class="hw-mono mt-1" style="color: rgba(244,241,223,0.54)">Pomodoros</div>
        </div>
        <div class="glass-card p-6 text-center">
          <span class="material-symbols-outlined" style="font-size: 36px; color: #b7ff8a">schedule</span>
          <div class="hw-display mt-3" style="color: #f4f1df; font-size: 40px">${todayData.focusTime}<span style="font-size: 18px; color: rgba(244,241,223,0.54)">m</span></div>
          <div class="hw-mono mt-1" style="color: rgba(244,241,223,0.54)">Focus Time</div>
        </div>
      </div>
    `
  } else {
    const chartData = mode === 'week' ? weekData : monthWeekData
    const hasData = chartData.some(d => d.tasksDone > 0 || d.pomodoros > 0 || d.focusTime > 0)

    const summaryHtml = mode === 'month'
      ? renderMonthSummary(monthData)
      : renderWeekSummary(weekData)

    const emptyChartHtml = `
      <div class="glass-card p-6 mt-6 text-center" style="min-height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center">
        <span class="material-symbols-outlined" style="font-size: 48px; color: rgba(244,241,223,0.24)">bar_chart</span>
        <p class="hw-body mt-3" style="color: rgba(244,241,223,0.42)">Chưa có dữ liệu ${mode === 'week' ? 'tuần này' : 'tháng này'}</p>
        <p class="hw-caption mt-1" style="color: rgba(244,241,223,0.32)">Dữ liệu sẽ xuất hiện sau khi bạn hoàn thành task hoặc Pomodoro</p>
      </div>
    `

    contentHtml = hasData ? `
      <div class="glass-card p-6 mt-6">
        <div style="height: 300px">
          <canvas id="stats-chart"></canvas>
        </div>
      </div>
      ${summaryHtml}
    ` : emptyChartHtml + summaryHtml
  }

  return `
    <div class="max-w-3xl mx-auto space-y-4 pt-4" id="stats-content">
      <div class="flex items-center justify-between">
        <h2 class="hw-headline" style="color: #f4f1df">Thống kê</h2>
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
        <div class="hw-title" style="color: #8fdc7d">${total.tasksDone}</div>
        <div class="hw-mono mt-1" style="color: rgba(244,241,223,0.54)">Tasks tuần</div>
      </div>
      <div class="glass-card p-4 text-center">
        <div class="hw-title" style="color: #f2b85b">${total.pomodoros}</div>
        <div class="hw-mono mt-1" style="color: rgba(244,241,223,0.54)">Pomodoros tuần</div>
      </div>
      <div class="glass-card p-4 text-center">
        <div class="hw-title" style="color: #b7ff8a">${total.focusTime}m</div>
        <div class="hw-mono mt-1" style="color: rgba(244,241,223,0.54)">Focus tuần</div>
      </div>
    </div>
  `
}

function renderMonthSummary(monthData) {
  return `
    <div class="glass-card p-6 mt-4">
      <div class="hw-mono mb-4" style="color: rgba(244,241,223,0.54)">TỔNG THÁNG</div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="text-center">
          <div class="hw-display" style="color: #8fdc7d; font-size: 32px">${monthData.tasksDone}</div>
          <div class="hw-mono mt-1" style="color: rgba(244,241,223,0.54)">Tasks Done</div>
        </div>
        <div class="text-center">
          <div class="hw-display" style="color: #f2b85b; font-size: 32px">${monthData.pomodoros}</div>
          <div class="hw-mono mt-1" style="color: rgba(244,241,223,0.54)">Pomodoros</div>
        </div>
        <div class="text-center">
          <div class="hw-display" style="color: #b7ff8a; font-size: 32px">${monthData.focusTime}<span style="font-size: 16px">m</span></div>
          <div class="hw-mono mt-1" style="color: rgba(244,241,223,0.54)">Focus Time</div>
        </div>
        <div class="text-center">
          <div class="hw-display" style="color: #f4f1df; font-size: 32px">${monthData.totalDays}</div>
          <div class="hw-mono mt-1" style="color: rgba(244,241,223,0.54)">Ngày hoạt động</div>
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
            backgroundColor: 'rgba(143,220,125,0.25)',
            borderColor: '#8fdc7d',
            borderWidth: 1.5,
            borderRadius: 4,
          },
          {
            label: 'Pomodoros',
            data: chartData.map(d => d.pomodoros),
            backgroundColor: 'rgba(255,162,43,0.25)',
            borderColor: '#f2b85b',
            borderWidth: 1.5,
            borderRadius: 4,
          },
          {
            label: 'Focus Time (m)',
            data: chartData.map(d => d.focusTime),
            backgroundColor: 'rgba(83,157,245,0.2)',
            borderColor: '#8fffe0',
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
              color: 'rgba(244,241,223,0.54)',
              font: { family: 'Inter', size: 12 },
              usePointStyle: true,
              padding: 16,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: 'rgba(244,241,223,0.46)', font: { family: 'Inter', size: 12 } },
            grid: { color: 'rgba(226,244,213,0.1)' },
          },
          y: {
            beginAtZero: true,
            ticks: { color: 'rgba(244,241,223,0.46)', font: { family: 'Inter', size: 12 }, stepSize: 1 },
            grid: { color: 'rgba(226,244,213,0.1)' },
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
      <h2 class="hw-headline" style="color: #f4f1df">${titles[viewId]}</h2>
      <p class="hw-body" style="margin-top: 8px; color: rgba(244,241,223,0.54)">Nội dung đang được xây dựng...</p>
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
      el.style.background = 'rgba(143,220,125,0.14)'
      el.style.border = '1px solid rgba(143,220,125,0.38)'
      el.style.color = '#8fdc7d'
      el.style.fontWeight = '600'
      el.style.boxShadow = '0 0 12px rgba(143,220,125,0.12)'
      if (icon) icon.style.fontVariationSettings = "'FILL' 1"
    } else {
      el.style.background = 'transparent'
      el.style.border = '1px solid transparent'
      el.style.color = 'rgba(244,241,223,0.54)'
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
      if (icon) { icon.style.color = '#8fdc7d'; icon.style.fontVariationSettings = "'FILL' 1" }
      if (label) { label.style.color = '#8fdc7d'; label.style.fontWeight = '600' }
    } else {
      if (icon) { icon.style.color = 'rgba(244,241,223,0.54)'; icon.style.fontVariationSettings = "'FILL' 0" }
      if (label) { label.style.color = 'rgba(244,241,223,0.54)'; label.style.fontWeight = '400' }
    }
  })
}

export function renderDashboard(goal, streak, tasks, stats) {
  const servesText = goal ? `Phục vụ: "${goal.text}"` : ''
  return `
    <div class="dashboard-layout">
      <div class="hero-row">
        ${renderWeeklyCompass(goal, streak, stats)}
      </div>
      <div class="content-row">
        <div class="tasks-column">
          ${renderTaskSection(tasks, servesText)}
        </div>
        <div class="side-column">
          ${renderPomodoroCTA()}
          ${renderStatsPanel(stats)}
        </div>
      </div>
    </div>
  `
}

function renderWeeklyCompass(goal, streak, stats) {
  const goalHtml = goal
    ? `<span class="hw-headline" style="color: #f4f1df; font-size: 26px">${goal.text}</span>`
    : `<span class="hw-body" style="color: rgba(244,241,223,0.54); cursor: pointer" id="goal-empty">+ Đặt một mục tiêu nhỏ cho tuần này</span>`

  return `
    <div class="glass-card hero-card p-6 lg:p-7" style="position: relative; overflow: hidden">
      <div class="hw-mono mb-3" style="color: #8fdc7d">FOREST PASS</div>
      <div class="flex items-start justify-between gap-5">
        <div class="flex-1">
          ${goal ? goalHtml : `<p class="hw-accent-italic" style="color: #f4f1df; font-size: 28px; font-weight: 400; line-height: 1.3">Tuần này bạn muốn gieo điều gì?</p>`}
          ${!goal ? goalHtml : ''}
        </div>
        <div class="text-right flex-shrink-0">
          <div class="hw-mono" style="color: rgba(244,241,223,0.54)">STREAK</div>
          <div class="hw-display" style="color: #8fdc7d; font-size: 48px; line-height: 1; filter: drop-shadow(0 0 14px rgba(143,220,125,0.35))">Day ${streak.count}</div>
          <div class="hw-mono" style="color: rgba(244,241,223,0.34); font-size: 9px; margin-top: 4px">ngày liên tiếp</div>
        </div>
      </div>
      <hr class="hw-divider" style="margin: 20px 0">
      <div class="flex gap-8">
        <div>
          <span class="hw-mono" style="color: rgba(244,241,223,0.54)">Tasks Done</span>
          <div class="hw-title" style="color: #f4f1df; font-size: 20px">${stats.tasksDone}</div>
        </div>
        <div>
          <span class="hw-mono" style="color: rgba(244,241,223,0.54)">Pomodoros</span>
          <div class="hw-title" style="color: #f4f1df; font-size: 20px">${stats.pomodoros}</div>
        </div>
        <div>
          <span class="hw-mono" style="color: rgba(244,241,223,0.54)">Focus Time</span>
          <div class="hw-title" style="color: #f4f1df; font-size: 20px">${stats.focusTime}<span style="font-size: 14px; color: rgba(244,241,223,0.54)">m</span></div>
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
    <div class="task-panel">
      <div class="flex items-center justify-between mb-4">
        <h2 class="hw-headline" style="color: #f4f1df">Kế hoạch hôm nay <span class="hw-body" style="color: rgba(244,241,223,0.54)">(${count} còn lại)</span></h2>
      </div>
      <div class="space-y-2" id="task-list">
        ${hasTasks ? tasks.map(t => renderTaskItem(t, servesText)).join('') : `
          <div class="glass-card p-8 text-center" style="border-style: dashed">
            <span class="material-symbols-outlined" style="font-size: 40px; color: rgba(143,220,125,0.32)">eco</span>
            <p class="hw-body mt-3" style="color: rgba(244,241,223,0.62)">Chưa có nhiệm vụ nào hôm nay</p>
            <p class="hw-caption mt-1" style="color: rgba(244,241,223,0.42)">Tạo task đầu tiên để bắt đầu streak</p>
          </div>
        `}
      </div>
      <button id="btn-add-task" class="w-full mt-3 py-3 px-4 flex items-center gap-3 cursor-pointer transition-all" style="background: rgba(8,22,15,0.38); border: 1px dashed rgba(226,244,213,0.14); border-radius: 12px">
        <span class="material-symbols-outlined" style="font-size: 20px; color: rgba(244,241,223,0.46)">add</span>
        <span class="hw-body" style="color: rgba(244,241,223,0.46)">Tạo task mới</span>
      </button>
    </div>
  `
}

export function renderTaskItem(task, servesText) {
  const isDoing = task.state === 'doing'
  const isDone = task.state === 'done'
  const icon = isDone ? 'check_circle' : (isDoing ? 'play_circle' : 'radio_button_unchecked')
  const iconColor = isDone ? '#8fdc7d' : (isDoing ? '#8fdc7d' : 'rgba(244,241,223,0.46)')

  let style = ''
  if (isDoing) style = 'background: rgba(143,220,125,0.10); border: 1px solid rgba(143,220,125,0.22); border-left: 3px solid #8fdc7d; border-radius: 12px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 0 14px rgba(143,220,125,0.10)'
  else if (isDone) style = 'background: rgba(4,10,8,0.12); border: 1px solid rgba(226,244,213,0.06); border-radius: 12px; opacity: 0.50'
  else style = 'background: rgba(8,20,14,0.14); border: 1px solid rgba(226,244,213,0.10); border-radius: 12px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.03)'

  return `
    <div class="task-item flex items-center gap-3 p-4 cursor-pointer transition-all" style="${style}" data-task-id="${task.id}">
      <span class="material-symbols-outlined task-check" style="font-size: 24px; font-variation-settings: 'FILL' ${isDone ? 1 : 0}; color: ${iconColor}">${icon}</span>
      <span class="flex-1 hw-body task-text" style="color: ${isDone ? 'rgba(244,241,223,0.54)' : '#f4f1df'}; ${isDone ? 'text-decoration: line-through' : ''}">${task.text}</span>
      ${task.servesGoal ? '<span class="material-symbols-outlined" style="font-size: 16px; color: #8fdc7d">flag</span>' : ''}
      <span class="material-symbols-outlined task-menu" style="font-size: 20px; color: rgba(244,241,223,0.46); cursor: pointer">more_vert</span>
    </div>
  `
}

function renderPomodoroCTA() {
  return `
    <div class="glass-card p-6 text-center">
      <div class="hw-mono mb-2" style="color: rgba(244,241,223,0.54)">SESSION GARDEN</div>
      <span class="material-symbols-outlined" style="font-size: 48px; color: #8fdc7d">timer</span>
      <h3 class="hw-title mt-3" style="color: #f4f1df">Pomodoro</h3>
      <p class="hw-caption mt-1" style="color: rgba(244,241,223,0.54)">25 phút tập trung</p>
      <button id="btn-pomodoro-cta" class="btn-pill mt-5" style="padding: 12px 40px">
        Bắt đầu
      </button>
    </div>
  `
}

function renderStatsPanel(stats) {
  return `
    <div class="secondary-card p-5" style="border-radius: 22px; backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px)">
      <h3 class="hw-mono mb-4" style="color: rgba(244,241,223,0.54)">TODAY GROWTH</h3>
      <div class="space-y-2">
        <div class="flex items-center justify-between py-2" style="border-bottom: 1px solid rgba(226,244,213,0.08)">
          <span class="hw-body" style="color: rgba(244,241,223,0.54)">Tasks hoàn thành</span>
          <span class="hw-title" style="color: #8fdc7d">${stats.tasksDone}</span>
        </div>
        <div class="flex items-center justify-between py-2" style="border-bottom: 1px solid rgba(226,244,213,0.08)">
          <span class="hw-body" style="color: rgba(244,241,223,0.54)">Pomodoro</span>
          <span class="hw-title" style="color: #8fdc7d">${stats.pomodoros}</span>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="hw-body" style="color: rgba(244,241,223,0.54)">Thời gian focus</span>
          <span class="hw-title" style="color: #8fdc7d">${stats.focusTime}m</span>
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
        <div class="timer-circle-wrapper w-44 h-44 mx-auto mb-6">
          <svg class="timer-ring-svg" viewBox="0 0 200 200">
            <circle class="timer-ring-track" cx="100" cy="100" r="88" />
            <circle class="timer-ring-progress focus-ring" cx="100" cy="100" r="88" id="morning-ring-progress" />
          </svg>
          <span id="morning-time" class="hw-display timer-ring-text" style="font-size: 36px; color: #8fdc7d">${String(settings.timerMinutes).padStart(2, '0')}:00</span>
        </div>
        <div class="mb-4">
          <label class="hw-mono" style="color: rgba(244,241,223,0.54); display: block; margin-bottom: 10px">THỜI GIAN</label>
          <select id="morning-time-select" class="px-4 py-2.5 rounded-lg outline-none transition-colors cursor-pointer" style="background: rgba(226,244,213,0.06); border: 1px solid rgba(226,244,213,0.12); color: #f4f1df; font-size: 14px">
            ${options}
          </select>
        </div>
        <button id="btn-morning-start" class="btn-pill" aria-label="Bắt đầu buổi sáng">Bắt đầu buổi sáng</button>
        <button id="btn-morning-stop" class="btn-ghost hidden" style="color: #f3727f; margin-left: 8px" aria-label="Dừng buổi sáng">Dừng</button>
      </div>
      <div class="glass-card p-6">
        <h3 class="hw-mono mb-3" style="color: rgba(244,241,223,0.54)">SPOTIFY PLAYLIST</h3>
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
        <div class="timer-circle-wrapper w-52 h-52 mx-auto mb-6">
          <svg class="timer-ring-svg" viewBox="0 0 200 200">
            <circle class="timer-ring-track" cx="100" cy="100" r="88" />
            <circle class="timer-ring-progress focus-ring" cx="100" cy="100" r="88" id="focus-ring-progress" />
          </svg>
          <span id="focus-time" class="hw-display timer-ring-text" style="font-size: 42px; color: #8fdc7d">25:00</span>
        </div>
        <div class="hw-mono mb-2" id="focus-phase-label" style="color: rgba(244,241,223,0.54)">FOCUS</div>
        <div class="hw-body mb-4" id="focus-round-info" style="color: #8fdc7d; display: none"></div>
        <div class="mb-4">
          <label class="hw-mono" style="color: rgba(244,241,223,0.54); display: block; margin-bottom: 10px">TỔNG THỜI GIAN TẬP TRUNG</label>
          <div class="flex items-center justify-center gap-2">
            <input id="focus-total-input" type="number" min="25" max="480" value="${config.totalMinutes}" class="w-20 px-3 py-2.5 rounded-lg text-center outline-none transition-colors" style="background: rgba(226,244,213,0.06); border: 1px solid rgba(226,244,213,0.12); color: #f4f1df; font-size: 14px">
            <span class="hw-mono" style="color: rgba(244,241,223,0.54)">phút</span>
          </div>
          <div id="focus-error" class="hw-caption mt-2" style="color: #f3727f; display: none">Tối thiểu 25 phút</div>
        </div>
        <div class="flex justify-center gap-3">
          <button id="btn-focus-start" class="btn-pill" aria-label="Bắt đầu Pomodoro">Bắt đầu</button>
          <button id="btn-focus-pause" class="btn-ghost hidden" aria-label="Tạm dừng Pomodoro">Tạm dừng</button>
          <button id="btn-focus-stop" class="btn-ghost hidden" style="color: #f3727f" aria-label="Dừng Pomodoro">Dừng</button>
        </div>
      </div>
      <div class="glass-card p-6 text-center">
        <div class="hw-mono mb-3" style="color: rgba(244,241,223,0.54)">HÔM NAY</div>
        <div class="flex justify-center gap-8 mt-3">
          <div><span class="hw-title" style="color: #8fdc7d" id="today-pomodoros">0</span><span class="hw-caption" style="color: rgba(244,241,223,0.54); margin-left: 4px">pomodoro</span></div>
          <div><span class="hw-title" style="color: #8fdc7d" id="today-focus-minutes">0</span><span class="hw-caption" style="color: rgba(244,241,223,0.54); margin-left: 4px">phút</span></div>
        </div>
      </div>
    </div>
  `
}

export function renderFAB() {
  return `
    <button id="fab-pomodoro" class="lg:hidden fixed z-40 btn-pill" style="bottom: calc(84px + env(safe-area-inset-bottom)); left: 50%; transform: translateX(-50%); padding: 12px 28px" aria-label="Bắt đầu Pomodoro">
      Bắt đầu Pomodoro
    </button>
  `
}

export function renderRewardBox(tasks) {
  const hasDone = tasks.some(t => t.state === 'done')
  if (!hasDone) return ''
  return `
    <div class="glass-card p-6 text-center">
      <span class="material-symbols-outlined" style="font-size: 36px; color: #8fdc7d">card_giftcard</span>
      <h3 class="hw-title mt-2" style="color: #f4f1df">Có task hoàn thành!</h3>
      <p class="hw-caption mt-1" style="color: rgba(244,241,223,0.54)">Tự thưởng cho bản thân nào</p>
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

export function updateTimerRing(id, remaining, total) {
  const el = document.getElementById(id)
  if (!el) return
  const progress = total > 0 ? Math.max(0, remaining / total) : 0
  const CIRCUMFERENCE = 2 * Math.PI * 88
  el.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress)
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

export function renderSettingsModal() {
  return `
    <div id="settings-overlay" class="settings-overlay" style="position: fixed; inset: 0; z-index: 100; background: rgba(3,8,6,0.82); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px">
      <div class="glass-card p-8 w-full max-w-sm" style="position: relative; z-index: 101">
        <div class="flex items-center justify-between mb-6">
          <h2 class="hw-headline" style="color: #f4f1df">Cài đặt</h2>
          <button id="settings-close" class="cursor-pointer" style="background: none; border: none; color: rgba(244,241,223,0.54)" aria-label="Đóng cài đặt">
            <span class="material-symbols-outlined" style="font-size: 24px">close</span>
          </button>
        </div>
        <div class="space-y-4">
          <button id="settings-export" class="settings-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all" style="background: rgba(226,244,213,0.06); border: 1px solid rgba(226,244,213,0.12); color: #f4f1df">
            <span class="material-symbols-outlined" style="font-size: 20px; color: #8fdc7d">download</span>
            <div class="text-left">
              <div class="hw-body" style="color: #f4f1df">Xuất dữ liệu</div>
              <div class="hw-caption" style="color: rgba(244,241,223,0.54)">Tải file JSON sao lưu</div>
            </div>
          </button>
          <button id="settings-import" class="settings-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all" style="background: rgba(226,244,213,0.06); border: 1px solid rgba(226,244,213,0.12); color: #f4f1df">
            <span class="material-symbols-outlined" style="font-size: 20px; color: #8fdc7d">upload</span>
            <div class="text-left">
              <div class="hw-body" style="color: #f4f1df">Nhập dữ liệu</div>
              <div class="hw-caption" style="color: rgba(244,241,223,0.54)">Khôi phục từ file JSON</div>
            </div>
          </button>
          <input type="file" id="settings-import-file" accept=".json" style="display: none">
          <button id="settings-reset" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all" style="background: rgba(243,114,127,0.08); border: 1px solid rgba(243,114,127,0.22); color: #f3727f">
            <span class="material-symbols-outlined" style="font-size: 20px">delete_forever</span>
            <div class="text-left">
              <div class="hw-body">Xoá tất cả dữ liệu</div>
              <div class="hw-caption" style="color: rgba(243,114,127,0.64)">Không thể hoàn tác</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  `
}
