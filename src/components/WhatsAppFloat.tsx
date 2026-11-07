import { business } from '../content/business'
import { WhatsAppLogo } from './ui/Icon'

/**
 * Botón flotante de WhatsApp, visible en toda la página.
 * En móvil sube cuando aparece la barra inferior de contacto para no taparla.
 */
export function WhatsAppFloat({ raised }: { raised: boolean }) {
  return (
    <a
      href={business.links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir al taller por WhatsApp (se abre en una pestaña nueva)"
      className={`group fixed right-4 z-40 flex items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgb(0_0_0/0.28)] transition-[bottom,transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgb(0_0_0/0.32)] sm:right-6 lg:bottom-6 ${
        raised
          ? 'bottom-[calc(4.75rem+env(safe-area-inset-bottom))]'
          : 'bottom-[calc(1rem+env(safe-area-inset-bottom))]'
      }`}
    >
      <span className="flex size-14 items-center justify-center sm:size-[3.75rem]">
        <WhatsAppLogo className="size-7 sm:size-8" />
      </span>
      {/* Texto que se despliega al pasar el ratón en escritorio */}
      <span
        aria-hidden="true"
        className="hidden max-w-0 overflow-hidden whitespace-nowrap font-display text-[0.95rem] font-semibold tracking-[0.02em] transition-[max-width,padding] duration-300 ease-out-soft group-hover:max-w-40 group-hover:pr-5 group-focus-visible:max-w-40 group-focus-visible:pr-5 lg:block"
      >
        Escríbenos
      </span>
    </a>
  )
}
