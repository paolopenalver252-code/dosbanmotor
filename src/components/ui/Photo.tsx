import { imageSources, type Photo as PhotoData } from '../../content/images'

type Props = {
  photo: PhotoData
  sizes: string
  className?: string
  imgClassName?: string
  priority?: boolean
  maxWidth?: number
  /** Posición de la etiqueta "Imagen provisional" */
  tag?: 'top-left' | 'below-header' | 'bottom-right' | 'none'
}

const tagPosition = {
  'top-left': 'left-3 top-3',
  'below-header': 'right-3 top-20 lg:right-6 lg:top-24',
  'bottom-right': 'right-3 bottom-3',
}

/**
 * Imagen responsive con encuadre controlado. Si la foto es provisional,
 * muestra una etiqueta discreta para que nadie la confunda con el taller real.
 */
export function Photo({
  photo,
  sizes,
  className = '',
  imgClassName = '',
  priority = false,
  maxWidth,
  tag = 'top-left',
}: Props) {
  const { src, srcSet } = imageSources(photo, maxWidth)
  return (
    <div className={`relative overflow-hidden bg-graphite-2 ${className}`}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`absolute inset-0 size-full object-cover ${imgClassName}`}
        style={{ objectPosition: photo.position }}
      />
      {photo.provisional && tag !== 'none' && (
        <span
          className={`absolute ${tagPosition[tag]} z-10 rounded-sm bg-carbon/70 px-2 py-1 text-[0.6875rem] font-medium tracking-wide text-paper/90 backdrop-blur-sm`}
        >
          Imagen provisional
        </span>
      )}
    </div>
  )
}
