import { business } from '../content/business'
import { reviewHighlights, reviewQuotes } from '../content/reviews'
import { Icon, Stars } from './ui/Icon'
import { SectionLabel } from './ui/SectionLabel'

export function Reviews() {
  const { rating, links } = business
  const ratingText = rating.value.toLocaleString('es-ES', { minimumFractionDigits: 1 })

  return (
    <section id="opiniones" aria-labelledby="opiniones-title" className="bg-paper-2 text-carbon">
      <div className="container-x py-20 sm:py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="03">Opiniones</SectionLabel>
            <h2
              id="opiniones-title"
              data-reveal
              className="display mt-6 text-[clamp(2.75rem,12vw,4.25rem)] lg:text-[clamp(3.75rem,5vw,5.25rem)]"
            >
              La opinión de nuestros clientes importa<span className="text-signal">.</span>
            </h2>

            {/* Valoración de Google (dato facilitado por el cliente, editable en content/business.ts) */}
            <div data-reveal className="mt-12 border-t border-line-light pt-8">
              <p aria-hidden="true" className="flex items-end gap-3">
                <span className="display text-[6.5rem] leading-[0.8] sm:text-[8rem]">{ratingText}</span>
                <span className="pb-1 text-lg font-medium text-steel">/ 5</span>
              </p>
              <p aria-hidden="true" className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <Stars value={rating.value} className="h-5 text-signal" />
                <span className="font-medium">
                  {rating.count} reseñas en {rating.source}
                </span>
              </p>
              <span className="sr-only">
                Valoración media de {ratingText} sobre 5 en {rating.source}, con {rating.count} reseñas.
              </span>
              <a
                href={links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark mt-8 w-full sm:w-auto"
              >
                Leer las reseñas en Google
                <Icon name="arrowUpRight" className="size-4" />
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-28">
            <p data-reveal className="max-w-xl text-[1.0625rem] leading-relaxed text-steel">
              Estos son los temas que más se repiten en las reseñas que nos dejan en Google:
            </p>
            <ul className="mt-8 grid border-t border-line-light sm:grid-cols-2">
              {reviewHighlights.map((item, i) => (
                <li
                  key={item.title}
                  data-reveal
                  className={`border-b border-line-light py-8 sm:pr-8 ${i % 2 === 1 ? 'sm:border-l sm:pr-0 sm:pl-8' : ''}`}
                >
                  <span className="label text-signal">0{i + 1}</span>
                  <h3 className="display mt-3 text-[2rem] sm:text-[2.4rem]">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-steel">{item.text}</p>
                </li>
              ))}
            </ul>

            {reviewQuotes.length > 0 && (
              <div className="mt-12 grid gap-10">
                {reviewQuotes.map((quote) => (
                  <figure key={quote.text} data-reveal className="border-l-2 border-signal pl-6">
                    <blockquote className="text-xl leading-snug font-medium text-carbon sm:text-2xl">
                      «{quote.text}»
                    </blockquote>
                    <figcaption className="mt-3 text-sm text-steel">
                      {quote.author} · Reseña en {rating.source}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            <p className="mt-8 text-sm leading-relaxed text-steel">
              Resumen de reseñas públicas, no citas literales. La valoración puede variar: consulta los datos
              actualizados en Google.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
