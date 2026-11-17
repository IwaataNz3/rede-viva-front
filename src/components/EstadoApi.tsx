import Botao from './Botao'

// Mensagens de carregando e de erro usadas nas páginas que falam com a API

export function Carregando({ texto }: { texto: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 rounded-3xl border border-linha bg-white px-6 py-14 text-center">
      <span className="size-10 animate-spin rounded-full border-4 border-verde-claro border-t-verde" aria-hidden="true" />
      <p className="font-semibold text-tinta">{texto}</p>
      <p className="max-w-md text-sm text-cinza">
        A API fica no plano gratuito do Render e "dorme" quando ninguém usa. Na primeira visita ela pode levar até 1 minuto para acordar.
      </p>
    </div>
  )
}

export function ErroCarregar({ mensagem, aoTentarDeNovo }: { mensagem: string; aoTentarDeNovo: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-4 rounded-3xl bg-erro-claro px-6 py-14 text-center">
      <p className="font-titulo text-xl font-bold text-erro">Não foi possível falar com a API</p>
      <p className="max-w-md text-tinta">{mensagem}</p>
      <Botao variante="secundario" aoClicar={aoTentarDeNovo}>Tentar de novo</Botao>
    </div>
  )
}
