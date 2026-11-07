import { business, navigation } from '../content/business'
import { gallery } from '../content/images'

const year = new Date().getFullYear()

export function Footer() {
  const { name, address, phone, links, legal } = business
  const usesProvisionalPhotos = gallery.some((p) => p.provisional)

  return (
    <footer className="bg-carbon pb-24 text-paper lg:pb-0">
      <div className="container-x pt-16 lg:pt-24">
        <p
          aria-hidden="true"
          className="display text-[clamp(3.4rem,19vw,15rem)] sm:text-[13vw] 2xl:text-[12rem] leading-[0.82] text-paper/[0.92]"
        >
          Dosban<span className="text-signal">.</span>
          <br className="sm:hidden" /> <span className="text-metal/60">Motor</span>
        </p>

        <div className="mt-14 grid gap-10 border-t border-line-dark pt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="label text-metal">{name}</p>
            <address className="mt-4 not-italic leading-relaxed text-paper/75">
              {address.street}
              <br />
              {address.postalCode} {address.city}, {address.region}
            </address>
            <a
              href={links.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-1 inline-block py-3 text-sm font-semibold"
            >
              Ver en Google Maps<span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </div>

          <div className="lg:col-span-3">
            <p className="label text-metal">Teléfono y WhatsApp</p>
            <a href={links.tel} className="display mt-4 inline-block text-3xl transition-colors hover:text-signal">
              {phone.display}
            </a>
          </div>

          <nav aria-label="Pie de página" className="lg:col-span-5">
            <p className="label text-metal">Secciones</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-11 items-center text-paper/75 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line-dark py-8 text-xs leading-relaxed text-paper/50 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {name}
          </p>
          {legal.length > 0 ? (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aviso legal, privacidad y cookies: textos pendientes de incorporar.</p>
          )}
          {usesProvisionalPhotos && (
            <p>
              Fotografías de referencia:{' '}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-paper"
              >
                Unsplash
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
