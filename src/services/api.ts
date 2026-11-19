import type { ErroApi, Loja, Oferta, OfertaEnvio, Produto } from '../types/api'

// URL base da API Java (Render). Vem do arquivo .env (VITE_API_URL).
export const API_URL = import.meta.env.VITE_API_URL as string

// Nome amigável dos campos, para montar a mensagem quando a API devolve erro 400
const nomesDosCampos: { [campo: string]: string } = {
  cdProduto: 'Produto',
  qtDisponivel: 'Quantidade',
  vlPrecoSistema: 'Preço no mercado',
  vlPrecoRede: 'Preço Rede Viva',
  dtValidade: 'Validade',
}

// Lê a resposta: se deu certo devolve o JSON, se deu erro lança a mensagem da API
async function lerResposta<T>(resposta: Response): Promise<T> {
  if (resposta.ok) {
    if (resposta.status === 204) {
      return undefined as T // DELETE não tem corpo
    }
    return resposta.json()
  }

  let mensagem = `Erro ${resposta.status} ao falar com a API.`
  try {
    const erro: ErroApi = await resposta.json()
    mensagem = erro.mensagem
    if (erro.campos) {
      const detalhes = Object.entries(erro.campos).map(
        ([campo, texto]) => `${nomesDosCampos[campo] ?? campo}: ${texto}`,
      )
      mensagem = `${erro.mensagem}. ${detalhes.join('; ')}`
    }
  } catch {
    // resposta sem JSON: fica a mensagem padrão
  }
  throw new Error(mensagem)
}

// ---------- Lojas ----------
export function buscarLojas() {
  return fetch(`${API_URL}/lojas`).then((resposta) => lerResposta<Loja[]>(resposta))
}

// ---------- Produtos ----------
export function buscarProdutos() {
  return fetch(`${API_URL}/produtos`).then((resposta) => lerResposta<Produto[]>(resposta))
}

export function buscarProdutosDaLoja(cdLoja: number) {
  return fetch(`${API_URL}/lojas/${cdLoja}/produtos`).then((resposta) => lerResposta<Produto[]>(resposta))
}

// ---------- Ofertas ----------
export function buscarOfertas() {
  return fetch(`${API_URL}/ofertas`).then((resposta) => lerResposta<Oferta[]>(resposta))
}

export function buscarOfertasDaLoja(cdLoja: number) {
  return fetch(`${API_URL}/lojas/${cdLoja}/ofertas`).then((resposta) => lerResposta<Oferta[]>(resposta))
}

export function criarOferta(cdLoja: number, oferta: OfertaEnvio) {
  return fetch(`${API_URL}/lojas/${cdLoja}/ofertas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(oferta),
  }).then((resposta) => lerResposta<Oferta>(resposta))
}

export function atualizarOferta(cdOferta: number, oferta: OfertaEnvio) {
  return fetch(`${API_URL}/ofertas/${cdOferta}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(oferta),
  }).then((resposta) => lerResposta<Oferta>(resposta))
}

export function excluirOferta(cdOferta: number) {
  return fetch(`${API_URL}/ofertas/${cdOferta}`, { method: 'DELETE' }).then((resposta) =>
    lerResposta<void>(resposta),
  )
}
