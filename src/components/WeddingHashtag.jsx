import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { copyText } from '../utils/format'
import { Mandala, OrnamentDivider } from './art/Decor'
import Reveal from './ui/Reveal'

export default function WeddingHashtag() {
  const reduce = useReducedMotion()
  const { hashtag } = weddingData.wedding
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const onCopy = async () => {
    const ok = await copyText(hashtag)
    setFailed(!ok)
    setCopied(ok)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setCopied(false)
      setFailed(false)
    }, 2600)
  }

  return (
    <section id="hashtag" className="bg-maroon-pattern bg-maroon-rich relative overflow-hidden text-ivory" aria-labelledby="hashtag-title">
      <Mandala className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.13]" spin />
      <Mandala className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 text-gold opacity-[0.2]" />
      <Mandala className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 text-gold opacity-[0.2]" />

      <div className="section-pad relative">
        <Reveal className="container-royal max-w-3xl text-center">
          <p className="font-body text-[0.72rem] uppercase tracking-[0.42em] text-champagne">Share the joy</p>
          <h2 id="hashtag-title" className="mt-3 font-display text-3xl font-medium text-ivory sm:text-4xl">
            Tag your moments with our wedding hashtag
          </h2>
          <OrnamentDivider className="mt-4" />

          <motion.p
            className="gold-text mt-8 break-words font-names text-[clamp(2.3rem,9.5vw,6rem)] font-medium italic leading-[1.15] drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
            animate={reduce ? undefined : { backgroundPosition: ['0% 0', '200% 0'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          >
            {hashtag}
          </motion.p>

          <p className="mx-auto mt-6 max-w-md text-champagne">Post your photos and videos with this hashtag so we can relive every beautiful moment together.</p>

          <div className="relative mt-9 inline-block">
            <button type="button" onClick={onCopy} className="btn-gold !px-8" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span key="ok" className="inline-flex items-center gap-2" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Check size={17} aria-hidden="true" /> Copied!
                  </motion.span>
                ) : (
                  <motion.span key="copy" className="inline-flex items-center gap-2" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Copy size={17} aria-hidden="true" /> Copy Hashtag
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {(copied || failed) && (
                <motion.span
                  role="status"
                  className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-ivory px-4 py-1.5 font-body text-xs font-bold text-maroon shadow-lg"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {failed ? 'Press and hold to copy the text above' : `${hashtag} copied to clipboard`}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
