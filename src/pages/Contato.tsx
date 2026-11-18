import { useRef, useState } from 'react'
import Botao from '../components/Botao'
import CampoTexto from '../components/CampoTexto'
import TopoPagina from '../components/TopoPagina'
import useForm from '../hooks/use-form/use-form'
import type { ErrorsState, FormState } from '../hooks/use-form/use-form'
import type { MensagemContato } from '../types/contato'

const estadoInicial: MensagemContato = {
  nome: '',
  email: '',
  perfil: '',
  mensagem: '',
}

// Regras que o HTML não valida sozinho
function errosPersonalizados(_form: HTMLFormElement, dados: FormState) {
  const erros: ErrorsState = {}
  if (dados.nome && dados.nome.trim().split(' ').length < 2) {
    erros.nome = 'Escreva nome e sobrenome.'
  }
  if (dados.mensagem && dados.mensagem.trim().length < 10) {
    erros.mensagem = 'Escreva pelo menos 10 letras na mensagem.'
  }
  return erros
}

function Contato() {
  const formRef = useRef<HTMLFormElement>(null)
  const [aviso, setAviso] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null)

  async function enviar(dados: FormState) {
    setAviso(null)
    // Por enquanto o envio é simulado, como na aula de Forms.
    // A Rede Viva não tem tabela de contato na API, então a mensagem não é gravada.
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Mensagem de contato', dados)
    setAviso({ tipo: 'sucesso', texto: `Obrigado, ${dados.nome.split(' ')[0]}! Recebemos sua mensagem e respondemos por e-mail.` })
    reset()
  }

  async function aoErrar() {
    setAviso({ tipo: 'erro', texto: 'Confira os campos marcados em vermelho.' })
  }

  const { data, errors, loadingSubmit, handleChange, handleSubmit, reset } = useForm(
    formRef,
    estadoInicial as unknown as FormState,
    enviar,
    aoErrar,
    errosPersonalizados,
  )

  return (
    <>
    <TopoPagina
      cor="tomate"
      titulo="Fale com a equipe Rede Viva"
      texto="Supermercado querendo entrar na rede, ONG que quer convidar famílias ou alguém com dúvida: escreva para a gente."
    />
    <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-[1fr_1.3fr] lg:items-start">
      <div className="rounded-3xl bg-verde-escuro p-8 text-verde-claro">
        <h2 className="text-2xl font-bold text-white">Quem pode escrever</h2>
        <ul className="mt-4 space-y-2">
          <li>Redes de supermercados que querem entrar na Rede Viva</li>
          <li>ONGs, igrejas e associações que querem convidar famílias</li>
          <li>Famílias com dúvida sobre o cadastro</li>
        </ul>
        <dl className="mt-8 space-y-4">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wider text-mostarda">Projeto</dt>
            <dd className="text-lg">Global Solution 2026/2 · FIAP</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wider text-mostarda">Equipe</dt>
            <dd className="text-lg">LuminaTech, turma 1TDSR</dd>
          </div>
        </dl>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5 rounded-3xl border border-linha bg-white p-6 md:p-8">
        <CampoTexto
          rotulo="Nome completo"
          name="nome"
          value={data.nome}
          aoMudar={handleChange}
          erro={errors.nome}
          required
          minLength={3}
          autoComplete="name"
        />
        <CampoTexto
          rotulo="E-mail"
          name="email"
          type="email"
          value={data.email}
          aoMudar={handleChange}
          erro={errors.email}
          required
          autoComplete="email"
        />

        <div>
          <label htmlFor="perfil" className="mb-2 block font-semibold">Você é</label>
          <select
            id="perfil"
            name="perfil"
            value={data.perfil}
            onChange={handleChange}
            required
            aria-invalid={!!errors.perfil}
            className={`min-h-12 w-full rounded-xl border-2 bg-white px-4 text-base outline-none focus:border-verde ${
              errors.perfil ? 'border-erro' : 'border-linha'
            }`}
          >
            <option value="">Escolha uma opção</option>
            <option value="familia">Família</option>
            <option value="supermercado">Supermercado</option>
            <option value="ong">ONG, igreja ou associação</option>
            <option value="outro">Outro</option>
          </select>
          {errors.perfil && <p className="mt-1 text-sm font-medium text-erro"><span aria-hidden="true">⚠ </span>{errors.perfil}</p>}
        </div>

        <CampoTexto
          rotulo="Mensagem"
          name="mensagem"
          multilinha
          value={data.mensagem}
          aoMudar={handleChange}
          erro={errors.mensagem}
          required
          maxLength={500}
        />

        {aviso && (
          <p
            role="status"
            className={`rounded-xl p-4 font-medium ${
              aviso.tipo === 'sucesso' ? 'bg-verde-claro text-verde-escuro' : 'bg-erro-claro text-erro'
            }`}
          >
            {aviso.texto}
          </p>
        )}

        <Botao tipo="submit" desabilitado={loadingSubmit}>
          {loadingSubmit ? 'Enviando...' : 'Enviar mensagem'}
        </Botao>
      </form>
    </section>
    </>
  )
}

export default Contato
