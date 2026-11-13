import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { useScrollLock } from '../hooks/useScrollLock'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const SWIPE_DISTANCE = 70
const SWIPE_VELOCITY = 450

function Lightbox({ items, index, onClose, onChange }) {
  const reduce = useReducedMotion()
  const [direction, setDirection] = useState(0)
  const closeRef = useRef(null)
  useScrollLock(true)

  const go = useCallback(
    (step) => {
      setDirection(step)
      onChange((index + step + items.length) % items.length)
    },
    [index, items.length, onChange],
  )

  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus()
    return () => previous?.focus?.()
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // warm the cache for neighbours
  useEffect(() => {
    ;[1, -1].forEach((s) => {
      const img = new Image()
      img.src = items[(index + s + items.length) % items.length].src
    })
  }, [index, items])

  const item = items[index]
  const variants = {
    enter: (d) => ({ x: reduce ? 0 : d > 0 ? 120 : -120, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: reduce ? 0 : d > 0 ? -120 : 120, opacity: 0, scale: 0.97 }),
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      className="fixed inset-0 z-[95] flex flex-col"
      style={{ backgroundColor: 'rgba(59,33,28,0.96)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-ivory sm:px-8">
        <p className="font-body text-sm tracking-[0.2em]" aria-live="polite">
          {index + 1} <span className="text-gold">/</span> {items.length}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close gallery" className="grid h-11 w-11 place-items-center rounded-full bg-gold text-maroon transition hover:scale-110">
          <X size={22} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 sm:px-16" onClick={onClose}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={item.src}
            src={item.src}
            alt={item.alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.22, 0.8, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1)
              else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1)
            }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
            className="max-h-full max-w-full cursor-grab select-none rounded-xl object-contain active:cursor-grabbing"
            style={{ boxShadow: '0 0 0 2px var(--antique-gold), 0 30px 80px -10px rgba(0,0,0,0.7)', touchAction: 'pan-y' }}
          />
        </AnimatePresence>

        <button type="button" onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous photo" className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-maroon/80 text-gold transition hover:bg-maroon sm:grid" style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold)' }}>
          <ChevronLeft size={26} />
        </button>
        <button type="button" onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next photo" className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-maroon/80 text-gold transition hover:bg-maroon sm:grid" style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold)' }}>
          <ChevronRight size={26} />
        </button>
      </div>

      <div className="px-4 pb-5 pt-3 text-center sm:px-8">
        <p className="mx-auto max-w-xl font-display text-lg italic text-champagne">{item.alt}</p>
        <div className="mt-3 flex items-center justify-center gap-3 sm:hidden">
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="grid h-11 w-11 place-items-center rounded-full bg-maroon text-gold" style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold)' }}>
            <ChevronLeft size={22} />
          </button>
          <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-champagne/70">Swipe to browse</span>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className="grid h-11 w-11 place-items-center rounded-full bg-maroon text-gold" style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold)' }}>
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function PhotoGallery() {
  const { gallery } = weddingData
  const [active, setActive] = useState(null)
  const lastTrigger = useRef(null)

  const close = useCallback(() => {
    setActive(null)
    lastTrigger.current?.focus?.()
  }, [])

  return (
    <section id="gallery" className="bg-paper-cream relative overflow-hidden" aria-labelledby="gallery-title">
      <div className="section-pad">
        <div className="container-royal">
          <div id="gallery-title">
            <SectionHeading eyebrow="Glimpses of us" title="Photo Gallery" subtitle="A few frames from our journey. Tap any photo to view it full screen." />
          </div>

          <div className="mt-14 columns-2 gap-3 sm:gap-5 lg:columns-3">
            {gallery.map((img, i) => (
              <Reveal key={img.src} y={30} delay={(i % 3) * 0.08} className="mb-3 break-inside-avoid sm:mb-5">
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget
                    setActive(i)
                  }}
                  aria-label={`Open photo: ${img.alt}`}
                  className="group relative block w-full overflow-hidden rounded-2xl bg-champagne p-[5px]"
                  style={{ background: 'linear-gradient(150deg,#EFD9A3,#D4AF6A 50%,#A98343)', boxShadow: '0 20px 36px -24px rgba(59,33,28,0.7)' }}
                >
                  <span className="relative block overflow-hidden rounded-[12px]" style={{ aspectRatio: img.ratio }}>
                    <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.1]" />
                    <span className="absolute inset-0 grid place-items-center bg-maroon/0 transition duration-500 group-hover:bg-maroon/45 group-focus-visible:bg-maroon/45">
                      <span className="grid h-12 w-12 scale-75 place-items-center rounded-full bg-gold/95 text-maroon opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                        <Expand size={20} aria-hidden="true" />
                      </span>
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{active !== null && <Lightbox items={gallery} index={active} onChange={setActive} onClose={close} />}</AnimatePresence>
    </section>
  )
}
