"use client"

import { CAMINHOES_PADRAO, type CaminhaoData } from "@/lib/data/caminhoes"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Truck } from "lucide-react"

interface TruckSelectorProps {
  selected: CaminhaoData | null
  onSelect: (caminhao: CaminhaoData) => void
  ocupacaoPercentual: number
}

export function TruckSelector({ selected, onSelect, ocupacaoPercentual }: TruckSelectorProps) {
  const isOver = ocupacaoPercentual > 100

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Selecione o caminhão</h3>
      <div className="grid grid-cols-2 gap-2">
        {CAMINHOES_PADRAO.map((caminhao) => {
          const isSelected = selected?.id === caminhao.id
          return (
            <button
              key={caminhao.id}
              onClick={() => onSelect(caminhao)}
              className={cn(
                "flex flex-col items-start p-3 rounded-lg border-2 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <Truck className="h-4 w-4" style={{ color: caminhao.cor }} />
                <span className="text-xs font-semibold">{caminhao.nome}</span>
              </div>
              <span className="text-[11px] text-muted-foreground">{caminhao.capacidadeM3} m³</span>
              <span className="text-[11px] text-muted-foreground">{caminhao.capacidadeKg} kg</span>
            </button>
          )
        })}
      </div>

      {selected && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Ocupação</span>
            <span className={cn(isOver ? "text-destructive font-semibold" : "")}>
              {ocupacaoPercentual.toFixed(0)}%{isOver && " ⚠️ Acima da capacidade"}
            </span>
          </div>
          <Progress
            value={Math.min(ocupacaoPercentual, 100)}
            className={cn(isOver ? "[&>[data-slot=indicator]]:bg-destructive" : "")}
          />
        </div>
      )}
    </div>
  )
}
