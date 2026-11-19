import type { OfertaExemplo } from '../types/oferta'

// Exemplos para ilustrar o produto nas páginas institucionais (os mesmos do protótipo no Figma)
export const ofertasExemplo: OfertaExemplo[] = [
  { produto: 'Iogurte natural 170 g', validade: 'em 18/11', disponiveis: 12, precoSistema: 6, precoRedeViva: 2.5 },
  { produto: 'Queijo muçarela 200 g', validade: 'em 19/11', disponiveis: 5, precoSistema: 14.9, precoRedeViva: 7 },
  { produto: 'Pão de forma integral', validade: 'amanhã', disponiveis: 8, precoSistema: 9.9, precoRedeViva: 4.5, venceLogo: true },
]
