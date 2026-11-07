/**
 * Opiniones.
 *
 * `highlights` resume los temas que se repiten en las reseñas de Google
 * facilitadas por el cliente. NO son citas literales y la web no las presenta
 * como tales.
 *
 * `quotes` está vacío a propósito: solo se deben añadir fragmentos copiados
 * literalmente de reseñas reales y públicas, sin alterar su significado.
 * Cuando se añadan, la sección los mostrará automáticamente.
 */

export const reviewHighlights = [
  {
    title: 'Profesionalidad',
    text: 'La forma de trabajar del taller es lo que más se repite entre quienes dejan su opinión.',
  },
  {
    title: 'Honestidad',
    text: 'Los clientes valoran que se les explique qué tiene el coche y qué reparación necesita.',
  },
  {
    title: 'Trato cercano',
    text: 'La atención y el asesoramiento aparecen una y otra vez en las reseñas.',
  },
  {
    title: 'Soluciones',
    text: 'Se mencionan averías mecánicas y problemas eléctricos que el taller consiguió resolver.',
  },
]

export type ReviewQuote = {
  /** Fragmento literal de la reseña */
  text: string
  /** Nombre tal y como aparece públicamente en Google */
  author: string
}

export const reviewQuotes: ReviewQuote[] = []
