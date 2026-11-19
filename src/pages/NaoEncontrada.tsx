import Botao from '../components/Botao'

function NaoEncontrada() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <p className="font-titulo text-7xl font-extrabold text-tomate">404</p>
      <h1 className="mt-4 text-4xl font-extrabold">Página não encontrada</h1>
      <p className="mt-4 text-lg text-cinza">O endereço digitado não existe ou mudou de lugar.</p>
      <div className="mt-8">
        <Botao para="/">Voltar ao início</Botao>
      </div>
    </section>
  )
}

export default NaoEncontrada
