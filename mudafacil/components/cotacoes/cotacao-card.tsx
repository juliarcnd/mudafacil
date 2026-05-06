"use client"

import { Star, Shield, Calendar, Truck } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

interface CotacaoCardProps {
  transportadora: {
    nome: string
    logoUrl?: string | null
    notaMedia: number
    totalAvaliacoes: number
    cidade: string
  }
  cotacao: {
    precoCentavos: number
    dataDisponivel: Date | string
    seguroIncluso: boolean
    validade: Date | string
  }
  onContratar?: () => void
}

export function CotacaoCard({ transportadora, cotacao, onContratar }: CotacaoCardProps) {
  const data = new Date(cotacao.dataDisponivel)
  const dataStr = data.toLocaleDateString("pt-BR")

  return (
    <Card className="hover:border-primary/50 hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {transportadora.logoUrl ? (
              <img src={transportadora.logoUrl} alt={transportadora.nome} className="h-10 w-10 rounded-lg object-cover" />
            ) : (
              <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Truck className="h-5 w-5 text-accent-foreground" />
              </div>
            )}
            <div>
              <p className="font-semibold">{transportadora.nome}</p>
              <p className="text-xs text-muted-foreground">{transportadora.cidade}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{formatCurrency(cotacao.precoCentavos)}</p>
            {cotacao.seguroIncluso && (
              <Badge variant="accent" className="text-[10px] mt-1">
                <Shield className="h-3 w-3 mr-1" />
                Seguro incluso
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="font-medium text-foreground">{transportadora.notaMedia.toFixed(1)}</span>
              <span>({transportadora.totalAvaliacoes})</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {dataStr}
            </span>
          </div>
          {onContratar && (
            <Button size="sm" onClick={onContratar}>
              Contratar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
