const KEY = 'hoangweb'

function defaults() {
  return { weeklyGoal: null, streak: { count: 0, lastDate: null }, pomodoros: {}, focusTime: {}, tasks: [] }
}

export function getData() {
  try { return JSON.parse(localStorage.getItem(KEY)) || defaults() } catch { return defaults() }
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function getWeeklyGoal() {
  return getData().weeklyGoal
}

export function setWeeklyGoal(text) {
  const d = getData()
  d.weeklyGoal = { text, weekOf: isoWeek(new Date()), updatedAt: new Date().toISOString() }
  saveData(d)
  return d.weeklyGoal
}

export function clearWeeklyGoal() {
  const d = getData()
  d.weeklyGoal = null
  saveData(d)
}

export function checkWeekReset() {
  const d = getData()
  if (!d.weeklyGoal) return false
  if (d.weeklyGoal.weekOf !== isoWeek(new Date())) {
    const old = d.weeklyGoal.text
    if (confirm(`Mục tiêu tuần trước: "${old}".\nĐặt mục tiêu mới?`)) {
      d.weeklyGoal = null
      saveData(d)
      return true
    }
  }
  return false
}

export function getStreak() {
  return getData().streak
}

export function updateStreak() {
  const d = getData()
  const today = todayStr()
  const yes = yesterdayStr()
  const doneToday = d.tasks.some(t => t.createdAt.startsWith(today) && t.state === 'done')
  const doneYes = d.tasks.some(t => t.createdAt.startsWith(yes) && t.state === 'done')
  if (doneToday) {
    if (d.streak.lastDate === yes || !d.streak.lastDate) {
      d.streak.count++
      d.streak.lastDate = today
    } else if (d.streak.lastDate !== today) {
      d.streak.count = 1
      d.streak.lastDate = today
    }
    saveData(d)
  }
  return d.streak
}

function isToday(s) { return s.startsWith(todayStr()) }

export function getTodayTasks() {
  const t = todayStr()
  return getData().tasks.filter(task => task.createdAt.startsWith(t))
}

export function getAllTasks() {
  return getData().tasks
}

export function createTask(text, servesGoal = false) {
  const d = getData()
  const task = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), text, state: 'pending', servesGoal, createdAt: new Date().toISOString() }
  d.tasks.push(task)
  saveData(d)
  return task
}

export function updateTask(id, updates) {
  const d = getData()
  const i = d.tasks.findIndex(t => t.id === id)
  if (i === -1) return null
  d.tasks[i] = { ...d.tasks[i], ...updates }
  saveData(d)
  return d.tasks[i]
}

export function deleteTask(id) {
  const d = getData()
  d.tasks = d.tasks.filter(t => t.id !== id)
  saveData(d)
}

export function getTodayStats() {
  const d = getData()
  const t = todayStr()
  return {
    tasksDone: d.tasks.filter(task => task.createdAt.startsWith(t) && task.state === 'done').length,
    pomodoros: d.pomodoros[t] || 0,
    focusTime: d.focusTime[t] || 0,
  }
}

export function addPomodoro(minutes) {
  const d = getData()
  const t = todayStr()
  d.pomodoros[t] = (d.pomodoros[t] || 0) + 1
  d.focusTime[t] = (d.focusTime[t] || 0) + (minutes || 25)
  saveData(d)
}

export function getFocusConfig() {
  return getData().focusConfig || { totalMinutes: 60 }
}

export function saveFocusConfig(config) {
  const d = getData()
  d.focusConfig = config
  saveData(d)
}

export function getMorningSettings() {
  return getData().morningRoutine || { timerMinutes: 15, playlistLink: '' }
}

export function saveMorningSettings(settings) {
  const d = getData()
  d.morningRoutine = settings
  saveData(d)
}

export function getRewardLink() {
  return getData().rewardLink || ''
}

export function setRewardLink(url) {
  const d = getData()
  d.rewardLink = url
  saveData(d)
}

