import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { getPlanLimits, hasAccess } from "@/lib/subscription"
import { NovaMudancaForm } from "./nova-mudanca-form"

export default async function NovaMudancaPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } })
  const limits = getPlanLimits(user)

  // Check active mudancas limit
  const activeMudancas = await prisma.mudanca.count({
    where: { userId: user.id, status: { in: ["RASCUNHO", "COTANDO"] } },
  })

  const isBlocked = limits.mudancasAtivas !== Infinity && activeMudancas >= limits.mudancasAtivas

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-2">Nova Mudança</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Informe os endereços e comece a montar sua carga.
      </p>
      <NovaMudancaForm isBlocked={isBlocked} />
    </div>
  )
}
