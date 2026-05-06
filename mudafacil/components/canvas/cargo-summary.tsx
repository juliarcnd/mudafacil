"use client"

import { AlertTriangle, Package, Weight, Truck } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { CaminhaoData } from "@/lib/data/caminhoes"
import { formatVolume, formatWeight } from "@/lib/utils"

interface CargoSummaryProps {
  caminhao: CaminhaoData | null
  totalVolumeM3: number
  totalPesoKg: number
  ocupacaoPercentual: number
  totalItens: number
}

export function CargoSummary({
  caminhao,
  totalVolumeM3,
  totalPesoKg,
  ocupacaoPercentual,
  totalItens,
}: CargoSummaryProps) {
  const isOver = ocupacaoPercentual > 100

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Resumo da carga</h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Package className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Total de itens</span>
          </div>
          <p className="text-xl font-bold">{totalItens}</p>
        </div>

        <div className="rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs text-muted-foreground">Volume total</span>
          </div>
          <p className="text-xl font-bold">{formatVolume(totalVolumeM3)}</p>
        </div>

        <div className="rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Weight className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Peso estimado</span>
          </div>
          <p className="text-xl font-bold">{formatWeight(totalPesoKg)}</p>
        </div>

        <div className="rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Truck className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Ocupação</span>
          </div>
          <p className={cn("text-xl font-bold", isOver ? "text-destructive" : "")}>
            {caminhao ? `${ocupacaoPercentual.toFixed(0)}%` : "—"}
          </p>
        </div>
      </div>

      {caminhao && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">
              {formatVolume(totalVolumeM3)} / {formatVolume(caminhao.capacidadeM3)}
            </span>
            <span className={cn("font-medium", isOver ? "text-destructive" : "text-foreground")}>
              {ocupacaoPercentual.toFixed(0)}%
            </span>
          </div>
          <Progress
            value={Math.min(ocupacaoPercentual, 100)}
            className={cn(isOver ? "[&>[data-slot=indicator]]:bg-destructive" : "[&>[data-slot=indicator]]:bg-primary")}
          />
        </div>
      )}

      {isOver && (
        <div className="flex items-start gap-2 rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-xs text-destructive">
          <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <p>
            Sua carga excede a capacidade do {caminhao?.nome}. Considere remover itens ou escolher um caminhão maior.
          </p>
        </div>
      )}
    </div>
  )
}
