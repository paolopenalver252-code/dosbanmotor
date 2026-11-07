/**
 * Datos editables del negocio.
 *
 * Todo lo que aparece en la web sale de aquí. Si cambia el teléfono, la
 * valoración de Google o se confirma el horario, se actualiza en este archivo
 * y el resto de la web se ajusta solo.
 *
 * Regla: aquí solo entra información confirmada por el cliente.
 * Lo pendiente se marca como `null` y la web lo trata con un texto neutro.
 */

const phoneDigits = '633527918'
const whatsappMessage = 'Hola, he visto la web de Talleres Dosban Motor y quería consultaros sobre mi vehículo.'

const address = {
  street: 'Avenida del Ferrocarril, 33',
  postalCode: '24400',
  city: 'Ponferrada',
  region: 'León',
  country: 'ES',
}

const mapsQuery = `Talleres Dosban Motor, ${address.street}, ${address.postalCode} ${address.city}, ${address.region}`

export const business = {
  name: 'Talleres Dosban Motor',
  shortName: 'Dosban Motor',
  activity: 'Taller mecánico · Reparación y mantenimiento de vehículos',

  phone: {
    display: '633 52 79 18',
    international: `+34${phoneDigits}`,
  },

  address,

  /** Pendiente de confirmar con el cliente. Mientras sea null no se muestra ningún horario. */
  hours: null as null | { days: string; time: string }[],

  /** Valoración facilitada por el cliente. Actualizar cuando cambie en Google. */
  rating: {
    value: 4.3,
    count: 71,
    source: 'Google',
  },

  links: {
    tel: `tel:+34${phoneDigits}`,
    whatsapp: whatsappUrl(whatsappMessage),
    maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`,
    mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`,
  },

  /**
   * Textos legales. Vacío hasta que el cliente facilite los textos reales
   * (aviso legal, privacidad, cookies). No se publican textos genéricos.
   */
  legal: [] as { label: string; href: string }[],
}

/** Construye un enlace de WhatsApp con un mensaje ya escrito. */
export function whatsappUrl(message: string) {
  return `https://wa.me/34${phoneDigits}?text=${encodeURIComponent(message)}`
}

/** Mensaje de WhatsApp para consultar por un servicio concreto. */
export function whatsappForService(service: string) {
  return whatsappUrl(
    `Hola, he visto la web de Talleres Dosban Motor y quería consultaros sobre ${service.toLowerCase()} para mi vehículo.`,
  )
}

export const navigation = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'taller', label: 'El taller' },
  { id: 'opiniones', label: 'Opiniones' },
  { id: 'contacto', label: 'Contacto' },
] as const
