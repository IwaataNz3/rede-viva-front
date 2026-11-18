import Botao from '../components/Botao'
import TituloSecao from '../components/TituloSecao'
import TopoPagina from '../components/TopoPagina'

const ods = [
  { numero: 'ODS 2', titulo: 'Fome zero e agricultura sustentável', texto: 'Mais acesso a alimento para famílias de baixa renda, com preço menor e perto de casa.' },
  { numero: 'ODS 13', titulo: 'Ação contra a mudança do clima', texto: 'Menos comida no lixo significa menos desperdício de tudo que foi gasto para produzir e transportar.' },
]

function Sobre() {
  return (
    <>
      <TopoPagina
        cor="mostarda"
        titulo="Um destino para a sobra da promoção do supermercado"
        texto="A Rede Viva liga a loja às famílias de baixa renda do mesmo bairro. É um projeto da equipe LuminaTech para a Global Solution 2026/2 da FIAP, com o tema CitizenTech."
      />

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-8 lg:grid-cols-2">
          <div>
            <TituloSecao titulo="Comida dentro da validade vai para o lixo perto de quem precisa" />
            <p className="mt-6 text-lg text-cinza">
              O supermercado já separa o que está perto de vencer e coloca em promoção. O que não sai nessa promoção
              costuma ser descartado, mesmo ainda dentro da validade. Ao mesmo tempo, famílias de baixa renda que moram
              perto da loja nem ficam sabendo dessas ofertas.
            </p>
          </div>
          <div>
            <TituloSecao titulo="A sobra vira oferta para famílias validadas" />
            <p className="mt-6 text-lg text-cinza">
              O funcionário cadastra as sobras pelo celular. Famílias validadas pelo CadÚnico, ou convidadas por uma ONG
              parceira, reservam pelo site e retiram no balcão com um QR Code. A família paga no caixa da própria loja,
              com um desconto único no total.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <TituloSecao
            titulo="Quem paga é o supermercado"
            texto="A rede de supermercados paga uma taxa de implantação e uma comissão de 15% sobre cada retirada. A família não paga nada pelo serviço."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-linha bg-white p-6">
              <p className="font-titulo text-4xl font-extrabold text-tomate">R$ 3.000</p>
              <p className="mt-2 text-cinza">de implantação por rede com até três lojas</p>
            </div>
            <div className="rounded-3xl border border-linha bg-white p-6">
              <p className="font-titulo text-4xl font-extrabold text-tomate">15%</p>
              <p className="mt-2 text-cinza">de comissão sobre o valor de cada retirada</p>
            </div>
            <div className="rounded-3xl border border-linha bg-white p-6">
              <p className="font-titulo text-4xl font-extrabold text-tomate">R$ 0</p>
              <p className="mt-2 text-cinza">de taxa para a família, que paga só os produtos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-verde-escuro py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <TituloSecao claro titulo="Objetivos de Desenvolvimento Sustentável atendidos" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {ods.map((item) => (
              <article key={item.numero} className="rounded-3xl bg-white/10 p-8">
                <p className="font-titulo text-2xl font-extrabold text-mostarda">{item.numero}</p>
                <h3 className="mt-2 text-2xl font-bold text-white">{item.titulo}</h3>
                <p className="mt-3 text-verde-claro">{item.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tomate py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-8">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Conheça quem fez a Rede Viva</h2>
          <Botao para="/integrantes" variante="claro">Ver integrantes</Botao>
        </div>
      </section>
    </>
  )
}

export default Sobre
