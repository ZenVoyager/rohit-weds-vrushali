import Reveal from './Reveal'
import { OrnamentDivider } from '../art/Decor'

/** Shared heading block: script eyebrow, serif title, ornament, optional subtitle. */
export default function SectionHeading({ eyebrow, title, subtitle, tone = 'light', className = '' }) {
  const dark = tone === 'dark'
  return (
    <Reveal className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow && <p className={`font-script text-3xl md:text-4xl ${dark ? 'text-gold' : 'text-terracotta'}`}>{eyebrow}</p>}
      <h2 className={`mt-1 text-[length:var(--fs-h2)] font-semibold tracking-tight ${dark ? 'text-ivory' : 'text-maroon'}`}>{title}</h2>
      <OrnamentDivider className="mt-4" />
      {subtitle && <p className={`mx-auto mt-5 max-w-xl text-[1.02rem] leading-relaxed ${dark ? 'text-champagne' : 'text-espresso/85'}`}>{subtitle}</p>}
    </Reveal>
  )
}
