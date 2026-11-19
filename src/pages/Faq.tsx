import { useState } from 'react'
import Botao from '../components/Botao'
import ItemFaq from '../components/ItemFaq'
import TopoPagina from '../components/TopoPagina'
import { perguntas } from '../data/faq'

function Faq() {
  // Guarda qual pergunta está aberta (só uma por vez)
  const [aberta, setAberta] = useState<number | null>(perguntas[0].id)

  function alternar(id: number) {
    setAberta(aberta === id ? null : id)
  }

  return (
    <>
      <TopoPagina
        cor="mostarda"
        titulo="Perguntas frequentes"
        texto="O que famílias e supermercados mais perguntam sobre a Rede Viva."
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-[2fr_1fr] lg:items-start">
        <ul className="border-t border-linha">
          {perguntas.map((item) => (
            <ItemFaq key={item.id} item={item} aberto={aberta === item.id} aoAlternar={() => alternar(item.id)} />
          ))}
        </ul>
        <aside className="rounded-3xl bg-tomate p-8">
          <h2 className="text-2xl font-bold text-white">Não achou sua dúvida?</h2>
          <p className="mt-3 text-white">Mande sua pergunta para a equipe. A gente responde por e-mail.</p>
          <div className="mt-6">
            <Botao para="/contato" variante="claro">Enviar pergunta</Botao>
          </div>
        </aside>
      </section>
    </>
  )
}

export default Faq
