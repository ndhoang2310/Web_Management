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
