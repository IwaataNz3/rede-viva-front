// Formatos do JSON da API Java (mesmos campos dos DTOs do projeto do Victor)

export interface Loja {
  cdLoja: number
  nmLoja: string
  dsEndereco: string
  nrLatitude: number
  nrLongitude: number
  dsEmail: string
}

export type Categoria = 'HORTIFRUTI' | 'PADARIA' | 'LATICINIOS' | 'CARNES' | 'FRIOS' | 'MERCEARIA' | 'CONGELADOS'

export interface Produto {
  cdProduto: number
  cdLoja: number
  cdBarras: string
  nmProduto: string
  dsCategoria: Categoria
  nrPesoKg: number
}

export type StatusOferta = 'ATIVA' | 'ESGOTADA' | 'ENCERRADA'

export interface Oferta {
  cdOferta: number
  cdLoja: number
  cdProduto: number
  qtDisponivel: number
  vlPrecoSistema: number
  vlPrecoRede: number
  dtValidade: string // "2026-11-20"
  stOferta: StatusOferta
}

// O que o front manda no POST e no PUT de oferta
export interface OfertaEnvio {
  cdProduto: number
  qtDisponivel: number
  vlPrecoSistema: number
  vlPrecoRede: number
  dtValidade: string
}

// JSON de erro do GlobalExceptionHandler
export interface ErroApi {
  status: number
  mensagem: string
  timestamp: string
  campos?: { [campo: string]: string }
}
