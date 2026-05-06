import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "../../components/ui/button"
import { ArrowRight, Download, Plus, Send, Trash2, Truck, Zap } from "lucide-react"

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link", "accent"],
      description: "Estilo visual do botão",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "icon"],
      description: "Tamanho do botão",
      table: { defaultValue: { summary: "default" } },
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o botão",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      description: "Exibe spinner e bloqueia interação (ação assíncrona em andamento)",
      table: { defaultValue: { summary: "false" } },
    },
    children: {
      control: "text",
      description: "Texto/conteúdo do botão",
    },
    asChild: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  args: {
    children: "Começar agora",
    variant: "default",
    size: "default",
    disabled: false,
    loading: false,
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ─── 🎮 Playground ────────────────────────────────────────────────────────────
// Use os controles no painel lateral para explorar todas as combinações.

export const Playground: Story = {
  name: "🎮 Playground",
}

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "Variant / Default",
  args: { children: "Começar grátis", variant: "default" },
}

export const Outline: Story = {
  name: "Variant / Outline",
  args: { children: "Ver planos", variant: "outline" },
}

export const Secondary: Story = {
  name: "Variant / Secondary",
  args: { children: "Saiba mais", variant: "secondary" },
}

export const Ghost: Story = {
  name: "Variant / Ghost",
  args: { children: "Cancelar", variant: "ghost" },
}

export const Accent: Story = {
  name: "Variant / Accent",
  args: { children: "Confirmar mudança", variant: "accent" },
}

export const Destructive: Story = {
  name: "Variant / Destructive",
  args: { children: "Excluir mudança", variant: "destructive" },
}

export const Link: Story = {
  name: "Variant / Link",
  args: { children: "Ver detalhes", variant: "link" },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSm: Story = {
  name: "Size / Small",
  args: { children: "Entrar", size: "sm" },
}

export const SizeDefault: Story = {
  name: "Size / Default",
  args: { children: "Ver planos", size: "default" },
}

export const SizeLg: Story = {
  name: "Size / Large",
  args: { children: "Começar agora", size: "lg" },
}

export const SizeIcon: Story = {
  name: "Size / Icon",
  args: {
    size: "icon",
    "aria-label": "Adicionar item",
    children: <Plus className="h-4 w-4" />,
  },
}

// ─── States ───────────────────────────────────────────────────────────────────

export const StateDisabled: Story = {
  name: "State / Disabled",
  args: { children: "Indisponível", disabled: true },
}

export const StateLoading: Story = {
  name: "State / Loading",
  args: { children: "Salvando...", loading: true },
}

export const StateLoadingOutline: Story = {
  name: "State / Loading Outline",
  args: { children: "Carregando", variant: "outline", loading: true },
}

export const StateLoadingLg: Story = {
  name: "State / Loading Large",
  args: { children: "Processando pagamento", size: "lg", loading: true },
}

// ─── Com ícones ───────────────────────────────────────────────────────────────

export const IconLeft: Story = {
  name: "Icon / Esquerda",
  args: {
    children: (
      <>
        <Truck className="h-4 w-4" />
        Nova Mudança
      </>
    ),
  },
}

export const IconRight: Story = {
  name: "Icon / Direita",
  args: {
    children: (
      <>
        Próximo passo
        <ArrowRight className="h-4 w-4" />
      </>
    ),
  },
}

export const IconOnly: Story = {
  name: "Icon / Somente ícone",
  args: {
    size: "icon",
    "aria-label": "Adicionar item",
    children: <Plus className="h-4 w-4" />,
  },
}

export const IconDownload: Story = {
  name: "Icon / Download",
  args: {
    variant: "outline",
    children: (
      <>
        <Download className="h-4 w-4" />
        Exportar lista
      </>
    ),
  },
}

export const IconSend: Story = {
  name: "Icon / Enviar",
  args: {
    children: (
      <>
        Solicitar cotação
        <Send className="h-4 w-4" />
      </>
    ),
  },
}

// ─── CTAs reais do produto ────────────────────────────────────────────────────

export const CTAHero: Story = {
  name: "CTA / Hero — Começar agora",
  args: {
    size: "lg",
    children: (
      <>
        Começar agora
        <ArrowRight className="h-4 w-4" />
      </>
    ),
  },
}

export const CTAPro: Story = {
  name: "CTA / Assinar PRO",
  args: {
    size: "lg",
    children: (
      <>
        <Zap className="h-4 w-4" />
        Assinar PRO — R$ 29,90/mês
      </>
    ),
  },
}

export const CTADestructive: Story = {
  name: "CTA / Excluir conta",
  args: {
    variant: "destructive",
    children: (
      <>
        <Trash2 className="h-4 w-4" />
        Excluir minha conta
      </>
    ),
  },
}

// ─── Matrizes ─────────────────────────────────────────────────────────────────

export const MatrizVariants: Story = {
  name: "Matriz / Todos os Variants",
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      {(["default", "outline", "secondary", "ghost", "accent", "destructive", "link"] as const).map(
        (v) => (
          <Button key={v} variant={v}>
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Button>
        )
      )}
    </div>
  ),
}

export const MatrizSizes: Story = {
  name: "Matriz / Todos os Tamanhos",
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Adicionar">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
}

export const MatrizEstados: Story = {
  name: "Matriz / Todos os Estados",
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
      <Button variant="outline" loading>
        Loading Outline
      </Button>
      <Button variant="destructive" disabled>
        Destructive Disabled
      </Button>
    </div>
  ),
}

export const MatrizCompleta: Story = {
  name: "Matriz / Variant × Tamanho",
  render: () => {
    const variants = [
      "default",
      "outline",
      "secondary",
      "ghost",
      "accent",
      "destructive",
    ] as const
    const sizes = ["sm", "default", "lg"] as const

    return (
      <div className="p-6 overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="text-left pr-8 pb-4 text-xs font-mono text-muted-foreground">
                variant / size
              </th>
              {sizes.map((s) => (
                <th
                  key={s}
                  className="px-4 pb-4 text-xs font-mono text-muted-foreground text-center"
                >
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variants.map((v) => (
              <tr key={v}>
                <td className="pr-8 py-3 text-xs font-mono text-muted-foreground align-middle">
                  {v}
                </td>
                {sizes.map((s) => (
                  <td key={s} className="px-4 py-3 align-middle text-center">
                    <Button variant={v} size={s}>
                      Botão
                    </Button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
}
