import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { useScrollLock } from '../hooks/useScrollLock'
import { Mandala } from './art/Decor'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

function VideoModal({ video, onClose }) {
  const closeRef = useRef(null)
  const reduce = useReducedMotion()
  useScrollLock(true)

  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        // keep focus on the dialog's only control
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[90] grid place-items-center p-3 backdrop-blur-sm sm:p-8"
      style={{ backgroundColor: 'rgba(59,33,28,0.92)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl"
        initial={reduce ? false : { scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { scale: 0.92, y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 0.8, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close video" className="absolute -top-12 right-0 grid h-11 w-11 place-items-center rounded-full bg-gold text-maroon transition hover:scale-110">
          <X size={22} />
        </button>
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black" style={{ boxShadow: '0 0 0 2px var(--antique-gold), 0 40px 80px -20px rgba(0,0,0,0.8)' }}>
          {video.youtubeId ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <video className="h-full w-full" src={video.src} poster={video.thumbnail} controls autoPlay playsInline preload="metadata">
              Your browser does not support embedded video.
            </video>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PreWeddingVideo() {
  const { video } = weddingData
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)

  return (
    <section id="video" className="bg-maroon-pattern bg-maroon-rich relative overflow-hidden text-ivory" aria-labelledby="video-title">
      <Mandala className="pointer-events-none absolute -right-48 -top-48 h-[34rem] w-[34rem] text-gold opacity-[0.14]" spin />
      <div className="section-pad">
        <div className="container-royal max-w-5xl">
          <div id="video-title">
            <SectionHeading tone="dark" eyebrow="Our story, on screen" title={video.title} subtitle={video.subtitle} />
          </div>

          <Reveal className="relative mt-12" scale={0.96}>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-label={`Play ${video.title}`}
              className="group relative block w-full overflow-hidden rounded-[28px] bg-maroon p-2 sm:p-3"
              style={{ boxShadow: 'inset 0 0 0 2px var(--antique-gold), 0 40px 80px -30px rgba(0,0,0,0.7)' }}
            >
              <span className="relative block aspect-video overflow-hidden rounded-[20px]">
                <img src={video.thumbnail} alt="The couple hand in hand at sunset" className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]" loading="lazy" decoding="async" width="1600" height="900" />
                <span className="absolute inset-0 bg-gradient-to-t from-maroon/70 via-maroon/10 to-maroon/20" aria-hidden="true" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="relative grid h-20 w-20 place-items-center rounded-full text-maroon transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24" style={{ background: 'linear-gradient(135deg,#EFD9A3,#D4AF6A 55%,#A98343)', boxShadow: '0 0 0 8px rgba(212,175,106,0.28), 0 20px 40px -10px rgba(0,0,0,0.6)' }}>
                    <span className="absolute inset-0 animate-pulse-ring rounded-full" aria-hidden="true" />
                    <Play size={34} fill="currentColor" className="ml-1" aria-hidden="true" />
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-left sm:p-7">
                  <span>
                    <span className="block font-names text-3xl font-medium italic text-gold sm:text-4xl">{weddingData.groom.firstName} &amp; {weddingData.bride.firstName}</span>
                    <span className="block font-body text-[0.65rem] uppercase tracking-[0.34em] text-champagne">The pre-wedding film</span>
                  </span>
                  <span className="hidden rounded-full bg-maroon/80 px-4 py-1.5 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gold sm:block" style={{ boxShadow: 'inset 0 0 0 1px var(--antique-gold)' }}>
                    Watch now
                  </span>
                </span>
              </span>
            </button>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <VideoModal
            video={video}
            onClose={() => {
              setOpen(false)
              triggerRef.current?.focus?.()
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
