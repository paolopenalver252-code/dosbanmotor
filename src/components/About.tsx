import type { CSSProperties } from 'react'
import { photos } from '../content/images'
import { Photo } from './ui/Photo'
import { SectionLabel } from './ui/SectionLabel'

const principles = [
  {
    title: 'Explicar antes de reparar',
    text: 'Que sepas qué le pasa a tu coche y por qué hay que hacer cada cosa.',
  },
  {
    title: 'Hablar claro',
    text: 'Sin tecnicismos innecesarios: entender la reparación también es parte del servicio.',
  },
  {
    title: 'Trato de tú a tú',
    text: 'Llamas o escribes y hablas directamente con el taller, sin intermediarios.',
  },
]

export function About() {
  return (
    <section id="taller" aria-labelledby="taller-title" className="bg-graphite text-paper">
      <div className="container-x grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
        {/* Columna de imagen. Preparada para una foto real del equipo o las instalaciones. */}
        <div className="lg:col-span-5">
          <div data-reveal className="relative">
            <Photo
              photo={photos.about}
              sizes="(min-width: 1024px) 40vw, 100vw"
              maxWidth={1440}
              className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]"
            />
            <div aria-hidden="true" className="absolute -bottom-3 left-6 h-6 w-24 bg-signal sm:left-10" />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <SectionLabel index="02" surface="dark">
            El taller
          </SectionLabel>
          <h2
            id="taller-title"
            data-reveal
            className="display mt-6 text-[clamp(2.75rem,12vw,4.25rem)] lg:text-[clamp(4rem,5.6vw,6rem)]"
          >
            La confianza se gana con cada trabajo<span className="text-signal">.</span>
          </h2>

          <div data-reveal className="mt-8 grid max-w-2xl gap-5 text-[1.0625rem] leading-relaxed text-paper/75">
            <p>
              No hay mejor carta de presentación que lo que cuentan quienes ya han pasado por el taller. En sus reseñas,
              los clientes de Dosban Motor hablan de <span className="text-paper">profesionalidad</span>, de un{' '}
              <span className="text-paper">trato cercano</span> y de algo que no siempre es fácil de encontrar: que te
              expliquen con claridad qué le ocurre a tu coche.
            </p>
            <p>Esa es la forma de trabajar que queremos que encuentres cada vez que nos traes tu vehículo.</p>
          </div>

          <ol className="mt-12 border-t border-line-dark">
            {principles.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
                className="grid gap-1 border-b border-line-dark py-6 sm:grid-cols-[3.5rem_14rem_1fr] sm:items-baseline sm:gap-4"
              >
                <span className="label text-signal">0{i + 1}</span>
                <h3 className="font-display text-xl font-bold [font-stretch:85%]">{item.title}</h3>
                <p className="leading-relaxed text-paper/65">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
