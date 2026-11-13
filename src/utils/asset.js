/** Resolves a public asset path ("/images/x.svg") against the deploy base, so the site works from any sub-path. */
export const asset = (p) => (typeof p === 'string' && p.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p)

/** Deeply rewrites every "/images/…" or "/video/…" string in a config object. */
export function withBase(value) {
  if (typeof value === 'string') return /^\/(images|video)\//.test(value) ? asset(value) : value
  if (Array.isArray(value)) return value.map(withBase)
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withBase(v)]))
  return value
}
