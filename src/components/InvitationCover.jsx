import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { asset } from '../utils/asset'
import { formatLongDate, parseLocal, monthName } from '../utils/format'
import { Mandala } from './art/Decor'
import FallingPetals from './FallingPetals'

const DOOR_EASE = [0.76, 0, 0.24, 1]

/** One half of the palace gate. Jaali pattern, gold frame and studs. */
function GatePanel({ side, reduce }) {
  const left = side === 'left'
  return (
    <motion.div
      className={`absolute inset-y-0 ${left ? 'left-0' : 'right-0'} w-1/2 bg-maroon-pattern`}
      initial={false}
      exit={reduce ? { opacity: 0, transition: { duration: 0.5 } } : { x: left ? '-101%' : '101%', transition: { duration: 1.5, ease: DOOR_EASE, delay: 0.25 } }}
      style={{ boxShadow: left ? 'inset -2px 0 0 var(--antique-gold)' : 'inset 2px 0 0 var(--antique-gold)' }}
    >
      {/* inner gold frame */}
      <div
        className={`absolute inset-3 sm:inset-5 ${left ? 'rounded-l-[40px]' : 'rounded-r-[40px]'} border`}
        style={{ borderColor: 'rgba(212,175,106,0.75)', borderWidth: 1.5, [left ? 'borderRight' : 'borderLeft']: 'none' }}
      />
      <div
        className={`absolute inset-6 sm:inset-9 ${left ? 'rounded-l-[30px]' : 'rounded-r-[30px]'} border`}
        style={{ borderColor: 'rgba(212,175,106,0.35)', [left ? 'borderRight' : 'borderLeft']: 'none' }}
      />
      {/* studs */}
      <div className={`absolute inset-y-0 ${left ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} flex flex-col justify-around py-10`} aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="block h-2 w-2 rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, #EFD9A3, #D4AF6A 60%, #A98343)' }} />
        ))}
      </div>
      {/* half mandala at the seam */}
      <Mandala
        className={`absolute top-1/2 h-[120vmin] w-[120vmin] -translate-y-1/2 text-gold opacity-[0.16] ${left ? 'left-full -translate-x-1/2' : 'right-full translate-x-1/2'}`}
      />
    </motion.div>
  )
}

