import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface BotaoProps {
  children: ReactNode
  para?: string // se tiver, vira link de navegação
  variante?: 'primario' | 'secundario' | 'claro'
  tipo?: 'button' | 'submit'
  desabilitado?: boolean
  aoClicar?: () => void
}

const estilos = {
  primario: 'bg-verde text-white hover:bg-verde-escuro',
  secundario: 'border-2 border-verde-escuro text-verde-escuro hover:bg-verde-escuro hover:text-white',
  claro: 'bg-white text-verde-escuro hover:bg-areia',
}

function Botao({ children, para, variante = 'primario', tipo = 'button', desabilitado, aoClicar }: BotaoProps) {
  const classes = `inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 font-semibold transition
    hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${estilos[variante]}`

  if (para) {
    return (
      <Link to={para} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={tipo} className={classes} disabled={desabilitado} onClick={aoClicar}>
      {children}
    </button>
  )
}

export default Botao
