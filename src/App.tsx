import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MobileContactBar } from './components/MobileContactBar'
import { Reviews } from './components/Reviews'
import { Services } from './components/Services'
import { TrustStrip } from './components/TrustStrip'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { navigation } from './content/business'

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    // Sección activa del menú
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => sectionObserver.observe(s))

    // Barra de contacto móvil: visible cuando el hero ya no está en pantalla
    const hero = document.getElementById('inicio')
    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
      rootMargin: '-35% 0px 0px 0px',
    })
    if (hero) heroObserver.observe(hero)

    // Apariciones al hacer scroll (desactivadas si el usuario prefiere menos movimiento)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let revealObserver: IntersectionObserver | undefined
    if (!reduceMotion) {
      document.documentElement.classList.add('js-reveal')
      revealObserver = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              obs.unobserve(entry.target)
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px' },
      )
      document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver?.observe(el))
    }

    return () => {
      sectionObserver.disconnect()
      heroObserver.disconnect()
      revealObserver?.disconnect()
    }
  }, [])

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[60] bg-paper px-4 py-3 font-semibold text-carbon focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <Header activeSection={activeSection} />
      <main id="contenido">
        <Hero />
        <TrustStrip />
        <Services />
        <About />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <MobileContactBar visible={pastHero} />
      <WhatsAppFloat raised={pastHero} />
    </>
  )
}
