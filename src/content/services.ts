import { photos, type Photo } from './images'

/**
 * Servicios. Solo los confirmados por el cliente.
 * Para añadir uno nuevo, añade un objeto más a la lista.
 */
export type Service = {
  title: string
  summary: string
  description: string
  photo: Photo
}

export const services: Service[] = [
  {
    title: 'Mecánica general',
    summary: 'Revisión y reparación de los componentes mecánicos.',
    description:
      'Si notas un ruido nuevo, una vibración o que el coche no responde como antes, lo revisamos y te explicamos qué está pasando antes de hacer nada.',
    photo: photos.generalMechanics,
  },
  {
    title: 'Diagnóstico de averías',
    summary: 'Primero entender el problema. Después, solucionarlo.',
    description:
      'Buscamos el origen de la avería, sea mecánica o eléctrica, y te contamos con claridad qué hemos encontrado y qué opciones tienes.',
    photo: photos.diagnosis,
  },
  {
    title: 'Reparaciones',
    summary: 'Nos ponemos con la avería una vez localizada.',
    description:
      'Te explicamos qué hay que hacer y por qué, para que decidas con toda la información y vuelvas a la carretera cuanto antes.',
    photo: photos.repairs,
  },
  {
    title: 'Mantenimiento y revisiones',
    summary: 'Cuidar el coche a tiempo evita sustos.',
    description:
      'Un mantenimiento periódico ayuda a prevenir averías y a alargar la vida del vehículo. Pregúntanos qué revisión necesita el tuyo.',
    photo: photos.maintenance,
  },
]
