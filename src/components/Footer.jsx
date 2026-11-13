import { useState } from 'react'
import { Check, Link2, Mail, MessageCircle, Phone, Share2 } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { asset } from '../utils/asset'
import { copyText, formatLongDate, telHref, whatsappUrl } from '../utils/format'
import { Mandala, MarigoldBorder, OrnamentDivider } from './art/Decor'
import Reveal from './ui/Reveal'

const TITLE = () => `${weddingData.groom.firstName} & ${weddingData.bride.firstName} – Wedding Invitation`

export default function Footer() {
  const { groom, bride, wedding, contact, footer } = weddingData
  const [copied, setCopied] = useState(false)

  const shareText = `You are invited to ${groom.firstName} & ${bride.firstName}'s wedding on ${formatLongDate(wedding.date)} at ${wedding.venue}, ${wedding.city}.`
  const pageUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : ''

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: TITLE(), text: shareText, url: pageUrl })
        return
      } catch {
        /* user cancelled, fall through to copy */
      }
    }
    const ok = await copyText(`${shareText} ${pageUrl}`)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    }
  }

  return (
    <footer id="footer" className="bg-maroon-pattern bg-maroon-rich relative overflow-hidden text-ivory">
      <MarigoldBorder tone="dark" className="absolute inset-x-0 top-0 z-10" />
      <img
        src={asset('/images/palace-silhouette.svg')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[210px] w-full max-w-[1500px] -translate-x-1/2 object-contain object-bottom opacity-90 md:h-[400px]"
      />
      <Mandala className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 text-gold opacity-[0.16]" spin />
      <Mandala className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 text-gold opacity-[0.16]" spin />

      <div className="section-pad relative pb-64 pt-28 md:pb-[28rem] md:pt-32">
        <Reveal className="container-royal max-w-3xl text-center">
          <p className="font-script text-3xl text-gold md:text-4xl">{footer.signoff}</p>
          <h2 className="mt-3 text-ivory">
            <span className="gold-text block font-names text-[clamp(3rem,10vw,5.8rem)] font-medium italic leading-[1.1]">{groom.firstName} &amp; {bride.firstName}</span>
          </h2>
          <OrnamentDivider className="mt-3" />
          <p className="mt-5 font-display text-2xl text-champagne">{formatLongDate(wedding.date)}</p>
          <p className="mt-1 font-body text-[0.7rem] uppercase tracking-[0.34em] text-gold">
            {wedding.venue} · {wedding.city}
          </p>

          <p className="mx-auto mt-8 max-w-xl text-[1.05rem] leading-[1.9] text-champagne">{footer.thankYou}</p>
          <p className="mt-4 font-display text-lg italic text-ivory">{footer.family}</p>

          {/* contacts */}
          <div className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-4 text-left">
            {contact.familyContacts.map((c) => (
              <a key={c.name} href={telHref(c.phone)} className="group flex w-full items-center gap-4 rounded-2xl bg-maroon/55 p-4 transition hover:bg-burgundy/70 sm:w-auto sm:min-w-[17.5rem] sm:pr-8" style={{ boxShadow: 'inset 0 0 0 1px rgba(212,175,106,0.55)' }}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-maroon" aria-hidden="true">
                  <Phone size={18} />
                </span>
                <span>
                  <span className="block font-heading text-lg leading-tight text-ivory">{c.name}</span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-gold">{c.relation}</span>
                  <span className="block text-sm text-champagne">{c.phone.replace(/^(\+91)(\d{5})(\d{5})$/, '$1 $2 $3')}</span>
                </span>
              </a>
            ))}
          </div>

          {contact.email && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${contact.email}`} className="btn-ghost !text-ivory">
                <Mail size={15} aria-hidden="true" /> {contact.email}
              </a>
            </div>
          )}

          {/* share */}
          <div className="mt-12 border-t border-gold/30 pt-8">
            <p className="font-body text-[0.7rem] uppercase tracking-[0.34em] text-champagne">Share this invitation</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a href={whatsappUrl('', `${shareText} ${pageUrl}`)} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <MessageCircle size={15} aria-hidden="true" /> WhatsApp
              </a>
              <button type="button" onClick={share} className="btn-gold">
                {copied ? <Check size={15} aria-hidden="true" /> : navigator.share ? <Share2 size={15} aria-hidden="true" /> : <Link2 size={15} aria-hidden="true" />}
                {copied ? 'Link copied' : 'Share / Copy link'}
              </button>
            </div>
          </div>
          <p className="mt-10 font-body text-xs tracking-[0.2em] text-champagne/70">
            {new Date(wedding.date.split('T')[0]).getFullYear()}
          </p>
        </Reveal>
      </div>
    </footer>
  )
}
