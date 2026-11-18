import CardIntegrante from '../components/CardIntegrante'
import TopoPagina from '../components/TopoPagina'
import { integrantes } from '../data/integrantes'

function Integrantes() {
  return (
    <>
      <TopoPagina
        cor="tomate"
        titulo="A equipe LuminaTech"
        texto="Cinco alunos da turma 1TDSR de Análise e Desenvolvimento de Sistemas da FIAP. Clique em um nome para ver o perfil."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {integrantes.map((integrante, posicao) => (
            <li key={integrante.id}>
              <CardIntegrante integrante={integrante} posicao={posicao} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Integrantes
