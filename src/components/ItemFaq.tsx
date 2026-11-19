import type { Pergunta } from '../types/faq'

interface ItemFaqProps {
  item: Pergunta
  aberto: boolean
  aoAlternar: () => void
}

function ItemFaq({ item, aberto, aoAlternar }: ItemFaqProps) {
  return (
    <li className="border-b border-linha">
      <h3 className="font-texto">
        <button
          type="button"
          className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-lg font-semibold text-tinta hover:text-tomate"
          aria-expanded={aberto}
          aria-controls={`resposta-${item.id}`}
          onClick={aoAlternar}
        >
          {item.pergunta}
          <span className="text-2xl font-bold text-tomate" aria-hidden="true">{aberto ? '−' : '+'}</span>
        </button>
      </h3>
      {aberto && (
        <p id={`resposta-${item.id}`} className="max-w-3xl pb-6 text-cinza">
          {item.resposta}
        </p>
      )}
    </li>
  )
}

export default ItemFaq
