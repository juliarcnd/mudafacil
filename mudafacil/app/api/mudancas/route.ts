import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { createMudancaSchema } from "@/lib/validations"
import { getPlanLimits } from "@/lib/subscription"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const mudancas = await prisma.mudanca.findMany({
    where: { userId: session.user.id },
    include: { caminhao: true, _count: { select: { itens: true, cotacoes: true } } },
    orderBy: { updatedAt: "desc" },
  })

  return NextResponse.json(mudancas)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = createMudancaSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } })
  const limits = getPlanLimits(user)

  if (limits.mudancasAtivas !== Infinity) {
    const count = await prisma.mudanca.count({
      where: { userId: user.id, status: { in: ["RASCUNHO", "COTANDO"] } },
    })
    if (count >= limits.mudancasAtivas) {
      return NextResponse.json({ error: "Limite de mudanças atingido" }, { status: 403 })
    }
  }

  const mudanca = await prisma.mudanca.create({
    data: {
      userId: session.user.id,
      enderecoOrigem: parsed.data.enderecoOrigem,
      enderecoDestino: parsed.data.enderecoDestino,
      dataDesejada: parsed.data.dataDesejada ? new Date(parsed.data.dataDesejada) : null,
    },
  })

  return NextResponse.json(mudanca, { status: 201 })
}
