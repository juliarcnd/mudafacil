import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    description: "Para experimentar com uma mudança",
    badge: null,
    features: [
      "1 mudança ativa",
      "Até 15 itens no canvas",
      "3 cotações por mudança",
      "Catálogo de 40+ itens",
    ],
    notIncluded: ["Filtros avançados", "Cotações ilimitadas", "Suporte prioritário"],
    cta: "Começar grátis",
    href: "/login",
    variant: "outline" as const,
  },
  {
    name: "PRO",
    price: "R$ 29,90",
    period: "/mês",
    description: "Para quem quer mover sem estresse",
    badge: "Mais popular",
    features: [
      "Mudanças ilimitadas",
      "Canvas sem limite de itens",
      "Cotações ilimitadas",
      "Filtros avançados de transportadora",
      "Comparação lado a lado",
      "Suporte prioritário",
    ],
    notIncluded: [],
    cta: "Assinar PRO",
    href: "/login",
    variant: "default" as const,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Preços simples e transparentes</h1>
          <p className="text-muted-foreground text-lg">
            Comece grátis. Faça upgrade quando precisar de mais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.badge ? "border-primary/50 shadow-lg relative" : ""}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="shadow-sm">
                    <Zap className="h-3 w-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground line-through">
                      <Check className="h-4 w-4 flex-shrink-0 opacity-30" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={plan.variant} className="w-full" size="lg">
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Trial de 14 dias grátis incluído em todos os planos. Cancele quando quiser.
        </p>
      </div>
    </div>
  )
}
