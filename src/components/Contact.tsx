import { useState } from 'react'
import { business } from '../content/business'
import { ContactForm } from './ContactForm'
import { Icon, type IconName } from './ui/Icon'
import { SectionLabel } from './ui/SectionLabel'

type Action = {
  icon: IconName
  label: string
  detail: string
  href: string
  external?: boolean
  primary?: boolean
}

export function Contact() {
  const { address, phone, links, hours, name } = business
  const [mapLoaded, setMapLoaded] = useState(false)

  const actions: Action[] = [
    { icon: 'phone', label: 'Llamar', detail: phone.display, href: links.tel, primary: true },
    {
      icon: 'chat',
      label: 'WhatsApp',
      detail: 'Escríbenos qué le pasa a tu coche',
      href: links.whatsapp,
      external: true,
    },
    {
      icon: 'pin',
      label: 'Cómo llegar',
      detail: `${address.street}, ${address.city}`,
      href: links.directions,
      external: true,
    },
  ]

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-paper text-carbon">
      <div className="container-x py-20 sm:py-24 lg:py-32">
        <SectionLabel index="04">Contacto</SectionLabel>

        <div className="mt-6 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2
              id="contacto-title"
              data-reveal
              className="display text-[clamp(2.9rem,13vw,4.5rem)] lg:text-[clamp(4.5rem,6.4vw,7rem)]"
            >
              ¿Necesitas revisar tu coche<span className="text-signal">?</span>
            </h2>
            <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-steel">
              Cuéntanos qué ocurre y contacta directamente con el taller.
            </p>

            <ul className="mt-12 border-t border-line-light">
              {actions.map((action) => (
                <li key={action.label} className="border-b border-line-light">
                  <a
                    href={action.href}
                    {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group grid min-h-24 grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6"
                  >
                    <span
                      className={`flex size-12 items-center justify-center transition-colors duration-300 sm:size-14 ${
                        action.primary
                          ? 'bg-signal text-white group-hover:bg-signal-hover'
                          : 'bg-carbon text-paper group-hover:bg-graphite-2'
                      }`}
                    >
                      <Icon name={action.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="display block text-[2rem] sm:text-[2.6rem]">{action.label}</span>
                      <span className="mt-1 block text-[0.95rem] leading-snug text-steel">{action.detail}</span>
                    </span>
                    <Icon
                      name={action.external ? 'arrowUpRight' : 'arrowRight'}
                      className="size-6 text-carbon/40 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-signal"
                    />
                    {action.external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <aside aria-label="Dirección y mapa" className="lg:col-span-5">
            <div className="bg-carbon text-paper">
              <div className="p-6 sm:p-8">
                <p className="label text-metal">Dirección</p>
                <address className="mt-4 not-italic">
                  <strong className="display block text-[1.9rem] sm:text-[2.2rem]">{name}</strong>
                  <span className="mt-3 block leading-relaxed text-paper/75">
                    {address.street}
                    <br />
                    {address.postalCode} {address.city}, {address.region}
                  </span>
                  <a href={links.tel} className="link-underline mt-1 inline-block py-2.5 font-semibold">
                    Teléfono: {phone.display}
                  </a>
                </address>

                <div className="mt-6 border-t border-line-dark pt-5 text-sm leading-relaxed text-paper/70">
                  <p className="label text-metal">Horario</p>
                  {hours ? (
                    <dl className="mt-3 grid gap-1">
                      {hours.map((h) => (
                        <div key={h.days} className="flex justify-between gap-4">
                          <dt>{h.days}</dt>
                          <dd className="text-paper">{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="mt-3">Consulta el horario por teléfono o WhatsApp antes de acercarte.</p>
                  )}
                </div>
              </div>

              {/* Mapa: no se conecta con Google hasta que el usuario lo pide */}
              <div className="relative aspect-[4/3] border-t border-line-dark bg-graphite-2">
                {mapLoaded ? (
                  <iframe
                    title={`Mapa de ubicación de ${name}`}
                    src={links.mapEmbed}
                    className="absolute inset-0 size-full border-0 grayscale-[0.4]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <MapPattern />
                    <Icon name="pin" className="relative size-7 text-signal" />
                    <button type="button" onClick={() => setMapLoaded(true)} className="btn btn-light relative">
                      Ver mapa aquí
                    </button>
                    <p className="relative max-w-xs text-xs leading-relaxed text-paper/55">
                      Al cargar el mapa se conectará con Google Maps.{' '}
                      <a
                        href={links.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-paper"
                      >
                        Abrir en Google Maps
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}

/** Trama decorativa de calles para el estado previo del mapa. */
function MapPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 size-full text-paper/[0.06]"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 400 300"
    >
      <g fill="none" stroke="currentColor" strokeWidth="10">
        <path d="M-20 210 C 80 190, 140 120, 420 90" />
        <path d="M120 -10 L 190 320" />
        <path d="M-20 60 L 420 160" strokeWidth="6" />
        <path d="M300 -10 L 260 320" strokeWidth="6" />
      </g>
    </svg>
  )
}
