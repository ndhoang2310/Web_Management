import {
  renderLayout, renderViewPlaceholder, updateActiveNav, renderDashboard,
  renderMorningView, renderFocusView, renderFAB, renderRewardBox,
  renderStatsView, initStatsChart,
  updateTimerDisplay, updateFocusStats, updateFocusRoundInfo,
  hideFocusRoundInfo, showFocusError, hideFocusError
} from './ui.js'
import {
  getWeeklyGoal, getStreak, getTodayTasks, getTodayStats,
  createTask, updateTask, deleteTask, setWeeklyGoal,
  checkWeekReset, updateStreak,
  getMorningSettings, saveMorningSettings,
  getRewardLink, setRewardLink,
  addPomodoro, getFocusConfig, saveFocusConfig,
  getWeekStats, getMonthStats, getMonthWeekStats,
  getData, saveData
} from './storage.js'
import { createTimer, createSequentialTimer, formatTime } from './timer.js'

document.addEventListener('DOMContentLoaded', () => {
  renderLayout()
  const fab = document.getElementById('fab-container')
  if (fab) fab.innerHTML = renderFAB()
  wireFAB()
  navigate('dashboard')
  wireNavClicks()
})

function renderView(viewId) {
  if (viewId === 'dashboard') {
    checkWeekReset()
    renderDashboardView()
  } else if (viewId === 'morning') {
    renderMorningViewFn()
  } else if (viewId === 'focus') {
    renderFocusViewFn()
  } else if (viewId === 'stats') {
    renderStatsViewFn()
  } else {
    const section = document.getElementById(`view-${viewId}`)
    if (section && !section.children.length) {
      section.innerHTML = renderViewPlaceholder(viewId)
    }
  }
}

function navigate(tab) {
  document.querySelectorAll('.view-section').forEach(s => s.classList.add('hidden'))
  const target = document.getElementById(`view-${tab}`)
  if (target) {
    target.classList.remove('hidden')
    renderView(tab)
  }
  updateActiveNav(tab)
}

function wireNavClicks() {
  document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(el => {
    el.addEventListener('click', () => {
      const tab = el.dataset.tab
      if (tab && tab !== 'settings') {
        navigate(tab)
      }
    })
  })
}

function wireFAB() {
  document.addEventListener('click', e => {
    if (e.target.id === 'fab-pomodoro') {
      navigate('focus')
      setTimeout(startFocusFromOutside, 100)
    }
  })
}

function renderDashboardView() {
  updateStreak()
  const section = document.getElementById('view-dashboard')
  const goal = getWeeklyGoal()
  const streak = getStreak()
  const tasks = getTodayTasks()
  const stats = getTodayStats()
  const rewardHtml = renderRewardBox(tasks)
  const dashboardContent = renderDashboard(goal, streak, tasks, stats)
  section.innerHTML = dashboardContent
  if (rewardHtml) {
    const rightCol = section.querySelector('.hw-col-4')
    if (rightCol) {
      const rewardDiv = document.createElement('div')
      rewardDiv.className = 'mt-6'
      rewardDiv.innerHTML = rewardHtml
      rightCol.appendChild(rewardDiv)
    }
  }
  wireDashboard()
}

