import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarPlus, Eye, Sparkles } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { calendarUrl, formatLongDate, formatTime, monthName, parseLocal, weekdayName } from '../utils/format'
import { Mandala } from './art/Decor'
import ScratchCard from './ScratchCard'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

function Burst({ reduce }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => {
        const a = (i / 34) * Math.PI * 2
        const d = 120 + ((i * 53) % 130)
        return { x: Math.cos(a) * d, y: Math.sin(a) * d * 0.7 - 30, r: (i * 97) % 360, c: i % 3, s: 8 + (i % 4) * 3 }
      }),
    [],
  )
  if (reduce) return null
  const colors = ['var(--antique-gold)', 'var(--terracotta-rose)', 'var(--warm-ivory)']
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/3 h-0 w-0" aria-hidden="true">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute block rounded-[60%_0_60%_0]"
          style={{ width: b.s, height: b.s * 1.4, background: colors[b.c] }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
          animate={{ x: b.x, y: b.y + 140, opacity: 0, rotate: b.r, scale: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export default function DateReveal() {
  const reduce = useReducedMotion()
  const { wedding } = weddingData
  const d = parseLocal(wedding.date)
  const [done, setDone] = useState({ day: false, month: false, year: false })
  const [forceAll, setForceAll] = useState(false)
  const allDone = done.day && done.month && done.year

  const mark = useCallback((k) => setDone((s) => (s[k] ? s : { ...s, [k]: true })), [])
  const onDay = useCallback(() => mark('day'), [mark])
  const onMonth = useCallback(() => mark('month'), [mark])
  const onYear = useCallback(() => mark('year'), [mark])

  const ics = calendarUrl({
    title: `${weddingData.groom.firstName} & ${weddingData.bride.firstName}'s Wedding`,
    start: d,
    end: new Date(d.getTime() + 4 * 3600 * 1000),
    location: `${wedding.venue}, ${wedding.city}`,
    description: `Wedding celebration of ${weddingData.groom.name} and ${weddingData.bride.name}.`,
  })

  const cards = [
    { key: 'day', label: 'Day', onReveal: onDay, content: <span className="font-display text-[clamp(3rem,13vw,5.6rem)] font-semibold leading-none text-maroon">{d.getDate()}</span>, sub: weekdayName(d) },
    { key: 'month', label: 'Month', onReveal: onMonth, content: <span className="font-display text-[clamp(1.35rem,6vw,2.7rem)] font-semibold leading-none text-maroon">{monthName(d)}</span>, sub: 'The month of love' },
    { key: 'year', label: 'Year', onReveal: onYear, content: <span className="font-display text-[clamp(2.2rem,10vw,4.2rem)] font-semibold leading-none text-maroon">{d.getFullYear()}</span>, sub: formatTime(wedding.date) },
  ]

  return (
    <section id="date" className="bg-maroon-pattern bg-maroon-rich relative overflow-hidden text-ivory" aria-labelledby="date-title">
      <Mandala className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] max-w-[900px] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.12]" spin />
      <div className="section-pad relative">
        <div className="container-royal max-w-3xl">
          <div id="date-title">
            <SectionHeading tone="dark" eyebrow="Save the Date" title="Scratch to Reveal" subtitle="Use your finger or mouse to uncover the day our two families become one." />
          </div>

          <Reveal className="relative mt-12" y={40}>
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {cards.map((c, i) => (
                <div key={c.key} className="text-center">
                  <ScratchCard label={c.label} onReveal={c.onReveal} forceReveal={forceAll} className="aspect-[3/4] w-full">
                    <div className="flex flex-col items-center px-1">
                      <span className="mb-2 font-body text-[0.55rem] uppercase tracking-[0.3em] text-terracotta sm:text-[0.65rem]">{c.label}</span>
                      {c.content}
                      <span className="mt-3 font-display text-[0.8rem] italic text-espresso/80 sm:text-base">{c.sub}</span>
                    </div>
                  </ScratchCard>
                  <motion.span
                    initial={false}
                    animate={{ opacity: done[c.key] ? 1 : 0 }}
                    className="mt-2 block h-1 w-8 rounded-full bg-gold mx-auto"
                    aria-hidden="true"
                    transition={{ delay: 0.3 + i * 0.05 }}
                  />
                </div>
              ))}
            </div>

            <AnimatePresence>{allDone && <Burst reduce={reduce} />}</AnimatePresence>
          </Reveal>

          <div className="mt-10 min-h-[170px] text-center" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              {allDone ? (
                <motion.div key="done" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                  <p className="inline-flex items-center gap-2 font-script text-3xl text-gold sm:text-4xl">
                    <Sparkles size={22} aria-hidden="true" /> We are getting married!
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold text-ivory sm:text-3xl">{formatLongDate(wedding.date)}</p>
                  <p className="mt-1 font-body text-sm tracking-wide text-champagne">
                    {formatTime(wedding.date)} · {wedding.venue}, {wedding.city}
                  </p>
                  <a href={ics} download="wedding-save-the-date.ics" className="btn-gold mt-6">
                    <CalendarPlus size={16} aria-hidden="true" /> Add to Calendar
                  </a>
                </motion.div>
              ) : (
                <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="font-display text-lg italic text-champagne">Scratch all three golden cards to reveal our wedding date</p>
                  <button type="button" onClick={() => setForceAll(true)} className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline">
                    <Eye size={15} aria-hidden="true" /> Reveal all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
