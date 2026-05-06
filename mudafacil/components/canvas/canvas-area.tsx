"use client"

import { useDroppable } from "@dnd-kit/core"
import type { CaminhaoData } from "@/lib/data/caminhoes"
import { cn } from "@/lib/utils"

interface CanvasItem {
  instanceId: string
  itemId: string
  emoji: string
  nome: string
  x: number
  y: number
  rotacao: number
  larguraCm: number
  profundidadeCm: number
}

interface CanvasAreaProps {
  caminhao: CaminhaoData | null
  items: CanvasItem[]
  onRemoveItem: (instanceId: string) => void
}

const CANVAS_SCALE = 0.4

export function CanvasArea({ caminhao, items, onRemoveItem }: CanvasAreaProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" })

  if (!caminhao) {
    return (
      <div className="flex-1 flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 min-h-64">
        <p className="text-muted-foreground text-sm text-center px-4">
          Selecione um caminhão para começar a montar sua carga
        </p>
      </div>
    )
  }

  const canvasW = Math.round(caminhao.comprimentoCm * CANVAS_SCALE)
  const canvasH = Math.round(caminhao.larguraCm * CANVAS_SCALE)

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative rounded-xl border-2 overflow-hidden transition-colors",
        isOver ? "border-primary bg-primary/5" : "border-border bg-white"
      )}
      style={{ width: canvasW, height: canvasH, minWidth: 300, minHeight: 160 }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(#C4B5FD 1px, transparent 1px), linear-gradient(90deg, #C4B5FD 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Truck label */}
      <div className="absolute top-2 left-2 text-xs font-semibold text-muted-foreground bg-white/70 rounded px-1.5 py-0.5">
        {caminhao.nome} — {caminhao.comprimentoCm}×{caminhao.larguraCm}cm
      </div>

      {/* Placed items */}
      {items.map((item) => {
        const w = Math.round((item.larguraCm / 200) * 80)
        const h = Math.round((item.profundidadeCm / 200) * 80)

        return (
          <div
            key={item.instanceId}
            className="group absolute flex flex-col items-center justify-center rounded border-2 bg-primary/10 border-primary/40 cursor-default select-none"
            style={{ left: item.x, top: item.y, width: w, height: h, transform: `rotate(${item.rotacao}deg)` }}
          >
            <span className="text-xs leading-none">{item.emoji}</span>
            <span className="text-[9px] text-center font-medium leading-tight">{item.nome}</span>

            <button
              onClick={() => onRemoveItem(item.instanceId)}
              className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-destructive text-white text-[10px] items-center justify-center hidden group-hover:flex z-10"
            >
              ×
            </button>
          </div>
        )
      })}

      {items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-muted-foreground text-xs">Arraste itens do catálogo para cá</p>
        </div>
      )}
    </div>
  )
}
