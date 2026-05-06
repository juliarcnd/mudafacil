"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PaywallGate } from "@/components/paywall/paywall-gate"

export type FiltrosCotacao = {
  ordenarPor: "preco" | "nota" | "data"
  seguroIncluso: boolean | null
  notaMinima: number
}

interface FiltrosCotacaoProps {
  filtros: FiltrosCotacao
  onChange: (f: FiltrosCotacao) => void
  hasAccess: boolean
}

export function FiltrosCotacaoPanel({ filtros, onChange, hasAccess }: FiltrosCotacaoProps) {
  const content = (
    <div className="space-y-4 p-4 border rounded-xl bg-card">
      <h3 className="text-sm font-semibold">Filtros</h3>

      <div className="space-y-1.5">
        <Label className="text-xs">Ordenar por</Label>
        <Select
          value={filtros.ordenarPor}
          onValueChange={(v) => onChange({ ...filtros, ordenarPor: v as FiltrosCotacao["ordenarPor"] })}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="preco">Menor preço</SelectItem>
            <SelectItem value="nota">Melhor avaliação</SelectItem>
            <SelectItem value="data">Disponibilidade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Nota mínima</Label>
        <Select
          value={String(filtros.notaMinima)}
          onValueChange={(v) => onChange({ ...filtros, notaMinima: Number(v) })}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Qualquer nota</SelectItem>
            <SelectItem value="3">3+ estrelas</SelectItem>
            <SelectItem value="4">4+ estrelas</SelectItem>
            <SelectItem value="4.5">4.5+ estrelas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Seguro</Label>
        <Select
          value={filtros.seguroIncluso === null ? "any" : filtros.seguroIncluso ? "yes" : "no"}
          onValueChange={(v) =>
            onChange({ ...filtros, seguroIncluso: v === "any" ? null : v === "yes" })
          }
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Qualquer</SelectItem>
            <SelectItem value="yes">Com seguro</SelectItem>
            <SelectItem value="no">Sem seguro</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  return (
    <PaywallGate
      blocked={!hasAccess}
      title="Filtros avançados"
      description="Filtre por nota, seguro e data disponível com o plano PRO."
      feature="Filtros de cotação"
    >
      {content}
    </PaywallGate>
  )
}