function wireDashboard() {
  const goalEmpty = document.getElementById('goal-empty')
  if (goalEmpty) goalEmpty.addEventListener('click', promptGoal)

  const addBtn = document.getElementById('btn-add-task')
  if (addBtn) addBtn.addEventListener('click', showTaskForm)

  document.querySelectorAll('.task-check').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation()
      const taskId = el.closest('.task-item').dataset.taskId
      const task = getTodayTasks().find(t => t.id === taskId)
      if (task) {
        const newState = task.state === 'done' ? 'pending' : 'done'
        updateTask(taskId, { state: newState })
        updateStreak()
        renderDashboardView()
      }
    })
  })

  document.querySelectorAll('.task-item').forEach(el => {
    const check = el.querySelector('.task-check')
    el.addEventListener('click', e => {
      if (e.target.closest('.task-menu') || e.target.closest('.task-check')) return
      const taskId = el.dataset.taskId
      const task = getTodayTasks().find(t => t.id === taskId)
      if (task && task.state !== 'done') {
        const newState = task.state === 'doing' ? 'pending' : 'doing'
        updateTask(taskId, { state: newState })
        renderDashboardView()
      }
    })
  })

  document.querySelectorAll('.task-menu').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation()
      const taskId = el.closest('.task-item').dataset.taskId
      showTaskMenu(taskId)
    })
  })

  const rewardBtn = document.getElementById('btn-reward')
  if (rewardBtn) rewardBtn.addEventListener('click', claimReward)

  const ctaBtn = document.getElementById('btn-pomodoro-cta')
  if (ctaBtn) ctaBtn.addEventListener('click', () => {
    navigate('focus')
    setTimeout(startFocusFromOutside, 100)
  })
}

function claimReward() {
  const link = getRewardLink()
  if (link) {
    window.open(link, '_blank')
  } else {
    const url = prompt('Chưa có link thưởng. Dán link YouTube / game / nhạc vào đây:')
    if (url && url.trim()) {
      setRewardLink(url.trim())
      window.open(url.trim(), '_blank')
    }
  }
  const btn = document.getElementById('btn-reward')
  if (btn) btn.disabled = true
}

function promptGoal() {
  const text = prompt('Mục tiêu của bạn tuần này là gì?')
  if (text && text.trim()) {
    setWeeklyGoal(text.trim())
    renderDashboardView()
  }
}

function showTaskForm() {
  const btn = document.getElementById('btn-add-task')
  const formContent = `
    <div class="glass-card p-4 mt-3 space-y-3">
      <input id="task-input" type="text" class="w-full px-4 py-3 rounded-lg bg-[#1a1c1c] border border-[#2a3333] text-[#e2e2e2] hw-body outline-none focus:border-[#4cf479] transition-colors" placeholder="Hôm nay bạn muốn làm gì?" autofocus>
      <div class="flex items-center gap-2">
        <input id="task-serves" type="checkbox" class="w-4 h-4 accent-[#4cf479]">
        <label for="task-serves" class="hw-caption" style="color: #bbcbb8">Phục vụ mục tiêu tuần</label>
      </div>
      <div class="flex gap-2">
        <button id="task-save" class="px-6 py-2 rounded-full bg-[#4cf479] text-[#003913] font-bold cursor-pointer transition-all hover:brightness-110 active:scale-95">Lưu</button>
        <button id="task-cancel" class="px-6 py-2 rounded-full cursor-pointer transition-all hover:brightness-110" style="border: 1px solid rgba(133,149,131,0.3); color: #889696">Huỷ</button>
      </div>
    </div>
  `
  const form = document.createElement('div')
  form.id = 'task-form'
  form.innerHTML = formContent
  btn.parentNode.insertBefore(form, btn.nextSibling)
  btn.style.display = 'none'
  document.getElementById('task-input').focus()

  document.getElementById('task-save').addEventListener('click', () => {
    const input = document.getElementById('task-input')
    const serves = document.getElementById('task-serves').checked
    if (input.value.trim()) {
      createTask(input.value.trim(), serves)
      updateStreak()
      renderDashboardView()
    }
  })
  document.getElementById('task-cancel').addEventListener('click', () => {
    form.remove()
    btn.style.display = ''
  })
}

