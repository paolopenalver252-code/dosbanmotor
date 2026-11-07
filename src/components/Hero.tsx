import type { CSSProperties } from 'react'
import { business } from '../content/business'
import { photos } from '../content/images'
import { Icon, Stars } from './ui/Icon'
import { Photo } from './ui/Photo'

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

export function Hero() {
  const { rating, address, phone, links } = business
  const ratingText = rating.value.toLocaleString('es-ES', { minimumFractionDigits: 1 })

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex flex-col bg-carbon pt-16 lg:min-h-[max(720px,100svh)] lg:pt-0"
    >
      {/* Fotografía: arriba en móvil, ocupando la derecha en escritorio */}
      <div className="relative h-[50svh] max-h-[540px] min-h-[300px] lg:absolute lg:inset-y-0 lg:right-0 lg:left-[34%] lg:h-auto lg:max-h-none">
        <Photo
          photo={photos.hero}
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="size-full"
          imgClassName="anim-settle"
          tag="below-header"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-carbon/25 to-carbon/10 lg:hidden"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-carbon via-carbon/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-carbon via-carbon/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-carbon/70 to-transparent" />
        </div>
      </div>

      <div className="container-x relative z-10 -mt-24 flex flex-col sm:-mt-32 lg:mt-0 lg:flex-1 lg:justify-end lg:pt-40 lg:pb-16">
        <p className="label anim-rise flex items-center gap-3 text-paper/75" style={delay(100)}>
          <span aria-hidden="true" className="h-px w-8 bg-signal" />
          Taller mecánico en {address.city}
          <span className="-ml-3 hidden sm:inline">, {address.region}</span>
        </p>

        <h1
          id="hero-title"
          className="display mt-5 text-[clamp(3.6rem,17.5vw,6.5rem)] lg:mt-7 lg:text-[clamp(6rem,8.6vw,9.75rem)]"
        >
          <span className="anim-rise block" style={delay(150)}>
            Tu coche.
          </span>
          <span className="anim-rise block" style={delay(260)}>
            En buenas <br className="lg:hidden" />
            manos<span className="text-signal">.</span>
          </span>
        </h1>

        <div className="mt-7 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,30rem)_auto] lg:items-end lg:justify-between">
          <p
            className="anim-rise max-w-[30rem] text-[1.0625rem] leading-relaxed text-paper/80 lg:text-lg"
            style={delay(380)}
          >
            Reparación y mantenimiento de vehículos en {address.city}. Atención cercana, profesionalidad y soluciones
            para que sigas tu camino.
          </p>
          <div className="anim-rise flex flex-col gap-3 sm:flex-row" style={delay(460)}>
            <a href="#contacto" className="btn btn-primary">
              Contactar con el taller
              <Icon name="arrowRight" className="size-4" />
            </a>
            <a href="#servicios" className="btn btn-outline-light">
              Descubrir servicios
            </a>
          </div>
        </div>
      </div>

      {/* Datos rápidos: ubicación, reseñas, teléfono */}
      <div className="container-x relative z-10 mt-10 lg:mt-0">
        <ul className="anim-rise grid border-t border-line-dark lg:grid-cols-3" style={delay(560)}>
          <li className="border-b border-line-dark lg:border-b-0">
            <a
              href={links.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-16 items-center gap-3 py-4 text-sm text-paper/75 transition-colors hover:text-paper lg:pr-6"
            >
              <Icon name="pin" className="size-4 shrink-0 text-signal" />
              <span>
                {address.street} · {address.city}
                <span className="sr-only"> — Cómo llegar en Google Maps (se abre en una pestaña nueva)</span>
              </span>
              <Icon
                name="arrowUpRight"
                className="ml-auto size-4 shrink-0 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </a>
          </li>
          <li className="border-b border-line-dark lg:border-b-0 lg:border-l lg:pl-6">
            <a
              href={links.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-16 items-center gap-3 py-4 text-sm text-paper/75 transition-colors hover:text-paper"
            >
              <Stars value={rating.value} className="h-3.5 text-paper" />
              <span>
                <strong className="font-semibold text-paper">{ratingText}</strong>/5 · {rating.count} reseñas en{' '}
                {rating.source}
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </span>
              <Icon
                name="arrowUpRight"
                className="ml-auto size-4 shrink-0 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </a>
          </li>
          <li className="lg:border-l lg:border-line-dark lg:pl-6">
            <a
              href={links.tel}
              className="group flex min-h-16 items-center gap-3 py-4 text-sm text-paper/75 transition-colors hover:text-paper"
            >
              <Icon name="phone" className="size-4 shrink-0 text-signal" />
              <span>
                Llamar al taller · <strong className="font-semibold text-paper">{phone.display}</strong>
              </span>
              <Icon
                name="arrowRight"
                className="ml-auto size-4 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
