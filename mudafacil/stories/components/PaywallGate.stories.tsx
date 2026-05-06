import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PaywallGate } from "../../components/paywall/paywall-gate"
import { Card, CardContent } from "../../components/ui/card"

const meta: Meta = {
  title: "Components/PaywallGate",
  component: PaywallGate,
}
export default meta

const SampleContent = () => (
  <Card>
    <CardContent className="pt-6">
      <p className="text-sm text-muted-foreground">
        Conteúdo protegido — filtros avançados, cotações ilimitadas, etc.
      </p>
    </CardContent>
  </Card>
)

export const Blocked: StoryObj = {
  render: () => (
    <div className="p-6 max-w-md">
      <PaywallGate
        blocked
        title="Filtros avançados"
        description="Filtre por nota, seguro e data disponível com o plano PRO."
        feature="Filtros de cotação"
      >
        <SampleContent />
      </PaywallGate>
    </div>
  ),
}

export const NotBlocked: StoryObj = {
  render: () => (
    <div className="p-6 max-w-md">
      <PaywallGate blocked={false}>
        <SampleContent />
      </PaywallGate>
    </div>
  ),
}
