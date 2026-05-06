import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect, notFound } from "next/navigation"
import { getPlanLimits } from "@/lib/subscription"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MudancaCanvas } from "@/components/canvas/mudanca-canvas"
import { CotacoesTab } from "./cotacoes-tab"

export default async function MudancaPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { id } = await params

  const mudanca = await prisma.mudanca.findUnique({
    where: { id, userId: session.user.id },
    include: {
      caminhao: true,
      itens: { include: { item: true } },
      cotacoes: { include: { transportadora: true } },
    },
  })

  if (!mudanca) notFound()

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } })
  const limits = getPlanLimits(user)

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-xl font-bold">{mudanca.enderecoOrigem}</h1>
        <p className="text-muted-foreground text-sm">→ {mudanca.enderecoDestino}</p>
      </div>

      <Tabs defaultValue="canvas" className="flex-1 flex flex-col">
        <TabsList className="w-fit">
          <TabsTrigger value="canvas">Canvas de Carga</TabsTrigger>
          <TabsTrigger value="cotacoes">Cotações ({mudanca.cotacoes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="canvas" className="flex-1 mt-4">
          <MudancaCanvas
            maxItems={limits.itensNoCanvas === Infinity ? undefined : limits.itensNoCanvas}
            hasAdvancedFilters={limits.filtrosAvancados}
          />
        </TabsContent>

        <TabsContent value="cotacoes" className="mt-4">
          <CotacoesTab
            mudancaId={mudanca.id}
            cotacoes={mudanca.cotacoes as Parameters<typeof CotacoesTab>[0]["cotacoes"]}
            hasAdvancedFilters={limits.filtrosAvancados}
            maxCotacoes={limits.cotacoesPorMudanca === Infinity ? undefined : limits.cotacoesPorMudanca}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
