/** Small formatting + link helpers shared across sections. */

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** Parse "2027-01-28" or "2027-01-30T19:00:00" as a *local* date (no UTC shift). */
export function parseLocal(value) {
  if (value instanceof Date) return value
  const [datePart, timePart = '00:00:00'] = String(value).split('T')
  const [y, m, d] = datePart.split('-').map(Number)
  const [hh = 0, mm = 0, ss = 0] = timePart.split(':').map(Number)
  return new Date(y, m - 1, d, hh, mm, ss)
}

export const monthName = (date) => MONTHS[date.getMonth()]
export const weekdayName = (date) => WEEKDAYS[date.getDay()]

export function formatLongDate(value) {
  const d = parseLocal(value)
  return `${weekdayName(d)}, ${d.getDate()} ${monthName(d)} ${d.getFullYear()}`
}

export function formatShortDate(value) {
  const d = parseLocal(value)
  return `${d.getDate()} ${monthName(d).slice(0, 3)} ${d.getFullYear()}`
}

/** "16:00" -> "4:00 PM" */
export function formatTime(value) {
  const raw = String(value).includes('T') ? String(value).split('T')[1] : String(value)
  const [h, m = '00'] = raw.split(':')
  const hour = Number(h)
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const h12 = hour % 12 === 0 ? 12 : hour % 12
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`
}

export const ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export const digitsOnly = (phone) => String(phone).replace(/[^\d]/g, '')
export const telHref = (phone) => `tel:${String(phone).replace(/\s/g, '')}`

export function mapsDirectionsUrl(query) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`
}

export function whatsappUrl(number, text) {
  const base = `https://wa.me/${digitsOnly(number)}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

/** Builds a downloadable .ics calendar entry as a data URL. */
export function calendarUrl({ title, start, end, location, description }) {
  const fmt = (d) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    `UID:${fmt(start)}@wedding-invite`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`
}

export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}
