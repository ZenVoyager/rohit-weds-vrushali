import { useCallback, useEffect, useRef, useState } from 'react'

const REVEAL_THRESHOLD = 0.5 // fraction of the surface that must be scratched
const SAMPLE_STEP = 6 // sample every Nth pixel when measuring progress

/**
 * Canvas scratch card. Mouse, pen and touch via Pointer Events.
 * `children` is the hidden content. Calls onReveal() once enough is scratched,
 * or immediately when `forceReveal` becomes true.
 */
export default function ScratchCard({ label, children, onReveal, forceReveal = false, className = '' }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const state = useRef({ drawing: false, last: null, moves: 0, revealed: false, w: 0, h: 0 })
  const [revealed, setRevealed] = useState(false)
  const [touched, setTouched] = useState(false)

  const finish = useCallback(() => {
    if (state.current.revealed) return
    state.current.revealed = true
    setRevealed(true)
    onReveal?.()
  }, [onReveal])

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const { width, height } = wrap.getBoundingClientRect()
    if (!width || !height) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    state.current.w = width
    state.current.h = height
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalCompositeOperation = 'source-over'

    // gold foil
    const grad = ctx.createLinearGradient(0, 0, width, height)
    grad.addColorStop(0, '#EFD9A3')
    grad.addColorStop(0.35, '#D4AF6A')
    grad.addColorStop(0.65, '#E7CB8C')
    grad.addColorStop(1, '#A98343')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)

    // engraved diamond lattice
    ctx.strokeStyle = 'rgba(107,23,40,0.2)'
    ctx.lineWidth = 1
    const gap = Math.max(14, width / 7)
    for (let x = -height; x < width + height; x += gap) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x + height, height)
      ctx.moveTo(x + height, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    // border
    ctx.strokeStyle = 'rgba(107,23,40,0.6)'
    ctx.lineWidth = 2
    ctx.strokeRect(7, 7, width - 14, height - 14)
    ctx.lineWidth = 1
    ctx.strokeRect(12, 12, width - 24, height - 24)

    // medallion + label
    const cx = width / 2
    const cy = height / 2
    const r = Math.min(width, height) * 0.3
    ctx.fillStyle = 'rgba(248,240,223,0.82)'
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(107,23,40,0.7)'
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(cx, cy, r - 5, 0, Math.PI * 2)
    ctx.stroke()
    // heart in the centre
    const hs = r * 0.62
    const hy = cy - r * 0.16
    const heart = () => {
      ctx.beginPath()
      ctx.moveTo(cx, hy + hs * 0.9)
      ctx.bezierCurveTo(cx - hs * 1.5, hy + hs * 0.1, cx - hs * 0.95, hy - hs * 1.0, cx, hy - hs * 0.32)
      ctx.bezierCurveTo(cx + hs * 0.95, hy - hs * 1.0, cx + hs * 1.5, hy + hs * 0.1, cx, hy + hs * 0.9)
      ctx.closePath()
    }
    ctx.save()
    ctx.shadowColor = 'rgba(59,33,28,0.35)'
    ctx.shadowBlur = hs * 0.3
    ctx.shadowOffsetY = hs * 0.1
    const hg = ctx.createLinearGradient(cx - hs, hy - hs, cx + hs, hy + hs)
    hg.addColorStop(0, '#B02A44')
    hg.addColorStop(0.55, '#8B2635')
    hg.addColorStop(1, '#5A1020')
    heart()
    ctx.fillStyle = hg
    ctx.fill()
    ctx.restore()
    heart()
    ctx.strokeStyle = '#D4AF6A'
    ctx.lineWidth = Math.max(1.6, hs * 0.07)
    ctx.stroke()
    ctx.beginPath()
    ctx.ellipse(cx - hs * 0.5, hy - hs * 0.22, hs * 0.22, hs * 0.12, -0.7, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.fill()
    ctx.fillStyle = '#6B1728'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `italic 600 ${Math.max(11, r * 0.3)}px "Cormorant Garamond", serif`
    ctx.fillText(label, cx, cy + r * 0.62)
  }, [label])

  useEffect(() => {
    paintCover()
    const wrap = wrapRef.current
    if (!wrap || typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(() => {
      const { width, height } = wrap.getBoundingClientRect()
      // Only repaint on a real size change, never mid-scratch.
      if (!state.current.revealed && !state.current.drawing && (Math.abs(width - state.current.w) > 2 || Math.abs(height - state.current.h) > 2)) paintCover()
    })
    ro.observe(wrap)
    // Fonts may arrive after first paint.
    document.fonts?.ready.then(() => {
      if (!state.current.revealed && !state.current.touched) paintCover()
    })
    return () => ro.disconnect()
  }, [paintCover])

  useEffect(() => {
    if (forceReveal) finish()
  }, [forceReveal, finish])

  const point = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const scratch = (from, to) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = Math.max(22, state.current.w * 0.17)
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
  }

  const measure = () => {
    const canvas = canvasRef.current
    if (!canvas || state.current.revealed) return
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    const data = ctx.getImageData(0, 0, width, height).data
    let cleared = 0
    let total = 0
    for (let y = 0; y < height; y += SAMPLE_STEP) {
      const row = y * width * 4
      for (let x = 0; x < width; x += SAMPLE_STEP) {
        total += 1
        if (data[row + x * 4 + 3] < 40) cleared += 1
      }
    }
    if (total && cleared / total >= REVEAL_THRESHOLD) finish()
  }

  const onDown = (e) => {
    if (state.current.revealed) return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    const p = point(e)
    state.current.drawing = true
    state.current.touched = true
    state.current.last = p
    setTouched(true)
    scratch(p, { x: p.x + 0.01, y: p.y + 0.01 })
  }
  const onMove = (e) => {
    if (!state.current.drawing || state.current.revealed) return
    const p = point(e)
    scratch(state.current.last, p)
    state.current.last = p
    state.current.moves += 1
    if (state.current.moves % 8 === 0) measure()
  }
  const onUp = (e) => {
    if (!state.current.drawing) return
    state.current.drawing = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    measure()
  }

  return (
    <div
      ref={wrapRef}
      className={`relative select-none overflow-hidden rounded-2xl bg-cream ${className}`}
      style={{ boxShadow: 'inset 0 0 0 2px var(--antique-gold), 0 22px 40px -22px rgba(0,0,0,0.6)' }}
    >
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full cursor-pointer transition-opacity duration-700 ${revealed ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        style={{ touchAction: 'none' }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      />
      {/* Invitation to scratch: a soft light sweep over the foil (never changes the foil's opacity). */}
      {!touched && !revealed && (
        <span
          className="pointer-events-none absolute inset-0 animate-shimmer"
          style={{ backgroundImage: 'linear-gradient(110deg, transparent 35%, rgba(255,249,239,0.55) 50%, transparent 65%)', backgroundSize: '200% 100%' }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
