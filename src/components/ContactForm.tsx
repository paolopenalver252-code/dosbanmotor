import { useState, type FormEvent } from 'react'
import { whatsappUrl } from '../content/business'
import { services } from '../content/services'
import { Icon, WhatsAppLogo } from './ui/Icon'

const OTHER = 'Otra consulta'

const field =
  'mt-2 block w-full rounded-none border-0 border-b border-carbon/25 bg-transparent px-0 py-3 text-[1.0625rem] text-carbon placeholder:text-carbon/40 transition-colors focus:border-signal focus:outline-none focus-visible:outline-none'

/**
 * Formulario que compone el mensaje y abre WhatsApp con él ya escrito.
 * No hay backend: la web no envía ni guarda nada; el cliente solo tiene que pulsar "enviar" en WhatsApp.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const value = (key: string) => String(data.get(key) ?? '').trim()

    const lines = [
      'Hola, he visto la web de Talleres Dosban Motor y quería hacer una consulta.',
      '',
      `*Nombre:* ${value('nombre')}`,
    ]
    if (value('vehiculo')) lines.push(`*Vehículo:* ${value('vehiculo')}`)
    lines.push(`*Motivo:* ${value('motivo')}`, '', '*Qué ocurre:*', value('mensaje'))

    const url = whatsappUrl(lines.join('\n'))
    const win = window.open(url, '_blank')
    if (win) win.opener = null
    else window.location.href = url
    setSent(true)
  }

  return (
    <div className="mt-20 grid gap-10 border-t border-line-light pt-14 lg:mt-28 lg:grid-cols-12 lg:gap-16 lg:pt-20">
      <div className="lg:col-span-5">
        <p className="label flex items-center gap-3 text-steel">
          <WhatsAppLogo className="size-4 text-[#1da851]" />
          Consulta por WhatsApp
        </p>
        <h3 data-reveal className="display mt-5 text-[clamp(2.4rem,10vw,3.5rem)] lg:text-[clamp(3rem,4vw,4.25rem)]">
          Cuéntanos qué le pasa a tu coche<span className="text-signal">.</span>
        </h3>
        <p data-reveal className="mt-5 max-w-md leading-relaxed text-steel">
          Rellena estos datos y se abrirá WhatsApp con tu mensaje ya escrito para el taller. Solo tendrás que pulsar
          enviar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 sm:grid-cols-2 sm:gap-x-8 lg:col-span-7">
        <label className="block">
          <span className="label text-steel">
            Nombre <span className="text-signal">*</span>
          </span>
          <input
            name="nombre"
            type="text"
            required
            autoComplete="given-name"
            className={field}
            placeholder="Tu nombre"
          />
        </label>

        <label className="block">
          <span className="label text-steel">Vehículo</span>
          <input name="vehiculo" type="text" autoComplete="off" className={field} placeholder="Marca y modelo" />
        </label>

        <label className="block sm:col-span-2">
          <span className="label text-steel">
            Motivo <span className="text-signal">*</span>
          </span>
          <span className="relative block">
            <select name="motivo" required defaultValue="" className={`${field} cursor-pointer appearance-none pr-8`}>
              <option value="" disabled>
                Elige una opción
              </option>
              {services.map((s) => (
                <option key={s.title}>{s.title}</option>
              ))}
              <option>{OTHER}</option>
            </select>
            <Icon
              name="chevronDown"
              className="pointer-events-none absolute right-0 bottom-3.5 size-5 text-carbon/60"
            />
          </span>
        </label>

        <label className="block sm:col-span-2">
          <span className="label text-steel">
            ¿Qué ocurre? <span className="text-signal">*</span>
          </span>
          <textarea
            name="mensaje"
            required
            rows={4}
            className={`${field} resize-y`}
            placeholder="Describe el problema: ruidos, testigos encendidos, desde cuándo pasa…"
          />
        </label>

        <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            <WhatsAppLogo className="size-[1.1rem]" />
            Enviar por WhatsApp
          </button>
          <p className="text-sm leading-relaxed text-steel sm:max-w-xs sm:text-right">
            Esta web no guarda tus datos: el mensaje solo se envía si lo confirmas en WhatsApp.
          </p>
        </div>

        <p role="status" aria-live="polite" className="text-sm font-medium text-carbon sm:col-span-2">
          {sent && 'Se ha abierto WhatsApp con tu mensaje. Si no lo ves, revisa que no se haya bloqueado la ventana.'}
        </p>
      </form>
    </div>
  )
}
