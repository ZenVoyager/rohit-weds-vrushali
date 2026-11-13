import { Info, MapPin, Navigation, Phone, Star } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { mapsDirectionsUrl, telHref } from '../utils/format'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Accommodation() {
  const { stay } = weddingData
  if (!stay?.length) return null
  return (
    <section id="stay" className="bg-paper relative overflow-hidden" aria-labelledby="stay-title">
      <div className="section-pad">
        <div className="container-royal">
          <div id="stay-title">
            <SectionHeading eyebrow="Stay with us" title="Where to Stay" subtitle="We have arranged special rates at these hotels for our guests. Please mention our family name while booking." />
          </div>

          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            {stay.map((hotel, i) => (
              <Reveal as="li" key={hotel.name} delay={i * 0.12} y={40} className="flex">
                <article className="flex w-full flex-col overflow-hidden rounded-[24px] bg-cream" style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold), 0 28px 50px -30px rgba(59,33,28,0.6)' }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={hotel.image} alt={`Illustration of ${hotel.name}`} className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.07]" loading="lazy" decoding="async" width="1200" height="900" />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-maroon/90 px-3 py-1 text-gold" style={{ boxShadow: 'inset 0 0 0 1px var(--antique-gold)' }} aria-label={`${hotel.stars} star hotel`}>
                      {Array.from({ length: hotel.stars }).map((_, s) => (
                        <Star key={s} size={11} fill="currentColor" aria-hidden="true" />
                      ))}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-heading text-[1.45rem] font-medium leading-tight text-maroon">{hotel.name}</h3>
                    <p className="mt-1 font-body text-[0.68rem] font-bold uppercase tracking-[0.22em] text-terracotta">{hotel.distance}</p>
                    <ul className="mt-4 space-y-2.5 text-[0.93rem] text-espresso/90">
                      <li className="flex gap-2.5">
                        <MapPin size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                        <span>{hotel.address}</span>
                      </li>
                      <li className="flex gap-2.5">
                        <Phone size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                        <a href={telHref(hotel.phone)} className="underline-offset-4 hover:text-maroon hover:underline">
                          {hotel.phone.replace(/^(\+91)(\d{3,4})(\d+)$/, '$1 $2 $3')}
                        </a>
                      </li>
                      <li className="flex gap-2.5 italic">
                        <Info size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                        <span>{hotel.note}</span>
                      </li>
                    </ul>
                    <a href={mapsDirectionsUrl(hotel.mapQuery || hotel.name)} target="_blank" rel="noopener noreferrer" className="btn-royal mt-6 w-full !tracking-[0.16em]">
                      <Navigation size={15} aria-hidden="true" /> Directions
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
