import { CalendarPlus, Clock, Crown, Flower2, Gem, MapPin, Music, Navigation, Shirt, Sun, Wine } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { calendarUrl, formatLongDate, formatTime, mapsDirectionsUrl, monthName, parseLocal } from '../utils/format'
import { MarigoldBorder } from './art/Decor'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const ICONS = { engagement: Gem, haldi: Sun, sangeet: Music, pehnawa: Crown, reception: Wine }

function EventCard({ event, index, dayNumber }) {
  const { wedding } = weddingData
  const Icon = ICONS[event.id] ?? Flower2
  const d = parseLocal(`${event.date}T${event.time}:00`)
  const flip = index % 2 === 1
  const destination = wedding.mapUrl || mapsDirectionsUrl(`${event.venue}, ${wedding.address || wedding.city}`)
  const ics = calendarUrl({
    title: `${event.name} – ${weddingData.groom.firstName} & ${weddingData.bride.firstName}`,
    start: d,
    end: new Date(d.getTime() + 3 * 3600 * 1000),
    location: `${event.venue}, ${wedding.city}`,
    description: event.description,
  })
  const isMain = Boolean(event.main)

  return (
    <Reveal as="article" y={44} className="relative" aria-labelledby={`ev-${event.id}`}>
      <div
        className={`overflow-hidden rounded-[28px] ${isMain ? 'bg-maroon text-ivory' : 'bg-cream text-espresso'} md:grid md:grid-cols-2`}
        style={{ boxShadow: `inset 0 0 0 1.5px var(--antique-gold), 0 30px 60px -34px rgba(59,33,28,0.6)` }}
      >
        {/* image */}
        <div className={`relative aspect-[4/3] md:aspect-auto md:min-h-[420px] ${flip ? 'md:order-2' : ''}`}>
          <img src={event.image} alt={`Illustration for the ${event.name} ceremony`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" width="1200" height="900" />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon/55 via-transparent to-transparent" aria-hidden="true" />
          {/* date badge */}
          <div className="absolute left-4 top-4 flex flex-col items-center rounded-2xl bg-ivory/95 px-4 py-2.5 text-maroon backdrop-blur-sm sm:left-6 sm:top-6" style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold)' }}>
            <span className="font-display text-4xl font-bold leading-none">{d.getDate()}</span>
            <span className="mt-1 font-body text-[0.62rem] font-bold uppercase tracking-[0.28em]">{monthName(d).slice(0, 3)}</span>
          </div>
          <span className="absolute bottom-4 left-4 rounded-full bg-maroon/85 px-4 py-1.5 font-body text-[0.62rem] font-bold uppercase tracking-[0.3em] text-gold sm:bottom-6 sm:left-6" style={{ boxShadow: 'inset 0 0 0 1px var(--antique-gold)' }}>
            Day {dayNumber}
          </span>
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

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={destination} target="_blank" rel="noopener noreferrer" className={isMain ? 'btn-gold' : 'btn-royal'}>
              <Navigation size={15} aria-hidden="true" /> Get Directions
            </a>
            <a href={ics} download={`${event.id}.ics`} className={`btn-ghost ${isMain ? '!text-gold hover:!text-maroon hover:!bg-gold' : ''}`}>
              <CalendarPlus size={15} aria-hidden="true" /> Add to Calendar
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function WeddingEvents() {
  const { events } = weddingData
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
        </div>
      </div>
    </section>
  )
}
