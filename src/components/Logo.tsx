import { Link } from 'react-router-dom'

interface LogoProps {
  claro?: boolean
}

function Logo({ claro = false }: LogoProps) {
  return (
    <Link to="/" className="flex min-h-11 items-center gap-2" aria-label="Rede Viva, página inicial">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" className={claro ? 'fill-white' : 'fill-verde'} />
        <path
          d="M9 23c0-8 5-14 15-14 0 10-6 15-14 15M9 23l8-8"
          fill="none"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={claro ? 'stroke-verde-escuro' : 'stroke-white'}
        />
      </svg>
      <span className={`font-titulo text-xl font-bold ${claro ? 'text-white' : 'text-verde-escuro'}`}>
        Rede Viva
      </span>
    </Link>
  )
}

export default Logo
