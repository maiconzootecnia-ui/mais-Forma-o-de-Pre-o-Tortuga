# Mais@ Pecuária Estratégica — Formação de Preço

App de formação de preço + gestão de orçamentos + controle de acesso.

## Como está configurado

- **Frontend:** React + Vite, hospedado no Netlify
- **Banco/Auth:** Supabase (projeto "Formação de Preço", ID `zyxnnzqcazdbcwwlxkfl`)
- **Autenticação:** email + senha (cadastro livre — qualquer um pode criar conta e usar)
- **Admin:** email `maiconzootecnia@gmail.com` vira admin automaticamente ao se cadastrar

O admin tem uma aba extra **"Usuários"** onde vê todos que se cadastraram, pode promover a admin, rebaixar a usuário comum ou bloquear.

## Deploy pela primeira vez (~15 min)

### 1. Subir no GitHub

- Abre `github.com/signup` (se não tiver conta)
- Cria repositório novo `maisa-orcamento` como **Private**
- Toca em **Add file → Upload files** e sobe **todos os arquivos** deste zip
- Toca em **Commit changes**

### 2. Conectar no Netlify

- Abre `netlify.com/signup` → **Sign up with GitHub** (autoriza)
- No painel: **Add new site → Import an existing project → Deploy with GitHub**
- Escolhe o repositório `maisa-orcamento`
- Netlify já detecta as configurações do `netlify.toml` — **não muda nada**
- Toca em **Deploy site**
- Espera ~2 minutos → recebe uma URL tipo `magical-name-123.netlify.app`
- (Opcional: mude o nome do site em **Site settings → Change site name**)

### 3. Primeiro login

- Abre a URL do Netlify no Safari
- Toca em **Criar conta**
- Cadastra com `maiconzootecnia@gmail.com` e a senha que quiser
- Como esse email já está registrado como admin no banco, você entra direto com privilégios de admin
- Aparecem as abas **Calculadora** e **Usuários** na barra superior

### 4. Adicionar à tela do iPhone

- Na URL do Netlify no Safari: Compartilhar → **Adicionar à Tela de Início**
- Vira um ícone como se fosse um app

## Atualizar o app depois

Quando quiser trocar uma tabela de preços ou ajustar alguma coisa:

1. Me pede a mudança aqui
2. Eu te mando o `PriceCalculator.jsx` novo
3. No GitHub, navega até `src/PriceCalculator.jsx` → toca em **⋯ → Edit** ou **Add file → Upload files** para substituir
4. **Commit** → Netlify redeploya sozinho em ~1 minuto

## Estrutura do projeto

```
maisa-orcamento/
├── package.json          # deps: react, react-dom, @supabase/supabase-js
├── vite.config.js        # config do bundler
├── netlify.toml          # config de deploy do Netlify
├── index.html            # entrada
├── src/
│   ├── main.jsx          # monta o App
│   ├── PriceCalculator.jsx  # a calculadora (o que você já conhece)
│   ├── lib/
│   │   └── supabase.js      # cliente do banco
│   └── components/
│       ├── App.jsx          # gate de auth + navegação
│       ├── LoginScreen.jsx  # tela de entrar/cadastrar
│       └── AdminUsers.jsx   # painel admin (só você vê)
```

## Segurança

- **Row Level Security (RLS)** ativado nas tabelas do Supabase
- Usuário comum só lê o próprio perfil
- Só admin lê e edita perfis dos outros
- Senha nunca passa pelo seu servidor — Supabase cuida disso direto

## Credenciais do Supabase

Estão embutidas como fallback no código (`src/lib/supabase.js`). São chaves **publishable** (públicas por design) — quem tiver elas só consegue fazer coisas que o RLS permite.

Se quiser sobrescrever pelo Netlify: **Site settings → Environment variables**:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_KEY`
