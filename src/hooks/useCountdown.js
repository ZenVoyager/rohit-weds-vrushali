import { useEffect, useState } from 'react'
import { parseLocal } from '../utils/format'

const calc = (target) => {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  const s = Math.floor(diff / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    expired: false,
  }
}

/** Live countdown to `dateString`; ticks once per second and stops when the date passes. */
export function useCountdown(dateString) {
  const [state, setState] = useState(() => calc(parseLocal(dateString)))

  useEffect(() => {
    const target = parseLocal(dateString)
    const id = setInterval(() => {
      const next = calc(target)
      setState(next)
      if (next.expired) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [dateString])

  return state
}
