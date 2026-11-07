/**
 * Imágenes de la web.
 *
 * AHORA: fotografías de referencia de Unsplash (licencia Unsplash, uso
 * comercial permitido). NO muestran el taller real y por eso llevan
 * `provisional: true`, que pinta la etiqueta "Imagen provisional".
 *
 * PARA SUSTITUIRLAS por fotos reales del taller:
 *   1. Copia la foto en /public/fotos/ (por ejemplo /public/fotos/fachada.jpg),
 *      idealmente en JPG o WebP de unos 2000 px de ancho.
 *   2. Cambia `src` por la ruta ('/fotos/fachada.jpg').
 *   3. Pon `provisional: false` y revisa el texto alternativo (`alt`).
 *   4. Si el encuadre no queda bien, ajusta `position` (ej. 'center 30%').
 */

export type Photo = {
  /** ID de Unsplash (empieza por "photo-") o ruta local ("/fotos/...") */
  src: string
  alt: string
  provisional: boolean
  /** object-position CSS para controlar el encuadre */
  position?: string
  /** Página del autor/foto en Unsplash, para trazabilidad de la licencia */
  credit?: string
}

export const photos = {
  hero: {
    src: 'photo-1615906655593-ad0386982a0f',
    alt: 'Mecánico trabajando en el motor de un coche',
    provisional: true,
    position: '38% 50%',
    credit: 'https://unsplash.com/photos/UZUzvJEvKnI',
  },
  generalMechanics: {
    src: 'photo-1771340012319-0b4fca008b54',
    alt: 'Mecánico revisando el motor de un coche con el capó abierto en un taller',
    provisional: true,
    position: 'center',
    credit: 'https://unsplash.com/photos/XP8o9_Arwqg',
  },
  diagnosis: {
    src: 'photo-1775285157647-73f29f910216',
    alt: 'Detalle del cableado y los componentes de un motor',
    provisional: true,
    position: 'center',
    credit: 'https://unsplash.com/photos/VZcQi2ZS2TU',
  },
  repairs: {
    src: 'photo-1643700973089-baa86a1ab9ee',
    alt: 'Mecánico trabajando bajo un vehículo elevado',
    provisional: true,
    position: 'center 30%',
    credit: 'https://unsplash.com/photos/jL9zfzTVSwY',
  },
  maintenance: {
    src: 'photo-1658244535411-92c887137240',
    alt: 'Coche oscuro aparcado en el interior de un taller iluminado',
    provisional: true,
    position: 'center 60%',
    credit: 'https://unsplash.com/photos/S_M21DnlEZk',
  },
  about: {
    src: 'photo-1643701079732-3b1c7a797e3d',
    alt: 'Mecánico concentrado trabajando en los bajos de un coche',
    provisional: true,
    position: '30% center',
    credit: 'https://unsplash.com/photos/FHrxSBfNzLw',
  },
} satisfies Record<string, Photo>

/** Galería "Trabajos e instalaciones". El orden define la composición. */
export const gallery: (Photo & { caption: string })[] = [
  {
    src: 'photo-1676018366904-c083ed678e60',
    alt: 'Interior de un taller con banco de trabajo y herramientas',
    caption: 'Instalaciones',
    provisional: true,
    position: 'center',
    credit: 'https://unsplash.com/photos/KhF58h0hTbc',
  },
  {
    src: 'photo-1637640125496-31852f042a60',
    alt: 'Llaves y herramientas de taller ordenadas en una caja',
    caption: 'Herramientas',
    provisional: true,
    position: 'center',
    credit: 'https://unsplash.com/photos/OegFhZfw6Ok',
  },
  {
    src: 'photo-1723099971299-3789db53604c',
    alt: 'Coche elevado en un puente de taller',
    caption: 'Zona de trabajo',
    provisional: true,
    position: 'center 40%',
    credit: 'https://unsplash.com/photos/Hv_gKPOXmwE',
  },
  {
    src: 'photo-1757547570448-04946db22218',
    alt: 'Primer plano de un motor con alternador y correas',
    caption: 'Detalle mecánico',
    provisional: true,
    position: 'center',
    credit: 'https://unsplash.com/photos/Leqgimt28cM',
  },
  {
    src: 'photo-1702146713858-8e7d1cc29fe8',
    alt: 'Trabajo en los bajos de un vehículo',
    caption: 'Reparación',
    provisional: true,
    position: 'center',
    credit: 'https://unsplash.com/photos/K5624F8cipE',
  },
]

const widths = [480, 768, 1080, 1440, 1920]

/** Devuelve src/srcSet listos para <img>. Unsplash se sirve optimizado (WebP/AVIF). */
export function imageSources(photo: Photo, maxWidth = 1920) {
  if (!photo.src.startsWith('photo-')) {
    return { src: photo.src }
  }
  const base = `https://images.unsplash.com/${photo.src}?auto=format&fit=max&q=70`
  const usable = widths.filter((w) => w <= maxWidth)
  return {
    src: `${base}&w=${usable[usable.length - 1]}`,
    srcSet: usable.map((w) => `${base}&w=${w} ${w}w`).join(', '),
  }
}
