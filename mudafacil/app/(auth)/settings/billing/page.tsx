import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { createCheckoutSession, createCustomerPortalSession } from "@/lib/stripe"
import { isSubscribed, isTrialActive, daysLeftInTrial } from "@/lib/subscription"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap } from "lucide-react"

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } })
  const params = await searchParams

  const subscribed = isSubscribed(user)
  const trial = isTrialActive(user)
  const daysLeft = daysLeftInTrial(user)

  async function handleCheckout() {
    "use server"
    const s = await auth()
    if (!s?.user?.id) return
    const u = await prisma.user.findUniqueOrThrow({ where: { id: s.user.id } })
    const checkoutSession = await createCheckoutSession({
      userId: u.id,
      email: u.email!,
      stripeCustomerId: u.stripeCustomerId,
    })
    redirect(checkoutSession.url!)
  }

  async function handlePortal() {
    "use server"
    const s = await auth()
    if (!s?.user?.id) return
    const u = await prisma.user.findUniqueOrThrow({ where: { id: s.user.id } })
    if (!u.stripeCustomerId) return
    const portalSession = await createCustomerPortalSession(u.stripeCustomerId)
    redirect(portalSession.url)
  }

  const proFeatures = [
    "Mudanças ilimitadas",
    "Canvas sem limite de itens",
    "Cotações ilimitadas por mudança",
    "Filtros avançados de transportadora",
    "Suporte prioritário",
  ]

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Plano e Cobrança</h1>
      <p className="text-muted-foreground mb-8">Gerencie seu plano e informações de pagamento.</p>

      {params.success && (
        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 text-sm">
          ✅ Upgrade realizado com sucesso! Bem-vindo ao PRO.
        </div>
      )}

      {/* Current Plan */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Plano atual</CardTitle>
            <Badge variant={subscribed ? "default" : trial ? "accent" : "secondary"}>
              {subscribed ? "PRO" : trial ? `Trial — ${daysLeft} dias` : "Free"}
            </Badge>
          </div>
          <CardDescription>
            {subscribed
              ? `Assinatura ativa até ${user.stripeCurrentPeriodEnd?.toLocaleDateString("pt-BR")}`
              : trial
              ? `Seu trial termina em ${user.trialEndsAt?.toLocaleDateString("pt-BR")}`
              : "Você está no plano gratuito com recursos limitados."}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* PRO Plan Card */}
      {!subscribed && (
        <Card className="border-primary/50 shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle>MudaFácil PRO</CardTitle>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">R$ 29,90</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
            <CardDescription>Tudo que você precisa para uma mudança sem estresse.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <form action={handleCheckout}>
              <Button type="submit" className="w-full" size="lg">
                <Zap className="h-4 w-4 mr-2" />
                {trial ? "Fazer upgrade agora" : "Assinar PRO"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Manage Subscription */}
      {subscribed && user.stripeCustomerId && (
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar assinatura</CardTitle>
            <CardDescription>
              Cancele, pause ou altere seu plano pelo portal do Stripe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handlePortal}>
              <Button type="submit" variant="outline">
                Abrir portal de cobrança
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
