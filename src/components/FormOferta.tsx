import { useRef, useState } from 'react'
import Botao from './Botao'
import CampoTexto from './CampoTexto'
import useForm from '../hooks/use-form/use-form'
import type { ErrorsState, FormState } from '../hooks/use-form/use-form'
import { atualizarOferta, criarOferta } from '../services/api'
import type { Oferta, OfertaEnvio, Produto } from '../types/api'
import { amanhaISO, calcularDesconto, nomesCategorias } from '../utils/formatar'

interface FormOfertaProps {
  cdLoja: number
  produtos: Produto[]
  ofertaEditando: Oferta | null // null = nova oferta
  aoSalvar: (mensagem: string) => void
  aoCancelar: () => void
}

// Regra que o HTML não valida sozinho (a API também confere)
function errosPersonalizados(_form: HTMLFormElement, dados: FormState) {
  const erros: ErrorsState = {}
  if (dados.vlPrecoSistema && dados.vlPrecoRede && Number(dados.vlPrecoRede) >= Number(dados.vlPrecoSistema)) {
    erros.vlPrecoRede = 'O preço Rede Viva precisa ser menor que o preço no mercado.'
  }
  return erros
}

function FormOferta({ cdLoja, produtos, ofertaEditando, aoSalvar, aoCancelar }: FormOfertaProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [erroEnvio, setErroEnvio] = useState('')

  // No modo edição o formulário já começa com os dados da oferta
  const estadoInicial: FormState = ofertaEditando
    ? {
        cdProduto: String(ofertaEditando.cdProduto),
        qtDisponivel: String(ofertaEditando.qtDisponivel),
        vlPrecoSistema: String(ofertaEditando.vlPrecoSistema),
        vlPrecoRede: String(ofertaEditando.vlPrecoRede),
        dtValidade: ofertaEditando.dtValidade,
      }
    : { cdProduto: '', qtDisponivel: '', vlPrecoSistema: '', vlPrecoRede: '', dtValidade: '' }

  async function enviar(dados: FormState) {
    setErroEnvio('')
    const oferta: OfertaEnvio = {
      cdProduto: Number(dados.cdProduto),
      qtDisponivel: Number(dados.qtDisponivel),
      vlPrecoSistema: Number(dados.vlPrecoSistema),
      vlPrecoRede: Number(dados.vlPrecoRede),
      dtValidade: dados.dtValidade,
    }
    const nome = produtos.find((p) => p.cdProduto === oferta.cdProduto)?.nmProduto ?? 'Oferta'

    if (ofertaEditando) {
      await atualizarOferta(ofertaEditando.cdOferta, oferta)
      aoSalvar(`${nome}: oferta atualizada.`)
    } else {
      await criarOferta(cdLoja, oferta)
      reset()
      aoSalvar(`${nome}: oferta publicada.`)
    }
  }

  async function aoErrar(erro: Error) {
    // erro com "cause" = campos inválidos no formulário; sem "cause" = resposta da API
    setErroEnvio(erro.cause ? 'Confira os campos marcados em vermelho.' : erro.message)
  }

  const { data, errors, loadingSubmit, handleChange, handleSubmit, reset } = useForm(
    formRef,
    estadoInicial,
    enviar,
    aoErrar,
    errosPersonalizados,
  )

  const temDesconto = Number(data.vlPrecoSistema) > 0 && Number(data.vlPrecoRede) > 0 && Number(data.vlPrecoRede) < Number(data.vlPrecoSistema)

  return (
    <form id="form-oferta" ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5 rounded-3xl border border-linha bg-white p-6 md:p-8">
      <h2 className="text-2xl font-bold">{ofertaEditando ? 'Editar oferta' : 'Nova oferta'}</h2>

      <div>
        <label htmlFor="cdProduto" className="mb-2 block font-semibold">Produto</label>
        <select
          id="cdProduto"
          name="cdProduto"
          value={data.cdProduto}
          onChange={handleChange}
          required
          disabled={!!ofertaEditando}
          aria-invalid={!!errors.cdProduto}
          className={`min-h-12 w-full rounded-xl border-2 bg-white px-4 outline-none focus:border-verde disabled:bg-areia ${
            errors.cdProduto ? 'border-erro' : 'border-linha'
          }`}
        >
          <option value="">Escolha um produto da loja</option>
          {produtos.map((produto) => (
            <option key={produto.cdProduto} value={produto.cdProduto}>
              {produto.nmProduto} ({nomesCategorias[produto.dsCategoria]})
            </option>
          ))}
        </select>
        {errors.cdProduto && <p className="mt-1 text-sm font-medium text-erro"><span aria-hidden="true">⚠ </span>{errors.cdProduto}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <CampoTexto rotulo="Quantidade" name="qtDisponivel" type="number" inputMode="numeric" min={1} step={1}
          value={data.qtDisponivel} aoMudar={handleChange} erro={errors.qtDisponivel} required />
        <CampoTexto rotulo="Validade" name="dtValidade" type="date" min={amanhaISO()}
          value={data.dtValidade} aoMudar={handleChange} erro={errors.dtValidade} required />
        <CampoTexto rotulo="Preço no mercado (R$)" name="vlPrecoSistema" type="number" inputMode="decimal" min={0.01} step={0.01}
          value={data.vlPrecoSistema} aoMudar={handleChange} erro={errors.vlPrecoSistema} required />
        <CampoTexto rotulo="Preço Rede Viva (R$)" name="vlPrecoRede" type="number" inputMode="decimal" min={0.01} step={0.01}
          value={data.vlPrecoRede} aoMudar={handleChange} erro={errors.vlPrecoRede} required />
      </div>

      {temDesconto && (
        <p className="rounded-xl bg-tomate-claro p-4 text-tinta">
          A família paga <strong className="text-tomate">{calcularDesconto(Number(data.vlPrecoSistema), Number(data.vlPrecoRede))}% a menos</strong> que o preço do mercado.
        </p>
      )}

      {erroEnvio && (
        <p role="alert" className="rounded-xl bg-erro-claro p-4 font-medium text-erro">{erroEnvio}</p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Botao tipo="submit" desabilitado={loadingSubmit}>
          {loadingSubmit ? 'Salvando...' : ofertaEditando ? 'Salvar alterações' : 'Publicar oferta'}
        </Botao>
        {ofertaEditando && (
          <Botao variante="secundario" aoClicar={aoCancelar}>Cancelar edição</Botao>
        )}
      </div>
    </form>
  )
}

export default FormOferta
