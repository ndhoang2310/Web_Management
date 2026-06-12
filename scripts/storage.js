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

function isoWeek(date) {
  const d = new Date(date); d.setHours(0,0,0,0); d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  const w1 = new Date(d.getFullYear(), 0, 4)
  return d.getFullYear() + '-W' + String(1 + Math.round(((d - w1) / 86400000 - 3 + (w1.getDay() + 6) % 7) / 7)).padStart(2, '0')
}
function todayStr() { return new Date().toISOString().split('T')[0] }
function yesterdayStr() { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split('T')[0] }
