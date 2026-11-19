// Item da reserva montada na vitrine (fica só no navegador, é uma simulação)
export interface ItemReservado {
  cdOferta: number
  cdLoja: number
  produto: string
  precoSistema: number
  precoRede: number
  quantidade: number
  maximo: number // qtDisponivel da oferta na API
}

export interface ReservaConfirmada {
  codigo: string
  loja: string
  endereco: string
  prazo: string
  total: number
  economia: number
  itens: number
}
