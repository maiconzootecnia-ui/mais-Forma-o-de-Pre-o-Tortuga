# Mais@ Pecuária Estratégica — Formação de Preço

Calculadora de preços e orçamentos para clientes. O app abre diretamente na calculadora, sem login, senha ou cadastro. Qualquer pessoa com o link pode acessá-lo.

## Publicação

- React + Vite, publicado na Vercel.
- App: https://mais-forma-o-de-pre-o-tortuga.vercel.app/
- A calculadora funciona no navegador, sem depender de autenticação ou conexão com o Supabase.
- As atualizações da branch `main` são publicadas automaticamente pela integração com o GitHub.

## Tabelas e campanhas

Os produtos, preços por kg de MT1, MT2, MT3 e GO, pesos das embalagens e campanhas ficam em `src/PriceCalculator.jsx`. Identifique produtos pelo código ao atualizar as tabelas.

A campanha atual oferece desconto ESP de 4,5% nos códigos informados, com validade até 31/10/2026. O usuário aplica o desconto no card do produto.

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
- `public/manifest.webmanifest`: nome e ícones do app instalado.
- `public/icons/`: ícones do app.