function Gate({ onOpen }) {
  const reduce = useReducedMotion()
  const btnRef = useRef(null)
  const { groom, bride, wedding } = weddingData
  const d = parseLocal(wedding.date)

  useEffect(() => {
    btnRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <motion.div
      key="gate"
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation. Open the invitation to continue."
      className="fixed inset-0 z-[100] overflow-hidden"
      exit={{ opacity: 1, transition: { duration: reduce ? 0.5 : 1.8 } }}
    >
      <GatePanel side="left" reduce={reduce} />
      <GatePanel side="right" reduce={reduce} />

      <motion.div
        className="relative z-10 grid h-full place-items-center px-3 text-center"
        exit={{ opacity: 0, scale: reduce ? 1 : 1.12, transition: { duration: 0.55 } }}
      >
        <div
          className="bg-maroon-pattern relative flex max-h-[96svh] w-full max-w-[34rem] flex-col items-center rounded-t-[999px] rounded-b-[36px] px-6 pb-9 pt-14 sm:px-12 sm:pt-20"
          style={{ boxShadow: 'inset 0 0 0 2px var(--antique-gold), inset 0 0 0 9px var(--royal-maroon), inset 0 0 0 10px rgba(212,175,106,0.55), 0 30px 80px -20px rgba(0,0,0,0.65)' }}
        >
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="font-deva text-[0.95rem] text-gold sm:text-lg">
          {weddingData.invitation.ganeshNamah}
        </motion.div>

        {/* monogram medallion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
          className="relative mt-6 grid h-36 w-36 place-items-center rounded-full sm:h-44 sm:w-44"
          style={{ boxShadow: 'inset 0 0 0 2px var(--antique-gold), 0 0 0 7px rgba(212,175,106,0.25), 0 0 60px rgba(212,175,106,0.25)' }}
        >
          <Mandala spin className="absolute inset-1 text-gold opacity-60" />
          <span className="gold-text font-names text-5xl font-medium italic leading-none sm:text-6xl">
            {groom.firstName[0]}
            <span className="mx-1 text-3xl text-ivory/90">&amp;</span>
            {bride.firstName[0]}
          </span>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="mt-8 font-body text-[0.7rem] uppercase tracking-[0.42em] text-champagne sm:text-xs">
          The Wedding of
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 1 }}
          className="mt-3 font-names text-[clamp(2.4rem,9.5vw,4.4rem)] font-medium italic leading-[1.05] text-ivory"
        >
          {groom.firstName} <span className="text-gold">&amp;</span> {bride.firstName}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="mt-3 font-display text-lg italic text-champagne sm:text-xl">
          {d.getDate()} {monthName(d)} {d.getFullYear()} · {wedding.venue}
        </motion.p>

        <motion.button
          ref={btnRef}
          type="button"
          onClick={onOpen}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.9 }}
          whileTap={{ scale: 0.96 }}
          className="btn-gold mt-10 animate-pulse-ring !px-9 !py-4"
        >
          <Sparkles size={16} aria-hidden="true" />
          Open Invitation
        </motion.button>
        <p className="mt-5 font-body text-[0.68rem] uppercase tracking-[0.3em] text-champagne/70">Tap to unseal</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function InvitationCover({ opened, onOpen }) {
  const reduce = useReducedMotion()
  const { groom, bride, wedding, invitation } = weddingData

  return (
    <>
      <AnimatePresence>{!opened && <Gate onOpen={onOpen} />}</AnimatePresence>

      <section id="top" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-maroon text-ivory" aria-label="Invitation cover">
        <motion.picture
          className="absolute inset-0 block"
          initial={false}
          animate={opened && !reduce ? { scale: 1 } : { scale: reduce ? 1 : 1.14 }}
          transition={{ duration: 2.8, ease: [0.22, 0.8, 0.3, 1] }}
        >
          <source media="(max-width: 767px)" srcSet={asset('/images/cover-bg-mobile.svg')} />
          <img src={asset('/images/cover-bg.svg')} alt="A palace glowing with golden lights under a night sky, hung with marigold garlands" className="h-full w-full object-cover object-bottom" fetchPriority="high" width="1920" height="1080" />
        </motion.picture>
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/60 via-transparent to-maroon/30" aria-hidden="true" />
        {opened && <FallingPetals count={12} />}

        <div className="relative z-10 flex h-full flex-col items-center px-6 pt-[15svh] text-center md:pt-[11svh]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={opened ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 1 }}
            className="font-deva text-base text-gold sm:text-xl"
          >
            {invitation.ganeshNamah}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={opened ? { opacity: 1 } : {}}
            transition={{ delay: 1.1, duration: 1 }}
            className="mt-5 font-body text-[0.7rem] uppercase tracking-[0.42em] text-champagne sm:text-xs"
          >
            Together with their families
          </motion.p>

          <h2 className="mt-3 text-ivory">
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={opened ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 0.8, 0.3, 1] }}
              className="gold-text block font-names text-[length:var(--fs-hero)] font-medium italic leading-[1] drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
            >
              {groom.firstName}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={opened ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.6, duration: 0.9 }}
              className="block font-display text-2xl italic text-champagne sm:text-3xl"
            >
              weds
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={opened ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8, duration: 1.2, ease: [0.22, 0.8, 0.3, 1] }}
              className="gold-text block font-names text-[length:var(--fs-hero)] font-medium italic leading-[1] drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
            >
              {bride.firstName}
            </motion.span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={opened ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.3, duration: 1 }}
            className="mt-6 inline-flex flex-col items-center gap-1 rounded-full border border-gold/60 bg-maroon/55 px-7 py-3 backdrop-blur-[2px]"
          >
            <span className="font-display text-lg tracking-wide text-ivory sm:text-xl">{formatLongDate(wedding.date)}</span>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.34em] text-gold">
              {wedding.venue} · {wedding.city}
            </span>
          </motion.div>
        </div>

        <a
          href="#welcome"
          className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 rounded-full bg-maroon/80 px-5 py-2.5 font-body text-[0.6rem] uppercase tracking-[0.34em] text-champagne backdrop-blur-sm"
          aria-label="Scroll to the invitation"
        >
          {/* left padding = letter-spacing, so the word is optically centred */}
          <span className="pl-[0.34em]">Scroll</span>
          <span className="relative block h-7 w-[18px] rounded-full border-[1.5px] border-gold/80">
            <span className="absolute inset-x-0 top-1.5 mx-auto block h-1.5 w-1.5 animate-scroll-dot rounded-full bg-gold" />
          </span>
        </a>
      </section>
    </>
  )
}
