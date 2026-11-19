import Botao from '../components/Botao'
import CardOferta from '../components/CardOferta'
import TituloSecao from '../components/TituloSecao'
import { ofertasExemplo } from '../data/ofertas-exemplo'

const passos = [
  {
    numero: '01',
    titulo: 'O mercado cadastra a sobra',
    texto: 'Quando a promoção de vencimento acaba, o funcionário guarda o que sobrou no balcão e cadastra pelo celular, lendo o código de barras.',
  },
  {
    numero: '02',
    titulo: 'A família reserva pelo site',
    texto: 'Quem mora a até 2 km da loja vê a oferta, escolhe os produtos e recebe um QR Code que vale por 24 horas.',
  },
  {
    numero: '03',
    titulo: 'Retira no balcão e paga no caixa',
    texto: 'O atendente lê o código, entrega os produtos e aplica um único desconto no total. A nota fiscal sai normalmente.',
  },
]

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-12 md:px-8 lg:min-h-[calc(100vh-4.5rem)] lg:grid-cols-[1.1fr_1fr] lg:py-16">
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.05] md:text-6xl">
            Sobra da promoção vira comida mais barata perto de casa.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cinza md:text-xl">
            A Rede Viva leva o que o supermercado não vendeu na promoção de vencimento para famílias do CadÚnico que
            moram a até 2 km da loja, por menos da metade do preço.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Botao para="/sobre">Entender o projeto</Botao>
            <Botao para="/ofertas" variante="secundario">Ver as ofertas</Botao>
          </div>
        </div>

        {/* Vitrine de exemplo, igual à tela de ofertas do protótipo */}
        <div className="rounded-[2rem] bg-verde-escuro p-4 md:p-6">
          <div className="rounded-3xl bg-creme p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-titulo text-lg font-bold text-verde-escuro">Supermercado Vila Nova</p>
              <p className="text-sm text-cinza">1,2 km</p>
            </div>
            <div className="flex flex-col gap-3">
              {ofertasExemplo.map((oferta) => (
                <CardOferta key={oferta.produto} oferta={oferta} />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-verde px-4 py-3 text-white">
              <span className="font-semibold">3 itens · R$ 14,00</span>
              <span className="font-semibold">Reservar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <TituloSecao
            titulo="Como a sobra chega até a família"
            texto="A Rede Viva entra depois da promoção que a loja já faz. Preço, etiqueta e caixa da loja continuam iguais."
          />
          <ol className="mt-12 border-b border-linha">
            {passos.map((passo) => (
              <li key={passo.numero} className="grid gap-3 border-t border-linha py-8 md:grid-cols-[6rem_1fr_1.4fr] md:gap-8">
                <span className="font-titulo text-5xl font-extrabold text-tomate">{passo.numero}</span>
                <h3 className="text-2xl font-bold">{passo.titulo}</h3>
                <p className="text-lg text-cinza">{passo.texto}</p>
              </li>
            ))}
          </ol>

          {/* Exemplo do desconto no balcão */}
          <div className="mt-6 grid items-center gap-6 rounded-3xl bg-verde-escuro p-6 text-white md:grid-cols-[1fr_auto] md:p-10">
            <div>
              <h3 className="text-2xl font-bold text-white md:text-3xl">Um desconto só, direto no caixa</h3>
              <p className="mt-3 max-w-xl text-verde-claro">
                Se os produtos somam R$ 60,00 no sistema da loja e o valor na Rede Viva é R$ 25,00, o atendente aplica
                R$ 35,00 de desconto no total da compra.
              </p>
            </div>
            <dl className="grid min-w-64 gap-2 rounded-2xl bg-white p-5 text-tinta">
              <div className="flex justify-between gap-6"><dt>Sistema da loja</dt><dd>R$ 60,00</dd></div>
              <div className="flex justify-between gap-6"><dt>Rede Viva</dt><dd>R$ 25,00</dd></div>
              <div className="flex justify-between gap-6 border-t border-linha pt-2 font-bold text-tomate">
                <dt>Desconto</dt><dd>R$ 35,00</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Para quem */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <TituloSecao titulo="O que cada lado ganha" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl bg-verde p-8 text-white md:p-10">
              <h3 className="text-3xl font-bold text-white">Famílias</h3>
              <ul className="mt-6 space-y-3 text-lg">
                <li>Escolhe o produto, sem sacola surpresa.</li>
                <li>Paga menos da metade do preço do sistema.</li>
                <li>Retira no mercado que já fica no caminho.</li>
                <li>Entra com o CadÚnico ou com o convite de uma ONG.</li>
              </ul>
            </article>
            <article className="rounded-3xl border border-linha bg-white p-8 md:p-10">
              <h3 className="text-3xl font-bold">Supermercados</h3>
              <ul className="mt-6 space-y-3 text-lg text-cinza">
                <li>Recupera parte do valor do que iria para o lixo.</li>
                <li>Não concorre com a venda a preço cheio, porque só família validada compra.</li>
                <li>Não precisa integrar sistema nem comprar equipamento.</li>
                <li>Ganha um relatório de impacto para ações sociais e ESG.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Público */}
      <section className="bg-mostarda py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="max-w-5xl text-4xl font-extrabold leading-[1.05] md:text-7xl">
            42,2 milhões de famílias estão inscritas no Cadastro Único.
          </h2>
          <p className="mt-8 max-w-2xl text-lg text-tinta md:text-xl">
            É o público que a Rede Viva pode alcançar conforme novos supermercados entram na rede. Cada família vê as
            ofertas das lojas a até 2 km de casa e faz até duas reservas por semana.
          </p>
        </div>
      </section>

      {/* Fechamento */}
      <section className="bg-tomate py-20 md:py-28">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 md:px-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Leve a Rede Viva para a sua rede de supermercados.
          </h2>
          <Botao para="/contato" variante="claro">Falar com a equipe</Botao>
        </div>
      </section>
    </>
  )
}

export default Home
