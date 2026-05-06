import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroAnimated } from "@/components/hero-animated"
import { FeaturesBento } from "@/components/sections/features-bento"
import { StatsCounter } from "@/components/sections/stats-counter"
import { FreeLabel } from "@/components/ui/free-label"
import {
  Truck,
  ArrowRight,
  Zap,
} from "lucide-react"

const planLimits = [
  { feature: "Mudanças ativas", free: "1", pro: "Ilimitadas" },
  { feature: "Itens no canvas", free: "15", pro: "Ilimitados" },
  { feature: "Cotações por mudança", free: "3", pro: "Ilimitadas" },
  { feature: "Filtros avançados", free: "❌", pro: "✅" },
  { feature: "Suporte prioritário", free: "❌", pro: "✅" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Truck className="h-6 w-6 text-accent" />
            MudaFácil
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Preços
            </Link>
            <Button asChild size="sm" variant="outline">
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/login">Começar grátis</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero animado */}
      <HeroAnimated />

      {/* Stats com counters animados */}
      <StatsCounter />

      {/* Features Bento — Problema → Solução */}
      <FeaturesBento />

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Preços simples</h2>
          <p className="text-muted-foreground text-center mb-12">
            Comece grátis e faça upgrade quando precisar.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-1">Free</h3>
                <div className="text-3xl font-bold mb-1">R$ 0</div>
                <p className="text-muted-foreground text-sm mb-6">Para testar</p>
                <ul className="space-y-2 mb-6">
                  {planLimits.map((l) => (
                    <li key={l.feature} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{l.feature}</span>
                      <span className="font-medium">{l.free}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Começar grátis</Link>
                </Button>
              </CardContent>
            </Card>

            {/* PRO */}
            <Card className="border-primary/50 shadow-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge>
                  <Zap className="h-3 w-3 mr-1" />
                  Mais popular
                </Badge>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-1">PRO</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold">R$ 29,90</span>
                  <span className="text-muted-foreground text-sm">/mês</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6">Para mudanças sem estresse</p>
                <ul className="space-y-2 mb-6">
                  {planLimits.map((l) => (
                    <li key={l.feature} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{l.feature}</span>
                      <span className="font-medium">{l.pro}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link href="/login">
                    <Zap className="h-4 w-4 mr-2" />
                    Assinar PRO
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary/5 border-t border-primary/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para mover sem estresse?</h2>
          <p className="text-muted-foreground mb-8">
            Junte-se a centenas de pessoas que usam o MudaFácil para organizar suas mudanças.
            14 dias grátis, sem cartão.
          </p>
          <div className="flex flex-col items-center">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/login">
                Começar agora
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <FreeLabel />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-sm">
            <Truck className="h-4 w-4 text-accent" />
            MudaFácil
          </Link>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/pricing" className="hover:text-foreground transition-colors">Preços</Link>
            <Link href="/login" className="hover:text-foreground transition-colors">Entrar</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 MudaFácil. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
