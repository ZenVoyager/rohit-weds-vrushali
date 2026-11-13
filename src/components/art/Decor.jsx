import { memo } from 'react'

/* Original decorative SVG components. Colours come from the palette via Tailwind classes. */

/** Slowly rotating mandala line-art. Pass className for size/colour (uses currentColor). */
export const Mandala = memo(function Mandala({ className = '', spin = false }) {
  const petals = Array.from({ length: 24 }, (_, i) => i * 15)
  const inner = Array.from({ length: 12 }, (_, i) => i * 30 + 15)
  const core = Array.from({ length: 8 }, (_, i) => i * 45)
  const lace = Array.from({ length: 48 }, (_, i) => i * 7.5)
  return (
    <svg viewBox="0 0 400 400" className={`${spin ? 'animate-spin-slow' : ''} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
      <circle cx="200" cy="200" r="197" />
      <circle cx="200" cy="200" r="188" strokeDasharray="1.5 6" strokeLinecap="round" />
      <circle cx="200" cy="200" r="150" />
      <circle cx="200" cy="200" r="124" />
      <circle cx="200" cy="200" r="62" />
      <circle cx="200" cy="200" r="24" />
      {lace.map((a) => (
        <path key={`l${a}`} transform={`rotate(${a} 200 200)`} d="M200 3 q4 7 0 13 q-4 -6 0 -13Z" strokeWidth="1" />
      ))}
      {petals.map((a) => (
        <path key={a} transform={`rotate(${a} 200 200)`} d="M200 74 C232 52 224 26 200 18 C176 26 168 52 200 74Z" />
      ))}
      {petals.map((a) => (
        <path key={`s${a}`} transform={`rotate(${a + 7.5} 200 200)`} d="M200 76 C208 64 208 50 200 40 C192 50 192 64 200 76Z" strokeWidth="0.9" opacity=".7" />
      ))}
      {inner.map((a) => (
        <path key={a} transform={`rotate(${a} 200 200)`} d="M200 140 C222 118 220 96 200 80 C180 96 178 118 200 140Z" />
      ))}
      {core.map((a) => (
        <path key={`c${a}`} transform={`rotate(${a} 200 200)`} d="M200 176 C210 166 210 154 200 144 C190 154 190 166 200 176Z" />
      ))}
      {petals.map((a) => (
        <circle key={`d${a}`} cx="200" cy="40" r="1.8" fill="currentColor" stroke="none" transform={`rotate(${a} 200 200)`} />
      ))}
      <circle cx="200" cy="200" r="5" fill="currentColor" stroke="none" />
    </svg>
  )
})

/** Horizontal ornament: line – lotus – line. */
export const OrnamentDivider = memo(function OrnamentDivider({ className = '' }) {
  const stroke = 'var(--antique-gold)'
  return (
    <svg viewBox="0 0 320 40" className={`mx-auto h-8 w-72 ${className}`} fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="od-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EFD9A3" />
          <stop offset=".5" stopColor="#D4AF6A" />
          <stop offset="1" stopColor="#A98343" />
        </linearGradient>
      </defs>
      <path d="M6 20 H112" stroke={stroke} strokeWidth="1.1" />
      <path d="M208 20 H314" stroke={stroke} strokeWidth="1.1" />
      <path d="M20 20 q8 -9 18 0 q-10 9 -18 0Z M282 20 q-8 -9 -18 0 q10 9 18 0Z" stroke={stroke} strokeWidth="1" />
      <path d="M44 20 q6 -6 12 0 q-6 6 -12 0Z M276 20 q-6 -6 -12 0 q6 6 12 0Z" fill={stroke} opacity=".55" stroke="none" />
      <path d="M112 20 C122 20 124 10 132 10 M208 20 C198 20 196 10 188 10" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="136" cy="10" r="2.4" fill={stroke} />
      <circle cx="184" cy="10" r="2.4" fill={stroke} />
      <g transform="translate(160 22)">
        <path d="M0 -16 C9 -10 9 6 0 12 C-9 6 -9 -10 0 -16Z" fill="url(#od-gold)" />
        <path d="M-7 10 C-21 10 -30 -1 -28 -11 C-17 -11 -9 -4 -7 10Z" fill="var(--terracotta-rose)" stroke={stroke} strokeWidth="1" />
        <path d="M7 10 C21 10 30 -1 28 -11 C17 -11 9 -4 7 10Z" fill="var(--terracotta-rose)" stroke={stroke} strokeWidth="1" />
        <path d="M-14 12 C-24 12 -40 6 -44 -4 C-34 -6 -22 0 -14 12Z" fill="var(--wedding-burgundy)" opacity=".85" stroke={stroke} strokeWidth=".8" />
        <path d="M14 12 C24 12 40 6 44 -4 C34 -6 22 0 14 12Z" fill="var(--wedding-burgundy)" opacity=".85" stroke={stroke} strokeWidth=".8" />
        <path d="M0 -5 C4 0 4 6 0 9 C-4 6 -4 0 0 -5Z" fill="var(--royal-maroon)" />
      </g>
    </svg>
  )
})

/** Quarter corner scroll. Rotate with className (e.g. rotate-90). */
export const CornerFlourish = memo(function CornerFlourish({ className = '' }) {
  return (
    <svg viewBox="0 0 90 90" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M4 86 V30 C4 14 14 4 30 4 H86" />
      <path d="M14 86 V34 C14 22 22 14 34 14 H86" strokeWidth="0.9" />
      <path d="M30 4 C30 26 26 30 4 30" />
      <path d="M22 22 c10 -2 14 -8 12 -16" />
      <circle cx="22" cy="22" r="5" fill="var(--terracotta-rose)" stroke="currentColor" strokeWidth="1" />
      <circle cx="22" cy="22" r="1.6" fill="var(--royal-maroon)" stroke="none" />
      <circle cx="46" cy="9" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="9" cy="46" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  )
})

/** Ornate gold double-border frame with corner flourishes. Children render inside. */
export function RoyalFrame({ children, className = '', innerClassName = '', tone = 'light' }) {
  const dark = tone === 'dark'
  return (
    <div className={`relative ${className}`}>
      <div className={`relative rounded-[28px] p-[10px] ${dark ? 'bg-maroon/40' : 'bg-cream'} shadow-soft`} style={{ boxShadow: 'inset 0 0 0 1.5px var(--antique-gold), 0 24px 60px -30px rgba(59,33,28,0.55)' }}>
        <div className="relative rounded-[20px]" style={{ boxShadow: 'inset 0 0 0 1px rgba(212,175,106,0.7)' }}>
          <CornerFlourish className="absolute left-2 top-2 h-12 w-12 text-gold md:h-16 md:w-16" />
          <CornerFlourish className="absolute right-2 top-2 h-12 w-12 rotate-90 text-gold md:h-16 md:w-16" />
          <CornerFlourish className="absolute bottom-2 right-2 h-12 w-12 rotate-180 text-gold md:h-16 md:w-16" />
          <CornerFlourish className="absolute bottom-2 left-2 h-12 w-12 -rotate-90 text-gold md:h-16 md:w-16" />
          <div className={innerClassName}>{children}</div>
        </div>
      </div>
    </div>
  )
}

/** Hanging marigold garland strip for the top edge of a section. */
export const MarigoldBorder = memo(function MarigoldBorder({ className = '', tone = 'light' }) {
  const idSuffix = tone
  const bloom = (x, y, r, a, b) => (
    <g>
      {Array.from({ length: 10 }, (_, i) => (
        <ellipse key={i} cx={x} cy={y - r * 0.62} rx={r * 0.3} ry={r * 0.46} fill={a} transform={`rotate(${i * 36} ${x} ${y})`} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={`b${i}`} cx={x} cy={y - r * 0.4} rx={r * 0.24} ry={r * 0.34} fill={b} transform={`rotate(${i * 45 + 22} ${x} ${y})`} />
      ))}
      <circle cx={x} cy={y} r={r * 0.2} fill="var(--royal-maroon)" />
      <circle cx={x - r * 0.06} cy={y - r * 0.07} r={r * 0.07} fill="var(--soft-cream)" opacity=".5" />
    </g>
  )
  return (
    <svg className={`block h-14 w-full ${className}`} preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`mb-${idSuffix}`} width="76" height="56" patternUnits="userSpaceOnUse">
          <path d="M0 4 Q38 34 76 4" fill="none" stroke="var(--antique-gold)" strokeWidth="1.4" opacity=".85" />
          {[0, 1, 2, 3, 4].map((i) => {
            const t = (i + 0.5) / 5
            const x = 76 * t
            const y = (1 - t) * (1 - t) * 4 + 2 * (1 - t) * t * 34 + t * t * 4
            return <g key={i}>{bloom(x, y + 4, 8.4, i % 2 ? 'var(--terracotta-rose)' : 'var(--antique-gold)', i % 2 ? 'var(--antique-gold)' : 'var(--terracotta-rose)')}</g>
          })}
          <line x1="38" y1="19" x2="38" y2="42" stroke="var(--antique-gold)" strokeWidth="1.2" opacity=".85" />
          {[26, 34].map((y, i) => (
            <g key={y}>{bloom(38, y + 4, 5.6, i % 2 ? 'var(--antique-gold)' : 'var(--terracotta-rose)', i % 2 ? 'var(--terracotta-rose)' : 'var(--antique-gold)')}</g>
          ))}
          <path d="M38 44 l-3.4 8 h6.8Z" fill="var(--antique-gold)" />
        </pattern>
      </defs>
      <rect width="100%" height="56" fill={`url(#mb-${idSuffix})`} />
    </svg>
  )
})

/** Stylised Ganesh illustration (original artwork). */
export const Ganesh = memo(function Ganesh({ className = '' }) {
  const ear = 'M104 102 C46 76 18 140 44 202 C62 238 98 222 108 186Z'
  return (
    <svg viewBox="0 0 300 340" className={className} aria-label="Illustration of Lord Ganesha" role="img">
      <defs>
        <linearGradient id="gn-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EFD9A3" />
          <stop offset=".5" stopColor="#D4AF6A" />
          <stop offset="1" stopColor="#A98343" />
        </linearGradient>
        <radialGradient id="gn-skin" cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor="#D58B72" />
          <stop offset=".6" stopColor="#B76E55" />
          <stop offset="1" stopColor="#8E4A3A" />
        </radialGradient>
        <linearGradient id="gn-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A53A4B" />
          <stop offset="1" stopColor="#6A1A29" />
        </linearGradient>
        <radialGradient id="gn-glow">
          <stop offset="0" stopColor="#D4AF6A" stopOpacity=".5" />
          <stop offset="1" stopColor="#D4AF6A" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* halo */}
      <circle cx="150" cy="156" r="148" fill="url(#gn-glow)" />
      <circle cx="150" cy="156" r="128" fill="none" stroke="var(--antique-gold)" strokeWidth="1.6" />
      <circle cx="150" cy="156" r="118" fill="none" stroke="var(--antique-gold)" strokeWidth="1" strokeDasharray="2 6" />
      {/* lotus seat */}
      <g stroke="var(--antique-gold)" strokeWidth="1.4">
        {[-62, -42, -22, 22, 42, 62].map((a) => (
          <path key={a} transform={`rotate(${a} 150 336)`} d="M150 336 C132 322 132 300 150 288 C168 300 168 322 150 336Z" fill="var(--terracotta-rose)" />
        ))}
        <path d="M150 336 C134 322 134 300 150 286 C166 300 166 322 150 336Z" fill="var(--wedding-burgundy)" />
      </g>
      {/* body */}
      <path d="M70 330 C60 260 92 232 150 232 C208 232 240 260 230 330Z" fill="url(#gn-body)" stroke="var(--antique-gold)" strokeWidth="2" />
      <ellipse cx="150" cy="276" rx="52" ry="42" fill="url(#gn-skin)" stroke="var(--antique-gold)" strokeWidth="2" />
      <path d="M96 252 C124 296 176 296 204 252" fill="none" stroke="url(#gn-gold)" strokeWidth="5" />
      <path d="M112 244 L196 318" stroke="url(#gn-gold)" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M78 318 H222" stroke="url(#gn-gold)" strokeWidth="6" />
      {/* modak bowl + blessing hand */}
      <g transform="translate(48 292)">
        <path d="M-2 0 H46 C44 16 34 24 22 24 C10 24 0 16 -2 0Z" fill="url(#gn-gold)" />
        {[6, 22, 38].map((x, i) => (
          <path key={x} d={`M${x} 0 C${x - 8} -8 ${x - 4} -18 ${x} -24 C${x + 4} -18 ${x + 8} -8 ${x} 0Z`} fill={i === 1 ? 'var(--antique-gold)' : 'var(--warm-ivory)'} stroke="var(--terracotta-rose)" strokeWidth="1" />
        ))}
      </g>
      <g transform="translate(228 270)">
        <circle cx="0" cy="0" r="22" fill="var(--terracotta-rose)" stroke="var(--antique-gold)" strokeWidth="2" />
        <circle cx="0" cy="0" r="9" fill="none" stroke="var(--antique-gold)" strokeWidth="1.6" />
        <path d="M-5 -26 v-22 M0 -28 v-28 M5 -26 v-22" stroke="var(--terracotta-rose)" strokeWidth="9" strokeLinecap="round" />
      </g>
      {/* ears */}
      <path d={ear} fill="url(#gn-skin)" stroke="var(--antique-gold)" strokeWidth="2.4" />
      <path d="M96 118 C62 104 44 146 62 190 C74 212 94 202 100 180Z" fill="var(--wedding-burgundy)" opacity=".85" />
      <path d={ear} transform="translate(300 0) scale(-1 1)" fill="url(#gn-skin)" stroke="var(--antique-gold)" strokeWidth="2.4" />
      <path d="M96 118 C62 104 44 146 62 190 C74 212 94 202 100 180Z" transform="translate(300 0) scale(-1 1)" fill="var(--wedding-burgundy)" opacity=".85" />
      {/* head */}
      <ellipse cx="150" cy="152" rx="60" ry="64" fill="url(#gn-skin)" stroke="var(--antique-gold)" strokeWidth="2.4" />
      <ellipse cx="128" cy="122" rx="20" ry="12" fill="#fff" opacity=".12" transform="rotate(-24 128 122)" />
      {/* crown */}
      <path d="M96 104 L108 56 L126 82 L150 34 L174 82 L192 56 L204 104 C184 92 116 92 96 104Z" fill="url(#gn-gold)" stroke="var(--royal-maroon)" strokeWidth="1.6" />
      <path d="M104 98 C130 88 170 88 196 98" fill="none" stroke="var(--royal-maroon)" strokeWidth="1.4" />
      <circle cx="150" cy="70" r="7" fill="var(--wedding-burgundy)" stroke="var(--warm-ivory)" strokeWidth="1.4" />
      <circle cx="116" cy="84" r="3.4" fill="var(--wedding-burgundy)" />
      <circle cx="184" cy="84" r="3.4" fill="var(--wedding-burgundy)" />
      {/* tilak */}
      <path d="M134 116 Q150 128 166 116 M138 124 Q150 134 162 124" fill="none" stroke="var(--antique-gold)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M150 112 v26" stroke="var(--royal-maroon)" strokeWidth="4.5" strokeLinecap="round" />
      {/* eyes */}
      <g>
        <path d="M118 148 q12 -12 24 0 q-12 8 -24 0Z" fill="var(--warm-ivory)" />
        <path d="M158 148 q12 -12 24 0 q-12 8 -24 0Z" fill="var(--warm-ivory)" />
        <circle cx="130" cy="147" r="4" fill="var(--dark-espresso)" />
        <circle cx="170" cy="147" r="4" fill="var(--dark-espresso)" />
        <path d="M114 142 q16 -16 30 -2 M156 140 q14 -14 30 2" fill="none" stroke="var(--dark-espresso)" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      {/* trunk with gold outline */}
      <path d="M150 156 C152 196 148 222 130 244 C116 260 100 254 104 240 C107 230 118 232 120 240" fill="none" stroke="url(#gn-gold)" strokeWidth="34" strokeLinecap="round" />
      <path d="M150 156 C152 196 148 222 130 244 C116 260 100 254 104 240 C107 230 118 232 120 240" fill="none" stroke="var(--terracotta-rose)" strokeWidth="29" strokeLinecap="round" />
      <path d="M144 170 q-2 24 -8 44 M156 172 q2 20 -2 40" fill="none" stroke="var(--wedding-burgundy)" strokeWidth="1.4" opacity=".55" strokeLinecap="round" />
      {/* tusks */}
      <path d="M170 204 C192 206 202 226 194 246 C184 238 176 226 168 214Z" fill="var(--warm-ivory)" stroke="var(--antique-gold)" strokeWidth="1.6" />
      <path d="M132 206 C118 206 112 216 112 226 C120 222 128 216 132 212Z" fill="var(--warm-ivory)" stroke="var(--antique-gold)" strokeWidth="1.4" />
      {/* ear jewels */}
      <circle cx="70" cy="170" r="5" fill="url(#gn-gold)" />
      <circle cx="230" cy="170" r="5" fill="url(#gn-gold)" />
    </svg>
  )
})

/** Peacock-feather style paisley, used sparingly as accents. */
export const Paisley = memo(function Paisley({ className = '' }) {
  return (
    <svg viewBox="0 0 60 90" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false">
      <path d="M30 4 C54 20 58 52 36 72 C20 86 4 74 10 58 C14 46 30 46 30 58 C30 66 22 66 22 60" />
      <path d="M30 14 C46 28 48 50 34 62" opacity=".6" />
      <circle cx="30" cy="30" r="4" fill="var(--terracotta-rose)" stroke="currentColor" />
    </svg>
  )
})
