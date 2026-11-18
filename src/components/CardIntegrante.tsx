import { Link } from 'react-router-dom'
import type { Integrante } from '../types/integrante'
import { coresAvatar } from '../data/cores-avatar'

interface CardIntegranteProps {
  integrante: Integrante
  posicao: number
}

function CardIntegrante({ integrante, posicao }: CardIntegranteProps) {
  const cor = coresAvatar[posicao % coresAvatar.length]

  return (
    <Link
      to={`/integrantes/${integrante.id}`}
      className="group block rounded-3xl border border-linha bg-white p-5 transition hover:-translate-y-0.5 hover:border-tomate"
    >
      <div className={`mb-5 flex aspect-square items-center justify-center overflow-hidden rounded-2xl ${cor.fundo}`}>
        {integrante.foto ? (
          <img src={integrante.foto} alt={`Foto de ${integrante.nome}`} className="size-full object-cover transition group-hover:scale-[1.03]" />
        ) : (
          <span className={`font-titulo text-7xl font-bold ${cor.letra}`} aria-hidden="true">
            {integrante.nome.charAt(0)}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold">{integrante.nome}</h3>
      <p className="text-cinza">{integrante.rm}</p>
      <p className="mt-3 text-sm font-semibold text-tomate group-hover:underline">Ver perfil</p>
    </Link>
  )
}

export default CardIntegrante
