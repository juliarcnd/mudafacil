"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import type { ItemData } from "@/lib/data/itens"
import { cn } from "@/lib/utils"

interface ItemIconProps {
  item: ItemData
  inCanvas?: boolean
  scale?: number
  x?: number
  y?: number
  rotacao?: number
  onRemove?: () => void
}

export function ItemIcon({ item, inCanvas = false, scale = 1, x = 0, y = 0, rotacao = 0, onRemove }: ItemIconProps) {
  const id = inCanvas ? `canvas-${item.id}-${x}-${y}` : `catalog-${item.id}`

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { item, fromCatalog: !inCanvas },
  })

  const style = inCanvas
    ? {
        position: "absolute" as const,
        left: x,
        top: y,
        transform: `rotate(${rotacao}deg)` + (transform ? ` translate3d(${transform.x}px, ${transform.y}px, 0)` : ""),
        zIndex: isDragging ? 50 : 10,
        touchAction: "none",
      }
    : {
        transform: CSS.Translate.toString(transform),
        touchAction: "none",
      }

  const w = Math.round((item.larguraCm / 200) * 80 * scale)
  const h = Math.round((item.profundidadeCm / 200) * 80 * scale)

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "group flex flex-col items-center justify-center gap-1 rounded-md border-2 bg-primary/10 border-primary/40 cursor-grab active:cursor-grabbing select-none",
        isDragging && "opacity-50",
        inCanvas ? "" : "p-2 hover:bg-primary/20 transition-colors"
      )}
      title={item.nome}
    >
      <div
        style={inCanvas ? { width: w, height: h } : {}}
        className={cn(
          "flex flex-col items-center justify-center",
          !inCanvas && "w-16 h-16"
        )}
      >
        <span className={cn("leading-none", inCanvas ? "text-xs" : "text-2xl")}>{item.emoji}</span>
        <span className={cn("text-center font-medium text-foreground", inCanvas ? "text-[9px]" : "text-xs mt-1")}>
          {item.nome}
        </span>
      </div>

      {inCanvas && onRemove && (
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onRemove}
          className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] items-center justify-center hidden group-hover:flex"
        >
          ×
        </button>
      )}
    </div>
  )
}
