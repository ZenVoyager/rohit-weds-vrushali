// Generates the original illustrated artwork used by the demo invitation into /public/images.
// Run with:  node scripts/make-art.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import {
  C, GOLD_L, GOLD_D, SKIN, svg, rect, circle, stars, moon, sun, mandala, marigold, rose, jasmine, leaf, lotus,
  garland, hangingString, lightString, flame, diya, archPath, dome, chhatri, archWindow, palace, frameArch, mandap,
  chandelier, groom, bride, portraitBackdrop, floralCorner, vignette, rng, place, sparkle, bokeh, clouds, kalash,
} from './lib/art-kit.mjs'

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images')
mkdirSync(OUT, { recursive: true })
const write = (name, content) => writeFileSync(path.join(OUT, name), content)

// ---------------------------------------------------------------- patterns & ornament tiles
const star8 = (cx, cy, R, r) => {
  let d = ''
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI) / 8 - Math.PI / 2
    const rad = i % 2 ? r : R
    d += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * rad).toFixed(1)} ${(cy + Math.sin(a) * rad).toFixed(1)}`
  }
  return d + 'Z'
}
function jaaliTile(stroke, op) {
  const petals = (cx, cy, R) =>
    [0, 90, 180, 270].map((a) => `<path d="M${cx} ${cy - R * 0.55} C${cx + R * 0.26} ${cy - R * 0.8} ${cx + R * 0.2} ${cy - R * 1.05} ${cx} ${cy - R * 1.25} C${cx - R * 0.2} ${cy - R * 1.05} ${cx - R * 0.26} ${cy - R * 0.8} ${cx} ${cy - R * 0.55}Z" transform="rotate(${a} ${cx} ${cy})"/>`).join('')
  let g = `<g fill="none" stroke="${stroke}" stroke-width="1" opacity="${op}" stroke-linejoin="round">`
  g += '<path d="M80 8 L152 80 L80 152 L8 80Z"/><path d="M80 24 L136 80 L80 136 L24 80Z" stroke-opacity=".7"/>'
  g += `<path d="${star8(80, 80, 30, 14)}"/><circle cx="80" cy="80" r="5"/>`
  g += petals(80, 80, 22)
  for (const [x, y] of [[0, 0], [160, 0], [0, 160], [160, 160]]) g += `<circle cx="${x}" cy="${y}" r="24"/><circle cx="${x}" cy="${y}" r="17" stroke-dasharray="1 4" stroke-linecap="round"/><path d="${star8(x, y, 16, 8)}"/>`
  for (const [x, y] of [[80, 0], [0, 80], [160, 80], [80, 160]]) g += `<circle cx="${x}" cy="${y}" r="5"/><circle cx="${x}" cy="${y}" r="1.4" fill="${stroke}"/>`
  g += '<path d="M24 24 L56 56 M136 24 L104 56 M24 136 L56 104 M136 136 L104 104" stroke-opacity=".6"/>'
  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">${g}</g></svg>`
}
write('pattern-jaali.svg', jaaliTile(C.gold, 0.24))
write('pattern-jaali-gold.svg', jaaliTile(C.gold, 0.2))

// scalloped lace trim (top edge / bottom edge)
const scallop = (flip) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24"><g ${flip ? 'transform="translate(0 24) scale(1 -1)"' : ''} fill="none" stroke="${C.gold}" stroke-linecap="round"><path d="M0 2 H28" stroke-width="1.6" opacity=".9"/><path d="M0 2 Q14 24 28 2" stroke-width="1.2" opacity=".75"/><path d="M5 2 Q14 15 23 2" stroke-width="1" opacity=".5"/><circle cx="14" cy="15.5" r="1.8" fill="${C.gold}" stroke="none" opacity=".85"/><circle cx="0" cy="2" r="2" fill="${C.gold}" stroke="none"/></g></svg>`
write('trim-scallop.svg', scallop(false))
write('trim-scallop-flip.svg', scallop(true))

