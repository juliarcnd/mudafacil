"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { PaywallGate } from "@/components/paywall/paywall-gate"
import { MapPin, ArrowRight } from "lucide-react"

interface NovaMudancaFormProps {
  isBlocked: boolean
}

export function NovaMudancaForm({ isBlocked }: NovaMudancaFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    enderecoOrigem: "",
    enderecoDestino: "",
    dataDesejada: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/mudancas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      toast.success("Mudança criada!")
      router.push(`/app/mudanca/${data.id}`)
    } catch {
      toast.error("Erro ao criar mudança")
    } finally {
      setLoading(false)
    }
  }

  const formContent = (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="origem">Endereço de origem</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="origem"
                placeholder="Rua, número, bairro, cidade"
                className="pl-9"
                value={form.enderecoOrigem}
                onChange={(e) => setForm({ ...form, enderecoOrigem: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destino">Endereço de destino</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-accent" />
              <Input
                id="destino"
                placeholder="Rua, número, bairro, cidade"
                className="pl-9"
                value={form.enderecoDestino}
                onChange={(e) => setForm({ ...form, enderecoDestino: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="data">Data desejada (opcional)</Label>
            <Input
              id="data"
              type="date"
              value={form.dataDesejada}
              onChange={(e) => setForm({ ...form, dataDesejada: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Criando..." : "Criar mudança →"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )

  return (
    <PaywallGate
      blocked={isBlocked}
      title="Limite de mudanças atingido"
      description="O plano gratuito permite apenas 1 mudança ativa. Faça upgrade para criar ilimitadas."
      feature="Mudanças ilimitadas"
    >
      {formContent}
    </PaywallGate>
  )
}
