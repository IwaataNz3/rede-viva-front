import type { ReactNode } from 'react'
import type { OfertaExemplo } from '../types/oferta'
import { calcularDesconto, formatarPreco } from '../utils/formatar'

interface CardOfertaProps {
  oferta: OfertaExemplo
  mostrarMais?: boolean // botão "+" decorativo do mock da Home
  acao?: ReactNode // botões de adicionar/quantidade na Vitrine
}

function CardOferta({ oferta, mostrarMais = true, acao }: CardOfertaProps) {
  const desconto = calcularDesconto(oferta.precoSistema, oferta.precoRedeViva)

  return (
    <article className="flex items-center justify-between gap-4 rounded-2xl border border-linha bg-white p-4">
      <div className="min-w-0">
        {(oferta.loja || oferta.categoria) && (
          <p className="mb-1 truncate text-xs font-semibold text-cinza">
            {[oferta.categoria, oferta.loja].filter(Boolean).join(' · ')}
          </p>
        )}
        <h3 className="truncate font-texto text-base font-semibold text-tinta">{oferta.produto}</h3>
        <p className="flex flex-wrap items-center gap-x-2 text-sm text-cinza">
          {oferta.venceLogo ? (
            <span className="rounded-full bg-mostarda px-2 py-0.5 text-xs font-bold text-tinta">Vence {oferta.validade}</span>
          ) : (
            <span>Vence {oferta.validade}</span>
          )}
          <span>· {oferta.disponiveis} disponíveis</span>
        </p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <span className="text-sm text-cinza line-through">{formatarPreco(oferta.precoSistema)}</span>
          <span className="font-titulo text-xl font-bold text-tomate">{formatarPreco(oferta.precoRedeViva)}</span>
          <span className="rounded-full bg-tomate px-2 py-0.5 text-xs font-bold text-white">-{desconto}%</span>
        </p>
      </div>
      {acao}
      {!acao && mostrarMais && (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-verde text-2xl leading-none text-white" aria-hidden="true">
          +
        </span>
      )}
    </article>
  )
}

export default CardOferta
