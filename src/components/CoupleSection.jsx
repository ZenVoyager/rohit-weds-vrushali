import { Heart } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { Mandala, OrnamentDivider, Paisley } from './art/Decor'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

function Profile({ person, role, side }) {
  const fromLeft = side === 'left'
  return (
    <Reveal x={fromLeft ? -50 : 50} y={20} className="relative mx-auto w-full max-w-md" duration={1.1}>
      <article className="text-center" aria-label={`${role}: ${person.name}`}>
        <div className="relative mx-auto w-[82%] max-w-[330px]">
          <Mandala className="pointer-events-none absolute -inset-10 -z-0 text-gold opacity-40" spin />
          {/* outer arch ring */}
          <div className="relative rounded-t-[999px] rounded-b-[26px] p-[7px]" style={{ background: 'linear-gradient(160deg,#EFD9A3,#D4AF6A 50%,#A98343)', boxShadow: '0 28px 50px -24px rgba(59,33,28,0.6)' }}>
            <div className="rounded-t-[999px] rounded-b-[20px] bg-cream p-[6px]">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-[16px]">
                <img
                  src={person.image}
                  alt={`Portrait of ${person.name}, the ${role.toLowerCase()}`}
                  className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-out hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="1000"
                />
              </div>
            </div>
          </div>
          <Paisley className={`absolute -bottom-2 ${fromLeft ? '-left-9 -scale-x-100' : '-right-9'} h-20 w-12 text-gold`} />
          <span className="absolute -right-3 top-[18%] grid h-12 w-12 place-items-center rounded-full bg-maroon text-gold shadow-lg animate-floaty" style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold)' }} aria-hidden="true">
            <Heart size={18} fill="currentColor" />
          </span>
        </div>

        <p className="mt-9 font-body text-[0.7rem] uppercase tracking-[0.4em] text-terracotta">{role}</p>
        <h3 className="mt-1 font-names text-[length:clamp(2.6rem,7vw,3.6rem)] font-semibold italic leading-tight text-maroon">{person.name}</h3>
        <p className="mx-auto mt-3 max-w-xs font-display text-[1.2rem] italic leading-snug text-espresso/90">“{person.description}”</p>
        <OrnamentDivider className="my-5 !h-6 !w-44" />
        <ul className="mx-auto max-w-xs space-y-1.5 text-[0.95rem] text-espresso/90">
          {person.family.map((f) => (
            <li key={f} className="flex items-start justify-center gap-2">
              <span className="mt-[0.55rem] block h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  )
}

export default function CoupleSection() {
  const { groom, bride } = weddingData
  return (
    <section id="couple" className="bg-paper-cream relative overflow-hidden" aria-labelledby="couple-title">
      <div className="section-pad">
        <div className="container-royal">
          <div id="couple-title">
            <SectionHeading eyebrow="Meet the" title="Bride & Groom" subtitle="Two hearts, two families, one beautiful beginning." />
          </div>
          <div className="mt-16 grid items-start gap-20 md:grid-cols-2 md:gap-10 lg:gap-20">
            <Profile person={groom} role="The Groom" side="left" />
            <Profile person={bride} role="The Bride" side="right" />
          </div>
        </div>
      </div>
    </section>
  )
}
