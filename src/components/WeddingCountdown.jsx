import { memo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { weddingData } from '../config/weddingData'
import { asset } from '../utils/asset'
import { useCountdown } from '../hooks/useCountdown'
import { formatLongDate, formatTime } from '../utils/format'
import { Mandala, OrnamentDivider } from './art/Decor'
import Reveal from './ui/Reveal'

const Digit = memo(function Digit({ value, label }) {
  const reduce = useReducedMotion()
  const text = String(value).padStart(2, '0')
  return (
    <div className="text-center">
      <div
        className="relative mx-auto grid h-[4.9rem] w-[3.8rem] place-items-center min-[370px]:h-[5.6rem] min-[370px]:w-[4.4rem] overflow-hidden rounded-2xl bg-ivory sm:h-32 sm:w-28 md:h-36 md:w-32"
        style={{ boxShadow: 'inset 0 0 0 2px var(--antique-gold), 0 0 0 5px rgba(212,175,106,0.25), 0 24px 40px -20px rgba(0,0,0,0.65)' }}
      >
        <span className="absolute inset-x-0 top-1/2 h-px bg-gold/50" aria-hidden="true" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="font-display text-[2.2rem] font-semibold leading-none tabular-nums min-[370px]:text-[2.6rem] text-maroon sm:text-6xl md:text-7xl"
            initial={reduce ? false : { y: '-70%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: '70%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.8, 0.3, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="mt-3 font-body text-[0.58rem] font-bold uppercase tracking-[0.22em] text-champagne min-[370px]:text-[0.62rem] min-[370px]:tracking-[0.3em] sm:text-xs">{label}</p>
    </div>
  )
})

export default function WeddingCountdown() {
  const { wedding, groom, bride } = weddingData
  const { days, hours, minutes, seconds, expired } = useCountdown(wedding.date)

  return (
    <section id="countdown" className="bg-maroon-rich relative overflow-hidden text-ivory" style={{ background: 'linear-gradient(180deg, var(--wedding-burgundy), var(--royal-maroon))' }} aria-labelledby="countdown-title">
      <div className="absolute inset-0 opacity-70" style={{ backgroundImage: `url('${asset('/images/pattern-jaali-gold.svg')}')`, backgroundSize: '160px 160px' }} aria-hidden="true" />
      <Mandala className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] max-w-[1000px] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.12]" spin />
      <div className="section-pad relative">
        <Reveal className="container-royal max-w-4xl text-center">
          <p className="font-script text-3xl text-gold md:text-4xl">{expired ? 'Happily ever after' : 'Counting every moment'}</p>
          <h2 id="countdown-title" className="mt-1 text-[length:var(--fs-h2)] font-semibold text-ivory">
            {expired ? 'The celebrations have begun' : 'Until We Say “I Do”'}
          </h2>
          <OrnamentDivider className="mt-4" />

          {expired ? (
            <div className="mt-10">
              <p className="gold-text font-names text-[clamp(2.6rem,9vw,5rem)] font-medium italic leading-tight">
                {groom.firstName} &amp; {bride.firstName}
              </p>
              <p className="mx-auto mt-4 max-w-md text-champagne">Thank you for being part of our celebration. We are so grateful for your blessings!</p>
            </div>
          ) : (
            <div className="mt-12 flex justify-center gap-2.5 min-[370px]:gap-3 sm:gap-6" role="timer" aria-live="off" aria-label={`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds until the wedding`}>
              <Digit value={days} label="Days" />
              <Digit value={hours} label="Hours" />
              <Digit value={minutes} label="Minutes" />
              <Digit value={seconds} label="Seconds" />
            </div>
          )}

          <p className="mt-12 font-display text-xl italic text-champagne sm:text-2xl">
            {formatLongDate(wedding.date)} · <span className="whitespace-nowrap">{formatTime(wedding.date)}</span>
          </p>
          <p className="mt-1 font-body text-[0.7rem] uppercase tracking-[0.34em] text-gold">
            {wedding.venue}, {wedding.city}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
