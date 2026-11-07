/** Etiqueta de sección: índice + nombre, con una línea fina de acento. */
export function SectionLabel({
  index,
  children,
  surface = 'light',
}: {
  index: string
  children: string
  /** Color del fondo sobre el que va la etiqueta */
  surface?: 'light' | 'dark'
}) {
  return (
    <p className={`label flex items-center gap-3 ${surface === 'light' ? 'text-steel' : 'text-metal'}`}>
      <span className="text-signal">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  )
}
