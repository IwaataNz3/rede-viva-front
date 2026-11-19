import type { Categoria } from '../types/api'

export function formatarPreco(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// "2026-11-20" -> "20/11/2026"
export function formatarData(data: string) {
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

// Data de hoje no formato da API ("2026-11-17"), no fuso do navegador
export function hojeISO() {
  const hoje = new Date()
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const dia = String(hoje.getDate()).padStart(2, '0')
  return `${hoje.getFullYear()}-${mes}-${dia}`
}

export function amanhaISO() {
  const amanha = new Date()
  amanha.setDate(amanha.getDate() + 1)
  const mes = String(amanha.getMonth() + 1).padStart(2, '0')
  const dia = String(amanha.getDate()).padStart(2, '0')
  return `${amanha.getFullYear()}-${mes}-${dia}`
}

// Quantos dias faltam até a validade (0 = vence hoje, negativo = já venceu)
export function diasAteVencer(data: string) {
  const umDia = 1000 * 60 * 60 * 24
  const validade = new Date(`${data}T00:00:00`)
  const hoje = new Date(`${hojeISO()}T00:00:00`)
  return Math.round((validade.getTime() - hoje.getTime()) / umDia)
}

// Texto curto da validade, usado nos cards: "hoje", "amanhã" ou "em 20/11"
export function textoValidade(data: string) {
  const dias = diasAteVencer(data)
  if (dias === 0) return 'hoje'
  if (dias === 1) return 'amanhã'
  return `em ${formatarData(data).slice(0, 5)}`
}

export function calcularDesconto(precoSistema: number, precoRede: number) {
  return Math.round((1 - precoRede / precoSistema) * 100)
}

export const nomesCategorias: { [categoria in Categoria]: string } = {
  HORTIFRUTI: 'Hortifrúti',
  PADARIA: 'Padaria',
  LATICINIOS: 'Laticínios',
  CARNES: 'Carnes',
  FRIOS: 'Frios',
  MERCEARIA: 'Mercearia',
  CONGELADOS: 'Congelados',
}
