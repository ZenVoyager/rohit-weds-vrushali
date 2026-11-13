import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Music, VolumeX } from 'lucide-react'
import { weddingData } from '../config/weddingData'

const { music } = weddingData

/**
 * Looping background music with a floating play/mute toggle.
 * Browsers block autoplay with sound, so App calls `ref.current.start()` from the
 * "open invitation" click — that user gesture is what lets the song begin.
 */
const MusicPlayer = forwardRef(function MusicPlayer({ visible }, ref) {
  const reduce = useReducedMotion()
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [broken, setBroken] = useState(!music?.src)
  // Remembers whether the guest wants music, so we can resume after the tab comes back.
  const wantedRef = useRef(false)

  const play = () => {
    const a = audioRef.current
    if (!a) return
    a.volume = music.volume ?? 0.5
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }

  useImperativeHandle(ref, () => ({
    start() {
      wantedRef.current = true
      play()
    },
  }))

  // Pause while the tab is hidden; resume when the guest returns (if they hadn't muted).
  useEffect(() => {
    const onVis = () => {
      const a = audioRef.current
      if (!a) return
      if (document.hidden) a.pause()
      else if (wantedRef.current) play()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      wantedRef.current = false
      a.pause()
      setPlaying(false)
    } else {
      wantedRef.current = true
      play()
    }
  }

  if (broken) return null

  return (
    <>
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="auto"
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onError={() => setBroken(true)}
      />
      {visible && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Mute music' : 'Play music'}
          aria-pressed={playing}
          className="fixed bottom-4 left-4 z-[60] grid h-12 w-12 place-items-center rounded-full bg-maroon/90 text-gold backdrop-blur transition hover:scale-105"
          style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold), 0 10px 24px -10px rgba(0,0,0,0.6)' }}
        >
          {playing ? (
            <motion.span
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="grid place-items-center"
            >
              <Music size={20} />
            </motion.span>
          ) : (
            <VolumeX size={20} />
          )}
        </button>
      )}
    </>
  )
})

export default MusicPlayer
