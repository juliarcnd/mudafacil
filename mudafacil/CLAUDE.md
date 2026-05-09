# MudaFácil — Convenções para Agentes AI

## Stack
- **Framework**: Next.js 16 (App Router) + TypeScript strict
- **Estilização**: Tailwind CSS 4 — NUNCA usar hex hardcoded nos componentes. Sempre usar tokens semânticos (`bg-primary`, `text-foreground`, etc.)
- **Design System**: `design-system/tokens.ts` é a fonte única de verdade. Após editar tokens, rodar `npm run tokens`.
- **ORM**: Prisma 7 + PostgreSQL (Neon)
- **Auth**: Auth.js v5 (NextAuth) — variáveis com prefixo `AUTH_`
- **Pagamentos**: Stripe — não definir `trial_period_days` no checkout (upgrade imediato)
- **UI Components**: componentes próprios em `components/ui/` seguindo shadcn/ui pattern
- **Data fetching**: TanStack Query no client, Server Components no server
- **Validação**: Zod para todos os inputs de API

## Regras

### Middleware
- **NUNCA** importar `auth` do Auth.js no middleware — estoura o limite de 1MB do Vercel free
- Middleware checa o cookie `authjs.session-token` diretamente

### Planos e Limites
- FREE: 1 mudança ativa, 15 itens canvas, 3 cotações, sem filtros avançados
- TRIAL (14 dias): tudo ilimitado
- PRO: tudo ilimitado (R$ 29,90/mês)
- Funções em `lib/subscription.ts`: `isTrialActive`, `isSubscribed`, `hasAccess`, `daysLeftInTrial`, `getPlanLimits`
- `PLAN_LIMITS` em `lib/subscription.ts` é a fonte de verdade dos limites

### Stripe
- Webhook events: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.updated/deleted`
- Stripe SDK lazy init — proxy em `lib/stripe.ts` para não crashar no build

### Estrutura de rotas
- `app/(public)/` — Páginas públicas (landing, pricing, login)
- `app/(auth)/` — Páginas protegidas (dashboard, app, settings)
- `app/api/` — API routes

## Entidades do produto

| Entidade | Descrição |
|---|---|
| `Item` | Móvel/item com dimensões e volume — catálogo com 40+ itens em `lib/data/itens.ts` |
| `Caminhao` | 4 tamanhos: Fiorino, HR, 3/4, Baú — dados em `lib/data/caminhoes.ts` |
| `Mudanca` | Mudança do usuário com origem, destino, itens e caminhão |
| `CargaLayout` | Posicionamento dos itens no canvas drag & drop |
| `Cotacao` | Cotação de uma transportadora para uma mudança |
| `Transportadora` | Empresa de mudança com nota e cidade |

## Cores (design tokens) — Identidade Trekon
- Primária: `#BF3A1C` (Trekon Red — container, cabine, CTAs)
- Acento: `#E85A2A` (laranja-vermelho — hover e destaques)
- Fundo: `#FAFAF8` (branco quente neutro)
- Foreground: `#1A1410` (carvão quente — logotipo Trekon)
- Âmbar: `#FDBA74` (farol, detalhes do caminhão)
