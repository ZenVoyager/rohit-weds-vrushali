import { useEffect } from 'react'

/** Locks page scroll while `locked` is true (modals, lightbox, cover). */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined
    const { body, documentElement: html } = document
    const prevBody = body.style.overflow
    const prevHtml = html.style.overflow
    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'
    return () => {
      body.style.overflow = prevBody
      html.style.overflow = prevHtml
    }
  }, [locked])
}
