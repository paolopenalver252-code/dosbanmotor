/**
 * Identidad textual provisional hasta disponer del logotipo oficial.
 * Para usar el logo real: sustituir el contenido por un <img src="/logo.svg" ...>.
 */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 leading-none ${className}`}>
      <span aria-hidden="true" className="block h-[1.15em] w-[0.28em] -skew-x-[14deg] bg-signal" />
      <span className="font-display text-[1.15rem] font-extrabold tracking-[0.04em] [font-stretch:80%]">
        DOSBAN
        <span className="ml-1.5 font-medium text-metal">MOTOR</span>
      </span>
    </span>
  )
}
