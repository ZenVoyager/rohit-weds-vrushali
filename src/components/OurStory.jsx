import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Heart } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { MarigoldBorder, Paisley } from './art/Decor'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

function StoryItem({ item, index }) {
  const left = index % 2 === 0 // image on left on desktop
  return (
    <li className="relative grid gap-5 pl-14 md:grid-cols-2 md:gap-20 md:pl-0">
      {/* node on the line */}
      <span className="absolute left-0 top-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-maroon text-gold md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2" style={{ boxShadow: 'inset 0 0 0 2px var(--antique-gold), 0 0 0 6px var(--soft-cream)' }} aria-hidden="true">
        <Heart size={16} fill="currentColor" />
      </span>

      <Reveal x={left ? -60 : 60} y={20} className={left ? 'md:order-1' : 'md:order-2'} duration={1}>
        <figure className={`relative mx-auto max-w-lg ${left ? 'md:mr-0' : 'md:ml-0'}`}>
          <div className={`rounded-[22px] p-2 ${left ? 'md:-rotate-1' : 'md:rotate-1'}`} style={{ background: 'linear-gradient(150deg,#EFD9A3,#D4AF6A 50%,#A98343)', boxShadow: '0 26px 44px -26px rgba(59,33,28,0.65)' }}>
            <div className="overflow-hidden rounded-[16px] bg-cream">
              <img src={item.image} alt={`Illustration: ${item.title}`} className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.05]" loading="lazy" decoding="async" width="1200" height="900" />
            </div>
          </div>
          <Paisley className={`absolute -bottom-5 hidden h-16 w-10 text-gold md:block ${left ? '-left-6 -scale-x-100' : '-right-6'}`} />
        </figure>
      </Reveal>

      <Reveal x={left ? 60 : -60} y={20} className={`flex flex-col justify-center ${left ? 'md:order-2 md:text-left' : 'md:order-1 md:text-right'}`} duration={1} delay={0.1}>
        <span className={`inline-block self-start rounded-full bg-maroon px-4 py-1.5 font-body text-[0.65rem] font-bold uppercase tracking-[0.28em] text-gold ${left ? '' : 'md:self-end'}`}>
          {item.date}
        </span>
        <h3 className="mt-4 font-heading text-[length:var(--fs-h3)] font-medium text-maroon">{item.title}</h3>
        <p className="mt-3 max-w-md leading-[1.85] text-espresso/90 md:self-auto" style={{ marginLeft: left ? 0 : 'auto' }}>
          {item.text}
        </p>
      </Reveal>
    </li>
  )
}

export default function OurStory() {
  const reduce = useReducedMotion()
  const { story } = weddingData
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 55%'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 })
  const scaleY = useTransform(reduce ? scrollYProgress : smooth, [0, 1], [0, 1])

  return (
    <section id="story" className="bg-paper-cream relative overflow-hidden" aria-labelledby="story-title">
      <MarigoldBorder className="absolute inset-x-0 top-0 z-10" />
      <div className="section-pad pt-24 md:pt-32">
        <div className="container-royal max-w-5xl">
          <div id="story-title">
            <SectionHeading eyebrow="How it began" title="Our Love Story" subtitle="From a rooftop hello to the seven sacred steps — the moments that brought us here." />
          </div>

          <ol ref={listRef} className="relative mt-16 space-y-16 md:space-y-24">
            {/* line track + animated fill */}
            <span className="absolute bottom-0 left-[21px] top-0 w-[2px] bg-gold/25 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
            <motion.span className="absolute bottom-0 left-[21px] top-0 w-[2px] origin-top bg-gradient-to-b from-gold via-terracotta to-burgundy md:left-1/2 md:-translate-x-1/2" style={{ scaleY }} aria-hidden="true" />
            {story.map((item, i) => (
              <StoryItem key={item.title} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
