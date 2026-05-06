import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Truck } from "lucide-react"

const meta: Meta = {
  title: "UI/Card",
  component: Card,
}
export default meta

export const Default: StoryObj = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Mudança São Paulo → Rio</CardTitle>
        <CardDescription>3 itens • Fiorino • 2 cotações</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Mudança planejada para 15/06/2026.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">Ver canvas</Button>
        <Button size="sm" variant="outline">Cotações</Button>
      </CardFooter>
    </Card>
  ),
}

export const CotacaoCard: StoryObj = {
  render: () => (
    <Card className="w-96">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Truck className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Transportes Rápido</CardTitle>
              <p className="text-xs text-muted-foreground">São Paulo, SP</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">R$ 850</p>
            <Badge variant="accent" className="text-[10px]">Seguro incluso</Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  ),
}
