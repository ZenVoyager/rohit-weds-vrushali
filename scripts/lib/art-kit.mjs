// Drawing primitives for the original wedding illustrations.
// Everything is built from the invitation palette (plus tints of gold and a skin tone for portraits).
// Shared pieces (flowers, gradients, filters) are defined once per SVG via <use>, and only the defs a
// given image actually references are emitted.

export const C = {
  maroon: '#6B1728',
  burg: '#8B2635',
  gold: '#D4AF6A',
  ivory: '#F8F0DF',
  champ: '#E8D5B5',
  esp: '#3B211C',
  terra: '#B76E55',
  cream: '#FFF9EF',
}
export const GOLD_L = '#EFD9A3'
export const GOLD_D = '#A98343'
export const SKIN = '#D6A788'
export const SKIN_D = '#BC8869'

// deterministic random so output is stable between runs
export function rng(seed = 7) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const n1 = (n) => Math.round(n * 10) / 10
const n2 = (n) => Math.round(n * 100) / 100

// ---------------------------------------------------------------- shared defs
const D = {}
const def = (id, markup) => {
  D[id] = markup
}
const stops = (arr) => arr.map(([o, c, op]) => `<stop offset="${o}" stop-color="${c}"${op !== undefined ? ` stop-opacity="${op}"` : ''}/>`).join('')
const lin = (id, arr, x1 = 0, y1 = 0, x2 = 0, y2 = 1) => def(id, `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops(arr)}</linearGradient>`)
const rad = (id, arr, extra = '') => def(id, `<radialGradient id="${id}" ${extra}>${stops(arr)}</radialGradient>`)

// skies & surfaces
lin('gSky', [[0, '#2B1013'], [0.38, C.maroon], [0.78, C.burg], [1, '#A5384A']])
lin('gNight', [[0, '#240E10'], [0.55, C.maroon], [1, C.burg]])
lin('gDay', [[0, C.cream], [0.55, C.champ], [1, '#D9A58C']])
lin('gSunset', [[0, '#4A1220'], [0.3, C.maroon], [0.55, C.burg], [0.78, C.terra], [1, '#EAC9A0']])
lin('gPaper', [[0, C.cream], [1, C.champ]])
lin('gGold', [[0, GOLD_L], [0.5, C.gold], [1, GOLD_D]], 0, 0, 1, 1)
lin('gWindow', [[0, GOLD_L], [1, C.gold]])
lin('gWinGlow', [[0, '#FFF1C8'], [0.45, GOLD_L], [1, C.terra]])
lin('gGround', [[0, '#4B2420'], [1, '#2A1210']])
lin('gWater', [[0, '#5A1727'], [1, '#2B0F14']])
rad('gGlow', [[0, C.gold, 0.8], [0.45, C.gold, 0.24], [1, C.gold, 0]])
rad('gWarm', [[0, C.cream, 0.95], [1, C.champ, 0]])
rad('gVig', [[0.55, '#000', 0], [1, '#000', 0.4]], 'cx=".5" cy=".5" r=".75"')
lin('gFlame', [[0, C.terra], [0.5, C.gold], [1, C.cream]], 0, 1, 0, 0)
rad('gMoon', [[0, '#FFFBF0'], [0.7, '#F6EAD0'], [1, '#E5CFA8']], 'cx=".4" cy=".38" r=".7"')
rad('gBokeh', [[0, '#FFE9B0', 0.55], [0.7, C.gold, 0.2], [1, C.gold, 0]])
lin('gHaze', [[0, C.terra, 0], [1, '#F0C9A4', 0.55]])
lin('gTrunk', [[0, '#2C1814'], [0.5, '#5A3329'], [1, '#2C1814']], 0, 0, 1, 0)
lin('gRay', [[0, C.gold, 0.5], [1, C.gold, 0]], 0, 1, 0, 0)
lin('gNeckShade', [[0, C.esp, 0.5], [1, C.esp, 0]])
lin('gBarrel', [[0, '#E39A7E'], [0.45, C.terra], [1, '#6E3226']])
rad('gHeadSkin', [[0, '#FFFBF0'], [0.7, '#F4E6C8'], [1, '#D9BE92']], 'cx=".42" cy=".4" r=".7"')
rad('gHand', [[0, '#E2B596'], [0.7, '#D2A082'], [1, '#B98163']], 'gradientUnits="userSpaceOnUse" cx="-10" cy="20" r="260"')
lin('gClay', [[0, '#C98068'], [0.6, C.terra], [1, '#7C3A2E']])

// architecture
lin('gBodyM', [[0, '#8A283C'], [0.55, C.maroon], [1, '#4A0E1B']])
lin('gBodyB', [[0, '#A53A4B'], [0.6, C.burg], [1, '#6A1A29']])
lin('gDomeM', [[0, '#A3304A'], [0.42, C.maroon], [1, '#3F0D18']], 0, 0, 1, 0)
lin('gDomeB', [[0, '#BB4B5E'], [0.42, C.burg], [1, '#5A1422']], 0, 0, 1, 0)
lin('gPillar', [[0, GOLD_D], [0.28, GOLD_L], [0.6, C.gold], [1, GOLD_D]], 0, 0, 1, 0)
def('pJali', `<pattern id="pJali" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 3.5h7M3.5 0v7" stroke="${C.maroon}" stroke-width=".9" stroke-opacity=".5"/></pattern>`)
def('pJaliL', `<pattern id="pJaliL" width="44" height="44" patternUnits="userSpaceOnUse"><g fill="none" stroke="${C.gold}" stroke-width="1.2" stroke-opacity=".55"><path d="M22 3 C29 11 29 18 22 22 C15 18 15 11 22 3Z"/><path d="M22 41 C29 33 29 26 22 22 C15 26 15 33 22 41Z"/><path d="M3 22 C11 15 18 15 22 22 C18 29 11 29 3 22Z"/><path d="M41 22 C33 15 26 15 22 22 C26 29 33 29 41 22Z"/><circle cx="22" cy="22" r="2.2"/></g></pattern>`)

// soft blur filters
const blur = (id, sd) => def(id, `<filter id="${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${sd}"/></filter>`)
blur('fSoft1', 2.2)
blur('fSoft', 6)
blur('fSoft2', 16)

// flowers (defined once, instanced with <use>)
const petalD = (len, w) =>
  `M0 -${n1(len * 0.06)} C${-w} -${n1(len * 0.22)} ${n1(-w * 1.18)} -${n1(len * 0.7)} ${n1(-w * 0.55)} -${n1(len * 0.93)} Q0 -${n1(len * 1.06)} ${n1(w * 0.55)} -${n1(len * 0.93)} C${n1(w * 1.18)} -${n1(len * 0.7)} ${w} -${n1(len * 0.22)} 0 -${n1(len * 0.06)}Z`
