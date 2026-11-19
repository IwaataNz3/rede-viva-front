import { useEffect, useState } from 'react'
import CardOferta from '../components/CardOferta'
import MinhaReserva from '../components/MinhaReserva'
import { Carregando, ErroCarregar } from '../components/EstadoApi'
import TopoPagina from '../components/TopoPagina'
import { buscarLojas, buscarOfertas, buscarProdutos } from '../services/api'
import type { Categoria, Loja, Oferta, Produto } from '../types/api'
import type { ItemReservado, ReservaConfirmada } from '../types/reserva'
import { diasAteVencer, formatarPreco, nomesCategorias, textoValidade } from '../utils/formatar'

const categorias = Object.keys(nomesCategorias) as Categoria[]
const CHAVE_RESERVA = 'rede-viva-reserva'

// A reserva fica guardada no navegador para não sumir ao trocar de página
function lerReservaSalva(): ItemReservado[] {
  try {
    const salvo = localStorage.getItem(CHAVE_RESERVA)
    return salvo ? JSON.parse(salvo) : []
  } catch {
    return []
  }
}

// Código de retirada no mesmo formato da API (8 caracteres, sem 0, O, 1 e I)
function gerarCodigo() {
  const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let codigo = ''
  for (let i = 0; i < 8; i++) {
    codigo += caracteres[Math.floor(Math.random() * caracteres.length)]
  }
  return codigo
}

// Prazo de 24 horas a partir de agora, ex.: "amanhã, 12:05"
function prazoDeRetirada() {
  const prazo = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const hora = prazo.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  return `amanhã (${prazo.toLocaleDateString('pt-BR')}), às ${hora}`
}

