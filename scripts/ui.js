const TABS = [
  { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
  { id: 'morning', icon: 'wb_sunny', label: 'Buổi sáng' },
  { id: 'focus', icon: 'timer', label: 'Tập trung' },
  { id: 'stats', icon: 'bar_chart', label: 'Thống kê' },
]

export function renderLayout() {
  const app = document.getElementById('app')
  app.innerHTML = `
    ${renderAmbientGlow()}
    ${renderMobileTopBar()}
    ${renderSidebar()}
    ${renderViews()}
    ${renderBottomBar()}
    <div id="fab-container"></div>
  `
}

function renderAmbientGlow() {
  return `
    <div class="hidden lg:block">
      <div class="hw-glow" style="top: -200px; left: -200px; background: radial-gradient(circle, rgba(76, 244, 121, 0.08) 0%, transparent 70%)"></div>
      <div class="hw-glow" style="top: -200px; right: -200px; background: radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%)"></div>
      <div class="hw-glow" style="bottom: -200px; left: 50%; transform: translateX(-50%); background: radial-gradient(circle, rgba(76, 244, 121, 0.06) 0%, transparent 70%)"></div>
    </div>
  `
}

function renderMobileTopBar() {
  return `
    <header id="mobile-top-bar" class="lg:hidden fixed top-0 w-full h-14 flex items-center justify-between px-4 z-30 bg-[#0c0f0f]/70 backdrop-blur-2xl border-b border-[#2a3333]" style="padding-top: env(safe-area-inset-top); height: calc(56px + env(safe-area-inset-top))">
      <span class="hw-title" style="color: #e2e2e2">Chào Hoàng</span>
      <div class="w-8 h-8 rounded-full bg-[#4cf479] flex items-center justify-center flex-shrink-0">
        <span class="text-xs font-bold" style="color: #003913">H</span>
      </div>
    </header>
  `
}

function renderSidebar() {
  return `
    <aside id="sidebar" class="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-64 bg-[#0c0f0f]/60 backdrop-blur-xl border-r border-[#2a3333] z-40 p-4">
      <div class="px-4 py-4 mb-6">
        <span class="text-xl font-bold" style="color: #e8edeb">Hoàng WEB</span>
      </div>
      <nav class="flex-1 space-y-1" id="sidebar-nav">
        ${TABS.map(t => renderSidebarItem(t, false)).join('')}
      </nav>
      <div class="border-t border-[#2a3333] pt-2">
        <a class="nav-item flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors" data-tab="settings" style="color: #889696">
          <span class="material-symbols-outlined" style="font-size: 20px">settings</span>
          <span style="font-size: 14px">Cài đặt</span>
        </a>
      </div>
    </aside>
  `
}

function renderSidebarItem(tab, isActive) {
  return `
    <a class="nav-item flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200" data-tab="${tab.id}" style="${isActive ? 'background: rgba(40,42,43,0.6); border: 1px solid rgba(255,255,255,0.08); color: #4cf479; font-weight: 700' : 'color: #889696'}">
      <span class="material-symbols-outlined" style="font-size: 20px; font-variation-settings: 'FILL' ${isActive ? 1 : 0}">${tab.icon}</span>
      <span style="font-size: 14px">${tab.label}</span>
    </a>
  `
}

function renderBottomBar() {
  return `
    <nav id="bottom-bar" class="lg:hidden fixed bottom-0 w-full bg-[#0c0f0f]/70 backdrop-blur-2xl border-t border-[#2a3333] z-50" style="padding-bottom: env(safe-area-inset-bottom)">
      <div class="flex justify-around items-center h-16" id="bottom-nav">
        ${TABS.map(t => renderBottomItem(t, false)).join('')}
      </div>
    </nav>
  `
}

function renderBottomItem(tab, isActive) {
  return `
    <a class="bottom-nav-item flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors min-w-[64px] min-h-[44px]" data-tab="${tab.id}">
      <span class="material-symbols-outlined" style="font-size: 24px; font-variation-settings: 'FILL' ${isActive ? 1 : 0}; color: ${isActive ? '#4cf479' : '#889696'}">${tab.icon}</span>
      <span style="font-size: 10px; font-weight: ${isActive ? 700 : 400}; color: ${isActive ? '#4cf479' : '#889696'}">${tab.label}</span>
    </a>
  `
}

function renderViews() {
  return `
    <main id="main-content" class="lg:ml-64 min-h-screen pt-14 lg:pt-0 pb-20 lg:pb-0">
      <section id="view-dashboard" class="view-section hidden p-4 lg:p-12 max-w-6xl mx-auto"></section>
      <section id="view-morning" class="view-section hidden p-4 lg:p-12 max-w-6xl mx-auto"></section>
      <section id="view-focus" class="view-section hidden p-4 lg:p-12 max-w-6xl mx-auto"></section>
      <section id="view-stats" class="view-section hidden p-4 lg:p-12 max-w-6xl mx-auto"></section>
    </main>
  `
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
      <h2 class="hw-headline" style="color: #e2e2e2">${titles[viewId]}</h2>
      <p class="hw-body" style="margin-top: 8px; color: #bbcbb8">Nội dung đang được xây dựng...</p>
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
      el.style.background = 'rgba(40,42,43,0.6)'
      el.style.border = '1px solid rgba(255,255,255,0.08)'
      el.style.color = '#4cf479'
      el.style.fontWeight = '700'
      if (icon) icon.style.fontVariationSettings = "'FILL' 1"
    } else {
      el.style.background = 'transparent'
      el.style.border = 'none'
      el.style.color = '#889696'
      el.style.fontWeight = '400'
      if (icon) icon.style.fontVariationSettings = "'FILL' 0"
    }
  })

  document.querySelectorAll('.bottom-nav-item').forEach(el => {
    const tab = el.dataset.tab
    const isActive = tab === activeTab
    const icon = el.querySelector('.material-symbols-outlined')
    const label = el.querySelector('span:last-child')

    if (isActive) {
      if (icon) { icon.style.color = '#4cf479'; icon.style.fontVariationSettings = "'FILL' 1" }
      if (label) { label.style.color = '#4cf479'; label.style.fontWeight = '700' }
    } else {
      if (icon) { icon.style.color = '#889696'; icon.style.fontVariationSettings = "'FILL' 0" }
      if (label) { label.style.color = '#889696'; label.style.fontWeight = '400' }
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
    ? `<span class="hw-display" style="color: #e2e2e2">${goal.text}</span>`
    : `<span class="hw-body" style="color: #bbcbb8; cursor: pointer" id="goal-empty">+ Chưa có mục tiêu tuần này — nhấp để đặt</span>`

  return `
    <div class="glass-card p-6 lg:p-8">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">${goalHtml}</div>
        <div class="text-right flex-shrink-0">
          <div class="hw-label" style="color: #889696">STREAK</div>
          <div class="hw-display" style="color: #4cf479; filter: drop-shadow(0 0 8px rgba(76,244,121,0.4))">Day ${streak.count}</div>
        </div>
      </div>
      <div class="flex gap-6 mt-4 pt-4" style="border-top: 1px solid rgba(133,149,131,0.15)">
        <div><span class="hw-label" style="color: #889696">TASKS DONE</span><div class="hw-title" style="color: #e2e2e2">${stats.tasksDone}</div></div>
        <div><span class="hw-label" style="color: #889696">POMODOROS</span><div class="hw-title" style="color: #e2e2e2">${stats.pomodoros}</div></div>
        <div><span class="hw-label" style="color: #889696">FOCUS TIME</span><div class="hw-title" style="color: #e2e2e2">${stats.focusTime}m</div></div>
      </div>
    </div>
  `
}

function renderTaskSection(tasks, servesText) {
  const count = tasks.filter(t => t.state !== 'done').length
  return `
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="hw-headline" style="color: #e2e2e2">Tasks hôm nay <span class="hw-body" style="color: #889696">(${count} còn lại)</span></h2>
      </div>
      <div class="space-y-2" id="task-list">
        ${tasks.map(t => renderTaskItem(t, servesText)).join('')}
      </div>
      <button id="btn-add-task" class="w-full mt-3 glass-card py-3 px-4 flex items-center gap-3 cursor-pointer transition-all hover:brightness-110" style="border: 1px dashed rgba(133,149,131,0.3)">
        <span class="material-symbols-outlined" style="font-size: 20px; color: #889696">add</span>
        <span class="hw-body" style="color: #889696">Tạo task mới</span>
      </button>
    </div>
  `
}

function renderTaskItem(task, servesText) {
  const isDoing = task.state === 'doing'
  const isDone = task.state === 'done'
  const icon = isDone ? 'check_circle' : (isDoing ? 'play_circle' : 'radio_button_unchecked')
  const iconColor = isDone ? '#4cf479' : (isDoing ? '#4cf479' : '#889696')

  let style = ''
  if (isDoing) style = 'background: rgba(40,42,43,0.6); border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #4cf479; border-radius: 16px'
  else if (isDone) style = 'background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; opacity: 0.4'
  else style = 'background: rgba(30,32,32,0.45); border: 1px solid rgba(133,149,131,0.15); border-radius: 16px'

  return `
    <div class="task-item flex items-center gap-3 p-4 cursor-pointer transition-all" style="${style}" data-task-id="${task.id}">
      <span class="material-symbols-outlined task-check" style="font-size: 24px; font-variation-settings: 'FILL' ${isDone ? 1 : 0}; color: ${iconColor}">${icon}</span>
      <span class="flex-1 hw-body task-text" style="color: ${isDone ? '#889696' : '#e2e2e2'}; ${isDone ? 'text-decoration: line-through' : ''}">${task.text}</span>
      ${task.servesGoal ? '<span class="material-symbols-outlined" style="font-size: 16px; color: #4cf479">flag</span>' : ''}
      <span class="material-symbols-outlined task-menu" style="font-size: 20px; color: #889696; cursor: pointer">more_vert</span>
    </div>
  `
}

function renderPomodoroCTA() {
  return `
    <div class="glass-card p-6 text-center">
      <span class="material-symbols-outlined" style="font-size: 40px; color: #4cf479">timer</span>
      <h3 class="hw-title mt-3" style="color: #e2e2e2">Pomodoro</h3>
      <p class="hw-caption mt-1" style="color: #bbcbb8">25 phút tập trung</p>
      <button id="btn-pomodoro-cta" class="mt-4 px-8 py-3 rounded-full bg-[#4cf479] text-[#003913] font-bold shadow-[0_12px_40px_rgba(76,244,121,0.3)] cursor-pointer transition-all hover:brightness-110 active:scale-95">
        Bắt đầu
      </button>
    </div>
  `
}

function renderStatsPanel(stats) {
  return `
    <div class="glass-card p-6">
      <h3 class="hw-label mb-4" style="color: #889696">THỐNG KÊ HÔM NAY</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between py-2" style="border-bottom: 1px solid rgba(133,149,131,0.1)">
          <span class="hw-body" style="color: #bbcbb8">Tasks hoàn thành</span>
          <span class="hw-title" style="color: #4cf479">${stats.tasksDone}</span>
        </div>
        <div class="flex items-center justify-between py-2" style="border-bottom: 1px solid rgba(133,149,131,0.1)">
          <span class="hw-body" style="color: #bbcbb8">Pomodoro</span>
          <span class="hw-title" style="color: #4cf479">${stats.pomodoros}</span>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="hw-body" style="color: #bbcbb8">Thời gian focus</span>
          <span class="hw-title" style="color: #4cf479">${stats.focusTime}m</span>
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
        <div class="w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-6" style="border: 4px solid rgba(76,244,121,0.12)">
          <span id="morning-time" class="hw-display" style="font-size: 36px; color: #4cf479">${String(settings.timerMinutes).padStart(2, '0')}:00</span>
        </div>
        <div class="mb-4">
          <label class="hw-caption" style="color: #889696; display: block; margin-bottom: 8px">THỜI GIAN</label>
          <select id="morning-time-select" class="px-4 py-2 rounded-lg bg-[#1a1c1c] border border-[#2a3333] text-[#e2e2e2] hw-body outline-none focus:border-[#4cf479] transition-colors cursor-pointer">
            ${options}
          </select>
        </div>
        <button id="btn-morning-start" class="px-10 py-3 rounded-full bg-[#4cf479] text-[#003913] font-bold shadow-[0_12px_40px_rgba(76,244,121,0.3)] cursor-pointer transition-all hover:brightness-110 active:scale-95">
          Bắt đầu buổi sáng
        </button>
        <button id="btn-morning-stop" class="px-10 py-3 rounded-full cursor-pointer transition-all hover:brightness-110 active:scale-95 hidden" style="border: 1px solid rgba(133,149,131,0.3); color: #f3727f; margin-left: 8px">
          Dừng
        </button>
      </div>
      <div class="glass-card p-6">
        <h3 class="hw-label mb-3" style="color: #889696">SPOTIFY PLAYLIST</h3>
        <input id="spotify-input" type="text" class="w-full px-4 py-3 rounded-lg bg-[#1a1c1c] border border-[#2a3333] text-[#e2e2e2] hw-body outline-none focus:border-[#4cf479] transition-colors" placeholder="Dán link Spotify embed..." value="${settings.playlistLink}">
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
        <div class="w-48 h-48 mx-auto rounded-full flex items-center justify-center mb-6" style="border: 4px solid rgba(76,244,121,0.12)">
          <span id="focus-time" class="hw-display" style="font-size: 42px; color: #4cf479">25:00</span>
        </div>
        <div class="hw-caption mb-2" id="focus-phase-label" style="color: #889696; text-transform: uppercase">FOCUS</div>
        <div class="hw-body mb-4" id="focus-round-info" style="color: #4cf479; display: none"></div>
        <div class="mb-4">
          <label class="hw-caption" style="color: #889696; display: block; margin-bottom: 8px">TỔNG THỜI GIAN TẬP TRUNG</label>
          <div class="flex items-center justify-center gap-2">
            <input id="focus-total-input" type="number" min="25" max="480" value="${config.totalMinutes}" class="w-20 px-3 py-2 rounded-lg bg-[#1a1c1c] border border-[#2a3333] text-[#e2e2e2] hw-body text-center outline-none focus:border-[#4cf479] transition-colors">
            <span class="hw-caption" style="color: #889696">phút</span>
          </div>
          <div id="focus-error" class="hw-caption mt-2" style="color: #f3727f; display: none">Tối thiểu 25 phút</div>
        </div>
        <div class="flex justify-center gap-3">
          <button id="btn-focus-start" class="px-10 py-3 rounded-full bg-[#4cf479] text-[#003913] font-bold shadow-[0_12px_40px_rgba(76,244,121,0.3)] cursor-pointer transition-all hover:brightness-110 active:scale-95">Bắt đầu</button>
          <button id="btn-focus-pause" class="px-6 py-3 rounded-full cursor-pointer transition-all hover:brightness-110 hidden" style="border: 1px solid rgba(133,149,131,0.3); color: #bbcbb8">Tạm dừng</button>
          <button id="btn-focus-stop" class="px-6 py-3 rounded-full cursor-pointer transition-all hover:brightness-110 hidden" style="border: 1px solid rgba(133,149,131,0.3); color: #f3727f">Dừng</button>
        </div>
      </div>
      <div class="glass-card p-6 text-center">
        <div class="hw-label" style="color: #889696">HÔM NAY</div>
        <div class="flex justify-center gap-8 mt-3">
          <div><span class="hw-title" style="color: #4cf479" id="today-pomodoros">0</span><span class="hw-caption" style="color: #889696; margin-left: 4px">pomodoro</span></div>
          <div><span class="hw-title" style="color: #4cf479" id="today-focus-minutes">0</span><span class="hw-caption" style="color: #889696; margin-left: 4px">phút</span></div>
        </div>
      </div>
    </div>
  `
}

export function renderFAB() {
  return `
    <button id="fab-pomodoro" class="lg:hidden fixed z-40 px-6 py-3 rounded-full bg-[#4cf479] text-[#003913] font-bold shadow-[0_12px_40px_rgba(76,244,121,0.3)] cursor-pointer transition-all hover:brightness-110 active:scale-95" style="bottom: calc(80px + env(safe-area-inset-bottom)); left: 50%; transform: translateX(-50%)">
      Bắt đầu Pomodoro
    </button>
  `
}

export function renderRewardBox(tasks) {
  const hasDone = tasks.some(t => t.state === 'done')
  if (!hasDone) return ''
  return `
    <div class="glass-card p-6 text-center">
      <span class="material-symbols-outlined" style="font-size: 36px; color: #4cf479">card_giftcard</span>
      <h3 class="hw-title mt-2" style="color: #e2e2e2">Có task hoàn thành!</h3>
      <p class="hw-caption mt-1" style="color: #bbcbb8">Tự thưởng cho bản thân nào</p>
      <button id="btn-reward" class="mt-3 px-8 py-3 rounded-full bg-[#4cf479] text-[#003913] font-bold shadow-[0_0_20px_rgba(76,244,121,0.4)] cursor-pointer transition-all hover:brightness-110 active:scale-95 animate-pulse">
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
