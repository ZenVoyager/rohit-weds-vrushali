import { useCallback, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BedDouble, Car, CheckCircle2, Heart, Loader2, Mail, Minus, Plus, Send, User, Utensils } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { formatLongDate, formatShortDate, parseLocal } from '../utils/format'
import { prepareRsvp } from '../utils/submitRsvp'
import { OrnamentDivider, RoyalFrame } from './art/Decor'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const INITIAL = {
  name: '',
  phone: '',
  email: '',
  response: '',
  adults: 1,
  children: 0,
  guestNames: '',
  events: [],
  arrivalDate: '',
  departureDate: '',
  arrivalTime: '',
  transport: 'Not required',
  stay: 'not-required',
  rooms: 1,
  stayNotes: '',
  meal: 'No preference',
  message: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const needsPickup = (t) => /pickup/i.test(t)

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  const digits = v.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15) e.phone = 'Enter a valid phone number (at least 10 digits).'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address.'
  if (!v.response) e.response = 'Please let us know if you can join us.'
  if (v.response === 'accept') {
    if (v.adults < 1) e.adults = 'At least one adult is required.'
    if (v.adults + v.children > 1 && v.guestNames.trim().length < 2) e.guestNames = 'Please list the names of everyone joining you.'
    if (v.events.length === 0) e.events = 'Select at least one event you will attend.'
    if (needsPickup(v.transport)) {
      if (!v.arrivalDate) e.arrivalDate = 'Arrival date is needed to arrange pickup.'
      if (!v.arrivalTime) e.arrivalTime = 'Arrival time is needed to arrange pickup.'
    }
    if (v.arrivalDate && v.departureDate && v.departureDate < v.arrivalDate) e.departureDate = 'Departure cannot be before arrival.'
    if (v.stay === 'required' && (v.rooms < 1 || v.rooms > 10)) e.rooms = 'Rooms must be between 1 and 10.'
  }
  return e
}

const toInputDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

function Field({ id, label, error, hint, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-espresso/65">{hint}</p>}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-[0.82rem] font-semibold text-burgundy">
          {error}
        </p>
      )}
    </div>
  )
}

function Counter({ id, label, value, min = 0, max = 10, onChange, error }) {
  return (
    <Field id={id} label={label} error={error}>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Decrease ${label.toLowerCase()}`} className="grid h-12 w-12 place-items-center rounded-full bg-champagne text-maroon transition enabled:hover:bg-gold disabled:opacity-40" style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold)' }}>
          <Minus size={18} />
        </button>
        <output id={id} aria-live="polite" className="min-w-[2.4rem] text-center font-display text-3xl font-semibold text-maroon">
          {value}
        </output>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Increase ${label.toLowerCase()}`} className="grid h-12 w-12 place-items-center rounded-full bg-champagne text-maroon transition enabled:hover:bg-gold disabled:opacity-40" style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold)' }}>
          <Plus size={18} />
        </button>
      </div>
    </Field>
  )
}

function Step({ n, icon: Icon, title, children }) {
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className="mb-5 flex w-full items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-maroon text-gold" style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold)' }} aria-hidden="true">
          <Icon size={18} />
        </span>
        <span className="font-heading text-xl text-maroon">
          <span className="mr-2 font-body text-xs font-bold tracking-[0.25em] text-terracotta">0{n}</span>
          {title}
        </span>
      </legend>
      {children}
    </fieldset>
  )
}

function ChoiceCard({ name, value, checked, onChange, label, sub, type = 'radio', invalid }) {
  return (
    <label className={`relative flex min-h-[56px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${checked ? 'border-maroon bg-maroon text-ivory' : 'border-gold/70 bg-cream text-espresso hover:border-maroon'} ${invalid ? 'border-burgundy' : ''}`}>
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className={`grid h-5 w-5 shrink-0 place-items-center border-[1.5px] ${type === 'radio' ? 'rounded-full' : 'rounded-md'} ${checked ? 'border-gold bg-gold text-maroon' : 'border-gold bg-transparent'}`} aria-hidden="true">
        {checked && <span className={`block ${type === 'radio' ? 'h-2 w-2 rounded-full bg-maroon' : 'h-2.5 w-2.5 bg-maroon'}`} style={type === 'checkbox' ? { clipPath: 'polygon(14% 44%,0 65%,50% 100%,100% 16%,80% 0,43% 62%)' } : undefined} />}
      </span>
      <span className="leading-tight">
        <span className="block font-semibold">{label}</span>
        {sub && <span className={`block text-xs ${checked ? 'text-champagne' : 'text-espresso/65'}`}>{sub}</span>}
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-xl peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold" />
    </label>
  )
}

