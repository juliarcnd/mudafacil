"use client"

import { useState } from "react"
import { CotacaoCard } from "@/components/cotacoes/cotacao-card"
import { FiltrosCotacaoPanel, type FiltrosCotacao } from "@/components/cotacoes/filtros-cotacao"
import { PaywallGate } from "@/components/paywall/paywall-gate"
import { Badge } from "@/components/ui/badge"

interface Cotacao {
  id: string
  precoCentavos: number
  dataDisponivel: Date | string
  seguroIncluso: boolean
  validade: Date | string
  transportadora: {
    nome: string
    logoUrl: string | null
    notaMedia: number
    totalAvaliacoes: number
    cidade: string
  }
}

interface CotacoesTabProps {
  mudancaId: string
  cotacoes: Cotacao[]
  hasAdvancedFilters: boolean
  maxCotacoes?: number
}

export function CotacoesTab({ mudancaId, cotacoes, hasAdvancedFilters, maxCotacoes }: CotacoesTabProps) {
  const [filtros, setFiltros] = useState<FiltrosCotacao>({
    ordenarPor: "preco",
    seguroIncluso: null,
    notaMinima: 0,
  })

  const filtradas = [...cotacoes]
    .filter((c) => {
      if (!hasAdvancedFilters) return true
      if (filtros.seguroIncluso !== null && c.seguroIncluso !== filtros.seguroIncluso) return false
      if (c.transportadora.notaMedia < filtros.notaMinima) return false
      return true
    })
    .sort((a, b) => {
      if (!hasAdvancedFilters || filtros.ordenarPor === "preco") return a.precoCentavos - b.precoCentavos
      if (filtros.ordenarPor === "nota") return b.transportadora.notaMedia - a.transportadora.notaMedia
      return new Date(a.dataDisponivel).getTime() - new Date(b.dataDisponivel).getTime()
    })

  const limitadas = maxCotacoes !== undefined ? filtradas.slice(0, maxCotacoes) : filtradas

  return (
    <div className="flex gap-4">
      {/* Filtros */}
      <div className="w-56 flex-shrink-0">
        <FiltrosCotacaoPanel filtros={filtros} onChange={setFiltros} hasAccess={hasAdvancedFilters} />
      </div>

      {/* Lista */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">
            {limitadas.length} cotação{limitadas.length !== 1 ? "ões" : ""}
          </h3>
          {maxCotacoes !== undefined && cotacoes.length >= maxCotacoes && (
            <Badge variant="secondary" className="text-xs">
              Plano FREE — {maxCotacoes} cotações
            </Badge>
          )}
        </div>

        {limitadas.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Nenhuma cotação disponível para os filtros selecionados.
          </div>
        ) : (
          limitadas.map((c) => (
            <CotacaoCard
              key={c.id}
              transportadora={c.transportadora}
              cotacao={c}
            />
          ))
        )}

        {maxCotacoes !== undefined && cotacoes.length > maxCotacoes && (
          <PaywallGate
            blocked
            title="Ver mais cotações"
            description={`Você está vendo ${maxCotacoes} de ${cotacoes.length} cotações. Faça upgrade para ver todas.`}
          >
            <div />
          </PaywallGate>
        )}
      </div>
    </div>
  )
}