// quarter-mandala corner ornaments (gold line art, for dark sections)
write('corner-mandala-tl.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="260" viewBox="0 0 260 260">${mandala(0, 0, 250, C.gold, 0.5, 1.3)}${mandala(0, 0, 170, C.gold, 0.35, 1)}</svg>`)
write('corner-mandala-br.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="260" viewBox="0 0 260 260">${mandala(260, 260, 250, C.gold, 0.5, 1.3)}${mandala(260, 260, 170, C.gold, 0.35, 1)}</svg>`)

// full-colour floral corners (for light sections)
write('floral-tl.svg', svg(300, 300, `<g opacity=".95"><g transform="translate(14 14) scale(2.5 -2.5)">${floralCorner(0, 0, 1, 1)}</g></g>`))
write('floral-br.svg', svg(300, 300, `<g opacity=".95"><g transform="translate(286 286) scale(-2.5 2.5)">${floralCorner(0, 0, 1, 1)}</g></g>`))

// soft paper grain
write('paper-grain.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><filter id="n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .42  0 0 0 0 .3  0 0 0 0 .2  0 0 0 .55 0"/></filter><rect width="240" height="240" filter="url(#n)" opacity=".16"/></svg>`)

// ---------------------------------------------------------------- cover
function cover(w, h) {
  const portrait = h > w
  const base = h - (portrait ? 170 : 128) // waterline
  const ps = portrait ? 1.6 : (h * 0.5) / 520
  const wh = h - base
  const cx = portrait ? 0.3 : 0.32
  let b = rect(0, 0, w, h, 'url(#gSky)')
  b += clouds(w, h * 0.12, h * 0.55, portrait ? 4 : 7, 21, C.terra, 0.34)
  b += bokeh(w, h * 0.55, portrait ? 10 : 18, 8, h * 0.55, 10, portrait ? 44 : 40)
  b += stars(w, h, portrait ? 90 : 130, 21, C.gold, h * 0.6)
  const mr = Math.min(w, h) * (portrait ? 0.15 : 0.12)
  b += moon(w * (portrait ? 0.8 : 0.84), h * (portrait ? 0.14 : 0.2), mr * 0.62)
  b += mandala(w / 2, h * cx, Math.min(w, h) * (portrait ? 0.5 : 0.36), C.gold, 0.3, 1.6)
  b += mandala(w / 2, h * cx, Math.min(w, h) * (portrait ? 0.37 : 0.27), C.gold, 0.24, 1.2)
  // distant hills + haze
  b += `<path d="M0 ${base} V${base - h * 0.1} C${w * 0.12} ${base - h * 0.17} ${w * 0.24} ${base - h * 0.09} ${w * 0.38} ${base - h * 0.14} C${w * 0.52} ${base - h * 0.19} ${w * 0.66} ${base - h * 0.08} ${w * 0.8} ${base - h * 0.13} C${w * 0.9} ${base - h * 0.16} ${w * 0.96} ${base - h * 0.11} ${w} ${base - h * 0.12} V${base}Z" fill="#46101E" opacity=".55"/>`
  // far palaces (hazy), then the main palace
  const far = (px) => palace({ x: px, y: base - 520 * ps * 0.7, s: ps * 0.7, fill: C.burg, lit: false, glow: false }).replace('<g ', '<g opacity=".5" filter="url(#fSoft1)" ')
  b += far(w / 2 - 500 * ps * 0.7 - (portrait ? 0 : w * 0.34))
  if (!portrait) b += far(w / 2 - 500 * ps * 0.7 + w * 0.34)
  b += rect(0, base - h * 0.2, w, h * 0.2, 'url(#gHaze)', 'opacity=".35"')
  b += palace({ x: w / 2 - 500 * ps, y: base - 520 * ps, s: ps, fill: C.maroon, id: 'palMain' })
  // water + mirror image of the palace
  b += rect(0, base, w, wh, 'url(#gWater)')
  b += `<g clip-path="url(#clWater)"><use href="#palMain" transform="translate(0 ${2 * base}) scale(1 -1)" opacity=".34" mask="url(#mRefl)" filter="url(#fSoft1)"/></g>`
  const rr = rng(77)
  for (let i = 0; i < (portrait ? 14 : 26); i++) {
    const y = base + 10 + rr() * (wh - 18)
    b += `<ellipse cx="${(rr() * w).toFixed(0)}" cy="${y.toFixed(0)}" rx="${(40 + rr() * 140).toFixed(0)}" ry="${(1.4 + rr() * 2).toFixed(1)}" fill="${C.gold}" opacity="${(0.1 + rr() * 0.16).toFixed(2)}"/>`
  }
  b += rect(0, base - 3, w, 5, 'url(#gGold)', 'opacity=".7"')
  // hanging marigold strings
  const n = portrait ? 9 : 22
  for (let i = 0; i < n; i++) {
    const x = (w / n) * (i + 0.5)
    b += hangingString(x, -10, (portrait ? 150 : 56) + ((i * 37) % (portrait ? 70 : 38)), portrait ? 6 : 5, portrait ? 11 : 10)
  }
  b += lightString(0, h * 0.08, w, h * 0.08, 28, portrait ? 14 : 28, 4)
  // floating diyas with reflected glow
  const dn = portrait ? 5 : 11
  for (let i = 0; i < dn; i++) {
    const dx = (w / (dn + 1)) * (i + 1) + ((i * 53) % 40) - 20
    const dy = h - 30 - ((i * 29) % 24)
    b += `<ellipse cx="${dx.toFixed(0)}" cy="${dy + 8}" rx="${portrait ? 54 : 46}" ry="9" fill="${C.gold}" opacity=".25" filter="url(#fSoft1)"/>`
    b += diya(dx, dy, portrait ? 0.9 : 0.8)
  }
  // scattered petals on the water
  for (let i = 0; i < 24; i++) b += `<ellipse cx="${(rr() * w).toFixed(0)}" cy="${(base + 8 + rr() * (wh - 12)).toFixed(0)}" rx="${(5 + rr() * 5).toFixed(1)}" ry="${(2.4 + rr() * 2).toFixed(1)}" fill="${i % 2 ? C.gold : C.terra}" opacity=".8" transform="rotate(${(rr() * 40 - 20).toFixed(0)} ${(rr() * w).toFixed(0)} ${base + 20})"/>`
  b += vignette(w, h)
  const extra = `<clipPath id="clWater"><rect x="0" y="${base}" width="${w}" height="${wh}"/></clipPath><linearGradient id="gFadeR" gradientUnits="userSpaceOnUse" x1="0" y1="${base}" x2="0" y2="${h}"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="mRefl" maskUnits="userSpaceOnUse" x="0" y="${base}" width="${w}" height="${wh}"><rect x="0" y="${base}" width="${w}" height="${wh}" fill="url(#gFadeR)"/></mask>`
  return svg(w, h, b, extra)
}
write('cover-bg.svg', cover(1920, 1080))
write('cover-bg-mobile.svg', cover(1080, 1920))


write('palace-silhouette.svg', svg(1000, 520, palace({ fill: C.burg, lit: true, glow: false })))

// ---------------------------------------------------------------- portraits
write(
  'groom.svg',
  svg(800, 1000, portraitBackdrop(800, 1000) + groom(400, 1010, 1.85) + floralCorner(70, 990, 1.5) + floralCorner(730, 990, 1.5, -1)),
)
write(
  'bride.svg',
  svg(800, 1000, portraitBackdrop(800, 1000) + bride(400, 1010, 1.85) + floralCorner(70, 990, 1.5) + floralCorner(730, 990, 1.5, -1)),
)

// ---------------------------------------------------------------- palace + mandap hero scenes
write('palace.svg', svg(1600, 1000, rect(0, 0, 1600, 1000, 'url(#gSunset)') + sun(800, 520, 70) + stars(1600, 500, 40, 4) + palace({ x: 200, y: 400, s: 1.2, fill: C.maroon }) + rect(0, 940, 1600, 60, C.esp, 'opacity=".6"') + vignette(1600, 1000)))
write('mandap.svg', svg(1200, 1000, rect(0, 0, 1200, 1000, 'url(#gNight)') + stars(1200, 400, 50, 8) + moon(980, 160, 44) + palace({ x: 100, y: 330, s: 1.0, fill: C.burg, lit: false, glow: false }).replace('<g ', '<g opacity=".4" ') + mandap({ x: 300, y: 940, s: 1.0 }) + vignette(1200, 1000)))

// ---------------------------------------------------------------- events (4:3)
const EW = 1200
const EH = 900
function henna(cx, cy, s) {
  const ink = C.maroon
  const line = (x1, y1, x2, y2, w, stroke, extra = '') => `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`
  const fingers = [[-64, -8, -148, 38, -9], [-22, -20, -212, 42, -3], [22, -22, -234, 43, 2], [64, -12, -196, 40, 8]]
  const palmD = 'M-88 -12 C-98 72 -78 150 -34 208 L34 208 C78 150 98 72 88 -12 C72 -46 -72 -46 -88 -12Z'
  let b = `<g transform="translate(${cx} ${cy}) scale(${s}) rotate(-5)">`
  b += `<ellipse cx="14" cy="214" rx="130" ry="20" fill="${C.esp}" opacity=".18" filter="url(#fSoft)"/>`
  fingers.forEach(([bx, by, top, w, a]) => (b += `<g transform="rotate(${a} ${bx} ${by})">${line(bx, by, bx, top, w + 4, '#A9694D', 'stroke-opacity=".55"')}</g>`))
  b += line(80, 112, 146, 0, 48, '#A9694D', 'stroke-opacity=".55"') + `<path d="${palmD}" fill="#A9694D" stroke="#A9694D" stroke-width="4" opacity=".55"/>`
  fingers.forEach(([bx, by, top, w, a]) => (b += `<g transform="rotate(${a} ${bx} ${by})">${line(bx, by, bx, top, w, 'url(#gHand)')}${line(bx - w * 0.2, by - 10, bx - w * 0.2, top + 14, 3, '#fff', 'stroke-opacity=".16"')}</g>`))
  b += line(80, 112, 146, 0, 44, 'url(#gHand)') + `<path d="${palmD}" fill="url(#gHand)"/>`
  b += `<path d="M-60 40 C-30 70 30 70 60 40" fill="none" stroke="#A9694D" stroke-opacity=".28" stroke-width="2"/><path d="M-78 90 C-50 118 -10 120 20 100" fill="none" stroke="#A9694D" stroke-opacity=".22" stroke-width="2"/>`
  b += mandala(0, 62, 84, ink, 0.92, 2.4) + circle(0, 62, 9, ink, 'opacity=".92"')
  for (let i = 0; i < 30; i++) {
    const t = (i / 30) * Math.PI * 2
    b += circle(Math.cos(t) * 96, 62 + Math.sin(t) * 96, 2.4, ink, 'opacity=".85"')
  }
  fingers.forEach(([bx, by, top, , a]) => {
    let f = line(bx, by - 10, bx, top + 22, 3.6, ink, 'stroke-dasharray="0.1 9" opacity=".9"')
    for (let y = by - 30; y > top + 36; y -= 36) f += `<path d="M${bx - 9} ${y} L${bx} ${y - 11} L${bx + 9} ${y}" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round" opacity=".92"/>${circle(bx, y + 8, 2.2, ink, 'opacity=".9"')}`
    f += circle(bx, top + 16, 5.5, ink, 'opacity=".92"') + circle(bx, top + 16, 9, 'none', `stroke="${ink}" stroke-width="1.6" opacity=".8"`)
    b += `<g transform="rotate(${a} ${bx} ${by})">${f}</g>`
  })
  b += `<g transform="translate(80 112) rotate(31)">${line(0, -12, 0, -104, 3.6, ink, 'stroke-dasharray="0.1 9" opacity=".9"')}<path d="M-9 -44 L0 -55 L9 -44 M-9 -78 L0 -89 L9 -78" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>${circle(0, -112, 5, ink)}</g>`
  b += `<path d="M-64 168 q16 -16 32 0 t32 0 t32 0 t32 0" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round" opacity=".9"/>`
  for (const sx of [-1, 1]) b += `<path d="M0 0 C26 -8 34 -46 8 -64 C-10 -46 -16 -10 0 0Z" transform="translate(${sx * 66} 146) rotate(${sx * 24}) scale(.62)" fill="${ink}" opacity=".88"/>`
  for (const [y, o] of [[196, 0], [214, 1]]) b += `<path d="M-40 ${y} C-12 ${y + 14} 12 ${y + 14} 40 ${y}" fill="none" stroke="url(#gGold)" stroke-width="9" stroke-linecap="round"/><path d="M-36 ${y - 1.5} C-10 ${y + 11} 10 ${y + 11} 36 ${y - 1.5}" fill="none" stroke="${C.cream}" stroke-opacity=".35" stroke-width="2" stroke-dasharray="${o ? '1 7' : '0.1 6'}" stroke-linecap="round"/>`
  b += '</g>'
  return b
}
write('event-mehndi.svg', svg(EW, EH, rect(0, 0, EW, EH, 'url(#gDay)') + circle(600, 380, 520, 'url(#gWarm)') + mandala(600, 420, 420, C.gold, 0.45, 2) + frameArch(250, 70, 700, 830, C.gold, 'none', 5) + henna(600, 478, 1.5) + `<g transform="translate(900 740) rotate(-18)"><path d="M-30 0 L30 0 L8 -150 L-8 -150Z" fill="${C.terra}" stroke="${C.gold}" stroke-width="3"/><rect x="-32" y="-6" width="64" height="12" rx="4" fill="${C.gold}"/><path d="M-4 -150 L4 -150 L0 -176Z" fill="${C.maroon}"/></g>` + floralCorner(80, 880, 1.9) + floralCorner(1120, 880, 1.9, -1) + marigold(200, 640, 40) + marigold(1000, 600, 34, C.terra, C.gold)))

function marigoldHeap(cx, by, r) {
  const rr = rng(2)
  let b = ''
  for (let i = 0; i < 46; i++) {
    const a = rr() * Math.PI
    const d = rr() * r
    b += marigold(cx + Math.cos(a) * d * 1.3, by - Math.sin(a) * d * 0.55 - 30, 18 + rr() * 10, i % 3 ? C.gold : C.terra, i % 3 ? C.terra : C.gold)
  }
  return b
}
write('event-haldi.svg', svg(EW, EH, rect(0, 0, EW, EH, 'url(#gDay)') + sun(600, 340, 100) + mandala(600, 340, 470, C.gold, 0.4, 2) +
  [...Array(9)].map((_, i) => hangingString(80 + i * 130, -10, 140 + ((i * 53) % 90), 5, 14)).join('') +
  rect(0, 780, EW, 120, C.champ) + rect(0, 776, EW, 8, C.gold) +
  // brass bowl (thali)
  `<ellipse cx="600" cy="790" rx="360" ry="46" fill="${GOLD_D}" opacity=".5"/><path d="M270 640 L930 640 C920 760 800 800 600 800 C400 800 280 760 270 640Z" fill="url(#gGold)"/><ellipse cx="600" cy="640" rx="330" ry="46" fill="${GOLD_L}"/><ellipse cx="600" cy="644" rx="300" ry="36" fill="${C.gold}"/>` +
  `<path d="M310 640 C380 520 480 470 600 470 C720 470 820 520 890 640 C820 676 700 690 600 690 C500 690 380 676 310 640Z" fill="${C.gold}"/><path d="M360 630 C420 540 510 500 600 500 C690 500 780 540 840 630" fill="none" stroke="${GOLD_L}" stroke-width="8" opacity=".7"/>` +
  marigoldHeap(600, 640, 250) + [...Array(40)].map((_, i) => { const rr = rng(i + 30); return circle(140 + rr() * 920, 700 + rr() * 150, 4 + rr() * 5, rr() > 0.5 ? C.gold : C.terra, 'opacity=".85"') }).join('') +
  floralCorner(70, 880, 1.9) + floralCorner(1130, 880, 1.9, -1)))

function dhol(cx, cy, s) {
  let b = `<g transform="translate(${cx} ${cy}) scale(${s})">`
  b += `<ellipse cx="0" cy="116" rx="190" ry="16" fill="#000" opacity=".3" filter="url(#fSoft)"/>`
  b += `<path d="M-136 -92 C-60 -106 60 -106 136 -92 L136 92 C60 106 -60 106 -136 92Z" fill="url(#gBarrel)" stroke="${C.gold}" stroke-width="3"/>`
  b += `<path d="M-126 -70 C-50 -84 50 -84 126 -70" fill="none" stroke="${C.cream}" stroke-opacity=".28" stroke-width="7" stroke-linecap="round"/>`
  b += `<path d="M-128 -22 C-50 -30 50 -30 128 -22 L128 22 C50 30 -50 30 -128 22Z" fill="${C.burg}" opacity=".85"/><path d="M-128 -22 C-50 -30 50 -30 128 -22 M-128 22 C-50 30 50 30 128 22" fill="none" stroke="url(#gGold)" stroke-width="3"/>`
  for (let i = 0; i < 11; i++) b += circle(-110 + i * 22, i % 2 ? -3 : 3, 4, i % 2 ? C.gold : C.cream, 'opacity=".9"')
  let zig = ''
  for (let i = 0; i < 12; i++) zig += `${i ? 'L' : 'M'}${-118 + i * 21.5} ${i % 2 ? -84 : 84}`
  b += `<path d="${zig}" fill="none" stroke="${C.maroon}" stroke-width="7" opacity=".55" stroke-linejoin="round"/><path d="${zig}" fill="none" stroke="${GOLD_L}" stroke-width="3.2" stroke-linejoin="round"/>`
  for (const sx of [-1, 1]) {
    b += `<ellipse cx="${sx * 140}" cy="0" rx="32" ry="98" fill="url(#gHeadSkin)" stroke="url(#gGold)" stroke-width="9"/><ellipse cx="${sx * 140}" cy="0" rx="22" ry="80" fill="none" stroke="${C.terra}" stroke-opacity=".35" stroke-width="2"/><ellipse cx="${sx * 140}" cy="0" rx="8" ry="26" fill="${C.terra}" opacity=".35"/>`
  }
  for (const sx of [-1, 1]) b += `<path d="M${sx * 118} 92 l-6 34 M${sx * 124} 92 l0 40 M${sx * 130} 92 l6 34" stroke="${C.gold}" stroke-width="3" stroke-linecap="round"/>${circle(sx * 124, 96, 5, 'url(#gGold)')}`
  b += mandala(0, 0, 38, C.gold, 0.9, 2)
  b += '</g>'
  return b
}
write('event-sangeet.svg', svg(EW, EH, rect(0, 0, EW, EH, 'url(#gNight)') + stars(EW, 500, 60, 12) + moon(1030, 140, 48) +
  lightString(0, 80, EW, 80, 70, 22, 6) + lightString(0, 150, EW, 150, 50, 18, 5) +
  mandala(600, 450, 420, C.gold, 0.28, 2) +
  rect(0, 720, EW, 180, C.esp, 'opacity=".6"') +
  dhol(600, 560, 1.45) +
  // dandiya sticks
  [[200, -22], [1000, 22]].map(([x, a]) => `<g transform="rotate(${a} ${x} 520)"><rect x="${x - 11}" y="360" width="22" height="330" rx="11" fill="url(#gGold)"/><rect x="${x - 4}" y="372" width="5" height="306" rx="2.5" fill="${C.cream}" opacity=".35"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${x - 11}" y="${410 + i * 48}" width="22" height="9" fill="${i % 2 ? C.burg : C.maroon}" opacity=".85"/>`).join('')}</g>`).join('') +
  [['♪', 330, 300, 80], ['♫', 860, 250, 90], ['♪', 920, 460, 64], ['♫', 270, 480, 70]].map(([t, x, y, s]) => `<text x="${x}" y="${y}" font-size="${s}" fill="${C.gold}" opacity=".85" font-family="serif">${t}</text>`).join('') +
  [...Array(7)].map((_, i) => diya(150 + i * 150, 840, 1.1)).join('') + vignette(EW, EH)))

write('event-wedding.svg', svg(EW, EH, rect(0, 0, EW, EH, 'url(#gSunset)') + sun(600, 360, 54) + stars(EW, 300, 30, 5) + palace({ x: 150, y: 290, s: 0.9, fill: C.maroon, lit: true }).replace('<g ', '<g opacity=".55" ') + mandap({ x: 300, y: 850, s: 1.0 }) + rect(0, 850, EW, 50, C.esp, 'opacity=".55"') + vignette(EW, EH)))

function stageArch(cx, by, w, h) {
  let b = `<path d="${archPath(cx - w / 2, by, w, h)}" fill="${C.maroon}" stroke="${C.gold}" stroke-width="8"/>`
  b += `<path d="${archPath(cx - w / 2 + 28, by, w - 56, h - 38)}" fill="none" stroke="${C.gold}" stroke-width="2.5" opacity=".7"/>`
  b += mandala(cx, by - h * 0.56, w * 0.26, C.gold, 0.6, 2)
  // flower arch
  const r = rng(9)
  for (let i = 0; i < 34; i++) {
    const t = i / 33
    const ang = Math.PI * (1 - t)
    const x = cx + Math.cos(ang) * (w / 2 - 4)
    const y = by - h * 0.62 - Math.sin(ang) * h * 0.4 * (1 - 0.18 * Math.abs(Math.cos(ang))) + (t < 0.25 || t > 0.75 ? h * 0.12 : 0)
    b += i % 3 === 0 ? rose(x, y, 20) : marigold(x, y, 18 + r() * 5, i % 2 ? C.gold : C.terra, i % 2 ? C.terra : C.gold)
  }
  return b
}
function flowerPillar(x) {
  const r = rng(x)
  let b = `<rect x="${x - 20}" y="260" width="40" height="540" fill="${C.maroon}" opacity=".9"/>`
  for (let y = 780, i = 0; y > 270; y -= 34, i++) {
    b += i % 3 === 1 ? rose(x + (r() - 0.5) * 14, y, 24) : marigold(x + (r() - 0.5) * 14, y, 25, i % 2 ? C.gold : C.terra)
    b += jasmine(x + (i % 2 ? -22 : 22), y - 14, 8)
  }
  return b + dome(x, 262, 26, C.gold, C.cream)
}
function sofa(cx, by, w) {
  return `<rect x="${cx - w / 2}" y="${by - 92}" width="${w}" height="92" rx="20" fill="${C.burg}" stroke="${C.gold}" stroke-width="3"/><rect x="${cx - w / 2 - 18}" y="${by - 68}" width="34" height="76" rx="14" fill="${C.maroon}" stroke="${C.gold}" stroke-width="3"/><rect x="${cx + w / 2 - 16}" y="${by - 68}" width="34" height="76" rx="14" fill="${C.maroon}" stroke="${C.gold}" stroke-width="3"/><rect x="${cx - w / 2 + 12}" y="${by - 150}" width="${w - 24}" height="70" rx="16" fill="${C.maroon}" stroke="${C.gold}" stroke-width="3"/>`
}
write('event-reception.svg', svg(EW, EH, rect(0, 0, EW, EH, 'url(#gNight)') + mandala(600, 330, 460, C.gold, 0.18, 2) + chandelier(200, 190, 1.25) + chandelier(600, 130, 1.5) + chandelier(1000, 190, 1.25) + stageArch(600, 800, 560, 560) + flowerPillar(190) + flowerPillar(1010) + rect(0, 780, EW, 120, C.esp, 'opacity=".75"') + rect(280, 780, 640, 24, C.gold) + sofa(600, 780, 260) +
  [...Array(6)].map((_, i) => marigold(60 + i * 220, 860, 24)).join('') + vignette(EW, EH)))

// ---------------------------------------------------------------- video thumbnail
function coupleSilhouette(cx, by, s, col = C.esp) {
  return `<g transform="translate(${cx} ${by}) scale(${s})" fill="${col}">
  <circle cx="-62" cy="-318" r="19"/><ellipse cx="-62" cy="-336" rx="23" ry="12"/><path d="M-62 -356 v-16 l6 8z"/>
  <path d="M-96 -296 h68 l8 118 l8 178 h-26 l-6 -128 l-6 128 h-32 l8 -178z"/>
  <circle cx="62" cy="-300" r="17"/><path d="M62 -322 c-30 -2 -38 40 -34 64 l68 0 c4 -24 -4 -62 -34 -64z"/>
  <path d="M62 -282 c-14 0 -22 14 -26 34 l-50 248 h152 l-50 -248 c-4 -20 -12 -34 -26 -34z"/>
  <path d="M-30 -230 q22 30 48 4" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round"/></g>`
}
write('video-thumb.svg', svg(1600, 900, rect(0, 0, 1600, 900, 'url(#gSunset)') + sun(800, 440, 78) + stars(1600, 360, 40, 14) + palace({ x: 260, y: 300, s: 1.08, fill: C.maroon }).replace('<g ', '<g opacity=".7" ') + garland(0, 60, 1600, 60, 90, 40, 20) + rect(0, 780, 1600, 120, C.esp) + coupleSilhouette(1180, 800, 1.15, C.esp) + marigold(80, 840, 38) + marigold(1520, 840, 38) + vignette(1600, 900)))

// ---------------------------------------------------------------- hotels (4:3)
write('hotel-1.svg', svg(1200, 900, rect(0, 0, 1200, 900, 'url(#gSunset)') + sun(600, 330, 60) + stars(1200, 250, 28, 17) + palace({ x: 100, y: 330, s: 1.0, fill: C.maroon }) + rect(0, 850, 1200, 50, C.esp, 'opacity=".6"') + [0, 1, 2, 3].map((i) => dome(150 + i * 300, 880, 8, C.gold)).join('') + hangingString(40, 0, 150, 5, 14) + hangingString(1160, 0, 150, 5, 14) + vignette(1200, 900)))

function palm(px, by, h, lean = 0) {
  const tx = px + lean
  const ty = by - h
  let b = `<path d="M${px - 11} ${by} C${px - 8} ${by - h * 0.5} ${tx - 6} ${by - h * 0.8} ${tx - 6} ${ty} L${tx + 6} ${ty} C${tx + 6} ${by - h * 0.8} ${px + 8} ${by - h * 0.5} ${px + 11} ${by}Z" fill="url(#gTrunk)"/>`
  for (let y = by - 20; y > ty + 10; y -= 26) b += `<path d="M${px - 9 + ((by - y) / h) * lean} ${y} q9 5 18 0" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="2"/>`
  for (const a of [-168, -146, -122, -98, -74, -50, -26, -4]) {
    b += `<g transform="translate(${tx} ${ty}) rotate(${a})"><path d="M0 0 C46 -58 124 -64 176 -10 C128 -30 56 -26 0 0Z" fill="${C.maroon}"/><path d="M0 0 C46 -58 124 -64 176 -10 C128 -30 56 -26 0 0Z" fill="url(#gDomeB)" opacity=".55"/><path d="M4 -2 C60 -34 126 -34 170 -10" fill="none" stroke="${C.cream}" stroke-opacity=".28" stroke-width="1.6"/></g>`
  }
  return b + circle(tx, ty + 4, 9, C.esp, 'opacity=".8"')
}

function haveli() {
  let b = rect(0, 0, 1200, 900, 'url(#gDay)') + sun(1000, 190, 60)
  // facade
  b += rect(160, 260, 880, 560, C.terra) + rect(160, 250, 880, 18, C.gold) + rect(160, 800, 880, 100, C.esp, 'opacity=".5"')
  for (let i = 0; i < 12; i++) b += rect(170 + i * 72, 232, 40, 24, C.terra)
  for (const x of [200, 590]) {
    // jharokha balcony
    b += `<path d="M${x} 600 h260 v-190 c0 -70 -130 -90 -130 -90 c0 0 -130 20 -130 90z" fill="${C.cream}" stroke="${C.gold}" stroke-width="5"/>`
    b += `<path d="${archPath(x + 20, 590, 220, 250)}" fill="${C.maroon}"/>`
    for (let i = 0; i < 8; i++) b += rect(x + 32 + i * 26, 360, 3, 220, C.gold, 'opacity=".7"')
    b += dome(x + 130, 320, 40, C.gold, C.cream)
  }
  // grand arch door
  b += `<path d="${archPath(470, 820, 260, 340)}" fill="${C.maroon}" stroke="${C.gold}" stroke-width="7"/>` + `<path d="${archPath(498, 820, 204, 292)}" fill="url(#gWindow)"/>` + rect(598, 540, 4, 280, C.maroon)
  b += mandala(600, 560, 70, C.maroon, 0.7, 2)
  // palms
  b += palm(96, 820, 420, 10) + palm(1104, 820, 400, -12)
  b += rect(0, 820, 1200, 80, C.champ) + rect(0, 816, 1200, 8, C.gold)
  b += [...Array(7)].map((_, i) => marigold(150 + i * 150, 868, 20, i % 2 ? C.terra : C.gold, i % 2 ? C.gold : C.terra)).join('')
  return svg(1200, 900, b + vignette(1200, 900))
}
write('hotel-2.svg', haveli())

function boutique() {
  let b = rect(0, 0, 1200, 900, 'url(#gSunset)') + moon(220, 170, 44) + stars(1200, 300, 40, 19)
  // hawa-mahal like tiered facade
  const tiers = [[360, 840, 480, 120], [400, 720, 400, 110], [440, 610, 320, 100], [480, 510, 240, 92], [520, 418, 160, 86]]
  for (const [x, y, w, h] of tiers) {
    b += rect(x, y, w, h, C.terra) + rect(x - 8, y - 6, w + 16, 12, C.gold)
    const cols = Math.floor(w / 46)
    for (let i = 0; i < cols; i++) {
      const wx = x + 12 + i * ((w - 24) / cols)
      b += `<path d="${archPath(wx, y + h - 10, (w - 24) / cols - 8, h - 30)}" fill="${C.maroon}" stroke="${C.gold}" stroke-width="2"/>`
      b += `<line x1="${wx + ((w - 24) / cols - 8) / 2}" y1="${y + 24}" x2="${wx + ((w - 24) / cols - 8) / 2}" y2="${y + h - 10}" stroke="${C.gold}" opacity=".7"/>`
    }
  }
  b += dome(600, 418, 52, C.maroon, C.gold) + chhatri(380, 720, 46, C.maroon) + chhatri(820, 720, 46, C.maroon)
  b += rect(0, 840, 1200, 60, C.esp, 'opacity=".6"')
  b += [...Array(10)].map((_, i) => lightString(i * 120, 40, (i + 1) * 120, 40, 22, 4, 4)).join('')
  b += [...Array(6)].map((_, i) => diya(190 + i * 165, 872, 1)).join('')
  return svg(1200, 900, b + vignette(1200, 900))
}
write('hotel-3.svg', boutique())

// ---------------------------------------------------------------- love story (4:3)
write('story-1.svg', svg(1200, 900, rect(0, 0, 1200, 900, 'url(#gNight)') + stars(1200, 460, 70, 31) + moon(930, 170, 52) + palace({ x: 0, y: 380, s: 1.2, fill: C.burg, lit: true, glow: false }).replace('<g ', '<g opacity=".5" ') + lightString(0, 90, 1200, 90, 80, 24, 6) + lightString(0, 190, 1200, 190, 60, 20, 5) + rect(0, 740, 1200, 160, C.esp, 'opacity=".8"') + rect(0, 736, 1200, 6, C.gold, 'opacity=".7"') + coupleSilhouette(600, 760, 0.95, C.esp) + vignette(1200, 900)))
write('story-2.svg', svg(1200, 900, rect(0, 0, 1200, 900, 'url(#gDay)') + circle(600, 420, 520, 'url(#gWarm)') + mandala(600, 440, 400, C.gold, 0.4, 2) +
  rect(0, 700, 1200, 200, C.champ) + rect(0, 696, 1200, 8, C.gold) +
  [[380, 560], [820, 560]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M-70 -90 h140 l-18 160 q-4 30 -34 30 h-36 q-30 0 -34 -30z" fill="${C.cream}" stroke="${C.gold}" stroke-width="5"/><path d="M70 -60 q54 0 54 46 q0 46 -56 46" fill="none" stroke="${C.gold}" stroke-width="10"/><rect x="-62" y="-80" width="124" height="22" rx="8" fill="${C.terra}"/><ellipse cx="0" cy="104" rx="120" ry="18" fill="${C.gold}" opacity=".7"/><path d="M-26 -120 q-18 -34 0 -62 q14 -26 -4 -56 M24 -120 q-18 -34 0 -62 q14 -26 -4 -56" fill="none" stroke="${C.terra}" stroke-width="6" stroke-linecap="round" opacity=".7"/></g>`).join('') +
  `<g><path d="M470 250 h260 q40 0 40 40 v70 q0 40 -40 40 h-150 l-50 44 v-44 h-60 q-40 0 -40 -40 v-70 q0 -40 40 -40z" fill="${C.maroon}"/><text x="600" y="345" font-size="72" fill="${C.gold}" text-anchor="middle" font-family="serif">♥ ♥ ♥</text></g>` +
  `<g><path d="M820 170 h200 q30 0 30 30 v50 q0 30 -30 30 h-30 v34 l-40 -34 h-130 q-30 0 -30 -30 v-50 q0 -30 30 -30z" fill="${C.burg}"/><circle cx="830" cy="225" r="9" fill="${C.cream}"/><circle cx="870" cy="225" r="9" fill="${C.cream}"/><circle cx="910" cy="225" r="9" fill="${C.cream}"/></g>` +
  floralCorner(70, 880, 1.8) + floralCorner(1130, 880, 1.8, -1)))
write('story-3.svg', svg(1200, 900, rect(0, 0, 1200, 900, 'url(#gSunset)') + sun(600, 470, 90) +
  // lake
  rect(0, 560, 1200, 340, C.maroon, 'opacity=".55"') + [...Array(9)].map((_, i) => `<ellipse cx="600" cy="${590 + i * 34}" rx="${70 + i * 26}" ry="${5 + i * 1.5}" fill="${C.gold}" opacity="${0.55 - i * 0.05}"/>`).join('') +
  // hills
  `<path d="M0 560 C140 420 260 480 380 400 C500 480 620 430 760 470 C900 400 1040 470 1200 420 V560Z" fill="${C.esp}" opacity=".85"/>` +
  // palace on hill
  palace({ x: 300, y: 380, s: 0.5, fill: C.maroon, glow: false }) +
  // road + car
  `<path d="M-40 900 L460 640 L740 640 L1240 900Z" fill="${C.esp}"/><path d="M600 900 L600 640" stroke="${C.gold}" stroke-width="6" stroke-dasharray="26 22"/>` +
  `<g transform="translate(600 806)"><ellipse cx="0" cy="8" rx="170" ry="14" fill="#000" opacity=".4" filter="url(#fSoft1)"/><path d="M-148 0 C-156 -34 -140 -58 -104 -66 L-52 -114 C-44 -122 -32 -126 -18 -126 L72 -126 C86 -126 98 -120 108 -110 L142 -70 C160 -64 168 -40 164 0Z" fill="url(#gSilkB)" stroke="${C.gold}" stroke-width="3.5"/><path d="M-46 -72 L-14 -108 L66 -108 L100 -72Z" fill="#2A1210"/><path d="M-30 -76 L-6 -102 L16 -102 L-8 -76Z" fill="${C.gold}" opacity=".3"/><path d="M12 -108 V-72" stroke="${C.gold}" stroke-width="2.4"/><path d="M-144 -36 H160" stroke="${GOLD_L}" stroke-width="2" opacity=".7"/><circle cx="150" cy="-44" r="26" fill="url(#gGlow)"/><circle cx="150" cy="-40" r="8" fill="${GOLD_L}"/><circle cx="-138" cy="-40" r="6" fill="${C.terra}"/>${[-78, 100].map((x) => `<circle cx="${x}" cy="2" r="31" fill="${C.esp}" stroke="${C.gold}" stroke-width="3.5"/><circle cx="${x}" cy="2" r="18" fill="none" stroke="${GOLD_L}" stroke-width="2.2"/><circle cx="${x}" cy="2" r="5" fill="url(#gGold)"/>`).join('')}</g>` + vignette(1200, 900)))
write('story-4.svg', svg(1200, 900, rect(0, 0, 1200, 900, 'url(#gNight)') + circle(600, 470, 440, 'url(#gGlow)') + mandala(600, 460, 400, C.gold, 0.3, 2) + stars(1200, 700, 80, 33) +
  [...Array(40)].map((_, i) => { const r = rng(i + 100); return `<ellipse cx="${r() * 1200}" cy="${r() * 900}" rx="9" ry="5" fill="${i % 2 ? C.burg : C.terra}" opacity=".75" transform="rotate(${r() * 360} ${r() * 1200} ${r() * 900})"/>` }).join('') +
  // ring
  `<g transform="translate(600 560)"><circle cx="0" cy="0" r="150" fill="none" stroke="url(#gGold)" stroke-width="34"/><circle cx="0" cy="0" r="133" fill="none" stroke="${GOLD_L}" stroke-width="3" opacity=".7"/><path d="M-60 -165 L60 -165 L90 -215 L0 -290 L-90 -215Z" fill="${C.cream}" stroke="${C.gold}" stroke-width="6"/><path d="M-90 -215 L90 -215 M-60 -165 L0 -215 L60 -165 M0 -290 L0 -215 M-45 -252 L0 -215 L45 -252" stroke="${C.champ}" stroke-width="3" fill="none"/><circle cx="0" cy="-230" r="130" fill="url(#gGlow)" opacity=".7"/></g>` +
  [...Array(5)].map((_, i) => diya(190 + i * 205, 840, 1.1)).join('') + vignette(1200, 900)))
write('story-5.svg', svg(1200, 900, rect(0, 0, 1200, 900, 'url(#gSunset)') + sun(600, 330, 54) + palace({ x: 100, y: 380, s: 1.0, fill: C.maroon }).replace('<g ', '<g opacity=".7" ') + mandap({ x: 300, y: 820, s: 1.0, fire: true }) + rect(0, 820, 1200, 80, C.esp, 'opacity=".6"') + vignette(1200, 900)))

// ---------------------------------------------------------------- gallery (varied ratios)
const G = {}
G[1] = [800, 1000, svg(800, 1000, portraitBackdrop(800, 1000, 'light') + groom(285, 1020, 1.45) + bride(520, 1020, 1.45) + floralCorner(70, 990, 1.4) + floralCorner(730, 990, 1.4, -1))]
{
  let b = rect(0, 0, 1000, 1000, 'url(#gSky)') + mandala(500, 500, 460, C.gold, 0.35, 2) + mandala(500, 500, 330, C.gold, 0.3, 1.4)
  const r = rng(61)
  for (let ring = 0; ring < 4; ring++) {
    const n = 8 + ring * 6
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + ring
      const rad = 90 + ring * 105
      b += marigold(500 + Math.cos(a) * rad, 500 + Math.sin(a) * rad, 34 - ring * 3, (i + ring) % 2 ? C.gold : C.terra, (i + ring) % 2 ? C.terra : C.gold)
    }
  }
  b += marigold(500, 500, 70, C.gold, C.terra) + jasmine(500, 500, 26)
  for (let i = 0; i < 30; i++) b += circle(r() * 1000, r() * 1000, 2 + r() * 3, C.gold, 'opacity=".5"')
  G[2] = [1000, 1000, svg(1000, 1000, b + vignette(1000, 1000))]
}
G[3] = [900, 1200, svg(900, 1200, rect(0, 0, 900, 1200, 'url(#gNight)') + stars(900, 500, 60, 41) + moon(720, 190, 50) + mandap({ x: 150, y: 1100, s: 1.0 }) + rect(0, 1100, 900, 100, C.esp, 'opacity=".6"') + vignette(900, 1200))]
G[4] = [1200, 900, svg(1200, 900, rect(0, 0, 1200, 900, 'url(#gSunset)') + circle(600, 450, 500, 'url(#gGlow)') + mandala(600, 450, 380, C.gold, 0.35, 2) +
  `<g fill="none" stroke="url(#gGold)" stroke-width="30"><circle cx="520" cy="470" r="150"/><circle cx="700" cy="470" r="150"/></g><g fill="none" stroke="${GOLD_L}" stroke-width="3" opacity=".7"><circle cx="520" cy="470" r="134"/><circle cx="700" cy="470" r="134"/></g>` +
  [...Array(30)].map((_, i) => { const r = rng(i + 400); return `<ellipse cx="${r() * 1200}" cy="${r() * 900}" rx="10" ry="6" fill="${i % 2 ? C.gold : C.terra}" opacity=".8" transform="rotate(${r() * 360} ${r() * 1200} ${r() * 900})"/>` }).join('') + vignette(1200, 900))]
G[5] = [900, 1200, svg(900, 1200, rect(0, 0, 900, 1200, 'url(#gDay)') + circle(450, 560, 520, 'url(#gWarm)') + mandala(450, 560, 400, C.gold, 0.45, 2) + henna(450, 720, 2.1) + floralCorner(70, 1180, 1.8) + floralCorner(830, 1180, 1.8, -1) + marigold(120, 240, 40) + marigold(790, 300, 34, C.terra, C.gold))]
{
  let b = rect(0, 0, 1000, 1000, 'url(#gNight)') + stars(1000, 400, 40, 61)
  // rangoli
  b += mandala(500, 560, 360, C.gold, 0.9, 2.4)
  const colors = [C.terra, C.gold, C.burg]
  for (let ring = 0; ring < 3; ring++) {
    const n = 12 + ring * 4
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2
      b += circle(500 + Math.cos(a) * (120 + ring * 78), 560 + Math.sin(a) * (120 + ring * 78), 18 - ring * 3, colors[(i + ring) % 3], 'opacity=".9"')
    }
  }
  b += lotus(500, 600, 110, C.terra) + circle(500, 560, 30, C.gold)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    b += diya(500 + Math.cos(a) * 420, 600 + Math.sin(a) * 340, 0.9)
  }
  G[6] = [1000, 1000, svg(1000, 1000, b + vignette(1000, 1000))]
}
G[7] = [800, 1000, svg(800, 1000, rect(0, 0, 800, 1000, 'url(#gNight)') + stars(800, 500, 60, 71) + moon(400, 250, 80) + mandala(400, 250, 300, C.gold, 0.3, 2) + palace({ x: -230, y: 460, s: 1.26, fill: C.burg, glow: false }).replace('<g ', '<g opacity=".7" ') + coupleSilhouette(400, 930, 0.95, C.esp) + rect(0, 930, 800, 70, C.esp) + garland(0, 40, 800, 40, 90, 20, 20) + vignette(800, 1000))]
G[8] = [1200, 900, svg(1200, 900, rect(0, 0, 1200, 900, 'url(#gNight)') + circle(600, 560, 520, 'url(#gGlow)') + stars(1200, 400, 50, 81) + rect(380, 640, 440, 140, C.terra) + rect(360, 626, 480, 22, C.gold) + flame(600, 640, 340) + flame(520, 640, 200, false) + flame(680, 640, 220, false) + flame(450, 640, 130, false) + flame(750, 640, 140, false) + garland(0, 120, 1200, 120, 80, 22, 24) + [...Array(12)].map((_, i) => marigold(60 + i * 100, 830, 24)).join('') + vignette(1200, 900))]
{
  let b = rect(0, 0, 900, 1200, 'url(#gSunset)') + circle(450, 560, 480, 'url(#gGlow)') + mandala(450, 520, 360, C.gold, 0.3, 2)
  for (let i = 0; i < 60; i++) {
    const r = rng(i + 900)
    b += `<ellipse cx="${r() * 900}" cy="${r() * 1200}" rx="${10 + r() * 8}" ry="${5 + r() * 4}" fill="${i % 3 ? C.gold : C.terra}" opacity="${0.55 + r() * 0.4}" transform="rotate(${r() * 360} ${r() * 900} ${r() * 1200})"/>`
  }
  b += groom(330, 1236, 1.3) + bride(580, 1236, 1.3)
  G[9] = [900, 1200, svg(900, 1200, b + vignette(900, 1200))]
}
for (const [n, [, , content]] of Object.entries(G)) write(`gallery-${n}.svg`, content)

console.log('Artwork written to', OUT)
