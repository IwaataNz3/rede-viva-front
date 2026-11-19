import { useEffect, useState } from 'react'
import { Carregando, ErroCarregar } from '../components/EstadoApi'
import FormOferta from '../components/FormOferta'
import TopoPagina from '../components/TopoPagina'
import { buscarLojas, buscarOfertasDaLoja, buscarProdutosDaLoja, excluirOferta } from '../services/api'
import type { Loja, Oferta, Produto } from '../types/api'
import { calcularDesconto, diasAteVencer, formatarData, formatarPreco, nomesCategorias } from '../utils/formatar'

// Como aparece cada status da oferta
function selo(oferta: Oferta) {
  if (oferta.stOferta === 'ATIVA' && diasAteVencer(oferta.dtValidade) < 0) {
    return { texto: 'Vencida', classe: 'bg-erro-claro text-erro' }
  }
  if (oferta.stOferta === 'ESGOTADA') return { texto: 'Esgotada', classe: 'bg-mostarda-claro text-tinta' }
  if (oferta.stOferta === 'ENCERRADA') return { texto: 'Encerrada', classe: 'bg-areia text-cinza' }
  return { texto: 'Ativa', classe: 'bg-verde-claro text-verde-escuro' }
}

function Painel() {
  const [lojas, setLojas] = useState<Loja[]>([])
  const [cdLoja, setCdLoja] = useState(0)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [carregandoLojas, setCarregandoLojas] = useState(true)
  const [carregandoOfertas, setCarregandoOfertas] = useState(false)
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null)
  const [editando, setEditando] = useState<Oferta | null>(null)
  const [confirmarExclusao, setConfirmarExclusao] = useState<number | null>(null)
  const [excluindo, setExcluindo] = useState(false)
  const [atualizar, setAtualizar] = useState(0) // muda para buscar as ofertas de novo
  const [tentativa, setTentativa] = useState(0)

  function mensagemDeErro(e: Error) {
    return e.message === 'Failed to fetch' ? 'Confira sua internet e tente de novo.' : e.message
  }

  // 1) Lojas (sem login, o painel deixa escolher a loja)
  useEffect(() => {
    setCarregandoLojas(true)
    setErro('')
    buscarLojas()
      .then((lista) => {
        setLojas(lista)
        if (lista.length > 0) setCdLoja(lista[0].cdLoja)
      })
      .catch((e: Error) => setErro(mensagemDeErro(e)))
      .finally(() => setCarregandoLojas(false))
  }, [tentativa])

  // 2) Produtos e ofertas da loja escolhida
  useEffect(() => {
    if (cdLoja === 0) return
    setCarregandoOfertas(true)
    Promise.all([buscarProdutosDaLoja(cdLoja), buscarOfertasDaLoja(cdLoja)])
      .then(([listaProdutos, listaOfertas]) => {
        setProdutos(listaProdutos)
        setOfertas(listaOfertas)
      })
      .catch((e: Error) => setAviso({ tipo: 'erro', texto: mensagemDeErro(e) }))
      .finally(() => setCarregandoOfertas(false))
  }, [cdLoja, atualizar])

  function trocarLoja(novaLoja: string) {
    setCdLoja(Number(novaLoja))
    setEditando(null)
    setAviso(null)
  }

  function aoSalvar(mensagem: string) {
    setAviso({ tipo: 'sucesso', texto: mensagem })
    setEditando(null)
    setAtualizar(atualizar + 1)
  }

  function editar(oferta: Oferta) {
    setAviso(null)
    setEditando(oferta)
    document.getElementById('form-oferta')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function excluir(oferta: Oferta) {
    setExcluindo(true)
    excluirOferta(oferta.cdOferta)
      .then(() => {
        setAviso({ tipo: 'sucesso', texto: 'Oferta excluída.' })
        if (editando?.cdOferta === oferta.cdOferta) setEditando(null)
        setAtualizar(atualizar + 1)
      })
      .catch((e: Error) => {
        // 409 da API: a oferta já tem item reservado (chave estrangeira no banco)
        const texto = e.message.startsWith('Não é possível remover')
          ? 'Essa oferta já tem reserva de alguma família, por isso não pode ser excluída.'
          : mensagemDeErro(e)
        setAviso({ tipo: 'erro', texto })
      })
      .finally(() => {
        setExcluindo(false)
        setConfirmarExclusao(null)
      })
  }

  const lojaAtual = lojas.find((l) => l.cdLoja === cdLoja)

  return (
    <>
      <TopoPagina
        cor="verde"
        titulo="Painel da loja"
        texto="Depois que a promoção acaba, o mercado publica aqui o que sobrou: produto, quantidade, preço Rede Viva e validade."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
        {carregandoLojas && <Carregando texto="Carregando os mercados..." />}

        {!carregandoLojas && erro && <ErroCarregar mensagem={erro} aoTentarDeNovo={() => setTentativa(tentativa + 1)} />}

        {!carregandoLojas && !erro && lojas.length === 0 && (
          <p className="rounded-3xl border-2 border-dashed border-linha px-6 py-14 text-center text-cinza">
            Nenhum mercado cadastrado na API ainda.
          </p>
        )}

        {!carregandoLojas && !erro && lojas.length > 0 && (
          <>
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div className="md:w-96">
                <label htmlFor="loja" className="mb-2 block font-semibold">Mercado</label>
                <select
                  id="loja"
                  value={cdLoja}
                  onChange={(e) => trocarLoja(e.target.value)}
                  className="min-h-12 w-full rounded-xl border-2 border-linha bg-white px-4 outline-none focus:border-verde"
                >
                  {lojas.map((loja) => (
                    <option key={loja.cdLoja} value={loja.cdLoja}>{loja.nmLoja}</option>
                  ))}
                </select>
              </div>
              {lojaAtual && <p className="text-cinza">{lojaAtual.dsEndereco}</p>}
            </div>

            {aviso && (
              <p
                role="status"
                className={`mt-6 rounded-xl p-4 font-medium ${
                  aviso.tipo === 'sucesso' ? 'bg-verde-claro text-verde-escuro' : 'bg-erro-claro text-erro'
                }`}
              >
                {aviso.texto}
              </p>
            )}

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-start">
              <div className="lg:sticky lg:top-24">
                {produtos.length === 0 && !carregandoOfertas ? (
                  <p className="rounded-3xl border border-linha bg-white p-6 text-cinza">
                    Este mercado ainda não tem produtos cadastrados, então não dá para publicar oferta.
                  </p>
                ) : (
                  <FormOferta
                    key={editando ? editando.cdOferta : 'nova'}
                    cdLoja={cdLoja}
                    produtos={produtos}
                    ofertaEditando={editando}
                    aoSalvar={aoSalvar}
                    aoCancelar={() => setEditando(null)}
                  />
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold">Ofertas publicadas</h2>
                {carregandoOfertas && <p role="status" className="mt-4 text-cinza">Carregando ofertas...</p>}

                {!carregandoOfertas && ofertas.length === 0 && (
                  <p className="mt-4 rounded-3xl border-2 border-dashed border-linha px-6 py-10 text-center text-cinza">
                    Nenhuma oferta publicada ainda. Use o formulário para publicar a primeira.
                  </p>
                )}

                {!carregandoOfertas && ofertas.length > 0 && (
                  <ul className="mt-4 space-y-3">
                    {ofertas.map((oferta) => {
                      const produto = produtos.find((p) => p.cdProduto === oferta.cdProduto)
                      const status = selo(oferta)
                      const emEdicao = editando?.cdOferta === oferta.cdOferta
                      return (
                        <li
                          key={oferta.cdOferta}
                          className={`rounded-2xl border-2 bg-white p-4 md:p-5 ${emEdicao ? 'border-verde' : 'border-linha'}`}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="font-texto text-lg font-semibold text-tinta">
                                {produto?.nmProduto ?? `Produto ${oferta.cdProduto}`}
                              </h3>
                              <p className="text-sm text-cinza">
                                {produto ? nomesCategorias[produto.dsCategoria] : ''} · vence em {formatarData(oferta.dtValidade)} · {oferta.qtDisponivel} disponíveis
                              </p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${status.classe}`}>{status.texto}</span>
                          </div>

                          <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
                            <span className="text-sm text-cinza line-through">{formatarPreco(oferta.vlPrecoSistema)}</span>
                            <span className="font-titulo text-xl font-bold text-tomate">{formatarPreco(oferta.vlPrecoRede)}</span>
                            <span className="text-sm font-semibold text-tomate">-{calcularDesconto(oferta.vlPrecoSistema, oferta.vlPrecoRede)}%</span>
                          </p>

                          {confirmarExclusao === oferta.cdOferta ? (
                            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-erro-claro p-3">
                              <span className="font-medium text-erro">Excluir esta oferta?</span>
                              <button type="button" disabled={excluindo} onClick={() => excluir(oferta)}
                                className="min-h-10 rounded-full bg-erro px-4 font-semibold text-white disabled:opacity-60">
                                {excluindo ? 'Excluindo...' : 'Sim, excluir'}
                              </button>
                              <button type="button" disabled={excluindo} onClick={() => setConfirmarExclusao(null)}
                                className="min-h-10 rounded-full px-4 font-semibold text-tinta hover:bg-white">
                                Não
                              </button>
                            </div>
                          ) : (
                            <div className="mt-4 flex gap-3">
                              <button type="button" onClick={() => editar(oferta)}
                                className="min-h-10 rounded-full border-2 border-verde-escuro px-4 font-semibold text-verde-escuro transition hover:bg-verde-escuro hover:text-white">
                                Editar
                              </button>
                              <button type="button" onClick={() => setConfirmarExclusao(oferta.cdOferta)}
                                className="min-h-10 rounded-full px-4 font-semibold text-erro transition hover:bg-erro-claro">
                                Excluir
                              </button>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default Painel
