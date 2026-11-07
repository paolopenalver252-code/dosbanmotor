import type { CSSProperties } from 'react'
import { gallery } from '../content/images'
import { Photo } from './ui/Photo'

/**
 * Composición editorial fija para 5 imágenes (escritorio: 12 columnas).
 * Si cambia el número de fotos, basta con ajustar esta lista de clases.
 */
const layout = [
  'col-span-2 aspect-[4/3] lg:col-span-7 lg:row-span-2 lg:aspect-auto',
  'aspect-square lg:col-span-5 lg:aspect-[16/10]',
  'aspect-square lg:col-span-5 lg:aspect-[16/10]',
  'aspect-[4/5] lg:col-span-4 lg:aspect-[4/5]',
  'aspect-[4/5] lg:col-span-8 lg:aspect-auto',
]

const sizes = [
  '(min-width: 1024px) 58vw, 100vw',
  '(min-width: 1024px) 42vw, 50vw',
  '(min-width: 1024px) 42vw, 50vw',
  '(min-width: 1024px) 33vw, 50vw',
  '(min-width: 1024px) 66vw, 50vw',
]

export function Gallery() {
  const hasProvisional = gallery.some((p) => p.provisional)

  return (
    <section aria-labelledby="galeria-title" className="bg-graphite pb-20 text-paper sm:pb-24 lg:pb-32">
      <div className="container-x">
        <div className="grid gap-6 border-t border-line-dark pt-16 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pt-24">
          <h2
            id="galeria-title"
            data-reveal
            className="display text-[clamp(2.5rem,11vw,4rem)] lg:col-span-7 lg:text-[clamp(3.5rem,4.8vw,5rem)]"
          >
            Trabajos e instalaciones
          </h2>
          {hasProvisional && (
            <p data-reveal className="max-w-md text-sm leading-relaxed text-paper/60 lg:col-span-5 lg:justify-self-end">
              Las fotografías actuales son de referencia y no corresponden al taller. Se sustituirán por imágenes reales
              de nuestras instalaciones y trabajos.
            </p>
          )}
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-2 sm:gap-3 lg:mt-14 lg:grid-cols-12 lg:gap-4">
          {gallery.map((photo, i) => (
            <li
              key={photo.src}
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 70}ms` } as CSSProperties}
              className={`group relative ${layout[i] ?? 'aspect-square lg:col-span-4'}`}
            >
              <figure className="absolute inset-0">
                <Photo
                  photo={photo}
                  sizes={sizes[i] ?? '33vw'}
                  maxWidth={1440}
                  className="size-full"
                  imgClassName="transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.035]"
                  tag="bottom-right"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 top-0 flex items-center gap-2.5 bg-gradient-to-b from-carbon/60 to-transparent p-3 pb-10 sm:p-4 sm:pb-12">
                  <span className="label text-signal">{String(i + 1).padStart(2, '0')}</span>
                  <span className="label text-paper">{photo.caption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
