import { useCallback, useEffect, useState } from 'react'
import { useScrollLock } from './hooks/useScrollLock'
import InvitationCover from './components/InvitationCover'
import CoupleIntroduction from './components/CoupleIntroduction'
import DateReveal from './components/DateReveal'
import CoupleSection from './components/CoupleSection'
import WeddingEvents from './components/WeddingEvents'
import WeddingCountdown from './components/WeddingCountdown'
import Footer from './components/Footer'
import SiteMenu from './components/SiteMenu'

export default function App() {
  // `?open` skips the gate (handy for sharing deep links / testing).
  const [opened, setOpened] = useState(() => new URLSearchParams(window.location.search).has('open'))
  useScrollLock(!opened)

  const open = useCallback(() => {
    setOpened(true)
    window.scrollTo({ top: 0 })
  }, [])

  // Always begin at the very top, never restore a mid-page scroll behind the gate.
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    if (!window.location.hash) window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <InvitationCover opened={opened} onOpen={open} />
      <main>
        <CoupleIntroduction />
        <DateReveal />
        <CoupleSection />
        <WeddingEvents />
        <WeddingCountdown />
      </main>
      <Footer />
      <SiteMenu visible={opened} />
    </>
  )
}
