# Mais@ Pecuária Estratégica — Formação de Preço

Calculadora de preços e orçamentos para clientes. O app abre diretamente na calculadora, sem login, senha ou cadastro. Qualquer pessoa com o link pode acessá-lo.

## Publicação

- React + Vite, publicado na Vercel.
- App: https://mais-forma-o-de-pre-o-tortuga.vercel.app/
- A calculadora funciona no navegador, sem depender de autenticação ou conexão com o Supabase.
- As atualizações da branch `main` são publicadas automaticamente pela integração com o GitHub.

## Tabelas e campanhas

Os produtos, preços por kg de MT1, MT2, MT3, GO e PA02, pesos das embalagens e campanhas ficam em `src/PriceCalculator.jsx`. Identifique produtos pelo código ao atualizar as tabelas. A opção PA02 usa somente a coluna PA 2 do PDF Nutrição Pará, datado de 16/10/2026. A busca lista os produtos com preço na tabela escolhida; itens sem preço precisam de substituição, remoção ou preço manual para exportar o orçamento.

As linhas e divisões das tabelas ficam em `src/linhas-produtos.json`, associadas aos códigos dos produtos. Ao incluir um produto no catálogo, inclua seu código em exatamente um desses grupos. A busca mostra os produtos agrupados por esses títulos, sem seletores de linha ou divisão.

O app abre com produto, quantidade e peso em branco e total zerado. Escolher um produto preenche apenas o peso da embalagem. Novos itens também começam vazios; as imagens só podem ser geradas após preencher produto (ou preço manual), quantidade e peso em todos os itens. Os cálculos e o modelo das imagens enviadas aos clientes são preservados.

A campanha ESP de 4,5% foi prorrogada até 15/11/2026, inclusive, para os códigos participantes, também em PA02. O usuário aplica o desconto no card do produto. O app verifica a validade no horário de Cuiabá.

## Desenvolvimento

```sh
pnpm install
pnpm dev
pnpm build
```

## Arquivos principais

- `src/main.jsx`: inicialização do React.
- `src/components/App.jsx`: entrada direta na calculadora.
- `src/PriceCalculator.jsx`: tabelas, campanhas, cálculo e imagens de orçamento.
- `src/PriceCalculator.css`: visual responsivo da calculadora.
- `src/linhas-produtos.json`: linhas e divisões comerciais dos produtos.
- `public/manifest.webmanifest`: nome e ícones do app instalado.
- `public/icons/`: ícones do app.