function SuccessScreen({ values, whatsappUrl, serverFailed, onReset }) {
  const reduce = useReducedMotion()
  const { events } = weddingData
  const accepted = values.response === 'accept'
  const chosen = events.filter((e) => values.events.includes(e.id)).map((e) => e.name)
  return (
    <motion.div initial={reduce ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="px-6 py-14 text-center sm:px-12" role="status" aria-live="polite">
      <motion.div initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }} className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-maroon text-gold" style={{ boxShadow: 'inset 0 0 0 2px var(--antique-gold), 0 0 0 10px rgba(212,175,106,0.25)' }}>
        {accepted ? <CheckCircle2 size={48} /> : <Heart size={44} fill="currentColor" />}
      </motion.div>
      <h3 className="mt-7 font-names text-5xl font-semibold italic text-maroon">Thank you, {values.name.trim().split(' ')[0]}!</h3>
      <OrnamentDivider className="my-4" />
      <p className="mx-auto max-w-md text-espresso/90">
        {accepted ? 'Your RSVP is confirmed. We cannot wait to celebrate with you and your loved ones.' : 'We are sorry you cannot make it, but we are grateful for your wishes and will be thinking of you.'}
      </p>

      {accepted && (
        <dl className="mx-auto mt-8 grid max-w-md gap-3 rounded-2xl bg-champagne/50 p-5 text-left text-[0.95rem]" style={{ boxShadow: 'inset 0 0 0 1px var(--antique-gold)' }}>
          <div className="flex justify-between gap-4"><dt className="font-bold text-maroon">Guests</dt><dd>{values.adults} adult{values.adults > 1 ? 's' : ''}{values.children ? `, ${values.children} child${values.children > 1 ? 'ren' : ''}` : ''}</dd></div>
          <div className="flex justify-between gap-4"><dt className="font-bold text-maroon">Attending</dt><dd className="text-right">{chosen.join(', ')}</dd></div>
          {values.arrivalDate && <div className="flex justify-between gap-4"><dt className="font-bold text-maroon">Arrival</dt><dd>{formatShortDate(values.arrivalDate)}</dd></div>}
          <div className="flex justify-between gap-4"><dt className="font-bold text-maroon">Stay</dt><dd>{values.stay === 'required' ? `${values.rooms} room${values.rooms > 1 ? 's' : ''}` : 'Not needed'}</dd></div>
        </dl>
      )}

      <p className="mx-auto mt-8 max-w-md text-sm text-espresso/75">
        WhatsApp should have opened with your response ready to send. Please press <strong>Send</strong> there to confirm with the family. If it did not open, use the button below.
      </p>
      {serverFailed && <p className="mx-auto mt-2 max-w-md text-xs text-burgundy">We could not reach our server, so please make sure the WhatsApp message is sent.</p>}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-royal">
          <Send size={15} aria-hidden="true" /> Send on WhatsApp
        </a>
        <button type="button" onClick={onReset} className="btn-ghost">
          Edit / new response
        </button>
      </div>
    </motion.div>
  )
}

