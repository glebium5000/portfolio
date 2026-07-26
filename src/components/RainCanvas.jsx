/**
 * RainCanvas — extracted from the old CafeWindow for clarity.
 * Two layers: rain falling outside the glass (3 depths, slight slant)
 * and droplets ON the glass that bead up, then run down leaving trails.
 * Unchanged behaviour from the previous version; kept deliberately
 * ambient (low opacity, moderate speed) per the design brief.
 */
import { useEffect, useRef } from 'react'

export default function RainCanvas({ paused }) {
  const rainRef = useRef(null)
  const glassRef = useRef(null)
  const pausedRef = useRef(paused)
  pausedRef.current = paused

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rainCanvas = rainRef.current
    const glassCanvas = glassRef.current
    const rctx = rainCanvas.getContext('2d')
    const gctx = glassCanvas.getContext('2d')
    let W = 0, H = 0, dpr = 1
    let raf = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = rainCanvas.parentElement.getBoundingClientRect()
      W = rect.width
      H = rect.height
      for (const c of [rainCanvas, glassCanvas]) {
        c.width = Math.round(W * dpr)
        c.height = Math.round(H * dpr)
        c.style.width = W + 'px'
        c.style.height = H + 'px'
      }
      rctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const LAYERS = [
      { n: 34, speed: 560, len: 14, w: 1.3, alpha: 0.30, slant: 0.12 },
      { n: 46, speed: 400, len: 10, w: 1.0, alpha: 0.20, slant: 0.10 },
      { n: 58, speed: 270, len: 8,  w: 0.8, alpha: 0.11, slant: 0.08 },
    ]
    const streaks = []
    for (const L of LAYERS) {
      for (let i = 0; i < L.n; i++) {
        streaks.push({ L, x: Math.random() * 1.2 - 0.1, y: Math.random(), jitter: 0.85 + Math.random() * 0.3 })
      }
    }

    const beads = []
    const runners = []
    const spawnBead = () => {
      beads.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.92,
        r: 0.6 + Math.random() * 1.4,
        growth: 0.15 + Math.random() * 0.5,
        cap: 2.4 + Math.random() * 2.6,
      })
    }
    for (let i = 0; i < 30; i++) spawnBead()

    const drawDrop = (ctx, x, y, r, alpha) => {
      const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r)
      g.addColorStop(0, `rgba(215, 230, 245, ${alpha})`)
      g.addColorStop(0.7, `rgba(150, 175, 200, ${alpha * 0.55})`)
      g.addColorStop(1, 'rgba(120, 145, 175, 0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    let last = performance.now()
    let beadTimer = 0

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (pausedRef.current) return

      rctx.clearRect(0, 0, W, H)
      rctx.lineCap = 'round'
      for (const s of streaks) {
        const { L } = s
        s.y += (L.speed * s.jitter * dt) / H
        s.x += (L.speed * L.slant * s.jitter * dt) / W
        if (s.y > 1.05) { s.y = -0.05; s.x = Math.random() * 1.2 - 0.15 }
        const x = s.x * W
        const y = s.y * H
        rctx.strokeStyle = `rgba(174, 197, 222, ${L.alpha})`
        rctx.lineWidth = L.w
        rctx.beginPath()
        rctx.moveTo(x, y)
        rctx.lineTo(x - L.len * L.slant * 3.2, y - L.len)
        rctx.stroke()
      }

      gctx.globalCompositeOperation = 'destination-out'
      gctx.fillStyle = 'rgba(0, 0, 0, 0.018)'
      gctx.fillRect(0, 0, W, H)
      gctx.globalCompositeOperation = 'source-over'

      beadTimer += dt
      if (beadTimer > 0.4 && beads.length < 42) { beadTimer = 0; spawnBead() }

      for (let i = beads.length - 1; i >= 0; i--) {
        const b = beads[i]
        b.r += b.growth * dt
        drawDrop(gctx, b.x, b.y, b.r, 0.5)
        if (b.r >= b.cap) {
          runners.push({ x: b.x, y: b.y, r: b.r, vy: 8 + Math.random() * 14, wob: Math.random() * Math.PI * 2 })
          beads.splice(i, 1)
        }
      }

      for (let i = runners.length - 1; i >= 0; i--) {
        const d = runners[i]
        d.vy = Math.min(d.vy + 46 * dt, 120)
        d.wob += dt * 5
        d.x += Math.sin(d.wob) * 6 * dt
        d.y += d.vy * dt
        d.r = Math.max(1.2, d.r - dt * 0.9)
        drawDrop(gctx, d.x, d.y, d.r, 0.55)
        if (d.y > H + 8) runners.splice(i, 1)
      }
    }

    if (!reduce) {
      raf = requestAnimationFrame(frame)
    } else {
      for (let i = 0; i < 36; i++) {
        drawDrop(gctx, Math.random() * W, Math.random() * H, 1 + Math.random() * 3, 0.45)
      }
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <canvas ref={rainRef} className="rain-canvas" />
      <canvas ref={glassRef} className="glass-canvas" />
    </>
  )
}