function showTaskMenu(taskId) {
  const existing = document.querySelector('.task-menu-popup')
  if (existing) existing.remove()

  const item = document.querySelector(`.task-item[data-task-id="${taskId}"]`)
  const rect = item.querySelector('.task-menu').getBoundingClientRect()

  const popup = document.createElement('div')
  popup.className = 'task-menu-popup fixed z-50 glass-card p-2 min-w-[140px]'
  popup.style.top = `${rect.bottom + 4}px`
  popup.style.right = `${window.innerWidth - rect.right}px`
  popup.innerHTML = `
    <div class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors" id="menu-edit">
      <span class="material-symbols-outlined" style="font-size: 18px; color: #889696">edit</span>
      <span class="hw-body" style="color: #e2e2e2">Sửa</span>
    </div>
    <div class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors" style="color: #f3727f" id="menu-delete">
      <span class="material-symbols-outlined" style="font-size: 18px">delete</span>
      <span class="hw-body">Xoá</span>
    </div>
  `
  document.body.appendChild(popup)

  document.getElementById('menu-edit').addEventListener('click', () => {
    popup.remove()
    const task = getTodayTasks().find(t => t.id === taskId)
    if (task) {
      const text = prompt('Sửa task:', task.text)
      if (text && text.trim()) {
        updateTask(taskId, { text: text.trim() })
        renderDashboardView()
      }
    }
  })

  document.getElementById('menu-delete').addEventListener('click', () => {
    popup.remove()
    if (confirm('Xoá task này?')) {
      deleteTask(taskId)
      updateStreak()
      renderDashboardView()
    }
  })

  document.addEventListener('click', closeMenu, { once: true })
}

function closeMenu() {
  const popup = document.querySelector('.task-menu-popup')
  if (popup) popup.remove()
}

/* ── Morning Routine ── */

let morningTimer = createTimer(
  (time) => updateTimerDisplay('morning-time', time),
  onMorningComplete
)

function renderMorningViewFn() {
  const section = document.getElementById('view-morning')
  const settings = getMorningSettings()
  section.innerHTML = renderMorningView(settings)
  wireMorningView()
}

function wireMorningView() {
  const startBtn = document.getElementById('btn-morning-start')
  const stopBtn = document.getElementById('btn-morning-stop')
  const timeSelect = document.getElementById('morning-time-select')

  if (timeSelect) {
    timeSelect.addEventListener('change', e => {
      const val = parseInt(e.target.value)
      const settings = getMorningSettings()
      settings.timerMinutes = val
      saveMorningSettings(settings)
      if (morningTimer.isRunning()) {
        morningTimer.stop()
        morningTimer.start(val * 60)
      } else {
        updateTimerDisplay('morning-time', `${String(val).padStart(2, '0')}:00`)
      }
    })
  }

  document.getElementById('spotify-input').addEventListener('change', e => {
    const val = e.target.value.trim()
    const settings = getMorningSettings()
    settings.playlistLink = val
    saveMorningSettings(settings)
    const embed = document.getElementById('spotify-embed')
    const iframe = document.getElementById('spotify-iframe')
    if (val) {
      iframe.src = val
      embed.classList.remove('hidden')
    } else {
      embed.classList.add('hidden')
      iframe.src = ''
    }
  })

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      const settings = getMorningSettings()
      const minutes = settings.timerMinutes || 15
      startBtn.classList.add('hidden')
      stopBtn.classList.remove('hidden')
      morningTimer.start(minutes * 60)
    })
  }

  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      morningTimer.stop()
      stopBtn.classList.add('hidden')
      startBtn.classList.remove('hidden')
      showMorningTaskCapture()
    })
  }
}

function onMorningComplete() {
  document.getElementById('btn-morning-stop')?.classList.add('hidden')
  document.getElementById('btn-morning-start')?.classList.remove('hidden')
  showMorningTaskCapture()
}