export function getWeekStats() {
  const d = getData()
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7))
  monday.setHours(0, 0, 0, 0)

  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  const result = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    const dateStr = date.toISOString().split('T')[0]
    const tasksDone = d.tasks.filter(t => t.createdAt && t.createdAt.startsWith(dateStr) && t.state === 'done').length
    const pomodoros = Number(d.pomodoros[dateStr]) || 0
    const focusTime = Number(d.focusTime[dateStr]) || 0
    result.push({ day: dateStr, label: days[i], tasksDone, pomodoros, focusTime })
  }

  return result
}

export function getMonthStats() {
  const d = getData()
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`

  let tasksDone = 0
  let pomodoros = 0
  let focusTime = 0
  const activeDays = new Set()

  for (const task of d.tasks) {
    if (task.createdAt && task.createdAt.startsWith(monthPrefix) && task.state === 'done') {
      tasksDone++
      activeDays.add(task.createdAt.slice(0, 10))
    }
  }

  for (const [date, count] of Object.entries(d.pomodoros)) {
    if (date.startsWith(monthPrefix)) {
      pomodoros += Number(count) || 0
      if (count > 0) activeDays.add(date)
    }
  }

  for (const [date, mins] of Object.entries(d.focusTime)) {
    if (date.startsWith(monthPrefix)) {
      focusTime += Number(mins) || 0
      if (mins > 0) activeDays.add(date)
    }
  }

  return { tasksDone, pomodoros, focusTime, totalDays: activeDays.size }
}

export function getMonthWeekStats() {
  const d = getData()
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`

  const weeks = []
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  let currentWeekStart = new Date(firstDay)
  currentWeekStart.setDate(firstDay.getDate() - ((firstDay.getDay() + 6) % 7))

  while (currentWeekStart <= lastDay) {
    let tasksDone = 0
    let pomodoros = 0
    let focusTime = 0

    const weekEnd = new Date(currentWeekStart)
    weekEnd.setDate(currentWeekStart.getDate() + 6)

    for (const task of d.tasks) {
      const taskDate = task.createdAt ? task.createdAt.slice(0, 10) : ''
      if (taskDate >= currentWeekStart.toISOString().split('T')[0] &&
          taskDate <= weekEnd.toISOString().split('T')[0] &&
          task.state === 'done') {
        tasksDone++
      }
    }

    for (const [date, count] of Object.entries(d.pomodoros)) {
      if (date >= currentWeekStart.toISOString().split('T')[0] &&
          date <= weekEnd.toISOString().split('T')[0]) {
        pomodoros += Number(count) || 0
      }
    }

    for (const [date, mins] of Object.entries(d.focusTime)) {
      if (date >= currentWeekStart.toISOString().split('T')[0] &&
          date <= weekEnd.toISOString().split('T')[0]) {
        focusTime += Number(mins) || 0
      }
    }

    const startMonth = currentWeekStart.getMonth() + 1
    const endMonth = weekEnd.getMonth() + 1
    const startLabel = `${currentWeekStart.getDate()}/${startMonth}`
    const endLabel = `${weekEnd.getDate()}/${endMonth}`
    const weekLabel = `${startLabel} - ${endLabel}`
    weeks.push({ label: weekLabel, tasksDone, pomodoros, focusTime })

    currentWeekStart.setDate(currentWeekStart.getDate() + 7)
  }

  return weeks
}

function isoWeek(date) {
  const d = new Date(date); d.setHours(0,0,0,0); d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  const w1 = new Date(d.getFullYear(), 0, 4)
  return d.getFullYear() + '-W' + String(1 + Math.round(((d - w1) / 86400000 - 3 + (w1.getDay() + 6) % 7) / 7)).padStart(2, '0')
}
function todayStr() { return new Date().toISOString().split('T')[0] }
function yesterdayStr() { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split('T')[0] }
