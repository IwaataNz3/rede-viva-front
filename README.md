# Rede Viva

Front-end da Rede Viva, projeto da Global Solution 2026/2 (CitizenTech) da FIAP, feito pela equipe LuminaTech.

## Objetivo

Supermercados médios e grandes jogam fora todo dia alimentos bons que sobraram da promoção e estão perto do vencimento. Ao mesmo tempo, muitas famílias de baixa renda não conseguem pagar por esses mesmos produtos.

A Rede Viva liga as duas pontas. Quando a promoção acaba, o funcionário separa as sobras numa caixa no balcão e cadastra a oferta com um preço menor. A família cadastrada vê as ofertas, reserva os itens, recebe um código e retira no balcão em até 24 horas, pagando na hora. Se não buscar no prazo, os itens voltam para a oferta.

Este site tem duas partes da solução:

- **Ofertas** (`/ofertas`): vitrine com as ofertas ativas dos mercados parceiros, com filtro por categoria e por loja e uma reserva montada pela família.
- **Painel da loja** (`/painel`): tela do mercado para cadastrar, editar e excluir ofertas.

## Tecnologias

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- React Router
- Fetch API (sem Axios ou outra biblioteca de requisição)
- API REST em Java (Spring Boot) publicada no Render

## Estrutura de pastas

```
src/
  components/   componentes reutilizáveis (Header, Footer, Botao, CardOferta, FormOferta, MinhaReserva...)
  pages/        páginas ligadas às rotas
  services/     chamadas à API Java com fetch
  types/        interfaces TypeScript dos dados
  data/         dados fixos (integrantes, FAQ)
  hooks/        hook use-form para validação dos formulários
  utils/        funções de formatação (preço, data, desconto)
```

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/sobre` | Sobre |
| `/integrantes` | Integrantes |
| `/integrantes/:id` | Perfil de um integrante (rota com parâmetro) |
| `/faq` | FAQ |
| `/contato` | Contato |
| `/ofertas` | Ofertas dos mercados (GET na API) |
| `/painel` | Painel da loja (GET, POST, PUT e DELETE na API) |

## Integrantes

| Nome | RM | Turma | GitHub | LinkedIn |
| --- | --- | --- | --- | --- |
| Ana Paula Cunha Brum | RM571359 | 1TDSR | [abbrum](https://github.com/abbrum) | [LinkedIn](https://www.linkedin.com/in/ana-paula-brum/) |
| Gabriella Serni Ponzetta | RM566296 | 1TDSR | [gabriellaserni](https://github.com/gabriellaserni) | [LinkedIn](https://www.linkedin.com/in/gabriellaserni/) |
| Julio Cesar Iwata de Oliveira Barros | RM573723 | 1TDSR | [IwaataNz3](https://github.com/IwaataNz3) | [LinkedIn](https://www.linkedin.com/in/julioiwata/) |
| Rafael Santos Dias | RM574105 | 1TDSR | [realrafaelsd](https://github.com/realrafaelsd) | [LinkedIn](https://www.linkedin.com/in/rafaelsd/) |
| Victor Felipe Silva Alencar | RM574057 | 1TDSR | [alencarVictor](https://github.com/alencarVictor) | [LinkedIn](https://www.linkedin.com/in/victor-alencar-58623a3ba/) |

## Como executar

Pré-requisito: Node.js 20 ou mais novo.

```bash
npm install
```

Crie um arquivo `.env` na raiz (pode copiar o `.env.example`) com o endereço da API:

```
VITE_API_URL=https://redeviva-api-rest.onrender.com
```

Depois rode:

```bash
npm run dev
```

O site abre em `http://localhost:5173`.

A API fica no plano gratuito do Render, que desliga quando passa um tempo sem uso. Por isso a primeira consulta pode levar até 1 minuto.

## Links

- GitHub: LINK_DO_GITHUB
- Vercel: LINK_DA_VERCEL
- API Java: https://redeviva-api-rest.onrender.com
- Repositório da API: https://github.com/alencarVictor/redeviva-API-REST
- Vídeo no YouTube: LINK_DO_YOUTUBE

## Contato

- E-mail geral: rm573723@fiap.com.br
- Suporte técnico: rm574057@fiap.com.br
- Ou pela página `/contato` do site.