function Vitrine() {
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [lojas, setLojas] = useState<Loja[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [categoria, setCategoria] = useState<Categoria | ''>('')
  const [loja, setLoja] = useState('')
  const [tentativa, setTentativa] = useState(0)
  const [reserva, setReserva] = useState<ItemReservado[]>(lerReservaSalva)
  const [trocarPara, setTrocarPara] = useState<Oferta | null>(null) // oferta de outro mercado esperando confirmação
  const [confirmada, setConfirmada] = useState<ReservaConfirmada | null>(null)

  // Salva a reserva no navegador sempre que ela muda
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_RESERVA, JSON.stringify(reserva))
    } catch {
      // navegador sem localStorage: a reserva só vale enquanto a página estiver aberta
    }
  }, [reserva])

  // Busca ofertas, produtos e lojas juntos (a oferta só traz o código do produto)
  useEffect(() => {
    setCarregando(true)
    setErro('')
    Promise.all([buscarOfertas(), buscarProdutos(), buscarLojas()])
      .then(([listaOfertas, listaProdutos, listaLojas]) => {
        setOfertas(listaOfertas)
        setProdutos(listaProdutos)
        setLojas(listaLojas)
        // Confere a reserva salva com o estoque atual da API
        setReserva((atual) =>
          atual
            .map((item) => {
              const oferta = listaOfertas.find((o) => o.cdOferta === item.cdOferta)
              if (!oferta || oferta.stOferta !== 'ATIVA' || diasAteVencer(oferta.dtValidade) < 0) return null
              return { ...item, maximo: oferta.qtDisponivel, quantidade: Math.min(item.quantidade, oferta.qtDisponivel) }
            })
            .filter((item): item is ItemReservado => item !== null && item.quantidade > 0),
        )
      })
      .catch((e: Error) => setErro(e.message === 'Failed to fetch' ? 'Confira sua internet e tente de novo.' : e.message))
      .finally(() => setCarregando(false))
  }, [tentativa])

  // Só aparece o que a família pode levar: ativa, com estoque e dentro da validade
  const disponiveis = ofertas.filter(
    (oferta) => oferta.stOferta === 'ATIVA' && oferta.qtDisponivel > 0 && diasAteVencer(oferta.dtValidade) >= 0,
  )

  const filtradas = disponiveis
    .filter((oferta) => {
      const produto = produtos.find((p) => p.cdProduto === oferta.cdProduto)
      if (categoria && produto?.dsCategoria !== categoria) return false
      if (loja && oferta.cdLoja !== Number(loja)) return false
      return true
    })
    .sort((a, b) => diasAteVencer(a.dtValidade) - diasAteVencer(b.dtValidade)) // vence antes, aparece antes

  // ---------- Reserva (só no front) ----------
  function nomeDoProduto(oferta: Oferta) {
    return produtos.find((p) => p.cdProduto === oferta.cdProduto)?.nmProduto ?? `Produto ${oferta.cdProduto}`
  }

  function colocarNaReserva(oferta: Oferta, lista: ItemReservado[]) {
    const novo: ItemReservado = {
      cdOferta: oferta.cdOferta,
      cdLoja: oferta.cdLoja,
      produto: nomeDoProduto(oferta),
      precoSistema: oferta.vlPrecoSistema,
      precoRede: oferta.vlPrecoRede,
      quantidade: 1,
      maximo: oferta.qtDisponivel,
    }
    setReserva([...lista, novo])
    setConfirmada(null)
  }

  function adicionar(oferta: Oferta) {
    // Regra da API: uma reserva é de um mercado só
    if (reserva.length > 0 && reserva[0].cdLoja !== oferta.cdLoja) {
      setTrocarPara(oferta)
      return
    }
    colocarNaReserva(oferta, reserva)
  }

  function confirmarTroca() {
    if (trocarPara) colocarNaReserva(trocarPara, [])
    setTrocarPara(null)
  }

  function mudarQuantidade(cdOferta: number, quantidade: number) {
    if (quantidade <= 0) {
      setReserva(reserva.filter((item) => item.cdOferta !== cdOferta))
      return
    }
    setReserva(
      reserva.map((item) =>
        item.cdOferta === cdOferta ? { ...item, quantidade: Math.min(quantidade, item.maximo) } : item,
      ),
    )
  }

  function confirmarReserva() {
    const loja = lojas.find((l) => l.cdLoja === reserva[0].cdLoja)
    setConfirmada({
      codigo: gerarCodigo(),
      loja: loja?.nmLoja ?? 'Mercado parceiro',
      endereco: loja?.dsEndereco ?? '',
      prazo: prazoDeRetirada(),
      total: reserva.reduce((soma, item) => soma + item.precoRede * item.quantidade, 0),
      economia: reserva.reduce((soma, item) => soma + (item.precoSistema - item.precoRede) * item.quantidade, 0),
      itens: reserva.reduce((soma, item) => soma + item.quantidade, 0),
    })
    setReserva([])
    document.getElementById('minha-reserva')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const lojaDaReserva = reserva.length > 0 ? lojas.find((l) => l.cdLoja === reserva[0].cdLoja)?.nmLoja ?? '' : ''
  const itensNaReserva = reserva.reduce((soma, item) => soma + item.quantidade, 0)
  const totalDaReserva = reserva.reduce((soma, item) => soma + item.precoRede * item.quantidade, 0)

  function estiloFiltro(ativo: boolean) {
    return `min-h-11 rounded-full border-2 px-4 font-semibold transition ${
      ativo ? 'border-verde bg-verde text-white' : 'border-linha bg-white text-tinta hover:border-verde'
    }`
  }

  return (
    <>
      <TopoPagina
        cor="mostarda"
        titulo="Ofertas dos mercados parceiros"
        texto="Sobras da promoção com preço Rede Viva. Separe o que quer levar, reserve e pague só na retirada."
      />

      <section className={`mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16 ${reserva.length > 0 ? 'pb-28 lg:pb-16' : ''}`}>
        {carregando && <Carregando texto="Buscando as ofertas..." />}

        {!carregando && erro && <ErroCarregar mensagem={erro} aoTentarDeNovo={() => setTentativa(tentativa + 1)} />}

        {!carregando && !erro && (
          <>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <fieldset>
                <legend className="mb-2 font-semibold">Categoria</legend>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className={estiloFiltro(categoria === '')} aria-pressed={categoria === ''} onClick={() => setCategoria('')}>
                    Todas
                  </button>
                  {categorias.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={estiloFiltro(categoria === item)}
                      aria-pressed={categoria === item}
                      onClick={() => setCategoria(item)}
                    >
                      {nomesCategorias[item]}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="lg:w-72">
                <label htmlFor="filtro-loja" className="mb-2 block font-semibold">Mercado</label>
                <select
                  id="filtro-loja"
                  value={loja}
                  onChange={(e) => setLoja(e.target.value)}
                  className="min-h-12 w-full rounded-xl border-2 border-linha bg-white px-4 outline-none focus:border-verde"
                >
                  <option value="">Todos os mercados</option>
                  {lojas.map((item) => (
                    <option key={item.cdLoja} value={item.cdLoja}>{item.nmLoja}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
              <div>
                <p className="text-cinza" aria-live="polite">
                  {filtradas.length === 1 ? '1 oferta encontrada' : `${filtradas.length} ofertas encontradas`}
                </p>

                {trocarPara && (
                  <div role="alert" className="mt-4 rounded-2xl bg-mostarda-claro p-4">
                    <p className="font-semibold text-tinta">
                      Sua reserva é do {lojaDaReserva}. Cada reserva é retirada em um mercado só.
                    </p>
                    <p className="mt-1 text-tinta">
                      Quer trocar para {lojas.find((l) => l.cdLoja === trocarPara.cdLoja)?.nmLoja}? Os itens que você separou saem da reserva.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <button type="button" onClick={confirmarTroca}
                        className="min-h-10 rounded-full bg-verde-escuro px-4 font-semibold text-white">
                        Trocar de mercado
                      </button>
                      <button type="button" onClick={() => setTrocarPara(null)}
                        className="min-h-10 rounded-full px-4 font-semibold text-tinta hover:bg-white">
                        Manter minha reserva
                      </button>
                    </div>
                  </div>
                )}

                {filtradas.length === 0 ? (
                  <div className="mt-4 rounded-3xl border-2 border-dashed border-linha px-6 py-14 text-center">
                    <p className="font-titulo text-xl font-bold text-verde-escuro">Nenhuma oferta por aqui agora</p>
                    <p className="mt-2 text-cinza">
                      {disponiveis.length === 0
                        ? 'Os mercados publicam as sobras depois que a promoção acaba. Volte mais tarde.'
                        : 'Tente outra categoria ou outro mercado.'}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {filtradas.map((oferta) => {
                      const produto = produtos.find((p) => p.cdProduto === oferta.cdProduto)
                      const lojaDaOferta = lojas.find((l) => l.cdLoja === oferta.cdLoja)
                      const naReserva = reserva.find((item) => item.cdOferta === oferta.cdOferta)
                      const nome = nomeDoProduto(oferta)
                      return (
                        <CardOferta
                          key={oferta.cdOferta}
                          oferta={{
                            produto: nome,
                            categoria: produto ? nomesCategorias[produto.dsCategoria] : undefined,
                            loja: lojaDaOferta?.nmLoja,
                            validade: textoValidade(oferta.dtValidade),
                            venceLogo: diasAteVencer(oferta.dtValidade) <= 1,
                            disponiveis: oferta.qtDisponivel,
                            precoSistema: oferta.vlPrecoSistema,
                            precoRedeViva: oferta.vlPrecoRede,
                          }}
                          acao={
                            naReserva ? (
                              <div className="flex shrink-0 flex-col items-center gap-1">
                                <div className="flex items-center gap-1 rounded-full bg-verde-claro p-1">
                                  <button type="button" aria-label={`Tirar um ${nome}`}
                                    onClick={() => mudarQuantidade(oferta.cdOferta, naReserva.quantidade - 1)}
                                    className="flex size-8 items-center justify-center rounded-full bg-white text-lg font-bold text-verde-escuro">
                                    −
                                  </button>
                                  <span className="w-6 text-center font-bold text-verde-escuro">{naReserva.quantidade}</span>
                                  <button type="button" aria-label={`Mais um ${nome}`}
                                    disabled={naReserva.quantidade >= oferta.qtDisponivel}
                                    onClick={() => mudarQuantidade(oferta.cdOferta, naReserva.quantidade + 1)}
                                    className="flex size-8 items-center justify-center rounded-full bg-verde text-lg font-bold text-white disabled:opacity-40">
                                    +
                                  </button>
                                </div>
                                {naReserva.quantidade >= oferta.qtDisponivel && <span className="text-xs text-cinza">máximo</span>}
                              </div>
                            ) : (
                              <button type="button" aria-label={`Adicionar ${nome} à reserva`} onClick={() => adicionar(oferta)}
                                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-verde text-2xl leading-none text-white transition hover:bg-verde-escuro">
                                +
                              </button>
                            )
                          }
                        />
                      )
                    })}
                  </div>
                )}
              </div>

              <aside id="minha-reserva" className="scroll-mt-24 lg:sticky lg:top-24">
                <MinhaReserva
                  itens={reserva}
                  loja={lojaDaReserva}
                  confirmada={confirmada}
                  aoMudarQuantidade={mudarQuantidade}
                  aoConfirmar={confirmarReserva}
                  aoLimpar={() => setReserva([])}
                  aoNovaReserva={() => setConfirmada(null)}
                />
              </aside>
            </div>

            {/* No celular, uma barra fixa leva até a reserva */}
            {itensNaReserva > 0 && (
              <a href="#minha-reserva"
                className="fixed inset-x-0 bottom-0 z-20 flex min-h-16 items-center justify-between bg-verde-escuro px-4 font-semibold text-white lg:hidden">
                <span>{itensNaReserva} {itensNaReserva === 1 ? 'item' : 'itens'} · {formatarPreco(totalDaReserva)}</span>
                <span>Ver reserva</span>
              </a>
            )}
          </>
        )}
      </section>
    </>
  )
}

export default Vitrine
