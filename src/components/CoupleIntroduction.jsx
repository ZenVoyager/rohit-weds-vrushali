import { motion, useReducedMotion } from 'framer-motion'
import { weddingData } from '../config/weddingData'
import { formatLongDate, formatTime } from '../utils/format'
import { withBase } from '../utils/asset'
import { Mandala, MarigoldBorder, OrnamentDivider, RoyalFrame } from './art/Decor'
import Reveal from './ui/Reveal'

export default function CoupleIntroduction() {
  const reduce = useReducedMotion()
  const { groom, bride, wedding, invitation } = weddingData

  return (
    <section id="welcome" className="bg-paper relative overflow-hidden" aria-labelledby="welcome-title">
      <MarigoldBorder className="absolute inset-x-0 top-0 z-10" />
      <Mandala className="pointer-events-none absolute -left-40 top-24 h-[28rem] w-[28rem] text-gold opacity-[0.18]" spin />
      <Mandala className="pointer-events-none absolute -right-40 bottom-10 h-[30rem] w-[30rem] text-gold opacity-[0.16]" spin />

      <div className="section-pad relative pt-24 md:pt-32">
        <div className="container-royal max-w-4xl">
          <Reveal scale={0.97}>
            <RoyalFrame innerClassName="px-6 pb-14 pt-12 text-center sm:px-14 md:pb-16 md:pt-14">
              <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="relative mx-auto w-fit">
                  <span className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'rgba(212,175,106,0.28)', boxShadow: '0 0 70px 50px rgba(212,175,106,0.28)' }} aria-hidden="true" />
                  <Mandala className="pointer-events-none absolute left-1/2 top-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 text-gold opacity-40" spin />
                  <img src={withBase('/images/ganesh-photo.png')} alt="Lord Ganesha" className="relative mx-auto h-72 w-auto drop-shadow-[0_14px_22px_rgba(59,33,28,0.35)] sm:h-96" />
                </div>
              </motion.div>

              <p className="mt-6 font-deva text-xl font-semibold text-maroon sm:text-2xl">{invitation.ganeshNamah}</p>
              <div className="mx-auto mt-4 max-w-xl font-deva text-lg leading-[1.9] text-burgundy sm:text-xl" lang="sa">
                {invitation.shloka.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <p className="mx-auto mt-3 max-w-md font-display text-[1.05rem] italic leading-snug text-espresso/80">“{invitation.shlokaMeaning}”</p>

              <OrnamentDivider className="my-8" />

              <p className="font-body text-[0.72rem] uppercase tracking-[0.36em] text-terracotta">{invitation.greeting}</p>
              <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-[1.9] text-espresso">{invitation.message}</p>

              <h2 id="welcome-title" className="mt-9 flex flex-col items-center gap-1 text-maroon">
                <span className="font-names text-[length:clamp(2.8rem,8.5vw,4.8rem)] font-semibold italic leading-none">{groom.name}</span>
                <span className="font-display text-3xl italic text-gold">&amp;</span>
                <span className="font-names text-[length:clamp(2.8rem,8.5vw,4.8rem)] font-semibold italic leading-none">{bride.name}</span>
              </h2>

              <div className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-8">
                <div>
                  <p className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-terracotta">Son of</p>
                  <p className="mt-1 font-heading text-lg text-maroon">{groom.parents}</p>
                </div>
                <span className="mx-auto hidden w-px bg-gold/70 sm:block" aria-hidden="true" />
                <span className="mx-auto block h-px w-24 bg-gold/70 sm:hidden" aria-hidden="true" />
                <div>
                  <p className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-terracotta">Daughter of</p>
                  <p className="mt-1 font-heading text-lg text-maroon">{bride.parents}</p>
                </div>
              </div>

              <div className="mx-auto mt-10 max-w-md rounded-2xl border border-gold/60 bg-champagne/45 px-6 py-5">
                <p className="font-display text-xl font-semibold text-maroon">{formatLongDate(wedding.date)}</p>
                <p className="mt-1 font-body text-sm tracking-wide text-espresso/80">
                  {formatTime(wedding.date)} onwards · {wedding.venue}, {wedding.city}
                </p>
              </div>

              <p className="mt-8 font-script text-3xl text-terracotta sm:text-4xl">{invitation.withBlessings}</p>
            </RoyalFrame>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
