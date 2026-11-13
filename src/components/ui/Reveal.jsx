import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 0.8, 0.3, 1]

/**
 * Scroll-triggered reveal. Honours prefers-reduced-motion (renders statically).
 * Use `as` for the underlying tag ('div' | 'li' | 'p' | 'span' | 'article' | 'h2' | 'section').
 */
export default function Reveal({
  as = 'div',
  children,
  className = '',
  delay = 0,
  x = 0,
  y = 32,
  scale = 1,
  duration = 0.9,
  amount = 0.2,
  ...rest
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div
  if (reduce) return <Tag className={className} {...rest}>{children}</Tag>
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, x, y, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount, margin: '0px 0px -40px 0px' }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
