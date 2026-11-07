const values = ['Profesionalidad', 'Honestidad', 'Atención cercana']

/** Transición tras el hero: los tres valores que más repiten los clientes. */
export function TrustStrip() {
  return (
    <section aria-label="Nuestros valores" className="bg-paper text-carbon">
      <div className="container-x grid gap-6 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:gap-12 lg:py-28">
        <p data-reveal className="label text-steel lg:col-span-3 lg:pb-3">
          Lo que más destacan
          <br />
          quienes ya nos conocen
        </p>
        <p
          data-reveal
          className="display text-[clamp(2.6rem,11vw,4rem)] lg:col-span-9 lg:text-[clamp(4rem,6.2vw,6.25rem)]"
        >
          {values.map((value, i) => (
            <span key={value} className={`block lg:inline ${i === 1 ? 'text-steel' : ''}`}>
              {value}
              <span className="text-signal">.</span>
              {i < values.length - 1 && ' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