function showMorningTaskCapture() {
  const goal = getWeeklyGoal()
  const container = document.getElementById('morning-task-capture')
  if (!container) return
  container.classList.remove('hidden')
  container.innerHTML = `
    <div class="glass-card p-6">
      <h3 class="hw-headline mb-4" style="color: #e2e2e2">Hôm nay bạn định làm gì?</h3>
      <div class="space-y-3" id="morning-task-list"></div>
      <div class="flex gap-2 mt-3">
        <input id="morning-task-input" type="text" class="flex-1 px-4 py-3 rounded-lg bg-[#1a1c1c] border border-[#2a3333] text-[#e2e2e2] hw-body outline-none focus:border-[#4cf479] transition-colors" placeholder="Nhập task..." autofocus>
        <button id="morning-task-add" class="px-4 py-3 rounded-lg bg-[#4cf479] text-[#003913] font-bold cursor-pointer transition-all hover:brightness-110">Thêm</button>
      </div>
      ${goal ? `
        <label class="flex items-center gap-2 mt-3">
          <input id="morning-serves" type="checkbox" class="w-4 h-4 accent-[#4cf479]">
          <span class="hw-caption" style="color: #bbcbb8">Phục vụ mục tiêu: "${goal.text}"</span>
        </label>
      ` : ''}
      <button id="morning-done" class="mt-4 w-full py-3 rounded-full bg-[#4cf479] text-[#003913] font-bold cursor-pointer transition-all hover:brightness-110 active:scale-95">Xong — về Dashboard</button>
    </div>
  `
  wireMorningTaskCapture()
}

function wireMorningTaskCapture() {
  const input = document.getElementById('morning-task-input')
  const addBtn = document.getElementById('morning-task-add')

  function addTask() {
    const text = input?.value.trim()
    if (!text) return
    const serves = document.getElementById('morning-serves')?.checked || false
    createTask(text, serves)
    updateStreak()
    input.value = ''
    input.focus()
    const list = document.getElementById('morning-task-list')
    if (list) {
      list.innerHTML += `<div class="flex items-center gap-2 py-2" style="color: #4cf479">
        <span class="material-symbols-outlined" style="font-size: 18px">check</span>
        <span class="hw-body" style="color: #e2e2e2">${text}</span>
        ${serves ? '<span class="material-symbols-outlined" style="font-size: 14px; color: #4cf479; margin-left: auto">flag</span>' : ''}
      </div>`
    }
  }

  addBtn.addEventListener('click', addTask)
  input.addEventListener('keydown', e => { if (e.key === 'Enter') addTask() })

  document.getElementById('morning-done').addEventListener('click', () => {
    morningTimer.stop()
    navigate('dashboard')
  })
}

/* ── Focus Timer — Sequential Pomodoro ── */

let sequentialTimer = createSequentialTimer(
  // onFocusTick
  (time) => { updateTimerDisplay('focus-time', time) },
  // onBreakTick
  (time) => { updateTimerDisplay('focus-time', time) },
  // onRoundChange
  (current, total, phase, minutes) => {
    updateFocusRoundInfo(current, total, phase, minutes)
  },
  // onSessionComplete
  () => {
    const start = document.getElementById('btn-focus-start')
    const pause = document.getElementById('btn-focus-pause')
    const stop = document.getElementById('btn-focus-stop')
    if (start) { start.classList.remove('hidden'); start.textContent = 'Bắt đầu' }
    if (pause) pause.classList.add('hidden')
    if (stop) stop.classList.add('hidden')
    hideFocusRoundInfo()
    const e = document.getElementById('focus-phase-label')
    if (e) e.textContent = 'FOCUS'
    updateTimerDisplay('focus-time', '25:00')
    const config = getFocusConfig()
    const input = document.getElementById('focus-total-input')
    if (input) input.value = config.totalMinutes
    const errEl = document.getElementById('focus-error')
    if (errEl) errEl.style.display = 'none'

    const state = sequentialTimer.getState()
    const totalPomodoros = state.fullRounds + (state.lastFocus >= 25 ? 1 : 0)
    const totalFocusMin = state.fullRounds * 25 + state.lastFocus
    for (let i = 0; i < totalPomodoros; i++) {
      addPomodoro(25)
    }
    if (state.lastFocus > 0 && state.lastFocus < 25) {
      const d = getData()
      const t = new Date().toISOString().split('T')[0]
      d.focusTime[t] = (d.focusTime[t] || 0) + state.lastFocus
      saveData(d)
    }
    const stats = getTodayStats()
    updateFocusStats(stats.pomodoros, stats.focusTime)

    alert('Hoàn thành toàn bộ session! 🎉')
  }
)

