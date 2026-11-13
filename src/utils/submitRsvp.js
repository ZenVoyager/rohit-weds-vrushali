import { weddingData } from '../config/weddingData'
import { formatShortDate, formatTime, whatsappUrl } from './format'

/** Turns the RSVP form values into a readable WhatsApp message. */
export function buildRsvpMessage(v) {
  const { bride, groom } = weddingData
  const lines = [`*RSVP – ${groom.firstName} & ${bride.firstName}'s Wedding*`, '']
  lines.push(`*Name:* ${v.name}`)
  lines.push(`*Phone:* ${v.phone}`)
  lines.push(`*Email:* ${v.email}`)
  lines.push(`*Response:* ${v.response === 'accept' ? 'Joyfully accepts ✅' : 'Regretfully declines ❌'}`)

  if (v.response === 'accept') {
    const total = Number(v.adults) + Number(v.children)
    lines.push('', `*Guests:* ${v.adults} adult(s), ${v.children} child(ren) — total ${total}`)
    if (v.guestNames?.trim()) lines.push(`*Accompanying:* ${v.guestNames.trim()}`)

    const events = weddingData.events.filter((e) => v.events.includes(e.id)).map((e) => e.name)
    lines.push(`*Attending:* ${events.join(', ') || '—'}`)

    if (v.arrivalDate || v.departureDate || v.arrivalTime) {
      lines.push('')
      if (v.arrivalDate) lines.push(`*Arrival:* ${formatShortDate(v.arrivalDate)}${v.arrivalTime ? ' at ' + formatTime(v.arrivalTime) : ''}`)
      if (v.departureDate) lines.push(`*Departure:* ${formatShortDate(v.departureDate)}`)
    }
    if (v.transport && v.transport !== 'Not required') lines.push(`*Transport:* ${v.transport}`)

    lines.push('', `*Accommodation:* ${v.stay === 'required' ? `Required (${v.rooms} room${Number(v.rooms) > 1 ? 's' : ''})` : 'Not required'}`)
    if (v.stay === 'required' && v.stayNotes?.trim()) lines.push(`*Special requirements:* ${v.stayNotes.trim()}`)
    lines.push(`*Meal preference:* ${v.meal}`)
  }
  if (v.message?.trim()) lines.push('', `*Message:* ${v.message.trim()}`)
  return lines.join('\n')
}

/**
 * Submits an RSVP.
 *  1. If `weddingData.rsvp.endpoint` is set, POSTs the JSON payload (backend-ready hook).
 *  2. Builds the WhatsApp deep-link. The caller opens it (must happen inside the click handler).
 */
export function prepareRsvp(values) {
  const message = buildRsvpMessage(values)
  const url = whatsappUrl(weddingData.rsvp.whatsappNumber, message)

  let backend = Promise.resolve({ ok: true, skipped: true })
  const endpoint = weddingData.rsvp.endpoint
  if (endpoint) {
    backend = fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, submittedAt: new Date().toISOString() }),
    })
      .then((r) => ({ ok: r.ok }))
      .catch(() => ({ ok: false }))
  }
  return { message, url, backend }
}
