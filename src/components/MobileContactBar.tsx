import { business } from '../content/business'
import { Icon } from './ui/Icon'

/**
 * Barra fija inferior en móvil: llamar y cómo llegar siempre a un toque
 * (WhatsApp tiene su propio botón flotante, justo encima).
 * Aparece una vez superado el hero, que ya tiene sus propios accesos.
 */
export function MobileContactBar({ visible }: { visible: boolean }) {
  const { links, phone } = business
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-carbon/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-300 ease-out-soft lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      inert={!visible}
    >
      <nav aria-label="Contacto rápido" className="grid grid-cols-[1.5fr_1fr]">
        <a
          href={links.tel}
          className="flex min-h-15 items-center justify-center gap-2 bg-signal text-[0.95rem] font-semibold text-white"
        >
          <Icon name="phone" className="size-[1.1rem]" /> Llamar · {phone.display}
        </a>
        <a
          href={links.directions}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-15 items-center justify-center gap-2 text-[0.95rem] font-semibold text-paper"
        >
          <Icon name="pin" className="size-[1.1rem]" /> Cómo llegar
        </a>
      </nav>
    </div>
  )
}