function renderFocusViewFn() {
  const section = document.getElementById('view-focus')
  const config = getFocusConfig()
  section.innerHTML = renderFocusView(config)
  const stats = getTodayStats()
  updateFocusStats(stats.pomodoros, stats.focusTime)
  wireFocusView()
}

function wireFocusView() {
  const start = document.getElementById('btn-focus-start')
  const pause = document.getElementById('btn-focus-pause')
  const stop = document.getElementById('btn-focus-stop')
  const input = document.getElementById('focus-total-input')

  if (input) {
    input.addEventListener('change', () => {
      const val = parseInt(input.value)
      if (val >= 25) {
        hideFocusError()
        saveFocusConfig({ totalMinutes: val })
      } else {
        showFocusError('Tối thiểu 25 phút')
      }
    })
  }

  start.addEventListener('click', () => startSequentialTimer())
  pause.addEventListener('click', () => {
    if (sequentialTimer.getState().isRunning) {
      sequentialTimer.pause()
      start.textContent = 'Tiếp tục'
      start.classList.remove('hidden')
      pause.classList.add('hidden')
    }
  })
  stop.addEventListener('click', () => {
    sequentialTimer.stop()
    hideFocusRoundInfo()
    const e = document.getElementById('focus-phase-label')
    if (e) e.textContent = 'FOCUS'
    updateTimerDisplay('focus-time', '25:00')
    start.textContent = 'Bắt đầu'
    start.classList.remove('hidden')
    pause.classList.add('hidden')
    stop.classList.add('hidden')
    hideFocusError()
    const config = getFocusConfig()
    if (input) input.value = config.totalMinutes
  })
}

function startSequentialTimer() {
  const start = document.getElementById('btn-focus-start')
  const pause = document.getElementById('btn-focus-pause')
  const stop = document.getElementById('btn-focus-stop')
  const input = document.getElementById('focus-total-input')
  const config = getFocusConfig()

  if (start.textContent === 'Tiếp tục') {
    sequentialTimer.resume()
    start.classList.add('hidden')
    pause.classList.remove('hidden')
    return
  }

  const total = config.totalMinutes
  if (total < 25) {
    showFocusError('Tối thiểu 25 phút')
    return
  }
  hideFocusError()

  document.getElementById('focus-phase-label').textContent = 'FOCUS'
  sequentialTimer.start(total)
  start.classList.add('hidden')
  pause.classList.remove('hidden')
  stop.classList.remove('hidden')
}

// Quick start from FAB or Dashboard CTA
function startFocusFromOutside() {
  const config = getFocusConfig()
  document.getElementById('focus-phase-label').textContent = 'FOCUS'
  sequentialTimer.start(config.totalMinutes)

  const start = document.getElementById('btn-focus-start')
  const pause = document.getElementById('btn-focus-pause')
  const stop = document.getElementById('btn-focus-stop')
  if (start) start.classList.add('hidden')
  if (pause) pause.classList.remove('hidden')
  if (stop) stop.classList.remove('hidden')
}

/* ── Stats View ── */

let statsChart = null
let statsMode = 'today'

function renderStatsViewFn() {
  const section = document.getElementById('view-stats')
  const weekData = getWeekStats()
  const todayData = getTodayStats()
  const monthData = getMonthStats()
  const monthWeekData = getMonthWeekStats()

  if (statsChart) {
    statsChart.destroy()
    statsChart = null
  }

  section.innerHTML = renderStatsView(statsMode, weekData, todayData, monthData, monthWeekData)
  wireStatsView()

  if (statsMode !== 'today') {
    const chartData = statsMode === 'week' ? weekData : monthWeekData
    statsChart = initStatsChart(chartData)
  }
}

function wireStatsView() {
  document.querySelectorAll('.stats-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      statsMode = btn.dataset.mode
      renderStatsViewFn()
    })
  })
}
