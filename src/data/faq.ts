import type { Pergunta } from '../types/faq'

export const perguntas: Pergunta[] = [
  {
    id: 1,
    pergunta: 'Quem pode usar a Rede Viva?',
    resposta: 'Famílias inscritas no Cadastro Único ou convidadas por uma ONG, igreja ou associação de bairro parceira. Depois de aprovado, o cadastro vale por um ano.',
  },
  {
    id: 2,
    pergunta: 'A família paga alguma taxa?',
    resposta: 'Não. A família paga só os produtos, no caixa do próprio supermercado. Quem paga pela plataforma são as redes de supermercados.',
  },
  {
    id: 3,
    pergunta: 'Que produtos aparecem nas ofertas?',
    resposta: 'Alimentos que sobraram depois da promoção de vencimento da loja e ainda estão dentro da validade. A oferta sai do ar no dia da validade ou quando acaba a quantidade.',
  },
  {
    id: 4,
    pergunta: 'Como funciona a retirada?',
    resposta: 'Ao reservar, a família recebe um QR Code válido por 24 horas. No balcão de atendimento, o funcionário lê o código, entrega os produtos e aplica o desconto no total da compra. A nota fiscal sai normalmente.',
  },
  {
    id: 5,
    pergunta: 'Quantas reservas posso fazer?',
    resposta: 'Até duas por semana. A reserva que não foi retirada também conta, para que os produtos fiquem disponíveis para outras famílias.',
  },
  {
    id: 6,
    pergunta: 'Até que distância aparecem os mercados?',
    resposta: 'A família vê as ofertas das lojas a até 2 km de casa, para que a retirada caiba no trajeto do dia a dia.',
  },
  {
    id: 7,
    pergunta: 'O supermercado precisa mudar o sistema dele?',
    resposta: 'Não. O funcionário cadastra as sobras pelo celular, lendo o código de barras, e o atendente aplica um único desconto no caixa. Preços, etiquetas e sistema da loja continuam iguais.',
  },
  {
    id: 8,
    pergunta: 'O que acontece com meus dados?',
    resposta: 'A imagem do comprovante do CadÚnico é apagada em até 24 horas depois da validação. A família pode ver, corrigir e apagar os próprios dados quando quiser.',
  },
]
