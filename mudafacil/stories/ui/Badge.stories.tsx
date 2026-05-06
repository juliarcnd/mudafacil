import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Badge } from "../../components/ui/badge"
import { Shield, Zap } from "lucide-react"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  args: { children: "Badge" },
}
export default meta

type Story = StoryObj<typeof Badge>

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <Badge>Default (PRO)</Badge>
      <Badge variant="secondary">Secondary (FREE)</Badge>
      <Badge variant="accent">
        <Shield className="h-3 w-3 mr-1" />
        Seguro incluso
      </Badge>
      <Badge variant="outline">Rascunho</Badge>
      <Badge variant="destructive">Acima da capacidade</Badge>
    </div>
  ),
}

export const PlanBadges: Story = {
  render: () => (
    <div className="flex gap-3 p-4">
      <Badge variant="secondary">FREE</Badge>
      <Badge variant="accent">TRIAL — 14 dias</Badge>
      <Badge>
        <Zap className="h-3 w-3 mr-1" />
        PRO
      </Badge>
    </div>
  ),
}
