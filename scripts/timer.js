export function createTimer(onTick, onComplete) {
  let interval = null
  let remaining = 0
  let running = false

  function start(seconds) {
    stop()
    remaining = seconds
    running = true
    if (onTick) onTick(formatTime(remaining))
    interval = setInterval(() => {
      remaining--
      if (onTick) onTick(formatTime(remaining))
      if (remaining <= 0) {
        stop()
        if (onComplete) onComplete()
      }
    }, 1000)
  }

  function pause() {
    if (interval) clearInterval(interval)
    interval = null
    running = false
  }

  function resume() {
    if (!running && remaining > 0) {
      running = true
      interval = setInterval(() => {
        remaining--
        if (onTick) onTick(formatTime(remaining))
        if (remaining <= 0) {
          stop()
          if (onComplete) onComplete()
        }
      }, 1000)
    }
  }

  function stop() {
    if (interval) clearInterval(interval)
    interval = null
    running = false
    remaining = 0
  }

  function getRemaining() { return remaining }
  function isRunning() { return running }

  return { start, pause, resume, stop, getRemaining, isRunning }
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export function createSequentialTimer(onFocusTick, onBreakTick, onRoundChange, onSessionComplete) {
  let timer = createTimer()
  let state = { totalMinutes: 0, fullRounds: 0, lastFocus: 0, currentRound: 0, phase: 'focus', stopped: false }

  function start(totalMinutes) {
    stop()
    state = {
      totalMinutes,
      fullRounds: Math.floor(totalMinutes / 30),
      lastFocus: totalMinutes - (Math.floor(totalMinutes / 30) * 30),
      currentRound: 0,
      phase: 'focus',
      stopped: false
    }
    runNext()
  }

  function runNext() {
    if (state.stopped) return

    if (state.phase === 'focus') {
      state.currentRound++
      let duration
      if (state.currentRound <= state.fullRounds) {
        duration = 25
      } else if (state.lastFocus > 0) {
        duration = state.lastFocus
      } else {
        if (onSessionComplete) onSessionComplete()
        return
      }
      if (onRoundChange) onRoundChange(state.currentRound, state.fullRounds + (state.lastFocus > 0 ? 1 : 0), 'focus', duration)
      timer = createTimer(
        (time) => { if (onFocusTick) onFocusTick(time) },
        () => {
          if (state.stopped) return
          if (state.currentRound <= state.fullRounds) {
            state.phase = 'break'
            runNext()
          } else {
            if (onSessionComplete) onSessionComplete()
          }
        }
      )
      timer.start(duration * 60)
    } else {
      if (onRoundChange) onRoundChange(state.currentRound, state.fullRounds + (state.lastFocus > 0 ? 1 : 0), 'break', 5)
      timer = createTimer(
        (time) => { if (onBreakTick) onBreakTick(time) },
        () => {
          if (state.stopped) return
          state.phase = 'focus'
          runNext()
        }
      )
      timer.start(5 * 60)
    }
  }

  function pause() { if (timer) timer.pause() }
  function resume() { if (timer && !timer.isRunning()) timer.resume() }
  function stop() {
    state.stopped = true
    if (timer) timer.stop()
    state = { ...state, currentRound: 0, phase: 'focus' }
  }
  function isRunning() { return timer ? timer.isRunning() : false }
  function getState() { return { ...state, isRunning: isRunning() } }

  return { start, pause, resume, stop, getState }
}
