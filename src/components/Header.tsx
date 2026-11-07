import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { business, navigation } from '../content/business'
import { Icon } from './ui/Icon'
import { Wordmark } from './Wordmark'

export function Header({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menú móvil: bloquea el scroll, cierra con Escape y mantiene el foco dentro.
  useEffect(() => {
    if (!open) return
    const button = menuButton.current
    document.documentElement.style.overflow = 'hidden'
    panel.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const items = [button, ...panel.current.querySelectorAll<HTMLElement>('a')].filter(Boolean) as HTMLElement[]
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)

    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.documentElement.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      button?.focus({ preventScroll: true })
    }
  }, [open])

  const solid = scrolled || open

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid ? 'border-b border-line-dark bg-carbon/90 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <a
            href="#inicio"
            className="relative z-10 -m-2 p-2"
            aria-label={`${business.name}, ir al inicio`}
            onClick={() => setOpen(false)}
          >
            <Wordmark />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const active = activeSection === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={active ? 'true' : undefined}
                      className={`group relative block px-3.5 py-2 text-[0.9rem] font-medium transition-colors ${
                        active ? 'text-paper' : 'text-paper/65 hover:text-paper'
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3.5 -bottom-px h-px origin-left bg-signal transition-transform duration-300 ease-out-soft ${
                          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={business.links.tel}
              className="hidden items-center gap-2 px-3 text-sm font-medium text-paper/80 transition-colors hover:text-paper xl:inline-flex"
            >
              <Icon name="phone" className="size-4" />
              {business.phone.display}
            </a>
            <a
              href={business.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hidden min-h-11 px-5 text-sm sm:inline-flex"
            >
              Pedir cita
              <span className="sr-only"> por WhatsApp (se abre en una pestaña nueva)</span>
            </a>
            <a
              href={business.links.tel}
              className="inline-flex size-11 items-center justify-center bg-signal text-white sm:hidden"
              aria-label={`Llamar al taller: ${business.phone.display}`}
            >
              <Icon name="phone" />
            </a>
            <button
              ref={menuButton}
              type="button"
              className="inline-flex size-11 items-center justify-center border border-white/20 text-paper lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil: fuera del <header> porque su backdrop-filter recortaría un elemento fixed */}
      <div
        id="menu-movil"
        ref={panel}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-[45] overflow-y-auto bg-carbon text-paper lg:hidden"
      >
        <nav aria-label="Menú móvil" className="container-x flex min-h-full flex-col pt-6 pb-8">
          <ul className="border-t border-line-dark">
            {navigation.map((item, i) => (
              <li key={item.id} className="border-b border-line-dark">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="anim-rise flex items-baseline gap-4 py-4"
                  style={{ '--d': `${i * 40}ms` } as CSSProperties}
                >
                  <span className="label text-signal">0{i + 1}</span>
                  <span className="display text-[2.4rem]">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-10">
            <p className="label text-metal">Contacto directo</p>
            <a href={business.links.tel} className="btn btn-primary w-full">
              <Icon name="phone" className="size-4" /> Llamar · {business.phone.display}
            </a>
            <a
              href={business.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light w-full"
            >
              <Icon name="chat" className="size-4" /> Escribir por WhatsApp
            </a>
            <a
              href={business.links.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light w-full"
            >
              <Icon name="pin" className="size-4" /> Cómo llegar
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
