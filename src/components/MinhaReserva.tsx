import Botao from './Botao'
import type { ItemReservado, ReservaConfirmada } from '../types/reserva'
import { formatarPreco } from '../utils/formatar'

interface MinhaReservaProps {
  itens: ItemReservado[]
  loja: string
  confirmada: ReservaConfirmada | null
  aoMudarQuantidade: (cdOferta: number, quantidade: number) => void
  aoConfirmar: () => void
  aoLimpar: () => void
  aoNovaReserva: () => void
}

function MinhaReserva({ itens, loja, confirmada, aoMudarQuantidade, aoConfirmar, aoLimpar, aoNovaReserva }: MinhaReservaProps) {
  // Depois de confirmar, mostra o comprovante (simulado)
  if (confirmada) {
    return (
      <div className="rounded-3xl bg-verde-escuro p-6 text-verde-claro">
        <p className="font-titulo text-2xl font-bold text-white">Reserva feita!</p>
        <p className="mt-1">Mostre este código no balcão do mercado.</p>
        <p className="mt-5 rounded-2xl bg-white py-4 text-center font-titulo text-3xl font-extrabold tracking-[0.2em] text-verde-escuro">
          {confirmada.codigo}
        </p>
        <dl className="mt-5 space-y-3">
          <div>
            <dt className="text-sm font-semibold text-mostarda">Onde retirar</dt>
            <dd className="text-white">{confirmada.loja}</dd>
            <dd className="text-sm">{confirmada.endereco}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-mostarda">Retire até</dt>
            <dd className="text-white">{confirmada.prazo}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-mostarda">Você paga no balcão</dt>
            <dd className="text-white">
              {formatarPreco(confirmada.total)} por {confirmada.itens} {confirmada.itens === 1 ? 'item' : 'itens'} (economia de {formatarPreco(confirmada.economia)})
            </dd>
          </div>
        </dl>
        <p className="mt-5 rounded-xl bg-white/10 p-3 text-sm">
          Isto é uma simulação feita no navegador. No app, a reserva é gravada pela API e o estoque fica separado por 24 horas.
        </p>
        <div className="mt-5">
          <Botao variante="claro" aoClicar={aoNovaReserva}>Fazer outra reserva</Botao>
        </div>
      </div>
    )
  }

  if (itens.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-linha p-6">
        <p className="font-titulo text-xl font-bold text-verde-escuro">Minha reserva</p>
        <p className="mt-2 text-cinza">
          Toque no + de uma oferta para separar. Você reserva aqui e paga só na hora de retirar no mercado.
        </p>
      </div>
    )
  }

  const total = itens.reduce((soma, item) => soma + item.precoRede * item.quantidade, 0)
  const precoCheio = itens.reduce((soma, item) => soma + item.precoSistema * item.quantidade, 0)
  const quantidadeTotal = itens.reduce((soma, item) => soma + item.quantidade, 0)

  return (
    <div className="rounded-3xl border border-linha bg-white p-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-titulo text-xl font-bold text-verde-escuro">Minha reserva</p>
        <button type="button" onClick={aoLimpar} className="min-h-10 text-sm font-semibold text-erro hover:underline">
          Limpar
        </button>
      </div>
      <p className="text-sm text-cinza">Retirada em {loja}</p>

      <ul className="mt-4 divide-y divide-linha">
        {itens.map((item) => (
          <li key={item.cdOferta} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="truncate font-semibold text-tinta">{item.produto}</p>
              <p className="text-sm text-cinza">{formatarPreco(item.precoRede)} cada</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label={`Tirar um ${item.produto}`}
                onClick={() => aoMudarQuantidade(item.cdOferta, item.quantidade - 1)}
                className="flex size-9 items-center justify-center rounded-full border-2 border-linha text-lg font-bold hover:border-verde"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold" aria-live="polite">{item.quantidade}</span>
              <button
                type="button"
                aria-label={`Mais um ${item.produto}`}
                disabled={item.quantidade >= item.maximo}
                onClick={() => aoMudarQuantidade(item.cdOferta, item.quantidade + 1)}
                className="flex size-9 items-center justify-center rounded-full border-2 border-linha text-lg font-bold hover:border-verde disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <dl className="mt-2 space-y-1 border-t border-linha pt-4">
        <div className="flex justify-between text-cinza">
          <dt>Preço no mercado</dt>
          <dd className="line-through">{formatarPreco(precoCheio)}</dd>
        </div>
        <div className="flex justify-between font-semibold text-tinta">
          <dt>Você paga no balcão</dt>
          <dd className="font-titulo text-xl font-bold text-tomate">{formatarPreco(total)}</dd>
        </div>
      </dl>
      <p className="mt-3 rounded-xl bg-verde-claro p-3 font-semibold text-verde-escuro">
        Você economiza {formatarPreco(precoCheio - total)}
      </p>

      <div className="mt-5 [&>*]:w-full">
        <Botao aoClicar={aoConfirmar}>
          Reservar {quantidadeTotal} {quantidadeTotal === 1 ? 'item' : 'itens'}
        </Botao>
      </div>
      <p className="mt-2 text-center text-xs text-cinza">A reserva vale por 24 horas.</p>
    </div>
  )
}

export default MinhaReserva
