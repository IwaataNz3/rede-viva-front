import { Link, useParams } from 'react-router-dom'
import Botao from '../components/Botao'
import { integrantes } from '../data/integrantes'
import { coresAvatar } from '../data/cores-avatar'

function IntegranteDetalhe() {
  // Pega o id da URL, por exemplo /integrantes/victor
  const { id } = useParams()
  const posicao = integrantes.findIndex((item) => item.id === id)
  const integrante = integrantes[posicao]

  if (!integrante) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-24 md:px-8">
        <h1 className="text-4xl font-extrabold">Integrante não encontrado</h1>
        <p className="mt-4 text-lg text-cinza">Não existe ninguém da equipe com esse endereço.</p>
        <div className="mt-8">
          <Botao para="/integrantes">Voltar para integrantes</Botao>
        </div>
      </section>
    )
  }

  const cor = coresAvatar[posicao % coresAvatar.length]

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-8 md:pt-16">
      <Link to="/integrantes" className="inline-flex min-h-11 items-center font-semibold text-tomate hover:underline">
        ← Todos os integrantes
      </Link>
      <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:items-start">
        <div className={`flex aspect-square items-center justify-center overflow-hidden rounded-3xl ${cor.fundo}`}>
          {integrante.foto ? (
            <img src={integrante.foto} alt={`Foto de ${integrante.nome}`} className="size-full object-cover" />
          ) : (
            <span className={`font-titulo text-9xl font-bold ${cor.letra}`} aria-hidden="true">
              {integrante.nome.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-4xl font-extrabold md:text-6xl">{integrante.nome}</h1>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-lg">
            <div><dt className="inline text-cinza">RM: </dt><dd className="inline font-semibold">{integrante.rm}</dd></div>
            <div><dt className="inline text-cinza">Turma: </dt><dd className="inline font-semibold">{integrante.turma}</dd></div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {integrante.github && (
              <a href={integrante.github} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-verde px-6 font-semibold text-white hover:bg-verde-escuro">
                GitHub
              </a>
            )}
            {integrante.linkedin && (
              <a href={integrante.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-verde-escuro px-6 font-semibold text-verde-escuro hover:bg-verde-escuro hover:text-white">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntegranteDetalhe
