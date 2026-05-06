import { PrismaClient } from "@prisma/client"
import { ITENS_CATALOGO } from "../lib/data/itens"
import { CAMINHOES_PADRAO } from "../lib/data/caminhoes"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Seed caminhões
  for (const c of CAMINHOES_PADRAO) {
    await prisma.caminhao.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        nome: c.nome,
        tipo: c.tipo,
        capacidadeM3: c.capacidadeM3,
        capacidadeKg: c.capacidadeKg,
        comprimentoCm: c.comprimentoCm,
        larguraCm: c.larguraCm,
        alturaCm: c.alturaCm,
        imagemUrl: c.imagemUrl ?? null,
      },
    })
  }
  console.log(`✅ ${CAMINHOES_PADRAO.length} caminhões criados`)

  // Seed itens do catálogo
  for (const item of ITENS_CATALOGO) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        nome: item.nome,
        categoria: item.categoria,
        iconeUrl: item.emoji,
        larguraCm: item.larguraCm,
        alturaCm: item.alturaCm,
        profundidadeCm: item.profundidadeCm,
        pesoKg: item.pesoKg,
        volumeM3: item.volumeM3,
      },
    })
  }
  console.log(`✅ ${ITENS_CATALOGO.length} itens do catálogo criados`)

  // Seed transportadoras de exemplo
  const transportadoras = [
    {
      id: "trans-sp-1",
      nome: "Transportes Rápido SP",
      notaMedia: 4.8,
      totalAvaliacoes: 234,
      cidade: "São Paulo, SP",
      tiposCaminhao: ["CAMINHONETE", "CAMINHAO", "BAU"],
    },
    {
      id: "trans-rj-1",
      nome: "MoveRio Transportes",
      notaMedia: 4.5,
      totalAvaliacoes: 89,
      cidade: "Rio de Janeiro, RJ",
      tiposCaminhao: ["VAN", "CAMINHONETE"],
    },
    {
      id: "trans-mg-1",
      nome: "BH Mudanças",
      notaMedia: 4.2,
      totalAvaliacoes: 156,
      cidade: "Belo Horizonte, MG",
      tiposCaminhao: ["CAMINHAO", "BAU"],
    },
  ]

  for (const t of transportadoras) {
    await prisma.transportadora.upsert({
      where: { id: t.id },
      update: {},
      create: t,
    })
  }
  console.log(`✅ ${transportadoras.length} transportadoras criadas`)

  console.log("🎉 Seed concluído!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
