import { useEffect, useRef, useState } from 'react'
import { whatsappForService } from '../content/business'
import { services } from '../content/services'
import { Icon } from './ui/Icon'
import { Photo } from './ui/Photo'
import { SectionLabel } from './ui/SectionLabel'

const pad = (n: number) => String(n + 1).padStart(2, '0')

export function Services() {
  const [active, setActive] = useState(0)
  const rows = useRef<(HTMLLIElement | null)[]>([])

  // En escritorio, la imagen fija cambia según el servicio que está en el centro de la pantalla.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    rows.current.forEach((row) => row && observer.observe(row))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-title"
      className="border-t border-line-light bg-paper text-carbon"
    >
      <div className="container-x py-20 sm:py-24 lg:py-32">
        <header className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionLabel index="01">Servicios</SectionLabel>
            <h2
              id="servicios-title"
              data-reveal
              className="display mt-6 text-[clamp(3rem,13vw,4.5rem)] lg:text-[clamp(4.5rem,6.6vw,7rem)]"
            >
              Cuidamos de
              <br />
              tu vehículo<span className="text-signal">.</span>
            </h2>
          </div>
          <p
            data-reveal
            className="max-w-md text-[1.0625rem] leading-relaxed text-steel lg:col-span-5 lg:self-end lg:pb-2"
          >
            Reparación y mantenimiento para que tu coche funcione como debe. Te explicamos qué tiene y qué necesita, sin
            rodeos.
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:mt-24 lg:grid-cols-12">
          <ol className="border-t border-line-light lg:col-span-7">
            {services.map((service, i) => {
              const isActive = active === i
              return (
                <li
                  key={service.title}
                  ref={(el) => {
                    rows.current[i] = el
                  }}
                  data-index={i}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group border-b border-line-light py-8 sm:py-10 lg:py-12"
                >
                  {/* Imagen por servicio solo en móvil/tablet */}
                  <Photo
                    photo={service.photo}
                    sizes="(min-width: 640px) 90vw, 100vw"
                    maxWidth={1440}
                    className="mb-7 aspect-[16/10] lg:hidden"
                  />
                  <div className="grid grid-cols-[3rem_1fr] gap-x-3 sm:grid-cols-[4.5rem_1fr]">
                    <span
                      aria-hidden="true"
                      className={`display pt-1 text-2xl transition-colors duration-300 sm:text-3xl ${
                        isActive ? 'text-signal' : 'text-carbon/30 lg:text-carbon/25'
                      }`}
                    >
                      {pad(i)}
                    </span>
                    <div>
                      <h3 className="display text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">{service.title}</h3>
                      <p className="mt-3 font-semibold text-carbon">{service.summary}</p>
                      <p className="mt-2 max-w-xl leading-relaxed text-steel">{service.description}</p>
                      <a
                        href={whatsappForService(service.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link mt-6 inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-semibold text-carbon"
                      >
                        <span className="link-underline">Consultar por WhatsApp</span>
                        <span className="sr-only">
                          {' '}
                          sobre {service.title.toLowerCase()} (se abre en una pestaña nueva)
                        </span>
                        <Icon
                          name="arrowRight"
                          className="size-4 text-signal transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </a>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Imagen fija que acompaña a la lista en escritorio */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
                {services.map((service, i) => (
                  <div
                    key={service.title}
                    aria-hidden={active !== i}
                    className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out-soft ${
                      active === i ? 'opacity-100' : 'scale-[1.03] opacity-0'
                    }`}
                  >
                    <Photo photo={service.photo} sizes="40vw" maxWidth={1080} className="size-full" />
                  </div>
                ))}
              </div>
              <p className="label mt-4 flex items-center gap-3 text-steel" aria-hidden="true">
                <span className="text-signal">{pad(active)}</span>
                <span className="h-px w-6 bg-current opacity-50" />
                {services[active].title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
