import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Truck, Package } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const mudancas = await prisma.mudanca.findMany({
    where: { userId: session.user.id },
    include: { caminhao: true, _count: { select: { itens: true, cotacoes: true } } },
    orderBy: { updatedAt: "desc" },
  })

  const statusLabels: Record<string, string> = {
    RASCUNHO: "Rascunho",
    COTANDO: "Cotando",
    CONFIRMADA: "Confirmada",
    CONCLUIDA: "Concluída",
  }

  const statusColors: Record<string, "default" | "secondary" | "accent" | "outline"> = {
    RASCUNHO: "secondary",
    COTANDO: "accent",
    CONFIRMADA: "default",
    CONCLUIDA: "outline",
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Minhas Mudanças</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie suas mudanças e cotações
          </p>
        </div>
        <Button asChild>
          <Link href="/app/mudanca/nova">
            <Plus className="h-4 w-4 mr-2" />
            Nova Mudança
          </Link>
        </Button>
      </div>

      {mudancas.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold mb-2">Nenhuma mudança ainda</h2>
            <p className="text-muted-foreground mb-6">
              Crie sua primeira mudança e monte o canvas de carga.
            </p>
            <Button asChild>
              <Link href="/app/mudanca/nova">
                <Plus className="h-4 w-4 mr-2" />
                Criar primeira mudança
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {mudancas.map((mudanca: typeof mudancas[number]) => (
            <Link key={mudanca.id} href={`/app/mudanca/${mudanca.id}`}>
              <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base font-semibold line-clamp-1">
                      {mudanca.enderecoOrigem}
                    </CardTitle>
                    <Badge variant={statusColors[mudanca.status]}>
                      {statusLabels[mudanca.status]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">→ {mudanca.enderecoDestino}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Package className="h-3.5 w-3.5" />
                      {mudanca._count.itens} itens
                    </span>
                    {mudanca.caminhao && (
                      <span className="flex items-center gap-1">
                        <Truck className="h-3.5 w-3.5" />
                        {mudanca.caminhao.nome}
                      </span>
                    )}
                    <span>{mudanca._count.cotacoes} cotações</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
