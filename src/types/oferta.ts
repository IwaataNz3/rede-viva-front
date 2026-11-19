// Formato usado para desenhar o cartão de oferta.
// Na Home vem dos exemplos fixos; na Vitrine é montado com os dados da API Java.
export interface OfertaExemplo {
  produto: string
  validade: string
  disponiveis: number
  precoSistema: number
  precoRedeViva: number
  venceLogo?: boolean
  loja?: string
  categoria?: string
}
