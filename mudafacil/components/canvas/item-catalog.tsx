"use client"

import { useState } from "react"
import { ITENS_CATALOGO, CATEGORIAS, type ItemData } from "@/lib/data/itens"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

interface ItemCatalogProps {
  onAddItem: (item: ItemData) => void
  itemCounts: Record<string, number>
  maxItems?: number
}

export function ItemCatalog({ onAddItem, itemCounts, maxItems }: ItemCatalogProps) {
  const [search, setSearch] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("Todos")

  const totalItems = Object.values(itemCounts).reduce((a, b) => a + b, 0)
  const atLimit = maxItems !== undefined && totalItems >= maxItems

  const filtered = ITENS_CATALOGO.filter((item) => {
    const matchSearch = item.nome.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoriaAtiva === "Todos" || item.categoria === categoriaAtiva
    return matchSearch && matchCat
  })

  return (
    <div className="flex flex-col h-full gap-3">
      <div>
        <h3 className="text-sm font-semibold mb-2">Catálogo de itens</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Buscar item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {["Todos", ...CATEGORIAS].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaAtiva(cat)}
            className={cn(
              "text-[11px] px-2 py-0.5 rounded-full border transition-colors",
              categoriaAtiva === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary/50"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {atLimit && (
        <div className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
          Limite de {maxItems} itens atingido. Faça upgrade para adicionar mais.
        </div>
      )}

      <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-2 pr-1">
        {filtered.map((item) => {
          const count = itemCounts[item.id] || 0
          return (
            <button
              key={item.id}
              onClick={() => !atLimit && onAddItem(item)}
              disabled={atLimit}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg border text-center transition-all",
                atLimit
                  ? "opacity-40 cursor-not-allowed border-border"
                  : "hover:border-primary/50 hover:bg-primary/5 border-border cursor-pointer"
              )}
              title={`${item.nome} — ${item.volumeM3} m³, ${item.pesoKg} kg`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-[11px] font-medium leading-tight">{item.nome}</span>
              <span className="text-[10px] text-muted-foreground">{item.volumeM3} m³</span>
              {count > 0 && (
                <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4">
                  ×{count}
                </Badge>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
