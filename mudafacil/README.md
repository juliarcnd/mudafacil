# MudaFácil

> Arraste seus móveis, escolha o caminhão e mude sem estresse.

Canvas interativo de mudança com drag & drop, seletor de caminhão em tempo real, catálogo de 40+ itens e cotações de transportadoras avaliadas.

## Stack

- **Next.js 16** (App Router) + TypeScript strict
- **Tailwind CSS 4** + design system em `design-system/tokens.ts`
- **Prisma 6** + PostgreSQL (Neon)
- **Auth.js v5** — Google OAuth + Email Magic Link
- **Stripe** — checkout + webhook + portal
- **TanStack Query** — data fetching client-side
- **dnd-kit** — canvas drag & drop
- **Storybook 10** — documentação do design system
- **Resend** — emails transacionais

## Setup local

### 1. Pré-requisitos

```bash
node --version   # v18+
npm --version    # v9+
```

### 2. Clonar e instalar

```bash
git clone <repo>
cd mudafacil
npm install
```

### 3. Variáveis de ambiente

```bash
cp .env.example .env
# Preencher todas as variáveis conforme .env.example
```

### 4. Banco de dados

Criar banco no [Neon](https://neon.tech), copiar a `DATABASE_URL` e rodar:

```bash
npx prisma migrate dev --name init
npm run seed
```

### 5. Google OAuth

1. Acessar [Google Cloud Console](https://console.cloud.google.com)
2. Criar credenciais OAuth 2.0
3. Adicionar `http://localhost:3000/api/auth/callback/google` como redirect URI

### 6. Stripe

```bash
# Instalar Stripe CLI
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Criar um produto no Stripe com preço recorrente de R$ 29,90/mês e copiar o `STRIPE_PRICE_ID_PRO`.

### 7. Rodar em desenvolvimento

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run tokens` | Regenerar CSS vars a partir de `design-system/tokens.ts` |
| `npm run tokens:check` | Verificar se `globals.css` está em sync |
| `npm run seed` | Popular banco com dados iniciais |
| `npm run storybook` | Storybook em `localhost:6006` |

## Design System

O arquivo `design-system/tokens.ts` é a **fonte única de verdade** para todas as cores, espaçamentos e tipografia.

Para alterar uma cor:
1. Editar `design-system/tokens.ts`
2. Rodar `npm run tokens`
3. As mudanças propagam automaticamente para o produto E para o Storybook

**Regra:** Nunca usar hex hardcoded nos componentes. Sempre `bg-primary`, `text-foreground`, etc.

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Landing page |
| `/pricing` | Página de preços |
| `/login` | Autenticação (Google + Magic Link) |
| `/dashboard` | Painel com lista de mudanças |
| `/app/mudanca/nova` | Criar nova mudança |
| `/app/mudanca/[id]` | Canvas + cotações da mudança |
| `/settings/billing` | Gerenciar plano e cobrança |

## Planos

| Recurso | FREE | TRIAL | PRO |
|---|---|---|---|
| Mudanças ativas | 1 | ∞ | ∞ |
| Itens no canvas | 15 | ∞ | ∞ |
| Cotações/mudança | 3 | ∞ | ∞ |
| Filtros avançados | ❌ | ✅ | ✅ |

## Deploy

```bash
vercel env add DATABASE_URL
vercel env add AUTH_SECRET
# ... adicionar todas as envs
vercel --prod
```
