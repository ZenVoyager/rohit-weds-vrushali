import { Clock, Crown, Flower2, Gem, MapPin, Music, Navigation, Shirt, Sun, Wine } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { formatLongDate, formatTime, mapsDirectionsUrl, monthName, parseLocal } from '../utils/format'
import { MarigoldBorder } from './art/Decor'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const ICONS = { engagement: Gem, haldi: Sun, sangeet: Music, pehnawa: Crown, reception: Wine }

function EventCard({ event, index, dayNumber }) {
  const { wedding } = weddingData
  const Icon = ICONS[event.id] ?? Flower2
  const d = parseLocal(`${event.date}T${event.time}:00`)
  const flip = index % 2 === 1
  const isMain = Boolean(event.main)

  return (
    <Reveal as="article" y={44} className="relative" aria-labelledby={`ev-${event.id}`}>
      <div
        className={`overflow-hidden rounded-[28px] ${isMain ? 'bg-maroon text-ivory' : 'bg-cream text-espresso'} md:grid md:grid-cols-2`}
        style={{ boxShadow: `inset 0 0 0 1.5px var(--antique-gold), 0 30px 60px -34px rgba(59,33,28,0.6)` }}
      >
        {/* image */}
        <div className={`relative aspect-[4/3] md:aspect-auto md:min-h-[420px] ${flip ? 'md:order-2' : ''}`}>
          <img src={event.image} alt={event.imageAlt || `Illustration for the ${event.name} ceremony`} className="absolute inset-0 h-full w-full object-cover" style={event.imagePosition ? { objectPosition: event.imagePosition } : undefined} loading="lazy" decoding="async" width="1200" height="900" />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon/55 via-transparent to-transparent" aria-hidden="true" />
          {/* date badge */}
          <div className="absolute left-4 top-4 flex flex-col items-center rounded-2xl bg-ivory/95 px-4 py-2.5 text-maroon backdrop-blur-sm sm:left-6 sm:top-6" style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold)' }}>
            <span className="font-display text-4xl font-bold leading-none">{d.getDate()}</span>
            <span className="mt-1 font-body text-[0.62rem] font-bold uppercase tracking-[0.28em]">{monthName(d).slice(0, 3)}</span>
          </div>
          <span className="absolute bottom-4 left-4 rounded-full bg-maroon/85 px-4 py-1.5 font-body text-[0.62rem] font-bold uppercase tracking-[0.3em] text-gold sm:bottom-6 sm:left-6" style={{ boxShadow: 'inset 0 0 0 1px var(--antique-gold)' }}>
            Day {dayNumber}
          </span>
          {/* photo credit, required by the image's Creative Commons licence */}
          {event.credit && (
            <a
              href={event.credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-1.5 right-2.5 font-body text-[0.55rem] text-ivory/75 underline-offset-2 drop-shadow hover:text-ivory hover:underline sm:bottom-2 sm:right-3"
            >
              Photo: {event.credit.author} · {event.credit.license}
            </a>
          )}
        </div>

        {/* content */}
        <div className="flex flex-col justify-center px-6 py-9 sm:px-10 md:px-12 md:py-12">
          <span className={`grid h-12 w-12 place-items-center rounded-full ${isMain ? 'bg-gold/15 text-gold' : 'bg-champagne text-maroon'}`} style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold)' }} aria-hidden="true">
            <Icon size={22} />
          </span>
          <h3 id={`ev-${event.id}`} className={`mt-4 font-heading text-[length:var(--fs-h3)] font-medium ${isMain ? 'text-ivory' : 'text-maroon'}`}>
            {event.name}
          </h3>
          <p className={`mt-3 leading-relaxed ${isMain ? 'text-champagne' : 'text-espresso/85'}`}>{event.description}</p>

          <dl className="mt-6 space-y-3 text-[0.97rem]">
            <div className="flex items-start gap-3">
              <dt className="sr-only">Date and time</dt>
              <Clock size={18} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
              <dd>
                <span className="font-semibold">{formatLongDate(event.date)}</span>
                <br />
                <span className={isMain ? 'text-champagne' : 'text-espresso/80'}>{formatTime(event.time)}{event.onwards ? ' onwards' : ''}</span>
              </dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="sr-only">Venue</dt>
              <MapPin size={18} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
              <dd>
                <span className="font-semibold">{event.venue}</span>
                <br />
                <span className={isMain ? 'text-champagne' : 'text-espresso/80'}>
                  {event.area ? `${event.area}, ` : ''}{wedding.city}
                </span>
              </dd>
            </div>
            {event.dress && (
              <div className="flex items-start gap-3">
                <dt className="sr-only">Dress code</dt>
                <Shirt size={18} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                <dd className={isMain ? 'text-champagne' : 'text-espresso/80'}>
                  <span className="font-semibold">Dress code:</span> {event.dress}
                </dd>
              </div>
            )}
          </dl>

        </div>
      </div>
    </Reveal>
  )
}

export default function WeddingEvents() {
  const { events, wedding } = weddingData
  // every event is at the same venue, so one directions button serves them all
  const destination = wedding.mapUrl || mapsDirectionsUrl(`${wedding.venue}, ${wedding.address || wedding.city}`)
  const days = [...new Set(events.map((e) => e.date))].sort()
  return (
    <section id="events" className="bg-paper relative overflow-hidden" aria-labelledby="events-title">
      <MarigoldBorder className="absolute inset-x-0 top-0 z-10" />
      <div className="section-pad pt-24 md:pt-32">
        <div className="container-royal max-w-5xl">
          <div id="events-title">
            <SectionHeading eyebrow="Celebrate with us" title="Wedding Events" subtitle={`${events.length} celebrations across ${days.length} days of colour, music and blessings. We would be honoured to share each one with you.`} />
          </div>
          <div className="mt-14 space-y-10 md:space-y-14">
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} dayNumber={days.indexOf(event.date) + 1} />
            ))}
          </div>
          <div className="mt-12 text-center md:mt-14">
            <p className="font-body text-sm text-espresso/80">
              All celebrations are at <span className="font-semibold text-maroon">{wedding.venue}, {wedding.city}</span>
            </p>
            <a href={destination} target="_blank" rel="noopener noreferrer" className="btn-royal mt-4">
              <Navigation size={15} aria-hidden="true" /> Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
