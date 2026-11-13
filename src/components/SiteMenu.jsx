import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollLock } from '../hooks/useScrollLock'
import { Mandala } from './art/Decor'

const LINKS = [
  ['welcome', 'Invitation'],
  ['date', 'Save the Date'],
  ['couple', 'Bride & Groom'],
  ['events', 'Wedding Events'],
  ['countdown', 'Countdown'],
  ['footer', 'Contact'],
]

/** Floating menu button + full-screen section navigation. Also a floating RSVP shortcut. */
export default function SiteMenu({ visible }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  useScrollLock(open)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => {
    setOpen(false)
    // wait for scroll lock release, then scroll
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }), 60)
  }

  if (!visible) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        className="fixed right-4 top-4 z-[60] grid h-12 w-12 place-items-center rounded-full bg-maroon/90 text-gold backdrop-blur transition hover:scale-105"
        style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold), 0 10px 24px -10px rgba(0,0,0,0.6)', marginTop: 'var(--header-safe)' }}
      >
        <Menu size={22} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            role="dialog"
            aria-modal="true"
            aria-label="Site sections"
            className="bg-maroon-pattern fixed inset-0 z-[96] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Mandala className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] text-gold opacity-[0.18]" spin />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="fixed right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-gold text-maroon" autoFocus>
              <X size={22} />
            </button>
            <ul className="relative mx-auto flex min-h-full max-w-md flex-col justify-center gap-1 px-8 py-20">
              {LINKS.map(([id, label], i) => (
                <motion.li key={id} initial={reduce ? false : { opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5 }}>
                  <a href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id) }} className="group flex items-baseline gap-4 border-b border-gold/20 py-3 font-display text-3xl text-ivory transition hover:text-gold">
                    <span className="font-body text-xs tracking-[0.2em] text-gold/70">{String(i + 1).padStart(2, '0')}</span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
