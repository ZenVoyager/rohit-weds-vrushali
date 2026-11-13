import { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Deterministic pseudo-random so petals don't jump between renders.
const seeded = (i) => {
  const x = Math.sin(i * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

/** Gentle falling petals. Renders nothing when the user prefers reduced motion. */
function FallingPetals({ count = 14, className = '' }) {
  const reduce = useReducedMotion()
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${seeded(i + 1) * 100}%`,
        size: 10 + seeded(i + 7) * 12,
        delay: seeded(i + 13) * 8,
        duration: 9 + seeded(i + 19) * 8,
        drift: (seeded(i + 23) - 0.5) * 160,
        rotate: 180 + seeded(i + 29) * 360,
        tone: i % 3,
      })),
    [count],
  )
  if (reduce) return null
  const colors = ['var(--antique-gold)', 'var(--terracotta-rose)', 'var(--wedding-burgundy)']
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((p, i) => (
        <motion.span
          key={i}
          className="absolute -top-8 block rounded-[60%_0_60%_0]"
          style={{ left: p.left, width: p.size, height: p.size * 1.35, background: colors[p.tone], opacity: 0.8 }}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: '105vh', x: p.drift, rotate: p.rotate, opacity: [0, 0.85, 0.85, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

export default memo(FallingPetals)
