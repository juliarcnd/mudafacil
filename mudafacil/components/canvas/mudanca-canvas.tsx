"use client"

import { useState, useCallback } from "react"
import { DndContext, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { ITENS_CATALOGO, type ItemData } from "@/lib/data/itens"
import { CAMINHOES_PADRAO, type CaminhaoData } from "@/lib/data/caminhoes"
import { ItemCatalog } from "./item-catalog"
import { CanvasArea } from "./canvas-area"
import { TruckSelector } from "./truck-selector"
import { CargoSummary } from "./cargo-summary"
import { PaywallGate } from "@/components/paywall/paywall-gate"

interface PlacedItem {
  instanceId: string
  itemId: string
  emoji: string
  nome: string
  x: number
  y: number
  rotacao: number
  larguraCm: number
  profundidadeCm: number
  volumeM3: number
  pesoKg: number
}

interface MudancaCanvasProps {
  maxItems?: number
  hasAdvancedFilters?: boolean
}

export function MudancaCanvas({ maxItems, hasAdvancedFilters = true }: MudancaCanvasProps) {
  const [selectedTruck, setSelectedTruck] = useState<CaminhaoData | null>(null)
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([])
  const [activeItem, setActiveItem] = useState<ItemData | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const totalVolumeM3 = placedItems.reduce((acc, i) => acc + i.volumeM3, 0)
  const totalPesoKg = placedItems.reduce((acc, i) => acc + i.pesoKg, 0)
  const ocupacaoPercentual = selectedTruck ? (totalVolumeM3 / selectedTruck.capacidadeM3) * 100 : 0

  const itemCounts = placedItems.reduce<Record<string, number>>((acc, i) => {
    acc[i.itemId] = (acc[i.itemId] || 0) + 1
    return acc
  }, {})

  const handleAddItem = useCallback(
    (item: ItemData) => {
      if (maxItems !== undefined && placedItems.length >= maxItems) return
      const newItem: PlacedItem = {
        instanceId: `${item.id}-${Date.now()}`,
        itemId: item.id,
        emoji: item.emoji,
        nome: item.nome,
        x: 20 + Math.random() * 40,
        y: 20 + Math.random() * 40,
        rotacao: 0,
        larguraCm: item.larguraCm,
        profundidadeCm: item.profundidadeCm,
        volumeM3: item.volumeM3,
        pesoKg: item.pesoKg,
      }
      setPlacedItems((prev) => [...prev, newItem])
    },
    [maxItems, placedItems.length]
  )

  const handleRemoveItem = useCallback((instanceId: string) => {
    setPlacedItems((prev) => prev.filter((i) => i.instanceId !== instanceId))
  }, [])

  function handleDragEnd(event: DragEndEvent) {
    const { active, delta, over } = event

    if (over?.id === "canvas" && active.data.current?.fromCatalog) {
      const item = active.data.current.item as ItemData
      handleAddItem(item)
    } else if (!active.data.current?.fromCatalog) {
      setPlacedItems((prev) =>
        prev.map((i) =>
          i.instanceId === active.id
            ? { ...i, x: Math.max(0, i.x + delta.x), y: Math.max(0, i.y + delta.y) }
            : i
        )
      )
    }
    setActiveItem(null)
  }

  const atLimit = maxItems !== undefined && placedItems.length >= maxItems

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 h-full min-h-[600px]">
        {/* Sidebar: Catalog + Summary */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-4">
          <div className="flex-1 bg-card rounded-xl border p-3 overflow-hidden flex flex-col">
            <ItemCatalog onAddItem={handleAddItem} itemCounts={itemCounts} maxItems={maxItems} />
          </div>

          <div className="bg-card rounded-xl border p-4">
            <CargoSummary
              caminhao={selectedTruck}
              totalVolumeM3={totalVolumeM3}
              totalPesoKg={totalPesoKg}
              ocupacaoPercentual={ocupacaoPercentual}
              totalItens={placedItems.length}
            />
          </div>
        </div>

        {/* Main: Truck Selector + Canvas */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="bg-card rounded-xl border p-4">
            <TruckSelector
              selected={selectedTruck}
              onSelect={setSelectedTruck}
              ocupacaoPercentual={ocupacaoPercentual}
            />
          </div>

          <div className="flex-1 bg-card rounded-xl border p-4 overflow-auto">
            <CanvasArea
              caminhao={selectedTruck}
              items={placedItems}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeItem && (
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg border-2 border-primary bg-primary/10 shadow-lg opacity-90">
            <span className="text-2xl">{activeItem.emoji}</span>
            <span className="text-xs font-medium">{activeItem.nome}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