const ring = (count, len, w, fill, off = 0, scale = 1, stroke = '#4A0E1B') => {
  const d = petalD(len, w)
  let s = ''
  for (let i = 0; i < count; i++) s += `<path d="${d}" transform="rotate(${n1(off + (i * 360) / count)}) scale(${scale})" fill="${fill}" stroke="${stroke}" stroke-opacity=".2" stroke-width=".7"/>`
  return s
}
rad('rgGold', [[0, '#A8761F'], [0.5, '#D3AA5C'], [1, '#F2DDA1']], 'gradientUnits="userSpaceOnUse" cx="0" cy="0" r="50"')
rad('rgTerra', [[0, '#7E3A2A'], [0.55, C.terra], [1, '#E0A088']], 'gradientUnits="userSpaceOnUse" cx="0" cy="0" r="50"')
rad('rgDeep', [[0, '#4A0E1B'], [1, '#9B3042']], 'gradientUnits="userSpaceOnUse" cx="0" cy="0" r="50"')
rad('rgCore', [[0, '#3A0A14'], [0.6, '#6B1728'], [1, '#8B2635']], 'gradientUnits="userSpaceOnUse" cx="-1" cy="-1" r="9"')
const bloom = (id, a, b, c) =>
  def(id, `<g id="${id}">${ring(18, 50, 9.6, `url(#${a})`, 0, 1)}${ring(14, 50, 9.6, `url(#${b})`, 12, 0.76)}${ring(10, 50, 9.2, `url(#${c})`, 6, 0.5)}<circle r="7.2" fill="url(#rgCore)"/><circle cx="-2" cy="-2.2" r="2" fill="${C.cream}" opacity=".3"/></g>`)
bloom('mgA', 'rgGold', 'rgTerra', 'rgGold')
bloom('mgB', 'rgTerra', 'rgGold', 'rgDeep')

rad('rgRose', [[0, '#B4394D'], [0.7, '#8B2635'], [1, '#5B1020']], 'gradientUnits="userSpaceOnUse" cx="-6" cy="-8" r="52"')
rad('rgRoseIn', [[0, '#C9495D'], [1, '#7A1E2F']], 'gradientUnits="userSpaceOnUse" cx="-4" cy="-5" r="30"')
{
  let petals = ''
  for (let i = 0; i < 5; i++) petals += `<path d="M-40 -8 C-46 -38 -12 -52 8 -46 C32 -42 48 -20 40 6 C30 -16 -2 -24 -40 -8Z" transform="rotate(${i * 72})" fill="#9A2E40" stroke="#E79AA6" stroke-opacity=".3" stroke-width=".8"/>`
  def(
    'rs',
    `<g id="rs"><circle r="50" fill="url(#rgRose)"/>${petals}<circle r="29" fill="url(#rgRoseIn)"/><path d="M0 0 C7 -3 12 4 7 10 C0 18 -14 10 -11 -2 C-8 -16 12 -20 20 -8" fill="none" stroke="#F0B4BC" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/><path d="M-20 4 C-18 -14 -4 -24 12 -20" fill="none" stroke="#F0B4BC" stroke-opacity=".28" stroke-width="1.4" stroke-linecap="round"/></g>`,
  )
}
rad('rgJas', [[0, '#FFFFFF'], [1, '#EBD8B4']], 'gradientUnits="userSpaceOnUse" cx="0" cy="0" r="50"')
{
  let p = ''
  for (let i = 0; i < 5; i++) p += `<path d="M0 -4 C-14 -16 -16 -36 0 -50 C16 -36 14 -16 0 -4Z" transform="rotate(${i * 72})" fill="url(#rgJas)" stroke="#B89556" stroke-opacity=".35" stroke-width="1"/>`
  def('jm', `<g id="jm">${p}<circle r="6.5" fill="${C.gold}"/><circle cx="-1.6" cy="-1.8" r="2" fill="${GOLD_L}"/></g>`)
}
def(
  'lf',
  `<g id="lf"><path d="M0 0 C20 -24 64 -24 100 0 C64 24 20 24 0 0Z"/><path d="M0 0 C20 -24 64 -24 100 0 C62 -7 20 -4 0 0Z" fill="#fff" opacity=".1"/><path d="M4 0 L94 0" stroke="#fff" stroke-opacity=".24" stroke-width="1.3" fill="none"/><path d="M30 0 L48 -11 M30 0 L48 11 M56 0 L72 -9 M56 0 L72 9" stroke="#fff" stroke-opacity=".14" stroke-width="1" fill="none"/></g>`,
)
lin('gLotus', [[0, '#D78F78'], [1, '#9C4A3A']])

// portrait materials
rad('gSkin', [[0, '#E6BC9C'], [0.6, '#D4A283'], [1, '#B98163']], 'cx=".45" cy=".4" r=".75"')
lin('gSkinD', [[0, '#C79576'], [1, '#A66F53']])
lin('gNeck', [[0, '#D3A589'], [1, '#BE8C6E']])
lin('gShadeTop', [[0, C.esp, 0.34], [1, C.esp, 0]])
lin('gSideShade', [[0, C.esp, 0.26], [0.22, C.esp, 0], [0.78, C.esp, 0], [1, C.esp, 0.26]], 0, 0, 1, 0)
rad('gIris', [[0, '#7A4A32'], [0.6, '#3F2218'], [1, '#22100B']])
lin('gSilkM', [[0, '#8A2538'], [0.4, '#5E1121'], [0.7, '#7E2034'], [1, '#4F0E1B']], 0, 0, 1, 1)
lin('gSilkB', [[0, '#A53A4B'], [0.5, C.burg], [1, '#6E1B2A']], 0, 0, 1, 1)
lin('gIvory', [[0, C.cream], [0.55, C.ivory], [1, '#E3CFAA']], 0, 0, 0, 1)
lin('gTurb', [[0, '#A5394B'], [0.45, C.burg], [1, '#5C1322']], 0, 0, 1, 1)
lin('gHair', [[0, '#4A2A22'], [0.5, '#2A1511'], [1, '#1B0D0A']], 0, 0, 1, 1)

export function resolveDefs(body, extra = '') {
  const need = new Set()
  const queue = []
  const scan = (s) => {
    for (const m of s.matchAll(/(?:url\(#|href="#)([A-Za-z0-9_-]+)/g)) {
      if (D[m[1]] && !need.has(m[1])) {
        need.add(m[1])
        queue.push(m[1])
      }
    }
  }
  scan(body + extra)
  while (queue.length) scan(D[queue.pop()])
  return [...need].map((id) => D[id]).join('')
}

export function svg(w, h, body, extraDefs = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"><defs>${resolveDefs(body, extraDefs)}${extraDefs}</defs>${body}</svg>`
}

export const rect = (x, y, w, h, fill, extra = '') => `<rect x="${n1(x)}" y="${n1(y)}" width="${n1(w)}" height="${n1(h)}" fill="${fill}" ${extra}/>`
export const circle = (cx, cy, r, fill, extra = '') => `<circle cx="${n1(cx)}" cy="${n1(cy)}" r="${n1(r)}" fill="${fill}" ${extra}/>`
export const g = (inner, transform = '', extra = '') => `<g ${transform ? `transform="${transform}"` : ''} ${extra}>${inner}</g>`
export const place = (inner, x, y, s = 1, rotate = 0) => `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${rotate}) scale(${s})">${inner}</g>`

// ---------------------------------------------------------------- atmosphere
export const sparkle = (x, y, s, fill = C.gold, op = 0.9) =>
  `<path d="M${n1(x)} ${n1(y - s)} C${n1(x + s * 0.12)} ${n1(y - s * 0.12)} ${n1(x + s * 0.12)} ${n1(y - s * 0.12)} ${n1(x + s)} ${n1(y)} C${n1(x + s * 0.12)} ${n1(y + s * 0.12)} ${n1(x + s * 0.12)} ${n1(y + s * 0.12)} ${n1(x)} ${n1(y + s)} C${n1(x - s * 0.12)} ${n1(y + s * 0.12)} ${n1(x - s * 0.12)} ${n1(y + s * 0.12)} ${n1(x - s)} ${n1(y)} C${n1(x - s * 0.12)} ${n1(y - s * 0.12)} ${n1(x - s * 0.12)} ${n1(y - s * 0.12)} ${n1(x)} ${n1(y - s)}Z" fill="${fill}" opacity="${op}"/>`

export function stars(w, h, n, seed = 3, color = C.gold, maxY = h) {
  const r = rng(seed)
  let s = ''
  for (let i = 0; i < n; i++) {
    const x = r() * w
    const y = r() * maxY
    const rad = 0.7 + r() * 1.9
    if (r() > 0.86) s += sparkle(x, y, 5 + r() * 7, color, n1(0.5 + r() * 0.4))
    else s += circle(x, y, rad, color, `opacity="${n1(0.22 + r() * 0.6)}"`)
  }
  return s
}

/** Soft out-of-focus lights. */
export function bokeh(w, h, n, seed = 5, maxY = h, minR = 14, maxR = 52) {
  const r = rng(seed)
  let s = ''
  for (let i = 0; i < n; i++) s += circle(r() * w, r() * maxY, minR + r() * (maxR - minR), 'url(#gBokeh)', `opacity="${n1(0.35 + r() * 0.55)}"`)
  return s
}

/** Wispy blurred clouds. */
export function clouds(w, y0, y1, n, seed = 9, col = C.terra, op = 0.22) {
  const r = rng(seed)
  let s = '<g filter="url(#fSoft2)">'
  for (let i = 0; i < n; i++) {
    const x = r() * w
    const y = y0 + r() * (y1 - y0)
    s += `<ellipse cx="${n1(x)}" cy="${n1(y)}" rx="${n1(w * (0.1 + r() * 0.14))}" ry="${n1(14 + r() * 22)}" fill="${col}" opacity="${n1(op * (0.6 + r() * 0.7))}"/>`
  }
  return s + '</g>'
}

export function moon(cx, cy, r) {
  return `${circle(cx, cy, r * 3.4, 'url(#gGlow)', 'opacity=".8"')}${circle(cx, cy, r * 1.5, 'url(#gGlow)')}${circle(cx, cy, r, 'url(#gMoon)')}<g filter="url(#fSoft1)">${circle(cx - r * 0.34, cy - r * 0.2, r * 0.2, C.champ, 'opacity=".55"')}${circle(cx + r * 0.3, cy + r * 0.26, r * 0.28, C.champ, 'opacity=".42"')}${circle(cx + r * 0.1, cy - r * 0.5, r * 0.12, C.champ, 'opacity=".5"')}${circle(cx - r * 0.18, cy + r * 0.45, r * 0.1, C.champ, 'opacity=".4"')}</g>`
}

export function sun(cx, cy, r) {
  let rays = ''
  for (let i = 0; i < 24; i++) rays += `<path d="M${cx} ${n1(cy - r * 1.25)} L${n1(cx - (i % 2 ? 5 : 9))} ${n1(cy - r * (i % 2 ? 2.6 : 3.4))} L${n1(cx + (i % 2 ? 5 : 9))} ${n1(cy - r * (i % 2 ? 2.6 : 3.4))}Z" transform="rotate(${i * 15} ${cx} ${cy})"/>`
  return `${circle(cx, cy, r * 4.2, 'url(#gGlow)', 'opacity=".9"')}<g fill="url(#gRay)">${rays}</g>${circle(cx, cy, r * 1.35, 'url(#gGlow)')}${circle(cx, cy, r, 'url(#gGold)')}${circle(cx - r * 0.25, cy - r * 0.3, r * 0.45, '#FFF1C8', 'opacity=".3" filter="url(#fSoft1)"')}`
}

// ---------------------------------------------------------------- ornaments
export function mandala(cx, cy, r, col = C.gold, op = 0.5, sw = 1.4) {
  let s = `<g fill="none" stroke="${col}" stroke-width="${sw}" opacity="${op}">`
  s += `<circle cx="${cx}" cy="${cy}" r="${r}"/><circle cx="${cx}" cy="${cy}" r="${n1(r * 0.95)}" stroke-dasharray="1.5 6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="${n1(r * 0.66)}"/><circle cx="${cx}" cy="${cy}" r="${n1(r * 0.31)}"/><circle cx="${cx}" cy="${cy}" r="${n1(r * 0.12)}"/>`
  for (let i = 0; i < 24; i++) {
    const a = i * 15
    s += `<path transform="rotate(${a} ${cx} ${cy})" d="M${cx} ${n1(cy - r * 0.66)} C${n1(cx + r * 0.16)} ${n1(cy - r * 0.78)} ${n1(cx + r * 0.1)} ${n1(cy - r * 0.9)} ${cx} ${n1(cy - r * 0.95)} C${n1(cx - r * 0.1)} ${n1(cy - r * 0.9)} ${n1(cx - r * 0.16)} ${n1(cy - r * 0.78)} ${cx} ${n1(cy - r * 0.66)}Z"/>`
    s += `<path transform="rotate(${a + 7.5} ${cx} ${cy})" d="M${cx} ${n1(cy - r * 0.97)} q${n1(r * 0.03)} ${n1(-r * 0.03)} 0 ${n1(-r * 0.03)}" stroke-linecap="round"/>`
  }
  for (let i = 0; i < 12; i++) {
    const a = i * 30 + 15
    s += `<path transform="rotate(${a} ${cx} ${cy})" d="M${cx} ${n1(cy - r * 0.31)} C${n1(cx + r * 0.13)} ${n1(cy - r * 0.4)} ${n1(cx + r * 0.1)} ${n1(cy - r * 0.55)} ${cx} ${n1(cy - r * 0.62)} C${n1(cx - r * 0.1)} ${n1(cy - r * 0.55)} ${n1(cx - r * 0.13)} ${n1(cy - r * 0.4)} ${cx} ${n1(cy - r * 0.31)}Z"/>`
  }
  for (let i = 0; i < 8; i++) {
    const a = i * 45
    s += `<path transform="rotate(${a} ${cx} ${cy})" d="M${cx} ${n1(cy - r * 0.12)} C${n1(cx + r * 0.07)} ${n1(cy - r * 0.16)} ${n1(cx + r * 0.06)} ${n1(cy - r * 0.24)} ${cx} ${n1(cy - r * 0.29)} C${n1(cx - r * 0.06)} ${n1(cy - r * 0.24)} ${n1(cx - r * 0.07)} ${n1(cy - r * 0.16)} ${cx} ${n1(cy - r * 0.12)}Z"/>`
  }
  return s + '</g>'
}

const UI = (id, cx, cy, r, extra = '') => `<use href="#${id}" transform="translate(${n1(cx)} ${n1(cy)}) scale(${n2(r / 50)})" ${extra}/>`
export const marigold = (cx, cy, r, a = C.gold) => UI(a === C.gold ? 'mgA' : 'mgB', cx, cy, r)
export const rose = (cx, cy, r) => UI('rs', cx, cy, r)
export const jasmine = (cx, cy, r) => UI('jm', cx, cy, r)

export function leaf(x, y, len, angle, col = C.maroon, op = 0.9) {
  return `<use href="#lf" fill="${col}" opacity="${op}" transform="translate(${n1(x)} ${n1(y)}) rotate(${n1(angle)}) scale(${n2(len / 100)})"/>`
}

export function lotus(cx, cy, r, col = C.terra, edge = C.gold) {
  let s = ''
  const petals = [-72, -42, 42, 72, -22, 22, 0]
  for (const a of petals) {
    const fill = col === C.terra ? 'url(#gLotus)' : col
    s += `<path d="M${cx} ${cy} C${n1(cx - r * 0.38)} ${n1(cy - r * 0.34)} ${n1(cx - r * 0.3)} ${n1(cy - r * 0.8)} ${cx} ${n1(cy - r)} C${n1(cx + r * 0.3)} ${n1(cy - r * 0.8)} ${n1(cx + r * 0.38)} ${n1(cy - r * 0.34)} ${cx} ${cy}Z" fill="${fill}" stroke="${edge}" stroke-width="1.2" transform="rotate(${a} ${cx} ${cy})" opacity="${Math.abs(a) > 50 ? 0.72 : 0.96}"/>`
    s += `<path d="M${cx} ${n1(cy - r * 0.12)} L${cx} ${n1(cy - r * 0.8)}" stroke="${edge}" stroke-opacity=".5" stroke-width=".9" transform="rotate(${a} ${cx} ${cy})"/>`
  }
  return s
}

export function garland(x1, y1, x2, y2, sag, n, r, flowers = 'mixed') {
  const cx = (x1 + x2) / 2
  const cy = Math.max(y1, y2) + sag
  let s = `<path d="M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}" fill="none" stroke="${C.maroon}" stroke-width="2.4" opacity=".75"/>`
  let leaves = ''
  let blooms = ''
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2
    const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2
    leaves += leaf(x, y, r * 1.9, -40 + (i % 2) * 80 + 90, C.maroon, 0.9)
    if (flowers === 'rose') blooms += i % 3 === 1 ? rose(x, y, r * 0.85) : marigold(x, y, r, C.gold)
    else blooms += i % 3 === 1 ? marigold(x, y, r * 0.95, C.terra) : marigold(x, y, r, C.gold)
  }
  return s + leaves + blooms
}

export function hangingString(x, y0, len, n, r) {
  let s = `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y0 + len}" stroke="${C.gold}" stroke-width="1.4" opacity=".75"/>`
  for (let i = 0; i < n; i++) {
    const y = y0 + (len / n) * (i + 0.7)
    s += i % 3 === 2 ? marigold(x, y, r * 0.9, C.terra) : marigold(x, y, r, C.gold)
  }
  const ty = y0 + len + r * 0.4
  s += `<path d="M${x} ${n1(ty)} l${n1(-r * 0.36)} ${n1(r * 1.1)} h${n1(r * 0.72)}Z" fill="url(#gGold)"/>${circle(x, ty, r * 0.28, 'url(#gGold)')}`
  return s
}

export function lightString(x1, y1, x2, y2, sag, n, r = 5) {
  const cx = (x1 + x2) / 2
  const cy = Math.max(y1, y2) + sag
  let s = `<path d="M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}" fill="none" stroke="${C.gold}" stroke-width="1.4" opacity=".55"/>`
  for (let i = 1; i < n; i++) {
    const t = i / n
    const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2
    const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2
    s += circle(x, y + r, r * 4, 'url(#gGlow)') + circle(x, y + r, r, GOLD_L) + circle(x - r * 0.25, y + r * 0.7, r * 0.35, '#fff', 'opacity=".85"')
  }
  return s
}

export function flame(cx, by, h, glow = true) {
  const w = h * 0.34
  return `${glow ? circle(cx, by - h * 0.45, h * 1.2, 'url(#gGlow)') : ''}<path d="M${cx} ${by - h} C${n1(cx + w * 0.9)} ${n1(by - h * 0.55)} ${n1(cx + w)} ${n1(by - h * 0.25)} ${cx} ${by} C${n1(cx - w)} ${n1(by - h * 0.25)} ${n1(cx - w * 0.9)} ${n1(by - h * 0.55)} ${cx} ${by - h}Z" fill="url(#gFlame)"/><path d="M${cx} ${n1(by - h * 0.55)} C${n1(cx + w * 0.4)} ${n1(by - h * 0.3)} ${n1(cx + w * 0.35)} ${n1(by - h * 0.1)} ${cx} ${by} C${n1(cx - w * 0.35)} ${n1(by - h * 0.1)} ${n1(cx - w * 0.4)} ${n1(by - h * 0.3)} ${cx} ${n1(by - h * 0.55)}Z" fill="${C.cream}" opacity=".92"/>`
}

export function diya(cx, by, s = 1) {
  const w = 34 * s
  return `${circle(cx, by - 6 * s, 56 * s, 'url(#gGlow)', 'opacity=".55"')}${flame(cx, by - 9 * s, 22 * s)}<path d="M${n1(cx - w)} ${n1(by - 10 * s)} Q${cx} ${n1(by + 24 * s)} ${n1(cx + w)} ${n1(by - 10 * s)}Z" fill="url(#gClay)" stroke="${C.gold}" stroke-width="${n1(1.5 * s)}"/><path d="M${n1(cx - w)} ${n1(by - 10 * s)} Q${cx} ${n1(by - 1 * s)} ${n1(cx + w)} ${n1(by - 10 * s)}" fill="none" stroke="${GOLD_L}" stroke-width="${n1(1.4 * s)}"/><path d="M${n1(cx - w * 0.6)} ${n1(by - 3 * s)} Q${cx} ${n1(by + 10 * s)} ${n1(cx + w * 0.6)} ${n1(by - 3 * s)}" fill="none" stroke="${GOLD_L}" stroke-width="${n1(1 * s)}" stroke-dasharray="1 4" stroke-linecap="round" opacity=".8"/>`
}

export function kalash(cx, by, s = 1) {
  return `<g transform="translate(${n1(cx)} ${n1(by)}) scale(${s})">${leaf(0, -88, 56, -128, C.maroon, 0.95)}${leaf(0, -88, 56, -52, C.maroon, 0.95)}${leaf(0, -88, 50, -90, C.burg, 0.95)}<ellipse cx="0" cy="-92" rx="13" ry="16" fill="url(#gClay)" stroke="${C.gold}" stroke-width="1.4"/><path d="M-20 -76 C-34 -56 -32 -22 -20 0 H20 C32 -22 34 -56 20 -76Z" fill="url(#gGold)"/><path d="M-22 -76 H22" stroke="${C.maroon}" stroke-width="3" opacity=".6"/><path d="M-24 -50 C-8 -42 8 -42 24 -50 M-26 -26 C-8 -18 8 -18 26 -26" fill="none" stroke="${C.maroon}" stroke-opacity=".45" stroke-width="2"/>${circle(-8, -50, 3, C.cream, 'opacity=".5"')}</g>`
}

// ---------------------------------------------------------------- architecture
export const archPath = (x, by, w, h) =>
  `M${x} ${by} V${n1(by - h * 0.62)} C${x} ${n1(by - h * 0.85)} ${n1(x + w * 0.4)} ${n1(by - h * 0.95)} ${n1(x + w / 2)} ${by - h} C${n1(x + w * 0.6)} ${n1(by - h * 0.95)} ${x + w} ${n1(by - h * 0.85)} ${x + w} ${n1(by - h * 0.62)} V${by}Z`

/** Mughal multifoil (cusped) arch. `foils` must be even so a cusp sits at the apex. */
export function cuspArch(x, by, w, h, foils = 6) {
  const cx = x + w / 2
  const spring = by - h * 0.56
  const rx = w / 2
  const ry = spring - (by - h)
  const pts = []
  for (let i = 0; i <= foils; i++) {
    const th = Math.PI - (Math.PI * i) / foils
    pts.push([cx + rx * Math.cos(th), spring - ry * Math.sin(th)])
  }
  pts[foils / 2][1] -= ry * 0.16
  let d = `M${n1(x)} ${n1(by)} V${n1(spring)}`
  for (let i = 1; i <= foils; i++) {
    const [x1, y1] = pts[i - 1]
    const [x2, y2] = pts[i]
    const rr = Math.hypot(x2 - x1, y2 - y1) * 0.56
    d += ` A${n1(rr)} ${n1(rr)} 0 0 1 ${n1(x2)} ${n1(y2)}`
  }
  return d + ` V${n1(by)}Z`
}

const toneOf = (fill) => (fill === C.burg ? 'B' : 'M')

export function dome(cx, by, r, fill = C.maroon, trim = C.gold, ribs = false) {
  const h = r * 1.62
  const grad = fill === C.gold ? 'url(#gGold)' : `url(#gDome${toneOf(fill)})`
  const top = by - h
  let s = `<path d="M${n1(cx - r)} ${by} C${n1(cx - r * 1.22)} ${n1(by - r * 0.62)} ${n1(cx - r * 0.5)} ${n1(by - r * 1.05)} ${cx} ${n1(top)} C${n1(cx + r * 0.5)} ${n1(by - r * 1.05)} ${n1(cx + r * 1.22)} ${n1(by - r * 0.62)} ${n1(cx + r)} ${by}Z" fill="${grad}"/>`
  s += `<path d="M${n1(cx - r * 0.82)} ${n1(by - r * 0.3)} C${n1(cx - r * 0.95)} ${n1(by - r * 0.8)} ${n1(cx - r * 0.4)} ${n1(by - r * 1.08)} ${n1(cx - r * 0.05)} ${n1(top + r * 0.2)}" fill="none" stroke="${C.cream}" stroke-opacity=".22" stroke-width="${n1(Math.max(1.2, r * 0.05))}" stroke-linecap="round"/>`
  if (ribs) {
    for (const k of [-0.62, -0.3, 0.3, 0.62]) s += `<path d="M${n1(cx + r * k)} ${by} C${n1(cx + r * k * 1.5)} ${n1(by - r * 0.7)} ${n1(cx + r * k * 0.6)} ${n1(by - r * 1.0)} ${cx} ${n1(top)}" fill="none" stroke="${trim}" stroke-opacity=".28" stroke-width="1.2"/>`
  }
  // lotus-petal collar + base ring
  const nPet = Math.max(5, Math.round(r / 7))
  const pw = (r * 2.1) / nPet
  for (let i = 0; i < nPet; i++) {
    const px = cx - r * 1.05 + pw * (i + 0.5)
    s += `<path d="M${n1(px - pw * 0.5)} ${by - 1} Q${n1(px)} ${n1(by - 14 - r * 0.08)} ${n1(px + pw * 0.5)} ${by - 1}Z" fill="${trim}" opacity=".5"/>`
  }
  s += `<rect x="${n1(cx - r * 1.08)}" y="${n1(by - 4)}" width="${n1(r * 2.16)}" height="6" rx="2" fill="url(#gGold)" opacity=".95"/>`
  // kalash finial
  const fh = r * 0.5
  s += `<line x1="${cx}" y1="${n1(top)}" x2="${cx}" y2="${n1(top - fh)}" stroke="${trim}" stroke-width="${n1(Math.max(1.6, r * 0.04))}"/>`
  s += `<ellipse cx="${cx}" cy="${n1(top - fh * 0.38)}" rx="${n1(Math.max(2.2, r * 0.07))}" ry="${n1(Math.max(2.8, r * 0.09))}" fill="url(#gGold)"/>`
  s += `<circle cx="${cx}" cy="${n1(top - fh)}" r="${n1(Math.max(2, r * 0.06))}" fill="url(#gGold)"/>`
  return s
}

export function chhatri(cx, by, w, fill = C.maroon, trim = C.gold) {
  const h = w * 0.9
  const ph = h * 0.55
  const body = `url(#gBody${toneOf(fill)})`
  let s = rect(cx - w / 2, by - 6, w, 6, body)
  // dark arcade openings between slim pillars
  const gap = (w - 8) / 3
  for (let i = 0; i < 3; i++) {
    const ax = cx - w / 2 + 6 + i * gap
    s += `<path d="${archPath(ax, by - 6, gap - 4, ph)}" fill="${C.esp}" opacity=".55"/>`
  }
  for (let i = 0; i < 4; i++) {
    const px = cx - w / 2 + 2 + (i * (w - 8)) / 3
    s += rect(px, by - 6 - ph, 4, ph, body)
  }
  s += rect(cx - w * 0.56, by - 6 - ph - 5, w * 1.12, 5, body)
  s += rect(cx - w * 0.56, by - 6 - ph - 5, w * 1.12, 1.6, trim, 'opacity=".75"')
  s += dome(cx, by - 6 - ph - 5, w * 0.4, fill, trim)
  return s
}

/** Cusped, lit window. Returns [glow, glass] so palaces can blur one combined glow layer. */
function windowParts(x, by, w, h, lit, frame) {
  const d = w >= 56 ? cuspArch(x, by, w, h, w >= 90 ? 6 : 4) : archPath(x, by, w, h)
  const glass = lit
    ? `<path d="${d}" fill="url(#gWinGlow)"/>${w >= 40 ? `<path d="${d}" fill="url(#pJali)" opacity=".8"/>` : ''}`
    : `<path d="${d}" fill="${C.esp}" opacity=".55"/>`
  const edge = `<path d="${d}" fill="none" stroke="${frame}" stroke-width="${w >= 56 ? 2 : 1.4}" stroke-opacity=".85"/>`
  return [lit ? `<path d="${d}"/>` : '', glass + edge]
}

export const archWindow = (x, by, w, h, lit = true, frame = C.gold) => windowParts(x, by, w, h, lit, frame)[1]

/** Palace skyline in a 1000×520 local box, base at y=520. */
export function palace({ x = 0, y = 0, s = 1, fill = C.maroon, trim = C.gold, lit = true, glow = true, id = '' }) {
  const body = `url(#gBody${toneOf(fill)})`
  const gl = []
  const win = []
  const addWin = (...a) => {
    const [g1, g2] = windowParts(...a)
    gl.push(g1)
    win.push(g2)
  }
  let b = ''
  b += rect(0, 440, 1000, 80, body)
  b += rect(120, 350, 230, 92, body) + rect(650, 350, 230, 92, body)
  b += rect(0, 300, 130, 142, body) + rect(870, 300, 130, 142, body)
  b += rect(330, 250, 340, 192, body)
  b += rect(430, 196, 140, 56, body)
  // scalloped parapets
  const merlon = (px, py) => `<path d="M${px} ${py + 10} V${py + 3} Q${px + 5.5} ${py - 7} ${px + 11} ${py + 3} V${py + 10}Z" fill="${body}"/>`
  for (let i = 0; i < 17; i++) b += merlon(332 + i * 20, 241)
  for (let i = 0; i < 11; i++) b += merlon(122 + i * 21, 341) + merlon(652 + i * 21, 341)
  b += dome(500, 196, 72, fill, trim, true)
  b += dome(65, 300, 50, fill, trim) + dome(935, 300, 50, fill, trim)
  b += chhatri(185, 350, 58, fill, trim) + chhatri(815, 350, 58, fill, trim)
  b += chhatri(375, 250, 50, fill, trim) + chhatri(625, 250, 50, fill, trim)
  b += chhatri(268, 350, 36, fill, trim) + chhatri(732, 350, 36, fill, trim)
  // cornices with dentils
  const cornice = (x1, x2, yy) => {
    let c = `<line x1="${x1}" y1="${yy}" x2="${x2}" y2="${yy}" stroke="${trim}" stroke-opacity=".7" stroke-width="2.6"/>`
    for (let px = x1 + 3; px < x2 - 4; px += 9) c += `<rect x="${px}" y="${yy + 2}" width="4" height="5" fill="${trim}" opacity=".35"/>`
    return c
  }
  b += cornice(330, 670, 252) + cornice(120, 350, 352) + cornice(650, 880, 352) + cornice(0, 130, 302) + cornice(870, 1000, 302) + cornice(0, 1000, 442)
  // soft pilasters
  b += `<g stroke="${trim}" stroke-opacity=".16" stroke-width="2">`
  for (const px of [335, 425, 575, 665, 124, 346, 654, 876]) b += `<line x1="${px}" y1="${px < 130 || px > 870 ? 306 : px > 330 && px < 670 ? 256 : 356}" x2="${px}" y2="440"/>`
  b += '</g>'
  // balconies (jharokha) on the central block
  for (const bx of [352, 596]) {
    b += `<path d="M${bx - 6} 436 h64 v-8 h-64z" fill="url(#gGold)" opacity=".9"/>`
    b += `<path d="M${bx - 2} 328 h56 v100 h-56z" fill="${body}" stroke="${trim}" stroke-opacity=".35" stroke-width="1.6"/>`
  }
  // windows
  addWin(436, 440, 128, 150, lit)
  addWin(458, 440, 84, 108, false, trim)
  addWin(352, 428, 52, 90, lit)
  addWin(596, 428, 52, 90, lit)
  addWin(456, 240, 88, 42, lit)
  for (let i = 0; i < 4; i++) addWin(146 + i * 50, 432, 30, 64, lit)
  for (let i = 0; i < 4; i++) addWin(704 + i * 50, 432, 30, 64, lit)
  for (let i = 0; i < 2; i++) {
    addWin(34 + i * 50, 432, 28, 68, lit)
    addWin(888 + i * 50, 432, 28, 68, lit)
  }
  for (let i = 0; i < 13; i++) addWin(14 + i * 76, 520, 28, 48, lit && i % 2 === 0, trim)
  if (lit) b += `<g filter="url(#fSoft)" fill="${C.gold}" opacity=".5">${gl.join('')}</g>`
  b += win.join('')
  const halo = glow ? circle(500, 400, 380, 'url(#gGlow)', 'opacity=".5"') : ''
  return `<g ${id ? `id="${id}" ` : ''}transform="translate(${n1(x)} ${n1(y)}) scale(${n2(s)})">${halo}${b}</g>`
}

/** Jharokha (arched window frame) used as a decorative frame. */
export function frameArch(x, y, w, h, stroke = C.gold, fill = 'none', sw = 4) {
  return `<path d="${archPath(x, y + h, w, h)}" fill="${fill}" stroke="${stroke === C.gold ? 'url(#gGold)' : stroke}" stroke-width="${sw}"/>`
}

export function mandap({ x = 0, y = 0, s = 1, fill = C.maroon, fire = true, canopy = C.burg }) {
  // local box 600 wide, base y=0, height ~ 460 going up (negative y)
  let b = ''
  b += circle(300, -170, 270, 'url(#gGlow)', 'opacity=".5"')
  // floor with rangoli ring
  b += `<ellipse cx="300" cy="-6" rx="270" ry="22" fill="${C.esp}" opacity=".35"/>`
  b += rect(70, -20, 460, 20, C.champ) + rect(50, -6, 500, 10, 'url(#gGold)')
  b += `<ellipse cx="300" cy="-10" rx="150" ry="9" fill="none" stroke="${C.terra}" stroke-width="2" opacity=".6"/><ellipse cx="300" cy="-10" rx="120" ry="7" fill="none" stroke="${C.gold}" stroke-width="1.4" stroke-dasharray="2 6" stroke-linecap="round"/>`
  // drapes behind
  b += `<path d="M110 -330 C130 -250 120 -170 112 -40 L212 -40 C204 -170 190 -250 214 -330Z" fill="${C.maroon}" opacity=".85"/><path d="M386 -330 C410 -250 396 -170 388 -40 L488 -40 C480 -170 470 -250 490 -330Z" fill="${C.maroon}" opacity=".85"/>`
  b += `<g stroke="${C.gold}" stroke-opacity=".35" stroke-width="1.4" fill="none"><path d="M140 -320 C150 -250 142 -170 136 -50 M170 -322 C176 -250 172 -170 168 -50 M412 -322 C418 -250 414 -170 410 -50 M444 -320 C450 -250 442 -170 438 -50"/></g>`
  // pillars
  for (const px of [95, 205, 385, 495]) {
    b += rect(px - 10, -320, 20, 300, 'url(#gPillar)')
    b += `<path d="M${px - 17} -22 h34 l-4 -10 h-26z" fill="url(#gGold)"/><path d="M${px - 15} -330 h30 l5 -14 h-40z" fill="url(#gGold)"/>`
    for (let i = 0; i < 6; i++) b += `<rect x="${px - 10}" y="${-300 + i * 46}" width="20" height="3" fill="${C.maroon}" opacity=".3"/>`
    b += `<rect x="${px - 4}" y="-318" width="2.4" height="296" fill="${C.cream}" opacity=".3"/>`
  }
  // canopy
  b += `<path d="M56 -330 L544 -330 L504 -408 L96 -408Z" fill="${canopy}"/>`
  b += `<path d="M96 -408 L504 -408 L462 -448 L138 -448Z" fill="${fill}"/>`
  b += `<path d="M56 -330 L544 -330 L504 -408 L96 -408Z" fill="url(#gSilkB)" opacity=".5"/>`
  b += dome(300, -448, 62, C.gold, C.cream)
  b += rect(56, -336, 488, 7, 'url(#gGold)')
  for (let i = 0; i < 16; i++) b += `<path d="M${68 + i * 30} -329 q9 22 18 0Z" fill="${C.gold}" opacity=".95"/>${circle(77 + i * 30, -308, 2.2, GOLD_L)}`
  // hanging garlands + bells
  for (let i = 0; i < 5; i++) b += hangingString(120 + i * 90, -328, 60 + (i % 2) * 24, 4, 7)
  b += garland(95, -282, 205, -282, 34, 5, 9) + garland(385, -282, 495, -282, 34, 5, 9)
  b += garland(205, -302, 385, -302, 46, 9, 8)
  // kalash pots
  b += kalash(44, -4, 0.62) + kalash(556, -4, 0.62)
  // havan kund
  b += rect(236, -66, 128, 46, 'url(#gClay)') + rect(228, -70, 144, 10, 'url(#gGold)')
  b += `<path d="M246 -40 h108 M246 -30 h108" stroke="${C.gold}" stroke-opacity=".5" stroke-width="1.4" stroke-dasharray="3 5"/>`
  if (fire) b += flame(300, -70, 78) + flame(272, -68, 44, false) + flame(328, -68, 46, false)
  // seats with cushions
  b += rect(116, -66, 88, 46, C.burg) + rect(396, -66, 88, 46, C.burg)
  b += rect(112, -72, 96, 9, 'url(#gGold)') + rect(392, -72, 96, 9, 'url(#gGold)')
  b += lotus(160, -78, 22, C.terra) + lotus(440, -78, 22, C.terra)
  // petals on floor
  const r = rng(11)
  for (let i = 0; i < 32; i++) b += `<ellipse cx="${n1(54 + r() * 492)}" cy="${n1(-10 + r() * 14)}" rx="${n1(3 + r() * 3)}" ry="${n1(1.8 + r() * 1.6)}" fill="${i % 2 ? C.gold : C.terra}" transform="rotate(${n1(r() * 180)} ${n1(54 + r() * 492)} -6)" opacity=".92"/>`
  return `<g transform="translate(${n1(x)} ${n1(y)}) scale(${n2(s)})">${b}</g>`
}

export function chandelier(cx, y, s = 1) {
  let b = `<line x1="${cx}" y1="0" x2="${cx}" y2="${y}" stroke="${C.gold}" stroke-width="2" opacity=".7"/>`
  b += circle(cx, y + 60 * s, 100 * s, 'url(#gGlow)')
  b += `<path d="M${n1(cx - 8 * s)} ${y} h${n1(16 * s)} l${n1(6 * s)} ${n1(22 * s)} h${n1(-28 * s)}Z" fill="url(#gGold)"/>`
  for (const [k, w] of [[0, 78], [1, 54], [2, 30]]) {
    const yy = y + 20 * s + k * 30 * s
    b += `<path d="M${n1(cx - w * s)} ${n1(yy + 34 * s)} Q${cx} ${n1(yy - 14 * s)} ${n1(cx + w * s)} ${n1(yy + 34 * s)}" fill="none" stroke="url(#gGold)" stroke-width="${n1(3.2 * s)}"/>`
    for (let i = 0; i < 7; i++) {
      const t = i / 6
      const px = cx - w * s + 2 * w * s * t
      b += `<line x1="${n1(px)}" y1="${n1(yy + 34 * s - Math.sin(t * Math.PI) * 24 * s)}" x2="${n1(px)}" y2="${n1(yy + 52 * s)}" stroke="${C.cream}" stroke-width="1.4" opacity=".7"/>` + circle(px, yy + 54 * s, 3.6 * s, C.cream) + circle(px - 1, yy + 53 * s, 1.1 * s, '#fff', 'opacity=".9"')
    }
  }
  for (let i = 0; i < 5; i++) b += flame(cx - 60 * s + i * 30 * s, y + 24 * s, 12 * s, false)
  return b
}

// ---------------------------------------------------------------- people
const FACE = 'M140 236 C140 190 160 162 200 162 C240 162 260 190 260 236 C260 276 238 312 200 320 C162 312 140 276 140 236Z'
def('clFace', `<clipPath id="clFace"><path d="${FACE}"/></clipPath>`)

const mirror = (inner) => `<g transform="translate(400 0) scale(-1 1)">${inner}</g>`

function eyes(bride) {
  const lid = bride ? 2.8 : 2.2
  const one = `<path d="M166 238 C172 229 188 227 197 236 C188 244 173 245 166 238Z" fill="${C.cream}"/>
<circle cx="182" cy="236.5" r="5.4" fill="url(#gIris)"/><circle cx="182" cy="236.5" r="2.3" fill="#120805"/><circle cx="180.2" cy="234.6" r="1.4" fill="#fff" opacity=".9"/>
<path d="M166 238 C172 229 188 227 197 236 C192 232 176 231 166 238Z" fill="${C.esp}" opacity=".18"/>
<path d="M163.5 238.5 C171 226.5 189 224.5 198.5 236" fill="none" stroke="${C.esp}" stroke-width="${lid}" stroke-linecap="round"/>
<path d="M168 241.5 C176 246.5 189 245.5 196 238.5" fill="none" stroke="${SKIN_D}" stroke-width="1" opacity=".7"/>
${bride ? `<path d="M164 237 l-6 -4" stroke="${C.esp}" stroke-width="2.2" stroke-linecap="round"/><path d="M166 232 C174 218 192 218 199 228" fill="none" stroke="${C.terra}" stroke-width="7" stroke-linecap="round" opacity=".18" filter="url(#fSoft1)"/>` : ''}`
  return one + mirror(one)
}
function brows(bride) {
  const one = bride
    ? `<path d="M161 221 C169 211 186 209 198 215 C186 214 171 216 161 224Z" fill="${C.esp}" opacity=".9"/>`
    : `<path d="M159 222 C167 210 187 207 199 214 C187 213 170 215 159 226Z" fill="${C.esp}"/>`
  return one + mirror(one)
}

function face({ bride = false }) {
  let f = ''
  f += `<ellipse cx="139" cy="246" rx="10.5" ry="18" fill="url(#gSkinD)"/><ellipse cx="261" cy="246" rx="10.5" ry="18" fill="url(#gSkinD)"/>`
  f += `<path d="M137 240 C141 238 142 252 138 256" fill="none" stroke="${SKIN_D}" stroke-width="1.6" opacity=".6"/><path d="M263 240 C259 238 258 252 262 256" fill="none" stroke="${SKIN_D}" stroke-width="1.6" opacity=".6"/>`
  f += `<path d="${FACE}" fill="url(#gSkin)"/>`
  f += `<g clip-path="url(#clFace)"><rect x="130" y="150" width="140" height="170" fill="url(#gSideShade)"/><rect x="130" y="150" width="140" height="62" fill="url(#gShadeTop)"/><ellipse cx="163" cy="276" rx="22" ry="13" fill="${C.terra}" opacity="${bride ? 0.34 : 0.26}" filter="url(#fSoft1)"/><ellipse cx="237" cy="276" rx="22" ry="13" fill="${C.terra}" opacity="${bride ? 0.34 : 0.26}" filter="url(#fSoft1)"/><ellipse cx="200" cy="322" rx="70" ry="12" fill="${C.esp}" opacity=".16" filter="url(#fSoft1)"/></g>`
  f += eyes(bride) + brows(bride)
  // nose
  f += `<path d="M200 238 C196 256 190 268 189 275 C193 281 207 281 211 275 C210 268 204 256 200 238Z" fill="${SKIN_D}" opacity=".24"/>`
  f += `<path d="M204 240 C203 254 205 266 207 273" fill="none" stroke="${C.cream}" stroke-width="2.4" stroke-linecap="round" opacity=".22"/>`
  f += `<ellipse cx="193.5" cy="277" rx="3" ry="1.7" fill="${C.esp}" opacity=".36"/><ellipse cx="206.5" cy="277" rx="3" ry="1.7" fill="${C.esp}" opacity=".36"/>`
  // lips
  const lip = bride ? '#A12D3E' : '#B4665A'
  const lipD = bride ? '#7D1F2E' : '#8E4A40'
  f += `<path d="M183 297 C189 291 196 293 200 295 C204 293 211 291 217 297 C211 301 189 301 183 297Z" fill="${lipD}"/>`
  f += `<path d="M185 298 C192 311 208 311 215 298 C208 303 192 303 185 298Z" fill="${lip}"/>`
  f += `<path d="M192 304.5 C197 307 203 307 208 304.5" fill="none" stroke="${C.cream}" stroke-width="1.6" stroke-linecap="round" opacity=".32"/>`
  f += `<path d="M183 297 C190 300 210 300 217 297" fill="none" stroke="${C.esp}" stroke-width=".9" opacity=".45"/>`
  return f
}

const neckAndShadow = (h = 108) =>
  `<rect x="174" y="296" width="52" height="${h}" rx="16" fill="url(#gNeck)"/><rect x="174" y="312" width="52" height="44" fill="url(#gNeckShade)" opacity=".8"/>`

export function groomBust() {
  let b = ''
  // ---- sherwani torso
  const torso = 'M22 500 C22 428 64 392 134 378 L170 398 L200 410 L230 398 L266 378 C336 392 378 428 378 500Z'
  def('clTorso', `<clipPath id="clTorso"><path d="${torso}"/></clipPath>`)
  b += `<path d="${torso}" fill="url(#gIvory)"/>`
  b += `<g clip-path="url(#clTorso)"><rect x="0" y="370" width="400" height="130" fill="url(#gSideShade)" opacity=".5"/></g>`
  b += `<path d="M200 410 V500" stroke="${C.gold}" stroke-width="3"/>`
  // embroidery (mirrored vines with leaves)
  for (const sx of [-1, 1]) {
    b += `<g transform="translate(200 0) scale(${sx} 1) translate(-200 0)"><path d="M232 424 C262 424 276 446 272 466 C268 486 248 494 232 490" fill="none" stroke="url(#gGold)" stroke-width="2.6"/><path d="M244 436 C258 438 264 450 262 460" fill="none" stroke="${C.gold}" stroke-width="1.6" opacity=".85"/>${leaf(272, 466, 22, -60, C.gold, 0.9)}${leaf(272, 466, 20, 10, C.gold, 0.9)}${leaf(256, 492, 18, 150, C.gold, 0.9)}${circle(276, 448, 3, 'url(#gGold)')}</g>`
  }
  b += `<path d="${torso}" fill="none" stroke="url(#gGold)" stroke-width="3"/>`
  for (const y of [440, 468, 494]) b += circle(200, y, 6, 'url(#gGold)') + circle(198, y - 2, 1.8, '#FFF3CC', 'opacity=".9"')
  // stole
  b += `<path d="M88 398 L140 376 C196 420 290 468 348 500 L246 500 C190 462 128 432 88 398Z" fill="url(#gSilkM)"/>`
  b += `<path d="M88 398 L140 376 C196 420 290 468 348 500" fill="none" stroke="url(#gGold)" stroke-width="4"/><path d="M99 402 L144 385 C198 426 280 470 322 500" fill="none" stroke="${GOLD_L}" stroke-width="1.4" stroke-dasharray="2 5" stroke-linecap="round"/>`
  b += `<path d="M120 400 C170 430 224 466 262 500" fill="none" stroke="${C.cream}" stroke-opacity=".1" stroke-width="10"/>`
  // ---- head group
  b += '<g transform="translate(0 44)">'
  b += neckAndShadow()
  // mandarin collar
  b += `<path d="M166 372 C166 350 234 350 234 372 L230 402 L200 414 L170 402Z" fill="url(#gIvory)" stroke="url(#gGold)" stroke-width="2.6"/>`
  b += `<path d="M178 372 C186 384 214 384 222 372" fill="none" stroke="${C.gold}" stroke-opacity=".7" stroke-width="1.4" stroke-dasharray="1.5 4" stroke-linecap="round"/>`
  b += face({})
  // moustache
  b += `<path d="M171 294 C176 284 190 283 200 288 C210 283 224 284 229 294 C221 291 210 292 200 294 C190 292 179 291 171 294Z" fill="${C.esp}"/>`
  b += `<path d="M178 288 C186 285 194 286 200 289" fill="none" stroke="${C.cream}" stroke-width="1" opacity=".16"/>`
  // tilak
  b += `<path d="M200 196 v20" stroke="${C.terra}" stroke-width="4.2" stroke-linecap="round"/>` + circle(200, 223, 3, C.terra) + circle(199, 222, 1, C.cream, 'opacity=".5"')
  // turban tail behind shoulder
  b += `<path d="M126 214 C96 262 98 330 118 384 C134 340 138 280 150 232Z" fill="url(#gTurb)"/><path d="M118 384 C108 388 102 382 100 374" fill="none" stroke="url(#gGold)" stroke-width="3"/><path d="M126 214 C102 262 104 330 118 384" fill="none" stroke="url(#gGold)" stroke-width="2.4" opacity=".8"/>`
  // turban body
  b += `<path d="M120 234 C102 150 148 88 204 88 C260 88 304 150 282 234 C270 196 240 182 200 182 C160 182 132 196 120 234Z" fill="url(#gTurb)"/>`
  // layered folds
  const folds = [
    'M122 226 C118 168 158 118 224 104 C180 130 150 176 144 230Z',
    'M144 228 C150 176 184 136 240 118 C206 146 184 184 176 214Z',
    'M262 120 C288 148 292 194 278 232 C274 192 266 160 244 136Z',
  ]
  folds.forEach((d, i) => (b += `<path d="${d}" fill="${i % 2 ? '#fff' : '#000'}" opacity="${i % 2 ? 0.07 : 0.1}"/>`))
  for (let i = 0; i < 5; i++) {
    b += `<path d="M${124 + i * 3} ${222 - i * 20} C${156} ${176 - i * 24} ${240} ${170 - i * 24} ${278 - i * 3} ${222 - i * 20}" fill="none" stroke="${C.maroon}" stroke-width="2" opacity=".35"/>`
    b += `<path d="M${124 + i * 3} ${225 - i * 20} C${156} ${179 - i * 24} ${240} ${173 - i * 24} ${278 - i * 3} ${225 - i * 20}" fill="none" stroke="${C.cream}" stroke-width="1" opacity=".1"/>`
  }
  b += `<path d="M126 200 C150 140 216 112 284 168" fill="none" stroke="url(#gGold)" stroke-width="3.6"/><path d="M126 200 C150 140 216 112 284 168" fill="none" stroke="${C.maroon}" stroke-width="1" stroke-dasharray="2 6" opacity=".6" stroke-linecap="round"/>`
  b += `<path d="M120 234 C100 150 148 88 204 88" fill="none" stroke="${C.cream}" stroke-opacity=".12" stroke-width="4"/>`
  // forehead band
  b += `<path d="M122 232 C140 200 166 188 200 188 C234 188 260 200 278 232" fill="none" stroke="url(#gGold)" stroke-width="6"/><path d="M122 232 C140 200 166 188 200 188 C234 188 260 200 278 232" fill="none" stroke="${C.cream}" stroke-width="1.4" stroke-dasharray="1 7" stroke-linecap="round" opacity=".85"/>`
  // sarpech: pearl strands, jewel and plume
  b += `<path d="M168 186 C150 196 140 214 138 232 M232 186 C250 196 260 214 262 232" fill="none" stroke="${C.cream}" stroke-width="2" stroke-dasharray="0.1 6" stroke-linecap="round" opacity=".9"/>`
  b += `<path d="M200 164 C176 132 190 92 232 60 C224 94 224 130 200 164Z" fill="url(#gGold)"/><path d="M200 160 C186 132 194 104 222 76" fill="none" stroke="${C.cream}" stroke-width="1.6" opacity=".65"/>`
  for (let i = 0; i < 6; i++) b += `<path d="M${201 + i * 2} ${150 - i * 14} l${14 - i} ${-5}" stroke="${C.maroon}" stroke-width="1" opacity=".35"/>`
  b += `<path d="M200 146 C214 150 220 162 220 176 C220 190 210 198 200 202 C190 198 180 190 180 176 C180 162 186 150 200 146Z" fill="url(#gGold)" stroke="${C.maroon}" stroke-width="1.2"/>`
  b += circle(200, 174, 8, C.burg) + circle(198, 171.5, 2.6, '#FFC9D0', 'opacity=".7"') + circle(200, 174, 11, 'none', `stroke="${C.cream}" stroke-width="1" stroke-opacity=".5"`)
  b += '</g>'
  // varmala
  b += garland(140, 372, 260, 372, 100, 9, 15)
  b += `<path d="M146 380 C170 470 230 470 254 380" fill="none" stroke="${C.cream}" stroke-width="3.4" stroke-dasharray="0.1 7" stroke-linecap="round" opacity=".9"/>`
  return b
}

export function brideBust() {
  let b = '<g transform="translate(0 44)">'
  // hair behind
  b += `<path d="M118 240 C112 150 160 112 200 112 C242 112 290 150 282 240 C288 300 276 340 266 372 L134 372 C124 340 112 300 118 240Z" fill="url(#gHair)"/>`
  // dupatta (back)
  b += `<path d="M200 96 C116 98 86 190 92 292 C96 352 68 400 42 456 L358 456 C332 400 304 352 308 292 C314 190 284 98 200 96Z" fill="url(#gSilkM)"/>`
  b += `<path d="M120 150 C98 210 108 290 96 360 M176 120 C160 190 168 260 150 330" fill="none" stroke="${C.cream}" stroke-opacity=".07" stroke-width="12" stroke-linecap="round"/>`
  b += `<path d="M200 96 C116 98 86 190 92 292 C96 352 68 400 42 456" fill="none" stroke="url(#gGold)" stroke-width="5.5"/>`
  b += `<path d="M200 96 C284 98 314 190 308 292 C304 352 332 400 358 456" fill="none" stroke="url(#gGold)" stroke-width="5.5"/>`
  b += `<path d="M104 150 C94 200 96 250 100 300 M296 150 C306 200 304 250 300 300" fill="none" stroke="${C.gold}" stroke-width="1.6" stroke-dasharray="1 7" stroke-linecap="round" opacity=".85"/>`
  b += `<path d="M200 96 C116 98 86 190 92 292 C96 352 68 400 42 456" fill="none" stroke="${C.cream}" stroke-width="1.4" stroke-dasharray="0.1 8" stroke-linecap="round" opacity=".8" transform="translate(7 0)"/>`
  b += '</g>'
  // neck + decolletage (under the blouse)
  b += `<rect x="172" y="316" width="56" height="124" rx="16" fill="url(#gNeck)"/><rect x="172" y="332" width="56" height="44" fill="url(#gNeckShade)" opacity=".8"/>`
  b += `<path d="M136 382 C170 394 230 394 264 382 L252 386 C228 428 172 428 148 386Z" fill="url(#gSkin)"/>`
  b += `<path d="M160 392 C176 398 186 398 194 394 M240 392 C224 398 214 398 206 394" fill="none" stroke="${SKIN_D}" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>`
  // blouse / lehenga top
  const top = 'M28 500 C28 430 72 398 138 382 L148 386 C172 428 228 428 252 386 L262 382 C328 398 372 430 372 500Z'
  b += `<path d="${top}" fill="url(#gSilkB)"/>`
  b += `<path d="M28 500 C28 436 60 408 100 394 C70 430 66 470 70 500Z" fill="${C.maroon}" opacity=".35"/><path d="M372 500 C372 436 340 408 300 394 C330 430 334 470 330 500Z" fill="${C.maroon}" opacity=".35"/>`
  b += `<path d="M148 386 C172 428 228 428 252 386" fill="none" stroke="url(#gGold)" stroke-width="4.4"/>`
  for (const sx of [-1, 1]) {
    b += `<g transform="translate(200 0) scale(${sx} 1) translate(-200 0)"><path d="M118 442 C100 462 100 484 112 500 M138 434 C120 456 120 484 132 500" fill="none" stroke="url(#gGold)" stroke-width="2.2" opacity=".9"/>${leaf(112, 470, 20, 120, C.gold, 0.85)}${leaf(126, 460, 18, 60, C.gold, 0.85)}${circle(108, 462, 3, 'url(#gGold)')}${circle(126, 474, 3, 'url(#gGold)')}</g>`
  }
  b += `<path d="${top}" fill="none" stroke="url(#gGold)" stroke-width="3.2"/>`
  b += '<g transform="translate(0 44)">'
  b += face({ bride: true })
  // hair + parting
  b += `<path d="M138 234 C132 154 170 120 200 120 C232 120 268 154 262 234 C256 192 232 160 200 156 C168 160 144 192 138 234Z" fill="url(#gHair)"/>`
  b += `<path d="M160 168 C172 150 188 142 200 140 M240 168 C228 150 212 142 200 140" fill="none" stroke="${C.cream}" stroke-width="2" opacity=".1"/>`
  b += `<path d="M200 120 V158" stroke="${C.terra}" stroke-width="3.2" stroke-linecap="round"/><path d="M200 128 V156" stroke="${C.burg}" stroke-width="2" stroke-linecap="round" opacity=".7"/>`
  // veil opening border
  b += `<path d="M128 240 C120 148 166 110 200 110 C236 110 280 148 272 240" fill="none" stroke="url(#gGold)" stroke-width="6"/>`
  b += `<path d="M128 240 C120 148 166 110 200 110 C236 110 280 148 272 240" fill="none" stroke="${C.cream}" stroke-width="1.5" stroke-dasharray="0.1 7" stroke-linecap="round" opacity=".9"/>`
  // matha patti
  b += `<path d="M146 214 C158 178 180 164 200 164 C220 164 242 178 254 214" fill="none" stroke="url(#gGold)" stroke-width="2.6"/>`
  for (let i = 0; i < 9; i++) {
    const t = i / 8
    const a = Math.PI * (0.18 + t * 0.64)
    const px = 200 - Math.cos(a) * 54
    const py = 214 - Math.sin(a) * 50 + 0
    b += circle(px, py + 1, 2.6, i % 2 ? C.cream : C.burg, `stroke="${C.gold}" stroke-width=".9"`)
  }
  // maang tikka
  b += `<path d="M200 164 V188" stroke="url(#gGold)" stroke-width="2.4"/>` + `<path d="M200 184 C214 188 214 202 214 206 C214 216 206 222 200 226 C194 222 186 216 186 206 C186 202 186 188 200 184Z" fill="url(#gGold)" stroke="${C.maroon}" stroke-width="1"/>` + circle(200, 205, 5.4, C.burg) + circle(198.6, 203.4, 1.6, '#FFC9D0', 'opacity=".7"') + circle(200, 230, 2.2, C.cream)
  // bindi
  b += circle(200, 222, 3.8, C.burg) + circle(199, 221, 1, '#FFC9D0', 'opacity=".6"')
  // nath
  b += `<circle cx="187" cy="276" r="9.5" fill="none" stroke="url(#gGold)" stroke-width="2.4"/>` + circle(182.5, 286, 3.3, C.cream) + circle(181.6, 285, 1, '#fff', 'opacity=".9"') + circle(187, 266.8, 2, C.burg)
  // jhumkas
  for (const sx of [139, 261]) {
    b += `<circle cx="${sx}" cy="262" r="3.6" fill="url(#gGold)"/><path d="M${sx} 266 v10" stroke="${C.gold}" stroke-width="2.2"/><path d="M${sx - 11} 298 C${sx - 12} 282 ${sx + 12} 282 ${sx + 11} 298 C${sx + 6} 303 ${sx - 6} 303 ${sx - 11} 298Z" fill="url(#gGold)" stroke="${C.maroon}" stroke-width=".8" stroke-opacity=".5"/>`
    b += `<path d="M${sx - 7} 292 h14" stroke="${C.maroon}" stroke-opacity=".35" stroke-width="1"/>` + [-8, -3, 3, 8].map((dx) => circle(sx + dx, 306 + Math.abs(dx) * -0.15, 1.9, C.cream)).join('')
  }
  b += '</g>'
  // necklace
  b += `<path d="M154 394 C170 424 230 424 246 394" fill="none" stroke="url(#gGold)" stroke-width="3.6"/><path d="M144 404 C164 454 236 454 256 404" fill="none" stroke="url(#gGold)" stroke-width="3.2"/>`
  for (let i = 0; i < 9; i++) {
    const t = i / 8
    const px = 158 + t * 84
    const py = 436 + Math.sin(t * Math.PI) * 17
    b += circle(px, py, 4.4, 'url(#gGold)') + circle(px, py, 2.6, i % 2 ? C.cream : C.burg)
  }
  for (let i = 0; i < 11; i++) {
    const t = i / 10
    b += circle(150 + t * 100, 412 + Math.sin(t * Math.PI) * 30, 2.2, C.cream, `stroke="${C.gold}" stroke-width=".6"`)
  }
  b += `<path d="M200 466 l-9 13 l9 16 l9 -16Z" fill="url(#gGold)" stroke="${C.maroon}" stroke-width=".8" stroke-opacity=".5"/>` + circle(200, 478, 3.4, C.burg)
  return b
}

export const groom = (x, y, s = 1, r = 0) => place(groomBust(), x - 200 * s, y - 500 * s, s, r)
export const bride = (x, y, s = 1, r = 0) => place(brideBust(), x - 200 * s, y - 500 * s, s, r)

/** Elegant portrait backdrop used for the bride/groom frames and gallery. */
export function portraitBackdrop(w, h, tone = 'light') {
  const dark = tone === 'dark'
  const arch = archPath(w * 0.07, h * 0.05 + h * 0.95, w * 0.86, h * 0.95)
  let b = rect(0, 0, w, h, dark ? 'url(#gNight)' : 'url(#gPaper)')
  b += circle(w / 2, h * 0.42, w * 0.78, dark ? 'url(#gGlow)' : 'url(#gWarm)')
  b += `<clipPath id="clArch"><path d="${arch}"/></clipPath><g clip-path="url(#clArch)"><rect width="${w}" height="${h}" fill="url(#pJaliL)" opacity="${dark ? 0.7 : 0.55}"/>${bokeh(w, h * 0.7, 9, 14, h * 0.7, w * 0.03, w * 0.09)}</g>`
  b += mandala(w / 2, h * 0.4, w * 0.54, C.gold, dark ? 0.55 : 0.75, 1.6)
  b += mandala(w / 2, h * 0.4, w * 0.4, C.terra, 0.38, 1.2)
  b += circle(w / 2, h * 0.4, w * 0.3, 'url(#gGlow)', 'opacity=".5"')
  b += frameArch(w * 0.07, h * 0.05, w * 0.86, h * 0.95, C.gold, 'none', 6)
  b += frameArch(w * 0.105, h * 0.085, w * 0.79, h * 0.915, C.gold, 'none', 1.6)
  // beads along the inner arch
  b += `<path d="${archPath(w * 0.088, h * 0.05 + h * 0.95 - 0, w * 0.824, h * 0.95)}" fill="none" stroke="${C.gold}" stroke-width="3" stroke-dasharray="0.1 14" stroke-linecap="round" opacity=".8"/>`
  const r = rng(5)
  for (let i = 0; i < 20; i++) b += sparkle(r() * w, r() * h * 0.55, 3 + r() * 5, C.gold, n1(0.35 + r() * 0.5))
  // soft floor glow
  b += `<ellipse cx="${w / 2}" cy="${h}" rx="${w * 0.6}" ry="${h * 0.12}" fill="${C.gold}" opacity=".25" filter="url(#fSoft2)"/>`
  return b
}

export function floralCorner(x, y, s = 1, flip = 1) {
  let b = ''
  b += leaf(0, 0, 100, -18, C.maroon, 0.9) + leaf(0, 0, 92, -52, C.burg, 0.9) + leaf(0, 0, 82, 14, C.maroon, 0.85) + leaf(0, 0, 70, -84, C.burg, 0.85)
  b += marigold(20, -14, 28, C.gold) + marigold(58, -32, 22, C.terra) + marigold(-8, -54, 20, C.gold) + marigold(46, 8, 16, C.gold)
  b += rose(30, -42, 18) + rose(80, 4, 14)
  b += jasmine(84, -26, 9) + jasmine(12, -86, 8) + jasmine(74, -62, 8) + jasmine(52, -76, 7)
  return `<g transform="translate(${n1(x)} ${n1(y)}) scale(${flip * s} ${s})">${b}</g>`
}

export function vignette(w, h) {
  return rect(0, 0, w, h, 'url(#gVig)')
}