export default function RSVPForm() {
  const uid = useId()
  const id = (k) => `${uid}-${k}`
  const reduce = useReducedMotion()
  const { events, wedding } = weddingData
  const { rsvp } = weddingData
  const formRef = useRef(null)
  const [v, setV] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null) // { values, url, serverFailed }
  const [busy, setBusy] = useState(false)

  const dateBounds = useMemo(() => {
    const dates = events.map((e) => parseLocal(e.date)).sort((a, b) => a - b)
    const first = new Date(dates[0])
    first.setDate(first.getDate() - 3)
    const last = new Date(dates[dates.length - 1])
    last.setDate(last.getDate() + 3)
    return { min: toInputDate(first), max: toInputDate(last) }
  }, [events])

  const set = useCallback((key, value) => {
    setV((s) => ({ ...s, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }, [])

  const setResponse = (value) => {
    setV((s) => ({ ...s, response: value, events: value === 'accept' && s.events.length === 0 ? events.map((e) => e.id) : s.events }))
    setErrors((e) => ({ ...e, response: undefined }))
  }

  const toggleEvent = (eid) => {
    setV((s) => ({ ...s, events: s.events.includes(eid) ? s.events.filter((x) => x !== eid) : [...s.events, eid] }))
    setErrors((e) => ({ ...e, events: undefined }))
  }

  const accepting = v.response === 'accept'
  const totalGuests = v.adults + v.children
  const inputProps = (key, extra = {}) => ({
    id: id(key),
    value: v[key],
    onChange: (e) => set(key, e.target.value),
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': errors[key] ? `${id(key)}-err` : undefined,
    className: `field ${errors[key] ? 'has-error' : ''}`,
    ...extra,
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (busy) return
    const found = validate(v)
    setErrors(found)
    if (Object.keys(found).length) {
      requestAnimationFrame(() => {
        const el = formRef.current?.querySelector('[aria-invalid="true"], [data-invalid="true"]')
        el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
        el?.focus?.({ preventScroll: true })
      })
      return
    }
    setBusy(true)
    const { url, backend } = prepareRsvp(v)
    // Opened synchronously inside the submit gesture so mobile browsers allow it.
    window.open(url, '_blank', 'noopener,noreferrer')
    const result = await backend
    setSubmitted({ values: v, url, serverFailed: result.ok === false })
    setBusy(false)
    requestAnimationFrame(() => document.getElementById('rsvp')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }))
  }

  const reset = () => {
    setSubmitted(null)
    setV(INITIAL)
    setErrors({})
  }

  return (
    <section id="rsvp" className="bg-paper relative overflow-hidden" aria-labelledby="rsvp-title">
      <div className="section-pad">
        <div className="container-royal max-w-3xl">
          <div id="rsvp-title">
            <SectionHeading eyebrow="Kindly reply" title="RSVP" subtitle={`Please let us know by ${formatLongDate(rsvp.deadline)} so that we can host you with the warmth you deserve.`} />
          </div>

          <Reveal className="mt-12" y={40}>
            <RoyalFrame>
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <SuccessScreen key="done" values={submitted.values} whatsappUrl={submitted.url} serverFailed={submitted.serverFailed} onReset={reset} />
                ) : (
                  <motion.form key="form" ref={formRef} onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="space-y-12 px-5 py-12 sm:px-10" aria-label="RSVP form">
                    {/* 1. Guest info */}
                    <Step n={1} icon={User} title="Guest Information">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id={id('name')} label="Full name *" error={errors.name} className="sm:col-span-2">
                          <input {...inputProps('name')} type="text" autoComplete="name" placeholder="e.g. Priya Sharma" />
                        </Field>
                        <Field id={id('phone')} label="Phone number *" error={errors.phone}>
                          <input {...inputProps('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" />
                        </Field>
                        <Field id={id('email')} label="Email address *" error={errors.email}>
                          <input {...inputProps('email')} type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" />
                        </Field>
                      </div>
                    </Step>

                    {/* 2. Response */}
                    <Step n={2} icon={Mail} title="Your Response">
                      <div role="radiogroup" aria-label="Invitation response" data-invalid={errors.response ? 'true' : undefined} tabIndex={errors.response ? -1 : undefined} className="grid gap-3 sm:grid-cols-2">
                        <ChoiceCard name="response" value="accept" checked={v.response === 'accept'} onChange={() => setResponse('accept')} label="Joyfully accept" sub="I will be there to celebrate" invalid={!!errors.response} />
                        <ChoiceCard name="response" value="decline" checked={v.response === 'decline'} onChange={() => setResponse('decline')} label="Regretfully decline" sub="I am unable to attend" invalid={!!errors.response} />
                      </div>
                      {errors.response && <p role="alert" className="mt-2 text-[0.82rem] font-semibold text-burgundy">{errors.response}</p>}
                    </Step>

                    <AnimatePresence initial={false}>
                      {accepting && (
                        <motion.div key="accepting" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: [0.22, 0.8, 0.3, 1] }} className="space-y-12 overflow-hidden">
                          {/* 3. Guests */}
                          <Step n={3} icon={User} title="Guest Details">
                            <div className="grid gap-6 sm:grid-cols-2">
                              <Counter id={id('adults')} label="Adults" value={v.adults} min={1} max={10} onChange={(n) => set('adults', n)} error={errors.adults} />
                              <Counter id={id('children')} label="Children" value={v.children} min={0} max={10} onChange={(n) => set('children', n)} />
                            </div>
                            <p className="mt-3 font-body text-sm text-espresso/75">
                              Total guests: <strong className="text-maroon">{totalGuests}</strong>
                            </p>
                            <AnimatePresence initial={false}>
                              {totalGuests > 1 && (
                                <motion.div initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                  <Field id={id('guestNames')} label="Names of accompanying guests *" error={errors.guestNames} className="mt-5" hint="One name per line is perfect.">
                                    <textarea {...inputProps('guestNames')} rows={3} placeholder={'e.g.\nRahul Sharma\nAnaya Sharma (child)'} />
                                  </Field>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Step>

                          {/* 4. Events */}
                          <Step n={4} icon={Heart} title="Event Attendance">
                            <div data-invalid={errors.events ? 'true' : undefined} tabIndex={errors.events ? -1 : undefined} className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Events you will attend">
                              {events.map((ev) => (
                                <ChoiceCard key={ev.id} type="checkbox" name="events" value={ev.id} checked={v.events.includes(ev.id)} onChange={() => toggleEvent(ev.id)} label={ev.name} sub={formatShortDate(ev.date)} invalid={!!errors.events} />
                              ))}
                            </div>
                            {errors.events && <p role="alert" className="mt-2 text-[0.82rem] font-semibold text-burgundy">{errors.events}</p>}
                          </Step>

                          {/* 5. Travel */}
                          <Step n={5} icon={Car} title="Travel Information">
                            <div className="grid gap-5 sm:grid-cols-2">
                              <Field id={id('arrivalDate')} label={`Arrival date${needsPickup(v.transport) ? ' *' : ''}`} error={errors.arrivalDate}>
                                <input {...inputProps('arrivalDate')} type="date" min={dateBounds.min} max={dateBounds.max} />
                              </Field>
                              <Field id={id('arrivalTime')} label={`Arrival time${needsPickup(v.transport) ? ' *' : ''}`} error={errors.arrivalTime}>
                                <input {...inputProps('arrivalTime')} type="time" />
                              </Field>
                              <Field id={id('departureDate')} label="Departure date" error={errors.departureDate}>
                                <input {...inputProps('departureDate')} type="date" min={v.arrivalDate || dateBounds.min} max={dateBounds.max} />
                              </Field>
                              <Field id={id('transport')} label="Transportation">
                                <select {...inputProps('transport')}>
                                  {rsvp.transport.map((t) => (
                                    <option key={t}>{t}</option>
                                  ))}
                                </select>
                              </Field>
                            </div>
                          </Step>

                          {/* 6. Accommodation */}
                          <Step n={6} icon={BedDouble} title="Accommodation">
                            <div role="radiogroup" aria-label="Accommodation" className="grid gap-3 sm:grid-cols-2">
                              <ChoiceCard name="stay" value="required" checked={v.stay === 'required'} onChange={() => set('stay', 'required')} label="Required" sub="Please arrange a room" />
                              <ChoiceCard name="stay" value="not-required" checked={v.stay === 'not-required'} onChange={() => set('stay', 'not-required')} label="Not required" sub="I have my own arrangement" />
                            </div>
                            <AnimatePresence initial={false}>
                              {v.stay === 'required' && (
                                <motion.div initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                    <Counter id={id('rooms')} label="Number of rooms" value={v.rooms} min={1} max={10} onChange={(n) => set('rooms', n)} error={errors.rooms} />
                                    <Field id={id('stayNotes')} label="Special requirements" hint="Ground floor, extra bed, dietary needs…">
                                      <textarea {...inputProps('stayNotes')} rows={3} placeholder="Anything we should know?" />
                                    </Field>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Step>

                          {/* 7. Meal */}
                          <Step n={7} icon={Utensils} title="Meal Preference">
                            <div role="radiogroup" aria-label="Meal preference" className="grid gap-3 sm:grid-cols-2">
                              {rsvp.meals.map((m) => (
                                <ChoiceCard key={m} name="meal" value={m} checked={v.meal === m} onChange={() => set('meal', m)} label={m} />
                              ))}
                            </div>
                          </Step>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Message */}
                    <Step n={accepting ? 8 : 3} icon={Heart} title="A Message for the Couple">
                      <Field id={id('message')} label="Your wishes (optional)">
                        <textarea {...inputProps('message')} rows={4} placeholder={`Write something sweet for ${weddingData.groom.firstName} & ${weddingData.bride.firstName}…`} maxLength={500} />
                      </Field>
                    </Step>

                    <div className="text-center">
                      <button type="submit" disabled={busy} className="btn-royal !px-10 !py-4 disabled:opacity-70">
                        {busy ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : <Send size={17} aria-hidden="true" />}
                        {busy ? 'Sending…' : 'Send RSVP'}
                      </button>
                      <p className="mx-auto mt-4 max-w-sm text-xs text-espresso/65">Your response will open in WhatsApp, ready to send to the family. {wedding.hashtag}</p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </RoyalFrame>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
