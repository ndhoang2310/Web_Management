const LEAF_COLORS = [
  'rgba(143,220,125,0.28)',
  'rgba(183,255,138,0.22)',
  'rgba(143,255,224,0.20)',
  'rgba(111,196,98,0.24)',
  'rgba(163,232,140,0.18)',
  'rgba(47,143,78,0.22)',
  'rgba(200,255,160,0.16)',
  'rgba(95,180,85,0.20)',
]

function createLeaf(canvas) {
  const size = 6 + Math.random() * 14
  return {
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height,
    size,
    speed: 0.3 + Math.random() * 0.6,
    swayAmp: 0.3 + Math.random() * 0.8,
    swaySpeed: 0.008 + Math.random() * 0.015,
    swayPhase: Math.random() * Math.PI * 2,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.012,
    color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    opacity: 0.15 + Math.random() * 0.22,
  }
}

function drawLeaf(ctx, leaf) {
  ctx.save()
  ctx.translate(leaf.x, leaf.y)
  ctx.rotate(leaf.rotation)
  ctx.fillStyle = leaf.color
  ctx.beginPath()
  const s = leaf.size
  ctx.moveTo(0, -s * 0.7)
  ctx.bezierCurveTo(s * 0.55, -s * 0.4, s * 0.5, s * 0.3, 0, s * 0.65)
  ctx.bezierCurveTo(-s * 0.5, s * 0.3, -s * 0.55, -s * 0.4, 0, -s * 0.7)
  ctx.fill()
  ctx.strokeStyle = 'rgba(183,255,138,0.35)'
  ctx.lineWidth = 0.5
  ctx.beginPath()
  ctx.moveTo(0, s * 0.65)
  ctx.lineTo(0, -s * 0.85)
  ctx.stroke()
  ctx.restore()
}

export function initLeaves() {
  const canvas = document.getElementById('leaves-canvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let leaves = []
  let fireflies = []
  let time = 0

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function createFly() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20 + Math.random() * 80,
      size: 1 + Math.random() * 2.5,
      speed: 0.15 + Math.random() * 0.35,
      swayAmp: 0.2 + Math.random() * 0.5,
      swaySpeed: 0.005 + Math.random() * 0.012,
      swayPhase: Math.random() * Math.PI * 2,
      glowPhase: Math.random() * Math.PI * 2,
      glowSpeed: 0.02 + Math.random() * 0.03,
      color: Math.random() < 0.6
        ? [220, 240, 140]
        : [200, 230, 180],
    }
  }

  function drawFly(ctx, fly, time) {
    const pulse = 0.4 + 0.6 * Math.sin(time * fly.glowSpeed + fly.glowPhase) * Math.sin(time * fly.glowSpeed + fly.glowPhase)
    const alpha = (0.15 + pulse * 0.40).toFixed(2)
    const [r, g, b] = fly.color

    ctx.save()
    ctx.beginPath()
    ctx.arc(fly.x, fly.y, fly.size + pulse * 3, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
    ctx.shadowColor = `rgba(${r},${g},${b},${(alpha * 1.5).toFixed(2)})`
    ctx.shadowBlur = 8 + pulse * 10
    ctx.fill()

    ctx.fillStyle = `rgba(255,255,220,${(alpha * 0.8).toFixed(2)})`
    ctx.beginPath()
    ctx.arc(fly.x, fly.y, fly.size * 0.4, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  function populateFlies() {
    const count = Math.max(6, Math.floor(window.innerWidth / 120))
    while (fireflies.length < count) {
      fireflies.push(createFly())
    }
  }

  function animate() {
    time++
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = leaves.length - 1; i >= 0; i--) {
      const leaf = leaves[i]
      leaf.y += leaf.speed
      leaf.x += Math.sin(time * leaf.swaySpeed + leaf.swayPhase) * leaf.swayAmp
      leaf.rotation += leaf.rotSpeed
      drawLeaf(ctx, leaf)
      if (leaf.y > canvas.height + 30) {
        leaves[i] = createLeaf(canvas)
      }
    }

    for (let i = fireflies.length - 1; i >= 0; i--) {
      const fly = fireflies[i]
      fly.y -= fly.speed
      fly.x += Math.sin(time * fly.swaySpeed + fly.swayPhase) * fly.swayAmp
      drawFly(ctx, fly, time)
      if (fly.y < -40) {
        fireflies[i] = createFly()
      }
    }

    animId = requestAnimationFrame(animate)
  }

  function populate() {
    const leafCount = Math.max(12, Math.floor(window.innerWidth / 60))
    while (leaves.length < leafCount) {
      leaves.push(createLeaf(canvas))
    }
  }

  resize()
  populate()
  populateFlies()
  let animId = requestAnimationFrame(animate)

  window.addEventListener('resize', () => {
    resize()
  })
}
